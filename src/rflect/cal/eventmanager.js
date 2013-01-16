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
  this.events_ = {};


  /**
   * Map of year -> {dayOfYear -> chip}.
   * @type {Object.<number, <Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  this.chipsByDay_ = {};


  /**
   * As day chips map, but only for all day chips.
   * @type {Object.<number, <Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  this.allDayChipsByDay_ = {};


  /**
   * Map of year -> {weekOfYear -> chip}.
   * @type {Object.<number, <Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  this.chipsByWeek_ = {};


  /**
   * Object for quick access to chip indexes (year, day), used for deleting of
   * chips.
   * @type {Object<number>.Array<number>}
   * @private
   */
  this.tracksChipsByDay_ = {};


  /**
   * Similar as <code>tracksChipsByDay_</code>, for week chips.
   * chips.
   * @type {Object<number>.Array<number>}
   * @private
   */
  this.tracksChipsByWeek_ = {};


  /**
   * Similar as <code>tracksChipsByDay_</code>, for all-day chips.
   * chips.
   * @type {Object<number>.Array<number>}
   * @private
   */
  this.tracksAllDayChipsByDay_ = {};


  /**
   * Tree for recurring events which have interval.
   * @type {rflect.structs.IntervalTree}
   * @private
   */
  this.plans_ = null;


  /**
   * List of recurring events with infinite intervals.
   * @type {Array.<rflect.cal.events.RecurringEvent>}
   */
  this.infinitePlans_ = [];
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

    var event = new rflect.cal.events.Event();

    var hasNext = true;
    var hasPrev = false;
    var hasNextWeek = false;
    var hasPrevWeek = false;
    var isWeekChip = false;
    var dayChipStartMins = 0;
    var dayChipEndMins = 0;
    var weekChipStartMins = 0;
    var weekChipEndMins = 0;
    var total = 0;
    var isAllDay = false;

    var chip;

    if (isAllDay)
      var allDayIndexes = [];

    // Generating chips.
    while (hasNext) {
      tomorrow = currentDate.getTomorrow();

      hasPrev = !currentDate.equalsByDate(startDate);
      hasNext = !currentDate.equalsByDate(endDate) ||
          tomorrow.equalsByDate(endDate) && eventEndMins == 0;

      isWeekChip = !hasNext || currentDate.getWeekday() == 6;

      hasPrevWeek = !currentDate.equalsByWeek(startDate);
      hasNextWeek = hasNext && tomorrow.getWeekday() == 0;

      if (isAllDay) {
        allDayIndexes[total++] = [
          currentDate.getYear(),
          currentDate.getDate()
        ];

        if (!hasNext)
          this.putAllDayChips_(allDayIndexes);
      } else {
        if (!hasNext){
          if (eventEndMins == 0){
            dayChipEndMins = rflect.cal.events.Chip.MAX_MINUTES_DAY;
          } else {
            dayChipEndMins = eventEndMins;
          }
        } else {
          dayChipEndMins = rflect.cal.events.Chip.MAX_MINUTES_DAY;
        }
        if (!hasPrev){
          dayChipStartMins = eventStartMins;
        } else {
           dayChipStartMins = 0;
        }

        chip = new rflect.cal.events.Chip(event.id, dayChipStartMins,
            dayChipEndMins, hasPrev, hasNext);
        this.putDayChip(chip, currentDate);
      }

      if (isWeekChip){
        if (!hasNextWeek){
          if (eventEndMins == 0){
            weekChipEndMins = endDate.getWeekday();
          } else
            weekChipEndMins = endDate.getWeekday() + 1;
        } else {
          weekChipEndMins = rflect.cal.events.Chip.MAX_DAYS_WEEK;
        }
        if (!hasPrevWeek){
          weekChipStartMins = startDate.getWeekday();
        } else {
           weekChipStartMins = 0;
        }

        chip = new rflect.cal.events.Chip(event.id, weekChipStartMins,
            weekChipEndMins, hasPrevWeek, hasNextWeek);
        this.putWeekChip(chip, currentDate);
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
  this.putChip_(aChip, year, dayOfYear, this.chipsByDay_,
      this.tracksChipsByDay_);
}


/**
 * Forms series of all-day chips.
 * @param {Array.<Array.<number>>} aIndexes Indexes of all-day chips.
 * @param {number} aEventId Event id.
 * @private
 */
rflect.cal.EventManager.prototype.putAllDayChips_ =
    function(aIndexes, aEventId) {
  for (var counter = 0, length = aIndexes.length; counter < length; 
      counter++) {
    var year = aIndexes[0];
    var dayOfYear = aIndexes[1];
    var chip = new rflect.cal.events.Chip(aEventId, 0, length - counter,
        counter != 0, false);

    this.putChip_(chip, year, dayOfYear, this.allDayChipsByDay_,
        this.tracksAllDayChipsByDay_);
  }
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
  this.putChip_(aChip, year, weekOfYear, this.chipsByWeek_,
      this.tracksChipsByWeek_);
}


/**
 * Puts chip in appropriate data structures.
 * @param {rflect.cal.events.Chip} aChip Chip to save.
 * @param {number} aIndex1 First index (year).
 * @param {number} aIndex2 Second index (day of year or week of year).
 * @param {number} aDataStructure Data structure where to put chip.
 * @param {number} aTracks Tracks data structure.
 * @private
 */
rflect.cal.events.EventManager.putChip_ = function(aChip, aIndex1, aIndex2,
                                                   aDataStructure, aTracks) {
  if (!(aIndex1 in aDataSctructure))
      aDataSctructure[aIndex1] = {};
    if (!(aIndex2 in aDataSctructure[aIndex1]))
      aDataSctructure[aIndex1][aIndex2] = [];
    aDataSctructure[aIndex1][aIndex2].push(aChip);
  
    aTracks[aChip.eventId] = [aIndex1, aIndex2];
}

