/**
 * Version: 1.0 Alpha-1
 * Build Date: 12-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */

goog.provide("rflect.datetime.DateTime");

goog.require("rflect.Root");
goog.require("goog.json");
goog.require("rflect.loc.datetime.DateTime");

rflect.datetime.DateTime =
rflect.Root.__create(function(var_arg, month, date, hour, minute, second,
                              millisecond) {
  var argNumber = arguments.length;
  switch (argNumber) {

    case 0:{
      this._date = new Date();
    };break;
    case 1:{
      if (typeof var_arg == "string" && var_arg.length == 17) {
        this._date = new Date();
        this.fromJSONString(var_arg);
      } else {
        this._date = new Date(var_arg);
      }
    };break;
    case 2:{
      this._date = new Date(var_arg, month);
    };break;
    case 3:{
      this._date = new Date(var_arg, month, date);
    };break;
    case 4:{
      this._date = new Date(var_arg, month, date, hour);
    };break;
    case 5:{
      this._date = new Date(var_arg, month, date, hour, minute);
    };break;
    case 6:{
      this._date = new Date(var_arg, month, date, hour, minute, second);
    };break;
    case 7:{
      this._date = new Date(var_arg, month, date, hour, minute, second,
              millisecond);
    };break;
    default:;break;

  }
}).__fuse({

  year: 0,
  month: 0,
  date: 0,
  day: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  localeDay: 0,

  /**
   * Caches properties of rflect.datetime.DateTime instance, so that after we have
   *  this method called, properties could be accesed directly, avoiding method calls, i.e:
   *  var dateInstance = new rflect.datetime.DateTime();
   *  var day = dateInstance.day;
   *  This could improve performance when trying to access
   *  properties of large number of objects.
   * @param {number} aPropertiesBitmask Bitmask defining what properties should be cached.
   * @public
   */
  cacheProperties: function DateTime_cacheProperties(aPropertiesBitmask) {

    var propertiesBitmask = aPropertiesBitmask == undefined ? 0x3FF : aPropertiesBitmask;

    if ((propertiesBitmask & rflect.datetime.DateTime.YEAR) != 0)
      this.year = this.getFullYear();
    if ((propertiesBitmask & rflect.datetime.DateTime.MONTH) != 0)
      this.month = this.getMonth();
    if ((propertiesBitmask & rflect.datetime.DateTime.DATE) != 0)
      this.date = this.getDate();
    if ((propertiesBitmask & rflect.datetime.DateTime.DAY) != 0)
      this.day = this.getDay();
    if ((propertiesBitmask & rflect.datetime.DateTime.HOURS) != 0)
      this.hours = this.getHours();
    if ((propertiesBitmask & rflect.datetime.DateTime.MINUTES) != 0)
      this.minutes = this.getMinutes();
    if ((propertiesBitmask & rflect.datetime.DateTime.SECONDS) != 0)
      this.seconds = this.getSeconds();
    if ((propertiesBitmask & rflect.datetime.DateTime.MILLISECONDS) != 0)
      this.milliseconds = this.getMilliseconds();
    if ((propertiesBitmask & rflect.datetime.DateTime.TIME) != 0)
      this.time = this.getTime();
    if ((propertiesBitmask & rflect.datetime.DateTime.LOCALE_DAY) != 0)
      this.localeDay = this.getLocaleDay();

  },

  /**
   * Compares this instance to a Date object and return an number indication of their relative values.
   * @param {Date|rflect.datetime.DateTime} date Date object to compare [Required]
   * @return {number} 1 = this is greater than date. -1 = this is less than date. 0 = values are equal
   * @public
   */
  compare: function (date) {

    var a = null;
    var rightType = false;

    if (isNaN(this._date)) {
      throw new Error(this._date);
    }
    ;
    if ((typeof date == "object")) {
      if (date instanceof Date) {
        a = date;
      } else if (date instanceof rflect.datetime.DateTime) {
        a = date.getDateObject();
      }
      rightType = !isNaN(a)
    }
    if (rightType) {
      return (this._date > a) ? 1 : (this._date < a) ? -1 : 0;
    } else {
      throw new TypeError(date);
    }
  },
  fromJSONString: function DateTime_fromJSONString(aJSONString) {
    this.setFullYear(aJSONString.slice(0, 4));
    // We start month index from 0
    this.setMonth(+aJSONString.slice(4, 6) - 1);
    this.setDate(aJSONString.slice(6, 8));
    this.setHours(aJSONString.slice(8, 10));
    this.setMinutes(aJSONString.slice(10, 12));
    this.setSeconds(aJSONString.slice(12, 14));
    this.setMilliseconds(aJSONString.slice(14, 17));
  },
  getDate: function () {
    return this._date.getDate();
  },
  getDateObject: function () {
    return this._date;
  },
  getDay: function () {
    return this._date.getDay();
  },
  getFullYear: function () {
    return this._date.getFullYear();
  },
  getHours: function () {
    return this._date.getHours();
  },

  getISO8601: function Timeprocessor_getISO8601() {
    var year = this.getFullYear();
    var monthOfYear = this.getMonthPlus1();
    var dayOfMonth = this.getDate();
    var dayOfWeek = 0;
    var daysOfWeek = "ABCDEFG";
    var hourOfDay = this.getHours();
    var minuteOfHour = this.getMinutes();
    var secondOfMinute = this.getSeconds();

        // Getting current system time
    // Month
    if (monthOfYear < 10)
      monthOfYear = "0" + monthOfYear;
        // Day
    if (dayOfMonth < 10)
      dayOfMonth = "0" + dayOfMonth;
        // Weekday
    dayOfWeek = daysOfWeek[this.getDay()];
      // Hours
    if (hourOfDay < 10)
      hourOfDay = "0" + hourOfDay;
      // Minutes
    if (minuteOfHour < 10)
      minuteOfHour = "0" + minuteOfHour;
      // Seconds
    if (secondOfMinute < 10)
      secondOfMinute = "0" + secondOfMinute;
    // Converting system time to ISO8691 extended
    return year + "-" + monthOfYear + "-" + dayOfMonth + dayOfWeek + hourOfDay
            + ":" + minuteOfHour + ':' + secondOfMinute;
  },

  getLocaleDay: function getLocaleDay() {
    return (this.getDay()
            + 7
            - rflect.loc.datetime.DateTime.firstDayOfWeek)
            % 7
            ;
  },

  getMilliseconds: function () {
    return this._date.getMilliseconds();
  },
  getMinutes: function () {
    return this._date.getMinutes();
  },
  getMonth: function () {
    return this._date.getMonth();
  },
  getMonthPlus1: function () {
    return this._date.getMonth() + 1;
  },
  getSeconds: function () {
    return this._date.getSeconds();
  },
  getTime: function () {
    return this._date.getTime();
  },
  getTimezoneOffset: function () {
    return this._date.getTimezoneOffset();
  },
  getUTCDate: function () {
    return this._date.getUTCDate();
  },
  getUTCDay: function () {
    return this._date.getUTCDay();
  },
  getUTCFullYear: function () {
    return this._date.getUTCFullYear();
  },
  getUTCHours: function () {
    return this._date.getUTCHours();
  },
  getUTCMilliseconds: function () {
    return this._date.getUTCMilliseconds();
  },
  getUTCMinutes: function () {
    return this._date.getUTCMinutes();
  },
  getUTCMonth: function () {
    return this._date.getUTCMonth();
  },
  getUTCSeconds: function () {
    return this._date.getUTCSeconds();
  },
  getYear: function () {
    return this._date.getYear();
  },
  setDate: function (dayValue) {
    return this._date.setDate(dayValue);
  },
  setFullYear: function (yearValue, monthValue, dayValue) {
    return this._date.setFullYear.apply(this._date, arguments);
  },
  setHours: function (hoursValue, minutesValue, secondsValue, msValue) {
    return this._date.setHours.apply(this._date, arguments);
  },
  setMilliseconds: function (millisecondsValue) {
    return this._date.setMilliseconds(millisecondsValue);
  },
  setMinutes: function (minutesValue, secondsValue, msValue) {
    return this._date.setMinutes.apply(this._date, arguments);
  },
  setMonth: function (monthValue, dayValue) {
    return this._date.setMonth.apply(this._date, arguments);
  },
  setSeconds: function (secondsValue, msValue) {
    return this._date.setSeconds.apply(this._date, arguments);
  },
  setTime: function (timeValue) {
    return this._date.setTime(timeValue);
  },
  setUTCDate: function (dayValue) {
    return this._date.setUTCDate(dayValue);
  },
  setUTCFullYear: function (yearValue, monthValue, dayValue) {
    return this._date.setUTCFullYear.apply(this._date, arguments);
  },
  setUTCHours: function (hoursValue, minutesValue, secondsValue, msValue) {
    return this._date.setUTCHours.apply(this._date, arguments);
  },
  setUTCMilliseconds: function (millisecondsValue) {
    return this._date.setUTCMilliseconds(millisecondsValue);
  },
  setUTCMinutes: function (minutesValue, secondsValue, msValue) {
    return this._date.setUTCMinutes.apply(this._date, arguments);
  },
  setUTCMonth: function (monthValue, dayValue) {
    return this._date.setUTCMonth.apply(this._date, arguments);
  },
  setUTCSeconds: function (secondsValue, msValue) {
    return this._date.setUTCSeconds.apply(this._date, arguments);
  },
  setYear: function (yearValue) {
    return this._date.setYear(yearValue);
  },
  toDateString: function () {
    return this._date.toDateString();
  },
  toGMTString: function () {
    return this._date.toGMTString();
  },
  toJSONString: function DateTime_toJSONString() {
    var year = this.getFullYear();
    // We start month index from 1
    var month = this.getMonthPlus1();
    var day = this.getDate();
    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();
    var milliseconds = this.getMilliseconds();
    milliseconds = milliseconds.toString();
    milliseconds = (milliseconds.length < 3)
            ? ((milliseconds.length == 2)
            ? "0" + milliseconds
            : "00" + milliseconds)
            : milliseconds;
    return "\"" + year.toString()
            + ((month < 10) ? "0" + month : month)
            + ((day < 10) ? "0" + day : day)
            + ((hour < 10) ? "0" + hour : hour)
            + ((minute < 10) ? "0" + minute : minute)
            + ((second < 10) ? "0" + second : second)
            + milliseconds + "\"";
  },
  toLocaleDateString: function () {
    return this._date.toLocaleDateString();
  },
  toLocaleFormat: function (formatString) {
    return this._date.toLocaleFormat(formatString);
  },
  toLocaleString: function () {
    return this._date.toLocaleString();
  },
  toLocaleTimeString: function () {
    return this._date.toLocaleTimeString();
  },
  toSource: function () {
    return this._date.toSource();
  },
  toString: function () {
    return this._date.toString();
  },
  toTimeString: function () {
    return this._date.toTimeString();
  },
  toUTCString: function () {
    return this._date.toUTCString();
  },
  toVector: function () {
    var vector = [];
    vector.push(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(),
            this.getMinutes(), this.getSeconds(), this.getMilliseconds());
    return vector;
  },
  valueOf: function () {
    return this._date.valueOf();
  }
}).__assoc({

  YEAR: 0x1,
  MONTH: 0x2,
  DATE: 0x4,
  DAY: 0x8,
  HOURS: 0x10,
  MINUTES: 0x20,
  SECONDS: 0x40,
  MILLISECONDS: 0x80,
  TIME: 0x100,
  LOCALE_DAY: 0x200,

  parse: function (dateString) {
    return Date.parse(dateString);
  },
  now: function () {
    return Date.now();
  },
  UTC: function (year, month, date, hrs, min, sec, ms) {
    return Date.UTC.apply(Date, arguments);
  },

  getLocaleDayIndex: function getLocaleDay(aDay) {
    return (aDay
            + rflect.loc.datetime.DateTime.firstDayOfWeek)
            % 7
            ;
  }
});

