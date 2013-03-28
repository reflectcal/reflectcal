/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event edit pane, where new event is created or existing is
 * edited.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EventPane');
goog.provide('rflect.cal.ui.EventPane.EventTypes');

goog.require('goog.events.Event');
goog.require('goog.style');
goog.require('goog.ui.Checkbox');
goog.require('goog.ui.Component');
goog.require('goog.ui.Button');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.ui.Dialog.DefaultButtonCaptions');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');


/**
 * Event pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.cal.ui.EventPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement) {
  goog.ui.Component.call(this);

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

  this.parentEl_ = aParentElement;

  this.addChild(this.buttonCancel1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonDelete_ = new goog.ui.Button(
      rflect.cal.ui.EditDialog.ButtonCaptions.DELETE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.checkboxAllDay_ = new goog.ui.Checkbox());
  this.addChild(this.buttonCancel2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));

};
goog.inherits(rflect.cal.ui.EventPane, goog.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.EventPane.EventTypes = {
  CANCEL: 'cancel',
  SAVE: 'save',
  DELETE: 'delete'
};


/**
 * Whether the component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPane.prototype.visible_ = false;


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.parentEl_;


/**
 * @return {boolean} Whether the component is visible.
 */
rflect.cal.ui.EventPane.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  /**@const*/
  var labelClassName = goog.getCssName('goog-inline-block') + ' ' +
      goog.getCssName('event-edit-pane-label');

  /*var headerCont = dom.createDom('div',
      goog.getCssName('event-edit-pane-header-cont'),
      dom.createDom('h3', goog.getCssName('event-edit-pane-header'),
      'Event edit'));*/

  this.forEachChild(function(child){
    child.createDom();
    if (child instanceof goog.ui.Button)
      goog.dom.classes.add(child.getElement(),
          goog.getCssName('event-edit-pane-button'));
  });

  goog.dom.classes.add(this.buttonSave1_.getElement(),
      goog.getCssName('emphasis-button'));
  goog.dom.classes.add(this.buttonSave2_.getElement(),
      goog.getCssName('emphasis-button'));
  goog.dom.classes.add(this.buttonDelete_.getElement(),
      goog.getCssName('event-edit-pane-button-delete'));

  var buttonsCont1 = dom.createDom('div',
      goog.getCssName('event-edit-pane-buttons'),
      this.buttonCancel1_.getElement(),
      this.buttonSave1_.getElement(),
      this.buttonDelete_.getElement());
  var buttonsCont2 = dom.createDom('div',
      goog.getCssName('event-edit-pane-buttons'),
      this.buttonCancel2_.getElement(),
      this.buttonSave2_.getElement());

  var labelName = dom.createDom('label', {
    'for': 'ep-event-name-input',
    className: labelClassName
  }, 'Name');
  var inputName = dom.createDom('input', {
    'type': 'text',
    id: 'ep-event-name-input',
    className: 'ep-event-name-input'
  });
  var nameCont = dom.createDom('div',
    [goog.getCssName('event-name-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelName, inputName);

  var labelStartDate = dom.createDom('label', {
    'for': 'event-start-date',
    className: labelClassName
  }, 'Start date');
  var inputStartDate = dom.createDom('input', {
    'type': 'text',
    id: 'event-start-date',
    className: goog.getCssName('event-date-input')
  });
  var inputStartTime = dom.createDom('input', {
    'type': 'text',
    id: 'event-start-time',
    className: goog.getCssName('event-time-input')
  });
  var startInputCont = dom.createDom('div',
    [goog.getCssName('start-input-cont'),
      goog.getCssName('event-edit-pane-cont-inner')],
    labelStartDate, inputStartDate, inputStartTime);
  var labelEndDate = dom.createDom('label', {
    'for': 'event-end-date',
    className: labelClassName
  }, 'End date');
  var inputEndDate = dom.createDom('input', {
    'type': 'text',
    id: 'event-end-date',
    className: goog.getCssName('event-date-input')
  });
  var inputEndTime = dom.createDom('input', {
    'type': 'text',
    id: 'event-end-time',
    className: goog.getCssName('event-time-input')
  });
  var endInputCont = dom.createDom('div',
    [goog.getCssName('end-input-cont'),
      goog.getCssName('event-edit-pane-cont-inner')],
    labelEndDate, inputEndDate, inputEndTime);

  var dateCont = dom.createDom('div',
    [goog.getCssName('date-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    startInputCont, endInputCont);

  var labelAllDay = dom.createDom('label', {
    'for': 'event-all-day',
    className: labelClassName
  }, 'All-day event');
  var allDayCont = dom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('description-cont') + ' ' +
      goog.getCssName('event-edit-pane-cont')
    }, labelAllDay, this.checkboxAllDay_.getElement());

  var labelDesc = dom.createDom('label', {
    'for': 'event-description',
    className: labelClassName + ' ' +
      goog.getCssName('event-description-label')
  }, 'Description');
  var textAreaDesc = dom.createDom('textarea', {
    id: 'event-description',
      className: goog.getCssName('event-description')
  });
  var descCont = dom.createDom('div', [
    goog.getCssName('description-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelDesc, textAreaDesc);

  var root = dom.createDom('div', {
    className: goog.getCssName('event-edit-pane'),
    id: 'event-edit-pane'
    }, buttonsCont1, nameCont, dateCont, allDayCont, descCont,
      buttonsCont2);

  this.setElementInternal(root);
}


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.enterDocument = function() {
  rflect.cal.ui.EventPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonCancel1_, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonCancel2_, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this);
};


/**
 * Cancel action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPane.prototype.onCancel_ = function(aEvent) {
  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.EventPane.EventTypes.CANCEL))) {
    this.setVisible(false);
  }
}


/**
 * Sets the visibility of the event pane and moves focus to the
 * event name input. Lazily renders the component if needed.
 * @param {boolean} visible Whether the pane should be visible.
 */
rflect.cal.ui.EventPane.prototype.setVisible = function(visible) {
  if (visible == this.visible_) {
    return;
  }

  // If the pane hasn't been rendered yet, render it now.
  if (!this.isInDocument()) {
    this.render(this.parentEl_);
  }
  this.showElement_(visible);
  this.visible_ = visible;
};


/**
 * Shows or hides the pane element.
 * @param {boolean} visible Shows the element if true, hides if false.
 * @private
 */
rflect.cal.ui.EventPane.prototype.showElement_ = function(visible) {
  goog.style.showElement(this.getElement(), visible);
};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.ui.EventPane.prototype.disposeInternal = function() {
  rflect.cal.ui.EventPane.superClass_.disposeInternal.call(this);

};
