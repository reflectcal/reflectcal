/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Tasks list component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TaskSelector');

goog.require('rflect.cal.ListSelector');
goog.require('rflect.cal.i18n.Symbols');



/**
 * Tasks selector general class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @constructor
 * @extends {rflect.cal.ListSelector}
 */
rflect.cal.TaskSelector = function(aViewManager, aContainerSizeMonitor) {
  rflect.cal.ListSelector.call(this, aViewManager, aContainerSizeMonitor);

  this.label_ = rflect.cal.i18n.Symbols.TASKS_LABEL;
};
goog.inherits(rflect.cal.TaskSelector, rflect.cal.ListSelector);


/**
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.TaskSelector.HTML_PARTS_ = [];


/**
 * @inheritDoc
 */
rflect.cal.TaskSelector.prototype.enterDocument = function() {
  rflect.cal.TaskSelector.superClass_.enterDocument.call(this);
  //TODO(alexk): mousedown, click, mousemove, mouseup listeners will go here.
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of item.
 * @return {boolean} Whether class name indicates that this is an item.
 * @protected
 * @override
 */
rflect.cal.TaskSelector.prototype.isItem = function(aClassName) {
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
rflect.cal.TaskSelector.prototype.isHeader = function(aClassName) {
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
rflect.cal.TaskSelector.prototype.isButton = function(aClassName) {
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
rflect.cal.TaskSelector.prototype.buildOptions = function(aSb) {
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
rflect.cal.TaskSelector.prototype.buildContent = function(aSb) {
  aSb.append('');
};


/**
 * @override
 * TODO(alexk): This function will contain logic for appearance of options
 * buttons.
 */
rflect.cal.TaskSelector.prototype.highlightHeader = goog.nullFunction;