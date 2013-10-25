/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB utils.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


/**
 * Generates id and guarantees that it'll be unique against collection.
 * @param {Object} aCollection Collection for which id should be unique.
 * @param {function(string)} aCallback Callback that will be called with id as
 * parameter.
 */
exports.getUniqueIdAsync = function(aCollection, aCallback){
  aCollection && aCollection.count({_id: uniqueId}, {},
      function(aError, aCount){
    if (aCount == 0)
      // Executing external callback.
      aOnCalendarsLoaded(uniqueId);
    else if (aCount > 0)
      // Calling itself one more time.
      getUniqueIdAsync(aCollection, aCallback);
  });
};