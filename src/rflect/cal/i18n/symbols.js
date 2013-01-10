/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Set of locale-dependent strings for application.
 * @see {../../closure-library/closure/goog/i18n/datetimesymbols.js}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.i18n.Symbols');
goog.provide('rflect.cal.i18n.Symbols_by');
goog.provide('rflect.cal.i18n.Symbols_en');
goog.provide('rflect.cal.i18n.Symbols_en_US');
goog.provide('rflect.cal.i18n.Symbols_ru');
goog.provide('rflect.cal.i18n.Symbols_fr');


/**
 * Date/time formatting symbols for locale en.
 */
rflect.cal.i18n.Symbols_en = {
  NOW: 'Now',
  NEW_EVENT: 'New event',
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  CALENDARS_LABEL: 'Calendars',
  TASKS_LABEL: 'Tasks'
};


/**
 * Date/time formatting symbols for locale ru.
 */
rflect.cal.i18n.Symbols_ru = {
  NOW: 'Сейчас',
  NEW_EVENT: 'Новое событие',
  DAY: 'День',
  WEEK: 'Неделя',
  MONTH: 'Месяц',
  CALENDARS_LABEL: 'Календари',
  TASKS_LABEL: 'Задачи'
};


/**
 * Date/time formatting symbols for locale by.
 */
rflect.cal.i18n.Symbols_by = {
  NOW: 'Зараз',
  NEW_EVENT: 'Новая падзея',
  DAY: 'Дзень',
  WEEK: 'Тыдзень',
  MONTH: 'Месяц',
  CALENDARS_LABEL: 'Календары',
  TASKS_LABEL: 'Задачы'
};


/**
 * Date/time formatting symbols for locale fr.
 */
rflect.cal.i18n.Symbols_fr = {
  NOW: 'présent',
  NEW_EVENT: 'Nouvel',
  DAY: 'Jour',
  WEEK: 'Semaine',
  MONTH: 'Mois',
  CALENDARS_LABEL: 'Calendriers',
  TASKS_LABEL: 'Tâches'
};


/**
 * Selected date/time formatting symbols by locale.
 * "switch" statement won't work here. JsCompiler cannot handle it yet.
 */
if (goog.LOCALE == 'en') {
  rflect.cal.i18n.Symbols = rflect.cal.i18n.Symbols_en;
} else if (goog.LOCALE == 'ru') {
  rflect.cal.i18n.Symbols = rflect.cal.i18n.Symbols_ru;
} else if (goog.LOCALE == 'by') {
  rflect.cal.i18n.Symbols = rflect.cal.i18n.Symbols_by;
} else if (goog.LOCALE == 'fr') {
  rflect.cal.i18n.Symbols = rflect.cal.i18n.Symbols_fr;
} else {
  rflect.cal.i18n.Symbols = rflect.cal.i18n.Symbols_en;
}

