/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview External pane - prototype of all panes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.ExternalPane');

goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.ui.Button');
goog.require('rflect.ui.BuildableComponent');
goog.require('goog.ui.NativeButtonRenderer');
goog.require('goog.ui.ButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.PaneShowBehavior');



/**
 * External pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {rflect.ui.BuildableComponent}
 */
rflect.cal.ui.ExternalPane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aTransport) {
  rflect.ui.BuildableComponent.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @protected
   */
  this.viewManager = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @protected
   */
  this.timeManager = aTimeManager;

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @protected
   */
  this.eventManager = aEventManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @protected
   */
  this.containerSizeMonitor = aContainerSizeMonitor;

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @protected
   */
  this.transport = aTransport;

  this.addChild(this.buttonBack1 = new goog.ui.Button(null,
      goog.ui.ButtonRenderer.getInstance()));
  this.addChild(this.buttonPrimary1 = new goog.ui.Button(null,
      goog.ui.ButtonRenderer.getInstance()));
  this.addChild(this.buttonBack2 = new goog.ui.Button(null,
      goog.ui.ButtonRenderer.getInstance()));
  this.addChild(this.buttonPrimary2 = new goog.ui.Button(null,
      goog.ui.ButtonRenderer.getInstance()));

  if (this.isButtonDeleteEnabled()) {
    this.addChild(this.buttonDelete = new goog.ui.Button(null,
        goog.ui.ButtonRenderer.getInstance()));
  }

  if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
    this.momentumScroller = new rflect.ui.MomentumScroller();
  }

  //Enabling touch-only interface.
  this.enableTouchInterface(rflect.TOUCH_INTERFACE_ENABLED, true);
  this.enableMouseInterface(!rflect.TOUCH_INTERFACE_ENABLED, true);
};
goog.inherits(rflect.cal.ui.ExternalPane, rflect.ui.BuildableComponent);


/**
 * @return {string}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getBackButtonLabel = function() {
  return rflect.cal.i18n.Symbols.BACK;
};


/**
 * @return {boolean}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.isButtonDeleteEnabled = function() {
  return true;
};


/**
 * @type {rflect.ui.MomentumScroller}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.momentumScroller;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonBack1;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonBack2;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonPrimary1;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonPrimary2;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonDelete;


/**
 * @param {boolean} aShowButtonDelete Whether to show button delete.
 * @param {boolean} aShowButtonNew Whether to show button new.
 * @param {boolean} aShowButtonSave Whether to show button save.
 * @param {boolean} aUpper Whether pane is upper.
 * @return {string} HTML of upper or lower control pane.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.buildControlPane = function(
    aShowButtonDelete, aShowButtonNew, aShowButtonSave, aUpper) {
  return rflect.cal.ui.soy.externalpane.controlPane({
    backButtonLabel: this.getBackButtonLabel(),
    showButtonDelete: this.isButtonDeleteEnabled() && aShowButtonDelete,
    showButtonNew: aShowButtonNew,
    showButtonSave: aShowButtonSave,
    upper: aUpper
  });
}


/**
 * @override
 */
rflect.cal.ui.ExternalPane.prototype.enterDocument = function() {

  var controlPane1 = this.getElement().querySelector(
      '.navbar');

  this.buttonBack1.decorate(controlPane1.querySelector(
      '.left > a'));
  this.buttonPrimary1.decorate(controlPane1.querySelector(
      '.right > button'));
  if (this.isButtonDeleteEnabled()) {
    this.buttonDelete.decorate(this.getElement().querySelector(
        '.button-danger'));
  }

  this.getHandler().listen(this.containerSizeMonitor,
      goog.events.EventType.RESIZE, this.onViewportResize_, false, this);

  rflect.cal.ui.ExternalPane.superClass_.enterDocument.call(this);
}


/**
 * Viewport resize handler.
 * @param {rflect.cal.ContainerSizeMonitor.ResizeEvent} aEvent
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.onViewportResize_ = function(aEvent) {
  this.resetMomentumScroller();
};


/**
 * Removes scroll listeners on each update.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.addMomentumScroller = function() {
  if (!this.momentumScroller) {
    return;
  }

  var element = this.getElement().querySelector('.settings-body');
  var frameElement = this.getElement().querySelector('.settings-body-outer');

  if (element && frameElement) {
    this.momentumScroller.setElements(element, frameElement);
    this.momentumScroller.enable(true);
  }
};


/**
 * Removes scroll listeners on each update.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.removeMomentumScroller = function() {
  if (!this.momentumScroller) {
    return;
  }

  this.momentumScroller.enable(false);
};


/**
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.resetMomentumScroller = function() {
  if (!this.momentumScroller) {
    return;
  }

  this.removeMomentumScroller();
  this.addMomentumScroller();
  this.momentumScroller.animateWithinBounds(0);
};


/**
 * @param {boolean} aShow
 */
rflect.cal.ui.ExternalPane.prototype.showButtonDelete = function(aShow) {
  if (this.isButtonDeleteEnabled()) {
    this.buttonDelete.setVisible(aShow);
    goog.style.showElement(this.buttonDelete.getElement().parentElement.
        parentElement.parentElement, aShow);
  }
}


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.disposeInternal = function() {
  this.momentumScroller && this.momentumScroller.dispose();

  rflect.cal.ui.ExternalPane.superClass_.disposeInternal.call(this);
};


