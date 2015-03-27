/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.NotificationManager');
goog.provide('rflect.cal.NotificationManager.EventTypes');

goog.require('goog.events.EventHandler');
goog.require('goog.net.WebSocket');
goog.require('goog.net.WebSocket.MessageEvent');
goog.require('goog.net.XhrIo');
goog.require('goog.testing.net.XhrIo');
goog.require('rflect.cal.events.Calendar');
goog.require('rflect.cal.events.Event');
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.require('rflect.date.Interval');



/**
 * Transport manager main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.NotificationManager = function(aViewManager, aTimeManager,
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

  /**
   * Web socket for notifications.
   * @type {goog.net.WebSocket}
   * @private
   */
  this.notificationsWebSocket_ = new goog.net.WebSocket();


  /**
   * Event handler.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.handler_ = new goog.events.EventHandler(this);
};
goog.inherits(rflect.cal.NotificationManager, goog.events.EventTarget);


/**
 * String prepended to JSON to avoid xss.
 * @type {string}
 * @const
 */
rflect.cal.NotificationManager.JSON_XSS_PREPENDER = '])}>"';


/**
 * Headers for POST request.
 * @type {Object.<string, string>}
 * @const
 */
rflect.cal.NotificationManager.DEFAULT_POST_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8'
};


/**
 * Web sockets protocol.
 * @type {string}
 * @const
 */
rflect.cal.NotificationManager.WEB_SOCKET_PROTOCOL = 'ws://';


/**
 * Web sockets port.
 * @type {number}
 * @const
 */
rflect.cal.NotificationManager.WEB_SOCKET_PORT = 3002;


/**
 * Notifications web socket path.
 * @type {string}
 * @const
 */
rflect.cal.NotificationManager.WEB_SOCKET_NOTIFICATIONS_PATH = '/notifications';


/**
 * @enum {string}
 */
rflect.cal.NotificationManager.EventTypes = {
  ASYNC_OPERATION_SUCCESS: 'asyncsuccess',
  ASYNC_OPERATION_FAILURE: 'asyncfailure',
  SAVE_EVENT: 'saveevent',
  DELETE_EVENT: 'deleteevent',
  LOAD_EVENT: 'loadevent',
  SAVE_CALENDAR: 'savecalendar',
  DELETE_CALENDAR: 'deletecalendar',
  SAVE_SETTINGS: 'savesettings',
  SAVE_USER: 'saveuser',
  NOTIFICATION_MESSAGE: 'notificationMessage'
}


/**
 * @enum {string}
 */
rflect.cal.NotificationManager.OperationUrls = {
  SAVE_EVENT: '../events/save/',
  LOAD_EVENT: '../events/load/',
  DELETE_EVENT: '../events/delete/',
  SAVE_CALENDAR: '../calendars/save/',
  DELETE_CALENDAR: '../calendars/delete/',
  SAVE_SETTINGS: '../settings/save/',
  SAVE_USER: '../user/save/'
}


/**
 * Event that is fired after save.
 * @param {number} aEventId Event id.
 * @param {string} aLongId Event long id.
 * @constructor
 */
rflect.cal.NotificationManager.SaveEventEvent = function(aEventId, aLongId) {
  this.type = rflect.cal.NotificationManager.EventTypes.SAVE_EVENT;
  this.eventId = aEventId;
  this.longId = aLongId;
}


/**
 * Event that is fired after loading of events.
 * @param {rflect.date.Interval} aInterval Interval.
 * @constructor
 */
rflect.cal.NotificationManager.LoadEventEvent = function(aInterval) {
  this.type = rflect.cal.NotificationManager.EventTypes.LOAD_EVENT;
  this.interval = aInterval;
}


/**
 * Event that is fired after delete.
 * @param {number} aEventId Event id.
 * @constructor
 */
rflect.cal.NotificationManager.DeleteEventEvent = function(aEventId) {
  this.type = rflect.cal.NotificationManager.EventTypes.DELETE_EVENT;
  this.eventId = aEventId;
}


/**
 * Event that is fired after save of calendar.
 * @param {number} aCalendarId Calendar id.
 * @param {rflect.cal.events.Calendar} aCalendar Calendar itself, to be removed
 * from pending list in settings pane.
 * @constructor
 */
rflect.cal.NotificationManager.SaveCalendarEvent = function(aCalendarId, aCalendar) {
  this.type = rflect.cal.NotificationManager.EventTypes.SAVE_CALENDAR;
  this.calendarId = aCalendarId;
  this.calendar = aCalendar;
}


/**
 * Event that is fired after delete of calendar.
 * @param {string} aCalendarId Calendar id.
 * @constructor
 */
