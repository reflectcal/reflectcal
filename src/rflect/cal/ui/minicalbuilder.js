/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview HTML builder for mini cal.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MiniCalBuilder');

goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.i18n.predefined');



/**
 * Main pane builder main class.
 * @param {rflect.cal.ui.DatePicker} aMiniCal Link to mini cal.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.ui.MiniCalBuilder = function(aMiniCal, aTimeManager) {
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
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ui.MiniCalBuilder.HTML_PARTS_ = [
  '<div id="month-selector">',
  '<div class="' + goog.getCssName('goog-date-picker'),
  /*
  * Date picker classname ().
  */
  '"><div id="minical-mask-cnt">',
  /* Mask. */
  '</div><table class="' + goog.getCssName('minical-table') + '" cellspacing="0" cellpadding="0">' +
      '<thead><tr class="' + goog.getCssName('goog-date-picker-head'),
  /*
  * Date picker head classname ().
  */
  '"><td colspan="7">' + '<div class="' +
      goog.getCssName('goog-date-picker-buttons') + '">' +
      '<div class="' + goog.getCssName('goog-date-picker-btn') + ' ' +
      goog.getCssName('month-sel-btn') + ' ' +
      goog.getCssName('month-sel-btn-back') +
      '">&nbsp;</div>' +
      '<div class="' + goog.getCssName('goog-date-picker-btn') + ' ' +
      goog.getCssName('month-sel-btn') + ' ' +
      goog.getCssName('month-sel-btn-forward') +
      '">&nbsp;</div></div>',
  '<div class="' + goog.getCssName('goog-date-picker-month') + '">',
  /*
  * Month and year name (2013&nbsp;August).
  */
  '</div></td></tr></thead>',
  '<tbody id="minical-grid" role="grid"><tr>',
  // Individual dayname.
  '<th role="columnheader" class="' + goog.getCssName('goog-date-picker-wday') +
      '">',
  /* Dayname (S). */
  // End of individual dayname.
  '</th>',
  '</tr>',
  // Individual monthgrid row.
  '<tr>',
  // Individual grid cell.
  '<td id="goog-dp-',
  /* Grid cell id (42). */
  '" role="gridcell" class="' +
      goog.getCssName('goog-date-picker-date') + ' ',
  /* Day cell class (). */
  '">',
  /* Day number (1). */
  // End of individual grid cell.
  '</td>',
  // End of individual monthgrid row.
  '</tr>',
  '</tbody></table></div>',
  '</div>'
];


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @protected
 * @see {rflect.cal.ui.MainPaneBuilder#buildBodyInternalWeek_}
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildInternal = function(aSb) {
  var offset = 0;
  var length = rflect.cal.ui.MiniCalBuilder.HTML_PARTS_.length;
  while (++offset < length - 1) {
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[offset]);
    switch (offset) {
      case 1: {
        this.buildMainClassName_(aSb);
      };break;
      case 3: {
        this.buildHeader_(aSb);
      };break;
      case 5: {
        this.buildMonthName_(aSb);
      };break;
      case 8: {
        this.buildDayNames_(aSb, offset);
        offset++;
      };break;
      case 11: {
        this.buildMonthGridRows_(aSb, offset);
        offset += 5;
      };break;
      default: break;
    }
  }
};


