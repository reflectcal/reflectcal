/*
 * Copyright (c) 2013. Rflect, Alex K.
 */


/**
 * @fileoverview Default calendars.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var merge = require('merge');


exports.DEFAULT_EVENT = {
  calendarId : '',
  allDay : false,
  description : '',
  name : '',
  end : 0,
  start : 0,
};


/**
 * @param {Array.<string>} aCalendarIds Calendar ids.
 */
exports.generateDefaultEvents = function(aCalendarIds) {
  var now = new Date();
  
  var meetElonMuskStart = new Date(now.getFullYear(), now.getMonth(), 
    now.getDate(), 16, 0, 0);
  var meetElonMuskEnd = new Date(now.getFullYear(), now.getMonth(),
    now.getDate(), 18, 0, 0);
  var meetElonMuskEvent = merge(exports.DEFAULT_EVENT, {
    start: meetElonMuskStart.getTime(),  
    end: meetElonMuskEnd.getTime(),
    calendarId: aCalendarIds[1] || '',
    name: 'Meet Elon Musk'
  });
  
  var readRainbowsEndStart = new Date(now.getFullYear(), now.getMonth(), 
    now.getDate(), 5, 30, 0);
  var readRainbowsEndEnd = new Date(now.getFullYear(), now.getMonth(),
    now.getDate(), 12, 0, 0);
  var readRainbowsEndEvent = merge(exports.DEFAULT_EVENT, {
    start: readRainbowsEndStart.getTime(),  
    end: readRainbowsEndEnd.getTime(),
    calendarId: aCalendarIds[2] || '',
    name: 'Read Rainbow\'s End'
  });

  return [readRainbowsEndEvent, meetElonMuskEvent];
};