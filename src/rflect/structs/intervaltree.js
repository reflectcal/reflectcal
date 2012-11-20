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
  this.root_ = this.createRootNode_(aIntervals);

  /**
   * Set for interval ids that were added after initial tree creation and are
   * unbalanced.
   * @type {Object.<number, number>}
   * @private
   */
  this.unbalancedIntervalIds_ = {};
};


/**
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @return {number} Maximal end point of all intervals.
 */
rflect.structs.IntervalTree.findMaxEndPoint = function(aIntervals) {
  var endPoint = aIntervals[0].end;
  for (var counter = 0, length = aIntervals.length; counter < length;
      counter++){
    var itemEnd = aIntervals[counter].end;
    if (itemEnd > endPoint)
      endPoint = itemEnd;
  }
  return endPoint;
}


/**
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @return {number} Minimal start point of all intervals.
 */
rflect.structs.IntervalTree.findMinStartPoint = function(aIntervals) {
  var startPoint = aIntervals[0].start;
  for (var counter = 0, length = aIntervals.length; counter < length;
      counter++){
    var itemStart = aIntervals[counter].start;
    if (itemStart < startPoint)
      startPoint = itemStart;
  }
  return startPoint;
}


/**
 * Unique id counter for intervals within tree.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.uid_ = 0;


/**
 * Number of intervals within tree that were included since creation and,
 * therefore, are balanced.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.numberBalanced_ = 0;


/**
 * Number of added intervals.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.numberAdded_ = 0;


/**
 * Number of intervals deleted from initial balanced ones.
 * @type {number}
 * @private
 */
rflect.structs.IntervalTree.prototype.numberRemoved_ = 0;


/**
 * Temporary storage of intervals when rabalancing tree.
 * @type {Array.<rflect.date.Interval>}
 */
rflect.structs.IntervalTree.prototype.rebalancingBuffer_;


/**
 * @return {number} Unique id for interval within tree.
 */
rflect.structs.IntervalTree.prototype.getUid = function() {
  return this.uid_++;
}


/**
 * @param {boolean=} aUnbalanced Whether interval that was added is 
 * unbalanced.
 * @param {number=} aUid Interval's id in case it's unbalanced.
 */
rflect.structs.IntervalTree.prototype.registerAdding = function(
    aUnbalanced, aUid) {
  if (!aUnbalanced)
    this.numberBalanced_++;
  else if (aUid) {
    this.unbalancedIntervalIds_[aUid] = 1;
    this.numberAdded_++;
  }
}


/**
 * @param {number} aUid Interval's id in case it's unbalanced.
 */
rflect.structs.IntervalTree.prototype.registerRemoving = function(aUid) {
  if (aUid in this.unbalancedIntervalIds_) {
    delete this.unbalancedIntervalIds_[aUid];
    this.numberAdded_--;
  }
  else {
    this.numberRemoved_--;
  }
}


/**
 * Checks whether tree should be rebalanced and rebalances it if needed.
 */
rflect.structs.IntervalTree.prototype.checkForRebalancing = function() {
  // Coefficient:
  // 1: rebalance will occur after each add/remove
  // 0: never
  // between 0 and 1: if added / (added + balanced) or removed / balanced
  // equals coefficient, rebalance will occur.
  var coefficient = 0.5;
  if ((this.numberBalanced_ + this.numberAdded_) * coefficient >=
      this.numberBalanced_ ||
      this.numberBalanced_ - this.numberRemoved_ <= this.numberBalanced_ *
      coefficient)
    this.rebalance_();
}


/**
 * Rebalances tree by setting new root node.
 */
rflect.structs.IntervalTree.prototype.rebalance_ = function() {
  var rebalancingBuffer;

  this.numberBalanced_ = this.numberAdded_ = 0;
  rebalancingBuffer = this.search(new rflect.date.Interval(-Infinity,
      Infinity));
  this.root_ = this.createRootNode_(rebalancingBuffer);
}


/**
 * @param {Array.<rflect.date.Interval>} aIntervals Intervals from which to
 * construct node.
 * @return {rflect.structs.IntervalTree.Node_} Root node.
 */
rflect.structs.IntervalTree.prototype.createRootNode_ = function(aIntervals) {
  return new rflect.structs.IntervalTree.Node_(aIntervals, this);
}


/**
 * Searches for all intersections with given interval.
 * @param {rflect.date.Interval} aInterval Input interval.
 * @return {Array.<rflect.date.Interval>} Intervals intersected with input,
 * with no duplicates.
 */
rflect.structs.IntervalTree.prototype.search = function(aInterval) {
  var foundIntervalIds = {};
  var foundCounter = 0;
  var result = null;

  var resultWithDuplicates = this.root_.search(aInterval);

  if (!resultWithDuplicates)
    return null;

  for (var counter = 0, length = resultWithDuplicates.length; counter < length;
      counter++){
    var interval = resultWithDuplicates[counter];
    var id = interval.id;
    if (!(id in foundIntervalIds)) {
      foundIntervalIds[id] = 1;
      if (!result) result = [];
      result[foundCounter++] = interval;
    }
  }
  return result;
}


