/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar main body, root of all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MainBody');

goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.EventPane');
goog.require('rflect.cal.ui.EventPane.EventTypes');
goog.require('rflect.cal.MainPane');
goog.require('rflect.cal.MiniCal');
goog.require('rflect.cal.TopPane');
goog.require('rflect.cal.CalSelector');
goog.require('rflect.cal.TaskSelector');



/**
 * Main body main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.MainBody = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aBlockManager) {
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

  // Add child components in order for them to be included in propagation of
  // string building and updating.
  this.addChild(this.topPane_ = new rflect.cal.TopPane(this.viewManager_,
      this.timeManager_));
  this.addChild(this.mainPane_ = new rflect.cal.MainPane(this.viewManager_,
        this.timeManager_, this.eventManager_, this.containerSizeMonitor_,
        this.blockManager_));
  this.addChild(this.miniCal = new rflect.cal.MiniCal(this.viewManager_,
      this.timeManager_));
  this.addChild(this.calSelector_ = new rflect.cal.CalSelector(this.viewManager_,
      this.containerSizeMonitor_));
  this.addChild(this.taskSelector_ = new rflect.cal.TaskSelector(
      this.viewManager_, this.containerSizeMonitor_));

  if (goog.DEBUG) {
    _inspect('topPane_', this.topPane_);
    _inspect('miniCal', this.miniCal);
    _inspect('mainPane_', this.mainPane_);
    _inspect('taskSelector_', this.taskSelector_);
    _inspect('calSelector_', this.calSelector_);
  }
};
goog.inherits(rflect.cal.MainBody, rflect.ui.Component);


/**
 * Main body html parts, used by renderer.
 * @type {Array.<string>}
 * @const
 * @private
 */
rflect.cal.MainBody.HTML_PARTS_ = [
  '<div id="main-container">',

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
  '</div>',

  '</div>'
];


/**
 * Indexes of main body child components, in order they were added. These are
 * useful when we try to tell update{...} methods which child shouldn't be
 * updated.
 * @enum {number}
 */
