/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Main pane, core component where main information (events)
 * is displayed.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MainPane');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');
goog.require('rflect.cal.Component');
goog.require('rflect.cal.MainPaneBuilder');
goog.require('rflect.cal.SelectionMask');
goog.require('rflect.cal.ViewType');
goog.require('rflect.cal.predefined');
goog.require('rflect.string');



/**
 * Main pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.BlockManager} aBlockManager Link to block manager.
 * @constructor
 * @extends {rflect.cal.Component}
 */
rflect.cal.MainPane = function(aViewManager, aTimeManager,
    aContainerSizeMonitor, aBlockManager) {
  rflect.cal.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Link to block manager.
   * @type {rflect.cal.BlockManager}
   * @private
   */
  this.blockManager_ = aBlockManager;

  /**
   * Main pane builder.
   * @type {rflect.cal.MainPaneBuilder}
   * @private
   */
  this.mainPaneBuilder_ = new rflect.cal.MainPaneBuilder(this,
      aTimeManager, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllday, this.blockManager_.blockPoolMonth,
      this.containerSizeMonitor_);
  if (goog.DEBUG)
    _inspect('mainPaneBuilder', this.mainPaneBuilder_);


  /**
   * Selection mask.
   * @type {rflect.cal.SelectionMask}
   * @private
   */
  this.selectionMask_ = new rflect.cal.SelectionMask(aViewManager, this,
      aTimeManager, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllday, this.blockManager_.blockPoolMonth);
  if (goog.DEBUG)
    _inspect('selectionMask', this.selectionMask_);


  // Sizes.
  /**
   * Size of allday scrollable and main scrollable as if they were stacked
   * together.
   * @type {goog.math.Size}
   * @private
   */
  this.scrollablesCombinedWkSize_ = null;

  /**
   * Size of main scrollable either in month or week mode.
   * @type {goog.math.Size}
   */
  this.gridContainerSize = null;

  /**
   * Size of grid under scrollable.
   * @type {goog.math.Size}
   */
  this.gridSize = null;

  /**
   * Size of allday scrollable.
   * @type {goog.math.Size}
   */
  this.alldayGridContainerSize = null;

  /**
   * Size of allday grid under scrollable.
   * @type {goog.math.Size}
   */
  this.alldayGridSize = null;

  /**
   * Keys for scroll listeners for scrollables. Listeners are removed by these
   * keys on every update.
   * @private
   */
  this.scrollListenersKeys_ = [];

};
goog.inherits(rflect.cal.MainPane, rflect.cal.Component);


/**
 * Regexp for detection of week grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.weekGridRe_ = null;


/**
 * Regexp for detection of allday grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.alldayGridRe_ = null;


/**
 * Regexp for detection of month grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.monthGridRe_ = null;


/**
 * @return {number} Width of scrollbar below allday scrollable.
 */
rflect.cal.MainPane.prototype.getScrollbarWidthBelowAllday = function() {
  return this.isAlldayScrollableExpandedHor() ?
      this.containerSizeMonitor_.scrollbarWidth : 0;
};


/**
 * @return {number} Width of scrollbar below main scrollable.
 */
rflect.cal.MainPane.prototype.getScrollbarWidthBelowMain = function() {
  return this.isScrollableExpandedHor() ?
      this.containerSizeMonitor_.scrollbarWidth : 0;
};


/**
 * @return {number} Width of scrollbar to the right from allday scrollable.
 */
rflect.cal.MainPane.prototype.getScrollbarWidthNextToAllday = function() {
  return this.isAlldayScrollableExpandedVer() ?
      this.containerSizeMonitor_.scrollbarWidth : 0;
};


/**
 * @return {number} Width of scrollbar to the right from main scrollable.
 */
rflect.cal.MainPane.prototype.getScrollbarWidthNextToMain = function() {
  return this.isScrollableExpandedVer() ?
      this.containerSizeMonitor_.scrollbarWidth : 0;
};


/**
 * @return {boolean} Whether allday scrollable is expanded horizontally.
 */
rflect.cal.MainPane.prototype.isAlldayScrollableExpandedHor = function() {
  // Allday scrollable expanded when week scrollable is expanded, too.
  return this.blockManager_.blockPoolWeek.expanded;
};


/**
 * @return {boolean} Whether allday scrollable is expanded vertically.
 */
rflect.cal.MainPane.prototype.isAlldayScrollableExpandedVer = function() {
  return this.blockManager_.blockPoolAllday.expanded;
};


/**
 * @return {boolean} Whether main scrollable is expanded horizontally.
 */
rflect.cal.MainPane.prototype.isScrollableExpandedHor = function() {
  if (this.viewManager_.isInWeekMode())
    return this.blockManager_.blockPoolWeek.expanded;
  // Month mode is always collapsed.
  else if (this.viewManager_.isInMonthMode())
    return false;
  return false;
};


/**
 * @return {boolean} Whether main scrollable is expanded vertically.
 */