/**
 * Adds one or many intervals to this tree.
 * @param {Array.<rflect.date.Interval>|rflect.date.Interval} aIntervals
 * Interval(s) to add.
 */
rflect.structs.IntervalTree.prototype.add = function(aIntervals) {
  this.root_.add(aIntervals);
}


/**
 * Removes one or many intervals from this tree.
 * @param {Array.<rflect.date.Interval>|rflect.date.Interval} aIntervals
 * Interval(s) to remove.
 */
rflect.structs.IntervalTree.prototype.remove = function(aIntervals) {
  this.root_.remove(aIntervals);
}


/**
 * Individual node of interval tree.
 * @param {Array.<rflect.date.Interval>} aIntervals Set of intervals.
 * @param {rflect.structs.IntervalTree} aTree Parent tree.
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

  /**
   * Link to parent tree.
   * @type {rflect.structs.IntervalTree}
   * @private
   */
  this.tree_ = aTree;

  this.midPoint_ = Math.round((max + min) / 2);

  this.add_(aIntervals);
};


/**
 * Removes all occurrences of interval from node's arrays.
 * @param {rflect.date.Interval} aInterval Interval to remove.
 * @param {Array.<rflect.date.Interval>} aArray One of node's arrays.
 * @param {function(rflect.date.Interval|number, rflect.date.Interval|number):number} aCompareFnPrimary Function for major part of comparations within method.
 * @param {function(rflect.date.Interval|number, rflect.date.Interval|number):number} aCompareFnSecondary Function for minor part of comparations within method.
 */
rflect.structs.IntervalTree.Node_.removeIntervalsFromArray_ =
    function(aInterval, aArray, aCompareFnPrimary, aCompareFnSecondary) {
  var index;
  var indexMid;
  var indexLast;

  indexMid = goog.array.binarySearch(aArray, aInterval, aCompareFnPrimary);
  if (indexMid > 0){
    indexLast = indexMid;
    while (aCompareFnPrimary(aArray[indexLast], aInterval) == 0 &&
        indexLast < aArray.length)
      indexLast++;

    index = indexLast - 1;
    while (aCompareFnPrimary(aArray[index], aInterval) == 0 &&
        index >= 0){
      if (aCompareFnSecondary(aArray[index], aInterval) == 0)
        goog.array.splice(aArray, index, 1);
      index--;
    }
  }
}


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
 * Adds one or many intervals to this node.
 * @param {rflect.date.Interval|Array.<rflect.date.Interval>} aInterval One or
 * more intervals to add.
 */
rflect.structs.IntervalTree.Node_.prototype.add = function(aInterval) {
  if (aInterval instanceof rflect.date.Interval){
    this.add_([aInterval], true);
  }
  else {
    this.add_(aInterval, true);
  }
}


/**
 * Adds intervals to this node.
 * @param {Array.<rflect.date.Interval>} aIntervals Intervals to add.
 * @param {boolean=} aUnbalanced Whether this method adds unbalanced intervals.
 */
rflect.structs.IntervalTree.Node_.prototype.add_ = function(aIntervals, 
    aUnbalanced) {
  var leftIntervals;
  var rightIntervals;

  for (var counter = 0, length = aIntervals.length; counter < length;
      counter++){
    var interval = aIntervals[counter];
    if (interval.contains(this.midPoint_)){
      var uid = this.tree_.getUid();
      interval.id = uid;
      rflect.array.binaryInsert(this.sortedBySP_ || (this.sortedBySP_ = []),
          interval, rflect.date.Interval.compareBySP);
      rflect.array.binaryInsert(this.sortedByEP_ || (this.sortedByEP_ = []),
          interval, rflect.date.Interval.compareByEP);
      this.tree_.registerAdding(aUnbalanced, uid);
    } else if (aIntervals[counter].end <= this.midPoint_)
      (leftIntervals || (leftIntervals = [])).push(aIntervals[counter]);
    else
      (rightIntervals || (rightIntervals = [])).push(aIntervals[counter]);
  }

  if (leftIntervals)
    if (this.leftNode_)
      this.leftNode_.add(leftIntervals);
    else
      this.leftNode_ = new rflect.structs.IntervalTree.Node_(leftIntervals,
          this.tree_);
  if (rightIntervals)
    if (this.rightNode_)
      this.rightNode_.add(rightIntervals);
    else
      this.rightNode_ = new rflect.structs.IntervalTree.Node_(rightIntervals,
        this.tree_);

  if (aUnbalanced)
    this.tree_.checkForRebalancing();
}


/**
 * Removes one or many intervals from this node.
 * @param {rflect.date.Interval|Array.<rflect.date.Interval>} aInterval One or
 * more intervals to remove.
 */
rflect.structs.IntervalTree.Node_.prototype.remove = function(aInterval) {
  if (aInterval instanceof rflect.date.Interval){
    this.remove_([aInterval], true);
  }
  else {
    this.remove_(aInterval, true);
  }
}


