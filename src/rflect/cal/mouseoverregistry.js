/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Helper class to establish default behaviour
 * (highlight/unhighlight) for mouseover event for all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MouseOverRegistry');

goog.require('rflect.cal.TargetDetector');



/**
 * Storage for registered mouse over targets for component.
 * @constructor
 */
rflect.cal.MouseOverRegistry = function() {

  /**
   * Keys of hover targets.
   * @type {Array.<number>}
   * @private
   */
  this.targetKeys_ = [];

  /**
   * Class that should be added/removed on hover.
   * @type {Array.<string>}
   * @private
   */
  this.modifierClasses_ = [];
};
goog.inherits(rflect.cal.MouseOverRegistry, rflect.cal.TargetDetector);


/**
 * Element which get registered by mouseover.
 * @type {Element}
 * @private
 */
rflect.cal.MouseOverRegistry.prototype.registeredTarget_;


/**
 * Class of element registered on mouseover.
 * @type {string}
 * @private
 */
rflect.cal.MouseOverRegistry.prototype.registeredTargetClass_;


/**
 * Adds a pair of target id and modifier class to registry.
 * @param {number} aKey Target id.
* @param {string} aModifierClass Class for indicating hover state.
 */
rflect.cal.MouseOverRegistry.prototype.addHoverTarget = function(aKey,
    aModifierClass) {
  this.targetKeys_.push(aKey);
  this.modifierClasses_.push(aModifierClass);
}


/**
 * Registers mouse over target and de-registers previous one.
 * @param {Element} aTarget New element to register hover state on.
 * @param {string=} opt_className Class which should be tested whether it
 * belongs to target.
 */
rflect.cal.MouseOverRegistry.prototype.registerTarget =
    function(aTarget, opt_className) {
  var modifierClassName;
  var testedClassName = opt_className || aTarget.className;
  for (var counter = 0, length = this.targetKeys_.length; counter < length;
      counter++) {
    if (this.isTarget(this.targetKeys_[counter], testedClassName)){
      modifierClassName = this.modifierClasses_[counter];
      this.deregisterTarget();
      this.registeredTarget_ = aTarget;
      goog.dom.classes.add(aTarget, modifierClassName);
      this.registeredTargetClass_ = modifierClassName;
      return;
    }
  }
  // We haven't found any target matching our conditions, so just
  // deregister previous one.
  this.deregisterTarget();
}


/**
 * Deregisters previous target.
 * @private
 */
rflect.cal.MouseOverRegistry.prototype.deRegisterTarget_ = function() {
  if (this.registeredTarget_) {
    goog.dom.classes.remove(this.registeredTarget_,
        this.registeredTargetClass_);
    this.registeredTarget_ = null;
  }
}