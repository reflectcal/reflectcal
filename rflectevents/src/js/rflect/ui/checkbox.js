// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Tristate checkbox widget.
 *
 * @see ../demos/checkbox.html
 */

goog.provide('rflect.ui.Checkbox');

goog.require('goog.ui.Checkbox');
goog.require('rflect.ui.CheckboxRenderer');



/**
 * 3-state checkbox widget. Fires CHECK or UNCHECK events before toggled and
 * CHANGE event after toggled by user.
 * The checkbox can also be enabled/disabled and get focused and highlighted.
 *
 * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link rflect.ui.CheckboxRenderer}.
 * @constructor
 * @extends {goog.ui.Checkbox}
 */
rflect.ui.Checkbox = function(opt_checked, opt_domHelper, opt_renderer) {
  var renderer = opt_renderer || rflect.ui.CheckboxRenderer.getInstance();
  goog.ui.Checkbox.call(this, opt_checked, opt_domHelper, renderer);
};
goog.inherits(rflect.ui.Checkbox, goog.ui.Checkbox);
