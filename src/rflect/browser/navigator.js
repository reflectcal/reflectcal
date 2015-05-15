/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Proxy class for user agent.
 *
 */

goog.provide('rflect.cal.Navigator');

goog.require('goog.events.EventTarget');
goog.require('goog.dom');
goog.require('goog.style');



/**
 * This class can be used to access browser features and changes of its
 * properties through events.
 * The goal is to accumulate feature detection here, especially of features that
 * could change at runtime.
 * @param {Window=} opt_window The window to monitor; defaults to the window in
 *    which this code is executing.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.Navigator = function(opt_window) {
  goog.events.EventTarget.call(this);

  /**
   * @type {Window} Window to monitor.
   */
  this.window = opt_window || window;

  this.supportedInputTypes_ = {};

};
goog.inherits(rflect.cal.Navigator, goog.events.EventTarget);


/**
 * Query to detect small screens.
 * @type {string}
 */
rflect.cal.Navigator.SMALL_SCREEN_QUERY =
    '(max-width: 640px) and (orientation: portrait), ' +
    '(max-width: 832px) and (orientation: landscape)';


/**
 * String to test date and time support.
 * @type {string}
 */
rflect.cal.Navigator.INPUT_VALUE_TEST_STRING = 'test-text';


/**
 * Set of supported input types.
 * @type {Object.<string, boolean>}
 */
rflect.cal.Navigator.prototype.supportedInputTypes_;


/**
 * Platform-dependent scrollbar width.
 * @type {number}
 */
rflect.cal.Navigator.prototype.scrollbarWidth_ = -1;


/**
 * @return {boolean} Whether screen is small according to media query.
 */
rflect.cal.Navigator.prototype.isSmallScreen = function() {
  if (this.window.matchMedia &&
      this.window.matchMedia(rflect.cal.Navigator.SMALL_SCREEN_QUERY).matches) {
    return true;
  } else {
    return false;
  }
}


/**
 * @return {boolean} Whether input date is supported.
 */
rflect.cal.Navigator.prototype.isInputDateSupported = function() {
  return this.isInputTypeSupported_('date');
}


/**
 * @return {boolean} Whether input time is supported.
 */
rflect.cal.Navigator.prototype.isInputTimeSupported = function() {
  return this.isInputTypeSupported_('time');
}


/**
 * @return {boolean} Whether all time inputs are supported.
 */
rflect.cal.Navigator.prototype.isNativeTimeInput = function() {
  return this.isInputTimeSupported() && this.isInputDateSupported() &&
      this.isInputDateTimeLocalSupported();
}


/**
 * @return {boolean} Whether input datetime-local is supported.
 */
rflect.cal.Navigator.prototype.isInputDateTimeLocalSupported = function() {
  return this.isInputTypeSupported_('datetime-local');
}


/**
 * @return {boolean} Whether input date is supported.
 * @private
 */
rflect.cal.Navigator.prototype.isInputTypeSupported_ = function(aType) {
  if (aType in this.supportedInputTypes_)
    return this.supportedInputTypes_[aType];

  var input = goog.dom.createDom('input', {
    'type': aType
  });
  input.value = rflect.cal.Navigator.INPUT_VALUE_TEST_STRING;

  this.supportedInputTypes_[aType] =
      rflect.cal.Navigator.INPUT_VALUE_TEST_STRING != input.value;

  if (rflect.cal.Navigator.prototype.isFirefoxFalseNegative_(aType)) {
    this.supportedInputTypes_[aType] = true;
  }

  return this.supportedInputTypes_[aType];
}


/**
 * @return {boolean} Whether input date is supported in current Firefox, for
 * some types in reports false negatives.
 * @private
 * @see {http://quirksmode.org/html5/inputs/tests/inputs_js.html}
 */
rflect.cal.Navigator.prototype.isFirefoxFalseNegative_ = function(aType) {
  var uaString = navigator.userAgent.toLowerCase();
  return goog.userAgent.GECKO && (
      (uaString.indexOf('mobile') > -1 || uaString.indexOf('tablet') > -1) &&
      goog.userAgent.isVersion('21') &&
      (aType == 'datetime-local' || aType == 'datetime' || aType == 'month' ||
      aType == 'week'));
}


/**
 * @return {number} Platform-dependent scrollbar width.
 */
rflect.cal.Navigator.prototype.getScrollbarWidth = function() {
  return this.scrollbarWidth_ < 0 ? this.scrollbarWidth_ =
      goog.style.getScrollbarWidth() : this.scrollbarWidth_;
}


/**
 * @override
 */
rflect.cal.Navigator.prototype.disposeInternal = function() {
  rflect.cal.Navigator.superClass_.disposeInternal.call(this);
};




