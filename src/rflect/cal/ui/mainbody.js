/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar main body, root of all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MainBody');

goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.Transport');
goog.require('rflect.cal.ui.CalendarsPane.EventTypes');
goog.require('rflect.cal.ui.CalSelector');
goog.require('rflect.cal.ui.CalSelector.EventType');
goog.require('rflect.cal.ui.ControlPane');
goog.require('rflect.cal.ui.EventPane');
goog.require('rflect.cal.ui.EventPane.EventTypes');
goog.require('rflect.cal.ui.MainPane');
goog.require('rflect.cal.ui.MiniCal');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.cal.ui.PaneShowBehavior.SlideBreakPointEvent');
goog.require('rflect.cal.ui.TaskSelector');
goog.require('rflect.cal.ui.SettingsPane');
goog.require('rflect.cal.ui.SettingsPane.EventTypes');
goog.require('rflect.cal.ui.SidePane');



/**
 * Main body main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.MainBody = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aBlockManager, aTransport) {
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
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Link to block manager.
   * @type {rflect.cal.blocks.BlockManager}
   * @private
   */
  this.blockManager_ = aBlockManager;

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @private
   */
  this.transport_ = aTransport;

  // Add child components in order for them to be included in propagation of
  // string building and updating.
  if (rflect.MOBILE) {
    this.addChild(this.topPane_ = new rflect.cal.ui.ControlPane(
        this.viewManager_, this.timeManager_, true));
    this.addChild(this.mainPane_ = new rflect.cal.ui.MainPane(this.viewManager_,
        this.timeManager_, this.eventManager_, this.containerSizeMonitor_,
        this.blockManager_, this.transport_));
    this.addChild(this.sidePane_ = new rflect.cal.ui.SidePane(
        this.viewManager_, this.timeManager_, this.eventManager_,
        this.containerSizeMonitor_));
    this.addChild(this.bottomPane_ = new rflect.cal.ui.ControlPane(
        this.viewManager_, this.timeManager_, false));
  } else {
    this.addChild(this.topPane_ = new rflect.cal.ui.ControlPane(
        this.viewManager_, this.timeManager_));
    this.addChild(this.mainPane_ = new rflect.cal.ui.MainPane(this.viewManager_,
        this.timeManager_, this.eventManager_, this.containerSizeMonitor_,
        this.blockManager_, this.transport_));
    this.addChild(this.miniCal_ = new rflect.cal.ui.MiniCal(this.viewManager_,
        this.timeManager_));
    this.addChild(this.calSelector_ = new rflect.cal.ui.CalSelector(
        this.viewManager_, this.containerSizeMonitor_, this.eventManager_));
    this.addChild(this.taskSelector_ = new rflect.cal.ui.TaskSelector(
        this.viewManager_, this.containerSizeMonitor_));
  }

  if (goog.DEBUG) {
    _inspect('topPane_', this.topPane_);
    _inspect('miniCal_', this.miniCal_);
    _inspect('mainPane_', this.mainPane_);
    _inspect('taskSelector_', this.taskSelector_);
    _inspect('calSelector_', this.calSelector_);
  }
};
goog.inherits(rflect.cal.ui.MainBody, rflect.ui.Component);


/**
 * Main body html parts, used by renderer.
 * @type {Array.<string>}
 * @const
 * @private
 */
rflect.cal.ui.MainBody.HTML_PARTS_ = rflect.MOBILE ? [
  '<div id="cal-container" class="cal-container">',
  '<nav id="side-pane" class="side-pane slide-pane-left">',
  '</nav>',
  '<nav id="top-pane" class="control-pane">',
  '</nav>',
  '<main id="main-pane">',
  '</main>',
  '<nav id="bottom-pane" class="control-pane">',
  '</nav>',
  '</div>'
  ] : [
  '<div id="cal-container" class="' + goog.getCssName('cal-container') + '">',
  '<div id="top-pane">',
  '</div>',
  '<div id="main-body">',
  '<div id="left-pane" class="side-pane">',
  '<div id="left-main-pane">',
  '<div id="month-selector">',
  '</div>',
  '<div id="calendars-selector" class="' + goog.getCssName('list-selector') + '">',
  '</div>',
  '<div id="tasks-selector" class="' + goog.getCssName('list-selector') + '">',
  '</div>',
  '</div>',
  '<div id="left-aux-pane">',
  '</div>',
  '</div>',
  '<div id="main-pane" class="' + goog.getCssName('main-pane') + '">',
  '</div>',
  '</div>',
  '</div>'
];


