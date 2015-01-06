/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var appConfig = require('../config/appconfig');
var ua = require('../util/useragent');
var getJsFileNames = require('../util/pagehelper').getJsFileNames;
var getCssFileNames = require('../util/pagehelper').getCssFileNames;
var STATIC_DIR = require('../util/pagehelper').STATIC_DIR;


/**
 * Renders login view.
 */
exports.render = function(req, res) {
  if (req.user) {
    res.redirect('/view');
  } else {
    var jsFileNames = [];
    var cssFileNames = [];

    if (appConfig.BUILT) {
      viewAdapter.getCompiledTargetAsync(req, function(aTarget, aSettings) {
        Array.prototype.push.apply(jsFileNames, getJsFileNames(aTarget));
        Array.prototype.push.apply(cssFileNames, getCssFileNames(aTarget));
      });
    } else {
      Array.prototype.push.apply(jsFileNames, getJsFileNames());
      Array.prototype.push.apply(cssFileNames, getCssFileNames());
    }

    res.render('login-google', {
      processed: appConfig.COMPILED || appConfig.BUILT,
      staticDir: STATIC_DIR,
      jsFileNames: jsFileNames,
      cssFileNames: cssFileNames
    });
  }
};


/**
 * Performs logout.
 */
exports.logout = function(req, res){
  req.logout();
  res.redirect('/login');
};