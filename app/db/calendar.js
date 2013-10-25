/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - calendar DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var db = require('./connection').db;


/**
 * Loads calendars.
 * @param {function(Array)} aOnCalendarsLoaded Callback that will be executed
 * when db request is ready.
 */
exports.getCalendarsAsync = function(aOnCalendarsLoaded){
  var collection = db.get('calendars');
  var calendars = [];

  collection.find({}, {}, function(aError, aCalendars){
    aCalendars && aCalendars.forEach(function(aCalendar) {
     calendars.push(calendarToTransportJSON(aCalendar));
    });

    // Executing callback for view.
    aOnCalendarsLoaded(calendars);
  });
};


/**
 * Saves calendar.
 * @param {function(Array)} aOnCalendarSaved Callback that will be when db
 * request is ready.
 */
exports.saveCalendarAsync = function(aCalendarJSON, aOnCalendarSaved){
  var collection = db.get('calendars');
  var calendar = calendarFromTransportJSON(aCalendarJSON);

  collection.count({ _id: calendar._id }, {}, function(aError, aCount){
    if (aCount > 0)
      collection.update(calendar, {}, function(aError, aResult){
        // Executing callback for view.
        aOnCalendarSaved('some id');
      });
    else
      collection.insert(calendar, {}, function(aError, aResult){
        console.log(aResult);
        // Executing callback for view.
        aOnCalendarSaved('some id');
      });
  });
};


/**
 * Turns db calendar object into transportable json.
 * @param {Object} aCalendar DB representation of calendar.
 * @return {Array} JSON representation of calendar.
 */
function calendarToTransportJSON(aCalendar) {

  var cal = [];

  cal.push(aCalendar._id);
  cal.push(aCalendar.name);
  cal.push(aCalendar.visible);
  cal.push(aCalendar.colorCodeId);
  cal.push(aCalendar.readOnly);
  cal.push(aCalendar.own);

  return cal;
};


/**
 * Turns calendar transportable json to db object.
 * @param {Array} aCalendarJSON JSON representation of calendar.
 * @return {Object} DB representation of calendar.
 */
function calendarFromTransportJSON(aCalendarJSON) {

  var cal = {};

  cal.own = aCalendarJSON.pop();
  cal.readOnly = aCalendarJSON.pop();
  cal.colorCodeId = aCalendarJSON.pop();
  cal.visible = aCalendarJSON.pop();
  cal.name = aCalendarJSON.pop();
  cal._id = aCalendarJSON.pop();

  return cal;
};