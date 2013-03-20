/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog for editing event.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EditDialog');

goog.require('rflect.ui.Dialog');
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
 * @extends {rflect.ui.Dialog}
 */
rflect.cal.ui.EditDialog = function(opt_class, opt_useIframeMask,
    opt_domHelper) {
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
rflect.cal.ui.EditDialog.HTML_PARTS_ =
    '<div id="ed-event-time" class="event-time">' +
        '</div>' +
        '<a id="ed-event-edit" class="event-edit-link goog-inline-block" ' +
        'href="javascript:void(0)">' +
        '</a>';


/**
 * @override
 */
rflect.cal.ui.EditDialog.prototype.enterDocument = function () {
  this.eventNameLink_ = this.getDomHelper().getElement('ed-event-edit');
  this.eventTimeCont_ = this.getDomHelper().getElement('ed-event-time');

  rflect.cal.ui.EditDialog.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.eventNameLink_, goog.events.EventType.CLICK,
      this.onEditClick_, false, this);
}


/**
 * @param {string} aEventName Event name for link.
 */
rflect.cal.ui.EditDialog.prototype.setEventName = function(aEventName) {
  this.eventNameLink_.innerHTML = aEventName;
}


/**
 * @param {rflect.date.DateShim} aStartDate Event start date.
 * @param {rflect.date.DateShim} aEndDate Event end date.
 */
rflect.cal.ui.EditDialog.prototype.setEventTime = function (aStartDate,
    aEndDate) {
  this.eventTimeCont_.innerHTML = aStartDate + ' - ' + aEndDate;
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
 * Dispose method.
 * @override
 */
rflect.cal.ui.EditDialog.prototype.dispose = function () {
  rflect.cal.ui.EditDialog.superClass_.dispose.call(this);

  this.eventTimeCont_ = null;
  this.eventNameLink_ = null;
}
