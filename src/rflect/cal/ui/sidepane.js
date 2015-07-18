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
goog.require('rflect.ui.Component');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.PaneShowBehavior');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.cal.ui.ViewButtonUpdater');
goog.require('rflect.cal.ui.soy.sidepane');



/**
 * Side pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.SidePane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aNavigator) {
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

  var isSmallScreen = this.navigator_.isSmallScreen();

  /**
   * Pane show behavior.
   * @type {rflect.cal.ui.PaneShowBehavior}
   */
  this.showBehavior = new rflect.cal.ui.PaneShowBehavior(this,
      this.getDomHelper().getElement('main-container'));
  this.showBehavior.setSlidingIsEnabled(true);
  this.showBehavior.setVisibleWithoutRender(!this.navigator_.isSmallScreen());

  /**
   * Whether glass pane is enabled.
   * @type {boolean}
   * @private
   */
  this.glassPaneIsEnabled_ = isSmallScreen;
  
  /**
   * Whether menu is enabled.
   * @type {boolean}
   * @private
   */
  this.menuIsEnabled_ = isSmallScreen;

  if (isSmallScreen) {

    this.addChild(this.buttonBack_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
    this.addChild(this.buttonDay_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
    this.addChild(this.buttonMonth_ = new goog.ui.ToggleButton(null,
        goog.ui.FlatButtonRenderer.getInstance()));
    this.addChild(this.buttonOptions_ = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));

  } else {

    this.addChild(this.miniCal_ = new rflect.cal.ui.MiniCal(this.viewManager_,
        this.timeManager_));

  }

  this.addChild(this.calSelectorMy_ = new rflect.cal.ui.CalSelector(
      this.viewManager_, this.containerSizeMonitor_, this.eventManager_,
      this.navigator_, rflect.cal.i18n.Symbols.CALENDARS_LABEL_MY, true));
  this.addChild(this.calSelectorOther_ = new rflect.cal.ui.CalSelector(
      this.viewManager_, this.containerSizeMonitor_, this.eventManager_,
      this.navigator_, rflect.cal.i18n.Symbols.CALENDARS_LABEL_OTHER, false));

  if (goog.DEBUG) {
    _inspect('miniCal_', this.miniCal_);
    _inspect('calSelectorMy_', this.calSelectorMy_);
    _inspect('calSelectorOther_', this.calSelectorOther_);
  }

};
goog.inherits(rflect.cal.ui.SidePane, rflect.ui.Component);


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
 * @see rflect.ui.Component#build
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @override
 * @return {string}
 */
rflect.cal.ui.SidePane.prototype.buildHTML = function(opt_outerHTML) {
  var isSmallScreen = this.navigator_.isSmallScreen();

  return rflect.cal.ui.soy.sidepane.sidePane({
    id: this.getId(),
    includeOuterHTML: opt_outerHTML,
    isSmallScreen: isSmallScreen,
    visible: this.showBehavior.isVisible(),
    monthSelectorHTML: !isSmallScreen ? this.miniCal_.buildHTML(true) : '',
    calSelectorMyHTML: this.calSelectorMy_.buildHTML(true),
    calSelectorOtherHTML: this.calSelectorOther_.buildHTML(true)
  })
}


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.cal.ui.SidePane.prototype.enterDocument = function() {
  var isSmallScreen = this.navigator_.isSmallScreen();

  this.calSelectorMy_.setElementById(this.calSelectorMy_.getId());
  this.calSelectorOther_.setElementById(this.calSelectorOther_.getId());

  if (isSmallScreen){
    this.buttonBack_.decorate(this.getDomHelper().getElement(
        rflect.cal.predefined.BUTTON_TO_CALENDAR_ID));
    this.buttonDay_.decorate(this.getDomHelper().getElement(
        rflect.cal.predefined.BUTTON_DAY_ID));
    this.buttonMonth_.decorate(
        this.getDomHelper().getElement(rflect.cal.predefined.BUTTON_MONTH_ID));
    this.buttonOptions_.decorate(
        this.getDomHelper().getElement(
        rflect.cal.predefined.BUTTON_SETTINGS_ID));
  } else {
    this.miniCal_.setElementById(this.miniCal_.getId());
  }

  rflect.cal.ui.SidePane.superClass_.enterDocument.call(this);

  // Update buttons.
  this.viewButtonUpdater_.updateButtons();

  // Attaching event handlers.
  if (isSmallScreen){
    this.getHandler().listen(this.getGlassElement_(),
        goog.events.EventType.CLICK, this.onCancel_, false, this)
        .listen(this.buttonBack_,
        goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
        .listen(this.buttonDay_,
        goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
        .listen(this.buttonMonth_,
        goog.ui.Component.EventType.ACTION, this.onCancel_, false, this);
  }

  if (this.showBehavior.isVisible()) {
    this.showBehavior.assignEvents();
  }

  this.getHandler().listen(this.showBehavior,
      rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK,
      this.onSlideBreak_, false, this);
};


/**
 * Settings click listener.
 */
rflect.cal.ui.SidePane.prototype.onSettingsClick_ = function() {
  this.getParent().showSettingsPane(true);
  this.showBehavior.setVisible(false);
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.SidePane.prototype.onCancel_ = function() {
  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SidePane.EventTypes.CANCEL)))
    this.showBehavior.setVisible(false);
}


/**
 * @return {Element} Glass pane that blocks ui when side pane is shown.
 * @private
 */
rflect.cal.ui.SidePane.prototype.getGlassElement_ = function() {
  return this.glassElement_ || (this.glassElement_ = goog.dom.createDom('div',
      'glass-pane'));
}


/**
 * Slide start/stop listener.
 * @param {rflect.cal.ui.PaneShowBehavior.SlideEvent} aEvent Event
 * object.
 */
rflect.cal.ui.SidePane.prototype.onSlideBreak_ = function(aEvent) {
  if (this.glassPaneIsEnabled_){
    if (aEvent.showing && aEvent.start){
      this.getDomHelper().getElement('screen-manager')
          .appendChild(this.getGlassElement_());
      setTimeout(goog.bind(function(){
        goog.dom.classes.add(this.getGlassElement_(), 'glass-pane-opaque');
      }, this), 0);
    }
    if (!aEvent.showing && aEvent.start){
      goog.dom.classes.remove(this.getGlassElement_(), 'glass-pane-opaque');
    }
    if (!aEvent.showing && !aEvent.start){
      goog.dom.removeNode(this.getGlassElement_());
    }
  }
}


/**
 * Updates top pane by setting new date header.
 * @param {boolean=} opt_deep Whether to update children.
 */
rflect.cal.ui.SidePane.prototype.updateByRedraw = function(opt_deep) {
  // Update buttons.
  this.viewButtonUpdater_.updateButtons();
  if (opt_deep && this.miniCal_) {
    this.miniCal_.updateByRedraw();
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

  rflect.cal.ui.SidePane.superClass_.disposeInternal.call(this);
};
