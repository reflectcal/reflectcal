/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Datepicker component that serves for one or more date inputs.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.InputDatePicker');

goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.style');
goog.require('rflect.ui.MouseMissBehavior');
goog.require('rflect.cal.ui.DatePicker');



/**
 * Date picker main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {string} aParseFormat Parse format string.
 * @extends {rflect.cal.ui.DatePicker}
 * @constructor
 */
rflect.cal.ui.InputDatePicker = function(aViewManager, aParseFormat) {
  rflect.cal.ui.DatePicker.call(this, aViewManager);


  /**
   * @type {rflect.ui.MouseMissBehavior}
   * @private
   */
  this.mmBehavior_ = new rflect.ui.MouseMissBehavior(this);
  this.mmBehavior_.enable(true);


  this.parser_ =  new goog.i18n.DateTimeParse(aParseFormat);
  this.formatter_ =  new goog.i18n.DateTimeFormat(aParseFormat);
};
goog.inherits(rflect.cal.ui.InputDatePicker, rflect.cal.ui.DatePicker);


/**
 * Whether the component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.visible_ = false;


/**
 * Input that date picker is currently focused on.
 * @type {Element}
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.currentInput_;


/**
 * Parser that is used to parse input strings.
 * @type {goog.i18n.DateTimeParse}
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.parser_;


/**
 * Formatter.
 * @type {goog.i18n.DateTimeFormat}
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.formatter_;


/**
 * @inheritDoc
 */
rflect.cal.ui.InputDatePicker.prototype.enterDocument = function() {
  rflect.cal.ui.InputDatePicker.superClass_.enterDocument.call(this);
  this.getHandler().listen(this, rflect.cal.ui.DatePicker.EVENT_DATE_CHANGE,
      this.onDateChanged_, false, this);
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
  this.getHandler().listen(aInput, goog.events.EventType.FOCUS,
      this.onInputFocus_, false)
      .listen(aInput, goog.events.EventType.MOUSEDOWN,
      this.onInputMouseDown_, false)
      .listen(aInput, goog.events.EventType.BLUR,
      this.onInputBlur_, false);
}


/**
 * Removes input.
 * @param {Element} aInput Input to add.
 */
rflect.cal.ui.InputDatePicker.prototype.removeInput = function(aInput) {
  this.getHandler().unlisten(aInput, goog.events.EventType.FOCUS,
      this.onInputFocus_, false);
  this.getHandler().unlisten(aInput, goog.events.EventType.MOUSEDOWN,
      this.onInputMouseDown_, false);
  this.getHandler().unlisten(aInput, goog.events.EventType.BLUR,
      this.onInputBlur_, false);
}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.InputDatePicker.prototype.onInputFocus_ = function(aEvent) {

  var input = /**@type{Element}*/ (aEvent.target);
  this.currentInput_ = input;

  var pos = goog.style.getPosition(input);
  var size = goog.style.getSize(input);

  pos.y += size.height;

  this.setVisible(true);
  goog.style.setPosition(this.getElement(), pos.x, pos.y);

}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.InputDatePicker.prototype.onInputBlur_ = function(aEvent) {
  var input = /**@type{Element}*/(aEvent.target);
  if (this.currentInput_ == input) {
    this.setVisible(false);
  }
}


/**
 * Mouse down listener - prevents date picker from being closed by mm
 * behavior.
 */
rflect.cal.ui.InputDatePicker.prototype.onInputMouseDown_ = function() {
  this.mmBehavior_.doNotClose = true;
}


/**
 * Date change listener.
 * @param {rflect.cal.ui.DatePicker.Event} aEvent Event object.
 */
rflect.cal.ui.InputDatePicker.prototype.onDateChanged_ = function(aEvent) {
  var date = aEvent.date;
  if (this.currentInput_)
    this.currentInput_.value = this.formatter_.format(date);
}


/**
 * Creates component on an empty div element.
 * @override
 */
rflect.cal.ui.InputDatePicker.prototype.createDom = function() {
  var cont = this.getDomHelper().createDom('div',
      goog.getCssName('rflect-input-datepicker'));
  this.decorateInternal(cont);
};


/**
 * Sets the visibility. Lazily renders the component if needed.
 * @param {boolean} visible Whether the component should be visible.
 */
rflect.cal.ui.InputDatePicker.prototype.setVisible = function(visible) {
  if (goog.DEBUG)
    _log('setVisible');

  if (visible == this.visible_) {
    return;
  }

  var date = new goog.date.Date();
  if (this.currentInput_)
    var parsed = this.parser_.parse(this.currentInput_.value, date);
  this.setBasis(date);
  this.updateBeforeRedraw();

  // If the component hasn't been rendered yet, render it now.
  if (!this.isInDocument()) {
    this.render();
  } else
    this.updateByRedraw();

  this.showElement_(visible);
  this.visible_ = visible;
};


/**
 * Shows or hides element.
 * @param {boolean} visible Shows the element if true, hides if false.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.showElement_ = function(visible) {
  goog.style.showElement(this.getElement(), visible);
};



/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.InputDatePicker.prototype.disposeInternal = function () {
  this.mmBehavior_.dispose();
  rflect.cal.ui.InputDatePicker.superClass_.disposeInternal.call(this);
}
