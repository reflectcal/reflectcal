/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class that standardizes panes switching.
 */

goog.provide('rflect.cal.ui.Pager');
goog.provide('rflect.cal.ui.Pager.EventTypes');
goog.provide('rflect.cal.ui.Pager.PageChangeEvent');


goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.string');
goog.require('goog.style');
goog.require('rflect.browser.transitionend');



/**
 * Pane show/hide behaviour main class.
 * @param {goog.ui.Component} aComponent Host component which has multiple
 * pages.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.ui.Pager = function(aComponent) {
  goog.events.EventTarget.call(this);

  /**
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * Stack of pages. Empty stack means that default page is shown.
   * @type {Array.<goog.ui.Component>}
   */
  this.pagesStack_ = [];
}
goog.inherits(rflect.cal.ui.Pager, goog.events.EventTarget);


/**
 * @enum {string}
 */
rflect.cal.ui.Pager.EventTypes = {
  PAGE_CHANGE: 'pageChange'
};


/**
 * Event that is fired at the end of page change.
 * @param {number} aStart Number of current page.
 * @constructor
 */
rflect.cal.ui.Pager.PageChangeEvent = function(aPageNumber) {
  goog.events.Event.call(this,
      rflect.cal.ui.Pager.EventTypes.PAGE_SLIDE);

  /**
   * Whether this is start of transition.
   * @type {number}
   */
  this.pageNumber = aPageNumber;
}
goog.inherits(rflect.cal.ui.Pager.PageChangeEvent, goog.events.Event);


/**
 * Template for translate style both for page element and container element.
 * @type {string}
 * @const
 */
rflect.cal.ui.Pager.TRANSLATE_TEMPLATE = 'transform:translate3d(%s%,0,0);' +
      '-webkit-transform:-webkit-translate3d(%s%,0,0);'


/**
 * Component that is queued to be hidden after page slide.
 * @type {goog.ui.Component}
 * @private
 */
rflect.cal.ui.Pager.prototype.componentToHide_;


/**
 * Whether sliding is enabled.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.Pager.prototype.slidingIsEnabled_ = false;


/**
 * Key for transition end listener.
 * @type {goog.events.Key}
 * @private
 */
rflect.cal.ui.Pager.prototype.transitionEndKey_;


/**
 * Whether the page component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.Pager.prototype.pageIsInStack = function(aComponent){
  return goog.array.findIndex(this.pageStack_, function(element){
    return element == aComponent;
  }) > 0;
}


/**
 * @param {aComponent} Component to add.
 * @return {number} New length of stack.
 */
rflect.cal.ui.Pager.prototype.pushToStack = function(aComponent){
  return this.pageStack_.push(aComponent);
}


/**
 * @return {goog.ui.Component} Component that was removed.
 */
rflect.cal.ui.Pager.prototype.popFromStack = function(){
  return this.pageStack_.pop();
}


/**
 * Shows page with given component.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {boolean} aShow Whether to show component.
 */
rflect.cal.ui.Pager.prototype.showPage = function(aComponent, aShow){

  if (aShow == this.pageIsInStack(aComponent)) {
    return;
  }

  if (aShow){
    this.componentToHide_ = goog.array.peek(this.pageStack_);

    //Position is function of length of page stack.
    var position = this.pushToStack(aComponent);

    // If the pane hasn't been rendered yet, render it now.
    if (!aComponent.isInDocument()) {
      aComponent.render(this.component.getElement());
      this.assignPosition(aComponent, position);
    } else {
      goog.style.showElement(aComponent.getElement(), true);
    }
  } else {
    this.componentToHide_ = this.popFromStack();
    position = this.pageStack_.length;
  }

  this.slideToPosition(position);
};


/**
 * Translates element wherever far is needed for paging.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {number} aPosition Page number to shift to.
 */
rflect.cal.ui.Pager.prototype.assignPosition = function(aComponent, aPosition){
  var element = aComponent.getElement();
  //Element shows up from the right, so translate it to the right.
  var style = goog.string.subs(rflect.cal.ui.Pager.TRANSLATE_TEMPLATE,
      100 * aPosition);
  element.style = style;
}


/**
 * Translates container element to show actual page.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {number} aPosition Page number to shift to.
 */
rflect.cal.ui.Pager.prototype.slideToPosition = function(aPosition){
  var element = this.component.getElement();
  //Container moves to the left.
  var style = goog.string.subs(rflect.cal.ui.Pager.TRANSLATE_TEMPLATE,
      -100 * aPosition);
  element.style = style;
}




/**
 * @param {boolean} aSlidingIsEnabled Whether sliding is enabled.
 */
rflect.cal.ui.Pager.prototype.setSlidingIsEnabled =
    function(aSlidingIsEnabled) {
  this.slidingIsEnabled_ = aSlidingIsEnabled;
}


/**
 * Assign transition end event listener.
 */
rflect.cal.ui.Pager.prototype.assignEvents =
    function() {
  if (this.slidingIsEnabled_ && !this.transitionEndKey_){
    this.transitionEndKey_ = goog.events.listen(
        this.parentEl_,
        rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
        this.onSlideEnd_, false, this);
  }
}


/**
 * Slide end listener.
 * @param {Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.Pager.prototype.onSlideEnd_ = function(aEvent) {
  if (aEvent.target != this.component.getElement())
    return;

  if (this.componentToHide_){
    goog.style.showElement(this.componentToHide_, false);
    this.componentToHide_ = null;
  }

  this.dispatchEvent(new rflect.cal.ui.Pager.PageChangeEvent(
      this.pageStack_.length - 1));
}


/**
 * Disposes of the object.
 * @override
 * @protected
 */
rflect.cal.ui.Pager.prototype.disposeInternal = function() {
  rflect.cal.ui.Pager.superClass_.disposeInternal.call(this);

  this.pageStack_.length = 0;
  goog.events.unlistenByKey(this.transitionEndKey_);
};
