/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Helper class to establish default behaviour
 * (highlight/unhighlight) for mouseover event for all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MouseOverRegistry');



/**
 * Storage for registered mouse over targets for component.
 * @constructor
 */
rflect.cal.MouseOverRegistry = function() {

  /**
   * RegExps that form condition which shows whether we hover on element.
   * @type {Array.<RegExp>}
   * @private
   */
  this.conditionRes_ = [];

  /**
   * Class that should be added/removed on hover.
   * @type {Array.<string>}
   * @private
   */
  this.modifierClasses_ = [];
};


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
 * Adds a pair of condition classes array and modifier class to registry.
 * @param {Array.<string>} aConditionClasses Array of classes that form
 * condition.
 * @param {string} aModifierClass Class for indicating hover state.
 */
rflect.cal.MouseOverRegistry.prototype.addSequence = function(aConditionClasses,
    aModifierClass) {
  this.conditionRes_.push(
      rflect.string.buildClassNameRe.apply(null, aConditionClasses));
  this.modifierClasses_.push(aModifierClass);
}


/**
 * Registers mouse over target and de-registers previous one.
 * @param {Element} aTarget New element to register hover on.
 * @param {string=} opt_hoverClassName Class which should be added to hovered
 * target.
 */
rflect.cal.MouseOverRegistry.prototype.registerTarget =
    function(aTarget, aClassName) {
  var modifierClassName;
  for (var counter = 0, length = this.conditionRes_.length; counter < length;
      counter++) {
    if (this.conditionRes_.test(aClassName)){
      modifierClassName = this.modifierClasses_[counter];
      this.deregisterTarget_();
      this.registeredTarget_ = aTarget;
      goog.dom.classes.add(aTarget, modifierClassName);
      this.registeredTargetClass_ = modifierClassName;
      return;
    }
  }
  // We haven't found any target matching our conditions, so just
  // deregister previous one.
  this.deregisterTarget_();
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