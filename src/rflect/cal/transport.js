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
goog.require('rflect.cal.events.Event');
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.date.Interval');



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
  this.loadedEventIds_ = {};
};
goog.inherits(rflect.cal.Transport, goog.events.EventTarget);


/**
 * String prepended to JSON to avoid xss.
 * @type {string}
 * @const
 */
rflect.cal.Transport.JSON_XSS_PREPENDER = '}>';


/**
 * @enum {string}
 */
rflect.cal.Transport.EventTypes = {
  ASYNC_OPERATION_SUCCESS: 'asyncsuccess',
  ASYNC_OPERATION_FAILURE: 'asyncfailure',
  SAVE_EVENT: 'saveevent',
  DELETE_EVENT: 'deleteevent',
  LOAD_EVENT: 'loadevent'
}


/**
 * @enum {string}
 */
rflect.cal.Transport.OperationUrls = {
  SAVE_EVENT: '../events/save/',
  LOAD_EVENT: '../events/load/',
  DELETE_EVENT: '../events/delete/'
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
 * @param {rflect.date.Interval} aInterval Interval.
 * @constructor.
 */
rflect.cal.Transport.LoadEvent = function(aInterval) {
  this.type = rflect.cal.Transport.EventTypes.LOAD_EVENT;
  this.interval = aInterval;
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
 * @param {boolean=} opt_dontUseXssiPrefix Whether not to use anti-xssi prefix.
 * @see {http://jeremiahgrossman.blogspot.com/2006/01/advanced-web-attack-techniques-using.html}
 */
rflect.cal.Transport.getResponseJSON = function(x, opt_dontUseXssiPrefix) {
  var responseText = x.getResponseText();
  var xssiPrefix = rflect.cal.Transport.JSON_XSS_PREPENDER;

  if (!opt_dontUseXssiPrefix && responseText.indexOf(xssiPrefix) == 0) {
    responseText = responseText.substring(xssiPrefix.length);
  }
  return rflect.cal.Transport.parse(responseText);
}


/**
 * Saves event.
 * @param {rflect.cal.events.Event} Event.
 */
rflect.cal.Transport.prototype.saveEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

  var headers = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  goog.net.XhrIo.send(rflect.cal.Transport.OperationUrls.SAVE_EVENT,
      goog.bind(this.onSaveEvent_, this, aEvent.id),
      'POST',
      rflect.cal.Transport.serialize(aEvent), headers);

};


/**
 * Save event callback.
 * @param {number} aCalEventId Event id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.Transport.prototype.onSaveEvent_ = function(aCalEventId, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.Transport.getResponseJSON(x);

  var event = this.eventManager_.getEventById(aCalEventId);

  // 200 code response could either be 0 or new event id
  if (response != 0) {
    var longId = response;

    event.longId = longId;
    this.loadedEventIds_[longId] = true;
  }

  this.eventManager_.setEventIsInProgress(aCalEventId, false);

  this.dispatchEvent(new rflect.cal.Transport.SaveEvent(aCalEventId, longId));

};


/**
 * Deletes event.
 * @param {rflect.cal.events.Event} Event.
 */
rflect.cal.Transport.prototype.deleteEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

  goog.net.XhrIo.send(rflect.cal.Transport.OperationUrls.DELETE_EVENT +
      aEvent.longId + '/',
      goog.bind(this.onDeleteEvent_, this, aEvent.id, aEvent.longId),
      'GET');

};


/**
 * Delete event callback.
 * @param {number} aCalEventId Event id.
 * @param {string} aLongId Event long id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.Transport.prototype.onDeleteEvent_ = function(aCalEventId, aLongId,
    aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.Transport.getResponseJSON(x);
  var operationCode = response;

  if (operationCode == 0) {
    delete this.loadedEventIds_[aLongId];

    this.eventManager_.setEventIsInProgress(aCalEventId, false);
  }

  this.dispatchEvent(new rflect.cal.Transport.DeleteEvent(aCalEventId));

};


/**
 * Loads events.
 */
rflect.cal.Transport.prototype.loadEventsAsync = function() {
  var interval = this.timeManager_.interval.clone();
  var intervalIsCovered = this.intervalIsCovered_(interval);

  if (goog.DEBUG)
    _log(interval.toString() + ' is covered', intervalIsCovered);

  if (intervalIsCovered)
    return;

  goog.net.XhrIo.send(rflect.cal.Transport.OperationUrls.LOAD_EVENT +
      interval.start + '-' + interval.end + '/',
      goog.bind(this.onLoadEvents_, this, interval),
      'GET');
};


/**
 * Load events callback.
 * @param {rflect.date.Interval} aInterval Interval, events for which were
 * loaded.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.Transport.prototype.onLoadEvents_ = function(aInterval, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.Transport.getResponseJSON(x);
  var events = response;

  this.updateIntervals_(aInterval);

  for (var counter = 0, length = events.length; counter < length; counter++) {
    var eventObj = events[counter];
    var longId = eventObj[rflect.cal.events.Event.FIELD_ID];

    if (longId in this.loadedEventIds_)
      continue;

    this.loadedEventIds_[longId] = true;

    var event = rflect.cal.events.EventManager.createEventFromArray(eventObj);

    this.eventManager_.addEvent(event);
  }

  // We only dispatch event when interval is relevant.
  if (this.timeManager_.interval.overlaps(aInterval))
    this.dispatchEvent(new rflect.cal.Transport.LoadEvent(aInterval));

};


/**
 * Checks whether interval is covered by loading and loading attempt is not
 * needed.
 * @param {rflect.date.Interval} aInterval Interval to check.
 * @return {boolean} Loading attempt is needed.
 * @private
 */
rflect.cal.Transport.prototype.intervalIsCovered_ = function(aInterval) {

  for (var counter = 0, length = this.updatedIntervals_.length;
      counter < length; counter++) {

    var interval = this.updatedIntervals_[counter];
    // If interval is already covered, there's nothing to do here.
    if (interval.contains(aInterval))
      return true;
  }

  return false;

};


/**
 * Updates intervals covered by loading.
 * @param {rflect.date.Interval} aLoadedInterval Interval which was covered by
 * loading.
 * @private
 */
rflect.cal.Transport.prototype.updateIntervals_ = function(aLoadedInterval) {
  var intersectionIndexes = [];
  var min = aLoadedInterval.start;
  var max = aLoadedInterval.end;

  var notPresent = true;
  for (var counter = 0, length = this.updatedIntervals_.length;
      counter < length; counter++) {

    var interval = this.updatedIntervals_[counter];

    if (goog.DEBUG) {
      _log(interval.toString() + ' abuts ' + aLoadedInterval.toString(),
          interval.abuts(aLoadedInterval));
      _log(interval.toString() + ' overlaps ' + aLoadedInterval.toString(),
          interval.overlaps(aLoadedInterval));
      _log(interval.toString() + ' contains ' + aLoadedInterval.toString(),
          interval.contains(aLoadedInterval));
    }

    // If interval is already covered, there's nothing to do here.
    if (interval.contains(aLoadedInterval)) {
      notPresent = false;
      break;
    }

    if (interval.abuts(aLoadedInterval) ||
        interval.overlaps(aLoadedInterval)) {


      notPresent = false;

      if (interval.start < min) min = interval.start;
      if (interval.end > max) max = interval.end;

      intersectionIndexes.push(counter);
    }
  }

  if (goog.DEBUG)
    _log('notPresent', notPresent);

  // If there are no overlaps, just add new interval.
  if (notPresent) {

    this.updatedIntervals_.push(aLoadedInterval);
    if (goog.DEBUG)
      _log('new interval added', aLoadedInterval.toString());

  } else if (intersectionIndexes.length) {

    if (goog.DEBUG) {
      goog.array.forEach(intersectionIndexes, function(index) {
        _log('this interval will be removed',
            this.updatedIntervals_[index].toString());
      }, this);
    }

    // Of all intersections, we form new interval.
    intersectionIndexes.sort();
    for (var counter = intersectionIndexes.length - 1; counter >= 0;
        counter--) {
      this.updatedIntervals_.splice(intersectionIndexes[counter], 1);
    }
    var replacementInterval = new rflect.date.Interval(min, max);

    if (goog.DEBUG)
      _log('and this will be added instead', replacementInterval.toString());

    this.updatedIntervals_.push(replacementInterval);
  }

};


/**
 * Initializes calendars from their list.
 */
rflect.cal.Transport.prototype.loadCalendars = function() {

  if (goog.global.CALENDARS && goog.global.CALENDARS.length)
    goog.array.forEach(goog.global.CALENDARS, function(aCalArray){
      this.eventManager_.addCalendar(
          this.eventManager_.createCalendarFromArray(aCalArray));
    }, this);

  else
    this.eventManager_.addCalendar(this.eventManager_.createCalendar(0));
}


/**
 * @override
 */
rflect.cal.Transport.prototype.disposeInternal = function() {
  goog.net.XhrIo.cleanup();

  rflect.cal.Transport.superClass_.disposeInternal.call(this);
}
