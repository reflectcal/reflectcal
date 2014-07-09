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
 * @extends {rflect.cal.ui.ExternalPane}
 */
rflect.cal.ui.SettingsPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  rflect.cal.ui.ExternalPane.call(this, aViewManager, aTimeManager, 
      aEventManager, aParentElement, aTransport);

  /**
   * Settings object.
   * @type {Object}
   */
  this.settings = goog.object.clone(SETTINGS);

  // Building hierarchy of elements.
  this.addChild(this.tabBar_ = new
      goog.ui.TabBar(goog.ui.TabBar.Location.START));

  this.tab1_ = new goog.ui.Tab('Main');
  this.tab2_ = new goog.ui.Tab('Calendars');
  this.tab3_ = new goog.ui.Tab('Advanced');

  this.tabBar_.addChild(this.tab1_);
  this.tabBar_.addChild(this.tab2_);
  this.tabBar_.addChild(this.tab3_);

  /**
   * Views elements, pages.
   * @type {Array.<Element>}
   * @private
   */
  this.viewsElements_ = [];

  this.addChild(this.buttonNewCalendar_ = new goog.ui.Button(
      'New calendar',
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.checkboxDebug_ = new rflect.ui.Checkbox());

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
 * Event that is fired after saving of settings.
 * @param {Object} aSettings Settings object.
 * @param {boolean} aChanged Whether settings were changed.
 * @extends {goog.events.Event}
 * @constructor
 */
rflect.cal.ui.SettingsPane.SaveSettingsEvent = function(aSettings, aChanged) {
  goog.events.Event.call(this, rflect.cal.ui.SettingsPane.EventTypes.SAVE);

  this.settings = aSettings;
  this.settingsChanged = aChanged;
}
goog.inherits(rflect.cal.ui.SettingsPane.SaveSettingsEvent, goog.events.Event);


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME =
    goog.getCssName('goog-inline-block') + ' ' +
    goog.getCssName('event-edit-pane-label') + ' ' +
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
 * @override
 */
rflect.cal.ui.SettingsPane.prototype.createBody =
    function(aDom) {

  var body = aDom.createDom('div', goog.getCssName('settings-body'));

  var defaultTabContent = this.createTabContents1_(aDom);

  var tabBarEl = this.tabBar_.getElement();
  this.tab1_.render(tabBarEl);
  this.tab2_.render(tabBarEl);
  this.tab3_.render(tabBarEl);

  this.tabBar_.setSelectedTabIndex(0);

  body.appendChild(tabBarEl);
  body.appendChild(defaultTabContent);

  this.viewsElements_.push(defaultTabContent);
  this.viewsElements_.push(this.createTabContents2_(aDom));
  this.viewsElements_.push(this.createTabContents3_(aDom));

  return body;
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Default tab contents.
 */
rflect.cal.ui.SettingsPane.prototype.createTabContents1_ =
    function(aDom) {
  // Languages select.
  var labelLanguages = aDom.createDom('label', {
    'for': 'settings-languages',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME
  }, 'Languages');
  this.selectLanguages_ = aDom.createDom('select', {
    id: 'settings-languages',
    className: goog.getCssName('event-cal-select') + ' ' +
      goog.getCssName('event-edit-pane-cal-select')
    });

  goog.array.forEach(LANGUAGE_NAMES, function(aLocaleLangPair) {
    this.selectLanguages_.appendChild(aDom.createDom('option', {
      id: 'lang-' + aLocaleLangPair[0],
      className: '',
      value: aLocaleLangPair[0]
    }, aLocaleLangPair[1]));
  }, this);

  var languagesCont = aDom.createDom('div', {
    className: goog.getCssName('event-edit-pane-cont')
    }, labelLanguages, rflect.dom.wrapControl(this.selectLanguages_));

  return aDom.createDom('div', [goog.getCssName('tabs-content'), goog.getCssName('settings-tab-content')],
      languagesCont);
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
 * @return {Element} "Calendars" tab contents.
 */
rflect.cal.ui.SettingsPane.prototype.createTabContents2_ =
    function(aDom) {
  var buttonsCont = aDom.createDom('div', [goog.getCssName('settings-pane-buttons'),
      goog.getCssName('settings-pane-buttons-inner'), goog.getCssName('goog-inline-block')]);

  buttonsCont.appendChild(this.buttonNewCalendar_.getElement());
  goog.dom.classes.add(this.buttonNewCalendar_.getElement(),
      rflect.cal.ui.SettingsPane.BUTTON_CLASS_NAME);

  this.tabContents2_ = aDom.createDom('div', [goog.getCssName('tabs-content'),
      goog.getCssName('settings-tab-content')], buttonsCont);

  this.updateCalendarTables_(aDom, this.tabContents2_);

  return this.tabContents2_;
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
        [goog.getCssName('event-edit-pane-cont'),
        goog.getCssName('calendars-outer-cont')],
        'My calendars', myCalendarsSubCont);
    aParent.appendChild(myCalendarsCont);
  }

  var otherCalendarsTable = this.createCalendarsTable_(aDom, false);
  if (otherCalendarsTable) {
    var otherCalendarsSubCont = aDom.createDom('div',
        goog.getCssName('calendars-cont'), otherCalendarsTable);
    var otherCalendarsCont = aDom.createDom('div',
        [goog.getCssName('event-edit-pane-cont'),
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
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} "Advanced" tab contents.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.createTabContents3_ = function(aDom) {
  var labelDebug = aDom.createDom('label', {
    'for': 'settings-debug-mode',
    className: 'goog-inline-block event-edit-pane-label'
  }, 'Debug mode');
  var debugSubCont = aDom.createDom('span', null, labelDebug,
      this.checkboxDebug_.getElement());
  this.checkboxDebug_.setLabel(debugSubCont);
  var debugCont = aDom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('description-cont') + ' ' +
        goog.getCssName('event-edit-pane-cont')
  }, debugSubCont);

  return aDom.createDom('div', [goog.getCssName('tabs-content'),
      goog.getCssName('settings-tab-content')], debugCont);
}


/**
 * @override
 */
rflect.cal.ui.SettingsPane.prototype.enterDocument = function() {
  rflect.cal.ui.SettingsPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonBack1,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonBack2, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonSave1, goog.ui.Component.EventType.ACTION, 
      this.onSaveSettings_, false, this)
      .listen(this.buttonSave2, goog.ui.Component.EventType.ACTION,
      this.onSaveSettings_, false, this)
      .listen(this.buttonNewCalendar_,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)

      .listen(this.tabBar_,
      goog.ui.Component.EventType.SELECT, this.onTabSelect_, false, this)

      .listen(this.getElement(),
      goog.events.EventType.CLICK, this.onCalendarLinkClick_, false, this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this)

      .listen(this.showBehavior,
      rflect.cal.ui.PaneShowBehavior.EventTypes.BEFORE_SHOW, function(){
        this.displayValues();
      }, false, this);
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
rflect.cal.ui.SettingsPane.prototype.showCalendarsPane = function(aShow,
    opt_calendar, opt_newCalendarMode) {
  if (!this.calendarsPane_) {
    this.calendarsPane_ = new rflect.cal.ui.CalendarsPane(this.viewManager,
        this.timeManager, this.eventManager,
        this.getDomHelper().getElement('main-container'), this.transport);
    this.addChild(this.calendarsPane_);

    // Save settings handler is in view manager.
    this.getHandler().listen(this.calendarsPane_,
        rflect.cal.ui.CalendarsPane.EventTypes.CANCEL,
        this.onCalendarsPaneCancel_, false, this)
        .listen(this.calendarsPane_,
        rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_DELETE,
        this.onCalendarsPaneDelete_, false, this)
        .listen(this.calendarsPane_,
        rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
        this.onCalendarUpdate_, false, this);
  }

  if (aShow) {
    this.calendarsPane_.setCurrentCalendar(opt_calendar);
    this.calendarsPane_.setNewCalendarMode(opt_newCalendarMode);
  }
  this.calendarsPane_.getShowBehavior().setVisible(aShow);
  this.getShowBehavior().setVisible(!aShow);
}


/**
 * Calendars pane cancel listener.
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarsPaneCancel_ = function() {
  this.showCalendarsPane(false);
}


/**
 * Calendars pane delete listener.
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarsPaneDelete_ = function() {
  this.showCalendarsPane(false);
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
 * Settings pane link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarLinkClick_ = function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);

  if (!target.tagName || target.tagName.toLowerCase() != 'button')
    return;

  if (goog.dom.classes.has(target, goog.getCssName('cal-link'))) {
    var id = target.id;
    aEvent.preventDefault();

    if (!id)
      return;

    var calendarId = rflect.string.getIdWithoutPrefix(id,
        rflect.cal.predefined.CALENDAR_SETTINGS_LIST_PREFIX);

    if (!(calendarId in this.eventManager.calendars) ||
        this.eventManager.calendarIsInProgress(calendarId))
      return;

    this.showCalendarsPane(true,
        this.eventManager.calendars[calendarId].clone(), false);

  }
}


/**
 * 'New calendar' button listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onNewCalendarAction_ =
    function(aEvent) {
  var randomColorCodeIndex = Math.round(
      Math.random() * (rflect.cal.i18n.PREDEFINED_COLOR_CODES.length - 1));

  this.showCalendarsPane(true, new rflect.cal.events.Calendar('', '',
      rflect.cal.i18n.PREDEFINED_COLOR_CODES[randomColorCodeIndex]), true);

  aEvent.target.setFocused(false);

}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.showBehavior.isVisible()) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      this.onSaveSettings_();

    }
  }
}


/**
 * Tab select listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.SettingsPane.prototype.onTabSelect_ = function(aEvent) {
  var selectedTabIndex = aEvent.currentTarget.getSelectedTabIndex();

  this.switchContent_(selectedTabIndex);
}


/**
 * @param {number} aIndex Index of view element to switch to.
 */
rflect.cal.ui.SettingsPane.prototype.switchContent_ = function(aIndex) {
  var tabContent =
      this.getDomHelper().getNextElementSibling(this.tabBar_.getElement());

  this.getDomHelper().removeNode(tabContent);

  this.getDomHelper().insertSiblingAfter(this.viewsElements_[aIndex],
      this.tabBar_.getElement());
  this.viewIndex_ = aIndex;
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.SettingsPane.prototype.onCancel_ = function() {
  if (this.calendarEditMode_)
      this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDARS);
    else
      if (this.dispatchEvent(new goog.events.Event(
          rflect.cal.ui.SettingsPane.EventTypes.CANCEL)))
        this.showBehavior.setVisible(false);

}


/**
 * Save settings action listener.
 */
rflect.cal.ui.SettingsPane.prototype.onSaveSettings_ = function() {

  if (this.scanValues()) {

    this.transport.saveSettingsAsync(this.settings, this.reloadIsNeeded_);

    if (this.dispatchEvent(new rflect.cal.ui.SettingsPane.SaveSettingsEvent(
        this.settings, false))) {
      this.showBehavior.setVisible(false);
    }

  }

}


/**
 * Displays settings in form.
 */
rflect.cal.ui.SettingsPane.prototype.displayValues = function() {

  var languageIndex = goog.array.findIndex(LANGUAGE_NAMES,
      function(aLocaleLangPair){
    //SETTINGS.language could be undefined, so rely on hardcoded locale.
    return SETTINGS.language ? aLocaleLangPair[0] == SETTINGS.language :
        aLocaleLangPair[0] == goog.LOCALE;
  });

  this.selectLanguages_.selectedIndex = languageIndex;

  this.checkboxDebug_.setChecked(this.settings.debug);
};


/**
 * Scans settings from form.
 * @return {boolean} Whether input is valid.
 */
rflect.cal.ui.SettingsPane.prototype.scanValues = function() {
  var valid = true;
  if (valid) {
    this.settings.language = this.selectLanguages_.value;
    this.settings.debug = this.checkboxDebug_.isChecked();

    this.reloadIsNeeded_ = this.settings.language != SETTINGS.language ||
        this.settings.debug != SETTINGS.debug;
  }

  return valid;
};


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.SettingsPane.prototype.disposeInternal = function() {
  this.tabContents2_ = null;

  rflect.cal.ui.SettingsPane.superClass_.disposeInternal.call(this);
};


