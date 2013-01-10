/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Time manager calculates dates for views and performs
 * time-related calculations.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TimeManager');
goog.provide('rflect.cal.TimeManager.Direction');

goog.require('goog.array');
goog.require('goog.date');
goog.require('goog.date.Date');
goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.ViewType');
goog.require('rflect.date');
goog.require('rflect.date.DateShim');
goog.require('rflect.date.Interval');
goog.require('rflect.math');



/**
 * Time manager main class.
 * @param {goog.date.DateTime=} opt_date Date to start application with.
 * @constructor
 */
rflect.cal.TimeManager = function(opt_date) {

  /**
   * Interval for this time manager.
   * @type {rflect.date.Interval}
   */
  this.interval = new rflect.date.Interval();

  this.daySeries = [];

  this.setBasis(opt_date);
};


/**
 * Configurations of time manager.
 * Should correspond in numbers to @link {rflect.cal.ViewType}.
 * @enum {number}
 */
rflect.cal.TimeManager.Configuration = {
  NONE: 0,
  DAY: 1,
  MULTI_DAY: 2,
  WEEK: 3,
  MULTI_WEEK: 4,
  MONTH: 5,
  YEAR: 6,
  MINI_MONTH: 7
};


/**
 * Directions of time manager.
 * @enum {number}
 */
rflect.cal.TimeManager.Direction = {
  NONE: 0,
  FORWARD: 1,
  BACKWARD: -1
};


/**
 * Time manager configuration.
 * @type {rflect.cal.TimeManager.Configuration}
 */
rflect.cal.TimeManager.prototype.configuration =
    rflect.cal.TimeManager.Configuration.NONE;


/**
 * Days number for multiday and multiweek modes.
 * @type {number}
 */
rflect.cal.TimeManager.prototype.daysNumber = 0;


/**
 * Current day, for later comparison with.
 * @type {rflect.date.DateShim}
 * @private
 */
rflect.cal.TimeManager.prototype.currentDay_;


/**
 * Whether interval we're in contains now point.
 * @type {boolean}
 * @private
 */
rflect.cal.TimeManager.prototype.isInNowPoint = false;


/**
 * Day within interval, on which latter is based.
 * @type {goog.date.Date}
 */
rflect.cal.TimeManager.prototype.basis = null;


/**
 * Day at the start of interval.
 * @type {goog.date.Date}
 * @private
 */
rflect.cal.TimeManager.prototype.start_ = null;


/**
 * Sequence of dates to be used in grid.
 * @type {Array.<rflect.date.DateShim>}
 */
rflect.cal.TimeManager.prototype.daySeries = null;


/**
 * Sets date at the beginning of time period, basis for all calculations.
 */
rflect.cal.TimeManager.prototype.calculatePeriodStart = function() {

  switch (this.configuration) {
    case rflect.cal.TimeManager.Configuration.DAY:
    case rflect.cal.TimeManager.Configuration.MULTI_DAY:
      this.start_ = this.basis.clone();break;
    case rflect.cal.TimeManager.Configuration.WEEK:
    case rflect.cal.TimeManager.Configuration.MULTI_WEEK: {
      this.start_ = rflect.date.moveToDayOfWeekIfNeeded(this.basis,
          0, -1);
    }; break;
    case rflect.cal.TimeManager.Configuration.MINI_MONTH:
    case rflect.cal.TimeManager.Configuration.MONTH: {
      this.start_ = this.basis.clone();
      // Move to first day of month.
      this.start_.setDate(1);
      // Move to first day of week containing month.
      this.start_ = rflect.date.moveToDayOfWeekIfNeeded(
          this.start_, 0, -1);
    };
    break;
    case rflect.cal.TimeManager.Configuration.YEAR: break;
    default: break;
  }
};


/**
 * Creates array of dates which represent all dates in given view time interval.
 */
