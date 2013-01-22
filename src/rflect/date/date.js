/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Rflect date utilities.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.date');
goog.provide('rflect.date.DateShim');

goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeSymbols');


/**
 * @typedef {(Date|goog.date.Date|rflect.date.DateShim)}
 */
goog.date.DateLike;


/**
 * Returns the number of days for a given year.
 *
 * @param {number} year Year part of date.
 * @return {number} The number of days for the given year.
 */
rflect.date.getNumberOfDaysInYear = function(year) {
  return goog.date.isLeapYear(year) ? 366 : 365;
};


/**
 * Move to the next or last dayOfWeek based on the orient value.
 * @param aDate {goog.date.DateLike} Date to shift.
 * @param aDay {number} The dayOfWeek to move to (0 is Monday).
 * @param opt_orient {number=} Forward (+1) or Back (-1). Defaults to +1.
 * @return {rflect.date.DateShim} Shifted date.
 */
rflect.date.moveToDayOfWeek = function(aDate, aDay, opt_orient) {
  // Locale-dependent first date of week.
  var dayOfWeek = (goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK + aDay + 1) % 7;
  var diff = (dayOfWeek - aDate.getDay() + 7 * (opt_orient || +1)) % 7;
  var date = aDate.clone();
  date.add(new goog.date.Interval(0, 0, (diff === 0) ? diff += 7 *
      (opt_orient || +1) : diff));
  return date;
};


/**
 * Move to the next or last dayOfWeek based on the orient value,
 * if not already staying in this week date.
 * @param aDate {goog.date.DateLike} Date to shift.
 * @param aDay {number} The dayOfWeek to move to (0 is Monday).
 * @param opt_orient {number} Forward (+1) or Back (-1). Defaults to +1.
 * @return {rflect.date.DateShim} Shifted date.
 */
rflect.date.moveToDayOfWeekIfNeeded = function(aDate, aDay, opt_orient) {
  if (aDate.getWeekday() != aDay) {
    return rflect.date.moveToDayOfWeek(aDate, aDay, opt_orient);
  }
  return aDate;
};


/**
 * Returns minimal or maximal date number in this date and month depending on
 * direction of search.
 * @param {number} aYear Year.
 * @param {number} aMonth Month.
 * @param {number} aDirection Direction in which we should move: 1 is forward,
 * -1 is backward.
 * @return {number} Maximal or minimal date in this year and month.
 * @private
 */
rflect.date.getDayLimit_ = function(aYear, aMonth, aDirection) {
  return aDirection > 0 ? goog.date.getNumberOfDaysInMonth(aYear, aMonth) : 1;
};


/**
 * @return {rflect.date.DateShim} Tomorrow date.
 */
rflect.date.getTomorrow = function(aGivenDate) {
  var dateObject = null;
  var year = aGivenDate.getFullYear();
  var month = aGivenDate.getMonth();
  var date = aGivenDate.getDate();

  var dayOfWeek;
  var previousDayOfWeek = aGivenDate.getDay();
  var previousDayOfWeekISO = aGivenDate.getDay();
  var dayOfYear = aGivenDate.getDayOfYear();
  var previousDayOfYear = dayOfYear;

  var weekNumber = aGivenDate.getWeekNumber();
  var firstDayOfWeek = aGivenDate.getFirstDayOfWeek();
  var cutoff = aGivenDate.getFirstWeekCutOffDay();

  var numberOfDaysInCurrentYear = rflect.date.getNumberOfDaysInYear(year);

  if (date == goog.date.getNumberOfDaysInMonth(year, month)) {
    if (month == 11) {
      year++;
      month = 0;
      date = 1;
      dayOfYear = 1;
    } else {
      month++;
      date = 1;
      dayOfYear++;
    }
  } else {
    date++;
    dayOfYear++;
  }

  dayOfWeek = (previousDayOfWeek + 1 + 7) % 7;
  var dayOfWeekIso = (dayOfWeek + 6) % 7;
  var cutoffAndFirstDiff = (cutoff - firstDayOfWeek + 7) % 7

  // Locales have weekdays in ISO format.
  if (dayOfWeekIso == firstDayOfWeek) {
    // Only difference of cutoff - first day of week is important.
    // We add +1 to previous day of year, because current may be zero due to
    // calculations above.
    if (weekNumber < 52 || (weekNumber == 52 && (previousDayOfYear + 1 +
        cutoffAndFirstDiff) < (numberOfDaysInCurrentYear + 1)))
      weekNumber++;
    else
      weekNumber = 1;
  }

  dateObject = new rflect.date.DateShim(year, month, date);
  dateObject.setDay(dayOfWeek);
  dateObject.setDayOfYear(dayOfYear);
  dateObject.setWeekNumber(weekNumber);

  return dateObject;
};


