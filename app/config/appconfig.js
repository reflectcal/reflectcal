/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Application configuration.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var bunyan = require('bunyan');


/**
 * Whether application is compiled. This affects whether compiled sources from
 * /js folder or uncompiled ones from /src will be used.
 * @type {boolean}
 */
exports.COMPILED = true;


/**
 * Whether application is built. This means that assets like js and css have
 * unique md5 names and targets are linked to that assets.
 * Overridden to true by build process.
 * @type {boolean}
 */
exports.BUILT = false;


/**
 * Name of db.
 * @type {string}
 */
exports.DB_NAME = 'rflectevents';


/**
 * Whether to use oauth authentication. If false, rollback to local strategy.
 * @type {boolean}
 */
exports.USE_OAUTH = true;


/**
 * App HTTP port.
 * @type {number}
 */
exports.APP_PORT = exports.BUILT ? 80 : 3000;


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


/**
 * Logger.
 */
exports.log = bunyan.createLogger({
  name: 'reflectevents',
  streams: [
    {
      level: 'info',
      type: 'stream',
      stream: process.stdout
    },
    {
      level: 'info',
      type: 'rotating-file',
      path: 'logs/info.log',
      period: '1d',
      count: 10
    },
    {
      level: 'error',
      type: 'rotating-file',
      path: 'logs/error.log',
      period: '1d',
      count: 10
    }
  ]
});


