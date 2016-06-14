/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Settings pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.SettingsPane');
goog.provide('rflect.cal.ui.SettingsPane.EventTypes');

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
goog.require('rflect.cal.ui.CalendarsPane');
goog.require('rflect.cal.ui.CalendarsPane.EventTypes');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');
goog.require('rflect.cal.ui.ExternalPane');
goog.require('rflect.cal.ui.PageRequestEvent');
goog.require('rflect.cal.ui.PaneShowBehavior');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.cal.ui.soy.settingspane');
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
rflect.cal.ui.SettingsPane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aTransport) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager, 
      aEventManager, aContainerSizeMonitor, aTransport);

  /**
   * Views elements, pages.
   * @type {Array.<Element>}
   * @private
   */
  this.viewsElements_ = [];

  this.addChild(this.buttonCalendars_ = new goog.ui.Button(null,
      goog.ui.ButtonRenderer.getInstance()));

  //Enabling touch-only interface.
  this.enableTouchInterface(rflect.TOUCH_INTERFACE_ENABLED, true);
  this.enableMouseInterface(!rflect.TOUCH_INTERFACE_ENABLED, true);

};
goog.inherits(rflect.cal.ui.SettingsPane, rflect.cal.ui.ExternalPane);


/**
 * @enum {string}
 */
rflect.cal.ui.SettingsPane.EventTypes = {
  CANCEL: 'settingsCancel',
  SAVE: 'save',
  CALENDAR_UPDATE: 'calendarUpdate'
};


/**
 * Event that is fired after saving of user.
 * @param {Object} aUser Original user object.
 * @param {Object} aChangedUser Changed user object.
 * @extends {goog.events.Event}
 * @constructor
 */
rflect.cal.ui.SettingsPane.SaveUserEvent = function(aUser, aChangedUser) {
  goog.events.Event.call(this, rflect.cal.ui.SettingsPane.EventTypes.SAVE);

  this.user = aUser;
  this.changedUser = aChangedUser;
}
goog.inherits(rflect.cal.ui.SettingsPane.SaveUserEvent, goog.events.Event);


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME =
    goog.getCssName('goog-inline-block') + ' ' +
    goog.getCssName('event-pane-label') + ' ' +
    'label-fluid';


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.SettingsPane.BUTTON_CLASS_NAME =
    goog.getCssName('event-edit-pane-button');


/**
 * @enum {number}
 */
rflect.cal.ui.SettingsPane.PageIndexes = {
  MAIN: 0,
  CALENDARS: 1,
  ADVANCED: 2
};


/**
 * @override
 */
rflect.cal.ui.SettingsPane.prototype.isButtonDeleteEnabled = function() {
  return false;
};


/**
 * @type {Element}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.checkboxDebug_;


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.parentEl;


/**
 * Contents of 'calendars' tab. We need it because calendars tables are updated
 * on calendars actions.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.tabContents2_;


/**
 * Current page element index.
 * @type {number}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.viewIndex_;


/**
 * @type {boolean} Whether reload is needed to apply changed settings.
 */
rflect.cal.ui.SettingsPane.prototype.reloadIsNeeded_ = false;


/**
 * @return {Object} User object.
 */
