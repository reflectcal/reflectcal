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

  /**
   * Set of intervals that were already updated.
   * @type {Array.<rflect.date.Interval>}
   * @private
   */
  this.updatedIntervals_ = [];

  /**
   * Set of event ids that already present.
   * @type {Object.<string, boolean>}
   * @private
   */
  this.loadedEventsIds_ = {};
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
 * Checks whether interval is not covered by loading and loading attempt is
 * needed.
 * @param {rflect.date.Interval} Interval to check.
 * @return {boolean} Loading attempt is needed.
 */
rflect.cal.Transport.prototype.intervalIsNotCovered = function(aInterval) {

  for (var counter = 0, length = this.updatedIntervals_.length;
      counter < length; counter++) {

    var interval = this.updatedIntervals_[counter];
    // If interval is already covered, there's nothing to do here.
    if (interval.contains(aInterval))
      return false;
  }

 return true;

};


/**
 * Updates intervals covered by loading.
 * @param {rflect.date.Interval} Interval which was covered by loading.
 */
rflect.cal.Transport.prototype.updateIntervals = function(aLoadedInterval) {

  var intersectionIndexes = [];
  var min = aLoadedInterval.start;
  var max = aLoadedInterval.end;

  var notPresent = false;
  for (var counter = 0, length = this.updatedIntervals_.length;
      counter < length; counter++) {

    var interval = this.updatedIntervals_[counter];
    // If interval is already covered, there's nothing to do here.
    if (interval.contains(aLoadedInterval))
      break;

    if (interval.abuts(aLoadedInterval) ||
        interval.overlaps(aLoadedInterval)) {

      if (interval.start < min) min = interval.start;
      if (interval.end > max) max = interval.end;

      intersectionIndexes.push(counter);

    } else
      notPresent = true;
  }

  // If there are no overlaps, just add new interval.
  if (notPresent)
    this.updatedIntervals_.push(interval);
  else if (intersectionIndexes.length) {
    // Of all intersections, we form new interval.
    intersectionIndexes.sort();
    for (var counter = intersectionIndexes.length - 1; counter >= 0;
        counter--) {
      this.updatedIntervals_.splice(intersectionIndexes[counter], 1);
    }
    this.updatedIntervals_.push(new rflect.date.Interval(min, max));
  }

};


/**
 * @override
 */
rflect.cal.Transport.prototype.disposeInternal = function() {
  goog.net.XhrIo.cleanup();

  rflect.cal.Transport.superClass_.disposeInternal.call(this);
}
