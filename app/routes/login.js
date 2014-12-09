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
exports.view = function(req, res){
  if (req.user)
    res.redirect('/view');
  else
    res.render('login', {
      processed: appConfig.COMPILED || appConfig.BUILT,
      staticDir: STATIC_DIR,
      jsFileNames: getJsFileNames(),
      cssFileNames: getCssFileNames()
    });
};


/**
 * Performs logout.
 */
exports.logout = function(req, res){
  req.logout();
  res.redirect('/login');
};