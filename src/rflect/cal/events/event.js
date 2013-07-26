/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Individual event class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimePatterns');

goog.provide('rflect.cal.events.Event');



/**
 * Class that stores info about event.
 * @param {number} aUid Client-side id for event.
 * @param {string} aLongId Server-side id for event.
 * @param {rflect.date.DateShim} aStartDate Start date.
 * @param {rflect.date.DateShim} aEndDate End date.
 * @param {boolean} aAllDay Whether event is all day.
 * @param {string=} opt_summary Name of event.
 * @param {string=} opt_description Longer description of event.
 * @param {number=} opt_calendarId Id of calendar this event belongs to.
 * @constructor
 */
rflect.cal.events.Event = function(aUid, aLongId, aStartDate, aEndDate, aAllDay,
    opt_summary, opt_description, opt_calendarId) {
  this.id = aUid;
  this.longId = aLongId;
  this.startDate = aStartDate;
  this.endDate = aEndDate;
  this.allDay = aAllDay;
  this.summary = opt_summary || '';
  this.description = opt_description || '';
  goog.isDef(opt_calendarId) && (this.calendarId = opt_calendarId);
};


/**
 * Index of id in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_ID = 0;


/**
 * Index of start date in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_START_DATE = 1;


/**
 * Index of end date in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_END_DATE = 2;


/**
 * Index of summary in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_SUMMARY = 3;


/**
 * Index of description in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_DESCRIPTION = 4;


/**
 * Index of all day flag in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_ALL_DAY = 5;


/**
 * Index of calendar id in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Event.FIELD_CALENDAR_ID = 6;


/**
 * Id of event.
 * @type {number}
 */
rflect.cal.events.Event.prototype.id;


/**
 * Id of event that is stored on server.
 * @type {string}
 */
rflect.cal.events.Event.prototype.longId;


/**
 * Summary (name) of event.
 * @type {string}
 */
rflect.cal.events.Event.prototype.summary;


/**
 * Description of event.
 * @type {string}
 */
rflect.cal.events.Event.prototype.description;

/**
 * Start date of event.
 * @type {rflect.date.DateShim}
 */
rflect.cal.events.Event.prototype.startDate;


/**
 * End date of event.
 * @type {rflect.date.DateShim}
 */
rflect.cal.events.Event.prototype.endDate;


/**
 * Whether event is all day.
 * @type {boolean}
 */
rflect.cal.events.Event.prototype.allDay;


/**
 * Calendar id.
 * @type {number}
 */
rflect.cal.events.Event.prototype.calendarId = -1;


/**
 * @return {string} Human-comfortable string representation.
 */
rflect.cal.events.Event.prototype.toHumanString = function() {
  var startDate = this.startDate;
  var endDate = this.endDate.clone();
  var result;
  var formatStart;
  var formatEnd;
  var formatStringStart;
  var formatStringEnd;
  var allDay = this.allDay ||
      (startDate.getHours() == 0 &&
      startDate.getMinutes() == 0 &&
      endDate.getHours() == 0 &&
      endDate.getMinutes() == 0);

  var timeFormatString = ' ' + goog.i18n.DateTimeSymbols.TIMEFORMATS[3];

  if (allDay) {
    // To make date more human readable, we change exclusive endDate to
    // inclusive, thus subtracting 1 day from end.
    endDate.add(new goog.date.Interval(goog.date.Interval.DAYS, -1));
    timeFormatString = '';
  }

  if (startDate.getFullYear() != endDate.getFullYear()) {
    // All fields are not equal.
    formatStringStart = goog.i18n.DateTimePatterns.MONTH_DAY_ABBR + ', yyyy' +
        timeFormatString;
    formatStart = new goog.i18n.DateTimeFormat(formatStringStart +  ' -');
    formatEnd = new goog.i18n.DateTimeFormat(' ' + formatStringStart);
    result = formatStart.format(startDate) + formatEnd.format(endDate);

  } else if (startDate.getMonth() != endDate.getMonth() ||
      (startDate.getMonth() == endDate.getMonth() &&
          startDate.getDate() != endDate.getDate())) {
    // Year is equal.
    formatStringStart = goog.i18n.DateTimePatterns.MONTH_DAY_ABBR +
        timeFormatString;
    formatStart = new goog.i18n.DateTimeFormat(formatStringStart + ' -');
    formatEnd = new goog.i18n.DateTimeFormat(' ' + formatStringStart +
        ', yyyy');
    result = formatStart.format(startDate) + formatEnd.format(endDate);

  } else {
    // Single day case.
    formatStringStart = 'EEEE, ' +
        goog.i18n.DateTimePatterns.MONTH_DAY_FULL + ', yyyy' +
        (allDay ? '' : (timeFormatString + ' -'));
    formatStart = new goog.i18n.DateTimeFormat(formatStringStart);
    result = formatStart.format(startDate);
    if (!allDay) {
      formatEnd = new goog.i18n.DateTimeFormat(timeFormatString);
      result += formatEnd.format(endDate);
    }

  }
  return result;
};


/**
 * @return String representation.
 */
rflect.cal.events.Event.prototype.toString = function() {
  return 'id: ' +
      this.id +
      ', longId: ' +
      this.longId +
      ', startDate: ' +
      this.startDate +
      ', endDate: ' +
      this.endDate +
      ', allDay: ' +
      this.allDay +
      ', summary: ' +
      this.summary +
      ', description: ' +
      this.description +
      ', calendarId: ' +
      this.calendarId;
};

/**
 * @return {rflect.cal.events.Event} Clone of this event.
 */
rflect.cal.events.Event.prototype.clone = function() {
  var clone = new rflect.cal.events.Event(this.id, this.longId, this.startDate,
      this.endDate, this.allDay, this.summary, this.description,
      this.calendarId);

  return clone;
};


/**
 * @return {Array} JSON representation of event.
 */
rflect.cal.events.Event.prototype.toJSON = function() {
  return [this.longId, this.startDate,
      this.endDate, this.allDay, this.summary, this.description,
      this.calendarId];
};