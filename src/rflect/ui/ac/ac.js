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

goog.provide('rflect.ui.ac');

goog.require('rflect.ui.ac.ArrayMatcher');
goog.require('rflect.ui.ac.AutoComplete');
goog.require('rflect.ui.ac.InputHandler');
goog.require('rflect.ui.ac.Renderer');


/**
 * Factory function for building a basic autocomplete widget that autocompletes
 * an inputbox or text area from a data array.
 * @param {Array} data Data array.
 * @param {Element} input Input element or text area.
 * @param {boolean=} opt_multi Whether to allow multiple entries separated with
 *     semi-colons or commas.
 * @param {boolean=} opt_useSimilar use similar matches. e.g. "gost" => "ghost".
 * @return {!rflect.ui.ac.AutoComplete} A new autocomplete object.
 */
rflect.ui.ac.createSimpleAutoComplete =
    function(data, input, opt_multi, opt_useSimilar) {
  var matcher = new rflect.ui.ac.ArrayMatcher(data, !opt_useSimilar);
  var renderer = new rflect.ui.ac.Renderer();
  var inputHandler = new rflect.ui.ac.InputHandler(null, null, !!opt_multi);

  var autoComplete = new rflect.ui.ac.AutoComplete(
      matcher, renderer, inputHandler);
  inputHandler.attachAutoComplete(autoComplete);
  inputHandler.attachInputs(input);
  return autoComplete;
};
