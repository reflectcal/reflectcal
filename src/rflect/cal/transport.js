/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.Transport');
goog.provide('rflect.cal.Transport.EventTypes');

goog.require('goog.net.XhrIo');
goog.require('goog.testing.net.XhrIo');



/**
 * Transport manager main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.Transport = function(aViewManager, aTimeManager,
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

  /**
   * Send implementation.
   * @type {Function}
   * @private
   */
  this.send_ = goog.net.XhrIo.send;
};
goog.inherits(rflect.cal.Transport, goog.events.EventTarget);


/**
 * @enum {string}
 */
rflect.cal.Transport.EventTypes = {
  ASYNC_OPERATION_SUCCESS: 'asyncsuccess',
  ASYNC_OPERATION_FAILURE: 'asyncfailure',
  SAVE_EVENT: 'saveevent',
  DELETE_EVENT: 'deleteevent'
}


/**
 * @enum {string}
 */
rflect.cal.Transport.OperationUrls = {
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
rflect.cal.Transport.SaveEvent = function(aEventId, aLongId) {
  this.type = rflect.cal.Transport.EventTypes.SAVE_EVENT;
  this.eventId = aEventId;
  this.longId = aLongId;
}


/**
 * Event that is fired after delete.
 * @param {number} aEventId Event id.
 * @constructor.
 */
rflect.cal.Transport.DeleteEvent = function(aEventId) {
  this.type = rflect.cal.Transport.EventTypes.DELETE_EVENT;
  this.eventId = aEventId;
}


/**
 * @param {Object} aOperation Object to turn into JSON.
 * @return {string} JSON string.
 */
rflect.cal.Transport.serialize = function(aOperation) {
  return JSON.stringify(aOperation);
}


/**
 * @param {string} aOperation String to turn into in-memory object.
 * @return {*} Object from JSON.
 */
rflect.cal.Transport.parse = function(aOperation) {
  return JSON.parse(aOperation);
}


/**
 * @param {goog.net.XhrIo} x Response to extract JSON from.
 */
rflect.cal.Transport.getResponseJSON = function(x) {
  return rflect.cal.Transport.parse(x.getResponseText());
}


/**
 * Saves event.
 * @param {rflect.cal.events.Event} Event.
 */
rflect.cal.Transport.prototype.saveEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

  goog.testing.net.XhrIo.send(rflect.cal.Transport.OperationUrls.SAVE_EVENT,
      goog.bind(this.onSaveEvent_, this, aEvent.id),
      'POST',
      rflect.cal.Transport.serialize(aEvent), null);

  setTimeout(function(){

    var sendInstances = goog.testing.net.XhrIo.getSendInstances();
    var xhr = sendInstances[sendInstances.length - 1];
    xhr.simulateResponse(200, '{"longId":""}');

  }, 5000);
};


/**
 * Save event callback.
 * @param {number} aCalEventId Event id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.Transport.prototype.onSaveEvent_ = function(aCalEventId, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.Transport.getResponseJSON(x);
  var longId = response.longId;

  var event = this.eventManager_.getEventById(aCalEventId);
  event.longId = longId
  this.eventManager_.setEventIsInProgress(aCalEventId, false);

  this.dispatchEvent(new rflect.cal.Transport.SaveEvent(aCalEventId, longId));

};


/**
 * Deletes event.
 * @param {rflect.cal.events.Event} Event.
 */
rflect.cal.Transport.prototype.deleteEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

  goog.testing.net.XhrIo.send(rflect.cal.Transport.OperationUrls.DELETE_EVENT +
      '?longId=' + aEvent.longId,
      goog.bind(this.onDeleteEvent_, this, aEvent.id),
      'GET');

  setTimeout(function(){

    var sendInstances = goog.testing.net.XhrIo.getSendInstances();
    var xhr = sendInstances[sendInstances.length - 1];
    xhr.simulateResponse(200, '0');

  }, 5000);
};


/**
 * Delete event callback.
 * @param {number} aCalEventId Event id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.Transport.prototype.onDeleteEvent_ = function(aCalEventId, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.Transport.getResponseJSON(x);
  var operationCode = response;

  if (operationCode == 0)
    this.eventManager_.setEventIsInProgress(aCalEventId, false);

  this.dispatchEvent(new rflect.cal.Transport.DeleteEvent(aCalEventId));

};


/**
 * @override
 */
rflect.cal.Transport.prototype.disposeInternal = function() {
  goog.net.XhrIo.cleanup();

  rflect.cal.Transport.superClass_.disposeInternal.call(this);
}
