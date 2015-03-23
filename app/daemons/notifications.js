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


exports.start = function(aServer){

  var wss = new WebSocketServer({port: appConfig.WEBSOCKETS_PORT,
    path: '/events-stream'
  });
  var target;

  wss.on('connection', function(ws) {
    var callback = function(document) {
      ws.send(JSON.stringify(document));
    }

    log.info('Connection is established.');
    ws.send('Test signal.');
    ws.on('message', function(message) {
      log.info('received: %s', message);
      target = eventDAO.addListenerForNewEvent(getEventFilter(message),
          callback);
    });
    ws.on('close', function() {
      eventDAO.removeListenerForNewEvent(target);
      log.info('disconnected');
    });
  });

  log.info('Started daemon for listening new events for port ' +
      appConfig.WEBSOCKETS_PORT + '.');
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
