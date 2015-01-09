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
var deepClone = require('clone');
var DEFAULT_USER = require('../config/defaultuser').DEFAULT_USER;


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
 * Saves user.
 * @param {Object} aUserJSON JSON representing user.
 * @param {function(string|number)} aOnUserSave Callback that will be
 * called when db request is ready.
 */
exports.saveUserAsync = function(aUserJSON, aOnUserSave){
  entityDAO.saveEntityAsync('users', aUserJSON,
      aOnUserSave, userFromTransportJSON);
};


/**
 * Loads users.
 * @param {{identifier: string, emails: Array.<{value: string}>}} aProfile
 * Profile object of user.
 * @link {http://passportjs.org/guide/profile/}
 * @param {function(Array)} aOnUsersLoad Callback that will be executed
 * when db request is ready.
 */
exports.getUsersAsync = function(aProfile, aOnUsersLoad){
  var email = aProfile.emails[0].value;
  var openId = aProfile.id;

  entityDAO.getEntitiesAsync('users', { openId: openId }, aOnUsersLoad,
      userToTransportJSON,
      //Default user.
      merge(DEFAULT_USER, {
        username: email,
        openId: openId
      });
  );
};


/**
 * Turns db user object into transportable json.
 * @param {Object} aEvent DB representation of user.
 * @return {Object} JSON representation of user.
 */
function userToTransportJSON(aUser) {
  //We could have some old user object in db, without some newly introduced
  // properties. In that case, provide defaults.
  var userExported = merge(DEFAULT_USER, aUser);
 
  return userExported;
};


/**
 * Turns user transportable json to db object.
 * @param {Object} aUserJSON JSON representation of user.
 * @return {Object} DB representation of user.
 */
function userFromTransportJSON(aUserJSON) {

  //NOTE(alexk): some user fields may be restricted for db saving.
  return aUserJSON;
};