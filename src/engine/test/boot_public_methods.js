goog.provide("rflect.cal.boot");

goog.require("goog.events");
goog.require("rflect.cal._CalendarIota");
goog.require("rflect.Debug");

goog.require("rflect.cal.CalendarEventCreationBox");

(function() {

  goog.events.listen(window, "load", function(aEvent) {

    rflect.Debug.activate();

    inspect("_rflect.calendar.CalendarEventCreationBox", rflect.cal.CalendarEventCreationBox);

    var cal = null;

    var id = "";
    var button = goog.dom.$dom("button", {innerHTML: "addCalendarEvent"});
    var button2 = goog.dom.$dom("button", {innerHTML: "removeCalendarEvent"});
    var button3 = goog.dom.$dom("button", {innerHTML: "changeCalendarEvent"});


    var dbg = new rflect.Debug({
      title: "Public methods",
      id: 5,
      controller: null,
      width: "400px"
    });

    dbg.add(button);
    dbg.add(button2);
    dbg.add(button3);

    goog.events.listen(button, "click", function(aEvent) {
      id = cal.addCalendarEvent({
        year: 2008,
        monthOfYear: 07,
        dayOfMonth: 05,
        hourOfDay: 2
      }, {
        year: 2008,
        monthOfYear: 07,
        dayOfMonth: 05,
        hourOfDay: 7
      }, "created with public method");
    }, false);

    goog.events.listen(button2, "click", function(aEvent) {
      //echo(cal.removeCalendarEvent(id), 5);
    }, false);

    goog.events.listen(button3, "click", function(aEvent) {
      //echo(cal.changeCalendarEvent(id, {
      startDateTime:{
        year: 2008,
                monthOfYear
      :
        07,
                dayOfMonth
      :
        05,
                hourOfDay
      :
        1
      }
    ,
      endDateTime: {
        year: 2008,
                monthOfYear
      :
        07,
                dayOfMonth
      :
        05,
                hourOfDay
      :
        3
      }
    ,
      name: "created with public method and then changed"
    }),5
  )
    ;
  }, false);

  cal = new rflect.cal.Main();

  inspect("_Calendar", cal);


},false);


})
()