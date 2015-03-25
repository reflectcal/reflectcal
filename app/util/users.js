/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview User registry.
 */


/**
 * Map of sid -> username@mail.com
 */
var globalSidToUserName = new Map();
var globalUserNames = new Set();


/**
 * Clear all users.
 */
exports.clear = function() {
  globalSidToUserName.clear();
  globalUserNames.clear();
};


/**
 * @param {Object} aReq Request
 * @return {string} connect.sid
 */
function extractSidFromRequest(aReq) {
  var cookie = aReq.headers.cookie;
  var matches = /connect\.sid\=.+/.exec(cookie);

  if (matches.length) {
    return matches[0].replace(/connect\.sid\=/, '');
  }
  return '';
}


exports.getUserNameFromRequest = function(req) {
  return globalSidToUserName.get(extractSidFromRequest(req));
}


exports.registerUser = function(req, res, next) {
  globalSidToUserName.set(extractSidFromRequest(req), req.username);
  globalUserNames.add(req.username);
  return next();
}


exports.unregisterUser = function(req, res, next) {
  globalSidToUserName.delete(extractSidFromRequest(req));
  globalUserNames.delete(req.username);
  return next();
}


exports.userIsRegistered = function(aUserName) {
  globalUserNames.has(aUserName);
}
