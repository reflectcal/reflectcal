/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Notifications helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.NotificationManager');

goog.require('goog.date.DateTime');
goog.require('goog.events.EventTarget');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.i18n.Symbols');



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

    //Allow body to run every minute.
    if (this.lastCheckedTime_ != now.getTime()) {
      this.lastCheckedTime_ = now.getTime();
      this.onMinuteTick_();
    }

    this.enterNotificationsWatching();
  }


  /**
   * Once-a-minute heartbeat.
   */
  onMinuteTick_() {

    var upcomingEvents = rflect.cal.NotificationManager.AlertInterval.map(
        alertInterval => {
      var dateAhead = new goog.date.DateTime();
      dateAhead.setSeconds(0);
      dateAhead.setMilliseconds(0);

      dateAhead.setTime(dateAhead.getTime() + alertInterval);
      var events = this.getEventsForDate(dateAhead);
      if (goog.DEBUG)
        console.log('dateAhead: ', dateAhead);
      if (goog.DEBUG)
        console.log('upcomingEvents: ', events);
      return {_1: dateAhead, _2: events};
    });
    this.showAlert_(upcomingEvents);
  }


  /**
   * @param {goog.date.DateTime} aDateAhead Date for which to extract chips.
   * @return {Array.<rflect.cal.events.Chip>}
   * Date -> chips.
   */
  getChipsForDate(aDateAhead) {
    var year = aDateAhead.getFullYear();
    var chips = [];

    if (this.viewManager_.isInWeekMode()) {
      var dayOfYear = aDateAhead.getDayOfYear();
      var allDayChipsInYear = this.eventManager_.getAllDayChipsByDay()[year];
      var chipsInYear = this.eventManager_.getChipsByDay()[year];
      chips = chips.
          concat(allDayChipsInYear && allDayChipsInYear[dayOfYear] || []).
          concat(chipsInYear && chipsInYear[dayOfYear] || []);
    } else if (this.viewManager_.isInMonthMode()) {
      var weekOfYear = aDateAhead.getWeekNumber();
      var weekChipsInYear = this.eventManager_.getChipsByWeek()[year];
      chips = chips.
          concat(weekChipsInYear && weekChipsInYear[weekOfYear] || []);
    }
    return chips;
  }

  /**
   * @param {goog.date.DateTime} aDateAhead
   * @return {Array.<rflect.cal.events.Event>}
   */
  getEventsForDate(aDateAhead) {
    var intervalStart = aDateAhead.getTime();
    var intervalEnd = intervalStart + 1000 * 60;
    var events = this.getChipsForDate(aDateAhead).map(chip =>
        this.eventManager_.getEvents()[chip.eventId]).
        filter(event => event && event.startDate.getTime() >= intervalStart &&
            event.startDate.getTime() < intervalEnd);

    return events;
  }


  /**
   * @param {Array.<{_1: goog.date.DateTime, _2: Array.<rflect.cal.events.Event>}>}
   * aUpcomingEvents Sequence of date -> events.
   */
  showAlert_(aUpcomingEvents) {
    var alertText = aUpcomingEvents.map(this.upcomingEventsEntryToText).
        filter(alertText => !!alertText).join('\n');

    if (goog.DEBUG)
      console.log('alertText: ', alertText);

    if (alertText) {
      this.showSystemNotification(alertText);
      //To make alert show after system notification.
      setTimeout(() => {
        alert(alertText);
      }, 0);
    }
  }

  /**
   * @param {{_1: goog.date.DateTime, _2: Array.<rflect.cal.events.Event>}} aEntry
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
    super.disposeInternal();
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
 * @type {Array.<number>}
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