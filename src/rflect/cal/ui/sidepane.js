/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Side pane, place for generic menu.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.SidePane');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events.EventType');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimePatterns');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Component.State');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('goog.ui.ToggleButton');
goog.require('rflect.ui.UpdatableComponent');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.PaneShowBehavior');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.cal.ui.ViewButtonUpdater');
goog.require('rflect.cal.ui.VMAdaptiveSizeHelper');
goog.require('rflect.cal.ui.soy.sidepane');
goog.require('rflect.string');



/**
 * Side pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @param {rflect.cal.ui.MainBody} aMainBody Link to main body.
 * @constructor
 * @extends {rflect.ui.UpdatableComponent}
 */
rflect.cal.ui.SidePane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aNavigator, aMainBody) {
  rflect.ui.UpdatableComponent.call(this);

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
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  /**
   * View button updater.
   * @type {rflect.cal.ui.ViewButtonUpdater}
   * @private
   */
  this.viewButtonUpdater_ = new rflect.cal.ui.ViewButtonUpdater(this,
      this.viewManager_, this.timeManager_);

  var isSmallScreen = this.containerSizeMonitor_.isSmallScreen();

  /**
   * Pane show behavior.
   * @type {rflect.cal.ui.PaneShowBehavior}
   */
  this.showBehavior = new rflect.cal.ui.PaneShowBehavior(this,
      this.getDomHelper().getElement('main-container'));
  this.showBehavior.setSlidingIsEnabled(isSmallScreen);
  this.showBehavior.setVisibleWithoutRender(!aMainBody.isExpanded());

  this.addChild(this.buttonBack_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonDay_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonMonth_ = new goog.ui.ToggleButton(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonOptions_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.miniCal_ = new rflect.cal.ui.MiniCal(this.viewManager_,
      this.timeManager_));

  this.buttonBack_.setId(rflect.cal.predefined.BUTTON_TO_CALENDAR_ID);
  this.buttonDay_.setId(rflect.cal.predefined.BUTTON_SIDE_PANE_DAY_ID);
  this.buttonMonth_.setId(rflect.cal.predefined.BUTTON_SIDE_PANE_MONTH_ID);
  this.buttonOptions_.setId(rflect.cal.predefined.BUTTON_SIDE_PANE_SETTINGS_ID);

  this.addChild(this.calSelectorMy_ = new rflect.cal.ui.CalSelector(
      this.viewManager_, this.containerSizeMonitor_, this.eventManager_,
      this.navigator_, rflect.cal.i18n.Symbols.CALENDARS_LABEL_MY, true));
  this.addChild(this.calSelectorOther_ = new rflect.cal.ui.CalSelector(
      this.viewManager_, this.containerSizeMonitor_, this.eventManager_,
      this.navigator_, rflect.cal.i18n.Symbols.CALENDARS_LABEL_OTHER, false));

  if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
    this.momentumScroller_ = new rflect.ui.MomentumScroller();
  }

  if (goog.DEBUG) {
    _inspect('miniCal_', this.miniCal_);
    _inspect('calSelectorMy_', this.calSelectorMy_);
    _inspect('calSelectorOther_', this.calSelectorOther_);
  }

};
goog.inherits(rflect.cal.ui.SidePane, rflect.ui.UpdatableComponent);


/**
 * @enum {string}
 */
rflect.cal.ui.SidePane.EventTypes = {
  CANCEL: 'sidePaneCancel',
  SHOW_SETTINGS: 'showSettings'
};


/**
 * @param {string} aElementId Element id.
 * @param {string} aContent HTML content of menu item.
 * @param {rflect.cal.ui.SidePane.EventTypes} aEventType Event type associated
 * with menu item.
 * @constructor
 */
rflect.cal.ui.SidePane.MenuItem = function(aElementId, aContent, aEventType) {

  /**
   * @type {string}
   */
  this.elementId = aElementId;

  /**
   * @type {string}
   */
  this.content = aContent;

  /**
   * @type {rflect.cal.ui.SidePane.EventTypes}
   */
  this.eventType = aEventType;
};


/**
 * Glass pane that blocks ui when side pane is shown.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SidePane.prototype.glassElement_;


/**
 * Week mode menu button.
 * @type {goog.ui.ToggleButton}
 * @private
 */
rflect.cal.ui.SidePane.prototype.buttonWeek_;


/**
 * Week mode menu button.
 * @type {goog.ui.ToggleButton}
 * @private
 */
rflect.cal.ui.SidePane.prototype.buttonNow_;


/**
 * @return {boolean}
 */
