/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event edit pane, where new event is created or existing is
 * edited.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EventPaneSimple');
goog.provide('rflect.cal.ui.EventPaneSimple.EventTypes');

goog.require('goog.dom.classes');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.style');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.ac');
goog.require('rflect.cal.ui.CalendarsSelect');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.ExternalPane');
goog.require('rflect.cal.ui.InputDatePicker');
goog.require('rflect.cal.ui.ScreenManager.PageRequestEvent');
goog.require('rflect.cal.ui.soy.eventpaneshort');
goog.require('rflect.cal.ui.ScreenManager.EventTypes');
goog.require('rflect.date.util');
goog.require('rflect.dom');
goog.require('rflect.ui.Checkbox');



/**
 * Event pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @constructor
 * @extends {rflect.cal.ui.ExternalPane}
 */
rflect.cal.ui.EventPaneSimple = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aTransport, aNavigator) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager,
      aEventManager, aContainerSizeMonitor, aTransport);

  /**
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  if (!this.navigator_.isNativeTimeInput()){
    this.inputDatePicker_ = new rflect.cal.ui.InputDatePicker(this.viewManager,
        rflect.cal.ui.EventPaneSimple.getDateFormatString());
  }

  this.addChild(this.calendarsSelect_ = new rflect.cal.ui.CalendarsSelect(
      this.eventManager));
  this.addChild(this.buttonDetails_ = new goog.ui.Button(null,
      goog.ui.ButtonRenderer.getInstance()));

  //Enabling touch-only interface.
  this.enableTouchInterface(rflect.TOUCH_INTERFACE_ENABLED, true);
  this.enableMouseInterface(!rflect.TOUCH_INTERFACE_ENABLED, true);

};
goog.inherits(rflect.cal.ui.EventPaneSimple, rflect.cal.ui.ExternalPane);


/**
 * @enum {string}
 */
rflect.cal.ui.EventPaneSimple.EventTypes = {
  CANCEL: 'cancel',
  SAVE: 'save',
  DELETE: 'delete'
};


/**
 * Time format for native inputs.
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPaneSimple.NATIVE_TIME_INPUT_FORMAT = 'HH:mm';


/**
 * Date format for native inputs.
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPaneSimple.NATIVE_DATE_INPUT_FORMAT = 'yyyy-MM-dd';


/**
 * Datetime format for native inputs.
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPaneSimple.NATIVE_DATETIME_INPUT_FORMAT =
    rflect.cal.ui.EventPaneSimple.NATIVE_DATE_INPUT_FORMAT + 'T' +
    rflect.cal.ui.EventPaneSimple.NATIVE_TIME_INPUT_FORMAT;
    
    
/**
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPaneSimple.LABEL_CLASS_NAME = 'label-fluid event-pane-label';


/**
 * Displays dates in form.
 * @return {string} Date format with 4 digit year.
 */
rflect.cal.ui.EventPaneSimple.getDateFormatString = function() {
  return goog.i18n.DateTimeSymbols.DATEFORMATS[3].replace(/y+/, 'yyyy');
}


/**
 * Marks input as invalid or removes that mark.
 * @param {boolean} aValid Whether input is valid.
 * @param {Element} aInputEl Input element.
 */
rflect.cal.ui.EventPaneSimple.markInput = function(aValid, aInputEl) {
  if (!aValid)
    goog.dom.classes.add(aInputEl, goog.getCssName('input-invalid'));
  else
    goog.dom.classes.remove(aInputEl, goog.getCssName('input-invalid'));
}


/**
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.checkboxAllDay_;


/**
 * @type {rflect.cal.ui.InputDatePicker}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputDatePicker_;


/**
 * Whether the component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.visible_ = false;


/**
 * Whether event pane is in state when we're creating new event.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.newEventMode_ = false;


/**
 * Whether we're creating event by touch hold gesture.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.touchHoldMode_ = false;


/**
 * Start time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.startTimeAC_;


/**
 * End time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.endTimeAC_;


/**
 * Input date for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputStartDate_;


/**
 * Input date for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputEndDate_;


/**
 * Input time for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputStartTime_;


/**
 * Input time for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputEndTime_;


/**
 * Input datetime for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputStartDateTime_;


/**
 * Input datetime for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.inputEndDateTime_;


/**
 * Label for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelStart_;


/**
 * Label for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelEnd_;


/**
 * Label for start date.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelStartDate_;


/**
 * Label for start time.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelStartTime_;


/**
 * Label for end date.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelEndDate_;


/**
 * Label for end time.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelEndTime_;


/**
 * Label for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.labelEnd_;


/**
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.calendarsSelect_;


/**
 * @override
 */
rflect.cal.ui.EventPaneSimple.prototype.isButtonDeleteEnabled = function() {
  return true;
};


/**
 * @override
 */
rflect.cal.ui.EventPaneSimple.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.eventpaneshort.eventPaneShort({
    id: this.getId(),
    includeOuterHTML: opt_outerHTML,
    calendarsSelectHTML: this.calendarsSelect_.buildHTML(true),
    controlPaneIsInDialogAndFirstByIndex:
        this.controlPaneIsInDialogAndFirstByIndex()
  });
};


/**
 * @override
 */
