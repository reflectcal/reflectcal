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
 * @fileoverview Renderer subclass with method to set scroll position.
 *
 */

goog.provide('rflect.cal.ui.ac.RendererScrollSupport');


goog.require('goog.ui.ac.Renderer');



/**
 * Renderer subclass with method to set scroll position.
 *
 * @constructor
 * @param {Element=} opt_parentNode optional reference to the parent element
 *     that will hold the autocomplete elements. goog.dom.getDocument().body
 *     will be used if this is null.
 * @param {?({renderRow}|{render})=} opt_customRenderer Custom full renderer to
 *     render each row. Should be something with a renderRow or render method.
 * @param {boolean=} opt_rightAlign Determines if the autocomplete will always
 *     be right aligned. False by default.
 * @param {boolean=} opt_useStandardHighlighting Determines if standard
 *     highlighting should be applied to each row of data. Standard highlighting
 *     bolds every matching substring for a given token in each row. True by
 *     default.
 * @extends {goog.ui.ac.Renderer}
 */
rflect.cal.ui.ac.RendererScrollSupport = function(opt_parentNode, opt_customRenderer,
    opt_rightAlign, opt_useStandardHighlighting) {
  goog.ui.ac.Renderer.call(this, opt_parentNode, opt_customRenderer,
      opt_rightAlign, opt_useStandardHighlighting)
};
goog.inherits(rflect.cal.ui.ac.RendererScrollSupport, goog.ui.ac.Renderer);


/**
 * Sets scroll on specific row index.
 * @param {number} aIndex Index of row to scroll to.
 */
rflect.cal.ui.ac.RendererScrollSupport.prototype.setScrollPosition =
    function(aIndex) {
  if (aIndex < 0)
    this.element_.scrollTop = 0;
  else {
    var heightQuant = this.element_.scrollHeight / this.rows_.length;
    this.element_.scrollTop = heightQuant * aIndex;
  }
}