/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview View manager is the main component.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ViewManager');

goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('rflect.cal.ui.ScreenManager');
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
goog.require('rflect.cal.ui.GridEventDialog');
goog.require('rflect.cal.ui.GridEventDialogScreenManager');
goog.require('rflect.cal.ui.EditDialog');
goog.require('rflect.cal.ui.EventDialog');
goog.require('rflect.cal.ui.EventDialogScreenManager');
goog.require('rflect.cal.ui.MainBody');
goog.require('rflect.cal.ui.MainPane.EventTypes');
goog.require('rflect.cal.ui.SaveDialog');
goog.require('rflect.cal.ui.ScreenManager');
goog.require('rflect.cal.ui.ScreenManagerPopup');
goog.require('rflect.cal.ui.SettingsDialog');
goog.require('rflect.cal.ui.SettingsDialogScreenManager');
goog.require('rflect.cal.ui.ScreenManager.EventTypes');
goog.require('rflect.cal.ViewType');



/**
 * View manager main class.
 * @param {rflect.cal.Main} aMainInstance Cal main instance passed to establish
 * link between modules.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {rflect.cal.ui.ScreenManager}
 */
rflect.cal.ViewManager = function(aMainInstance, opt_domHelper) {
  rflect.cal.ui.ScreenManager.call(this, opt_domHelper);

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
   * Navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = new rflect.cal.Navigator(window);

  /**
   * Container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   */
  this.containerSizeMonitor_ = new rflect.cal.ContainerSizeMonitor(this,
      //TODO(alexk): Implement configuration options.
      document.body, this.navigator_);

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
   * Main body component.
   * @type {rflect.cal.ui.MainBody}
   * @private
   */
  this.mainBody_ = new rflect.cal.ui.MainBody(this, this.timeManager,
      this.eventManager_, this.containerSizeMonitor_, this.blockManager_,
      this.transport_, this.navigator_);
  this.addChild(this.mainBody_);

  /**
   * Pager.
   */
  this.eventPane_ = new rflect.cal.ui.EventPane(this, this.timeManager,
      this.eventManager_, this.containerSizeMonitor_, this.transport_,
      this.navigator_);
  this.settingsPane_ = new rflect.cal.ui.SettingsPane(this, this.timeManager,
      this.eventManager_, this.containerSizeMonitor_, this.transport_);
  this.calendarsPane_ = new rflect.cal.ui.CalendarsPane(this,
      this.timeManager, this.eventManager_, this.containerSizeMonitor_,
      this.transport_);
  this.calendarEditPane_ = new rflect.cal.ui.CalendarEditPane(this,
      this.timeManager, this.eventManager_, this.containerSizeMonitor_,
      this.transport_);

  this.addChild(this.eventPane_);
  this.addChild(this.settingsPane_);
  this.addChild(this.calendarsPane_);
  this.addChild(this.calendarEditPane_);

  this.setSlidingIsEnabled(rflect.TOUCH_INTERFACE_ENABLED);

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
  this.currentView = this.containerSizeMonitor_.isSmallScreen() ?
      rflect.cal.ViewType.DAY : rflect.cal.ViewType.WEEK;
  this.showView(this.currentView);
};
goog.inherits(rflect.cal.ViewManager, rflect.cal.ui.ScreenManager);


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
 * Event pane.
 * @type {rflect.cal.ui.EventPane}
 * @private
 */
rflect.cal.ViewManager.prototype.eventPane_;


/**
 * Settings pane.
 * @type {rflect.cal.ui.SettingsPane}
 * @private
 */
rflect.cal.ViewManager.prototype.settingsPane_;


/**
 * @type {rflect.cal.ui.CalendarsPane}
 * @private
 */
rflect.cal.ViewManager.prototype.calendarsPane_;


/**
 * @type {rflect.cal.ui.CalendarEditPane}
 * @private
 */
rflect.cal.ViewManager.prototype.calendarEditPane_;


/**
 * @return {rflect.cal.ui.EventPane}
 */
rflect.cal.ViewManager.prototype.getEventPane = function() {
  return this.eventPane_;
};


/**
 * @return {rflect.cal.ui.SettingsPane}
 */
rflect.cal.ViewManager.prototype.getSettingsPane = function() {
  return this.settingsPane_;
}