/**
 * Gets the month number (0-11) if given a Culture Info specific string which is a valid monthName or abbreviatedMonthName.
 * @param {String}   The name of the month (eg. "February, "Feb", "october", "oct").
 * @return {number}  The day number
 */
rflect.datetime.DateTime.getMonthNumberFromName = function (name) {
  var n = rflect.loc.datetime.DateTime.monthNames, m = rflect.loc.datetime.DateTime.abbreviatedMonthNames, s = name.toLowerCase();
  for (var i = 0; i < n.length; i++) {
    if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
      return i;
    }
  }
  return -1;
};

/**
 * Gets the day number (0-6) if given a CultureInfo specific string which is a valid dayName, abbreviatedDayName or shortestDayName (two char).
 * @param {String}   The name of the day (eg. "Monday, "Mon", "tuesday", "tue", "We", "we").
 * @return {number}  The day number
 */
rflect.datetime.DateTime.getDayNumberFromName = function (name) {
  var n = rflect.loc.datetime.DateTime.dayNames, m = rflect.loc.datetime.DateTime.abbreviatedDayNames, o = rflect.loc.datetime.DateTime.shortestDayNames, s = name.toLowerCase();
  for (var i = 0; i < n.length; i++) {
    if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
      return i;
    }
  }
  return -1;
};

