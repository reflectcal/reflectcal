/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.EventManager');

goog.require('rflect.structs.IntervalTree');



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
   * @type {Object.<number, <Object.<number, rflect.cal.events.Chip>>}
   * @private
   */
  rflect.cal.EventManager.prototype.chipsByDay_ = {};


  /**
   * Map of year -> {weekOfYear -> chip}.
   * @type {Object.<number, <Object.<number, rflect.cal.events.Chip>>}
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


/**
 * Adds events from parsed json.
 * @param {Array.<Array>} aJSONEvents List of JSON representation of events.
 */
rflect.cal.EventManager.prototype.addEvents = function(aJSONEvents) {
  for (var counter = 0, length = aJSONEvents.length; counter < length;
      counter++) {
    var jsonStartDate = aJSONEvents[counter][0];
    var startDate = new rflect.date.DateShim(jsonStartDate);
    var jsonEndDate = aJSONEvents[counter][1];
    var endDate = new rflect.date.DateShim(jsonEndDate);

    var dayOfYear = startDate.getDayOfYear();
  }
};

