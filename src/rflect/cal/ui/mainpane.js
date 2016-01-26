/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Main pane, core component where main information (events)
 * is displayed.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MainPane');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');
goog.require('goog.string');
goog.require('goog.userAgent');
goog.require('rflect.browser.cssmatrix');
goog.require('rflect.cal.Navigator.SIZE_CATEGORY');
goog.require('rflect.cal.ui.MainPaneBuilder');
goog.require('rflect.cal.ui.MainPaneSelectionMask');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.predefined.chips');
goog.require('rflect.cal.Transport.EventTypes');
goog.require('rflect.cal.ui.TimeMarker');
goog.require('rflect.cal.ui.TouchHoldEventCreator');
goog.require('rflect.cal.ui.EditDialog');
goog.require('rflect.cal.ui.SaveDialog');
goog.require('rflect.cal.ui.VMAdaptiveSizeHelper');
goog.require('rflect.events.TouchHoldHelper');
goog.require('rflect.events.TouchHoldHelper.EventType');
goog.require('rflect.string');
goog.require('rflect.ui.Component');
goog.require('rflect.ui.MomentumScroller');
goog.require('rflect.ui.MouseOverRegistry');



/**
 * Main pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @param {rflect.cal.ui.MainBodyAdaptiveSizeHelper} aAdaptiveSizeHelper Link to
 * size helper.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.MainPane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aBlockManager, aTransport, aNavigator,
    aAdaptiveSizeHelper) {
  rflect.ui.Component.call(this);

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
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Link to block manager.
   * @type {rflect.cal.blocks.BlockManager}
   * @private
   */
  this.blockManager_ = aBlockManager;

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @private
   */
  this.transport_ = aTransport;

  /**
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  /**
   * Time marker.
   * @type {rflect.cal.ui.TimeMarker}
   * @private
   */
  this.timeMarker_ = new rflect.cal.ui.TimeMarker(aViewManager, aTimeManager);

  /**
   * Touch hold helper.
   * @type {rflect.events.TouchHoldHelper}
   * @private
   */
  this.touchHoldHelper_ = new rflect.events.TouchHoldHelper();
  this.touchHoldHelper_.addListenableElementId(rflect.cal.predefined.MainPane.
      ELEMENT_ID.TOUCH_HOLD_WRAPPER_WK);
  this.touchHoldHelper_.addListenableElementId(rflect.cal.predefined.MainPane.
      ELEMENT_ID.TOUCH_HOLD_WRAPPER_MN);
  this.touchHoldHelper_.addListenableElementId(rflect.cal.predefined.MainPane.
      ELEMENT_ID.TOUCH_HOLD_WRAPPER_AD);


  /**
   * Main pane builder.
   * @type {rflect.cal.ui.MainPaneBuilder}
   * @private
   */
  this.mainPaneBuilder_ = new rflect.cal.ui.MainPaneBuilder(this.viewManager_,
      this, aTimeManager, this.eventManager_, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllDay, this.blockManager_.blockPoolMonth,
      this.containerSizeMonitor_, this.navigator_, this.timeMarker_);
  if (goog.DEBUG)
    _inspect('mainPaneBuilder', this.mainPaneBuilder_);

  /**
   * @type {rflect.cal.ui.MainBodyAdaptiveSizeHelper}
   */
  this.adaptiveSizeHelper = aAdaptiveSizeHelper;
  if (goog.DEBUG)
    _inspect('_adaptiveSizeHelper', this.adaptiveSizeHelper);

  // Sizes.
  /**
   * Size of allday scrollable and main scrollable as if they were stacked
   * together.
   * @type {goog.math.Size}
   * @private
   */
  this.scrollablesCombinedWkSize_ = new goog.math.Size(0, 0);

  /**
   * Size of main scrollable either in month or week mode.
   * @type {goog.math.Size}
   */
  this.gridContainerSize = new goog.math.Size(0, 0);

  /**
   * Size of grid under scrollable.
   * @type {goog.math.Size}
   */
  this.gridSize = new goog.math.Size(0, 0);

  /**
   * Size of allday scrollable.
   * @type {goog.math.Size}
   */
  this.alldayGridContainerSize = new goog.math.Size(0, 0);

  /**
   * Size of allday grid under scrollable.
   * @type {goog.math.Size}
   */
  this.alldayGridSize = new goog.math.Size(0, 0);

  /**
   * Keys for scroll listeners for scrollables. Listeners are removed by these
   * keys on every update.
   * @type {Array.<number>}
   * @private
   */
  this.scrollListenersKeys_ = [];

  /**
   * Mouse over registry.
   * @type {rflect.ui.MouseOverRegistry}
   * @private
   */
  this.moRegistry_ = new rflect.ui.MouseOverRegistry();

  /**
   * Popup save dialog.
   * @type {rflect.cal.ui.SaveDialog}
   * @private
   */
  this.saveDialog_ = new rflect.cal.ui.SaveDialog(undefined, undefined,
      undefined, aEventManager);
  if (goog.DEBUG)
    _inspect('saveDialog_', this.saveDialog_);

  this.addChild(this.saveDialog_);

  /**
   * Popup edit dialog.
   * @type {rflect.cal.ui.EditDialog}
   * @private
   */
  this.editDialog_ = new rflect.cal.ui.EditDialog();
  if (goog.DEBUG)
    _inspect('editDialog_', this.editDialog_);

  this.addChild(this.editDialog_);

  if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
    this.momentumScroller_ = new rflect.ui.MomentumScroller();
  }

  /**
   * Selection mask.
   * @type {rflect.cal.ui.MainPaneSelectionMask}
   * @private
   */
  this.selectionMask_ = new rflect.cal.ui.MainPaneSelectionMask(aViewManager,
      this, aTimeManager, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllDay, this.blockManager_.blockPoolMonth,
      this.momentumScroller_, false);
  if (goog.DEBUG)
    _inspect('selectionMask', this.selectionMask_);

  /**
   * Touch hold event creator.
   * @type {rflect.cal.ui.TouchHoldEventCreator}
   * @private
   */
  this.touchHoldEventCreator_ = new rflect.cal.ui.TouchHoldEventCreator(
      this.viewManager_, aTimeManager, this, this.eventManager_,
      this.blockManager_.blockPoolWeek, this.blockManager_.blockPoolAllDay,
      this.blockManager_.blockPoolMonth, this.momentumScroller_);
};
goog.inherits(rflect.cal.ui.MainPane, rflect.ui.Component);


/**
 * Distance that is allowed to be event chip and trigger click on it, which
 * shows event pane.
 * @type {number}
 */
rflect.cal.ui.MainPane.DRAG_THRESHOLD = 5;


/**
 * X coordinate of point of touchstart event.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPane.prototype.startTouchX_ = 0;


/**
 * Y coordinate of point of touchstart event.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPane.prototype.startTouchY_ = 0;


/**
 * Regexp for detection of week grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MainPane.prototype.weekGridRe_;


/**
 * Regexp for detection of allday grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MainPane.prototype.alldayGridRe_;


/**
 * Regexp for detection of month grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MainPane.prototype.monthGridRe_;


/**
 * Regexp for detection of daynum label.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MainPane.prototype.daynumLabelRe_;


/**
 * Regexp for detection of weeknum label.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MainPane.prototype.daynumLabelRe_;


/**
 * Whether chip was dragged.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPane.prototype.chipWasDragged_;


/**
 * Whether main pane is expanded.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPane.prototype.expanded_;


/**
 * Container placed out of sight, used to store grips temporary.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPane.prototype.farAwayCont_;


/**
 * Grip container, week, upper.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPane.prototype.upperContWk_;


/**
 * Grip container, week, lower.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPane.prototype.lowerContWk_;


/**
 * Grip container, month, left.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPane.prototype.leftContMn_;


/**
 * Grip container, month, right.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPane.prototype.rightContMn_;


/**
 * Momentum scroller.
 * @type {rflect.ui.MomentumScroller}
 * @private
 */
rflect.cal.ui.MainPane.prototype.momentumScroller_;


/**
 * Position of momentum scroller content saved between remove and add.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPane.prototype.scrollerContentPosition_;


/**
 * Whether update by navigation is pending.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateByNavigation_;


/**
 * Whether scroll is enabled for elements of main pane.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPane.prototype.scrollIsEnabled_ = true;


/**
 * @param {boolean} aEnabled
 */
