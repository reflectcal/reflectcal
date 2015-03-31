/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.NotificationManager');

goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.i18n.Symbols');



/**
 * Transport manager main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {goog.events.EventTarget}
 * @unrestricted
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
  };


  /**
   * Starts listening for notifications.
   */
  enterNotificationsWatching() {
    this.watchingTimeout_ = setTimeout(this.onSecondTick_.bind(this),
        rflect.cal.NotificationManager.SECOND_TIMEOUT);
  }


  /**
   * Stops listening for notifications.
   */
  exitNotificationsWatching() {
    clearTimeout(this.watchingTimeout_);
  }


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


  onMinuteTick_(aIntervalStart, aIntervalEnd) {
    var now = new goog.date.DateTime();
    now.setTime(aIntervalStart);
    var year = now.getFullYear();
    var chips = [];

    if (goog.DEBUG)
      console.log('aIntervalStart: ', aIntervalStart);
    if (goog.DEBUG)
      console.log('aIntervalEnd: ', aIntervalEnd);
    if (goog.DEBUG)
      console.log('now: ', now);

    if (this.viewManager_.isInWeekMode()) {
      var dayOfYear = now.getDayOfYear();
      var allDayChipsInYear = this.eventManager_.allDayChipsByDay_[year];
      var chipsInYear = this.eventManager_.chipsByDay_[year];
      chips = chips.
          concat(allDayChipsInYear && allDayChipsInYear[dayOfYear] || []).
          concat(chipsInYear && chipsInYear[dayOfYear] || []);
    } else if (this.viewManager_.isInMonthMode()) {
      var weekOfYear = now.getWeekNumber();
      var weekChipsInYear = this.eventManager_.chipsByWeek_[year];
      chips = chips.
          concat(weekChipsInYear && weekChipsInYear[weekOfYear] || []);
    }

    if (goog.DEBUG)
      console.log('chips: ', chips);
    var events = chips.map(chip => this.eventManager_.events_[chip.eventId]).
        filter(event => event.startDate.getTime() >= aIntervalStart &&
            event.startDate.getTime() < aIntervalEnd);

    this.showAlert_(events, now);
  }


  showAlert_(aEvents, aDate) {
    var firstEvent = aEvents[0];

    if (firstEvent) {
      var formatStringDate = goog.i18n.DateTimeSymbols.DATEFORMATS[3].
          replace(/y+/, 'yyyy');
      var formatStringTime = goog.i18n.DateTimeSymbols.TIMEFORMATS[3];
      var otherEventsNumber = aEvents.length - 1;

      var alertText = (firstEvent.name ||
          rflect.cal.i18n.Symbols.NO_NAME_EVENT) +
          (otherEventsNumber > 0 ?
          ' and ' + otherEventsNumber + ' other events start at ' :
          ' starts at ') +
          new goog.i18n.DateTimeFormat(formatStringDate).format(aDate) + ' ' +
          new goog.i18n.DateTimeFormat(formatStringTime).format(aDate);
      alert(alertText);
    }
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