rflect.cal.NotificationManager.DeleteCalendarEvent = function(aCalendarId) {
  this.type = rflect.cal.NotificationManager.EventTypes.DELETE_CALENDAR;
  this.calendarId = aCalendarId;
}


/**
 * Event that is fired after saving of settings.
 * @param {Object} aSettings Settings object.
 * @param {boolean} aReload Whether reload is needed after settings are applied.
 * @constructor
 */
rflect.cal.NotificationManager.SaveSettingsEvent = function(aSettings, aReload) {
  this.type = rflect.cal.NotificationManager.EventTypes.SAVE_SETTINGS;
  this.settings = aSettings;
  this.reload = aReload;
}


/**
 * Event that is fired after saving of user.
 * @param {Object} aUser User object.
 * @param {boolean} aReload Whether reload is needed after settings are applied.
 * @constructor
 */
rflect.cal.NotificationManager.SaveUserEvent = function(aUser, aReload) {
  this.type = rflect.cal.NotificationManager.EventTypes.SAVE_USER;
  this.user = aUser;
  this.reload = aReload;
}


/**
 * Event that is fired when notification comes.
 * @param {Array.<Object>} aNotification Notification message.
 * @constructor
 */
rflect.cal.NotificationManager.NotificationMessageEvent = function(aNotification) {
  this.type = rflect.cal.NotificationManager.EventTypes.NOTIFICATION_MESSAGE;
  this.notification = aNotification;
}


/**
 * @param {Object} aOperation Object to turn into JSON.
 * @return {string} JSON string.
 */
rflect.cal.NotificationManager.serialize = function(aOperation) {
  return JSON.stringify(aOperation);
}


/**
 * @param {string} aOperation String to turn into in-memory object.
 * @return {*} Object from JSON.
 */
rflect.cal.NotificationManager.parse = function(aOperation) {
  return JSON.parse(aOperation);
}


/**
 * @param {string} aResponseText Response to extract JSON from.
 * @param {boolean=} opt_dontUseXssiPrefix Whether not to use anti-xssi prefix.
 * @see {http://jeremiahgrossman.blogspot.com/2006/01/advanced-web-attack-techniques-using.html}
 */
rflect.cal.NotificationManager.getResponseJSON = function(aResponseText, 
    opt_dontUseXssiPrefix) {
  var xssiPrefix = rflect.cal.NotificationManager.JSON_XSS_PREPENDER;

  if (!opt_dontUseXssiPrefix && aResponseText.indexOf(xssiPrefix) == 0) {
    aResponseText = aResponseText.substring(xssiPrefix.length);
  }
  return rflect.cal.NotificationManager.parse(aResponseText);
}


/**
 * Saves event.
 * @param {rflect.cal.events.Event} aEvent
 */
rflect.cal.NotificationManager.prototype.saveEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.SAVE_EVENT,
      goog.bind(this.onSaveEvent_, this, aEvent.id),
      'POST',
      rflect.cal.NotificationManager.serialize(aEvent),
      rflect.cal.NotificationManager.DEFAULT_POST_HEADERS);

};


/**
 * Save event callback.
 * @param {number} aCalEventId Event id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onSaveEvent_ = function(aCalEventId, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());

  var event = this.eventManager_.getEventById(aCalEventId);

  // 200 code response could either be 0 or new event id
  if (response != 0) {
    var longId = response;

    event.longId = longId;
    this.loadedEventIds_[longId] = true;
  }

  this.eventManager_.setEventIsInProgress(aCalEventId, false);

  this.dispatchEvent(new rflect.cal.NotificationManager.SaveEventEvent(aCalEventId, longId));

};


/**
 * Deletes event.
 * @param {rflect.cal.events.Event} aEvent
 */
rflect.cal.NotificationManager.prototype.deleteEventAsync = function(aEvent) {
  this.eventManager_.setEventIsInProgress(aEvent.id, true);

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.DELETE_EVENT +
      aEvent.longId + '/',
      goog.bind(this.onDeleteEvent_, this, aEvent.id, aEvent.longId),
      'POST');

};


/**
 * Delete event callback.
 * @param {number} aCalEventId Event id.
 * @param {string} aLongId Event long id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onDeleteEvent_ = function(aCalEventId, aLongId,
    aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());
  var operationCode = response;

  if (operationCode == 0) {
    delete this.loadedEventIds_[aLongId];

    this.eventManager_.setEventIsInProgress(aCalEventId, false);
  }

  this.dispatchEvent(new rflect.cal.NotificationManager.DeleteEventEvent(aCalEventId));

};


/**
 * Loads events.
 */
