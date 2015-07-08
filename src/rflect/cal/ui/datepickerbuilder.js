/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview HTML builder for mini cal.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.DatePickerBuilder');

goog.require('goog.i18n.DateTimeSymbols');



/**
 * Main pane builder main class.
 * @param {rflect.cal.ui.DatePicker} aMiniCal Link to mini cal.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.ui.DatePickerBuilder = function(aMiniCal, aTimeManager) {
  /**
   * Link to mini cal.
   * @type {rflect.cal.ui.DatePicker}
   * @private
   */
  this.miniCal_ = aMiniCal;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;
};


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @protected
 * @return {string}
 */
rflect.cal.ui.DatePickerBuilder.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.datepicker.datePicker({
    includeOuterHTML: opt_outerHTML,
    dateLabel: this.buildMonthName_(),
    weekDaysHTML: this.buildDayNames_(),
    gridRowsHTML: this.buildMonthGridRows_()
  });
};


/**
 * Builds month and year name.
 * @private
 * @return {string}
 */
rflect.cal.ui.DatePickerBuilder.prototype.buildMonthName_ = function() {
  this.timeManager_.basis.getYear() + '&nbsp;' +
      goog.i18n.DateTimeSymbols.MONTHS[this.timeManager_.basis.getMonth()];
};


/**
 * Builds day names abbreviations.
 * @private
 * @return {string}
 */
rflect.cal.ui.DatePickerBuilder.prototype.buildDayNames_ = function() {
  var dayNamesFirstNumber = goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK;
  var dayNameNumber = 0;
  var str = '';
  for (var counter = 0; counter < 7; counter++) {
    // We need to shift position by 1 because array of weekdays starts from
    // sunday and WEEKDAY gives weekday number starting from monday.
    dayNameNumber = (dayNamesFirstNumber + counter + 1) % 7;
    str += return rflect.cal.ui.soy.datepicker({
      weekDay: goog.i18n.DateTimeSymbols.NARROWWEEKDAYS[dayNameNumber]
    });
  }
  return str;
};


/**
 * Builds month grid rows.
 * @private
 * @return {string}
 */
rflect.cal.ui.DatePickerBuilder.prototype.buildMonthGridRows_ =
    function() {
  var daysNumber = this.timeManager_.daySeries.length;
  var rowsNumber = daysNumber / 7;
  var str = '';
  for (var rowCounter = 0; rowCounter < rowsNumber; rowCounter++) {
    str += rflect.cal.ui.soy.datepicker.gridRow({
      // Build day cells containing expand signs and day numbers.
      gridCellsHTML: this.buildDayCells_(rowCounter)
    });
  }
  return str;
};


/**
 * Builds month grid rows.
 * @param {number} aRowCounter Row number.
 * @private
 * @return {string}
 */
rflect.cal.ui.DatePickerBuilder.prototype.buildDayCells_ =
    function(aRowCounter) {
  var str = '';
  var daySeries = this.timeManager_.daySeries;

  for (let colCounter = 0; colCounter < 7; colCounter++) {
    let id = aRowCounter * 7 + colCounter;
    let day = daySeries[id];
    str += rflect.cal.ui.soy.datepicker.gridCell({
      index: id,
      label: day.getDate(),
      // Show days from another month differently.
      inOtherMonth: this.timeManager_.basis.getMonth() != day.getMonth(),
      selected: id == this.miniCal_.basisIndex || (id >= this.miniCal_.
          startSelectionIndex && id <= this.miniCal_.endSelectionIndex)
    });
  }

  return str;
};