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
  new rflect.cal.events.ColorCode(2, 'Green',
    goog.getCssName('event-rect-green'), goog.getCssName('cal-checkbox-green'),
    goog.getCssName('event-in-progress-green')),
  new rflect.cal.events.ColorCode(3, 'Canary', 'event-rect-canary',
      'cal-checkbox-canary', 'event-in-progress-canary'),
  new rflect.cal.events.ColorCode(4, 'Pink', 'event-rect-pink',
      'cal-checkbox-pink', 'event-in-progress-pink'),
  new rflect.cal.events.ColorCode(5, 'Violet', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(6, 'Emerald', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(7, 'Pancho', 'event-rect-pancho',
      'cal-checkbox-pancho', 'event-in-progress-pancho')
      
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
  new rflect.cal.events.ColorCode(2, 'Зеленый',
      goog.getCssName('event-rect-green'),
      goog.getCssName('cal-checkbox-green'),
      goog.getCssName('event-in-progress-green')),
  new rflect.cal.events.ColorCode(3, 'Желтый', 'event-rect-canary',
      'cal-checkbox-canary', 'event-in-progress-canary'),
  new rflect.cal.events.ColorCode(4, 'Розовый', 'event-rect-pink',
      'cal-checkbox-pink', 'event-in-progress-pink'),
  new rflect.cal.events.ColorCode(5, 'Фиолетовый', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(6, 'Изумрудный', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(7, 'Панчо', 'event-rect-pancho',
      'cal-checkbox-pancho', 'event-in-progress-pancho')
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
  new rflect.cal.events.ColorCode(2, 'Зялены',
      goog.getCssName('event-rect-green'),
      goog.getCssName('cal-checkbox-green'),
      goog.getCssName('event-in-progress-green')),
  new rflect.cal.events.ColorCode(3, 'Жоўты', 'event-rect-canary',
      'cal-checkbox-canary', 'event-in-progress-canary'),
  new rflect.cal.events.ColorCode(4, 'Ружовы', 'event-rect-pink',
        'cal-checkbox-pink', 'event-in-progress-pink'),
  new rflect.cal.events.ColorCode(5, 'Фіялетавы', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(6, 'Ізумрудны', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(7, 'Панчо', 'event-rect-pancho',
      'cal-checkbox-pancho', 'event-in-progress-pancho')
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
  new rflect.cal.events.ColorCode(2, 'Vert',
      goog.getCssName('event-rect-green'),
      goog.getCssName('cal-checkbox-green'),
      goog.getCssName('event-in-progress-green')),
  new rflect.cal.events.ColorCode(3, 'Jaune', 'event-rect-canary',
      'cal-checkbox-canary', 'event-in-progress-canary'),
  new rflect.cal.events.ColorCode(4, 'Rose', 'event-rect-pink',
      'cal-checkbox-pink', 'event-in-progress-pink'),
  new rflect.cal.events.ColorCode(5, 'Violet', 'event-rect-violet',
      'cal-checkbox-violet', 'event-in-progress-violet'),
  new rflect.cal.events.ColorCode(6, 'Émeraude', 'event-rect-emerald',
      'cal-checkbox-emerald', 'event-in-progress-emerald'),
  new rflect.cal.events.ColorCode(7, 'Pancho', 'event-rect-pancho',
      'cal-checkbox-pancho', 'event-in-progress-pancho')
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

