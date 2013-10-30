/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var calendarDAO = require('../db/calendar');
var ua = require('../util/useragent');
var viewAdapter = require('../util/viewadapter');

/**
 * Renders main page for compiled view.
 */
exports.view = function(req, res){
  var onCalendarsLoad = function(aCalendars) {
    viewAdapter.getCompiledTargetAsync(req, function(aTarget){

      res.render('rflectcalendar-compiled', {
        calendars: JSON.stringify(aCalendars),
        settings: '[]',
        jsFileNames: aTarget.jsFileNames,
        cssFileNames: aTarget.cssFileNames
      });

    });
  }

  calendarDAO.getCalendarsAsync(onCalendarsLoad);
};


/**
 * Renders main page for uncompiled view.
 */
exports.viewSource = function(req, res){
  var onCalendarsLoad = function(aCalendars) {
    res.render('rflectcalendar-source', {
      calendars: JSON.stringify(aCalendars),
      settings: '[]'
    });
  }

  calendarDAO.getCalendarsAsync(onCalendarsLoad);
};