/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Types of views.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.cal.ViewType');


/**
 * Enumeration for View types.
 * @enum {number}
 */
rflect.cal.ViewType = {
  NONE: 0,
  DAY: 1,
  MULTI_DAY: 2,
  WEEK: 3,
  MULTI_WEEK: 4,
  MONTH: 5,
  YEAR: 6,
  LIST: 7,
  EVENT_EDITOR: 8,
  OPTIONS: 9,
  CALENDAR_EDITOR: 10
};
