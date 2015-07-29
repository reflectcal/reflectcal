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
  CALENDARS_LABEL_MY: 'My calendars',
  CALENDARS_LABEL_OTHER: 'Other calendars',
  TASKS_LABEL: 'Tasks',
  NO_NAME_EVENT: '(Untitled)',
  CALENDAR_POSTFIX: ' calendar',
  TO_CALENDAR: ' Calendar',

  SAVE: 'Save',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  EDIT: 'Edit',
  SETTINGS: 'Settings'
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
  CALENDARS_LABEL_MY: 'Мои календари',
  CALENDARS_LABEL_OTHER: 'Другие календари',
  TASKS_LABEL: 'Задачи',
  NO_NAME_EVENT: '(Без имени)',
  CALENDAR_POSTFIX: ' календарь',
  TO_CALENDAR: ' Календарь',

  SAVE: 'Сохранить',
  CANCEL: 'Отмена',
  DELETE: 'Удалить',
  EDIT: 'Правка',
  SETTINGS: 'Настройки'
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
  CALENDARS_LABEL_MY: 'Маi календары',
  CALENDARS_LABEL_OTHER: 'Iншыя календары',
  TASKS_LABEL: 'Задачы',
  NO_NAME_EVENT: '(Без імя)',
  CALENDAR_POSTFIX: ' каляндар',
  TO_CALENDAR: ' Каляндар',

  SAVE: 'Захаваць',
  CANCEL: 'Адмена',
  DELETE: 'Выдаліць',
  EDIT: 'Праўка',
  SETTINGS: 'Налады'
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
  CALENDARS_LABEL_MY: 'Mes calendriers',
  CALENDARS_LABEL_OTHER: 'Autres calendriers',
  TASKS_LABEL: 'Tâches',
  NO_NAME_EVENT: '(pas de nom)',
  CALENDAR_POSTFIX: ' calendrier',
  TO_CALENDAR: ' Сalendrier',

  SAVE: 'Enregistrer',
  CANCEL: 'Annuler',
  DELETE: 'Supprimer',
  EDIT: 'Modifier',
  SETTINGS: 'Préférences'
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

