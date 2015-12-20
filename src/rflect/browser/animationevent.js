/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for animation events.
 * {@link http://www.sitepoint.com/css3-animation-javascript-event-handlers/}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.animationevent');


/**
 * Vendor-specific names animation start event.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.animationevent.START = [
  'animationstart',
  'webkitAnimationStart',
  'oanimationstart',
  'MSAnimationStart'
];


/**
 * Vendor-specific names animation iteration event.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.animationevent.ITERATION = [
  'animationiteration',
  'webkitAnimationIteration',
  'oanimationiteration',
  'MSAnimationIteration'
]


/**
 * Vendor-specific names animation end event.
 * @type {Array.<string>}
 * @const
 */
rflect.browser.animationevent.END = [
  'animationend',
  'webkitAnimationEnd',
  'oanimationend',
  'MSAnimationEnd'
]


