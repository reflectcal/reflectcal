/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Set of locale-dependent strings for application.
 * @see {../../closure-library/closure/goog/i18n/datetimesymbols.js}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.i18n.SettingsSymbols');
goog.provide('rflect.cal.i18n.SettingsSymbols_by');
goog.provide('rflect.cal.i18n.SettingsSymbols_en');
goog.provide('rflect.cal.i18n.SettingsSymbols_en_US');
goog.provide('rflect.cal.i18n.SettingsSymbols_ru');
goog.provide('rflect.cal.i18n.SettingsSymbols_fr');


/**
 * Date/time formatting symbols for locale en.
 */
rflect.cal.i18n.SettingsSymbols_en = {
  SAVE_SETTINGS_BUTTON: 'Save settings',
  SAVE_CALENDAR_BUTTON: 'Save calendar'
};


/**
 * Date/time formatting symbols for locale ru.
 */
rflect.cal.i18n.SettingsSymbols_ru = {
  SAVE_SETTINGS_BUTTON: 'Сохранить настройки',
  SAVE_CALENDAR_BUTTON: 'Сохранить календарь'
};


/**
 * Date/time formatting symbols for locale by.
 */
rflect.cal.i18n.SettingsSymbols_by = {
  SAVE_SETTINGS_BUTTON: 'Захаваць настройкi',
  SAVE_CALENDAR_BUTTON: 'Захаваць каляндар'
};


/**
 * Date/time formatting symbols for locale fr.
 */
rflect.cal.i18n.SettingsSymbols_fr = {
  SAVE_SETTINGS_BUTTON: 'Sauver les paramètres',
  SAVE_CALENDAR_BUTTON: 'Sauver calendrier'
};


/**
 * Selected date/time formatting symbols by locale.
 * "switch" statement won't work here. JsCompiler cannot handle it yet.
 */
if (goog.LOCALE == 'en') {
  rflect.cal.i18n.SettingsSymbols = rflect.cal.i18n.SettingsSymbols_en;
} else if (goog.LOCALE == 'ru') {
  rflect.cal.i18n.SettingsSymbols = rflect.cal.i18n.SettingsSymbols_ru;
} else if (goog.LOCALE == 'by') {
  rflect.cal.i18n.SettingsSymbols = rflect.cal.i18n.SettingsSymbols_by;
} else if (goog.LOCALE == 'fr') {
  rflect.cal.i18n.SettingsSymbols = rflect.cal.i18n.SettingsSymbols_fr;
} else {
  rflect.cal.i18n.SettingsSymbols = rflect.cal.i18n.SettingsSymbols_en;
}

