/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event, to control page show/hide behavior from subcomponents.
 */

goog.provide('rflect.cal.ui.PageRequestEvent');


goog.require('goog.events.Event');


/**
 * @type {string}
 * @const
 */
rflect.cal.ui.PAGE_REQUEST_EVENT_TYPE = {
  SLIDE_BREAK: 'pageRequest'
};


/**
 * Event that is fired to let know {@link rflect.cal.ui.Pager} know that page
 * should be turned visible/invisible.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {boolean} aShow Whether to show component.
 * @extends {goog.events.Event}
 * @constructor
 */
rflect.cal.ui.PageRequestEvent = function(aComponent, aShow) {
  goog.events.Event.call(this,
      rflect.cal.ui.PAGE_REQUEST_EVENT_TYPE);

  /**
   * Component associated with page.
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * Whether show this page.
   * @type {boolean}
   */
  this.show = aStart;
}
goog.inherits(rflect.cal.ui.PageRequestEvent,
    goog.events.Event);