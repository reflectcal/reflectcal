/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Side pane, place for generic menu.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.SidePane');

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



/**
 * Control pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {boolean=} opt_configTop Optional - whether pane is in top or bottom
 * configuration. True - top, false - bottom. Makes sense only for mobile.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.SidePane = function(aViewManager, aTimeManager, opt_configTop) {
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
   * Whether configuration is top.
   * @type {boolean|undefined}
   * @private
   */
  this.configTop_ = rflect.MOBILE && opt_configTop;

  /**
   * Whether configuration is bottom.
   * @type {boolean|undefined}
   * @private
   */
  this.configBottom_ = rflect.MOBILE && opt_configTop;

  /**
   * Whether configuration is combined - one top pane only.
   * @type {boolean}
   * @private
   */
  this.configCombined_ = !rflect.MOBILE;

  // Add buttons. No need for captions or content here, because we've decorated
  // them.
  if (this.configBottom_ || this.configCombined_)
    this.addChild(this.buttonNow_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configBottom_ || this.configCombined_)
    this.addChild(this.buttonPrev_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configBottom_ || this.configCombined_)
    this.addChild(this.buttonNext_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configTop_ || this.configCombined_)
    this.addChild(this.buttonNewEvent_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configTop_ || this.configCombined_)
    this.addChild(this.buttonDay_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configCombined_)
    this.addChild(this.buttonWeek_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configTop_ || this.configCombined_)
    this.addChild(this.buttonMonth_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  if (this.configCombined_)
    this.addChild(this.buttonOptions_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
};
goog.inherits(rflect.cal.ui.SidePane, rflect.ui.Component);


/**
 * Date header element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SidePane.prototype.timeLabel_ = null;


/**
 * Creates Top Pane on an empty div element.
 */
rflect.cal.ui.SidePane.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing html div element as a Top Pane.
 * @override
 */
rflect.cal.ui.SidePane.prototype.decorateInternal = function(aElement,
                                                         opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.ui.SidePane.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @protected
 */
rflect.cal.ui.SidePane.prototype.buildInternal = function(aSb) {

  var parts = [
    '<nav id="side-pane" class="control-pane">',
    '<ul class="pane-menu">',
    '</ul>',
    '<div id="calendars-selector" class="list-selector">',
    '</div>',
    '</nav>'
  ];

  // Form html. From index 1, because 0 is the html of outer container, which
  // we don't create in that method but just decorate.
  for (var counter = 1, length = parts.length - 1;
       counter < length; counter++) {
    aSb.append(parts[counter]);
  }
}


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.cal.ui.SidePane.prototype.enterDocument = function() {
  this.buttonNow_ && this.buttonNow_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NOW_ID));
  this.buttonPrev_ && this.buttonPrev_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_PREV_ID));
  this.buttonNext_ && this.buttonNext_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NEXT_ID));

  this.buttonNewEvent_ && this.buttonNewEvent_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NEW_EVENT_ID));

  this.buttonDay_ && this.buttonDay_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_DAY_ID));
  this.buttonWeek_ && this.buttonWeek_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_WEEK_ID));
  this.buttonMonth_ && this.buttonMonth_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_MONTH_ID));
  this.buttonOptions_ && this.buttonOptions_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_SETTINGS_ID));

  rflect.cal.ui.SidePane.superClass_.enterDocument.call(this);

  // Update buttons.
  this.updateButtons_();

  // Attaching event handlers.
  this.buttonNewEvent_ && this.getHandler().listen(this.buttonNewEvent_,
      goog.ui.Component.EventType.ACTION, function(aEvent) {
        this.dispatchEvent(rflect.cal.EventType.MENU_COMMAND_NEW_EVENT);
        aEvent.target.setFocused(false);
      }, false, this);
};


/**
 * @return {string} Date header in formatted form.
 */
rflect.cal.ui.SidePane.prototype.getDateHeader = function() {
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
    formatStart = new goog.i18n.DateTimeFormat('EEEE, ' +
        goog.i18n.DateTimePatterns.MONTH_DAY_FULL + ', yyyy');
    header = formatStart.format(startDate);

  }
  return header;
};


/**
 * No-op is used in order not to allow updateBeforeRedraw to be called on
 * buttons which don't have it.
 */
rflect.cal.ui.SidePane.prototype.updateBeforeRedraw = goog.nullFunction;


/**
 * Updates top pane by setting new date header.
 */
rflect.cal.ui.SidePane.prototype.updateByRedraw = function() {
  if (!this.timeLabel_)
    this.timeLabel_ = this.dom_.getElement('time-period-label');
  this.timeLabel_ && (this.timeLabel_.innerHTML = this.getDateHeader());
  // Update buttons.
  this.updateButtons_();
};


/**
 * Updates buttons according to current view.
 * @private
 */
rflect.cal.ui.SidePane.prototype.updateButtons_ = function() {
  var viewsToButtons = {};
  viewsToButtons[rflect.cal.ViewType.DAY] = this.buttonDay_;
  viewsToButtons[rflect.cal.ViewType.WEEK] = this.buttonWeek_;
  viewsToButtons[rflect.cal.ViewType.MONTH] = this.buttonMonth_;
  for (var view in viewsToButtons) {
    var button = viewsToButtons[view];
    // Not all view buttons are present in some configurations.
    if (!button)
      continue;
    if (this.viewManager_.currentView == view) {
      button.setChecked(true);
      button.setFocused(false);
      button.setAutoStates(goog.ui.Component.State.CHECKED, false);
    } else {
      button.setChecked(false);
      button.setAutoStates(goog.ui.Component.State.CHECKED, true);
    }
  }
  
  if (!this.buttonNow_)
    return;
  
  if (this.timeManager_.isInNowPoint) {
    this.buttonNow_.setChecked(true);
    this.buttonNow_.setFocused(false);
    this.buttonNow_.setAutoStates(goog.ui.Component.State.CHECKED, false);
  } else {
    this.buttonNow_.setChecked(false);
    this.buttonNow_.setAutoStates(goog.ui.Component.State.CHECKED, true);
  }
};


/**
 * Disposes of the component.  Calls {@code exitDocument}, which is expected to
 * remove event handlers and clean up the component.  Propagates the call to
 * the component's children, if any. Removes the component's DOM from the
 * document unless it was decorated.
 * @override
 * @protected
 */
rflect.cal.ui.SidePane.prototype.disposeInternal = function() {
  rflect.cal.ui.SidePane.superClass_.disposeInternal.call(this);

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
};
