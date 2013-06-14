/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TransportManager');

goog.require('goog.date.DateTime');
goog.require('rflect.structs.IntervalTree');
goog.require('rflect.cal.events.Calendar');
goog.require('rflect.cal.events.Chip');
goog.require('rflect.cal.events.Event');
goog.require('rflect.cal.events.EventHolder');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.require('rflect.cal.predefined.chips');
goog.require('rflect.object');



/**
 * Transport manager main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.TransportManager = function(aViewManager, aTimeManager) {
  goog.events.EventTarget.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

};
goog.inherits(rflect.cal.TransportManager, goog.events.EventTarget);


/**
 * @enum {string}
 */
rflect.cal.TransportManager.EventTypes = {
  ASYNC_OPERATION_SUCCESS: 'asyncsuccess',
  ASYNC_OPERATION_FAILURE: 'asyncfailure'
}


/**
 * @enum {string}
 */
rflect.cal.TransportManager.OperationUrls = {
  SAVE_EVENT: 'events/save',
  LOAD_EVENT: 'events/load',
  DELETE_EVENT: 'events/delete'
}


/**
 * Saves event.
 * @returns {number} Event id.
 */
rflect.cal.TransportManager.saveEventAsync = function(aEvent) {

};


rflect.cal.TransportManager.onSaveEvent_ = function(aEvent) {

};


/**
 * @override
 */
rflect.cal.TransportManager.prototype.disposeInternal = function() {


  rflect.cal.TransportManager.superClass_.disposeInternal.call(this);
}
