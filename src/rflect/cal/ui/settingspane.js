/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Settings pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.SettingsPane');
goog.provide('rflect.cal.ui.SettingsPane.EventTypes');

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
goog.require('rflect.cal.events.EventManager');
goog.require('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.require('rflect.cal.i18n.Symbols');
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
   * List of user's own calendars, for UI.
   * @type {Array.<rflect.cal.events.Calendar>}
   * @private
   */
  this.calendarsListMy_ = [];

  /**
   * List of calendars user is subscribed to, for UI.
   * @type {Array.<rflect.cal.events.Calendar>}
   * @private
   */
  this.calendarsListOther_ = [];

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
  this.addChild(this.buttonSave1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonCancel2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));

  this.addChild(this.buttonNewCalendar_ = new goog.ui.Button(
      'New calendar',
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonDeleteCalendar_ = new goog.ui.Button(
      'Delete calendar',
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.checkboxDebug_ = new rflect.ui.Checkbox());
};
goog.inherits(rflect.cal.ui.SettingsPane, goog.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.SettingsPane.EventTypes = {
  CANCEL: 'cancel',
  SAVE: 'save',
  DELETE: 'delete',
  SAVE_CALENDAR: 'savecalendar',
  DELETE_CALENDAR: 'deletecalendar'
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

  /*var headerCont = dom.createDom('div',
      goog.getCssName('event-edit-pane-header-cont'),
      dom.createDom('h3', goog.getCssName('event-edit-pane-header'),
      'Event edit'));*/

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
      this.buttonCancel1_.getElement(),
      this.buttonSave1_.getElement());
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Lower button container.
 */
rflect.cal.ui.SettingsPane.prototype.createSettingsPaneButtonsLower_ =
    function(aDom) {

  return aDom.createDom('div',
      [goog.getCssName('settings-pane-buttons'),
      goog.getCssName('settings-pane-buttons-lower'),
      goog.getCssName('goog-inline-block')],
      this.buttonCancel2_.getElement(),
      this.buttonSave2_.getElement());
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

  var tbody = aDom.createDom('tbody');
  var table = aDom.createDom('table', {
    id: aTableId,
    className: aTableClassName
  }, tbody);

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

  var myCalendarsTable = this.createCalendarsTable_(aDom, true);
  var myCalendarsSubCont = aDom.createDom('div',
      goog.getCssName('calendars-cont'),  myCalendarsTable);
  var myCalendarsCont = aDom.createDom('div',
      goog.getCssName('event-edit-pane-cont'),
      'My calendars', myCalendarsSubCont);
      
  var otherCalendarsTable = this.createCalendarsTable_(aDom, false);
  var otherCalendarsSubCont = aDom.createDom('div',
      goog.getCssName('calendars-cont'), otherCalendarsTable);
  var otherCalendarsCont = aDom.createDom('div',
      goog.getCssName('event-edit-pane-cont'),
      'Other calendars', otherCalendarsSubCont);

  return aDom.createDom('div', ['tabs-content', 'settings-tab-content'],
      buttonsCont, myCalendarsCont, otherCalendarsCont);
}


/**
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {boolean} aMy Whether "my" calendar list is built.
 * @return {Element} Calendars list table
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.createCalendarsTable_ = 
    function(aDom, aMy) {
  var calendars = aMy ? this.calendarsListMy_ : this.calendarsListOther_;

  calendars.length = 0;

  this.eventManager_.forEachCalendar(function(calendar){
    if (calendar.own && aMy || !calendar.own && !aMy)
      calendars.push(calendar);
  });

  return this.createTable_(aDom, null, goog.getCssName('calendars-table'),
      calendars.length, 2, goog.getCssName('calendar-row'),
      goog.partial(rflect.cal.ui.SettingsPane.createCalendarsTd_, aMy,
      calendars));
}


/**
 * @param {boolean} aMy Whether "my" calendar list is built.
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
    function(aMy, aCalendars, aDom, aTd, aRowIndex, aColIndex) {
  var calendar = aCalendars[aRowIndex];

  switch (aColIndex) {
    case 0: {
      aTd.className = goog.getCssName('listitem-cont') + ' ' +
          goog.getCssName('name-cell');
      var link = aDom.createDom('a', {
        className: goog.getCssName('settings-link') + ' ' +
            goog.getCssName('cal-link'),
        id: (aMy ? 'calendar-my-' : 'calendar-other-') + aRowIndex,
        href: rflect.cal.ui.SettingsPane.HOLLOW_LINK_HREF
      }, calendar.name);
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
      .listen(this.buttonSave1_,
      goog.ui.Component.EventType.ACTION, this.onSave_, false, this)
      .listen(this.buttonSave2_, goog.ui.Component.EventType.ACTION,
      this.onSave_, false, this)
      .listen(this.buttonDeleteCalendar_,
      goog.ui.Component.EventType.ACTION, this.onDelete_, false, this)
      .listen(this.buttonNewCalendar_,
      goog.ui.Component.EventType.ACTION, this.onNewCalendarAction_, false,
      this)

      .listen(this.tabBar_,
          goog.ui.Component.EventType.SELECT, this.onTabSelect_, false, this)

      .listen(this.getElement(),
          goog.events.EventType.CLICK, this.onLinkClick_, false, this)

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
  var index = rflect.string.getNumericIndex(id);

  if (goog.dom.classes.has(target, goog.getCssName('cal-link'))) {

    var isMy = /my/.test(id);
    this.onCalendarsListLinkClick_(index, isMy);

  } else if (goog.dom.classes.has(target, goog.getCssName('cal-list-link'))) {

    this.currentCalendar_ = null;
    this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDARS);

  } else if (goog.dom.classes.has(target, goog.getCssName('calendar-color'))) {

    this.onCalendarsColorLinkClick_(index);

  }

  aEvent.preventDefault();
}


/**
 * @param {number} aIndex Index of calendar in list.
 * @param {boolean} aIsMy Whether calendar is from "my" list.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onCalendarsListLinkClick_ =
    function(aIndex, aIsMy) {
  var calendarsLookup = aIsMy ? this.calendarsListMy_ :
      this.calendarsListOther_;

  var calendar = calendarsLookup[aIndex];

  this.currentCalendar_ = calendar;
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

  this.currentCalendar_ = this.eventManager_.createCalendar(
      randomColorCodeIndex);

  this.newCalendarMode_ = true;
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

      this.onSave_();

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

  if (this.viewIndex_ == rflect.cal.ui.SettingsPane.PageIndexes.CALENDAR_EDIT){
    this.buttonSave1_.setCaption('Save');
    this.buttonSave2_.setCaption('Save');

    this.calendarEditMode_ =  this.newCalendarMode_ = false;
  }
  if (aIndex == rflect.cal.ui.SettingsPane.PageIndexes.CALENDAR_EDIT){
    this.buttonSave1_.setCaption('Save calendar');
    this.buttonSave2_.setCaption('Save calendar');

    this.calendarEditMode_ = true;
  }

  this.getDomHelper().insertSiblingAfter(this.viewsElements_[aIndex],
      this.tabBar_.getElement());
  this.viewIndex_ = aIndex;
}


/**
 * Cancel action listener.
 */
rflect.cal.ui.SettingsPane.prototype.onCancel_ = function() {
  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SettingsPane.EventTypes.CANCEL))) {
    this.setVisible(false);
  }
}


/**
 * Save action listener.
 */
rflect.cal.ui.SettingsPane.prototype.onSave_ = function() {
  if (this.calendarEditMode_) {
    if (this.scanCalendarValues_()) {

      this.transport_.saveCalendarAsync(
          this.currentCalendar_);
      //TODO(alexk): calendars list is updated here
      this.switchContent_(rflect.cal.ui.SettingsPane.PageIndexes.CALENDARS);

    }
  } else {
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
}


/**
 * Delete action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.SettingsPane.prototype.onDelete_ = function(aEvent) {
  this.eventManager_.eventHolder.endWithDelete();

  this.transport_.deleteEventAsync(
      this.eventManager_.eventHolder.getBackUpEvent());

  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SettingsPane.EventTypes.DELETE))) {
    this.setVisible(false);
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

  rflect.cal.ui.SettingsPane.superClass_.disposeInternal.call(this);
};


