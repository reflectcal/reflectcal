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
    var hasChip = true;
    var dayChipStartMins = 0;
    var dayChipEndMins = 0;
    var startIsCut = false;
    var endIsCut = false;

    var event = new rflect.cal.events.Event();

    // Generating chips.
    while (hasNext) {
      hasPrev = !currentDate.equalsByDate(startDate);
      hasNext = !currentDate.equalsByDate(endDate);

      hasPrevWeek = !currentDate.equalsByWeek(startDate);
      hasNextWeek = !currentDate.equalsByWeek(endDate);

      if (!hasNext){
        if (eventEndMins == 0)
          hasChip = false;
        else
          dayChipEndMins = eventEndMins;
      } else {
         dayChipEndMins = rflect.cal.events.Chip.MAX_MINUTES_DAY;
         endIsCut = true;
      }
      if (!hasPrev){
        dayChipStartMins = eventStartMins;
      } else {
         dayChipStartMins = 0;
         startIsCut = true;
      }

      if (!hasNextWeek){
        if (eventEndMins == 0)
          hasWeekChip = false;
        else
          weekChipEndMins = currentDate.getWeekday() *
              rflect.cal.events.MAX_MINUTES_DAY + eventEndMins;
      } else {
        weekChipEndMins = rflect.cal.events.Chip.MAX_MINUTES_WEEK;
        endIsCut = true;
      }
      if (!hasPrevWeek){
        weekChipStartMins = currentDate.getWeekday() *
            rflect.cal.events.MAX_MINUTES_DAY + eventStartMins;
      } else {
         weekChipStartMins = 0;
         startIsCut = true;
      }

      if (hasChip){
        var chip = new rflect.cal.events.Chip(event.id, dayChipStartMins,
            dayChipEndMins, startIsCut, endIsCut);
        this.putDayChip(chip, currentDate);
      }
      if (hasWeekChip){
        var chip = new rflect.cal.events.Chip(event.id, dayChipStartMins,
            dayChipEndMins, startIsCut, endIsCut);
        this.putDayChip(chip, currentDate);
      }
      currentDate = startDate.getTomorrow();
    }
  }
};


/**
 * Saves chip.
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

