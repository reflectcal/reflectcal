/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog for editing event.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EditDialog');
goog.provide('rflect.cal.ui.EditDialog.ButtonCaptions');

goog.require('goog.events.KeyCodes');
goog.require('goog.ui.Component.EventType');
goog.require('rflect.ui.DialogMouseMissBehavior');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.SaveDialog');



/**
 * Class for edit event dialog.
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {rflect.ui.DialogMouseMissBehavior}
 */
rflect.cal.ui.EditDialog = function(opt_class, opt_useIframeMask,
    opt_domHelper) {
  rflect.ui.DialogMouseMissBehavior.call(this, undefined, undefined, undefined);

  this.setModal(false);
  this.setBackgroundElementOpacity(0);
  this.setButtonSet(rflect.cal.ui.EditDialog.createButtonSet());
  this.setContent(rflect.cal.ui.EditDialog.HTML_PARTS_);
};
goog.inherits(rflect.cal.ui.EditDialog, rflect.ui.DialogMouseMissBehavior);


/**
 * @desc Standard caption for the dialog 'Edit' button.
 * @private
 */
rflect.cal.ui.EditDialog.MSG_DIALOG_EDIT_ = goog.getMsg('Edit');


/**
 * @desc Standard caption for the dialog 'Edit' button.
 * @private
 */
rflect.cal.ui.EditDialog.MSG_DIALOG_DELETE_ = goog.getMsg('Delete');


/**
 * Captions for the edit dialog.
 * @enum {string}
 */
rflect.cal.ui.EditDialog.ButtonCaptions = {
  EDIT: rflect.cal.ui.EditDialog.MSG_DIALOG_EDIT_,
  DELETE: rflect.cal.ui.EditDialog.MSG_DIALOG_DELETE_
};


/**
 * Creates a new ButtonSet with 'SAVE' (default) and 'Cancel' buttons.
 * @return {!rflect.ui.Dialog.ButtonSet} The created ButtonSet.
 */
rflect.cal.ui.EditDialog.createButtonSet = function() {
  var edit = rflect.ui.Dialog.ButtonSet.getButton(
      rflect.cal.ui.EditDialog.ButtonCaptions.EDIT);
  var del = rflect.ui.Dialog.ButtonSet.getButton(
      rflect.cal.ui.EditDialog.ButtonCaptions.DELETE);
  var cancel = rflect.ui.Dialog.ButtonSet.getButton(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL);


  return new rflect.ui.Dialog.ButtonSet()
      .addButton(edit, true, false, true)
      .addButton(del, false, true)
      .addButton(cancel, false, true);
};


/**
 * Event time container.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EditDialog.prototype.eventTimeCont_;


/**
 * Event name link.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EditDialog.prototype.eventNameLink_;


/**
 * Content for dialog.
 * @type {string}
 * @const
 * @private
 */
rflect.cal.ui.EditDialog.HTML_PARTS_ = [
  '<div id="ed-event-time" class="event-pane-cont event-time">',
  '</div>',
  '<button id="ed-event-edit" class="event-pane-cont event-edit-link edit-dialog-link goog-inline-block">',
  '</button>'
].join('');


/**
 * @override
 */
rflect.cal.ui.EditDialog.prototype.enterDocument = function () {
  this.eventNameLink_ = this.getDomHelper().getElement('ed-event-edit');
  this.eventTimeCont_ = this.getDomHelper().getElement('ed-event-time');

  rflect.cal.ui.EditDialog.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.eventNameLink_, goog.events.EventType.CLICK,
      this.onEditClick_, false, this)
      .listen(document, goog.events.EventType.KEYDOWN,
      this.onDeleteKey_, false, this);
}


/**
 * @param {string} aEventName Event name for link.
 */
rflect.cal.ui.EditDialog.prototype.setEventName = function(aEventName) {
  this.eventNameLink_.innerHTML = aEventName ||
      rflect.cal.i18n.Symbols.NO_NAME_EVENT;
}


/**
 * @param {string} aEventTimeString Event string representation.
 */
rflect.cal.ui.EditDialog.prototype.setEventTimeString =
    function(aEventTimeString) {
  this.eventTimeCont_.innerHTML = aEventTimeString;
}


/**
 * Edit link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EditDialog.prototype.onEditClick_ = function (aEvent) {
  var close = this.dispatchEvent({type:
      rflect.cal.ui.SaveDialog.EVENT_EDIT});
  if (close)
    this.setVisible(false);
}


/**
 * Keydown listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EditDialog.prototype.onDeleteKey_ = function (aEvent) {
  if (this.isVisible() && aEvent.keyCode == goog.events.KeyCodes.DELETE) {
    // Dispatch click on delete button.
    this.getButtonSet().getButton(1)
        .dispatchEvent({type: goog.ui.Component.EventType.ACTION});
  }
}


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.EditDialog.prototype.disposeInternal = function () {

  this.eventTimeCont_ = null;
  this.eventNameLink_ = null;

  rflect.cal.ui.EditDialog.superClass_.disposeInternal.call(this);
}



