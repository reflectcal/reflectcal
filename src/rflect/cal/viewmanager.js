/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview View manager defines all views, screens and pages.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ViewManager');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('rflect.cal.blocks.BlockManager');
goog.require('rflect.cal.ContainerSizeMonitor');
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.MainBody');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.cal.ViewType');
goog.require('rflect.cal.predefined');



/**
 * View manager main class.
 * @param {rflect.cal.Main} aMainInstance Cal main instance passed to establish
 * link between modules.
 * @constructor
 * @extends {goog.events.EventHandler}
 */
rflect.cal.ViewManager = function(aMainInstance) {
  goog.events.EventHandler.call(this);

  /**
   * Main calendar instance saved for linkage to another modules.
   * @type {rflect.cal.Main}
   * @private
   */
  this.mainInstance_ = aMainInstance;

  this.isOnStartup_ = true;

  // Set initial view.
  this.currentView = rflect.cal.ViewType.MONTH;

  /**
   * Time manager instance.
   * @type {rflect.cal.TimeManager}
   */
  this.timeManager = new rflect.cal.TimeManager();

  /**
   * Container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   */
  this.containerSizeMonitor_ = new rflect.cal.ContainerSizeMonitor(this,
      //TODO(alexk): Implement configuration options.
      document.body);

  /**
   * Event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = new rflect.cal.events.EventManager(this,
      this.timeManager);

  /**
   * Block manager.
   * @type {rflect.cal.blocks.BlockManager}
   * @private
   */
  this.blockManager_ = new rflect.cal.blocks.BlockManager(this, this.timeManager,
      this.eventManager_);

  /**
   * Main body component.
   * @type {rflect.ui.Component}
   * @private
   */
  this.mainBody_ = new rflect.cal.MainBody(this, this.timeManager,
      this.eventManager_, this.containerSizeMonitor_, this.blockManager_);

  if (goog.DEBUG)
    _inspect('mainBody_', this.mainBody_);
  if (goog.DEBUG)
    _inspect('timeManager', this.timeManager);
  if (goog.DEBUG)
    _inspect('blockManager', this.blockManager_);
  if (goog.DEBUG)
    _inspect('containerSizeMonitor_', this.containerSizeMonitor_);
  if (goog.DEBUG)
    _inspect('eventManager_', this.eventManager_);

  this.showView(this.currentView);
};
goog.inherits(rflect.cal.ViewManager, goog.events.EventHandler);


/**
 * Whether we're on startup.
 * @type {boolean}
 * @private
 */
rflect.cal.ViewManager.prototype.isOnStartup_ = false;


/**
 * Current view.
 * @type {rflect.cal.ViewType}
 */
rflect.cal.ViewManager.prototype.currentView = rflect.cal.ViewType.NONE;


/**
 * Container size monitor.
 * @type {rflect.cal.ContainerSizeMonitor}
 */
rflect.cal.ViewManager.prototype.containerSizeMonitor_ = null;


/**
 * Attaches event handlers.
 * @private
 */
rflect.cal.ViewManager.prototype.assignEvents_ = function() {
  // Container resize listener.
  this.listen(this.containerSizeMonitor_, goog.events.EventType.RESIZE,
      this.onViewportResize_, false, this);

  // Menu commands.
  this.listen(this.mainBody_, goog.ui.Component.EventType.ACTION,
      this.onMainBodyAction_, false, this);

  this.listen(this.mainBody_, rflect.cal.EventType.DATE_SELECT,
      this.onDateSelect_, false, this);
  this.listen(this.mainBody_, rflect.cal.EventType.DATE_DRAG,
      this.onDateDrag_, false, this);
  this.listen(this.mainBody_, rflect.cal.EventType.DATE_DRAG_END,
      goog.nullFunction, false, this);

};


/**
 * @return {boolean} Whether we're in week mode.
 */
