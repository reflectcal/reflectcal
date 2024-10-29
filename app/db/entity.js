/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - DAO for abstract entity.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

var db = require('./connection').db;
var dbUtil = require('./util');
var deepClone = require('clone');
var appConfig = require('../config/appconfig');
var log = appConfig.log;
var Q = require('q');

/**
 * Loads entities.
 * @param {string} aCollectionName Collection to which entity belongs.
 * @param {Object} aLookupObject Object with entity lookup params.
 * @param {function(Array)} aOnEntitiesLoad Callback that will be executed
 * when db request is ready.
 * @param {function(Object):Object} aEntityToTransportJSON Function that
 * transforms db representation of entity to its transportable form.
 * @param {Object=} opt_defaultEntity Optional - default entity that should be
 * inserted when none exists. If omitted, no check is performed, so it's ok when
 * no entities are present.
 */
exports.getEntitiesAsync = function(aCollectionName, aLookupObject,
                                    aOnEntitiesLoad, aEntityToTransportJSON, opt_defaultEntity){
  log.info(`Fetching entities from collection: ${aCollectionName}`, { lookup: aLookupObject });

  var entities = [];
  var collection = db.get(aCollectionName);

  var onEnsureEntityExists = function() {
    collection.find(aLookupObject, {}, function(aError, aEntities){
      if (aError) {
        log.error(`Error fetching entities from ${aCollectionName}`, aError);
        return;
      }

      aEntities && aEntities.forEach(function(aEntity) {
        entities.push(aEntityToTransportJSON(aEntity));
      });

      log.info(`Fetched ${entities.length} entities from ${aCollectionName}`);
      aOnEntitiesLoad(entities);
    });
  }

  if (opt_defaultEntity) {
    log.info(`Ensuring at least one entity exists in ${aCollectionName}`);
    ensureEntityExists(collection, aLookupObject, onEnsureEntityExists, opt_defaultEntity);
  } else {
    onEnsureEntityExists();
  }
};

/**
 * Ensures that entity exists.
 * @param {Object} aCollection Collection to which entity belongs.
 * @param {Object} aLookupObject Object with entity lookup params.
 * @param {function()} aOnEnsureEntityExist Callback that will be executed
 * when entity is truly present.
 */
function ensureEntityExists(aCollection, aLookupObject, aOnEnsureEntityExist, aDefaultEntity){
  log.info(`Checking if entity exists in collection with lookup:`, { lookup: aLookupObject });

  aCollection.count(aLookupObject, function(aError, aCount){
    if (aError) {
      log.error(`Error counting entities in collection`, aError);
      return;
    }

    log.info(`Found ${aCount} entities matching lookup in collection`);

    if (aCount === 0) {
      log.info(`No entities found, inserting default entity`, aDefaultEntity);
      dbUtil.getUniqueIdAsync(aCollection, function(aId) {
        var defaultEntity = deepClone(aDefaultEntity);
        defaultEntity._id = aId;

        aCollection.insert(defaultEntity, {}, function(aError, aResult){
          if (aError) {
            log.error(`Error inserting default entity`, aError);
            return;
          }
          log.info(`Inserted default entity with ID ${aId}`);
          aOnEnsureEntityExist();
        });
      });
    } else {
      aOnEnsureEntityExist();
    }
  });
}

/**
 * Loads entities with a Promise.
 */
exports.getEntitiesWithPromise = function(aCollectionName, aLookupObject,
                                          aEntityToTransportJSON, opt_defaultEntity){
  log.info(`Fetching entities with promise from collection: ${aCollectionName}`, { lookup: aLookupObject });

  return new Promise(function(resolve, reject) {
    var collection = db.get(aCollectionName);

    ensureEntityExistsWithPromise(collection, aLookupObject, opt_defaultEntity)
        .then(function() {
          var findWithPromise = Q.denodeify(collection.find.bind(collection));
          return findWithPromise(aLookupObject, {});
        })
        .then(function(aEntities) {
          var entities = aEntities.map(aEntityToTransportJSON);
          log.info(`Fetched ${entities.length} entities from ${aCollectionName}`);
          resolve(entities);
        }, function(error) {
          log.error(`Error fetching entities with promise from ${aCollectionName}`, error);
          reject(error);
        });
  });
}

/**
 * Ensures that entity exists with a Promise.
 */
function ensureEntityExistsWithPromise(aCollection, aLookupObject, aDefaultEntity){
  return new Promise(function(resolve, reject) {
    if (!aDefaultEntity) {
      resolve();
    } else {
      var countWithPromise = Q.denodeify(aCollection.count.bind(aCollection));
      countWithPromise(aLookupObject).then(function(aCount) {
        if (aCount === 0) {
          log.info(`No entities found, inserting default entity`, aDefaultEntity);
          return dbUtil.getUniqueIdAsyncWithPromise(aCollection)
              .then(function(aId) {
                return insertDefaultEntityWithPromise(aCollection, aDefaultEntity, aId);
              })
              .then(resolve, reject);
        } else {
          log.info(`Entity already exists, count: ${aCount}`);
          resolve();
        }
      }).catch(function(error) {
        log.error(`Error ensuring entity exists in collection`, error);
        reject(error);
      });
    }
  });
}

function insertDefaultEntityWithPromise(aCollection, aDefaultEntity, aId) {
  log.info(`Inserting default entity with generated ID ${aId}`);
  var defaultEntity = deepClone(aDefaultEntity);
  defaultEntity._id = aId;

  var insertWithPromise = Q.denodeify(aCollection.insert.bind(aCollection));
  return insertWithPromise(defaultEntity, {});
}

/**
 * Saves an entity.
 */
exports.saveEntityAsync = function(aCollectionName, aEntityJSON, aOnEntitySave, aEntityFromTransportJSON){
  log.info(`Saving entity to collection: ${aCollectionName}`, aEntityJSON);

  var collection = db.get(aCollectionName);
  var entity = aEntityFromTransportJSON(aEntityJSON);

  collection.count({ _id: entity._id }, function(aError, aCount){
    if (aError) {
      log.error(`Error counting entities in ${aCollectionName}`, aError);
      return;
    }

    if (aCount === 0) {
      dbUtil.getUniqueIdAsync(collection, function(aUniqueId){
        entity._id = aUniqueId;
        collection.insert(entity, {}, function(aError, aResult){
          if (aError) {
            log.error(`Error inserting new entity`, aError);
            return;
          }
          log.info(`Inserted new entity with ID ${aUniqueId}`);
          aOnEntitySave(aUniqueId);
        });
      });
    } else {
      collection.update({ _id: entity._id }, entity, {}, function(aError, aResult){
        if (aError) {
          log.error(`Error updating entity`, aError);
          return;
        }
        log.info(`Updated existing entity with ID ${entity._id}`);
        aOnEntitySave(0);
      });
    }
  });
};

/**
 * Deletes an entity.
 */
exports.deleteEntityAsync = function(aCollectionName, aEntityId, aOnEntityDelete){
  log.info(`Deleting entity with ID ${aEntityId} from collection: ${aCollectionName}`);

  var collection = db.get(aCollectionName);
  collection.remove({ _id: aEntityId }, {}, function(aError, aNumberOfDeleted){
    if (aError) {
      log.error(`Error deleting entity`, aError);
      aOnEntityDelete(-1);
      return;
    }

    var result = aNumberOfDeleted > 0 ? 0 : -1;
    log.info(`Entity with ID ${aEntityId} ${result === 0 ? 'deleted' : 'not found'}`);
    aOnEntityDelete(result);
  });
};