/**
 * @return {rflect.cal.ui.CalendarsPane}
 */
rflect.cal.ViewManager.prototype.getCalendarsPane = function() {
  return this.calendarsPane_;
}


/**
 * @return {rflect.cal.ui.CalendarEditPane}
 */
rflect.cal.ViewManager.prototype.getCalendarEditPane = function() {
  return this.calendarEditPane_;
}


/**
 * @type {rflect.cal.ui.EventDialog}
 */
rflect.cal.ViewManager.prototype.eventDialog_;


/**
 * @type {rflect.cal.ui.GridEventDialog}
 */
rflect.cal.ViewManager.prototype.gridEventDialog_;


/**
 * @type {rflect.cal.ui.SettingsDialog}
 */
rflect.cal.ViewManager.prototype.settingsDialog_;


/**
 * @override
 */
rflect.cal.ViewManager.prototype.enterDocument = function() {
  rflect.cal.ViewManager.superClass_.enterDocument.call(this);


  // Listen immediate press on save settings button.
  this.getHandler().
      listen(this,
      rflect.cal.ui.SettingsPane.EventTypes.SAVE, this.onSaveUserImmediate_,
      false, this);

  // Page change events.
  this.getHandler().
      listen(this, rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE,
      this.onPageChange_, false, this);

  // Container resize listener.
  this.getHandler().
      listen(this.containerSizeMonitor_,
      goog.events.EventType.RESIZE,
      this.onViewportResize_, false, this);

  // Menu commands.
  this.getHandler().
      listen(this.mainBody_,
      goog.ui.Component.EventType.ACTION,
      this.onMainBodyAction_, false, this);

  // Date events.
  this.getHandler().
      listen(this.mainBody_, rflect.cal.EventType.DATE_SELECT,
      this.onDateSelect_, false, this).
      listen(this.mainBody_, rflect.cal.EventType.DATE_DRAG,
      this.onDateDrag_, false, this).
      listen(this.mainBody_, rflect.cal.EventType.DATE_DRAG_END,
      goog.nullFunction, false, this);

  // Listen specific case when save settings need a reload.
  this.getHandler().
      listen(this.transport_,
      rflect.cal.Transport.EventTypes.SAVE_USER,
      this.onSaveUserResponse_, false, this);

  // Dialog events.
  this.getHandler().
      listen(this, rflect.cal.ui.MainPane.EventTypes.EDIT_COMPONENT_SHOW,
      this.onEditComponentShow_, false, this);

  // Event pane.
  this.getHandler().listen(this.eventPane_,
      rflect.cal.ui.EventPane.EventTypes.SAVE, this.onEventPaneSave_,
      false, this).listen(this.eventPane_,
      rflect.cal.ui.EventPane.EventTypes.DELETE, this.onEventPaneDelete_,
      false, this);

  // Settings pane.
  this.getHandler().listen(this.settingsPane_,
      rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
      this.onSettingsPaneCalendarUpdate_, false, this);
};


rflect.cal.ViewManager.prototype.showGridEventDialog = function (aShow, 
    aAnchorElement,
    opt_anchorCoordinate, opt_creatingNewEvent, opt_creatingByTouchHold) {
  //Creating by grid.
  if (!this.gridEventDialog_) {
    this.gridEventDialog_ = new rflect.cal.ui.GridEventDialog(this,
        this.timeManager, this.eventManager_, this.containerSizeMonitor_,
        this.transport_, this.navigator_);
    this.gridEventDialog_.addScreenManager(
        new rflect.cal.ui.GridEventDialogScreenManager(
        this, this.timeManager, this.eventManager_, this.containerSizeMonitor_,
        this.transport_, this.navigator_));
    this.addChild(this.gridEventDialog_);

    // Event pane.
    this.getHandler().listen(this.gridEventDialog_,
        rflect.cal.ui.EventPane.EventTypes.SAVE, this.onEventPaneSave_,
        false, this).listen(this.gridEventDialog_,
        rflect.cal.ui.EventPane.EventTypes.DELETE, this.onEventPaneDelete_,
        false, this);
  }
  this.gridEventDialog_.show(aShow, aAnchorElement,
      opt_anchorCoordinate, opt_creatingNewEvent, opt_creatingByTouchHold);
};


