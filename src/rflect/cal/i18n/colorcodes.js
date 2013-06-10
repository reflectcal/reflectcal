/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Set of predefined locale dependent color codes for calendars
 * and events.
 * Corresponds to file.
 * @see {../../../css/rflectcalendar.css}.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {const}
 */

goog.provide('rflect.cal.i18n.PREDEFINED_COLOR_CODES');
goog.provide('rflect.cal.i18n.PREDEFINED_COLOR_CODES_BY');
goog.provide('rflect.cal.i18n.PREDEFINED_COLOR_CODES_EN');
goog.provide('rflect.cal.i18n.PREDEFINED_COLOR_CODES_RU');

goog.require('rflect.cal.events.ColorCode');

/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_EN = [
  new rflect.cal.events.ColorCode(0, 'Blue',
    goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue')),
  new rflect.cal.events.ColorCode(0, 'Red',
    goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'))
];


/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_RU = [
  new rflect.cal.events.ColorCode(0, 'Синий',
    goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue')),
  new rflect.cal.events.ColorCode(0, 'Красный',
      goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'))
];


/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_BY = [
  new rflect.cal.events.ColorCode(0, 'Сiнi',
    goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue')),
  new rflect.cal.events.ColorCode(0, 'Чырвоны',
      goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'))
];


/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_FR = [
  new rflect.cal.events.ColorCode(0, 'Bleu',
    goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue')),
  new rflect.cal.events.ColorCode(0, 'Rouge',
      goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'))
];


/**
 * Selected color codes by locale.
 */
if (goog.LOCALE == 'en') {
  rflect.cal.i18n.PREDEFINED_COLOR_CODES =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES_EN;
} else if (goog.LOCALE == 'ru') {
  rflect.cal.i18n.PREDEFINED_COLOR_CODES =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES_RU;
} else if (goog.LOCALE == 'by') {
  rflect.cal.i18n.PREDEFINED_COLOR_CODES =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES_BY;
} else if (goog.LOCALE == 'fr') {
  rflect.cal.i18n.PREDEFINED_COLOR_CODES =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES_FR;
} else {
  rflect.cal.i18n.PREDEFINED_COLOR_CODES =
      rflect.cal.i18n.PREDEFINED_COLOR_CODES_EN;
}

