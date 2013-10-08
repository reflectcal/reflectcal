/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MiniCalSelectionMask');

goog.require('goog.dom');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.SelectionMask');



/**
 * Selection mask main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.ui.Component} aMiniCal Link mini cal.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @extends {rflect.cal.ui.SelectionMask}
 * @constructor
 */
rflect.cal.ui.MiniCalSelectionMask = function(aViewManager, aMiniCal,
    aTimeManager) {
  rflect.cal.ui.SelectionMask.call(this, aViewManager, aMiniCal, aTimeManager);
};
goog.inherits(rflect.cal.ui.MiniCalSelectionMask, rflect.cal.ui.SelectionMask);


/**
 * Configurations of selection mask.
 * @enum {number}
 */
rflect.cal.ui.MiniCalSelectionMask.Configuration = {
  MINI_MONTH_INTERNAL: 4,
  MINI_MONTH_EXTERNAL: 5
};


/**
 * Whether mask is initialized by control, through owner component.
 * @type {boolean}
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.dragStarted_ = false;


/**
 * Whether mask is moved by control at least once.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.draggedAtLeastOnce_ = false;


/**
 * Index where we're started drag.
 * @type {number}
 * @private
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.startIndex_ = -1;


/**
 * Index where we're currently dragging.
 * @type {number}
 * @private
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.currentIndex_ = -1;


/**
 * @return {boolean} Whether mask is created in mini-month internally.
 * @private
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.isMiniMonthInt_ = function() {
  return this.configuration == rflect.cal.ui.MiniCalSelectionMask.Configuration.
      MINI_MONTH_INTERNAL;
};


/**
 * @return {boolean} Whether mask is created in mini-month externally.
 * @private
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.isMiniMonthExt_ = function() {
  return this.configuration == rflect.cal.ui.MiniCalSelectionMask.Configuration.
      MINI_MONTH_EXTERNAL;
};


/**
 * @return {boolean} Whether mask was started to be dragged.
 */
rflect.cal.ui.SelectionMask.prototype.isDragStarted = function() {
  return this.dragStarted_;
}



/**
 * Clears mask state.
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.close = function() {
  if (this.draggedAtLeastOnce_) {
    this.draggedAtLeastOnce_ = this.dragStarted_ = false;

    goog.events.dispatchEvent(this.component, {
      type: rflect.cal.EventType.DATE_DRAG_END,
      startDate: this.startDate,
      endDate: this.endDate
    });
  } else if (this.dragStarted_) {
    this.dragStarted_ = false;

    goog.events.dispatchEvent(this.component, {
      type: rflect.cal.EventType.DATE_SELECT,
      date: this.startDate
    });
  }
};


/**
 * Updates mask and redraws it, if necessary.
 * @param {number} aIndex Cell index.
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.update = function(aIndex) {
  if (!this.dragStarted_)
    return;

  if (this.currentIndex_ != aIndex) {
    this.draggedAtLeastOnce_ = true;
    this.initialized = true;

    this.currentIndex_ = aIndex;

    this.updateInternal();
  }
};


/**
 * Sets up mask.
 * @param {number} aConfiguration Configuration
 * of mask.
 * @param {number=} opt_startSelectionIndex Index where to start a mask.
 * @param {number=} opt_endSelectionIndex Index where to end a mask.
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.init = function(aConfiguration,
    opt_startSelectionIndex, opt_endSelectionIndex) {
  rflect.cal.ui.SelectionMask.prototype.init.call(this, aConfiguration);

  this.dragStarted_ = false;
  this.draggedAtLeastOnce_ = false;

  if (this.isMiniMonthExt_()) {
    // When in external configuration, we don't need to know whether mask was
    // previously initialized.
    this.initialized = false;

    this.component.startSelectionIndex = opt_startSelectionIndex;
    this.component.endSelectionIndex = opt_endSelectionIndex;

    // Update mask for external mode.
    this.updateInternal();
    this.close();

  } else {
    // If we're here in minical internal, we started drag.
    this.dragStarted_ = true;

    this.calculateDates(this.startIndex_ =
        this.currentIndex_ = /**@type {number}*/(opt_startSelectionIndex));

  }

};


/**
 * Updates mask.
 * @protected
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.updateInternal = function() {
  // If cells are valid, we're initialized.
  this.initialized = true;

  if (!this.isMiniMonthExt_()) {
    var maxIndex = Math.max(this.startIndex_, this.currentIndex_);
    var minIndex = Math.min(this.startIndex_, this.currentIndex_);

    var range = maxIndex - minIndex + 1;
    if (range > 7) {
      minIndex -= minIndex % 7;
      if ((maxIndex + 1) % 7 != 0)
        maxIndex = Math.floor(maxIndex / 7) * 7 + 6 ;
    }

    this.calculateDateAndSelectionType_(minIndex, maxIndex);

    this.component.startSelectionIndex = minIndex;
    this.component.endSelectionIndex = maxIndex;
    this.component.updateByRedraw();
    
    goog.events.dispatchEvent(this.component, {
      type: rflect.cal.EventType.DATE_DRAG,
      startDate: this.startDate_,
      firstDayInMonth: this.firstDayInMonth_,
      duration: this.duration_,
      selectionConfiguration: this.selectionConfiguration_
    });
    this.draggedAtLeastOnce_ = true;
  }
};


/**
 * Calculates date and type of selection interval.
 */
rflect.cal.ui.MiniCalSelectionMask.prototype.calculateDateAndSelectionType_ =
    function(aMinIndex, aMaxIndex) {

  var tempDate = this.timeManager.daySeries[aMinIndex];
  this.startDate_ = new goog.date.DateTime(tempDate.getYear(),
      tempDate.getMonth(), tempDate.getDate());

  var duration = this.duration_ = aMaxIndex - aMinIndex + 1;

  var dayInMonth = this.timeManager.daySeries[6];
  var year = dayInMonth.getYear();
  var month = dayInMonth.getMonth();
  var indexOfFirstDayOfMonth = goog.array.findIndex(this.timeManager.daySeries,
      function(aDate){
    return aDate.getDate() == 1
  });
  var numberOfDaysInMonth = rflect.math.completeToDivisibleBy7(
      indexOfFirstDayOfMonth + goog.date.getNumberOfDaysInMonth(year, month));

  // Configuration detection.
  if (duration % 7 == 0) {
    // Month mode is tested first.
    if (duration == numberOfDaysInMonth) {
      this.selectionConfiguration_ = rflect.cal.TimeManager.Configuration.MONTH;
      tempDate = this.timeManager.daySeries[indexOfFirstDayOfMonth];
      this.firstDayInMonth_ = new goog.date.DateTime(tempDate.getYear(),
          tempDate.getMonth(), tempDate.getDate());
    } else if (duration == 7)
    // Week mode.
      this.selectionConfiguration_ =
          rflect.cal.TimeManager.Configuration.WEEK;
    else
    // Multi week mode.
      this.selectionConfiguration_ =
          rflect.cal.TimeManager.Configuration.MULTI_WEEK;

  } else if (duration == 1) {
  // Day mode.
    this.selectionConfiguration_ = rflect.cal.TimeManager.Configuration.DAY;
  } else {
  // Multiday mode.
    this.selectionConfiguration_ =
        rflect.cal.TimeManager.Configuration.MULTI_DAY;
  }

}