/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.EventManager');

goog.require('goog.array');
goog.require('goog.date.DateTime');
goog.require('rflect.structs.IntervalTree');
goog.require('rflect.cal.events.Calendar');
goog.require('rflect.cal.events.Chip');
goog.require('rflect.cal.events.Event');
goog.require('rflect.cal.events.EventHolder');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.require('rflect.cal.predefined.chips');
goog.require('rflect.array');
goog.require('rflect.object');



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
   * Event transaction helper.
   * @type {rflect.cal.events.EventHolder}
   */
  this.eventHolder = new rflect.cal.events.EventHolder(this);

  /**
   * Map of event id to event.
   * @type {Object.<number, rflect.cal.events.Event|rflect.cal.events.Plan>}
   * @private
   */
  this.events_ = {};

  /**
   * Events sorted by startDate.
   * @type {Array.<rflect.cal.events.Event|rflect.cal.events.Plan>}
   * @private
   */
  this.sortedEvents_ = [];

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
   * Event ids that are in some process.
   * @type {Object.<number, boolean>}
   */
  this.eventsInProgress_ = {};


  /**
   * Calendar ids that are in some process.
   * @type {Object.<string, boolean>}
   */
  this.calendarsInProgress_ = {};


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
   * @type {Array.<rflect.cal.events.Plan>}
   */
  this.infinitePlans_ = [];


  /**
   * Map of calendar id -> calendar.
   * @type {Object.<string, rflect.cal.events.Calendar>}
   */
  this.calendars = {};
};


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
 * @param {number} aAllDayChipsLength Length of chips array, passed to avoid
 * taking it on array.
 * @return {number} Length of newly modified chip array.
 */
rflect.cal.events.EventManager.pushNestedAllDayChips_ = function(
    aAllDayChipsInput, aAllDayChipsOutput, aKnownChipIds, aYear, aDayOfYear, 
    aDayNumber, aTotalDays, aAllDayChipsLength) {
  var allDayChips = aAllDayChipsOutput[0];
  var allDayChipsCounter = aAllDayChipsLength;
  var chips;

  if (chips = rflect.cal.events.EventManager.getNestedChips_(
      aAllDayChipsInput, aYear, aDayOfYear)) {


    for (var counter = 0, length = chips.length; counter < length; counter++) {
      var id = chips[counter].eventId;
      if (!aKnownChipIds[id]) {
        aKnownChipIds[id] = 1;
        var newChip = chips[counter].clone();
        newChip.start = aDayNumber;
        newChip.endIsCut = (aTotalDays - aDayNumber) < newChip.end;
        newChip.end = newChip.endIsCut ? aTotalDays : aDayNumber + newChip.end;
        // This function must be fast.
        allDayChips[allDayChipsCounter++] = newChip;
      }
    }
  }
  return allDayChipsCounter;
}


/**
 * @param {rflect.cal.events.Event} aEventA Event 1.
 * @param {rflect.cal.events.Event} aEventB Event 2.
 * @return {number} Comparison result.
 */
rflect.cal.events.EventManager.eventByStartDateComparator = function(aEventA,
    aEventB) {
  if (goog.DEBUG)
      console.log('aEventA: ', aEventA);
  if (goog.DEBUG)
        console.log('aEventB: ', aEventB);
  var aTime = aEventA.startDate.getTime();
  var bTime = aEventB.startDate.getTime();
  return aTime > bTime ? 1 : (aTime < bTime ? -1 : 0);
}


/**
 * Returns map of year -> {dayOfYear -> chip}.
 * @return {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
 */
rflect.cal.events.EventManager.prototype.getChipsByDay = function() {
  return this.chipsByDay_;
}


/**
 * Returns the same as day chips map, but only for all day chips.
 * @return {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
 */
rflect.cal.events.EventManager.prototype.getAllDayChipsByDay = function() {
  return this.allDayChipsByDay_;
}



