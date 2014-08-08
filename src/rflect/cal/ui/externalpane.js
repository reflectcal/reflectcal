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
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.PaneShowBehavior');



/**
 * External pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.cal.ui.ExternalPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  goog.ui.Component.call(this);

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
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @protected
   */
  this.transport = aTransport;

  /**
   * Parent element.
   * @type {Element}
   * @protected
   */
  this.parentEl = aParentElement;

  this.addChild(this.buttonBack1 = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave1 = new goog.ui.Button(
      rflect.cal.i18n.Symbols.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonBack2 = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave2 = new goog.ui.Button(
      rflect.cal.i18n.Symbols.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));


  this.subPanes_ = {};

  /**
   * Pane show behavior.
   * @type {rflect.cal.ui.PaneShowBehavior}
   * @protected
   */
  this.showBehavior = new rflect.cal.ui.PaneShowBehavior(this,
      this.getDomHelper().getElement('main-container'));
  this.showBehavior.setSlidingIsEnabled(rflect.TOUCH_INTERFACE_ENABLED);
};
goog.inherits(rflect.cal.ui.ExternalPane, goog.ui.Component);


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
rflect.cal.ui.ExternalPane.prototype.buttonSave1;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonSave2;


/**
 * @type {Object.<string, Element>} Map of sub pane config -> sub pane element.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.subPanes_;


/**
 * @type {Element} Body part of pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.settingsBody;


/**
 * @return {rflect.cal.ui.PaneShowBehavior} Show behavior.
 */
rflect.cal.ui.ExternalPane.prototype.getShowBehavior = function() {
  return this.showBehavior;
}


/**
 * @override
 */
rflect.cal.ui.ExternalPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  //Buttons.
  this.forEachChild(function(child){
    child.createDom();
  });

  goog.array.forEach([this.buttonBack1, this.buttonBack2, this.buttonSave1,
      this.buttonSave2],
      function(button){
    goog.dom.classes.add(button.getElement(),
        goog.getCssName('cal-menu-button'));
  });

  goog.array.forEach([this.buttonSave1, this.buttonSave2],
      function(button){
    goog.dom.classes.add(button.getElement(),
        goog.getCssName('emphasis-button'));
  });

  this.createSettingsPaneButtonsUpper_(dom);
  this.createSettingsPaneButtonsLower_(dom);
  var settingsBodyOuter = dom.createDom('div', 'settings-body-outer');
  this.settingsBody = this.createBody(dom);
  settingsBodyOuter.appendChild(this.settingsBody);

  var root = dom.createDom('div', {
    className: goog.getCssName('settings-pane') + (rflect.MOBILE ?
        ' slide-pane-left' : '')
  }, this.getControlPane_(true), settingsBodyOuter, this.getControlPane_(false));

  this.setElementInternal(root);
}


/**
 * @param {boolean} aUpper Whether pane is upper one.
 * @return {Element} Upper or lower control pane.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.getControlPane_ = function(aUpper) {
  var index = String(aUpper);
  if (!this.subPanes_[index]) {
    this.subPanes_[index] = this.getDomHelper().createDom('div',
        'control-pane-external');
  }

  return this.subPanes_[index];
}


/**
 * @param {boolean} aUpper Whether pane is upper one.
 * @param {number} aLeftRight 0,1,2 - left, center, right.
 * @return {Element} Sub pane.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.getSubPane_ = function(aUpper, aLeftRight) {
  var key = String(aUpper) + aLeftRight;

  if (!this.subPanes_[key]) {
    var controlPane = this.getControlPane_(aUpper);
    var className = aLeftRight == 0 ? 'pane-left' : (aLeftRight == 1 ?
        'pane-center' : 'pane-right');
    var subPane = this.subPanes_[key] =
        this.getDomHelper().createDom('div', className);

    //Auto-attach sub pane to upper or lower controls.
    // We should add sub-panes in this order, due to float:
    // 1. left.
    // 2. right.
    // 3. middle.

    var firstChild = controlPane.firstChild;
    switch (aLeftRight) {

      // Left.
      case 0:{
        if (firstChild) {
          goog.dom.insertSiblingBefore(subPane, firstChild);
        } else {
          controlPane.appendChild(subPane);
        }
      };break;
      // Right.
      case 2:{
        var lastChild = controlPane.lastChild;
        if (firstChild && lastChild)
          goog.dom.insertSiblingBefore(subPane, lastChild);
        else if (firstChild && firstChild.className == 'pane-center') {
          goog.dom.insertSiblingBefore(subPane, firstChild);
        } else
          controlPane.appendChild(subPane);
      };break;
      // Middle.
      case 1:{
        controlPane.appendChild(
          subPane);
      };break;
      default:break;

    }
  }

  return this.subPanes_[key];
}


/**
 * @return {Element} Upper left sub pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getPaneUpperLeft = function() {
  return this.getSubPane_(true, 0);
}


/**
 * @return {Element} Upper center sub pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getPaneUpperCenter = function() {
  return this.getSubPane_(true, 1);
}


/**
 * @return {Element} Upper right sub pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getPaneUpperRight = function() {
  return this.getSubPane_(true, 2);
}


/**
 * @return {Element} Lower left sub pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getPaneLowerLeft = function() {
  return this.getSubPane_(false, 0);
}


/**
 * @return {Element} Lower center sub pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getPaneLowerCenter = function() {
  return this.getSubPane_(false, 1);
}


/**
 * @return {Element} Lower right sub pane.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getPaneLowerRight = function() {
  return this.getSubPane_(false, 2);
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.createSettingsPaneButtonsUpper_ =
    function(aDom) {
  rflect.cal.ui.common.setBackButtonContent(this.buttonBack1);
  this.getPaneUpperLeft().appendChild(this.buttonBack1.getElement());
  this.getPaneUpperRight().appendChild(this.buttonSave1.getElement());
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.createSettingsPaneButtonsLower_ =
    function(aDom) {
  rflect.cal.ui.common.setBackButtonContent(this.buttonBack2);
  this.getPaneLowerLeft().appendChild(this.buttonBack2.getElement());
  this.getPaneLowerRight().appendChild(this.buttonSave2.getElement());
}


/**
 * Must be overridden.
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Settings body.
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.createBody =
    function(aDom) {
  goog.abstractMethod();
  return null;
}


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.disposeInternal = function() {
  this.subPanes_ = null;
  this.showBehavior.dispose();

  rflect.cal.ui.ExternalPane.superClass_.disposeInternal.call(this);
};


