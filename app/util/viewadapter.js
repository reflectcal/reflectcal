/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Middleware between settings and set of files needed for
 * displaying a view.
 */


var ua = require('./useragent');
var fs = require('fs');
var TARGETS = require('../config/targets').TARGETS;
var accLangParser = require('acc-lang-parser');


/**
 * Selects compiled target based on request and settings.
 * @return {string} One of named constants for user agent, or null.
 */
exports.getCompiledTargetAsync = function(aRequest, aCallback){

  //Set default target.
  var target;

  var userAgentObject = ua.detect(aRequest.headers['user-agent']);
  var userAgent = getUserAgentName(userAgentObject);

  var languages = accLangParser.extractAllLangs(
      aRequest.headers['accept-language']).map(function(aLangObj){
    return aLangObj.language + (aLangObj.locale ? '-' + aLangObj.locale : '');
  });

  // Add default 'en' locale.
  // Parser is always return at least [], (https://github.com/adcloud/acc-lang-parser/blob/master/spec/unit/parse-acc-lang.spec.js#L132),
  // so it's safe to push new item.
  languages.push('en');

  for (var counter = 0; counter < languages.length && !target;
      counter++) {
    target = targetFinder(TARGETS, languages[counter], true, '', userAgent);
  }

  console.log('userAgent', userAgent);
  console.log('target', target);
  if (!target)
    target = TARGETS[0];

  //TODO(alexk): here we'll do base lookup for settings, so make call async.
  setImmediate(function() {
    aCallback(target);
  });

};


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
