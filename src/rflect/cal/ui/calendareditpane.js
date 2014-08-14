/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar edit pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.CalendarEditPane');
goog.provide('rflect.cal.ui.CalendarEditPane.EventTypes');

goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.Transport');
goog.require('rflect.cal.Transport.EventTypes');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');
goog.require('rflect.cal.ui.ExternalPane');
goog.require('rflect.cal.ui.PageRequestEvent');
goog.require('rflect.cal.ui.ScreenManager.EventTypes');
goog.require('rflect.dom');
goog.require('rflect.string');
goog.require('rflect.ui.Checkbox');
goog.require('rflect.ui.Dialog.DefaultButtonCaptions');



/**
 * Calendars pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {rflect.cal.ui.ExternalPane}
 */
rflect.cal.ui.CalendarEditPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager, 
      aEventManager, aParentElement, aTransport);

  /**
   * List of user's newly created calendars, without id.
   * @see {rflect.cal.ui.CalendarEditPane#onSaveCalendar_}
   *
   * @type {Array.<rflect.cal.events.Calendar>}
   * @private
   */
  this.newCalendars_ = [];

  this.addChild(this.buttonDeleteCalendar_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));

};
goog.inherits(rflect.cal.ui.CalendarEditPane, rflect.cal.ui.ExternalPane);


/**
 * @enum {string}
 */
rflect.cal.ui.CalendarEditPane.EventTypes = {
  CANCEL: 'calendarsPaneCancel',
  SAVE: 'save',
  CALENDAR_UPDATE: 'calendarUpdate',
  CALENDAR_DELETE: 'calendarDelete'
};


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.CalendarEditPane.LABEL_CLASS_NAME =
    goog.getCssName('goog-inline-block') + ' ' +
    goog.getCssName('event-pane-label') + ' ' +
    'label-fluid';


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.CalendarEditPane.BUTTON_CLASS_NAME =
    goog.getCssName('event-edit-pane-button');


/**
 * @type {number}
 * @const
 */
rflect.cal.ui.CalendarEditPane.PALETTE_ROWS_NUMBER = 1;


/**
 * @type {number}
 * @const
 */
rflect.cal.ui.CalendarEditPane.PALETTE_COLS_NUMBER = 3;


/**
 * @enum {number}
 */
rflect.cal.ui.CalendarEditPane.PageIndexes = {
  MAIN: 0,
  CALENDARS: 1,
  ADVANCED: 2,
  CALENDAR_EDIT: 3
};


/**
 * Whether we're creating new calendar.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.newCalendarMode_ = false;


/**
 * Calendar that is being edited at the moment.
 * @type {rflect.cal.events.Calendar}
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.currentCalendar_;


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.parentEl;


/**
 * Current page element index.
 * @type {number}
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.viewIndex_;


/**
 *  @return {rflect.cal.events.Calendar} Current calendar.
 */
rflect.cal.ui.CalendarEditPane.prototype.getCurrentCalendar = function() {
  return this.currentCalendar_;
};


/**
 *  @param {rflect.cal.events.Calendar} aCurrentCalendar Current calendar.
 */
rflect.cal.ui.CalendarEditPane.prototype.setCurrentCalendar =
    function(aCurrentCalendar) {
  this.currentCalendar_ = aCurrentCalendar;
};


/**
 *  @param {boolean} aNewCalendarMode Whether new calendar
 *  mode is set.
 */
rflect.cal.ui.CalendarEditPane.prototype.setNewCalendarMode =
    function(aNewCalendarMode) {
  this.newCalendarMode_ = aNewCalendarMode;
};


/**
 *  @return {Array.<rflect.cal.events.Calendar>} New calendars list.
 */
rflect.cal.ui.CalendarEditPane.prototype.getNewCalendars = function() {
  return this.newCalendars_;
};


/**
 * @override
 */
rflect.cal.ui.CalendarEditPane.prototype.createBody =
    function(aDom) {
  goog.dom.classes.add(this.buttonDeleteCalendar_.getElement(),
      rflect.cal.ui.CalendarEditPane.BUTTON_CLASS_NAME,
      goog.getCssName('event-pane-button-delete'));
  rflect.cal.ui.common.setDeleteButtonContent(this.buttonDeleteCalendar_);

  this.getPaneLowerCenter().appendChild(
      this.buttonDeleteCalendar_.getElement());

  var labelName = aDom.createDom('label', {
    'for': 'sp-calendar-name-input',
    className: rflect.cal.ui.CalendarEditPane.LABEL_CLASS_NAME
  }, 'Name');
  this.inputCalendarName_ = aDom.createDom('input', {
    'type': 'text',
    id: 'sp-calendar-name-input',
    className: goog.getCssName('ep-event-name-input'),
    placeholder: rflect.cal.i18n.Symbols.NO_NAME_EVENT
  });
  var nameCont = aDom.createDom('div',
      [goog.getCssName('event-name-input-cont'),
        goog.getCssName('event-pane-cont')],
      labelName, rflect.dom.wrapControl(this.inputCalendarName_));

  var labelColor = aDom.createDom('label', {
    'for': 'calendar-colors',
    className: rflect.cal.ui.CalendarEditPane.LABEL_CLASS_NAME + ' ' +
        goog.getCssName('calendar-colors-label')
  }, 'Colors');
  var colorPaletteTable = this.createColorsTable_(aDom);
  var colorsCont = aDom.createDom('div',
      ['event-name-input-cont', 'event-pane-cont', 'event-pane-cont-last'],
      labelColor, colorPaletteTable);

  return aDom.createDom('div', goog.getCssName('settings-body'), nameCont,
      colorsCont);
}


