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
 * Whether to use oauth authentication. If false, fallback to local strategy.
 * @type {boolean}
 */
exports.USE_OAUTH = true;


/**
 * Whether to use local authentication. If false, fallback to guest mode.
 * @type {boolean}
 */
exports.USE_LOCAL_AUTH = false;


/**
 * App HTTP port.
 * @type {number}
 */
exports.APP_PORT = exports.BUILT ? 80 : 3000;


/**
 * Port for web sockets.
 * @type {number}
 */
exports.WEBSOCKETS_PORT = 3002;


/**
 * Path for notifications web sockets.
 * @type {string}
 */
exports.WEBSOCKETS_NOTIFICATIONS_PATH = '/notifications';


/**
 * Whether to perform user setup, i.e. add default calendars and events.
 * Interface may look more friendly with some events and calendars already set.
 * @type {boolean}
 */
exports.PERFORM_SET_UP_USER = true;


/**
 * Whether to send user notifications through web sockets, for example, when
 * someone edits calendar they are subscribed to, etc.
 * @type {boolean}
 */
exports.USE_WEBSOCKETS_NOTIFICATIONS = false;


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


