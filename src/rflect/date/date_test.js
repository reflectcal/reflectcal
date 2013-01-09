/*
 * Copyright (c) 2012. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('goog.array');
goog.require('rflect.date');



function testRemove5() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 2);
  var int2 = new rflect.date.Interval(3, 5);
  var int3 = new rflect.date.Interval(6, 8);
  var int4 = new rflect.date.Interval(9, 11);
  var int5 = new rflect.date.Interval(11, 13);

  intervals.push(int1);
  intervals.push(int2);
  intervals.push(int3);
  intervals.push(int4);
  intervals.push(int5);

  tree6 = new rflect.structs.IntervalTree(intervals);

  tree6.remove(int1);
  tree6.remove(int2);
  tree6.remove(int4);
  tree6.remove(int5);
  tree6.remove(int3);

  result = tree6.search(int1);
  assertNull('Search result for removed interval ' + int1 + ' is null',
      result);
  result = tree6.search(int2);
  assertNull('Search result for removed interval ' + int2 + ' is null',
      result);
  result = tree6.search(int4);
  assertNull('Search result for removed interval ' + int4 + ' is null',
      result);
  result = tree6.search(int5);
  assertNull('Search result for removed interval ' + int5 + ' is null',
      result);
  result = tree6.search(int3);
  assertNull('Search result for removed interval ' + int3 + ' is null',
      result);

  assertNull('Search result for removed node tree6.root_.leftNode_ is null',
      tree6.root_.leftNode_);
  assertNull('Search result for removed node tree6.root_.rightNode_ is null',
      tree6.root_.rightNode_);
}

