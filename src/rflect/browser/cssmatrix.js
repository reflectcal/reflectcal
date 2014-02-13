/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Abstraction of CSSMatrix.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.cssmatrix');

goog.require('CSSMatrix');


/**
 * @param {string} aComputedStyle Computed style of transform -
 * element.style.transform.
 * @return {Object} CSSMatrix instance for this style.
 */
rflect.browser.cssmatrix.getInstance = function(aComputedStyle){
  //Current browser implementations do not support unprefixed CSSMatrix, so
  //shim will be used, make it last.
  if (window.WebKitCSSMatrix)
    return new WebKitCSSMatrix(aComputedStyle);
  if (window.MSCSSMatrix)
    return new MSCSSMatrix(aComputedStyle);
  return new CSSMatrix(aComputedStyle);
};


