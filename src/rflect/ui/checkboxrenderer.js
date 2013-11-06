// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Renderer that supports check sign which is not background image
 * but child element.
 */

goog.provide('rflect.ui.CheckboxRenderer');

goog.require('goog.style');
goog.require('goog.ui.CheckboxRenderer');



/**
 * Renderer that supports check sign which is not background image but child
 * element.
 * @constructor
 * @extends {goog.ui.CheckboxRenderer}
 */
rflect.ui.CheckboxRenderer = function() {
  goog.ui.CheckboxRenderer.call(this);
};
goog.inherits(rflect.ui.CheckboxRenderer, goog.ui.CheckboxRenderer);
goog.addSingletonGetter(rflect.ui.CheckboxRenderer);


/** @override */
rflect.ui.CheckboxRenderer.prototype.createDom = function(checkbox) {
  var element = checkbox.getDomHelper().createDom(
      'span', this.getClassNames(checkbox).join(' '),
      checkbox.getDomHelper().createDom('div',
      [goog.getCssName('icon'), goog.getCssName('icon-check'),
      goog.getCssName('checked-sign')]));

  var state = checkbox.getChecked();
  this.setCheckboxState(element, state);

  return element;
};


/**
 * Updates the appearance of the control in response to a checkbox state
 * change.
 * @param {Element} element Checkbox element.
 * @param {goog.ui.Checkbox.State} state Updated checkbox state.
 */
rflect.ui.CheckboxRenderer.prototype.setCheckboxState = function(
    element, state) {
  rflect.ui.CheckboxRenderer.superClass_.setCheckboxState.call(this, element,
      state);

  if (element) {
    goog.style.showElement(/**@type {Element}*/ (element.firstChild),
        state == goog.ui.Checkbox.State.CHECKED);
  }
};