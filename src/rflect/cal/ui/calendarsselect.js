/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Specialized select for calendars.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.CalendarsSelect');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.Disposable');



/**
 * Main class for calendars select.
 * @param {Element} aSelect Select element to enhance.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.ui.CalendarsSelect = function(aSelect, aEventManager) {
  goog.Disposable.call(this);

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  this.select_ = aSelect;

  this.updateFlag = true;

  rflect.cal.ui.CalendarsSelect.instances_.push(this);
};
goog.inherits(rflect.cal.ui.CalendarsSelect, goog.Disposable);


/**
 * Collection of select instances used for easy updates.
 * @type {Array.<rflect.cal.ui.CalendarsSelect>}
 */
rflect.cal.ui.CalendarsSelect.instances_ = [];


/**
 * Informs instances that they should be updated on next
 * rflect.cal.ui.CalendarsSelect#update call.
 */
rflect.cal.ui.CalendarsSelect.setInstancesToUpdate = function() {
  goog.array.forEach(rflect.cal.ui.CalendarsSelect.instances_,
      function(aInstance){
    aInstance.updateFlag = true;
  });
}


/**
 * Calendars select.
 * @type {Element}
 * @private
 */
rflect.cal.ui.CalendarsSelect.prototype.select_;


/**
 * Whether this select should be updated.
 * @type {boolean}
 */
rflect.cal.ui.CalendarsSelect.prototype.updateFlag;


/**
 * @return {string} Selected calendar id.
 */
rflect.cal.ui.CalendarsSelect.prototype.getCalendarId = function () {
  return this.select_.options[this.select_.selectedIndex].value;
}


/**
 * @param {string} aCalendarId Calendar id.
 */
rflect.cal.ui.CalendarsSelect.prototype.setCalendarId = function (aCalendarId) {
  var index = goog.array.findIndex(this.select_.options, function(option){
    return option.value == aCalendarId;
  });
  if (!(index < 0))
    this.select_.selectedIndex = index;
}


/**
 * Populates calendars select. Generic function.
 */
rflect.cal.ui.CalendarsSelect.prototype.update = function() {

  if (this.updateFlag) {

    goog.dom.removeChildren(this.select_);

    this.eventManager_.forEachCalendar(function(calendar, calendarId){
      this.select_.appendChild(goog.dom.createDom('option', {value: calendarId},
          calendar.getUIName()));
    }, this);

    this.updateFlag = false;
  }
}


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.CalendarsSelect.prototype.disposeInternal = function () {
  goog.array.remove(rflect.cal.ui.CalendarsSelect.instances_, this);
  this.select_ = null;
  rflect.cal.ui.CalendarsSelect.superClass_.disposeInternal.call(this);

}