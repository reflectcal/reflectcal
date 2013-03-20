/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog for saving event.
 * @author alexeykofficial@gmail.com (Alex K.)
 * TODO(user):
 */

goog.provide('rflect.cal.ui.SaveDialog');

goog.require('rflect.ui.Dialog');


/**
 * Class for save event dialog.
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {rflect.ui.Dialog}
 */
rflect.cal.ui.SaveDialog = function (opt_class, opt_useIframeMask, opt_domHelper) {
  rflect.ui.Dialog.call(this, undefined, undefined, undefined,
      goog.ui.FlatButtonRenderer.getInstance());

  this.setTitle('New event');
  this.setModal(false);
  this.setBackgroundElementOpacity(0);
  this.setButtonSet(rflect.ui.Dialog.ButtonSet.createSaveCancel());
  this.setContent(rflect.cal.ui.SaveDialog.HTML_PARTS_);
};
goog.inherits(rflect.cal.ui.SaveDialog, rflect.ui.Dialog);


/**
 * Input for event name.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SaveDialog.prototype.input_;


/**
 * Content for dialog.
 * @type {string}
 * @const
 * @private
 */
rflect.cal.ui.SaveDialog.HTML_PARTS_ =
    '<div class="event-name-cont">' +
        '<label for="event-name" class="event-name-label">Event name</label>' +
        '<input type="text" value="" id="event-name" name="event-name" ' +
        'class="event-name-input" spellcheck="false"/>' +
        '</div>' +
        '<a id="event-edit" class="event-edit-link goog-inline-block" ' +
        'href="javascript:void(0)">' +
        'Edit options</a>';


/**
 * Focuses the dialog contents and the default dialog button if there is one.
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.focus = function () {
  goog.ui.ModalPopup.prototype.focus.call(this);
  // Move focus to input field.
  if (this.input_) {
    this.input_.value = '';
    this.input_.focus();
  }
};


/**
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.enterDocument = function () {
  var link = this.getDomHelper().getElement('event-edit');
  this.input_ = this.getDomHelper().getElement('event-name');

  rflect.cal.ui.SaveDialog.superClass_.enterDocument.call(this);

  this.getHandler().listen(link, goog.events.EventType.CLICK, this.onEditClick_,
      false, this);
}


/**
 * @return {string} Event name from input value.
 */
rflect.cal.ui.SaveDialog.prototype.getEventName = function () {
  return this.input_.value;
}


/**
 * Edit link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SaveDialog.prototype.onEditClick_ = function (aEvent) {
  var close = this.dispatchEvent({type:
      rflect.cal.ui.SaveDialog.EVENT_EDIT});
  if (close)
    this.setVisible(false);
}


/**
 * Event types for save dialog.
 * @const {string}
 */
rflect.cal.ui.SaveDialog.EVENT_EDIT = 'editevent';


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.dispose = function () {
  rflect.cal.ui.SaveDialog.superClass_.dispose.call(this);

  this.input_ = null;
}