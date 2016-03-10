/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Implementation of UI component, that can be built with string
 * builder.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.ui.Component');

goog.require('goog.array');
goog.require('goog.string.StringBuffer');
goog.require('goog.ui.Component');



/**
 * UI component class. Main difference with parent class is that it may use
 * string buffer to build html body.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.ui.Component = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(rflect.ui.Component, goog.ui.Component);


/**
 * @return {string} Unique id.
 * @override
 */
rflect.ui.Component.prototype.getId = function() {
  return 'ui-component' + rflect.ui.Component.superClass_.getId.call(this);
}


/**
 * Creates component on an empty <temp> element.
 * @override
 */
rflect.ui.Component.prototype.createDom = function() {
  var tempElement = this.getDomHelper().createElement('temp');

  tempElement.innerHTML = this.buildHTML(true);

  this.setElementInternal(this.getDomHelper().
      getFirstElementChild(tempElement));
  this.updateBeforeRedraw();
};


/**
 * Decorates an existing html element as a component.
 * @param {Element} aElement The div element to decorate.
 * @protected
 * @override
 */
rflect.ui.Component.prototype.decorateInternal = function(aElement) {
  // Set this.element_.
  rflect.ui.Component.superClass_.decorateInternal.call(this, aElement);
  this.updateBeforeRedraw();
  // Build body.
  this.getElement().innerHTML = this.buildHTML(false);
};


/**
 * Sets element searching by its id in DOM.
 * @param {string} aId The div element to decorate.
 */
rflect.ui.Component.prototype.setElementById = function(aId) {
  // Set this.element_.
  rflect.ui.Component.superClass_.decorateInternal.call(this,
      this.getDomHelper().getElement(aId));
};


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string} HTML of component.
 */
rflect.ui.Component.prototype.buildHTML = function(opt_outerHTML) {
  var str = '';
  if (opt_outerHTML) {
    str += '<div>';
  }
  this.forEachChild(aChild => {
    if (aChild.buildHTML) {
      str += aChild.buildHTML(true);
    }
  });
  if (opt_outerHTML) {
    str += '</div>';
  }
  return str;
};


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.ui.Component.prototype.enterDocument = function() {
  this.decorateChildren();
  rflect.ui.Component.superClass_.enterDocument.call(this);
  this.updateAfterRedraw();
}


/**
 * Initializes child components by invoking goog.ui.Component#decorate.
 */
rflect.ui.Component.prototype.decorateChildren = function() {
  this.forEachChild(aChild => {
    var element = this.getDomHelper().getElement(aChild.getId());
    if (element) {
      aChild.decorate(element);
    }
  });
}


/**
 * Updates component in whole update sequence.
 * As argument is optional, calling <code>component.update()</code> on component
 * should result in full redraw of its contents.
 * @param {Object.<string, *>=} opt_options Options for update.
 * @see {rflect.cal.ui.MainBody#updateBeforeRedraw}.
 * @see {rflect.cal.ui.MainBody#updateAfterRedraw}.
 */
rflect.ui.Component.prototype.update = function(opt_options) {
  this.forEachChild(aChild => {
    aChild.exitDocument();
  });
  this.updateBeforeRedraw(opt_options);

  this.getElement().innerHTML = this.buildHTML(false);

  this.decorateChildren();
  this.updateAfterRedraw(opt_options);
};


/**
 * Updates component before redraw, i.e. before any component changes will be
 * reflected in DOM. This is used when some part of component's update logic
 * need to be separated from redraw. For custom behavior, should be overridden
 * by subclasses.
 * @param {Object.<string, *>=} opt_options Options for update.
 * @protected
 */
rflect.ui.Component.prototype.updateBeforeRedraw = function(opt_options) {};


/**
 * Updates component after redraw. Updates body of component by redraw. This is
 * a second and final part of component update sequence.
 * @param {Object.<string, *>=} opt_options Options for update.
 * @protected
 */
rflect.ui.Component.prototype.updateAfterRedraw = function(opt_options) {};


/**
 * Enables touch interface.
 * @param {boolean} aEnable Whether to enable it.
 * @param {boolean=} opt_deep Whether to enable it in children.
 */
rflect.ui.Component.prototype.enableTouchInterface =
    function(aEnable, opt_deep) {
  this.forEachChild(function(aChild) {
    if (aChild.setHandleTouchEvents) {
      aChild.setHandleTouchEvents(aEnable);
    }
    if (opt_deep && aChild.enableTouchInterface) {
      aChild.enableTouchInterface(aEnable, opt_deep);
    }
  });
};


/**
 * Enables mouse interface.
 * @param {boolean} aEnable Whether to enable it.
 * @param {boolean=} opt_deep Whether to enable it in children.
 */
rflect.ui.Component.prototype.enableMouseInterface =
    function(aEnable, opt_deep) {
  this.forEachChild(function(aChild) {
    if (aChild.setHandleMouseEvents) {
      aChild.setHandleMouseEvents(aEnable);
    }
    if (opt_deep && aChild.enableMouseInterface) {
      aChild.enableMouseInterface(aEnable, opt_deep);  
    }
  });
};


/**
 * Disposes of component.
 * @override
 * @protected
 */
rflect.ui.Component.prototype.disposeInternal = function() {
  rflect.ui.Component.superClass_.disposeInternal.call(this);
};
