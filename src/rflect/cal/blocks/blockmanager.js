/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Representator of blocks, which could be either rows for month
 * mode and allday grid or cols for week mode.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.blocks.BlockManager');

goog.require('rflect.cal.blocks.Block');
goog.require('rflect.cal.blocks.BlockPool');
goog.require('rflect.cal.predefined');



/**
 * Block manager is high-level object that manipulates multiple
 * <code>rflect.cal.blocks.BlockPool</code> objects for different views.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 */
rflect.cal.blocks.BlockManager = function(aViewManager, aTimeManager,
                                          aEventManager) {

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
   * Block pool for week mode.
   * @type {rflect.cal.blocks.BlockPool}
   */
  this.blockPoolWeek = new rflect.cal.blocks.BlockPool(true,
      this.eventManager_);
  this.blockPoolWeek.fill();

  /**
   * Block pool for month mode.
   * @type {rflect.cal.blocks.BlockPool}
   */
  this.blockPoolMonth = new rflect.cal.blocks.BlockPool(false,
      this.eventManager_);
  this.blockPoolMonth.fill(6);
  this.blockPoolMonth.expandBlock(0, rflect.VERTICAL_EXPAND_DEFAULT_STATE);
  this.blockPoolMonth.expandBlock(1, rflect.VERTICAL_EXPAND_DEFAULT_STATE);
  this.blockPoolMonth.expandBlock(2, rflect.VERTICAL_EXPAND_DEFAULT_STATE);
  this.blockPoolMonth.expandBlock(3, rflect.VERTICAL_EXPAND_DEFAULT_STATE);
  this.blockPoolMonth.expandBlock(4, rflect.VERTICAL_EXPAND_DEFAULT_STATE);
  this.blockPoolMonth.expandBlock(5, rflect.VERTICAL_EXPAND_DEFAULT_STATE);

  /**
   * Block pool for allday.
   * @type {rflect.cal.blocks.BlockPool}
   */
  this.blockPoolAllDay = new rflect.cal.blocks.BlockPool(false,
      this.eventManager_);
  this.blockPoolAllDay.fill(1);
  this.blockPoolAllDay.setBlocksNumber(1);
  this.blockPoolAllDay.expandBlock(0, rflect.VERTICAL_EXPAND_DEFAULT_STATE);


};


/**
 * Updates block pools with new sizes and capacities.
 */
rflect.cal.blocks.BlockManager.prototype.update = function() {

  if (this.viewManager_.isInWeekMode()) {
    this.blockPoolWeek.setBlocksNumber(this.timeManager_.daySeries.length);
    this.blockPoolAllDay.setBlocksNumber(1);

    this.blockPoolWeek.updateCollapsedBlocks();
    this.blockPoolAllDay.updateCollapsedBlocks();

    // Event manager calculations and nesting is here.
    this.blockPoolWeek.updateEventMap(this.eventManager_.dayChips);
    // All-day event block should calculate sparse arrays.
    this.blockPoolAllDay.updateEventMap(this.eventManager_.allDayChips, true,
        this.blockPoolWeek.getBlocksNumber());

    this.blockPoolWeek.updateExpandedBlocks();
    this.blockPoolAllDay.updateExpandedBlocks();
  } else if (this.viewManager_.isInMonthMode()) {
    this.blockPoolMonth.setBlocksNumber(this.timeManager_.daySeries.length / 7);

    this.blockPoolMonth.updateCollapsedBlocks();

    // Event manager calculations and nesting is here.
    this.blockPoolMonth.updateEventMap(this.eventManager_.weekChips);

    this.blockPoolMonth.updateExpandedBlocks();
  }
};


/**
 * @param {goog.math.Size} aGridSize Size of week or month grid.
 * @param {goog.math.Size} aGridContainerSize Size of week or month
 scrollable.
 * @param {goog.math.Size} opt_alldayGridSize Size of allday grid.
 * @param {goog.math.Size} opt_alldayGridContainerSize Size of allday
 * scrollable.
 */
rflect.cal.blocks.BlockManager.prototype.setSizes = function(aGridSize,
    aGridContainerSize, opt_alldayGridSize, opt_alldayGridContainerSize) {

  if (this.viewManager_.isInWeekMode()) {

    this.blockPoolWeek.gridContainerSize = aGridContainerSize;
    this.blockPoolWeek.gridSize = aGridSize;

    this.blockPoolAllDay.gridSize = opt_alldayGridSize;
    this.blockPoolAllDay.gridContainerSize = opt_alldayGridContainerSize;

  } else if (this.viewManager_.isInMonthMode()) {

    this.blockPoolMonth.gridContainerSize = aGridContainerSize;
    this.blockPoolMonth.gridSize = aGridSize;

  }

};
