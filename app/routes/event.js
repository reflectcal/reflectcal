/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Main view - calendar page.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


/**
 * Renders main page for compiled view.
 */
exports.eventsLoad = function(req, res){
  res.render('rflectcalendar-compiled', { calendars: '[]', settings: '[]' });
};


/**
 * Renders main page for uncompiled view.
 */
exports.eventSave = function(req, res){
  res.render('rflectcalendar-source', { calendars: '[]', settings: '[]' });
};


/**
 * Renders main page for uncompiled view.
 */
exports.eventDelete = function(req, res){
  res.render('rflectcalendar-source', { calendars: '[]', settings: '[]' });
};