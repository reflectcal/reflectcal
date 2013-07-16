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
goog.require('rflect.cal.ui.EventPane');
goog.require('rflect.cal.ui.EventPane.EventTypes');
goog.require('rflect.cal.ui.MainPane');
goog.require('rflect.cal.ui.MiniCal');
goog.require('rflect.cal.ui.TopPane');
goog.require('rflect.cal.ui.CalSelector');
goog.require('rflect.cal.ui.CalSelector.EventType');
goog.require('rflect.cal.ui.TaskSelector');



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
  this.addChild(this.topPane_ = new rflect.cal.ui.TopPane(this.viewManager_,
      this.timeManager_));
  this.addChild(this.mainPane_ = new rflect.cal.ui.MainPane(this.viewManager_,
        this.timeManager_, this.eventManager_, this.containerSizeMonitor_,
        this.blockManager_, this.transport_));
  this.addChild(this.miniCal = new rflect.cal.ui.MiniCal(this.viewManager_,
      this.timeManager_));
  this.addChild(this.calSelector_ = new rflect.cal.ui.CalSelector(this.viewManager_,
      this.containerSizeMonitor_, this.eventManager_));
  this.addChild(this.taskSelector_ = new rflect.cal.ui.TaskSelector(
      this.viewManager_, this.containerSizeMonitor_));

  if (goog.DEBUG) {
    _inspect('topPane_', this.topPane_);
    _inspect('miniCal', this.miniCal);
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
rflect.cal.ui.MainBody.HTML_PARTS_ = [
  '<div id="cal-container" class="cal-container">',
  '<div id="top-pane">',
  '</div>',
  '<div id="main-body">',
  '<div id="left-pane">',
  '<div id="left-main-pane">',
  '<div id="month-selector">',
  '</div>',
  '<div id="calendars-selector" class="list-selector">',
  '</div>',
  '<div id="tasks-selector" class="list-selector">',
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
rflect.cal.ui.MainBody.ComponentsIndexes = {
  TOP_PANE: 0,
  MAIN_PANE: 1,
  MINI_CAL: 2,
  CAL_SELECTOR: 3,
  TASK_SELECTOR: 4
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
        this.miniCal.build(aSb);
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
};


/**
 * Redirects parameter to main pane, other children are updated normally.
 * @param {Array.<number>=} opt_exclusions Index(es) of component's children
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
      [rflect.cal.ui.MainBody.ComponentsIndexes.MAIN_PANE,
          rflect.cal.ui.MainBody.ComponentsIndexes.CAL_SELECTOR,
          rflect.cal.ui.MainBody.ComponentsIndexes.TASK_SELECTOR];

  // Nothing wrong to have duplicates in exclusion indexes.
  exclusions.push(rflect.cal.ui.MainBody.ComponentsIndexes.MAIN_PANE);
  exclusions.push(rflect.cal.ui.MainBody.ComponentsIndexes.CAL_SELECTOR);
  exclusions.push(rflect.cal.ui.MainBody.ComponentsIndexes.TASK_SELECTOR);

  rflect.cal.ui.MainBody.superClass_.updateBeforeRedraw.call(this, exclusions);

  if (!rflect.ui.Component.indexIsInExclusions(opt_exclusions,
      rflect.cal.ui.MainBody.ComponentsIndexes.MAIN_PANE)) {
    this.mainPane_.updateBeforeRedraw(null, undefined, opt_updateByNavigation);
  }
  if (!rflect.ui.Component.indexIsInExclusions(opt_exclusions,
      rflect.cal.ui.MainBody.ComponentsIndexes.CAL_SELECTOR)) {
    this.calSelector_.updateBeforeRedraw(null, this.firstBuildLeftPane);
  }
  if (!rflect.ui.Component.indexIsInExclusions(opt_exclusions,
      rflect.cal.ui.MainBody.ComponentsIndexes.TASK_SELECTOR)) {
    this.taskSelector_.updateBeforeRedraw(null, this.firstBuildLeftPane);
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
  this.miniCal.decorateInternal(this.getDomHelper().getElement('month-selector'), true);
  this.mainPane_.decorateInternal(this.getDomHelper().getElement('main-pane'), true);
  this.calSelector_.decorateInternal(this.getDomHelper().getElement('calendars-selector'),
      true);
  this.taskSelector_.decorateInternal(this.getDomHelper().getElement('tasks-selector'),
      true);
  // Propagate call to children.
  rflect.cal.ui.MainBody.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.topPane_, goog.ui.Component.EventType.ACTION,
      this.onTopPaneAction_, false, this)
      .listen(this.calSelector_, rflect.cal.ui.CalSelector.EventType.CALENDAR_SWITCH,
      this.onCalendarSwitch_, false, this);
      
  this.rebuildMainPaneWithSizes();
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
 * Top pane action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onTopPaneAction_ = function(aEvent) {
  var id = aEvent.target.getId();

  if (id == rflect.cal.predefined.BUTTON_NEW_EVENT_ID) {
    // TODO(alexk): check whether module is loaded

    this.eventManager_.startEventCreationSession();

    this.showEventPane(true, true);
  }
}


/**
 * Cal selector action handler.
 * @param {{type: string, visible: boolean, calendarId: number}} aEvent
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
        false, this)
  }

  this.eventPane_.setVisible(aShow, opt_creatingNewEvent);
  //NOTE(alexk): do we need smarter logic here than just hide calendar?
  this.showCalendar_(!aShow);
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
 * Updates just main pane.
 */
rflect.cal.ui.MainBody.prototype.updateMainPane_ = function() {
  this.eventManager_.run();
  this.updateBeforeRedraw([
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.CAL_SELECTOR),
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.TASK_SELECTOR),
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.MINI_CAL),
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.TOP_PANE)]
  );
  this.updateByRedraw([
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.CAL_SELECTOR),
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.TASK_SELECTOR),
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.MINI_CAL),
      /**@type {number}*/(rflect.cal.ui.MainBody.ComponentsIndexes.TOP_PANE)]
  );
}



/**
 * Disposes of the Main Body.
 * @override
 * @protected
 */
rflect.cal.ui.MainBody.prototype.disposeInternal = function() {
  rflect.cal.ui.MainBody.superClass_.disposeInternal.call(this);

  this.topPane_ = null;
  this.miniCal = null;
  this.mainPane_ = null;
  this.viewManager_ = null;
  this.timeManager_ = null;
  this.blockManager_ = null;
  this.eventPane_ = null;
};