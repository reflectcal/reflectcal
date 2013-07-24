/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Rflect array utilities.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.array');

goog.require('goog.array');


/**
 * Inserts a value into a sorted array. Unlike
 * <code>goog.array.binaryInsert</code>, allows to insert duplicate value.
 * @param {Array} aArray The array to modify.
 * @param {*} aValue The object to insert.
 * @param {Function=} opt_compareFn Optional comparison function by which the
 *     array is ordered. Should take 2 arguments to compare, and return a
 *     negative number, zero, or a positive number depending on whether the
 *     first argument is less than, equal to, or greater than the second.
 * @see {goog.array.binaryInsert}
 */
rflect.array.binaryInsert = function(aArray, aValue, opt_compareFn) {
  var index = goog.array.binarySearch(aArray, aValue, opt_compareFn);
  goog.array.insertAt(aArray, aValue, index < 0 ? -index - 1 : index);
};