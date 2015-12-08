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
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.EventTarget');
goog.require('goog.style');
goog.require('rflect.browser.transitionend');
goog.require('rflect.browser.cssmatrix');
goog.require('rflect.browser.css');
goog.require('rflect.math');



/**
 * Momentum scroller main class.
 * @constructor
 * @extends {goog.events.EventHandler}
 */
rflect.ui.MomentumScroller = function() {

  goog.events.EventHandler.call(this);

}
goog.inherits(rflect.ui.MomentumScroller, goog.events.EventHandler);


/**
 * @type {number}
 */
rflect.ui.MomentumScroller.DRAG_THRESHOLD = 5;


/**
 * Maximum amount of pixels that content is allowed to be dragged outside of
 * frame.
 * @type {number}
 */
rflect.ui.MomentumScroller.OUT_OF_BOUNDS_MAXIMUM = 100;


/**
 * Acceleration for sliding.
 * @type {number}
 */
rflect.ui.MomentumScroller.ACCELERATION_SLIDING = 0.0005;


/**
 * Acceleration for bounce back.
 * @type {number}
 */
rflect.ui.MomentumScroller.ACCELERATION_BOUNCE_BACK_COEFF = 10;


/**
 * Stages of out-of-bounds transitions.
 * @enum {number}
 */
rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE = {
  NONE: -1,
  TO_BOUNDS: 0,
  BOUNCED_OUT: 1,
  BOUNCED_BACK: 2
};


/**
 * Maximum velocity for momentum.
 * @type {number}
 */
rflect.ui.MomentumScroller.MAXIMUM_VELOCITY = 3.5;


/**
 * Global instances counter.
 * @type {number}
 * @private
 */
rflect.ui.MomentumScroller.instancesCount_ = 0;


/**
 * Global listener key.
 * @type {goog.events.Key}
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
 * x0 point to calculate speed.
 * @see {getEndVelocity}
 * @type {number}
 * @private
 */
rflect.ui.MomentumScroller.prototype.previousPoint_ = 0;


/**
 * t0 time to calculate speed.
 * @type {number}
 * @private
 */
rflect.ui.MomentumScroller.prototype.previousMoment_ = 0;


/**
 * x1 point to calculate speed.
 * @type {number}
 * @private
 */
rflect.ui.MomentumScroller.prototype.currentPoint_ = 0;


/**
 * t1 time to calculate speed.
 * @type {number}
 * @private
 */
rflect.ui.MomentumScroller.prototype.currentMoment_ = 0;


/**
 * @type {boolean}
 * @private
 */
rflect.ui.MomentumScroller.prototype.isDragging_ = false;


/**
 * @type {boolean}
 * @private
 */
rflect.ui.MomentumScroller.prototype.isOutOfBounds_ = false;


/**
 * Whether momentum scrolling is in progress.
 * @type {boolean}
 * @private
 */
rflect.ui.MomentumScroller.prototype.isDecelerating_ = false;


/**
 * Whether stop propagation is needed on touch end.
 * @type {boolean}
 * @private
 */
rflect.ui.MomentumScroller.prototype.stopPropagationOnTouchEnd_ = false;


/**
 * What kind of out-of-bounds transition currently is in progress.
 * @type {rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE}
 */
rflect.ui.MomentumScroller.prototype.queuedTransitionStage_ =
    rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.NONE;


/**
 * @type {Element}
 */
rflect.ui.MomentumScroller.prototype.element;


/**
 * @type {Element}
 */
rflect.ui.MomentumScroller.prototype.frameElement;


/**
 * @type {goog.math.Size}
 */
rflect.ui.MomentumScroller.prototype.elementSize;


/**
 * @type {goog.math.Size}
 */
rflect.ui.MomentumScroller.prototype.frameElementSize;


/**
 * @param {Element} aElement Element to set.
 */
rflect.ui.MomentumScroller.prototype.setElement = function(aElement) {
  this.element = aElement;
}


/**
 * @param {Element} aFrameElement Frame element to set.
 */