/**
 * Generates table.
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {string|null} aTableId Table id.
 * @param {string} aTableClassName Table class.
 * @param {number} aRowsN Rows number.
 * @param {number} aColsN Cols number.
 * @param {string|null} aRowClassName Class for each row.
 * @param {function(goog.dom.DomHelper, Element, number, number):Element} aTdMakerFn Function that
 * takes td and decorates it.
 * @return {Element} Table.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.createTable_ = function(aDom, aTableId,
                                                             aTableClassName,
                                                             aRowsN, aColsN,
                                                             aRowClassName,
                                                             aTdMakerFn) {

  var tableParams = {
    className: aTableClassName
  };
  if (aTableId) tableParams.id = aTableId;

  var tbody = aDom.createDom('tbody');

  var table = aDom.createDom('table', tableParams, tbody);

  for (var rowCounter = 0; rowCounter < aRowsN; rowCounter++) {
    var tr = aDom.createDom('tr');
    if (aRowClassName) tr.className = aRowClassName;
    tbody.appendChild(tr);

    for (var colCounter = 0; colCounter < aColsN; colCounter++) {
      var td = aDom.createDom('td');
      tr.appendChild(goog.bind(aTdMakerFn, this, aDom, td, rowCounter,
          colCounter)());
    }
  }

  return table;
}


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Calendars list table
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.createColorsTable_ =
    function(aDom) {
  return this.createTable_(aDom, 'calendar-colors',
      goog.getCssName('calendar-colors-table') + ' ' +
          goog.getCssName('goog-inline-block'),
      rflect.cal.ui.CalendarEditPane.PALETTE_ROWS_NUMBER,
      rflect.cal.ui.CalendarEditPane.PALETTE_COLS_NUMBER,
      null, rflect.cal.ui.CalendarEditPane.createColorsTd_);
 }


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {Element} aTd Td to decorate.
 * @param {number} aRowIndex Td row index.
 * @param {number} aColIndex Td col index.
 * @return {Element} Decorated calendars table td.
 * @private
 */
rflect.cal.ui.CalendarEditPane.createColorsTd_ = function(aDom, aTd, aRowIndex,
                                                      aColIndex) {
  var colorCodeIndex = aRowIndex *
      rflect.cal.ui.CalendarEditPane.PALETTE_COLS_NUMBER + aColIndex;

  var colorCode = rflect.cal.i18n.PREDEFINED_COLOR_CODES[colorCodeIndex];

  var colorLink = aDom.createDom('button', {
    id: 'calendar-color' + colorCodeIndex,
    className: goog.getCssName('calitem-color-cont') + ' ' +
        goog.getCssName('calendar-color') + ' ' + colorCode.eventClass
  });
  aTd.appendChild(colorLink);

  return aTd;
}


/**
 * @override
 */
rflect.cal.ui.CalendarEditPane.prototype.enterDocument = function() {
  rflect.cal.ui.CalendarEditPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler()
      .listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonBack2, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonSave1, goog.ui.Component.EventType.ACTION,
      this.onSaveCalendar_, false, this)
      .listen(this.buttonSave2, goog.ui.Component.EventType.ACTION,
      this.onSaveCalendar_, false, this)
      .listen(this.buttonDeleteCalendar_,
      goog.ui.Component.EventType.ACTION, this.onDeleteCalendarAction_, false,
      this)

      .listen(this.getElement(),
      goog.events.EventType.CLICK, this.onCalendarsColorLinkClick_, false, this)

      .listen(this.transport, rflect.cal.Transport.EventTypes.SAVE_CALENDAR,
      this.onSaveCalendarResponse_, false, this)
      .listen(this.transport, rflect.cal.Transport.EventTypes.DELETE_CALENDAR,
      this.onDeleteCalendarResponse_, false, this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this)

      //Show/hide actions.
      .listen(this.viewManager.getScreenManager(),
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this)
      .listen(this.viewManager.getScreenManager(),
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE, this.onPageChange_,
      false, this);
};


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event
 * object.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onBeforePageChange_ =
    function(aEvent) {
  if (aEvent.currentScreen == this){
    this.displayValues();
  }
}


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.PageChangeEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onPageChange_ = function(aEvent) {
  if (!rflect.TOUCH_INTERFACE_ENABLED){
    /** @preserveTry */
    try {
      this.inputCalendarName_.focus();
      this.inputCalendarName_.select();
    } catch(e) {
      // IE8- shows error that it couldn't set focus but nevertheless, sets
      // it.
    }
  }
}