rflect.cal.NotificationManager.prototype.loadEventsAsync = function() {
  var interval = this.timeManager_.interval.clone();
  var intervalIsCovered = this.intervalIsCovered_(interval);

  if (goog.DEBUG)
    _log(interval.toString() + ' is covered', intervalIsCovered);

  if (intervalIsCovered)
    return;

  var paramsVector = [];

  paramsVector[0] = interval.start;
  paramsVector[1] = interval.end;

  this.eventManager_.forEachCalendar(function(cal){
    paramsVector.push(cal.id);
  });

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.LOAD_EVENT,
      goog.bind(this.onLoadEvents_, this, interval),
      'POST',
      rflect.cal.NotificationManager.serialize(paramsVector),
      rflect.cal.NotificationManager.DEFAULT_POST_HEADERS);
};


/**
 * Load events callback.
 * @param {rflect.date.Interval} aInterval Interval, events for which were
 * loaded.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onLoadEvents_ = function(aInterval, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());
  var events = response;

  this.updateIntervals_(aInterval);

  for (var counter = 0, length = events.length; counter < length; counter++) {
    var eventObj = events[counter];
    var longId = eventObj[rflect.cal.events.Event.FIELD_ID];

    if (longId in this.loadedEventIds_)
      continue;

    this.loadedEventIds_[longId] = true;

    var event = rflect.cal.events.Event.fromJSON(eventObj);

    this.eventManager_.addEvent(event);
  }

  // We only dispatch event when interval is relevant.
  if (this.timeManager_.interval.overlaps(aInterval))
    this.dispatchEvent(new rflect.cal.NotificationManager.LoadEventEvent(aInterval));

};


/**
 * Checks whether interval is covered by loading and loading attempt is not
 * needed.
 * @param {rflect.date.Interval} aInterval Interval to check.
 * @return {boolean} Loading attempt is needed.
 * @private
 */
rflect.cal.NotificationManager.prototype.intervalIsCovered_ = function(aInterval) {

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
rflect.cal.NotificationManager.prototype.updateIntervals_ = function(aLoadedInterval) {
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
rflect.cal.NotificationManager.prototype.loadCalendars = function() {

  if (CALENDARS.length)
    goog.array.forEach(CALENDARS, function(aCalArray){
      this.eventManager_.addCalendar(
          rflect.cal.events.Calendar.fromJSON(aCalArray));
    }, this);

  /*else
    this.eventManager_.addCalendar(
        new rflect.cal.events.Calendar(goog.getUid({}).toString(), '',
        rflect.cal.i18n.PREDEFINED_COLOR_CODES[0]));*/
}


/**
 * Saves event.
 * @param {rflect.cal.events.Calendar} aCalendar
 */
rflect.cal.NotificationManager.prototype.saveCalendarAsync = function(aCalendar) {
  // New calendars won't have an id, and won't be shown on UI, so there's no
  // sense to mark them as in progress.
  aCalendar.id &&
      this.eventManager_.setCalendarIsInProgress(aCalendar.id, true);

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.SAVE_CALENDAR,
      goog.bind(this.onSaveCalendar_, this, aCalendar),
      'POST',
      rflect.cal.NotificationManager.serialize(aCalendar),
      rflect.cal.NotificationManager.DEFAULT_POST_HEADERS);

};


/**
 * Save calendar callback.
 * Only on save callback calendar-related ui appears: calendars list in left
 * pane and calendars select in creation dialog.
 *
 * @param {rflect.cal.events.Calendar} aCalendar Calendar.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onSaveCalendar_ = function(aCalendar, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());

  var calendar = aCalendar;

  // 200 code response could either be 0 or new event id
  if (response != 0) {
    var newCalendarId = response;

    calendar.id = newCalendarId;
    this.eventManager_.calendars[newCalendarId] = calendar;
  } else if (response == 0) {
    this.eventManager_.calendars[calendar.id] = calendar;
  }

  this.eventManager_.setCalendarIsInProgress(calendar.id, false);

  this.dispatchEvent(new rflect.cal.NotificationManager.SaveCalendarEvent(calendar.id,
      calendar));

};


/**
 * Deletes calendar.
 * @param {rflect.cal.events.Calendar} aCalendar
 */
rflect.cal.NotificationManager.prototype.deleteCalendarAsync = function(aCalendar) {
  this.eventManager_.setCalendarIsInProgress(aCalendar.id, true);

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.DELETE_CALENDAR +
      aCalendar.id + '/',
      goog.bind(this.onDeleteCalendar_, this, aCalendar.id),
      'POST');

};


/**
 * Delete calendar callback.
 * @param {string} aCalendarId Calendar id.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onDeleteCalendar_ = function(aCalendarId,
    aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());
  var operationCode = response;

  if (operationCode == 0) {
    this.eventManager_.setCalendarIsInProgress(aCalendarId, false);
  }

  this.dispatchEvent(new rflect.cal.NotificationManager.DeleteCalendarEvent(aCalendarId));

};


/**
 * Initializes settings from their object.
 */
