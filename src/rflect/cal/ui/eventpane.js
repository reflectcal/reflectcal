/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Event edit pane, where new event is created or existing is
 * edited.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EventPane');

goog.require('goog.ui.Checkbox');
goog.require('goog.ui.Component');
goog.require('goog.ui.Button');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.ui.Dialog.DefaultButtonCaptions');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');


/**
 * Event pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.cal.EventPane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aBlockManager) {
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
goog.inherits(rflect.cal.EventPane, goog.ui.Component);


/**
 * @override
 */
rflect.cal.EventPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  /**@const*/
  var labelClassName = goog.getCssName('goog-inline-block') + ' ' +
      goog.getCssName('event-edit-pane-label');

  var headerCont = dom.createDom('div',
      goog.getCssName('event-edit-pane-header-cont'),
      dom.createDom('h3', goog.getCssName('event-edit-pane-header'),
      'Event edit'));

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
    className: labelClassName,
    'Name'
  });
  var inputName = dom.createDom('input', {
    'type': 'text',
    id: 'ep-event-name-input',
    className: 'ep-event-name-input'
  });
  var inputNameCont = dom.createDom('div',
    [goog.getCssName('event-name-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelName, inputName);

  var labelStartDate = dom.createDom('label', {
    'for': 'event-start-date',
    className: labelClassName,
    'StartDate'
  });
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
    className: labelClassName,
    'EndDate'
  });
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

  var dateInputCont = dom.createDom('div',
    [goog.getCssName('date-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    startInputCont, endInputCont);

  var labelAllDay = dom.createDom('label', {
    'for': 'event-all-day',
    className: labelClassName,
    'All-day event'
  });
  var allDayCont = dom.createDom('div', {
    id: 'all-day-label'
    className: goog.getCssName('description-cont') + ' ' +
      goog.getCssName('event-edit-pane-cont')
    }, labelAllDay, this.checkboxAllDay_.getElement());

  var labelDesc = dom.createDom('label', {
    'for': 'event-description',
    className: labelClassName + ' ' +
      goog.getCssName('event-description-label'),
    'Description'
  });
  var textAreaDesc = dom.createDom('textarea', {
    id: 'event-description',
      className: goog.getCssName('event-description')
  });
  var descCont = dom.createDom('div', [
    goog.getCssName('description-cont'),
      goog.getCssName('event-edit-pane-cont')]
    labelDesc, textAreaDesc);

  dom.createDom('div', {
    className: goog.getCssName('event-edit-pane'),
    id: 'event-edit-pane'
    }, headerCont, buttonsCont1, dateInputCont, allDayCont, descCont,
      buttonsCont2);

}


/**
 * @override
 */
rflect.cal.EventPane.prototype.enterDocument = function() {
  rflect.cal.EventPane.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onClick_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEDOWN,
      this.onMouseDown_, false, this)
      .listen(this.getElement(), goog.events.EventType.SELECTSTART,
      this.onSelectStart_, false, this)
      .listen(document, goog.events.EventType.MOUSEMOVE,
      this.onMouseMove_, false, this)
      .listen(document, goog.events.EventType.MOUSEUP,
      this.onMouseUp_, false, this)
      .listen(this.saveDialog_, rflect.cal.ui.SaveDialog.EVENT_EDIT,
      this.onEventEdit_, false, this)
      .listen(this.saveDialog_, rflect.ui.Dialog.EventType.SELECT,
      this.onSaveDialogButtonSelect_, false, this)
      .listen(this.editDialog_, rflect.cal.ui.SaveDialog.EVENT_EDIT,
      this.onEventEdit_, false, this)
      .listen(this.editDialog_, rflect.ui.Dialog.EventType.SELECT,
      this.onEditDialogButtonSelect_, false, this);

  this.timeMarker_.start();
};


/**
 * Disposes of the Main Pane.
 * @override
 * @protected
 */
rflect.cal.EventPane.prototype.disposeInternal = function() {
  rflect.cal.EventPane.superClass_.disposeInternal.call(this);

  this.removeScrollListeners_();

  this.viewManager_ = null;
  this.timeManager_ = null;
  this.containerSizeMonitor_ = null;
};
