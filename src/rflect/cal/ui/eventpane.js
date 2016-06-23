/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event edit pane, where new event is created or existing is
 * edited.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EventPane');
goog.provide('rflect.cal.ui.EventPane.EventTypes');

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
goog.require('rflect.cal.ui.PageRequestEvent');
goog.require('rflect.cal.ui.soy.eventpane');
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
rflect.cal.ui.EventPane = function(aViewManager, aTimeManager, aEventManager,
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
        rflect.cal.ui.EventPane.getDateFormatString());
  }

  this.addChild(this.calendarsSelect_ = new rflect.cal.ui.CalendarsSelect(
      this.eventManager));

  //Enabling touch-only interface.
  this.enableTouchInterface(rflect.TOUCH_INTERFACE_ENABLED, true);
  this.enableMouseInterface(!rflect.TOUCH_INTERFACE_ENABLED, true);

};
goog.inherits(rflect.cal.ui.EventPane, rflect.cal.ui.ExternalPane);


/**
 * @enum {string}
 */
rflect.cal.ui.EventPane.EventTypes = {
  CANCEL: 'cancel',
  SAVE: 'save',
  DELETE: 'delete'
};


/**
 * Time format for native inputs.
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPane.NATIVE_TIME_INPUT_FORMAT = 'HH:mm';


/**
 * Date format for native inputs.
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPane.NATIVE_DATE_INPUT_FORMAT = 'yyyy-MM-dd';


/**
 * Datetime format for native inputs.
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPane.NATIVE_DATETIME_INPUT_FORMAT =
    rflect.cal.ui.EventPane.NATIVE_DATE_INPUT_FORMAT + 'T' +
    rflect.cal.ui.EventPane.NATIVE_TIME_INPUT_FORMAT;
    
    
/**
 * @type {string}
 * @const
 */
rflect.cal.ui.EventPane.LABEL_CLASS_NAME = 'label-fluid event-pane-label';


/**
 * Displays dates in form.
 * @return {string} Date format with 4 digit year.
 */
rflect.cal.ui.EventPane.getDateFormatString = function() {
  return goog.i18n.DateTimeSymbols.DATEFORMATS[3].replace(/y+/, 'yyyy');
}


/**
 * Marks input as invalid or removes that mark.
 * @param {boolean} aValid Whether input is valid.
 * @param {Element} aInputEl Input element.
 */
rflect.cal.ui.EventPane.markInput = function(aValid, aInputEl) {
  if (!aValid)
    goog.dom.classes.add(aInputEl, goog.getCssName('input-invalid'));
  else
    goog.dom.classes.remove(aInputEl, goog.getCssName('input-invalid'));
}


/**
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.checkboxAllDay_;


/**
 * @type {rflect.cal.ui.InputDatePicker}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputDatePicker_;


/**
 * Whether the component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPane.prototype.visible_ = false;


/**
 * Whether event pane is in state when we're creating new event.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPane.prototype.newEventMode_ = false;


/**
 * Whether we're creating event by touch hold gesture.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPane.prototype.touchHoldMode_ = false;


/**
 * Start time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.EventPane.prototype.startTimeAC_;


/**
 * End time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.EventPane.prototype.endTimeAC_;


/**
 * Input date for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputStartDate_;


/**
 * Input date for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputEndDate_;


/**
 * Input time for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputStartTime_;


/**
 * Input time for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputEndTime_;


/**
 * Input datetime for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputStartDateTime_;


/**
 * Input datetime for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.inputEndDateTime_;


/**
 * Label for start.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelStart_;


/**
 * Label for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelEnd_;


/**
 * Label for start date.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelStartDate_;


/**
 * Label for start time.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelStartTime_;


/**
 * Label for end date.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelEndDate_;


/**
 * Label for end time.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelEndTime_;


/**
 * Label for end.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.labelEnd_;


/**
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.EventPane.prototype.calendarsSelect_;


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.isButtonDeleteEnabled = function() {
  return true;
};


/**
 * @return {boolean} Whether the component is visible.
 */
