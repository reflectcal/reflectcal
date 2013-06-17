/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TransportManager');

goog.require('goog.net.XhrIo');



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
  ASYNC_OPERATION_FAILURE: 'asyncfailure',
  SAVE_EVENT: 'saveevent'
}


/**
 * @enum {string}
 */
rflect.cal.TransportManager.OperationUrls = {
  SAVE_EVENT: '//events/save',
  LOAD_EVENT: '//events/load',
  DELETE_EVENT: '//events/delete'
}


rflect.cal.TransportManager.SaveEvent = function(aEventId, aLongId) {
  this.type = rflect.cal.TransportManager.EventTypes.SAVE_EVENT;
  this.eventId = aEventId;
  this.longId = aLongId;
}


rflect.cal.TransportManager.serialize = function(aOperation) {

}


rflect.cal.TransportManager.parse = function(aOperation) {

}


/**
 * Saves event.
 * @param {rflect.cal.events.Event} Event.
 */
rflect.cal.TransportManager.prototype.saveEventAsync = function(aEvent) {
  goog.net.XhrIo.send(rflect.cal.TransportManager.OperationUrls.SAVE_EVENT,
      goog.bind(this.onSaveEvent_, this),
      'POST',
      rflect.cal.TransportManager.serialize(aEvent));
};


/**
 * Save event callback.
 * @param {goog.net.XhrIo} x Xhr instance.
 */
rflect.cal.TransportManager.prototype.onSaveEvent_ = function(x) {

  var response = x.getResponseJson();
  var eventId = response.eventId;
  var longId = response.longId;

  if (goog.DEBUG) {
    _inspect('_response', aResponse);
  }

  var event = this.eventManager_.getEventById(eventId);
  event.longId = longId

  this.dispatchEvent(
      new rflect.cal.TransportManager.SaveEvent(eventId, longId));

};


/**
 * @override
 */
rflect.cal.TransportManager.prototype.disposeInternal = function() {
  goog.net.XhrIo.cleanup();

  rflect.cal.TransportManager.superClass_.disposeInternal.call(this);
}
