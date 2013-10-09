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
 * @fileoverview Time AutoComplete subclass.
 *
 * @see ../../demos/autocomplete-basic.html
 */

goog.provide('rflect.cal.ui.ac.TimeAutoComplete');

goog.require('rflect.ui.ac.AutoComplete');



/**
 * Rime AutoComplete main class.
 *
 * @param {Object} matcher A data source and row matcher, implements
 *        <code>requestMatchingRows(token, maxMatches, matchCallback)</code>.
 * @param {goog.events.EventTarget} renderer An object that implements
 *        <code>
 *          isVisible():boolean<br>
 *          renderRows(rows:Array, token:string, target:Element);<br>
 *          hiliteId(row-id:number);<br>
 *          dismiss();<br>
 *          dispose():
 *        </code>.
 * @param {Object} selectionHandler An object that implements
 *        <code>
 *          selectRow(row);<br>
 *          update(opt_force);
 *        </code>.
 *
 * @constructor
 * @extends {rflect.ui.ac.AutoComplete}
 */
rflect.cal.ui.ac.TimeAutoComplete = function(matcher, renderer, selectionHandler) {
  rflect.ui.ac.AutoComplete.call(this, matcher, renderer, selectionHandler);
};
goog.inherits(rflect.cal.ui.ac.TimeAutoComplete, rflect.ui.ac.AutoComplete);


/**
 * Callback passed to Matcher when requesting matches for a token.
 * This might be called synchronously, or asynchronously, or both, for
 * any implementation of a Matcher.
 * If the Matcher calls this back, with the same token this AutoComplete
 * has set currently, then this will package the matching rows in object
 * of the form
 * <pre>
 * {
 *   id: an integer ID unique to this result set and AutoComplete instance,
 *   data: the raw row data from Matcher
 * }
 * </pre>
 *
 * @param {string} matchedToken Token that corresponds with the rows.
 * @param {!Array} rows Set of data that match the given token.
 * @param {(boolean|rflect.ui.ac.RenderOptions)=} opt_options If true,
 *     keeps the currently hilited (by index) element hilited. If false not.
 *     Otherwise a RenderOptions object.
 * @protected
 */
rflect.cal.ui.ac.TimeAutoComplete.prototype.matchListener_ =
    function(matchedToken, rows, opt_options) {
  if (this.token_ != matchedToken) {
    // Matcher's response token doesn't match current token.
    // This is probably an async response that came in after
    // the token was changed, so don't do anything.
    return;
  }

  this.renderRows(rows, opt_options);
  this.renderer_.setScrollPosition(this.matcher_.firstMatchedIndex);
};