rflect.cal.MainPane.prototype.isScrollableExpandedVer = function() {
  // Week mode is always expanded.
  if (this.viewManager_.isInWeekMode())
    return true;
  else if (this.viewManager_.isInMonthMode())
    return this.blockManager_.blockPoolMonth.expanded;
  return false;
};


/**
 * Updates main pane with new data before redraw. Includes size adjustment.
 */
rflect.cal.MainPane.prototype.updateBeforeRedraw = function() {
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

    this.gridContainerSize = this.scrollablesCombinedWkSize_.clone();

    // By default, grid has the same size as scrollable but fixed height.
    this.gridSize = this.gridContainerSize.clone();
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

    this.gridContainerSize = containerSize.clone();
    this.gridContainerSize.height -=
        rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_HEIGHT_DIFFERENCE_MONTH;
    this.gridContainerSize.width -=
        rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_WIDTH_DIFFERENCE_MONTH;

    // By default, grid has the same size as scrollable.
    this.gridSize = this.gridContainerSize.clone();
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

    this.gridContainerSize.height = this.scrollablesCombinedWkSize_.height -
            this.alldayGridContainerSize.height;

    this.alldayGridContainerSize.height +=
        this.getScrollbarWidthBelowAllday();

    // Check if main scrollable size is greater than grid height.
    if (this.gridContainerSize.height >
        rflect.cal.predefined.WEEK_GRID_HEIGHT)
      this.gridContainerSize.height =
          rflect.cal.predefined.WEEK_GRID_HEIGHT +
          this.getScrollbarWidthBelowMain();

  }

  this.removeScrollListeners_();
};


/**
 * Adds scroll listeners on each update that involves expanded scrollable.
 * @private
 */
rflect.cal.MainPane.prototype.addScrollListeners_ = function() {
  if (this.viewManager_.isInWeekMode()) {

    if (this.blockManager_.blockPoolWeek.expanded)
      this.scrollListenersKeys_.push(goog.events.listen(
          this.dom_.getElement('main-pane-body-scrollable-wk'),
          goog.events.EventType.SCROLL, this.onMainPaneScrollableScroll_, false,
          this));
    //TODO(alexk): implement focus before introducing both scrollable controls.
    /*if (this.blockManager_.blockPoolAllday.expanded)
      this.scrollListenersKeys_.push(goog.events.listen(
          this.dom_.getElement('main-pane-header-scrollable'),
          goog.events.EventType.SCROLL, this.onMainPaneScrollableScroll_, false,
          this));*/

  } else if (this.viewManager_.isInMonthMode()) {

    if (this.blockManager_.blockPoolMonth.expanded)
      this.scrollListenersKeys_.push(goog.events.listen(
          this.dom_.getElement('main-pane-body-scrollable-mn'),
          goog.events.EventType.SCROLL, this.onMainPaneScrollableScroll_, false,
          this));

  }
};


/**
 * Removes scroll listeners on each update.
 * @private
 */
rflect.cal.MainPane.prototype.removeScrollListeners_ = function() {
  goog.array.forEach(this.scrollListenersKeys_, function(aKey) {
    goog.events.unlistenByKey(aKey);
  });
  this.scrollListenersKeys_.length = 0;
};


/**
 * Updates block manager.
 */
rflect.cal.MainPane.prototype.updateBlockManager = function() {
  // Connect sizes with block manager so it could update them.
  this.blockManager_.setSizes(this.gridSize, this.gridContainerSize,
      this.alldayGridSize, this.alldayGridContainerSize);
  this.blockManager_.update();
};


/**
 * Redraws main pane with new data.
 */