/**
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onCalendarsColorLinkClick_ =
    function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);

  if (!target.tagName || target.tagName.toLowerCase() != 'button')
    return;

  if (goog.dom.classes.has(target, 'calitem-color-cont')) {
    var id = target.id;
    aEvent.preventDefault();

    var index = +/\d/.exec(id);

    this.currentCalendar_.colorCode =
        rflect.cal.i18n.PREDEFINED_COLOR_CODES[index];
    this.displayCalendarColor_(index);
  }
}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.showBehavior.isVisible()) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      this.onSaveCalendar_();

    }
  }
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.CalendarEditPane.prototype.onCancel_ = function() {
  this.setCurrentCalendar(null);
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * Save calendar action listener.
 */
rflect.cal.ui.CalendarEditPane.prototype.onSaveCalendar_ = function() {
  if (this.scanValues()) {

    if (this.newCalendarMode_)
      this.newCalendars_.push(this.currentCalendar_);

    this.transport.saveCalendarAsync(
        this.currentCalendar_);
    // this.currentCalendar_ must be still actual here.
    this.dispatchEvent(rflect.cal.ui.CalendarEditPane.EventTypes.CALENDAR_UPDATE);

    this.setCurrentCalendar(null);
    this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
  }
};


/**
 * Save calendar event listener.
 * @param {rflect.cal.Transport.SaveCalendarEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onSaveCalendarResponse_ =
    function(aEvent) {
  var calendar = aEvent.calendar;

  // New calendars that we store in list do not have an id, so we only could
  // identify them by direct equality.
  goog.array.remove(this.newCalendars_, calendar);

  this.dispatchEvent(rflect.cal.ui.CalendarEditPane.EventTypes.CALENDAR_UPDATE);
}


/**
 * Delete calendar button event listener.
 * @param {rflect.cal.Transport.DeleteCalendarEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onDeleteCalendarAction_ =
    function(aEvent) {
  this.eventManager.deleteCalendar(this.currentCalendar_);

  this.transport.deleteCalendarAsync(
      this.currentCalendar_);

  this.dispatchEvent(rflect.cal.ui.CalendarEditPane.EventTypes.CALENDAR_UPDATE);

  this.setCurrentCalendar(null);
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * Delete calendar remote operation listener.
 * @param {rflect.cal.Transport.DeleteCalendarEvent} aEvent Event object.
 * TODO(alexk): undo action will be possible there, so differentiate this event
 * from one that comes right after button click.
 * @private
 */
rflect.cal.ui.CalendarEditPane.prototype.onDeleteCalendarResponse_ =
    function(aEvent) {
  this.dispatchEvent(rflect.cal.ui.CalendarEditPane.EventTypes.CALENDAR_UPDATE);
}


/**
 * Displays calendar properties in form.
 */
rflect.cal.ui.CalendarEditPane.prototype.displayValues = function() {
  //this.buttonDeleteCalendar_.setVisible(!this.newCalendarMode_);

  this.inputCalendarName_.value = this.currentCalendar_.name;
  this.inputCalendarName_.placeholder = this.currentCalendar_.colorCode
      .getFullName();

  this.buttonDeleteCalendar_.setVisible(!this.newCalendarMode_);
  this.displayCalendarColor_(this.currentCalendar_.colorCode.id);
};


/**
 * Scans calendar values from form.
 * Color code is updated separately:
 * @see {rflect.cal.ui.CalendarEditPane#onCalendarsListLinkClick_}
 *
 * @return {boolean} Whether input is valid.
 *
 * Color code is set in
 * @see {rflect.cal.ui.CalendarEditPane#onCalendarsColorLinkClick_}
 */
rflect.cal.ui.CalendarEditPane.prototype.scanValues = function() {
  var valid = true;
  if (valid) {
    this.currentCalendar_.name = this.inputCalendarName_.value;
  }

  return valid;
};


/**
 * Sets color code for calendar.
 * @param {number} aIndex Index of color code in both ui table and predefined
 * set.
 */
rflect.cal.ui.CalendarEditPane.prototype.displayCalendarColor_ =
    function(aIndex) {
  goog.array.forEach(this.getElement()
      .getElementsByClassName(goog.getCssName('calendar-color')),
      function(el, elIndex){
    if (elIndex == aIndex)
      goog.dom.classes.add(el, goog.getCssName('calendar-color-selected'));
    else
      goog.dom.classes.remove(el, goog.getCssName('calendar-color-selected'));
  });

  this.inputCalendarName_.placeholder =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES[aIndex].getFullName();
}


/**
 * @override
 */
rflect.cal.ui.CalendarEditPane.prototype.disposeInternal = function() {
  this.currentCalendar_ = null;

  rflect.cal.ui.CalendarEditPane.superClass_.disposeInternal.call(this);
};


