/*
 * Copyright (c) 2014. Reflect, Alex K.
 */

/**
 * @fileoverview OAuth utilities.
 */


var fs = require('fs');
var DEFAULT_CLIENT_SECRET = require('../config/defaultclientsecret').
    DEFAULT_CLIENT_SECRET;
var path = require('path');
var appConfig = require('../config/appconfig');
var log = appConfig.log;


/**
 * @return {Object} Credentials object.
 */
exports.getCredentialsObject = function() {
  var rootPath = path.resolve(__dirname + '/' + '../../');
  log.info('path: ', rootPath);
  var jsonFiles = fs.readdirSync(rootPath).filter(function(aName){
    log.info('aName: ', aName);
    var regexp = new RegExp('^client_secret_.*json$');
    return regexp.test(aName);
  });
  
  if (jsonFiles.length) {
    try {
      var jsonObject = JSON.parse(fs.readFileSync(jsonFiles[0], {
        encoding: 'utf-8'
      }));
      return jsonObject;
    }
    catch (e) {
      return DEFAULT_CLIENT_SECRET;
    }
  }
  return DEFAULT_CLIENT_SECRET;
}