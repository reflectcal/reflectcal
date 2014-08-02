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
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.style');
goog.require('goog.ui.ac');
goog.require('goog.ui.Button');
goog.require('rflect.ui.Checkbox');
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.ac');
goog.require('rflect.cal.ui.CalendarsSelect');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.ExternalPane');
goog.require('rflect.cal.ui.InputDatePicker');
goog.require('rflect.cal.ui.PageRequestEvent');
goog.require('rflect.cal.ui.PaneShowBehavior');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.date.util');
goog.require('rflect.dom');
goog.require('rflect.ui.Checkbox');
goog.require('rflect.cal.i18n.Symbols');



/**
 * Event pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {rflect.cal.ui.ExternalPane}
 */
rflect.cal.ui.EventPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager,
      aEventManager, aParentElement, aTransport);

  this.addChild(this.buttonDelete_ = new goog.ui.Button(
      rflect.cal.i18n.Symbols.DELETE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.checkboxAllDay_ = new rflect.ui.Checkbox());

  /**
   * @type {rflect.cal.ui.InputDatePicker}
   * @private
   */
  this.inputDatePicker_ = new rflect.cal.ui.InputDatePicker(this.viewManager,
      rflect.cal.ui.EventPane.getDateFormatString());

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
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.parentEl;


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
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.EventPane.prototype.selectCalendars_;


/**
 * @return {boolean} Whether the component is visible.
 */
rflect.cal.ui.EventPane.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.createBody = function(aDom) {
  var body;

  /**@const*/
  var labelClassName = goog.getCssName('label-fluid') + ' ' +
      goog.getCssName('event-edit-pane-label');

  rflect.cal.ui.common.setDeleteButtonContent(this.buttonDelete_);
  this.getPaneUpperCenter().appendChild(this.buttonDelete_.getElement());
  goog.dom.classes.add(this.buttonDelete_.getElement(),
      goog.getCssName('event-edit-pane-button-delete'));

  var labelName = aDom.createDom('label', {
    'for': 'ep-event-name-input',
    className: labelClassName
  }, 'Name');
  this.inputName_ = aDom.createDom('input', {
    'type': 'text',
    id: 'ep-event-name-input',
    className: goog.getCssName('ep-event-name-input'),
    placeholder: 'Event name'
  });
  var nameCont = aDom.createDom('div',
    [goog.getCssName('event-name-input-cont'),
      goog.getCssName('event-edit-pane-cont-first'),
      goog.getCssName('event-edit-pane-cont')],
    this.inputName_);

  var labelStart = aDom.createDom('label', {
    'for': 'event-start-date',
    className: labelClassName
  }, 'Start');
  this.inputStartDate_ = aDom.createDom('input', {
    'type': 'text',
    id: 'event-start-date',
    className: goog.getCssName('event-date-input')
  });
  this.inputStartTime_ = aDom.createDom('input', {
    'type': 'text',
    id: 'event-start-time',
    className: goog.getCssName('event-time-input')
  });

  var labelEnd = aDom.createDom('label', {
      'for': 'event-start-date',
      className: labelClassName
    }, 'End');
  this.inputEndDate_ = aDom.createDom('input', {
    'type': 'text',
    id: 'event-end-date',
    className: goog.getCssName('event-date-input')
  });
  this.inputEndTime_ = aDom.createDom('input', {
    'type': 'text',
    id: 'event-end-time',
    className: goog.getCssName('event-time-input')
  });

  var startCont = aDom.createDom('div',
    [goog.getCssName('date-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelStart, this.inputStartDate_, this.inputStartTime_);
  var endCont = aDom.createDom('div',
    [goog.getCssName('date-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelEnd, this.inputEndDate_, this.inputEndTime_);

  var labelAllDay = aDom.createDom('label', {
    'for': 'event-all-day',
    className: 'goog-inline-block event-edit-pane-label all-day-label'
  }, 'All-day event');
  var allDaySubCont = aDom.createDom('span', null, labelAllDay,
      this.checkboxAllDay_.getElement());
  this.checkboxAllDay_.setLabel(allDaySubCont);
  var allDayCont = aDom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('description-cont') + ' ' +
      goog.getCssName('event-edit-pane-cont')
    }, allDaySubCont);

  // Calendars select.
  var labelCalendars = aDom.createDom('label', {
    'for': 'event-calendars',
    className: labelClassName
  }, 'Calendar');
  var selectCalendarsEl = aDom.createDom('select', {
      id: 'event-calendars',
      className: goog.getCssName('event-cal-select') + ' ' +
          goog.getCssName('event-edit-pane-cal-select')
    });
  this.selectCalendars_ = new rflect.cal.ui.CalendarsSelect(selectCalendarsEl,
      this.eventManager);
  var calendarsCont = aDom.createDom('div',
      goog.getCssName('event-edit-pane-cont'), labelCalendars,
      rflect.dom.wrapSelect(selectCalendarsEl));

  var labelDesc = aDom.createDom('label', {
    'for': 'event-description',
    className: labelClassName + ' ' +
      goog.getCssName('event-description-label')
  }, 'Description');
  this.textAreaDesc_ = aDom.createDom('textarea', {
    id: 'event-description',
    placeholder: 'Description',
    className: goog.getCssName('event-description')
  });
  var descCont = aDom.createDom('div', [
    goog.getCssName('description-cont'),
      goog.getCssName('event-edit-pane-cont')],
    this.textAreaDesc_);

  var timeLabels = rflect.date.util.getTimeLabels();
  this.startTimeAC_ = rflect.cal.ui.ac.createTimeAutoComplete(
      timeLabels, this.inputStartTime_, false);

  this.endTimeAC_ = rflect.cal.ui.ac.createTimeAutoComplete(
      timeLabels, this.inputEndTime_, false);

  //Adding custom class name to renderer.
  this.startTimeAC_.getRenderer().className += ' ' +
      goog.getCssName('ac-renderer-time');
  this.endTimeAC_.getRenderer().className += ' ' +
      goog.getCssName('ac-renderer-time');

  return body = aDom.createDom('div', goog.getCssName('settings-body'),
      nameCont, allDayCont, startCont, endCont, calendarsCont, descCont);
}


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.enterDocument = function() {
  rflect.cal.ui.EventPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonBack2, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonSave1,
      goog.ui.Component.EventType.ACTION, this.onSave_, false, this)
      .listen(this.buttonSave2, goog.ui.Component.EventType.ACTION,
      this.onSave_, false, this)
      .listen(this.buttonDelete_,
      goog.ui.Component.EventType.ACTION, this.onDelete_, false, this)
      .listen(this.checkboxAllDay_,
      goog.ui.Component.EventType.CHANGE, this.onCheck_, false, this)

      .listen(this.inputStartDate_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputStartTime_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputEndDate_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputEndTime_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)

      .listen(this.inputStartTime_, goog.events.EventType.MOUSEDOWN,
          this.onTimeInputMouseDown_, false, this)
      .listen(this.inputEndTime_, goog.events.EventType.MOUSEDOWN,
          this.onTimeInputMouseDown_, false, this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this);

  this.inputDatePicker_.addInput(this.inputStartDate_);
  this.inputDatePicker_.addInput(this.inputEndDate_);

  //Show/hide actions.
  this.getHandler().listen(this.showBehavior,
      rflect.cal.ui.PaneShowBehavior.EventTypes.BEFORE_SHOW, function(){
    this.displayValues();
  }, false, this);

  if (rflect.MOBILE) {
    var eventNameForInputFocus =
        rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK;
  } else {
    var eventNameForInputFocus =
        rflect.cal.ui.PaneShowBehavior.EventTypes.AFTER_SHOW;
  }

  this.getHandler().listen(this.showBehavior, eventNameForInputFocus,
      this.onPaneReady_, false, this);
};


/**
 * @param {rflect.cal.ui.PaneShowBehavior.SlideEvent} aEvent Event
 * object.
 */
rflect.cal.ui.EventPane.prototype.onPaneReady_ = function(aEvent) {
  // Do this only at the end of sliding-in pane.
  if (rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK ==
      aEvent.type && !(!aEvent.start && aEvent.showing))
    return;

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
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onKeyDown_ = function(aEvent) {

  if (this.showBehavior.isVisible() &&
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

  var target = /**@type{Element}*/(aEvent.target);
  if (target == this.inputStartTime_) {
    this.updateAC_(this.startTimeAC_);
  } else if (target == this.inputEndTime_) {
    this.updateAC_(this.endTimeAC_);
  }  else {
    this.startTimeAC_.dismiss();
    this.endTimeAC_.dismiss();
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
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * Save action listener.
 */
rflect.cal.ui.EventPane.prototype.onSave_ = function() {
  if (this.scanValues()) {
    this.eventManager.eventHolder.endWithEdit();
    this.transport.saveEventAsync(
        this.eventManager.eventHolder.getCurrentEvent());
    this.dispatchEvent(rflect.cal.ui.EventPane.EventTypes.SAVE);
    this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
  }
}


/**
 * Delete action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPane.prototype.onDelete_ = function(aEvent) {
  this.eventManager.eventHolder.endWithDelete();

  this.transport.deleteEventAsync(
      this.eventManager.eventHolder.getBackUpEvent());

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
    checked = this.checkboxAllDay_.isChecked();
    this.showTimeInputs_(!checked);
    eh.setAllDay(checked);

    this.displayDates_();
  }
}


/**
 * @param {boolean} aShow Whether to show time inputs.
 * @private
 */
rflect.cal.ui.EventPane.prototype.showTimeInputs_ = function(aShow) {
  goog.style.showElement(this.inputStartTime_, aShow);
  goog.style.showElement(this.inputEndTime_, aShow);
}


/**
 * Displays event properties in form.
 */
rflect.cal.ui.EventPane.prototype.displayValues = function() {
  var eh = this.eventManager.eventHolder;

  this.buttonDelete_.setVisible(!this.newEventMode_);

  this.displayDates_();

  this.inputName_.value = eh.getSummary();

  this.textAreaDesc_.innerHTML = eh.getDescription();

  this.checkboxAllDay_.setChecked(eh.getAllDay());

  this.selectCalendars_.update();
  this.selectCalendars_.setCalendarId(eh.getCalendarId());

  this.showTimeInputs_(!eh.getAllDay());

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

  var formatStringDate = rflect.cal.ui.EventPane.getDateFormatString();
  var formatStringTime = goog.i18n.DateTimeSymbols.TIMEFORMATS[3];
  var formatDate = new goog.i18n.DateTimeFormat(formatStringDate);
  var formatTime = new goog.i18n.DateTimeFormat(formatStringTime);
  var startDateFormatted = formatDate.format(startDate);
  var startTimeFormatted = formatTime.format(startDate);
  var endDateFormatted = formatDate.format(uiEndDate);
  var endTimeFormatted = formatTime.format(uiEndDate);

  this.inputStartDate_.value = startDateFormatted;
  this.inputStartTime_.value = startTimeFormatted;
  this.inputEndDate_.value = endDateFormatted;
  this.inputEndTime_.value = endTimeFormatted;

  rflect.cal.ui.EventPane.markInput(true, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputStartTime_);
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

  eh.setDescription(this.textAreaDesc_.innerHTML);

  eh.setCalendarId(this.selectCalendars_.getCalendarId());

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
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.EventPane.prototype.disposeInternal = function() {
  this.inputDatePicker_.dispose();
  this.startTimeAC_.dispose();
  this.endTimeAC_.dispose();
  this.selectCalendars_.dispose();

  rflect.cal.ui.EventPane.superClass_.disposeInternal.call(this);
};