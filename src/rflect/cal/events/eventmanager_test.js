/*
 * Copyright (c) 2013. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.cal.i18n.Symbols');


function testCreateEvent() {
  var events = [
    ['asd0f6a706fs7df60asdf6as', '201301170000', '201301180000', '', '', false]
  ];

  var fields = [
    [
    'asd0f6a706fs7df60asdf6as',
    new rflect.date.DateShim(2013, 0, 17),
    new rflect.date.DateShim(2013, 0, 18),
    rflect.cal.i18n.Symbols.NO_NAME_EVENT,
    '',
    false
    ]
  ];

  goog.array.forEach(events, function(event, index) {
    var event = rflect.cal.events.EventManager.createEvent(event);

    assertNonNull('event is not null', event);
    assertTrue('id equals control', event.longId == fields[index][0]);
    assertTrue('startDate equals control',
        event.startDate.equals(fields[index][1]);
    assertTrue('endDate equals control',
        event.endDate.equals(fields[index][2]);
    assertTrue('summary equals default',
        event.summary == fields[index][3]);
    assertTrue('description equals control',
        event.description == fields[index][4]);
    assertTrue('all day equals control',
        event.allDay == fields[index][5]);

    );
  });

}



