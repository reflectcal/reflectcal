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
var log = appConfig.log;
var ua = require('../util/useragent');
var getJsFileNames = require('../util/pagehelper').getJsFileNames;
var getCssFileNames = require('../util/pagehelper').getCssFileNames;
var STATIC_DIR = require('../util/pagehelper').STATIC_DIR;


/**
 * Renders main page for compiled view.
 */
exports.render = function(req, res) {
  if (req.user) {
    var userId = req.user[0]._id;
    var userName = req.user[0].username;

    var onCalendarsLoad = function(aCalendars) {
      if (appConfig.BUILT) {
        viewAdapter.getCompiledTargetAsync(req, function(aTarget, aSettings){
          renderMain(res, appConfig.COMPILED || appConfig.BUILT, STATIC_DIR,
              aCalendars, aSettings, getJsFileNames(aTarget),
              getCssFileNames(aTarget), appConfig.LANGUAGE_NAMES, userId,
              userName);
        });
      } else {
        settingsDAO.getSettingsAsync(function(aSettings) {
          log.info('aSettings ', aSettings);
          renderMain(res, appConfig.COMPILED || appConfig.BUILT, STATIC_DIR,
              aCalendars, aSettings, getJsFileNames(), getCssFileNames(),
              appConfig.LANGUAGE_NAMES, userId, userName);
        });
      }
    }
    calendarDAO.getCalendarsAsync(userName, onCalendarsLoad);
  } else {
    res.redirect('/login');
  }
}


function renderMain(res, aProcessed, aStaticDir, aCalendars, aSettings,
    aJsFileNames, aCssFileNames, aLanguageNames, aUserId, aUserName) {
  res.render('main', {
    processed: aProcessed,
    staticDir: aStaticDir,

    calendars: JSON.stringify(aCalendars),
    settings: JSON.stringify(aSettings[0], null, '  '),
    jsFileNames: aJsFileNames,
    cssFileNames: aCssFileNames,
    // Late modules are all js files except first one.
    modules: JSON.stringify(aJsFileNames.slice(1)),
    languageNames: JSON.stringify(aLanguageNames),
    userId: aUserId,
    userName: aUserName
  });
}


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
};