/**
 * Determines if the current date instance is within a LeapYear.
 * @param {number}   The year (0-9999).
 * @return {Boolean} true if date is within a LeapYear, otherwise false.
 */
rflect.datetime.DateTime.isLeapYear = function (year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

/**
 * Gets the number of days in the month, given a year and month value. Automatically corrects for LeapYear.
 * @param {number}   The year (0-9999).
 * @param {number}   The month (0-11).
 * @return {number}  The number of days in the month.
 */
rflect.datetime.DateTime.getDaysInMonth = function (year, month) {
  return [31, (rflect.datetime.DateTime.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

rflect.datetime.DateTime.getTimezoneOffset = function (s, dst) {
  return (dst || false) ? rflect.loc.datetime.DateTime.abbreviatedTimeZoneDST[s.toUpperCase()] :
         rflect.loc.datetime.DateTime.abbreviatedTimeZoneStandard[s.toUpperCase()];
};

rflect.datetime.DateTime.getTimezoneAbbreviation = function (offset, dst) {
  var n = (dst || false) ? rflect.loc.datetime.DateTime.abbreviatedTimeZoneDST : rflect.loc.datetime.DateTime.abbreviatedTimeZoneStandard, p;
  for (p in n) {
    if (n[p] === offset) {
      return p;
    }
  }
  return null;
};

/**
 * Returns a new rflect.datetime.DateTime object that is an exact date and time copy of the original instance.
 * @return {rflect.datetime.DateTime}    A new rflect.datetime.DateTime instance
 */
rflect.datetime.DateTime.prototype.clone = function () {
  return new rflect.datetime.DateTime(this.getTime());
};

/**
 * Compares this instance to a rflect.datetime.DateTime object and return an number indication of their relative values.
 * @param {rflect.datetime.DateTime}     rflect.datetime.DateTime object to compare [Required]
 * @return {number}  1 = this is greaterthan date. -1 = this is lessthan date. 0 = values are equal
 */
/*rflect.datetime.DateTime.prototype.compareTo = function (date) {
    if (isNaN(this)) {
        throw new Error(this);
    }
    if (date instanceof rflect.datetime.DateTime && !isNaN(date)) {
        return (this > date) ? 1 : (this < date) ? -1 : 0;
    } else {
        throw new TypeError(date);
    }
};*/

/**
 * Compares this instance to another rflect.datetime.DateTime object and returns true if they are equal.
 * @param {rflect.datetime.DateTime}     rflect.datetime.DateTime object to compare [Required]
 * @return {Boolean} true if dates are equal. false if they are not equal.
 */
rflect.datetime.DateTime.prototype.equals = function (date) {
  return (this.compare(date) === 0);
};

/**
 * Determines is this instance is between a range of two dates or equal to either the start or end dates.
 * @param {Date|rflect.datetime.DateTime}     Start of range [Required]
 * @param {Date|rflect.datetime.DateTime}     End of range [Required]
 * @return {Boolean} true is this is between or equal to the start and end dates, else false
 */
rflect.datetime.DateTime.prototype.between = function (start, end) {
  var t = this.getTime();
  return t >= start.getTime() && t <= end.getTime();
};

/**
 * Adds the specified number of milliseconds to this instance.
 * @param {number}   The number of milliseconds to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addMilliseconds = function (value) {
  this.setMilliseconds(this.getMilliseconds() + value);
  return this;
};

/**
 * Adds the specified number of seconds to this instance.
 * @param {number}   The number of seconds to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addSeconds = function (value) {
  return this.addMilliseconds(value * 1000);
};

/**
 * Adds the specified number of seconds to this instance.
 * @param {number}   The number of spaeconds to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addMinutes = function (value) {
  return this.addMilliseconds(value * 60000);
  /* 60*1000 */
};

/**
 * Adds the specified number of hours to this instance.
 * @param {number}   The number of hours to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addHours = function (value) {
  return this.addMilliseconds(value * 3600000);
  /* 60*60*1000 */
};

/**
 * Adds the specified number of days to this instance.
 * @param {number}   The number of days to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addDays = function (value) {
  return this.addMilliseconds(value * 86400000);
  /* 60*60*24*1000 */
};

/**
 * Adds the specified number of weeks to this instance.
 * @param {number} value The number of weeks to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addWeeks = function (value) {
  return this.addMilliseconds(value * 604800000);
  /* 60*60*24*7*1000 */
};

