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
var appConfig = require('../config/appconfig');
var log = appConfig.log;


/**
 * Loads calendars.
 * @param {string} aUserId Id of calendar owner.
 * @param {function(Array)} aOnCalendarsLoad Callback that will be executed
 * when db request is ready.
 */
exports.getCalendarsAsync = function(aUserId, aOnCalendarsLoad){
  entityDAO.getEntitiesAsync('calendars', { owner: aUserId }, aOnCalendarsLoad,
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
      function(aCalResult){
    // Removing all events of this calendar.
    events.remove({ calendarId: aCalendarId }, {},
        function(aError, aNumberOfDeleted){
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
  cal.push(aCalendar.owner);

  return cal;
};


/**
 * Turns calendar transportable json to db object.
 * @param {Array} aCalendarJSON JSON representation of calendar.
 * @return {Object} DB representation of calendar.
 */
function calendarFromTransportJSON(aCalendarJSON) {
  log.info(aCalendarJSON);
  var cal = {};

  cal.owner = aCalendarJSON.pop();
  cal.own = aCalendarJSON.pop();
  cal.readOnly = aCalendarJSON.pop();
  cal.colorCodeId = aCalendarJSON.pop();
  cal.visible = aCalendarJSON.pop();
  cal.name = aCalendarJSON.pop();
  cal._id = aCalendarJSON.pop();

  return cal;
};