rflect.cal.ui.MainPane.prototype.setScrollEnabled = function(aEnabled) {
  this.scrollIsEnabled_ = aEnabled;

  var frameElements = [];

  if (this.viewManager_.isInWeekMode()) {
    frameElements.push(this.getDomHelper().
        getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_HEADER_SCROLLABLE));
    frameElements.push(this.getDomHelper().
        getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_BODY_SCROLLABLE_WK));
  } else if (this.viewManager_.isInMonthMode()) {
    frameElements.push(this.getDomHelper().
        getElement('main-pane-body-scrollable-mn'));
  }

  frameElements.filter(el => !!el).forEach(el => {
    el.style.overflow = aEnabled ? '' : 'hidden'
  })
};


/**
 * @return {boolean} aEnabled
 */
rflect.cal.ui.MainPane.prototype.isScrollEnabled = function() {
  return this.scrollIsEnabled_;
};


/**
 * @return {number} Width of scrollbar below allday scrollable.
 */
rflect.cal.ui.MainPane.prototype.getScrollbarWidthBelowAllday = function() {
  return this.isAlldayScrollableExpandedHor() ?
      this.navigator_.getScrollbarWidth() : 0;
};


/**
 * @return {number} Width of scrollbar below main scrollable.
 */
rflect.cal.ui.MainPane.prototype.getScrollbarWidthBelowMain = function() {
  return this.isScrollableExpandedHor() ?
      this.navigator_.getScrollbarWidth() : 0;
};


/**
 * @return {number} Width of scrollbar to the right from allday scrollable.
 */
rflect.cal.ui.MainPane.prototype.getScrollbarWidthNextToAllday = function() {
  return this.isAlldayScrollableExpandedVer() ?
      this.navigator_.getScrollbarWidth() : 0;
};


/**
 * @return {number} Width of scrollbar to the right from main scrollable.
 */
rflect.cal.ui.MainPane.prototype.getScrollbarWidthNextToMain = function() {
  return this.isScrollableExpandedVer() ?
      this.navigator_.getScrollbarWidth() : 0;
};


/**
 * @return {boolean} Whether allday scrollable is expanded horizontally.
 */
rflect.cal.ui.MainPane.prototype.isAlldayScrollableExpandedHor = function() {
  // Allday scrollable expanded when week scrollable is expanded, too.
  return this.blockManager_.blockPoolWeek.expanded;
};


/**
 * @return {boolean} Whether allday scrollable is expanded vertically.
 */
rflect.cal.ui.MainPane.prototype.isAlldayScrollableExpandedVer = function() {
  return this.blockManager_.blockPoolAllDay.expanded;
};


/**
 * @return {boolean} Whether main scrollable is expanded horizontally.
 */
rflect.cal.ui.MainPane.prototype.isScrollableExpandedHor = function() {
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
rflect.cal.ui.MainPane.prototype.isScrollableExpandedVer = function() {
  // Week mode is always expanded.
  if (this.viewManager_.isInWeekMode())
    return true;
  else if (this.viewManager_.isInMonthMode())
    return this.blockManager_.blockPoolMonth.expanded;
  return false;
};


/**
 * Updates main pane with new data before redraw. Includes size adjustment.
 * @param {boolean=} opt_deep Whether to update children.
 * @param {boolean=} opt_doNotRemoveScrollListeners Whether not to remove scroll
 * listeners.
 * @param {boolean=} opt_updateByNavigation Whether this update initiated by
 * buttons of top pane or minical.
 * @param {boolean=} opt_sizeCategoryChanged Whether size category was changed.
 */
rflect.cal.ui.MainPane.prototype.updateBeforeRedraw = function(opt_deep,
    opt_doNotRemoveScrollListeners, opt_updateByNavigation,
    opt_sizeCategoryChanged) {
  if (this.adaptiveSizeHelper.getSizeWasAdaptedForView()) {
    this.updateScrollableSizes();
  } else {
    this.updateBlockManager();
  }

  if (!opt_doNotRemoveScrollListeners)
    this.removeScrollListeners_();

  if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
    this.removeMomentumScroller();
  }

  this.touchHoldHelper_.dispose();

  if (opt_updateByNavigation && !rflect.TOUCH_INTERFACE_ENABLED){
    var scrollTop = this.getHandyScrollTopPosition_();
    this.blockManager_.blockPoolWeek.scrollTop =
        scrollTop;
  }

  this.updateByNavigation_ = !!opt_updateByNavigation;

  //this.sizeCategoryChanged_ = !!opt_sizeCategoryChanged;
};


/**
 * @return {number} Scroll position that focuses on either event or today's
 * time.
 * @private
 */
rflect.cal.ui.MainPane.prototype.getHandyScrollTopPosition_ = function() {
  var scrollTop = 0;
  var earliestChipStart = this.blockManager_.blockPoolWeek
      .getEarliestChipStart();

  if (this.timeManager_.isInNowPoint)
    scrollTop = this.timeMarker_.getPosition(true);
  else
    scrollTop = earliestChipStart * (rflect.cal.predefined.HOUR_ROW_HEIGHT *
        48) / (24 * 60);

  return scrollTop;
}


/**
 * Adds scroll listeners on each update that involves expanded scrollable.
 * @private
 */
rflect.cal.ui.MainPane.prototype.addScrollListeners_ = function() {
  if (this.viewManager_.isInWeekMode()) {

    this.scrollListenersKeys_.push(goog.events.listen(
        this.getDomHelper().getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_BODY_SCROLLABLE_WK),
        goog.events.EventType.SCROLL, this.onMainPaneScrollableScroll_, false,
        this));
    if (!this.containerSizeMonitor_.isSmallScreen() &&
        this.blockManager_.blockPoolAllDay.expanded)
      this.scrollListenersKeys_.push(goog.events.listen(
          this.getDomHelper().getElement(
          rflect.cal.predefined.MainPane.ELEMENT_ID.
              MAIN_PANE_HEADER_SCROLLABLE),
          goog.events.EventType.SCROLL, this.onMainPaneScrollableScroll_, false,
          this));
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
rflect.cal.ui.MainPane.prototype.removeScrollListeners_ = function() {
  goog.array.forEach(this.scrollListenersKeys_, function(aKey) {
    goog.events.unlistenByKey(aKey);
  });
  this.scrollListenersKeys_.length = 0;
};


/**
 * Removes scroll listeners on each update.
 */
rflect.cal.ui.MainPane.prototype.removeMomentumScroller = function() {
  var elementWk = this.getDomHelper().getElement(
      rflect.cal.predefined.MainPane.ELEMENT_ID.GRID_TABLE_CONT);
  var elementMn = this.getDomHelper().getElement('grid-table-wrapper-outer');

  if (this.viewManager_.isInWeekMode() && elementWk){
    this.scrollerContentPosition_ = this.calculateScrollerContentPosition_(
        elementWk);
  } else if (this.viewManager_.isInMonthMode() && elementMn){
    this.scrollerContentPosition_ = this.calculateScrollerContentPosition_(
        elementMn);
  } else this.scrollerContentPosition_ = 0;

  this.momentumScroller_.enable(false);
};


/***/
rflect.cal.ui.MainPane.prototype.resetMomentumScroller = function() {
  if (!this.momentumScroller_) {
    return;
  }

  this.removeMomentumScroller();
  this.addMomentumScroller();
  this.momentumScroller_.animateWithinBounds(0);
};


 /**
  * @param {Element} aElement Scroller content element.
  * @return {number} Position of scroller content.
  */
rflect.cal.ui.MainPane.prototype.calculateScrollerContentPosition_ =
    function(aElement) {
  var offset = 0;
  var styleAttribute = aElement.getAttribute('style');

  if (!styleAttribute)
    return offset;

  var matches = styleAttribute.match(/-(\d+\.\d+)/);
  if (matches && matches[0])
    offset = +matches[0];
  else
    matches = styleAttribute.match(/-(\d+)/);
  if (matches && matches[0])
    offset = +matches[0];
  return offset;
}


/**
 * Removes scroll listeners on each update.
 */
rflect.cal.ui.MainPane.prototype.addMomentumScroller = function() {
  var element;
  var frameElement;

  var scrollTop = this.getHandyScrollTopPosition_();

  if (this.viewManager_.isInWeekMode()) {
    element = this.getDomHelper().getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.GRID_TABLE_CONT);
    frameElement = this.getDomHelper()
        .getElement(
            rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_BODY_SCROLLABLE_WK);
  } else if (this.viewManager_.isInMonthMode()) {
    element = this.getDomHelper().getElement('grid-table-wrapper-outer');
    frameElement = this.getDomHelper()
        .getElement('main-pane-body-scrollable-mn');
  }

  if (element && frameElement) {
    this.momentumScroller_.setElements(element, frameElement);
    this.momentumScroller_.enable(true);
  }

  if (this.updateByNavigation_) {
    if (this.viewManager_.isInWeekMode()) {
      this.momentumScroller_.animateWithinBounds(-scrollTop);
    }
    this.updateByNavigation_ = false;
  } else if (this.scrollerContentPosition_) {
    this.momentumScroller_.animateTo(this.scrollerContentPosition_);
  }
};


