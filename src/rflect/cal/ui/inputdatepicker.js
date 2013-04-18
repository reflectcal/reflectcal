/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Datepicker component that serves for one or more date inputs.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.InputDatePicker');

goog.require('goog.events.EventType');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.MiniCalBuilder');
goog.require('rflect.cal.MouseOverRegistry');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.string');



/**
 * Date picker main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @extends {rflect.ui.Component}
 * @constructor
 */
rflect.cal.ui.InputDatePicker = function(aViewManager) {
  rflect.cal.ui.DatePicker.call(this, aViewManager);
};
goog.inherits(rflect.cal.ui.InputDatePicker, rflect.cal.ui.DatePicker);


/**
 * @inheritDoc
 */
rflect.cal.ui.InputDatePicker.prototype.enterDocument = function() {
  rflect.cal.ui.InputDatePicker.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      this.onSelectStart_, false, this)
      .listen(document, goog.events.EventType.MOUSEDOWN,
      this.onMouseDown_, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp_, false, this);
};


/**
 * Date picker mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  if (this.isInteractiveArea_(className))
    aEvent.preventDefault();

};


/**
 * Adds one more input to track.
 * @param {Element} aInput Input to add.
 */
rflect.cal.ui.InputDatePicker.prototype.addInput = function(aInput) {

}


/**
 * Removes input.
 * @param {Element} aInput Input to add.
 */
rflect.cal.ui.InputDatePicker.prototype.removeInput = function(aInput) {

}