rflect.cal.ui.SettingsPane.prototype.getUser = function() {
  return this.viewManager.user;
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Default tab contents.
 */
rflect.cal.ui.SettingsPane.prototype.createLanguageCont_ =
    function(aDom) {
  // Languages select.
  var labelLanguages = aDom.createDom('label', {
    'for': 'settings-languages',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME +
        ' event-pane-calendars-label'
  }, 'Languages');
  this.selectLanguages_ = aDom.createDom('select', {
    id: 'settings-languages'
  });

  goog.array.forEach(LANGUAGE_NAMES, function(aLocaleLangPair) {
    this.selectLanguages_.appendChild(aDom.createDom('option', {
      id: 'lang-' + aLocaleLangPair[0],
      className: '',
      value: aLocaleLangPair[0]
    }, aLocaleLangPair[1]));
  }, this);

  var languagesCont = aDom.createDom('div', {
    className: 'event-pane-cont'
    }, labelLanguages, rflect.dom.wrapSelect(this.selectLanguages_));
  this.selectLanguages_.parentNode.className += ' settings-pane-select';

  return languagesCont;
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
rflect.cal.ui.SettingsPane.prototype.createTable_ = function(aDom, aTableId,
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
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} "Calendars" button container.
 */
rflect.cal.ui.SettingsPane.prototype.createButtonCont_ =
    function(aDom) {
  var buttonCont = aDom.createDom('div', 'event-pane-cont');

  buttonCont.appendChild(this.buttonCalendars_.getElement());
  goog.dom.classes.add(this.buttonCalendars_.getElement(), 'button-next-pane',
      'button-minimal');
  this.buttonCalendars_.getElement().appendChild(aDom.createDom('i',
      ['octicon', 'icon-button', 'octicon-chevron-right', 'icon-next-pane']));

  return buttonCont;
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Logout button container.
 */
rflect.cal.ui.SettingsPane.prototype.createLogoutCont_ =
    function(aDom) {
  // Languages select.
  var labelLogout = aDom.createDom('label', {
    'for': 'settings-logout',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME +
        ' event-pane-calendars-label logged-label'
  }, 'Logged in as ', aDom.createDom('b', null, 
      this.viewManager.user['username']));
  var buttonLogout = aDom.createDom('a', {
    id: 'settings-logout',
    href: '/logout',
    className: 'goog-inline-block goog-flat-button cal-menu-button ' +
        'settings-pane-control'
  }, 'Logout');

  var logoutCont = aDom.createDom('div', {
    className: 'event-pane-cont event-pane-cont-last'
    }, labelLogout, buttonLogout);

  return logoutCont;
}


/**
 * Creates pair of calendars tables - 'my' and 'other' and attaches them to
 * given container.
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {Element} aParent Container to attach tables to.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.updateCalendarTables_ = function(aDom,
    aParent){
  // We need to remove all previous table containers, by class selector, because
  // maybe in future there will be more than 2 classifications.
  goog.array.forEach(aParent.querySelectorAll('.' +
      goog.getCssName('calendars-outer-cont')), function(el) {
    goog.dom.removeNode(el);
  });

  var myCalendarsTable = this.createCalendarsTable_(aDom, true);
  if (myCalendarsTable) {
    var myCalendarsSubCont = aDom.createDom('div',
        goog.getCssName('calendars-cont'),  myCalendarsTable);
    var myCalendarsCont = aDom.createDom('div',
        [goog.getCssName('event-pane-cont'),
        goog.getCssName('calendars-outer-cont')],
        'My calendars', myCalendarsSubCont);
    aParent.appendChild(myCalendarsCont);
  }

  var otherCalendarsTable = this.createCalendarsTable_(aDom, false);
  if (otherCalendarsTable) {
    var otherCalendarsSubCont = aDom.createDom('div',
        goog.getCssName('calendars-cont'), otherCalendarsTable);
    var otherCalendarsCont = aDom.createDom('div',
        [goog.getCssName('event-pane-cont'),
        goog.getCssName('calendars-outer-cont')],
        'Other calendars', otherCalendarsSubCont);
    aParent.appendChild(otherCalendarsCont);
  }

}


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {boolean} aMy Whether "my" calendar list is built.
 * @return {Element} Calendars list table
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.createCalendarsTable_ =
    function(aDom, aMy) {
  var calendars = [];
  //Calendars pane may not yet exist.
  var currentCalendar = this.calendarsPane_ &&
      this.calendarsPane_.getCurrentCalendar();

  this.eventManager.forEachCalendar(function(calendar){
    if (calendar.own && aMy || !calendar.own && !aMy)
      //Use updated version of calendar if we were editing it.
      if (currentCalendar && currentCalendar.id == calendar.id)
        calendars.push(currentCalendar);
      else
        calendars.push(calendar);
  });

  if (aMy && this.calendarsPane_)
    Array.prototype.push.apply(calendars,
        this.calendarsPane_.getNewCalendars());

  return calendars.length ?
      this.createTable_(aDom, null, goog.getCssName('calendars-table'),
      calendars.length, 2, goog.getCssName('calendar-row'),
      goog.partial(rflect.cal.ui.SettingsPane.createCalendarsTd_,
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
rflect.cal.ui.SettingsPane.createCalendarsTd_ =
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
rflect.cal.ui.SettingsPane.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.settingspane.settingsPane({
    id: this.getId(),
    includeOuterHTML: opt_outerHTML
  });
};


/**
 * @override
 */
rflect.cal.ui.SettingsPane.prototype.enterDocument = function() {
  this.buttonCalendars_.decorate(this.getDomHelper().getElement('button-to-calendars'));

  this.selectLanguages_ = this.getDomHelper().getElement('settings-languages');
  this.selectThemes_ = this.getDomHelper().getElement('settings-themes');

  this.checkboxDebug_ = this.getDomHelper().getElement('settings-debug-mode');
  rflect.cal.ui.SettingsPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonBack2, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonPrimary1, goog.ui.Component.EventType.ACTION,
      this.onSaveUser_, false, this)
      .listen(this.buttonPrimary2, goog.ui.Component.EventType.ACTION,
      this.onSaveUser_, false, this)
      .listen(this.buttonCalendars_,
      goog.ui.Component.EventType.ACTION, this.onShowCalendarsAction_, false,
      this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this)

      .listen(this.viewManager,
          rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
          this.onBeforePageChange_, false, this)
}


/**
 * Page change handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event
 * object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onBeforePageChange_ = function(aEvent) {
  if (aEvent.currentScreen == this){
    this.displayValues();
    this.resetMomentumScroller();
  }
}


/**
 * Shows calendars pane and lazily instantiates it at the first
 * time.
 * @param {boolean} aShow Whether to show settings pane.
 */
rflect.cal.ui.SettingsPane.prototype.showCalendarsPane = function(aShow) {
  if (!this.calendarsPane_) {
    this.calendarsPane_ = new rflect.cal.ui.CalendarsPane(this.viewManager,
        this.timeManager, this.eventManager, this.containerSizeMonitor,
        this.transport);
    this.addChild(this.calendarsPane_);
  }

  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this.calendarsPane_,
      aShow));
}


