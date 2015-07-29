/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar top pane, place for control buttons.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.ControlPane');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimePatterns');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Component.State');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('goog.ui.ToggleButton');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.ViewButtonUpdater');
goog.require('rflect.cal.ui.soy.controlpane');



/**
 * Control pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.ControlPane = function(aViewManager, aTimeManager, aNavigator) {
  rflect.ui.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  /**
   * View button updater.
   * @type {rflect.cal.ui.ViewButtonUpdater}
   * @private
   */
  this.viewButtonUpdater_ = new rflect.cal.ui.ViewButtonUpdater(this,
      this.viewManager_, this.timeManager_);

  var isSmallScreen = this.navigator_.isSmallScreen();

  // Add buttons. No need for captions or content here, because we've decorated
  // them.
  if (rflect.SIDE_PANE_MOVABLE || isSmallScreen)
    this.addChild(this.buttonMenu_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonNow_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonPrev_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonNext_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonNewEvent_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  if (!isSmallScreen){
    this.addChild(this.buttonDay_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
    this.addChild(this.buttonWeek_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
    this.addChild(this.buttonMonth_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
    this.addChild(this.buttonOptions_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  }
};
goog.inherits(rflect.cal.ui.ControlPane, rflect.ui.Component);


/**
 * Date header element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.ControlPane.prototype.timeLabel_ = null;


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.ControlPane.prototype.getButtonDay = function(){
  return this.buttonDay_;
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.ControlPane.prototype.getButtonWeek = function(){
  return this.buttonWeek_;
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.ControlPane.prototype.getButtonMonth = function(){
  return this.buttonMonth_;
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.ControlPane.prototype.getButtonNow = function(){
  return this.buttonNow_;
};


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string}
 * @override
 */
rflect.cal.ui.ControlPane.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.controlpane.controlPane({
    id: this.getId(),
    isSmallScreen: this.navigator_.isSmallScreen(),
    includeOuterHTML: opt_outerHTML,
    timePeriodLabel: this.getDateHeader(),
    sidePaneMovable: rflect.SIDE_PANE_MOVABLE
  });
}


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.cal.ui.ControlPane.prototype.enterDocument = function() {
  var isSmallScreen = this.navigator_.isSmallScreen();

  if (!isSmallScreen) {
    this.buttonOptions_.decorate(this.dom_.getElement(
        rflect.cal.predefined.BUTTON_SETTINGS_ID));
    this.buttonDay_.decorate(this.dom_.getElement(
        rflect.cal.predefined.BUTTON_DAY_ID));
    this.buttonWeek_.decorate(this.dom_.getElement(
        rflect.cal.predefined.BUTTON_WEEK_ID));
    this.buttonMonth_.decorate(this.dom_.getElement(
        rflect.cal.predefined.BUTTON_MONTH_ID));
  }

  this.buttonPrev_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_PREV_ID));
  this.buttonNext_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NEXT_ID));
  this.buttonNow_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NOW_ID));
  this.buttonNewEvent_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NEW_EVENT_ID));

  if (isSmallScreen || rflect.SIDE_PANE_MOVABLE)
    this.buttonMenu_.decorate(this.dom_.getElement(
        rflect.cal.predefined.BUTTON_MENU_ID));

  rflect.cal.ui.ControlPane.superClass_.enterDocument.call(this);

  // Update buttons.
  this.viewButtonUpdater_.updateButtons();

  // Attaching event handlers.
  if (!isSmallScreen) {
    this.getHandler().listen(this.buttonNewEvent_,
        goog.ui.Component.EventType.ACTION, function(aEvent) {
      this.dispatchEvent(rflect.cal.EventType.MENU_COMMAND_NEW_EVENT);
      aEvent.target.setFocused(false);
    }, false, this);
  }
};


/**
 * @return {string} Date header in formatted form.
 */
