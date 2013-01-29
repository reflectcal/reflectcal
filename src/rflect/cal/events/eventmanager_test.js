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
goog.require('goog.object');


var eventsJSON;
var fields;
var events;
var chips;

function prepareDataStructures() {
  eventsJSON = [
    ['asd0f6a706fs7df60asdf6as', '201300170000', '201300180000', '', '', false]
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
      chipsByDay: {
        2000: {
            17: [new rflect.cal.events.Chip(0, 0, 1440, false, true)],
            18: [new rflect.cal.events.Chip(0, 0, 1440, true, false)]
          }
      },
      chipsByWeek: {
        2000: {
          3: [new rflect.cal.events.Chip(0, 4, 5, false, false)]
        }
      },
      allDayChipsByDay: {}
    }
  ]
}

function makeEventManager() {
  return new rflect.cal.events.EventManager(null,
      null);
}

function testCreateEvent() {
  prepareDataStructures();

  goog.array.forEach(eventsJSON, function(event, index) {
    var event = rflect.cal.events.EventManager.createEvent(event);

    assertNotNull('event is not null', event);
    assertTrue('id equals control', event.longId == fields[index][0]);
    if (goog.DEBUG)
      _log('event.startDate', event.startDate);
    if (goog.DEBUG)
        _log('fields[index][1]', fields[index][1]);
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
  prepareDataStructures();

  goog.array.forEach(chips, function(el, index) {
    var em = makeEventManager();
    if (goog.DEBUG)
      _inspect('em', em);
    em.processToChips([eventsJSON[index]]);

    assertTrue('chipsByDay year number is the same',
        goog.object.getCount(el.chipsByDay) ==
        goog.object.getCount(em.chipsByDay_));
    assertTrue('allDayChipsByDay year number is the same',
        goog.object.getCount(el.allDayChipsByDay) ==
        goog.object.getCount(em.allDayChipsByDay_));
    assertTrue('chipsByWeek year number is the same',
        goog.object.getCount(el.chipsByWeek) ==
        goog.object.getCount(em.chipsByWeek_));

    goog.array.forEach(el.chipsByDay, goog.bind(checkChipEquality, null,
        em.chipsByDay_));
    goog.array.forEach(el.allDayChipsByDay,
        goog.bind(checkChipEquality, null, em.allDayChipsByDay_));
    goog.array.forEach(el.chipsByWeek, goog.bind(checkChipEquality, null,
        em.chipsByWeek_));
  });
}

function checkChipEquality(testDataStructure, chipEntry) {
  for (var index1 in chipEntry) {
    assertNotNull('testDataStructure[' + index1 + ']',
        testDataStructure[index1]);
    assertTrue('days/weeks count equals',
        goog.object.getCount(chipEntry[index1]) ==
        goog.object.getCount(testDataStructure[index1]));
    for (var index2 in chipEntry[index1]) {
      assertNotNull('testDataStructure[' + index1 + '][' + index2 + ']',
          testDataStructure[index1][index2]);
      assertTrue('chips count', chipEntry[index1][index2].length ==
              testDataStructure[index1][index2].length);
      assertNotNull(
          'first chip of testDataStructure[' + index1 + '][' + index2 + '][0]',
          testDataStructure[index1][index2][0]);
      //TODO(alexk): expand chipEntry to properties
      assertTrue('chip start', chipEntry[index1][index2][0].equals(
          testDataStructure[index1][index2][0]));
    }
  }
}