/**
 * Returns map of year -> {weekOfYear -> chip}.
 * @return {Object.<number, Object.<number, Array.<rflect.cal.events.Chip>>>}
 */
rflect.cal.events.EventManager.prototype.getChipsByWeek = function() {
  return this.chipsByWeek_;
}


/**
 * Returns map of event id to event.
 * @return {Object.<number, rflect.cal.events.Event|rflect.cal.events.Plan>}
 */
rflect.cal.events.EventManager.prototype.getEvents = function() {
  return this.events_;
}


/**
 * Returns array of events sorted by startDate.
 * @return {Array.<rflect.cal.events.Event|rflect.cal.events.Plan>}
 */
rflect.cal.events.EventManager.prototype.getSortedEvents = function() {
  return this.sortedEvents_;
}


/**
 * Returns array of events sorted by startDate.
 * @param {number} aIntervalStart Interval start, inclusive.
 * @param {number} aIntervalEnd Interval end, inclusive.
 * @return {Array.<rflect.cal.events.Event|rflect.cal.events.Plan>}
 */
rflect.cal.events.EventManager.prototype.getSortedEventsForInterval =
    function(aIntervalStart, aIntervalEnd) {
  //Dummy event for search.
  var dummyEventStart = {
    startDate: new Date(aIntervalStart)
  };
  var dummyEventEnd = {
    startDate: new Date(aIntervalEnd)
  };
  var startIndex = goog.array.binarySearch(this.sortedEvents_, dummyEventStart,
      rflect.cal.events.EventManager.eventByStartDateComparator);
  if (startIndex < 0) {
    startIndex = -startIndex - 1;
  }
  var endIndex = goog.array.binarySearch(this.sortedEvents_, dummyEventEnd,
      rflect.cal.events.EventManager.eventByStartDateComparator);
  if (endIndex < 0) {
    endIndex = -endIndex - 1;
  } else {
    //Since we've found lowest possible end index, try to find highest one.
    for (let counter = endIndex, length = this.sortedEvents_; counter < length;
        counter++) {
      if (this.sortedEvents_[counter].startDate.getTime() <= aIntervalEnd) {
        endIndex = counter;
      }
    }
  }

  return this.sortedEvents_.slice(startIndex, /*Because 2nd arg of splice is
      exclusive*/
      endIndex + 1);
}


/**
 * @param {number} aEventId Event id.
 * @return {boolean} Whether this chip is in visible calendar.
 */
rflect.cal.events.EventManager.prototype.eventIsInVisibleCalendar =
    function(aEventId) {
  var calendar = this.getCalendarByEventId_(aEventId);
  //So that even chips from non-existent calendar are treated as from invisible.
  return !!(calendar && calendar.visible);
}


/**
 * @param {number} aEventId Event id.
 * @return {string} Chip color class.
 */
rflect.cal.events.EventManager.prototype.getEventColorClass =
    function(aEventId) {
  var calendar = this.getCalendarByEventId_(aEventId);

  return (calendar) && calendar.colorCode.eventClass || '';
}


/**
 * @param {number} aEventId Event id.
 * @return {string} Chip "in progress" state class.
 */
rflect.cal.events.EventManager.prototype.getEventIsInProgressClass =
    function(aEventId) {
  var calendar = this.getCalendarByEventId_(aEventId);

  return (calendar) && calendar.colorCode
      .eventIsInProgressClass || '';
}


/**
 * @param {number} aEventId Event id.
 * @return {rflect.cal.events.Calendar} Calendar of this chip.
 * @private
 */
