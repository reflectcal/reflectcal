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