/**
 * Indexes of main body child components, in order they were added. These are
 * useful when we try to tell update{...} methods which child shouldn't be
 * updated.
 * @enum {number}
 */
if (rflect.MOBILE) {
  rflect.cal.ui.MainBody.ComponentsIndexes = {
    TOP_PANE: 0,
    MAIN_PANE: 1,
    SIDE_PANE: 2,
    BOTTOM_PANE: 3
  }
} else {
  rflect.cal.ui.MainBody.ComponentsIndexes = {
    TOP_PANE: 0,
    MAIN_PANE: 1,
    MINI_CAL: 2,
    CAL_SELECTOR: 3,
    TASK_SELECTOR: 4
  }
}


/**
 * Accumulated difference in size between dynamic element (scrollables) and
 * their surroundings - top pane, side pane.
 * This version is for week mode.
 * @type {goog.math.Size}
 */
rflect.cal.ui.MainBody.prototype.staticSizesWk;


/**
 * Static sizes for month mode.
 * @type {goog.math.Size}
 */
rflect.cal.ui.MainBody.prototype.staticSizesMn;


/**
 * Static sizes for cal selector.
 * @type {goog.math.Size}
 */
rflect.cal.ui.MainBody.prototype.staticSizesLeftPane;


/**
 * Whether it's a first build in week mode.
 * @type {boolean}
 */
rflect.cal.ui.MainBody.prototype.firstBuildWk = true;


/**
 * Whether it's a first build in month mode.
 * @type {boolean}
 */
rflect.cal.ui.MainBody.prototype.firstBuildMn = true;


/**
 * Whether it's a first build for cal selectors.
 * @type {boolean}
 */
rflect.cal.ui.MainBody.prototype.firstBuildLeftPane = true;


/**
 * Event pane.
 * @type {rflect.cal.ui.EventPane}
 * @private
 */
rflect.cal.ui.MainBody.prototype.eventPane_;


/**
 * Settings pane.
 * @type {rflect.cal.ui.SettingsPane}
 * @private
 */
rflect.cal.ui.MainBody.prototype.settingsPane_;


/**
 * Side pane.
 * @type {rflect.cal.ui.SidePane}
 * @private
 */