rflect.cal.NotificationManager.prototype.loadSettings = function() {
}


/**
 * Saves settings.
 * @param {Object} aSettings Settings object.
 * @param {boolean} aReload Whether reload is needed after settings are saved.
 */
rflect.cal.NotificationManager.prototype.saveSettingsAsync = function(aSettings,
                                                            aReload) {

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.SAVE_SETTINGS,
      goog.bind(this.onSaveSettings_, this, aSettings, aReload),
      'POST',
      rflect.cal.NotificationManager.serialize(aSettings),
      rflect.cal.NotificationManager.DEFAULT_POST_HEADERS);

};


/**
 * Save settings callback.
 *
 * @param {Object} aSettings Settings.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onSaveSettings_ = function(aSettings, aReload,
                                                          aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());

  /*if (response == 0) {
  }*/

  this.dispatchEvent(new rflect.cal.NotificationManager.SaveSettingsEvent(aSettings, aReload));

};


/**
 * Saves user.
 * @param {Object} aUser User object.
 * @param {boolean} aReload Whether reload is needed after user is saved.
 */
rflect.cal.NotificationManager.prototype.saveUserAsync = function(aUser, aReload) {

  goog.net.XhrIo.send(rflect.cal.NotificationManager.OperationUrls.SAVE_USER,
      goog.bind(this.onSaveUser_, this, aUser, aReload),
      'POST',
      rflect.cal.NotificationManager.serialize(aUser),
      rflect.cal.NotificationManager.DEFAULT_POST_HEADERS);

};


/**
 * Save user callback.
 *
 * @param {Object} aUser User.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onSaveUser_ = function(aUser, aReload, aEvent) {
  var x = /**@type {goog.net.XhrIo}*/ (aEvent.target);

  var response = rflect.cal.NotificationManager.getResponseJSON(x.getResponseText());

  /*if (response == 0) {
  }*/

  this.dispatchEvent(new rflect.cal.NotificationManager.SaveUserEvent(aUser, aReload));

};


/**
 * Starts listening for notifications.
 */
rflect.cal.NotificationManager.prototype.enterNotificationsListening = function() {
  this.handler_.listen(this.notificationsWebSocket_,
      goog.net.WebSocket.EventType.OPENED, this.onNotificationsOpen_);
  this.handler_.listen(this.notificationsWebSocket_,
      goog.net.WebSocket.EventType.MESSAGE, this.onNotificationsMessage_);

  try {
    this.notificationsWebSocket_.open(
        rflect.cal.NotificationManager.WEB_SOCKET_PROTOCOL + location.hostname +
        ':' + rflect.cal.NotificationManager.WEB_SOCKET_PORT +
        rflect.cal.NotificationManager.WEB_SOCKET_NOTIFICATIONS_PATH);
  } catch (e) {
    if (goog.DEBUG) {
      console.log('Failed to establish websocket connection at: ', e);
    }
  }
}


/**
 * Stops listening for notifications.
 */
rflect.cal.NotificationManager.prototype.exitNotificationsListening = function() {
  this.handler_.unlisten(this.notificationsWebSocket_,
      goog.net.WebSocket.EventType.OPENED, this.onNotificationsOpen_);
  this.handler_.unlisten(this.notificationsWebSocket_,
      goog.net.WebSocket.EventType.MESSAGE, this.onNotificationsMessage_);
  this.notificationsWebSocket_.close();
}


/**
 * Notifications connection open callback.
 */
rflect.cal.NotificationManager.prototype.onNotificationsOpen_ = function() {
};


/**
 * Notifications message callback.
 * @param {goog.net.WebSocket.MessageEvent} aEvent Event object.
 */
rflect.cal.NotificationManager.prototype.onNotificationsMessage_ = function(aEvent) {
  var response = rflect.cal.NotificationManager.getResponseJSON(aEvent.message);
  this.dispatchEvent(new rflect.cal.NotificationManager.NotificationMessageEvent(
      response));
  var notificationText = response.map(aEvent =>
    aEvent.name + ' starts at ' + aEvent.start
  ).reduce((aText1, aText2) =>
    aText1 + '\n' + aText2
  )
  alert(notificationText);
};


/**
 * @override
 */
rflect.cal.NotificationManager.prototype.disposeInternal = function() {
  goog.net.XhrIo.cleanup();
  rflect.cal.NotificationManager.superClass_.disposeInternal.call(this);
  this.exitNotificationsListening();
  this.handler_.dispose();
}
