/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var appConfig = require('../config/appconfig');
var ua = require('../util/useragent');
var getLoginCssFileNames = require('../util/pagehelper').getLoginCssFileNames;
var STATIC_DIR = require('../util/pagehelper').STATIC_DIR;
var viewAdapter = require('../util/viewadapter');
var fs = require('fs');
var path = require('path');
var log = appConfig.log;


/**
 * Renders login view.
 */
exports.render = function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    if (appConfig.BUILT) {
      viewAdapter.getCompiledTargetAsync(req, function(aTarget) {
        res.render(appConfig.USE_OAUTH ? 'login-google' : 'login', {
          processed: appConfig.COMPILED || appConfig.BUILT,
          staticDir: STATIC_DIR,
          jsFileNames: [],
          cssFileNames: getLoginCssFileNames(aTarget)
        });
      });
    } else {

      res.render(appConfig.USE_OAUTH ? 'login-google' : 'login', {
        processed: appConfig.COMPILED || appConfig.BUILT,
        staticDir: STATIC_DIR,
        jsFileNames: [],
        cssFileNames: getLoginCssFileNames()
      });
    }
  }
};


/**
 * Performs logout.
 */
exports.logout = function(req, res){
  req.logout();
  res.redirect('/login');
};