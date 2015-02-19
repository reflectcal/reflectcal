/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for detecting css support.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.css');

goog.require('goog.string');


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
 * Lookup of property -> prefixed property.
 * @type {Object.<string, Array.<string>>}
 */
rflect.browser.css.propertyToPrefixedProperties_ = {};


/**
 * @param {string} aPropertyName Property name, selector-cased.
 * @return {Array.<string>} Property names: 1. selector-cased 2. CamelCased.
 */
rflect.browser.css.getPrefixedProperty = function(aPropertyName) {
  if (!rflect.browser.css.propertyToPrefixedProperties_[aPropertyName]){

    var property;
    var style = document.createElement('div').style;

    ['', 'Webkit', 'Ms', 'ms', 'Moz', 'O', 'o', 'webkit', 'moz'].some(
        vendorPrefix => {
      property = vendorPrefix + goog.string.toTitleCase(aPropertyName).
          replace(/\-/, '');
      if (property in style) {
        rflect.browser.css.propertyToPrefixedProperties_[aPropertyName] = [
          rflect.browser.css.getPrefixWithDashes_(vendorPrefix.toLowerCase()) +
              aPropertyName,
          property
        ]
        return true;
      }
      return false;
    });
  }

  return rflect.browser.css.propertyToPrefixedProperties_[aPropertyName];
}


/**
 * @param {string} aPrefix
 * @return {string} Prefix with or without dash.
 */
rflect.browser.css.getPrefixWithDashes_ = function(aPrefix) {
  return (aPrefix ? '-' : '') + aPrefix + (aPrefix ? '-' : '');
}
