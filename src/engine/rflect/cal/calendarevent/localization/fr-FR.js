goog.require("rflect.loc");

goog.provide("rflect.loc.cal.CalendarEvent");

rflect.loc.cal.CalendarEvent = function(aKey) {

  return rflect.loc.cal.CalendarEvent.dict[aKey];

}

rflect.loc.cal.CalendarEvent.dict = {

  "(No subject)":"(Aucun objet)"

};