rflect.cal.ui.EventPane.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.eventpane.eventPane({
    id: this.getId(),
    includeOuterHTML: opt_outerHTML,
    calendarsSelectHTML: this.calendarsSelect_.buildHTML(true),
    isNativeTimeInput: this.navigator_.isNativeTimeInput()
  });
};


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.enterDocument = function() {
  var isNativeTimeInput = this.navigator_.isNativeTimeInput();
  
  this.calendarsSelect_.setElementById(this.calendarsSelect_.getId());

  rflect.cal.ui.EventPane.superClass_.enterDocument.call(this);

  this.inputName_ = this.getDomHelper().getElement('ep-event-name-input');

  this.checkboxAllDay_ = this.getDomHelper().getElement('event-all-day');

  if (isNativeTimeInput) {
    [this.inputStartDate_, this.inputStartDateTime_, this.inputEndDate_,
        this.inputEndDateTime_] = this.getTimeInputsNative_();

    this.labelStart_ = this.getDomHelper().getElement('label-start');
    this.labelEnd_ = this.getDomHelper().getElement('label-end');

  } else {
    [this.inputStartDate_, this.inputStartTime_, this.inputEndDate_,
        this.inputEndTime_] = this.getTimeInputsCustom_();

    [this.startTimeAC_, this.endTimeAC_] = this.createTimeAutoCompletes_(
        this.inputStartTime_, this.inputEndTime_);

    this.inputDatePicker_.addInput(this.inputStartDate_);
    this.inputDatePicker_.addInput(this.inputEndDate_);

    this.labelStartDate_ = this.getDomHelper().getElement('label-start-date');
    this.labelStartTime_ = this.getDomHelper().getElement('label-start-time');
    this.labelEndDate_ = this.getDomHelper().getElement('label-end-date');
    this.labelEndTime_ = this.getDomHelper().getElement('label-end-time');

  }


  this.textAreaDesc_ = this.getDomHelper().getElement('event-description');

  // Menu commands.
  this.getHandler().listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonPrimary1,
      goog.ui.Component.EventType.ACTION, this.onSave_, false, this)

      .listen(this.buttonDelete,
      goog.ui.Component.EventType.ACTION, this.onDelete_, false, this)
      .listen(this.checkboxAllDay_,
      goog.events.EventType.CHANGE, this.onCheck_, false, this)

      .listen(this.inputStartDate_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputEndDate_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this);

  if (isNativeTimeInput) {
    this.getHandler()
        .listen(this.inputStartDateTime_, goog.events.EventType.FOCUS,
        this.onInputFocus_, false, this)
        .listen(this.inputEndDateTime_, goog.events.EventType.FOCUS,
        this.onInputFocus_, false, this)

  } else {
    this.getHandler()
        .listen(this.inputStartTime_, goog.events.EventType.MOUSEDOWN,
        this.onTimeInputMouseDown_, false, this)
        .listen(this.inputEndTime_, goog.events.EventType.MOUSEDOWN,
        this.onTimeInputMouseDown_, false, this)
        .listen(this.inputStartTime_, goog.events.EventType.FOCUS,
        this.onInputFocus_, false, this)
        .listen(this.inputEndTime_, goog.events.EventType.FOCUS,
        this.onInputFocus_, false, this)
  }

  //Show/hide actions.
  this.getHandler().listen(this.getParent(),
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this)
      .listen(this.viewManager,
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE, this.onPageChange_,
      false, this);
};


/**
 * @return {Array.<Element>}
 * @private
 */
rflect.cal.ui.EventPane.prototype.getTimeInputsNative_ = function() {
  return [this.getDomHelper().getElement('event-start-date'),
      this.getDomHelper().getElement('event-start-datetime'),
      this.getDomHelper().getElement('event-end-date'),
      this.getDomHelper().getElement('event-end-datetime')];
}


/**
 * @return {Array.<Element>}
 * @private
 */
rflect.cal.ui.EventPane.prototype.getTimeInputsCustom_ = function() {
  return [this.getDomHelper().getElement('event-start-date'),
      this.getDomHelper().getElement('event-start-time'),
      this.getDomHelper().getElement('event-end-date'),
      this.getDomHelper().getElement('event-end-time')];
}


