/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Class for decorating scrollable elements with momentum
 * scrolling behavior.
 * {@see} https://developers.google.com/mobile/articles/webapp_fixed_ui#animating
 */

goog.provide('rflect.ui.MomentumScroller');


goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.EventHandler');



/**
 * Mouse miss behaviour main class.
 * @constructor
 * @extends {goog.events.EventHandler}
 */
rflect.ui.MomentumScroller = function() {

  goog.events.EventHandler.call(this);

}
goog.inherits(rflect.ui.MomentumScroller, goog.events.EventHandler);


/**
 * Global instances counter.
 * {@type} number
 * @private
 */
rflect.ui.MomentumScroller.instancesCount_;


/**
 * Global listener key.
 * {@type} goog.events.Key
 * @private
 */
rflect.ui.MomentumScroller.documentListenerKey_;


/**
 * Whether this behavior is enabled.
 * @type {boolean}
 * @private
 */
rflect.ui.MomentumScroller.prototype.enabled_;


/**
 * Start touch Y offset.
 * @type {number}
 */
rflect.ui.MomentumScroller.prototype.startTouchY = 0;


/**
 * Position of content.
 * @type {number}
 */
rflect.ui.MomentumScroller.prototype.contentOffsetY = 0;


/**
 * At what position content is initially placed.
 * @type {number}
 */
rflect.ui.MomentumScroller.prototype.contentStartOffsetY = 0;


/**
 * @type {Element}
 */
rflect.ui.MomentumScroller.prototype.element;


/**
 * @param {Element} aElement Element to set.
 */
rflect.ui.MomentumScroller.prototype.setElement = function(aElement) {
  this.element = aElement;
}


/**
 * Enables behaviour when dialog is closed when mouse misses it.
 * @param {boolean} aEnabled Whether to enable behaviour.
 * @param {Element=} opt_element Element to set.
 */
rflect.ui.MomentumScroller.prototype.enable = function(aEnabled, opt_element) {
  var enabled = this.isEnabled();
  if (enabled == aEnabled)
    return;

  this.enabled_ = aEnabled;

  if (aEnabled) {
    rflect.ui.MomentumScroller.instancesCount_++;
    this.enterDocument();
    this.animateTo(0);
    this.element = opt_element;
  } else {
    rflect.ui.MomentumScroller.instancesCount_--;
    this.enterDocument();
    this.element = null;

    this.startTouchY = 0;
    this.contentOffsetY = 0;
    this.contentStartOffsetY = 0;
  }
}


/**
 * @return {boolean} Whether mouse miss close is enabled.
 */
rflect.ui.MomentumScroller.prototype.isEnabled = function() {
  return this.enabled_;
}


/**
 * Attaches all listeners to implement mouse miss behavior.
 */
rflect.ui.MomentumScroller.prototype.enterDocument = function() {
  this.attachDocumentListener_();
  this.listen(this.element, goog.events.EventType.TOUCHSTART,
      this.onTouchStart);
  this.listen(this.element, goog.events.EventType.TOUCHMOVE, this.onTouchMove);
  this.listen(this.element, goog.events.EventType.TOUCHEND, this.onTouchEnd);
}


/**
 * Attaches listeners to implement mouse miss behavior.
 */
rflect.ui.MomentumScroller.prototype.exitDocument = function() {
  this.detachDocumentListener_();
  this.removeAll();
}


/**
 * Attaches global touchmove listener.
 * @private
 */
rflect.ui.MomentumScroller.prototype.attachDocumentListener_ = function() {
  if (!goog.isDefAndNotNull(rflect.ui.MomentumScroller.documentListenerKey_))
    rflect.ui.MomentumScroller.documentListenerKey_ = goog.events.listen(
        document.body, goog.events.EventType.TOUCHMOVE,
        rflect.ui.MomentumScroller.onDocumentTouchMove_, false, this);
}


/**
 * Detaches global touchmove listener.
 * @private
 */
rflect.ui.MomentumScroller.prototype.detachDocumentListener_ = function() {
  if (rflect.ui.MomentumScroller.instancesCount_ == 0) {
    goog.events.unlistenByKey(rflect.ui.MomentumScroller.documentListenerKey_);
    rflect.ui.MomentumScroller.documentListenerKey_ = null;
  }
}


/**
 * Document-level mouse listener.
 * @param {aEvent} Event object.
 */
