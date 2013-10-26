/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar routes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var calendarDAO = require('../db/calendar');


/**
 * Saves calendar.
 */
exports.calendarSave = function(req, res){
  var onCalendarSave = function(aCalendarId) {
    res.send(JSON.stringify(aCalendarId));
  }

  calendarDAO.saveCalendarAsync(req.body, onCalendarSave);
};


/**
 * Deletes calendar.
 */
exports.calendarDelete = function(req, res){
  var onCalendarDelete = function(aResult) {
    res.send(JSON.stringify(aResult));
  }

  calendarDAO.deleteCalendarAsync(req.params.id, onCalendarDelete);
};