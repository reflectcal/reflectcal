/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview External pane - prototype of all panes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.ExternalPane');
goog.provide('rflect.cal.ui.ExternalPane.EventTypes');

goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.require('rflect.cal.i18n.SettingsSymbols');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.Transport');
goog.require('rflect.cal.Transport.EventTypes');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');
goog.require('rflect.cal.ui.PaneShowBehavior');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.dom');
goog.require('rflect.string');
goog.require('rflect.ui.Checkbox');
goog.require('rflect.ui.Dialog.DefaultButtonCaptions');


/**
 * Settings pane main class.
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
   */
  this.showBehavior = new rflect.cal.ui.PaneShowBehavior(this,
      this.getDomHelper().getElement('main-container'));
};
goog.inherits(rflect.cal.ui.ExternalPane, goog.ui.Component);


/**
 * @type {Object.<string, Element>} Map of sub pane config -> sub pane element.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.subPanes_;


/**
 * @override
 */
rflect.cal.ui.ExternalPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  /**@const*/
  var labelClassName = goog.getCssName('goog-inline-block') + ' ' +
      goog.getCssName('event-edit-pane-label');

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

  this.settingsPaneButtonsUpper_ = dom.createDom('div', 'control-pane');
  this.settingsBody = this.createSettingsBody_(dom);
  this.settingsPaneButtonsLower_ = dom.createDom('div', 'control-pane');

  rflect.cal.ui.common.setBackButtonContent(this.buttonBack1);
  this.getPaneUpperLeft().appendChild(this.buttonBack1.getElement());
  this.getPaneUpperLeft().appendChild(this.buttonSave1.getElement());

  rflect.cal.ui.common.setBackButtonContent(this.buttonBack2);
  this.getPaneLowerLeft().appendChild(this.buttonBack2.getElement());
  this.getPaneLowerLeft().appendChild(this.buttonSave2.getElement());

  var root = dom.createDom('div', {
    className: goog.getCssName('settings-pane') + (rflect.MOBILE ?
        ' slide-pane-left' : ''),
    id: 'settings-pane'
  }, settingsPaneButtonsUpper, settingsBody, settingsPaneButtonsLower);

  this.setElementInternal(root);
}




/**
 * @param {boolean} aUpper Whether pane is upper one.
 * @param {number} aLeftRight 0,1,2 - left, center, right.
 * @return {Element} Sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getSubPane = function(aUpper, aLeftRight) {
  var key = aUpper + aLeftRight;

  if (!this.subPanes_[key]) {
    var className = aLeftRight == 0 ? 'pane-left' : (aLeftRight == 1 ?
        'pane-center' : 'pane-right');

    this.subPanes_[key] = this.getDomHelper().createDom('div', className);

    //Auto-attach sub pane to upper or lower controls.
    if (aUpper)
      this.settingsPaneButtonsUpper_ &&
          this.settingsPaneButtonsUpper_.appendChild(this.subPanes_[key]);
    else
      this.settingsPaneButtonsLower_ &&
          this.settingsPaneButtonsLower_.appendChild(this.subPanes_[key]);

  }

  return this.subPanes_[key];
}


/**
 * @return {Element} Upper left sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getPaneUpperLeft =
    function() {
  return this.getSubPane(true, 0);
}


/**
 * @return {Element} Upper center sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getPaneUpperCenter =
    function() {
  return this.getSubPane(true, 1);
}


/**
 * @return {Element} Upper right sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getPaneUpperRight =
    function() {
  return this.getSubPane(true, 2);
}


/**
 * @return {Element} Lower left sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getPaneLowerLeft =
    function() {
  return this.getSubPane(false, 0);
}


/**
 * @return {Element} Lower center sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getPaneLowerCenter =
    function() {
  return this.getSubPane(false, 1);
}


/**
 * @return {Element} Lower right sub pane.
 */
rflect.cal.ui.ExternalPane.prototype.getPaneLowerRight =
    function() {
  return this.getSubPane(false, 2);
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Upper button container.
 */
rflect.cal.ui.ExternalPane.prototype.createSettingsPaneButtonsUpper_ =
    function(aDom) {

  var paneLeft1 = aDom.getPaneUpperLeft();

  rflect.cal.ui.common.setBackButtonContent(this.buttonBack_);

  this.getPaneUpperLeft().appendChild(this.buttonBack1.getElement());
  this.getPaneUpperLeft().appendChild(this.buttonSave1.getElement());

  return aDom.createDom('div', 'control-pane', paneRight1,
      paneLeft1);

  return aDom.createDom('div',
      [goog.getCssName('settings-pane-buttons'),
      goog.getCssName('settings-pane-buttons-upper'),
      goog.getCssName('goog-inline-block')],
      this.buttonSaveSettings1_.getElement(),
      this.buttonSaveCalendar1_.getElement(),
      this.buttonCancel1_.getElement()
      );
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Lower button container.
 */
rflect.cal.ui.ExternalPane.prototype.createSettingsPaneButtonsLower_ =
    function(aDom) {

  if (rflect.MOBILE) {
    var paneRight2 = aDom.createDom('div', 'pane-right');

    paneRight2.appendChild(this.buttonSaveSettings2_.getElement());
    paneRight2.appendChild(this.buttonSaveCalendar2_.getElement());
    paneRight2.appendChild(this.buttonCancel2_.getElement());

    return aDom.createDom('div', 'control-pane', paneRight2);
  }

  return aDom.createDom('div',
      [goog.getCssName('settings-pane-buttons'),
      goog.getCssName('settings-pane-buttons-lower')],
      this.buttonSaveSettings2_.getElement(),
      this.buttonSaveCalendar2_.getElement(),
      this.buttonCancel2_.getElement()
      );
}


/**
 * Must be overridden.
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Settings body.
 */
rflect.cal.ui.ExternalPane.prototype.createSettingsBody =
    function(aDom) {
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


