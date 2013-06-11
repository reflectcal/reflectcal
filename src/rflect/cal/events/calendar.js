/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar that groups events.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.Calendar');

goog.require('goog.array');



/**
 * Class that stores info about calendar.
 * @param {number} aUid Client-side id for calendar.
 * @param {string} aName Name of calendar.
 * @param {rflect.cal.events.ColorCode} aColorCode Color code object.
 * @param {boolean} opt_readOnly Whether calendar is read-only.
 * @constructor
 */
rflect.cal.events.Calendar = function(aUid, aName, aColorCode, opt_readOnly) {
  this.id = aUid;
  this.name = aName;
  this.colorCode = aColorCode;
  this.eventIds = [];
  this.readOnly = opt_readOnly || false;
};


/**
 * Index of id in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_ID = 0;


/**
 * Index of name in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_NAME = 1;


/**
 * Index of color code in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_COLOR_CODE = 2;


/**
 * Index of "read only" property in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_READ_ONLY = 3;


/**
 * Id of calendar.
 * @type {number}
 */
rflect.cal.events.Calendar.prototype.id;


/**
 * Name of calendar.
 * @type {string}
 */
rflect.cal.events.Calendar.prototype.name;


/**
 * Color of calendar.
 * @type {rflect.cal.events.ColorCode}
 */
rflect.cal.events.Calendar.prototype.colorCode;


/**
 * Whether this calendar is visible.
 * @type {boolean}
 */
rflect.cal.events.Calendar.prototype.visible;


/**
 * Collection of event ids of this calendar.
 * @type {Array.<number>}
 */
rflect.cal.events.Calendar.prototype.eventIds;


/**
 * Whether this calendar is read-only.
 * @type {boolean}
 */
rflect.cal.events.Calendar.prototype.readOnly;


/**
 * @return {rflect.cal.events.Calendar} Clone of this calendar.
 */
rflect.cal.events.Calendar.prototype.clone = function() {
  var clone = new rflect.cal.events.Calendar(this.id, this.name,
      this.colorCode, this.readOnly);

  return clone;
};


/**
 * @param {rflect.cal.events.Event} aEvent Event to add to this calendar.
 */
rflect.cal.events.Calendar.prototype.addEvent = function(aEvent) {
  this.eventIds.push(aEvent.id);
};


/**
 * @param {rflect.cal.events.Event} aEvent Event to remove from this calendar.
 */
rflect.cal.events.Calendar.prototype.deleteEvent = function(aEvent) {
  var id = aEvent.id;
  goog.array.remove(this.eventIds, id);
};

