/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Datepicker component that serves for one or more date inputs.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.InputDatePicker');

goog.require('rflect.ui.MouseMissBehavior');
goog.require('rflect.cal.ui.DatePicker');



/**
 * Date picker main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @extends {rflect.cal.ui.DatePicker}
 * @constructor
 */
rflect.cal.ui.InputDatePicker = function(aViewManager) {
  rflect.cal.ui.DatePicker.call(this, aViewManager);


  /**
   * @type {rflect.ui.MouseMissBehavior}
   * @private
   */
  this.mmBehavior_ = new rflect.ui.MouseMissBehavior(this);
  this.mmBehavior_.enable(true);
};
goog.inherits(rflect.cal.ui.InputDatePicker, rflect.cal.ui.DatePicker);


/**
 * @inheritDoc
 */
rflect.cal.ui.InputDatePicker.prototype.enterDocument = function() {
  rflect.cal.ui.InputDatePicker.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this);

  this.mmBehavior_.enterDocument();
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


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.InputDatePicker.prototype.disposeInternal = function () {
  this.mmBehavior_.dispose();
  rflect.cal.ui.InputDatePicker.superClass_.disposeInternal.call(this);
}