/**
 * Builds mini cal main class name.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 * '<div class="' + goog.getCssName('goog-date-picker'),
 *  
 *  * Date picker classname ().
 *  
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildMainClassName_ = function(aSb) {
  if (this.miniCal_.hovered)
    aSb.append(goog.getCssName('goog-datepicker-hover'));
};


/**
 * Builds mini cal header.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'"><table cellspacing="0" cellpadding="0">' +
 *     '<thead><tr class="' + goog.getCssName('goog-date-picker-head'),
 *
 * Date picker head classname ().
 *
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildHeader_ = function(aSb) {
  if (this.miniCal_.hovered)
    aSb.append(goog.getCssName('goog-datepicker-hover'));
};


/**
 * Builds month and year name.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'<div class="' + goog.getCssName('goog-date-picker-month') + '">',
 *
 * Month and year name (2013&nbsp;August).
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildMonthName_ = function(aSb) {
  aSb.append(this.timeManager_.basis.getYear());
  aSb.append('&nbsp;');
  aSb.append(goog.i18n.DateTimeSymbols.MONTHS[
      this.timeManager_.basis.getMonth()]);
};


/**
 * Builds day names abbreviations.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @private
 *
 * // Individual dayname.
 * '<th role="columnheader" class="' +
 * goog.getCssName('goog-date-picker-wday') + '">',
 *  Dayname (S). 
 * // End of individual dayname.
 * '</th>',
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildDayNames_ = function(aSb, aOffset) {
  var dayNamesFirstNumber = goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK;
  var dayNameNumber = 0;
  
  for (var counter = 0; counter < 7; counter++) {
    if (counter > 0)
      aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset]);
    // We need to shift position by 1 because array of weekdays starts from
    // sunday and WEEKDAY gives weekday number starting from monday.
    dayNameNumber = (dayNamesFirstNumber + counter + 1) % 7;
    aSb.append(goog.i18n.DateTimeSymbols.WEEKDAYS[dayNameNumber].charAt(0)
        .toUpperCase());
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset + 1]);
  }
};


/**
 * Builds month grid rows.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 * Individual monthgrid row.
 *  '<tr>',
 *  // Individual grid cell.
 *  '<td id="goog-dp-',
 *   Grid cell id (42). 
 *  '" role="gridcell" class="' +
 *      goog.getCssName('goog-date-picker-date') + ' ',
 *   Day cell class (). 
 *  '">',
 *   Day number (1). 
 *  // End of individual grid cell.
 *  '</td>',
 *  // End of individual monthgrid row.
 *  '</tr>',
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildMonthGridRows_ =
    function(aSb, aOffset) {
  var daysNumber = this.timeManager_.daySeries.length;
  var rowsNumber = daysNumber / 7;
  for (var rowCounter = 0; rowCounter < rowsNumber; rowCounter++) {
    if (rowCounter > 0)
      aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset]);
    // Build day cells containing expand signs and day numbers.
    this.buildDayCells_(aSb, aOffset + 1, rowCounter);
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset + 5]);
  }
};


/**
 * Builds month grid rows.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @param {number} aRowCounter Row number.
 * @private
 *
 *  // Individual grid cell.
 *  '<td id="goog-dp-',
 *   Grid cell id (42).
 *  '" role="gridcell" class="' +
 *      goog.getCssName('goog-date-picker-date') + ' ',
 *   Day cell class ().
 *  '">',
 *   Day number (1).
 *  // End of individual grid cell.
 *  '</td>',
 */
rflect.cal.ui.MiniCalBuilder.prototype.buildDayCells_ = function(aSb, aOffset,
    aRowCounter) {
  var daySeries = this.timeManager_.daySeries;
  var id = 0;
  var day;

  for (var colCounter = 0; colCounter < 7; colCounter++) {
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset]);
    aSb.append(id = aRowCounter * 7 + colCounter);
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset + 1]);
    // Show days from another month differently.
    if (this.timeManager_.basis.getMonth() != (day = daySeries[id]).getMonth())
      aSb.append(goog.getCssName('dl-other-month'));
    if (id == this.miniCal_.basisIndex)
      aSb.append(' ' + goog.getCssName('goog-date-picker-selected-pre'));
    if (id >= this.miniCal_.startSelectionIndex &&
        id <= this.miniCal_.endSelectionIndex)
      aSb.append(' ' + goog.getCssName('goog-date-picker-selected-pre'));
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset + 2]);
    // Build daycell day number.
    aSb.append(day.getDate());
    aSb.append(rflect.cal.ui.MiniCalBuilder.HTML_PARTS_[aOffset + 3]);
  }
};
