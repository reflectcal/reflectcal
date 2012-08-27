/*
 * Copyright (c) 2012. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('rflect.array');
goog.require('rflect.date.Interval');
goog.require('rflect.structs.IntervalTree');

var tree = null;

function makeIntervalTree() {
  var intervals = [];
  var int1 = new rflect.date.Interval(0, 6);
  var int2 = new rflect.date.Interval(0, 10);
  var int3 = new rflect.date.Interval(35, 40);
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