rflect.cal.ui.MainBody.prototype.sidePane_;


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getSidePane = function() {
  return this.sidePane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getTopPane = function() {
  return this.topPane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getMainPane = function() {
  return this.mainPane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getBottomPane = function() {
  return this.bottomPane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getCalSelector = function() {
  return this.calSelector_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getTaskSelector = function() {
  return this.taskSelector_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getMiniCal = function() {
  return this.miniCal_;
};


/**
 * Creates main body on an empty div element.
 */
rflect.cal.ui.MainBody.prototype.createDom = function() {
  this.decorateInternal(this.getDomHelper().createElement('div'));
};


/**
 * Decorates an existing html div element as a Main Body.
 * @override
 */
rflect.cal.ui.MainBody.prototype.decorateInternal = function(aElement,
                                                          opt_doNotBuildBody) {
  // Set this.element_ and build component.
  rflect.cal.ui.MainBody.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);

  if (!opt_doNotBuildBody) {
    this.getElement().id = 'cal-container';
    this.getElement().className = goog.getCssName('cal-container');
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @protected
 */
rflect.cal.ui.MainBody.prototype.buildInternal = function(aSb) {
  var parts = rflect.cal.ui.MainBody.HTML_PARTS_;

  if (rflect.MOBILE) {

    // Form html. From index 1, because 0 is the html of outer container, which
    // we don't create in that method but just decorate.
    for (var counter = 1, length = parts.length - 1;
         counter < length; counter++) {
      aSb.append(parts[counter]);
      switch (counter) {
        // Include top pane in common buffer.
        case 1: {
          this.sidePane_.build(aSb);
        };break;
        case 3: {
          this.topPane_.build(aSb);
        };break;
        case 5: {
          this.mainPane_.build(aSb);
        };break;
        case 6: {
          this.bottomPane_.build(aSb);
        };break;

        default: break;
      }
    }

  } else {

    // Form html. From index 1, because 0 is the html of outer container, which
    // we don't create in that method but just decorate.
    for (var counter = 1, length = parts.length - 1;
         counter < length; counter++) {
      aSb.append(parts[counter]);
      switch (counter) {
        // Include top pane in common buffer.
        case 1: {
          this.topPane_.build(aSb);
        };break;
        case 6: {
          this.miniCal_.build(aSb);
        };break;
        case 8: {
          this.calSelector_.build(aSb);
        };break;
        case 10: {
          this.taskSelector_.build(aSb);
        };break;
        // Include main pane in common buffer.
        case 16: {
          this.mainPane_.build(aSb);
        };break;

        default: break;
      }
    }

  }

};


/**
 * Redirects parameter to main pane, other children are updated normally.
 * @param {Array.<goog.ui.Component>=} opt_exclusions Children components
 * which should be excluded from update.
 * @param {boolean=} opt_updateByNavigation Whether this update initiated by
 * buttons of top pane or minical.
 * @override
 */
rflect.cal.ui.MainBody.prototype.updateBeforeRedraw = function(opt_exclusions,
    opt_updateByNavigation) {
  // We will update main pane separately.
  var exclusions = opt_exclusions ?
      opt_exclusions.slice() :
      [this.getMainPane(), this.getCalSelector(), this.getTaskSelector()];

  // Nothing wrong to have duplicates in exclusion indexes.
  exclusions.push(this.getMainPane());
  exclusions.push(this.getCalSelector());
  exclusions.push(this.getTaskSelector());

  rflect.cal.ui.MainBody.superClass_.updateBeforeRedraw.call(this, exclusions);

  if (!rflect.ui.Component.componentIsInExclusions(opt_exclusions,
      this.getMainPane())) {
    this.mainPane_.updateBeforeRedraw(null, undefined, opt_updateByNavigation);
  }

  if (!rflect.MOBILE) {

    if (!rflect.ui.Component.componentIsInExclusions(opt_exclusions,
        this.getCalSelector())) {
      this.calSelector_.updateBeforeRedraw(null, this.firstBuildLeftPane);
    }
    if (!rflect.ui.Component.componentIsInExclusions(opt_exclusions,
        this.getTaskSelector())) {
      this.taskSelector_.updateBeforeRedraw(null, this.firstBuildLeftPane);
    }

  }
};


/**
 * Decorates child components.
 */
rflect.cal.ui.MainBody.prototype.enterDocument = function() {
  // We could decorate children right after superclass decorateInternal call,
  // but to preserve pattern (that if we want reliable presence of component in
  // DOM, we should address it in enterDocument), we do it here.
  this.topPane_.decorateInternal(this.getDomHelper().getElement('top-pane'), true);
  this.mainPane_.decorateInternal(this.getDomHelper().getElement('main-pane'), true);

  if (rflect.MOBILE) {

    this.bottomPane_.decorateInternal(
        this.getDomHelper().getElement('top-pane'), true);
    this.sidePane_.decorateInternal(
        this.getDomHelper().getElement('side-pane'), true);

  } else {

    this.miniCal_.decorateInternal(
        this.getDomHelper().getElement('month-selector'), true);
    this.calSelector_.decorateInternal(
        this.getDomHelper().getElement('calendars-selector'), true);
    this.taskSelector_.decorateInternal(
        this.getDomHelper().getElement('tasks-selector'), true);

  }

  // Propagate call to children.
  rflect.cal.ui.MainBody.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.topPane_, goog.ui.Component.EventType.ACTION,
      this.onControlPaneAction_, false, this);

  if (rflect.MOBILE) {
    this.getHandler().listen(this.bottomPane_,
        goog.ui.Component.EventType.ACTION, this.onControlPaneAction_, false,
        this);
    this.getHandler().listen(this.sidePane_,
        rflect.cal.ui.CalSelector.EventType.CALENDAR_SWITCH,
        this.onCalendarSwitch_, false, this)
        .listen(this.sidePane_.showBehavior,
        rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK_POINT,
        this.onSlideStartOrEnd_, false, this)
        .listen(this.sidePane_, goog.ui.Component.EventType.ACTION,
        this.onSidePaneAction_, false, this);
  } else {
    this.getHandler().listen(this.calSelector_,
          rflect.cal.ui.CalSelector.EventType.CALENDAR_SWITCH,
          this.onCalendarSwitch_, false, this);
  }
  this.getHandler().listen(this.transport_,
      rflect.cal.Transport.EventTypes.LOAD_EVENT, this.onLoadEvents_, false,
      this);

  this.rebuildMainPaneWithSizes();

  if (!rflect.MOBILE)
    //Mobile UI's left pane doesn't affect main pane width.
    this.rebuildLeftPaneWithSizes();
};


/**
 * Rebuilds main pane after sizes of all static panes are known.
 */
rflect.cal.ui.MainBody.prototype.rebuildMainPaneWithSizes = function() {
  this.measureStaticSizes();
  if (this.viewManager_.isInWeekMode())
    this.firstBuildWk = false;
  if (this.viewManager_.isInMonthMode())
    this.firstBuildMn = false;

  this.mainPane_.updateBeforeRedraw();
  this.mainPane_.updateByRedraw();

}


/**
 * Rebuilds main pane after sizes of all static panes are known.
 */
rflect.cal.ui.MainBody.prototype.rebuildLeftPaneWithSizes = function() {
  window.console.log('sizes');
  this.measureLeftPaneStaticSizes();

  this.firstBuildLeftPane = false;

  this.calSelector_.updateBeforeRedraw();
  this.calSelector_.updateByRedraw();

}


/**
 * Measures main pane static sizes.
 */
rflect.cal.ui.MainBody.prototype.measureStaticSizes = function() {
  var dom = this.getDomHelper();
  var totalSize = goog.style.getSize(dom.getElement('cal-container'));

  if (this.viewManager_.isInWeekMode()) {
    var allDayPaneSize = goog.style.getSize(
        dom.getElement('main-pane-header-scrollable'));
    var weekPaneSize = goog.style.getSize(
        dom.getElement('main-pane-body-scrollable-wk'));

    // Border widths are present because they are also "static" relative to
    // pure sizes of grid containers.
    this.staticSizesWk = new goog.math.Size(totalSize.width -
        allDayPaneSize.width +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2, totalSize.height -
        allDayPaneSize.height - weekPaneSize.height +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 4);
  } else if (this.viewManager_.isInMonthMode()) {
    var monthPaneSize = goog.style.getSize(
        dom.getElement('main-pane-body-scrollable-mn'));

    this.staticSizesMn = new goog.math.Size(totalSize.width -
        monthPaneSize.width +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2
        , totalSize.height -
        monthPaneSize.height +
        //TODO(alexk): why do I need 4px here and not 2?
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 4);
  }
}


/**
 * Measures left pane static sizes.
 */
rflect.cal.ui.MainBody.prototype.measureLeftPaneStaticSizes = function() {
  var dom = this.getDomHelper();

  var calContainerMB =
      goog.style.getMarginBox(dom.getElement('cal-container'));
  var calContainerBB =
      goog.style.getBorderBox(dom.getElement('cal-container'));
  var calContainerPB =
      goog.style.getPaddingBox(dom.getElement('cal-container'));

  var topPaneSize = goog.style.getSize(dom.getElement('top-pane'));
  var minicalSize = goog.style.getSize(dom.getElement('month-selector'));
  var calSelectorSize =
      goog.style.getSize(dom.getElement('calendars-selector'));
  var taskSelectorSize = goog.style.getSize(dom.getElement('tasks-selector'));

  var totalHeight = calContainerMB.top + calContainerMB.bottom +
      calContainerBB.top + calContainerBB.bottom +
      calContainerPB.top + calContainerPB.bottom +
      topPaneSize.height + minicalSize.height + calSelectorSize.height +
      taskSelectorSize.height;

  this.staticSizesLeftPane = new goog.math.Size(0, totalHeight);
}


/**
 * @return {goog.math.Size} Minimal possible size of component.
 */
rflect.cal.ui.MainBody.prototype.getMinimalSize = function() {
  return new goog.math.Size(this.staticSizesWk.width + Math.max(
      rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.width,
      rflect.cal.predefined.MONTH_SCROLLABLE_DEFAULT_SIZE.width),
      this.staticSizesWk.height + Math.max(
      rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.height +
      rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE.height,
      rflect.cal.predefined.MONTH_SCROLLABLE_DEFAULT_SIZE.height));
}


/**
 * Control pane action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onControlPaneAction_ = function(aEvent) {
  var id = aEvent.target.getId();

  if (id == rflect.cal.predefined.BUTTON_NEW_EVENT_ID) {
    // TODO(alexk): check whether module is loaded

    this.eventManager_.startEventCreationSession();

    this.showEventPane(true, true);
  } else if (id == rflect.cal.predefined.BUTTON_SETTINGS_ID) {

    this.showSettingsPane(true);

  } else if (rflect.MOBILE && id == rflect.cal.predefined.BUTTON_MENU_ID) {

    this.showSidePane(true);

  }
}


/**
 * Side pane action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onSidePaneAction_ = function(aEvent) {
  var id = aEvent.target.getId();

  if (id == rflect.cal.predefined.BUTTON_SETTINGS_ID) {

    this.showSidePane(false);
    this.showSettingsPane(true);

  }
}


/**
 * Cal selector action handler.
 * @param {{type: string, visible: boolean, calendarId: string}} aEvent
 * Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onCalendarSwitch_ = function(aEvent) {
  var calendarId = aEvent.calendarId;
  var visible = aEvent.visible;

  this.eventManager_.setVisibleCalendar(calendarId, visible);
  this.eventManager_.run();
  this.mainPane_.update();
}


/**
 * Events load handler.
 * @param {rflect.cal.Transport.LoadEventEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onLoadEvents_ = function(aEvent) {
  this.eventManager_.run();
  this.mainPane_.update();
}


/**
 * Shows side pane.
 * @param {boolean} aShow Whether to show event pane.
 */
rflect.cal.ui.MainBody.prototype.showSidePane = function(aShow) {
  this.sidePane_.showBehavior.setVisible(aShow);
}


/**
 * Shows event pane when possible and lazily instantiates it at the first time.
 * @param {boolean} aShow Whether to show event pane.
 * @param {boolean=} opt_creatingNewEvent Whether we're creating new event.
 */
rflect.cal.ui.MainBody.prototype.showEventPane = function(aShow,
    opt_creatingNewEvent) {
  if (!this.eventPane_) {
    this.eventPane_ = new rflect.cal.ui.EventPane(this.viewManager_,
        this.timeManager_, this.eventManager_,
        this.getDomHelper().getElement('main-container'), this.transport_);
    this.addChild(this.eventPane_);

    this.getHandler().listen(this.eventPane_,
        rflect.cal.ui.EventPane.EventTypes.CANCEL, this.onEventPaneCancel_,
        false, this).listen(this.eventPane_,
        rflect.cal.ui.EventPane.EventTypes.SAVE, this.onEventPaneSave_,
        false, this).listen(this.eventPane_,
        rflect.cal.ui.EventPane.EventTypes.DELETE, this.onEventPaneDelete_,
        false, this);

    if (rflect.MOBILE)
      this.getHandler().listen(this.eventPane_.showBehavior,
          rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK_POINT,
          this.onSlideStartOrEnd_, false, this);
  }

  this.eventPane_.setNewEventMode(opt_creatingNewEvent);
  this.eventPane_.showBehavior.setVisible(aShow);
  //NOTE(alexk): do we need smarter logic here than just hide calendar?
  if (!rflect.MOBILE) this.showCalendar_(!aShow);
}


/**
 * Shows settings pane when possible and lazily instantiates it at the first
 * time.
 * @param {boolean} aShow Whether to show settings pane.
 */
rflect.cal.ui.MainBody.prototype.showSettingsPane = function(aShow) {
  if (!this.settingsPane_) {
    this.settingsPane_ = new rflect.cal.ui.SettingsPane(this.viewManager_,
        this.timeManager_, this.eventManager_,
        this.getDomHelper().getElement('main-container'), this.transport_);
    this.addChild(this.settingsPane_);

    // Save settings handler is in view manager.
    this.getHandler().listen(this.settingsPane_,
        rflect.cal.ui.SettingsPane.EventTypes.CANCEL,
        this.onSettingsPaneCancel_, false, this).listen(this.settingsPane_,
        rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
        this.onSettingsPaneCalendarUpdate_, false, this);

    if (rflect.MOBILE)
      this.getHandler().listen(this.settingsPane_.getShowBehavior(),
          rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK_POINT,
          this.onSlideStartOrEnd_, false, this);

    if (goog.DEBUG) {
      _inspect('settingsPane_', this.settingsPane_);
    }
  }

  this.settingsPane_.getShowBehavior().setVisible(aShow);
  //NOTE(alexk): do we need smarter logic here than just hide calendar?
  if (!rflect.MOBILE) this.showCalendar_(!aShow);
}


/**
 * @param {boolean} aShow Whether to show calendar element.
 * @private
 */
rflect.cal.ui.MainBody.prototype.showCalendar_ = function(aShow) {
  goog.style.showElement(this.getDomHelper().getElement('cal-container'),
      aShow);
}


/**
 * @param {rflect.cal.ui.PaneShowBehavior.SlideBreakPointEvent} aEvent Event
 * object.
 */
rflect.cal.ui.MainBody.prototype.onSlideStartOrEnd_ = function(aEvent) {

  switch (aEvent.target.component) {
    case this.settingsPane_: ;
    case this.eventPane_: {
      // If closing pane, show calendar on start.
      if (aEvent.start && !aEvent.showing) this.showCalendar_(true);
      // If opening pane, hide calendar on end.
      if (!aEvent.start && aEvent.showing) this.showCalendar_(false);
    };break;
    default:break;
  }
}


/**
 * Event pane cancel listener.
 */
rflect.cal.ui.MainBody.prototype.onEventPaneCancel_ = function() {
  this.showEventPane(false);
}


/**
 * Event pane save listener.
 * @param {Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onEventPaneSave_ = function(aEvent) {
  aEvent.preventDefault();

  this.updateMainPane_();

  this.showEventPane(false);
}


/**
 * Event pane delete listener.
 * @param {Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onEventPaneDelete_ = function(aEvent) {
  aEvent.preventDefault();

  this.updateMainPane_();

  this.showEventPane(false);
}


/**
 * Settings pane cancel listener.
 */
rflect.cal.ui.MainBody.prototype.onSettingsPaneCancel_ = function() {
  this.showSettingsPane(false);
}


/**
 * Settings pane calendar update listener.
 * @param {Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onSettingsPaneCalendarUpdate_ =
    function(aEvent) {

  this.eventManager_.run();
  if (rflect.MOBILE) {
    // This is cal selector #1.
    this.sidePane_.getChildAt(0).redrawIsNeeded = true;
    // This is cal selector #2.
    //this.sidePane_.getChildAt(1).redrawIsNeeded = true;
  } else {
    this.calSelector_.redrawIsNeeded = true;
    this.taskSelector_.redrawIsNeeded = true;
  }
  this.update([
    this.getMiniCal(),
    this.getTopPane()]);
}


/**
 * Updates just main pane.
 */
rflect.cal.ui.MainBody.prototype.updateMainPane_ = function() {
  this.eventManager_.run();
  if (rflect.MOBILE) {
    this.updateBeforeRedraw([
      this.getBottomPane(),
      this.getSidePane(),
      this.getTopPane()]
    );
    this.updateByRedraw([
      this.getBottomPane(),
      this.getSidePane(),
      this.getTopPane()]
    );
  } else {
    this.updateBeforeRedraw([
      this.getCalSelector(),
      this.getTaskSelector(),
      this.getMiniCal(),
      this.getTopPane()]
    );
    this.updateByRedraw([
      this.getCalSelector(),
      this.getTaskSelector(),
      this.getMiniCal(),
      this.getTopPane()]
    );
  }
}



/**
 * Disposes of the Main Body.
 * @override
 * @protected
 */
rflect.cal.ui.MainBody.prototype.disposeInternal = function() {
  rflect.cal.ui.MainBody.superClass_.disposeInternal.call(this);

  this.topPane_ = null;
  this.bottomPane_ = null;
  this.miniCal_ = null;
  this.mainPane_ = null;
  this.viewManager_ = null;
  this.timeManager_ = null;
  this.blockManager_ = null;
  this.eventPane_ = null;
};
