/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Modal that hosts event pane
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.GridEventDialog');

goog.require('rflect.cal.ui.ScreenManagerPopup');
goog.require('rflect.ui.MouseMissBehavior');


/**
 * Touch hold helper main class.
 * @unrestricted
 */
class GridEventDialog extends rflect.cal.ui.ScreenManagerPopup {

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
     * "Mouse miss to cancel" behavior for this dialog.
     * @type {rflect.ui.MouseMissBehavior}
     * @private
     */
    this.mmBehavior_ = new rflect.ui.MouseMissBehavior(this);
    this.mmBehavior_.enable(!rflect.TOUCH_INTERFACE_ENABLED);

    /**@type {goog.math.Coordinate}*/
    this.lastUsedAnchorCoordinate;
  };

  /**
   * @override
   */
  getCharacteristicClass() {
    return 'event-dialog-grid';
  }
  
  /**
   * @param {boolean} aShow
   * @param {Element} aAnchorElement
   * @param {goog.math.Coordinate=} opt_anchorCoordinate
   * @param {boolean=} opt_creatingNewEvent
   * @param {boolean=} opt_creatingByTouchHold
   */
  show(aShow, aAnchorElement, opt_anchorCoordinate,
       opt_creatingNewEvent, opt_creatingByTouchHold) {
    if (aShow) {
      goog.asserts.assert(!!this.screenManager,
          'Screen manager must not be null.');

      (/**@type {rflect.cal.ui.GridEventDialogScreenManager}*/(this.screenManager)).
      getEventPaneShort().setNewEventMode(opt_creatingNewEvent);
      (/**@type {rflect.cal.ui.GridEventDialogScreenManager}*/(this.screenManager)).
      getEventPaneShort().setTouchHoldMode(opt_creatingByTouchHold);
      (/**@type {rflect.cal.ui.GridEventDialogScreenManager}*/(this.screenManager)).
      getEventPane().setNewEventMode(opt_creatingNewEvent);
      (/**@type {rflect.cal.ui.GridEventDialogScreenManager}*/(this.screenManager)).
      getEventPane().setTouchHoldMode(opt_creatingByTouchHold);
    }

    this.lastUsedAnchorCoordinate = opt_anchorCoordinate;
    this.showForGridCase(aShow,
        true,
        this.moreSpaceToTheRight(),
        opt_anchorCoordinate);
  }

  /**
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   * @return {number} Margin top for centering modal box vertically.
   */
  getMarginTop(aAnchorCoordinate) {

    const {
        top: topOfPopup,
        right: rightOfPopup,
        bottom: bottomOfPopup,
        left: leftOfPopup
    } = this.getElement().getBoundingClientRect();
    const heightOfPopup = bottomOfPopup - topOfPopup;

    const defaultMarginTopAbs = heightOfPopup / 2;

    const doc = this.getDomHelper().getDocument();
    const win = goog.dom.getWindow(doc) || window;
    const viewSize = goog.dom.getViewportSize(win);

    const howMuchOfPopupIsOut = viewSize.height - aAnchorCoordinate.y -
        defaultMarginTopAbs;

    var marginTopAbs = defaultMarginTopAbs;
    if (defaultMarginTopAbs > aAnchorCoordinate.y) {
      marginTopAbs = aAnchorCoordinate.y;
    } else if (howMuchOfPopupIsOut < 0) {
      marginTopAbs = defaultMarginTopAbs - howMuchOfPopupIsOut;
    }

    return -marginTopAbs;
  }

  /**
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   * @return {number} Margin left for centering modal box horizontally.
   */
  getMarginLeft(aAnchorCoordinate) {

    const {
        top: topOfPopup,
        right: rightOfPopup,
        bottom: bottomOfPopup,
        left: leftOfPopup
    } = this.getElement().getBoundingClientRect();
    const widthOfPopup = rightOfPopup - leftOfPopup;

    const defaultMarginLeftAbs = widthOfPopup / 2;

    const doc = this.getDomHelper().getDocument();
    const win = goog.dom.getWindow(doc) || window;
    const viewSize = goog.dom.getViewportSize(win);

    const howMuchOfPopupIsOut = viewSize.width - aAnchorCoordinate.x -
        defaultMarginLeftAbs;

    var marginLeftAbs = defaultMarginLeftAbs;
    if (defaultMarginLeftAbs > aAnchorCoordinate.x) {
      marginLeftAbs = aAnchorCoordinate.x;
    } else if (howMuchOfPopupIsOut < 0) {
      marginLeftAbs = defaultMarginLeftAbs - howMuchOfPopupIsOut;
    }

    return -marginLeftAbs;
  }

  /**
   * @param {boolean} aShow
   * @param {boolean} aAlignmentIsHorizontal
   * @param {boolean} aTopOrRight
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   */
  showForGridCase(aShow, aAlignmentIsHorizontal, aTopOrRight,
                  aAnchorCoordinate = new goog.math.Coordinate(0, 0)) {
    const anchorElement = this.getMarkerElement(aAnchorCoordinate);
    this.getDomHelper().getDocument().body.appendChild(anchorElement);

    this.setVisible(aShow);

    if (aAlignmentIsHorizontal) {
      this.setPinnedCorner(goog.positioning.Corner.BOTTOM_LEFT);
    } else {
      this.setPinnedCorner(goog.positioning.Corner.TOP_LEFT);
    }

    const {
        top: topOfPopup,
        right: rightOfPopup,
        bottom: bottomOfPopup,
        left: leftOfPopup
    } = this.getElement().getBoundingClientRect();
    const heightOfPopup = bottomOfPopup - topOfPopup;
    const widthOfPopup = rightOfPopup - leftOfPopup;

    if (aAlignmentIsHorizontal) {
      this.setMargin(new goog.math.Box(20, 0, 20,
          this.getMarginLeft(aAnchorCoordinate)));
      this.setPosition(new goog.positioning.AnchoredViewportPosition(
          anchorElement, aTopOrRight ?
              goog.positioning.Corner.TOP_LEFT:
              goog.positioning.Corner.BOTTOM_LEFT ));
      this.positionArrow(aTopOrRight ?
              rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.BOTTOM :
              rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.TOP,
          anchorElement);
    } else {
      this.setMargin(new goog.math.Box(this.getMarginTop(aAnchorCoordinate), 20,
          0, 20));
      this.setPosition(new goog.positioning.AnchoredViewportPosition(
          anchorElement, aTopOrRight ?
              goog.positioning.Corner.TOP_LEFT :
              goog.positioning.Corner.TOP_RIGHT));
      this.positionArrow(aTopOrRight ?
              rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.LEFT :
              rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.RIGHT,
          anchorElement);
    }

    goog.dom.removeNode(anchorElement);
  }

  /**
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   * @return {Element}
   */
  getMarkerElement(aAnchorCoordinate){
    return this.getDomHelper().createDom('div', {
      style: `position:absolute;width:1px;height:1px;opacity:0;z-index:-1;top:${
          aAnchorCoordinate.y}px;left:${aAnchorCoordinate.x}px`
    });
  }

  /**
   * @return {boolean}
   */
  moreSpaceToTheRight() {
    return false;
  }

  /**
   * @override
   */
  enterDocument() {
    GridEventDialog.superClass_.enterDocument.call(this);
    this.mmBehavior_.enterDocument();

    this.getHandler().
        listen(this, rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE,
        this.onPageChange_).
        listen(this.screenManager.getChildAt(1),
        rflect.cal.ui.EventPaneShort.EventTypes.SAVE,
        this.onSaveEvent_).
        listen(this.screenManager.getChildAt(1),
        rflect.cal.ui.EventPaneShort.EventTypes.DELETE,
        this.onDeleteEvent_);
  }

  /**
   * @param {goog.events.Event} aEvent
   */
  onSaveEvent_(aEvent) {
    this.setVisible(false);
  }

  /**
   * @param {goog.events.Event} aEvent
   */
  onDeleteEvent_(aEvent) {
    this.setVisible(false);
  }

  /**@override*/
  setVisible(aVisible) {
    GridEventDialog.superClass_.setVisible.call(this, aVisible);

    if (!aVisible) {
      this.expand(false)
    }
  }

  /**
   * @param {rflect.cal.ui.ScreenManager.PageChangeEvent} aEvent
   */
  onPageChange_(aEvent) {
    if (aEvent.currentScreen == this.screenManager.getChildAt(1)) {
      this.expand(true);

      this.showForGridCase(true,
          false,
          this.moreSpaceToTheRight(),
          this.lastUsedAnchorCoordinate);
    } else {
      this.expand(false);

      this.showForGridCase(true,
          true,
          this.moreSpaceToTheRight(),
          this.lastUsedAnchorCoordinate);
    }

    aEvent.currentScreen.resetMomentumScroller();
  }

  expand(aExpand) {
    if (aExpand) {
      goog.dom.classes.remove(this.getElement(), 'event-dialog-grid');
      goog.dom.classes.add(this.getElement(), 'event-dialog-grid-expanded');
    } else {
      goog.dom.classes.add(this.getElement(), 'event-dialog-grid');
      goog.dom.classes.remove(this.getElement(), 'event-dialog-grid-expanded');
    }
  }

  /**
   * @override
   */
  renderBackground_() {
    if (rflect.TOUCH_INTERFACE_ENABLED) {
      GridEventDialog.superClass_.renderBackground_.call(this);
    }
  }

  /**
   * @override
   */
  disposeInternal() {
    this.mmBehavior_.dispose();
    GridEventDialog.superClass_.disposeInternal.call(this);
  }
}


/**
 * @typedef {GridEventDialog}
 */
rflect.cal.ui.GridEventDialog = GridEventDialog;