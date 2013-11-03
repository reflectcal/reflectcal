/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Adapter that judges what target files should be used by app
 * based on settings and request parameters.
 */


var ua = require('./useragent');
var fs = require('fs');
var TARGETS = require('../config/targets').TARGETS;
var accLangParser = require('acc-lang-parser');
var settingsDAO = require('../db/settings');


/**
 * Selects compiled target based on request and settings.
 * @return {string} One of named constants for user agent, or null.
 */
exports.getCompiledTargetAsync = function(aRequest, aOnGetCompiledTarget){

  settingsDAO.getSettingsAsync(function(aSettings){

    console.log('settings', aSettings);

    //Set default target.
    var target;
    var languages = getLocales(aSettings[0], aRequest);
    var userAgentObject = ua.detect(aRequest.headers['user-agent']);
    var userAgent = getUserAgentName(userAgentObject);

    console.log('languages', languages);

    for (var counter = 0; counter < languages.length && !target;
        counter++) {
      target = targetFinder(TARGETS, languages[counter], !!aSettings[0].debug,
          '', userAgent);
    }

    console.log('userAgent', userAgent);
    console.log('target', target);
    if (!target)
      target = TARGETS[0];

    aOnGetCompiledTarget(target, aSettings);

  });

};


/**
 * Gets list of locales based on settings and request.
 * @return {Object} aSettings Settings object.
 * @return {Object} aRequest Request object.
 * @return {Array.<string>} List of locales.
 */
function getLocales(aSettings, aRequest) {
  var languages;

  if (aSettings.language) {
    languages = [aSettings.language];
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
    if (aUAObject[aProperty])
      userAgentName = aProperty;
  });

  return userAgentName;
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
