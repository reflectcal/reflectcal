/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TransportManager');
goog.provide('rflect.cal.TransportManager.EventTypes');

goog.require('goog.net.XhrIo');



/**
 * Transport manager main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.TransportManager = function(aViewManager, aTimeManager,
    aEventManager) {
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

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

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


/**
 * Event that is fired after save.
 * @param {number} aEventId Event id.
 * @param {string} aLongId Event long id.
 * @constructor.
 */
rflect.cal.TransportManager.SaveEvent = function(aEventId, aLongId) {
  this.type = rflect.cal.TransportManager.EventTypes.SAVE_EVENT;
  this.eventId = aEventId;
  this.longId = aLongId;
}


/**
 * @param {Object} aOperation Object to turn into JSON.
 * @return {string} JSON string.
 */
rflect.cal.TransportManager.serialize = function(aOperation) {
  return JSON.stringify(aOperation);
}


/**
 * @param {string} aOperation String to turn into in-memory object.
 * @return {*} Object from JSON.
 */
rflect.cal.TransportManager.parse = function(aOperation) {
  return JSON.parse(aOperation);
}

/**
 * @param {goog.net.XhrIo} x Response to extract JSON from.
 */
rflect.cal.TransportManager.getResponseJSON = function(x) {
  return rflect.cal.TransportManager.parse(x.getResponseText());
}


/**
 * Saves event.
 * @param {rflect.cal.events.Event} Event.
 */
rflect.cal.TransportManager.prototype.saveEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

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

  var response = rflect.cal.TransportManager.getResponseJSON(x);
  var eventId = response.eventId;
  var longId = response.longId;

  var event = this.eventManager_.getEventById(eventId);
  event.longId = longId
  this.eventManager_.setEventIsInProgress(eventId, false);

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
