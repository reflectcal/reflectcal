/*
 * Copyright (c) 2013. Epam, Alex K.
 */

/**
 * @fileoverview Listener for new events.
 * @author aliaksei_komleu@epam.com (Alex K.)
 */


var eventDAO = require('../db/event');
var WebSocketServer = require('ws').Server;
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var appConfig = require('../config/appconfig');
var log = appConfig.log;
var addUserToMap = require('../util/globalusermap').addUserToMap;
var removeUserFromMap = require('../util/globalusermap').removeUserFromMap;


var wss;
var checkTimer;
const SECOND = 1000;
const MINUTE = SECOND * 60;
const FIFTEEN_MINUTES = MINUTE * 15;

exports.start = function(aServer){

  wss = new WebSocketServer({
    port: appConfig.WEBSOCKETS_PORT
  });

  checkTimer = setTimeout(notificationLoopCallback, SECOND);

  wss.on('connection', function(ws) {
    log.info('Connection is established.');
    ws.send('Test signal.');
    ws.on('close', function() {
      removeUserFromMap(ws.upgradeReq);
      log.info('disconnected');
    });
  });

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };

  log.info('Started daemon for listening new events for port ' +
      appConfig.WEBSOCKETS_PORT + '.');
}


exports.stop = function(aServer){
  if (wss) {
    wss.close();
  }
  clearTimeout(checkTimer);
}


var lastCheckedTime = 0;


function notificationLoopCallback() {
  var eventsToNotifyOf;

  var now = new Date;
  now.setSeconds(0);
  now.setMilliseconds(0);

  var intervalStart = now.getTime() + FIFTEEN_MINUTES;

  //Allow body to run every minute.
  if (lastCheckedTime != intervalStart) {
    lastCheckedTime = intervalStart;

    entityDAO.getEntitiesAsync('events', {
      start: {
        $lt: intervalStart + MINUTE,
        $gte: intervalStart
      }
    }, aOnEventsLoad, eventToTransportJSON);

    checkTimer = setTimeout(notificationLoopCallback, SECOND);
  }
}


/**
 * @param {string} aJSONFilter JSON representation of filter.
 * @return {Object} Mongo collection filter.
 */
function getEventFilter(aJSONFilter) {
  var jsonFilter = JSON.parse(aJSONFilter);
  var fieldName = jsonFilter.fieldName;
  var filter = {
    time: {}
  };
  filter.time.$gte = new Date(jsonFilter.time);

  //Initially we show all request types.
  if (!jsonFilter.allTypes) {
    filter[fieldName] = {};
    filter[fieldName].$in = [];
    jsonFilter.requestType.forEach(function(key){
      filter[fieldName].$in.push(key);
    });
  }

  console.log('jsonFilter: ', jsonFilter);
  console.log('filter: ', JSON.stringify(filter));
  return filter;
}
