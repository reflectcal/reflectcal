/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event routes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


var eventDAO = require('../db/event');


/**
 * Loads events.
 */
exports.eventsLoad = function(req, res){
  var onEventsLoad = function(aEvents) {
    res.send(JSON.stringify(aEvents));
  }

  eventDAO.getEventsAsync(req.body, onEventsLoad);
}


/**
 * Saves event.
 */
exports.eventSave = function(req, res){
  var onEventSave = function(aEventId) {
    res.send(JSON.stringify(aEventId));
  }

  eventDAO.saveEventAsync(req.body, onEventSave);
};


/**
 * Deletes event.
 */
exports.eventDelete = function(req, res){
  var onEventDelete = function(aResult) {
    res.send(JSON.stringify(aResult));
  }

  eventDAO.deleteEventAsync(req.params.id, onEventDelete);
};