/**
 * Settings pane link calendar update listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarUpdate_ =
    function(aEvent) {
  this.updateCalendarTables_(this.getDomHelper(), this.tabContents2_);
}


/**
 * 'New calendar' button listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onShowCalendarsAction_ =
    function(aEvent) {

  this.showCalendarsPane(true);

  aEvent.target.setFocused(false);

  aEvent.preventDefault();
}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.viewManager.isVisible(this)) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      this.onSaveUser_();

    }
  }
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.SettingsPane.prototype.onCancel_ = function() {
  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
}


/**
 * Save settings action listener.
 */
rflect.cal.ui.SettingsPane.prototype.onSaveUser_ = function() {
  let {
    valid,
    reloadIsNeeded,
    originalUser,
    changedUser
  } = this.scanValues();
  if (valid) {
    this.transport.saveUserAsync(changedUser, reloadIsNeeded);
    this.dispatchEvent(new rflect.cal.ui.SettingsPane.SaveUserEvent(
        originalUser, changedUser));
    this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this, false));
  }
}


/**
 * Displays settings in form.
 */
rflect.cal.ui.SettingsPane.prototype.displayValues = function() {
  this.selectLanguages_.value = this.getUser()['settings']['language'] ||
      goog.LOCALE;
  this.checkboxDebug_.checked = !!this.getUser()['settings']['debug'];
  this.selectThemes_.value = this.getUser()['settings']['visualTheme'] ||
      rflect.cal.i18n.Symbols.VISUAL_THEME_NAMES[1][0];
};


/**
 * Scans settings from form.
 * @return {Object} Whether input is valid.
 */
rflect.cal.ui.SettingsPane.prototype.scanValues = function() {
  var valid = true;
  var reloadIsNeeded = false;
  var changedUser = goog.object.unsafeClone(this.getUser());
  if (valid) {
    changedUser['settings']['language'] = this.selectLanguages_.value;
    changedUser['settings']['debug'] = this.checkboxDebug_.checked;
    changedUser['settings']['visualTheme'] = this.selectThemes_.value;

    reloadIsNeeded = this.getUser()['settings']['language'] !=
        changedUser['settings']['language'] ||
        this.getUser()['settings']['debug'] !=
        changedUser['settings']['debug'];
  }

  return {
    valid: valid,
    reloadIsNeeded: reloadIsNeeded,
    originalUser: this.getUser(),
    changedUser: changedUser
  }
};


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.SettingsPane.prototype.disposeInternal = function() {
  this.checkboxDebug_ = null;

  rflect.cal.ui.SettingsPane.superClass_.disposeInternal.call(this);
};


