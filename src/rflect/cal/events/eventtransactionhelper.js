/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event transaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.EventTransactionHelper');

goog.require('rflect.date.DateShim');



/**
 * Class that helps to create events in steps, managing event state between
 * them, also abstracts away this work from generic event manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 */
rflect.cal.events.EventTransactionHelper = function(aEventManager) {

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

}


/**
 * Event which creation is pending.
 * @type {rflect.cal.events.Event}
 * @private
 */
rflect.cal.events.EventTransactionHelper.prototype.temporaryEvent_;


/**
 * Begins creation of event in case when creation requires separate steps, as
 * when creating event from ui, with dialog.
 */
rflect.cal.events.EventTransactionHelper.prototype.beginEventCreation =
    function() {
  this.temporaryEvent_ = rflect.cal.events.EventManager.createEvent('', null,
      null, false);
}

/**
 * @param {goog.date.DateTime|rflect.date.DateShim} aStartDate Start date.
 */
rflect.cal.events.EventTransactionHelper.prototype.setStartDate =
    function(aStartDate) {
  this.temporaryEvent_.startDate = rflect.date.createDateShim(
      aStartDate.getYear(), aStartDate.getMonth(), aStartDate.getDate(),
      aStartDate.getHours(), aStartDate.getMinutes(), aStartDate.getSeconds(),
      true);
}


/**
 * @param {goog.date.DateTime|rflect.date.DateShim} aEndDate End date.
 */
rflect.cal.events.EventTransactionHelper.prototype.setEndDate =
    function(aEndDate) {
  this.temporaryEvent_.endDate = rflect.date.createDateShim(
      aEndDate.getYear(), aEndDate.getMonth(), aEndDate.getDate(),
      aEndDate.getHours(), aEndDate.getMinutes(), aEndDate.getSeconds());
}


/**
 * @param {string} aSummary Event name.
 */
rflect.cal.events.EventTransactionHelper.prototype.setSummary =
    function(aSummary) {
  this.temporaryEvent_.summary = aSummary;
}


/**
 * @param {string} aDescription Event description.
 */
rflect.cal.events.EventTransactionHelper.prototype.setDescription =
    function(aDescription) {
  this.temporaryEvent_.description = aDescription;
}


/**
 * @param {string} aLongId Event long id.
 */
rflect.cal.events.EventTransactionHelper.prototype.setLongId =
    function(aLongId) {
  this.temporaryEvent_.longId = aLongId;
}


/**
 * @param {boolean} aAllDay Whether event is all-day.
 */
rflect.cal.events.EventTransactionHelper.prototype.setAllDay =
    function(aAllDay) {
  this.temporaryEvent_.allDay = aAllDay;
}


/**
 * Ends event creation.
 */
rflect.cal.events.EventTransactionHelper.prototype.endEventCreation =
    function() {
  this.eventManager_.addEvent(this.temporaryEvent_);
  this.temporaryEvent_ = null;
}
