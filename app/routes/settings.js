/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Settings routes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var settingsDAO = require('../db/settings');


/**
 * Saves settings.
 */
exports.settingsSave = function(req, res){
  var onSettingsSave = function(aSettingsId) {
    res.send(JSON.stringify(aSettingsId));
  }

  settingsDAO.saveSettingsAsync(req.body, onSettingsSave);
};