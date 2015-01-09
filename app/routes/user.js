/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview User routes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var userDAO = require('../db/user');


/**
 * Saves user.
 */
exports.userSave = function(req, res){
  var onUserSave = function(aUserId) {
    res.send(JSON.stringify(aUserId));
  }

  userDAO.saveUserAsync(req.body, onUserSave);
};