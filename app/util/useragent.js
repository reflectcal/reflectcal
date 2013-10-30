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
 * Class that contains user agent properties.
 * @constructor
 */
function UserAgent() {

  /**
   * Name constant for Opera.
   * @type {boolean}
   */
  this.OPERA = false;
  
  
  /**
   * Name constant for Internet Explorer. This includes
   * other browsers using Trident as its rendering engine. For example AOL
   * and Netscape 8
   * @type {boolean}
   */
  this.IE = false;
  
  
  /**
   * Name constant for WebKit. WebKit is the rendering
   * engine that Safari, Android and others use.
   * @type {boolean}
   */
  this.WEBKIT = false;
  
  
  /**
   * Name constant for Gecko. Gecko is the rendering
   * engine used by Mozilla, Mozilla Firefox, Camino and many more.
   * @type {boolean}
   */
  this.GECKO = false;
  
  
  /**
   * Name constant for a mobile device.
   * @type {boolean}
   */
  this.MOBILE = false;
  
  
  /**
   * Name constant for iPad.
   * @type {boolean}
   */
  this.IPAD = false;
  
  
  /**
   * Name constant for iPhone.
   * @type {boolean}
   */
  this.IPHONE = false;
  
  
  /**
   * Name constant for Android.
   * @type {boolean}
   */
  this.ANDROID = false;

}


/**
 * Initialize vars that define user agent properties, if detected.
 * @param {string} aUserAgentStr User agent string.
 * @return {UserAgent} User agent object.
 */
exports.detect = function(aUserAgentStr){
  var ua = new UserAgent();

  exports.detectUserAgent(aUserAgentStr, ua);
  exports.detectMobile(aUserAgentStr, ua);
  exports.detectPlatform(aUserAgentStr, ua);

  return ua;
}


/**
 * Initialize vars that define user agent name, if detected.
 * @param {string} aUserAgentStr User agent string.
 * @param {UserAgent} User agent object.
 */
exports.detectUserAgent = function(aUserAgentStr, aUserAgent){

  if (aUserAgentStr) {
    aUserAgent.OPERA = aUserAgentStr.indexOf('Opera') == 0;
    aUserAgent.IE = !aUserAgent.OPERA && aUserAgentStr.indexOf('MSIE') != -1;
    aUserAgent.WEBKIT = !aUserAgent.OPERA &&
        aUserAgentStr.indexOf('WebKit') != -1;
    aUserAgent.GECKO = !aUserAgent.OPERA &&
        !aUserAgent.WEBKIT && aUserAgentStr.indexOf('Gecko') != -1;
  }
};


/**
 * Initialize vars that define whether platform is mobile.
 * @param {string} aUserAgentStr User agent string.
 * @param {UserAgent} User agent object.
 */
exports.detectMobile = function(aUserAgentStr, aUserAgent){
  aUserAgent.MOBILE = aUserAgentStr.indexOf('Mobile') != -1;
};


/**
 * Initialize vars that define which platform the user agent is running on.
 * @param {string} aUserAgentStr User agent string.
 * @param {UserAgent} User agent object.
 */
exports.detectPlatform = function(aUserAgentStr, aUserAgent){

  aUserAgent.ANDROID = !!aUserAgentStr && aUserAgentStr.indexOf('Android') >= 0;

  aUserAgent.IPHONE = !!aUserAgentStr && aUserAgentStr.indexOf('iPhone') >= 0;

  aUserAgent.IPAD = !!aUserAgentStr && aUserAgentStr.indexOf('iPad') >= 0;

};