/**
 * Updates block manager.
 */
rflect.cal.ui.MainPane.prototype.updateBlockManager = function() {
  // Connect sizes with block manager so it could update them.
  this.blockManager_.setSizes(this.gridSize, this.gridContainerSize,
      this.alldayGridSize, this.alldayGridContainerSize);
  this.blockManager_.update();
};


/**
 * Redraws main pane with new data.
 * @param {boolean=} opt_deep Whether to update children.
 * @param {boolean=} opt_doNotAddMomentumScroller Whether to omit adding of
 * momentum scroller.
 */
rflect.cal.ui.MainPane.prototype.updateByRedraw = function(opt_deep,
    opt_doNotAddMomentumScroller) {
  this.getElement().innerHTML = this.buildHTML();

  this.updateScrollableSizesAndDom();

  // We add scroll listeners on freshly built content.
  if (!rflect.TOUCH_INTERFACE_ENABLED) {
    this.addScrollListeners_();
    this.restoreOffsetsOfScrollables_();
  }
  if (rflect.ARTIFICIAL_SCROLLER_ENABLED && !opt_doNotAddMomentumScroller) {
    this.addMomentumScroller();
  }
  this.touchHoldHelper_.handleTouchEvents();
};



/**
 * @param {string} aElementId Element id.
 * @return {goog.math.Size} Size of scrollable offsets for this element.
 */
rflect.cal.ui.MainPane.prototype.getScrollOffsetSize = function(aElementId) {
  let scrollOffset = new goog.math.Size(0, 0);
  scrollOffset.width = this.getDomHelper().getElement(aElementId).scrollLeft;
  scrollOffset.height = this.getDomHelper().getElement(aElementId).scrollTop;
  return scrollOffset;
}


/**
 * @return {goog.math.Size} Static sizes.
 */
rflect.cal.ui.MainPane.prototype.getStaticSize = function() {

  if (!this.adaptiveSizeHelper.getStaticSizeForView()) {
    let firstScrollable;
    let scrollOffset = new goog.math.Size(0, 0);
    if (this.viewManager_.isInWeekMode()) {
      firstScrollable = this.getDomHelper().
          getElement(rflect.cal.predefined.MainPane.ELEMENT_ID.
              MAIN_PANE_HEADER_SCROLLABLE);

      if (!firstScrollable) {
        firstScrollable = this.getDomHelper().
            getElement('grid-table-wrapper-wk');
        scrollOffset = this.getScrollOffsetSize(rflect.cal.predefined.MainPane.
                  ELEMENT_ID.MAIN_PANE_BODY_SCROLLABLE_WK);
      }

    } else if (this.viewManager_.isInMonthMode()) {
      firstScrollable = this.getDomHelper().getElement('grid-table-mn');
      scrollOffset = this.getScrollOffsetSize(rflect.cal.predefined.MainPane.
          ELEMENT_ID.MAIN_PANE_BODY_SCROLLABLE_MN);
    }
    let {top, left} = firstScrollable.getBoundingClientRect();
    let staticSize = new goog.math.Size(left + scrollOffset.width, top +
        scrollOffset.height);
    this.adaptiveSizeHelper.setStaticSizeForView(staticSize);
  }

  return this.adaptiveSizeHelper.getStaticSizeForView().clone();
}


/**
 * Updates child calendar selectors.
 */
rflect.cal.ui.MainPane.prototype.updateScrollableSizes = function() {
  // Take current viewport size.
  var containerSize = this.containerSizeMonitor_.getSize();
  var staticSizes = this.getStaticSize();
  // Begin size adjustment phase.
  if (this.viewManager_.isInWeekMode()) {
    this.scrollablesCombinedWkSize_ = containerSize.clone();
    // We calculate combined height of two scrollables.
    this.scrollablesCombinedWkSize_.height -= staticSizes.height;
    this.scrollablesCombinedWkSize_.width -= staticSizes.width +
        this.navigator_.getScrollbarWidth();

    this.alldayGridContainerSize = this.scrollablesCombinedWkSize_.clone();
    this.gridContainerSize = this.scrollablesCombinedWkSize_.clone();

    // By default, grid has the same size as scrollable but fixed height.
    this.gridSize = this.gridContainerSize.clone();
    this.gridSize.height =
        rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE.height;

    this.alldayGridContainerSize.height =
        this.containerSizeMonitor_.isSmallScreen() ?
        0 : rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.height;
    this.alldayGridSize = this.alldayGridContainerSize.clone();

    // ... else, in case when allday scrollable is expanded, we should
    // calculate it's size depending on block capacity, so pass on for now.

  } else if (this.viewManager_.isInMonthMode()) {
    this.gridContainerSize = containerSize.clone();
    this.gridContainerSize.height -= staticSizes.height;
    this.gridContainerSize.width -= staticSizes.width;

    // By default, grid has the same size as scrollable.
    this.gridSize = this.gridContainerSize.clone();
    this.gridSize.width -= this.getScrollbarWidthNextToMain();
  }

  // Update blocks, get their capacity and size.
  this.updateBlockManager();

  // Finish size adjustment phase.
  if (this.viewManager_.isInWeekMode()) {

    // Case when either allday scrollable is expanded.
    if (!this.containerSizeMonitor_.isSmallScreen() &&
        this.isAlldayScrollableExpandedVer()) {
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

    // Check if main scrollable size is greater than grid height.
    if (this.gridContainerSize.height >
        rflect.cal.predefined.WEEK_GRID_HEIGHT)
      this.gridContainerSize.height =
          rflect.cal.predefined.WEEK_GRID_HEIGHT +
          this.getScrollbarWidthBelowMain();

  }
}


/**
 * Updates child calendar selectors.
 */
rflect.cal.ui.MainPane.prototype.updateScrollableSizesAndDom = function() {
  if (!this.adaptiveSizeHelper.getSizeWasAdaptedForView()) {
    this.updateScrollableSizes();

    if (this.viewManager_.isInWeekMode()) {

      let headerScrollable = this.getDomHelper().
          getElement(rflect.cal.predefined.MainPane.ELEMENT_ID.
              MAIN_PANE_HEADER_SCROLLABLE);
      let allDayEventsGrid = this.getDomHelper().
          getElement('alldayevents-grid');
      let weekmodeDaynamesTable = this.getDomHelper().
          getElement('weekmode-daynames-table');
      let mainScrollable = this.getDomHelper().
          getElement(rflect.cal.predefined.MainPane.ELEMENT_ID.
              MAIN_PANE_BODY_SCROLLABLE_WK);

      if (headerScrollable) {
        headerScrollable.style.height = this.alldayGridContainerSize.height +
            'px';
        allDayEventsGrid.style.width =
            //weekmodeDaynamesTable.style.width =
            rflect.math.pixelToPercent(
            this.blockManager_.blockPoolAllDay.gridSize.width,
            this.blockManager_.blockPoolAllDay.gridContainerSize.width).
            toFixed(4) + '%';

        if (rflect.HORIZONTAL_EXPAND_ENABLED) {
          this.updateHorizontalBlocks(this.blockManager_.blockPoolWeek,
              headerScrollable.querySelectorAll('.weekgrid-col'));
        }
      }
      if (rflect.HORIZONTAL_EXPAND_ENABLED) {
        let gridWidth = rflect.math.pixelToPercent(
            this.blockManager_.blockPoolWeek.gridSize.width,
            this.blockManager_.blockPoolWeek.gridContainerSize.width)
        let gridRowsContainer = this.getDomHelper().
            getElement('grid-rows-container');
        let gridTable = this.getElement().
            querySelector('.grid-table-wk-outer');

        gridRowsContainer.style.width = gridWidth + '%';
        gridTable.style.width = gridWidth + '%';
        this.updateHorizontalBlocks(this.blockManager_.blockPoolWeek,
            mainScrollable.querySelectorAll('.weekgrid-col'));
      }
      mainScrollable.style.height = this.gridContainerSize.height + 'px';

    } else if (this.viewManager_.isInMonthMode()) {

      let mainScrollable = this.getDomHelper().
          getElement('main-pane-body-scrollable-wrapper');
      let grid = this.getDomHelper().
          getElement('grid-table-wrapper-outer');
      let blocks = this.getElement().querySelectorAll('.monthgrid-row');
      let weekNumLabels = this.getElement().querySelectorAll('.weeknum-label');

      mainScrollable.style.height =
          this.blockManager_.blockPoolMonth.gridContainerSize.height + 'px';
      grid.style.height =
          this.blockManager_.blockPoolMonth.gridSize.height + 'px';
      goog.array.forEach(blocks, (block, index) => {
        block.style.height =
            this.blockManager_.blockPoolMonth.blocks[index].size + 'px';
      });
      goog.array.forEach(weekNumLabels, (weekNumLabel, index) => {
        weekNumLabel.style.height =
            this.blockManager_.blockPoolMonth.blocks[index].size + 'px';
      });

    }

    this.adaptiveSizeHelper.setSizeWasAdaptedForView(true);

  }
}


rflect.cal.ui.MainPane.prototype.updateHorizontalBlocks = function(
    aBlockPoolWeek, blocks) {
  let prevColsCumulativeSize = 0;
  let gridWidth = aBlockPoolWeek.gridSize.width;

  goog.array.forEach(blocks, (block, index) => {
    block.style.marginLeft = rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth).toFixed(4) + '%';
  
    prevColsCumulativeSize += aBlockPoolWeek.blocks[index].size;
  
    block.marginRight = (100 -
        rflect.math.pixelToPercent(prevColsCumulativeSize, gridWidth)).
        toFixed(4) + '%';
  });
}


