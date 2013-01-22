/*
 * Copyright (c) 2013. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.date.DateShim');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.ViewManager');


var eventsJSON;

var fields;

var events;

function prepareDataStructures() {
  eventsJSON = [
    ['asd0f6a706fs7df60asdf6as', '201301170000', '201301180000', '', '', false]
  ];

  fields = [
    [
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2013, 0, 17),
    new rflect.date.DateShim(2013, 0, 18),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ]
  ];

  events = [];
  if (goog.DEBUG)
    _inspect('events', events);
}

var eventManager;

function makeEventManager() {
  return eventManager ? eventManager : eventManager =
      new rflect.cal.events.EventManager(null,
      null);
}

function testCreateEvent() {
  prepareDataStructures();

  goog.array.forEach(eventsJSON, function(event, index) {
    var event = rflect.cal.events.EventManager.createEvent(event);

    assertNotNull('event is not null', event);
    assertTrue('id equals control', event.longId == fields[index][0]);
    assertTrue('startDate equals control',
        event.startDate.equals(fields[index][1]));
    assertTrue('endDate equals control',
        event.endDate.equals(fields[index][2]));
    assertTrue('summary equals default',
        event.summary == fields[index][3]);
    assertTrue('description equals control',
        event.description == fields[index][4]);
    assertTrue('all day equals control',
        event.allDay == fields[index][5]);

    events.push(event);
  });
}

// Requires that event creation works.
function testChipCreation() {
  var em = makeEventManager();
  prepareDataStructures();

  em.processToChips(eventsJSON);
  if (goog.DEBUG)
    _inspect('em', em);

  //Tests below are locale-dependent.
  assertNotNull('em.chipsByDay_[2013]', em.chipsByDay_[2013]);
  assertNotNull('em.chipsByDay_[2013]', em.chipsByDay_[2013][17]);
  assertNotNull('em.chipsByDay_[2013]', em.chipsByDay_[2013][18]);

  assertNotNull('em.chipsByWeek_[2013]', em.chipsByWeek_[2013]);
  assertNotNull('em.chipsByWeek_[2013]', em.chipsByWeek_[2013][3]);
}





