/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for manipulating objects/maps/hashes.
 */

goog.provide('rflect.object');


/**
 * @param {Object} obj The object to test.
 * @return {boolean} true if obj has numeric key.
 */
rflect.object.hasNumericKey = function(obj) {
  for (var key in obj) {
    if (!isNaN(+key))
      return true;
  }
  return false;
};
