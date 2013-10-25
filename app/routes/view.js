/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var calendarDAO = require('../db/calendar');


/**
 * Renders main page for compiled view.
 */
exports.view = function(req, res){
  var onCalendarsLoaded = function(aCalendars) {
    res.render('rflectcalendar-compiled', {
      calendars: JSON.stringify(aCalendars),
      settings: '[]'
    });
  }

  calendarDAO.getCalendarsAsync(onCalendarsLoaded);
};


/**
 * Renders main page for uncompiled view.
 */
exports.viewSource = function(req, res){
  var onCalendarsLoaded = function(aCalendars) {
    res.render('rflectcalendar-source', {
      calendars: JSON.stringify(aCalendars),
      settings: '[]'
    });
  }

  calendarDAO.getCalendarsAsync(onCalendarsLoaded);
};