/**
 * Restores previously saved offsets of scrollable elements.
 * @private
 */
rflect.cal.ui.MainPane.prototype.restoreOffsetsOfScrollables_ =
    function() {

  // Return to previous scrollTop, scrollLeft values, if any.
  if (this.viewManager_.isInWeekMode()) {
    var headerScrollable =
        this.getDomHelper().getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_HEADER_SCROLLABLE);
    var mainScrollable =
        this.getDomHelper().getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_BODY_SCROLLABLE_WK);

    if (this.blockManager_.blockPoolWeek.expanded)
      mainScrollable.scrollLeft =
          headerScrollable.scrollLeft =
          this.blockManager_.blockPoolWeek.scrollLeft;
    if (!this.containerSizeMonitor_.isSmallScreen() &&
        this.blockManager_.blockPoolAllDay.expanded)
      headerScrollable.scrollTop =
          this.blockManager_.blockPoolAllDay.scrollTop;

    mainScrollable.scrollTop =
        this.blockManager_.blockPoolWeek.scrollTop;

  } else if (this.viewManager_.isInMonthMode()) {
    if (this.blockManager_.blockPoolMonth.expanded)
      this.getDomHelper().getElement('main-pane-body-scrollable-mn')
          .scrollTop = this.blockManager_.blockPoolMonth.scrollTop;
  }
}


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string} HTML of component.
 * @override
 */
rflect.cal.ui.MainPane.prototype.buildHTML = function(opt_outerHTML) {
  if (this.viewManager_.isInMonthMode()) {
    return this.mainPaneBuilder_.buildBodyMonth(false, opt_outerHTML);
  } else if (this.viewManager_.isInWeekMode()) {
    return this.mainPaneBuilder_.buildBodyWeek(false, opt_outerHTML);
  }
  return '';
};


/**
 * Redraws just week grid.
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateByRedrawWeekGrid_ = function() {
  this.getDomHelper().getElement('grid-table-wk').innerHTML =
      this.mainPaneBuilder_.buildWeekGrid();
}


/**
 * Redraws just all-day grid.
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateByRedrawAllDayGrid_ = function() {
  this.getDomHelper().getElement('alldayevents-grid').innerHTML =
      this.mainPaneBuilder_.buildAllDayGrid();

}


/**
 * Redraws just week grid.
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateByRedrawMonthGrid_ = function() {
  this.getDomHelper().getElement('grid-table-mn').innerHTML =
      this.mainPaneBuilder_.buildMonthGrid();
}


/**
 * Redraws only some components.
 * If grid corresponding current view is expanded (for week mode this means 
 * either all-day or week is expanded), redraw all main pane.
 *
 * @param {boolean} aConditionToUpdateAllDay Whether to update all-day grid.
 * @param {boolean} aConditionToUpdateWeek Whether to update week.
 * @param {boolean} aConditionToUpdateMonth Whether to update month grid.
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateConditionally_ = function(
    aConditionToUpdateAllDay, aConditionToUpdateWeek, aConditionToUpdateMonth) {

  // We need to detect IE9 because it doesn't allow changing of table's
  // innerHTML.
  var isIE9OrLower = goog.userAgent.IE &&
      goog.string.compareVersions(goog.userAgent.VERSION, '9') <= 0;

  this.eventManager_.run();

  this.updateBeforeRedraw();

  if (this.viewManager_.isInWeekMode() &&
      !this.blockManager_.blockPoolWeek.expanded &&
      !this.blockManager_.blockPoolAllDay.expanded &&
      !isIE9OrLower) {

    if (aConditionToUpdateAllDay)
      this.updateByRedrawAllDayGrid_();

    if (aConditionToUpdateWeek)
      this.updateByRedrawWeekGrid_();

  } else if (this.viewManager_.isInMonthMode() &&
      !this.blockManager_.blockPoolMonth.expanded && !isIE9OrLower) {

    if (aConditionToUpdateMonth)
      this.updateByRedrawMonthGrid_();

  } else

    this.updateByRedraw();
}


/**
 * Redraws component after event was deleted.
 * @param {rflect.cal.events.Event} aDeletedEvent Deleted event.
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateAfterDelete_ = function(aDeletedEvent) {
  var allDay = aDeletedEvent.allDay;

  this.updateConditionally_(allDay, !allDay, true);
}


/**
 * Redraws component after event was added.
 * @private
 */
rflect.cal.ui.MainPane.prototype.updateAfterSave_ = function() {
  this.updateConditionally_(
      this.selectionMask_.isAllDay(), this.selectionMask_.isWeek(),
      this.selectionMask_.isMonth());
}


/**
 * @inheritDoc
 */
rflect.cal.ui.MainPane.prototype.enterDocument = function() {
  rflect.cal.ui.MainPane.superClass_.enterDocument.call(this);

  if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
    this.getHandler().listen(this.getElement(),
        goog.events.EventType.TOUCHSTART, this.onTouchStart_, false, this).
        listen(this.getElement(), goog.events.EventType.TOUCHEND,
        this.onTouchEnd_, false, this);
  }

  this.getHandler()
      .listen(this.saveDialog_, rflect.cal.ui.SaveDialog.EVENT_EDIT,
      this.onEventEdit_, false, this)
      .listen(this.saveDialog_, rflect.ui.Dialog.EventType.SELECT,
      this.onSaveDialogButtonSelect_, false, this)
      .listen(this.editDialog_, rflect.cal.ui.SaveDialog.EVENT_EDIT,
      this.onEventEdit_, false, this)
      .listen(this.editDialog_, rflect.ui.Dialog.EventType.SELECT,
      this.onEditDialogButtonSelect_, false, this)
      .listen(this.transport_, rflect.cal.Transport.EventTypes.SAVE_EVENT,
      this.onSaveEvent_, false, this)
      .listen(this.viewManager_.getScreenManager(),
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this);

  this.getHandler().
      listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this).
      listen(this.getElement(), rflect.events.TouchHoldHelper.EventType.
      TOUCHHOLD, this.onTouchHold_, false, this).
      listen(this.getElement(), rflect.events.TouchHoldHelper.EventType.
      TOUCHHOLDEND, this.onTouchHoldEnd_, false, this);

  //Mouse events.
  if (!rflect.TOUCH_INTERFACE_ENABLED) {
    this.getHandler()
        .listen(this.getElement(), goog.events.EventType.DBLCLICK,
        this.onDoubleClick_, false, this)
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
  }

  this.timeMarker_.start();
};


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event
 * object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onBeforePageChange_ = function(aEvent) {
  if (aEvent.currentScreen == this.getParent()){
    this.resetMomentumScroller();
  }
}


