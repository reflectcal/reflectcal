/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Component representing list of items, such as list
 * of calendars or tasks.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ListSelector');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('rflect.cal.Component');
goog.require('rflect.cal.MouseOverRegistry');
goog.require('rflect.cal.predefined');
goog.require('rflect.string');



/**
 * List selector general class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @extends {rflect.cal.Component}
 */
rflect.cal.ListSelector = function(aViewManager, aContainerSizeMonitor) {
  rflect.cal.Component.call(this);

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
   * Mouse over registry for whole selector.
   * @type {rflect.cal.MouseOverRegistry}
   * @private
   */
   this.moRegistryWhole_ = new rflect.cal.MouseOverRegistry();

   /**
   * Mouse over registry for parts of selector.
   * @type {rflect.cal.MouseOverRegistry}
   * @private
   */
   this.moRegistryParts_ = new rflect.cal.MouseOverRegistry();

};
goog.inherits(rflect.cal.ListSelector, rflect.cal.Component);


/**
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ListSelector.HTML_PARTS_ = [
  '<div id="calendars-selector" class="' + goog.getCssName('list-selector') + '">',
  '<div id="calendars-label-cont" class="' + goog.getCssName('list-label-cont') + '">' +
      '<div id="calendars-label" class="' + goog.getCssName('list-label') + '">',
  /* List selector label (calendars). */
  '</div>',
  /* List selector menu signs (<div class="listitem-opt"></div>)*/
  '</div>',
  '<div id="calendars-body" class="list-body" style="height:',
  /* Height of list selector's body in pixels (150). */
  'px">',
  /* Content. */
  '</div>',
  '</div>'
];


/**
 * Label shown on top of selector.
 * @type {string}
 * @private
 */
rflect.cal.ListSelector.prototype.label_;


/**
 * Regexp for detection of week grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.ListSelector.prototype.weekGridRe_;


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @protected
 * @see {rflect.cal.MainPaneBuilder#buildBodyInternalWeek_}
 */
rflect.cal.ListSelector.prototype.buildBodyInternal = function(aSb) {
  var offset = 0;
  var length = rflect.cal.ListSelector.HTML_PARTS_.length;
  while (++offset < length - 1) {
    aSb.append(rflect.cal.ListSelector.HTML_PARTS_[offset]);
    switch (offset) {
      case 1: {
        this.buildLabel_(aSb);
      };break;
      case 2: {
        this.buildOptions_(aSb);
      };break;
      case 4: {
        this.buildScrollableHeight_(aSb);
      };break;
      case 5: {
        this.buildContent_(aSb, offset);
      };break;
      default: break;
    }
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
rflect.cal.MiniCalBuilder.prototype.buildLabel_ = function(aSb) {
  aSb.append(this.label_);
};


/**
 * Builds list selector's options controls. Should be overridden.
 * @private
 *
 * '</div>',
 *  List selector menu signs (<div class="listitem-opt"></div>)
 *
 */
rflect.cal.MiniCalBuilder.prototype.buildOptions_ = goog.abstractMethod;


/**
 * Builds list selector scrollable's height.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'<div id="calendars-body" class="list-body" style="height:',
 *  Height of list selector's body in pixels (150). 
 *
 */
rflect.cal.MiniCalBuilder.prototype.buildScrollableHeight_ = function(aSb) {
  aSb.append(this.scrollableSize_.height);
}


/**
 * Builds list selector content.
 * @private
 *
 * 'px">',
 *  Content. 
 *
 */
rflect.cal.MiniCalBuilder.prototype.buildContent_ = goog.abstractMethod;


/**
 * Updates list selector with new data before redraw. Includes size adjustment.
 */
rflect.cal.ListSelector.prototype.updateBeforeRedraw = function() {
  // Take current viewport size.
  this.scrollableSize_ = this.containerSizeMonitor_.getSize();

  // Check if app is in size bounds.
  if (this.scrollableSize_.height < rflect.cal.predefined.APP_MINIMAL_HEIGHT)
    this.scrollableSize_.height = rflect.cal.predefined.APP_MINIMAL_HEIGHT;

  this.scrollableSize_.height -= rflect.cal.predefined.TOP_PANE_HEIGHT;
  this.scrollableSize_.height -= rflect.cal.predefined.MINICAL_HEIGHT;

  // Default behaviour is to have two selectors in a column, so divide height
  // by 2.
  this.scrollableSize_.height /= 2;
};


/**
 * Redraws list selector with new data.
 */
rflect.cal.ListSelector.prototype.updateByRedraw = function() {
  this.getElement().innerHTML = this.buildBody();
};


/**
 * Decorates an existing html div element as a Main Pane.
 * @override
 */
rflect.cal.ListSelector.prototype.decorateInternal = function(aElement,
    opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.ListSelector.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * @inheritDoc
 */
rflect.cal.ListSelector.prototype.enterDocument = function() {
  rflect.cal.ListSelector.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      goog.nullFunction, false, this);
};


/**
 * List selector click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ListSelector.prototype.onClick_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  var zippyClicked = false;
  var index = 0;
  if (this.viewManager_.isInMonthMode()) {
    // We clicked on zippy.
    if (/mn\-zippy\-row\d{1}/.test(id)) {
      index = /\d{1}/.exec(id)[0];
      this.blockManager_.blockPoolMonth.toggleBlock(index);

      // If all blocks are collapsed, reset scrollTop.
      if (!this.blockManager_.blockPoolMonth.expanded)
        this.blockManager_.blockPoolMonth.scrollTop = 0;

      zippyClicked = true;
    } else if (this.isDaynumLabel_(className))
      this.onDaynumLabelClick_(id);
    else if (this.isWeeknumLabel_(className))
      this.onWeeknumLabelClick_(target.parentNode.id);

  } else if (this.viewManager_.isInWeekMode()) {
    // We clicked on week zippy.
    if (/wk\-zippy\-col\d{1}/.test(id)) {
      index = /\d{1}/.exec(id)[0];
      this.blockManager_.blockPoolWeek.toggleBlock(index);

      // If all blocks are collapsed, reset scrollLeft.
      if (!this.blockManager_.blockPoolWeek.expanded) {
        this.blockManager_.blockPoolWeek.scrollLeft = 0;
      }

      zippyClicked = true;
    } else if (/daynames\-zippy/.test(id)) {
      // We clicked on allday zippy.
      this.blockManager_.blockPoolAllday.toggleBlock(0);

      zippyClicked = true;
    } else if (this.isDaynumLabel_(className))
      this.onDaynumLabelClick_(target.parentNode.id);
  }

  if (zippyClicked) {
    this.updateBeforeRedraw();
    this.updateByRedraw();
  }
};


/**
 * List selector mouseout handler.
 */
rflect.cal.ListSelector.prototype.onMouseOut_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  if (!this.dom_.contains(this.getElement(), aEvent.relatedTarget))
    this.moRegistryWhole_.deregisterTarget();
    this.moRegistryParts_.deregisterTarget();
  }
}


