/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Mini-calendar component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MiniCal');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.ui.MiniCalSelectionMask');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.string');
goog.require('rflect.cal.ui.DatePicker');



/**
 * Mini cal main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aExternalTimeManager Link to external time
 * manager.
 * @extends {rflect.cal.ui.DatePicker}
 * @constructor
 */
rflect.cal.ui.MiniCal = function(aViewManager, aExternalTimeManager) {
  rflect.cal.ui.DatePicker.call(this, aViewManager);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @protected
   */
  this.viewManager = aViewManager;

  /**
   * External time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.extTimeManager_ = aExternalTimeManager;

  /**
   * Selection mask.
   * @type {rflect.cal.ui.MiniCalSelectionMask}
   */
  this.selectionMask = new rflect.cal.ui.MiniCalSelectionMask(aViewManager, this,
      this.timeManager);
  if (goog.DEBUG)
    _inspect('selectionMask', this.selectionMask);

};
goog.inherits(rflect.cal.ui.MiniCal, rflect.cal.ui.DatePicker);


/**
 * RegExp for detection of minical button.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MiniCal.prototype.buttonRe_;


/**
 * RegExp for detection of minical datepicker area.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.MiniCal.prototype.fieldRe_;


/**
 * Updates mini cal with new data before redraw.
 * If called parameterless, takes basis from external time manager, otherwise
 * we should use internal one.
 * @param {boolean=} opt_deep Whether to update children.
 * @param {boolean=} opt_internal Whether method was called internally.
 * @param {rflect.cal.TimeManager.Direction=} opt_direction Direction where to
 * shift basis when called
 * internally.
 */
rflect.cal.ui.MiniCal.prototype.updateBeforeRedraw = function(opt_deep,
    opt_internal, opt_direction) {
  if (opt_internal && opt_direction){
    this.timeManager.shift(opt_direction);
  } else {
    this.timeManager.shiftToPoint(this.extTimeManager_.basis);
  }
  this.initMask_();
};


/**
 * Finds indexes of selection which is later to be used by
 * <code>updateByRedraw</code>.
 * @private
 */
rflect.cal.ui.MiniCal.prototype.initMask_ = function() {
  var startSelectionIndex = -1;
  var endSelectionIndex = -1;

  if (this.timeManager.interval.overlaps(this.extTimeManager_.interval)) {

    var overlap = this.timeManager.interval.overlap(
        this.extTimeManager_.interval);
    var startDate = new goog.date.Date();
    var endDate = new goog.date.Date();
    startDate.setTime(overlap.start);
    endDate.setTime(overlap.end);
    var startDateDay = startDate.getDate();
    var startDateMonth = startDate.getMonth();
    var endDateDay = endDate.getDate();
    var endDateMonth = endDate.getMonth();
    startSelectionIndex = goog.array.findIndex(this.timeManager.daySeries,
        function(aDate){
      return startDateMonth == aDate.getMonth() &&
          startDateDay == aDate.getDate();
    });
    endSelectionIndex = goog.array.findIndexRight(
        this.timeManager.daySeries, function(aDate){
      return endDateMonth == aDate.getMonth() &&
          endDateDay == aDate.getDate();
    });
    if (startSelectionIndex >= 0) {
      if(endSelectionIndex < 0)
        // We haven't found end index, so use latest. Because time interval ends in
        // tomorrow relative to latest selected cell, use index - 1.
        endSelectionIndex = this.timeManager.daySeries.length - 1;
      else
        endSelectionIndex--;
    }

  }

  this.startSelectionIndex = startSelectionIndex;
  this.endSelectionIndex = endSelectionIndex;
  this.selectionMask.init(
      rflect.cal.ui.MiniCalSelectionMask.Configuration.MINI_MONTH_EXTERNAL,
      startSelectionIndex, endSelectionIndex);
};


/**
 * @inheritDoc
 */
rflect.cal.ui.MiniCal.prototype.enterDocument = function() {
  rflect.cal.ui.MiniCal.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      this.onMouseDown, false, this)
      .listen(document, goog.events.EventType.MOUSEMOVE,
      this.onMouseMove_, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp, false, this);
};


/**
 * Mini cal mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @protected
 */
rflect.cal.ui.MiniCal.prototype.onMouseDown = function(aEvent) {
  var className = aEvent.target.className;
  var index = rflect.string.get2DigitIndex(aEvent.target.id);

  if (this.isField(className)) {
    this.selectionMask.init(
        rflect.cal.ui.MiniCalSelectionMask.Configuration.MINI_MONTH_INTERNAL,
        index, 0);
  }

  aEvent.preventDefault();

};


/**
 * Mini cal mousemove handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MiniCal.prototype.onMouseMove_ = function(aEvent) {
  var target = aEvent.target;
  var index = rflect.string.get2DigitIndex(target.id);
  var className = target.className;

  if (this.selectionMask.isDragStarted() && this.isField(className) &&
      !isNaN(index)){
    this.selectionMask.update(index);
    aEvent.preventDefault();
  }
};


/**
 * Mini cal mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @protected
 */
rflect.cal.ui.MiniCal.prototype.onMouseUp = function(aEvent) {
  if (this.selectionMask.isDragStarted()){
    this.selectionMask.close();
    aEvent.preventDefault();
  }
};
