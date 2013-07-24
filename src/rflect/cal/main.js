/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar main class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.Main');

goog.require('goog.Disposable');
goog.require('rflect.cal.ViewManager');



/**
 * Main class.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.Main = function Main_constructor() {

  /**
   * View manager instance.
   * @type {rflect.cal.ViewManager}
   */
  this.viewManager = new rflect.cal.ViewManager(this);

  if (goog.DEBUG)
    _inspect('viewManager', this.viewManager);
};
goog.inherits(rflect.cal.Main, goog.Disposable);


/**
 * Disposes of the main instance.
 * @override
 * @protected
 */
rflect.cal.Main.prototype.disposeInternal = function() {
  rflect.cal.Main.superClass_.disposeInternal.call(this);

  this.viewManager.dispose();
  this.viewManager = null;
};