rflect.cal.ui.ControlPane.prototype.getDateHeader = function() {
  var startDate = this.timeManager_.daySeries[0];
  var endDate = /** @type {rflect.date.DateShim} */
      (goog.array.peek(this.timeManager_.daySeries));
  var basis = this.timeManager_.basis;
  var header;
  var formatStart;
  var formatEnd;
  var formatStringStart;
  var formatStringEnd;

  if (this.viewManager_.currentView == rflect.cal.ViewType.MONTH) {
    // Month case.
    formatStart = new goog.i18n.DateTimeFormat(
        goog.i18n.DateTimePatterns.YEAR_MONTH_FULL);
    header = formatStart.format(basis);

  } else if (startDate.getFullYear() != endDate.getFullYear()) {
    // All fields are not equal.
    formatStringStart = goog.i18n.DateTimePatterns.MONTH_DAY_ABBR;
    formatStart = new goog.i18n.DateTimeFormat(formatStringStart + ', yyyy -');
    formatEnd = new goog.i18n.DateTimeFormat(' ' + formatStringStart +
        ', yyyy');
    header = formatStart.format(startDate) + formatEnd.format(endDate);

  } else if (startDate.getMonth() != endDate.getMonth()) {
    // Year is equal.
    formatStringStart = goog.i18n.DateTimePatterns.MONTH_DAY_ABBR;
    formatStart = new goog.i18n.DateTimeFormat(formatStringStart + ' -');
    formatEnd = new goog.i18n.DateTimeFormat(' ' + formatStringStart +
        ', yyyy');
    header = formatStart.format(startDate) + formatEnd.format(endDate);

  } else if (startDate.getDate() != endDate.getDate()) {
    // Month is equal.
    formatStringStart = goog.i18n.DateTimePatterns.DAY_ABBR;
    formatStart = new goog.i18n.DateTimeFormat(formatStringStart + ' -');
    formatEnd = new goog.i18n.DateTimeFormat(' d MMM, yyyy');
    header = formatStart.format(startDate) + formatEnd.format(endDate);

  } else {

    // Single day case.
    if (this.navigator_.isSmallScreen()){
      formatStart = new goog.i18n.DateTimeFormat('EEE, MMM dd, yyyy');
    } else {
      formatStart = new goog.i18n.DateTimeFormat('EEEE, ' +
          goog.i18n.DateTimePatterns.MONTH_DAY_FULL + ', yyyy');
    }
    header = formatStart.format(startDate);

  }
  return header;
};


/**
 * No-op is used in order not to allow updateBeforeRedraw to be called on
 * buttons which don't have it.
 */
rflect.cal.ui.ControlPane.prototype.updateBeforeRedraw = goog.nullFunction;


/**
 * Updates top pane by setting new date header.
 * @override
 */
rflect.cal.ui.ControlPane.prototype.updateByRedraw = function() {
  if (!this.timeLabel_)
    this.timeLabel_ = this.dom_.getElement('time-period-label');
  this.timeLabel_ && (this.timeLabel_.innerHTML = this.getDateHeader());
  // Update buttons.
  this.viewButtonUpdater_.updateButtons();
};


/**
 * Disposes of the component.  Calls {@code exitDocument}, which is expected to
 * remove event handlers and clean up the component.  Propagates the call to
 * the component's children, if any. Removes the component's DOM from the
 * document unless it was decorated.
 * @override
 * @protected
 */
rflect.cal.ui.ControlPane.prototype.disposeInternal = function() {
  rflect.cal.ui.ControlPane.superClass_.disposeInternal.call(this);

  this.timeManager_ = null;

  this.timeLabel_ = null;

  this.buttonNow_ = null;
  this.buttonPrev_ = null;
  this.buttonNext_ = null;
  this.buttonNewEvent_ = null;
  this.buttonDay_ = null;
  this.buttonWeek_ = null;
  this.buttonMonth_ = null;
  this.buttonOptions_ = null;
  this.buttonMenu_ = null;
};
