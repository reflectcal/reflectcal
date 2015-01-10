/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Calendars pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.CalendarsPane');
goog.provide('rflect.cal.ui.CalendarsPane.EventTypes');

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
goog.require('rflect.cal.ui.CalendarEditPane');
goog.require('rflect.cal.ui.CalendarEditPane.EventTypes');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');
goog.require('rflect.cal.ui.ExternalPane');
goog.require('rflect.cal.ui.PageRequestEvent');
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
 * @extends {rflect.cal.ui.ExternalPane}
 */
rflect.cal.ui.CalendarsPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager,
      aEventManager, aParentElement, aTransport);

  this.addChild(this.buttonNewCalendar1 = new goog.ui.Button('New',
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonNewCalendar2 = new goog.ui.Button('New',
      goog.ui.FlatButtonRenderer.getInstance()));
};
goog.inherits(rflect.cal.ui.CalendarsPane, rflect.cal.ui.ExternalPane);


/**
 * @enum {string}
 */
rflect.cal.ui.CalendarsPane.EventTypes = {
  CANCEL: 'settingsCancel',
  SAVE: 'save',
  CALENDAR_UPDATE: 'calendarUpdate'
};


/**
 * Event that is fired after saving of settings.
 * @param {Object} aSettings Settings object.
 * @param {boolean} aChanged Whether settings were changed.
 * @extends {goog.events.Event}
 * @constructor
 */
rflect.cal.ui.CalendarsPane.SaveSettingsEvent = function(aSettings, aChanged) {
  goog.events.Event.call(this, rflect.cal.ui.CalendarsPane.EventTypes.SAVE);

  this.settings = aSettings;
  this.settingsChanged = aChanged;
}
goog.inherits(rflect.cal.ui.CalendarsPane.SaveSettingsEvent, goog.events.Event);


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.CalendarsPane.LABEL_CLASS_NAME =
    goog.getCssName('goog-inline-block') + ' ' +
    goog.getCssName('event-pane-label') + ' ' +
    'label-fluid';


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.CalendarsPane.BUTTON_CLASS_NAME =
    goog.getCssName('event-edit-pane-button');


/**
 * @enum {number}
 */
rflect.cal.ui.CalendarsPane.PageIndexes = {
  MAIN: 0,
  CALENDARS: 1,
  ADVANCED: 2
};


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.parentEl;


/**
 * Contents of 'calendars' tab. We need it because calendars tables are updated
 * on calendars actions.
 * @type {Element}
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.tabContents2_;


/**
 * Current page element index.
 * @type {number}
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.viewIndex_;


/**
 * @type {boolean} Whether reload is needed to apply changed settings.
 */
rflect.cal.ui.CalendarsPane.prototype.reloadIsNeeded_ = false;


/**
 * @override
 */
rflect.cal.ui.CalendarsPane.prototype.createSettingsPaneButtonsUpper =
    function(aDom) {
  rflect.cal.ui.common.setBackButtonContent(this.buttonBack1);
  this.getPaneUpperLeft().appendChild(this.buttonBack1.getElement());
  this.getPaneUpperRight().appendChild(this.buttonNewCalendar1.getElement());
  /*this.buttonNewCalendar1.getElement().appendChild(aDom.createDom('i', ['icon',
      'icon-plus']));*/
  goog.dom.classes.add(this.buttonNewCalendar1.getElement(), 'emphasis-button');
}


/**
 * @override
 */
rflect.cal.ui.CalendarsPane.prototype.createSettingsPaneButtonsLower =
    function(aDom) {
  rflect.cal.ui.common.setBackButtonContent(this.buttonBack2);
  this.getPaneLowerLeft().appendChild(this.buttonBack2.getElement());
  this.getPaneLowerRight().appendChild(this.buttonNewCalendar2.getElement());
  /*this.buttonNewCalendar2.getElement().appendChild(aDom.createDom('i', ['icon',
      'icon-plus']));*/
  goog.dom.classes.add(this.buttonNewCalendar2.getElement(), 'emphasis-button');
}


/**
 * @override
 */
