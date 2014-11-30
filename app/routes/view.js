/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var calendarDAO = require('../db/calendar');
var settingsDAO = require('../db/settings');
var viewAdapter = require('../util/viewadapter');
var appConfig = require('../config/appconfig');
var ua = require('../util/useragent');

/**
 * Renders main page for compiled view.
 */
exports.view = function(req, res){
 if (req.user){
    var jsFileNames = appConfig.BUILT ? targets[0].jsFileNames :
        appConfig.COMPILED ? getCompiledJsNamesFromFs() : [];
    var cssFileNames = appConfig.BUILT ? targets[0].cssFileNames :
        appConfig.COMPILED ? getCompiledCssNamesFromFs() : [];

    var username = req.user[0].username;
    res.render('main', {
      compiled: appConfig.COMPILED,
      built: appConfig.BUILT,
      username: username,
      websocketsPort: appConfig.WEBSOCKETS_PORT,
      appPort: appConfig.APP_PORT,
      jsFileNames: jsFileNames,
      cssFileNames: cssFileNames
    });
  } else {
    res.redirect('/login');
  }

  var onCalendarsLoad = function(aCalendars) {
    viewAdapter.getCompiledTargetAsync(req, function(aTarget, aSettings){

      var templateName = aTarget.uiType == 'MOBILE' ?
          'rflectcalendar-mobile-compiled': 'rflectcalendar-compiled';

      res.render(templateName, {
        calendars: JSON.stringify(aCalendars),
        settings: JSON.stringify(aSettings[0], null, '  '),
        jsFileNames: aTarget.jsFileNames,
        cssFileNames: aTarget.cssFileNames,
        // Late modules are all js files except first one.
        modules: JSON.stringify(aTarget.jsFileNames.slice(1)),
        languageNames: JSON.stringify(appConfig.LANGUAGE_NAMES)
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

      var userAgentObject = ua.detect(req.headers['user-agent']);
      var templateName = userAgentObject.MOBILE ?
          'rflectcalendar-mobile-source': 'rflectcalendar-source';

      res.render(templateName, {
        calendars: JSON.stringify(aCalendars, null, '  '),
        settings: JSON.stringify(aSettings[0], null, '  '),
        languageNames: JSON.stringify(appConfig.LANGUAGE_NAMES, null, '  ')
      });
    });
  }

  calendarDAO.getCalendarsAsync(onCalendarsLoad);
};