/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var db = require('./connection').db;
var dbUtil = require('./util');


/**
 * Loads settings.
 * @param {function(Array)} aOnSettingsLoad Callback that will be executed
 * when db request is ready.
 */
exports.getSettingsAsync = function(aOnSettingsLoad){
  var collection = db.get('settings');
  var settings = [];

  collection.find({}, {}, function(aError, aSettings){
    // Executing callback for view.
    aOnSettingsLoad(aSettings);
  });
};


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 * @param {function(string|number)} aOnSettingsSave Callback that will be
 * called when db request is ready.
 */
exports.saveSettingsAsync = function(aSettingsJSON, aOnSettingsSave){
  var collection = db.get('settings');
  var settings = settingsFromTransportJSON(aSettingsJSON);

  collection.count({ _id: settings._id }, function(aError, aCount){
    //TODO(alexk): make settings id map to user
    //if (aCount == 0) dbUtil.getUniqueIdAsync(collection,
    //    function(aUniqueId){
      settings._id = /*aUniqueId*/1;
      collection.insert(settings, {}, function(aError, aResult){
        // Passing new id to callback.
        aOnSettingsSave(/*aUniqueId*/1);
      });
    //})
    else if (aCount > 0)
      collection.update({ _id: settings._id }, settings, {},
          function(aError, aResult){
        // Signalizing that update was ok.
        aOnSettingsSave(0);
      });

  });
};


/**
 * Turns db settings object into transportable json.
 * @param {Object} aSettings DB representation of settings.
 * @return {Object} JSON representation of settings.
 */
function settingsToTransportJSON(aSettings) {

  //NOTE(alexk): some settings may be restricted for transporting.
  return aSettings;
};


/**
 * Turns settings transportable json to db object.
 * @param {Object} aSettingsJSON JSON representation of settings.
 * @return {Object} DB representation of settings.
 */
function settingsFromTransportJSON(aSettingsJSON) {

  //NOTE(alexk): some settings may be restricted for db saving.
  return aSettingsJSON;
};