/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event collection and manager class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.Chip');



/**
 * Chip - visual rectangle that represent event of event's part.
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
 * Pixel/percent position of chip start, or -1 if it begins off-screen.
 */
rflect.cal.events.Chip.start = 0;


/**
 * Pixel/percent position of chip end, or -1 if it ends off-screen.
 */
rflect.cal.events.Chip.end = 0;


/**
 * Id of event this chip belongs to.
 * @type {number}
 */
rflect.cal.events.Chip.eventId;