/**
 * @param {rflect.date.DateShim} aDateA First date to compare.
 * @param {rflect.date.DateShim} aDateB First date to compare.
 * @return {number|undefined} 1 if first arg is greater, 0 if equals, -1
 * otherwise.
 */
rflect.date.compareByWeekAndYear = function(aDateA, aDateB){
  return aDateA.getYear() == aDateB.getYear() ? (aDateA.getWeekNumber() ==
      aDateB.getWeekNumber() ? 0 : (aDateA.getWeekNumber() >
      aDateB.getWeekNumber() ? 1 : -1)) : (aDateA.getYear() >
      aDateB.getYear() ? 1 : -1)
}


/**
 * @param {string} aDateStr JSON string representation of date.
 * @param {boolean=} opt_full Whether to use real date object in parsing.
 * @return {rflect.date.DateShim} Date in DateShim form.
 */
rflect.date.parse = function(aDateStr, opt_full){
  var year = +aDateStr.substr(0, 4);
  var month = +aDateStr.substr(4, 2) - 1;
  var date = +aDateStr.substr(6, 2);
  var hours = +aDateStr.substr(8, 2);
  var minutes = +aDateStr.substr(10, 2);
  var seconds = +aDateStr.substr(12, 2);

  var date;
  var dateShim;

  if (opt_full) {
    date = new goog.date.DateTime(year,month, date, hours, minutes,
                     seconds);
    dateShim = new rflect.date.DateShim(date);
  } else
    dateShim = new rflect.date.DateShim(year, month, date, hours, minutes,
      seconds);

  if (opt_full) {
    dateShim.setDay(date.getDay());
    dateShim.setDayOfYear(date.getDayOfYear());
    dateShim.setWeekNumber(date.getWeekNumber());
  }
  return dateShim;
}


/**
 * Fields by which dates could be compared.
 * @enum {number}
 */
rflect.date.fields = {
  NONE: 0,
  YEAR: 1,
  MONTH: 2,
  DATE: 4,
  HOURS: 8,
  MINUTES: 16,
  SECONDS: 32,
  ALL: 63,
  DAY_OF_YEAR: 64,
  WEEK_OF_YEAR: 128
}


/**
 * Class that simulates Date, could be used instead it in simple calculations
 * for performance reasons (Firefox 2 has slow Date object).
 * NOTE: For operations on day of year and week of year they must be set
 * explicitly on date shim object after calling this constructor.
 *
 * @param {number|goog.date.DateLike=} opt_year_or_date Four digit year
 * or a date-like object. If not set, the created object
 * will contain the date determined by goog.now().
 * @param {number=} opt_month Month, 0 = Jan, 11 = Dec.
 * @param {number=} opt_date Date of month, 1 - 31.
 * @param {number=} opt_hours Hours, 0 - 24.
 * @param {number=} opt_minutes Minutes, 0 - 59.
 * @param {number=} opt_seconds Seconds, 0 - 61.
 * @param {number=} opt_milliseconds Milliseconds, 0 - 999.
 * @constructor
 * @extends {goog.date.DateTime}
 */
rflect.date.DateShim = function(opt_year_or_date, opt_month, opt_date, opt_hours,
    opt_minutes, opt_seconds, opt_milliseconds) {
  if (goog.isNumber(opt_year_or_date)) {
    this.setYear(opt_year_or_date || 0);
    this.setMonth(/**@type {goog.date.month}*/(opt_month || 0));
    this.setDate(opt_date || 0);
    this.setHours(opt_hours || 0);
    this.setMinutes(opt_minutes || 0);
    this.setSeconds(opt_seconds || 0);
    this.setMilliseconds(opt_milliseconds || 0);
  } else {
    var dateObj;
    if (goog.isObject(opt_year_or_date))
      dateObj = opt_year_or_date;
    else
      dateObj = new Date(goog.now());

    this.setYear(dateObj.getFullYear());
    this.setMonth(/**@type {goog.date.month}*/ (dateObj.getMonth()));
    this.setDate(dateObj.getDate());
    this.setDay(dateObj.getDay());
    if (dateObj.setHours) {
      this.setHours(dateObj.getHours());
      this.setMinutes(dateObj.getMinutes());
      this.setSeconds(dateObj.getSeconds());
      this.setMilliseconds(dateObj.getMilliseconds());
    }
  }
};
goog.inherits(rflect.date.DateShim, goog.date.DateTime);


