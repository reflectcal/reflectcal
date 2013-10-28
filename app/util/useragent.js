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
 * @fileoverview Rendering engine detection. Modified closure library code.
 * @see <a href="http://www.useragentstring.com/">User agent strings</a>
 * @see <a href="http://docs.closure-library.googlecode.com/git/closure_goog_useragent_useragent.js.source.html">User agent code</a>
 */


/**
 * Name constant for Opera.
 * @type {string}
 */
exports.OPERA = 'OPERA';


/**
 * Name constant for Internet Explorer. This includes
 * other browsers using Trident as its rendering engine. For example AOL
 * and Netscape 8
 * @type {string}
 */
exports.IE = 'IE';


/**
 * Name constant for WebKit. WebKit is the rendering
 * engine that Safari, Android and others use.
 * @type {string}
 */
exports.WEBKIT = 'WEBKIT';


/**
 * Name constant for Gecko. Gecko is the rendering
 * engine used by Mozilla, Mozilla Firefox, Camino and many more.
 * @type {string}
 */
exports.GECKO = 'GECKO';


/**
 * Name constant for a mobile device.
 * @type {string}
 */
exports.MOBILE = 'MOBILE';


/**
 * Name constant for iPad.
 * @type {string}
 */
exports.IPAD = 'IPAD';


/**
 * Name constant for iPhone.
 * @type {string}
 */
exports.IPHONE = 'IPHONE';


/**
 * Name constant for Android.
 * @type {string}
 */
exports.ANDROID = 'ANDROID';


/**
 * Detects and returns user agent name, if detected.
 * @return {string} One of named constants for user agent, or null.
 */
exports.detectUserAgent = function(aUserAgent){

  if (aUserAgent) {
    var detectedOpera = aUserAgent.indexOf('Opera') == 0;
    var detectedIe = !detectedOpera &&
        aUserAgent.indexOf('MSIE') != -1;
    var detectedWebkit = !detectedOpera &&
        aUserAgent.indexOf('WebKit') != -1;
    var detectedGecko = !detectedOpera &&
        !detectedWebkit && aUserAgent.indexOf('Gecko') != -1;
  }

  if (detectedOpera)
    return exports.OPERA;
  if (detectedIe)
    return exports.IE;
  if (detectedWebkit)
    return exports.WEBKIT;
  if (detectedGecko)
    return exports.GECKO;
  return null;
};


/**
 * Initialize the vars that define whether platform is mobile.
 * @return {string} Named constants for mobile platform, or null.
 */
exports.detectMobile = function(aUserAgent){
  var detectedMobile = aUserAgent.indexOf('Mobile') != -1;

  if (detectedMobile)
    return exports.MOBILE;
  return null;
};


/**
 * Initialize the vars that define which platform the user agent is running on.
 * @return {string} Named constant for platform, or null.
 */
exports.detectPlatform = function(aUserAgent){

  var detectedAndroid = !!aUserAgent && aUserAgent.indexOf('Android') >= 0;

  var detectedIPhone = !!aUserAgent && aUserAgent.indexOf('iPhone') >= 0;

  var detectedIPad = !!aUserAgent && aUserAgent.indexOf('iPad') >= 0;

  if (detectedAndroid)
    return exports.ANDROID;
  if (detectedIPhone)
    return exports.IPHONE;
  if (detectedIPad)
    return exports.IPAD;
  return null;
};
