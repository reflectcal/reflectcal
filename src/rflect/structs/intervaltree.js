/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Interval tree implementation.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.structs.IntervalTree');



/**
 * Class that represents time interval tree.
 * @see {http://en.wikipedia.org/wiki/Interval_tree}
 * @param {number|goog.date.DateLike=} opt_start Start of interval.
 * @param {number|goog.date.DateLike=} opt_end End of interval.
 * @constructor
 */
rflect.structs.IntervalTree = function(aIntervals) {
  if (goog.isNumber(opt_start) && goog.isNumber(opt_end)) {
    this.start = opt_start;
    this.end = opt_end;
  } else if (goog.isObject(opt_start) && goog.isObject(opt_end)) {
    this.start = opt_start.getTime();
    this.end = opt_end.getTime();
  } else {
    return rflect.structs.IntervalTree.getNonNullInterval(null);
  }
};


rflect.structs.IntervalTree.findEndPoint = function(aIntervals, aMax) {
  var endPoint = aMax ? aIntervals[0].end : aIntervals[0].start;
  goog.array.forEach(aIntervals, function(aItem){
    if (aItem > endPoint)
      endPoint = aItem;
  })
}

rflect.structs.IntervalTree.Node = function(opt_start, opt_end) {

  this.left_

  this.right_

  this.midpoint_

  this.sortedBySP_ = [];
  this.sortedByEP_ = [];

};


/**
 * Gets the interval handling null.
 * <p>
 * If the interval is <code>null</code>, an interval representing now
 * to now will be returned. Otherwise, the interval specified is returned.
 * @param {rflect.structs.IntervalTree} aInterval The interval to use, null means now
 * to now.
 * @return {!rflect.structs.IntervalTree} The interval, never null.
 */
rflect.structs.IntervalTree.getNonNullInterval = function(aInterval) {
  if (aInterval == null) {
    var now = goog.now();
    aInterval = new rflect.structs.IntervalTree(now, now);
  }
  return aInterval;
}


/**
 * Start of interval.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.start = 0;


/**
 * End of interval.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.end = 0;


/**
 * Does this time interval contain the specified millisecond instant.
 * Non-zero duration intervals are inclusive of the start instant and
 * exclusive of the end. A zero duration interval cannot contain anything.
 * @param {number} aMillisInstant The instant to compare to, millisecond instant
 * from 1970-01-01T00:00:00Z
 * @return {boolean} Whether this interval contains instant.
 */
rflect.structs.IntervalTree.prototype.contains = function(aMillisInstant) {
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
 * @param {rflect.structs.IntervalTree} aInterval The time interval to compare to, null
 * means a zero length interval now.
 * @return {boolean} Whether intervals overlap.
 */
rflect.structs.IntervalTree.prototype.overlaps = function(aInterval) {
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
 * @param {rflect.structs.IntervalTree} aInterval The interval to examine, 
 * null means now.
 * @return {rflect.structs.IntervalTree} The overlap interval, null if no overlap.
 */
rflect.structs.IntervalTree.prototype.overlap = function(aInterval) {
  var interval = rflect.structs.IntervalTree.getNonNullInterval(aInterval);
  if (!this.overlaps(interval)) {
    return null;
  }
  var start = Math.max(this.start, interval.start);
  var end = Math.min(this.end, interval.end);
  return new rflect.structs.IntervalTree(start, end);
}


/**
 * @return {number} Length of this interval in milliseconds
 */
rflect.structs.IntervalTree.prototype.length = function() {
  return this.end - this.start;
}


/**
 * @return {string} String representation.
 */
rflect.structs.IntervalTree.prototype.toString = function() {
  if (goog.DEBUG){
    return new goog.date.Date(new Date(this.start)).toString() + '/' +
        new goog.date.Date(new Date(this.end)).toString();
  }
  return this.start + '/' + this.end;
};


/**
 * @return {number} Value of interval in form of duration.
 */
rflect.structs.IntervalTree.prototype.valueOf = function() {
  return this.length();
};