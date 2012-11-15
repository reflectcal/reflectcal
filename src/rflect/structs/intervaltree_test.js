/*
 * Copyright (c) 2012. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('goog.array');
goog.require('rflect.array');
goog.require('rflect.date.Interval');
goog.require('rflect.structs.IntervalTree');

var tree = null;

function makeIntervalTree() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 6);
  var int2 = new rflect.date.Interval(0, 10);
  var int3 = new rflect.date.Interval(36, 40);
  var int4 = new rflect.date.Interval(32, 40);
  var int5 = new rflect.date.Interval(19, 30);
  var int6 = new rflect.date.Interval(15, 25);
  var int7 = new rflect.date.Interval(14, 22);
  var int8 = new rflect.date.Interval(18, 26);
  var int9 = new rflect.date.Interval(10, 21);

  intervals.push(int1);
  intervals.push(int2);
  intervals.push(int3);
  intervals.push(int4);
  intervals.push(int5);
  intervals.push(int6);
  intervals.push(int7);
  intervals.push(int8);
  intervals.push(int9);

  tree = new rflect.structs.IntervalTree(intervals);
  return tree;

}

function testConstructor() {
  makeIntervalTree();
  assertNotEquals('tree', tree, null);
}

function testRootMidpoint() {
  assertEquals('root midpoint', tree.root_.midPoint_, 20);
}

function testRootChildren() {
  assertNotNull('left node', tree.root_.leftNode_);
  assertNotNull('right node', tree.root_.rightNode_);
}

function testRootNodeIntervals() {
  assertEquals('root node intervals', tree.root_.sortedBySP_.length, 5);
}

function testLeftNodeIntervals() {
  assertEquals('left node intervals', tree.root_.leftNode_.sortedBySP_.length,
      2);
}

function testRightNodeIntervals() {
  assertEquals('right node intervals', tree.root_.rightNode_.sortedBySP_.length,
      2);
}

function testProperSearchIsNotNull() {
  assertNotEquals('proper search is not null', tree.search(
      new rflect.date.Interval(15, 18)), null);
}

function testImproperSearchIsNull() {
  assertEquals('proper search is not null', tree.search(
      new rflect.date.Interval(41, 42)), null);
}

function testSearchLength1() {
  assertEquals('search of (19, 21] interval', tree.search(
      new rflect.date.Interval(19, 21)).length, 5);
}

function testSearchLength2() {
  assertEquals('search of (0, 10] interval', tree.search(
      new rflect.date.Interval(0, 10)).length, 2);
}

function testSearchLength3() {
  assertEquals('search of (35, 40] interval', tree.search(
      new rflect.date.Interval(35, 40)).length, 2);
}

function testSearchLength4() {
  assertEquals('search of (0, 11] interval', tree.search(
      new rflect.date.Interval(0, 11)).length, 3);
}

function testSearchLength5() {
  assertEquals('search of (12, 16] interval', tree.search(
      new rflect.date.Interval(12, 16)).length, 3);
}

function testSearchLength6() {
  var interval = new rflect.date.Interval(29, 40);
  assertEquals('search of ' + interval + ' interval', tree.search(
      interval).length, 3);
}

function testEdgeCase1() {
  var interval = new rflect.date.Interval(0, 10);
  var result = tree.search(interval);
  goog.array.sort(result, rflect.date.Interval.compareByEP);
  assertEquals('result size', result.length, 2);
  assertEquals('first interval start', result[0].start, 0);
  assertEquals('first interval end', result[0].end, 6);
  assertEquals('second interval start', result[1].start, 0);
  assertEquals('second interval end', result[1].end, 10);
}

function testEdgeCase2() {
  var interval = new rflect.date.Interval(10, 30);
  var result = tree.search(interval);
  goog.array.sort(result, rflect.date.Interval.compareBySP);
  assertEquals('result size', result.length, 5);
  assertEquals('first interval start', result[0].start, 10);
  assertEquals('first interval end', result[0].end, 21);
  assertEquals('second interval start', result[1].start, 14);
  assertEquals('second interval end', result[1].end, 22);
  assertEquals('third interval start', result[2].start, 15);
  assertEquals('third interval end', result[2].end, 25);
  assertEquals('fourth interval start', result[3].start, 18);
  assertEquals('fourth interval end', result[3].end, 26);
  assertEquals('fifth interval start', result[4].start, 19);
  assertEquals('fifth interval end', result[4].end, 30);
}

function testEdgeCase2() {
  var interval = new rflect.date.Interval(30, 40);
  var result = tree.search(interval);
  goog.array.sort(result, rflect.date.Interval.compareBySP);
  assertEquals('result size', result.length, 2);
  assertEquals('first interval start', result[0].start, 32);
  assertEquals('first interval end', result[0].end, 40);
  assertEquals('second interval start', result[1].start, 36);
  assertEquals('second interval end', result[1].end, 40);
}

var tree2 = null;

function makeIntervalTree2() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 6);
  var int2 = new rflect.date.Interval(0, 10);
  var int3 = new rflect.date.Interval(36, 40);
  var int4 = new rflect.date.Interval(32, 40);
  var int5 = new rflect.date.Interval(19, 40);
  var int6 = new rflect.date.Interval(15, 25);
  var int7 = new rflect.date.Interval(14, 22);
  var int8 = new rflect.date.Interval(18, 26);
  var int9 = new rflect.date.Interval(10, 21);
  var int10 = new rflect.date.Interval(0, 40);

  intervals.push(int1);
  intervals.push(int2);
  intervals.push(int3);
  intervals.push(int4);
  intervals.push(int5);
  intervals.push(int6);
  intervals.push(int7);
  intervals.push(int8);
  intervals.push(int9);
  intervals.push(int10);

  tree2 = new rflect.structs.IntervalTree(intervals);
  return tree2;

}

function testConstructor2() {
  makeIntervalTree2();
  assertNotNull('tree2', tree2);
}

function testSearchLength7() {
  var interval = new rflect.date.Interval(29, 33);
  assertEquals('search of ' + interval + ' interval', tree2.search(
      interval).length, 3);
}

var tree3 = null;

function makeIntervalTree3() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 30);
  var int2 = new rflect.date.Interval(11, 16);
  var int3 = new rflect.date.Interval(13, 21);
  var int4 = new rflect.date.Interval(1, 10);
  var int5 = new rflect.date.Interval(1, 9);
  var int6 = new rflect.date.Interval(3, 13);
  var int7 = new rflect.date.Interval(17, 30);
  var int8 = new rflect.date.Interval(20, 29);

  intervals.push(int1);
  intervals.push(int2);
  intervals.push(int3);
  intervals.push(int4);
  intervals.push(int5);
  intervals.push(int6);
  intervals.push(int7);
  intervals.push(int8);

  tree3 = new rflect.structs.IntervalTree(intervals);
  return tree3;

}

function testConstructor3() {
  makeIntervalTree3();
  assertNotNull('tree3', tree3);
}

function testSearchLength8() {
  var interval = new rflect.date.Interval(8, 14);
  var result = tree3.search(interval);
  assertEquals('search of ' + interval + ' interval', tree3.search(
      interval).length, 6);
}
function searchConditionMaker(aIntervalToFind) {
  return function(aIntervalItem) {
    return aIntervalToFind.equals(aIntervalItem);
  }
}
function testTree3Search() {
  var interval = new rflect.date.Interval(8, 14);
  var result = tree3.search(interval);
  var int1 = new rflect.date.Interval(1, 9);
  assertNotNull('Interval ' + int1 + ' is found.',
      goog.array.find(result, searchConditionMaker(int1)));
  var int2 = new rflect.date.Interval(3, 13);
  assertNotNull('Interval ' + int2 + ' is found.',
      goog.array.find(result, searchConditionMaker(int2)));
  var int3 = new rflect.date.Interval(1, 10);
  assertNotNull('Interval ' + int3 + ' is found.',
      goog.array.find(result, searchConditionMaker(int3)));
  var int4 = new rflect.date.Interval(13, 21);
  assertNotNull('Interval ' + int4 + ' is found.',
      goog.array.find(result, searchConditionMaker(int4)));
  var int5 = new rflect.date.Interval(11, 16);
  assertNotNull('Interval ' + int5 + ' is found.',
      goog.array.find(result, searchConditionMaker(int5)));
  var int6 = new rflect.date.Interval(0, 30);
  assertNotNull('Interval ' + int6 + ' is found.',
      goog.array.find(result, searchConditionMaker(int6)));

}

var tree4 = null;

function makeIntervalTree4() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 10);
  var int2 = new rflect.date.Interval(20, 30);

  intervals.push(int1);
  intervals.push(int2);

  tree4 = new rflect.structs.IntervalTree(intervals);
  return tree4;

}

function testConstructor4() {
  makeIntervalTree4();
  assertNotNull('tree4', tree4);
}

function testTree4Search() {
  var int1 = new rflect.date.Interval(10, 20);
  var int2 = new rflect.date.Interval(11, 19);
  var result = tree4.search(int1);
  assertNull('Interval ' + int1 + ' is not found.',
      result);
  result = tree4.search(int2);
  assertNull('Interval ' + int2 + ' is not found.',
      result);
}

function testTree4Search2() {
  var interval = new rflect.date.Interval(9, 21);
  var result = tree4.search(interval);
  var int1 = new rflect.date.Interval(0, 10);
  assertNotNull('Interval ' + int1 + ' is found.',
      goog.array.find(result, searchConditionMaker(int1)));
  var int2 = new rflect.date.Interval(20, 30);
  assertNotNull('Interval ' + int2 + ' is found.',
      goog.array.find(result, searchConditionMaker(int2)));
}

var tree5 = null;

function makeIntervalTree5() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 10);
  var int2 = new rflect.date.Interval(0, 10);
  var int3 = new rflect.date.Interval(0, 10);
  var int4 = new rflect.date.Interval(20, 30);
  var int5 = new rflect.date.Interval(20, 30);
  var int6 = new rflect.date.Interval(20, 30);

  intervals.push(int1);
  intervals.push(int2);
  intervals.push(int3);
  intervals.push(int4);
  intervals.push(int5);
  intervals.push(int6);

  tree5 = new rflect.structs.IntervalTree(intervals);
  return tree5;

}

function testConstructor5() {
  makeIntervalTree5();
  assertNotNull('tree5', tree5);
}

function testTree5Search() {
  var int1 = new rflect.date.Interval(10, 20);
  var int2 = new rflect.date.Interval(11, 19);
  var result = tree5.search(int1);
  assertNull('Interval ' + int1 + ' is not found.',
      result);
  result = tree5.search(int2);
  assertNull('Interval ' + int2 + ' is not found.',
      result);
}

var tree6 = null;

function makeIntervalTree6() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 10);
  var int2 = new rflect.date.Interval(0, 10);
  var int3 = new rflect.date.Interval(0, 10);
  var int4 = new rflect.date.Interval(20, 30);
  var int5 = new rflect.date.Interval(20, 30);
  var int6 = new rflect.date.Interval(20, 30);

  intervals.push(int1);
  intervals.push(int2);
  intervals.push(int3);
  intervals.push(int4);
  intervals.push(int5);
  intervals.push(int6);

  tree6 = new rflect.structs.IntervalTree(intervals);
  return tree6;

}

function testConstructor6() {
  makeIntervalTree6();
  assertNotNull('tree6', tree6);
}

function testAdd() {
  makeIntervalTree6();
  tree6.add(new rflect.date.Interval(0, 10));

  tree6.add([new rflect.date.Interval(0, 10), new rflect.date.Interval(0, 10),
      new rflect.date.Interval(0, 10), new rflect.date.Interval(0, 10)]);
}

function testAddAndRebalance() {
  makeIntervalTree6();
  assertEquals('tree6.numberAdded_ before balance', tree6.numberAdded_, 0);
  assertEquals('tree6.numberBalanced_ before balance', tree6.numberBalanced_,
      6);
  tree6.add(new rflect.date.Interval(0, 10));
  tree6.add(new rflect.date.Interval(0, 10));
  tree6.add(new rflect.date.Interval(0, 10));
  assertEquals('tree6.numberAdded_ after balance', tree6.numberAdded_, 3);
  assertEquals('tree6.numberBalanced_ after balance', tree6.numberBalanced_,
      6);
  tree6.add(new rflect.date.Interval(0, 10));
  tree6.add(new rflect.date.Interval(0, 10));
  tree6.add(new rflect.date.Interval(0, 10));
  assertEquals('tree6.numberAdded_ after balance', tree6.numberAdded_, 0);
  assertEquals('tree6.numberBalanced_ after balance', tree6.numberBalanced_,
      12);
}

function testRemove() {
  makeIntervalTree6();
  var intl1 = new rflect.date.Interval(0, 10);
  var result = null;

  tree6.remove(intl1);
  result = tree6.search(intl1);

  assertNull('Search result for removed interval ' + intl1 + ' is null',
      result);
}