rflect.cal.ui.CalendarsPane.prototype.createBody =
    function(aDom) {

  var body = aDom.createDom('div', goog.getCssName('settings-body'));

  this.updateCalendarTables_(aDom, body);

  return body;
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
rflect.cal.ui.CalendarsPane.prototype.createTable_ = function(aDom, aTableId,
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
 * Creates pair of calendars tables - 'my' and 'other' and attaches them to
 * given container.
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {Element} aParent Container to attach tables to.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.updateCalendarTables_ = function(aDom,
    aParent){
  // We need to remove all previous table containers, by class selector, because
  // maybe in future there will be more than 2 classifications.
  goog.array.forEach(aParent.querySelectorAll('.calendars-outer-cont'),
      function(el) {
    goog.dom.removeNode(el);
  });

  var myCalendarsTable = this.createCalendarsTable_(aDom, true);
  if (myCalendarsTable) {
    var myCalendarsSubCont = aDom.createDom('div',
        goog.getCssName('calendars-cont'),  myCalendarsTable);
    var myCalendarsCont = aDom.createDom('div',
        ['event-pane-cont', 'calendars-outer-cont'],
        aDom.createDom('label', null, 'My calendars'), myCalendarsSubCont);
    aParent.appendChild(myCalendarsCont);
  }

  var otherCalendarsTable = this.createCalendarsTable_(aDom, false);
  if (otherCalendarsTable) {
    var otherCalendarsSubCont = aDom.createDom('div',
        goog.getCssName('calendars-cont'), otherCalendarsTable);
    var otherCalendarsCont = aDom.createDom('div',
        ['event-pane-cont', 'calendars-outer-cont'],
        aDom.createDom('label', null, 'Other calendars'), otherCalendarsSubCont);
    aParent.appendChild(otherCalendarsCont);
  }

}


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {boolean} aMy Whether "my" calendar list is built.
 * @return {Element} Calendars list table
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.createCalendarsTable_ =
    function(aDom, aMy) {
  var calendars = [];
  //Calendars pane may not yet exist.
  var currentCalendar = this.calendarEditPane_ &&
      this.calendarEditPane_.getCurrentCalendar();

  this.eventManager.forEachCalendar(function(calendar){
    if (calendar.own && aMy || !calendar.own && !aMy)
      //Use updated version of calendar if we were editing it.
      if (currentCalendar && currentCalendar.id == calendar.id)
        calendars.push(currentCalendar);
      else
        calendars.push(calendar);
  });

  if (aMy && this.calendarEditPane_)
    Array.prototype.push.apply(calendars,
        this.calendarEditPane_.getNewCalendars());

  return calendars.length ?
      this.createTable_(aDom, null, goog.getCssName('calendars-table'),
      calendars.length, 2, goog.getCssName('calendar-row'),
      goog.partial(rflect.cal.ui.CalendarsPane.createCalendarsTd_,
      this.eventManager, calendars)) :
      null;
}


/**
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Array.<rflect.cal.events.Calendar>} aCalendars Corresponding
 * calendars list.
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {Element} aTd Td to decorate.
 * @param {number} aRowIndex Td row index.
 * @param {number} aColIndex Td col index.
 * @return {Element} Decorated calendars table td.
 * @private
 */
rflect.cal.ui.CalendarsPane.createCalendarsTd_ =
    function(aEventManager, aCalendars, aDom, aTd, aRowIndex, aColIndex) {
  var calendar = aCalendars[aRowIndex];

  var inProgress = !calendar.id ||
      aEventManager.calendarIsInProgress(calendar.id);

  switch (aColIndex) {
    case 0: {
      aTd.className = goog.getCssName('listitem-cont') + ' ' +
          goog.getCssName('name-cell');

      var linkParameters = {
        className: goog.getCssName('settings-link') + ' ' +
            goog.getCssName('cal-link')
      };
      if (inProgress)
        linkParameters.className +=
            ' ' + goog.getCssName('cal-link-in-progress');
      if (calendar.id) linkParameters.id =
          rflect.cal.predefined.CALENDAR_SETTINGS_LIST_PREFIX + calendar.id;

      var link = aDom.createDom('button', linkParameters, calendar.getUIName());
      aTd.appendChild(link);
    };break;
    case 1: {
      aTd.className = goog.getCssName('color-cell');
      var colorItem = aDom.createDom('div', [
        goog.getCssName('calitem-color-cont'),
        goog.getCssName('calendar-color'),
        calendar.colorCode.eventClass
      ]);
      aTd.appendChild(colorItem);
    };break;
    default: break;
  }

  return aTd;
}


/**
 * @override
 */
rflect.cal.ui.CalendarsPane.prototype.enterDocument = function() {
  rflect.cal.ui.CalendarsPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonBack2, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonNewCalendar1,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)
      .listen(this.buttonNewCalendar2,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)
      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this)
      .listen(this.getElement(),
      goog.events.EventType.CLICK, this.onCalendarLinkClick_, false, this);
};


