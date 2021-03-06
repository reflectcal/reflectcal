/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class that stores info about calendar.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.ColorCode');

goog.require('goog.array');
goog.require('rflect.cal.i18n.Symbols');



/**
 * Class that stores info about calendar.
 * @param {number} aUid Color code id.
 * @param {string} aName Localized name.
 * @param {string} aEventClass Css name defining event color.
 * @param {string} aCheckboxClass Css name defining checkbox color.
 * @param {string} aEventIsInProgressClass Css name defining event color when it
 * is in progress.
 * @constructor
 */
rflect.cal.events.ColorCode = function(aUid, aName, aEventClass,
    aCheckboxClass, aEventIsInProgressClass) {
  this.id = aUid;
  this.name = aName;
  this.eventClass = aEventClass;
  this.checkboxClass = aCheckboxClass;
  this.eventIsInProgressClass = aEventIsInProgressClass;
};


/**
 * Index of id in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.ColorCode.FIELD_ID = 0;


/**
 * Index of name in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.ColorCode.FIELD_NAME = 1;


/**
 * Index of event class in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.ColorCode.FIELD_EVENT_CLASS = 2;


/**
 * Index of checkbox class in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.ColorCode.CHECKBOX_EVENT_CLASS = 3;


/**
 * Id of color code.
 * @type {number}
 */
rflect.cal.events.ColorCode.prototype.id;


/**
 * Name of color code.
 * @type {string}
 */
rflect.cal.events.ColorCode.prototype.name;


/**
 * Event class of color code.
 * @type {string}
 */
rflect.cal.events.ColorCode.prototype.eventClass;


/**
 * Event class for in progress state.
 * @type {string}
 */
rflect.cal.events.ColorCode.prototype.eventIsInProgressClass;


/**
 * Checkbox class of color code.
 * @type {string}
 */
rflect.cal.events.ColorCode.prototype.checkboxClass;


/**
 * @return {string} Name with "calendar" postfix.
 */
rflect.cal.events.ColorCode.prototype.getFullName = function() {
  return this.name + rflect.cal.i18n.Symbols.CALENDAR_POSTFIX;
};