rflect.cal.events.EventManager.prototype.getCalendarByEventId_ =
    function(aEventId) {
  var event = this.events_[aEventId];
  return this.calendars[event.calendarId];
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

    var event = rflect.cal.events.Event.fromJSON(
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
  var calendarId = aEvent.calendarId;
  var calendar = this.calendars[calendarId];

  var tomorrow;
  var chip;

  if (isAllDay)
    var allDayIndexes = [];

  this.events_[aEvent.id] = aEvent;
  rflect.array.binaryInsert(this.sortedEvents_, aEvent,
      rflect.cal.events.EventManager.eventByStartDateComparator);

  calendar && calendar.addEvent(aEvent);

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

      if (dayChipEndMins - dayChipStartMins <
          rflect.cal.predefined.chips.MINIMAL_MINS)
        dayChipEndMins = dayChipStartMins +
          rflect.cal.predefined.chips.MINIMAL_MINS;
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
 * Removes event by its id from sorted events.
 * @param {number} aId Event id.
 */
rflect.cal.events.EventManager.prototype.removeEventByIdFromSorted_ =
    function(aId) {
  var index = goog.array.findIndex(this.sortedEvents_, el => el.id == aId);
  if (index >= 0) {
    this.sortedEvents_.splice(index, 1);
  }
}

/**
 * Removes event by its id.
 * @param {number} aId Event id.
 */
rflect.cal.events.EventManager.prototype.removeEventById =
    function(aId) {
  this.removeEventByIdFromSorted_(aId);
  delete this.events_[aId];
  this.removeChips_(aId, this.chipsByDay_, this.tracksChipsByDay_);
  this.removeChips_(aId, this.allDayChipsByDay_, this.tracksAllDayChipsByDay_);
  this.removeChips_(aId, this.chipsByWeek_, this.tracksChipsByWeek_);
}


/**
 * Deletes event.
 * @param {rflect.cal.events.Event} aEvent Event.
 */
rflect.cal.events.EventManager.prototype.deleteEvent =
    function(aEvent) {
  var calendar = this.calendars[aEvent.calendarId];

  calendar && calendar.deleteEvent(aEvent);
  this.removeEventById(aEvent.id);
}



/**
 * Adds calendar to collection.
 * @param {rflect.cal.events.Calendar} aCalendar Calendar.
 */
rflect.cal.events.EventManager.prototype.addCalendar =
    function(aCalendar) {
  this.calendars[aCalendar.id] = aCalendar;
}


/**
 * Deletes calendar with all events.
 * @param {rflect.cal.events.Calendar} aCalendar Calendar.
 * TODO(alexk): maybe it's better not to delete all events from calendar
 * outright (may take long time), but filter out chips from non-existent
 * calendar.
 * @see {rflect.cal.events.EventManager#eventIsInVisibleCalendar}
 */
rflect.cal.events.EventManager.prototype.deleteCalendar =
    function(aCalendar) {
  var calendar = this.calendars[aCalendar.id];

  if (calendar) {
    var eventIds = calendar.eventIds;
    for (var counter = 0, length = eventIds.length; counter < length;
         counter++)
      this.removeEventById(eventIds[counter]);

    delete this.calendars[aCalendar.id];
  }
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
            if (!chips.length){
              delete aDataStructure[index1][index2];
              if (!rflect.object.hasNumericKey(aDataStructure[index1]))
                delete aDataStructure[index1];
            }
          }
        }
    }
    delete aTracks[aEventId];
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

  var allDayChipsLength = 0;

  for (var counter = 0, length = daySeries.length;
      counter < length; counter++) {
    var yearKey = daySeries[counter].getFullYear();
    if (this.viewManager_.isInWeekMode()) {
      var dayOfYearKey = daySeries[counter].getDayOfYear();
      this.dayChips.push(
          rflect.cal.events.EventManager.getNestedChips_(
          this.chipsByDay_, yearKey, dayOfYearKey) || []);
      allDayChipsLength = rflect.cal.events.EventManager.pushNestedAllDayChips_(
          this.allDayChipsByDay_, this.allDayChips, knownChipsIds, yearKey, 
          dayOfYearKey, counter, length, allDayChipsLength);
    } else if (this.viewManager_.isInMonthMode() &&
        // We should check year in cutoff day.
        counter % 7 == goog.i18n.DateTimeSymbols.FIRSTWEEKCUTOFFDAY) {
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


/**
 * Starts event creation session with template event for further editing,
 * relevant to current view.
 */
rflect.cal.events.EventManager.prototype.startEventCreationSession =
    function() {
  var basis = this.timeManager_.basis;
  var now = new goog.date.DateTime();

  now.setFirstDayOfWeek(basis.getFirstDayOfWeek());
  now.setFirstWeekCutOffDay(basis.getFirstWeekCutOffDay());
  now.setYear(basis.getYear());
  now.setMonth(basis.getMonth());
  now.setDate(basis.getDate());
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  var allDay = false;

  if (this.viewManager_.isInWeekMode()){
    now.add(new goog.date.Interval(goog.date.Interval.HOURS, 1));
    var start = now.clone();
    now.add(new goog.date.Interval(goog.date.Interval.HOURS, 1));
    var end = now.clone();

  } // In case we adding in list mode.
  else {
    now.setHours(0);

    now.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));
    start = now.clone();
    now.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));
    end = now.clone();
    allDay = true;

  }

  start = rflect.date.createDateShim(start.getYear(), start.getMonth(),
      start.getDate(), start.getHours(), 0, 0, true);
  end = rflect.date.createDateShim(end.getYear(), end.getMonth(),
      end.getDate(), end.getHours(), 0, 0);

  var event =
      rflect.cal.events.Event.createEvent('', start, end, allDay);

  this.eventHolder.openSession(event);

}


