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
  console.log('getEntitiesAsync');
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
  console.log('ensureEntityExists');
  aCollection.count(aLookupObject, function(aError, aCount){
    console.log('aCount', aCount );

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
  collection.remove({ _id: aEntityId }, {}, function(aError, aResult){
    // Passing result to callback.
    aOnEntityDelete(aResult);
  });
};
