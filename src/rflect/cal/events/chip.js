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
 * @param {number} aEventId Corresponding event id.
 * @param {number} aStart Chip start.
 * @param {number} aEnd Chip end.
 * @param {boolean} aStartIsCut Whether chip starts before block's start.
 * @param {boolean} aEndIsCut Whether chip ends after block's end.
 * @param {number} aEventId Corresponding event id.
 * @constructor
 */
rflect.cal.events.Chip = function(aEventId, aStart, aEnd, aStartIsCut,
    aEndIsCut) {
  this.eventId = aEventId;
  this.start = aStart;
  this.end = aEnd;
  this.startIsCut = aStartIsCut;
  this.endIsCut = aEndIsCut;
};


/**
 * Maximum minutes for day chip.
 * @type {number}
 * @const
 */
rflect.cal.events.Chip.MAX_MINUTES_DAY = 24 * 60;


/**
 * Maximum days for week chip.
 * @type {number}
 * @const
 */
rflect.cal.events.Chip.MAX_DAYS_WEEK = 7;


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


/**
 * Whether chip starts before block's start.
 * @type {boolean}
 */
rflect.cal.events.Chip.prototype.startIsCut;


/**
 * Whether chip starts after block's end.
 * @type {boolean}
 */
rflect.cal.events.Chip.prototype.endIsCut;


/**
 * @param {rflect.cal.events.Chip} aChip Another chip to compare.
 * @returns {boolean} Whether this chip equals another.
 */
rflect.cal.events.Chip.prototype.equals = function(aChip) {
  return this.start == aChip.start &&
      this.end == aChip.end &&
      this.startIsCut == aChip.startIsCut &&
      this.endIsCut == aChip.endIsCut;
};


/**
 * @returns {rflect.cal.events.Chip} Chip that equals this one.
 */
rflect.cal.events.Chip.prototype.clone = function() {
  return new rflect.cal.events.Chip(this.eventId , this.start, this.end,
      this.startIsCut, this.endIsCut);
}
