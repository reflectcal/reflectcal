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


var ua = require('useragent');
var fs = require('fs');



/**
 * Compiled target class.
 * @constructor
 */
var CompiledTarget = function(){
  this.jsFiles = [];
  this.cssFiles = [];
}


/**
 * Selects compiled target based on request and settings.
 * @return {string} One of named constants for user agent, or null.
 */
exports.getCompiledTarget = function(aRequest, aCallback){

  var target = new CompiledTarget();

  var userAgent = ua.detect(aRequest.headers['user-agent']);
  var language = aRequest.headers['accept-language'];

  fs.readFileSync

  setImmediate(function() {
    aCallback(target);
  });

};


function matcher(aTargets, aUAString, aLocaleString, aDebugString) {
  aTargets.
}
