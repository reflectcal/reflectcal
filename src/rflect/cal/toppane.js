/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar top pane, place for control buttons.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TopPane');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimePatterns');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Component.State');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('goog.ui.ToggleButton');
goog.require('rflect.cal.Button');
goog.require('rflect.cal.Component');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');



/**
 * Top pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 * @extends {rflect.cal.Component}
 */
rflect.cal.TopPane = function(aViewManager, aTimeManager) {
  rflect.cal.Component.call(this);

  this.viewManager_ = aViewManager;
  this.timeManager_ = aTimeManager;

  // Add buttons. No need for captions or content here, because we've decorated
  // them.
  this.addChild(this.buttonNow_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonPrev_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonNext_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonNewEvent_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonDay_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonWeek_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonMonth_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonOptions_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
};
goog.inherits(rflect.cal.TopPane, rflect.cal.Component);


/**
 * Link to view manager.
 * @type {rflect.cal.ViewManager}
 * @private
 */
rflect.cal.MainPane.prototype.viewManager_ = null;


/**
 * Link to time manager.
 * @type {rflect.cal.TimeManager}
 * @private
 */
rflect.cal.MainPane.prototype.timeManager_ = null;


/**
 * Date header element.
 * @type {Element}
 * @private
 */
rflect.cal.TopPane.prototype.timeLabel_ = null;


/**
 * Creates Top Pane on an empty div element.
 */
rflect.cal.TopPane.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing html div element as a Top Pane.
 * @override
 */
rflect.cal.TopPane.prototype.decorateInternal = function(aElement,
                                                         opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.TopPane.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.cal.Component#buildBody
 * @protected
 */
rflect.cal.TopPane.prototype.buildBodyInternal = function(aSb) {
  // TODO(alexk): concatenate strings.
  var parts = [
    '<div id="top-pane">',
    '<div id="sidebar-controls">',
    // First button container.
    // 'Now' button.
    '<div id="' + rflect.cal.predefined.BUTTON_NOW_ID +
        '" class="goog-flat-button-collapse-right ',
    'cal-menu-leftmost-button goog-flat-button-bord-rad-collapse-right',
    ' cal-menu-button cal-menu-button-now">',
    rflect.cal.i18n.Symbols.NOW,
    '</div>',

    // Back button.
    '<div id="' + rflect.cal.predefined.BUTTON_PREV_ID +
        '" class="goog-flat-button-collapse-left ',
    'goog-flat-button-collapse-right goog-flat-button-bord-rad-collapse-both ',
    'cal-menu-button cal-menu-button-back"><div class="button-sign button-sign-back goog-inline-block"></div></div>',

    // Forward button.
    '<div id="' + rflect.cal.predefined.BUTTON_NEXT_ID + '" class="goog-flat-button-collapse-left ',
    'cal-menu-rightmost-button goog-flat-button-bord-rad-collapse-left ',
    'cal-menu-button cal-menu-button-forward"><div class="button-sign button-sign-forward goog-inline-block"></div></div></div>',

    '<div id="main-pane-controls"><div id="main-pane-controls-right">',
    '<div style="margin-right: 0px;" class="goog-inline-block">',
    // Day button.
    '<div id="' + rflect.cal.predefined.BUTTON_DAY_ID + '" class="goog-flat-button-collapse-right goog-toggle-button ',
    'goog-flat-button-bord-rad-collapse-right cal-menu-button">',
    rflect.cal.i18n.Symbols.DAY,
    '</div>',
    // Week button.
    '<div id="' + rflect.cal.predefined.BUTTON_WEEK_ID + '" class="goog-flat-button-collapse-left goog-toggle-button ',
    'goog-flat-button-collapse-right ',
    'goog-flat-button-bord-rad-collapse-both cal-menu-button">',
    rflect.cal.i18n.Symbols.WEEK,
    '</div>',
    // Month button.
    '<div id="' + rflect.cal.predefined.BUTTON_MONTH_ID + '" class="goog-flat-button goog-flat-button-collapse-left goog-toggle-button ',
    'goog-flat-button-bord-rad-collapse-left cal-menu-button ',
    'cal-menu-button-month-view">',
    rflect.cal.i18n.Symbols.MONTH,
    '</div></div>',
    // Options button.
    '<div id="' + rflect.cal.predefined.BUTTON_OPTIONS_ID + '" class="goog-flat-button cal-menu-rightmost-button cal-menu-button ',
    'cal-menu-button-options">',
    '<div class="button-sign button-sign-options goog-inline-block"></div>',
    '</div></div>',
    '<div id="main-pane-controls-left"><div id="main-pane-controls-left-left">',
    // New event button.
    '<div id="' + rflect.cal.predefined.BUTTON_NEW_EVENT_ID + '" class="cal-menu-button cal-menu-button-new-event ',
    'cal-menu-leftmost-button">',
    rflect.cal.i18n.Symbols.NEW_EVENT,
    '</div></div>',
    '<div id="main-pane-controls-left-right">',
    // Time period label.
    '<div id="time-period-label">',
    this.getDateHeader(),
    '</div></div>',
    '</div></div>',
    '</div>'
  ];

  // Form html. From index 1, because 0 is the html of outer container, which
  // we don't create in that method but just decorate.
  for (var counter = 1, length = parts.length - 1;
       counter < length; counter++) {
    aSb.append(parts[counter]);
  }
};


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.cal.TopPane.prototype.enterDocument = function() {
  this.buttonNow_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NOW_ID));
  this.buttonPrev_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_PREV_ID));
  this.buttonNext_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NEXT_ID));

  this.buttonNewEvent_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_NEW_EVENT_ID));

  this.buttonDay_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_DAY_ID));
  this.buttonWeek_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_WEEK_ID));
  this.buttonMonth_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_MONTH_ID));
  this.buttonOptions_.decorate(this.dom_.getElement(
      rflect.cal.predefined.BUTTON_OPTIONS_ID));

  rflect.cal.TopPane.superClass_.enterDocument.call(this);

  // Update buttons.
  this.updateButtons_();

  // Attaching event handlers.
  this.getHandler().listen(this.buttonNewEvent_,
      goog.ui.Component.EventType.ACTION, function(aEvent) {
        this.dispatchEvent(rflect.cal.EventType.MENU_COMMAND_NEW_EVENT);
        aEvent.target.setFocused(false);
      }, false, this);
};