rflect.cal.ViewManager.prototype.isInWeekMode = function() {
  return this.currentView == rflect.cal.ViewType.DAY ||
      this.currentView == rflect.cal.ViewType.MULTI_DAY ||
      this.currentView == rflect.cal.ViewType.WEEK;
};


/**
 * @return {boolean} Whether we're in month mode.
 */
rflect.cal.ViewManager.prototype.isInMonthMode = function() {
  return this.currentView == rflect.cal.ViewType.MULTI_WEEK ||
      this.currentView == rflect.cal.ViewType.MONTH;
};


/**
 * Viewport resize handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onViewportResize_ = function() {
  this.mainBody_.updateBeforeRedraw(
      rflect.cal.MainBody.ComponentsIndexes.TOP_PANE,
      rflect.cal.MainBody.ComponentsIndexes.MINI_CAL
  );
  this.mainBody_.updateByRedraw(
      rflect.cal.MainBody.ComponentsIndexes.TOP_PANE,
      rflect.cal.MainBody.ComponentsIndexes.MINI_CAL
  );
};


/**
 * Main body action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onMainBodyAction_ = function(aEvent){
  var id = aEvent.target.getId();

  switch (id) {
    case rflect.cal.predefined.BUTTON_NOW_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_NOW))
        this.onMenuCommandNow_();break;
    case rflect.cal.predefined.BUTTON_PREV_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_PREV))
        this.onMenuCommandPrev_();break;
    case rflect.cal.predefined.BUTTON_NEXT_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_NEXT))
        this.onMenuCommandNext_();break;
    case rflect.cal.predefined.BUTTON_NEW_EVENT_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_NEW_EVENT))
        this.onMenuCommandNewEvent_();break;
    case rflect.cal.predefined.BUTTON_DAY_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_DAY))
        this.onMenuCommandDay_();break;
    case rflect.cal.predefined.BUTTON_WEEK_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_WEEK))
        this.onMenuCommandWeek_();break;
    case rflect.cal.predefined.BUTTON_MONTH_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_MONTH))
        this.onMenuCommandMonth_();break;
    case rflect.cal.predefined.BUTTON_OPTIONS_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_OPTIONS))
        this.onMenuCommandOptions_();break;
    default: break;
  }
}


/**
 * Show current moment menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandNow_ = function() {
  this.showNow();
};


/**
 * Show previous interval menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandPrev_ = function() {
  this.showPrev();
};


/**
 * Show next interval menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandNext_ = function() {
  this.showNext();
};


/**
 * Create new event menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandNewEvent_ = function() {
};


/**
 * Show day period menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandDay_ = function() {
  //  if (goog.DEBUG) _perf('to day');
  this.showView(rflect.cal.ViewType.DAY);
  //  if (goog.DEBUG) _perf('to day');
};


/**
 * Show week period menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandWeek_ = function() {
  //  if (goog.DEBUG) _perf('to week');
  this.showView(rflect.cal.ViewType.WEEK);
  //  if (goog.DEBUG) _perf('to week');
};


/**
 * Show month period menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandMonth_ = function() {
  //  if (goog.DEBUG) _perf('to month');
  this.showView(rflect.cal.ViewType.MONTH);
  //  if (goog.DEBUG) _perf('to month');
};


/**
 * Show year period menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandYear_ = function() {
};


/**
 * Show options menu command handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandOptions_ = function() {
};


/**
 * Date select handler. On this event we must preserve existing configuration
 * and set new basis.
 * @param {{type: string}} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onDateSelect_ = function(aEvent) {
  if (goog.DEBUG)
    _log('index is in mask', aEvent.isInMask);

  if (!aEvent.isInMask){

    this.timeManager.shiftToPoint(aEvent.date);

    this.mainBody_.miniCal.updateBeforeRedraw();
    this.mainBody_.miniCal.updateByRedraw();

    this.mainBody_.updateBeforeRedraw(
        /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
        /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR),
        /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.MINI_CAL));
    this.mainBody_.updateByRedraw(
        /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
        /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR),
        /**@type {number}*/(rflect.cal.MainBody.ComponentsIndexes.MINI_CAL));

  }
}


