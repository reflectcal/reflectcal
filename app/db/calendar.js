/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - calendar DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var db = require('./connection').db;
var dbUtil = require('./util');


/**
 * Loads calendars.
 * @param {function(Array)} aOnCalendarsLoad Callback that will be executed
 * when db request is ready.
 */
exports.getCalendarsAsync = function(aOnCalendarsLoad){
  var collection = db.get('calendars');
  var calendars = [];

  collection.find({}, {}, function(aError, aCalendars){
    aCalendars && aCalendars.forEach(function(aCalendar) {
      calendars.push(calendarToTransportJSON(aCalendar));
    });

    // Executing callback for view.
    aOnCalendarsLoad(calendars);
  });
};


/**
 * Saves calendar.
 * @param {Object} aCalendarJSON JSON representing calendar.
 * @param {function(string|number)} aOnCalendarSave Callback that will be
 * called when db request is ready.
 */
exports.saveCalendarAsync = function(aCalendarJSON, aOnCalendarSave){
  var collection = db.get('calendars');
  var calendar = calendarFromTransportJSON(aCalendarJSON);

  collection.count({ _id: calendar._id }, function(aError, aCount){
    if (aCount > 0)
      collection.update(calendar, {}, function(aError, aResult){
        // Signalizing that update was ok.
        aOnCalendarSave(0);
      });
    else if (aCount == 0) dbUtil.getUniqueIdAsync(collection,
        function(aUniqueId){
      calendar._id = aUniqueId;
      collection.insert(calendar, {}, function(aError, aResult){
        // Passing new id to callback.
        aOnCalendarSave(aUniqueId);
      });
    });
  });
};


/**
 * Deletes calendar.
 * @param {string} aCalendarId Calendar id.
 * @param {function(number)} aOnCalendarDelete Callback that will be called
 * when db request is ready.
 */
exports.deleteCalendarAsync = function(aCalendarId, aOnCalendarDelete){
  var collection = db.get('calendars');

  collection.remove({ _id: aCalendarId }, {}, function(aError, aResult){
    // Passing result to callback.
    aOnCalendarDelete(aResult);
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
  console.log(aCalendarJSON);
  var cal = {};

  //cal.own = aCalendarJSON.pop();
  cal.readOnly = aCalendarJSON.pop();
  cal.colorCodeId = aCalendarJSON.pop();
  cal.visible = aCalendarJSON.pop();
  cal.name = aCalendarJSON.pop();
  cal._id = aCalendarJSON.pop();

  return cal;
};