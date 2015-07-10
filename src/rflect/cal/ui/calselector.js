/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Component representing list of items, such as list
 * of calendars or tasks.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.CalSelector');
goog.provide('rflect.cal.ui.CalSelector.EventType');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('rflect.ui.Component');
goog.require('rflect.ui.MouseOverRegistry');
goog.require('rflect.cal.predefined');
goog.require('rflect.string');
goog.require('rflect.cal.ui.soy.calselector');



/**
 * List selector general class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @param {string} aLabel Widget label.
 * @param {boolean} aMyCalendars Whether component lists my calendars.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.CalSelector = function(aViewManager, aContainerSizeMonitor,
    aEventManager, aNavigator, aLabel, aMyCalendars) {
  rflect.ui.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  // Sizes.
  /**
   * Size of list selector scrollable, the only part that could vary in size.
   * @type {goog.math.Size}
   */
  this.scrollableSize_ = null;

  /**
   * Mouse over registry for whole component.
   * @type {rflect.ui.MouseOverRegistry}
   * @private
   */
  this.moRegistryForWhole_ = new rflect.ui.MouseOverRegistry();

  /**
   * Mouse over registry for parts of component.
   * @type {rflect.ui.MouseOverRegistry}
   * @private
   */
  this.moRegistryForParts_ = new rflect.ui.MouseOverRegistry();

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  this.label = aLabel || '';

  this.isMyCalendars = aMyCalendars;

};
goog.inherits(rflect.cal.ui.CalSelector, rflect.ui.Component);


/**
 * Calendar selector event names.
 * @enum {string}
 */
rflect.cal.ui.CalSelector.EventType = {
  CALENDAR_SWITCH: 'calswitch'
}


/**
 * Event that is fired on calendar switch.
 * @param {boolean} aVisible Whether to show calendar.
 * @param {string} aCalendarId Calendar id.
 * @constructor
 * @extends {goog.events.Event}
 */
rflect.cal.ui.CalSelector.CalendarSwitchEvent = function(aVisible, aCalendarId) {
  goog.events.Event.call(this,
      rflect.cal.ui.CalSelector.EventType.CALENDAR_SWITCH);

  /**
   * Whether to show calendar.
   * @type {boolean}
   */
  this.visible = aVisible;

  /**
   * Calendar id.
   * @type {string}
   */
  this.calendarId = aCalendarId;
}
goog.inherits(rflect.cal.ui.CalSelector.CalendarSwitchEvent, goog.events.Event);


/**
 * Header element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.CalSelector.prototype.header_;


/**
 * Label shown in header.
 * @type {string}
 * @protected
 */
rflect.cal.ui.CalSelector.prototype.label;


/**
 * Scrollable element.
 * @type {Element}
 * @protected
 */
rflect.cal.ui.CalSelector.prototype.scrollableEl;


/**
 * Regexp for detection of item.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.CalSelector.prototype.itemRe_;


/**
 * Regexp for detection of header.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.CalSelector.prototype.headerRe_;


/**
 * Regexp for detection of options button.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.CalSelector.prototype.buttonRe_;


/**
 * Whether full redraw is needed when calling updateByRedraw.
 * @see {rflect.cal.ui.CalSelector#updateByRedraw}
 * @type {boolean}
 */
rflect.cal.ui.CalSelector.prototype.redrawIsNeeded = false;


/**
 * Whether component lists my calendars.
 * @type {boolean}
 */