rflect.cal.ui.EventPaneSimple.prototype.enterDocument = function() {
  this.buttonDetails_.decorate(this.getDomHelper().getElement(`${this.getId()}button-event-details`));
  this.calendarsSelect_.setElementById(this.calendarsSelect_.getId());

  rflect.cal.ui.EventPaneSimple.superClass_.enterDocument.call(this);

  this.inputName_ = this.getDomHelper().getElement(`${this.getId()}ep-event-name-input`);

  // Menu commands.
  this.getHandler().listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonPrimary1,
      goog.ui.Component.EventType.ACTION, this.onSave_, false, this)

      .listen(this.buttonDetails_,
      goog.ui.Component.EventType.ACTION, this.onDetailsAction_, false,
      this)
      .listen(this.buttonDelete,
      goog.ui.Component.EventType.ACTION, this.onDelete_, false, this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this);

  //Show/hide actions.
  this.getHandler().listen(this.getParent(),
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this)
      .listen(this.getParent(),
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE, this.onPageChange_,
      false, this);
};


/**
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.onDetailsAction_ =
    function(aEvent) {

  this.showEventPane(true);

  aEvent.target.setFocused(false);

  aEvent.preventDefault();
}


/**
 * @param {boolean} aShow Whether to show settings pane.
 */
rflect.cal.ui.EventPaneSimple.prototype.showEventPane = function(aShow) {
  this.dispatchEvent(new rflect.cal.ui.ScreenManager.PageRequestEvent(
      (/**@type {rflect.cal.ui.GridEventDialogScreenManager}*/(
          this.getParent())).getEventPane(), aShow));
}


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.PageChangeEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.onPageChange_ = function(aEvent) {
  if (!rflect.TOUCH_INTERFACE_ENABLED){
    /** @preserveTry */
    try {
      this.inputName_.focus();
      this.inputName_.select();
    } catch(e) {
      // IE8- shows error that it couldn't set focus but nevertheless, sets
      // it.
    }
  }
}


/**
 * @param {boolean=} opt_creatingNewEvent Whether event pane is in new
 * event mode.
 */
rflect.cal.ui.EventPaneSimple.prototype.setNewEventMode = function(
    opt_creatingNewEvent) {
  this.newEventMode_ = opt_creatingNewEvent || false;
}


/**
 * @param {boolean=} opt_touchHoldMode Whether we're creating event by touch
 * hold gesture.
 */
rflect.cal.ui.EventPaneSimple.prototype.setTouchHoldMode = function(
    opt_touchHoldMode) {
  this.touchHoldMode_ = !!opt_touchHoldMode;
}


/**
 * @return {boolean} Whether we're creating event by touch
 * hold gesture.
 */
rflect.cal.ui.EventPaneSimple.prototype.getTouchHoldMode = function() {
  return !!this.touchHoldMode_;
}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.onKeyDown_ = function(aEvent) {

  if (this.isVisible()) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      this.onSave_();

    }
  }
}


rflect.cal.ui.EventPaneSimple.prototype.cancelEventCreation = function () {
  if (this.touchHoldMode_ &&
      //Only fire delete if event pane is first by index.
      this.getParent().indexOfChild(this) === 0) {
    this.eventManager.eventHolder.endWithDelete();
    this.dispatchEvent(rflect.cal.ui.EventPane.EventTypes.DELETE);
  }
};


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.EventPaneSimple.prototype.onCancel_ = function() {
  this.cancelEventCreation();
  this.dispatchEvent(new rflect.cal.ui.ScreenManager.PageRequestEvent(this, false));
}


/**
 * Save action listener.
 */
rflect.cal.ui.EventPaneSimple.prototype.onSave_ = function() {
  if (this.scanValues()) {
    this.eventManager.setLastUsedCalendarId(
        this.eventManager.eventHolder.getCurrentEvent().calendarId);

    this.transport.saveEventAsync(this.eventManager.eventHolder.endWithEdit());
    this.dispatchEvent(rflect.cal.ui.EventPaneSimple.EventTypes.SAVE);
    this.dispatchEvent(new rflect.cal.ui.ScreenManager.PageRequestEvent(this, false));
  }
}


/**
 * Delete action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPaneSimple.prototype.onDelete_ = function(aEvent) {
  this.transport.deleteEventAsync(
      this.eventManager.eventHolder.endWithDelete());

  this.dispatchEvent(rflect.cal.ui.EventPaneSimple.EventTypes.DELETE);
  this.dispatchEvent(new rflect.cal.ui.ScreenManager.PageRequestEvent(this, false));
}


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event 
 * object.
 * @private
 */
rflect.cal.ui.EventPaneSimple.prototype.onBeforePageChange_ = function(aEvent) {
  if (aEvent.currentScreen == this){
    this.displayValues();
    this.resetMomentumScroller();
  }
}


/**
 * Displays event properties in form.
 */
rflect.cal.ui.EventPaneSimple.prototype.displayValues = function() {
  var eh = this.eventManager.eventHolder;

  if (eh.isInProgress()) {
    this.showButtonDelete(!this.newEventMode_);

    this.inputName_.value = eh.getSummary();

    this.calendarsSelect_.update();
    this.calendarsSelect_.setCalendarId(eh.getCalendarId());
  }
};


/**
 * Scans values from form.
 * @return {boolean} Whether input is valid.
 */
rflect.cal.ui.EventPaneSimple.prototype.scanValues = function() {
  var valid = true;

  var eh = this.eventManager.eventHolder;

  eh.setSummary(this.inputName_.value);

  eh.setCalendarId(this.calendarsSelect_.getCalendarId());

  return valid;
};


/**
 * Disposes of the event pane.
 * @override
 * @protected  
 */
rflect.cal.ui.EventPaneSimple.prototype.disposeInternal = function() {
  this.inputName_ = null;

  rflect.cal.ui.EventPaneSimple.superClass_.disposeInternal.call(this);
};