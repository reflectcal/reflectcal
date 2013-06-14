/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Helper class to establish default behaviour
 * (highlight/unhighlight) for mouseover event for all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MouseOverRegistry');



/**
 * Storage for registered mouse over targets for component.
 * @constructor
 */
rflect.cal.ui.MouseOverRegistry = function() {

};


/**
 * Element which get registered by mouseover.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MouseOverRegistry.prototype.registeredTarget_;


/**
 * Class of element registered on mouseover.
 * @type {string}
 * @private
 */
rflect.cal.ui.MouseOverRegistry.prototype.registeredTargetClass_;


/**
 * Registers mouse over target and de-registers previous one.
 * @param {Element} aTarget New element to register hover on.
 * @param {string=} opt_hoverClassName Class which should be added to hovered
 * target.
 */
rflect.cal.ui.MouseOverRegistry.prototype.registerTarget =
    function(aTarget, opt_hoverClassName) {
  if (this.registeredTarget_)
    goog.dom.classes.remove(this.registeredTarget_,
      this.registeredTargetClass_);
  if ((this.registeredTarget_ = aTarget) && opt_hoverClassName) {
    goog.dom.classes.add(aTarget, opt_hoverClassName);
    this.registeredTargetClass_ = opt_hoverClassName;
  }
}


/**
 * Alias for deregistering target.
 */
rflect.cal.ui.MouseOverRegistry.prototype.deregisterTarget =
    function() {
  this.registerTarget(null);
}