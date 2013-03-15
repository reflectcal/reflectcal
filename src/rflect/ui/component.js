/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar basic component, implementation of UI component,
 * adapted for calendar.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.Component');

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
rflect.cal.Component = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(rflect.cal.Component, goog.ui.Component);


/**
 * @param {Array.<number>|Arguments} aContainer Array to test index presence in.
 * @param {number} aIndex Index to test.
 * @return {boolean} Whether index is within array of indexes to be excluded
 * from update.
 */
rflect.cal.Component.indexIsInExclusions_ = function(aContainer, aIndex) {
  return /**@type {boolean}*/ (aContainer.length) &&
      goog.array.contains(aContainer, aIndex)
}


/**
 * Creates component on an empty div element.
 */
rflect.cal.Component.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing html div element as a component.
 * @param {Element} aElement The div element to decorate.
 * @param {boolean=} opt_doNotBuildBody Whether to build body or not.
 */
rflect.cal.Component.prototype.decorateInternal = function(aElement,
                                                           opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.Component.superClass_.decorateInternal.call(this, aElement);
  // Build body.
  if (!opt_doNotBuildBody) {
    this.getElement().innerHTML = this.buildBody();
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
rflect.cal.Component.prototype.buildBody = function(aSb) {
  var sb = aSb || new goog.string.StringBuffer();
  this.buildBodyInternal(sb);
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
rflect.cal.Component.prototype.buildBodyInternal = function(aSb) {
  goog.abstractMethod();
};


/**
 * Updates component before redraw. This is used when some part of
 * component's update logic need to be separated from redraw. Propagates to
 * component's children by default. For custom behavior, should be overridden by
 * subclasses.
 * @param {...number} var_args Index(es) of
 * component's children which should be excluded from update.
 */
rflect.cal.Component.prototype.updateBeforeRedraw =
    function(var_args) {
  var args = arguments;
  this.forEachChild(function(aChild, aIndex) {
    if (!rflect.cal.Component.indexIsInExclusions_(args, aIndex))
      aChild.updateBeforeRedraw();
  });
};


/**
 * Updates body of component by redraw. This is a second and final part of
 * component update sequence.
 * @param {...number} var_args Index(es) of
 * component's children which should be excluded from update.
 * @see {rflect.cal.MainBody#updateBeforeRedraw}.
 */
rflect.cal.Component.prototype.updateByRedraw =
    function(var_args) {
  var args = arguments;
  // Propagate call to child components that have a DOM, if any.
  this.forEachChild(function(aChild, aIndex) {
    if (aChild.isInDocument() && aChild.getElement() &&
        !rflect.cal.Component.indexIsInExclusions_(args, aIndex)) {
      aChild.updateByRedraw();
    }
  });
};


/**
 * Disposes of component.
 */
rflect.cal.Component.prototype.disposeInternal = function() {
  rflect.cal.Component.superClass_.disposeInternal.call(this);
};
