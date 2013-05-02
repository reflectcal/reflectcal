/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event transaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.EventHolder');

goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.date.DateShim');


/**
 * Class that holds event state between separate operations, such as create or
 * edit. Also abstracts away this work from generic event manager.
 *
 * Lifecycle:
 * 1. openSession with or without event
 * 2. add some parameters
 * 3. end session
 *   a. if delete - deletes only if event was specified at open
 *   b. if edit - edits only if event was specified at open
 *   c. if add - adds new one when event wasn't specified at open
 *   d. if add - adds duplicate when event was specified at open
 *
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 */
rflect.cal.events.EventHolder = function(aEventManager) {

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

}


/**
 * Session types/
 * @enum {number}
 */
rflect.cal.events.EventHolder.SessionTypes = {
  CREATE: 0,
  EDIT: 1
}


/**
 * Type of this session.
 * @type {rflect.cal.events.EventHolder.SessionTypes}
 * @private
 */
rflect.cal.events.EventHolder.prototype.sessionType_;


/**
 * Event which creation is pending.
 * @type {rflect.cal.events.Event}
 * @private
 */
rflect.cal.events.EventHolder.prototype.newTemporaryEvent_;


/**
 * Old version of event.
 * @type {rflect.cal.events.Event|undefined}
 * @private
 */
rflect.cal.events.EventHolder.prototype.backUpEvent_;


/**
 * Begins creation of event in case when creation requires separate steps, as
 * when creating event from ui, with dialog.
 * @param {rflect.cal.events.Event=} opt_event Event to work with in this
 * session. If omitted, new one will be created.
 */
rflect.cal.events.EventHolder.prototype.openSession =
    function(opt_event) {
  if (opt_event) {
    this.newTemporaryEvent_ = opt_event.clone();
    this.newTemporaryEvent_.id = rflect.cal.events.EventManager.createEventId();
  }
  else
    this.newTemporaryEvent_ = rflect.cal.events.EventManager.createEvent('',
        null, null, false);

  this.backUpEvent_ = opt_event && opt_event.clone();

}


/**
 * @param {goog.date.DateTime|rflect.date.DateShim} aStartDate Start date.
 */
rflect.cal.events.EventHolder.prototype.setStartDate =
    function(aStartDate) {
  this.newTemporaryEvent_.startDate = rflect.date.createDateShim(
      aStartDate.getYear(), aStartDate.getMonth(), aStartDate.getDate(),
      aStartDate.getHours(), aStartDate.getMinutes(), aStartDate.getSeconds(),
      true);
}


/**
 * @param {goog.date.DateTime|rflect.date.DateShim} aEndDate End date.
 */
rflect.cal.events.EventHolder.prototype.setEndDate =
    function(aEndDate) {
  this.newTemporaryEvent_.endDate = rflect.date.createDateShim(
      aEndDate.getYear(), aEndDate.getMonth(), aEndDate.getDate(),
      aEndDate.getHours(), aEndDate.getMinutes(), aEndDate.getSeconds(),
      true);
}


/**
 * @param {string} aSummary Event name.
 */
rflect.cal.events.EventHolder.prototype.setSummary =
    function(aSummary) {
  this.newTemporaryEvent_.summary = aSummary || '';
}


/**
 * @param {string} aDescription Event description.
 */
rflect.cal.events.EventHolder.prototype.setDescription =
    function(aDescription) {
  this.newTemporaryEvent_.description = aDescription || '';
}


/**
 * @param {string} aLongId Event long id.
 */
rflect.cal.events.EventHolder.prototype.setLongId =
    function(aLongId) {
  this.newTemporaryEvent_.longId = aLongId;
}


/**
 * @param {boolean} aAllDay Whether event is all-day.
 */
rflect.cal.events.EventHolder.prototype.setAllDay =
    function(aAllDay) {
  this.newTemporaryEvent_.allDay = aAllDay;
}


/**
 * @return {goog.date.DateTime|rflect.date.DateShim} aStartDate Start date.
 */
rflect.cal.events.EventHolder.prototype.getStartDate = function() {
  return this.newTemporaryEvent_.startDate;
}


/**
 * @return {goog.date.DateTime|rflect.date.DateShim} aEndDate End date.
 */
rflect.cal.events.EventHolder.prototype.getEndDate = function() {
  return this.newTemporaryEvent_.endDate;
}


/**
 * @return {string} aSummary Event name.
 */
rflect.cal.events.EventHolder.prototype.getSummary = function() {
  return this.newTemporaryEvent_.summary;
}


/**
 * @return {string} aDescription Event description.
 */
rflect.cal.events.EventHolder.prototype.getDescription = function() {
  return this.newTemporaryEvent_.description;
}


/**
 * @return {string} aLongId Event long id.
 */
rflect.cal.events.EventHolder.prototype.getLongId = function() {
  return this.newTemporaryEvent_.longId;
}


/**
 * @return {boolean} aAllDay Whether event is all-day.
 */
rflect.cal.events.EventHolder.prototype.getAllDay = function() {
  return this.newTemporaryEvent_.allDay;
}
    
    
/**
 * @return {rflect.cal.events.Event|undefined} Backup event.
 */
rflect.cal.events.EventHolder.prototype.getBackUpEvent =
    function() {
  return this.backUpEvent_;
}


/**
 * Ends event creation with adding new event.
 */
rflect.cal.events.EventHolder.prototype.endWithAdd = function() {
  this.eventManager_.addEvent(this.newTemporaryEvent_);
  //TODO(alexk): use back up id here
}


/**
 * Ends event creation.
 */
rflect.cal.events.EventHolder.prototype.endWithEdit = function() {
  if (this.backUpEvent_) {
    this.eventManager_.deleteEvent(this.backUpEvent_);
    this.eventManager_.addEvent(this.newTemporaryEvent_);
  } else
  // Edit without specifying event at the beginning is effectively equals to
  // add.
    this.endWithAdd();
}


/**
 * Ends event creation.
 */
rflect.cal.events.EventHolder.prototype.endWithDelete = function() {
  if (this.backUpEvent_) {
    this.eventManager_.deleteEvent(this.backUpEvent_);
  }
}


