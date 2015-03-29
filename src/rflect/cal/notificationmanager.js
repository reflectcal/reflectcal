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
class NotificationManager extends goog.events.EventTarget {
  constructor(aViewManager, aTimeManager, aEventManager) {
    super();

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

    /**
     * Time that was last checked in notifications sequence.
     * @type {number}
     * @private
     */
    this.lastCheckedTime_ = 0;
  };


  /**
   * Starts listening for notifications.
   */
  enterNotificationsWatching() {
    this.handler_.listen(this.notificationsWebSocket_,
        goog.net.WebSocket.EventType.OPENED, this.onNotificationsOpen_);
    this.handler_.listen(this.notificationsWebSocket_,
        goog.net.WebSocket.EventType.MESSAGE, this.onNotificationsMessage_);

    this.watchingTimeout_ = setTimeout(this.onSecondTick_.bind(this),
        SECOND_TIMEOUT);
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


  onSecondTick_ = function() {
    var eventsToNotifyOf;
    var now = new Date;
    now.setSeconds(0);
    now.setMilliseconds(0);

    var intervalStart = now.getTime() +
        rflect.cal.NotificationManager.AlertInterval.FIFTEEN_MINUTES;

    //Allow body to run every minute.
    if (this.lastCheckedTime_ != intervalStart) {
      this.lastCheckedTime_ = intervalStart;
      this.onMinuteTick_(intervalStart);
    }
    this.watchingTimeout_ = setTimeout(this.onSecondTick_.bind(this),
        rflect.cal.NotificationManager.SECOND_TIMEOUT);
  }


  onMinuteTick_(aIntervalStart) {
    if (this.viewManager_.isInDayMode()) {

    } else if (this.viewManager_.isInWeekMode()) {

    }
    this.eventManager_
  }


  /**
   * Stops listening for notifications.
   */
  exitNotificationsWatching() {
    clearTimeout(this.watchingTimeout_);
  }


  /**
   * @override
   */
  disposeInternal = function() {
    goog.net.XhrIo.cleanup();
    super.disposeInternal();
    this.exitNotificationsListening();
    this.handler_.dispose();
  }

}


rflect.cal.NotificationManager = NotificationManager;


/**
 * Frequent check timeout.
 * @type {number}
 * @const
 */
rflect.cal.NotificationManager.SECOND_TIMEOUT = 1000;


/**
 * How much time before alert should be shown.
 * @enum {number}
 */
rflect.cal.NotificationManager.AlertInterval = {
  FIVE_MINUTES: 1000 * 60 * 5,
  TEN_MINUTES: 1000 * 60 * 10,
  FIFTEEN_MINUTES: 1000 * 60 * 15,
  THIRTY_MINUTES: 1000 * 60 * 30,
  HOUR: 1000 * 60 * 60,
  TWO_HOUR: 1000 * 60 * 60 * 2,
  ONE_DAY: 1000 * 60 * 60 * 24,
  TWO_DAYS: 1000 * 60 * 60 * 24 * 2,
  ONE_WEEK: 1000 * 60 * 60 * 24 * 7
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