/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Datepicker component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.DatePicker');

goog.require('goog.array');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('rflect.ui.UpdatableComponent');
goog.require('rflect.cal.ui.DatePickerBuilder');
goog.require('rflect.ui.MouseOverRegistry');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.date');
goog.require('rflect.string');



/**
 * Date picker main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @extends {rflect.ui.UpdatableComponent}
 * @constructor
 */
rflect.cal.ui.DatePicker = function(aViewManager) {
  rflect.ui.UpdatableComponent.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @protected
   */
  this.viewManager = aViewManager;

  /**
   * Internal time manager.
   * @type {rflect.cal.TimeManager}
   * @protected
   */
  this.timeManager = new rflect.cal.TimeManager();
  this.timeManager.configuration =
      rflect.cal.TimeManager.Configuration.MINI_MONTH;

  /**
   * Date picker builder.
   * @type {rflect.cal.ui.DatePickerBuilder}
   * @private
   */
  this.miniCalBuilder_ = new rflect.cal.ui.DatePickerBuilder(this,
      this.timeManager);

  /**
   * Mouse over registry.
   * @type {rflect.ui.MouseOverRegistry}
   * @private
   */
  this.moRegistry_ = new rflect.ui.MouseOverRegistry();

};
goog.inherits(rflect.cal.ui.DatePicker, rflect.ui.UpdatableComponent);


/**
 * Date change event.
 * @const {string}
 */
rflect.cal.ui.DatePicker.EVENT_DATE_CHANGE = 'datechange';


/**
 * @param {rflect.date.DateShim} aBasis Basis to compare to.
 * @param {rflect.date.DateShim} aEl Element for comparing.
 * @return {boolean} True if basis found.
 * @private
 */
rflect.cal.ui.DatePicker.dateFinder_ = function(aBasis, aEl) {
  return aBasis.equalsByDate(aEl);
}


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
 * Shim basis, for quick basis index search.
 * @type {rflect.date.DateShim}
 */
rflect.cal.ui.DatePicker.prototype.basisShim_;


/**
 * Index of basis in time manager.
 * @type {number}
 */
rflect.cal.ui.DatePicker.prototype.basisIndex = -1;


/**
 * Start selection index.
 * @type {number}
 */
rflect.cal.ui.DatePicker.prototype.startSelectionIndex = -1;


/**
 * End selection index.
 * @type {number}
 */
rflect.cal.ui.DatePicker.prototype.endSelectionIndex = -1;


/**
 * Updates mini cal with new data before redraw.
 * If called parameterless, takes basis from external time manager, otherwise
 * we should use internal one.
 * @override
 */
rflect.cal.ui.DatePicker.prototype.updateBeforeRedraw = function({
  // Whether method was called internally.
  internal = false,
  // Direction where to shift basis when called.
  // internally.
  direction = /** @type {rflect.cal.TimeManager.Direction} */ (0)
} = {
  internal: false,
  direction: /** @type {rflect.cal.TimeManager.Direction} */ (0)
}) {
  if (internal && direction) {
    this.timeManager.shift(direction);
  } else {
    this.timeManager.shiftToPoint(this.basis_);
  }

  this.basisIndex = goog.array.findIndex(this.timeManager.daySeries,
      goog.partial(rflect.cal.ui.DatePicker.dateFinder_, this.basisShim_));
};


/**
 * Sets basis to specific date.
 * @param {goog.date.Date} aDate Date to set basis to.
 */
rflect.cal.ui.DatePicker.prototype.setBasis = function(aDate) {
  this.basis_ = aDate;
  this.basisShim_ = rflect.date.createDateShim(aDate.getYear(),
      aDate.getMonth(), aDate.getDate(), 0, 0, 0);
};


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string} HTML of component.
 * @override
 */
rflect.cal.ui.DatePicker.prototype.buildHTML = function(opt_outerHTML) {
  return this.miniCalBuilder_.buildHTML(opt_outerHTML);
}


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
      this.onMouseDown, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp, false, this);
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
    this.update({
      internal: true,
      direction: direction
    });
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

  if (this.isField(className))
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

  if (this.isField(className))
    this.moRegistry_.deregisterTarget();
}


/**
 * @param {string} aClassName Class name of element to test.
 * @private
 * @return {boolean} Whether it's selectable area.
 */
rflect.cal.ui.DatePicker.prototype.isInteractiveArea_ = function(aClassName) {
  return this.isButton_(aClassName) || this.isField(aClassName);
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
 * @protected
 * @return {boolean} Whether it's main field.
 */
rflect.cal.ui.DatePicker.prototype.isField = function(aClassName) {
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
 * @protected
 */
rflect.cal.ui.DatePicker.prototype.onMouseDown = function(aEvent) {
  var className = aEvent.target.className;
  if (this.isInteractiveArea_(className))
    aEvent.preventDefault();

};


/**
 * Date picker mouseup handler.
 * @param {goog.events.Event} aEvent Event object.
 * @protected
 */
rflect.cal.ui.DatePicker.prototype.onMouseUp = function(aEvent) {
  var className = aEvent.target.className;
  var index = rflect.string.get2DigitIndex(aEvent.target.id);

  if (this.isField(className) && !isNaN(index))
    goog.events.dispatchEvent(this,
      new rflect.cal.ui.DatePicker.Event(this.timeManager.daySeries[index]));
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