/**
 * Four digit year.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.year_ = 0;


/**
 * Month.
 * @type {goog.date.month}
 * @private
 */
rflect.date.DateShim.prototype.month_ = goog.date.month.JAN;


/**
 * Day of month.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.dayOfMonth_ = 0;


/**
 * Day of week in US style (0 - Sun, 6 - Sat).
 * @type {number}
 */
rflect.date.DateShim.prototype.day_ = 0;


/**
 * The number of milliseconds since 1 January 1970 00:00:00.
 * @type {number}
 */
rflect.date.DateShim.prototype.time = 0;


/**
 * Hours.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.hours_ = 0;


/**
 * Minutes.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.minutes_ = 0;


/**
 * Seconds.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.seconds_ = 0;


/**
 * Milliseconds.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.milliseconds_ = 0;


/**
 * Day of year.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.dayOfYear_ = 0;


/**
 * Week of year.
 * @type {number}
 * @private
 */
rflect.date.DateShim.prototype.weekNumber_ = 0;


/**
 * @param {number} year Four digit year.
 */
rflect.date.DateShim.prototype.setFullYear = function(year) {
  this.year_ = year;
};


/**
 * @param {number} year Four digit year.
 */
rflect.date.DateShim.prototype.setYear = function(year) {
  this.year_ = year;
};


/**
 * @param {goog.date.month} month The month, where 0 = Jan, 11 = Dec.
 */
rflect.date.DateShim.prototype.setMonth = function(month) {
  this.month_ = month;
};


/**
 * @param {number} date The date part.
 */
rflect.date.DateShim.prototype.setDate = function(date) {
  this.dayOfMonth_ = date;
};


/**
 * @return {number} Four digit year.
 */
rflect.date.DateShim.prototype.getFullYear = function() {
  return this.year_;
};


/**
 * @return {number} Four digit year.
 */
rflect.date.DateShim.prototype.getYear = function() {
  return this.year_;
};


/**
 * @return {goog.date.month} The month, where 0 = Jan, 11 = Dec.
 */
rflect.date.DateShim.prototype.getMonth = function() {
  return this.month_;
};


/**
 * @return {number} Day.
 */
rflect.date.DateShim.prototype.getDate = function() {
  return this.dayOfMonth_;
};


/**
 * @return {number} Day of week, US style - 0 - Sun, 6 - Sat.
 */
rflect.date.DateShim.prototype.getDay = function() {
  return this.day_;
};


/**
 * @param {number} aDay Day of week, US style - 0 - Sun, 6 - Sat.
 */
rflect.date.DateShim.prototype.setDay = function(aDay) {
  this.day_ = aDay;
};


/**
 * @return {number} The number of milliseconds since 1 January 1970 00:00:00.
 */
rflect.date.DateShim.prototype.getTime = function() {
  return this.time;
};


/**
 * Returns the hours part of the datetime.
 *
 * @return {number} An integer between 0 and 23, representing the hour.
 */
rflect.date.DateShim.prototype.getHours = function() {
  return this.hours_;
};


/**
 * Returns the minutes part of the datetime.
 *
 * @return {number} An integer between 0 and 59, representing the minutes.
 */
rflect.date.DateShim.prototype.getMinutes = function() {
  return this.minutes_;
};


/**
 * Returns the seconds part of the datetime.
 *
 * @return {number} An integer between 0 and 59, representing the seconds.
 */
rflect.date.DateShim.prototype.getSeconds = function() {
  return this.seconds_;
};


/**
 * Returns the milliseconds part of the datetime.
 *
 * @return {number} An integer between 0 and 999, representing the milliseconds.
 */
rflect.date.DateShim.prototype.getMilliseconds = function() {
  return this.milliseconds_;
};


/**
 * @return {number} The day of year.
 */
rflect.date.DateShim.prototype.getDayOfYear = function() {
  return this.dayOfYear_;
};


/**
 * @return {number} The week number.
 */
