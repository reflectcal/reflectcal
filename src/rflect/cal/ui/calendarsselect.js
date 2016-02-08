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
goog.require('rflect.cal.ui.soy.selectcalendars');
goog.require('rflect.ui.UpdatableComponent');



/**
 * Main class for calendars select.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {rflect.ui.UpdatableComponent}
 */
rflect.cal.ui.CalendarsSelect = function(aEventManager) {
  rflect.ui.UpdatableComponent.call(this);

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;
};
goog.inherits(rflect.cal.ui.CalendarsSelect, rflect.ui.UpdatableComponent);


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
 * Select element selected index.
 * @type {number}
 * @private
 */
rflect.cal.ui.CalendarsSelect.prototype.selectedIndex_ = 0;


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
 * @return {string} Select element id.
 */
rflect.cal.ui.CalendarsSelect.prototype.getSelectId = function() {
  return this.getId() + '-select';
}



/**
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string}.
 * @override
 */
rflect.cal.ui.CalendarsSelect.prototype.buildHTML = function(opt_outerHTML) {
  var calendars = [];
  this.eventManager_.forEachCalendar((calendar, calendarId) => {
    calendars.push({
      id: calendarId,
      name: calendar.getUIName()
    })
  });
  return rflect.cal.ui.soy.selectcalendars.calendarsSelect({
    id: this.getId(),
    selectId: this.getSelectId(),
    includeOuterHTML: opt_outerHTML,
    calendars: calendars
  });
}


/**
 * @override
 */
rflect.cal.ui.CalendarsSelect.prototype.updateBeforeRedraw = function() {
  this.saveSelectedOption_();
}


/**
 * @override
 */
rflect.cal.ui.CalendarsSelect.prototype.updateByRedraw = function() {
  this.getElement().innerHTML = this.buildHTML(false);
  this.select_ = this.getElement().querySelector('.event-calendars');
  this.recallSelectedOption_();
}


/**
 * @override
 */
rflect.cal.ui.CalendarsSelect.prototype.enterDocument = function() {
  this.select_ = this.getElement().querySelector('.event-calendars');
}


/**
 * Saves currently selected option.
 * @private
 */
rflect.cal.ui.CalendarsSelect.prototype.saveSelectedOption_ = function() {
  this.selectedIndex_ = this.select_.selectedIndex;
}


/**
 * Recalls previously selected option, if possible.
 * @private
 */
rflect.cal.ui.CalendarsSelect.prototype.recallSelectedOption_ = function() {
  if (this.selectedIndex_ >= 0 && this.selectedIndex_ <
      this.select_.options.length)
    this.select_.selectedIndex = this.selectedIndex_;
}


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.CalendarsSelect.prototype.disposeInternal = function () {
  this.select_ = null;
  rflect.cal.ui.CalendarsSelect.superClass_.disposeInternal.call(this);
}