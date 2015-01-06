/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview DB interaction - user DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var entityDAO = require('./entity');
var dbUtil = require('./util');
var db = require('./connection').db;


/**
 * Loads users by name.
 * @param {string} aUsername User name by which to find user.
 * @param {function(Error, Array)} aOnUserFind Callback that will be executed
 * when db request is ready.
 */
exports.getUserByUsername = function(aUsername, aOnUserFind){

  var lookupObject = {
    username: aUsername
  };

  db.get('users').find(lookupObject, {}, aOnUserFind);
};


/**
 * Loads users by id.
 * @param {string} aId Id by which to find user.
 * @param {function(Error, Array)} aOnUserFind Callback that will be executed
 * when db request is ready.
 */
exports.getUserById = function(aId, aOnUserFind){

  var lookupObject = {
    _id: aId
  };

  db.get('users').find(lookupObject, {}, aOnUserFind);
};


/**
 * Loads users.
 * @param {{identifier: string, emails: Array.<{value: string}>}} aProfile
 * Profile object of user.
 * @param {function(Array)} aOnUsersLoad Callback that will be executed
 * when db request is ready.
 */
exports.getUsersAsync = function(aProfile, aOnUsersLoad){
  var email = aProfile.emails[0].value;
  var openId = aProfile.identifier;

  entityDAO.getEntitiesAsync('users', { openId: openId }, aOnUsersLoad,
      userToTransportJSON,
      //Default user.
      {
        username: email,
        openId: openId
      }
  );
};


/**
 * Turns db user object into transportable json. This is just as-is copy while
 * we using user object internally only.
 * @param {Object} aEvent DB representation of user.
 * @return {Object} JSON representation of user.
 */
function userToTransportJSON(aUser) {
  return aUser;
};