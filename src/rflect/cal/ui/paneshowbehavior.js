/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class for decorating pane component with show/hide.
 */

goog.provide('rflect.cal.ui.PaneShowBehavior');


goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.style');



/**
 * Pane show/hide behaviour main class.
 * @param {goog.ui.Component} aComponent Component to decorate.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @constructor
 */
rflect.cal.ui.PaneShowBehavior = function(aComponent, aParentElement) {

  /**
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * @type {Element}
   */
  this.parentEl_ = aParentElement;
}


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

  if (rflect.MOBILE && !visible) this.slideElement_(false);

  if (visible) this.beforeVisibleAction_();

  this.showElement_(visible);

  if (visible) this.afterVisibleAction_();

  if (rflect.MOBILE && visible) this.slideElement_(true);

  this.visible_ = visible;
};


/**
 * @param {function()} aFn Function to make callback from.
 * @return {function(this:rflect.cal.ui.PaneShowBehavior)} aFn Function
 * with this set to pane object.
 */
rflect.cal.ui.PaneShowBehavior.prototype.getVisCallback_ = function(aFn) {
  return goog.bind(aFn, this) || goog.nullFunction;
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
        'slide-pane-shown-left');
  else
    goog.dom.classes.remove(this.component.getElement(),
        'slide-pane-shown-left');
};

