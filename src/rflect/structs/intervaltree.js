/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Interval tree implementation.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.structs.IntervalTree');

goog.require('goog.array');
goog.require('rflect.array');
goog.require('rflect.date.Interval');



/**
 * Class that represents time interval tree. Intervals are connected to events 
 * they belong too.
 * @see {http://en.wikipedia.org/wiki/Interval_tree}
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @constructor
 */
rflect.structs.IntervalTree = function(aIntervals) {
  /**
   * Root node for tree.
   * @type {rflect.structs.IntervalTree.Node_}
   * @private
   */
  this.root_ = new rflect.structs.IntervalTree.Node_(aIntervals, this);
};


/**
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @return {number} Maximal end point of all intervals.
 */
rflect.structs.IntervalTree.findMaxEndPoint = function(aIntervals) {
  var endPoint = aIntervals[0].end;
  goog.array.forEach(aIntervals, function(aItem){
    var itemEnd = aItem.end;
    if (itemEnd > endPoint)
      endPoint = itemEnd;
  });
  return endPoint;
}


/**
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @return {number} Minimal start point of all intervals.
 */
rflect.structs.IntervalTree.findMinStartPoint = function(aIntervals) {
  var startPoint = aIntervals[0].start;
  goog.array.forEach(aIntervals, function(aItem){
    var itemStart = aItem.start;
    if (itemStart < startPoint)
      startPoint = itemStart;
  });
  return startPoint;
}


/**
 * Unique id counter for intervals within tree.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.uid_ = 0;


/**
 * @return {number} Unique id for interval within tree.
 */
rflect.structs.IntervalTree.prototype.getUid = function() {
  return this.uid_++;
}


/**
 * Searches for all intersections with given interval.
 * @param {rflect.date.Interval} aInterval Input interval.
 * @return {Array.<rflect.date.Interval>} Intervals intersected with input.
 */
rflect.structs.IntervalTree.prototype.search = function(aInterval) {
  return this.root_.search(aInterval);
}


/**
 * Individual node of interval tree.
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @param {rflect.struct.IntervalTree} aTree Parent tree.
 * @constructor
 * @private
 */
rflect.structs.IntervalTree.Node_ = function(aIntervals, aTree) {
  var leftIntervals;
  var rightIntervals;

  var max = rflect.structs.IntervalTree.findMinStartPoint(aIntervals);
  var min = rflect.structs.IntervalTree.findMaxEndPoint(aIntervals);
  var nodeFirstInterval;
  var nodeLastInterval;

  this.midPoint_ = Math.round((max + min) / 2);

  for (var counter = 0, length = aIntervals.length; counter < length;
      counter++){
    var interval = aIntervals[counter];
    if (interval.contains(this.midPoint_)){
      interval.id = aTree.getUid();
      rflect.array.binaryInsert(this.sortedBySP_ || (this.sortedBySP_ = []),
          interval, rflect.date.Interval.compareBySP);
      rflect.array.binaryInsert(this.sortedByEP_ || (this.sortedByEP_ = []),
          interval, rflect.date.Interval.compareByEP);
    }
    else if (aIntervals[counter].end <= this.midPoint_)
      (leftIntervals || (leftIntervals = [])).push(aIntervals[counter]);
    else
      (rightIntervals || (rightIntervals = [])).push(aIntervals[counter]);
  }

  if (nodeFirstInterval = this.sortedBySP_[0])
    this.startPoint_ = nodeFirstInterval.start;
  if (nodeLastInterval = goog.array.peek(this.sortedByEP_))
    this.endPoint_ = nodeLastInterval.end;

  if (leftIntervals)
    this.leftNode_ = new rflect.structs.IntervalTree.Node_(leftIntervals,
        aTree);
  if (rightIntervals)
    this.rightNode_ = new rflect.structs.IntervalTree.Node_(rightIntervals,
        aTree);
};


/**
 * Point in the middle between maximal end point of all intervals within this
 * node and minimal start point.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.Node_.prototype.midPoint_;


/**
 * Left child node.
 * @type {rflect.structs.IntervalTree.Node_}
 * @private
 */
rflect.structs.IntervalTree.Node_.prototype.leftNode_;


/**
 * Right child node.
 * @type {rflect.structs.IntervalTree.Node_}
 * @private
 */
rflect.structs.IntervalTree.Node_.prototype.rightNode_;


/**
 * Searches for all intersections with given interval within this node.
 * @param {rflect.date.Interval} aInterval Input interval.
 * @return {Array.<rflect.date.Interval>} Intervals intersected with input.
 */
rflect.structs.IntervalTree.Node_.prototype.search = function(aInterval) {
  var result = null;
  var index;
  if (!this.sortedBySP_ || !this.sortedByEP_)
    return result;
  if (aInterval.contains(this.midPoint_)) {
    result = goog.array.slice(this.sortedBySP_);
    if (goog.DEBUG)
      _log(aInterval.toString() + ' contains midpoint of node ' + this);
  } else if (aInterval.end <= this.midPoint_ && aInterval.end >
      this.startPoint_) {
    if (goog.DEBUG)
      _log(aInterval.toString() + ' is left-touches node ' + this);
    index = goog.array.binarySearch(this.sortedBySP_, aInterval.end,
        rflect.date.Interval.compareBySP);
    if (goog.DEBUG)
      _log('index or insertion point', index);
    // Whether we found index or insertion point.
    index = index < 0 ? -index - 1 : index;
    if (goog.DEBUG)
      _log('index', index);
    result = goog.array.slice(this.sortedBySP_, 0, index);
  } else if (aInterval.start > this.midPoint_ && aInterval.start <
      this.endPoint_) {
    if (goog.DEBUG)
      _log(aInterval.toString() + ' is right-touches node ' + this);
    index = goog.array.binarySearch(this.sortedByEP_, aInterval.start,
        rflect.date.Interval.compareByEP);
    index = index < 0 ? -index - 1 : index;
    result = goog.array.slice(this.sortedByEP_, index);
  }

  if (this.leftNode_ && aInterval.start < this.leftNode_.endPoint_){
    var leftNodeResult = this.leftNode_.search(aInterval);
    if (leftNodeResult) result = (result || []).concat(leftNodeResult)
  }
  if (this.rightNode_ && aInterval.end > this.rightNode_.startPoint_){
    var rightNodeResult = this.rightNode_.search(aInterval);
    if (rightNodeResult) result = (result || []).concat(rightNodeResult)
  }

  return result;
}


/**
 * @return {string} String representation of node.
 */
rflect.structs.IntervalTree.Node_.prototype.toString = function(aInterval) {
  return '[' + this.startPoint_ + ';' + this.midPoint_ + ';' +
      this.endPoint_ + ']';
}