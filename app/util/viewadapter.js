// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

  var target;

  var userAgent = getUserAgentName(ua.detect(aRequest.headers['user-agent']));

  var languages = accLangParser.extractAllLangs(
      aRequest.headers['accept-language']).map(function(aLangObj){
    return aLangObj.language + '-' + aLangObj.locale;
  });

  // Add default 'en' locale.
  // Parser is always return at least [], (https://github.com/adcloud/acc-lang-parser/blob/master/spec/unit/parse-acc-lang.spec.js#L132),
  // so it's safe to push new item.
  languages.push('en');

  for (var counter = 0; counter < languages.length && !target; 
      counter++) {
    var target = TARGETS[TARGETS.indexOf(targetMatcher.bind(null,
        languages[counter], false, '', userAgent))];
  }

  //TODO(alexk): here we do base lookup for settings, so make call async.
  setImmediate(function() {
    aCallback(target);
  });

};


function getUserAgentName(aUAObject) {
  var userAgentName = '';

  ['WEBKIT', 'IE', 'GECKO', 'OPERA'].forEach(function(aProperty){
    if (aUAObject[aProperty])
      return aProperty;
  });

  return userAgentName;
}


function targetMatcher(aLocaleString, aDebugString, aUITypeString, aUAString,
    aTarget, aIndex, aTargets) {
  return aTarget.locale == aLocaleString && aTarget.userAgent == aUAString &&
      aTarget.userAgent == aUAString && aTarget.debug == aDebugString &&
      aTarget.uiType == aUITypeString;
}
