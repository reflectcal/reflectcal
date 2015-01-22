/*
 * Copyright (c) 2013. Rflect, Alex K.
 */


/**
 * @fileoverview Default calendars.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var merge = require('object-merge');


exports.DEFAULT_EVENTS = [
  {
    calendarId : 0,
    allDay : false,
    description : '',
    name : 'Read Blindsight',
    start : 10 * 60 * 60 * 1000,
    end : 14 * 60 * 60 * 1000
  },{
    calendarId : 0,
    allDay : false,
    description : '',
    name : 'Watch Space Odyssey 2001',
    start : -86400000 + 16 * 60 * 60 * 1000,
    end : -86400000 + 20 * 60 * 60 * 1000
  },{
    calendarId : 2,
    allDay : false,
    description : '',
    name : '',
    start : -3 * 86400000 + 9.5 * 60 * 60 * 1000,
    end : -3 * 86400000 + 16 * 60 * 60 * 1000
  },{
    calendarId : 0,
    allDay : false,
    description : '',
    name : '',
    start : -3 * 86400000 + 10.5 * 60 * 60 * 1000,
    end : -3 * 86400000 + 17 * 60 * 60 * 1000
  },{
    calendarId : 1,
    allDay : false,
    description : '',
    name : '',
    start : -3 * 86400000 + 11.5 * 60 * 60 * 1000,
    end : -3 * 86400000 + 18 * 60 * 60 * 1000
  },{
    calendarId : 1,
    allDay : false,
    description : '',
    name : 'Meet Elon Musk',
    start : 16 * 60 * 60 * 1000,
    end : 18 * 60 * 60 * 1000
  },{
    calendarId : 2,
    allDay : true,
    description : '',
    name : 'Test and launch Reflect calendar',
    start : 86400000 + 0 * 60 * 60 * 1000,
    end : 86400000 + 24 * 60 * 60 * 1000
  },{
    calendarId : 2,
    allDay : false,
    description : '',
    name : 'Expecting call from Carl Sagan',
    start : -86400000 + 17 * 60 * 60 * 1000,
    end : -86400000 + 21 * 60 * 60 * 1000
  }
];


/**
 * @param {string} aCalendarId Calendar id.
 */
exports.generateDefaultEvents = function(aCalendarId, aColorCode) {
  var today = new Date();
  var offset = new Date(today.getFullYear(), today.getMonth(), today.getDate(),
      0, 0, 0).getTime();

  return exports.DEFAULT_EVENTS.filter(function(aEvent){
    return aEvent.calendarId == aColorCode;
  }).map(function(aEvent,
      aIndex) {
    return merge(aEvent, {
      start: aEvent.start + offset,
      end: aEvent.end + offset,
      calendarId: aCalendarId,
    })
  });
};