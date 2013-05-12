/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Rflect string utilities.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.string');

goog.require('goog.string');


/**
 * Regexp indication beginning of class.
 * @type {string}
 * @const
 */
rflect.string.BEGINNING_OF_CLASS_RE = '(\\s|^)';


/**
 * Regexp indication end of class.
 * @type {string}
 * @const
 */
rflect.string.END_OF_CLASS_RE = '(\\s|$)';


/**
 * Builds regexp which could be tested against presence one of its parts - class
 * names.
 * @param {...string} var_args Parts of regexp.
 * @return {RegExp} Built regexp.
 */
rflect.string.buildClassNameRe = function(var_args) {
  var buffer = [];
  if (goog.DEBUG)
    goog.array.forEach(arguments, function(aVal, aIndex) {
      buffer[aIndex] = goog.string.regExpEscape(aVal);
    });
  else
    goog.array.forEach(arguments, function(aVal, aIndex) {
      buffer[aIndex] = aVal;
    });

  return new RegExp(rflect.string.BEGINNING_OF_CLASS_RE +
      buffer.join(rflect.string.END_OF_CLASS_RE + '|' +
      rflect.string.BEGINNING_OF_CLASS_RE) + rflect.string.END_OF_CLASS_RE);
};


/**
 * @param {string} aId Id to find index in.
 * @param {number=} opt_base How many digits are in index.
 * @return {number} Index found in id.
 */
rflect.string.getNumericIndex = function(aId, opt_base) {
  var base = goog.isDef(opt_base) ? opt_base : 1;
  var re = new RegExp('\\d{1,' + base + '}');
  var matches = re.exec(aId);
  return matches ? +matches[0] : NaN;
}


/**
 * @param {string} aId Id to find index in.
 * @return {number} Two-digit index found in id.
 */
rflect.string.get2DigitIndex = function(aId) {
  return rflect.string.getNumericIndex(aId, 2);
}


/**
 * Gets numeric index from string of type "{prefix}100" where {prefix} is
 * arbitrary string.
 * @param {string} aStr String to extract index.
 * @param {string} aPrefix Prefix string which used to identify numeric index.
 * @return {number} Numeric index.
 */
rflect.string.getNumericIndexWithPrefix = function(aStr, aPrefix) {
  var re = new RegExp(aPrefix + '\\d+');
  var matches = re.exec(aStr);
  if (matches) {
    var len = matches[0].length;
    return +matches[0].substring(aPrefix.length, len);
  }
  return NaN;
}