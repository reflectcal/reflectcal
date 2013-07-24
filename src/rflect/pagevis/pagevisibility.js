/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for Page Visibility API 
 * {@link https://developer.mozilla.org/en/DOM/Using_the_Page_Visibility_API}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.pagevis');


/**
 * Vendor-specific names for <code>document.hidden</code>.
 * @type {Array.<string>}
 * @const
 */
rflect.pagevis.VENDOR_HIDDEN_NAMES = [
  'hidden',
  'msHidden',
  'mozHidden',
  'webkitHidden'
];


/**
 * Vendor-specific names for visibilitychange event.
 * @type {Array.<string>}
 * @const
 */
rflect.pagevis.VENDOR_VISIBILITYCHANGE_NAMES = [
  'visibilitychange',
  'msvisibilitychange',
  'mozvisibilitychange',
  'webkitvisibilitychange'
];


/**
 * @return {boolean} Whether page is visible according to Page Visibility API.
 */
rflect.pagevis.pageIsVisible = function() {
  return !rflect.pagevis.isAvailable() ||
      !document[rflect.pagevis.nameOfHiddenProperty_];
}


/**
 * @return {boolean} Whether Page Visibility API is available. Should be called
 * after <code>detect</code>.
 */
rflect.pagevis.isAvailable = function() {
  return /**@type {boolean}*/(rflect.pagevis.nameOfHiddenProperty_ &&
      rflect.pagevis.nameOfVisibilityChangeEvent);
}


/**
 * <code>document.hidden</code> vendor-specific name.
 * @type {string}
 * @private
 */
rflect.pagevis.nameOfHiddenProperty_;


/**
 * Visibility change event name for current environment.
 * @type {string}
 */
rflect.pagevis.nameOfVisibilityChangeEvent;


/**
 * Tests whether Page Visibility API is available and with which vendor prefix.
 */
(function() {
  var vendorHiddenNames = rflect.pagevis.VENDOR_HIDDEN_NAMES;
  for (var vendorCounter = 0; vendorCounter <
      vendorHiddenNames.length; vendorCounter++){
    if (vendorHiddenNames[vendorCounter] in document){
      rflect.pagevis.nameOfHiddenProperty_ = vendorHiddenNames[vendorCounter];
      rflect.pagevis.nameOfVisibilityChangeEvent =
          rflect.pagevis.VENDOR_VISIBILITYCHANGE_NAMES[vendorCounter];
      break;
    }
  }
})();