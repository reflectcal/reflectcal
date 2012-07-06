/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Component representing as a list of selectables, such as list
 * of calendars or tasks.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ListSelector');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');
goog.require('rflect.cal.Component');
goog.require('rflect.cal.MainPaneSelectionMask');
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

  /**
   * Selection mask.
   * @type {rflect.cal.MainPaneSelectionMask}
   * @private
   */
  this.selectionMask_ = new rflect.cal.MainPaneSelectionMask(aViewManager, this,
      aTimeManager, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllday, this.blockManager_.blockPoolMonth);
  if (goog.DEBUG)
    _inspect('selectionMask', this.selectionMask_);


  // Sizes.
  /**
   * Size of list selector.
   * @type {goog.math.Size}
   */
  this.size_ = null;

  /**
   * Mouse over registry.
   * @type {rflect.cal.MouseOverRegistry}
   * @private
   */
   this.moRegistry_ = new rflect.cal.MouseOverRegistry();

};
goog.inherits(rflect.cal.ListSelector, rflect.cal.Component);


/**
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ListSelector.HTML_PARTS_ = [
  '<div id="calendars-selector" class="' + goog.getCssName('list-selector') + '">' +
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
  '</div></div>'
];


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
        this.buildMainClassName_(aSb);
      };break;
      case 2: {
        this.miniCal_.selectionMask.build(aSb);
      };break;
      case 3: {
        this.buildHeader_(aSb);
      };break;
      case 5: {
        this.buildMonthName_(aSb);
      };break;
      case 8: {
        this.buildDayNames_(aSb, offset);
        offset++;
      };break;
      case 11: {
        this.buildMonthGridRows_(aSb, offset);
        offset += 5;
      };break;
      default: break;
    }
  }
};


/**
 * Updates list selector with new data before redraw. Includes size adjustment.
 */
rflect.cal.ListSelector.prototype.updateBeforeRedraw = function() {
  // Take current viewport size.
  var containerSize = this.containerSizeMonitor_.getSize();

  // Check if app is in size bounds.
  if (containerSize.width < rflect.cal.predefined.APP_MINIMAL_WIDTH)
    containerSize.width = rflect.cal.predefined.APP_MINIMAL_WIDTH;
  if (containerSize.height < rflect.cal.predefined.APP_MINIMAL_HEIGHT)
    containerSize.height = rflect.cal.predefined.APP_MINIMAL_HEIGHT;

  // Begin size adjustment phase.
  if (this.viewManager_.isInWeekMode()) {

    this.scrollablesCombinedWkSize_ = containerSize.clone();
    // We calculate combined height of two scrollables.
    this.scrollablesCombinedWkSize_.height -=
        rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_HEIGHT_DIFFERENCE_WEEK;
    this.scrollablesCombinedWkSize_.width -=
        rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_WIDTH_DIFFERENCE_WEEK;
    this.scrollablesCombinedWkSize_.width -=
        this.containerSizeMonitor_.scrollbarWidth;

    this.alldayGridContainerSize = this.scrollablesCombinedWkSize_.clone();

    this.size_ = this.scrollablesCombinedWkSize_.clone();

    // By default, grid has the same size as scrollable but fixed height.
    this.gridSize = this.size_.clone();
    this.gridSize.height = rflect.cal.predefined.WEEK_GRID_HEIGHT;
    // No need to subtract scrollbar width here because layout already takes
    // it into account.

    // Case when allday scrollable is collapsed.
    if (!this.isAlldayScrollableExpandedVer()) {
      this.alldayGridContainerSize.height =
          rflect.cal.predefined.ALLDAY_SCROLLABLE_MINIMAL_HEIGHT;
      this.alldayGridSize = this.alldayGridContainerSize.clone();
    }

    // ... else, in case when allday scrollable is expanded, we should
    // calculate it's size depending on block capacity, so pass on for now.

  } else if (this.viewManager_.isInMonthMode()) {

    this.size_ = containerSize.clone();
    this.size_.height -=
        rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_HEIGHT_DIFFERENCE_MONTH;
    this.size_.width -=
        rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_WIDTH_DIFFERENCE_MONTH;

    // By default, grid has the same size as scrollable.
    this.gridSize = this.size_.clone();
    this.gridSize.width -= this.getScrollbarWidthNextToMain();
  }

  // Update blocks, get their capacity and size.
  this.updateBlockManager();

  // Finish size adjustment phase.
  if (this.viewManager_.isInWeekMode()) {

    // Case when either allday scrollable is expanded.
    if (this.isAlldayScrollableExpandedVer()) {
      var alldayBlockMaxHeight = 0;

      alldayBlockMaxHeight = Math.floor(
          this.scrollablesCombinedWkSize_.height / 2);
      //      alldayBlockMaxHeight -= this.getScrollbarWidthBelowAllday();

      // Allday grid size is kept up to date by block manager.
      if (this.alldayGridSize.height > alldayBlockMaxHeight) {
        this.alldayGridContainerSize.height = alldayBlockMaxHeight;
      } else {
        this.alldayGridContainerSize.height = this.alldayGridSize.height;
      }

    }

    this.size_.height = this.scrollablesCombinedWkSize_.height -
            this.alldayGridContainerSize.height;

    this.alldayGridContainerSize.height +=
        this.getScrollbarWidthBelowAllday();

    // Check if main scrollable size is greater than grid height.
    if (this.size_.height >
        rflect.cal.predefined.WEEK_GRID_HEIGHT)
      this.size_.height =
          rflect.cal.predefined.WEEK_GRID_HEIGHT +
          this.getScrollbarWidthBelowMain();

  }

  this.removeScrollListeners_();
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
      this.onClick_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      this.onMouseDown_, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      this.onSelectStart_, false, this)
      .listen(document, goog.events.EventType.MOUSEMOVE,
      this.onMouseMove_, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp_, false, this);
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
  if (this.isDaynumLabel_(className) || this.isWeeknumLabel_(className) ||
      this.isZippy_(className))
    this.moRegistry_.deregisterTarget();
}


