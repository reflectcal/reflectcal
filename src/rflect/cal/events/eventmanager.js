/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.EventManager');

goog.require('rflect.structs.IntervalTree');
goog.require('rflect.cal.events.Chip');
goog.require('rflect.cal.events.Event');



/**
 * Class that stores and manages event collection.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.events.EventManager = function(aViewManager, aTimeManager) {

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
   * @type {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  this.chipsByDay_ = {};


  /**
   * As day chips map, but only for all day chips.
   * @type {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  this.allDayChipsByDay_ = {};


  /**
   * Map of year -> {weekOfYear -> chip}.
   * @type {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
   * @private
   */
  this.chipsByWeek_ = {};


  /**
   * List of current day chips.
   * @type {Array.<!Array.<rflect.cal.events.Chip>>}
   */
  this.dayChips = [];


  /**
   * List of current all-day chips.
   * @type {Array.<!Array.<rflect.cal.events.Chip>>}
   */
  this.allDayChips = [];


  /**
   * List of current week chips.
   * @type {Array.<!Array.<rflect.cal.events.Chip>>}
   */
  this.weekChips = [];


  /**
   * Object for quick access to chip indexes (year, day), used for deleting of
   * chips.
   * @type {Object.<number, Array.<Array.<number>>>}
   * @private
   */
  this.tracksChipsByDay_ = {};


  /**
   * Similar as <code>tracksChipsByDay_</code>, for week chips.
   * chips.
   * @type {Object.<number, Array.<Array.<number>>>}
   * @private
   */
  this.tracksChipsByWeek_ = {};


  /**
   * Similar as <code>tracksChipsByDay_</code>, for all-day chips.
   * chips.
   * @type {Object.<number, Array.<Array.<number>>>}
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


/**
 * Event short id.
 * @type {number}
 * @private
 */
rflect.cal.events.EventManager.eventUid_ = 0;


/**
 * @returns {number} Event id.
 */
rflect.cal.events.EventManager.createEventId = function() {
  return rflect.cal.events.EventManager.eventUid_++;
};


/**
 * Factory method that creates event from JSON array.
 * @param {Array} aArray Array representation.
 * @return {rflect.cal.events.Event} Event representation.
 */
rflect.cal.events.EventManager.createEventFromArray = function(aArray) {
  var uid = rflect.cal.events.EventManager.createEventId();
  var longId = aArray[rflect.cal.events.Event.FIELD_ID];
  // We parse start day with day and week fields, they are needed for forming
  // chips.
  var startDate = rflect.date.parse(
      aArray[rflect.cal.events.Event.FIELD_START_DATE], true);
  var endDate = rflect.date.parse(
      aArray[rflect.cal.events.Event.FIELD_END_DATE]);
  var summary = aArray[rflect.cal.events.Event.FIELD_SUMMARY];
  var description = aArray[rflect.cal.events.Event.FIELD_DESCRIPTION];
  var allDay = aArray[rflect.cal.events.Event.FIELD_ALL_DAY];

  return new rflect.cal.events.Event(uid, longId, startDate, endDate, allDay,
      summary, description);
}


/**
 * Factory method that creates event from args.
 * @param {string} aLongId Server-side id for event.
 * @param {rflect.date.DateShim} aStartDate Start date.
 * @param {rflect.date.DateShim} aEndDate End date.
 * @param {boolean} aAllDay Whether event is all day.
 * @param {string=} opt_summary Name of event.
 * @param {string=} opt_description Longer description of event.
 * @return {rflect.cal.events.Event} Event representation.
 */
rflect.cal.events.EventManager.createEvent = function(aLongId,
    aStartDate, aEndDate, aAllDay, opt_summary, opt_description) {
  var uid = rflect.cal.events.EventManager.createEventId();
  return new rflect.cal.events.Event(uid, aLongId, aStartDate, aEndDate,
      aAllDay, opt_summary, opt_description);
}


/**
 * @return {Array.<rflect.cal.events.Chip>} Chips from data structure.
 * @param {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>} aDataStructure Data structure from where to retrieve chips.
 * @param {number} aIndex1 First index.
 * @param {number} aIndex2 Second index.
 */
rflect.cal.events.EventManager.getNestedChips_ = function(
    aDataStructure, aIndex1, aIndex2) {
  if (aDataStructure[aIndex1] && aDataStructure[aIndex1][aIndex2])
    return aDataStructure[aIndex1][aIndex2];
  return null;
}


/**
 * Gets whole all-day chips from sequences of split by day ones.
 * @param {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
 * aAllDayChipsInput Input data structure for all day chips.
 * @param {Array.<!Array.<rflect.cal.events.Chip>>} aAllDayChipsOutput Output
 * data structure for all day chips.
 * @param {Object.<number>} aKnownChipIds Collection of already processed chip 
 * ids.
 * @param {number} aYear Year index.
 * @param {number} aDayOfYear Day of year index.
 * @param {number} aDayNumber Number of day in day grid.
 * @param {number} aTotalDays Length of day grid.
 */
