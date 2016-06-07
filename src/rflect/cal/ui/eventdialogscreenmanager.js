/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class that standardizes panes switching.
 */

goog.provide('rflect.cal.ui.EventDialogScreenManager');


goog.require('rflect.cal.ui.ScreenManager');



/**
 * Event dialog screen manager.
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
rflect.cal.ui.EventDialogScreenManager = function(aViewManager, aTimeManager,
                                                  aEventManager, 
                                                  aContainerSizeMonitor, 
                                                  aTransport, 
                                                  aNavigator, 
                                                  opt_domHelper) {
  rflect.cal.ui.ScreenManager.call(this, opt_domHelper);

  this.eventPane_ = new rflect.cal.ui.EventPane(aViewManager, aTimeManager,
      aEventManager, aContainerSizeMonitor, aTransport, aNavigator);
  
  this.addChild(this.eventPane_);
}
goog.inherits(rflect.cal.ui.EventDialogScreenManager,
    rflect.cal.ui.ScreenManager);


/**
 * @return {rflect.cal.ui.EventPane}
 */
rflect.cal.ui.EventDialogScreenManager.prototype.getEventPane = function() {
  return this.eventPane_;
};
