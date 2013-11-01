/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var calendarDAO = require('../db/calendar');
var settingsDAO = require('../db/settings');
var ua = require('../util/useragent');
var viewAdapter = require('../util/viewadapter');

/**
 * Renders main page for compiled view.
 */
exports.view = function(req, res){
  var onCalendarsLoad = function(aCalendars) {
    viewAdapter.getCompiledTargetAsync(req, function(aTarget, aSettings){

      res.render('rflectcalendar-compiled', {
        calendars: JSON.stringify(aCalendars),
        settings: JSON.stringify(aSettings[0], null, '  '),
        jsFileNames: aTarget.jsFileNames,
        cssFileNames: aTarget.cssFileNames,
        // Late modules are all js files except first one.
        modules: JSON.stringify(aTarget.jsFileNames.slice(1))
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
    settingsDAO.getSettingsAsync(function(aSettings) {
      res.render('rflectcalendar-source', {
        calendars: JSON.stringify(aCalendars, null, '  '),
        settings: JSON.stringify(aSettings[0], null, '  ')
      });
    });
  }

  calendarDAO.getCalendarsAsync(onCalendarsLoad);
};