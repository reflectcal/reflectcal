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
goog.require('rflect.cal.ui.soy.calendarspane');
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
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {rflect.cal.ui.ExternalPane}
 */
rflect.cal.ui.CalendarsPane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aTransport) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager,
      aEventManager, aContainerSizeMonitor, aTransport);

  //Enabling touch-only interface.
  this.enableTouchInterface(rflect.TOUCH_INTERFACE_ENABLED, true);
  this.enableMouseInterface(!rflect.TOUCH_INTERFACE_ENABLED, true);
};
goog.inherits(rflect.cal.ui.CalendarsPane, rflect.cal.ui.ExternalPane);


/**
 * @typedef {{id: string, name: string, colorClass: string, isInProgress: boolean}}
 */
rflect.cal.ui.CalendarsPane.DisplayableCalendar;


/**
 * @typedef {{label: string, calendars: Array.<rflect.cal.ui.CalendarsPane.DisplayableCalendar>}}
 */
rflect.cal.ui.CalendarsPane.CalendarCollection;


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
 * @override
 */
rflect.cal.ui.CalendarsPane.prototype.isButtonDeleteEnabled = function() {
  return false;
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
 * @return {Array.<rflect.cal.ui.CalendarsPane.CalendarCollection>}
 * Calendars list table
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.getCalendarCollections =
    function() {
  var calendarCollections = [
    {
      label: rflect.cal.i18n.Symbols.CALENDARS_LABEL_MY,
      calendars: []
    }, {
      label: rflect.cal.i18n.Symbols.CALENDARS_LABEL_OTHER,
      calendars: []
    }
  ];

  //Calendars pane may not yet exist.
  var currentCalendar = this.calendarEditPane_ &&
      this.calendarEditPane_.getCurrentCalendar();

  this.eventManager.forEachCalendar(calendar => {
    var tmpCalendar = {};
    //Use updated version of calendar if we were editing it.
    if (currentCalendar && currentCalendar.id == calendar.id) {
      tmpCalendar.id = currentCalendar.id;
      tmpCalendar.name = currentCalendar.getUIName();
      tmpCalendar.colorClass = currentCalendar.colorCode.eventClass;
      tmpCalendar.isInProgress = !currentCalendar.id || this.eventManager.
          calendarIsInProgress(currentCalendar.id)

    } else {
      tmpCalendar.id = calendar.id;
      tmpCalendar.name = calendar.getUIName();
      tmpCalendar.colorClass = calendar.colorCode.eventClass;
      tmpCalendar.isInProgress = !calendar.id || this.eventManager.
          calendarIsInProgress(calendar.id)
    }

    if (calendar.own) {
      calendarCollections[0].calendars.push(tmpCalendar);
    } else {
      calendarCollections[1].calendars.push(tmpCalendar);
    }
  });

  return calendarCollections;
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
rflect.cal.ui.CalendarsPane.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.calendarspane.calendarsPane({
    id: this.getId(),
    includeOuterHTML: opt_outerHTML,
    calendarCollections: this.getCalendarCollections()
  });
};


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
      .listen(this.buttonPrimary1,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)
      .listen(this.buttonPrimary2,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)
      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this)
      .listen(this.getElement(),
      goog.events.EventType.CLICK, this.onCalendarLinkClick_, false, this)

      //Show/hide actions.
      .listen(this.getParent(),
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this);

      // Save settings handler is in view manager.
      this.getHandler()
          .listen(this.viewManager.getCalendarEditPane(),
          rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
          this.onCalendarUpdate_, false, this);
};


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event
 * object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onBeforePageChange_ =
    function(aEvent) {
  if (aEvent.currentScreen == this){
    this.resetMomentumScroller();
  }
}


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
  if (aShow) {
    this.viewManager.getCalendarEditPane().setCurrentCalendar(opt_calendar);
    this.viewManager.getCalendarEditPane().setNewCalendarMode(
        opt_newCalendarMode);
  }
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(
      this.viewManager.getCalendarEditPane(), aShow));
}


/**
 * Settings pane link calendar update listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onCalendarUpdate_ =
    function(aEvent) {
  this.getElement().querySelector('.settings-body-inner').innerHTML =
      rflect.cal.ui.soy.calendarspane.calendarsPaneBody({
    calendarCollections: this.getCalendarCollections()
  });
  this.resetMomentumScroller();
}


/**
 * Searches for closest target ancestor that is calendar tr.
 * @param {Element} aTarget Target to start search for row.
 * @return {Element} Tr element or null.
 */
rflect.cal.ui.CalendarsPane.getCalendarRow = function(aTarget) {
  return /**@type {Element}*/ (goog.dom.getAncestor(aTarget, aNode =>
      aNode.tagName == 'A', true, 3));
}


/**
 * Settings pane link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.CalendarsPane.prototype.onCalendarLinkClick_ = function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);
  var link = rflect.cal.ui.CalendarsPane.getCalendarRow(target);
  if (goog.DEBUG)
    console.log('link: ', link);

  if (link) {
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
  if (this.viewManager.isVisible(this)) {
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


