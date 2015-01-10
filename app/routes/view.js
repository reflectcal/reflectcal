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
    var user = req.user[0];
    var userName = user.username;
    
    var onCalendarsLoad = function(aCalendars) {
      if (appConfig.BUILT) {
        viewAdapter.getCompiledTargetAsync(req, function(aTarget) {
          renderMain(res, appConfig.COMPILED || appConfig.BUILT, STATIC_DIR,
              aCalendars, getJsFileNames(aTarget),
              getCssFileNames(aTarget), appConfig.LANGUAGE_NAMES, user);
        });
      } else {
        renderMain(res, appConfig.COMPILED || appConfig.BUILT, STATIC_DIR,
            aCalendars, getJsFileNames(), getCssFileNames(),
            appConfig.LANGUAGE_NAMES, user);
      }
    }
    calendarDAO.getCalendarsAsync(userName, onCalendarsLoad);
  } else {
    res.redirect('/login');
  }
}


function renderMain(res, aProcessed, aStaticDir, aCalendars, aJsFileNames, 
    aCssFileNames, aLanguageNames, aUser) {
  res.render('main', {
    processed: aProcessed,
    staticDir: aStaticDir,

    calendars: JSON.stringify(aCalendars),
    jsFileNames: aJsFileNames,
    cssFileNames: aCssFileNames,
    // Late modules are all js files except first one.
    modules: JSON.stringify(aJsFileNames.slice(1)),
    languageNames: JSON.stringify(aLanguageNames),
    user: JSON.stringify(aUser, null, ' ')
  });
}