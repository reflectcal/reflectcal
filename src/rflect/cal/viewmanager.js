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
goog.require('rflect.cal.Navigator');
goog.require('rflect.cal.NotificationManager');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.TimeManager');
goog.require('rflect.cal.TimeManager.Direction');
goog.require('rflect.cal.Transport');
goog.require('rflect.cal.ui.MainBody');
goog.require('rflect.cal.ui.ScreenManager');
goog.require('rflect.cal.ui.ScreenManager.EventTypes');
goog.require('rflect.cal.ViewType');



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
   * Transport.
   * @type {rflect.cal.Transport}
   * @private
   */
  this.transport_ = new rflect.cal.Transport(this,
      this.timeManager, this.eventManager_);

  /**
   * Block manager.
   * @type {rflect.cal.blocks.BlockManager}
   * @private
   */
  this.blockManager_ = new rflect.cal.blocks.BlockManager(this, this.timeManager,
      this.eventManager_);

  /**
   * Navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = new rflect.cal.Navigator(window);

  /**
   * Main body component.
   * @type {rflect.cal.ui.MainBody}
   * @private
   */
  this.mainBody_ = new rflect.cal.ui.MainBody(this, this.timeManager,
      this.eventManager_, this.containerSizeMonitor_, this.blockManager_,
      this.transport_, this.navigator_);

  /**
   * Pager.
   * @type {rflect.cal.ui.ScreenManager}
   * @private
   */

  this.screenManager_ = new rflect.cal.ui.ScreenManager(this);
  this.screenManager_.setSlidingIsEnabled(rflect.TOUCH_INTERFACE_ENABLED);

   /**
   * Notification manager.
   * @type {rflect.cal.NotificationManager}
   * @private
   */
  this.notificationManager_ = new rflect.cal.NotificationManager(this,
      this.timeManager, this.eventManager_);

  /**
   * Mutable user object.
   * @type {Object}
   */
  this.user = /**@type {Object}*/ (goog.object.unsafeClone(USER));

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
  if (goog.DEBUG)
    _inspect('transport_', this.transport_);

  // Set initial view.
  this.currentView = this.navigator_.isSmallScreen() ?
      rflect.cal.ViewType.DAY : rflect.cal.ViewType.WEEK;
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
 * @return {rflect.cal.ui.ScreenManager}
 */
rflect.cal.ViewManager.prototype.getScreenManager = function(){
  return this.screenManager_;
};


/**
 * Attaches event handlers.
 */
rflect.cal.ViewManager.prototype.enterDocument = function() {
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

  //Listen immediate press on save settings button.
  this.listen(this.mainBody_,
      rflect.cal.ui.SettingsPane.EventTypes.SAVE, this.onSaveUserImmediate_,
      false, this);
  //Listen specific case when save settings need a reload.
  this.listen(this.transport_, rflect.cal.Transport.EventTypes.SAVE_USER,
      this.onSaveUserResponse_, false, this);
  this.listen(this.screenManager_,
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE, this.onPageChange_,
      false, this);
  this.listen(this.mainBody_, rflect.cal.ui.PAGE_REQUEST_EVENT,
      this.onPageRequest_, false, this);

  this.screenManager_.assignEvents();

};


/**
 * @return {boolean} Whether we're in week mode.
 */
rflect.cal.ViewManager.prototype.isInWeekMode = function() {
  return this.typeIsWeek(this.currentView);
};


/**
 * @return {boolean} Whether we're in month mode.
 */
rflect.cal.ViewManager.prototype.isInMonthMode = function() {
  return this.typeIsMonth(this.currentView);
};


/**
 * @param {rflect.cal.ViewType} aType View type to test.
 * @return {boolean} Whether type is week.
 */
rflect.cal.ViewManager.prototype.typeIsWeek = function(aType) {
  return aType == rflect.cal.ViewType.DAY ||
      aType == rflect.cal.ViewType.MULTI_DAY ||
      aType == rflect.cal.ViewType.WEEK;
};


/**
 * @param {rflect.cal.ViewType} aType View type to test.
 * @return {boolean} Whether type is month.
 */
rflect.cal.ViewManager.prototype.typeIsMonth = function(aType) {
  return aType == rflect.cal.ViewType.MULTI_WEEK ||
      aType == rflect.cal.ViewType.MONTH;
};


/**
 * Viewport resize handler.
 * @private
 */
rflect.cal.ViewManager.prototype.onViewportResize_ = function() {
  this.mainBody_.updateBeforeRedraw();
  this.mainBody_.getMainPane().updateBeforeRedraw();
  this.mainBody_.getSidePane().updateBeforeRedraw();
  this.mainBody_.getSidePane().getCalSelector().updateBeforeRedraw();
  this.mainBody_.getSidePane().getTaskSelector().updateBeforeRedraw();
  
  this.mainBody_.getMainPane().updateByRedraw();
  this.mainBody_.getSidePane().getCalSelector().updateByRedraw();
  this.mainBody_.getSidePane().getTaskSelector().updateByRedraw();
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
    case rflect.cal.predefined.BUTTON_SETTINGS_ID:
      if (goog.events.dispatchEvent(this.mainBody_,
          rflect.cal.EventType.MENU_COMMAND_OPTIONS))
        this.onMenuCommandOptions_();break;
    default: break;
  }
}


