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
exports.getCredentialsObject = function () {
  var jsonObject = JSON.parse(process.env.CREDS_OBJECT);
  return jsonObject;
}