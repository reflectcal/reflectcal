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
goog.require('goog.userAgent');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.MainPaneBuilder');
goog.require('rflect.cal.MainPaneSelectionMask');
goog.require('rflect.cal.MouseOverRegistry');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.predefined.chips');
goog.require('rflect.cal.TimeMarker');
goog.require('rflect.string');
goog.require('rflect.cal.ui.EditDialog');
goog.require('rflect.cal.ui.SaveDialog');



/**
 * Main pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.MainPane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aBlockManager) {
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
   * Time marker.
   * @type {rflect.cal.TimeMarker}
   * @private
   */
  this.timeMarker_ = new rflect.cal.TimeMarker(aViewManager, aTimeManager);

  /**
   * Main pane builder.
   * @type {rflect.cal.MainPaneBuilder}
   * @private
   */
  this.mainPaneBuilder_ = new rflect.cal.MainPaneBuilder(this.viewManager_,
      this, aTimeManager, this.eventManager_, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllDay, this.blockManager_.blockPoolMonth,
      this.containerSizeMonitor_, this.timeMarker_);
  if (goog.DEBUG)
    _inspect('mainPaneBuilder', this.mainPaneBuilder_);


  /**
   * Selection mask.
   * @type {rflect.cal.MainPaneSelectionMask}
   * @private
   */
  this.selectionMask_ = new rflect.cal.MainPaneSelectionMask(aViewManager, this,
      aTimeManager, this.blockManager_.blockPoolWeek,
      this.blockManager_.blockPoolAllDay, this.blockManager_.blockPoolMonth);
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
   * @type {Array.<number>}
   * @private
   */
  this.scrollListenersKeys_ = [];
  
  /**
   * Mouse over registry.
   * @type {rflect.cal.MouseOverRegistry}
   * @private
   */
  this.moRegistry_ = new rflect.cal.MouseOverRegistry();

  /**
   * Popup save dialog.
   * @type {rflect.cal.ui.SaveDialog}
   * @private
   */
  this.saveDialog_ = new rflect.cal.ui.SaveDialog();
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

};
goog.inherits(rflect.cal.MainPane, rflect.ui.Component);


/**
 * Regexp for detection of week grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.weekGridRe_;


/**
 * Regexp for detection of allday grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.alldayGridRe_;


/**
 * Regexp for detection of month grid.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.monthGridRe_;


/**
 * Regexp for detection of daynum label.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.daynumLabelRe_;


/**
 * Regexp for detection of weeknum label.
 * @type {RegExp}
 * @private
 */
rflect.cal.MainPane.prototype.daynumLabelRe_;


/**
 * Whether chip was dragged.
 * @type {boolean}
 * @private
 */
rflect.cal.MainPane.prototype.chipWasDragged_;


/**
 * Container placed out of sight, used to store grips temporary.
 * @type {Element}
 * @private
 */
rflect.cal.MainPane.prototype.farAwayCont_;


/**
 * Grip container, week, upper.
 * @type {Element}
 * @private
 */
rflect.cal.MainPane.prototype.upperContWk_;


/**
 * Grip container, week, lower.
 * @type {Element}
 * @private
 */
rflect.cal.MainPane.prototype.lowerContWk_;


/**
 * Grip container, month, left.
 * @type {Element}
 * @private
 */
rflect.cal.MainPane.prototype.leftContMn_;


/**
 * Grip container, month, right.
 * @type {Element}
 * @private
 */
rflect.cal.MainPane.prototype.rightContMn_;


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
  return this.blockManager_.blockPoolAllDay.expanded;
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
 * Sets initial sizes for scrollables.
 * @private
 */
rflect.cal.MainPane.prototype.setDefaultSizes_ = function() {
  if (this.viewManager_.isInWeekMode()) {
    this.alldayGridContainerSize =
        rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.clone();
    this.alldayGridSize = this.alldayGridContainerSize.clone();
    this.gridContainerSize =
        rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE.clone();
    this.gridSize = this.gridContainerSize.clone();
  } else if (this.viewManager_.isInMonthMode()) {
    this.gridContainerSize =
        rflect.cal.predefined.MONTH_SCROLLABLE_DEFAULT_SIZE.clone();
    this.gridSize = this.gridContainerSize.clone();
  }
  // Update blocks, get their capacity and size.
  this.updateBlockManager();
}