/**
 * Saves touch start coordinates to be later tested whether touch was moved.
 * @param {goog.events.Event} e Touch event.
 * @protected
 */
rflect.cal.ui.MainPane.prototype.saveStartTouch = function(e) {
  this.startTouchX_ = e.getBrowserEvent().touches[0].clientX;
  this.startTouchY_ = e.getBrowserEvent().touches[0].clientY;
}


/**
 * @return {boolean} Whether touch end was moved from touch start more than
 * threshold.
 * @param {goog.events.Event} e Touch event.
 * @protected
 */
rflect.cal.ui.MainPane.prototype.touchWasMoved = function(e) {

  var endTouchX = e.getBrowserEvent().changedTouches[0].clientX;
  var endTouchY = e.getBrowserEvent().changedTouches[0].clientY;

  return Math.abs(this.startTouchX_ - endTouchX) >
      rflect.cal.ui.MainPane.DRAG_THRESHOLD || Math.abs(this.startTouchY_ -
      endTouchY) > rflect.cal.ui.MainPane.DRAG_THRESHOLD;
}


/**
 * Main pane click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onClick_ = function(aEvent) {
  var target = /** @type {Element}*/ (aEvent.target);
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
    } else if (!rflect.TOUCH_INTERFACE_ENABLED &&
        this.isDaynumLabel_(className)) {
      this.onDaynumLabelClick_(id);
    } else if (!rflect.TOUCH_INTERFACE_ENABLED &&
        this.isWeeknumLabel_(className)) {
      this.onWeeknumLabelClick_(target.parentNode.id);
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
      this.blockManager_.blockPoolAllDay.toggleBlock(0);

      zippyClicked = true;
    } else if (!rflect.TOUCH_INTERFACE_ENABLED &&
        this.isDaynumLabel_(className)) {
      this.onDaynumLabelClick_(target.parentNode.id);
    }
  }

  if (zippyClicked) {

    this.updateBeforeRedraw();
    this.updateByRedraw();

  } else if ((this.isChipOrChild_(className) || this.isGrip_(className)) &&
      !this.selectionMask_.wasDragged() &&
      !this.touchHoldHelper_.getTouchHoldWasFired()) {

    this.showEventEditComponent_(target, className,
        rflect.TOUCH_INTERFACE_ENABLED);

  }
};


/**
 * Main pane touch start handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onTouchStart_ = function(aEvent) {
  aEvent.preventDefault();
  this.saveStartTouch(aEvent);
};


/**
 * Main pane touch end handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onTouchEnd_ = function(aEvent) {
  if (!this.touchHoldHelper_.getTouchHoldWasFired()) {
    this.onTouchEndInternal_(aEvent);
  }
};


rflect.cal.ui.MainPane.prototype.onTouchEndInternal_ = function(aEvent) {
  var target = /** @type {Element}*/ (aEvent.target);
  var id = target.id;
  var className = target.className;
  if ((this.isChipOrChild_(className) || this.isGrip_(className)) &&
      !this.selectionMask_.wasDragged() && !this.touchWasMoved(aEvent)) {

    this.showEventEditComponent_(target, className, true);

  }
}


/**
 * Main pane touch hold handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onTouchHold_ = function(aEvent) {
  this.touchHoldEventCreator_.onTouchHoldDelegate(aEvent);
  this.removeMomentumScroller();
}


/**
 * Main pane touch hold end handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onTouchHoldEnd_ = function(aEvent) {
  if (this.eventManager_.eventHolder.isInProgress()) {
    this.getParent().showEventPane(true, true, true);
  }
}



/**
 * Main pane double click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onDoubleClick_ = function(aEvent) {
  var target = /** @type {Element}*/ (aEvent.target);
  var id = target.id;
  var className = target.className;

  if (this.isChipOrChild_(className) || this.isGrip_(className)) {
    this.showEventEditComponent_(target, className, true);
  }

  aEvent.preventDefault();
};



/**
 * @param {Element} aTarget Element that was interacted with.
 * @return {rflect.cal.events.Event} Found event or null.
 */
rflect.cal.ui.MainPane.prototype.getEventByTarget_ =
    function(aTarget) {
  var chip = this.getChipElement_(aTarget);
  var className = chip.className;

  var eventId = rflect.string.getNumericIndexWithoutPrefix(className,
      rflect.cal.predefined.chips.CHIP_EVENT_CLASS);
  var event = this.eventManager_.getEventById(eventId);
  return event;
}


/**
 * @param {Element} aTarget Element that was interacted with.
 * @return {Element} Found chip or null.
 */
rflect.cal.ui.MainPane.prototype.getChipElement_ = function(aTarget) {
  return /**@type {Element}*/ (goog.dom.getAncestor(aTarget,
      goog.bind(function(aNode) {
    return this.isChip_(aNode.className);
  }, this), true, 2));
}


/**
 * @param {Element} aTarget Element that was clicked to invoke dialog.
 * @param {string} aChipClassName Class name of chip.
 * @param {boolean=} aShowPane Whether to show event edit pane.
 */
rflect.cal.ui.MainPane.prototype.showEventEditComponent_ = function(aTarget,
                                                         aChipClassName,
                                                         aShowPane) {

  var event = this.getEventByTarget_(aTarget);

  if (this.eventManager_.eventIsInProgress(event.id))
    return;

  this.eventManager_.eventHolder.openSession(event);

  if (event) {

    if (aShowPane) {
      this.getParent().showEventPane(true);
      this.editDialog_.setVisible(false);
    } else {
      this.editDialog_.setVisible(true);
      this.editDialog_.setTitle(event.summary ||
          rflect.cal.i18n.Symbols.NO_NAME_EVENT);
      this.editDialog_.setEventName(event.summary);
      this.editDialog_.setEventTimeString(event.toHumanString());
    }

  }
}


/**
 * Expands main pane element by removing side margin.
 * @param {boolean} aExpand Whether to expand.
 */
rflect.cal.ui.MainPane.prototype.setExpanded = function(aExpand) {
  if (this.expanded_ != aExpand) {
    if (aExpand) {
      this.expandElement(true);
      this.expanded_ = aExpand;
    } else if (!this.containerSizeMonitor_.isSmallScreen()) {
      this.expandElement(false);
      this.expanded_ = aExpand;
    }
  }
}


/**
 * @return {boolean} Whether is expanded.
 */
rflect.cal.ui.MainPane.prototype.isExpanded = function() {
  return this.expanded_;
}


/**
 * @return {boolean} Whether to collapse when possible.
 */
rflect.cal.ui.MainPane.prototype.isExternallyExpanded = function() {
  return this.getParent().isExpanded();
}


/**
 * @param {boolean} aExpand Whether to expand.
 */
rflect.cal.ui.MainPane.prototype.expandElement = function(aExpand) {
  if (aExpand)
    goog.dom.classes.add(this.getElement(), 'main-pane-expanded');
  else
    goog.dom.classes.remove(this.getElement(), 'main-pane-expanded');
}


/**
 * Main pane mouseout handler.
 */
rflect.cal.ui.MainPane.prototype.onMouseOut_ = function(aEvent) {
  var target = aEvent.target;
  var relatedTarget = aEvent.relatedTarget;
  var id = target.id;
  var className = target.className;
  var relClassName = relatedTarget && relatedTarget.className;
  if (this.isDaynumLabel_(className) || this.isWeeknumLabel_(className) ||
      this.isZippy_(className))
    this.moRegistry_.deregisterTarget();

  if (
      // If we moving from chip to anything except grip
      this.isChipOrChild_(className) && !this.isGrip_(relClassName) ||
      // If we moving from grip to anything except grip or chip
      this.isGrip_(className) && !this.isChipOrChild_(relClassName) &&
      !this.isGrip_(relClassName)) {
    this.removeChipGrip_();
  }
}


