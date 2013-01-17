/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Individual event class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.require('rflect.cal.i18n.Symbols');

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
 * @constructor
 */
rflect.cal.events.Event = function(aUid, aLongId, aStartDate, aEndDate, aAllDay,
    opt_summary, opt_description) {
  this.id = aUid;
  this.longId = aLongId;
  this.startDate = aStartDate;
  this.endDate = aEndDate;
  this.allDay = aAllDay;
  this.summary = opt_summary ||  rflect.cal.i18n.Symbols.NO_NAME_EVENT;
  this.description = opt_description ||  '';
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



