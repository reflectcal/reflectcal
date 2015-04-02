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
  };


  /**
   * Starts listening for notifications.
   */
  enterNotificationsWatching() {
    this.watchingTimeout_ = setTimeout(() => {
      this.onSecondTick_();
    }, rflect.cal.NotificationManager.SECOND_TIMEOUT);
    setTimeout(() => {
      this.requestSystemNotification();
    }, rflect.cal.NotificationManager.ASK_FOR_NOTIFICATIONS_TIMEOUT);
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

    var intervalStart = now.getTime() +
        rflect.cal.NotificationManager.AlertInterval.FIFTEEN_MINUTES;
    var intervalEnd = intervalStart + 1000 * 60;

    //Allow body to run every minute.
    if (this.lastCheckedTime_ != intervalStart) {
      this.lastCheckedTime_ = intervalStart;
      this.onMinuteTick_(intervalStart, intervalEnd);
    }

    this.enterNotificationsWatching();
  }


  /**
   * Once-a-minute heartbeat.
   * @param {number} aIntervalStart Start of the interval to check upcoming
   * events.
   * @param {number} aIntervalEnd End of the interval to check upcoming events.
   */
  onMinuteTick_(aIntervalStart, aIntervalEnd) {
    var dateAhead = new goog.date.DateTime();
    dateAhead.setTime(aIntervalStart);
    var year = dateAhead.getFullYear();
    var chips = [];

    if (goog.DEBUG)
      console.log('aIntervalStart: ', aIntervalStart);
    if (goog.DEBUG)
      console.log('aIntervalEnd: ', aIntervalEnd);
    if (goog.DEBUG)
      console.log('dateAhead: ', dateAhead);

    if (this.viewManager_.isInWeekMode()) {
      var dayOfYear = dateAhead.getDayOfYear();
      var allDayChipsInYear = this.eventManager_.getAllDayChipsByDay()[year];
      var chipsInYear = this.eventManager_.getChipsByDay()[year];
      chips = chips.
          concat(allDayChipsInYear && allDayChipsInYear[dayOfYear] || []).
          concat(chipsInYear && chipsInYear[dayOfYear] || []);
    } else if (this.viewManager_.isInMonthMode()) {
      var weekOfYear = dateAhead.getWeekNumber();
      var weekChipsInYear = this.eventManager_.getChipsByWeek()[year];
      chips = chips.
          concat(weekChipsInYear && weekChipsInYear[weekOfYear] || []);
    }

    if (goog.DEBUG)
      console.log('chips: ', chips);
    var events = chips.map(chip =>
        this.eventManager_.getEvents()[chip.eventId]).
        filter(event => event.startDate.getTime() >= aIntervalStart &&
            event.startDate.getTime() < aIntervalEnd);

    this.showAlert_(events, dateAhead);
  }


  /**
   * Shows alerts - window.alert and system notification, where possible.
   * @param {Array.<rflect.cal.events.Event>} aEvents Events.
   * @param {goog.date.DateTime} aDateAhead Start of interval in
   * which events will occur.
   */
  showAlert_(aEvents, aDateAhead) {
    var firstEvent = aEvents[0];

    if (firstEvent) {
      var formatStringDate = goog.i18n.DateTimeSymbols.DATEFORMATS[3].
          replace(/y+/, 'yyyy');
      var formatStringTime = goog.i18n.DateTimeSymbols.TIMEFORMATS[3];
      var otherEventsNumber = aEvents.length - 1;

      var alertText = (firstEvent.summary ||
          rflect.cal.i18n.Symbols.NO_NAME_EVENT) +
          (otherEventsNumber > 0 ?
          ' and ' + otherEventsNumber + ' other events start at ' :
          ' starts at ') +
          new goog.i18n.DateTimeFormat(formatStringDate).format(aDateAhead) +
          ' ' +
          new goog.i18n.DateTimeFormat(formatStringTime).format(aDateAhead);
      this.showSystemNotification(alertText);
      alert(alertText);
    }
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