/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var entityDAO = require('./entity');
var dbUtil = require('./util');
var DEFAULT_SETTINGS = require('../config/defaultsettings').DEFAULT_SETTINGS;


/**
 * Loads settings.
 * @param {function(Object)} aOnSettingsLoad Callback that will be executed
 * when db request is ready.
 * TODO(alexk): think about multiple settings object per user, aka profiles.
 */
exports.getSettingsAsync = function(aOnSettingsLoad){
  console.log('getSettingsAsync');
  entityDAO.getEntitiesAsync('settings', {}, aOnSettingsLoad,
      settingsToTransportJSON, DEFAULT_SETTINGS);
};


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 * @param {function(string|number)} aOnSettingsSave Callback that will be
 * called when db request is ready.
 */
exports.saveSettingsAsync = function(aSettingsJSON, aOnSettingsSave){
  entityDAO.saveEntityAsync('settings', aSettingsJSON,
      aOnSettingsSave, settingsFromTransportJSON);
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