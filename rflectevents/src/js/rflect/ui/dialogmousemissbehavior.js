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
 * @fileoverview Dialog that implements "mouse miss to close" behavior.
 */

goog.provide('rflect.ui.DialogMouseMissBehavior');


goog.require('rflect.ui.Dialog');
goog.require('rflect.ui.MouseMissBehavior');



/**
 * Dialog main class.
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {rflect.ui.Dialog}
 */
rflect.ui.DialogMouseMissBehavior = function(opt_class, opt_useIframeMask,
    opt_domHelper) {
  rflect.ui.Dialog.call(this, undefined, undefined, undefined,
      goog.ui.FlatButtonRenderer.getInstance());

  /**
   * "Mouse miss to cancel" behavior for this dialog.
   * @type {rflect.ui.MouseMissBehavior}
   * @private
   */
  this.mmBehavior_ = new rflect.ui.MouseMissBehavior(this);
  this.mmBehavior_.enable(true);
};
goog.inherits(rflect.ui.DialogMouseMissBehavior, rflect.ui.Dialog);


/**
 * @override
 */
rflect.ui.DialogMouseMissBehavior.prototype.enterDocument = function () {
  rflect.ui.DialogMouseMissBehavior.superClass_.enterDocument.call(this);
  this.mmBehavior_.enterDocument();
}


/**
 * Dispose method.
 * @override
 */
rflect.ui.DialogMouseMissBehavior.prototype.disposeInternal = function () {
  this.mmBehavior_.dispose();
  rflect.ui.DialogMouseMissBehavior.superClass_.disposeInternal.call(this);
}