/**
 * Adds the specified number of months to this instance.
 * @param {number}   The number of months to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};

/**
 * Adds the specified number of years to this instance.
 * @param {number}   The number of years to add. The number can be positive or negative [Required]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.addYears = function (value) {
  return this.addMonths(value * 12);
};

/**
 * Adds (or subtracts) to the value of the year, month, day, hour, minute, second, millisecond of the date instance using given configuration object. Positive and Negative values allowed.
 * Example
 <pre><code>
 rflect.datetime.DateTime.today().add( { day: 1, month: 1 } )

 new rflect.datetime.DateTime().add( { year: -1 } )
 </code></pre>
 * @param {Object}   Configuration object containing attributes (month, day, etc.)
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.add = function (config) {
  if (typeof config == "number") {
    this._orient = config;
    return this;
  }
  var x = config;
  if (x.millisecond || x.milliseconds) {
    this.addMilliseconds(x.millisecond || x.milliseconds);
  }
  if (x.second || x.seconds) {
    this.addSeconds(x.second || x.seconds);
  }
  if (x.minute || x.minutes) {
    this.addMinutes(x.minute || x.minutes);
  }
  if (x.hour || x.hours) {
    this.addHours(x.hour || x.hours);
  }
  if (x.month || x.months) {
    this.addMonths(x.month || x.months);
  }
  if (x.year || x.years) {
    this.addYears(x.year || x.years);
  }
  if (x.day || x.days) {
    this.addDays(x.day || x.days);
  }
  return this;
};

// private
rflect.datetime.DateTime._validate = function (value, min, max, name) {
  if (typeof value != "number") {
    throw new TypeError(value + " is not a Number.");
  } else if (value < min || value > max) {
    throw new RangeError(value + " is not a valid value for " + name + ".");
  }
  return true;
};

/**
 * Validates the number is within an acceptable range for milliseconds [0-999].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateMillisecond = function (n) {
  return rflect.datetime.DateTime._validate(n, 0, 999, "milliseconds");
};

/**
 * Validates the number is within an acceptable range for seconds [0-59].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateSecond = function (n) {
  return rflect.datetime.DateTime._validate(n, 0, 59, "seconds");
};

/**
 * Validates the number is within an acceptable range for minutes [0-59].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateMinute = function (n) {
  return rflect.datetime.DateTime._validate(n, 0, 59, "minutes");
};

/**
 * Validates the number is within an acceptable range for hours [0-23].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateHour = function (n) {
  return rflect.datetime.DateTime._validate(n, 0, 23, "hours");
};

/**
 * Validates the number is within an acceptable range for the days in a month [0-MaxDaysInMonth].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateDay = function (n, year, month) {
  return rflect.datetime.DateTime._validate(n, 1, rflect.datetime.DateTime.getDaysInMonth(year, month), "days");
};

/**
 * Validates the number is within an acceptable range for months [0-11].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateMonth = function (n) {
  return rflect.datetime.DateTime._validate(n, 0, 11, "months");
};

/**
 * Validates the number is within an acceptable range for years [0-9999].
 * @param {number}   The number to check if within range.
 * @return {Boolean} true if within range, otherwise false.
 */
