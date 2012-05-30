/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Debug utils.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.userAgent');

goog.provide('rflect.Debug');

//goog.setTestOnly();

if (goog.DEBUG) {

  /**
   * External logger.
   * @type {goog.debug.Logger}
   * @private
   */
  rflect.Debug.theLogger_ = null;

  /**
   * Moves object to global scope in order for it to be viewable in
   * debugger(firebug).
   * @param {string} name Name that object will hold.
   * @param {*} obj Any object to inspect.
   */
  var _inspect = function(name, obj) {
    window['_inspect_' + name] = obj;
  };

  /**
   * Outputs one or two of given args.
   * @param {string} aArg1 Message that precedes logged variable.
   * @param {number} aNumber How many arguments to output.
   * @param {number|string|Object=} opt_arg2 Logged variable or expression.
   */
  rflect.Debug.printOneOrTwoArgs_ = function(aArg1, aNumber, opt_arg2){
    return aArg1 + (aNumber == 2 ? ': ' + opt_arg2 : '')
  }

  /**
   * Logs message in console.
   * @param {string} str Message that precedes logged variable.
   * @param {number|string|Object=} opt_var Logged
   * variable or expression.
   * NOTE(alexk): We could've use record type {toString:function():string}, but
   * JS Compiler has some issues with that
   * (http://code.google.com/p/closure-compiler/issues/detail?id=553), so we
   * just use Object instead.
   */
  var _log = function(str, opt_var) {
    var number = arguments.length;
    var theLogger = null;
    if (!goog.userAgent.IE) {
      if ('console' in window && 'log' in window['console'])
        window['console'].log(rflect.Debug.printOneOrTwoArgs_(str, number,
            opt_var));
    } else {
      if (!rflect.Debug.theLogger) {
        // Create the debug window.
        var debugWindow = new goog.debug.FancyWindow('main');
        debugWindow.setEnabled(true);
        debugWindow.init();

        // Create a logger.
        rflect.Debug.theLogger = goog.debug.Logger.getLogger('demo');
        rflect.Debug.theLogger.info('Logger started');
        rflect.Debug.theLogger.info(
            rflect.Debug.printOneOrTwoArgs_(str, number, opt_var));
      } else
        rflect.Debug.theLogger.info(
            rflect.Debug.printOneOrTwoArgs_(str, number, opt_var));
    }

  };


  /**
   * Object storing time for profilers.
   * @type {Object.<string, number>}
   * @private
   */
  rflect.Debug.perfIds_ = {};


  /**
   * At first call starts profiler and in second ends it and logs time
   * difference between calls in console.
   * @param {string} aPerfId Profiler id.
   */
  var _perf = function Debug_Performance(aPerfId) {
    if (aPerfId in rflect.Debug.perfIds_) {
      _log(aPerfId, (goog.now() - rflect.Debug.perfIds_[aPerfId]) + 'ms');
      delete rflect.Debug.perfIds_[aPerfId];
    } else {
      rflect.Debug.perfIds_[aPerfId] = goog.now();
    }
  };
}