/**
 * Main pane mouseover handler.
 */
rflect.cal.ui.MainPane.prototype.onMouseOver_ = function(aEvent) {
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

  if (this.isChipOrChild_(className)) {
    this.addChipGrip_(target);
  }
}


/**
 * Adds grip to one or more chips.
 * @param {Element} aElement Chip element or its label.
 * @private
 */
rflect.cal.ui.MainPane.prototype.addChipGrip_ = function(aElement) {
  var chip = this.getChipElement_(aElement);
  var className = chip.className;
  var weekChip = this.isWeekChip_(className);
  var allDayChip = this.isAllDayChip_(className);

  var startIsCutWkRe = rflect.string.buildClassNameRe(
      goog.getCssName('event-rect-wk-collapse-top'));
  var endIsCutWkRe = rflect.string.buildClassNameRe(
      goog.getCssName('event-rect-wk-collapse-bottom'));
  var startIsCutMnRe = rflect.string.buildClassNameRe(
      goog.getCssName('event-rect-mn-inner-collapse-left'));
  var endIsCutMnRe = rflect.string.buildClassNameRe(
      goog.getCssName('event-rect-mn-inner-collapse-right'));

  if (!this.farAwayCont_) {
    this.farAwayCont_ = goog.dom.createDom('div',
      goog.getCssName('faraway-cont'));
    this.getDomHelper().getDocument().body.appendChild(this.farAwayCont_);
  }
  if (!this.upperContWk_) {
    this.upperContWk_ = goog.dom.createDom('div', [
      goog.getCssName('wk-event-grip-cont'),
      goog.getCssName('wk-event-grip-cont-upper')])
    this.attachGripChildren_(this.upperContWk_, true);
  }
  if (!this.lowerContWk_) {
    this.lowerContWk_ = goog.dom.createDom('div', [
      goog.getCssName('wk-event-grip-cont'),
      goog.getCssName('wk-event-grip-cont-lower')])
    this.attachGripChildren_(this.lowerContWk_, true);
  }
  if (!this.leftContMn_) {
    this.leftContMn_ = goog.dom.createDom('div', [
      goog.getCssName('mn-event-grip-cont'),
      goog.getCssName('mn-event-grip-cont-left')])
    this.attachGripChildren_(this.leftContMn_, false);
  }
  if (!this.rightContMn_) {
    this.rightContMn_ = goog.dom.createDom('div', [
      goog.getCssName('mn-event-grip-cont'),
      goog.getCssName('mn-event-grip-cont-right')])
    this.attachGripChildren_(this.rightContMn_, false);
  }
  if (!this.leftContAd_) {
    this.leftContAd_ = this.leftContMn_.cloneNode(false);
    goog.dom.classes.add(this.leftContAd_,
        goog.getCssName('ad-event-grip-cont'));
    this.attachGripChildren_(this.leftContAd_, false, true);
  }
  if (!this.rightContAd_) {
    this.rightContAd_ = this.rightContMn_.cloneNode(false);
    goog.dom.classes.add(this.rightContAd_,
        goog.getCssName('ad-event-grip-cont'));
    this.attachGripChildren_(this.rightContAd_, false, true);
  }

  if (allDayChip) {
    var chipClassName = chip.className;

    var re = new RegExp(rflect.cal.predefined.chips.CHIP_EVENT_CLASS + '\\d+');
    var chipIdClass = re.exec(chipClassName);

    this.farAwayCont_.appendChild(this.leftContAd_);
    this.farAwayCont_.appendChild(this.rightContAd_);

    var chips = this.getDomHelper().getElement('alldayevents-grid')
        .querySelectorAll('.' + chipIdClass);
    goog.array.forEach(chips, goog.partial(this.addChipGripInner_, weekChip,
        allDayChip, startIsCutWkRe, endIsCutWkRe,
        startIsCutMnRe, endIsCutMnRe, this.upperContWk_, this.lowerContWk_,
        this.leftContMn_, this.rightContMn_, this.leftContAd_,
        this.rightContAd_, this.farAwayCont_));
  } else
    this.addChipGripInner_(weekChip, allDayChip,
        startIsCutWkRe, endIsCutWkRe, startIsCutMnRe, endIsCutMnRe,
        this.upperContWk_, this.lowerContWk_, this.leftContMn_,
        this.rightContMn_, this.leftContAd_, this.rightContAd_,
        this.farAwayCont_, chip);

}


/**
 * Adds grip to one chip.
 * @param {boolean} aWeekChip Whether chip is of week type, if false - month
 * type.
 * @param {boolean} aAllDayChip Whether it's an all-day chip.
 * @param {RegExp} aStartIsCutWkRe Whether week chip start is cut regexp.
 * @param {RegExp} aEndIsCutWkRe Whether week chip end is cut regexp.
 * @param {RegExp} aStartIsCutMnRe Whether month chip start is cut regexp.
 * @param {RegExp} aEndIsCutMnRe Whether month chip end is cut regexp.
 * @param {Element} aUpperContWk Week first grip cont.
 * @param {Element} aLowerContWk Week second grip cont.
 * @param {Element} aLeftContMn Month first grip cont.
 * @param {Element} aRightContMn Month second grip cont.
 * @param {Element} aLeftContAd All-day first grip cont.
 * @param {Element} aRightContAd All-day second grip cont.
 * @param {Element} aFarAwayCont Temporary cont.
 * @param {Element} aChip Chip element.
 * @private
 */
rflect.cal.ui.MainPane.prototype.addChipGripInner_ =
    function(aWeekChip, aAllDayChip, aStartIsCutWkRe, aEndIsCutWkRe,
             aStartIsCutMnRe, aEndIsCutMnRe, aUpperContWk, aLowerContWk,
             aLeftContMn, aRightContMn, aLeftContAd, aRightContAd, aFarAwayCont,
             aChip) {
  var chipClassName = aChip.className;

  if (aAllDayChip) {

    if (!aStartIsCutMnRe.test(chipClassName)) aChip.appendChild(aLeftContAd);
    if (!aEndIsCutMnRe.test(chipClassName)) aChip.appendChild(aRightContAd);

  } else if (aWeekChip) {

    aFarAwayCont.appendChild(aUpperContWk);
    aFarAwayCont.appendChild(aLowerContWk);

    if (!aStartIsCutWkRe.test(chipClassName)) aChip.appendChild(aUpperContWk);
    if (!aEndIsCutWkRe.test(chipClassName)) aChip.appendChild(aLowerContWk);

  } else {

    aFarAwayCont.appendChild(aLeftContMn);
    aFarAwayCont.appendChild(aRightContMn);

    if (!aStartIsCutMnRe.test(chipClassName)) aChip.appendChild(aLeftContMn);
    if (!aEndIsCutMnRe.test(chipClassName)) aChip.appendChild(aRightContMn);

  }
}


/**
 * @param {Element} aContainer Grip container to attach children to.
 * @param {boolean} aWeekType Whether generate week type grips, if false - month
 * type will be created.
 * @param {boolean=} opt_allDayType Whether add all-day class to elements.
 * @private
 */
rflect.cal.ui.MainPane.prototype.attachGripChildren_ = function(aContainer,
    aWeekType, opt_allDayType) {

  if (aWeekType) {

    var firstEl = goog.dom.createDom('div', ['wk-event-grip',
      goog.getCssName('wk-event-grip-lower')]);
    var secondEl = goog.dom.createDom('div', ['wk-event-grip',
      goog.getCssName('wk-event-grip-upper')]);

  } else {

    var firstEl = goog.dom.createDom('div', ['mn-event-grip',
      goog.getCssName('mn-event-grip-left')]);
    var secondEl = goog.dom.createDom('div', ['mn-event-grip',
      goog.getCssName('mn-event-grip-right')]);
    if (opt_allDayType) {
      goog.dom.classes.add(firstEl, goog.getCssName('ad-event-grip'));
      goog.dom.classes.add(secondEl, goog.getCssName('ad-event-grip'));
    }
  }

  aContainer.appendChild(firstEl);
  aContainer.appendChild(secondEl);
}


