/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Login utilities.
 */


var userDAO = require('../db/user');
var appConfig = require('../config/appconfig');
var log = appConfig.log;


/**
 * Checks whether user passes authentication.
 * @param {string} aUsername User login.
 * @param {string} aPassword User password.
 * @param {Function} aDone Callback.
 */
exports.localStrategy = function(aUsername, aPassword, aDone) {
  userDAO.getUserByUsername(aUsername, function(aError, aUsers) {
    log.info('User: ', JSON.stringify(aUsers));
    if (aError) { return aDone(aError); }
    if (!aUsers || !aUsers.length) {
      return aDone(null, false, { message: 'No such user.' });
    }
    if (aUsers.length > 1) {
      return aDone(null, false, {
        message: 'Ambiguous case. Several users with username: ' +  aUsername +
            '.'
      });
    }
    var user = aUsers[0];
    if (user.password != null && user.password != aPassword) {
      return aDone(null, false, { message: 'Incorrect password.' });
    }
    return aDone(null, user);
  });
};

exports.serializeUser = function(aUser, aDone) {
  aDone(null, aUser._id);
};

exports.deserializeUser = function(aId, aDone) {
  userDAO.getUserById(aId, function(aError, aUser) {
    aDone(aError, aUser);
  });
};