rflect.datetime.DateTime.validateYear = function (n) {
  return rflect.datetime.DateTime._validate(n, 1, 9999, "seconds");
};

/**
 * Set the value of year, month, day, hour, minute, second, millisecond of date instance using given configuration object.
 * Example
 <pre><code>
 rflect.datetime.DateTime.today().set( { day: 20, month: 1 } )

 new rflect.datetime.DateTime().set( { millisecond: 0 } )
 </code></pre>
 *
 * @param {Object}   Configuration object containing attributes (month, day, etc.)
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.set = function (config) {
  var x = config;

  if (!x.millisecond && x.millisecond !== 0) {
    x.millisecond = -1;
  }
  if (!x.second && x.second !== 0) {
    x.second = -1;
  }
  if (!x.minute && x.minute !== 0) {
    x.minute = -1;
  }
  if (!x.hour && x.hour !== 0) {
    x.hour = -1;
  }
  if (!x.day && x.day !== 0) {
    x.day = -1;
  }
  if (!x.month && x.month !== 0) {
    x.month = -1;
  }
  if (!x.year && x.year !== 0) {
    x.year = -1;
  }

  if (x.millisecond != -1 && rflect.datetime.DateTime.validateMillisecond(x.millisecond)) {
    this.addMilliseconds(x.millisecond - this.getMilliseconds());
  }
  if (x.second != -1 && rflect.datetime.DateTime.validateSecond(x.second)) {
    this.addSeconds(x.second - this.getSeconds());
  }
  if (x.minute != -1 && rflect.datetime.DateTime.validateMinute(x.minute)) {
    this.addMinutes(x.minute - this.getMinutes());
  }
  if (x.hour != -1 && rflect.datetime.DateTime.validateHour(x.hour)) {
    this.addHours(x.hour - this.getHours());
  }
  if (x.month !== -1 && rflect.datetime.DateTime.validateMonth(x.month)) {
    this.addMonths(x.month - this.getMonth());
  }
  if (x.year != -1 && rflect.datetime.DateTime.validateYear(x.year)) {
    this.addYears(x.year - this.getFullYear());
  }

  /* day has to go last because you can't validate the day without first knowing the month */
  if (x.day != -1 && rflect.datetime.DateTime.validateDay(x.day, this.getFullYear(), this.getMonth())) {
    this.addDays(x.day - this.getDate());
  }
  if (x.timezone) {
    this.setTimezone(x.timezone);
  }
  if (x.timezoneOffset) {
    this.setTimezoneOffset(x.timezoneOffset);
  }

  return this;
};