rflect.cal.ViewManager.prototype.showNewEventDialog = function (aShow, aAnchorElement, opt_anchorCoordinate, opt_creatingNewEvent, opt_creatingByTouchHold) {
//Creating by 'new event' button.
  if (!this.eventDialog_) {
    this.eventDialog_ = new rflect.cal.ui.EventDialog(this, this.timeManager,
        this.eventManager_, this.containerSizeMonitor_, this.transport_,
        this.navigator_);
    this.eventDialog_.addScreenManager(
        new rflect.cal.ui.EventDialogScreenManager(this,
        this.timeManager, this.eventManager_, this.containerSizeMonitor_,
        this.transport_, this.navigator_));
    this.addChild(this.eventDialog_);

    // Event pane.
    this.getHandler().listen(this.eventDialog_,
        rflect.cal.ui.EventPane.EventTypes.SAVE, this.onEventPaneSave_,
        false, this).listen(this.eventDialog_,
        rflect.cal.ui.EventPane.EventTypes.DELETE, this.onEventPaneDelete_,
        false, this);
  }
  this.eventDialog_.show(aShow, aAnchorElement,
      opt_anchorCoordinate, opt_creatingNewEvent, opt_creatingByTouchHold);
};


rflect.cal.ViewManager.prototype.showNewEventPane = function (opt_creatingNewEvent, opt_creatingByTouchHold, aShow) {
  this.eventPane_.setNewEventMode(opt_creatingNewEvent);
  this.eventPane_.setTouchHoldMode(opt_creatingByTouchHold);

  this.showScreen(this.eventPane_, aShow);
};


/**
 * Shows event pane when possible and lazily instantiates it at the first time.
 * @param {boolean} aShow Whether to show event pane.
 * @param {Element} aAnchorElement Element near which to show event dialog.
 * @param {boolean} aCreatingByNewButton Whether creating event by 'New'
 * button.
 * @param {goog.math.Coordinate=} opt_anchorCoordinate Coordinate of mouse click
 * prior to calendar event creation.
 * @param {boolean=} opt_creatingNewEvent Whether we're creating new event.
 * @param {boolean=} opt_creatingByTouchHold Whether we're creating event by
 * touch hold.
 */
rflect.cal.ViewManager.prototype.showEventPane = function(aShow, aAnchorElement,
    aCreatingByNewButton, opt_anchorCoordinate, opt_creatingNewEvent,
    opt_creatingByTouchHold) {
  const isSmallScreen = this.containerSizeMonitor_.isSmallScreen();

  if (!isSmallScreen) {
    if (aCreatingByNewButton) {
      this.showNewEventDialog(aShow, aAnchorElement, opt_anchorCoordinate, 
          opt_creatingNewEvent, opt_creatingByTouchHold);
    } else {
      this.showGridEventDialog(aShow, aAnchorElement, opt_anchorCoordinate, 
          opt_creatingNewEvent, opt_creatingByTouchHold);
    }
  } else {
    this.showNewEventPane(opt_creatingNewEvent, opt_creatingByTouchHold, aShow);
  }
}


/**
 * Shows settings pane when possible and lazily instantiates it at the first
 * time.
 * @param {boolean} aShow Whether to show settings pane.
 */
rflect.cal.ViewManager.prototype.showSettingsPane = function(aShow) {
  const isSmallScreen = this.containerSizeMonitor_.isSmallScreen();

  if (!isSmallScreen) {
    if (!this.settingsDialog_) {
      this.settingsDialog_ = new rflect.cal.ui.SettingsDialog(this,
          this.timeManager, this.eventManager_, this.containerSizeMonitor_,
          this.transport_);
      this.settingsDialog_.addScreenManager(
          new rflect.cal.ui.SettingsDialogScreenManager(this,
              this.timeManager, this.eventManager_, this.containerSizeMonitor_,
              this.transport_, this.navigator_));
      this.addChild(this.settingsDialog_);
    
      // Settings pane.
      this.getHandler().listen(this.settingsDialog_,
          rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
          this.onSettingsPaneCalendarUpdate_, false, this);
    }
    this.settingsDialog_.show(aShow, this.getDomHelper().getElement(
        rflect.cal.predefined.BUTTON_SIDE_PANE_SETTINGS_ID));
  } else {
    this.showScreen(this.settingsPane_, aShow);
  }
}


