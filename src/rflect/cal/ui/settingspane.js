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
goog.require('rflect.ui.Checkbox');
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.EditDialog.ButtonCaptions');
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

  // Building hierarchy of elements.
  this.addChild(this.tabBar_ = goog.ui.TabBar(goog.ui.TabBar.Location.START));

  this.tab1_ = new goog.ui.Tab('Main');
  this.tab2_ = new goog.ui.Tab('Calendars');
  this.tab3_ = new goog.ui.Tab('Advanced');

  this.tabBar_.addChild(this.tab1_);
  this.tabBar_.addChild(this.tab2_);
  this.tabBar_.addChild(this.tab3_);

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
  this.addChild(this.checkboxDebug_ = rflect.ui.Checkbox());
};
goog.inherits(rflect.cal.ui.SettingsPane, goog.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.SettingsPane.EventTypes = {
  CANCEL: 'cancel',
  SAVE: 'save',
  DELETE: 'delete'
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
 * Displays dates in form.
 * @return {string} Date format with 4 digit year.
 */
rflect.cal.ui.SettingsPane.getDateFormatString = function() {
  return goog.i18n.DateTimeSymbols.DATEFORMATS[3].replace(/y+/, 'yyyy');
}


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
 * Whether event pane is in state when we're creating new event.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.newEventMode_ = false;


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.parentEl_;


/**
 * Start time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.startTimeAC_;


/**
 * End time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.endTimeAC_;


/**
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.selectCalendars_;


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
  goog.dom.classes.add(this.buttonDelete_.getElement(),
      goog.getCssName('event-edit-pane-button-delete'));

  var buttonsCont1 = dom.createDom('div',
      goog.getCssName('event-edit-pane-buttons'),
      this.buttonCancel1_.getElement(),
      this.buttonSave1_.getElement(),
      this.buttonDelete_.getElement());
  var buttonsCont2 = dom.createDom('div',
      goog.getCssName('event-edit-pane-buttons'),
      this.buttonCancel2_.getElement(),
      this.buttonSave2_.getElement());

  var labelName = dom.createDom('label', {
    'for': 'ep-event-name-input',
    className: labelClassName
  }, 'Name');
  this.inputName_ = dom.createDom('input', {
    'type': 'text',
    id: 'ep-event-name-input',
    className: 'ep-event-name-input',
    autofocus: 'autofocus',
    placeholder: rflect.cal.i18n.Symbols.NO_NAME_EVENT
  });
  var nameCont = dom.createDom('div',
    [goog.getCssName('event-name-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelName, this.inputName_);

  var labelStartDate = dom.createDom('label', {
    'for': 'event-start-date',
    className: labelClassName
  }, 'Date');
  this.inputStartDate_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-start-date',
    className: goog.getCssName('event-date-input')
  });
  this.inputStartTime_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-start-time',
    className: goog.getCssName('event-time-input')
  });

  this.inputEndDate_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-end-date',
    className: goog.getCssName('event-date-input')
  });
  this.inputEndTime_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-end-time',
    className: goog.getCssName('event-time-input')
  });

  var startInputCont = dom.createDom('div',
      [goog.getCssName('start-input-cont'),
        goog.getCssName('event-edit-pane-cont-inner')],
      labelStartDate, this.inputStartDate_, this.inputStartTime_,
      ' - ', this.inputEndDate_, this.inputEndTime_);

  var dateCont = dom.createDom('div',
    [goog.getCssName('date-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    startInputCont);

  var labelAllDay = dom.createDom('label', {
    'for': 'event-all-day',
    className: labelClassName
  }, 'All-day event');
  var allDaySubCont = dom.createDom('span', null, labelAllDay,
      this.checkboxAllDay_.getElement());
  this.checkboxAllDay_.setLabel(allDaySubCont);
  var allDayCont = dom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('description-cont') + ' ' +
      goog.getCssName('event-edit-pane-cont')
    }, allDaySubCont);

  // Calendars select.
  var labelCalendars = dom.createDom('label', {
    'for': 'event-calendars',
    className: labelClassName
  }, 'Calendar');
  var selectCalendarsEl = dom.createDom('select', {
      id: 'event-calendars',
      className: goog.getCssName('event-cal-select') + ' ' +
          goog.getCssName('event-edit-pane-cal-select')
    });
  this.selectCalendars_ = new rflect.cal.ui.CalendarsSelect(selectCalendarsEl,
      this.eventManager_);
  var calendarsCont = dom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('event-edit-pane-cont')
    }, labelCalendars, selectCalendarsEl);

  var labelDesc = dom.createDom('label', {
    'for': 'event-description',
    className: labelClassName + ' ' +
      goog.getCssName('event-description-label')
  }, 'Description');
  this.textAreaDesc_ = dom.createDom('textarea', {
    id: 'event-description',
      className: goog.getCssName('event-description')
  });
  var descCont = dom.createDom('div', [
    goog.getCssName('description-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelDesc, this.textAreaDesc_);

  var settingsHeader = this.createSettingsHeader_(dom);
  var settingsPaneButtonsUpper = this.createSettingsPaneButtonsUpper_(dom);
  var settingsBody = this.createSettingsBody_(dom);
  var settingsPaneButtonsLower = this.createSettingsPaneButtonsLower(dom);

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

  this.addChild(this.buttonCancel1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave1_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));

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

  this.addChild(this.buttonCancel2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave2_ = new goog.ui.Button(
      rflect.ui.Dialog.DefaultButtonCaptions.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));

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

  body.appendChild(this.tabBar_.getElement());
  body.appendChild(this.createTabContents1_());

  return body;
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @return {Element} Default tab contents.
 */
rflect.cal.ui.SettingsPane.prototype.createTabContents1_ =
    function(aDom) {
  // Calendars select.
  var labelLanguages = dom.createDom('label', {
    'for': 'settings-languages',
    className: rflect.cal.ui.SettingsPane.LABEL_CLASS_NAME
  }, 'Languages');
  var selectLanguages = dom.createDom('select', {
    id: 'settings-languages',
    className: goog.getCssName('event-cal-select') + ' ' +
      goog.getCssName('event-edit-pane-cal-select')
    });
  var languagesCont = dom.createDom('div', {
    className: goog.getCssName('event-edit-pane-cont')
    }, labelLanguages, selectLanguages);

  return aDom.createDom('div', ['tabs-content', 'settings-tab-content'],
      languagesCont);
}


/**
 * @param {!goog.dom.DomHelper} aDom Dom helper.
 * @param {Element} aSettingsBody Settings body.
 * @return {Element} "Calendars" tab contents.
 */
<div class="event-edit-pane-cont" id="calendars-my">My calendars:
          <div class="calendars-cont">

          <table class="calendars-table">
            <tbody>
              <tr class="calendar-row">
                <td class="listitem-cont name-cell">
                  <a class="settings-link">Red calendar</a>
                </td>
                <td class="color-cell">
                  <div class="calitem-color-cont calendar-color event-rect-red"></div>
                </td>
              </tr><tr class="calendar-row">
              <td class="listitem-cont name-cell">
                  <a class="settings-link">Blue calendar</a>
                </td>
                <td class="color-cell">
                  <div class="calitem-color-cont calendar-color event-rect-blue"></div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

        </div>
rflect.cal.ui.SettingsPane.prototype.createTabContents2_ =
    function(aDom) {
  var buttonsCont = aDom.createDom('div', ['settings-pane-buttons',
      'settings-pane-buttons-inner', 'goog-inline-block']);

  buttonsCont.appendChild(this.buttonNewCalendar_.getElement());
  goog.dom.classes.add(this.buttonNewCalendar_.getElement(),
      rflect.cal.ui.SettingsPane.BUTTON_CLASS_NAME);

  var myCalendarsTable = this.createTable;
  var myCalendarsSubCont = aDom.createDom('div',
      goog.getCssName('calendars-cont'), 'My calendars', myCalendarsTable);
  var myCalendarsCont = aDom.createDom('div',
      goog.getCssName('event-edit-pane-cont'),
      myCalendarsSubCont);
      
  var otherCalendarsTable = this.createTable;
  var otherCalendarsSubCont = aDom.createDom('div',
      goog.getCssName('calendars-cont'), 'My calendars', otherCalendarsTable);
  var otherCalendarsCont = aDom.createDom('div',
      goog.getCssName('event-edit-pane-cont'),
      otherCalendarsSubCont);

  return aDom.createDom('div', ['tabs-content', 'settings-tab-content'],
      buttonsCont, myCalendarsCont, otherCalendarsCont);
}


/**
 *
 */
rflect.cal.ui.SettingsPane.prototype.createMyCalendarsTable = function() {
  var calendars = [];
  for (var calendarId in this.eventManager_.calendars) {
    calendars.push(this.eventManager_.calendars[calendarId]);
  }

  return this.createTable(aDom, null, goog.getCssName('calendars-table'),
      calendars.length, 2, goog.getCssName('calendar-row'),
      function(aTd, aRowIndex, aColIndex) {
        switch (aColIndex) {
          case 0:
          case 1:
          default: return aTd;
        }
      });
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


};


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.visible_ && !this.startTimeAC_.getRenderer().isVisible() &&
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
rflect.cal.ui.SettingsPane.prototype.onInputFocus_ = function(aEvent) {
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
rflect.cal.ui.SettingsPane.prototype.onTimeInputMouseDown_ = function(aEvent) {
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
rflect.cal.ui.SettingsPane.prototype.updateAC_ = function(aAC) {
  if (goog.userAgent.IE) {
    if (goog.string.compareVersions(goog.userAgent.VERSION, '8') <= 0)
      setTimeout(goog.bind(function(){aAC.update(true)}, this), 0);
  } else
    aAC.update(true);
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
  if (this.scanValues()) {
    this.eventManager_.eventHolder.endWithEdit();
    this.transport_.saveEventAsync(
        this.eventManager_.eventHolder.getCurrentEvent());
    if (this.dispatchEvent(new goog.events.Event(
        rflect.cal.ui.SettingsPane.EventTypes.SAVE))) {
      this.setVisible(false);
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
 * Checkbox action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.SettingsPane.prototype.onCheck_ = function(aEvent) {
  var eh = this.eventManager_.eventHolder;
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
rflect.cal.ui.SettingsPane.prototype.showTimeInputs_ = function(aShow) {
  goog.style.showElement(this.inputStartTime_, aShow);
  goog.style.showElement(this.inputEndTime_, aShow);
}


/**
 * Sets the visibility of the event pane and moves focus to the
 * event name input. Lazily renders the component if needed.
 * @param {boolean} visible Whether the pane should be visible.
 * @param {boolean=} opt_creatingNewEvent Whether we're creating new event.
 */
rflect.cal.ui.SettingsPane.prototype.setVisible = function(visible,
    opt_creatingNewEvent) {
  if (visible == this.visible_) {
    return;
  }

  this.newEventMode_ = opt_creatingNewEvent || false;

  // If the pane hasn't been rendered yet, render it now.
  if (!this.isInDocument()) {
    this.render(this.parentEl_);
  }

  this.displayValues();

  this.showElement_(visible);

  /** @preserveTry */
  try {
    this.inputName_.focus();
    this.inputName_.select();
  } catch(e) {
    // IE8- shows error that it couldn't set focus but nevertheless, sets it.
  }

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
 * Displays event properties in form.
 */
rflect.cal.ui.SettingsPane.prototype.displayValues = function() {
  var eh = this.eventManager_.eventHolder;

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
rflect.cal.ui.SettingsPane.prototype.displayDates_ = function() {
  var eh = this.eventManager_.eventHolder;

  var startDate = eh.getStartDate();
  var endDate = eh.getEndDate();
  // We need human-adjusted end date for all-day events.
  // Our interval end dates are exclusive, and it's more natural for all-day
  // events to have inclusive end.
  var uiEndDate = endDate.clone();

  if (eh.getAllDay() && uiEndDate.getHours() == 0 &&
      uiEndDate.getMinutes() == 0)
    uiEndDate.add(new goog.date.Interval(goog.date.Interval.DAYS, -1));

  var formatStringDate = rflect.cal.ui.SettingsPane.getDateFormatString();
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

  rflect.cal.ui.SettingsPane.markInput(true, this.inputStartDate_);
  rflect.cal.ui.SettingsPane.markInput(true, this.inputEndDate_);
  rflect.cal.ui.SettingsPane.markInput(true, this.inputStartTime_);
  rflect.cal.ui.SettingsPane.markInput(true, this.inputEndTime_);
}


/**
 * Scans values from form.
 * @return {boolean} Whether input is valid.
 */
rflect.cal.ui.SettingsPane.prototype.scanValues = function() {
  var valid = false;

  var eh = this.eventManager_.eventHolder;

  eh.setSummary(this.inputName_.value);

  eh.setDescription(this.textAreaDesc_.innerHTML);

  eh.setCalendarId(this.selectCalendars_.getCalendarId());

  var startDate = new goog.date.DateTime();
  var startTime = new goog.date.DateTime();
  var endDate = new goog.date.DateTime();
  var endTime = new goog.date.DateTime();

  var parserDate = new goog.i18n.DateTimeParse(
      rflect.cal.ui.SettingsPane.getDateFormatString());
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

  rflect.cal.ui.SettingsPane.markInput(validStartDate, this.inputStartDate_);
  rflect.cal.ui.SettingsPane.markInput(validEndDate, this.inputEndDate_);
  rflect.cal.ui.SettingsPane.markInput(validStartTime, this.inputStartTime_);
  rflect.cal.ui.SettingsPane.markInput(validEndTime, this.inputEndTime_);

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
rflect.cal.ui.SettingsPane.prototype.disposeInternal = function() {
  this.inputDatePicker_.dispose();
  this.startTimeAC_.dispose();
  this.endTimeAC_.dispose();
  this.selectCalendars_.dispose();

  rflect.cal.ui.SettingsPane.superClass_.disposeInternal.call(this);
};


/**
 * Generates table.
 * @param {goog.dom.DomHelper} aDom Dom helper.
 * @param {string} aTableId Table id.
 * @param {string} aTableClassName Table class.
 * @param {number} aRowsN Rows number.
 * @param {number} aColsN Cols number.
 * @param {string} aRowClassName Class for each row.
 * @param {function(Element, number, number):Element} aTdMakerFn Function that
 * takes td and decorates it.
 * @return {Element} Table.
 */
rflect.cal.ui.SettingsPane.prototype.createTable = function(aDom, aTableId,
    aTableClassName, aRowsN, aColsN, aRowClassName, aTdMakerFn) {

  var tbody = aDom.createDom('tbody');
  var table = aDom.createDom('table', {
    id: aTableId,
    className: aTableClassName
  }, tbody);

  for (var rowCounter = 0; rowCounter < aRowsN; rowCounter++) {
    var tr = aDom.createDom('tr');
    if (aRowClassName) tr.className = aRowClassName;
    tbody.appendChild(tr);

    for (var colCounter = 0; colCounter < aColN; colCounter++) {
      var td = aDom.createDom('td');
      tr.appendChild(goog.bind(aTdMakerFn, this, td, rowCounter, colCounter)());
    }
  }

  return table;
}