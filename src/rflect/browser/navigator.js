/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Proxy class for user agent.
 *
 */

goog.provide('rflect.cal.Navigator');

goog.require('goog.events.EventTarget');



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

};
goog.inherits(rflect.cal.Navigator, goog.events.EventTarget);


/**
 * Query to detect small screens.
 * @type {string}
 */
rflect.cal.Navigator.SMALL_SCREEN_QUERY = '(max-width: 480px)';


/**
 * @return {boolean} Whether screen is small according to media query.
 */
rflect.cal.Navigator.prototype.isSmallScreen = function() {
  /*if (this.window.matchMedia &&
      this.window.matchMedia(rflect.cal.Navigator.SMALL_SCREEN_QUERY).matches) {
    return true;
  } else {
    return false;
  }*/
  return true;
}


/**
 * @override
 */
rflect.cal.Navigator.prototype.disposeInternal = function() {
  rflect.cal.Navigator.superClass_.disposeInternal.call(this);
};




