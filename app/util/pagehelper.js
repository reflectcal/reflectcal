/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Login utilities.
 */


var userDAO = require('../db/user');
var appConfig = require('../config/appconfig');
var log = appConfig.log;
var targets = require('../config/targets').TARGETS;
var fs = require('fs');
var path = require('path');


exports.STATIC_DIR = appConfig.BUILT ? '/static' : '';


/**
 * @return {Array.<string>} File names of compiled js.
 */
exports.getStaticDir = function() {
  return appConfig.BUILT ? targets[0].jsFileNames :
      appConfig.COMPILED ? getCompiledJsNamesFromFs() : [];
}


/**
 * @param {Object=} opt_target Compiled target.
 * @return {Array.<string>} File names of compiled js.
 */
exports.getJsFileNames = function(opt_target) {
  return opt_target ? opt_target.jsFileNames : getCompiledJsNamesFromFs();
}


/**
 * @param {Object=} opt_target Compiled target.
 * @return {Array.<string>} File names of compiled css.
 */
exports.getCssFileNames = function(opt_target) {
  return opt_target ? opt_target.cssFileNames: getCompiledCssNamesFromFs();
}


/**
 * @return {Array.<string>} Js file names on filesystem.
 */
function getCompiledJsNamesFromFs() {
  return getCompiledAssetNamesFromFs('js');
}


/**
 * @return {Array.<string>} Js file names on filesystem.
 */
function getCompiledCssNamesFromFs() {
  return getCompiledAssetNamesFromFs('css');
}


/**
 * @param {string} aType Type of asset (js, css).
 * @return {Array.<string>} File names on filesystem.
 */
function getCompiledAssetNamesFromFs(aType) {
  var pathToDir = path.resolve(__dirname + '/' + '../../' + exports.STATIC_DIR + '/' + aType);
  log.info('path: ', pathToDir);
  return fs.readdirSync(pathToDir).sort().filter(function(aName){
    log.info('aName: ', aName);
    var regexp = new RegExp('.*outputcompiled.*' + aType + '$');
    log.info('regexp: ', regexp);
    log.info('regexp.test(aName): ', regexp.test(aName));
    return regexp.test(aName);
  });
}