/**
 * List selector mouseover handler.
 */
rflect.cal.ListSelector.prototype.onMouseOver_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  if (this.isDaynumLabel_(className) || this.isWeeknumLabel_(className))
    this.moRegistry_.registerTarget(target,
        goog.getCssName('label-underlined'));
  else if (this.isZippy_(className))
    this.moRegistry_.registerTarget(target,
        goog.getCssName('zippy-highlighted'));
  else
    this.moRegistry_.deregisterTarget();
}


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of week grid.
 * @private
 * @return {boolean} For week mode, whether class name indicates that this is a
 * week grid.
 */
rflect.cal.ListSelector.prototype.isWeekGrid_ = function(aClassName) {
  var weekGridRe_ = this.weekGridRe_ || (this.weekGridRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('wk-events-layer'),
      goog.getCssName('expand-sign-wk-cont'),
      goog.getCssName('expand-sign-wk'),
      goog.getCssName('grid-table-row'),
      // In IE7, we could click on main-pane if we click near upper edge of
      //scrollable
      goog.getCssName('main-pane')));
  return this.viewManager_.isInWeekMode() && weekGridRe_.test(aClassName);
};


/**
 * List selector mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ListSelector.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  var preventDefaultIsNeeded = false;

  // Whether we clicked on hollow space.
  if (this.isWeekGrid_(className)) {
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
  if (this.isWeekGrid_(className) || this.isAlldayGrid_(className) ||
      this.isMonthGrid_(className))
    aEvent.preventDefault();
};


/**
 * List selector mousemove handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ListSelector.prototype.onMouseMove_ = function(aEvent) {
  if (this.selectionMask_.isInitialized()) {
    this.selectionMask_.update(aEvent);
    aEvent.preventDefault();
  }

};


/**
 * List selector mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ListSelector.prototype.onMouseUp_ = function(aEvent) {
  if (this.selectionMask_.isInitialized()){
    this.selectionMask_.close();
    aEvent.preventDefault();
  }
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
