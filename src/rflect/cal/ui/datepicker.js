/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Datepicker component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.DatePicker');

goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.MiniCalBuilder');
goog.require('rflect.cal.MouseOverRegistry');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.string');



/**
 * Date picker main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @extends {rflect.ui.Component}
 * @constructor
 */
rflect.cal.ui.DatePicker = function(aViewManager) {
  rflect.ui.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Internal time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = new rflect.cal.TimeManager();
  this.timeManager_.configuration =
      rflect.cal.TimeManager.Configuration.MINI_MONTH;

  /**
   * Date picker builder.
   * @type {rflect.cal.MiniCalBuilder}
   * @private
   */
  this.miniCalBuilder_ = new rflect.cal.MiniCalBuilder(this,
      this.timeManager_);

  /**
   * Mouse over registry.
   * @type {rflect.cal.MouseOverRegistry}
   * @private
   */
  this.moRegistry_ = new rflect.cal.MouseOverRegistry();

};
goog.inherits(rflect.cal.ui.DatePicker, rflect.ui.Component);


/**
 * Date change event.
 * @const {string}
 */
rflect.cal.ui.DatePicker.EVENT_DATE_CHANGE = 'datechange';


/**
 * RegExp for detection of minical button.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.DatePicker.prototype.buttonRe_;


/**
 * RegExp for detection of minical datepicker area.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.DatePicker.prototype.fieldRe_;


/**
 * Day to use as basis for timemanager.
 * @type {goog.date.Date}
 */
rflect.cal.ui.DatePicker.prototype.basis_;


/**
 * Updates mini cal with new data before redraw.
 * If called parameterless, takes basis from external time manager, otherwise
 * we should use internal one.
 * @param {boolean=} opt_internal Whether method was called internally.
 * @param {rflect.cal.TimeManager.Direction=} opt_direction Direction where to
 * shift basis when called
 * internally.
 */
rflect.cal.ui.DatePicker.prototype.updateBeforeRedraw = function(opt_internal,
    opt_direction) {
  if (opt_internal && opt_direction){
    this.timeManager_.shift(opt_direction);
  } else {
    this.timeManager_.shiftToPoint(this.basis_);
  }
};


/**
 * Sets basis to specific date.
 * @param {goog.date.Date} aDate Date to set basis to.
 */
rflect.cal.ui.DatePicker.prototype.setBasis = function(aDate) {
  this.basis_ = aDate;
};


/**
 * Redraws mini cal with new data.
 */
rflect.cal.ui.DatePicker.prototype.updateByRedraw = function() {
  this.getElement().innerHTML = this.buildBody();
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#buildBody
 * @protected
 */
rflect.cal.ui.DatePicker.prototype.buildBodyInternal = function(aSb) {
  this.miniCalBuilder_.buildBodyInternal(aSb);
};


/**
 * Decorates an existing html div element as a Main Pane.
 * @override
 */
rflect.cal.ui.DatePicker.prototype.decorateInternal = function(aElement,
    opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.ui.DatePicker.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * @inheritDoc
 */
rflect.cal.ui.DatePicker.prototype.enterDocument = function() {
  rflect.cal.ui.DatePicker.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      this.onSelectStart_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      this.onMouseDown_, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp_, false, this);
};


/**
 * Date picker click handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.DatePicker.prototype.onClick_ = function(aEvent) {
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
 * Date picker mouseover handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.DatePicker.prototype.onMouseOver_ = function(aEvent) {
  var target = /** @type {Element} */ (aEvent.target);
  var className = target.className;

  if (this.isField_(className))
    this.moRegistry_.registerTarget(target,
        goog.getCssName('goog-date-picker-selected'));
};


/**
 * Date picker mouse out handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.DatePicker.prototype.onMouseOut_ = function(aEvent) {
  var target = aEvent.target;
  var className = target.className;

  if (this.isField_(className))
    this.moRegistry_.deregisterTarget();
}


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's selectable area.
 */
rflect.cal.ui.DatePicker.prototype.isInteractiveArea_ = function(aClassName) {
  return this.isButton_(aClassName) || this.isField_(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's button.
 */
rflect.cal.ui.DatePicker.prototype.isButton_ = function(aClassName) {
  return (this.buttonRe_ || (this.buttonRe_ = rflect.string.buildClassNameRe(
      goog.getCssName('goog-date-picker-btn')))).test(aClassName);
};


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's main field.
 */
rflect.cal.ui.DatePicker.prototype.isField_ = function(aClassName) {
  return (this.fieldRe_ || (this.fieldRe_ = rflect.string.buildClassNameRe(
      goog.getCssName('goog-date-picker-date')))).test(aClassName);
};


/**
 * Date picker selectstart handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.DatePicker.prototype.onSelectStart_ = function(aEvent) {
  var className = aEvent.target.className;

  if (this.isInteractiveArea_(className))
    aEvent.preventDefault();
};


/**
 * Date picker mousedown handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.DatePicker.prototype.onMouseDown_ = function(aEvent) {
  var className = aEvent.target.className;
  if (this.isInteractiveArea_(className))
    aEvent.preventDefault();

};


/**
 * Date picker mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.DatePicker.prototype.onMouseUp_ = function(aEvent) {
  var className = aEvent.target.className;
  var index = rflect.string.get2DigitIndex(aEvent.target.id);

  if (this.isField_(className) && !isNaN(index))
    goog.events.dispatchEvent(this,
      new rflect.cal.ui.DatePicker.Event(this.timeManager_.daySeries[index]));
};


/**
 * Date picker event.
 * @param {rflect.date.DateShim} aDate Date that was set in date picker.
 * @constructor
 */
rflect.cal.ui.DatePicker.Event = function(aDate) {

  this.type = rflect.cal.ui.DatePicker.EVENT_DATE_CHANGE;

  /**
   * Date that was set in date picker.
   * @type {rflect.date.DateShim}
   */
  this.date = aDate;
};

