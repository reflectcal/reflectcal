/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class for decorating component with "mouse miss -> close"
 * behavior, i.e. we click outside of component and close it.
 */

goog.provide('rflect.ui.MouseMissBehavior');


goog.require('goog.events');
goog.require('goog.events.EventType');



/**
 * Mouse miss behaviour main class.
 * @param {goog.ui.Component} aComponent Component to decorate.
 * @constructor
 */
rflect.ui.MouseMissBehavior = function(aComponent) {

  /**
   * @type {goog.ui.Component}
   */
  this.component = aComponent;
}


/**
 * Tracked instances of components. Used for closing behavior.
 * @type {Array.<rflect.ui.MouseMissBehavior>}
 */
rflect.ui.MouseMissBehavior.instances_ = [];


/**
 * Key for global mousedown listener.
 * {@type} goog.events.Key
 * @private
 */
rflect.ui.MouseMissBehavior.globalMouseDownKey_;


/**
 * Whether this behavior is enabled.
 * @type {boolean}
 * @private
 */
rflect.ui.MouseMissBehavior.prototype.enabled_;


/**
 * Key mousedown listener for this behavior.
 * {@type} goog.events.Key
 * @private
 */
rflect.ui.MouseMissBehavior.prototype.mouseMissKey_;


/**
 * Whether component should not be closed in mouse miss closing behavior.
 * @type {boolean}
 */
rflect.ui.MouseMissBehavior.prototype.doNotClose = false;


/**
 * Enables behaviour when dialog is closed when mouse misses it.
 * @param {boolean} aEnabled Whether to enable behaviour.
 */
rflect.ui.MouseMissBehavior.prototype.enable = function(aEnabled) {
  var enabled = this.isEnabled();  
  if (enabled == aEnabled)
    return;

  this.enabled_ = aEnabled;
  
  if (aEnabled) {
    rflect.ui.MouseMissBehavior.instances_.push(this);
    if (this.component.isInDocument())
      this.attachMouseMissListeners_();
  }
  else {
    goog.array.remove(rflect.ui.MouseMissBehavior.instances_, this);
    if (this.component.isInDocument())
      this.detachMouseMissListeners_();
  }
}


/**
 * @return {boolean} Whether mouse miss close is enabled.
 */
rflect.ui.MouseMissBehavior.prototype.isEnabled = function() {
  return this.enabled_;
}


/**
 * Attaches listeners to implement mouse miss behavior.
 */
rflect.ui.MouseMissBehavior.prototype.attachMouseMissListeners_ = function() {
  if (!goog.isDefAndNotNull(this.mouseMissKey_))
    this.mouseMissKey_ = goog.events.listen(this.component.getElement(),
        [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART],
        this.onMouseDown_, false, this);
  if (!goog.isDefAndNotNull(rflect.ui.MouseMissBehavior.globalMouseDownKey_))
    rflect.ui.MouseMissBehavior.globalMouseDownKey_ = goog.events.listen(
        document, [goog.events.EventType.MOUSEDOWN,
          goog.events.EventType.TOUCHSTART],
        rflect.ui.MouseMissBehavior.onMouseDownGlobal_, false, this);
}


/**
 * Detaches listeners to implement mouse miss behavior.
 */
rflect.ui.MouseMissBehavior.prototype.detachMouseMissListeners_ = function() {
  goog.events.unlistenByKey(this.mouseMissKey_);
  if (rflect.ui.MouseMissBehavior.instances_.length == 0) {
    goog.events.unlistenByKey(rflect.ui.MouseMissBehavior.globalMouseDownKey_);
    rflect.ui.MouseMissBehavior.globalMouseDownKey_ = null;
  }
}


/**
 * Checks whether listeners should be added. Should be called during component's
 * enterDocument.
 */
rflect.ui.MouseMissBehavior.prototype.enterDocument = function() {
  if (this.isEnabled())
    this.attachMouseMissListeners_();
};


/**
 * Informs that component was mousedowned.
 */
rflect.ui.MouseMissBehavior.prototype.onMouseDown_ = function() {

  this.doNotClose = true;
}


/**
 * Document-level mouse listener.
 */
rflect.ui.MouseMissBehavior.onMouseDownGlobal_ = function() {

  for (var counter = 0, length = rflect.ui.MouseMissBehavior.instances_.length;
       counter < length; counter++) {

    if (rflect.ui.MouseMissBehavior.instances_[counter].doNotClose)
      rflect.ui.MouseMissBehavior.instances_[counter].doNotClose = false;
    else
      rflect.ui.MouseMissBehavior.instances_[counter].component
      .setVisible(false);
  }
}


/**
 * Alias to setMouseMissToCancel with false argument.
 */
rflect.ui.MouseMissBehavior.prototype.dispose = function() {
  this.enable(false);
};