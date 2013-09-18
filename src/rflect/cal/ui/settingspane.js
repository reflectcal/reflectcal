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
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');
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
 * @extends {goog.ui.Component}
 */
rflect.cal.ui.SettingsPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
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

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @private
   */
  this.transport_ = aTransport;

  this.parentEl_ = aParentElement;

  /**
   * List of user's newly created calendars, without id.
   * @see {rflect.cal.ui.SettingsPane#onSaveCalendar_}
   *
   * @type {Array.<rflect.cal.events.Calendar>}
   * @private
   */
  this.newCalendars_ = [];

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

  this.addChild(this.buttonCancel1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSaveSettings1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonCancel2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSaveSettings2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));

  this.addChild(this.buttonNewCalendar_ = new goog.ui.Button(
      'New calendar',
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSaveCalendar1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSaveCalendar2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonDeleteCalendar_ = new goog.ui.Button(
      'Delete calendar',
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.checkboxDebug_ = new rflect.ui.Checkbox());

  this.buttonSaveCalendar1_.setVisible(false);
  this.buttonSaveCalendar2_.setVisible(false);
};
goog.inherits(rflect.cal.ui.SettingsPane, goog.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.SettingsPane.EventTypes = {
  CANCEL: 'settingsCancel',
  SAVE: 'save',
  CALENDAR_UPDATE: 'calendarUpdate'
};


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME =
    goog.getCssName('goog-inline-block') + ' ' +
    goog.getCssName('event-edit-pane-label');


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.SettingsPane.BUTTON_CLASS_NAME =
    goog.getCssName('event-edit-pane-button');


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.SettingsPane.HOLLOW_LINK_HREF = 'javascript:void 0';


/**
 * @type {number}
 * @const
 */
rflect.cal.ui.SettingsPane.PALETTE_ROWS_NUMBER = 1;


/**
 * @type {number}
 * @const
 */
rflect.cal.ui.SettingsPane.PALETTE_COLS_NUMBER = 3;


/**
 * @enum {number}
 */
rflect.cal.ui.SettingsPane.PageIndexes = {
  MAIN: 0,
  CALENDARS: 1,
  ADVANCED: 2,
  CALENDAR_EDIT: 3
};


/**
 * Marks input as invalid or removes that mark.
 * @param {boolean} aValid Whether input is valid.
 * @param {Element} aInputEl Input element.
 */
rflect.cal.ui.SettingsPane.markInput = function(aValid, aInputEl) {
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
rflect.cal.ui.SettingsPane.prototype.visible_ = false;


/**
 * Whether we're creating new calendar.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.newCalendarMode_ = false;


/**
 * Whether we're editing some calendar.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.calendarEditMode_ = false;


/**
 * Calendar that is being edited at the moment.
 * @type {rflect.cal.events.Calendar}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.currentCalendar_;


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.parentEl_;


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
 * @return {boolean} Whether the component is visible.
 */
rflect.cal.ui.SettingsPane.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * @override
 */
rflect.cal.ui.SettingsPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  /**@const*/
  var labelClassName = goog.getCssName('goog-inline-block') + ' ' +
      goog.getCssName('event-edit-pane-label');

  this.forEachChild(function(child){
    child.createDom();
    if (child instanceof goog.ui.Button)
      goog.dom.classes.add(child.getElement(),
          goog.getCssName('event-edit-pane-button'));
  });

  goog.array.forEach([this.buttonSaveSettings1_, this.buttonSaveSettings2_,
      this.buttonSaveCalendar1_, this.buttonSaveCalendar2_],
      function(button){
    goog.dom.classes.add(button.getElement(),
        goog.getCssName('emphasis-button'));
  });

  goog.dom.classes.add(this.buttonDeleteCalendar_.getElement(),
      goog.getCssName('event-edit-pane-button-delete'));

  var settingsHeader = this.createSettingsHeader_(dom);
  var settingsPaneButtonsUpper = this.createSettingsPaneButtonsUpper_(dom);
  var settingsBody = this.createSettingsBody_(dom);
  var settingsPaneButtonsLower = this.createSettingsPaneButtonsLower_(dom);

  var root = dom.createDom('div', {
      className: goog.getCssName('settings-pane'),
      id: 'settings-pane'
    }, settingsHeader, settingsPaneButtonsUpper, settingsBody,
    settingsPaneButtonsLower);

  this.setElementInternal(root);
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Header.
 */
rflect.cal.ui.SettingsPane.prototype.createSettingsHeader_ = function(aDom) {
  return aDom.createDom('div', [
      goog.getCssName('settings-pane-header-cont'),
      goog.getCssName('goog-inline-block')],
      aDom.createDom('h3', goog.getCssName('event-edit-pane-header'),
      'Settings'));
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Upper button container.
 */
rflect.cal.ui.SettingsPane.prototype.createSettingsPaneButtonsUpper_ =
    function(aDom) {

  return aDom.createDom('div',
      [goog.getCssName('settings-pane-buttons'),
      goog.getCssName('settings-pane-buttons-upper'),
      goog.getCssName('goog-inline-block')],
      this.buttonSaveSettings1_.getElement(),
      this.buttonSaveCalendar1_.getElement(),
      this.buttonCancel1_.getElement()
      );
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Lower button container.
 */
rflect.cal.ui.SettingsPane.prototype.createSettingsPaneButtonsLower_ =
    function(aDom) {

  return aDom.createDom('div',
      [goog.getCssName('settings-pane-buttons'),
      goog.getCssName('settings-pane-buttons-lower')],
      this.buttonSaveSettings2_.getElement(),
      this.buttonSaveCalendar2_.getElement(),
      this.buttonCancel2_.getElement()
      );
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Settings body.
 */
rflect.cal.ui.SettingsPane.prototype.createSettingsBody_ =
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

  this.viewsElements_.push(this.createCalendarEditForm_(aDom));

  return body;
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Default tab contents.
 */
rflect.cal.ui.SettingsPane.prototype.createTabContents1_ =
    function(aDom) {
  // Calendars select.
  var labelLanguages = aDom.createDom('label', {
    'for': 'settings-languages',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME
  }, 'Languages');
  var selectLanguages = aDom.createDom('select', {
    id: 'settings-languages',
    className: goog.getCssName('event-cal-select') + ' ' +
      goog.getCssName('event-edit-pane-cal-select')
    });
  var languagesCont = aDom.createDom('div', {
    className: goog.getCssName('event-edit-pane-cont')
    }, labelLanguages, selectLanguages);

  return aDom.createDom('div', ['tabs-content', 'settings-tab-content'],
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
  var buttonsCont = aDom.createDom('div', ['settings-pane-buttons',
      'settings-pane-buttons-inner', 'goog-inline-block']);

  buttonsCont.appendChild(this.buttonNewCalendar_.getElement());
  goog.dom.classes.add(this.buttonNewCalendar_.getElement(),
      rflect.cal.ui.SettingsPane.BUTTON_CLASS_NAME);

  this.tabContents2_ = aDom.createDom('div', ['tabs-content',
      'settings-tab-content'], buttonsCont);

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
  var currentCalendar = this.currentCalendar_;

  this.eventManager_.forEachCalendar(function(calendar){
    if (calendar.own && aMy || !calendar.own && !aMy)
      //Use updated version of calendar if we were editing it.
      if (currentCalendar && currentCalendar.id == calendar.id)
        calendars.push(currentCalendar);
      else
        calendars.push(calendar);
  });

  if (aMy)
    Array.prototype.push.apply(calendars, this.newCalendars_);

  return calendars.length ?
      this.createTable_(aDom, null, goog.getCssName('calendars-table'),
      calendars.length, 2, goog.getCssName('calendar-row'),
      goog.partial(rflect.cal.ui.SettingsPane.createCalendarsTd_,
      this.eventManager_, calendars)) :
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
            goog.getCssName('cal-link'),
        href: rflect.cal.ui.SettingsPane.HOLLOW_LINK_HREF
      };
      if (inProgress)
        linkParameters.className +=
            ' ' + goog.getCssName('cal-link-in-progress');
      if (calendar.id) linkParameters.id =
          rflect.cal.predefined.CALENDAR_SETTINGS_LIST_PREFIX + calendar.id;

      var link = aDom.createDom('a', linkParameters, calendar.getUIName());
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
 * @return {Element} Calendar edit form
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.createCalendarEditForm_ = function(aDom) {
  var buttonsCont = aDom.createDom('div', ['settings-pane-buttons',
        'settings-pane-buttons-inner', 'goog-inline-block']);

  goog.dom.classes.add(this.buttonDeleteCalendar_.getElement(),
      rflect.cal.ui.SettingsPane.BUTTON_CLASS_NAME,
      goog.getCssName('event-edit-pane-button-delete'));
  var backLink = aDom.createDom('a', {
    className: goog.getCssName('goog-inline-block') +
        ' ' + goog.getCssName('settings-link') + ' ' +
        goog.getCssName('cal-list-link'),
    href: rflect.cal.ui.SettingsPane.HOLLOW_LINK_HREF
  }, '< Back to calendars');

  buttonsCont.appendChild(backLink);
  buttonsCont.appendChild(this.buttonDeleteCalendar_.getElement());

  var labelName = aDom.createDom('label', {
    'for': 'ep-event-name-input',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME
  }, 'Name');
  this.inputCalendarName_ = aDom.createDom('input', {
    'type': 'text',
    id: 'sp-calendar-name-input',
    className: 'ep-event-name-input',
    autofocus: 'autofocus',
    placeholder: rflect.cal.i18n.Symbols.NO_NAME_EVENT
  });
  var nameCont = aDom.createDom('div',
      [goog.getCssName('event-name-input-cont'),
        goog.getCssName('event-edit-pane-cont')],
      labelName, this.inputCalendarName_);

  var labelColor = aDom.createDom('label', {
    'for': 'calendar-colors',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME + ' ' +
        goog.getCssName('calendar-colors-label')
  }, 'Colors');
  var colorPaletteTable = this.createColorsTable_(aDom);
  var colorsCont = aDom.createDom('div',
      [goog.getCssName('event-name-input-cont'),
        goog.getCssName('event-edit-pane-cont')],
      labelColor, colorPaletteTable);


  return aDom.createDom('div', ['tabs-content', 'settings-tab-content'],
      buttonsCont, nameCont, colorsCont);
}


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Calendars list table
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.createColorsTable_ =
    function(aDom) {
  return this.createTable_(aDom, 'calendar-colors',
      goog.getCssName('calendar-colors-table') + ' ' +
          goog.getCssName('goog-inline-block'),
      rflect.cal.ui.SettingsPane.PALETTE_ROWS_NUMBER,
      rflect.cal.ui.SettingsPane.PALETTE_COLS_NUMBER,
      null, rflect.cal.ui.SettingsPane.createColorsTd_);
 }


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {Element} aTd Td to decorate.
 * @param {number} aRowIndex Td row index.
 * @param {number} aColIndex Td col index.
 * @return {Element} Decorated calendars table td.
 * @private
 */
rflect.cal.ui.SettingsPane.createColorsTd_ = function(aDom, aTd, aRowIndex,
                                                      aColIndex) {
  var colorCodeIndex = aRowIndex *
      rflect.cal.ui.SettingsPane.PALETTE_COLS_NUMBER + aColIndex;

  var colorCode = rflect.cal.i18n.PREDEFINED_COLOR_CODES[colorCodeIndex];

  var colorLink = aDom.createDom('a', {
    id: 'calendar-color' + colorCodeIndex,
    className: goog.getCssName('calitem-color-cont') + ' ' +
        goog.getCssName('calendar-color') + ' ' + colorCode.eventClass,
    href: rflect.cal.ui.SettingsPane.HOLLOW_LINK_HREF
  });
  aTd.appendChild(colorLink);

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
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME
  }, 'Debug mode');
  var debugSubCont = aDom.createDom('span', null, labelDebug,
      this.checkboxDebug_.getElement());
  this.checkboxDebug_.setLabel(debugSubCont);
  var allDayCont = aDom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('description-cont') + ' ' +
        goog.getCssName('event-edit-pane-cont')
  }, debugSubCont);

  return aDom.createDom('div', ['tabs-content', 'settings-tab-content'],
      allDayCont);
}


/**
 * @override
 */
rflect.cal.ui.SettingsPane.prototype.enterDocument = function() {
  rflect.cal.ui.SettingsPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonCancel1_,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonCancel2_, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonSaveSettings1_, goog.ui.Component.EventType.ACTION, 
      this.onSaveSettings_, false, this)
      .listen(this.buttonSaveSettings2_, goog.ui.Component.EventType.ACTION,
      this.onSaveSettings_, false, this)
      .listen(this.buttonSaveCalendar1_, goog.ui.Component.EventType.ACTION,
      this.onSaveCalendar_, false, this)
      .listen(this.buttonSaveCalendar2_, goog.ui.Component.EventType.ACTION,
      this.onSaveCalendar_, false, this)
      .listen(this.buttonDeleteCalendar_,
      goog.ui.Component.EventType.ACTION, this.onDeleteCalendarAction_, false,
      this)
      .listen(this.buttonNewCalendar_,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)

      .listen(this.tabBar_,
          goog.ui.Component.EventType.SELECT, this.onTabSelect_, false, this)

      .listen(this.getElement(),
          goog.events.EventType.CLICK, this.onLinkClick_, false, this)

      .listen(this.transport_, rflect.cal.Transport.EventTypes.SAVE_CALENDAR,
          this.onSaveCalendarResponse_, false, this)
      .listen(this.transport_, rflect.cal.Transport.EventTypes.DELETE_CALENDAR,
          this.onDeleteCalendarResponse_, false, this)

      .listen(document,
          goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this);
};


/**
 * Settings pane link click listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onLinkClick_ = function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);

  if (!target.tagName || target.tagName.toLowerCase() != 'a')
    return;

  var id = target.id;

  if (goog.dom.classes.has(target, goog.getCssName('cal-link'))) {

    this.onCalendarsListLinkClick_(id);

  } else if (goog.dom.classes.has(target, goog.getCssName('cal-list-link'))) {

    this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDARS);

  } else if (goog.dom.classes.has(target, goog.getCssName('calendar-color'))) {

    var index = rflect.string.getNumericIndex(id);

    this.onCalendarsColorLinkClick_(index);

  }

  aEvent.preventDefault();
}


/**
 * @param {string} aUIId Ui id.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarsListLinkClick_ =
    function(aUIId) {

  if (!aUIId)
    return;

  var calendarId = rflect.string.getIdWithoutPrefix(aUIId,
      rflect.cal.predefined.CALENDAR_SETTINGS_LIST_PREFIX);

  if (!(calendarId in this.eventManager_.calendars) ||
      this.eventManager_.calendarIsInProgress(calendarId))
    return;

  this.currentCalendar_ = this.eventManager_.calendars[calendarId].clone();

  this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDAR_EDIT);
  this.displayCalendarValues_();

}


/**                                               \
 * 'New calendar' button listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onNewCalendarAction_ =
    function(aEvent) {
  var randomColorCodeIndex = Math.round(
      Math.random() * (rflect.cal.i18n.PREDEFINED_COLOR_CODES.length - 1));

  this.newCalendarMode_ = true;

  this.currentCalendar_ = new rflect.cal.events.Calendar('', '',
      rflect.cal.i18n.PREDEFINED_COLOR_CODES[randomColorCodeIndex]);

  this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDAR_EDIT);
  this.displayCalendarValues_();
}


/**
 * @param {number} aIndex Index of color in table.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarsColorLinkClick_ =
    function(aIndex) {
  this.currentCalendar_.colorCode =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES[aIndex];
  this.displayCalendarColor_(aIndex);
}


/**
 * Save calendar event listener.
 * @param {rflect.cal.Transport.SaveCalendar} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onSaveCalendarResponse_ =
    function(aEvent) {
  var calendar = aEvent.calendar;

  // New calendars that we store in list do not have an id, so we only could
  // identify them by direct equality.
  goog.array.remove(this.newCalendars_, calendar);

  this.updateCalendarTables_(this.getDomHelper(), this.tabContents2_);

  this.dispatchEvent(new goog.events.Event(
            rflect.cal.ui.SettingsPane.EventTypes.CALENDAR_UPDATE));
}


/**
 * Delete calendar button event listener.
 * @param {rflect.cal.Transport.DeleteCalendar} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onDeleteCalendarAction_ =
    function(aEvent) {
  this.eventManager_.deleteCalendar(this.currentCalendar_);

  this.transport_.deleteCalendarAsync(
        this.currentCalendar_);

  this.updateCalendarTables_(this.getDomHelper(), this.tabContents2_);

  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SettingsPane.EventTypes.CALENDAR_UPDATE))) {
    this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDARS);
  }
}


/**
 * Delete calendar remote operation listener.
 * @param {rflect.cal.Transport.DeleteCalendar} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onDeleteCalendarResponse_ =
    function(aEvent) {
  this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SettingsPane.EventTypes.CALENDAR_UPDATE));
}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.visible_) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      if (this.calendarEditMode_)
        this.onSaveCalendar_();
      else
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
  var enteringCalEditMode = aIndex ==
      rflect.cal.ui.SettingsPane.PageIndexes.CALENDAR_EDIT;

  this.getDomHelper().removeNode(tabContent);

  // We are leaving calendar edit mode.
  if (this.viewIndex_ == rflect.cal.ui.SettingsPane.PageIndexes.CALENDAR_EDIT){

    this.calendarEditMode_ =  this.newCalendarMode_ = false;
    this.currentCalendar_ = null;

  }

  // We are entering calendar edit mode.
  if (enteringCalEditMode){

    this.buttonDeleteCalendar_.setVisible(!this.newCalendarMode_);

    this.calendarEditMode_ = true;

  }

  //Hide generic save settings buttons when entering cal-edit view.
  this.buttonSaveSettings1_.setVisible(!enteringCalEditMode);
  this.buttonSaveSettings2_.setVisible(!enteringCalEditMode);
  //And opposite to calendar save buttons.
  this.buttonSaveCalendar1_.setVisible(enteringCalEditMode);
  this.buttonSaveCalendar2_.setVisible(enteringCalEditMode);

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
        this.setVisible(false);

}


/**
 * Save settings action listener.
 */
rflect.cal.ui.SettingsPane.prototype.onSaveSettings_ = function() {

  if (this.scanSettingsValues_()) {

    this.transport_.saveSettingsAsync();
    // Settings could change pretty anything - so to dispatch event here is
    // useful.
    if (this.dispatchEvent(new goog.events.Event(
        rflect.cal.ui.SettingsPane.EventTypes.SAVE))) {
      this.setVisible(false);
    }

  }

}


/**
 * Save calendar action listener.
 */
rflect.cal.ui.SettingsPane.prototype.onSaveCalendar_ = function() {
  if (this.scanCalendarValues_()) {

    if (this.newCalendarMode_)
      this.newCalendars_.push(this.currentCalendar_);

    this.transport_.saveCalendarAsync(
        this.currentCalendar_);
    // this.currentCalendar_ must be still actual here.
    this.updateCalendarTables_(this.getDomHelper(), this.tabContents2_);

    this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDARS);
  }
}


/**
 * Sets the visibility of the event pane and moves focus to the
 * event name input. Lazily renders the component if needed.
 * @param {boolean} visible Whether the pane should be visible.
 */
rflect.cal.ui.SettingsPane.prototype.setVisible = function(visible) {
  if (visible == this.visible_) {
    return;
  }

  // If the pane hasn't been rendered yet, render it now.
  if (!this.isInDocument()) {
    this.render(this.parentEl_);
  }

  //this.displaySettingsValues_();

  this.showElement_(visible);

  this.visible_ = visible;
};


/**
 * Shows or hides the pane element.
 * @param {boolean} visible Shows the element if true, hides if false.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.showElement_ = function(visible) {
  goog.style.showElement(this.getElement(), visible);
};


/**
 * Displays settings in form.
 */
rflect.cal.ui.SettingsPane.prototype.displaySettingsValues_ = function() {
  //this.buttonDeleteCalendar_.setVisible(!this.newCalendarMode_);

  //this.inputCalendarName_.value = settings.getSummary();
};


/**
 * Scans settings from form.
 * @return {boolean} Whether input is valid.
 */
rflect.cal.ui.SettingsPane.prototype.scanSettingsValues_ = function() {
  var valid = true;
  /*if (valid) {
    settings.setEndDate(endDateShim);
  }*/

  return valid;
};


/**
 * Displays calendar properties in form.
 */
rflect.cal.ui.SettingsPane.prototype.displayCalendarValues_ = function() {
  //this.buttonDeleteCalendar_.setVisible(!this.newCalendarMode_);

  this.inputCalendarName_.value = this.currentCalendar_.name;
  this.inputCalendarName_.placeholder = this.currentCalendar_.colorCode
      .getFullName();

  /** @preserveTry */
  try {
    this.inputCalendarName_.focus();
    this.inputCalendarName_.select();
  } catch(e) {
    // IE8- shows error that it couldn't set focus but nevertheless, sets it.
  }

  this.displayCalendarColor_(this.currentCalendar_.colorCode.id);
};


/**
 * Scans calendar values from form.
 * Color code is updated separately:
 * @see {rflect.cal.ui.SettingsPane#onCalendarsListLinkClick_}
 *
 * @return {boolean} Whether input is valid.
 *
 * Color code is set in
 * @see {rflect.cal.ui.SettingsPane#onCalendarsColorLinkClick_}
 */
rflect.cal.ui.SettingsPane.prototype.scanCalendarValues_ = function() {
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
rflect.cal.ui.SettingsPane.prototype.displayCalendarColor_ = function(aIndex) {
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
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.SettingsPane.prototype.disposeInternal = function() {
  this.tabContents2_ = null;

  rflect.cal.ui.SettingsPane.superClass_.disposeInternal.call(this);
};


