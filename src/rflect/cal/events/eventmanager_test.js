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

function prepareDataStructures(indexFrom, indexTo) {
  eventsJSON = [
    // Simplest possible input - no week breaks, no specific time
    ['asd0f6a706fs7df60asdf6as', '201300170000', '201300180000', '', '', false],
    // Different weeks
    ['asd0f6a706fs7df60asdf6as', '201300180000', '201300210000', '', '', false],
    // Different years, same week
    ['asd0f6a706fs7df60asdf6as', '201211310000', '201300020000', '', '', false],
    // Same as previous, but end has non-zero minutes
    ['asd0f6a706fs7df60asdf6as', '201211310000', '201300020400', '', '', false],
    // One day - specific start and end minutes.
    ['asd0f6a706fs7df60asdf6as', '201300171000', '201300171400', '', '', false]
  ].slice(indexFrom, indexTo);

  fields = [
    [
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2013, 0, 17),
    new rflect.date.DateShim(2013, 0, 18),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ],[
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2013, 0, 18),
    new rflect.date.DateShim(2013, 0, 21),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ],[
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2012, 11, 31),
    new rflect.date.DateShim(2013, 0, 2),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ],[
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2012, 11, 31),
    new rflect.date.DateShim(2013, 0, 2, 4),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ],[
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2012, 0, 17, 10),
    new rflect.date.DateShim(2013, 0, 17, 14),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ]
  ].slice(indexFrom, indexTo);

  events = [];
  if (goog.DEBUG)
    _inspect('events', events);

  chips = [
    {
      chipsByDay: {
        2013: {
            17: [new rflect.cal.events.Chip(0, 0, 1440, false, false)]
          }
      },
      chipsByWeek: {
        2013: {
          3: [new rflect.cal.events.Chip(0, 4, 5, false, false)]
        }
      },
      allDayChipsByDay: {}
    },{
      chipsByDay: {
        2013: {
            18: [new rflect.cal.events.Chip(1, 0, 1440, false, true)],
            19: [new rflect.cal.events.Chip(1, 0, 1440, true, true)],
            20: [new rflect.cal.events.Chip(1, 0, 1440, true, false)]
          }
      },
      chipsByWeek: {
        2013: {
          3: [new rflect.cal.events.Chip(1, 5, 7, false, true)],
          4: [new rflect.cal.events.Chip(1, 0, 1, true, false)]
        }
      },
      allDayChipsByDay: {}
    },{
      chipsByDay: {
        2012: {
            366: [new rflect.cal.events.Chip(2, 0, 1440, false, true)],
        },
        2013: {
            1: [new rflect.cal.events.Chip(2, 0, 1440, true, false)]
        }
      },
      chipsByWeek: {
        2013: {
          1: [new rflect.cal.events.Chip(2, 1, 3, false, false)]
        }
      },
      allDayChipsByDay: {}
    },{
      chipsByDay: {
        2012: {
            366: [new rflect.cal.events.Chip(3, 0, 1440, false, true)],
        },
        2013: {
            1: [new rflect.cal.events.Chip(3, 0, 1440, true, true)],
            2: [new rflect.cal.events.Chip(3, 0, 240, true, false)]
        }
      },
      chipsByWeek: {
        2013: {
          1: [new rflect.cal.events.Chip(3, 1, 4, false, false)]
        }
      },
      allDayChipsByDay: {}
    },{
      chipsByDay: {
        2013: {
            17: [new rflect.cal.events.Chip(4, 600, 840, false, false)]
          }
      },
      chipsByWeek: {
        2013: {
          3: [new rflect.cal.events.Chip(4, 4, 5, false, false)]
        }
      },
      allDayChipsByDay: {}
    }
  ].slice(indexFrom, indexTo);
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
  // Do this: prepareDataStructures(0, 2) when you want work on specific
  // subset of chips.
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

    // Chips by day.
    for (var index1 in el.chipsByDay) {
      assertNotNull('em.chipsByDay_[' + index1 + ']',
          em.chipsByDay_[index1]);
      assertTrue('days count equals',
          goog.object.getCount(el.chipsByDay[index1]) ==
          goog.object.getCount(em.chipsByDay_[index1]));
      for (var index2 in el.chipsByDay[index1]) {
        assertNotNullNorUndefined('em.chipsByDay_[' + index1 + '][' + index2 + ']',
            em.chipsByDay_[index1][index2]);
        assertTrue('chips count', el.chipsByDay[index1][index2].length ==
                em.chipsByDay_[index1][index2].length);
        assertNotNull(
            'first chip of em.chipsByDay_[' + index1 + '][' + index2 + '][0]',
            em.chipsByDay_[index1][index2][0]);
        //TODO(alexk): expand el.chipsByDay to properties
        assertTrue('day chip equality', el.chipsByDay[index1][index2][0].equals(
            em.chipsByDay_[index1][index2][0]));
      }
    }
    // All day chips by day.
    for (var index1 in el.allDayChipsByDay) {
      assertNotNull('em.allDayChipsByDay_[' + index1 + ']',
          em.allDayChipsByDay_[index1]);
      assertTrue('days count equals',
          goog.object.getCount(el.allDayChipsByDay[index1]) ==
          goog.object.getCount(em.allDayChipsByDay_[index1]));
      for (var index2 in el.allDayChipsByDay[index1]) {
        assertNotNullNorUndefined('em.allDayChipsByDay_[' + index1 + '][' + index2 + ']',
            em.allDayChipsByDay_[index1][index2]);
        assertTrue('chips count', el.allDayChipsByDay[index1][index2].length ==
                em.allDayChipsByDay_[index1][index2].length);
        assertNotNull(
            'first chip of em.allDayChipsByDay_[' + index1 + '][' + index2 + '][0]',
            em.allDayChipsByDay_[index1][index2][0]);
        //TODO(alexk): expand el.allDayChipsByDay to properties
        assertTrue('all day chip equality', el.allDayChipsByDay[index1][index2][0].equals(
            em.allDayChipsByDay_[index1][index2][0]));
      }
    }
    // Chips by week.
    for (var index1 in el.chipsByWeek) {
      assertNotNull('em.chipsByWeek_[' + index1 + ']',
          em.chipsByWeek_[index1]);
      assertTrue('weeks count equals',
          goog.object.getCount(el.chipsByWeek[index1]) ==
          goog.object.getCount(em.chipsByWeek_[index1]));
      for (var index2 in el.chipsByWeek[index1]) {
        assertNotNullNorUndefined('em.chipsByWeek_[' + index1 + '][' + index2 + ']',
            em.chipsByWeek_[index1][index2]);
        assertTrue('chips count', el.chipsByWeek[index1][index2].length ==
                em.chipsByWeek_[index1][index2].length);
        assertNotNull(
            'first chip of em.chipsByWeek_[' + index1 + '][' + index2 + '][0]',
            em.chipsByWeek_[index1][index2][0]);
        //TODO(alexk): expand el.chipsByWeek to properties
        assertTrue('week chip equality', el.chipsByWeek[index1][index2][0].equals(
            em.chipsByWeek_[index1][index2][0]));
      }
    }
  });
}








