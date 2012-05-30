/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview A button control for calendar. Based on {@link
 * goog.ui.Button}. The only difference with ancestor is public {@link
 * rflect.cal.Button#decorateInternal} method.
 *
 * @see ../demos/button.html
 */

goog.provide('rflect.cal.Button');

goog.require('goog.ui.Button');



/**
 * A button control, rendered as a native browser button by default.
 *
 * @param {goog.ui.ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the button; defaults to {@link goog.ui.NativeButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Button}
 */
rflect.cal.Button = function(content, opt_renderer, opt_domHelper) {
  goog.ui.Button.call(this, content, opt_renderer, opt_domHelper);
};
goog.inherits(rflect.cal.Button, goog.ui.Button);


/**
 * Public version of {@link
 * goog.ui.Control#decorateInternal} to decorate button separately from
 * entering document phase.
 * @param {Element} element Element to decorate.
 * @override
 */
rflect.cal.Button.prototype.decorateInternal = function(element) {
  goog.ui.Button.prototype.decorateInternal.call(this, element);
};