/**
 * Removes interval and its duplicates from this node.
 * @param {rflect.date.Interval} aIntervals Intervals to delete.
 * @return {boolean} Whether deletion leaves this node empty.
 */
rflect.structs.IntervalTree.Node_.prototype.remove_ = function(aIntervals) {
  var leftNodeIsEmpty = !this.leftNode_;
  var rightNodeIsEmpty = !this.rightNode_;

  for (var counter = 0, length = aIntervals.length; counter < length;
        counter++){
    var interval = aIntervals[counter];    
    if (this.sortedBySP_ && this.sortedByEP_) {
    
      var idsFoundInSP = {};
    
      if (interval.contains(this.midPoint_)) {
        rflect.structs.IntervalTree.Node_.removeIntervalsFromArray_(
            interval, this.sortedBySP_, rflect.date.Interval.compareBySP,
            rflect.date.Interval.compareByEP);
        rflect.structs.IntervalTree.Node_.removeIntervalsFromArray_(
            interval, this.sortedByEP_, rflect.date.Interval.compareByEP,
            rflect.date.Interval.compareBySP);
            
        if (!this.sortedBySP_.length)
          this.sortedBySP_ = null;
        if (!this.sortedByEP_.length)
          this.sortedByEP_ = null;      
      }
    }
  }

  if (!leftNodeIsEmpty){
    leftNodeIsEmpty = this.leftNode_.remove_(aIntervals);
    if (leftNodeIsEmpty) this.leftNode_ = null;
  }

  if (!rightNodeIsEmpty){
    rightNodeIsEmpty = this.rightNode_.remove_(aIntervals);
    if (rightNodeIsEmpty) this.rightNode_ = null;
  }

  return !this.sortedBySP_ && !this.sortedByEP_ && leftNodeIsEmpty &&
      rightNodeIsEmpty;
}


/**
 * Searches for all intersections with given interval within this node.
 * @param {rflect.date.Interval} aInterval Input interval.
 * @return {Array.<rflect.date.Interval>} Intervals intersected with input.
 */
rflect.structs.IntervalTree.Node_.prototype.search = function(aInterval) {
  var result = null;
  var index;
  var isInsertionPoint;
  if (this.sortedBySP_ && this.sortedByEP_) {
    if (aInterval.contains(this.midPoint_)) {
      result = goog.array.slice(this.sortedBySP_, 0);
      if (goog.DEBUG)
        _log(aInterval.toString() + ' contains midpoint of node ' + this);
    } else if (aInterval.end <= this.midPoint_) {
      var firstIntervalStart = this.sortedBySP_[0].start;
      if (goog.DEBUG)
        _log(aInterval.toString() + ' is left-touches node ' + this);
      index = goog.array.binarySearch(this.sortedBySP_, aInterval.end,
          rflect.date.Interval.compareBySP);
      if (goog.DEBUG)
        _log('index or insertion point', index);
      // Whether we found index or insertion point.
      isInsertionPoint = index < 0;
      index = index < 0 ? -index - 1 : index;
      if (aInterval.end != firstIntervalStart && !(isInsertionPoint &&
          index == 0))
        result = goog.array.slice(this.sortedBySP_, 0, index);
      if (goog.DEBUG)
        _log('result', result);

    } else {
      var length = this.sortedByEP_.length;
      var lastIntervalEnd = goog.array.peek(this.sortedByEP_).end;
      if (goog.DEBUG)
        _log(aInterval.toString() + ' is right-touches node ' + this);
      index = goog.array.binarySearch(this.sortedByEP_, aInterval.start,
          rflect.date.Interval.compareByEP);
      if (goog.DEBUG)
        _log('index or insertion point', index);
      index = index < 0 ? -index - 1 : index;
      if (aInterval.start != lastIntervalEnd &&
        index != length)
        result = goog.array.slice(this.sortedByEP_, index);
      if (goog.DEBUG)
        _log('result', result);
    }
  }

  if (this.leftNode_){
    if (goog.DEBUG)
      _log(aInterval.toString() + ' is searched within ' + this.leftNode_);
    var leftNodeResult = this.leftNode_.search(aInterval);
    if (leftNodeResult) result = (result || []).concat(leftNodeResult)
  }
  if (this.rightNode_){
    if (goog.DEBUG)
      _log(aInterval.toString() + ' is searched within ' + this.rightNode_);
    var rightNodeResult = this.rightNode_.search(aInterval);
    if (rightNodeResult) result = (result || []).concat(rightNodeResult)
  }

  return result;
}


/**
 * @return {string} String representation of node.
 */
rflect.structs.IntervalTree.Node_.prototype.toString = function(aInterval) {
  return '[' + (this.sortedBySP_ && this.sortedBySP_.length ?
      this.sortedBySP_[0].start : '-') + ';' + this.midPoint_ + ';' +
      (this.sortedByEP_ && this.sortedByEP_.length ?
      goog.array.peek(this.sortedByEP_).end :
      '-') + ']';
}