rflect.ui.MomentumScroller.prototype.setFrameElement = function(aFrameElement) {
  this.frameElement = aFrameElement;
}


/**
 * @param {Element} aElement Element to set.
 * @param {Element} aFrameElement Frame element to set.
 */
rflect.ui.MomentumScroller.prototype.setElements = function(aElement,
                                                            aFrameElement) {
  this.setElement(aElement);
  this.setFrameElement(aFrameElement);
}


/**
 * Enables momentum scrolling. Call setElement before.
 * @see {setElement}
 * @param {boolean} aEnabled Whether to enable behavior.
 */
rflect.ui.MomentumScroller.prototype.enable = function(aEnabled) {
  var enabled = this.isEnabled();
  if (enabled == aEnabled)
    return;

  this.enabled_ = aEnabled;

  if (aEnabled) {
    rflect.ui.MomentumScroller.instancesCount_++;

    this.calculateSizes();

    this.enterDocument();
    this.animateTo(0);
  } else {
    rflect.ui.MomentumScroller.instancesCount_--;
    if (rflect.ui.MomentumScroller.instancesCount_ < 0)
      rflect.ui.MomentumScroller.instancesCount_ = 0;

    this.exitDocument();
    this.element = null;
    this.frameElement = null;

    this.startTouchY = 0;
    this.contentOffsetY = 0;
    this.contentStartOffsetY = 0;
  }
}


/**
 * Calculates sizes of frame and content elements.
 */
rflect.ui.MomentumScroller.prototype.calculateSizes = function() {
  this.elementSize = goog.style.getSize(this.element);
  this.frameElementSize = goog.style.getSize(this.frameElement);
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
  this.listen(this.element, goog.events.EventType.TOUCHSTART,
      (aEvent) => {
    aEvent.preventDefault();
  });
  this.listen(this.element, goog.events.EventType.TOUCHSTART,
      this.onTouchStart, true);
  this.listen(this.element, goog.events.EventType.TOUCHMOVE,
      this.onTouchMove);
  this.listen(this.element, goog.events.EventType.TOUCHEND,
      this.onTouchEnd, true);

  this.listen(this.element, goog.events.EventType.TOUCHSTART, (aEvent) => {
    if (goog.DEBUG)
      console.log('onTouchStart in capturing');
  }, true);
  this.listen(this.element, goog.events.EventType.TOUCHSTART, (aEvent) => {
    if (goog.DEBUG)
    console.log('onTouchStart in capturing');
  }, true);
  this.listen(this.element, goog.events.EventType.CLICK, (aEvent) => {
    if (goog.DEBUG)
      console.log('onClick');
  })

  this.listen(this.element,
      rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
      this.onTransitionEnd);
}


/**
 * Attaches listeners to implement mouse miss behavior.
 */