rflect.cal.ui.CalSelector.prototype.isMyCalendars = false;


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @override
 * @see {rflect.cal.ui.MainPaneBuilder#buildBodyWeek}
 * @return {string}
 */
rflect.cal.ui.CalSelector.prototype.buildHTML = function(opt_outerHTML) {
  if (!this.isMyCalendars && !this.eventManager_.hasNonOwnerCalendars()) {
    //Do not draw empty 'other calendars'.
    return '';
  } else {
    return rflect.cal.ui.soy.calselector.calSelector({
      includeOuterHTML: opt_outerHTML,
      isSmallScreen: this.navigator_.isSmallScreen(),
      label: this.label,
      height: this.scrollableSize_.height,
      calSelectorItemsHTML: this.buildContent()
    })
  }
};


/**
 * Builds list selector's label.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'<div id="calendars-selector" class="' + goog.getCssName('list-selector') + '">',
 * '<div id="calendars-label-cont" class="' + goog.getCssName('list-label-cont') + '">' +
 *     '<div id="calendars-label" class="' + goog.getCssName('list-label') + '">',
 *  List selector label (calendars). 
 *
 */
rflect.cal.ui.CalSelector.prototype.buildLabel_ = function(aSb) {
  aSb.append(this.label);
};


/**
 * @return {Element} List selector's header element.
 */
rflect.cal.ui.CalSelector.prototype.getHeader = function() {
  return this.header_ ||
      (this.header_ = this.dom_.getFirstElementChild(this.getElement()));
};


/**
 * Builds list selector's options controls.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @protected
 *
 * '</div>',
 *  List selector menu signs (<div class="listitem-opt"></div>)
 *
 */
rflect.cal.ui.CalSelector.prototype.buildOptions = function (aSb) {
  aSb.append('');
};


/**
 * Builds list body class indicating whether scrollbars should appear.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 * '<div id="calendars-body" class="list-body ',
 *  Class indicating whether list body is overflown (list-body-overflown). 
 *
 */
rflect.cal.ui.CalSelector.prototype.buildListBodyClass_ = function(aSb) {
  aSb.append(goog.getCssName('list-body-overflown'));
}


/**
 * Builds list selector scrollable's height.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'" style="height:',
 *  Height of list selector's body in pixels (150). 
 *
 */
rflect.cal.ui.CalSelector.prototype.buildScrollableHeight_ = function(aSb) {
  if (this.navigator_.isSmallScreen())
    aSb.append('');
  else
    aSb.append(this.scrollableSize_.height);
}


/**
 * Builds list selector content.
 * @protected
 * @return {string}
 */
rflect.cal.ui.CalSelector.prototype.buildContent = function() {
  var str = '';
  this.eventManager_.forEachCalendar(function(calendar, calendarId) {
    if (calendar.own == this.isMyCalendars){
      str += rflect.cal.ui.soy.calselector.calSelectorItem({
        calendarId: calendarId,
        calendarName: calendar.getUIName()
      });
    }
  }, this);
  return str;
};


/**
 * Updates list selector with new data before redraw. Includes size adjustment.
 * @param {boolean=} opt_deep Whether to update children.
 */
rflect.cal.ui.CalSelector.prototype.updateBeforeRedraw = function(opt_deep) {
  if (!this.navigator_.isSmallScreen()) {

    // Whether we building left pane fist time as a hollow elements. We do so to
    // measure their sizes.
    var firstBuildLeftPane = this.getParent().getParent().firstBuildLeftPane;

    // Take current viewport size.
    this.scrollableSize_ = this.containerSizeMonitor_.getSize();

    if (firstBuildLeftPane){
      this.scrollableSize_.height = 0;
    } else {
      var staticSizes = this.getParent().getParent().staticSizesLeftPane;
      this.scrollableSize_.height -= staticSizes.height;
    }

    // Default behaviour is to have two selectors in a column, so divide height
    // by 2.
    if (this.eventManager_.hasNonOwnerCalendars()) {
      this.scrollableSize_.height /= 2;
    } else if (!this.isMyCalendars) {
      this.scrollableSize_.height = 0;
    } // Else leave scroll size as is.

  }
};


/**
 * Redraws list selector. This default version changes scrollable size.
 * @override
 */
rflect.cal.ui.CalSelector.prototype.updateByRedraw = function() {
  var isSmallScreen = this.navigator_.isSmallScreen();

  if (this.redrawIsNeeded) {
    this.redrawIsNeeded = false;

    // Dereference scrollable element.
    this.scrollableEl = null;

    this.disposeCheckboxes();
    this.getElement().innerHTML = this.build();
    this.enterDocumentForCheckboxes();

    // Save reference to scrollable element.
    if (!isSmallScreen)
      this.scrollableEl = goog.dom.getChildren(this.getElement())[1];

  }

  if (!isSmallScreen && this.scrollableEl) {
    this.scrollableEl.style.height = this.scrollableSize_.height + 'px';
  }
};


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
 * Decorates an existing html div element as a list selector.
 * @override
 */
rflect.cal.ui.CalSelector.prototype.decorateInternal = function(aElement,
    opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.ui.CalSelector.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * @inheritDoc
 */
rflect.cal.ui.CalSelector.prototype.enterDocument = function() {
  rflect.cal.ui.CalSelector.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this).listen(this,
      goog.ui.Component.EventType.CHANGE, this.onCheck_, false, this)

  // Save reference to scrollable element.
  this.scrollableEl = goog.dom.getChildren(this.getElement())[1];

  this.enterDocumentForCheckboxes();

};


/**
 * Makes checkboxes active.
 */
rflect.cal.ui.CalSelector.prototype.enterDocumentForCheckboxes = function () {
  var nodes = this.getElement().querySelectorAll('.' +
      goog.getCssName('goog-checkbox'));
  goog.array.forEach(nodes, function(node, index) {

    var cb = new rflect.ui.Checkbox();
    cb.setHandleMouseEvents(!rflect.TOUCH_INTERFACE_ENABLED);
    cb.setHandleTouchEvents(rflect.TOUCH_INTERFACE_ENABLED);

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
 * List selector mouseout handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalSelector.prototype.onMouseOut_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  if (!aEvent.relatedTarget ||
      !this.dom_.contains(this.getElement(), aEvent.relatedTarget))
    this.showOptions(false);
  if (!this.isItem(className) || !this.isHeader(className) ||
      !this.isButton(className))
    this.moRegistryForParts_.deregisterTarget();
}


/**
 * List selector mouseover handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalSelector.prototype.onMouseOver_ = function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);
  var id = target.id;
  var className = target.className;

  // Highlight of whole element.
  this.showOptions(true);
  // Highlight of element's parts.
  if (this.isHeader(className))
    this.moRegistryForParts_.registerTarget(this.getHeader(),
      goog.getCssName('list-label-cont-highlighted'));
  else if (this.isButton(className))
    this.moRegistryForParts_.registerTarget(target,
        goog.getCssName('list-selector-options-button-highlighted'));
  else if (this.isItem(className))
    this.moRegistryForParts_.registerTarget(
        rflect.cal.ui.CalSelector.getItem(target),
        goog.getCssName('list-selector-item-highlighted'));
}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.CalSelector.prototype.onCheck_ = function(aEvent) {
  var cb = /**@type {rflect.ui.Checkbox}*/ (aEvent.target);
  var id = rflect.string.getIdWithoutPrefix(cb.getElement().id,
      rflect.cal.predefined.CALENDAR_COLOR_CHECKBOX_PREFIX);

  this.dispatchEvent(new rflect.cal.ui.CalSelector.CalendarSwitchEvent(
      cb.isChecked(), id));
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
 * Searches for closest target ancestor that is item.
 * @param {Element} aTarget Target to start search for item.
 * @return {Element} Item element or null.
 * @protected
 */
rflect.cal.ui.CalSelector.getItem = function(aTarget) {
  return /**@type {Element}*/ (goog.dom.getAncestor(aTarget, function(aNode) {
    return aNode.className == goog.getCssName('listitem-cont-outer');
  }, true, 2));
}


/**
 * Highlights list selector header, where label is situated, shows additional
 * option elements. Should be overridden.
 * @param {boolean} aShow Whether options are shown.
 * @protected
 */
rflect.cal.ui.CalSelector.prototype.showOptions = function(aShow) {
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of item.
 * @return {boolean} Whether class name indicates that this is an item.
 * @protected
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
 */
rflect.cal.ui.CalSelector.prototype.isButton = function (aClassName) {
  return false;
};


/**
 * Disposes of the list selector.
 * @override
 * @protected
 */
rflect.cal.ui.CalSelector.prototype.disposeInternal = function() {
  rflect.cal.ui.CalSelector.superClass_.disposeInternal.call(this);

  // Dereference scrollable element.
  this.scrollableEl = null;
  this.viewManager_ = null;
  this.containerSizeMonitor_ = null;
};
