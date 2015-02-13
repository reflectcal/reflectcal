/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Login utilities.
 */


var userDAO = require('../db/user');
var db = require('../db/connection').db;
var dbUtil = require('../db/util');
var appConfig = require('../config/appconfig');
var DEFAULT_USER = require('../config/defaultuser').DEFAULT_USER;
var log = appConfig.log;
var merge = require('object-merge');


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


/**
 * Checks whether user passes authentication.
 * @param {string} accessToken Google user id.
 * @param {string} refreshToken Google user id.
 * @param {Object} aProfile Google user profile object.
 * @param {Function} aDone Callback.
 */
exports.googleStrategy = function(accessToken, refreshToken, aProfile, aDone) {
  // Asynchronous verification, for effect...
  process.nextTick(function() {
    //Initial setup for user (calendars, events).
    setUpUser(aProfile, onSetUpUser);
  });

  var onSetUpUser = function() {
    userDAO.getUsersAsync(aProfile, function(aUsers) {
      log.info('User: ', JSON.stringify(aUsers));
      //TODO(alexk): make all callbacks return error as first argument.
      //if (aError) { return aDone(aError); }
      if (!aUsers || !aUsers.length) {
        return aDone(null, false, { message: 'No such user.' });
      }
      if (aUsers.length > 1) {
        return aDone(null, false, {
          message: 'Ambiguous case. Several users with id: ' +  aId + '.'
        });
      }
      var user = aUsers[0];
      return aDone(null, user);
    });
  }
}


exports.serializeUser = function(aUser, aDone) {
  aDone(null, aUser._id);
};


exports.deserializeUser = function(aId, aDone) {
  userDAO.getUserById(aId, function(aError, aUser) {
    aDone(aError, aUser);
  });
};


/**
 * Sets up Google user.
 * @param {Object} aProfile Google user profile object.
 * @param {Function} aOnSetUpUser Callback.
 */
function setUpUser(aProfile, aOnSetUpUser) {
  if (appConfig.PERFORM_SET_UP_USER) {
    userDAO.setUpUser(aProfile, aOnSetUpUser);
  } else {
    setImmediate(aOnSetUpUser);
  }
}


/**
 * Sets up local user.
 * @param {{username: string}} aProfile Local user profile object.
 * @param {Function} aOnSetUpUser Callback.
 */
function setUpLocalUser(aProfile, aOnSetUpUser) {
  if (appConfig.PERFORM_SET_UP_USER) {
    userDAO.setUpLocalUser(aProfile, aOnSetUpUser);
  } else {
    setImmediate(aOnSetUpUser);
  }
}


/**
 * Makes handler that authenticates in guest mode.
 * @param {Function} aAuthenticateFn Handler function.
 */
exports.checkGuestMode = function(aAuthenticateFn) {

  /**
   * Handles root route.
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   * @param {Function} next Function that passes control further.
   */
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
    
      dbUtil.getUniqueFieldAsync(db.get('users'), 'username', 'guest_',
          function(aUserNameUnique) {
        var user = merge(DEFAULT_USER, {
          username: aUserNameUnique,
          password: 'pass_' + aUserNameUnique
        });
        setUpLocalUser(user, function(){
          userDAO.saveUserAsync(user, function() {
            req.body.username = user.username;
            req.body.password = user.password;
            aAuthenticateFn(req, res, next);
          });
        });
      });
  
    } else {
      return next();
    }
  }
}