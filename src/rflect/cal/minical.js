/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Mini-calendar component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MiniCal');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('rflect.cal.Component');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.MiniCalBuilder');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.cal.MiniCalSelectionMask');
goog.require('rflect.cal.predefined');
goog.require('rflect.string');



/**
 * Mini cal main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aExternalTimeManager Link to external time
 * manager.
 * @extends {rflect.cal.Component}
 * @constructor
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
   * @type {rflect.cal.MiniCalSelectionMask}
   */
  this.selectionMask = new rflect.cal.MiniCalSelectionMask(aViewManager, this,
      this.timeManager_);
  if (goog.DEBUG)
    _inspect('selectionMask', this.selectionMask);

  /**
   * Mouse over registry.
   * @type {rflect.cal.MouseOverRegistry}
   * @private
   */
  this.moRegistry_ = new rflect.cal.MouseOverRegistry();

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
  this.initMask_();
};


/**
 * Finds indexes of selection which is later to be used by
 * <code>updateByRedraw</code>.
 * @private
 */
rflect.cal.MiniCal.prototype.initMask_ = function() {
  var startSelectionIndex = -1;
  var endSelectionIndex = -1;

  if (this.timeManager_.interval.overlaps(this.extTimeManager_.interval)) {

    var overlap = this.timeManager_.interval.overlap(
        this.extTimeManager_.interval);
    var startDate = new goog.date.Date();
    var endDate = new goog.date.Date();
    startDate.setTime(overlap.start);
    endDate.setTime(overlap.end);
    var startDateDay = startDate.getDate();
    var startDateMonth = startDate.getMonth();
    var endDateDay = endDate.getDate();
    var endDateMonth = endDate.getMonth();
    startSelectionIndex = goog.array.findIndex(this.timeManager_.daySeries,
        function(aDate){
      return startDateMonth == aDate.getMonth() &&
          startDateDay == aDate.getDate();
    });
    endSelectionIndex = goog.array.findIndexRight(
        this.timeManager_.daySeries, function(aDate){
      return endDateMonth == aDate.getMonth() &&
          endDateDay == aDate.getDate();
    });
    if (startSelectionIndex >= 0) {
      if(endSelectionIndex < 0)
        // We haven't found end index, so use latest. Because time interval ends in
        // tomorrow relative to latest selected cell, use index - 1.
        endSelectionIndex = this.timeManager_.daySeries.length - 1;
      else
        endSelectionIndex--;
    }

  }

  this.selectionMask.init(
      rflect.cal.MiniCalSelectionMask.Configuration.MINI_MONTH_EXTERNAL,
      startSelectionIndex, endSelectionIndex);
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
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      goog.nullFunction, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      this.onMouseDown_, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      this.onSelectStart_, false, this)
      .listen(document, goog.events.EventType.MOUSEMOVE,
      this.onMouseMove_, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp_, false, this);
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
 * Mini cal mouseover handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseOver_ = function(aEvent) {
  var target = /** @type {Element} */ aEvent.target;
  var className = target.className;
  var deregister = false;

  if (this.isField_(className)) {

    var index = rflect.string.get2DigitIndex(target.id);
    if (!this.selectionMask.getIndexIsInMask(index))
      this.moRegistry_.registerTarget(target,
          goog.getCssName('goog-date-picker-selected'));
    else
      deregister = true;
  } else
    deregister = true;
  if (deregister)
    this.moRegistry_.registerTarget(null);
};


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's selectable area.
 */
rflect.cal.MiniCal.prototype.isInteractiveArea_ = function(aClassName) {
  return this.isButton_(aClassName) || this.isField_(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's button.
 */
rflect.cal.MiniCal.prototype.isButton_ = function(aClassName) {
  return (this.buttonRe_ || (this.buttonRe_ = rflect.string.buildClassNameRe(
    goog.getCssName('goog-date-picker-btn')))).test(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's main field.
 */
rflect.cal.MiniCal.prototype.isField_ = function(aClassName) {
  return (this.fieldRe_ || (this.fieldRe_ = rflect.string.buildClassNameRe(
      goog.getCssName('goog-date-picker-date')))).test(aClassName);
};


/**
 * Mini cal mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  var index = rflect.string.get2DigitIndex(aEvent.target.id);

  if (this.isField_(className))
    this.selectionMask.init(
        rflect.cal.MiniCalSelectionMask.Configuration.MINI_MONTH_INTERNAL,
        index, 0);

  if (this.isInteractiveArea_(className))
    aEvent.preventDefault();

};


/**
 * Mini cal selectstart handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onSelectStart_ = function(aEvent) {
  var className = aEvent.target.className;

  if (this.isInteractiveArea_(className))
    aEvent.preventDefault();
};


/**
 * Mini cal mousemove handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseMove_ = function(aEvent) {
  var index = rflect.string.get2DigitIndex(aEvent.target.id);
  if (this.selectionMask.isDragStarted() &&
      rflect.string.buildClassNameRe(goog.getCssName('goog-date-picker-date'))
      .test(aEvent.target.className)){
    this.selectionMask.update(index);
    aEvent.preventDefault();
  }
};


/**
 * Mini cal mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.MiniCal.prototype.onMouseUp_ = function(aEvent) {
  if (this.selectionMask.isDragStarted()){
    this.selectionMask.close();
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
