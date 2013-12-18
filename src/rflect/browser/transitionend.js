/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for transition end event
 * {@link https://developer.mozilla.org/en/DOM/Using_the_Page_Visibility_API}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.transitionend');


/**
 * Vendor-specific names for <code>document.hidden</code>.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES = [
  'webkitTransitionEnd',
  'transitionend',
  'otransitionend',
  'oTransitionEnd'
];


