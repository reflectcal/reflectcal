/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - calendar DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var entityDAO = require('./entity');
var dbUtil = require('./util');
var DEFAULT_CALENDAR = require('../config/defaultcalendar').DEFAULT_CALENDAR;
var db = require('./connection').db;


/**
 * Loads calendars.
 * @param {function(Array)} aOnCalendarsLoad Callback that will be executed
 * when db request is ready.
 */
exports.getCalendarsAsync = function(aOnCalendarsLoad){
  entityDAO.getEntitiesAsync('calendars', {}, aOnCalendarsLoad,
      calendarToTransportJSON, DEFAULT_CALENDAR);

};


/**
 * Saves calendar.
 * @param {Object} aCalendarJSON JSON representing calendar.
 * @param {function(string|number)} aOnCalendarSave Callback that will be
 * called when db request is ready.
 */
exports.saveCalendarAsync = function(aCalendarJSON, aOnCalendarSave){
  entityDAO.saveEntityAsync('calendars', aCalendarJSON, aOnCalendarSave,
      calendarFromTransportJSON);
};


/**
 * Deletes calendar.
 * @param {string} aCalendarId Calendar id.
 * @param {function(number)} aOnCalendarDelete Callback that will be called
 * when db request is ready.
 */
exports.deleteCalendarAsync = function(aCalendarId, aOnCalendarDelete){
  var events = db.get('events');

  entityDAO.deleteEntityAsync('calendars', aCalendarId,
      function(aError, aCalResult){
    // Removing all events of this calendar.
    events.remove({ calendarId: aCalendarId }, {},
        function(aError, aEventsResult){
      // Passing result to callback.
      aOnCalendarDelete(aCalResult);
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
  console.log(aCalendarJSON);
  var cal = {};

  cal.own = aCalendarJSON.pop();
  cal.readOnly = aCalendarJSON.pop();
  cal.colorCodeId = aCalendarJSON.pop();
  cal.visible = aCalendarJSON.pop();
  cal.name = aCalendarJSON.pop();
  cal._id = aCalendarJSON.pop();

  return cal;
};