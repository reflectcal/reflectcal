/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar that groups events.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.Calendar');



/**
 * Class that stores info about calendar.
 * @constructor
 */
rflect.cal.events.Calendar = function(aUid, aName) {
  this.id = aUid;
  this.name = aName;
};


/**
 * Index of id in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_ID = 0;


/**
 * Index of start date in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_NAME = 1;


/**
 * Id of calendar.
 * @type {number}
 */
rflect.cal.events.Calendar.prototype.id;


/**
 * Name of calendar.
 * @type {string}
 * @private
 */
rflect.cal.events.Calendar.prototype.name;


/**
 * Color of calendar.
 * @type {string}
 * @private
 */
rflect.cal.events.Calendar.prototype.color;


/**
 * @return {rflect.cal.events.Calendar} Clone of this calendar.
 */
rflect.cal.events.Calendar.prototype.clone = function() {
  var clone = new rflect.cal.events.Calendar(this.id, this.name);

  return clone;
};
