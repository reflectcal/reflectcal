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