/**
 * @param {Element} aInputStartTime Input start time.
 * @param {Element} aInputEndTime Input end time.
 * @return {Array.<rflect.cal.ui.ac.TimeAutoComplete>} Autocompletes.
 * @private
 */
rflect.cal.ui.EventPane.prototype.createTimeAutoCompletes_ = function(
    aInputStartTime, aInputEndTime) {
  var timeLabels = rflect.date.util.getTimeLabels();
  var startTimeAC = rflect.cal.ui.ac.createTimeAutoComplete(
      timeLabels, aInputStartTime, false);

  var endTimeAC = rflect.cal.ui.ac.createTimeAutoComplete(
      timeLabels, aInputEndTime, false);

  //Adding custom class name to renderer.
  startTimeAC.getRenderer().className += ' ' +
      goog.getCssName('ac-renderer-time');
  endTimeAC.getRenderer().className += ' ' +
      goog.getCssName('ac-renderer-time');
      
  return [startTimeAC, endTimeAC];     
}


/**
 * @param {boolean} aAllDay Whether all-day event is shown.
 */
rflect.cal.ui.EventPane.prototype.updateLabels_ = function(aAllDay){
  if (this.navigator_.isNativeTimeInput()) {
    this.labelStart_.htmlFor = aAllDay ? 'event-start-date' :
        'event-start-datetime';
    this.labelEnd_.htmlFor = aAllDay ? 'event-end-date' :
        'event-end-datetime';
  }
}


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.PageChangeEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onPageChange_ = function(aEvent) {
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
rflect.cal.ui.EventPane.prototype.setNewEventMode = function(
    opt_creatingNewEvent) {
  this.newEventMode_ = opt_creatingNewEvent || false;
}


/**
 * @param {boolean=} opt_touchHoldMode Whether we're creating event by touch
 * hold gesture.
 */
rflect.cal.ui.EventPane.prototype.setTouchHoldMode = function(
    opt_touchHoldMode) {
  this.touchHoldMode_ = !!opt_touchHoldMode;
}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onKeyDown_ = function(aEvent) {

  if (this.viewManager.isVisible(this) &&
      !this.startTimeAC_.getRenderer().isVisible() &&
      !this.endTimeAC_.getRenderer().isVisible()) {
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


/**
 * Input focus listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onInputFocus_ = function(aEvent) {
  goog.dom.classes.remove(/**@type {Element}*/(aEvent.target),
      goog.getCssName('input-invalid'));

  if (!this.navigator_.isNativeTimeInput()){
    var target = /**@type{Element}*/(aEvent.target);
    if (target == this.inputStartTime_) {
      this.updateAC_(this.startTimeAC_);
    } else if (target == this.inputEndTime_) {
      this.updateAC_(this.endTimeAC_);
    } else {
      this.startTimeAC_.dismiss();
      this.endTimeAC_.dismiss();
    }
  }
}


/**
 * Time input mousedown listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onTimeInputMouseDown_ = function(aEvent) {
  var target = /**@type{Element}*/(aEvent.target);
  if (target == this.inputStartTime_) {
    this.updateAC_(this.startTimeAC_);
  } else if (target == this.inputEndTime_) {
    this.updateAC_(this.endTimeAC_);
  }
}


/**
 * Updates ac for given input.
 * @param {rflect.cal.ui.ac.TimeAutoComplete} aAC Autocomplete.
 */
