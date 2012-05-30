/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Types of custom events.
 */


goog.provide('rflect.cal.EventType');


/**
 * Enumeration for event types
 * @enum {string}
 */
rflect.cal.EventType = {
  MENU_COMMAND_NOW: 'toppanenow',
  MENU_COMMAND_PREV: 'toppaneprev',
  MENU_COMMAND_NEXT: 'toppanenext',
  MENU_COMMAND_NEW_EVENT: 'toppaneevent',
  MENU_COMMAND_DAY: 'topppaneday',
  MENU_COMMAND_WEEK: 'toppaneweek',
  MENU_COMMAND_MONTH: 'toppanemonth',
  MENU_COMMAND_YEAR: 'toppaneyear',
  MENU_COMMAND_OPTIONS: 'toppaneoptions'
};