rflect.ui.MomentumScroller.onDocumentTouchMove_ = function(aEvent) {
  // This prevents native scrolling from happening.
  aEvent.preventDefault();
}


/**
 * @param {aEvent} Event object.
 */
rflect.ui.MomentumScroller.prototype.onTouchStart = function(aEvent) {
  // This will be shown in part 4.
  this.stopMomentum();

  this.startTouchY = aEvent.touches[0].clientY;
  this.contentStartOffsetY = this.contentOffsetY;
}


/**
 * @param {aEvent} Event object.
 */
rflect.ui.MomentumScroller.prototype.onTouchMove = function(aEvent) {
  if (this.isDragging()) {
    var currentY = aEvent.touches[0].clientY;
    var deltaY = currentY - this.startTouchY;
    var newY = deltaY + this.contentStartOffsetY;
    this.animateTo(newY);
  }
}


/**
 * @param {aEvent} Event object.
 */
rflect.ui.MomentumScroller.prototype.onTouchEnd = function(aEvent) {
  if (this.isDragging()) {
    if (this.shouldStartMomentum()) {
      // This will be shown in part 3.
      this.doMomentum();
    } else {
      this.snapToBounds();
    }
  }
}


rflect.ui.MomentumScroller.prototype.animateTo = function(offsetY) {
  this.contentOffsetY = offsetY;

  // We use webkit-transforms with translate3d because these animations
  // will be hardware accelerated, and therefore significantly faster
  // than changing the top value.
  this.element.style.webkitTransform = 'translate3d(0, ' + offsetY + 'px, 0)';
}


// Implementation of this method is left as an exercise for the reader.
// You need to measure the current position of the scrollable content
// relative to the frame. If the content is outside of the boundaries
// then simply reposition it to be just within the appropriate boundary.
rflect.ui.MomentumScroller.prototype.snapToBounds = function() {
}


// Implementation of this method is left as an exercise for the reader.
// You need to consider whether their touch has moved past a certain
// threshold that should be considered ‘dragging’.
rflect.ui.MomentumScroller.prototype.isDragging = function() {
}


// Implementation of this method is left as an exercise for the reader.
// You need to consider the end velocity of the drag was past the
// threshold required to initiate momentum.
rflect.ui.MomentumScroller.prototype.shouldStartMomentum = function() {
}


rflect.ui.MomentumScroller.prototype.doMomentum = function() {
  // Calculate the movement properties. Implement getEndVelocity using the
  // start and end position / time.
  var velocity = this.getEndVelocity();
  var acceleration = velocity < 0 ? 0.0005 : -0.0005;
  var displacement = - (velocity * velocity) / (2 * acceleration);
  var time = - velocity / acceleration;

  // Set up the transition and execute the transform. Once you implement this
  // you will need to figure out an appropriate time to clear the transition
  // so that it doesn’t apply to subsequent scrolling.
  this.element.style.webkitTransition = '-webkit-transform ' + time +
      'ms cubic-bezier(0.33, 0.66, 0.66, 1)';

  var newY = this.contentOffsetY + displacement;
  this.contentOffsetY = newY;
  this.element.style.webkitTransform = 'translate3d(0, ' + newY + 'px, 0)';
}


rflect.ui.MomentumScroller.prototype.stopMomentum = function() {
  if (this.isDecelerating()) {
    // Get the computed style object.
    var style = document.defaultView.getComputedStyle(this.element, null);
    // Computed the transform in a matrix object given the style.
    var transform = new WebKitCSSMatrix(style.webkitTransform);
    // Clear the active transition so it doesn’t apply to our next transform.
    this.element.style.webkitTransition = '';
    // Set the element transform to where it is right now.
    this.animateTo(transform.m42);
  }
}


/**
 * To implement.
 * @return {number}
 */
rflect.ui.MomentumScroller.prototype.getEndVelocity = function() {}


/**
 * To implement.
 * @return {boolean}
 */
rflect.ui.MomentumScroller.prototype.isDecelerating = function() {}


/**
 * Alias to setMouseMissToCancel with false argument.
 */
rflect.ui.MomentumScroller.prototype.disposeInternal = function() {
  //Dispose logic specific for MomentumScroller.
  this.enable(false);

  rflect.ui.MomentumScroller.superClass_.disposeInternal.call(this);
};
