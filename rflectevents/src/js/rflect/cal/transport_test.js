/*
 * Copyright (c) 2012. Rflect, Alex K.
 */
goog.require('goog.testing.ContinuationTestCase');
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('goog.array');
goog.require('goog.testing.net.XhrIo');
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.cal.Transport');


var eventManager;
var transport;

function createMockStaticSend(timeInterval, desiredResponse) {

  return function mockStaticSend(url, opt_callback, opt_method, opt_content, opt_headers) {
    goog.testing.net.XhrIo.send(url, opt_callback, opt_method,
        opt_content, opt_headers, timeInterval);
    goog.array.peek(goog.testing.net.XhrIo.sendInstances_).response_ =
        desiredResponse;
  }

}

function makeEventManager() {
  return new rflect.cal.events.EventManager(null,
      null);
}
function makeTransport(mockStaticSend) {
  var t = new rflect.cal.Transport(null,
      null, makeEventManager());
  t.send_ = mockStaticSend;
}

function prepareDataStructures(indexFrom, indexTo) {
  sends = [
    createMockStaticSend(100, '')
  ].slice(indexFrom, indexTo);

  events = [
    rflect.cal.events.EventManager.createEvent('',
        null,
        null,
        false,
        '', '', 0)
  ];
}

function onSaveEvent(e) {
  assertTrue();
}

function onFailure(e) {
  assertTrue();
}

function testXhrs() {
  prepareDataStructures(-1);

  goog.array.forEach(sends, function(send, index) {
    var event = events[index];

    transport.send_ = send;
    transport.saveEventAsync_(event);
    assertTrue('event is in progress',
        transport.eventManager_.eventIsInProgress(event.id));

    goog.events.listen(transport, );
  }
}

// This is done for async test functions.
var testCase = new goog.testing.ContinuationTestCase();
testCase.autoDiscoverTests();
G_testRunner.initialize(testCase);