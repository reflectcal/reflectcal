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
  log.info('getEntitiesAsync');
  var entities = [];
  var collection = db.get(aCollectionName);

  var onEnsureEntityExists = function() {
    collection.find(aLookupObject, {}, function(aError, aEntities){
      aEntities && aEntities.forEach(function(aEntity) {
        entities.push(aEntityToTransportJSON(aEntity));
      });

      // Executing callback for view.
      aOnEntitiesLoad(entities);
    });
  }

  // If we need to be sure that at least one entity exits, check that.
  if (opt_defaultEntity)
    ensureEntityExists(collection, aLookupObject, onEnsureEntityExists,
        opt_defaultEntity);
  else
    onEnsureEntityExists();
};


/**
 * Ensures that entity exists.
 * @param {Object} aCollection Collection to which entity belongs.
 * @param {Object} aLookupObject Object with entity lookup params.
 * @param {function()} aOnEnsureEntityExist Callback that will be executed
 * when entity is truly present.
 */
function ensureEntityExists(aCollection, aLookupObject,
    aOnEnsureEntityExist, aDefaultEntity){
  log.info('ensureEntityExists');
  aCollection.count(aLookupObject, function(aError, aCount){
    log.info('aCount', aCount );

    if (aCount == 0) dbUtil.getUniqueIdAsync(aCollection, function(aId) {
      var defaultEntity = deepClone(aDefaultEntity);
      defaultEntity._id = aId;

      aCollection.insert(defaultEntity, {}, function(aError, aResult){
        aOnEnsureEntityExist();
      });
    })
    else if (aCount >= 1)
      aOnEnsureEntityExist();
  });
}


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
exports.getEntitiesWithPromise = function(aCollectionName, aLookupObject,
    aEntityToTransportJSON, opt_defaultEntity){
  return new Promise(function(resolve, reject) {
    var collection = db.get(aCollectionName);
    ensureEntityExistsWithPromise(collection, aLookupObject,
        opt_defaultEntity)
        .then(function() {
          var findWithPromise = Q.denodeify(collection.find.bind(collection));
          return findWithPromise(aLookupObject, {});
        })
        .then(function(aEntities) {
          var entities = [];
          aEntities.forEach(function(aEntity) {
            entities.push(aEntityToTransportJSON(aEntity));
          });
          resolve(entities);
        }, reject);
  });
}


/**
 * Ensures that entity exists.
 * @param {Object} aCollection Collection to which entity belongs.
 * @param {Object} aLookupObject Object with entity lookup params.
 * @param {function()} aOnEnsureEntityExist Callback that will be executed
 * when entity is truly present.
 */
function ensureEntityExistsWithPromise(aCollection, aLookupObject,
    aDefaultEntity){
  return new Promise(function(resolve, reject) {
    if (!aDefaultEntity) {
      resolve();
    } else {
      var countWithPromise = Q.denodeify(aCollection.count.bind(aCollection));
      countWithPromise(aLookupObject).then(function(aCount) {
        if (aCount == 0) {
          dbUtil.getUniqueIdAsyncWithPromise(aCollection).
              then(function(aId) {
                return insertDefaultEntityWithPromise(aCollection,
                    aDefaultEntity, aId);
              }).
              then(resolve, reject);
        } else if (aCount >= 1) {
          resolve();
        } else {
          reject(new Error('Meaningless count.'));
        }
      }, reject);
    } 
  });
}


function insertDefaultEntityWithPromise(aCollection, aDefaultEntity, aId) {
  var defaultEntity = deepClone(aDefaultEntity);
  defaultEntity._id = aId;

  var insertWithPromise = Q.denodeify(aCollection.insert.bind(aCollection));
  return insertWithPromise(defaultEntity, {});
}


/**
 * Saves entity.
 * @param {string} aCollectionName name of collection to which entity belongs.
 * @param {Object} aEntityJSON JSON representing entity.
 * @param {function(string|number)} aOnEntitySave Callback that will be
 * called when db request is ready.
 * @param {function(Object):Object} aEntityFromTransportJSON Function that
 * transforms transportable form of entity to its db representation.
 */
exports.saveEntityAsync = function(aCollectionName, aEntityJSON, aOnEntitySave,
    aEntityFromTransportJSON){
  var collection = db.get(aCollectionName);
  var entity = aEntityFromTransportJSON(aEntityJSON);

  collection.count({ _id: entity._id }, function(aError, aCount){
    if (aCount == 0) dbUtil.getUniqueIdAsync(collection,
        function(aUniqueId){
      entity._id = aUniqueId;
      collection.insert(entity, {}, function(aError, aResult){
        // Passing new id to callback.
        aOnEntitySave(aUniqueId);
      });
    })
    else if (aCount > 0)
      collection.update({ _id: entity._id }, entity, {},
          function(aError, aResult){
        // Signalizing that update was ok.
        aOnEntitySave(0);
      });
  });
};


/**
 * Deletes entity.
 * @param {string} aCollectionName Name of collection to which entity belongs.
 * @param {string} aEntityId Entity id.
 * @param {function(number)} aOnEntityDelete Callback that will be called
 * when db request is ready.
 */
exports.deleteEntityAsync = function(aCollectionName, aEntityId, 
    aOnEntityDelete){
  var collection = db.get(aCollectionName);
  collection.remove({ _id: aEntityId }, {}, function(aError, aNumberOfDeleted){
    // Passing result to callback.
    var result = aNumberOfDeleted > 0 ? 0 : -1;
    aOnEntityDelete(result);
  });
};
