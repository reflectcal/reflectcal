/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendars list component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.CalSelector');
goog.provide('rflect.cal.ui.CalSelector.EventType');

goog.require('goog.dom.classes');
goog.require('goog.ui.Component.EventType');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.ListSelector');
goog.require('rflect.string');
goog.require('rflect.ui.Checkbox');


/**
 * Calendars selector general class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 * @extends {rflect.cal.ui.ListSelector}
 */
rflect.cal.ui.CalSelector = function (aViewManager, aContainerSizeMonitor,
    aEventManager) {
  rflect.cal.ui.ListSelector.call(this, aViewManager, aContainerSizeMonitor);

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  this.label = rflect.cal.i18n.Symbols.CALENDARS_LABEL;
};
goog.inherits(rflect.cal.ui.CalSelector, rflect.cal.ui.ListSelector);


/**
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ui.CalSelector.HTML_PARTS_ = [
  '<div class="' + goog.getCssName('listitem-cont-outer') + '"><div title="',
  '" class="' + goog.getCssName('listitem-cont') + ' ' + goog.getCssName('calitem-label-active') + '" id="calitem-label-item',
  '"><div class="' + goog.getCssName('goog-checkbox') + ' ' + goog.getCssName('calitem-color-cont') + ' ',
  '" id="calitem-color-item',
  '"><div style="display:none"></div></div><div class="' + goog.getCssName('listitem-label') + '">',
  /*Name here*/
  '</div></div><div class="' + goog.getCssName('listitem-opt-cont') + '" id="calitem-opt-item',
  '"></div></div>'
];


/**
 * Calendar selector event names.
 * @enum {string}
 */
rflect.cal.ui.CalSelector.EventType = {
  CALENDAR_SWITCH: 'calswitch'
}


/**
 * @inheritDoc
 */
rflect.cal.ui.CalSelector.prototype.enterDocument = function () {
  rflect.cal.ui.CalSelector.superClass_.enterDocument.call(this);

  this.enterDocumentForCheckboxes();

  this.getHandler().listen(this, goog.ui.Component.EventType.CHANGE,
      this.onCheck_, false, this)
};


/**
 * Makes checkboxes active.
 */
rflect.cal.ui.CalSelector.prototype.enterDocumentForCheckboxes = function () {
  var nodes = this.getElement().querySelectorAll('.' +
      goog.getCssName('goog-checkbox'));
  goog.array.forEach(nodes, function(node, index) {

    var cb = new rflect.ui.Checkbox();
    this.addChild(cb);
    cb.decorate(node);
    cb.setLabel(node.parentNode);

    var id = rflect.string.getIdWithoutPrefix(cb.getElement().id,
        rflect.cal.predefined.CALENDAR_COLOR_CHECKBOX_PREFIX);
    if (this.eventManager_.calendars[id].visible)
      cb.setChecked(true);

    this.getHandler().listen(cb.getKeyEventTarget(),
        goog.events.EventType.FOCUS, this.onFocus_, false, this)
        .listen(cb.getKeyEventTarget(), goog.events.EventType.BLUR,
        this.onBlur_, false, this);

  }, this);
}


/**
 * Disposes of checkboxes.
 */
rflect.cal.ui.CalSelector.prototype.disposeCheckboxes = function () {
  this.forEachChild(function(checkbox) {
    checkbox.dispose();
  });

  this.removeChildren();
}


/**
 * Redraws list selector. This default version changes scrollable size.
 * @override
 */
rflect.cal.ui.CalSelector.prototype.updateByRedraw = function() {
  if (this.redrawIsNeeded) {
    this.redrawIsNeeded = false;

    // Dereference scrollable element.
    this.scrollableEl = null;

    this.disposeCheckboxes();
    this.getElement().innerHTML = this.build();
    this.enterDocumentForCheckboxes();

    // Save reference to scrollable element.
    this.scrollableEl = goog.dom.getChildren(this.getElement())[1];

  }
  this.scrollableEl.style.height = this.scrollableSize_.height + 'px';
};


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.CalSelector.prototype.onCheck_ = function(aEvent) {

  var cb = /**@type {rflect.ui.Checkbox}*/ (aEvent.target);
  var id = rflect.string.getIdWithoutPrefix(cb.getElement().id,
      rflect.cal.predefined.CALENDAR_COLOR_CHECKBOX_PREFIX);

  this.dispatchEvent({
    type: rflect.cal.ui.CalSelector.EventType.CALENDAR_SWITCH,
    visible: cb.isChecked(),
    calendarId: id
  })

}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.CalSelector.prototype.onFocus_ = function(aEvent) {
  var cbEl = /**@type {Element}*/ (aEvent.target);
  goog.dom.classes.add(cbEl.parentNode,
      goog.getCssName('listitem-cont-focused'));

}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.CalSelector.prototype.onBlur_ = function(aEvent) {

  var cbEl = /**@type {Element}*/ (aEvent.target);
  goog.dom.classes.remove(cbEl.parentNode,
      goog.getCssName('listitem-cont-focused'));

}


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of item.
 * @return {boolean} Whether class name indicates that this is an item.
 * @protected
 * @override
 */
rflect.cal.ui.CalSelector.prototype.isItem = function (aClassName) {
  var re = rflect.string.buildClassNameRe(
    goog.getCssName('listitem-cont'),
    goog.getCssName('listitem-label'),
    goog.getCssName('goog-checkbox'),
    goog.getCssName('listitem-opt-cont'));
  return re.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of header.
 * @return {boolean} Whether class name indicates that this is a header.
 * @protected
 * @override
 */
rflect.cal.ui.CalSelector.prototype.isHeader = function(aClassName) {
  var re = rflect.string.buildClassNameRe(
    goog.getCssName('list-label-cont'),
    goog.getCssName('list-label'));
  return re.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of options button.
 * @return {boolean} Whether class name indicates that this is an options
 * button.
 * @protected
 * @override
 */
rflect.cal.ui.CalSelector.prototype.isButton = function (aClassName) {
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
rflect.cal.ui.CalSelector.prototype.buildOptions = function (aSb) {
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
rflect.cal.ui.CalSelector.prototype.buildContent = function (aSb) {
  this.eventManager_.forEachCalendar(function(calendar, calendarId) {

    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[0]);
    aSb.append(calendar.getUIName());
    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[1]);
    aSb.append(calendarId);
    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[2]);
    aSb.append(calendar.colorCode && calendar.colorCode.checkboxClass);
    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[3]);
    aSb.append(calendarId);
    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[4]);
    aSb.append(calendar.getUIName());
    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[5]);
    aSb.append(calendarId);
    aSb.append(rflect.cal.ui.CalSelector.HTML_PARTS_[6]);

  }, this);
};