rflect.ui.MomentumScroller.prototype.exitDocument = function() {
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
 * @param {Event} aEvent Event object.
 */
rflect.ui.MomentumScroller.onDocumentTouchMove_ = function(aEvent) {
  // This prevents native scrolling from happening.
  aEvent.preventDefault();
}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.ui.MomentumScroller.prototype.onTouchStart = function(aEvent) {
  if (goog.DEBUG)
    console.log('onTouchStart');
  // This will be shown in part 4.
  this.stopMomentum();
  if (this.isDecelerating()) {
    aEvent.stopPropagation();
    aEvent.preventDefault();
  }

  this.startTouchY = aEvent.getBrowserEvent().touches[0].clientY;
  this.startTouchX = aEvent.getBrowserEvent().touches[0].clientX;
  this.contentStartOffsetY = this.contentOffsetY;

  this.previousPoint_ = this.currentPoint_ = this.startTouchY;
  this.previousMoment_ = this.currentMoment_ = goog.now();

  this.isDragging_ = true;
}


/**
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.ui.MomentumScroller.prototype.onTouchMove = function(aEvent) {
  if (goog.DEBUG)
    console.log('onTouchMove');
  if (this.isDragging()) {
    var currentY = aEvent.getBrowserEvent().touches[0].clientY;
    var deltaY = currentY - this.startTouchY;

    if (goog.DEBUG)
      console.log('deltaY before: ', deltaY);
    if (goog.DEBUG)
        console.log('this.isOutOfBounds(): ', this.isOutOfBounds());
    if (this.isOutOfBounds()) {
      deltaY /= Math.exp(Math.abs(deltaY/550))
    }
    if (goog.DEBUG)
      console.log('deltaY: after', deltaY);

    var newY = deltaY + this.contentStartOffsetY;

    this.previousPoint_ = this.currentPoint_;
    this.previousMoment_ = this.currentMoment_;

    this.currentPoint_ = currentY;
    this.currentMoment_ = goog.now();

    this.animateTo(newY);
  }
}


/**
 * @param {Event} aEvent object.
 */
rflect.ui.MomentumScroller.prototype.onTouchEnd = function(aEvent) {
  if (goog.DEBUG)
    console.log('onTouchEnd');
  if (this.isDragging()) {

    if (this.shouldStartMomentum()) {
      // This will be shown in part 3.
      this.doMomentum();
    } else {
      this.snapToBounds();
    }

  }


  if (this.stopPropagationOnTouchEnd_ || (Math.abs(this.currentPoint_ -
      this.startTouchY) >= rflect.ui.MomentumScroller.DRAG_THRESHOLD)) {
    //Prevent accidental selection of chips on main pane.
    aEvent.stopPropagation();
    aEvent.preventDefault();

    this.stopPropagationOnTouchEnd_ = false;
  } else {
    this.synthesizeClick(this.startTouchX, this.startTouchY);
  }

  this.previousPoint_ = this.previousMoment_ = this.currentPoint_ =
      this.currentMoment_ = 0;
  this.startTouchY = 0;
  this.startTouchX = 0;
  this.isDragging_ = false;
}


rflect.ui.MomentumScroller.prototype.synthesizeClick = function(aClientX,
    aClientY) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, false, window,
     0, 0, 0, aClientX, aClientY, false, false, false, false, 0, null);
  var element = document.elementFromPoint(aClientX, aClientY);
  var canceled = !element.dispatchEvent(evt);
  this.focusIfNeeded(element);
}


/**
 * @param {Element} aElement
 */
rflect.ui.MomentumScroller.prototype.focusIfNeeded = function(aElement) {
  if (rflect.ui.MomentumScroller.needsFocus(aElement)) {
		let length;
    if (aElement.setSelectionRange && aElement.type.indexOf('date') !== 0 &&
        aElement.type !== 'time' && aElement.type !== 'month') {
			length = aElement.value.length;
			aElement.setSelectionRange(length, length);
		} else {
			aElement.focus();
		}
	}
}

/**
 * @param {Element} aElement
 * @return {boolean} Whether focus is needed.
 */
rflect.ui.MomentumScroller.needsFocus = function(aElement) {
  switch (aElement.nodeName.toLowerCase()) {
    case 'textarea':
      return true;
    case 'select':
      return true;
    case 'input':
      switch (aElement.type) {
      case 'button':
      case 'checkbox':
      case 'file':
      case 'image':
      case 'radio':
      case 'submit':
        return false;
      }
      // No point in attempting to focus disabled inputs
      return !aElement.disabled && !aElement.readOnly;
    default: return false;
  }
}


/**
 * @param {Event} aEvent object.
 */
rflect.ui.MomentumScroller.prototype.onTransitionEnd = function(aEvent) {

  if (aEvent.target != this.element) {
    return;
  }

  switch (this.queuedTransitionStage_) {
    case rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.NONE:{
      rflect.browser.css.setTransition(this.element, '');
      this.isDecelerating_ = false;
    };break;
    case rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.TO_BOUNDS:{
      this.setUpTransitionStage2();
    };break;
    case rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.BOUNCED_OUT:{
      this.setUpTransitionStage3();
    };break;
    case rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.BOUNCED_BACK:{
      this.queuedTransitionStage_ =
          rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.NONE;
      rflect.browser.css.setTransition(this.element, '');
      this.isDecelerating_ = false;
    };break;
    default:break;
  }
}