/**
 * @return {string} Date header in formatted form.
 */
rflect.cal.TopPane.prototype.getDateHeader = function() {
  var startDate = this.timeManager_.daySeries[0];
  var endDate = /** @type {rflect.date.Date} */
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
rflect.cal.TopPane.prototype.updateBeforeRedraw = goog.nullFunction;


/**
 * Updates top pane by setting new date header.
 */
rflect.cal.TopPane.prototype.updateByRedraw = function() {
  if (!this.timeLabel_)
    this.timeLabel_ = this.dom_.getElement('time-period-label');
  this.timeLabel_.innerHTML = this.getDateHeader();
  // Update buttons.
  this.updateButtons_();
};


/**
 * Updates buttons according to current view.
 * @private
 */
rflect.cal.TopPane.prototype.updateButtons_ = function() {
  var viewsToButtons = {};
  viewsToButtons[rflect.cal.ViewType.DAY] = this.buttonDay_;
  viewsToButtons[rflect.cal.ViewType.WEEK] = this.buttonWeek_;
  viewsToButtons[rflect.cal.ViewType.MONTH] = this.buttonMonth_;
  for (var view in viewsToButtons) {
    var button = viewsToButtons[view];
    if (this.viewManager_.currentView == view) {
      button.setChecked(true);
      button.setFocused(false);
      button.setAutoStates(goog.ui.Component.State.CHECKED, false);
    } else {
      button.setChecked(false);
      button.setAutoStates(goog.ui.Component.State.CHECKED, true);
    }
  }
  if (this.timeManager_.isInNowPoint()) {
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
rflect.cal.TopPane.prototype.disposeInternal = function() {
  rflect.cal.TopPane.superClass_.disposeInternal.call(this);

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
