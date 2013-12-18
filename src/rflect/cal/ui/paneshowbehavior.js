/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class for decorating pane component with show/hide.
 */

goog.provide('rflect.cal.ui.PaneShowBehavior');


goog.require('goog.Disposable');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.style');
goog.require('rflect.browser.transitionend');



/**
 * Pane show/hide behaviour main class.
 * @param {goog.ui.Component} aComponent Component to decorate.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.ui.PaneShowBehavior = function(aComponent, aParentElement) {
  goog.Disposable.call(this);

  /**
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * @type {Element}
   */
  this.parentEl_ = aParentElement;
}
goog.inherits(rflect.cal.ui.PaneShowBehavior, goog.Disposable);


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

  if (rflect.MOBILE && !this.transitionEndKey_){
    this.transitionEndKey_ = goog.events.listen(
        this.component.getElement(),
        rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
        this.onSlideEnd_, false, this);
  }

  if (rflect.MOBILE) {

    if (visible) {
      this.beforeVisibleAction_();
      this.showElement_(visible);
      this.afterVisibleAction_();
    }
    setTimeout(goog.bind(function() {
      this.slideElement_(visible);
    }, this), 0);

  } else {

    if (visible) this.beforeVisibleAction_();
    this.showElement_(visible);
    if (visible) this.afterVisibleAction_();

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
  if (visible)
    goog.dom.classes.add(this.component.getElement(),
        'slide-pane-left-visible');
  else
    goog.dom.classes.remove(this.component.getElement(),
        'slide-pane-left-visible');
};


/**
 * Slide end listener.
 * @param {Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.PaneShowBehavior.prototype.onSlideEnd_ = function(aEvent) {
  if (aEvent.target != this.component.getElement())
    return;

  if (goog.DEBUG)
    _log('slide end');
    if (goog.DEBUG)
      _log('aEvent.type', aEvent.type);
  if (false == this.visible_)
    this.showElement_(false);
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
