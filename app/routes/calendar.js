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
  var onCalendarSaved = function(aCalendarId) {
    res.body = JSON.stringify(aCalendarId);
  }

  calendarDAO.saveCalendarAsync(JSON.parse(req.body), onCalendarSaved);
};