rflect.cal.events.EventManager.pushNestedAllDayChips_ = function(
    aAllDayChipsInput, aAllDayChipsOutput, aKnownChipIds, aYear, aDayOfYear, 
    aDayNumber, aTotalDays) {
  var allDayChips = aAllDayChipsOutput[0];
  var allDayChipsCounter = 0;
  var chips;

  if (chips = rflect.cal.events.EventManager.getNestedChips_(
      aAllDayChipsInput, aYear, aDayOfYear)) {


    for (var counter = 0, length = chips.length; counter < length; counter++) {
      var id = chips[counter].eventId;
      if (!aKnownChipIds[id]) {
        if (goog.DEBUG)
              _log('aDayNumber', aDayNumber);


        aKnownChipIds[id] = 1;
        var newChip = chips[counter].clone();
        newChip.start = aDayNumber;
        newChip.endIsCut = (aTotalDays - aDayNumber) < newChip.end;
        newChip.end = newChip.endIsCut ? aDayNumber : aDayNumber + newChip.end;
        // This function must be fast.
        allDayChips[allDayChipsCounter++] = newChip;
      }
    }
  }
}


/**
 * Transforms parsed json to chips.
 * @param {Array.<Array.<string|number|boolean>>} aEventsArray List of JSON
 * representation of events.
 */
rflect.cal.events.EventManager.prototype.jsonToChips =
    function(aEventsArray) {
  for (var counter = 0, length = aEventsArray.length; counter < length;
        counter++) {

    var event = rflect.cal.events.EventManager.createEventFromArray(
        aEventsArray[counter]);
    this.addEvent(event);
  }
}


/**
 * Transforms event to chips and adds it to collection.
 * @param {rflect.cal.events.Event} aEvent Event.
 */
rflect.cal.events.EventManager.prototype.addEvent =
    function(aEvent) {
  
  var startDate = aEvent.startDate;
  var endDate = aEvent.endDate;

  var eventStartMins = startDate.getHours() * 60 + startDate.getMinutes();
  var eventEndMins = endDate.getHours() * 60 + endDate.getMinutes();
  var currentDate = startDate.clone();

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
  var isAllDay = aEvent.allDay;

  var tomorrow;
  var chip;

  if (isAllDay)
    var allDayIndexes = [];

  this.events_[aEvent.id] = aEvent;

  // Generating chips.
  while (hasNext) {

    tomorrow = currentDate.getTomorrow();

    hasPrev = !currentDate.equalsByDate(startDate);
    hasNext = tomorrow.compareByDate(endDate) < 0 ||
        tomorrow.equalsByDate(endDate) && eventEndMins != 0;

    isWeekChip = !hasNext || currentDate.getWeekday() == 6;

    hasPrevWeek = !currentDate.equalsByWeek(startDate);
    hasNextWeek = hasNext && tomorrow.getWeekday() == 0;

    if (isAllDay) {
      allDayIndexes[total++] = [
        currentDate.getYear(),
        currentDate.getDayOfYear()
      ];

      if (!hasNext)
        this.putAllDayChips_(allDayIndexes, aEvent.id);
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

      chip = new rflect.cal.events.Chip(aEvent.id, dayChipStartMins,
          dayChipEndMins, hasPrev, hasNext);
      this.putDayChip_(chip, currentDate);
    }

    if (isWeekChip){
      if (!hasNextWeek){
        if (eventEndMins == 0){
          weekChipEndMins = currentDate.getWeekday() + 1;
        } else
          weekChipEndMins = currentDate.getWeekday() + 1;
      } else {
        weekChipEndMins = rflect.cal.events.Chip.MAX_DAYS_WEEK;
      }
      if (!hasPrevWeek){
        weekChipStartMins = startDate.getWeekday();
      } else {
         weekChipStartMins = 0;
      }

      chip = new rflect.cal.events.Chip(aEvent.id, weekChipStartMins,
          weekChipEndMins, hasPrevWeek, hasNextWeek);

      var cutoff = currentDate.getFirstWeekCutOffDay();
      var cutoffAndCurrentDiff = cutoff - currentDate.getIsoWeekday();
      var cutoffAndCurrentDiffAbs = (cutoff - currentDate.getIsoWeekday()
          + 7) % 7;
      var weekIsFromNextYear = cutoffAndCurrentDiff > 0 &&
          (currentDate.getDayOfYear() +
          cutoffAndCurrentDiffAbs > rflect.date.getNumberOfDaysInYear(
          currentDate.getFullYear()));
      this.putWeekChip_(chip, currentDate,
          weekIsFromNextYear);
    }
    
    currentDate = tomorrow;
  }

};


/**
 * Removes event by its id.
 * @param {number} aId Event id.
 */
rflect.cal.events.EventManager.prototype.removeEventById =
    function(aId) {
  delete this.events_[aId];
  this.removeChips_(aId, this.chipsByDay_, this.tracksChipsByDay_);
  this.removeChips_(aId, this.allDayChipsByDay_, this.tracksAllDayChipsByDay_);
  this.removeChips_(aId, this.chipsByWeek_, this.tracksChipsByWeek_);
}


/**
 * Edit event, actually deleting old event and creating new one with the same
 * id.
 * @param {rflect.cal.events.Event} aEvent Event.
 */
