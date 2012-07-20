/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Point and a line that show current time.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.TimeMarker');

goog.require('goog.Disposable');
goog.require('goog.events');
goog.require('rflect.pagevis');



/**
 * Time marker class.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.TimeMarker = function(aMainPane) {

  this.evKey_ = goog.events.listen(document,
      rflect.pagevis.nameOfVisibilityChangeEvent, this.onTick_, false, this);

};
goog.inherits(rflect.cal.TimeMarker, goog.Disposable);


/**
 * Key for visibilitychange listener.
 * @type {string}
 * @private
 */
this.evKey_;


/**
 * Timeout handle.
 * @type {integer}
 * @private
 */
this.timer_;


/**
 * Timer tick callback.
 * @type {boolean}
 */
rflect.cal.TimeMarker.prototype.onTick_ = function() {
  if (rflect.pagevis.pageIsVisible()){

  }
};


/**
 * Starts time marker cycle.
 */
rflect.cal.TimeMarker.prototype.run = function() {
  this.timer_ = setTimeout(goog.bind(onTick_, this), 60 * 60 * 1000);
}


/**
 * Disposes of time marker.
 */
rflect.cal.TimeMarker.prototype.disposeInternal = function() {
  rflect.cal.TimeMarker.superClass_.disposeInternal.call(this);

  goog.events.unlistenByKey(this.evKey_);
  clearTimeout(this.timer_);
};
