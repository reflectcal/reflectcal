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
  this.miniCalBuilder_ = new rflect.cal.MiniCalBuilder(this, aExternalTimeManager);
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
 * @param {boolean=} opt_forward Direction where to shift basis when called
 * internally.
 */
rflect.cal.MiniCal.prototype.updateBeforeRedraw = function(opt_forward) {
  if (goog.isDef(opt_forward)){
    this.timeManager_.shiftToPoint(this.extTimeManager_.basis);
  } else {
    this.timeManager_.shift(opt_forward);
  }
  this.findIndexesForSelection_();
};


/**
 * Finds indexes of selection which is later to be used by
 * <code>updateByRedraw</code>.
 * @private
 */
rflect.cal.MiniCal.prototype.findIndexesForSelection_ = function() {
  this.firstSelectionIndex = -1;
  this.secondSelectionIndex = -1;

  if (!this.timeManagersOverlap_())
    return;

  var extTmDaySeries = this.extTimeManager_.daySeries;
  var tmDaySeries = this.timeManager_.daySeries;
  var weeknums = {};
  weeknums[extTmDaySeries[0].week] = 1;

  for (var counter = 0, step = 1, length = extTmDaySeries.length;
      counter < length; counter+=step){
    if (!(extTmDaySeries[counter] in weeknums)){
      weeknums[extTmDaySeries[counter].week] = 1;
      step = 7;
      counter += step;
    }
  }

};


rflect.cal.MiniCal.prototype.timeManagersOverlap_ = function() {
  var extTmDaySeries = this.extTimeManager_.daySeries;
  var tmDaySeries = this.timeManager_.daySeries;
  return rflect.date.compareByWeekAndYear(goog.array.peek(extTmDaySeries),
      tmDaySeries[0]) >= 0 && rflect.date.compareByWeekAndYear(
      extTmDaySeries[0], goog.array.peek(tmDaySeries)) <= 0;
}


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
      goog.nullFUnction, false, this);
};


/**
 * Mini cal click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onClick_ = function(aEvent) {
  var id = aEvent.target.id;
  var className = aEvent.target.className;
  // We clicked on button.
  if (/mn\-zippy\-row\d{1}/.test(id)) {
      index = /\d{1}/.exec(id)[0];
      this.blockManager_.blockPoolMonth.toggleBlock(index);

      // If all blocks are collapsed, reset scrollTop.
      if (!this.blockManager_.blockPoolMonth.expanded)
        this.blockManager_.blockPoolMonth.scrollTop = 0;

      zippyClicked = true;
    }
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
      this.blockManager_.blockPoolAllday.toggleBlock(0);

      zippyClicked = true;
    }
  }

  if (zippyClicked) {
    this.updateBeforeRedraw();
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
 * Shows next period for time view.
 */
rflect.cal.MiniCal.prototype.showNext = function() {
  this.showNext_(true);
};


/**
 * Shows previous period for time view.
 */
rflect.cal.MiniCal.prototype.showPrev = function() {
  this.showNext_(false);
};


/**
 * Shows next period for time view.
 * @param {boolean} aNext Whether to show next period.
 * @private
 */
rflect.cal.MiniCal.prototype.showNext_ = function(aNext) {
  //  if (goog.DEBUG) _perf('next interval');
  this.timeManager.shift(aNext);
  this.mainBody_.updateBeforeRedraw();
  this.mainBody_.updateByRedraw();
  //  if (goog.DEBUG) _perf('next interval');
};


/**
 * Shows current moment for time view.
 */
rflect.cal.MiniCal.prototype.showNow = function() {
  this.timeManager.shiftToNow();
  this.mainBody_.updateBeforeRedraw();
  this.mainBody_.updateByRedraw();
};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.MiniCal.prototype.disposeInternal = function() {
  rflect.cal.MiniCal.superClass_.disposeInternal.call(this);

  this.removeScrollListeners_();

  this.viewManager_ = null;
  this.timeManager_ = null;
  this.containerSizeMonitor_ = null;
};
