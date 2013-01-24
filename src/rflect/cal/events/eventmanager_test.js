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
goog.require('goog.array');


var eventsJSON;
var fields;
var events;
var chips;

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

  chips = [
    {
      chipsByDay: [
        [2000, 17, new rflect.cal.events.Chip(0, 0, 1440, false, true)],
        [2000, 18, new rflect.cal.events.Chip(0, 0, 1440, true, false)],
      ],
      chipsByWeek: [
        [2000, 3, new rflect.cal.events.Chip(0, 4, 5, false, false)]
      ],
      allDayChipsByDay: []
    }
  ]
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
  goog.array.forEach(chips, function(el, index) {
    goog.array.forEach(el.chipsByDay, function(chipByDay, index) {
      var year = chipByDay[0];
      var dayOfYear = chipByDay[1];
      assertNotNull('em.chipsByDay_[' + year + ']', em.chipsByDay_[year]);
      assertNotNull('em.chipsByDay_[' + year + '][' + dayOfYear + ']',
          em.chipsByDay_[year][dayOfYear]);
      assertTrue(chipByDay[2].equals(em.chipsByDay_[year][dayOfYear]));
    });
    goog.array.forEach(el.allDayChipsByDay, function(allDayChipByDay, index) {
      var year = allDayChipByDay[0];
      var dayOfYear = allDayChipByDay[1];
      assertNotNull('em.allDayChipsByDay_[' + year + ']', em.allDayChipsByDay_[year]);
      assertNotNull('em.allDayChipsByDay_[' + year + '][' + dayOfYear + ']',
          em.allDayChipsByDay_[year][dayOfYear]);
      assertTrue(allDayChipByDay[2].equals(em.allDayChipsByDay_[year][dayOfYear]));
    });
    goog.array.forEach(el.chipsByWeek, function(chipByWeek, index) {
      var year = chipByWeek[0];
      var weekOfYear = chipByWeek[1];
      assertNotNull('em.chipsByWeek_[' + year + ']', em.chipsByWeek_[year]);
      assertNotNull('em.chipsByWeek_[' + year + '][' + weekOfYear + ']',
          em.chipsByWeek_[year][weekOfYear]);
      assertTrue(chipByWeek[2].equals(em.chipsByWeek_[year][dayOfWeek]));
    });
  });
}