/**
 * Shows calendars pane and lazily instantiates it at the first
 * time.
 * @param {boolean} aShow Whether to show settings pane.
 * @param {rflect.cal.events.Calendar=} opt_calendar Calendar with which to
 * initialize calendars pane.
 * @param {boolean=} opt_newCalendarMode Whether to delete button in calendars
 * pane, i.e. whether calendar is existing or new.
 */
rflect.cal.ui.CalendarsPane.prototype.showCalendarEditPane = function(aShow,
    opt_calendar, opt_newCalendarMode) {
  if (!this.calendarEditPane_) {
    this.calendarEditPane_ = new rflect.cal.ui.CalendarEditPane(
        this.viewManager, this.timeManager, this.eventManager,
        this.getDomHelper().getElement('main-container'), this.transport);
    this.addChild(this.calendarEditPane_);

    // Save settings handler is in view manager.
    this.getHandler()
        .listen(this.calendarEditPane_,
        rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
        this.onCalendarUpdate_, false, this);
  }

  if (aShow) {
    this.calendarEditPane_.setCurrentCalendar(opt_calendar);
    this.calendarEditPane_.setNewCalendarMode(opt_newCalendarMode);
  }
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this.calendarEditPane_,
      aShow));
}


/**
 * Settings pane link calendar update listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onCalendarUpdate_ =
    function(aEvent) {
  this.updateCalendarTables_(this.getDomHelper(),
     this.getElement().querySelector('.settings-body'));
}


/**
 * Searches for closest target ancestor that is calendar tr.
 * @param {Element} aTarget Target to start search for row.
 * @return {Element} Tr element or null.
 */
rflect.cal.ui.CalendarsPane.getCalendarRow = function(aTarget) {
  return /**@type {Element}*/ (goog.dom.getAncestor(aTarget, function(aNode) {
    return aNode.className == 'calendar-row';
  }, true, 2));
}


/**
 * Settings pane link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onCalendarLinkClick_ = function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);
  var tr = rflect.cal.ui.CalendarsPane.getCalendarRow(target);

  if (tr) {
    var link = tr.firstChild.firstChild;
    var id = link.id;

    aEvent.preventDefault();

    if (id) {
      var calendarId = rflect.string.getIdWithoutPrefix(id,
          rflect.cal.predefined.CALENDAR_SETTINGS_LIST_PREFIX);

      if (!(calendarId in this.eventManager.calendars) ||
          this.eventManager.calendarIsInProgress(calendarId))
        return;

      this.showCalendarEditPane(true,
          this.eventManager.calendars[calendarId].clone(), false);
    }
  }
}


/**
 * 'New calendar' button listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onNewCalendarAction_ =
    function(aEvent) {
  var randomColorCodeIndex = Math.round(
      Math.random() * (rflect.cal.i18n.PREDEFINED_COLOR_CODES.length - 1));

  this.showCalendarEditPane(true, new rflect.cal.events.Calendar('', '',
      rflect.cal.i18n.PREDEFINED_COLOR_CODES[randomColorCodeIndex], true, false,
      true, this.viewManager.user['username']), true);

  aEvent.target.setFocused(false);

}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.viewManager.getScreenManager().isVisible(this)) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      this.onCancel_();

    }
  }
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.CalendarsPane.prototype.onCancel_ = function() {
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * @override
 * @protected
 */
rflect.cal.ui.CalendarsPane.prototype.disposeInternal = function() {
  rflect.cal.ui.CalendarsPane.superClass_.disposeInternal.call(this);
};