rflect.date.DateShim.prototype.getWeekNumber = function() {
  return this.weekNumber_;
};


/**
 * Sets the hours part of the datetime.
 *
 * @param {number} aHours An integer between 0 and 23, representing the hour.
 */
rflect.date.DateShim.prototype.setHours = function(aHours) {
  this.hours_ = aHours;
};


/**
 * Sets the minutes part of the datetime.
 *
 * @param {number} aMinutes Integer between 0 and 59, representing the minutes.
 */
rflect.date.DateShim.prototype.setMinutes = function(aMinutes) {
  this.minutes_ = aMinutes;
};


/**
 * Sets the seconds part of the datetime.
 *
 * @param {number} aSeconds Integer between 0 and 59, representing the seconds.
 */
rflect.date.DateShim.prototype.setSeconds = function(aSeconds) {
  this.seconds_ = aSeconds;
};


/**
 * Sets the seconds part of the datetime.
 *
 * @param {number} aMs Integer between 0 and 999, representing the milliseconds.
 */
rflect.date.DateShim.prototype.setMilliseconds = function(aMs) {
  this.milliseconds_ = aMs;
};


/**
 * @param {number} aDayOfYear The day of year.
 */
rflect.date.DateShim.prototype.setDayOfYear = function(aDayOfYear) {
  this.dayOfYear_ = aDayOfYear;
};


/**
 * @param {number} aWeekNumber The week number.
 */
rflect.date.DateShim.prototype.setWeekNumber = function(aWeekNumber) {
  this.weekNumber_ = aWeekNumber;
};


/**
 * @param {goog.date.DateLike} aOther Date to test.
 * @param {number} opt_bitmask Bitmask which shows what fields should
 * participate in comparison.
 * @return {boolean} Whether this date equals other.
 */
rflect.date.DateShim.prototype.equals = function(aOther, opt_bitmask) {
  var equal = true;
  var bitmask = opt_bitmask || rflect.date.fields.ALL;
  if (bitmask & rflect.date.fields.YEAR)
     equal = equal && this.getYear() == aOther.getFullYear();
  if (equal && bitmask & rflect.date.fields.MONTH)
     equal = equal && this.getMonth() == aOther.getMonth();
  if (equal && bitmask & rflect.date.fields.DATE)
     equal = equal && this.getDate() == aOther.getDate();
  if (equal && bitmask & rflect.date.fields.HOURS)
     equal = equal && this.getHours() == aOther.getHours();
  if (equal && bitmask & rflect.date.fields.MINUTES)
     equal = equal && this.getMinutes() == aOther.getMinutes();
  if (equal && bitmask & rflect.date.fields.SECONDS)
     equal = equal && this.getSeconds() == aOther.getSeconds();

  return equal;
};


/**
 * Checks equality by date fields only.
 * @param {goog.date.DateLike} aOther Date to test.
 * @return {boolean} Whether this date equals other.
 */
rflect.date.DateShim.prototype.equalsByDate = function(aOther) {
  return this.equals(aOther, rflect.date.fields.YEAR |
      rflect.date.fields.MONTH | rflect.date.fields.DATE);
};


/**
 * Checks equality by week of year.
 * @param {goog.date.DateLike} aOther Date to test.
 * @return {boolean} Whether this date equals other.
 */
rflect.date.DateShim.prototype.equalsByWeek = function(aOther) {
  return this.equals(aOther, rflect.date.fields.YEAR |
      rflect.date.fields.WEEK_OF_YEAR);
};


/**
 * @return {number} Value of wrapped date.
 */
rflect.date.DateShim.prototype.valueOf = function() {
  return +[this.year_, this.month_, this.dayOfMonth_, this.hours_,
      this.minutes_, this.seconds_, this.milliseconds_].join('');
};


/**
 * @return {rflect.date.DateShim} Tomorrow date.
 */
rflect.date.DateShim.prototype.getTomorrow = function() {
  return rflect.date.getTomorrow(this);
}


/**
 * @return {!rflect.date.DateShim} A clone of the DateShim.
 */
rflect.date.DateShim.prototype.clone = function() {
  var date = new rflect.date.DateShim(this);
  date.setFirstDayOfWeek(this.getFirstDayOfWeek());
  date.setFirstWeekCutOffDay(this.getFirstWeekCutOffDay());
  date.setDayOfYear(this.getDayOfYear());
  date.setWeekNumber(this.getWeekNumber());

  return date;
};