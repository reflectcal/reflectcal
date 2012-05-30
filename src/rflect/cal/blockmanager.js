/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Representator of blocks, which could be either rows for month
 * mode and allday grid or cols for week mode.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.BlockManager');

goog.require('rflect.cal.Block');
goog.require('rflect.cal.BlockPool');
goog.require('rflect.cal.predefined');



/**
 * Block manager is high-level object that manipulates multiple
 * <code>rflect.cal.BlockPool</code> objects for different views.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.EventManager} aEventManager Link to event manager.
 * @constructor
 */
rflect.cal.BlockManager = function(aViewManager, aTimeManager, aEventManager) {

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
   * @type {rflect.cal.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Block pool for week mode.
   * @type {rflect.cal.BlockPool}
   */
  this.blockPoolWeek = new rflect.cal.BlockPool(true);
  this.blockPoolWeek.fill();

  /**
   * Block pool for month mode.
   * @type {rflect.cal.BlockPool}
   */
  this.blockPoolMonth = new rflect.cal.BlockPool(false);
  this.blockPoolMonth.fill(6);

  /**
   * Block pool for allday.
   * @type {rflect.cal.BlockPool}
   */
  this.blockPoolAllday = new rflect.cal.BlockPool(false);
  this.blockPoolAllday.fill(1);
  this.blockPoolAllday.setBlocksNumber(1);


};


/**
 * Updates block pools with new sizes and capacities.
 */
rflect.cal.BlockManager.prototype.update = function() {

  if (this.viewManager_.isInWeekMode()) {
    this.blockPoolWeek.setBlocksNumber(this.timeManager_.daySeries.length);
    this.blockPoolAllday.setBlocksNumber(1);

    this.blockPoolWeek.updateCollapsedBlocks();
    this.blockPoolAllday.updateCollapsedBlocks();

    // Event manager calculations and nesting is here.
    this.blockPoolWeek.updateEventMap();
    this.blockPoolAllday.updateEventMap();

    this.blockPoolWeek.updateExpandedBlocks();
    this.blockPoolAllday.updateExpandedBlocks();
  } else if (this.viewManager_.isInMonthMode()) {
    this.blockPoolMonth.setBlocksNumber(this.timeManager_.daySeries.length / 7);

    this.blockPoolMonth.updateCollapsedBlocks();

    // Event manager calculations and nesting is here.
    this.blockPoolMonth.updateEventMap();

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
rflect.cal.BlockManager.prototype.setSizes = function(aGridSize,
    aGridContainerSize, opt_alldayGridSize, opt_alldayGridContainerSize) {

  if (this.viewManager_.isInWeekMode()) {

    this.blockPoolWeek.gridContainerSize = aGridContainerSize;
    this.blockPoolWeek.gridSize = aGridSize;

    this.blockPoolAllday.gridSize = opt_alldayGridSize;
    this.blockPoolAllday.gridContainerSize = opt_alldayGridContainerSize;

  } else if (this.viewManager_.isInMonthMode()) {

    this.blockPoolMonth.gridContainerSize = aGridContainerSize;
    this.blockPoolMonth.gridSize = aGridSize;

  }

};