rflect.ui.MomentumScroller.prototype.animateTo = function(offsetY) {
  this.contentOffsetY = offsetY;

  // We use webkit-transforms with translate3d because these animations
  // will be hardware accelerated, and therefore significantly faster
  // than changing the top value.
  rflect.browser.css.setTransform(this.element, 'translate3d(0, ' + 
      offsetY + 'px, 0)');
}


/**
 * Shifts content by given offset relative to frame, but never outside of
 * bounds.
 * @param {number} aOffsetY Offset which must be applied to content.
 */
rflect.ui.MomentumScroller.prototype.animateWithinBounds = function(aOffsetY) {
  var lowestContentPosition = this.getLowestContentPosition();
  var offsetY = aOffsetY;
  if (offsetY > 0)
    offsetY = 0;
  else if (offsetY < lowestContentPosition)
    offsetY = lowestContentPosition;
  
  this.animateTo(offsetY);
}


// Implementation of this method is left as an exercise for the reader.
// You need to measure the current position of the scrollable content
// relative to the frame. If the content is outside of the boundaries
// then simply reposition it to be just within the appropriate boundary.
rflect.ui.MomentumScroller.prototype.snapToBounds = function() {
  rflect.browser.css.setTransition(this.element,
      rflect.browser.css.getSelectorCasedProperty('transform') + ' ' + 500 +
      'ms ease-out');

  // Different out of bounds cases:
  // 1. If content is lower than frame upper border
  if (this.contentOffsetY > 0)
    this.contentOffsetY = 0;
  else
  // 2. If content is higher that frame lower border.
    this.contentOffsetY = this.getLowestContentPosition();

  rflect.browser.css.setTransform(this.element, 'translate3d(0, ' +
      this.contentOffsetY + 'px, 0)');

  this.isDecelerating_ = true;
}


/**
 * @return {boolean} Whether content element is out of frame's bounds.
 */
rflect.ui.MomentumScroller.prototype.isOutOfBounds = function() {
  return this.positionIsOutOfBounds(this.contentOffsetY);
}


/**
 * @param {number} aPosition Position to test.
 * @return {boolean} Whether content element is out of frame's bounds.
 */
rflect.ui.MomentumScroller.prototype.positionIsOutOfBounds = function(
    aPosition) {
  return aPosition > 0 || aPosition < this.getLowestContentPosition();
}


/**
 * @return {number} Lowest position.
 */
rflect.ui.MomentumScroller.prototype.getLowestContentPosition = function() {
  return -this.elementSize.height + this.frameElementSize.height;
}


/**
 * @return {boolean} Whether we're dragging.
 */
rflect.ui.MomentumScroller.prototype.isDragging = function() {
  return this.isDragging_ || (this.isDragging_ = (Math.abs(this.currentPoint_ -
      this.startTouchY) >= rflect.ui.MomentumScroller.DRAG_THRESHOLD));
}


// Implementation of this method is left as an exercise for the reader.
// You need to consider the end velocity of the drag was past the
// threshold required to initiate momentum.
/**
 * @return {boolean} Whether momentum scrolling should start
 */
rflect.ui.MomentumScroller.prototype.shouldStartMomentum = function() {
  if (this.isOutOfBounds())
    return false;
  return true;
}


/**
 * @param {number} aStartVelocity
 * @param {number} aDisplacement
 * @param {number} aAcceleration
 * @return {number} End velocity by formula vx = sqrt(v0*v0 + 2ad)
 */
rflect.ui.MomentumScroller.prototype.getEndMomentumVelocity = function(
    aStartVelocity, aDisplacement, aAcceleration) {
  return Math.sqrt(aStartVelocity * aStartVelocity +
      aDisplacement * 2 * aAcceleration);
}


/**
 * @param {number} aVelocity
 * @return {number} Acceleration.
 */