/**
 * Date drag handler. On this event we must deduce configuration and set basis
 * depending on number of days selected.
 * @param {{type: string}} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onDateDrag_ = function(aEvent) {
  if (aEvent.selectionConfiguration ==
      rflect.cal.TimeManager.Configuration.MONTH)
    this.timeManager.setBasis(aEvent.firstDayInMonth);
  else
    this.timeManager.setBasis(aEvent.startDate);
  this.timeManager.daysNumber = aEvent.duration;
  this.showView(aEvent.selectionConfiguration, aEvent.target);
}


/**
 * Shows particular view, main sequence method.
 * @param {rflect.cal.ViewType} aType Type of view to show.
 * @param {rflect.ui.Component=} opt_caller What component initiated view
 * change.
 */
rflect.cal.ViewManager.prototype.showView = function(aType, opt_caller) {
  var viewHasChanged = this.currentView != aType;
  var calledExternally = opt_caller != undefined;
  var calledByMiniCal = opt_caller == this.mainBody_.miniCal;

  if (!viewHasChanged && !calledExternally && !this.isOnStartup_)
    return;

  this.currentView = aType;
  // Run time manager.
  this.timeManager.configuration =
      /** @type {rflect.cal.TimeManager.Configuration} */ (this.currentView);
  this.timeManager.run();
  this.eventManager_.run();

  if (this.isOnStartup_) {
    this.mainBody_.preRender();

    this.mainBody_.updateBeforeRedraw();
    // Render main body and places it in document.body.
    this.mainBody_.render();
    this.assignEvents_();
    this.isOnStartup_ = false;
  } else if (calledByMiniCal) {
    this.mainBody_.updateBeforeRedraw(
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.MINI_CAL),
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR));
    this.mainBody_.updateByRedraw(
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.MINI_CAL),
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR));
  } else {
    this.mainBody_.updateBeforeRedraw(
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR));
    this.mainBody_.updateByRedraw(
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.CAL_SELECTOR),
        /**@type {number}*/
        (rflect.cal.MainBody.ComponentsIndexes.TASK_SELECTOR));
  }
};


/**
 * Shows next period for time view.
 */
rflect.cal.ViewManager.prototype.showNext = function() {
  this.showNext_(rflect.cal.TimeManager.Direction.FORWARD);
};


/**
 * Shows previous period for time view.
 */
rflect.cal.ViewManager.prototype.showPrev = function() {
  this.showNext_(rflect.cal.TimeManager.Direction.BACKWARD);
};


/**
 * Shows next period for time view.
 * @param {rflect.cal.TimeManager.Direction} aDirection In what direction to
 * show view.
 * @private
 */
rflect.cal.ViewManager.prototype.showNext_ = function(aDirection) {
  //  if (goog.DEBUG) _perf('next interval');
  this.timeManager.shift(aDirection);
  this.eventManager_.run();
  this.mainBody_.updateBeforeRedraw();
  this.mainBody_.updateByRedraw();
  //  if (goog.DEBUG) _perf('next interval');
};


/**
 * Shows current moment for time view.
 */
rflect.cal.ViewManager.prototype.showNow = function() {
  this.timeManager.shiftToNow();
  this.eventManager_.run();
  this.mainBody_.updateBeforeRedraw();
  this.mainBody_.updateByRedraw();
};


/**
 * Disposes of the view manager.
 * @override
 * @protected
 */
rflect.cal.ViewManager.prototype.disposeInternal = function() {
  rflect.cal.ViewManager.superClass_.disposeInternal.call(this);

  this.containerSizeMonitor_.dispose();
  this.mainBody_.dispose();

  this.containerSizeMonitor_ = null;
  this.mainBody_ = null;
  this.mainInstance_ = null;
  this.blockManager_ = null;
};

