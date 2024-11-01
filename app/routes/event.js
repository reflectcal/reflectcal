/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event routes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

var eventDAO = require('../db/event');
var appConfig = require('../config/appconfig');
var log = appConfig.log;

/**
 * Loads events.
 */
exports.eventsLoad = function(req, res) {
  log.info('Request to load events received', { requestBody: req.body });

  var onEventsLoad = function(aEvents) {
    log.info('Events loaded successfully', { eventCount: aEvents.length });

    res.setHeader('Content-Type', 'application/json');
    const responseData = JSON.stringify(aEvents);
    res.send(responseData);
    log.info('Response successfully sent for events load', { responseData });
  };

  eventDAO.getEventsAsync(req.body, onEventsLoad);
};

/**
 * Saves event.
 */
exports.eventSave = function(req, res) {
  log.info('Request to save event received', { eventData: req.body });

  var onEventSave = function(aEventId) {
    log.info('Event saved successfully', { eventId: aEventId });

    res.setHeader('Content-Type', 'application/json');
    const responseData = JSON.stringify(aEventId);
    res.send(responseData);
    log.info('Response successfully sent for event save', { responseData });
  };

  eventDAO.saveEventAsync(req.body, onEventSave);
};

/**
 * Deletes event.
 */
exports.eventDelete = function(req, res) {
  log.info('Request to delete event received', { eventId: req.params.id });

  var onEventDelete = function(aResult) {
    if (aResult === 0) {
      log.info('Event deleted successfully', { eventId: req.params.id });
    } else {
      log.warn('Event not found for deletion', { eventId: req.params.id });
    }

    res.setHeader('Content-Type', 'application/json');
    const responseData = JSON.stringify(aResult);
    res.send(responseData);
    log.info('Response successfully sent for event deletion', { responseData });
  };

  eventDAO.deleteEventAsync(req.params.id, onEventDelete);
};
