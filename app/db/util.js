/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB utils.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var idgen = require('idgen');

var idAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ-_';


/**
 * Generates id and guarantees that it'll be unique against given collection.
 * @param {Object} aCollection Collection for which id should be unique.
 * @param {function(string)} aCallback Callback that will be called with id as
 * parameter.
 */
exports.getUniqueIdAsync = function(aCollection, aCallback){

  var uniqueId = idgen(32, idAlphabet);

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

  var uniqueId = (aIdPrefix || '') + idgen(32, idAlphabet);

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