/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MiniCalSelectionMask');

goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.SelectionMask');
goog.require('rflect.cal.SelectionMask.Configuration');



/**
 * Selection mask main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.Component} aMiniCal Link mini cal.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @extends {rflect.cal.SelectionMask}
 * @constructor
 */
rflect.cal.MiniCalSelectionMask = function(aViewManager, aMiniCal,
    aTimeManager) {
  rflect.cal.SelectionMask.call(this, aViewManager, aMiniCal, aTimeManager);
};
goog.inherits(rflect.cal.MiniCalSelectionMask, rflect.cal.SelectionMask);


/**
 * Configurations of selection mask.
 * @enum {number}
 */
rflect.cal.MiniCalSelectionMask.Configuration = {
  MINI_MONTH_INTERNAL: 4,
  MINI_MONTH_EXTERNAL: 5
};


/**
 * Whether mask is initialized by control, through owner component.
 * @type {boolean}
 */
rflect.cal.MiniCalSelectionMask.prototype.initializedByControl = false;


/**
 * Whether mask is moved by control, through owner component.
 * @type {boolean}
 */
rflect.cal.MiniCalSelectionMask.prototype.movedByControl = false;



/**
 * @return {boolean} Whether mask is created in mini-month internally.
 * @private
 */
rflect.cal.MiniCalSelectionMask.prototype.isMiniMonthInt_ = function() {
  return this.configuration_ == rflect.cal.MiniCalSelectionMask.Configuration.
      MINI_MONTH_INTERNAL;
};


/**
 * @return {boolean} Whether mask is created in mini-month externally.
 * @private
 */
rflect.cal.MiniCalSelectionMask.prototype.isMiniMonthExt_ = function() {
  return this.configuration_ == rflect.cal.MiniCalSelectionMask.Configuration.
      MINI_MONTH_EXTERNAL;
};


/**
 * Clears mask state.
 */
rflect.cal.MiniCalSelectionMask.prototype.clear = function() {
  goog.style.showElement(this.maskEl_, false);
  this.initializedByControl = false;
};


/**
 * Updates mask and redraws it, if necessary.
 * @param {goog.events.Event|number} aEventOrIndex Event object or cell index.
 */
rflect.cal.MiniCalSelectionMask.prototype.update = function(aEventOrIndex) {
  var currentCell = this.getCellBySelectionIndex_(aEventOrIndex);

  if (!goog.math.Coordinate.equals(this.currentCell_, currentCell)) {
    this.currentCell_ = currentCell;
    this.movedByControl = true;

    this.update_();
  }
};


/**
 * Sets up mask.
 * @param {rflect.cal.MiniCalSelectionMask.Configuration} aConfiguration Configuration
 * of mask.
 * @param {goog.events.Event} aEvent Event object.
 * @param {number=} opt_startSelectionIndex Index where to start a mask.
 * @param {number=} opt_endSelectionIndex Index where to end a mask.
 */
rflect.cal.MiniCalSelectionMask.prototype.init = function(aConfiguration, aEvent,
    opt_startSelectionIndex, opt_endSelectionIndex) {
  rflect.cal.SelectionMask.prototype.init.call(this, aConfiguration);

  this.maskEl_ = goog.dom.getElemenet('minical-mask-cnt');

  if (opt_startSelectionIndex >= 0 && opt_endSelectionIndex >= 0) {

    this.startCell_ = this.getCellBySelectionIndex_(opt_startSelectionIndex);
    this.currentCell_ = this.getCellBySelectionIndex_(opt_endSelectionIndex);

  }

  this.initializedByControl = !this.isMiniMonthExt_();
  this.initialized_ = this.initializedByControl || (opt_startSelectionIndex >=
      0 && opt_endSelectionIndex >= 0);
  this.update_();

};


/**
 * @param {number} aIndex Index to test.
 * @return {boolean} Whether given index is in mask.
 */
rflect.cal.MiniCalSelectionMask.prototype.indexIsInMask = function(aIndex) {
  if (!this.initialized_)
    return false;
  var cell = this.getCellBySelectionIndex_(aIndex);
  var minCell = this.getMinCell_(this.startCell_, this.currentCell_);
  var maxCell = this.getMaxCell_(this.startCell_, this.currentCell_);
  return this.compareCells_(cell, minCell) >= 0 &&
      this.compareCells_(cell, maxCell) <= 0;
}



/**
 * @param {number} aSelectionIndex Index of whether selection start or end.
 * @return {goog.math.Coordinate} Cell position for mini-month.
 */
rflect.cal.MiniCalSelectionMask.prototype.getCellBySelectionIndex_ =
    function(aSelectionIndex) {
  return new goog.math.Coordinate(aSelectionIndex % 7,
      Math.floor(aSelectionIndex / 7));
};


/**
 * Builds mask.
 * @private
 */
rflect.cal.MiniCalSelectionMask.prototype.update_ = function() {
  var maxCell;
  var minCell;
  
  // Rectangles to pass to builder.
  this.rects_.length = 0;

  if (!this.initialized_ && !this.isMiniMonthInt_())
    return;

  if (!this.updatedOnce_){
    this.updatedOnce_ = true;
    this.initializedByControl = !this.isMiniMonthExt_();
    this.initialized_ = this.initializedByControl || (opt_startSelectionIndex >=
        0 && opt_endSelectionIndex >= 0);
    this.update_();
  }


    if (!this.movedByControl)  {

    // In mini-month, there's only one rect.
    var defaultStepX = rflect.cal.predefined.MINICAL_MASK_WIDTH / 7;
    var defaultStepY = rflect.cal.predefined.MINICAL_MASK_HEIGHT / 6;
    
    // We need real cells before modifying originals.
    var startCellClone = this.startCell_.clone();
    var currentCellClone = this.currentCell_.clone();
    
    minCell = this.getMinCell_(startCellClone, currentCellClone);
    maxCell = this.getMaxCell_(startCellClone, currentCellClone);

    if (minCell.y != maxCell.y) {
      minCell.x = 0;
      maxCell.x = 6;
    }

    this.rects_.push(this.getRect_(
        minCell.x * defaultStepX,
        minCell.y * defaultStepY,
        (maxCell.x - minCell.x + 1) * defaultStepX,
        (maxCell.y - minCell.y + 1) * defaultStepY
    ));
  }

  if (!this.isMiniMonthExt_()) {
    this.calculateDates_(minCell, maxCell);
    this.maskEl_.innerHTML = this.build_();
  }
};