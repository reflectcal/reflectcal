/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class that standardizes panes switching.
 */

goog.provide('rflect.cal.ui.SettingsDialogScreenManager');


goog.require('rflect.cal.ui.ScreenManager');



/**
 * Settings dialog screen manager.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {rflect.cal.ui.ScreenManager}
 */
rflect.cal.ui.SettingsDialogScreenManager = function(aViewManager, aTimeManager,
                                                  aEventManager, 
                                                  aContainerSizeMonitor, 
                                                  aTransport, 
                                                  aNavigator, 
                                                  opt_domHelper) {
  rflect.cal.ui.ScreenManager.call(this, opt_domHelper);

  /**
   * Pager.
   */
  this.settingsPane_ = new rflect.cal.ui.SettingsPane(aViewManager,
      aTimeManager, aEventManager, aContainerSizeMonitor, aTransport);
  this.calendarsPane_ = new rflect.cal.ui.CalendarsPane(aViewManager,
      aTimeManager, aEventManager, aContainerSizeMonitor, aTransport);
  this.calendarEditPane_ = new rflect.cal.ui.CalendarEditPane(aViewManager,
      aTimeManager, aEventManager, aContainerSizeMonitor, aTransport);

  this.addChild(this.settingsPane_);
  this.addChild(this.calendarsPane_);
  this.addChild(this.calendarEditPane_);
}
goog.inherits(rflect.cal.ui.SettingsDialogScreenManager,
    rflect.cal.ui.ScreenManager);


/**
 * @return {rflect.cal.ui.SettingsPane}
 */
rflect.cal.ui.SettingsDialogScreenManager.prototype.getSettingsPane =
    function() {
  return this.settingsPane_;
}


/**
 * @return {rflect.cal.ui.CalendarsPane}
 */
rflect.cal.ui.SettingsDialogScreenManager.prototype.getCalendarsPane =
    function() {
  return this.calendarsPane_;
}


/**
 * @return {rflect.cal.ui.CalendarEditPane}
 */
rflect.cal.ui.SettingsDialogScreenManager.prototype.getCalendarEditPane =
    function() {
  return this.calendarEditPane_;
}

