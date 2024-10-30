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
  log.info('Received request to load events', { requestBody: req.body });

  var onEventsLoad = function(aEvents) {
    log.info(`Loaded ${aEvents.length} events`);
    res.send(JSON.stringify(aEvents));
  };

  eventDAO.getEventsAsync(req.body, function(aError, aEvents) {
    if (aError) {
      log.error('Error loading events', aError);
      res.status(500).send({ error: 'Failed to load events' });
    } else {
      onEventsLoad(aEvents);
    }
  });
};

/**
 * Saves event.
 */
exports.eventSave = function(req, res) {
  log.info('Received request to save event', { eventData: req.body });

  var onEventSave = function(aEventId) {
    log.info(`Event saved successfully with ID ${aEventId}`);
    res.send(JSON.stringify(aEventId));
  };

  eventDAO.saveEventAsync(req.body, function(aError, aEventId) {
    if (aError) {
      log.error('Error saving event', aError);
      res.status(500).send({ error: 'Failed to save event' });
    } else {
      onEventSave(aEventId);
    }
  });
};

/**
 * Deletes event.
 */
exports.eventDelete = function(req, res) {
  log.info('Received request to delete event', { eventId: req.params.id });

  var onEventDelete = function(aResult) {
    if (aResult === 0) {
      log.info(`Event with ID ${req.params.id} deleted successfully`);
    } else {
      log.warn(`Event with ID ${req.params.id} not found`);
    }
    res.send(JSON.stringify(aResult));
  };

  eventDAO.deleteEventAsync(req.params.id, function(aError, aResult) {
    if (aError) {
      log.error('Error deleting event', aError);
      res.status(500).send({ error: 'Failed to delete event' });
    } else {
      onEventDelete(aResult);
    }
  });
};
