/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Time manager calculates dates for views and performs
 * time-related calculations.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TimeManager');

goog.require('goog.date');
goog.require('goog.date.Date');
goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.ViewType');
goog.require('rflect.date');
goog.require('rflect.date.Date');
goog.require('rflect.math');



/**
 * Time manager main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {goog.date.DateLike=} opt_date Date to start application with.
 * @constructor
 */
rflect.cal.TimeManager = function(aViewManager, opt_date) {

  this.viewManager_ = aViewManager;

  this.symbols_ = goog.i18n.DateTimeSymbols;
  this.daySeries = [];

  this.setBasis(opt_date);
};


/**
 * Configurations of time manager.
 * @enum {number}
 */
rflect.cal.TimeManager.Configuration = {
  NONE: 0,
  DAY: 1,
  WEEK: 2,
  MONTH: 3,
  YEAR: 4
  MULTI_DAY: 5,
  MULTI_WEEK: 6,
  MINI_MONTH: 7
};


/**
 * Link to view manager.
 * @type {rflect.cal.ViewManager}
 * @private
 */
rflect.cal.TimeManager.prototype.viewManager_ = null;


/**
 * Whether we're on startup.
 * @type {boolean}
 * @private
 */
rflect.cal.TimeManager.prototype.isOnStartup_ = false;


/**
 * Day within interval, on which latter is based.
 * @type {goog.date.DateLike}
 * @private
 */
rflect.cal.TimeManager.prototype.basis = null;


/**
 * Sequence of dates to be used in grid.
 * @type {Array.<goog.date.Date>}
 */
rflect.cal.TimeManager.prototype.daySeries = null;


/**
 * Sets date at the beginning of time period, basis for all calculations.
 */
rflect.cal.TimeManager.prototype.calculatePeriodStart = function() {

  switch (this.viewManager_.currentView) {
    case rflect.cal.ViewType.DAY: this.start_ = this.basis.clone();break;
    case rflect.cal.ViewType.WEEK: {
      this.start_ = rflect.date.moveToDayOfWeekIfNeeded(this.basis,
          0, -1);
    }; break;
    case rflect.cal.ViewType.MONTH: {
      this.start_ = this.basis.clone();
      // Move to first day of month.
      this.start_.setDate(1);
      // Move to first day of week containing month.
      this.start_ = rflect.date.moveToDayOfWeekIfNeeded(this.start_, 0,
          -1);
    };
    break;
    case rflect.cal.ViewType.YEAR: break;
    default: break;
  }
};


/**
 * Creates array of dates which represent all dates in given view time interval.
 */
rflect.cal.TimeManager.prototype.generateDaySeries = function() {
  var daysNumber = 0;
  switch (this.viewManager_.currentView) {
    case rflect.cal.ViewType.DAY: daysNumber = 1; break;
    case rflect.cal.ViewType.WEEK: daysNumber = 7; break;
    case rflect.cal.TimeManager.Configuration.MINI_MONTH:
    case rflect.cal.ViewType.MONTH: {
      var difference = 0;
      var firstDayOfMonth = this.basis.clone();
      firstDayOfMonth.setDate(1);
      // We need to make number (days_before_first_day_of_month + days_in_month
      // + days_after_last_day_of_month) divisible by 7.
      // TODO(alexk):  draw by week.
      if (!this.start_.equals(firstDayOfMonth)) {
        // Start always has lower weekday number than first day of month, so
        // it's safe to subtract former from the latter.
        difference = firstDayOfMonth.getWeekday() - this.start_.getWeekday();
      }
      daysNumber = rflect.math.completeToDivisibleBy7(difference +
          goog.date.getNumberOfDaysInMonth(this.basis.getFullYear(),
              this.basis.getMonth()));
    };
    break;
    case rflect.cal.ViewType.YEAR: break;
    default: break;
  }



  this.daySeries.length = 0;
  var date = new rflect.date.Date(this.start_);
  for (var counter = 0; counter < daysNumber; counter++) {
    this.daySeries[counter] = date;
    date = rflect.date.getTomorrow(date);
  }
};


/**
 * Runs time manager, main sequence method.
 * @param {number=} aDirection Direction of shift - 1 is forward, -1 is
 * backward.
 */
rflect.cal.TimeManager.prototype.run = function(aDirection) {
  this.calculatePeriodStart();
  this.generateDaySeries();
};


/**
 * Shifts time manager by one interval.
 * @param {boolean} aForward Whether to shift forward.
 */
rflect.cal.TimeManager.prototype.shift = function(aForward) {
  this.shiftBasis(aForward);
  this.run();
};


/**
 * Shifts time manager to specific point.
 * @param {goog.date.DateLike=} opt_date Date to shift to.
 */
rflect.cal.TimeManager.prototype.shiftToPoint = function(opt_date) {
  this.setBasis(opt_date);
  this.run();
};


/**
 * @return {boolean} Whether interval we're in covers current moment.
 */
rflect.cal.TimeManager.prototype.isInNowPoint = function() {
  // TODO(alexk): Make this check using datetime?
  var now = new goog.date.Date();
  var daySeriesLength = this.daySeries.length;
  return !!daySeriesLength && (this.daySeries[0] <= now &&
      this.daySeries[daySeriesLength - 1] > now ||
      this.daySeries[0].equals(now));
};


/**
 * Shifts time manager to current moment.
 */
rflect.cal.TimeManager.prototype.shiftToNow = function() {
  this.shiftToPoint();
};


/**
 * Shifts basis by one interval.
 */
rflect.cal.TimeManager.prototype.shiftBasis = function(aForward) {
  var daysNumber = 0;
  switch (this.viewManager_.currentView) {
    case rflect.cal.ViewType.DAY: {
      daysNumber = 1 * (aForward ? 1 : -1);
      this.basis.add(new goog.date.Interval(0, 0, daysNumber));
    }; break;
    case rflect.cal.ViewType.WEEK: {
      daysNumber = 7 * (aForward ? 1 : -1);
      this.basis.add(new goog.date.Interval(0, 0, daysNumber));
    }; break;
    case rflect.cal.ViewType.MONTH: {
      this.basis.add(new goog.date.Interval(0,
          1 * (aForward ? 1 : -1)));
    }; break;
    case rflect.cal.ViewType.YEAR: {
      this.basis.add(new goog.date.Interval(1 * (aForward ? 1 : -1)));
    }; break;
    default: break;
  }
};


/**
 * Sets basis to specific date.
 * @param {goog.date.DateLike=} opt_date Date to set basis to.
 */
rflect.cal.TimeManager.prototype.setBasis = function(opt_date) {
  this.basis = opt_date || new goog.date.Date();
  this.basis.setFirstWeekCutOffDay(this.symbols_.FIRSTWEEKCUTOFFDAY);
  this.basis.setFirstDayOfWeek(this.symbols_.FIRSTDAYOFWEEK);
};
