/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.Chip');



/**
 * Chip - visual rectangle that represent event or event's part.
 * @param {number} aStart Chip start.
 * @param {number} aEnd Chip end.
 * @param {number} aEventId Corresponding event id.
 * @constructor
 */
rflect.cal.events.Chip = function(aStart, aEnd, aEventId) {
  this.start = aStart;
  this.end = aEnd;
  this.eventId = aEventId;
};


/**
 * Position where chip starts.
 * In case of day chips this is pixel.
 * In case of week chips this is percent.
 * In case of all-day chips this is 0 when event starts in this day, -1 when
 * event starts earlier.
 */
rflect.cal.events.Chip.prototype.start = 0;


/**
 * Position where chip starts.
 * All like for <code>start</code> except for all-day chips this is how many
 * days event spans.
 * @see {rflect.cal.events.Chip.prototype.start}.
 */
rflect.cal.events.Chip.prototype.end = 0;


/**
 * Id of event this chip belongs to.
 * @type {number}
 */
rflect.cal.events.Chip.prototype.eventId;