/**
 * Highlights item, this can be done on hover and encapsulate different logic -
 * add hover class or shows additional option elements. Should be overridden.
 * @protected
 */
rflect.cal.ListSelector.prototype.highlightItem = goog.abstractMethod;


/**
 * Highlights list selector header, where label is situated, shows additional
 * option elements. Should be overridden.
 * @protected
 */
rflect.cal.ListSelector.prototype.highlightItem = goog.abstractMethod;


/**
 * List selector mouseover handler.
 */
rflect.cal.ListSelector.prototype.onMouseOver_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  // Highlight of whole element.
  this.moRegistryWhole_.registerTarget(this.dom_.getFirstElementChild(
      this.getElement()),
      goog.getCssName('list-label-cont-highlighted'));
  // Highlight of element's parts.
  if (this.isHeader(className))
    this.highlightHeader();
  else if (this.isItem(className))
    this.highlightItem();
}


/**
 * Tests whether class name indicates of list item. Should be overridden.
 * @protected
 */
rflect.cal.ListSelector.prototype.isItem = goog.abstractMethod;


/**
 * Tests whether class name indicates of header. Should be overridden.
 * @protected
 */
rflect.cal.ListSelector.prototype.isHeader = goog.abstractMethod;


/**
 * List selector mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ListSelector.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  var preventDefaultIsNeeded = false;

  // Whether we clicked on hollow space.
  if (this.isItem(className)) {
    this.selectionMask_.init(
        rflect.cal.MainPaneSelectionMask.Configuration.WEEK,
        aEvent);
    preventDefaultIsNeeded = true;
  } else if (this.isAlldayGrid_(className)) {
    this.selectionMask_.init(
        rflect.cal.MainPaneSelectionMask.Configuration.ALLDAY,
        aEvent);
    preventDefaultIsNeeded = true;
  } else if (this.isMonthGrid_(className)) {

    if (!this.isDaynumLabel_(className))
      this.selectionMask_.init(
          rflect.cal.MainPaneSelectionMask.Configuration.MONTH, aEvent);
    preventDefaultIsNeeded = true;
  }
  if (preventDefaultIsNeeded)
    aEvent.preventDefault();

};


/**
 * List selector selectstart handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ListSelector.prototype.onSelectStart_ = function(aEvent) {
  var className = aEvent.target.className;

  // Whether we clicked on grid space.
  if (this.isItem(className) || this.isAlldayGrid_(className) ||
      this.isMonthGrid_(className))
    aEvent.preventDefault();
};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.ListSelector.prototype.disposeInternal = function() {
  rflect.cal.ListSelector.superClass_.disposeInternal.call(this);

  this.viewManager_ = null;
  this.containerSizeMonitor_ = null;
};
