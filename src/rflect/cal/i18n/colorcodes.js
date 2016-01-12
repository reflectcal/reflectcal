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
    goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue'),
    goog.getCssName('event-in-progress-blue')),
  new rflect.cal.events.ColorCode(1, 'Red',
    goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'),
    goog.getCssName('event-in-progress-red')),
  new rflect.cal.events.ColorCode(2, 'Emerald', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(3, 'Violet', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(4, 'Orange', 'event-rect-orange',
      'cal-checkbox-orange', 'event-in-progress-orange'),
  new rflect.cal.events.ColorCode(5, 'Green',
    goog.getCssName('event-rect-green'), goog.getCssName('cal-checkbox-green'),
    goog.getCssName('event-in-progress-green'))
];


/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_RU = [
  new rflect.cal.events.ColorCode(0, 'Синий',
      goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue'),
      goog.getCssName('event-in-progress-blue')),
  new rflect.cal.events.ColorCode(1, 'Красный',
      goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'),
      goog.getCssName('event-in-progress-red')),
  new rflect.cal.events.ColorCode(2, 'Изумрудный', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(3, 'Фиолетовый', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(4, 'Оранжевый', 'event-rect-orange',
      'cal-checkbox-orange', 'event-in-progress-orange'),
  new rflect.cal.events.ColorCode(5, 'Зеленый',
      goog.getCssName('event-rect-green'),
      goog.getCssName('cal-checkbox-green'),
      goog.getCssName('event-in-progress-green'))
];


/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_BY = [
  new rflect.cal.events.ColorCode(0, 'Сiнi',
        goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue'),
        goog.getCssName('event-in-progress-blue')),
  new rflect.cal.events.ColorCode(1, 'Чырвоны',
      goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'),
      goog.getCssName('event-in-progress-red')),
  new rflect.cal.events.ColorCode(2, 'Ізумрудны', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(3, 'Фіялетавы', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(4, 'Аранжавы', 'event-rect-orange',
      'cal-checkbox-orange', 'event-in-progress-orange'),
  new rflect.cal.events.ColorCode(5, 'Зялены',
      goog.getCssName('event-rect-green'),
      goog.getCssName('cal-checkbox-green'),
      goog.getCssName('event-in-progress-green'))
];


/**
 * Array of color codes.
 * @type {Array.<rflect.cal.events.ColorCode>}
 * @const
 */
rflect.cal.i18n.PREDEFINED_COLOR_CODES_FR = [
  new rflect.cal.events.ColorCode(0, 'Bleu',
      goog.getCssName('event-rect-blue'), goog.getCssName('cal-checkbox-blue'),
      goog.getCssName('event-in-progress-blue')),
  new rflect.cal.events.ColorCode(1, 'Rouge',
      goog.getCssName('event-rect-red'), goog.getCssName('cal-checkbox-red'),
      goog.getCssName('event-in-progress-red')),
  new rflect.cal.events.ColorCode(2, 'Émeraude', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(3, 'Violet', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(4, 'Orange', 'event-rect-orange',
      'cal-checkbox-orange', 'event-in-progress-orange'),
  new rflect.cal.events.ColorCode(5, 'Vert',
      goog.getCssName('event-rect-green'),
      goog.getCssName('cal-checkbox-green'),
      goog.getCssName('event-in-progress-green'))
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

