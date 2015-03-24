/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Map of sid -> username@mail.com.
 */


var globalUserMap = new Map();


/**
 * Clear all users.
 */
exports.clear = function() {
  globalUserMap.clear();
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


export.getUserNameFromRequest = function(req) {
  return globalUserMap.get(extractSidFromRequest(req));
}


export.addUserToMap = function(req, res, next) {
  globalUserMap.set(extractSidFromRequest(req), req.username);
  return next();
}


export.removeUserFromMap = function(req, res, next) {
  globalUserMap.delete(extractSidFromRequest(req));
  return next();
}