/**
 * Removes grip from chip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.removeChipGrip_ = function() {
  goog.dom.removeNode(this.upperContWk_);
  goog.dom.removeNode(this.lowerContWk_);
  goog.dom.removeNode(this.leftContMn_);
  goog.dom.removeNode(this.rightContMn_);
  goog.dom.removeNode(this.leftContAd_);
  goog.dom.removeNode(this.rightContAd_);
}


/**
 * Weeknum label click handler.
 * @param {string} aId Id of daynum label.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onDaynumLabelClick_ = function(aId) {
  var index = rflect.string.get2DigitIndex(aId);
  var day = this.timeManager_.daySeries[index];
  if (day)
    this.switchView_(day, rflect.cal.ViewType.DAY);
}


/**
 * Weeknum label click handler.
 * @param {string} aId Id of weeknum label.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onWeeknumLabelClick_ = function(aId) {
  var index = rflect.string.get2DigitIndex(aId);
  var day = this.timeManager_.daySeries[7 * index];
  if (day)
    this.switchView_(day, rflect.cal.ViewType.WEEK);
}


/**
 * Switches view from main pane ui, like from daylabel click.
 * @param {rflect.date.DateShim} aDate Date to set basis to.
 * @param {rflect.cal.ViewType} aType Type to stitch to.
 * @private
 */
rflect.cal.ui.MainPane.prototype.switchView_ = function(aDate, aType) {
  this.timeManager_.setBasis(new goog.date.DateTime(aDate.getYear(),
    aDate.getMonth(), aDate.getDate()));
  this.viewManager_.showView(aType, this);
}


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of week grid.
 * @return {boolean} For week mode, whether class name indicates that this is a
 * week grid.
 */
rflect.cal.ui.MainPane.prototype.isWeekGrid = function(aClassName) {
  var weekGridRe_ = this.weekGridRe_ || (this.weekGridRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('wk-events-layer'),
      goog.getCssName('expand-sign-wk-cont'),
      goog.getCssName('expand-sign-wk'),
      goog.getCssName('grid-table-row'),
      goog.getCssName('today-mask-wk'),
      goog.getCssName('time-marker'),
      // In IE7, we could click on main-pane if we click near upper edge of
      //scrollable
      goog.getCssName('main-pane')));
  return this.viewManager_.isInWeekMode() && weekGridRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of allday grid.
 * @return {boolean} For week mode, whether class name indicates that this is an
 * allday grid.
 */