rflect.cal.MainBody.ComponentsIndexes = {
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
rflect.cal.MainBody.prototype.staticSizesWk;


/**
 * Static sizes for month mode.
 * @type {goog.math.Size}
 */
rflect.cal.MainBody.prototype.staticSizesMn;


/**
 * Whether it's a first build in week mode.
 * @type {boolean}
 */
rflect.cal.MainBody.prototype.firstBuildWk = true;


/**
 * Whether it's a first build in month mode.
 * @type {boolean}
 */
rflect.cal.MainBody.prototype.firstBuildMn = true;


/**
 * Event pane.
 * @type {rflect.cal.ui.EventPane}
 * @private
 */
rflect.cal.MainBody.prototype.eventPane_;


/**
 * Creates main body on an empty div element.
 */
rflect.cal.MainBody.prototype.createDom = function() {
  this.decorateInternal(this.getDomHelper().createElement('div'));
};


/**
 * Decorates an existing html div element as a Main Body.
 * @override
 */
rflect.cal.MainBody.prototype.decorateInternal = function(aElement,
                                                          opt_doNotBuildBody) {
  // Set this.element_ and build component.
  rflect.cal.MainBody.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);

  if (!opt_doNotBuildBody) {
    this.getElement().id = 'main-container';
    this.getElement().className = 'main-container';
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @protected
 */
rflect.cal.MainBody.prototype.buildInternal = function(aSb) {
  var parts = rflect.cal.MainBody.HTML_PARTS_;
  // Form html. From index 1, because 0 is the html of outer container, which
  // we don't create in that method but just decorate.
  for (var counter = 1, length = parts.length - 1;
       counter < length; counter++) {
    aSb.append(parts[counter]);
    switch (counter) {
      // Include top pane in common buffer.
      case 2: {
        this.topPane_.build(aSb);
      };break;
      case 7: {
        this.miniCal.build(aSb);
      };break;
      case 9: {
        this.calSelector_.build(aSb);
      };break;
      case 11: {
        this.taskSelector_.build(aSb);
      };break;
      // Include main pane in common buffer.
      case 17: {
        this.mainPane_.build(aSb);
      };break;

      default: break;
    }
  }
};


/**
 * Decorates child components.
 */
rflect.cal.MainBody.prototype.enterDocument = function() {
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
  rflect.cal.MainBody.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.topPane_, goog.ui.Component.EventType.ACTION,
      this.onTopPaneAction_, false, this);
      
  this.rebuildMPWithSizes();
};


/**
 * Rebuilds main pane after sizes of all static panes are known.
 */
rflect.cal.MainBody.prototype.rebuildMPWithSizes = function() {
  if (goog.DEBUG)
    _log('rebuildMPWithSizes called');
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
rflect.cal.MainBody.prototype.measureStaticSizes = function() {
  if (goog.DEBUG)
    _log('measureStaticSizes called');
  var dom = this.getDomHelper();
  var totalSize = goog.style.getSize(dom.getElement('main-container'));

  if (this.viewManager_.isInWeekMode()) {
    var allDayPaneSize = goog.style.getSize(
        dom.getElement('main-pane-header-scrollable'));
    var weekPaneSize = goog.style.getSize(
        dom.getElement('main-pane-body-scrollable-wk'));

    // Border widths are present because they are also "static" relative to
    // pure sizes of grid containers.
    this.staticSizesWk = new goog.math.Size(totalSize.width -
        allDayPaneSize.width - weekPaneSize.width +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 4, totalSize.height -
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
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2);
  }
}


/**
 * @return {goog.math.Size} Minimal possible size of component.
 */
rflect.cal.MainBody.prototype.getMinimalSize = function() {
  return new goog.math.Size(this.staticSizesWk.width + Math.max(
      rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.width +
      rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE.width,
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
rflect.cal.MainBody.prototype.onTopPaneAction_ = function(aEvent) {
  var id = aEvent.target.getId();

  if (id == rflect.cal.predefined.BUTTON_NEW_EVENT_ID) {
    // TODO(alexk): check whether module is loaded

    this.eventManager_.startEventCreationSession();

    this.showEventPane(true, true);
  }
}


/**
 * Shows event pane when possible and lazily instantiates it at the first time.
 * @param {boolean} aShow Whether to show event pane.
 * @param {boolean=} opt_creatingNewEvent Whether we're creating new event.
 */
rflect.cal.MainBody.prototype.showEventPane = function(aShow,
    opt_creatingNewEvent) {
  if (!this.eventPane_) {
    this.eventPane_ = new rflect.cal.ui.EventPane(this.viewManager_,
        this.timeManager_, this.eventManager_,
        this.getDomHelper().getElement('main-container'));
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
rflect.cal.MainBody.prototype.showCalendar_ = function(aShow) {
  goog.style.showElement(this.getDomHelper().getElement('cal-container'),
      aShow);
}


/**
 * Event pane cancel listener.
 */
rflect.cal.MainBody.prototype.onEventPaneCancel_ = function() {
  this.showEventPane(false);
}


/**
 * Event pane save listener.
 * @param {Event} aEvent Event object.
 */
rflect.cal.MainBody.prototype.onEventPaneSave_ = function(aEvent) {
  aEvent.preventDefault();

  this.updateMainPane_();

  this.showEventPane(false);
}


/**
 * Event pane delete listener.
 * @param {Event} aEvent Event object.
 */
rflect.cal.MainBody.prototype.onEventPaneDelete_ = function(aEvent) {
  aEvent.preventDefault();

  this.updateMainPane_();

  this.showEventPane(false);
}

/**
 * Updates just main pane.
 */
rflect.cal.MainBody.prototype.updateMainPane_ = function() {
  this.eventManager_.run();
  this.updateBeforeRedraw(
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR),
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.MINI_CAL),
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.TOP_PANE)
  );
  this.updateByRedraw(
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR),
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.MINI_CAL),
      /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.TOP_PANE)
  );
}



/**
 * Disposes of the Main Body.
 * @override
 * @protected
 */
rflect.cal.MainBody.prototype.disposeInternal = function() {
  rflect.cal.MainBody.superClass_.disposeInternal.call(this);

  this.topPane_ = null;
  this.miniCal = null;
  this.mainPane_ = null;
  this.viewManager_ = null;
  this.timeManager_ = null;
  this.blockManager_ = null;
  this.eventPane_ = null;
};
