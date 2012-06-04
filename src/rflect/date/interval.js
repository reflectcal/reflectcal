/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Rflect date utilities, interval class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.date.Interval');

goog.require('goog.date.Date');



/**
 * Class that represents time interval between two dates.
 * Inspired by <code>org.joda.time.Interval</code>.
 * @param {number|goog.date.DateLike=} opt_start Start of interval.
 * @param {number|goog.date.DateLike=} opt_end End of interval.
 * @constructor
 */
rflect.date.Interval = function(opt_start, opt_end) {
  if (goog.isNumber(opt_start) && goog.isNumber(opt_end)) {
    this.start = opt_start;
    this.end = opt_end;
  } else if (goog.isObject(opt_start) && goog.isObject(opt_end)) {
    this.start = opt_start.getTime();
    this.end = opt_end.getTime();
  } else {
    return rflect.date.Interval.getNonNullInterval(null);
  }
};


/**
 * Gets the interval handling null.
 * <p>
 * If the interval is <code>null</code>, an interval representing now
 * to now will be returned. Otherwise, the interval specified is returned.
 * @param {rflect.date.Interval} aInterval The interval to use, null means now
 * to now.
 * @return {!rflect.date.Interval} The interval, never null.
 */
rflect.date.Interval.getNonNullInterval = function(aInterval) {
  if (aInterval == null) {
    var now = goog.now();
    aInterval = new rflect.date.Interval(now, now);
  }
  return aInterval;
}


/**
 * Start of interval.
 * @type {number}
 * @private
 */
rflect.date.Interval.prototype.start = 0;


/**
 * End of interval.
 * @type {number}
 * @private
 */
rflect.date.Interval.prototype.end = 0;


/**
 * Does this time interval contain the specified millisecond instant.
 * Non-zero duration intervals are inclusive of the start instant and
 * exclusive of the end. A zero duration interval cannot contain anything.
 * @param {number} aMillisInstant The instant to compare to, millisecond instant
 * from 1970-01-01T00:00:00Z
 * @return {boolean} Whether this interval contains instant.
 */
rflect.date.Interval.prototype.contains = function(aMillisInstant) {
  return (aMillisInstant >= this.start && aMillisInstant < this.end);
}


/**
 * Does this time interval overlap the specified time interval.
 * <p>
 * Intervals are inclusive of the start instant and exclusive of the end.
 * An interval overlaps another if it shares some common part of the
 * datetime continuum. 
 * <p>
 * When two intervals are compared the result is one of three states:
 * (a) they abut, (b) there is a gap between them, (c) they overlap.
 * The abuts state takes precedence over the other two, thus a zero duration
 * interval at the start of a larger interval abuts and does not overlap.
 * <p>
 * For example:
 * <pre>
 * [09:00 to 10:00) overlaps [08:00 to 08:30)  = false (completely before)
 * [09:00 to 10:00) overlaps [08:00 to 09:00)  = false (abuts before)
 * [09:00 to 10:00) overlaps [08:00 to 09:30)  = true
 * [09:00 to 10:00) overlaps [08:00 to 10:00)  = true
 * [09:00 to 10:00) overlaps [08:00 to 11:00)  = true
 * 
 * [09:00 to 10:00) overlaps [09:00 to 09:00)  = false (abuts before)
 * [09:00 to 10:00) overlaps [09:00 to 09:30)  = true
 * [09:00 to 10:00) overlaps [09:00 to 10:00)  = true
 * [09:00 to 10:00) overlaps [09:00 to 11:00)  = true
 * 
 * [09:00 to 10:00) overlaps [09:30 to 09:30)  = true
 * [09:00 to 10:00) overlaps [09:30 to 10:00)  = true
 * [09:00 to 10:00) overlaps [09:30 to 11:00)  = true
 * 
 * [09:00 to 10:00) overlaps [10:00 to 10:00)  = false (abuts after)
 * [09:00 to 10:00) overlaps [10:00 to 11:00)  = false (abuts after)
 * 
 * [09:00 to 10:00) overlaps [10:30 to 11:00)  = false (completely after)
 * 
 * [14:00 to 14:00) overlaps [14:00 to 14:00)  = false (abuts before and after)
 * [14:00 to 14:00) overlaps [13:00 to 15:00)  = true
 * </pre>
 *
 * @param {rflect.date.Interval} aInterval The time interval to compare to, null
 * means a zero length interval now.
 * @return {boolean} Whether intervals overlap.
 */
rflect.date.Interval.prototype.overlaps = function(aInterval) {
  var thisStart = this.start;
  var thisEnd = this.end;
  if (aInterval == null) {
    var now = goog.now();
    return (thisStart < now && now < thisEnd);
  }  else {
    return (thisStart < aInterval.end && aInterval.start < thisEnd);
  }
}


/**
 * Gets the overlap between this interval and another interval.
 * <p>
 * Intervals are inclusive of the start instant and exclusive of the end.
 * An interval overlaps another if it shares some common part of the
 * datetime continuum. This method returns the amount of the overlap,
 * only if the intervals actually do overlap.
 * If the intervals do not overlap, then null is returned.
 * <p>
 * When two intervals are compared the result is one of three states:
 * (a) they abut, (b) there is a gap between them, (c) they overlap.
 * The abuts state takes precedence over the other two, thus a zero duration
 * interval at the start of a larger interval abuts and does not overlap.
 * <p>
 * @param {rflect.date.Interval} aInterval The interval to examine, 
 * null means now.
 * @return {rflect.date.Interval} The overlap interval, null if no overlap.
 */
rflect.date.Interval.prototype.overlap = function(aInterval) {
  var interval = rflect.date.Interval.getNonNullInterval(aInterval);
  if (!this.overlaps(interval)) {
    return null;
  }
  var start = Math.max(this.start, interval.start);
  var end = Math.min(this.end, interval.end);
  return new rflect.date.Interval(start, end);
}


/**
 * @return {string} String representation.
 */
rflect.date.Interval.prototype.toString = function() {
  if (goog.DEBUG){
    return new goog.date.Date(new Date(this.start)).toString() + '/' +
        new goog.date.Date(new Date(this.end)).toString();
  }
  return this.start + '/' + this.end;
};


/**
 * @return {number} Value of interval in form of duration.
 */
rflect.date.Interval.prototype.valueOf = function() {
  return this.end - this.start;
};