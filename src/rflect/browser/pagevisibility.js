/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for Page Visibility API 
 * {@link https://developer.mozilla.org/en/DOM/Using_the_Page_Visibility_API}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.pagevisibility');


/**
 * Vendor-specific names for <code>document.hidden</code>.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.pagevisibility.VENDOR_HIDDEN_NAMES = [
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
rflect.browser.pagevisibility.VENDOR_VISIBILITYCHANGE_NAMES = [
  'visibilitychange',
  'msvisibilitychange',
  'mozvisibilitychange',
  'webkitvisibilitychange'
];


/**
 * @return {boolean} Whether page is visible according to Page Visibility API.
 */
rflect.browser.pagevisibility.pageIsVisible = function() {
  return !rflect.browser.pagevisibility.isAvailable() ||
      !document[rflect.browser.pagevisibility.nameOfHiddenProperty_];
}


/**
 * @return {boolean} Whether Page Visibility API is available. Should be called
 * after <code>detect</code>.
 */
rflect.browser.pagevisibility.isAvailable = function() {
  return !!(rflect.browser.pagevisibility.nameOfHiddenProperty_ &&
      rflect.browser.pagevisibility.nameOfVisibilityChangeEvent);
}


/**
 * <code>document.hidden</code> vendor-specific name.
 * @type {string}
 * @private
 */
rflect.browser.pagevisibility.nameOfHiddenProperty_;


/**
 * Visibility change event name for current environment.
 * @type {string}
 */
rflect.browser.pagevisibility.nameOfVisibilityChangeEvent;


/**
 * Tests whether Page Visibility API is available and with which vendor prefix.
 */
(function() {
  var vendorHiddenNames = rflect.browser.pagevisibility.VENDOR_HIDDEN_NAMES;
  for (var vendorCounter = 0; vendorCounter <
      vendorHiddenNames.length; vendorCounter++){
    if (vendorHiddenNames[vendorCounter] in document){
      rflect.browser.pagevisibility.nameOfHiddenProperty_ = vendorHiddenNames[vendorCounter];
      rflect.browser.pagevisibility.nameOfVisibilityChangeEvent =
          rflect.browser.pagevisibility.VENDOR_VISIBILITYCHANGE_NAMES[vendorCounter];
      break;
    }
  }
})();