/**
 * Event pane save listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ViewManager.prototype.onEventPaneSave_ = function(aEvent) {
  this.updateMainPane_();
}


/**
 * Event pane delete listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ViewManager.prototype.onEventPaneDelete_ = function(aEvent) {
  this.updateMainPane_();
}


/**
 * Settings pane cancel listener.
 */
rflect.cal.ViewManager.prototype.onSettingsPaneCancel_ = function() {
  this.showSettingsPane(false);
}


/**
 * Settings pane calendar update listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ViewManager.prototype.onSettingsPaneCalendarUpdate_ =
    function(aEvent) {
  this.eventManager_.run();
  this.mainBody_.getSidePane().update({
    updateCalendarsOnly: true
  });
  this.mainBody_.getMainPane().update();
}


/**
 * Updates just main pane.
 */
rflect.cal.ViewManager.prototype.updateMainPane_ = function() {
  this.eventManager_.run();

  //Do not attach momentum scroller, we will do it on page change.
  this.mainBody_.getMainPane().update();
}


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
 * @param {rflect.cal.ContainerSizeMonitor.ResizeEvent} aEvent
 * @private
 */
rflect.cal.ViewManager.prototype.onViewportResize_ = function(aEvent) {
  this.mainBody_.update();
};


/**
 * Main body action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onMainBodyAction_ = function(aEvent){
  var id = aEvent.target.getId();

  switch (id) {
    case rflect.cal.predefined.BUTTON_NOW_ID: {
      this.onMenuCommandNow_(); break;
    }
    case rflect.cal.predefined.BUTTON_PREV_ID: {
      this.onMenuCommandPrev_(); break;
    }
    case rflect.cal.predefined.BUTTON_NEXT_ID: {
      this.onMenuCommandNext_(); break;
    }
    case rflect.cal.predefined.BUTTON_NEW_EVENT_ID: {
      this.onMenuCommandNewEvent_(); break;
    }
    case rflect.cal.predefined.BUTTON_DAY_ID:
    case rflect.cal.predefined.BUTTON_SIDE_PANE_DAY_ID: {
      this.onMenuCommandDay_(); break;
    }
    case rflect.cal.predefined.BUTTON_WEEK_ID:
    case rflect.cal.predefined.BUTTON_SIDE_PANE_WEEK_ID: {
      this.onMenuCommandWeek_(); break;
    }
    case rflect.cal.predefined.BUTTON_MONTH_ID:
    case rflect.cal.predefined.BUTTON_SIDE_PANE_MONTH_ID: {
      this.onMenuCommandMonth_(); break;
    }
    case rflect.cal.predefined.BUTTON_SETTINGS_ID: {
      break;
    }
    case rflect.cal.predefined.BUTTON_SIDE_PANE_SETTINGS_ID: {
      this.onMenuCommandOptions_(); break;
    }
    case rflect.cal.predefined.BUTTON_MENU_ID: {
      this.onMenuCommandMenu_(); break;
    }
    default: break;
  }
}


/**
 * @param {rflect.cal.ui.MainPane.EditComponentShowEvent} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onEditComponentShow_ = function(aEvent) {
  const {
    calendarEvent,
    editing,
    byTouchHold,
    targetElement,
    targetCoordinate
  } = aEvent;

  if (byTouchHold) {
    if (this.eventManager_.eventHolder.isInProgress()) {
      this.showEventPane(true, targetElement, false, targetCoordinate, true, true);
    }
  } else if (!this.eventManager_.eventIsInProgress(calendarEvent.id)) {
    this.eventManager_.eventHolder.openSession(calendarEvent);
    if (calendarEvent) {
      this.showEventPane(true, targetElement, false, targetCoordinate, !editing);
    }
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
  this.eventManager_.startEventCreationSession();
  this.showEventPane(true, this.getDomHelper().
      getElement(rflect.cal.predefined.BUTTON_NEW_EVENT_ID), true, undefined,
      true);
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
  if (this.containerSizeMonitor_.isSmallScreen()) {
    this.mainBody_.showSidePane(false);
  }
  this.showSettingsPane(true);
};


/**
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandOptionsSidePane_ = function() {
  this.showSettingsPane(true);
};


/**
 * @private
 */