/**
 * Updates main pane with new data before redraw. Includes size adjustment.
 * @param {boolean=} opt_doNotRemoveScrollListeners Whether not to remove scroll
 * listeners.
 */
rflect.cal.MainPane.prototype.updateBeforeRedraw = function(
    opt_doNotRemoveScrollListeners) {
  if (this.getParent().firstBuildWk && this.viewManager_.isInWeekMode() ||
      this.getParent().firstBuildMn && this.viewManager_.isInMonthMode())
    return this.setDefaultSizes_();

  // Take current viewport size.
  var containerSize = this.containerSizeMonitor_.getSize();
  var staticSizes;

  // Begin size adjustment phase.
  if (this.viewManager_.isInWeekMode()) {
    staticSizes = this.getParent().staticSizesWk;

    this.scrollablesCombinedWkSize_ = containerSize.clone();
    // We calculate combined height of two scrollables.
    this.scrollablesCombinedWkSize_.height -= staticSizes.height;
    this.scrollablesCombinedWkSize_.width -= staticSizes.width;

    this.alldayGridContainerSize = this.scrollablesCombinedWkSize_.clone();
    this.gridContainerSize = this.scrollablesCombinedWkSize_.clone();

    // By default, grid has the same size as scrollable but fixed height.
    this.gridSize = this.gridContainerSize.clone();
    this.gridSize.height =
        rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE.height;
    // No need to subtract scrollbar width here because layout already takes
    // it into account.

    this.alldayGridContainerSize.height =
        rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.height;
    this.alldayGridSize = this.alldayGridContainerSize.clone();

    // ... else, in case when allday scrollable is expanded, we should
    // calculate it's size depending on block capacity, so pass on for now.

  } else if (this.viewManager_.isInMonthMode()) {
    staticSizes = this.getParent().staticSizesMn;

    this.gridContainerSize = containerSize.clone();
    this.gridContainerSize.height -= staticSizes.height;
    this.gridContainerSize.width -= staticSizes.width;

    //Subtract weeknum width. TODO(alexk): is it avoidable?
    this.gridContainerSize.width -=
        rflect.cal.predefined.WEEK_NUMBERS_CONTAINER_WIDTH;

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

  if (!opt_doNotRemoveScrollListeners)
    this.removeScrollListeners_();
};


/**
 * Adds scroll listeners on each update that involves expanded scrollable.
 * @private
 */
rflect.cal.MainPane.prototype.addScrollListeners_ = function() {
  if (this.viewManager_.isInWeekMode()) {

    this.scrollListenersKeys_.push(goog.events.listen(
        this.getDomHelper().getElement('main-pane-body-scrollable-wk'),
        goog.events.EventType.SCROLL, this.onMainPaneScrollableScroll_, false,
        this));
    if (this.blockManager_.blockPoolAllDay.expanded)
      this.scrollListenersKeys_.push(goog.events.listen(
          this.getDomHelper().getElement('main-pane-header-scrollable'),
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
  this.getElement().innerHTML = this.build();

  if (this.getParent().firstBuildWk && this.viewManager_.isInWeekMode()) {
    this.getParent().rebuildMPWithSizes();
    return;
  }
  if (this.getParent().firstBuildMn && this.viewManager_.isInMonthMode()) {
    this.getParent().rebuildMPWithSizes();
    return;
  }

  // We add scroll listeners on freshly built content.
  this.addScrollListeners_();
  // Return to previous scrollTop, scrollLeft values, if any.
  if (this.viewManager_.isInWeekMode()) {
    var headerScrollable =
        this.getDomHelper().getElement('main-pane-header-scrollable');
    var mainScrollable =
        this.getDomHelper().getElement('main-pane-body-scrollable-wk');

    if (this.blockManager_.blockPoolWeek.expanded)
      mainScrollable.scrollLeft =
          headerScrollable.scrollLeft =
          this.blockManager_.blockPoolWeek.scrollLeft;
    if (this.blockManager_.blockPoolAllDay.expanded)
      headerScrollable.scrollTop =
          this.blockManager_.blockPoolAllDay.scrollTop;
    mainScrollable.scrollTop =
        this.blockManager_.blockPoolWeek.scrollTop;

  } else if (this.viewManager_.isInMonthMode()) {
    if (this.blockManager_.blockPoolMonth.expanded)
      this.getDomHelper().getElement('main-pane-body-scrollable-mn').scrollTop =
          this.blockManager_.blockPoolMonth.scrollTop;
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @protected
 */
rflect.cal.MainPane.prototype.buildInternal = function(aSb) {
  var firstBuild;

  if (this.viewManager_.isInMonthMode()) {
    firstBuild = this.getParent().firstBuildMn;
    this.mainPaneBuilder_.buildBodyInternalMonth_(aSb, firstBuild);
  } else if (this.viewManager_.isInWeekMode()) {
    firstBuild = this.getParent().firstBuildWk;
    this.mainPaneBuilder_.buildBodyInternalWeek_(aSb, firstBuild);
  }
};


/**
 * Redraws just week grid.
 * @private
 */
rflect.cal.MainPane.prototype.updateByRedrawWeekGrid_ = function() {
  var sb = new goog.string.StringBuffer();
  this.mainPaneBuilder_.buildWeekGrid(sb);
  this.getDomHelper().getElement('grid-table-wk').innerHTML = sb.toString();
}


/**
 * Redraws just all-day grid.
 * @private
 */
rflect.cal.MainPane.prototype.updateByRedrawAllDayGrid_ = function() {
  var sb = new goog.string.StringBuffer();
  this.mainPaneBuilder_.buildAllDayGrid(sb);
  this.getDomHelper().getElement('alldayevents-grid').innerHTML = sb.toString();
}


/**
 * Redraws just week grid.
 * @private
 */
rflect.cal.MainPane.prototype.updateByRedrawMonthGrid_ = function() {
  var sb = new goog.string.StringBuffer();
  this.mainPaneBuilder_.buildMonthGrid(sb);
  this.getDomHelper().getElement('grid-table-mn').innerHTML = sb.toString();
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
rflect.cal.MainPane.prototype.updateConditionally_ = function(
    aConditionToUpdateAllDay, aConditionToUpdateWeek, aConditionToUpdateMonth) {

  // We need to detect IE8 because it doesn't allow changing of table's
  // innerHTML.
  var isIE8OrLower = goog.userAgent.IE &&
      goog.userAgent.compare(goog.userAgent.VERSION, '8') <= 0;

  this.eventManager_.run();

  this.updateBeforeRedraw();

  if (this.viewManager_.isInWeekMode() &&
      !this.blockManager_.blockPoolWeek.expanded &&
      !this.blockManager_.blockPoolAllDay.expanded &&
      !isIE8OrLower) {

    if (aConditionToUpdateAllDay)
      this.updateByRedrawAllDayGrid_();

    if (aConditionToUpdateWeek)
      this.updateByRedrawWeekGrid_();

  } else if (this.viewManager_.isInMonthMode() &&
      !this.blockManager_.blockPoolMonth.expanded && !isIE8OrLower) {

    if (aConditionToUpdateMonth)
      this.updateByRedrawMonthGrid_();

  } else

    this.updateByRedraw();
}


/**
 * Redraws component after event was deleted.
 * @private
 */
rflect.cal.MainPane.prototype.updateAfterDelete_ = function() {
  var allDay = this.eventManager_.eventHolder.getBackUpEvent().allDay;

  this.updateConditionally_(allDay, !allDay, true);
}


/**
 * Redraws component after event was added.
 * @private
 */
rflect.cal.MainPane.prototype.updateAfterSave_ = function() {
  this.updateConditionally_(
      this.selectionMask_.isAllDay(), this.selectionMask_.isWeek(),
      this.selectionMask_.isMonth());
}


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
      this.onMouseUp_, false, this)
      .listen(this.saveDialog_, rflect.cal.ui.SaveDialog.EVENT_EDIT,
      this.onEventEdit_, false, this)
      .listen(this.saveDialog_, rflect.ui.Dialog.EventType.SELECT,
      this.onSaveDialogButtonSelect_, false, this)
      .listen(this.editDialog_, rflect.cal.ui.SaveDialog.EVENT_EDIT,
      this.onEventEdit_, false, this)
      .listen(this.editDialog_, rflect.ui.Dialog.EventType.SELECT,
      this.onEditDialogButtonSelect_, false, this);

  this.timeMarker_.start();
};


/**
 * Main pane click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onClick_ = function(aEvent) {
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
      this.blockManager_.blockPoolAllDay.toggleBlock(0);

      zippyClicked = true;
    } else if (this.isDaynumLabel_(className))
      this.onDaynumLabelClick_(target.parentNode.id);
  }

  if (zippyClicked) {

    this.updateBeforeRedraw();
    this.updateByRedraw();

  } else if (this.isChip_(className) && !this.selectionMask_.wasDragged()) {

    this.showEventEditComponent_(target, className);

  }
};


/**
 * Main pane double click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onDoubleClick_ = function(aEvent) {
  var target = /** @type {Element}*/ (aEvent.target);
  var id = target.id;
  var className = target.className;

  if (this.isChip_(className)) {
    this.showEventEditComponent_(target, className, true);
  }

  aEvent.preventDefault();
};



/**
 * @param {Element} aTarget Element that was interacted with.
 * @return {rflect.cal.events.Event} Found event or null.
 */
rflect.cal.MainPane.prototype.getEventByTarget_ =
    function(aTarget) {
  var chip = this.getChipElement_(aTarget);
  var className = chip.className;

  var eventId = rflect.string.getNumericIndexWithPrefix(className,
      rflect.cal.predefined.chips.CHIP_EVENT_CLASS);
  var event = this.eventManager_.getEventById(eventId);
  return event;
}


/**
 * @param {Element} aTarget Element that was interacted with.
 * @return {Element} Found chip or null.
 */
rflect.cal.MainPane.prototype.getChipElement_ = function(aTarget) {
  var gripRe = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip'),
      goog.getCssName('mn-event-grip')
  );
  var gripContRe = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip-cont'),
      goog.getCssName('mn-event-grip-cont')
  );

  if (aTarget.className == goog.getCssName('event-wk-timelabel'))
    return /**@type {Element}*/ (aTarget.parentNode);
  if (gripContRe.test(aTarget.className))
    return /**@type {Element}*/ (aTarget.parentNode);
  if (gripRe.test(aTarget.className))
    return /**@type {Element}*/ (aTarget.parentNode.parentNode);

  return aTarget;
}


/**
 * @param {Element} aTarget Element that was clicked to invoke dialog.
 * @param {string} aChipClassName Class name of chip.
 * @param {boolean=} aShowPane Whether to show event edit pane.
 */
rflect.cal.MainPane.prototype.showEventEditComponent_ = function(aTarget,
                                                         aChipClassName,
                                                         aShowPane) {

  var event = this.getEventByTarget_(aTarget);

  if (event) {

    if (aShowPane) {
      this.getParent().showEventPane(true);
      this.editDialog_.setVisible(false);
    } else {
      this.editDialog_.setVisible(true);
      this.editDialog_.setEventName(event.summary);
      this.editDialog_.setEventTimeString(event.toHumanString());
    }

    this.eventManager_.eventHolder.openSession(event);
  }
}


/**
 * Main pane mouseout handler.
 */
rflect.cal.MainPane.prototype.onMouseOut_ = function(aEvent) {
  var target = aEvent.target;
  var relatedTarget = aEvent.relatedTarget;
  var id = target.id;
  var className = target.className;
  if (this.isDaynumLabel_(className) || this.isWeeknumLabel_(className) ||
      this.isZippy_(className))
    this.moRegistry_.deregisterTarget();

  if (this.isWeekChip_(className)) {
    this.removeChipGrip_();
  } else if (this.isAllDayChip_(className)) {
    this.addChipGrip_(target, false, true);
  } else if (this.isMonthChip_(className)) {
    this.addChipGrip_(target, false);
  }
}


/**
 * Main pane mouseover handler.
 */
rflect.cal.MainPane.prototype.onMouseOver_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  if (goog.DEBUG)
    _log('className', className);
  if (this.isDaynumLabel_(className) || this.isWeeknumLabel_(className))
    this.moRegistry_.registerTarget(target,
        goog.getCssName('label-underlined'));
  else if (this.isZippy_(className))
    this.moRegistry_.registerTarget(target,
        goog.getCssName('zippy-highlighted'));
  else
    this.moRegistry_.deregisterTarget();

  if (this.isWeekChip_(className)) {
    this.addChipGrip_(target, true);
  } else if (this.isAllDayChip_(className)) {
    this.addChipGrip_(target, false, true);
  } else if (this.isMonthChip_(className)) {
    this.addChipGrip_(target, false);
  } /*else
    this.removeChipGrip_();*/


}


/**
 * Adds grip to one or more chips.
 * @param {Element} aElement Chip element or its label.
 * @param {boolean} aWeekChip Whether is of week type, if false - month type.
 * @param {boolean=} opt_allDayChip Whether is of all-day type.
 * @private
 */
rflect.cal.MainPane.prototype.addChipGrip_ = function(aElement, aWeekChip,
                                                      opt_allDayChip) {
  var chip = this.getChipElement_(aElement);

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

  if (opt_allDayChip) {
    var chipClassName = chip.className;

    var re = new RegExp(rflect.cal.predefined.chips.CHIP_EVENT_CLASS + '\\d+');
    var chipIdClass = re.exec(chipClassName);

    this.farAwayCont_.appendChild(this.leftContAd_);
    this.farAwayCont_.appendChild(this.rightContAd_);

    var chips = this.getDomHelper().getElement('alldayevents-grid')
        .querySelectorAll('.' + chipIdClass);
    goog.array.forEach(chips, goog.partial(this.addChipGripInner_, aWeekChip,
        /**@type {boolean}*/(opt_allDayChip), startIsCutWkRe, endIsCutWkRe,
        startIsCutMnRe, endIsCutMnRe, this.upperContWk_, this.lowerContWk_,
        this.leftContMn_, this.rightContMn_, this.leftContAd_,
        this.rightContAd_, this.farAwayCont_));
  } else
    this.addChipGripInner_(aWeekChip, /**@type {boolean}*/(opt_allDayChip),
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
rflect.cal.MainPane.prototype.addChipGripInner_ =
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
rflect.cal.MainPane.prototype.attachGripChildren_ = function(aContainer,
    aWeekType, opt_allDayType) {

  if (aWeekType) {

    var firstEl = goog.dom.createDom('div', [goog.getCssName('wk-event-grip'),
      goog.getCssName('wk-event-grip-lower')]);
    var secondEl = goog.dom.createDom('div', [goog.getCssName('wk-event-grip'),
      goog.getCssName('wk-event-grip-upper')]);

  } else {

    var firstEl = goog.dom.createDom('div', [goog.getCssName('mn-event-grip'),
      goog.getCssName('mn-event-grip-left')]);
    var secondEl = goog.dom.createDom('div', [goog.getCssName('mn-event-grip'),
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
rflect.cal.MainPane.prototype.removeChipGrip_ = function() {
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
rflect.cal.MainPane.prototype.onDaynumLabelClick_ = function(aId) {
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
rflect.cal.MainPane.prototype.onWeeknumLabelClick_ = function(aId) {
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
rflect.cal.MainPane.prototype.switchView_ = function(aDate, aType) {
  this.timeManager_.setBasis(new goog.date.DateTime(aDate.getYear(),
    aDate.getMonth(), aDate.getDate()));
  this.viewManager_.showView(aType, this);
}


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
 * @param {string} aClassName Class name of element.
 * @private
 * @return {boolean} Whether this is a month grid.
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
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a zippy.
 * @private
 */
rflect.cal.MainPane.prototype.isZippy_ = function(aClassName) {
  return rflect.string.buildClassNameRe(
      goog.getCssName('zippy')).test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a daynum label.
 * @private
 */
rflect.cal.MainPane.prototype.isDaynumLabel_ = function(aClassName) {
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
rflect.cal.MainPane.prototype.isWeeknumLabel_ = function(aClassName) {
  var weeknumLabelRe_ = this.weeknumLabelRe_ || (this.weeknumLabelRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('weeknum-label-inner')));
  return weeknumLabelRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a week chip.
 * @private
 */
rflect.cal.MainPane.prototype.isWeekChip_ = function(aClassName) {
  var chipWeekRe_ = this.chipWeekRe_ || (this.chipWeekRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('event-rect-wk-inner'),
          goog.getCssName('event-wk-timelabel')
      ));

  return chipWeekRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is a month chip.
 * @private
 */
rflect.cal.MainPane.prototype.isMonthChip_ = function(aClassName) {
  var chipMonthRe_ = this.chipMonthRe_ || (this.chipMonthRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('event-rect-mn-inner'),
      goog.getCssName('mn-event-grip-cont'),
      goog.getCssName('mn-event-grip')
      ));
  return chipMonthRe_.test(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is some chip.
 * @private
 */
rflect.cal.MainPane.prototype.isChip_ = function(aClassName) {
  return this.isWeekChip_(aClassName) || this.isMonthChip_(aClassName);
};


/**
 * @param {string} aClassName Class name of element.
 * @return {boolean} Whether this is an all-day chip.
 * @private
 */
rflect.cal.MainPane.prototype.isAllDayChip_ = function(aClassName) {
  var chipAllDayRe_ = this.chipAllDayRe_ || (this.chipAllDayRe_ =
      rflect.string.buildClassNameRe(goog.getCssName('event-rect-all-day'),
          goog.getCssName('ad-event-grip-cont'),
          goog.getCssName('ad-event-grip')));
  return chipAllDayRe_.test(aClassName);
};


/**
 * @param {string} aTargetClassName Class name of element.
 * @param {Element=} opt_target Element to test.
 * @private
 */
rflect.cal.MainPane.prototype.isStartGripCont_ =
    function(aTargetClassName, opt_target) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip-cont-upper'),
      goog.getCssName('mn-event-grip-cont-left'));
  if (re.test(aTargetClassName))
    return true;
  if (opt_target && this.isGrip_(aTargetClassName))
    return this.isStartGripCont_(opt_target.parentNode.className);
  return false;
};


/**
 * @param {string} aTargetClassName Class name of element.
 * @param {Element=} opt_target Element to test.
 * @private
 */
rflect.cal.MainPane.prototype.isEndGripCont_ =
    function(aTargetClassName, opt_target) {
  var re = rflect.string.buildClassNameRe(
      goog.getCssName('wk-event-grip-cont-lower'),
      goog.getCssName('mn-event-grip-cont-right'));
  if (re.test(aTargetClassName))
    return true;
  if (opt_target && this.isGrip_(aTargetClassName))
    return this.isEndGripCont_(opt_target.parentNode.className);
  return false;
};


/**
 * @param {string} aTargetClassName Class name of element.
 * @private
 */
rflect.cal.MainPane.prototype.isGrip_ =
    function(aTargetClassName) {
  var re = rflect.string.buildClassNameRe(goog.getCssName('wk-event-grip'),
      goog.getCssName('mn-event-grip'));
  return re.test(aTargetClassName);
};


rflect.cal.MainPane.prototype.isGripOrGripCont_ = function(aClassName) {
  return this.isGrip_(aClassName) || this.isStartGripCont_(aClassName) ||
      this.isEndGripCont_(aClassName);
}


/**
 * Main pane mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onMouseDown_ = function(aEvent) {

  this.containerSizeMonitor_.checkForContainerSizeChange();
  this.updateBeforeRedraw(true);

  var className = aEvent.target.className;
  var preventDefaultIsNeeded = false;
  var maskConfiguration;
  // Whether we clicked on hollow space.
  if (this.isWeekGrid_(className)) {

    this.selectionMask_.init(
        maskConfiguration = /**@type {number}*/
        (rflect.cal.MainPaneSelectionMask.Configuration.WEEK),
        aEvent);

    preventDefaultIsNeeded = true;

  } else if (this.isAlldayGrid_(className)) {

    this.selectionMask_.init(
        maskConfiguration = /**@type {number}*/
        (rflect.cal.MainPaneSelectionMask.Configuration.ALLDAY),
        aEvent);

    preventDefaultIsNeeded = true;

  } else if (this.isMonthGrid_(className)) {

    if (!this.isDaynumLabel_(className))
      this.selectionMask_.init(
          maskConfiguration = /**@type {number}*/
          (rflect.cal.MainPaneSelectionMask.Configuration.MONTH), aEvent);

    preventDefaultIsNeeded = true;

  } else if (this.isChip_(className)) {

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
rflect.cal.MainPane.prototype.onMouseMove_ = function(aEvent) {
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
rflect.cal.MainPane.prototype.onMouseUp_ = function (aEvent) {
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
 * @param {string} aClassName Chip class name.
 * @private
 */
rflect.cal.MainPane.prototype.startChipDrag_ = function(aEvent, aClassName) {

  var maskConfiguration;
  var calendarEvent = this.getEventByTarget_(
      /**@type {Element}*/(aEvent.target));

  var isStartGrip = this.isStartGripCont_(aClassName,
      /**@type {Element}*/ (aEvent.target));
  var isEndGrip = this.isEndGripCont_(aClassName,
      /**@type {Element}*/ (aEvent.target));

  if (this.isWeekChip_(aClassName))
    maskConfiguration = rflect.cal.MainPaneSelectionMask.Configuration.WEEK;
  // Test for all-day chip first, because it's a month chip, too.
  else if (this.isAllDayChip_(aClassName))
    maskConfiguration =
        rflect.cal.MainPaneSelectionMask.Configuration.ALLDAY;
  else if (this.isMonthChip_(aClassName))
    maskConfiguration =
        rflect.cal.MainPaneSelectionMask.Configuration.MONTH;

  this.selectionMask_.init(/**@type {number}*/ (maskConfiguration), aEvent,
      calendarEvent, isStartGrip, isEndGrip);
  this.chipWasDragged_ = false;
}


/**
 * @private
 */
rflect.cal.MainPane.prototype.endChipDrag_ = function() {
  this.chipWasDragged_ = false;

  this.eventManager_.eventHolder.openSession(
      this.selectionMask_.getCalendarEvent());
  this.eventManager_.eventHolder.setStartDate(
      this.selectionMask_.startDate);
  this.eventManager_.eventHolder.setEndDate(
      this.selectionMask_.endDate);
  this.eventManager_.eventHolder.endWithEdit();
  this.updateAfterSave_();
}


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
 * Begins phase of event creation.
 * @private
 */
rflect.cal.MainPane.prototype.beginEventCreation_ = function() {

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
rflect.cal.MainPane.prototype.onSaveDialogButtonSelect_ = function(aEvent) {
  if (aEvent.key == this.saveDialog_.getButtonSet().getDefault()) {
    this.eventManager_.eventHolder.setSummary(
        this.saveDialog_.getEventName());
    this.eventManager_.eventHolder.endWithAdd();

    this.updateAfterSave_();
  }
}


/**
 * Event edit listener. Called when edit link is clicked from save or edit
 * dialog.
 * @param {Event} aEvent Event object.
 */
rflect.cal.MainPane.prototype.onEventEdit_ = function(aEvent) {
  this.getParent().showEventPane(true, aEvent.target == this.saveDialog_);
}


/**
 * Edit dialog button listener.
 * @param {{type: string}} aEvent Event object.
 */
rflect.cal.MainPane.prototype.onEditDialogButtonSelect_ = function(aEvent) {

  if (aEvent.key == this.editDialog_.getButtonSet().getDefault()) {

    this.editDialog_.dispatchEvent({type:
        rflect.cal.ui.SaveDialog.EVENT_EDIT});

  } else if (aEvent.key != this.editDialog_.getButtonSet().getCancel()) {
    // The only spare button - delete.
    this.eventManager_.eventHolder.endWithDelete();

    this.updateAfterDelete_();
  }
}


/**
 * Main pane scroll handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MainPane.prototype.onMainPaneScrollableScroll_ = function(aEvent) {
  var scrollable = aEvent.target;
  var scrollLeft = 0;
  var scrollTop = 0;

  if (this.viewManager_.isInWeekMode()) {

    scrollLeft = scrollable.scrollLeft;
    scrollTop = scrollable.scrollTop;

    if (scrollable ==
        this.getDomHelper().getElement('main-pane-header-scrollable')) {

      this.blockManager_.blockPoolAllDay.scrollTop = scrollTop;

    } else {

      this.blockManager_.blockPoolWeek.scrollLeft = scrollLeft;
      this.blockManager_.blockPoolWeek.scrollTop = scrollTop;

      this.blockManager_.blockPoolAllDay.scrollLeft = scrollLeft;

      this.getDomHelper().getElement('weekmode-zippies-table').style.left =
          '-' + scrollLeft + 'px';
      this.getDomHelper().getElement('weekmode-daynames-table').style.left =
          '-' + scrollLeft + 'px';
      this.getDomHelper().getElement('main-pane-header-scrollable').scrollLeft =
          scrollLeft;
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
rflect.cal.MainPane.prototype.disposeInternal = function() {

  this.removeScrollListeners_();

  this.viewManager_ = null;
  this.timeManager_ = null;
  this.containerSizeMonitor_ = null;


  rflect.cal.MainPane.superClass_.disposeInternal.call(this);
};
