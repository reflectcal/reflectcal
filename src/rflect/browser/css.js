/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for detecting css support.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.css');



/**
 * Detected transition property name.
 * @type {string}
 * @private
 */
rflect.browser.css.transitionPropertyName_;
 
 
/**
 * Vendor-specific names for <code>transition</code>.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.css.TRANSITION_NAMES = [
  'transition',
  'webkitTransition',
  'mozTransition',
  'msTransition'
]; 


/**
 * Sets transition in cross-browser way.
 * @param {Element} aElement Element to set property to.
 * @param {string} aTransitionString Property value.
 */
rflect.browser.css.setTransition = function(aElement, 
    aTransitionString) {
  if (!rflect.browser.css.transitionPropertyName_) {
    rflect.browser.css.TRANSITION_NAMES.some(vendorName => {
      if (vendorName in aElement.style) {
        rflect.browser.css.transitionPropertyName_ = vendorName;
        return true;
      }
      return false;
    });
  }
  aElement.style[rflect.browser.css.transitionPropertyName_] =
      aTransitionString;
};


/**
 * Detected transform property name.
 * @type {string}
 * @private
 */
rflect.browser.css.transformPropertyName_;
 
 
/**
 * Vendor-specific names for <code>transform</code>.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.css.TRANSFORM_NAMES = [
  'transform',
  'webkitTransform',
  'mozTransform',
  'msTransform'
]; 


/**
 * Sets transform in cross-browser way.
 * @param {Element} aElement Element to set property to.
 * @param {string} aTransformString Property value.
 */
rflect.browser.css.setTransform = function(aElement, 
    aTransformString) {
  if (!rflect.browser.css.transformPropertyName_) {
    rflect.browser.css.TRANSFORM_NAMES.some(vendorName => {
      if (vendorName in aElement.style) {
        rflect.browser.css.transformPropertyName_ = vendorName;
        return true;
      }
      return false;
    });
  }
  aElement.style[rflect.browser.css.transformPropertyName_] =
      aTransformString;
};


/**
 * @param {string} aPropertyName Property name, selector-cased.
 * @return {string} Property name with right vendor prefix or without one.
 */
rflect.browser.css.getPrefixedProperty = function(aPropertyName) {
  var property = aPropertyName;
  ['', 'webkit', 'moz', 'ms', 'o'].some(vendorPrefix => {
    if (goog.string.toCamelCase(vendorPrefix + '-' + aPropertyName) in
        document.documentElement.style) {
      property = (vendorPrefix ? '-' : '') + vendorPrefix + '-' + aPropertyName;
      return true;
    }
    return false;
  });
  return property;
}
