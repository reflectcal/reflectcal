/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Datepicker component that serves for one or more date inputs.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.InputDatePicker');

goog.require('goog.events.KeyCodes');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.string');
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
rflect.cal.ui.InputDatePicker = function (aViewManager, aParseFormat) {
  rflect.cal.ui.DatePicker.call(this, aViewManager);


  this.parser_ = new goog.i18n.DateTimeParse(aParseFormat);
  this.formatter_ = new goog.i18n.DateTimeFormat(aParseFormat);
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
 * Whether mouse down was registered on date picker.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.mouseDownOnPicker_ = false;


/**
 * @inheritDoc
 */
rflect.cal.ui.InputDatePicker.prototype.enterDocument = function () {
  rflect.cal.ui.InputDatePicker.superClass_.enterDocument.call(this);
  this.getHandler().listen(this, rflect.cal.ui.DatePicker.EVENT_DATE_CHANGE,
      this.onDateChanged_, false, this);
};


/**
 * Date picker mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.onMouseDown_ = function (aEvent) {
  // Very important! Does not allow input to lose focus, and, therefore, close
  // picker.
  aEvent.preventDefault();
  // But IE8- lets input loose focus even in this case, so we apply hack.
  if (goog.userAgent.IE)
    if (goog.string.compareVersions(goog.userAgent.VERSION, '8') <= 0)
      this.mouseDownOnPicker_ = true;
};


/**
 * Adds one more input to track.
 * @param {Element} aInput Input to add.
 */
rflect.cal.ui.InputDatePicker.prototype.addInput = function (aInput) {
  this.getHandler().listen(aInput, goog.events.EventType.FOCUS,
      this.onInputFocus_, false)
      .listen(aInput, goog.events.EventType.BLUR,
      this.onInputBlur_, false)
      .listen(aInput, goog.events.EventType.KEYDOWN,
      this.onInputKeyDown_, false)
      .listen(aInput, goog.events.EventType.MOUSEDOWN,
      this.onInputMouseDown_, false);
}


/**
 * Removes input.
 * @param {Element} aInput Input to add.
 */
rflect.cal.ui.InputDatePicker.prototype.removeInput = function (aInput) {
  this.getHandler().unlisten(aInput, goog.events.EventType.FOCUS,
      this.onInputFocus_, false);
  this.getHandler().unlisten(aInput, goog.events.EventType.BLUR,
      this.onInputBlur_, false);
  this.getHandler().unlisten(aInput, goog.events.EventType.KEYDOWN,
      this.onInputKeyDown_, false);
  this.getHandler().unlisten(aInput, goog.events.EventType.MOUSEDOWN,
      this.onInputMouseDown_, false);
}


/**
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.onInputFocus_ = function (aEvent) {

  var input = /**@type{Element}*/ (aEvent.target);

  this.showDatePicker_(input);
}


/**
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.onInputMouseDown_ = function (aEvent) {

  var input = /**@type{Element}*/ (aEvent.target);

  if (!this.visible_)
    this.showDatePicker_(input);
}


/**
 * @param {Element} aInput Input that was interacted with.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.showDatePicker_ = function (aInput) {
  this.currentInput_ = aInput;

  var pos = goog.style.getClientPosition(aInput);
  var size = goog.style.getSize(aInput);

  pos.y += size.height;

  this.setVisible(true);
  goog.style.setPosition(this.getElement(), pos.x, pos.y);
}


/**
 * This will close input on blur, but we do not allow input to loose focus when
 * clicking on date picker.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.InputDatePicker.prototype.onInputBlur_ = function (aEvent) {
  var input = /**@type{Element}*/(aEvent.target);
  if (this.currentInput_ == input)
    if (goog.userAgent.IE &&
        goog.string.compareVersions(goog.userAgent.VERSION, '8') <= 0){
        if (this.mouseDownOnPicker_) {
          this.mouseDownOnPicker_ = false;
          this.currentInput_.focus();
        }
        else
          this.setVisible(false);
    } else
      this.setVisible(false);

}


/**
 * Input key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.InputDatePicker.prototype.onInputKeyDown_ = function(aEvent) {
  if (this.visible_ && (aEvent.keyCode == goog.events.KeyCodes.ESC ||
      aEvent.keyCode == goog.events.KeyCodes.ENTER)) {
    this.setVisible(false);
    aEvent.stopPropagation();
  }
}


/**
 * Date change listener.
 * @param {rflect.cal.ui.DatePicker.Event} aEvent Event object.
 */
rflect.cal.ui.InputDatePicker.prototype.onDateChanged_ = function (aEvent) {
  var date = aEvent.date;
  if (this.currentInput_)
    this.currentInput_.value = this.formatter_.format(date);
  this.setVisible(false);
}


/**
 * Creates component on an empty div element.
 * @override
 */
rflect.cal.ui.InputDatePicker.prototype.createDom = function () {
  var cont = this.getDomHelper().createDom('div', 'rflect-input-datepicker');
  this.decorateInternal(cont);
};


/**
 * Sets the visibility. Lazily renders the component if needed.
 * @param {boolean} visible Whether the component should be visible.
 */
rflect.cal.ui.InputDatePicker.prototype.setVisible = function (visible) {

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
rflect.cal.ui.InputDatePicker.prototype.showElement_ = function (visible) {
  goog.style.showElement(this.getElement(), visible);
};


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.InputDatePicker.prototype.disposeInternal = function () {
  rflect.cal.ui.InputDatePicker.superClass_.disposeInternal.call(this);
}
