/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Modal that hosts event pane
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.EventDialog');

goog.require('rflect.cal.ui.ScreenManagerPopup');


/**
 * Touch hold helper main class.
 * @unrestricted
 */
class EventDialog extends rflect.cal.ui.ScreenManagerPopup {

  /**
   * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
   * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
   * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
   * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
   * container size monitor.
   * @param {rflect.cal.Transport} aTransport Link to transport.
   * @param {rflect.cal.Navigator} aNavigator Link to navigator.
   * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
   *     issue by using an iframe instead of a div for bg element.
   * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
   *     goog.ui.Component} for semantics.
   */
  constructor(aViewManager, aTimeManager, aEventManager, aContainerSizeMonitor,
      aTransport, aNavigator, opt_useIframeMask, opt_domHelper) {
    super(opt_useIframeMask, opt_domHelper);

    /**
     * Pager.
     */
    this.eventPane_ = new rflect.cal.ui.EventPane(aViewManager, aTimeManager,
        aEventManager, aContainerSizeMonitor, aTransport, aNavigator);

    this.screenManager.addChild(this.eventPane_);
  };

  /**
   * @param {boolean} aShow
   * @param {boolean} aCreatingByNewButton
   * @param {Element} aAnchorElement
   * @param {boolean=} opt_creatingNewEvent
   * @param {boolean=} opt_creatingByTouchHold
   */
  show(aShow, aCreatingByNewButton, aAnchorElement, opt_creatingNewEvent,
      opt_creatingByTouchHold) {
    if (aShow) {
      this.eventPane_.setNewEventMode(opt_creatingNewEvent);
      this.eventPane_.setTouchHoldMode(opt_creatingByTouchHold);
    }

    if (aCreatingByNewButton) {
      this.showForNewButtonCase(aAnchorElement, aShow);
    } else {

    }
  }

  showForNewButtonCase(aAnchorElement, aShow){
    this.setPinnedCorner(goog.positioning.Corner.TOP_RIGHT);
    this.setMargin(new goog.math.Box(10, 0, 0, 0));
    this.setPosition(new goog.positioning.AnchoredViewportPosition(
        aAnchorElement, goog.positioning.Corner.BOTTOM_RIGHT));
    this.setVisible(aShow);
    this.positionArrow(
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.TOP,
        aAnchorElement);
  }

  /**
   * @override
   */
  disposeInternal() {
    EventDialog.superClass_.disposeInternal.call(this);
  }
}


/**
 * @typedef {EventDialog}
 */
rflect.cal.ui.EventDialog = EventDialog;


/**
 * @enum {number}
 */
rflect.cal.ui.EventDialog.CONFIGURATION = {
  NEW_EVENT: 1,
  FIELD_RIGHT: 2,
  FIELD_LEFT: 3
}