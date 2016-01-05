/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar that groups events.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.Calendar');

goog.require('goog.array');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');



/**
 * Class that stores info about calendar.
 * @param {string} aUid Id for calendar.
 * @param {string} aName Name of calendar.
 * @param {rflect.cal.events.ColorCode} aColorCode Color code object.
 * @param {boolean=} opt_visible Whether calendar is visible.
 * @param {boolean=} opt_readOnly Whether calendar is read-only.
 * @param {boolean=} opt_own Whether calendar is owned by user himself.
 * @param {string=} opt_owner User name of calendar owner.
 * @constructor
 */
rflect.cal.events.Calendar = function(aUid, aName, aColorCode, opt_visible,
    opt_readOnly, opt_own, opt_owner) {
  this.id = aUid;
  this.name = aName;
  this.colorCode = aColorCode;
  this.eventIds = [];
  this.visible = opt_visible || true;
  this.readOnly = opt_readOnly || false;
  this.own = opt_own || true;
  this.owner = opt_owner || '';
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
 * Index of visibility state in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_VISIBLE = 2;


/**
 * Index of color code in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_COLOR_CODE_INDEX = 3;


/**
 * Index of "read only" property in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_READ_ONLY = 4;


/**
 * Index of "own" property in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_OWN = 5;


/**
 * Index of "owner" property in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Calendar.FIELD_OWNER = 6;


/**
 * Id of calendar.
 * @type {string}
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
 * Whether this calendar is owned by user himself.
 * @type {boolean}
 */
rflect.cal.events.Calendar.prototype.own;


/**
 * User name of calendar owner.
 * @type {string}
 */
rflect.cal.events.Calendar.prototype.owner;


/**
 * @return {string} Name to show on UI, if original name is empty, ui name will
 * be derived from color code.
 */
rflect.cal.events.Calendar.prototype.getUIName = function() {
  return this.name || this.colorCode.getFullName();
};


/**
 * @return {rflect.cal.events.Calendar} Clone of this calendar.
 */
rflect.cal.events.Calendar.prototype.clone = function() {
  var clone = new rflect.cal.events.Calendar(this.id, this.name,
      this.colorCode, this.visible, this.readOnly, this.own, this.owner);

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


/**
 * @return {Array} JSON representation of event.
 */
rflect.cal.events.Calendar.prototype['toJSON'] = function() {
  var cal = [];
  
  cal[rflect.cal.events.Calendar.FIELD_ID] = this.id;
  cal[rflect.cal.events.Calendar.FIELD_NAME] = this.name;
  cal[rflect.cal.events.Calendar.FIELD_VISIBLE] = this.visible;
  cal[rflect.cal.events.Calendar.FIELD_COLOR_CODE_INDEX] = this.colorCode.id;
  cal[rflect.cal.events.Calendar.FIELD_READ_ONLY] = this.readOnly;
  cal[rflect.cal.events.Calendar.FIELD_OWN] = this.own;
  cal[rflect.cal.events.Calendar.FIELD_OWNER] = this.owner;

  return cal;
};


/**
 * Factory method that creates calendar from args.
 * @param {Array} aCalArray Array of calendar properties.
 * @return {rflect.cal.events.Calendar} Calendar.
 */
rflect.cal.events.Calendar.fromJSON = function(aCalArray) {

  var id = aCalArray[rflect.cal.events.Calendar.FIELD_ID];
  var name = aCalArray[rflect.cal.events.Calendar.FIELD_NAME];
  var visible = aCalArray[rflect.cal.events.Calendar.FIELD_VISIBLE];
  var colorCodeIndex = aCalArray[
      rflect.cal.events.Calendar.FIELD_COLOR_CODE_INDEX];
  var readOnly = aCalArray[rflect.cal.events.Calendar.FIELD_READ_ONLY];
  var own = aCalArray[rflect.cal.events.Calendar.FIELD_OWN];
  var owner = aCalArray[rflect.cal.events.Calendar.FIELD_OWNER];

  // Choose a random array index in [0, i] (inclusive with i, where i =
  // codes.length - 1).
  var pickIndex = goog.isDef(colorCodeIndex) ? colorCodeIndex :
      Math.floor(Math.random() * rflect.cal.i18n.PREDEFINED_COLOR_CODES.length);

  var colorCode = rflect.cal.i18n.PREDEFINED_COLOR_CODES[pickIndex] ||
      rflect.cal.i18n.PREDEFINED_COLOR_CODES[0];

  return new rflect.cal.events.Calendar(id, name, colorCode, visible, readOnly,
      own, owner);
}
