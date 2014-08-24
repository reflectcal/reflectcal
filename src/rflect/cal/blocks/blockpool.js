/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Block pool, containing collection of blocks.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.blocks.BlockPool');

goog.require('rflect.cal.blocks.Block');
goog.require('rflect.cal.predefined');



/**
 * Block pool contains collection of blocks, could add them if necessary,
 * deleting is unnecessary, but could clear all collection.
 * @param {boolean} aIsHorizontal Whether block pool is horizontal.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @constructor
 */
rflect.cal.blocks.BlockPool = function(aIsHorizontal, aEventManager) {

  this.isHorizontal_ = aIsHorizontal;

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Collection of individual blocks.
   * @type {Array.<rflect.cal.blocks.Block>}
   */
  this.blocks = [];
};


/**
 * Maximal possible number of blocks (we reach it in week mode, and in month
 * mode it will be 6 at most).
 * @type {number}
 * @const
 */
rflect.cal.blocks.BlockPool.MAXIMAL_NUMBER_OF_BLOCKS = 7;


/**
 * Minimal number of blocks. This is really just for clarity, in order not to
 * leave unnamed constants.
 * @type {number}
 * @const
 */
rflect.cal.blocks.BlockPool.MINIMAL_NUMBER_OF_BLOCKS = 1;


/**
 * Whether block pool is horizontal.  Horizontal block pool has more
 * special rules.
 * @type {boolean}
 * @private
 */
rflect.cal.blocks.BlockPool.prototype.isHorizontal_ = false;


/**
 * Number of used blocks, may be equal or less than
 * <code>rflect.cal.blocks.BlockPool#blocks.length</code>.
 * @type {number}
 * @private
 */
rflect.cal.blocks.BlockPool.prototype.blocksNumber_ = 0;


/**
 * Whether block pool is expanded. This is true if at least one block is
 * expanded.
 * @type {boolean}
 */
rflect.cal.blocks.BlockPool.prototype.expanded = false;


/**
 * Size of grid in which blocks are placed.
 * @type {goog.math.Size}
 */
rflect.cal.blocks.BlockPool.prototype.gridSize = null;


/**
 * Size of container in which grid is placed.
 * @type {goog.math.Size}
 */
rflect.cal.blocks.BlockPool.prototype.gridContainerSize = null;


/**
 * Default size of block in this pool.
 * @type {number}
 */
rflect.cal.blocks.BlockPool.prototype.nominalSize = 0;


/**
 * <code>scrollTop</code> property of grid, i.e., offset of grid inside grid
 * container.
 * @type {number}
 */
rflect.cal.blocks.BlockPool.prototype.scrollTop = 0;


/**
 * <code>scrollLeft</code> property of grid, i.e., offset of grid inside grid
 * container.
 * @type {number}
 */
rflect.cal.blocks.BlockPool.prototype.scrollLeft = 0;


/**
 * Adds a new block at the end of collection.
 * @param {rflect.cal.blocks.Block=} opt_block Block to add.
 */
rflect.cal.blocks.BlockPool.prototype.add = function(opt_block) {
  this.blocks[this.blocks.length] = opt_block || new rflect.cal.blocks.Block;
};


/**
 * Clear all blocks.
 */
rflect.cal.blocks.BlockPool.prototype.clear = function() {
  this.blocks.length = 0;
};


/**
 * Pre-fills collection with equal blocks.
 * @param {number=} opt_number How many blocks to create.
 * @param {rflect.cal.blocks.Block=} opt_prototypeBlock Block to serve as prototype for
 * others.
 */
rflect.cal.blocks.BlockPool.prototype.fill =
    function cal_BlockManager_fill(opt_number, opt_prototypeBlock) {
  var number = opt_number || rflect.cal.blocks.BlockPool.MAXIMAL_NUMBER_OF_BLOCKS;
  var counter = 0;
  while (counter < number) {
    this.blocks[counter] = opt_prototypeBlock ? opt_prototypeBlock.clone() :
        new rflect.cal.blocks.Block();
    counter++;
  }
};


/**
 * Expands given block.
 * @param {number|string} aIndex Index of block to expand.
 * @param {boolean} aExpand Whether to expand or collapse.
 */
