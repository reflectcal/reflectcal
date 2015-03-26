/*
 * Copyright (c) 2013. Epam, Alex K.
 */

/**
 * @fileoverview Listener for new events.
 * @author aliaksei_komleu@epam.com (Alex K.)
 */


var eventDAO = require('../db/event');
var entityDAO = require('../db/entity');
var WebSocketServer = require('ws').Server;
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var appConfig = require('../config/appconfig');
var log = appConfig.log;
var getUserNameFromRequest = require('../util/users').getUserNameFromRequest;
var userIsRegistered = require('../util/users').userIsRegistered;


var webSocketServer;
var userNamesToWebSockets;
var checkTimer;
const SECOND = 1000;
const MINUTE = SECOND * 60;
const FIFTEEN_MINUTES = MINUTE * 15;


exports.start = function(aServer) {

  webSocketServer = new WebSocketServer({
    port: appConfig.WEBSOCKETS_PORT,
    path: appConfig.WEBSOCKETS_NOTIFICATIONS_PATH
  });
  userNamesToWebSockets = new Map();

  checkTimer = setTimeout(notificationLoopCallback, SECOND);

  webSocketServer.on('connection', function(aWebSocket) {
    console.log('connection: ', aWebSocket);
    userNamesToWebSockets.set(getUserNameFromRequest(aWebSocket.upgradeReq),
        aWebSocket);
    aWebSocket.on('close', function() {
      userNamesToWebSockets.delete(getUserNameFromRequest(aWebSocket.
          upgradeReq));
      log.info('disconnected');
    });
  });

  console.log('Started daemon for listening notifications on port ' +
      appConfig.WEBSOCKETS_PORT + '.');
}


exports.stop = function(aServer) {
  if (webSocketServer) {
    webSocketServer.close();
  }
  if (userNamesToWebSockets) {
    userNamesToWebSockets.clear();
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
    console.log('Once a minute tick.');
    lastCheckedTime = intervalStart;

    console.log('Requesting interval from: ', new Date(intervalStart).toISOString(), ' to: ', new Date(intervalStart + MINUTE).toISOString())
    entityDAO.getEntitiesWithPromise('events', {
      start: {
        $lt: intervalStart + MINUTE,
        $gte: intervalStart
      }
    }, function(aEvent) {return aEvent}).then(processEventsArray).catch(log);

  }
  checkTimer = setTimeout(notificationLoopCallback, SECOND);
}


function processEventsArray(aEvents) {
  console.log('aEvents: ', aEvents);
  var userNamesToEvents = new Map();

  aEvents.forEach(function(aEvent) {
    var userName = aEvent.username;
    var userName = 'alexeykofficial@gmail.com';
    if (userIsRegistered(userName)) {
      if (!userNamesToEvents.has(userName)) {
        userNamesToEvents.set(userName, [aEvent]);
      } else {
        userNamesToEvents.get(userName).push(aEvent);  
      }
    }
  });

  console.log('userNamesToEvents: ', userNamesToEvents);

  userNamesToEvents.forEach(function(aEvents, aUserName) {
    var ws = userNamesToWebSockets.get(aUserName);
    if (ws) {
      ws.send(JSON.stringify(aEvents));
    }
  });
}