rflect.cal.ViewManager.prototype.onMenuCommandMenu_ = function() {
  this.mainBody_.toggleExpanded();
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

  this.mainBody_.getSidePane().getMiniCal().update();
  this.mainBody_.getMainPane().update();
  this.mainBody_.getTopPane().update({
    updateByNavigation: true
  });

  this.transport_.loadEventsAsync();
}


/**
 * Save settings immediate (when settings pane 'save' button is pressed)
 * handler.
 * @param {rflect.cal.ui.SettingsPane.SaveUserEvent} aEvent Event object.
 * @private
 */
rflect.cal.ViewManager.prototype.onSaveUserImmediate_ = function(aEvent) {
  //Listen for user change events from settings pane only.
  if (aEvent.target == this.getSettingsPane()) {
    if (aEvent.user['settings']['visualTheme'] !==
        aEvent.changedUser['settings']['visualTheme']) {
      this.mainBody_.changeVisualTheme(aEvent.changedUser['settings']
          ['visualTheme']);
    }
    //Save new user.
    this.user = aEvent.changedUser;
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


rflect.cal.ViewManager.prototype.isInSingleDayMode = function() {
  return rflect.cal.ViewType.DAY == this.currentView;
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
 * @param {rflect.ui.UpdatableComponent=} opt_caller What component initiated view
 * change.
 */
rflect.cal.ViewManager.prototype.showView = function(aType, opt_caller) {
  var viewHasChanged = this.currentView != aType;
  var calledExternally = opt_caller != undefined;
  var miniCal = this.mainBody_.getSidePane().getMiniCal();
  var calledByMiniCal = calledExternally && opt_caller == miniCal;
  var miniCalElement = this.mainBody_.getSidePane().getMiniCal().getElement();

  if (viewHasChanged || calledExternally || this.isOnStartup_){

    this.currentView = aType;
    // Run time manager.
    this.timeManager.configuration =
        /** @type {rflect.cal.TimeManager.Configuration} */ (this.currentView);
    this.timeManager.run();
    this.eventManager_.run();

    if (this.isOnStartup_) {

      this.transport_.loadCalendars();

      // Render main body and places it in screen manager element.
      this.render();
      this.showScreen(this.mainBody_, true);
      //this.transport_.enterNotificationsListening();
      this.notificationManager_.enterNotificationsWatching();
      this.isOnStartup_ = false;

    } else if (calledByMiniCal) {

      this.mainBody_.getSidePane().update({
        updateByModeSwitch: true,
        doNotUpdateMiniCal: true
      });
      this.mainBody_.getTopPane().update({ updateByNavigation: true });
      this.mainBody_.getMainPane().update();

    } else {

      this.mainBody_.getSidePane().update({ updateByModeSwitch: true });
      this.mainBody_.getTopPane().update({ updateByNavigation: true });
      this.mainBody_.getMainPane().update({ updateByNavigation: true });

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

  this.mainBody_.getMainPane().update({ updateByNavigation: true});
  this.mainBody_.getTopPane().update({ updateByNavigation: true});
  this.mainBody_.getSidePane().update({ updateByNavigation: true});

  this.transport_.loadEventsAsync();
  //  if (goog.DEBUG) _perf('next interval');
};


/**
 * Shows current moment for time view.
 */
rflect.cal.ViewManager.prototype.showNow = function() {
  this.timeManager.shiftToNow();
  this.eventManager_.run();

  this.mainBody_.getMainPane().update({ updateByNavigation: true});
  this.mainBody_.getTopPane().update({ updateByNavigation: true});
  this.mainBody_.getSidePane().update({ updateByNavigation: true});

  this.transport_.loadEventsAsync();
};


/**
 * Disposes of the view manager.
 * @override
 * @protected
 */
rflect.cal.ViewManager.prototype.disposeInternal = function() {

  this.containerSizeMonitor_.dispose();
  this.transport_.dispose();
  this.notificationManager_.dispose();

  this.containerSizeMonitor_ = null;
  this.mainInstance_ = null;
  this.blockManager_ = null;

  rflect.cal.ViewManager.superClass_.disposeInternal.call(this);
};