rflect.cal.TimeManager.prototype.generateDaySeries = function() {
  var daysNumber = 0;
  switch (this.configuration) {
    case rflect.cal.TimeManager.Configuration.DAY: daysNumber = 1; break;
    case rflect.cal.TimeManager.Configuration.MULTI_DAY: daysNumber =
        this.daysNumber; break;
    case rflect.cal.TimeManager.Configuration.WEEK: daysNumber = 7; break;
    case rflect.cal.TimeManager.Configuration.MULTI_WEEK: daysNumber =
        this.daysNumber; break;
    case rflect.cal.TimeManager.Configuration.MINI_MONTH:
    case rflect.cal.TimeManager.Configuration.MONTH: {
      var difference = 0;
      var firstDayOfMonth = this.basis.clone();
      firstDayOfMonth.setDate(1);
      // We need to make number (days_before_first_day_of_month + days_in_month
      // + days_after_last_day_of_month) divisible by 7.
      if (!this.start_.equals(firstDayOfMonth)) {
        // Start always has lower weekday number than first day of month, so
        // it's safe to subtract former from the latter.
        difference = firstDayOfMonth.getWeekday() -
            this.start_.getWeekday();
      }
      if (this.configuration == rflect.cal.TimeManager.Configuration.MINI_MONTH)
        // For mini-month, extra week at the end.
        daysNumber = 42;
      else
        daysNumber = rflect.math.completeToDivisibleBy7(difference +
            goog.date.getNumberOfDaysInMonth(this.basis.getFullYear(),
            this.basis.getMonth()));
    };
    break;
    case rflect.cal.TimeManager.Configuration.YEAR: break;
    default: break;
  }

  this.daySeries.length = 0;
  var date = new rflect.date.DateShim(this.start_);
  for (var counter = 0; counter < daysNumber; counter++) {
    this.daySeries[counter] = date;
    date = rflect.date.getTomorrow(date);
  }

  // Form intervals.
  this.interval.start = this.start_.getTime();
  this.interval.end = new goog.date.Date(date).getTime();

  if (this.isInNowPoint = this.isInNowPoint_()){
    var today = new Date();
    this.currentDay_ = new rflect.date.DateShim(today.getFullYear(),
        today.getMonth(), today.getDate());
  }

};


/**
 * Runs time manager, main sequence method.
 */
rflect.cal.TimeManager.prototype.run = function() {
  this.calculatePeriodStart();
  this.generateDaySeries();
};


/**
 * Shifts time manager by one interval.
 * @param {rflect.cal.TimeManager.Direction} aDirection Direction of shift.
 */
rflect.cal.TimeManager.prototype.shift = function(aDirection) {
  this.shiftBasis(aDirection);
  this.run();
};


/**
 * Shifts time manager to specific point.
 * @param {goog.date.Date=} opt_date Date to shift to.
 */
rflect.cal.TimeManager.prototype.shiftToPoint = function(opt_date) {
  this.setBasis(opt_date);
  this.run();
};


/**
 * @return {boolean} Whether interval we're in covers current moment.
 * @private
 */
rflect.cal.TimeManager.prototype.isInNowPoint_ = function() {
  return this.interval.contains(goog.now());
};


/**
 * @param {rflect.date.DateShim} aDate Date to compare with.
 * @return {boolean} Whether given day is current one.
 */
rflect.cal.TimeManager.prototype.isCurrentDay = function(aDate) {
  return /**@type{boolean}*/(this.currentDay_ && this.currentDay_.equals(aDate,
      rflect.date.fields.DATE | rflect.date.fields.MONTH |
      rflect.date.fields.YEAR))
}


/**
 * Shifts time manager to current moment.
 */
rflect.cal.TimeManager.prototype.shiftToNow = function() {
  this.shiftToPoint();
};


/**
 * Shifts basis by one interval.
 * @param {rflect.cal.TimeManager.Direction} aDirection Direction of shift.
 */
rflect.cal.TimeManager.prototype.shiftBasis = function(aDirection) {
  var daysNumber = 0;
  switch (this.configuration) {
    case rflect.cal.TimeManager.Configuration.DAY: {
      daysNumber = 1 * aDirection;
      this.basis.add(new goog.date.Interval(0, 0, daysNumber));
    }; break;
    case rflect.cal.TimeManager.Configuration.WEEK: {
      daysNumber = 7 * aDirection;
      this.basis.add(new goog.date.Interval(0, 0, daysNumber));
    }; break;
    case rflect.cal.TimeManager.Configuration.MULTI_DAY:
    case rflect.cal.TimeManager.Configuration.MULTI_WEEK: {
      daysNumber = this.daysNumber * aDirection;
      this.basis.add(new goog.date.Interval(0, 0, daysNumber));
    }; break;
    case rflect.cal.TimeManager.Configuration.MINI_MONTH:
    case rflect.cal.TimeManager.Configuration.MONTH: {
      this.basis.add(new goog.date.Interval(0,
          1 * aDirection));
    }; break;
    case rflect.cal.TimeManager.Configuration.YEAR: {
      this.basis.add(new goog.date.Interval(1 * aDirection));
    }; break;
    default: break;
  }
};


/**
 * Sets basis to specific date.
 * @param {goog.date.Date=} opt_date Date to set basis to.
 */
rflect.cal.TimeManager.prototype.setBasis = function(opt_date) {
  this.basis = opt_date || new goog.date.Date();
};
