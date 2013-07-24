/*
 * Copyright (c) 2013. Rflect, Alex K.
 */


/**
 * @fileoverview Date utilities.
 */

goog.provide('rflect.date.util');

goog.require('goog.date.DateTime');
goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('rflect.cal.predefined');


/**
 * @return {Array.<string>} Array with hour strings, like 12:00, 12:30, ... .
 */
rflect.date.util.getTimeLabels = function() {
  var labels = [];

  var timeCounter = new goog.date.DateTime();
  var timeIncrement = new goog.date.Interval(0, 0, 0, 0, 30);
  timeCounter.setHours(0);
  timeCounter.setMinutes(0);
  timeCounter.setSeconds(0);

  for (var counter = 0; counter < rflect.cal.predefined.HOUR_ROWS_NUMBER;
       counter++, timeCounter.add(timeIncrement)) {
    var timeFormat = new goog.i18n.DateTimeFormat(
        goog.i18n.DateTimeSymbols.TIMEFORMATS[3]);

    labels.push(timeFormat.format(timeCounter));
  }

  return labels;
}
