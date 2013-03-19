/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog for editing event.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EditDialog');

goog.require('rflect.ui.Dialog');



/**
 * Class for edit event dialog.
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {rflect.ui.Dialog}
 */
rflect.cal.ui.EditDialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
  rflect.ui.Dialog.call(this, undefined, undefined, undefined,
      goog.ui.FlatButtonRenderer.getInstance());

  this.setTitle('Edit event');
  this.setModal(false);
  this.setBackgroundElementOpacity(0);
  this.setButtonSet(rflect.cal.ui.EditDialog.createButtonSet());
  this.setContent(rflect.cal.ui.EditDialog.HTML_PARTS_);
};
goog.inherits(rflect.cal.ui.EditDialog, rflect.ui.Dialog);


/**
 * Captions for the edit dialog.
 * @enum {string}
 */
rflect.cal.ui.EditDialog.ButtonCaptions = {
  EDIT: 'Edit',
  DELETE: 'Delete'
};


/**
 * Creates a new ButtonSet with 'SAVE' (default) and 'Cancel' buttons.
 * @return {!rflect.ui.Dialog.ButtonSet} The created ButtonSet.
 */
rflect.cal.ui.EditDialog.createButtonSet = function() {
  var save = rflect.ui.Dialog.ButtonSet.getButton(
      goog.ui.Dialog.DefaultButtonCaptions.SAVE);
  var edit = rflect.ui.Dialog.ButtonSet.getButton(
      rflect.cal.ui.EditDialog.ButtonCaptions.EDIT);
  var del = rflect.ui.Dialog.ButtonSet.getButton(
      rflect.cal.ui.EditDialog.ButtonCaptions.DELETE);
  var cancel = rflect.ui.Dialog.ButtonSet.getButton(
      goog.ui.Dialog.DefaultButtonCaptions.CANCEL);


  return new rflect.ui.Dialog.ButtonSet().
      addButton(edit, true, false, true)
      .addButton(save, false, true)
      .addButton(del, false, true)
      .addButton(cancel, false, true);
};


/**
 * Input for event name.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EditDialog.prototype.input_;


/**
 * Content for dialog.
 * @type {string}
 * @const
 * @private
 */
rflect.cal.ui.EditDialog.HTML_PARTS_ =
    '<div class="event-name-cont">' +
        '<label for="event-name" class="event-name-label">Event name</label>' +
        '<input type="text" value="" id="event-name" name="event-name" ' +
        'class="event-name-input" spellcheck="false"/>' +
        '</div>' +
        '<a id="event-edit" class="event-edit-link goog-inline-block" ' +
        'href="javascript:void(0)">' +
        'Edit options</a>';


/**
 * @override
 */
rflect.cal.ui.EditDialog.prototype.enterDocument = function () {
  var link = this.getDomHelper().getElement('event-edit');
  this.input_ = this.getDomHelper().getElement('event-name');

  rflect.cal.ui.EditDialog.superClass_.enterDocument.call(this);

  this.getHandler().listen(link, goog.events.EventType.CLICK, this.onEditClick_,
      false, this);
}


/**
 * @return {string} Event name from input value.
 */
rflect.cal.ui.EditDialog.prototype.getEventName = function () {
  return this.input_.value;
}


/**
 * Edit link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EditDialog.prototype.onEditClick_ = function (aEvent) {
  var close = this.dispatchEvent({type:
      rflect.cal.ui.EditDialog.EVENT_EDIT});
  if (close)
    this.setVisible(false);
}

