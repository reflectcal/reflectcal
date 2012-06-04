/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Mini-calendar component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MiniCal');

goog.require('goog.events.EventType');
goog.require('rflect.cal.Component');
goog.require('rflect.cal.MiniCalBuilder');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.cal.SelectionMask');
goog.require('rflect.cal.predefined');
goog.require('rflect.string');



/**
 * Mini cal main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aExternalTimeManager Link to external time
 * manager.
 * @constructor
 * @extends {rflect.cal.Component}
 */
rflect.cal.MiniCal = function(aViewManager, aExternalTimeManager) {
  rflect.cal.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * External time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.extTimeManager_ = aExternalTimeManager;

  /**
   * Internal time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = new rflect.cal.TimeManager();
  this.timeManager_.configuration =
      rflect.cal.TimeManager.Configuration.MINI_MONTH;

  /**
   * Mini cal builder.
   * @type {rflect.cal.MiniCalBuilder}
   * @private
   */
  this.miniCalBuilder_ = new rflect.cal.MiniCalBuilder(this,
      this.timeManager_);
  if (goog.DEBUG)
    _inspect('miniCalBuilder', this.miniCalBuilder_);

  /**
   * Selection mask.
   * @type {rflect.cal.SelectionMask}
   * @private
   */
  this.selectionMask_ = new rflect.cal.SelectionMask(aViewManager, this,
      aExternalTimeManager);
  if (goog.DEBUG)
    _inspect('selectionMask', this.selectionMask_);

};
goog.inherits(rflect.cal.MiniCal, rflect.cal.Component);


/**
 * Updates mini cal with new data before redraw.
 * If called parameterless, takes basis from external time manager, otherwise
 * we should use internal one.
 * @param {boolean=} opt_internal Whether method was called internally.
 * @param {rflect.cal.TimeManager.Direction=} opt_direction Direction where to
 * shift basis when called
 * internally.
 */
rflect.cal.MiniCal.prototype.updateBeforeRedraw = function(opt_internal,
    opt_direction) {
  if (opt_internal && opt_direction){
    this.timeManager_.shift(opt_direction);
  } else {
    this.timeManager_.shiftToPoint(this.extTimeManager_.basis);
  }
  this.findIndexesForSelection_();
};


/**
 * Finds indexes of selection which is later to be used by
 * <code>updateByRedraw</code>.
 * @private
 */
rflect.cal.MiniCal.prototype.findIndexesForSelection_ = function() {
  this.startSelectionIndex = -1;
  this.endSelectionIndex = -1;

  if (!this.timeManager_.interval.overlap(this.extTimeManager_.interval))
    return;

  var overlap = this.timeManager_.interval.overlap(
      this.extTimeManager_.interval);
  if (goog.DEBUG)
    _log('overlap', overlap);
  var startDate = new goog.date.Date();
  var endDate = new goog.date.Date();
  startDate.setTime(overlap.start);
  endDate.setTime(overlap.end);
  var startDateDay = startDate.getDate();
  var startDateMonth = startDate.getMonth();
  var endDateDay = endDate.getDate();
  var endDateMonth = endDate.getMonth();
  this.startSelectionIndex = goog.array.findIndex(this.timeManager_.daySeries,
      function(aDate){
    return startDateMonth == aDate.getMonth() &&
        startDateDay == aDate.getDate();
  });
  this.endSelectionIndex = goog.array.findIndexRight(
      this.timeManager_.daySeries, function(aDate){
    return endDateMonth == aDate.getMonth() &&
        endDateDay == aDate.getDate();
  });
  if (this.startSelectionIndex >= 0 && this.endSelectionIndex < 0)
    // Overlap interval ends in day that is not in day series. Use latest day's
    // tomorrow then.
    this.endSelectionIndex = this.timeManager_.daySeries.length;
  if (goog.DEBUG) {
    _log('this.startSelectionIndex', this.startSelectionIndex);
    _log('this.endSelectionIndex', this.endSelectionIndex);
  }
};


/**
 * Redraws mini cal with new data.
 */
rflect.cal.MiniCal.prototype.updateByRedraw = function() {
  this.getElement().innerHTML = this.buildBody();
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.cal.Component#buildBody
 * @protected
 */
rflect.cal.MiniCal.prototype.buildBodyInternal = function(aSb) {
  this.miniCalBuilder_.buildBodyInternal(aSb);
};


/**
 * Decorates an existing html div element as a Main Pane.
 * @override
 */
rflect.cal.MiniCal.prototype.decorateInternal = function(aElement,
    opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.MiniCal.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * @inheritDoc
 */
rflect.cal.MiniCal.prototype.enterDocument = function() {
  rflect.cal.MiniCal.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      goog.nullFunction, false, this)
      .listen(document, goog.events.EventType.MOUSEMOVE,
      goog.nullFunction, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      goog.nullFunction, false, this);
};


/**
 * Mini cal click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onClick_ = function(aEvent) {
  var className = aEvent.target.className;
  var direction = rflect.cal.TimeManager.Direction.NONE;
  // We clicked on button.
  if (rflect.string.buildClassNameRe(
      goog.getCssName('month-sel-btn-forward')).test(className)) {
    direction = rflect.cal.TimeManager.Direction.FORWARD;
  } else if (rflect.string.buildClassNameRe(
      goog.getCssName('month-sel-btn-back')).test(className)) {
    direction = rflect.cal.TimeManager.Direction.BACKWARD;
  }

  if (direction) {
    this.updateBeforeRedraw(true, direction);
    this.updateByRedraw();
  }
};


/**
 * @param {string} aClassName Class name of element to test whether it indicates
 * of month grid.
 * @private
 * @return {boolean} For month mode, whether class name indicates that this is a
 * month grid.
 */
rflect.cal.MiniCal.prototype.isMonthGrid_ = function(aClassName) {
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
 * Mini cal mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  var preventDefaultIsNeeded = false;

  if (goog.DEBUG){
    _log('aEvent.target.id', aEvent.target.id);
    _log('aEvent.target.className', aEvent.target.className);
  }

  // Whether we clicked on hollow space
  if (this.isWeekGrid_(className)) {
    this.selectionMask_.init(rflect.cal.SelectionMask.Configuration.WEEK,
        aEvent);
    preventDefaultIsNeeded = true;
  } else if (this.isAlldayGrid_(className)) {
    this.selectionMask_.init(rflect.cal.SelectionMask.Configuration.ALLDAY,
        aEvent);
    preventDefaultIsNeeded = true;
  } else if (this.isMonthGrid_(className)) {
    this.selectionMask_.init(rflect.cal.SelectionMask.Configuration.MONTH,
        aEvent);
    preventDefaultIsNeeded = true;
  }
  if (preventDefaultIsNeeded)
    aEvent.preventDefault();

};


/**
 * Mini cal selectstart handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onSelectStart_ = function(aEvent) {
  var className = aEvent.target.className;

  // Whether we clicked on grid space.
  if (this.isWeekGrid_(className) || this.isAlldayGrid_(className) ||
      this.isMonthGrid_(className))
    aEvent.preventDefault();
};


/**
 * Mini cal mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseUp_ = function(aEvent) {
  if (this.selectionMask_.visible) {
    this.selectionMask_.clear();
    aEvent.preventDefault();
  }

};


/**
 * Mini cal mousemove handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseMove_ = function(aEvent) {
  if (this.selectionMask_.visible) {
    this.selectionMask_.update(aEvent);
    aEvent.preventDefault();
  }

};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.MiniCal.prototype.disposeInternal = function() {
  rflect.cal.MiniCal.superClass_.disposeInternal.call(this);

  this.viewManager_ = null;
};
