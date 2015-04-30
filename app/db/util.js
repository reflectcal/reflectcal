/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB utils.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var idgen = require('idgen');

var idAlphabet = '0123456789abcdef';


/**
 * Generates id and guarantees that it'll be unique against given collection.
 * @param {Object} aCollection Collection for which id should be unique.
 * @param {function(string)} aCallback Callback that will be called with id as
 * parameter.
 */
exports.getUniqueIdAsync = function(aCollection, aCallback){

  var uniqueId = idgen(24, idAlphabet);

  aCollection && aCollection.count({_id: uniqueId}, function(aError, aCount){
    if (aCount == 0)
      // Executing external callback.
      aCallback(uniqueId);
    else if (aCount > 0)
      // Calling itself one more time.
      getUniqueIdAsync(aCollection, aCallback);
  });
};


/**
 * Generates id and guarantees that it'll be unique against given collection.
 * @param {Object} aCollection Collection for which id should be unique.
 * @param {function(string)} aCallback Callback that will be called with id as
 * parameter.
 */
exports.getUniqueIdAsyncWithPromise = function(aCollection){
  return new Promise(function(resolve, reject) {
    var uniqueId = idgen(24, idAlphabet);

    aCollection.count({_id: uniqueId}, function(aError, aCount) {
      if (aError) {
        reject(aError);
      } else if (aCount == 0) {
        // Executing external callback.
        resolve(uniqueId);
      } else if (aCount > 0) {
        // Calling itself one more time.
        exports.getUniqueIdAsyncWithPromise(aCollection).then(resolve, reject);
      } else {
        reject(new Error('Meaningless count.'));
      }
    });
  })
};


/**
 * Generates arbitrary field and guarantees that it'll be unique against 
 * given collection.
 * @param {Object} aCollection Collection for which id should be unique.
 * @param {string} aFieldName Name of the field which id should be unique.
 * @param {string} aIdPrefix String which will be prepended before unique id.
 * @param {function(string)} aCallback Callback that will be called with id as
 * parameter.
 */
exports.getUniqueFieldAsync = function(aCollection, aFieldName, aIdPrefix, 
    aCallback){

  var uniqueId = (aIdPrefix || '') + idgen(24, idAlphabet);

  var lookupObject = {};
  lookupObject[aFieldName] = uniqueId;
  
  aCollection && aCollection.count(lookupObject, function(aError, aCount){
    if (aCount == 0)
      // Executing external callback.
      aCallback(uniqueId);
    else if (aCount > 0)
      // Calling itself one more time.
      getUniqueIdAsync(aCollection, aFieldName, aIdPrefix, aCallback);
  });
};