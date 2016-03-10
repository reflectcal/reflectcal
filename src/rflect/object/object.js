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


/**
 * Creates a deep immutable view of the underlying object, if the browser
 * supports immutable objects.
 *
 * In default mode, writes to this view will fail silently. In strict mode,
 * they will throw an error.
 *
 * @param {!Object.<K,V>} obj An object.
 * @return {!Object.<K,V>} An immutable view of that object, or the
 *     original object if this browser does not support immutables.
 * @template K,V
 */
rflect.object.createImmutableViewDeep = function(obj) {
  var clonedObject = Object.create(obj);
  goog.object.forEach(clonedObject, (prop, key) => {
    if (!obj.hasOwnProperty(key) && goog.isObject(prop)) {
      clonedObject[key] = rflect.object.createImmutableViewDeep(prop);
    }
  })
  if (!goog.object.isImmutableView(obj)) {
    Object.freeze(clonedObject);
  }
  return clonedObject;
};