rflect.ui.MomentumScroller.prototype.getAcceleration = function(aVelocity) {
  return aVelocity < 0 ? rflect.ui.MomentumScroller.ACCELERATION_SLIDING :
      -rflect.ui.MomentumScroller.ACCELERATION_SLIDING;
}


/**
 * @param {number} aVelocity
 * @param {number} aAcceleration
 * @return {number} Time for decelerating motion, assuming acceleration is
 * negative.
 */
rflect.ui.MomentumScroller.prototype.getTime = function(aVelocity,
    aAcceleration) {
  return - aVelocity / aAcceleration;
}


rflect.ui.MomentumScroller.prototype.doMomentum = function() {
  // Calculate the movement properties. Implement getEndVelocity using the
  // start and end position / time.
  var velocity = this.getEndVelocity();
  if (goog.DEBUG)
    _log('velocity',velocity);
  if (velocity != 0) {
    var acceleration = this.getAcceleration(velocity);
    var displacement = - (velocity * velocity) / (2 * acceleration);
    var time = - velocity / acceleration;

    var newY = this.contentOffsetY + displacement;

    if (this.positionIsOutOfBounds(newY)) {

      this.setUpTransitionStage1();

    } else {

      // Set up the transition and execute the transform. Once you implement this
      // you will need to figure out an appropriate time to clear the transition
      // so that it doesn’t apply to subsequent scrolling.
      rflect.browser.css.setTransition(this.element,
          rflect.browser.css.getSelectorCasedProperty('transform') + ' ' +
          time + 'ms cubic-bezier(0.33, 0.66, 0.66, 1)');
      this.contentOffsetY = newY;
      rflect.browser.css.setTransform(this.element, 'translate3d(0, ' + newY + 
          'px, 0)');

    }

    this.isDecelerating_ = true;
  }
}


rflect.ui.MomentumScroller.prototype.setUpTransitionStage1 = function() {
  if (goog.DEBUG)
  _log('stage1');
  var velocity = this.getEndVelocity();
  var acceleration = this.getAcceleration(velocity);
  var displacement;

  if (velocity > 0) {
    displacement = -this.contentOffsetY;
    this.contentOffsetY = 0;
  } else {
    displacement = this.getLowestContentPosition() - this.contentOffsetY;
    this.contentOffsetY = this.getLowestContentPosition();
  }
  if (goog.DEBUG)
  _log('displacement',displacement);

  this.endMomentumVelocity_ = (velocity < 0 ? -1 : 1) *
      this.getEndMomentumVelocity(velocity, displacement, acceleration);
  if (goog.DEBUG)
    _log('this.endMomentumVelocity_', this.endMomentumVelocity_);
  var time = Math.abs((velocity - this.endMomentumVelocity_) / acceleration);

  //This is an y delta to flatten bezier function towards linear one if end
  // velocity is non-zero. In corner case, when velocity didn't slow at all,
  // bezier curve becomes linear.
  var valueToLowerCubicBezierWith = Math.abs(this.endMomentumVelocity_ /
      velocity) * .33;

  rflect.browser.css.setTransition(this.element,
      rflect.browser.css.getSelectorCasedProperty('transform') + ' ' + time +
      'ms cubic-bezier(.33,' +
      (.66 - valueToLowerCubicBezierWith) +
      ',.66,' +
      (1 - valueToLowerCubicBezierWith) +
      ')');
  rflect.browser.css.setTransform(this.element, 'translate3d(0, ' + 
      this.contentOffsetY + 'px, 0)');

  this.queuedTransitionStage_ =
      rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.TO_BOUNDS;
}


