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
 * @param {Array.<goog.ui.Component>|undefined} aContainer Array to test index presence in.
 * @param {goog.ui.Component} aComponent Index to test.
 * @return {boolean} Whether index is within array of indexes to be excluded
 * from update.
 */
rflect.ui.Component.componentIsInExclusions = function(aContainer, aComponent) {
  return !!aContainer &&
      !!aContainer.length &&
      goog.array.contains(aContainer, aComponent)
}


/**
 * Creates component on an empty div element.
 */
rflect.ui.Component.prototype.createDom = function() {
  this.decorateInternal(this.getDomHelper().createDom('div'));
};


/**
 * Decorates an existing html div element as a component.
 * TODO(alexk): for public use, we may rename this method to something else,
 * 'cause original decorateInternal is protected. Something like
 * decorateByBuild.
 * @param {Element} aElement The div element to decorate.
 * @param {boolean=} opt_doNotBuildBody Whether to build body or not.
 */
rflect.ui.Component.prototype.decorateInternal = function(aElement,
                                                           opt_doNotBuildBody) {
  // Set this.element_.
  rflect.ui.Component.superClass_.decorateInternal.call(this, aElement);
  // Build body.
  if (!opt_doNotBuildBody) {
    this.getElement().innerHTML = this.build();
  }
};


/**
 * Builds body of component. We could use either given string buffer and append
 * parts to it, or use one that belongs to this particular component and, in
 * that case, return ready string.
 * @param {goog.string.StringBuffer=} aSb String buffer to append HTML parts
 * to.
 * @return {string|undefined} HTML of component or none.
 */
rflect.ui.Component.prototype.build = function(aSb) {
  var sb = aSb || new goog.string.StringBuffer();
  this.buildInternal(sb);
  if (!aSb) {
    return sb.toString();
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to. Must be overridden.
 * @protected
 */
rflect.ui.Component.prototype.buildInternal = function(aSb) {
  goog.abstractMethod();
};


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string} HTML of component.
 * @protected
 */
rflect.ui.Component.prototype.buildHTML = function(opt_outerHTML) {
  if (opt_outerHTML) {
    return '<div></div>';
  }
  return '';
};


/**
 * Updates component before redraw. This is used when some part of
 * component's update logic need to be separated from redraw. Propagates to
 * component's children by default. For custom behavior, should be overridden by
 * subclasses.
 * @param {boolean=} opt_deep Whether to update children.
 */
rflect.ui.Component.prototype.updateBeforeRedraw =
    function(opt_deep) {
  if (opt_deep){
    this.forEachChild(function(aChild) {
      if (aChild.updateBeforeRedraw)
        aChild.updateBeforeRedraw(opt_deep);
    });
  }
};


/**
 * Updates body of component by redraw. This is a second and final part of
 * component update sequence.
 * @param {boolean=} opt_deep Whether to update children.
 * @see {rflect.cal.ui.MainBody#updateBeforeRedraw}.
 */
rflect.ui.Component.prototype.updateByRedraw =
    function(opt_deep) {
  // Propagate call to child components that have a DOM, if any.
  if (opt_deep){
    this.forEachChild(function(aChild) {
      if (aChild.updateByRedraw && aChild.isInDocument() &&
          aChild.getElement()) {
        aChild.updateByRedraw(opt_deep);
      }
    });
  }
};


/**
 * Updates component in whole update sequence.
 * @param {boolean=} opt_deep Whether to update children.
 * @see {rflect.cal.ui.MainBody#updateBeforeRedraw}.
 */
rflect.ui.Component.prototype.update =
    function(opt_deep) {
  this.updateBeforeRedraw(opt_deep);
  this.updateByRedraw(opt_deep);
};


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