/**
 * Resets the time of this rflect.datetime.DateTime object to 12:00 AM (00:00), which is the start of the day.
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.clearTime = function () {
  this.setHours(0);
  this.setMinutes(0);
  this.setSeconds(0);
  this.setMilliseconds(0);
  return this;
};

/**
 * Determines whether or not this instance is in a leap year.
 * @return {Boolean} true if this instance is in a leap year, else false
 */
rflect.datetime.DateTime.prototype.isLeapYear = function () {
  var y = this.getFullYear();
  return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
};

/**
 * Determines whether or not this instance is a weekday.
 * @return {Boolean} true if this instance is a weekday
 */
rflect.datetime.DateTime.prototype.isWeekday = function () {
  return !(this.is().sat() || this.is().sun());
};

/**
 * Get the number of days in the current month, adjusted for leap year.
 * @return {number}  The number of days in the month
 */
rflect.datetime.DateTime.prototype.getDaysInMonth = function () {
  return rflect.datetime.DateTime.getDaysInMonth(this.getFullYear(), this.getMonth());
};

/**
 * Moves the date to the first day of the month.
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.moveToFirstDayOfMonth = function () {
  return this.set({ day: 1 });
};

/**
 * Moves the date to the last day of the month.
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.moveToLastDayOfMonth = function () {
  return this.set({ day: this.getDaysInMonth()});
};

/**
 * Move to the next or last dayOfWeek based on the orient value.
 * @param {number}   The dayOfWeek to move to.
 * @param {number}   Forward (+1) or Back (-1). Defaults to +1. [Optional]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.moveToDayOfWeek = function (day, orient) {
  var diff = (day - this.getDay() + 7 * (orient || +1)) % 7;
  return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
};

/**
 * Move to the next or last dayOfWeek based on the orient value,
 * if not already staying in this week day.
 * @param {number}   The dayOfWeek to move to.
 * @param {number}   Forward (+1) or Back (-1). Defaults to +1. [Optional]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.moveToDayOfWeekIfNeeded = function (day, orient) {
  if (!(this.getDay() == day)) {
    return this.moveToDayOfWeek(day, orient);
  }
  ;
  return this;
};

/**
 * Move to the next or last month based on the orient value.
 * @param {number}   The month to move to. 0 = January, 11 = December.
 * @param {number}   Forward (+1) or Back (-1). Defaults to +1. [Optional]
 * @return {rflect.datetime.DateTime}    this
 */
