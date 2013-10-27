/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - event DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var db = require('./connection').db;
var dbUtil = require('./util');


/**
 * Loads events.
 * @param {Array} aLookupJSON JSON with event lookup params.
 * @param {function(Array)} aOnEventsLoad Callback that will be executed
 * when db request is ready.
 */
exports.getEventsAsync = function(aLookupJSON, aOnEventsLoad){
  var collection = db.get('events');
  var events = [];

  var intervalStart = aLookupJSON[0];
  var intervalEnd = aLookupJSON[1];
  var calendarIds = aLookupJSON.slice(2);

  collection.find({
    start: {$lt: intervalEnd},
    end: {$gt: intervalStart},
    calendarId: {$in: calendarIds}
  }, {}, function(aError, aEvents){
    aEvents && aEvents.forEach(function(aEvent) {
      events.push(eventToTransportJSON(aEvent));
    });

    // Executing callback for view.
    aOnEventsLoad(events);
  });
};


/**
 * Saves event.
 * @param {Object} aEventJSON JSON representing event.
 * @param {function(string|number)} aOnEventSave Callback that will be
 * called when db request is ready.
 */
exports.saveEventAsync = function(aEventJSON, aOnEventSave){
  var collection = db.get('events');
  var event = eventFromTransportJSON(aEventJSON);

  collection.count({ _id: event._id }, function(aError, aCount){
    console.log(aCount);
    if (aCount == 0) dbUtil.getUniqueIdAsync(collection,
        function(aUniqueId){
      event._id = aUniqueId;
      collection.insert(event, {}, function(aError, aResult){
        // Passing new id to callback.
        aOnEventSave(aUniqueId);
      });
    })
    else if (aCount > 0)
      collection.update({ _id: event._id }, event, {},
          function(aError, aResult){
        // Signalizing that update was ok.
        aOnEventSave(0);
      });
  });
};


/**
 * Deletes event.
 * @param {string} aEventId Event id.
 * @param {function(number)} aOnEventDelete Callback that will be called
 * when db request is ready.
 */
exports.deleteEventAsync = function(aEventId, aOnEventDelete){
  var collection = db.get('events');

  collection.remove({ _id: aEventId }, {}, function(aError, aResult){
    // Passing result to callback.
    aOnEventDelete(aResult);
  });
};


/**
 * Turns db event object into transportable json.
 * @param {Object} aEvent DB representation of event.
 * @return {Array} JSON representation of event.
 */
function eventToTransportJSON(aEvent) {

  var event = [];

  event.push(aEvent._id);
  event.push(aEvent.start);
  event.push(aEvent.end);
  event.push(aEvent.name);
  event.push(aEvent.description);
  event.push(aEvent.allDay);
  event.push(aEvent.calendarId);

  return event;
};


/**
 * Turns event transportable json to db object.
 * @param {Array} aEventJSON JSON representation of event.
 * @return {Object} DB representation of event.
 */
function eventFromTransportJSON(aEventJSON) {
  console.log(aEventJSON);
  var event = {};

  event.calendarId = aEventJSON.pop();
  event.allDay = aEventJSON.pop();
  event.description = aEventJSON.pop();
  event.name = aEventJSON.pop();
  event.end = aEventJSON.pop();
  event.start = aEventJSON.pop();
  event._id = aEventJSON.pop();

  return event;
};