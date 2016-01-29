/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Notifications helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.NotificationManager');

goog.require('goog.array');
goog.require('goog.date.DateTime');
goog.require('goog.events.EventTarget');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.events.Alert.AlertType');



/**
 * Transport manager main class.
 * @unrestricted
 */
class NotificationManager extends goog.events.EventTarget {
  /**
   * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
   * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
   * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
   */
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
     * Time that was last checked in notifications sequence.
     * @type {number}
     * @private
     */
    this.lastCheckedTime_ = 0;

    /**
     * Watching timeout id.
     * @type {number}
     * @private
     */
    this.watchingTimeout_ = 0;

    /**
    * Whether notifications are enabled.
    * @type {boolean}
    * @private
    */
    this.notificationsEnabled_ = false;

    /**
    * Whether permission for notifications was asked.
    * @type {boolean}
    * @private
    */
    this.askedSystemNotificationsPermissionInTimeout_ = true;
  };


  /**
   * Creates a function that takes Event as a parameter and returns whether
   * event has notifications for current time and of given type.
   * @param {number} aNowTime Timestamp of current time.
   * @param {rflect.cal.events.Alert.AlertType} aType Alert type.
   * @return {function(rflect.cal.events.Event):boolean}
   */
  static eventFilterFunctionFactory(aNowTime, aType) {
    return aEvent => {
      var eventStartTime = aEvent.startDate.getTime();
      return aEvent.alerts.some(aAlert => {
        var intervalStart = aNowTime + aAlert.interval;
        var intervalEnd = intervalStart + 1000 * 60;
        return aType == aAlert.type && eventStartTime >= intervalStart &&
            eventStartTime < intervalEnd;
      });
    }
  }
  

  /**
   * Starts listening for notifications.
   */
  enterNotificationsWatching() {
    this.watchingTimeout_ = setTimeout(() => {
      this.onSecondTick_();
    }, rflect.cal.NotificationManager.SECOND_TIMEOUT);
    if (!this.askedSystemNotificationsPermissionInTimeout_) {
      setTimeout(() => {
        this.requestSystemNotification();
      }, rflect.cal.NotificationManager.ASK_FOR_NOTIFICATIONS_TIMEOUT);
      this.askedSystemNotificationsPermissionInTimeout_ = true;
    }
  }


  /**
   * Stops listening for notifications.
   */
  exitNotificationsWatching() {
    clearTimeout(this.watchingTimeout_);
  }


  /**
   * Once-a-second heartbeat.
   */
  onSecondTick_() {
    var now = new Date;
    now.setSeconds(0);
    now.setMilliseconds(0);
    var nowTime = now.getTime();

    //Allow body to run every minute.
    if (this.lastCheckedTime_ != nowTime) {
      this.lastCheckedTime_ = nowTime;
      this.onMinuteTick_(nowTime);
    }

    this.enterNotificationsWatching();
  }


  /**
   * Once-a-minute heartbeat.
   * @param {number} aNowTime Timestamp of beginning minute, .
   */
  onMinuteTick_(aNowTime) {
    var eventsWithinInterval = this.eventManager_.
        getSortedEventsForInterval(aNowTime, aNowTime +
        /**@type {number}*/ (goog.array.peek(
            rflect.cal.NotificationManager.AlertInterval)));
    var upcomingEvents = eventsWithinInterval.filter(
        rflect.cal.NotificationManager.eventFilterFunctionFactory(aNowTime,
            rflect.cal.events.Alert.AlertType.POPUP)
    );
    var playSound = eventsWithinInterval.some(
        rflect.cal.NotificationManager.eventFilterFunctionFactory(aNowTime,
            rflect.cal.events.Alert.AlertType.SOUND)
    );
    var groupedEvents = this.groupEventsByStartDate(upcomingEvents);
    if (playSound) {
      this.playSoundNotification();
    }
    this.showAlert_(groupedEvents);
  }


  /**
   * @param {Array<rflect.cal.events.Event>} aEvents Events to be grouped.
   * @return {Array<{_1: goog.date.DateTime, _2: Array<rflect.cal.events.Event>}>}
   * Events grouped in form date -> array of events for this date.
   */
  groupEventsByStartDate(aEvents) {
    var groupedEvents = [];
    //Phase 1: group events by start date.
    var eventBuckets = goog.array.bucket(aEvents, aEvent => {
      var date = new Date;
      date.setTime(aEvent.startDate.getTime());
      //We only group events with minute precision.
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.getTime();
    });
    //Phase 2: sort buckets by start date.
    for (var key in eventBuckets) {
      var date = new goog.date.DateTime();
      date.setTime(+key);
      groupedEvents.push({
        _1: date,
        _2: eventBuckets[key]
      })
    }
    return groupedEvents.sort((a, b) => {
      var aTime = a._1.getTime();
      var bTime = b._1.getTime();
      return aTime > bTime ? 1 : (aTime < bTime ? -1 : 0);
    });
  }


  /**
   * @param {Array<{_1: goog.date.DateTime, _2: Array<rflect.cal.events.Event>}>}
   * aUpcomingEvents Sequence of date -> events.
   */
  showAlert_(aUpcomingEvents) {
    var alertText = aUpcomingEvents.map(this.upcomingEventsEntryToText).
        filter(alertText => !!alertText).join('\n');

    if (alertText) {
      this.showSystemNotification(alertText);
      //To make alert show after system notification.
      setTimeout(() => {
        alert(alertText);
      }, 0);
    }
  }

  /**
   * @param {{_1: goog.date.DateTime, _2: Array<rflect.cal.events.Event>}} aEntry
   * @return {string} Alert text.
   */
  upcomingEventsEntryToText(aEntry) {
    var dateAhead = aEntry._1;
    var events = aEntry._2;
    var firstEvent = events[0];
    var alertText = "";

    if (firstEvent) {
      var formatStringDate = goog.i18n.DateTimeSymbols.DATEFORMATS[3].
          replace(/y+/, 'yyyy');
      var formatStringTime = goog.i18n.DateTimeSymbols.TIMEFORMATS[3];
      var otherEventsNumber = events.length - 1;

      alertText = (firstEvent.summary ||
          rflect.cal.i18n.Symbols.NO_NAME_EVENT) +
          (otherEventsNumber > 0 ?
          ' and ' + otherEventsNumber + ' other events start at ' :
          ' starts at ') +
          new goog.i18n.DateTimeFormat(formatStringDate).format(dateAhead) +
          ' ' +
          new goog.i18n.DateTimeFormat(formatStringTime).format(dateAhead);
    }
    return alertText;
  }


  /**
   * @return {boolean} Whether notifications API is supported.
   */
  getSystemNotificationsSupported() {
    return 'Notification' in goog.global;
  }

  /**
   * @return {boolean} Whether system notifications are enabled.
   */
  getSystemNotificationsEnabled() {
    return this.getSystemNotificationsSupported() && this.notificationsEnabled_;
  }


  /**
   * @param {function()=} opt_showSystemNotificationCallback Callback to call
   * when permission granted.
   */
  requestSystemNotification(opt_showSystemNotificationCallback) {
    if (this.getSystemNotificationsSupported() && !this.notificationsEnabled_) {
      Notification.requestPermission(() => {
        this.notificationsEnabled_ = true;
        opt_showSystemNotificationCallback &&
            opt_showSystemNotificationCallback();
      });
    }
  }


  /**
   * @param {string} aAlertText Alert text.
   */
  showSystemNotification(aAlertText) {
    if (!this.getSystemNotificationsSupported()) {
      return;
    }

    if (!this.notificationsEnabled_) {
      this.requestSystemNotification(() => {
        this.showSystemNotificationCallback(aAlertText);
      });
    } else {
      this.showSystemNotificationCallback(aAlertText);
    }
  }


  /**
   * Plays sound notification with <audio> element.
   */
  playSoundNotification() {
  }


  /**
   * @param {string} aAlertText Alert text.
   */
  showSystemNotificationCallback(aAlertText) {
    new Notification('Event', {
      body: aAlertText
    });
  }


  /**
   * @override
   */
  disposeInternal() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    this.exitNotificationsWatching();
  }
}


/**
 * @typedef {NotificationManager}
 */
rflect.cal.NotificationManager = NotificationManager;


/**
 * Frequent check timeout.
 * @type {number}
 * @const
 */
rflect.cal.NotificationManager.SECOND_TIMEOUT = 1000;


/**
 * How much time to wait till ask for system notifications permission.
 * @type {number}
 * @const
 */
rflect.cal.NotificationManager.ASK_FOR_NOTIFICATIONS_TIMEOUT = 5000;


/**
 * How much time before alert should be shown.
 * @type {Array<number>}
 * @const
 */
rflect.cal.NotificationManager.AlertInterval = [
  //Five minutes.
  1000 * 60 * 5,
  //Ten minutes.
  1000 * 60 * 10,
  //Fifteen minutes.
  1000 * 60 * 15,
  //Thirty minutes.
  1000 * 60 * 30,
  //Hour.
  1000 * 60 * 60,
  //Two hours.
  1000 * 60 * 60 * 2,
  //One day.
  1000 * 60 * 60 * 24,
  //Two days.
  1000 * 60 * 60 * 24 * 2,
  //One week.
  1000 * 60 * 60 * 24 * 7
];