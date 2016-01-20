/*
 * Copyright (c) 2013. Rflect, Alex K.
 */


/**
 * @fileoverview Default user object.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


/**
 * Standard user.
 * @type {Object}
 */
exports.DEFAULT_USER = {
  // E-mail is used as an username.
  username: '',
  openId: '',
  guest: false,
  settings: {
    // Currently used language. If unspecified, language from Accept-Language
    // header will be used.
    language: '',
    debug: false,
    visualTheme: 'dark'
  }
};