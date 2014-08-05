/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Time picker component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.InputTimePicker');

goog.require('goog.date.DateTime');
goog.require('goog.ui.FlatMenuButtonRenderer');
goog.require('goog.ui.Option');
goog.require('goog.ui.Select');
goog.require('rflect.dom');



/**
 * Time picker main class.
 * @extends {goog.ui.Component}
 * @constructor
 */
rflect.cal.ui.InputTimePicker = function() {
  goog.ui.Component.call(this);

  this.addChild(this.selectHours_ = new goog.ui.Select(null, null,
      goog.ui.FlatMenuButtonRenderer.getInstance()));
  this.addChild(this.selectMinutes_ = new goog.ui.Select(null, null,
      goog.ui.FlatMenuButtonRenderer.getInstance()));

  this.fillTimeSelect_(this.selectHours_, 24);
  this.fillTimeSelect_(this.selectMinutes_, 60);
};
goog.inherits(rflect.cal.ui.InputTimePicker, goog.ui.Component);


/**
 * Select for hours.
 * @type {goog.ui.Select}
 * @private
 */
rflect.cal.ui.InputTimePicker.prototype.selectHours_;


/**
 * Select for minutes.
 * @type {goog.ui.Select}
 * @private
 */
rflect.cal.ui.InputTimePicker.prototype.selectMinutes_;


/**
 * Select for AM/PM.
 * @type {Element}
 * @private
 */
rflect.cal.ui.InputTimePicker.prototype.selectAM_;


/**
 * Select for hours. In case we do not need full component, just element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.InputTimePicker.prototype.selectHoursEl_;


/**
 * Select for minutes. In case we do not need full component, just element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.InputTimePicker.prototype.selectMinutesEl_;


/**
 * @inheritDoc
 */
rflect.cal.ui.InputTimePicker.prototype.createDom =
    function() {
  var body = this.getDomHelper().createDom('div', 'time-picker');
  this.setElementInternal(body);
};


/**
 * Fill one time select with values.
 * @param {goog.ui.Select} aSelect Select to fill.
 * @param {number} aNumber How much entries are in time select.
 * @private
 */
rflect.cal.ui.InputTimePicker.prototype.fillTimeSelect_ =
    function(aSelect, aNumber) {
  for (var counter = 0; counter < aNumber; counter++) {
    var value = counter < 10 ? '0' + aNumber : String(aNumber);
    aSelect.addItem(new goog.ui.Option(value));
  }  
};


/**
 * @return {Element} Select for AM/PM.
 */
rflect.cal.ui.InputTimePicker.prototype.createAMSelect = function () {
  this.selectAM_ = this.getDomHelper().createDom('select');
  this.selectAM_.appendChild(this.getDomHelper().createDom('option', null,
      'AM'));
  this.selectAM_.appendChild(this.getDomHelper().createDom('option', null,
      'PM'));
  return this.selectAM_;
}


/**
 * @return {boolean} Whether some of selects' popups is shown.
 */
rflect.cal.ui.InputTimePicker.prototype.isPopupVisible = function () {
  return this.selectHours_.getMenu().isVisible() || this.selectMinutes_
      .getMenu().isVisible();
}


/**
 * @inheritDoc
 */
rflect.cal.ui.InputTimePicker.prototype.enterDocument = function () {

  this.selectHours_.render(this.getElement());
  this.selectMinutes_.render(this.getElement());
  this.getElement().appendChild(rflect.dom.wrapSelect(this.createAMSelect()));

  rflect.cal.ui.InputTimePicker.superClass_.enterDocument.call(this);

};


/**
 * @param {goog.date.DateTime} aDate Date to set.
 */
rflect.cal.ui.InputTimePicker.prototype.setValue = function (aDate) {
  this.selectHours_.setValue(aDate.getHours());
  this.selectMinutes_.setValue(aDate.getMinutes());
}


/**
 * @return {goog.date.DateTime} Scanned date.
 */
rflect.cal.ui.InputTimePicker.prototype.getValue = function () {
   var date = new goog.date.DateTime();
   date.setHours(/**@type {number}*/(this.selectHours_.getValue()));
   date.setMinutes(/**@type {number}*/(this.selectMinutes_.getValue()));
   return date;
}


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.InputTimePicker.prototype.disposeInternal = function () {
  this.selectAM_ = null;
  this.selectHoursEl_ = null;
  this.selectMinutesEl_ = null;

  rflect.cal.ui.InputTimePicker.superClass_.disposeInternal.call(this);
}
