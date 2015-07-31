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
    var jsFileNames = [];
    var cssFileNames = [];

    Array.prototype.push.apply(jsFileNames, getLoginNamesFromFs('js'));
    Array.prototype.push.apply(cssFileNames, getLoginNamesFromFs('css'));

    res.render(appConfig.USE_OAUTH ? 'login-google' : 'login', {
      processed: appConfig.COMPILED || appConfig.BUILT,
      staticDir: STATIC_DIR,
      jsFileNames: jsFileNames,
      cssFileNames: cssFileNames
    });
  }
};


/**
 * @param {string} aType Type of asset (js, css).
 * @return {Array.<string>} File names on filesystem.
 */
function getLoginNamesFromFs(aType) {
  var pathToDir = path.resolve(__dirname + '/' + '../../' + STATIC_DIR + '/' + aType);
  log.info('path: ', pathToDir);
  return fs.readdirSync(pathToDir).sort().filter(function(aName){
    log.info('aName: ', aName);
    var regexp = new RegExp('login.*' + aType + '$');
    log.info('regexp: ', regexp);
    log.info('regexp.test(aName): ', regexp.test(aName));
    return regexp.test(aName);
  });
}


/**
 * Performs logout.
 */
exports.logout = function(req, res){
  req.logout();
  res.redirect('/login');
};