/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Individual event class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.events.Event');



/**
 * Class that stores info about event.
 * @constructor
 */
rflect.cal.events.Event = function() {
};


/**
 * Id of event.
 * @type {number}
 */
rflect.cal.events.Event.prototype.id;


/**
 * Id of event that is stored on server.
 * @type {string}
 */
rflect.cal.events.Event.prototype.longId;


/**
 * Description of event.
 * @type {string}
 */
rflect.cal.events.Event.prototype.description;