rflect.cal.ui.EventPane.prototype.updateAC_ = function(aAC) {
  if (goog.userAgent.IE &&
      goog.string.compareVersions(goog.userAgent.VERSION, '8') <= 0){
    setTimeout(goog.bind(function(){aAC.update(true)}, this), 0);
  } else {
    aAC.update(true);
  }
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.EventPane.prototype.onCancel_ = function() {
  if (this.touchHoldMode_) {
    this.eventManager.eventHolder.endWithDelete();
    this.dispatchEvent(rflect.cal.ui.EventPane.EventTypes.DELETE);
  }
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * Save action listener.
 */
rflect.cal.ui.EventPane.prototype.onSave_ = function() {
  if (goog.DEBUG)
    console.log('onSave_: ');
  if (this.scanValues()) {
    this.eventManager.setLastUsedCalendarId(
        this.eventManager.eventHolder.getCurrentEvent().calendarId);

    this.transport.saveEventAsync(this.eventManager.eventHolder.endWithEdit());
    this.dispatchEvent(rflect.cal.ui.EventPane.EventTypes.SAVE);
    this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
  }
}


/**
 * Delete action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPane.prototype.onDelete_ = function(aEvent) {
  this.transport.deleteEventAsync(
      this.eventManager.eventHolder.endWithDelete());

  this.dispatchEvent(rflect.cal.ui.EventPane.EventTypes.DELETE);
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * Checkbox action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPane.prototype.onCheck_ = function(aEvent) {
  var eh = this.eventManager.eventHolder;
  var checked;
  if (aEvent.target == this.checkboxAllDay_) {
    checked = this.checkboxAllDay_.checked;
    this.showTimeInputs_(!checked);
    eh.setAllDay(checked);

    this.displayDates_();
    this.updateLabels_(checked);
  }
}


/**
 * @param {boolean} aShow Whether to show time inputs.
 * @private
 */
rflect.cal.ui.EventPane.prototype.showTimeInputs_ = function(aShow) {
  if (this.navigator_.isNativeTimeInput()){
    goog.style.showElement(this.inputStartDateTime_, aShow);
    goog.style.showElement(this.inputEndDateTime_, aShow);
    goog.style.showElement(this.inputStartDate_, !aShow);
    goog.style.showElement(this.inputEndDate_, !aShow);
  } else {
    this.removeMomentumScroller();

    goog.style.showElement(this.inputStartTime_.
      parentElement.parentElement.parentElement.parentElement, aShow);
    goog.style.showElement(this.inputEndTime_.
      parentElement.parentElement.parentElement.parentElement, aShow);

    this.addMomentumScroller();
  }
}


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event 
 * object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onBeforePageChange_ = function(aEvent) {
  if (aEvent.currentScreen == this){
    this.displayValues();
    this.resetMomentumScroller();
  }
}


/**
 * Displays event properties in form.
 */
rflect.cal.ui.EventPane.prototype.displayValues = function() {
  var eh = this.eventManager.eventHolder;

  this.showButtonDelete(!this.newEventMode_);

  this.displayDates_();

  this.inputName_.value = eh.getSummary();

  this.textAreaDesc_.value = eh.getDescription();

  this.checkboxAllDay_.checked = eh.getAllDay();

  this.calendarsSelect_.update();
  this.calendarsSelect_.setCalendarId(eh.getCalendarId());

  this.showTimeInputs_(!eh.getAllDay());
  this.updateLabels_(eh.getAllDay());
};


/**
 * Displays dates in form.
 * @private
 */
rflect.cal.ui.EventPane.prototype.displayDates_ = function() {
  var eh = this.eventManager.eventHolder;

  var startDate = eh.getStartDate();
  var endDate = eh.getEndDate();
  // We need human-adjusted end date for all-day events.
  // Our interval end dates are exclusive, and it's more natural for all-day
  // events to have inclusive end.
  var uiEndDate = endDate.clone();

  if (eh.getAllDay() && uiEndDate.getHours() == 0 &&
      uiEndDate.getMinutes() == 0)
    uiEndDate.add(new goog.date.Interval(goog.date.Interval.DAYS, -1));

  if (this.navigator_.isNativeTimeInput()){
    this.displayDatesNative_(startDate, uiEndDate);
  } else {
    this.displayDatesCustom_(startDate, uiEndDate);
  }

}


/**
 * Displays dates in form for native widgets.
 * @param {goog.date.Date} aStartDate Start date to display.
 * @param {goog.date.Date} aUIEndDate End date to display, differs from real end
 * date in that it is inclusive end of event interval, as opposed to real date,
 * which is exclusive.
 * @private
 */
rflect.cal.ui.EventPane.prototype.displayDatesNative_ = function(aStartDate,
    aUIEndDate) {
  var formatStringDate = rflect.cal.ui.EventPane.NATIVE_DATE_INPUT_FORMAT;
  var formatStringDateTime = 
      rflect.cal.ui.EventPane.NATIVE_DATETIME_INPUT_FORMAT;
  var formatDate = new goog.i18n.DateTimeFormat(formatStringDate);
  var formatDateTime = new goog.i18n.DateTimeFormat(formatStringDateTime);
  var startDateFormatted = formatDate.format(aStartDate);
  var startDateTimeFormatted = formatDateTime.format(aStartDate);
  var endDateFormatted = formatDate.format(aUIEndDate);
  var endDateTimeFormatted = formatDateTime.format(aUIEndDate);

  this.inputStartDate_.value = startDateFormatted;
  this.inputStartDateTime_.value = startDateTimeFormatted;
  this.inputEndDate_.value = endDateFormatted;
  this.inputEndDateTime_.value = endDateTimeFormatted;

  rflect.cal.ui.EventPane.markInput(true, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputStartDateTime_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndDateTime_);
}


/**
 * Displays dates in form for custom widgets.
 * @param {goog.date.Date} aStartDate Start date to display.
 * @param {goog.date.Date} aUIEndDate End date to display. 
 * @see {rflect.cal.ui.EventPane.prototype.displayDatesNative_}
 * @private
 */
rflect.cal.ui.EventPane.prototype.displayDatesCustom_ = function(aStartDate,
    aUIEndDate) {
  var formatStringDate = rflect.cal.ui.EventPane.getDateFormatString();
  var formatStringTime = goog.i18n.DateTimeSymbols.TIMEFORMATS[3];
  var formatDate = new goog.i18n.DateTimeFormat(formatStringDate);
  var formatTime = new goog.i18n.DateTimeFormat(formatStringTime);
  var startDateFormatted = formatDate.format(aStartDate);
  var startTimeFormatted = formatTime.format(aStartDate);
  var endDateFormatted = formatDate.format(aUIEndDate);
  var endTimeFormatted = formatTime.format(aUIEndDate);

  this.inputStartDate_.value = startDateFormatted;
  this.inputStartTime_.value = startTimeFormatted;
  this.inputEndDate_.value = endDateFormatted;
  this.inputEndTime_.value = endTimeFormatted;

  rflect.cal.ui.EventPane.markInput(true, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputStartTime_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndTime_);
}


/**
 * Scans values from form.
 * @return {boolean} Whether input is valid.
 */
rflect.cal.ui.EventPane.prototype.scanValues = function() {
  var valid = false;

  var eh = this.eventManager.eventHolder;

  eh.setSummary(this.inputName_.value);

  eh.setDescription(this.textAreaDesc_.value);

  eh.setCalendarId(this.calendarsSelect_.getCalendarId());

  if (this.navigator_.isNativeTimeInput()){
    var dateScanResult = this.scanDatesNative_();
  } else {
    dateScanResult = this.scanDatesCustom_();
  }
  valid = dateScanResult.valid;
  var startDate = dateScanResult.startDate;
  var endDate = dateScanResult.endDate;

  if (valid) {
    var startDateShim = rflect.date.createDateShim(startDate.getYear(),
        startDate.getMonth(), startDate.getDate(), startDate.getHours(),
        startDate.getMinutes(), 0, true);
    var endDateShim = rflect.date.createDateShim(endDate.getYear(),
        endDate.getMonth(), endDate.getDate(), endDate.getHours(),
        endDate.getMinutes(), 0);

    if (eh.getAllDay()) {
      startDateShim.setHours(0);
      startDateShim.setMinutes(0);
      if (!(endDateShim.getHours() == 0 &&
          endDateShim.getMinutes() == 0)) {
        endDateShim.setHours(0);
        endDateShim.setMinutes(0);
      }

      // ui date is lesser than real by 1 day for all-day events
      endDateShim = endDateShim.getTomorrow();

    }

    eh.setStartDate(startDateShim);
    eh.setEndDate(endDateShim);
  }

  return valid;
};


/**
 * Scans custom time inputs and outputs dates.
 * @return {{valid: boolean, startDate: goog.date.DateTime, endDate:
 * goog.date.DateTime}}
 */
rflect.cal.ui.EventPane.prototype.scanDatesCustom_ = function() {
  var valid = false;
  var startDate = new goog.date.DateTime();
  var startTime = new goog.date.DateTime();
  var endDate = new goog.date.DateTime();
  var endTime = new goog.date.DateTime();

  var parserDate = new goog.i18n.DateTimeParse(
      rflect.cal.ui.EventPane.getDateFormatString());
  var parserTime = new goog.i18n.DateTimeParse(
      goog.i18n.DateTimeSymbols.TIMEFORMATS[3]);

  var validStartDate = parserDate.parse(this.inputStartDate_.value, startDate)
      != 0;
  var validEndDate = parserDate.parse(this.inputEndDate_.value, endDate) != 0;
  var validStartTime = parserTime.parse(this.inputStartTime_.value, startTime)
      != 0;
  var validEndTime = parserTime.parse(this.inputEndTime_.value, endTime) != 0;

  if (valid = (validStartDate && validEndDate && validStartTime &&
      validEndTime)) {
    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getMinutes());
    endDate.setHours(endTime.getHours());
    endDate.setMinutes(endTime.getMinutes());
  }

  if (valid && startDate.getTime() > endDate.getTime())
    valid = validEndDate = validEndTime = false;

  rflect.cal.ui.EventPane.markInput(validStartDate, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(validEndDate, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(validStartTime, this.inputStartTime_);
  rflect.cal.ui.EventPane.markInput(validEndTime, this.inputEndTime_);

  return {valid: valid, startDate: startDate, endDate: endDate};
}


/**
 * Scans native time inputs and outputs dates.
 * @return {{valid: boolean, startDate: goog.date.DateTime, endDate:
 * goog.date.DateTime}}
 */
rflect.cal.ui.EventPane.prototype.scanDatesNative_ = function() {
  var valid = false;
  var startDate = new goog.date.DateTime();
  var startDateTime = new goog.date.DateTime();
  var endDate = new goog.date.DateTime();
  var endDateTime = new goog.date.DateTime();

  var parserDate = new goog.i18n.DateTimeParse(
      rflect.cal.ui.EventPane.NATIVE_DATE_INPUT_FORMAT);
  var parserDateTime = new goog.i18n.DateTimeParse(
      rflect.cal.ui.EventPane.NATIVE_DATETIME_INPUT_FORMAT);

  var validStartDate = parserDate.parse(this.inputStartDate_.value, startDate)
      != 0;
  var validEndDate = parserDate.parse(this.inputEndDate_.value, endDate) != 0;
  var validStartDateTime = parserDateTime.parse(this.inputStartDateTime_.value,
      startDateTime) != 0;
  var validEndDateTime = parserDateTime.parse(this.inputEndDateTime_.value,
      endDateTime) != 0;

  if (valid = (validStartDate && validEndDate && validStartDateTime &&
      validEndDateTime)) {
    startDate.setHours(startDateTime.getHours());
    startDate.setMinutes(startDateTime.getMinutes());
    endDate.setHours(endDateTime.getHours());
    endDate.setMinutes(endDateTime.getMinutes());
  }

  if (valid && startDate.getTime() > endDate.getTime())
    valid = validEndDate = validEndDateTime = false;

  rflect.cal.ui.EventPane.markInput(validStartDate, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(validEndDate, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(validStartDateTime,
      this.inputStartDateTime_);
  rflect.cal.ui.EventPane.markInput(validEndDateTime, this.inputEndDateTime_);

  return {valid: valid, startDate: startDate, endDate: endDate};
}


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.EventPane.prototype.disposeInternal = function() {
  this.inputStartDate_ = null;
  this.inputEndDate_ = null;
  this.inputStartTime_ = null;
  this.inputEndTime_ = null;
  this.inputStartDateTime_ = null;
  this.inputEndDateTime_ = null;
  this.checkboxAllDay_ = null;

  this.labelStart_ = null;
  this.labelEnd_ = null;

  if (!this.navigator_.isNativeTimeInput()){
    this.inputDatePicker_.dispose();
    this.startTimeAC_.dispose();
    this.endTimeAC_.dispose();
  }
  rflect.cal.ui.EventPane.superClass_.disposeInternal.call(this);
};