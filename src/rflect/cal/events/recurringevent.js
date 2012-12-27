/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.RecurringEvent');

goog.require('rflect.structs.IntervalTree');



/**
 * Class that stores and manages event collection.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.events.RecurringEvent = function(aViewManager, aTimeManager) {

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
};


/**
 * Map of event id to event.
 * @type {Object.<string,rflect.cal.events.Event>}
 */
rflect.cal.events.RecurringEvent.prototype.eventsMap_;


/**
 *
 */
rflect.cal.events.RecurringEvent.prototype.chipsMap_;


/**
 *
 */
rflect.cal.events.RecurringEvent.prototype.plansTree_;


/**
 *
 */
rflect.cal.events.RecurringEvent.prototype.eternalPlansList_;
