/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.EventManager');

goog.require('rflect.structs.IntervalTree');
goog.require('rflect.cal.events.Chip');



/**
 * Class that stores and manages event collection.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.EventManager = function(aViewManager, aTimeManager) {

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Map of event id to event.
   * @type {Object.<number, rflect.cal.events.Event|rflect.cal.events.RecurringEvent>}
   * @private
   */
  rflect.cal.EventManager.prototype.events_ = {};


  /**
   * Map of year -> {dayOfYear -> chip}.
   * @type {Object.<number, <Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  rflect.cal.EventManager.prototype.chipsByDay_ = {};


  /**
   * As day chips map, but only for all day chips.
   * @type {Object.<number, <Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  rflect.cal.EventManager.prototype.allDayChipsByDay_ = {};


  /**
   * Map of year -> {weekOfYear -> chip}.
   * @type {Object.<number, <Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  rflect.cal.EventManager.prototype.chipsByWeek_ = {};


  /**
   * Tree for recurring events which have interval.
   * @type {rflect.structs.IntervalTree}
   * @private
   */
  rflect.cal.EventManager.prototype.plans_ = null;


  /**
   * List of recurring events with infinite intervals.
   * @type {Array.<rflect.cal.events.RecurringEvent>}
   */
  rflect.cal.EventManager.prototype.infinitePlans_ = [];
};


rflect.cal.EventManager.prototype.eventUid_ = 0;


rflect.cal.EventManager.prototype.createEventId = function() {
  return this.eventUid_++;
};


/**
 * Adds events from parsed json.
 * @param {Array.<Array>} aJSONEvents List of JSON representation of events.
 */
rflect.cal.EventManager.prototype.addEvents = function(aJSONEvents) {
  for (var counter = 0, length = aJSONEvents.length; counter < length;
      counter++) {

    var jsonStartDate = aJSONEvents[counter][0];
    var startDate = rflect.date.parse(jsonStartDate, true, true);
    var jsonEndDate = aJSONEvents[counter][1];
    var endDate = rflect.date.parse(jsonEndDate);

    var eventStartMins = startDate.getHours() * 60 + startDate.getMinutes();
    var eventEndMins = endDate.getHours() * 60 + endDate.getMinutes();
    var currentDate = startDate.clone();

    var hasNext = true;
    var hasPrev = false;
    var hasNextWeek = false;
    var hasPrevWeek = false;
    var weekChip = false;
    var dayChipStartMins = 0;
    var dayChipEndMins = 0;
    var startIsCut = false;
    var endIsCut = false;
    var weekChipStartMins = 0;
    var weekChipEndMins = 0;

    var event = new rflect.cal.events.Event();

    // Generating chips.
    while (hasNext) {
      tomorrow = currentDate.getTomorrow();

      hasPrev = !currentDate.equalsByDate(startDate);
      hasNext = !currentDate.equalsByDate(endDate) ||
          tomorrow.equalsByDate(endDate) && eventEndMins == 0;
      weekChip = !hasNext || currentDate.getWeekday() == 6;

      hasPrevWeek = !currentDate.equalsByWeek(startDate);
      hasNextWeek = hasNext && tomorrow.getWeekday() == 0;

      weekChipEndMins = hasNextWeek ? rflect.cal.events.Chip.MAX_DAYS_WEEK :
          currentDate.getWeekday() + 1;
      weekChipStartMins = hasPrevWeek ? 0 : startDate.getWeekday();

      if (!hasNext){
        if (eventEndMins == 0){
          dayChipEndMins = rflect.cal.events.Chip.MAX_MINUTES_DAY;
        } else {
          dayChipEndMins = eventEndMins;
        }
        endIsCut = false;
      } else {
        dayChipEndMins = rflect.cal.events.Chip.MAX_MINUTES_DAY;
        endIsCut = true;
      }
      if (!hasPrev){
        dayChipStartMins = eventStartMins;
        startIsCut = false;
      } else {
         dayChipStartMins = 0;
         startIsCut = true;
      }

      var chip = new rflect.cal.events.Chip(event.id, dayChipStartMins,
          dayChipEndMins, startIsCut, endIsCut);
      this.putDayChip(chip, currentDate);

      if (weekChip){
        if (!hasNextWeek){
          if (eventEndMins == 0){
            weekChipEndMins = endDate.getWeekday();
            endIsCutWeek = false;
          } else
            weekChipEndMins = endDate.getWeekday() + 1;
        } else {
          weekChipEndMins = rflect.cal.events.Chip.MAX_DAYS_WEEK;
          endIsCutWeek = true;
        }
        if (!hasPrevWeek){
          weekChipStartMins = startDate.getWeekday();
        } else {
           weekChipStartMins = 0;
           startIsCutWeek = true;
        }

        chip = new rflect.cal.events.Chip(event.id, weekChipStartMins,
            weekChipEndMins, startIsCutWeek, endIsCutWeek);
        this.putWeekChip(chip, currentDate);
        weekChip = false;
      }
      currentDate = tomorrow;
    }
  }
};


/**
 * Saves day chip.
 * @param {rflect.cal.events.Chip} aChip Chip to save.
 * @param {rflect.date.DateShim} aDate Which date characterizes chip.
 * @private
 */
rflect.cal.EventManager.prototype.putDayChip_ = function(aChip, aDate) {
  var year = aDate.getYear();
  var dayOfYear = aDate.getDayOfYear();
  if (!(year in this.chipsByDay_))
    this.chipsByDay_[year] = {};
  if (!(dayOfYear in this.chipsByDay_[year]))
    this.chipsByDay_[year][dayOfYear] = [];
  this.chipsByDay_[year][dayOfYear].push(aChip);
}


/**
 * Saves week chip.
 * @param {rflect.cal.events.Chip} aChip Chip to save.
 * @param {rflect.date.DateShim} aDate Which date characterizes chip.
 * @private
 */
rflect.cal.EventManager.prototype.putWeekChip_ = function(aChip, aDate) {
  var year = aDate.getYear();
  var weekOfYear = aDate.getWeekNumber();
  if (!(year in this.chipsByWeek_))
    this.chipsByWeek_[year] = {};
  if (!(weekOfYear in this.chipsByWeek_[year]))
    this.chipsByWeek_[year][weekOfYear] = [];
  this.chipsByWeek_[year][weekOfYear].push(aChip);
}

