// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Utility methods supporting the autocomplete package.
 *
 * @see ../../demos/autocomplete-basic.html
 */

goog.provide('rflect.cal.ui.ac');

goog.require('rflect.cal.ui.ac.NoFilterMatcher');
goog.require('rflect.cal.ui.ac.TimeAutoComplete');
goog.require('rflect.ui.ac.InputHandler');
goog.require('rflect.cal.ui.ac.RendererScrollSupport');


/**
 * Factory function for building a basic autocomplete widget that autocompletes
 * an inputbox or text area from a data array.
 * For time input.
 * @param {Array} data Data array.
 * @param {Element} input Input element or text area.
 * @param {Element=} opt_parentNode optional reference to the parent element
 * that will hold the autocomplete elements. goog.dom.getDocument().body
 * will be used if this is null.
 * @param {boolean=} opt_multi Whether to allow multiple entries separated with
 *     semi-colons or commas.
 * @param {boolean=} opt_useSimilar use similar matches. e.g. "gost" => "ghost".
 * @return {!rflect.cal.ui.ac.TimeAutoComplete} A new autocomplete object.
 */
rflect.cal.ui.ac.createTimeAutoComplete =
    function(data, input, opt_parentNode, opt_multi, opt_useSimilar) {
  var matcher = new rflect.cal.ui.ac.NoFilterMatcher(data, !opt_useSimilar);
  var renderer = new rflect.cal.ui.ac.RendererScrollSupport(opt_parentNode);
  var inputHandler = new rflect.ui.ac.InputHandler(null, null, !!opt_multi);

  var autoComplete = new rflect.cal.ui.ac.TimeAutoComplete(
      matcher, renderer, inputHandler);
  inputHandler.attachAutoComplete(autoComplete);
  inputHandler.attachInputs(input);
  return autoComplete;
};
