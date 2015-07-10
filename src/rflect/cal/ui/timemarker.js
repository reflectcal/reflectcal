/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Point and a line that show current time.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.TimeMarker');

goog.require('goog.Disposable');
goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('rflect.browser.pagevisibility');
goog.require('rflect.date');
goog.require('rflect.cal.ui.soy.timemarker');



/**
 * Time marker class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.ui.TimeMarker = function(aViewManager, aTimeManager) {

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  if (rflect.browser.pagevisibility.isAvailable())
    this.evKey_ = goog.events.listen(document,
        rflect.browser.pagevisibility.nameOfVisibilityChangeEvent, this.onTick_, false, this);

};
goog.inherits(rflect.cal.ui.TimeMarker, goog.Disposable);


rflect.cal.ui.TimeMarker.HEAD_PARTS_ = [
  '<div id="time-marker-head" style="top:',
  /*Position of marker head, in pixels (200).*/
  'px;" class="' + goog.getCssName('time-marker-head') + '"></div>',
  '<div id="time-marker" style="top:',
  /*Position of marker line, in pixels (200).*/
  'px;" class="' + goog.getCssName('time-marker') + '"></div>'
];


/**
 * Key for visibilitychange listener.
 * @type {goog.events.Key}
 * @private
 */
rflect.cal.ui.TimeMarker.prototype.evKey_;


/**
 * Timeout handle.
 * @type {number}
 * @private
 */
rflect.cal.ui.TimeMarker.prototype.timer_;


/**
 * Timer tick callback.
 * @param {goog.events.Event=} opt_event Event object.
 * @private
 */
rflect.cal.ui.TimeMarker.prototype.onTick_ = function(opt_event) {
  if (rflect.browser.pagevisibility.pageIsVisible() && this.viewManager_.isInWeekMode()) {
    var today = new goog.date.DateTime();
    var headEl = goog.dom.getElement('time-marker-head');
    if (headEl)
      headEl.style.top = this.getPosition(true, today) + 'px';
    if (this.timeManager_.isInNowPoint) {
      var index = this.getIndexOfTodayBlock_(today);
      var lineEl = this.getMarkerEl_();
      if (lineEl)
        lineEl.style.top = this.getPosition(false, today) + 'px';

      goog.dom.getElement('wk-events-layer-col' + index).appendChild(lineEl);
    }

  }
  // If it's event callback, reset timer.
  if (opt_event)
    this.stop();
  this.start();
};

/**
 * @param {boolean} aHead Whether to calculate head position or line one.
 * @param {goog.date.Date=} opt_today Today's date.
 * @return {number} Position of marker.
 */
rflect.cal.ui.TimeMarker.prototype.getPosition = function(aHead, opt_today) {
  var today = opt_today || new Date();
  var timePos = today.getHours() * 60 + today.getMinutes();
  var pixelPos = timePos * rflect.cal.predefined.HOUR_ROW_HEIGHT / 30;

  if (aHead)
    pixelPos -= rflect.cal.predefined.TIME_MARKER_HEAD_HEIGHT / 2;
  else
    pixelPos -= rflect.cal.predefined.TIME_MARKER_LINE_HEIGHT / 2;

  return pixelPos;
}


/**
 * @param {goog.date.Date} aToday Today's date.
 * @return {number} Index of block corresponding to today.
 */
rflect.cal.ui.TimeMarker.prototype.getIndexOfTodayBlock_ = function(aToday) {
  return goog.array.findIndex(this.timeManager_.daySeries,
      function(aDate){
    return aDate.equals(aToday, rflect.date.fields.YEAR |
      rflect.date.fields.MONTH | rflect.date.fields.DATE);
  });
}


/**
 * @return {Element} Marker line element.
 */
rflect.cal.ui.TimeMarker.prototype.getMarkerEl_ = function() {
  return /**@type {Element}*/(goog.dom.removeNode(
      goog.dom.getElement('time-marker'))) || goog.dom.createDom('div', {
    id: 'time-marker',
    className: goog.getCssName('time-marker')
  });
}


/**
 * Starts time marker cycle.
 */
rflect.cal.ui.TimeMarker.prototype.start = function() {
  this.timer_ = setTimeout(goog.bind(this.onTick_, this), 60 * 1000);
}


/**
 * Stops time marker cycle.
 */
rflect.cal.ui.TimeMarker.prototype.stop = function() {
  clearTimeout(this.timer_);
}


/**
 * Builds head point of time marker.
 * @return {string}
 */
rflect.cal.ui.TimeMarker.prototype.buildHead = function() {
  return rflect.cal.ui.soy.timemarker.timeMarkerHead({
    top: this.getPosition(true)
  });
}


/**
 * Builds time marker line in today block.
 * @return {string}
 */
rflect.cal.ui.TimeMarker.prototype.buildLine = function() {
  return rflect.cal.ui.soy.timemarker.timeMarkerHead({
    top: this.getPosition(false)
  });
}


/**
 * Disposes of time marker.
 */
rflect.cal.ui.TimeMarker.prototype.disposeInternal = function() {
  rflect.cal.ui.TimeMarker.superClass_.disposeInternal.call(this);

  this.stop();
  goog.events.unlistenByKey(this.evKey_);
};
