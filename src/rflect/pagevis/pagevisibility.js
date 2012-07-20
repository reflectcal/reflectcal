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
  return !rflect.pagevis.nameOfHiddenProperty_ ||
      document[rflect.pagevis.nameOfHiddenProperty_];
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
 * @return {boolean} Whether Page Visibility API is available.
 */
rflect.pagevis.detect = function() {
  var vendorHiddenName;
  var vendorCounter = 0;
  while ((vendorHiddenName =
      rflect.pagevis.VENDOR_HIDDEN_NAMES[vendorCounter++]) in document){
    rflect.pagevis.nameOfHiddenProperty_ = vendorHiddenName;
    rflect.pagevis.nameOfVisibilityChangeEvent =
        rflect.pagevis.VENDOR_VISIBILITYCHANGE_NAMES[vendorCounter++];
    break;
  }
}
rflect.pagevis.detect();