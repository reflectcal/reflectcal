/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Application entry point.
 * @author alexeykofficial@gmail.com (Alex K)
 * Class that creates cal instance when appropriate event is fired.
 */

goog.provide('rflect.cal.Loader');

goog.require('goog.events');
goog.require('rflect.Debug');
goog.require('rflect.cal.Main');


/**
 * Binds creation of cal instance to load events.
 * @this {rflect.cal.Loader}
 */
rflect.cal.Loader.main = function() {
  goog.events.listenOnce(window, 'load', function(aEvent) {
    // Load event will fire later than dom ready.
    if (!this.documentLoaded_)
      this.calInstance_ = new rflect.cal.Main();
  }, false, this);

  goog.events.listenOnce(window, 'DOMContentLoaded', function(aEvent) {
    this.documentLoaded_ = true;
    this.calInstance_ = new rflect.cal.Main();
  }, false, this);

  goog.events.listenOnce(window, 'unload', function(aEvent) {
    if (this.calInstance_)
      this.calInstance_.dispose();
  }, false, this);
};


/**
 * Whether load event was fired and cal main class instance was created.
 * @type {boolean}
 * @private
 */
rflect.cal.Loader.documentLoaded_ = false;


/**
 * Calendar instance.
 * @type {rflect.cal.Main}
 * @private
 */
rflect.cal.Loader.calInstance_ = null;


// Call main method.
try {
  // We simulate call to main for JS compiler, this is to
  // avoid exporting main as well as enclosing namespaces.
  // TODO(alexk): Make the same by setting --closure_entry_point compiler
  // option.
  rflect.cal.Loader.main();
} catch (e) {
}