rflect.cal.blocks.BlockPool.prototype.expandBlock =
    function cal_BlockManager_expandBlock(aIndex, aExpand) {
  this.blocks[aIndex].expanded = aExpand;
  // Check expand state of block pool.
  this.updateExpandState_();
};


/**
 * Updates actual expand state in <code>rflect.cal.blocks.BlockPool#expanded</code>.
 * Should be called after blocks number is changed.
 * @private
 */
rflect.cal.blocks.BlockPool.prototype.updateExpandState_ = function() {
  for (var index = 0; index < this.blocksNumber_; index++) {
    if (this.blocks[index].expanded) {
      this.expanded = true;
      return;
    }
  }
  this.expanded = false;
};


/**
 * @param {number} aBlocksNumber Number of blocks.
 */
rflect.cal.blocks.BlockPool.prototype.setBlocksNumber = function(aBlocksNumber) {
  this.blocksNumber_ = aBlocksNumber;
  this.updateExpandState_();
};


/**
 * @return {number} Number of blocks.
 */
rflect.cal.blocks.BlockPool.prototype.getBlocksNumber = function() {
  return this.blocksNumber_;
};


/**
 * Toggles expand state of given block.
 * @param {number|string} aIndex Index of block to expand.
 */
rflect.cal.blocks.BlockPool.prototype.toggleBlock = function(aIndex) {
  this.expandBlock(aIndex, !this.blocks[aIndex].expanded);
};


/**
 * Updates block manager with nominal sizes for collapsed blocks. This is done
 * before event manager pass, because in that case we could skip chips that
 * otherwise would be placed outside of block's bounds.
 */
rflect.cal.blocks.BlockPool.prototype.updateCollapsedBlocks =
    function cal_BlockManager_updateCollapsedBlocks() {
  var nominalSize = 0;
  var block;

  if (this.isHorizontal_) {
    this.gridSize.width = 0;
    nominalSize = this.gridContainerSize.width / this.blocksNumber_;
  } else {
    this.gridSize.height = 0;
    nominalSize = this.gridContainerSize.height / this.blocksNumber_;
  }
  for (var counter = 0; counter < this.blocksNumber_; counter++) {
    if (!(block = this.blocks[counter]).expanded) {
      block.size = nominalSize;
      this.nominalCapacity = this.getCapacityFromSize(
          nominalSize);
      block.capacity = this.nominalCapacity;
      block.couldBeCollapsed = false;

      if (this.isHorizontal_)
        this.gridSize.width += nominalSize;
      else
        this.gridSize.height += nominalSize;

    }
  }
};


/**
 * Creates and nests series of chips - visual representation for events. Here
 * <code>rflect.cal.blocks.Block#couldBeExpanded</code> flag is set.
 * @param {Array.<!Array.<rflect.cal.events.Chip>>} aChips chips for this block
 * pool.
 * @param {boolean=} opt_createArrays Whether sparse arrays should be created.
 * @param {number=} opt_arraysLength Length of sparse arrays list.
 */
rflect.cal.blocks.BlockPool.prototype.updateEventMap = function(aChips, 
    opt_createArrays, opt_arraysLength) {
  for (var counter = 0; counter < this.blocksNumber_; counter++) {
    // NOTE(alexk): Whether horizontal block could be expanded, depends on
    // optimal size of chips, too. Say, we could have no additional hidden cols
    // but still are able to expand block because chips have width less that
    // optimal. But maybe there's no need to show this case via expand sign.

    this.blocks[counter].computeEventMap(aChips[counter], this.eventManager_);
    if (opt_createArrays)
      this.blocks[counter].createSparseArraysFromBlobs(opt_arraysLength || 0);

    if (!this.blocks[counter].expanded)
      this.blocks[counter].couldBeExpanded = this.blocks[counter].capacity >
          this.nominalCapacity;
  }
};


/**
 * Updates block manager with actual sizes for expanded blocks, after event
 * manager pass.
 */
