/*
 * Copyright (c) 2014. Reflect, Alex K.
 */

/**
 * @fileoverview Utilities for manipulating style.
 */

goog.provide('rflect.style');


goog.require('goog.userAgent');


/**
 * The CSS style properties corresponding to an element being
 * unselectable.
 * @type {Array.<string>}
 * @const
 */
rflect.style.UNSELECTABLE_STYLES = [
  'MozUserSelect',
  'WebkitUserSelect',
  'msUserSelect'
];


/**
 * The CSS style property corresponding to an element being
 * unselectable on the current browser platform (null if none).
 * Opera and IE instead use a DOM attribute 'unselectable'.
 * @type {?string}
 * @private
 */
rflect.style.unselectableStyle_;


/**
 * Whether unselectable style bas been detected.
 * @type {boolean}
 * @private
 */
rflect.style.unselectableStyleDetected_ = false;


/**
 * @param {string|null} aName User select style name in question.
 * @return {boolean} Whether found user select style name is IE one.
 */
rflect.style.isIEUserSelect = function(aName){
  return aName == rflect.style.UNSELECTABLE_STYLES[2];
};


/**
 * NOTE(alexk): method must be used only on ready DOM.
 * @return {?string} Name of unselectable style property for current browser,
 * if any.
 */
rflect.style.detectUnselectableProperty = function(){
  if (!rflect.style.unselectableStyleDetected_){
    var el = document.createElement('div');
    for (var counter = 0; counter < rflect.style.UNSELECTABLE_STYLES.length;
        counter++){
      if (el.style[rflect.style.UNSELECTABLE_STYLES[counter]] != null){
        rflect.style.unselectableStyle_ =
            rflect.style.UNSELECTABLE_STYLES[counter];
        break;
      }
    }
    rflect.style.unselectableStyleDetected_ = true;
  }

  return rflect.style.unselectableStyle_;
}


/**
 * Makes the element and its descendants selectable or unselectable.  Note
 * that on some platforms (e.g. Mozilla), even if an element isn't set to
 * be unselectable, it will behave as such if any of its ancestors is
 * unselectable.
 * @param {Element} el  The element to alter.
 * @param {boolean} unselectable  Whether the element and its descendants
 *     should be made unselectable.
 * @param {boolean=} opt_noRecurse  Whether to only alter the element's own
 *     selectable state, and leave its descendants alone; defaults to false.
 */
rflect.style.setUnselectable = function(el, unselectable, opt_noRecurse) {
  var descendants = !opt_noRecurse ? el.getElementsByTagName('*') : null;
  var name = rflect.style.detectUnselectableProperty();
  if (name && !rflect.style.isIEUserSelect(name)) {
    // Add/remove the appropriate CSS style to/from the element and its
    // descendants.
    var value = unselectable ? 'none' : '';
    el.style[name] = value;
    if (descendants) {
      for (var i = 0, descendant; descendant = descendants[i]; i++) {
        descendant.style[name] = value;
      }
    }
  } else if (goog.userAgent.IE || goog.userAgent.OPERA ||
      rflect.style.isIEUserSelect(name)) {
    // Toggle the 'unselectable' attribute on the element and its descendants.
    var value = unselectable ? 'on' : '';
    el.setAttribute('unselectable', value);
    if (descendants) {
      for (var i = 0, descendant; descendant = descendants[i]; i++) {
        descendant.setAttribute('unselectable', value);
      }
    }
  }
};
