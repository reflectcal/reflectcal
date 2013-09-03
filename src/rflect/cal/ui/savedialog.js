/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog for saving event.
 * @author alexeykofficial@gmail.com (Alex K.)
 * TODO(user):
 */

goog.provide('rflect.cal.ui.SaveDialog');

goog.require('goog.dom');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.ui.DialogMouseMissBehavior');
goog.require('rflect.cal.ui.CalendarsSelect');



/**
 * Class for save event dialog.
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @param {rflect.cal.events.EventManager=} opt_eventManager Link to event manager.
 * @constructor
 * @extends {rflect.ui.DialogMouseMissBehavior}
 */
rflect.cal.ui.SaveDialog = function (opt_class,
    opt_useIframeMask, opt_domHelper, opt_eventManager) {
  rflect.ui.DialogMouseMissBehavior.call(this, undefined, undefined, undefined);

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = /**@type {rflect.cal.events.EventManager}*/
      (opt_eventManager);

  this.setTitle('New event');
  this.setModal(false);
  this.setBackgroundElementOpacity(0);
  this.setButtonSet(rflect.ui.Dialog.ButtonSet.createSaveCancel());
  this.setContent(rflect.cal.ui.SaveDialog.HTML_PARTS_);
};
goog.inherits(rflect.cal.ui.SaveDialog, rflect.ui.DialogMouseMissBehavior);


/**
 * Input for event name.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SaveDialog.prototype.input_;


/**
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.SaveDialog.prototype.select_;


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
        'class="event-name-input" spellcheck="false" placeholder="' +
        rflect.cal.i18n.Symbols.NO_NAME_EVENT +
        '"/>' +
        '</div>' +

        '<label for="event-cal" class="event-name-label">Calendar</label>' +
        '<select id="event-cal" class="event-cal-select"></select>' +

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
  var dom = this.getDomHelper();
  var link = dom.getElement('event-edit');
  this.input_ = dom.getElement('event-name');

  var selectEl = dom.getElement('event-cal');

  this.select_ = new rflect.cal.ui.CalendarsSelect(selectEl,
      this.eventManager_);

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
 * @return {string} Selected calendar id.
 */
rflect.cal.ui.SaveDialog.prototype.getCalendarId = function () {
  return this.select_.getCalendarId();
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
 * Edit event.
 * @const {string}
 */
rflect.cal.ui.SaveDialog.EVENT_EDIT = 'editevent';


/**
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.setVisible = function (aVisible) {
  rflect.cal.ui.SaveDialog.superClass_.setVisible.call(this, aVisible);
  // If dialog disappears, input still remains focused in Webkit and Opera,
  // which could produce weird behavior. More specifically, holding Enter
  // produces many events with the same id.
  if (!aVisible)
    this.input_ && this.input_.blur();
  else
    this.select_.update();
}


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.disposeInternal = function () {
  this.input_ = null;
  this.select_ && this.select_.dispose();
  rflect.cal.ui.SaveDialog.superClass_.disposeInternal.call(this);

}