rflect.datetime.DateTime.prototype.moveToMonth = function (month, orient) {
  var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
  return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
};

/**
 * Get the numeric day number of the year, adjusted for leap year.
 * @return {number} 0 through 364 (365 in leap years)
 */
rflect.datetime.DateTime.prototype.getDayOfYear = function () {
  return Math.floor((this._date - (new rflect.datetime.DateTime(this.getFullYear(), 0, 1))._date) / 86400000);
};

/**
 * Get the week of the year for the current date instance.
 * @param {number}   A Number that represents the first day of the week (0-6) [Optional]
 * @return {number}  0 through 53
 */
rflect.datetime.DateTime.prototype.getWeekOfYear = function (firstDayOfWeek) {
  var y = this.getFullYear(), m = this.getMonth(), d = this.getDate();

  var dow = firstDayOfWeek || rflect.loc.datetime.DateTime.firstDayOfWeek;

  var offset = 7 + 1 - new rflect.datetime.DateTime(y, 0, 1).getDay();
  if (offset == 8) {
    offset = 1;
  }
  var daynum = ((rflect.datetime.DateTime.UTC(y, m, d, 0, 0, 0) - rflect.datetime.DateTime.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
  var w = Math.floor((daynum - offset + 7) / 7);
  if (w === dow) {
    y--;
    var prevOffset = 7 + 1 - new rflect.datetime.DateTime(y, 0, 1).getDay();
    if (prevOffset == 2 || prevOffset == 8) {
      w = 53;
    } else {
      w = 52;
    }
  }
  return w;
};

/**
 * Determine whether Daylight Saving Time (DST) is in effect
 * @return {Boolean} True if DST is in effect.
 */
rflect.datetime.DateTime.prototype.isDST = function () {
  console.log('isDST');
  /* TODO: not sure if this is portable ... get from rflect.loc.datetime.DateTime? */
  return this.toString().match(/(E|C|M|P)(S|D)T/)[2] == "D";
};

/**
 * Get the timezone abbreviation of the current date.
 * @return {String} The abbreviated timezone name (e.g. "EST")
 */
rflect.datetime.DateTime.prototype.getTimezone = function () {
  return rflect.datetime.DateTime.getTimezoneAbbreviation(this.getUTCOffset, this.isDST());
};

rflect.datetime.DateTime.prototype.setTimezoneOffset = function (s) {
  var here = this.getTimezoneOffset(), there = Number(s) * -6 / 10;
  this.addMinutes(there - here);
  return this;
};

rflect.datetime.DateTime.prototype.setTimezone = function (s) {
  return this.setTimezoneOffset(rflect.datetime.DateTime.getTimezoneOffset(s));
};

/**
 * Get the offset from UTC of the current date.
 * @return {String} The 4-character offset string prefixed with + or - (e.g. "-0500")
 */
rflect.datetime.DateTime.prototype.getUTCOffset = function () {
  var n = this.getTimezoneOffset() * -10 / 6, r;
  if (n < 0) {
    r = (n - 10000).toString();
    return r[0] + r.substr(2);
  } else {
    r = (n + 10000).toString();
    return "+" + r.substr(1);
  }
};

/**
 * Gets the name of the day of the week.
 * @param {Boolean}  true to return the abbreviated name of the day of the week
 * @return {String}  The name of the day
 */
rflect.datetime.DateTime.prototype.getDayName = function (abbrev) {
  return abbrev ? rflect.loc.datetime.DateTime.abbreviatedDayNames[this.getDay()] :
         rflect.loc.datetime.DateTime.dayNames[this.getDay()];
};

/**
 * Gets the month name.
 * @param {Boolean}  true to return the abbreviated name of the month
 * @return {String}  The name of the month
 */
rflect.datetime.DateTime.prototype.getMonthName = function (abbrev) {
  return abbrev ? rflect.loc.datetime.DateTime.abbreviatedMonthNames[this.getMonth()] :
         rflect.loc.datetime.DateTime.monthNames[this.getMonth()];
};

// private
rflect.datetime.DateTime.prototype._toString = rflect.datetime.DateTime.prototype.toString;

// Debug toString version
rflect.datetime.DateTime.prototype.toString = function DateTime_toString() {
  return this.getISO8601();
};


/**
 * Converts the value of the current rflect.datetime.DateTime object to its equivalent string representation.
 * Format Specifiers
 <pre>
 Format  Description                                                                  Example
 ------  ---------------------------------------------------------------------------  -----------------------
 s      The seconds of the minute between 1-59.                                      "1" to "59"
 ss     The seconds of the minute with leading zero if required.                     "01" to "59"

 m      The minute of the hour between 0-59.                                         "1"  or "59"
 mm     The minute of the hour with leading zero if required.                        "01" or "59"

 h      The hour of the day between 1-12.                                            "1"  to "12"
 hh     The hour of the day with leading zero if required.                           "01" to "12"

 H      The hour of the day between 1-23.                                            "1"  to "23"
 HH     The hour of the day with leading zero if required.                           "01" to "23"

 d      The day of the month between 1 and 31.                                       "1"  to "31"
 dd     The day of the month with leading zero if required.                          "01" to "31"
 ddd    Abbreviated day name. rflect.loc.datetime.DateTime.abbreviatedDayNames.                  "Mon" to "Sun"
 dddd   The full day name. rflect.loc.datetime.DateTime.dayNames.                                "Monday" to "Sunday"

 M      The month of the year between 1-12.                                          "1" to "12"
 MM     The month of the year with leading zero if required.                         "01" to "12"
 MMM    Abbreviated month name. rflect.loc.datetime.DateTime.abbreviatedMonthNames.              "Jan" to "Dec"
 MMMM   The full month name. rflect.loc.datetime.DateTime.monthNames.                            "January" to "December"

 yy     Displays the year as a maximum two-digit number.                             "99" or "07"
 yyyy   Displays the full four digit year.                                           "1999" or "2007"

 t      Displays the first character of the A.M./P.M. designator.                    "A" or "P"
 rflect.loc.datetime.DateTime.amDesignator or rflect.loc.datetime.DateTime.pmDesignator
 tt     Displays the A.M./P.M. designator.                                           "AM" or "PM"
 rflect.loc.datetime.DateTime.amDesignator or rflect.loc.datetime.DateTime.pmDesignator
 </pre>
 * @param {String}   A format string consisting of one or more format spcifiers [Optional].
 * @return {String}  A string representation of the current rflect.datetime.DateTime object.
 */
rflect.datetime.DateTime.prototype.toFormattedString = function (format) {
  var self = this;

  var p = function p(s) {
    return (s.toString().length == 1) ? "0" + s : s;
  };

  return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,
          function (format) {
            switch (format) {
              case "hh":
                return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
              case "h":
                return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
              case "HH":
                return p(self.getHours());
              case "H":
                return self.getHours();
              case "mm":
                return p(self.getMinutes());
              case "m":
                return self.getMinutes();
              case "ss":
                return p(self.getSeconds());
              case "s":
                return self.getSeconds();
              case "yyyy":
                return self.getFullYear();
              case "yy":
                return self.getFullYear().toString().substring(2, 4);
              case "dddd":
                return self.getDayName();
              case "ddd":
                return self.getDayName(true);
              case "dd":
                return p(self.getDate());
              case "d":
                return self.getDate().toString();
              case "MMMM":
                return self.getMonthName();
              case "MMM":
                return self.getMonthName(true);
              case "MM":
                return p((self.getMonth() + 1));
              case "M":
                return self.getMonth() + 1;
              case "t":
                return self.getHours() < 12 ? rflect.loc.datetime.DateTime.amDesignator.substring(0, 1) : rflect.loc.datetime.DateTime.pmDesignator.substring(0, 1);
              case "tt":
                return self.getHours() < 12 ? rflect.loc.datetime.DateTime.amDesignator : rflect.loc.datetime.DateTime.pmDesignator;
              case "zzz":
              case "zz":
              case "z":
                return "";
            }
          }
          ) : this._toString();
};