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
 * Sets transition in cross-browser way.
 * @param {Element} aElement Element to set property to.
 * @param {string} aTransitionString Property value.
 */
rflect.browser.css.setTransition = function(aElement,
    aTransitionString) {
  rflect.browser.css.setProperty(aElement, 'transition', aTransitionString);
};


/**
 * Sets transform in cross-browser way.
 * @param {Element} aElement Element to set property to.
 * @param {string} aTransformString Property value.
 */
rflect.browser.css.setTransform = function(aElement,
    aTransformString) {
  rflect.browser.css.setProperty(aElement, 'transform', aTransformString);
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
rflect.browser.css.findAndCacheProperty_ = function(aPropertyName) {
  if (!rflect.browser.css.propertyToPrefixedProperties_[aPropertyName]){

    var property;
    var style = document.createElement('div').style;

    ['', 'Webkit', 'ms', 'Ms', 'Moz', 'O', 'o', 'webkit', 'moz'].some(
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


/**
 * @param {string} aPropertyName Property name, selector-cased.
 */
rflect.browser.css.setProperty = function(aElement, aPropertyName,
    aPropertyValue) {
  var props = rflect.browser.css.findAndCacheProperty_(aPropertyName);

  aElement.style[props[1]] = aPropertyValue;
}


/**
 * @param {string} aPropertyName Property name, selector-cased.
 * @return {Array.<string>} Property names: 1. selector-cased 2. CamelCased.
 */
rflect.browser.css.getPrefixedProperty = function(aPropertyName) {
  var props = rflect.browser.css.findAndCacheProperty_(aPropertyName);

  return props;
}