rflect.cal.events.EventManager.prototype.editEvent =
    function(aEvent) {
  this.removeEventById(aEvent.id);
  this.addEvent(aEvent);
}


/**
 * Saves day chip.
 * @param {rflect.cal.events.Chip} aChip Chip to save.
 * @param {rflect.date.DateShim} aDate Which date characterizes chip.
 * @private
 */
rflect.cal.events.EventManager.prototype.putDayChip_ = function(aChip, aDate) {
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
rflect.cal.events.EventManager.prototype.putAllDayChips_ =
    function(aIndexes, aEventId) {
  for (var counter = 0, length = aIndexes.length; counter < length; 
      counter++) {
    var year = aIndexes[counter][0];
    var dayOfYear = aIndexes[counter][1];
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
 * @param {boolean} aNextYear Whether this chips belongs to next
 * year, i.e. should we +1 year that we pass in previous param.
 * @private
 */
rflect.cal.events.EventManager.prototype.putWeekChip_ = function(aChip, aDate,
    aNextYear) {
  var year = aDate.getYear() + (aNextYear ? 1 : 0);
  var weekOfYear = aDate.getWeekNumber();
  this.putChip_(aChip, year, weekOfYear, this.chipsByWeek_,
      this.tracksChipsByWeek_);
}


/**
 * Puts chip in appropriate data structures.
 * @param {rflect.cal.events.Chip} aChip Chip to save.
 * @param {number} aIndex1 First index (year).
 * @param {number} aIndex2 Second index (day of year or week of year).
 * @param {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
 * aDataStructure Data structure where to put chip.
 * @param {Object.<number, Array.<Array.<number>>>} aTracks Tracks data
 * structure.
 * @private
 */
rflect.cal.events.EventManager.prototype.putChip_ = function(aChip, aIndex1,
    aIndex2, aDataStructure, aTracks) {
  if (!(aIndex1 in aDataStructure))
      aDataStructure[aIndex1] = {};
    if (!(aIndex2 in aDataStructure[aIndex1]))
      aDataStructure[aIndex1][aIndex2] = [];
    aDataStructure[aIndex1][aIndex2].push(aChip);

    if (!aTracks[aChip.eventId])
      aTracks[aChip.eventId] = [[aIndex1, aIndex2]];
    else
      aTracks[aChip.eventId].push([aIndex1, aIndex2]);
}


/**
 * Removes chips from appropriate data structures.
 * @param {number} aEventId Event id.
 * @param {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
 * aDataStructure Data structure where to delete chips.
 * @param {Object.<number, Array.<Array.<number>>>} aTracks Tracks where to
 * delete chips.
 */
rflect.cal.events.EventManager.prototype.removeChips_ = function(aEventId,
    aDataStructure, aTracks) {
  if (aTracks[aEventId]) {
    for (var counter = 0, length = aTracks[aEventId].length; counter <
        length; counter++){
      var track = aTracks[aEventId][counter];
      var index1 = track[0];
      var index2 = track[1];
      if (index1 in aDataStructure)
        if (index2 in aDataStructure[index1]) {
          var chips = aDataStructure[index1][index2];
          var chipIndex = goog.array.findIndex(chips, function(aChip){
            return aChip.eventId == aEventId;
          });
          if (chipIndex >= 0) {
            // Chip is found, perform deletion
            chips.splice(chipIndex, 1);
            delete aTracks[aEventId];
            if (!chips.length){
              delete aDataStructure[index1][index2];
              if (!aDataStructure[index1].length)
                delete aDataStructure[index1];
            }
          }
        }
    };
  }
}


/**
 * Export arrays of chips actual for this time configuration.
 */
rflect.cal.events.EventManager.prototype.run = function() {
  var counterWeek = 0;
  var daySeries = this.timeManager_.daySeries;
  var knownChipsIds = {};

  this.dayChips.length = 0;
  this.allDayChips.length = 0;
  this.allDayChips[0] = [];
  this.weekChips.length = 0;

  for (var counter = 0, length = daySeries.length;
      counter < length; counter++) {
    var yearKey = daySeries[counter].getFullYear();
    if (this.viewManager_.isInWeekMode()) {
      var dayOfYearKey = daySeries[counter].getDayOfYear();
      this.dayChips.push(
          rflect.cal.events.EventManager.getNestedChips_(
          this.chipsByDay_, yearKey, dayOfYearKey) || []);
      rflect.cal.events.EventManager.pushNestedAllDayChips_(
          this.allDayChipsByDay_, this.allDayChips, knownChipsIds, yearKey, 
          dayOfYearKey, counter, length);
    } else if (this.viewManager_.isInMonthMode() && counter % 7 == 0) {
      var weekKey = daySeries[counter].getWeekNumber();
      this.weekChips.push(rflect.cal.events.EventManager.getNestedChips_(
          this.chipsByWeek_, yearKey, weekKey) || []);
    }
  }
}


/**
 * @param {number} aId Id of event.
 * @return {rflect.cal.events.Event} Event with this id.
 */
rflect.cal.events.EventManager.prototype.getEventById = function(aId) {
  return this.events_[aId];
}