rflect.cal.ui.SidePane.prototype.isGlassPaneEnabled = function() {
  return this.containerSizeMonitor_.isSmallScreen();
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.SidePane.prototype.getButtonDay = function(){
  return this.buttonDay_;
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.SidePane.prototype.getButtonWeek = function(){
  return this.buttonWeek_;
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.SidePane.prototype.getButtonMonth = function(){
  return this.buttonMonth_;
};


/**
 * @return {goog.ui.ToggleButton}
 */
rflect.cal.ui.SidePane.prototype.getButtonNow = function(){
  return this.buttonNow_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.SidePane.prototype.getMiniCal = function() {
  return this.miniCal_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.SidePane.prototype.getCalSelector = function() {
  return this.calSelectorMy_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.SidePane.prototype.getTaskSelector = function() {
  return this.calSelectorOther_;
};


/**
 * Builds body of component.
 * @see rflect.ui.UpdatableComponent#build
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @override
 * @return {string}
 */
rflect.cal.ui.SidePane.prototype.buildHTML = function(opt_outerHTML) {
  var isSmallScreen = this.containerSizeMonitor_.isSmallScreen();

  return rflect.cal.ui.soy.sidepane.sidePane({
    id: this.getId(),
    includeOuterHTML: opt_outerHTML,
    isSmallScreen: isSmallScreen,
    visible: !this.getParent().isExpanded(),
    sizeCategory: this.containerSizeMonitor_.getSizeCategory(),
    monthSelectorHTML: !isSmallScreen ? this.miniCal_.buildHTML(true) : '',
    calSelectorMyHTML: this.calSelectorMy_.buildHTML(true),
    calSelectorOtherHTML: this.calSelectorOther_.buildHTML(true),
    visualThemeClassName: rflect.string.getVisualThemeClassName(
        this.viewManager_.user['settings']['visualTheme'])
  })
}


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.cal.ui.SidePane.prototype.enterDocument = function() {
  rflect.cal.ui.SidePane.superClass_.enterDocument.call(this);

  // Update buttons.
  this.viewButtonUpdater_.updateButtons();

  // Attaching event handlers.
  this.getHandler().listen(this.getGlassElement_(),
      goog.events.EventType.CLICK, this.onCancel_, false, this)
      .listen(this.buttonBack_,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonDay_,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonMonth_,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this);

  this.getHandler().
      listen(this.showBehavior,
      rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK,
      this.onSlideBreak_, false, this).
      listen(this.viewManager_,
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this);
};


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event
 * object.
 * @private
 */
rflect.cal.ui.SidePane.prototype.onBeforePageChange_ = function(aEvent) {
  if (aEvent.currentScreen == this.getParent() &&
      !this.containerSizeMonitor_.isSmallScreen()) {
    this.resetMomentumScroller();
  }
}


/**
 * Removes scroll listeners on each update.
 */
rflect.cal.ui.SidePane.prototype.addMomentumScroller = function() {
  if (this.momentumScroller_) {
    var element = this.getElement().querySelector(
        this.containerSizeMonitor_.isSmallScreen() ?
        '.side-pane-external-body' :
        '.side-pane-scrollable-content');

    var frameElement = this.containerSizeMonitor_.isSmallScreen() ?
        this.getElement() : this.getElement().
        querySelector('.side-pane-scrollable');

    if (element && frameElement) {
      this.momentumScroller_.setElements(element, frameElement);
      this.momentumScroller_.enable(true);
    }
  }
};


/**
 * Removes scroll listeners on each update.
 */
rflect.cal.ui.SidePane.prototype.removeMomentumScroller = function() {
  if (!this.momentumScroller_) {
    return;
  }

  this.momentumScroller_.enable(false);
};


/***/
rflect.cal.ui.SidePane.prototype.resetMomentumScroller = function() {
  if (!this.momentumScroller_) {
    return;
  }

  this.removeMomentumScroller();
  this.addMomentumScroller();
  this.momentumScroller_.animateWithinBounds(0);
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.SidePane.prototype.onCancel_ = function() {
    if (this.dispatchEvent(new goog.events.Event(
        rflect.cal.ui.SidePane.EventTypes.CANCEL))) {
      this.showBehavior.setVisible(false);
    }
}


/**
 * @return {Element} Glass pane that blocks ui when side pane is shown.
 * @private
 */
rflect.cal.ui.SidePane.prototype.getGlassElement_ = function() {
  return this.glassElement_ || (this.glassElement_ = goog.dom.createDom('div',
      'glass-pane'));
}


/***/
rflect.cal.ui.SidePane.prototype.addGlassPane = function() {
  this.getDomHelper().getElement('screen-manager')
      .appendChild(this.getGlassElement_());
  if (rflect.cal.i18n.Symbols.isLightTheme(
      this.viewManager_.user['settings']['visualTheme'])) {
    setTimeout(() => {
      goog.dom.classes.add(this.getGlassElement_(), 'glass-pane-opaque');
    }, 0);
  }
}


/**
 */
rflect.cal.ui.SidePane.prototype.removeGlassPane = function() {
  goog.dom.removeNode(this.getGlassElement_());
  if (rflect.cal.i18n.Symbols.isLightTheme(
      this.viewManager_.user['settings']['visualTheme'])) {
    goog.dom.classes.remove(this.getGlassElement_(), 'glass-pane-opaque');
  }
}


/**
 * Slide start/stop listener.
 * @param {rflect.cal.ui.PaneShowBehavior.SlideEvent} aEvent Event
 * object.
 */
rflect.cal.ui.SidePane.prototype.onSlideBreak_ = function(aEvent) {
  if (this.isGlassPaneEnabled()){
    if (aEvent.showing && aEvent.start){
      this.addGlassPane();
    }
    if (aEvent.showing && aEvent.start){
      this.addMomentumScroller();
    }
    if (!aEvent.showing && aEvent.start){
      if (rflect.cal.i18n.Symbols.isLightTheme(
            this.viewManager_.user['settings']['visualTheme'])) {
        goog.dom.classes.remove(this.getGlassElement_(), 'glass-pane-opaque');
      }
      this.removeMomentumScroller();
    }
    if (!aEvent.showing && !aEvent.start){
      goog.dom.removeNode(this.getGlassElement_());
    }
  }
}


/**
 * @param {boolean} aShow Whether to show spacer.
 */
rflect.cal.ui.SidePane.prototype.showSpacer = function(aShow) {
  let spacer = this.getElement().querySelector('.side-pane-spacer');
  let scrollable = this.getElement().querySelector('.side-pane-scrollable');
  if (aShow) {
    goog.style.showElement(spacer, false);
    goog.dom.classes.add(scrollable, 'side-pane-scrollable-no-spacer');
  } else {
    goog.style.showElement(spacer, true);
    goog.dom.classes.remove(scrollable, 'side-pane-scrollable-no-spacer');
  }
}


/**
 * @override
 */
rflect.cal.ui.SidePane.prototype.update = function(opt_options = {
  updateByModeSwitch: false,
  updateByNavigation: false,
  updateCalendarsOnly: false,
  doNotUpdateMiniCal: false
}) {
  let {
    updateByModeSwitch = false,
    updateByNavigation = false,
    updateCalendarsOnly = false,
    doNotUpdateMiniCal = false
  } = opt_options;

  if (updateByNavigation) {

    if (!doNotUpdateMiniCal) { this.getMiniCal().update(); }

  } else if (updateByModeSwitch) {

    if (!doNotUpdateMiniCal) { this.getMiniCal().update(); }
    this.showSpacer(this.viewManager_.isInSingleDayMode());
    this.viewButtonUpdater_.updateButtons();
  } else if (updateCalendarsOnly) {

    this.removeMomentumScroller();
    this.getCalSelector().update();
    this.getTaskSelector().update();
    this.addMomentumScroller();

  } else {

    rflect.cal.ui.SidePane.superClass_.update.call(this, opt_options);

  }
}


/**
 * @override
 */
rflect.cal.ui.SidePane.prototype.updateBeforeRedraw = function({
  updateByNavigation = false
} = {
  updateByNavigation: false
}) {
  if (!updateByNavigation) {
    this.removeMomentumScroller();
  }
};


/**
 * @override
 */
rflect.cal.ui.SidePane.prototype.updateAfterRedraw = function(opt_options) {
  this.showBehavior.setSlidingIsEnabled(
      this.containerSizeMonitor_.isSmallScreen());

  if (this.containerSizeMonitor_.isSmallScreen()) {
    goog.dom.classes.add(this.getElement(), 'side-pane-external');
  } else {
    goog.dom.classes.remove(this.getElement(), 'side-pane-external');
    goog.dom.classes.remove(this.getElement(),
        'side-pane-external-artificial-scroll');
    goog.dom.classes.remove(this.getElement(),
        'side-pane-external-native-scroll');
  }

  if (this.containerSizeMonitor_.isSmallScreen() && !this.getParent().
      isExpanded()) {
    this.addGlassPane();
  }
  if (!this.containerSizeMonitor_.isSmallScreen()) {
    this.removeGlassPane();
  }

  if (!this.getParent().isExpanded()) {
    this.addMomentumScroller();
  }
};


/**
 * Disposes of the component.  Calls {@code exitDocument}, which is expected to
 * remove event handlers and clean up the component.  Propagates the call to
 * the component's children, if any. Removes the component's DOM from the
 * document unless it was decorated.
 * @override
 * @protected
 */
rflect.cal.ui.SidePane.prototype.disposeInternal = function() {
  this.showBehavior.dispose();
  this.glassElement_ = null;
  this.miniCal_ = null;
  this.calSelectorMy_ = null;
  this.calSelectorOther_ = null;
  if (this.momentumScroller_) {
    this.momentumScroller_.dispose();
  }

  rflect.cal.ui.SidePane.superClass_.disposeInternal.call(this);
};
