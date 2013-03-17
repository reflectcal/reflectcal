/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Point and a line that show current time.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TimeMarker');

goog.require('goog.Disposable');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('rflect.pagevis');
goog.require('rflect.date');



/**
 * Time marker class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.TimeMarker = function(aViewManager, aTimeManager) {

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

  if (rflect.pagevis.isAvailable())
    this.evKey_ = goog.events.listen(document,
        rflect.pagevis.nameOfVisibilityChangeEvent, this.onTick_, false, this);

};
goog.inherits(rflect.cal.TimeMarker, goog.Disposable);


rflect.cal.TimeMarker.HEAD_PARTS_ = [
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
rflect.cal.TimeMarker.prototype.evKey_;


/**
 * Timeout handle.
 * @type {number}
 * @private
 */
rflect.cal.TimeMarker.prototype.timer_;


/**
 * Timer tick callback.
 * @param {goog.events.Event=} opt_event Event object.
 * @private
 */
rflect.cal.TimeMarker.prototype.onTick_ = function(opt_event) {
  if (rflect.pagevis.pageIsVisible() && this.viewManager_.isInWeekMode()) {
    var today = new Date();
    var headEl = goog.dom.getElement('time-marker-head');
    if (headEl)
      headEl.style.top = this.getPosition_(true, today) + 'px';
    if (this.timeManager_.isInNowPoint) {
      var index = this.getIndexOfTodayBlock_(today);
      var lineEl = this.getMarkerEl_();
      if (lineEl)
        lineEl.style.top = this.getPosition_(false, today) + 'px';

      goog.dom.getElement('wk-dec-layer-in-col' + index).appendChild(lineEl);
    }

  }
  // If it's event callback, reset timer.
  if (opt_event)
    this.stop();
  this.start();
};

/**
 * @param {boolean} aHead Whether to calculate head position or line one.
 * @param {Date=} opt_today Today's date.
 * @return {number} Position of marker.
 */
rflect.cal.TimeMarker.prototype.getPosition_ = function(aHead, opt_today) {
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
 * @param {Date} aToday Today's date.
 * @return {number} Index of block corresponding to today.
 */
rflect.cal.TimeMarker.prototype.getIndexOfTodayBlock_ = function(aToday) {
  return goog.array.findIndex(this.timeManager_.daySeries,
      function(aDate){
    return aDate.equals(aToday, rflect.date.fields.YEAR |
      rflect.date.fields.MONTH | rflect.date.fields.DATE);
  });
}


/**
 * @return {Element} Marker line element.
 */
rflect.cal.TimeMarker.prototype.getMarkerEl_ = function() {
  return /**@type {Element}*/(goog.dom.removeNode(
      goog.dom.getElement('time-marker'))) || goog.dom.createDom('div', {
    id: 'time-marker',
    className: goog.getCssName('time-marker')
  });
}


/**
 * Starts time marker cycle.
 */
rflect.cal.TimeMarker.prototype.start = function() {
  this.timer_ = setTimeout(goog.bind(this.onTick_, this), 60 * 1000);
}


/**
 * Stops time marker cycle.
 */
rflect.cal.TimeMarker.prototype.stop = function() {
  clearTimeout(this.timer_);
}


/**
 * Builds head point of time marker.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 *
 * '<div style="top:',
 * Position of marker head, in pixels (200).
 * 'px;" class="' + goog.getCssName('time-marker-head') + '"></div>',
 */
rflect.cal.TimeMarker.prototype.buildHead = function(aSb) {
  aSb.append(rflect.cal.TimeMarker.HEAD_PARTS_[0]);
  aSb.append(this.getPosition_(true));
  aSb.append(rflect.cal.TimeMarker.HEAD_PARTS_[1]);
}


/**
 * Builds time marker line in today block.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 *
 * '<div style="top:',
 * /*Position of marker line, in pixels (200).
 * 'px;" class="' + goog.getCssName('time-marker') + '"></div>'
 */
rflect.cal.TimeMarker.prototype.buildLine = function(aSb) {
  aSb.append(rflect.cal.TimeMarker.HEAD_PARTS_[2]);
  aSb.append(this.getPosition_(false));
  aSb.append(rflect.cal.TimeMarker.HEAD_PARTS_[3]);
}


/**
 * Disposes of time marker.
 */
rflect.cal.TimeMarker.prototype.disposeInternal = function() {
  rflect.cal.TimeMarker.superClass_.disposeInternal.call(this);

  this.stop();
  goog.events.unlistenByKey(this.evKey_);
};