/**
 * @param {string} aCalendarId Calendar id.
 * @param {boolean} aVisible Whether calendar should be visible.
 */
rflect.cal.events.EventManager.prototype.setVisibleCalendar = function(
    aCalendarId, aVisible) {
  var calendar = this.calendars[aCalendarId];
  calendar.visible = aVisible;
}


/**
 * Iterates over all calendars.
 * @param {function(this:T,rflect.cal.events.Calendar,string,Object.<string,
 * rflect.cal.events.Calendar>):?} aFunction The function to call
 *     for every calendar. This function takes 3 arguments (the calendar, the
 *     calendar id and the calendars object) and the return value is ignored.
 * @param {T=} opt_thisObj This is used as the 'this' object within f.
 * @template T
 */
rflect.cal.events.EventManager.prototype.forEachCalendar = function(aFunction,
    opt_thisObj) {
  var calendars = this.calendars;
  for (var calendarId in calendars) {
    if (calendars[calendarId] instanceof rflect.cal.events.Calendar) {
      //This is indeed a calendar.
      aFunction.call(opt_thisObj, calendars[calendarId], calendarId, calendars);
    }
  }
}


/**
 * @param {number} aEventId Event id of event to indicate whether it's in
 * progress.
 * @param {boolean} aInProgress Whether event is in progress.
 */
rflect.cal.events.EventManager.prototype.setEventIsInProgress =
    function(aEventId, aInProgress) {
  if (aInProgress) this.eventsInProgress_[aEventId] = true;
  else delete this.eventsInProgress_[aEventId];
}


/**
 * @param {number} aEventId Event id.
 * @return {boolean} Whether event is in progress.
 */
rflect.cal.events.EventManager.prototype.eventIsInProgress =
    function(aEventId) {
  return this.eventsInProgress_[aEventId];
}


/**
 * @param {string} aCalendarId Calendar id of calendar to indicate whether it's
 * in progress.
 * @param {boolean} aInProgress Whether calendar is in progress.
 */
rflect.cal.events.EventManager.prototype.setCalendarIsInProgress =
    function(aCalendarId, aInProgress) {
  if (aInProgress) this.calendarsInProgress_[aCalendarId] = true;
  else delete this.calendarsInProgress_[aCalendarId];
}


/**
 * @param {string} aCalendarId Calendar id.
 * @return {boolean} Whether calendar is in progress.
 */
rflect.cal.events.EventManager.prototype.calendarIsInProgress =
    function(aCalendarId) {
  return this.calendarsInProgress_[aCalendarId];
}