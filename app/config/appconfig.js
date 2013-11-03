/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Application configuration.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


/**
 * List of locales.
 * @type {Array.<string>}
 */
exports.LOCALES = ['en', 'ru', 'by', 'fr'];


/**
 * List of (locale, lang name) pairs.
 * @type {Array.<Array.<string>>}
 */
exports.LANGUAGE_NAMES = [
  ['en', 'English'],
  ['ru', 'Русский'],
  ['by', 'Беларускi'],
  ['fr', 'Français']
];


/**
 * String prepended to JSON to avoid xss.
 * @type {string}
 * @const
 */
exports.JSON_XSS_PREPENDER = '])}>"';



