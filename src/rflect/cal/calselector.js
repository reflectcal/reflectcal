/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendars list component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.CalSelector');

goog.require('rflect.cal.ListSelector');
goog.require('rflect.cal.i18n.Symbols');



/**
 * Calendars selector general class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @constructor
 * @extends {rflect.cal.ListSelector}
 */
rflect.cal.CalSelector = function(aViewManager, aContainerSizeMonitor) {
  rflect.cal.ListSelector.call(this, aViewManager, aContainerSizeMonitor);

  this.label_ = rflect.cal.i18n.Symbols.CALENDARS_LABEL;
};
goog.inherits(rflect.cal.CalSelector, rflect.cal.ListSelector);


/**
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.CalSelector.HTML_PARTS_ = [];


/**
 * @inheritDoc
 */
rflect.cal.CalSelector.prototype.enterDocument = function() {
  rflect.cal.CalSelector.superClass_.enterDocument.call(this);
  //TODO(alexk): mousedown, click, mousemove, mouseup listeners will go here.
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of item.
 * @return {boolean} Whether class name indicates that this is an item.
 * @protected
 * @override
 */
rflect.cal.CalSelector.prototype.isItem = function(aClassName) {
  /*var itemRe_ = this.itemRe_ || (this.itemRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('')));
  return itemRe_.test(aClassName);*/
  return false;
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of header.
 * @return {boolean} Whether class name indicates that this is a header.
 * @protected
 * @override
 */
rflect.cal.CalSelector.prototype.isHeader = function(aClassName) {
  return false;
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of options button.
 * @return {boolean} Whether class name indicates that this is an options
 * button.
 * @protected
 * @override
 */
rflect.cal.CalSelector.prototype.isButton = function(aClassName) {
  return false;
};


/**
 * Builds list selector's options controls.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @protected
 * @override
 *
 * '</div>',
 *  List selector menu signs (<div class="listitem-opt"></div>)
 *
 */
rflect.cal.CalSelector.prototype.buildOptions = function(aSb) {
  aSb.append('');
};


/**
 * Builds list selector content.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @protected
 * @override
 *
 * 'px">',
 *  Content.
 *
 */
rflect.cal.CalSelector.prototype.buildContent = function(aSb) {
  aSb.append('');
};


/**
 * @override
 * TODO(alexk): This function will contain logic for appearance of options
 * buttons.
 */
rflect.cal.CalSelector.prototype.highlightHeader = goog.nullFunction;