rflect.cal.ui.MainPane.prototype.isAlldayGrid = function(aClassName) {
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
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a month grid.
 */
rflect.cal.ui.MainPane.prototype.isMonthGrid = function(aClassName) {
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
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a zippy.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isZippy_ = function(aClassName) {
  return rflect.string.buildClassNameRe(
      goog.getCssName('zippy')).test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a daynum label.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isDaynumLabel_ = function(aClassName) {
  var daynumLabelRe_ = this.daynumLabelRe_ || (this.daynumLabelRe_ =
      rflect.string.buildClassNameRe(
      goog.getCssName('daynum-label'), goog.getCssName('dayname-wk-inner')));
  return daynumLabelRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a weeknum label.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isWeeknumLabel_ = function(aClassName) {
  var weeknumLabelRe_ = this.weeknumLabelRe_ || (this.weeknumLabelRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('weeknum-label-inner')));
  return weeknumLabelRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a week chip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isWeekChip_ = function(aClassName) {
  var chipWeekRe_ = this.chipWeekRe_ || (this.chipWeekRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('event-rect-wk-inner')));

  return chipWeekRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an child element of chip element
 * (but not grip!).
 * @private
 */
rflect.cal.ui.MainPane.prototype.isChipChild_ = function(aClassName) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('event-wk-timelabel'));

  return re.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a month chip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isMonthChip_ = function(aClassName) {
  var chipMonthRe_ = this.chipMonthRe_ || (this.chipMonthRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('event-rect-mn-inner')));
  return chipMonthRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is some chip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isChip_ = function(aClassName) {
  return this.isWeekChip_(aClassName) || this.isMonthChip_(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is chip or one of its children.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isChipOrChild_ = function(aClassName) {
  return this.isChip_(aClassName) || this.isChipChild_(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an all-day chip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isAllDayChip_ = function(aClassName) {
  var chipAllDayRe_ = this.chipAllDayRe_ || (this.chipAllDayRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('event-rect-all-day')));
  return chipAllDayRe_.test(aClassName);
};


/**
 * @param {string} aTargetClassName Class name of element.
 * @param {Element=} opt_target Element to test.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isStartGripCont_ =
    function(aTargetClassName, opt_target) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip-cont-upper'),
      goog.getCssName('mn-event-grip-cont-left'));
  if (re.test(aTargetClassName))
    return true;
  if (opt_target && this.isGripContChild_(aTargetClassName))
    return this.isStartGripCont_(opt_target.parentNode.className);
  return false;
};


/**
 * @param {string} aTargetClassName Class name of element.
 * @param {Element=} opt_target Element to test.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isEndGripCont_ =
    function(aTargetClassName, opt_target) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip-cont-lower'),
      goog.getCssName('mn-event-grip-cont-right'));
  if (re.test(aTargetClassName))
    return true;
  if (opt_target && this.isGripContChild_(aTargetClassName))
    return this.isEndGripCont_(opt_target.parentNode.className);
  return false;
};


/**
 * @param {string} aTargetClassName Class name of element.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isGripContChild_ =
    function(aTargetClassName) {
  var re = rflect.string.buildClassNameRe('wk-event-grip', 'mn-event-grip');
  return re.test(aTargetClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an all-day grip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isAllDayGrip_ = function(aClassName) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('ad-event-grip-cont'),
      goog.getCssName('ad-event-grip'));
  return re.test(aClassName);
}


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an week grip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isWeekGrip_ = function(aClassName) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip-cont'),
      'wk-event-grip');
  return re.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an week grip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isMonthGrip_ = function(aClassName) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('mn-event-grip-cont'), 'mn-event-grip');
  return re.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an any grip.
 * @private
 */
rflect.cal.ui.MainPane.prototype.isGrip_ = function(aClassName) {
  return this.isAllDayGrip_(aClassName) || this.isWeekGrip_(aClassName) ||
      this.isMonthGrip_(aClassName);
}


/**
 * Main pane mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onMouseDown_ = function(aEvent) {

  this.containerSizeMonitor_.checkForContainerSizeChange();
  this.updateBeforeRedraw(false, true);

  var className = aEvent.target.className;
  var preventDefaultIsNeeded = false;
  var maskConfiguration;
  // Whether we clicked on hollow space.
  if (this.isWeekGrid(className)) {

    this.selectionMask_.init(
        maskConfiguration = /**@type {number}*/
        (rflect.cal.ui.MainPaneSelectionMask.Configuration.WEEK),
        aEvent);

    preventDefaultIsNeeded = true;

  } else if (this.isAlldayGrid(className)) {

    this.selectionMask_.init(
        maskConfiguration = /**@type {number}*/
        (rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY),
        aEvent);

    preventDefaultIsNeeded = true;

  } else if (this.isMonthGrid(className)) {

    if (!this.isDaynumLabel_(className))
      this.selectionMask_.init(
          maskConfiguration = /**@type {number}*/
          (rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH), aEvent);

    preventDefaultIsNeeded = true;

  } else if (this.isChipOrChild_(className) || this.isGrip_(className)) {

    this.startChipDrag_(aEvent, className);
    preventDefaultIsNeeded = true;

  }

  if (preventDefaultIsNeeded)
    aEvent.preventDefault();

};


/**
 * Main pane mousemove handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onMouseMove_ = function(aEvent) {
  if (this.selectionMask_.isInitialized()) {
    this.selectionMask_.update(aEvent);

    this.chipWasDragged_ = this.selectionMask_.wasDragged();

    aEvent.preventDefault();
  }

};


/**
 * Main pane mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onMouseUp_ = function (aEvent) {
  if (this.selectionMask_.isInitialized()) {

    if (this.selectionMask_.isDragType()) {
      if (this.chipWasDragged_) {
        this.endChipDrag_();
      }
    } else {
      this.saveDialog_.setVisible(true);
      this.beginEventCreation_();
    }

    this.selectionMask_.close();
    aEvent.preventDefault();
  }
}


/**
 * @param {goog.events.Event} aEvent Event object.
 * @param {string} aTargetClassName Chip class name.
 * @private
 */
rflect.cal.ui.MainPane.prototype.startChipDrag_ = function(aEvent,
    aTargetClassName) {
  var maskConfiguration;
  var target = aEvent.target;

  var calendarEvent = this.getEventByTarget_(
      /**@type {Element}*/(target));

  if (this.eventManager_.eventIsInProgress(calendarEvent.id))
    return;

  var chipElement = this.getChipElement_(/**@type {Element}*/(target));
  var eventClassName = chipElement.className;

  var isStartGrip = this.isStartGripCont_(aTargetClassName,
      /**@type {Element}*/ (target));
  var isEndGrip = this.isEndGripCont_(aTargetClassName,
      /**@type {Element}*/ (target));

  if (this.isWeekChip_(eventClassName) || this.isWeekGrip_(eventClassName))
    maskConfiguration = rflect.cal.ui.MainPaneSelectionMask.Configuration.WEEK;
  // Test for all-day chip first, because it's a month chip, too.
  else if (this.isAllDayChip_(eventClassName) ||
      this.isAllDayGrip_(eventClassName))
    maskConfiguration =
        rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY;
  else if (this.isMonthChip_(eventClassName) ||
      this.isMonthGrip_(eventClassName))
    maskConfiguration =
        rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH;

  this.selectionMask_.init(/**@type {number}*/ (maskConfiguration), aEvent,
      calendarEvent, isStartGrip, isEndGrip);
  this.chipWasDragged_ = false;
}


/**
 * @private
 */
rflect.cal.ui.MainPane.prototype.endChipDrag_ = function() {
  this.chipWasDragged_ = false;

  this.eventManager_.eventHolder.openSession(
      this.selectionMask_.getCalendarEvent());
  this.eventManager_.eventHolder.setStartDate(
      this.selectionMask_.startDate);
  this.eventManager_.eventHolder.setEndDate(
      this.selectionMask_.endDate);
  this.eventManager_.setLastUsedCalendarId(
      this.eventManager_.eventHolder.getCurrentEvent().calendarId);

  this.transport_.saveEventAsync(this.eventManager_.eventHolder.endWithEdit());
  this.updateAfterSave_();
}


/**
 * Main pane selectstart handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onSelectStart_ = function(aEvent) {
  var className = aEvent.target.className;

  // Whether we clicked on grid space.
  if (this.isWeekGrid(className) || this.isAlldayGrid(className) ||
      this.isMonthGrid(className))
    aEvent.preventDefault();
};


/**
 * Begins phase of event creation.
 * @private
 */
rflect.cal.ui.MainPane.prototype.beginEventCreation_ = function() {

  this.eventManager_.eventHolder.openSession();
  this.eventManager_.eventHolder.setStartDate(
      this.selectionMask_.startDate);
  this.eventManager_.eventHolder.setEndDate(
      this.selectionMask_.endDate);
  this.eventManager_.eventHolder.setAllDay(
      this.selectionMask_.isAllDay() || this.selectionMask_.isMonth());
}


/**
 * Save dialog button listener.
 * @param {rflect.ui.Dialog.Event} aEvent Event object.
 */
rflect.cal.ui.MainPane.prototype.onSaveDialogButtonSelect_ = function(aEvent) {
  if (aEvent.key == this.saveDialog_.getButtonSet().getDefault()) {
    this.eventManager_.eventHolder.setSummary(
        this.saveDialog_.getEventName());
    this.eventManager_.eventHolder.setCalendarId(
        this.saveDialog_.getCalendarId());
    this.eventManager_.setLastUsedCalendarId(
        this.eventManager_.eventHolder.getCurrentEvent().calendarId);

    this.transport_.saveEventAsync(this.eventManager_.eventHolder.endWithAdd());
    this.updateAfterSave_();
  } else if (aEvent.key != this.saveDialog_.getButtonSet().getCancel()) {
    //Edit button.
    this.saveDialog_.dispatchEvent({type: rflect.cal.ui.SaveDialog.EVENT_EDIT});
  }
}


/**
 * Event edit listener. Called when edit link is clicked from save or edit
 * dialog.
 * @param {Event} aEvent Event object.
 */
rflect.cal.ui.MainPane.prototype.onEventEdit_ = function(aEvent) {
  this.getParent().showEventPane(true, aEvent.target == this.saveDialog_);
}


/**
 * Edit dialog button listener.
 * @param {{type: string}} aEvent Event object.
 */
rflect.cal.ui.MainPane.prototype.onEditDialogButtonSelect_ = function(aEvent) {

  if (aEvent.key == this.editDialog_.getButtonSet().getDefault()) {

    this.editDialog_.dispatchEvent({type:
        rflect.cal.ui.SaveDialog.EVENT_EDIT});

  } else if (aEvent.key != this.editDialog_.getButtonSet().getCancel()) {
    // The only spare button - delete.

    let deletedEvent = this.eventManager_.eventHolder.endWithDelete();
    this.transport_.deleteEventAsync(deletedEvent);

    this.updateAfterDelete_(deletedEvent);
  }
}


/**
 * @param {rflect.cal.Transport.SaveEventEvent} aEvent Event object.
 */
rflect.cal.ui.MainPane.prototype.onSaveEvent_ = function(aEvent) {
  var eventId = aEvent.eventId;

  var mp = this.getDomHelper().getElement(this.getId());
  mp && goog.array.forEach(mp.querySelectorAll('.' +
      rflect.cal.predefined.chips.CHIP_EVENT_CLASS + eventId), function(el) {
    goog.dom.classes.remove(el, goog.getCssName('event-in-progress'));
    goog.dom.classes.remove(el,
        this.eventManager_.getEventIsInProgressClass(eventId));
  }, this);
}


/**
 * Main pane scroll handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainPane.prototype.onMainPaneScrollableScroll_ =
    function(aEvent) {
  var scrollable = aEvent.target;
  var scrollLeft = 0;
  var scrollTop = 0;

  if (this.viewManager_.isInWeekMode()) {

    scrollLeft = scrollable.scrollLeft;
    scrollTop = scrollable.scrollTop;

    if (scrollable ==
        this.getDomHelper().getElement(rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_HEADER_SCROLLABLE)) {

      this.blockManager_.blockPoolAllDay.scrollTop = scrollTop;

    } else {

      this.blockManager_.blockPoolWeek.scrollLeft = scrollLeft;
      this.blockManager_.blockPoolWeek.scrollTop = scrollTop;

      if (!this.containerSizeMonitor_.isSmallScreen()){
        this.blockManager_.blockPoolAllDay.scrollLeft = scrollLeft;

        this.getDomHelper().getElement('weekmode-daynames-table').style.left =
            '-' + scrollLeft + 'px';
        this.getDomHelper().getElement(
        rflect.cal.predefined.MainPane.ELEMENT_ID.MAIN_PANE_HEADER_SCROLLABLE)
            .scrollLeft = scrollLeft;
      }
    }

  } else if (this.viewManager_.isInMonthMode()) {

    scrollTop = scrollable.scrollTop;
    this.blockManager_.blockPoolMonth.scrollTop = scrollTop;

    this.getDomHelper().getElement('monthmode-zippies-table').style.top = '-' +
        scrollTop + 'px';

  }
};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.ui.MainPane.prototype.disposeInternal = function() {

  this.removeScrollListeners_();

  this.viewManager_ = null;
  this.timeManager_ = null;
  this.containerSizeMonitor_ = null;

  this.farAwayCont_ = null;
  this.upperContWk_ = null;
  this.lowerContWk_ = null;
  this.leftContMn_ = null;
  this.rightContMn_ = null;
  this.leftContAd_ = null;
  this.rightContAd_ = null;

  if (rflect.TOUCH_INTERFACE_ENABLED)
    this.momentumScroller_.dispose();

  this.touchHoldHelper_.dispose();

  rflect.cal.ui.MainPane.superClass_.disposeInternal.call(this);
};