rflect.cal.blocks.BlockPool.prototype.updateExpandedBlocks =
    function cal_BlockManager_updateExpandedBlocks() {
  var cumulativeSize = 0;
  var nominalSize = 0;

  if (this.isHorizontal_) {
    nominalSize = this.gridContainerSize.width / this.blocksNumber_;
  } else {
    nominalSize = this.gridContainerSize.height / this.blocksNumber_;
  }

  for (var counter = 0; counter < this.blocksNumber_;
      counter++) {
    var block = this.blocks[counter];
    var capacity = block.capacity;

    if (block.expanded) {

      var sizeFromCapacity = this.getSizeFromCapacity(capacity)
      block.size = sizeFromCapacity < nominalSize ? nominalSize :
          sizeFromCapacity;

      // Whether block could be collapsed interests us only for expanded blocks.
      block.couldBeCollapsed = capacity >
          this.nominalCapacity;
      block.couldBeExpanded = false;

      if (this.isHorizontal_)
        this.gridSize.width += block.size;
      else
        this.gridSize.height += block.size;
    }

    block.position = cumulativeSize;
    cumulativeSize += block.size;
  }
};


/**
 * @param {number} aSize Block size.
 * @return {number} Block capacity based on it's size.
 */
rflect.cal.blocks.BlockPool.prototype.getCapacityFromSize =
    function cal_BlockPool_getCapacityFromSize(aSize) {
  if (this.isHorizontal_) {
    return Math.floor((aSize - rflect.cal.predefined.WK_EVENT_LAYER_MARGIN -
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH) /
        rflect.math.getScaledValue(this.blocksNumber_,
        rflect.cal.blocks.BlockPool.MAXIMAL_NUMBER_OF_BLOCKS,
        rflect.cal.blocks.BlockPool.MINIMAL_NUMBER_OF_BLOCKS,
        rflect.cal.predefined.WK_EVENT_MINIMAL_WIDTH_LOWER_BOUND,
        rflect.cal.predefined.WK_EVENT_MINIMAL_WIDTH_UPPER_BOUND));
  }
  return Math.floor((aSize - rflect.cal.predefined.MN_EVENT_LAYER_MARGIN_TOP -
      rflect.cal.predefined.DEFAULT_BORDER_WIDTH) /
      rflect.cal.predefined.MN_EVENT_HEIGHT);
};


/**
 * @param {number} aCapacity Block capacity.
 * @return {number} Block size based on it's capacity.
 */
rflect.cal.blocks.BlockPool.prototype.getSizeFromCapacity =
    function cal_BlockManager_update(aCapacity) {
  if (this.isHorizontal_) {
    return aCapacity * rflect.math.getScaledValue(this.blocksNumber_,
        rflect.cal.blocks.BlockPool.MAXIMAL_NUMBER_OF_BLOCKS,
        rflect.cal.blocks.BlockPool.MINIMAL_NUMBER_OF_BLOCKS,
        rflect.cal.predefined.WK_EVENT_OPTIMAL_WIDTH_LOWER_BOUND,
        rflect.cal.predefined.WK_EVENT_OPTIMAL_WIDTH_UPPER_BOUND) +
        rflect.cal.predefined.WK_EVENT_LAYER_MARGIN +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH;
  }
  return aCapacity * rflect.cal.predefined.MN_EVENT_HEIGHT +
      rflect.cal.predefined.MN_EVENT_LAYER_MARGIN_TOP +
      rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2;
};


/**
 * @return {number} Time position of earliest chip in this block pool.
 */
rflect.cal.blocks.BlockPool.prototype.getEarliestChipStart =
    function () {
  var earliestChipStart = -1;
  for (var counter = 0; counter < this.blocksNumber_; counter++) {
    var currentBlockEarliestChipStart = this.blocks[counter].earliestChipStart;
    if (currentBlockEarliestChipStart >= 0) {
      //If we didn't initialize earliest chip start or we have lesser
      //non-negative chip start, save it.
      if (earliestChipStart < 0 || currentBlockEarliestChipStart <
          earliestChipStart) {
        earliestChipStart = currentBlockEarliestChipStart;
      }
    }
  }

  return earliestChipStart < 0 ? 0 : earliestChipStart;
}
