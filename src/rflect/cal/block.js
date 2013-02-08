/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Individual block, could manage its state, capacity and event
 * chip map.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.Block');

goog.require('rflect.cal.predefined');



/**
 * Block class. Block is individual unit which manages its
 * capacity, size and state.
 * @param {number=} opt_size Size of new block.
 * @param {number=} opt_capacity Capacity of new block.
 * @param {boolean=} opt_expanded Whether block should be expanded.
 * @constructor
 */
rflect.cal.Block = function(opt_size, opt_capacity, opt_expanded) {

  this.size = opt_size || 0;
  this.capacity = opt_capacity || 0;
  this.expanded = opt_expanded || false;

};


/**
 * Whether block is expanded.
 * @type {boolean}
 */
rflect.cal.Block.prototype.expanded = false;


/**
 * Whether block could be expanded. This is used instead of precise number of
 * potential capacity the block could reach, so we may not know this number but
 * are able to skip event chips which are out of bounds.
 * Makes sense only for blocks in collapsed mode.
 * @type {boolean}
 */
rflect.cal.Block.prototype.couldBeExpanded = false;


/**
 * Whether block could be collapsed.
 * Makes sense only for blocks in expanded mode.
 * @type {boolean}
 */
rflect.cal.Block.prototype.couldBeCollapsed = false;


/**
 * Actual capacity of block - how many rows/cols are in it.
 * @type {number}
 */
rflect.cal.Block.prototype.capacity = 0;


/**
 * One dimension of block which makes sense - width for week mode, height for
 * month, in pixels.
 * @type {number}
 */
rflect.cal.Block.prototype.size = 0;


/**
 * One position of block which makes sense - left for week mode, top for
 * month, in pixels.
 * @type {number}
 */
rflect.cal.Block.prototype.position = 0;


/**
 * @return {rflect.cal.Block} Block that equals this one.
 */
rflect.cal.Block.prototype.clone = function() {
  return new rflect.cal.Block(this.size, this.capacity, this.expanded);
};


/**
 * @param {!Array.<rflect.cal.events.Chip>} aChips Collection of chips for this
 * block.
 */
rflect.cal.Block.prototype.calculateEventMap = function(aChips) {
};
