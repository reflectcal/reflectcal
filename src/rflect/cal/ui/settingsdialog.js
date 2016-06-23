/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Modal that hosts settings pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.SettingsDialog');

goog.require('rflect.cal.ui.ScreenManagerPopup');


/**
 * Touch hold helper main class.
 * @unrestricted
 */
class SettingsDialog extends rflect.cal.ui.ScreenManagerPopup {

  /**
   * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
   * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
   * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
   * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
   * container size monitor.
   * @param {rflect.cal.Transport} aTransport Link to transport.
   * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
   *     issue by using an iframe instead of a div for bg element.
   * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
   *     goog.ui.Component} for semantics.
   */
  constructor(aViewManager, aTimeManager, aEventManager, aContainerSizeMonitor,
      aTransport, opt_useIframeMask, opt_domHelper) {
    super(this, opt_useIframeMask, opt_domHelper);

    /**
     * Pager.
     */
    this.settingsPane_ = new rflect.cal.ui.SettingsPane(this, aTimeManager,
        aEventManager, aContainerSizeMonitor, aTransport);
    this.calendarsPane_ = new rflect.cal.ui.CalendarsPane(aViewManager,
        aTimeManager, aEventManager, aContainerSizeMonitor, aTransport);
    this.calendarEditPane_ = new rflect.cal.ui.CalendarEditPane(aViewManager,
        aTimeManager, aEventManager, aContainerSizeMonitor, aTransport);

    this.screenManager.addChild(this.settingsPane_);
    this.screenManager.addChild(this.calendarsPane_);
    this.screenManager.addChild(this.calendarEditPane_);

    this.screenManager.setSlidingIsEnabled(rflect.TOUCH_INTERFACE_ENABLED);
  };

  /**
   * @override
   */
  disposeInternal() {
    SettingsDialog.superClass_.disposeInternal.call(this);
  }
}


/**
 * @typedef {ScreenManagerPopup}
 */
rflect.cal.ui.SettingsDialog = SettingsDialog;