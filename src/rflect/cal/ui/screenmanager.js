/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class that standardizes panes switching.
 */

goog.provide('rflect.cal.ui.ScreenManager');
goog.provide('rflect.cal.ui.ScreenManager.EventTypes');
goog.provide('rflect.cal.ui.ScreenManager.PageChangeEvent');


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
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rflect.cal.ui.ScreenManager = function(aViewManager) {
  goog.events.EventTarget.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;


  /**
   * Stack of pages. Empty stack means that default page is shown.
   * @type {Array.<goog.ui.Component>}
   */
  this.pageStack_ = [];
}
goog.inherits(rflect.cal.ui.ScreenManager, goog.events.EventTarget);


/**
 * @enum {string}
 */
rflect.cal.ui.ScreenManager.EventTypes = {
  PAGE_CHANGE: 'pageChange'
};


/**
 * Event that is fired at the end of page change.
 * @param {number} aPageNumber Number of current page.
 * @param {goog.ui.Component} aCurrentScreen Current screen component.
 * @param {goog.ui.Component} aPreviousScreen Previous screen component.
 * @param {boolean} aActionIsIrreversible Whether this action is irreversible.
 * @constructor
 * @extends {goog.events.Event}
 */
rflect.cal.ui.ScreenManager.PageChangeEvent = function(aPageNumber,
    aCurrentScreen, aPreviousScreen, aActionIsIrreversible) {
  goog.events.Event.call(this,
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE);

  /**
   * Whether this is start of transition.
   * @type {number}
   */
  this.pageNumber = aPageNumber;

  /**
   * Current screen component.
   * @type {goog.ui.Component}
   */
  this.currentScreen = aCurrentScreen;

  /**
   * Previous screen component.
   * @type {goog.ui.Component}
   */
  this.previousScreen = aPreviousScreen;

  /**
   * Whether this action is irreversible.
   * @type {boolean}
   */
  this.aActionIsIrreversible = aActionIsIrreversible;

}
goog.inherits(rflect.cal.ui.ScreenManager.PageChangeEvent, goog.events.Event);


/**
 * Template for translate style both for page element and container element.
 * @type {string}
 * @const
 */
rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE =
    'translate3d(%s%,0,0)';



/**
 * Template for translate style both for page element and container element,
 * webkit version.
 * @type {string}
 * @const
 */
rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE_WEBKIT =
    '-webkit-translate3d(%s%,0,0)';


/**
 * Translates container element to show actual page.
 * @param {Element} aElement Element which style to modify.
 * @param {number} aValue Translate value to set.
 */
rflect.cal.ui.ScreenManager.translateElement = function(aElement,
    aValue){
  aElement.style.transform = goog.string.subs(
      rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE, aValue);
  aElement.style.webkitTransform = goog.string.subs(
      rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE_WEBKIT, aValue);
}


/**
 * Main element of screen manager.
 * @type {Element}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.element_;


/**
 * Component that is queued to be hidden after page slide.
 * @type {goog.ui.Component}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.componentToHide_;


/**
 * Whether sliding is enabled.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.slidingIsEnabled_ = false;


/**
 * Key for transition end listener.
 * @type {goog.events.Key}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.transitionEndKey_;


/**
 * Whether pending action of changing screens is irreversible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.actionIsIrreversible_ = false;


/**
 * Whether the page component is visible.
 * @return {boolean}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.pageIsInStack = function(aComponent){
  return goog.array.findIndex(this.pageStack_, function(element){
    return element == aComponent;
  }) > 0;
}


/**
 * @param {goog.ui.Component} aComponent Component to add.
 * @return {number} New length of stack.
 */
rflect.cal.ui.ScreenManager.prototype.pushToStack = function(aComponent){
  return this.pageStack_.push(aComponent);
}


/**
 * @return {goog.ui.Component} Component that was removed.
 */
rflect.cal.ui.ScreenManager.prototype.popFromStack = function(){
  return this.pageStack_.pop();
}


/**
 * Shows page with given component.
 * @param {Element=} opt_element Element on which to render screen manager. Will
 * be <body> if absent.
 */
rflect.cal.ui.ScreenManager.prototype.render = function(opt_element){
  var parentElement = opt_element || document.body;
  var element = document.createElement('div');
  element.id = 'screen-manager';
  element.className = 'screen-manager';
  parentElement.appendChild(element);
  this.element_ = element;
}


/**
 * Shows page with given component.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {boolean} aShow Whether to show component.
 * @param {boolean=} opt_irreversible Whether action of switching screen could
 * not be reverted, this is intended to be used by history manager when
 * switching screen by back button - this action could not be undone, or it
 * will incur looping between screens.
 */
rflect.cal.ui.ScreenManager.prototype.showScreen = function(aComponent, aShow,
    opt_irreversible){

  if (aShow == this.pageIsInStack(aComponent)) {
    return;
  }

  this.actionIsIrreversible_ = !!opt_irreversible;

  if (aShow){
    this.componentToHide_ = /**@type {goog.ui.Component}*/
        (goog.array.peek(this.pageStack_));

    var position = this.pushToStack(aComponent) - 1;

    // If the pane hasn't been rendered yet, render it now.
    if (!aComponent.isInDocument()) {
      aComponent.render(this.element_);
    } else {
      goog.style.showElement(aComponent.getElement(), true);
    }
    this.assignPosition(aComponent, position);
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
rflect.cal.ui.ScreenManager.prototype.assignPosition = function(aComponent,
    aPosition){
  //Element shows up from the right, so translate it to the right.
  if (aPosition > 0){
    rflect.cal.ui.ScreenManager.translateElement(aComponent.getElement(),
        100 * aPosition);
  }
}


/**
 * Translates container element to show actual page.
 * @param {number} aPosition Page number to shift to.
 */
rflect.cal.ui.ScreenManager.prototype.slideToPosition = function(aPosition){
  //Container moves to the left.
  if (aPosition > 0){
    rflect.cal.ui.ScreenManager.translateElement(this.element_,
        -100 * aPosition);
  }
}


/**
 * @param {boolean} aSlidingIsEnabled Whether sliding is enabled.
 */
rflect.cal.ui.ScreenManager.prototype.setSlidingIsEnabled =
    function(aSlidingIsEnabled) {
  this.slidingIsEnabled_ = aSlidingIsEnabled;
}


/**
 * Assign transition end event listener.
 */
rflect.cal.ui.ScreenManager.prototype.assignEvents =
    function() {
  if (this.slidingIsEnabled_ && !this.transitionEndKey_){
    this.transitionEndKey_ = goog.events.listen(
        this.element_,
        rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
        this.onSlideEnd_, false, this);
  }
}


/**
 * Slide end listener.
 * @param {Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.onSlideEnd_ = function(aEvent) {
  if (aEvent.target != this.element_)
    return;

  if (this.componentToHide_){
    goog.style.showElement(this.componentToHide_.getElement(), false);
  }

  this.dispatchEvent(new rflect.cal.ui.ScreenManager.PageChangeEvent(
      this.pageStack_.length - 1,
      /**@type {goog.ui.Component}*/ (goog.array.peek(this.pageStack_)),
      this.componentToHide_, this.actionIsIrreversible_));

  this.componentToHide_ = null;
  this.actionIsIrreversible_ = false;
}


/**
 * Disposes of the object.
 * @override
 * @protected
 */
rflect.cal.ui.ScreenManager.prototype.disposeInternal = function() {
  rflect.cal.ui.ScreenManager.superClass_.disposeInternal.call(this);

  this.pageStack_.length = 0;
  goog.events.unlistenByKey(this.transitionEndKey_);
};