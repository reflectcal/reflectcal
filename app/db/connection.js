/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB connection.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var mongo = require('mongodb');
var monk = require('monk');
var appConfig = require('./../config/appconfig');


exports.db = monk(process.env.DB_URL + '/' + appConfig.DB_NAME);