/**
 * Page slide end handler.
 * @param {rflect.cal.ui.ScreenManager.PageChangeEvent} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onPageChange_ = function(aEvent) {
}


/**
 * Page request handler.
 * @param {rflect.cal.ui.PageRequestEvent} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onPageRequest_ = function(aEvent) {
  this.screenManager_.showScreen(aEvent.component, aEvent.show);
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
  //TODO(alexk): add logic to load module.
  // is moduleLoaded_ viewmanager just sets this variable to true, while main
  // body actually shows pane when module loaded, showing alert if not.
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

  this.timeManager.shiftToPoint(aEvent.date);
  this.eventManager_.run();

  this.mainBody_.getSidePane().getMiniCal().updateBeforeRedraw();
  this.mainBody_.getSidePane().getMiniCal().updateByRedraw();

  this.mainBody_.updateBeforeRedraw();
  this.mainBody_.getMainPane().updateBeforeRedraw();
  this.mainBody_.getTopPane().updateBeforeRedraw();

  this.mainBody_.getMainPane().updateByRedraw();
  this.mainBody_.getTopPane().updateByRedraw();

  this.transport_.loadEventsAsync();
}


/**
 * Save settings immediate (when settings pane 'save' button is pressed)
 * handler.
 * @param {rflect.cal.ui.SettingsPane.SaveUserEvent} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onSaveUserImmediate_ = function(aEvent) {
  if (aEvent.userChanged) {
    this.eventManager_.run();
    this.mainBody_.update();
  }
}


/**
 * Save user transport response handler. We use it to reload page to apply
 * user settings, if needed.
 * @param {rflect.cal.Transport.SaveUserEvent} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onSaveUserResponse_ = function(aEvent) {
  if (aEvent.reload)
    window.location.reload();
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
 * @param {rflect.cal.ViewType} aType Type of view to show.
 * @return {boolean} Whether view mode has changed (like from any week mode to 
 * month).
 */
rflect.cal.ViewManager.prototype.viewModeHasChanged = function(aType) {
  return this.typeIsWeek(this.currentView) && this.typeIsMonth(aType) ||
      this.typeIsWeek(aType) && this.typeIsMonth(this.currentView);
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
  var miniCal = this.mainBody_.getSidePane().getMiniCal();
  var calledByMiniCal = calledExternally && opt_caller == miniCal;

  if (viewHasChanged || calledExternally || this.isOnStartup_){

    this.currentView = aType;
    // Run time manager.
    this.timeManager.configuration =
        /** @type {rflect.cal.TimeManager.Configuration} */ (this.currentView);
    this.timeManager.run();
    this.eventManager_.run();

    if (this.isOnStartup_) {

      this.transport_.loadCalendars();

      this.mainBody_.updateBeforeRedraw(true, true);
      this.screenManager_.render();
      // Render main body and places it in screen manager element.
      this.screenManager_.showScreen(this.mainBody_, true);
      this.enterDocument();
      //this.transport_.enterNotificationsListening();
      this.notificationManager_.enterNotificationsWatching();
      this.isOnStartup_ = false;

    } else if (calledByMiniCal) {

      this.mainBody_.updateBeforeRedraw();
      this.mainBody_.getTopPane().updateBeforeRedraw();
      this.mainBody_.getSidePane().updateBeforeRedraw();
      this.mainBody_.getMainPane().updateBeforeRedraw();

      this.mainBody_.getTopPane().updateByRedraw();
      this.mainBody_.getSidePane().updateByRedraw();
      this.mainBody_.getMainPane().updateByRedraw();

    } else {

      this.mainBody_.updateBeforeRedraw();
      this.mainBody_.getMainPane().updateBeforeRedraw(false, false, true);
      this.mainBody_.getTopPane().updateBeforeRedraw();
      this.mainBody_.getSidePane().updateBeforeRedraw();
      if (miniCal){
        this.mainBody_.getSidePane().getMiniCal().updateBeforeRedraw();
      }

      this.mainBody_.getMainPane().updateByRedraw();
      this.mainBody_.getTopPane().updateByRedraw();
      this.mainBody_.getSidePane().updateByRedraw();
      if (miniCal){
        this.mainBody_.getSidePane().getMiniCal().updateByRedraw();
      }
    }

    this.transport_.loadEventsAsync();

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

  this.mainBody_.updateBeforeRedraw(true, true);
  this.mainBody_.getMainPane().updateByRedraw();
  this.mainBody_.getTopPane().updateByRedraw();
  var miniCal = this.mainBody_.getSidePane().getMiniCal();
  if (miniCal) {
    miniCal.updateByRedraw();
  }

  this.transport_.loadEventsAsync();
  //  if (goog.DEBUG) _perf('next interval');
};


/**
 * Shows current moment for time view.
 */
rflect.cal.ViewManager.prototype.showNow = function() {
  this.timeManager.shiftToNow();
  this.eventManager_.run();

  this.mainBody_.updateBeforeRedraw(true, true);
  this.mainBody_.getMainPane().updateByRedraw();
  this.mainBody_.getTopPane().updateByRedraw();
  var miniCal = this.mainBody_.getSidePane().getMiniCal();
  if (miniCal) {
    miniCal.updateByRedraw();
  }

  this.transport_.loadEventsAsync();
};


/**
 * Disposes of the view manager.
 * @override
 * @protected
 */
rflect.cal.ViewManager.prototype.disposeInternal = function() {

  this.containerSizeMonitor_.dispose();
  this.mainBody_.dispose();
  this.transport_.dispose();
  this.notificationManager_.dispose();
  this.screenManager_.dispose();


  this.containerSizeMonitor_ = null;
  this.mainBody_ = null;
  this.mainInstance_ = null;
  this.blockManager_ = null;

  rflect.cal.ViewManager.superClass_.disposeInternal.call(this);
};