rflect.cal.MainPane.prototype.updateByRedraw = function() {
  this.getElement().innerHTML = this.buildBody();

  // We add scroll listeners on freshly built content.
  this.addScrollListeners_();
  // Return to previous scrollTop, scrollLeft values, if any.
  // TODO(alexk): maybe introcude shortcuts for modes within each class.
  if (this.viewManager_.isInWeekMode()) {
    if (this.blockManager_.blockPoolWeek.expanded)
      this.dom_.getElement('main-pane-body-scrollable-wk').scrollLeft =
          this.dom_.getElement('main-pane-header-scrollable').scrollLeft =
          this.blockManager_.blockPoolWeek.scrollLeft;
  } else if (this.viewManager_.isInMonthMode()) {
    if (this.blockManager_.blockPoolMonth.expanded)
      this.dom_.getElement('main-pane-body-scrollable-mn').scrollTop =
          this.blockManager_.blockPoolMonth.scrollTop;
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.cal.Component#buildBody
 * @protected
 */
rflect.cal.MainPane.prototype.buildBodyInternal = function(aSb) {
  if (this.viewManager_.isInMonthMode())
    this.mainPaneBuilder_.buildBodyInternalMonth_(aSb);
  else if (this.viewManager_.isInWeekMode())
    this.mainPaneBuilder_.buildBodyInternalWeek_(aSb);
};


/**
 * Decorates an existing html div element as a Main Pane.
 * @override
 */
rflect.cal.MainPane.prototype.decorateInternal = function(aElement,
    opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.MainPane.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * @inheritDoc
 */
rflect.cal.MainPane.prototype.enterDocument = function() {
  rflect.cal.MainPane.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      goog.nullFunction, false, this)
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
 * Main pane click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onClick_ = function(aEvent) {
  var id = aEvent.target.id;
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
    }
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
    }
  }

  if (zippyClicked) {
    this.updateBeforeRedraw();
    this.updateByRedraw();
  }
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of week grid.
 * @private
 * @return {boolean} For week mode, whether class name indicates that this is a
 * week grid.
 */
rflect.cal.MainPane.prototype.isWeekGrid_ = function(aClassName) {
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
 * @param {string} aClassName Class name of element to test whether it indicates
 * of allday grid.
 * @private
 * @return {boolean} For week mode, whether class name indicates that this is an
 * allday grid.
 */
rflect.cal.MainPane.prototype.isAlldayGrid_ = function(aClassName) {
  var alldayGridRe_ = this.alldayGridRe_ || (this.alldayGridRe_ =
      rflect.string.buildClassNameRe(
      goog.getCssName('wk-ad-events-layer'),
      goog.getCssName('expand-sign-wk-ad-cont'),
      goog.getCssName('expand-sign-wk-ad'),
      // IE 7
      goog.getCssName('main-pane-header-container-wk')));
  return this.viewManager_.isInWeekMode() && alldayGridRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of month grid.
 * @private
 * @return {boolean} For month mode, whether class name indicates that this is a
 * month grid.
 */
rflect.cal.MainPane.prototype.isMonthGrid_ = function(aClassName) {
  var monthGridRe_ = this.monthGridRe_ || (this.monthGridRe_ =
      rflect.string.buildClassNameRe(
      goog.getCssName('mn-events-layer'),
      goog.getCssName('expand-sign-mn'),
      goog.getCssName('daynum-label'),
      goog.getCssName('daynum-cont'),
      goog.getCssName('monthgrid-row'),
      goog.getCssName('daycell')));
  return this.viewManager_.isInMonthMode() && monthGridRe_.test(aClassName);
};


/**
 * Main pane mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  var preventDefaultIsNeeded = false;

  if (goog.DEBUG){
    _log('aEvent.target.id', aEvent.target.id);
    _log('aEvent.target.className', aEvent.target.className);
  }

  // Whether we clicked on hollow space
  if (this.isWeekGrid_(className)) {
    this.selectionMask_.init(rflect.cal.SelectionMask.Configuration.WEEK,
        aEvent);
    preventDefaultIsNeeded = true;
  } else if (this.isAlldayGrid_(className)) {
    this.selectionMask_.init(rflect.cal.SelectionMask.Configuration.ALLDAY,
        aEvent);
    preventDefaultIsNeeded = true;
  } else if (this.isMonthGrid_(className)) {
    this.selectionMask_.init(rflect.cal.SelectionMask.Configuration.MONTH,
        aEvent);
    preventDefaultIsNeeded = true;
  }
  if (preventDefaultIsNeeded)
    aEvent.preventDefault();

};


/**
 * Main pane selectstart handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onSelectStart_ = function(aEvent) {
  var className = aEvent.target.className;

  // Whether we clicked on grid space.
  if (this.isWeekGrid_(className) || this.isAlldayGrid_(className) ||
      this.isMonthGrid_(className))
    aEvent.preventDefault();
};


/**
 * Main pane mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onMouseUp_ = function(aEvent) {
  if (this.selectionMask_.visible) {
    this.selectionMask_.clear();
    aEvent.preventDefault();
  }

};


/**
 * Main pane mousemove handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onMouseMove_ = function(aEvent) {
  if (this.selectionMask_.visible) {
    this.selectionMask_.update(aEvent);
    aEvent.preventDefault();
  }

};


/**
 * Main pane scroll handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onMainPaneScrollableScroll_ = function(aEvent) {
  var scrollable = aEvent.target;
  var scrollPos = 0;

  if (this.viewManager_.isInWeekMode()) {
    scrollPos = scrollable.scrollLeft;
    this.blockManager_.blockPoolWeek.scrollLeft = scrollPos;

    this.dom_.getElement('weekmode-zippies-table').style.left = '-' +
        scrollPos + 'px';
    this.dom_.getElement('weekmode-daynames-table').style.left = '-' +
        scrollPos + 'px';
    this.dom_.getElement('main-pane-header-scrollable').scrollLeft = scrollPos;


  } else if (this.viewManager_.isInMonthMode()) {
    scrollPos = scrollable.scrollTop;
    this.blockManager_.blockPoolMonth.scrollTop = scrollPos;

    this.dom_.getElement('monthmode-zippies-table').style.top = '-' +
        scrollPos + 'px';
  }
};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.MainPane.prototype.disposeInternal = function() {
  rflect.cal.MainPane.superClass_.disposeInternal.call(this);

  this.removeScrollListeners_();

  this.viewManager_ = null;
  this.timeManager_ = null;
  this.containerSizeMonitor_ = null;
};
