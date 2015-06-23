/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Adapter that judges what target files should be used by app
 * based on user and request parameters.
 */


var ua = require('./useragent');
var fs = require('fs');
var TARGETS = require('../config/targets').TARGETS;
var accLangParser = require('acc-lang-parser');
var userDAO = require('../db/user');
var appConfig = require('../config/appconfig');
var log = appConfig.log;
var DEFAULT_USER = require('../config/defaultuser').DEFAULT_USER;


/**
 * Selects compiled target based on request and user.
 * @return {string} One of named constants for user agent, or null.
 */
exports.getCompiledTargetAsync = function(aRequest, aOnGetCompiledTarget){
  var user = aRequest.user ? aRequest.user[0] : DEFAULT_USER;

  log.info('user', user);

  //Set default target.
  var target;
  var languages = getLocales(user.settings, aRequest);
  var userAgentObject = ua.detect(aRequest.headers['user-agent']);
  var userAgent = getUserAgentName(userAgentObject);
  var uiType = getUIType(userAgentObject);

  log.info('languages', languages);

  for (var counter = 0; counter < languages.length && !target;
      counter++) {
    target = targetFinder(TARGETS, languages[counter], user.settings.debug,
        uiType, userAgent);
  }

  log.info('userAgent', userAgent);
  log.info('target', target);
  if (!target)
    target = TARGETS[0];

  aOnGetCompiledTarget(target);

};


/**
 * Gets list of locales based on user and request.
 * @return {Object} aUser User object.
 * @return {Object} aRequest Request object.
 * @return {Array.<string>} List of locales.
 */
function getLocales(aUser, aRequest) {
  var languages;

  if (aUser.language) {
    languages = [aUser.language];
  } else {
    languages = accLangParser.extractAllLangs(
        aRequest.headers['accept-language']).map(function(aLangObj){
      return aLangObj.language + (aLangObj.locale ? '-' + aLangObj.locale :
          '');
    });
  }

  // Add default 'en' locale.
  // Parser will always return at least [], (https://github.com/adcloud/acc-lang-parser/blob/master/spec/unit/parse-acc-lang.spec.js#L132),
  // so it's safe to push new item.
  languages.push('en');

  return languages;
}


function getUserAgentName(aUAObject) {
  var userAgentName = '';

  ['WEBKIT', 'IE', 'GECKO', 'OPERA'].forEach(function(aProperty){
    if (aUAObject[aProperty]) {
      userAgentName = aProperty;
    }
  });

  return userAgentName;
}


function getUIType(aUAObject) {
  var uiType = '';

  ['MOBILE'].forEach(function(aProperty){
    if (aUAObject[aProperty])
      uiType = aProperty;
  });

  return uiType;
}


function targetFinder(aTargets, aLocaleString, aDebugString, aUITypeString,
                      aUAString) {
  var matched;
  aTargets.some(function (aTarget) {
    if (aTarget.locale == aLocaleString && aTarget.userAgent == aUAString &&
        aTarget.userAgent == aUAString && aTarget.debug == aDebugString &&
        aTarget.uiType == aUITypeString) {

      matched = aTarget;
      return true;
    }
    return false;
  });
  return matched;
}
