/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Application entry point.
 * Theoretically, this class may be loaded at startup and manage loading of
 * calendar via module.
 * @author alexeykofficial@gmail.com (Alex K)
 * Class that creates cal instance when appropriate event is fired.
 */

goog.provide('rflect.cal.Loader');

goog.require('goog.events');
goog.require('rflect.cal.Main');
goog.require('rflect.cal.predefined');
goog.require('rflect.Debug');
goog.require('ftlabs.fastclick.FastClick');



/**
 * Calendar loader class.
 * @constructor
 */
rflect.cal.Loader = function(){}


/**
 * Binds creation of cal instance to load events.
 */
rflect.cal.Loader.prototype.enterDocument = function() {
  goog.events.listenOnce(window, 'load', this.onLoad, false, this);

  goog.events.listenOnce(window, 'DOMContentLoaded', this.onLoad, false, this);

  goog.events.listenOnce(window, 'unload', function(aEvent) {
    if (this.calInstance_)
      this.calInstance_.dispose();
  }, false, this);
};


/**
 * Binds creation of cal instance to load events.
 */
rflect.cal.Loader.prototype.onLoad = function() {
  // Load event will fire later than dom ready.
  if (!this.documentLoaded_) {
    this.documentLoaded_ = true;
    this.calInstance_ = new rflect.cal.Main();
    if (rflect.MOBILE)
      ftlabs.fastclick.FastClick.attach(document.body);
  }
}


/**
 * Whether load event was fired and cal main class instance was created.
 * @type {boolean}
 * @private
 */
rflect.cal.Loader.prototype.documentLoaded_ = false;


/**
 * Calendar instance.
 * @type {rflect.cal.Main}
 * @private
 */
rflect.cal.Loader.prototype.calInstance_ = null;


// Call main method.
try {
  // We simulate call to main for JS compiler, this is to
  // avoid exporting main as well as enclosing namespaces.
  // TODO(alexk): Make the same by setting --closure_entry_point compiler
  // option.
  new rflect.cal.Loader().enterDocument();
} catch (e) {
}
