/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Abstraction of CSSMatrix.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.cssmatrix');

goog.require('arian.CSSMatrix');


/**
 * @param {string} aComputedStyle Computed style of transform -
 * element.style.transform.
 * @return {Object} CSSMatrix instance for this style.
 */
rflect.browser.cssmatrix.getInstance = function(aComputedStyle){
  if (window.CSSMatrix)
    return new CSSMatrix(aComputedStyle);
  if (window.WebKitCSSMatrix)
    return new WebKitCSSMatrix(aComputedStyle);
  if (window.MSCSSMatrix)
    return new MSCSSMatrix(aComputedStyle);
  //Shim is last.
  return new arian.CSSMatrix(aComputedStyle);
};