rflect.ui.MomentumScroller.prototype.setUpTransitionStage2 = function() {
  if (goog.DEBUG)
  _log('stage2');
  var velocity = this.endMomentumVelocity_;
  var acceleration = this.getAcceleration(velocity) *
      rflect.ui.MomentumScroller.ACCELERATION_BOUNCE_BACK_COEFF;
  var displacement = - (velocity * velocity) / (2 * acceleration);
  var time = 100;

  if (goog.DEBUG)
    _log('velocity',velocity);

  if (displacement > rflect.ui.MomentumScroller.OUT_OF_BOUNDS_MAXIMUM)
    displacement = rflect.ui.MomentumScroller.OUT_OF_BOUNDS_MAXIMUM;
  if (displacement < -rflect.ui.MomentumScroller.OUT_OF_BOUNDS_MAXIMUM)
    displacement = -rflect.ui.MomentumScroller.OUT_OF_BOUNDS_MAXIMUM;

  if (velocity > 0) {
    var newY = displacement;
  } else {
    var newY = this.contentOffsetY + displacement;
  }

  this.contentOffsetY = newY;

  rflect.browser.css.setTransition(this.element,
      rflect.browser.css.getSelectorCasedProperty('transform') + ' ' + time +
      'ms cubic-bezier(0.33, 0.66, 0.66, 1)');
  rflect.browser.css.setTransform(this.element, 'translate3d(0, ' + newY + 
      'px, 0)');

  this.queuedTransitionStage_ =
      rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.BOUNCED_OUT;

}


rflect.ui.MomentumScroller.prototype.setUpTransitionStage3 = function() {
  this.snapToBounds();
  this.queuedTransitionStage_ =
      rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.BOUNCED_BACK;
}


rflect.ui.MomentumScroller.prototype.stopMomentum = function() {
  if (this.isDecelerating()) {
    // Get the computed style object.
    var style = document.defaultView.getComputedStyle(this.element, null);
    // Computed the transform in a matrix object given the style.
    var matrix = rflect.browser.cssmatrix.getInstance(
        style[rflect.browser.css.getCamelCasedProperty('transform')]);

    // Clear the active transition so it doesn’t apply to our next transform.
    rflect.browser.css.setTransition(this.element, '');
    // Set the element transform to where it is right now.
    this.animateTo(matrix.m42);
    this.queuedTransitionStage_ =
        rflect.ui.MomentumScroller.QUEUED_TRANSITION_STAGE.NONE;

    this.stopPropagationOnTouchEnd_ = true;

  } else {
    this.stopPropagationOnTouchEnd_ = false;
  }
  this.isDecelerating_ = false;
}


/**
 * @return {number} v = (x1 - x0) / (t1 - t0)
 */
rflect.ui.MomentumScroller.prototype.getEndVelocity = function() {
  var velocity = (this.currentPoint_ - this.previousPoint_) / (
      this.currentMoment_ - this.previousMoment_);
  if (goog.DEBUG)
    console.log('previousMoment_: ', this.previousMoment_);
  if (goog.DEBUG)
        console.log('currentMoment_: ', this.currentMoment_);
  if (goog.DEBUG)
        console.log('velocity: ', velocity);
  var velocitySign = rflect.math.sign(this.currentPoint_ - this.previousPoint_);
  if (goog.DEBUG)
    console.log('velocitySign: ', velocitySign);
  var cappedVelocity = Math.abs(velocity) >
      rflect.ui.MomentumScroller.MAXIMUM_VELOCITY ? velocitySign *
      rflect.ui.MomentumScroller.MAXIMUM_VELOCITY :
      velocity;
  if (goog.DEBUG)
        console.log('cappedVelocity: ', cappedVelocity);
  return isNaN(velocity) ? velocitySign *
      rflect.ui.MomentumScroller.MAXIMUM_VELOCITY : (Math.abs(velocity) >
          rflect.ui.MomentumScroller.MAXIMUM_VELOCITY ? velocitySign *
          rflect.ui.MomentumScroller.MAXIMUM_VELOCITY :
          velocity);
}


/**
 * To implement.
 * @return {boolean}
 */
rflect.ui.MomentumScroller.prototype.isDecelerating = function() {
  return this.isDecelerating_;
}


/**
 * Alias to setMouseMissToCancel with false argument.
 */
rflect.ui.MomentumScroller.prototype.disposeInternal = function() {
  //Dispose logic specific for MomentumScroller.
  this.enable(false);

  rflect.ui.MomentumScroller.superClass_.disposeInternal.call(this);

};
