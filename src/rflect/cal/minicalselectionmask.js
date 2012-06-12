/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MiniCalSelectionMask');

goog.require('goog.dom');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.SelectionMask');



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
rflect.cal.MiniCalSelectionMask.prototype.dragStarted = false;


/**
 * Whether mask is moved by control, through owner component.
 * @type {boolean}
 */
rflect.cal.MiniCalSelectionMask.prototype.dragged = false;


/**
 * Whether mask is moved by control at least once.
 * @type {boolean}
 */
rflect.cal.MiniCalSelectionMask.prototype.draggedOnce = false;


/**
 * Whether selection index is in mask.
 * @type {boolean}
 */
rflect.cal.MiniCalSelectionMask.prototype.indexIsInMask = false;


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
  this.dragStarted = false;
  this.dragged = false;
  this.draggedOnce = false;
  this.indexIsInMask = false;
};


/**
 * Updates mask and redraws it, if necessary.
 * @param {number} aIndex Cell index.
 */
rflect.cal.MiniCalSelectionMask.prototype.update = function(aIndex) {
  var currentCell = this.getCellBySelectionIndex_(aIndex);

  if (!this.dragStarted)
    return;

  if (!goog.math.Coordinate.equals(this.currentCell_, currentCell)) {

    if (!this.dragged){
      this.dragged = true;
      this.draggedOnce = true;
      this.initialized_ = true;
    }

    this.currentCell_ = currentCell;

    this.update_();
  }
};


/**
 * Sets up mask.
 * @param {rflect.cal.MiniCalSelectionMask.Configuration} aConfiguration Configuration
 * of mask.
 * @param {number} startSelectionIndex Index where to start a mask.
 * @param {number} endSelectionIndex Index where to end a mask.
 */
rflect.cal.MiniCalSelectionMask.prototype.init = function(aConfiguration,
    startSelectionIndex, endSelectionIndex) {
  rflect.cal.SelectionMask.prototype.init.call(this, aConfiguration);

  this.maskEl_ = goog.dom.getElement('minical-mask-cnt');
  this.indexIsInMask = false;
  // If we're here in minical internal, we started drag.
  this.dragStarted = this.isMiniMonthInt_();
  this.dragged = false;
    
  if (this.isMiniMonthExt_()) {

    this.startCell_ = this.getCellBySelectionIndex_(startSelectionIndex);
    this.currentCell_ = this.getCellBySelectionIndex_(endSelectionIndex);

  } else {

    // Whether mask was previously initialized.
    this.indexIsInMask = this.indexIsInMask_(startSelectionIndex);
    this.calculateDates_(this.startCell_ = this.getCellBySelectionIndex_(
        startSelectionIndex));
    this.currentCell_ = this.startCell_.clone();

  }

  // Initialize mask for external mode.
  if (this.initialized_ = this.isMiniMonthExt_())
    this.update_();

};


/**
 * @param {number} aIndex Index to test.
 * @return {boolean} Whether given index is in mask.
 */
