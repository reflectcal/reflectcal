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
goog.require('rflect.date');

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
 * @param {string=} opt_calendarId Id of calendar this event belongs to.
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
  this.alertIntervals = [15 * 60 * 1000];
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
 * Event short id.
 * @type {number}
 * @private
 */
rflect.cal.events.Event.eventUid_ = 0;


/**
 * @returns {number} Event id.
 */
rflect.cal.events.Event.createEventId = function() {
  return rflect.cal.events.Event.eventUid_++;
};


/**
 * Factory method that creates event from JSON array.
 * @param {Array} aArray Array representation.
 * @return {rflect.cal.events.Event} Event representation.
 */
rflect.cal.events.Event.fromJSON = function(aArray) {
  var longId = aArray[rflect.cal.events.Event.FIELD_ID];
  // We parse start day with day and week fields, they are needed for forming
  // chips.
  var startDate = rflect.date.createDateShimFromTimestamp(
      +aArray[rflect.cal.events.Event.FIELD_START_DATE], true);
  if (goog.DEBUG)
    _log('startDate', startDate);
  var endDate = rflect.date.createDateShimFromTimestamp(
      +aArray[rflect.cal.events.Event.FIELD_END_DATE], true);
  if (goog.DEBUG)
    _log('endDate', endDate);
  var summary = aArray[rflect.cal.events.Event.FIELD_SUMMARY];
  var description = aArray[rflect.cal.events.Event.FIELD_DESCRIPTION];
  var allDay = aArray[rflect.cal.events.Event.FIELD_ALL_DAY];
  var calendarId = aArray[rflect.cal.events.Event.FIELD_CALENDAR_ID];

  return rflect.cal.events.Event.createEvent(longId, startDate, endDate,
      allDay, summary, description, calendarId);
}


/**
 * Factory method that creates event from args.
 * @param {string} aLongId Server-side id for event.
 * @param {rflect.date.DateShim} aStartDate Start date.
 * @param {rflect.date.DateShim} aEndDate End date.
 * @param {boolean} aAllDay Whether event is all day.
 * @param {string=} opt_summary Name of event.
 * @param {string=} opt_description Longer description of event.
 * @param {string=} opt_calendarId Calendar id.
 * @return {rflect.cal.events.Event} Event representation.
 */
rflect.cal.events.Event.createEvent = function(aLongId,
    aStartDate, aEndDate, aAllDay, opt_summary, opt_description,
    opt_calendarId) {
  var uid = rflect.cal.events.Event.createEventId();
  return new rflect.cal.events.Event(uid, aLongId, aStartDate, aEndDate,
      aAllDay, opt_summary, opt_description, opt_calendarId);
}


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
 * @type {string}
 */
rflect.cal.events.Event.prototype.calendarId = '';


/**
 * Intervals showing how much time before should we alert user above event, in
 * ms.
 * @type {Array.<number>}
 */
rflect.cal.events.Event.prototype.alertIntervals;


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
rflect.cal.events.Event.prototype['toJSON'] = function() {
  var event = [];

  event[rflect.cal.events.Event.FIELD_ID] = this.longId;
  event[rflect.cal.events.Event.FIELD_START_DATE] = this.startDate.getTime();
  event[rflect.cal.events.Event.FIELD_END_DATE] = this.endDate.getTime();
  event[rflect.cal.events.Event.FIELD_SUMMARY] = this.summary;
  event[rflect.cal.events.Event.FIELD_DESCRIPTION] = this.description;
  event[rflect.cal.events.Event.FIELD_ALL_DAY] = this.allDay;
  event[rflect.cal.events.Event.FIELD_CALENDAR_ID] = this.calendarId;

  return event;
};