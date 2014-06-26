/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class for decorating pane component with show/hide.
 */

goog.provide('rflect.cal.ui.PaneShowBehavior');
goog.provide('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.provide('rflect.cal.ui.PaneShowBehavior.SlideEvent');


goog.require('goog.events.EventTarget');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.style');
goog.require('rflect.browser.transitionend');



/**
 * Pane show/hide behaviour main class.
 * @param {goog.ui.Component} aComponent Component to decorate.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.ui.PaneShowBehavior = function(aComponent, aParentElement) {
  goog.events.EventTarget.call(this);

  /**
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * @type {Element}
   */
  this.parentEl_ = aParentElement;
}
goog.inherits(rflect.cal.ui.PaneShowBehavior, goog.events.EventTarget);


/**
 * @enum {string}
 */
rflect.cal.ui.PaneShowBehavior.EventTypes = {
  BEFORE_SHOW: 'beforeShow',
  AFTER_SHOW: 'afterShow',
  SLIDE_BREAK: 'slideBreakPoint'
};


/**
 * Event that is fired at the start of pane sliding.
 * @param {boolean} aStart Whether this point is start, or end.
 * @param {boolean} aShowing Whether sliding process is showing pane, 'opening'.
 * @extends {goog.events.Event}
 * @constructor
 */
rflect.cal.ui.PaneShowBehavior.SlideEvent = function(aStart,
    aShowing) {
  goog.events.Event.call(this,
      rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK);

  /**
   * Whether this is start of transition.
   * @type {boolean}
   */
  this.start = aStart;
  /**
   * Whether we opening or closing pane.
   * @type {boolean}
   */
  this.showing = aShowing;
}
goog.inherits(rflect.cal.ui.PaneShowBehavior.SlideEvent,
    goog.events.Event);


/**
 * Whether the component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.visible_ = false;


/**
 * Function that will run before visibility change.
 * @type {function()}
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.beforeVisibleAction_ =
    goog.nullFunction;


/**
 * Function that will run after visibility change.
 * @type {function()}
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.afterVisibleAction_ =
    goog.nullFunction;


/**
 * Whether sliding is enabled.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.slidingIsEnabled_ = false;


/**
 * @return {boolean} Whether the pane  is visible.
 */
rflect.cal.ui.PaneShowBehavior.prototype.isVisible = function() {
  return this.visible_;
}


/**
 * @param {boolean} aSlidingIsEnabled Whether sliding is enabled.
 */
rflect.cal.ui.PaneShowBehavior.prototype.setSlidingIsEnabled =
    function(aSlidingIsEnabled) {
  this.slidingIsEnabled_ = aSlidingIsEnabled;
}


/**
 * Sets the visibility of the pane. Does not render the component.
 * @param {boolean} visible Whether the pane should be visible.
 */
rflect.cal.ui.PaneShowBehavior.prototype.setVisibleWithoutRender =
    function(visible) {
  if (visible == this.visible_) {
    return;
  }

  this.visible_ = visible;
}

/**
 * Sets the visibility of the pane. Lazily renders the component if needed.
 * @param {boolean} visible Whether the pane should be visible.
 */
rflect.cal.ui.PaneShowBehavior.prototype.setVisible = function(visible) {
  if (visible == this.visible_) {
    return;
  }

  // If the pane hasn't been rendered yet, render it now.
  if (!this.component.isInDocument()) {
    this.component.render(this.parentEl_);
  }

  if (this.slidingIsEnabled_ && !this.transitionEndKey_){
    this.transitionEndKey_ = goog.events.listen(
        this.component.getElement(),
        rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
        this.onSlideEnd_, false, this);
  }

  // Here we emit events before pane becomes visible and after that.
  if (this.slidingIsEnabled_) {

    if (visible) {
      if (this.dispatchEvent(new goog.events.Event(
          rflect.cal.ui.PaneShowBehavior.EventTypes.BEFORE_SHOW))) {
        this.showElement_(visible);
      }
      this.dispatchEvent(new goog.events.Event(
          rflect.cal.ui.PaneShowBehavior.EventTypes.AFTER_SHOW));
    }
    setTimeout(goog.bind(function() {
      this.slideElement_(visible);
    }, this), 0);

  } else {

    if (visible) {
      if (this.dispatchEvent(new goog.events.Event(
          rflect.cal.ui.PaneShowBehavior.EventTypes.BEFORE_SHOW))) {
        this.showElement_(visible);
      }
    } else
      this.showElement_(visible);
    if (visible)
      this.dispatchEvent(new goog.events.Event(
          rflect.cal.ui.PaneShowBehavior.EventTypes.AFTER_SHOW));

  }

  this.visible_ = visible;
};


/**
 * @param {function()} aFn Function to make callback from.
 * @return {function(this:rflect.cal.ui.PaneShowBehavior)} aFn Function
 * with this set to pane object.
 */
rflect.cal.ui.PaneShowBehavior.prototype.getVisCallback_ = function(aFn) {
  return goog.bind(aFn, this.component) || goog.nullFunction;
}


/**
 * Sets the action which will run before pane is shown.
 * @param {function()} aFn Function that will run before visibility change.
 */
rflect.cal.ui.PaneShowBehavior.prototype.setBeforeVisibleAction =
    function(aFn) {
  this.beforeVisibleAction_ = this.getVisCallback_(aFn);
}


/**
 * Sets the action which will run after pane is shown.
 * @param {function()} aFn Function that will run after visibility change.
 */
rflect.cal.ui.PaneShowBehavior.prototype.setAfterVisibleAction =
    function(aFn) {
  this.afterVisibleAction_ = this.getVisCallback_(aFn);
}


/**
 * Shows or hides the pane element.
 * @param {boolean} visible Shows the element if true, hides if false.
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.showElement_ = function(visible) {
  goog.style.showElement(this.component.getElement(), visible);
};


/**
 * Slides pane element in or out.
 * @param {boolean} visible Slides the element in if true, out if false.
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.slideElement_ = function(visible) {
  if (this.dispatchEvent(
      new rflect.cal.ui.PaneShowBehavior.SlideEvent(true, visible))) {
    if (visible)
      goog.dom.classes.add(this.component.getElement(),
          'slide-pane-left-visible');
    else
      goog.dom.classes.remove(this.component.getElement(),
          'slide-pane-left-visible');
  }
};


/**
 * Slide end listener.
 * @param {Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.onSlideEnd_ = function(aEvent) {
  if (aEvent.target != this.component.getElement())
    return;

  if (this.dispatchEvent(
      new rflect.cal.ui.PaneShowBehavior.SlideEvent(false,
          this.visible_))) {

    if (false == this.visible_)
      this.showElement_(false);

  }
}


/**
 * Disposes of the object.
 * @override
 * @protected
 */
rflect.cal.ui.PaneShowBehavior.prototype.disposeInternal = function() {
  rflect.cal.ui.PaneShowBehavior.superClass_.disposeInternal.call(this);

  goog.events.unlistenByKey(this.transitionEndKey_);
};
