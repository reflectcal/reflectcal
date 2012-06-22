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
 * Generic html parts, used by renderer.
 * @type {Array.<string>}
 * @const
 * @private
 */
rflect.cal.Component.HTML_PARTS_ = [];


/**
 * Reusable string buffer for component.
 * @type {goog.string.StringBuffer}
 * @private
 */
rflect.cal.Component.prototype.sb_ = null;


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
 * @return {rflect.cal.TargetDetector} Target detector, lazily created.
 */
rflect.cal.Component.prototype.getTargetDetector = function() {
  return this.targetDetector_ ||
      (this.targetDetector = new rflect.cal.TargetDetector());
}


/**
 *
 */
rflect.cal.Component.prototype.populateTargetDetector = function(targets,
    hoverTargets) {
  return this.targetDetector_ ||
      (this.targetDetector = new rflect.cal.TargetDetector());
}


/**
 * @return {goog.string.StringBuffer} String buffer, which is created once for
 * component and is reused each time it's needed.
 */
rflect.cal.Component.prototype.getStringBuffer = function() {
  return this.sb_ ? this.sb_ : this.sb_ = new goog.string.StringBuffer();
};


/**
 * Builds body of component. We could use either given string buffer and append
 * parts to it, or use one that belongs to this particular component and, in
 * that case, return ready string.
 * @param {goog.string.StringBuffer=} aSb String buffer to append HTML parts
 * to.
 * @return {string|undefined} HTML of component or none.
 */
// TODO: Is it really better for GC? Strings are allocated twice.
rflect.cal.Component.prototype.buildBody = function(aSb) {
  var sb = aSb || this.getStringBuffer();
  this.buildBodyInternal(sb);
  if (!aSb) {
    var str = sb.toString();
    sb.clear();
    return str;
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
 * @param {number=} opt_childIndexToExclude Index of component's child which
 * should be excluded by update.
 */
rflect.cal.Component.prototype.updateBeforeRedraw =
    function(opt_childIndexToExclude) {
  this.forEachChild(function(aChild, aIndex) {
    if (aIndex != opt_childIndexToExclude)
      aChild.updateBeforeRedraw();
  });
};


/**
 * Updates body of component by redraw. This is a second and final part of
 * component update sequence.
 * @param {number=} opt_childIndexToExclude Index of component's child which
 * should be excluded by update.
 * @see {rflect.cal.MainBody#updateBeforeRedraw}.
 */
rflect.cal.Component.prototype.updateByRedraw =
    function(opt_childIndexToExclude) {
  // Propagate call to child components that have a DOM, if any.
  this.forEachChild(function(aChild, aIndex) {
    if (aChild.isInDocument() && aChild.getElement() &&
        aIndex != opt_childIndexToExclude) {
      aChild.updateByRedraw();
    }
  });
};


/**
 * Disposes of component.
 */
rflect.cal.Component.prototype.disposeInternal = function() {
  rflect.cal.Component.superClass_.disposeInternal.call(this);

  if (this.sb_) {
    this.sb_.clear();
    this.sb_ = null;
  }
};