rflect.cal.MiniCalSelectionMask.prototype.indexIsInMask_ = function(aIndex) {
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
 * @param {goog.math.Coordinate} Cell.
 * @return {number} Index of cell.
 */
rflect.cal.MiniCalSelectionMask.prototype.getSelectionIndexByCell_ =
    function(aCell) {
  return aCell.x + aCell.y * 7;
};


/**
 * Updates mask.
 * @private
 */
rflect.cal.MiniCalSelectionMask.prototype.update_ = function() {
  var maxCell;
  var minCell;
  
  // Rectangles to pass to builder.
  this.rects_.length = 0;

  if (this.startCell_.x < 0 || this.startCell_.y < 0 ||
      this.currentCell_.x < 0 || this.currentCell_.y < 0)
    return;

  // In mini-month, there's only one rect.
  var defaultStepX = rflect.cal.predefined.MINICAL_MASK_WIDTH / 7;
  var defaultStepY = rflect.cal.predefined.MINICAL_MASK_HEIGHT / 6;
    
  // We need clone cells before modifying originals.
  var startCellClone = this.startCell_.clone();
  var currentCellClone = this.currentCell_.clone();
    
  minCell = this.getMinCell_(startCellClone, currentCellClone);
  maxCell = this.getMaxCell_(startCellClone, currentCellClone);

  var range = this.getSelectionIndexByCell_(maxCell) -
      this.getSelectionIndexByCell_(minCell) + 1;

  if (range <= 7 && range >= 2 && (minCell.y - maxCell.y == 1)) {
    // Situation where two rects are possible.
    this.rects_.push(this.getRect_(
        minCell.x * defaultStepX,
        minCell.y * defaultStepY,
        (7 - minCell.x) * defaultStepX,
        defaultStepY
    ));
    this.rects_.push(this.getRect_(
        0,
        maxCell.y * defaultStepY,
        (maxCell.x + 1) * defaultStepX,
        defaultStepY
    ));
  } else {

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
    this.calculateDateAndSelectionType_(minCell, maxCell);
    this.maskEl_.innerHTML = this.build_();
  }
};


/**
 * Calculates date and type of selection interval.
 */
rflect.cal.MiniCalSelectionMask.prototype.calculateDateAndSelectionType_ =
    function(aMinCell, aMaxCell) {

  var tempDate = this.timeManager_.daySeries[
      this.getSelectionIndexByCell_(aMinCell)];
  this.startDate = new goog.date.DateTime(tempDate.getYear(),
      tempDate.getMonth(), tempDate.getDate());

  var duration = this.duration = this.getSelectionIndexByCell_(aMaxCell) -
      this.getSelectionIndexByCell_(aMinCell) + 1;

  var dayInMonth = this.timeManager_.daySeries[6];
  var year = dayInMonth.getYear();
  var month = dayInMonth.getMonth();
  var indexOfFirstDayOfMonth = goog.array.findIndex(this.timeManager_.daySeries,
      function(aDate){
    return aDate.getDate() == 1
  });
  var numberOfDaysInMonth = rflect.math.completeToDivisibleBy7(
      indexOfFirstDayOfMonth + goog.date.getNumberOfDaysInMonth(year, month));
  if (goog.DEBUG) {
    _log('numberOfDaysInMonth', numberOfDaysInMonth);
    _log('aMinCell', aMinCell);
    _log('aMaxCell', aMaxCell);
  }

  // Configuration detection.
  if (duration % 7 == 0 && aMinCell.x == 0) {
    // Month mode is tested first.
    if (aMinCell.y == 0 && duration == numberOfDaysInMonth) {
      this.selectionConfiguration = rflect.cal.TimeManager.Configuration.MONTH;
      tempDate = this.timeManager_.daySeries[indexOfFirstDayOfMonth];
      this.firstDayInMonth = new goog.date.DateTime(tempDate.getYear(),
          tempDate.getMonth(), tempDate.getDate());
    } else if (duration == 7)
    // Week mode.
      this.selectionConfiguration =
          rflect.cal.TimeManager.Configuration.WEEK;
    else
    // Multi week mode.
      this.selectionConfiguration =
          rflect.cal.TimeManager.Configuration.MULTI_WEEK;

  } else if (duration == 1) {
  // Day mode.
    this.selectionConfiguration = rflect.cal.TimeManager.Configuration.DAY;
  } else {
  // Multiday mode.
    this.selectionConfiguration =
        rflect.cal.TimeManager.Configuration.MULTI_DAY;
  }

}


/**
 * Builds mask, for external usage.
 * @param {goog.string.StringBuffer=} aSb String buffer to append mask to.
 * @return {string} HTML of mask.
 */
rflect.cal.SelectionMask.prototype.build = function(aSb) {
  return this.build_(aSb) || '';
};