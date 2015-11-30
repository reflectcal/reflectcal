/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Size methods helper class, tuned for ViewManager type keys.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.VMAdaptiveSizeHelper');

goog.require('rflect.cal.ui.AdaptiveSizeHelper');



/**
 * Size adapter main class.
 * @unrestricted
 */
class VMAdaptiveSizeHelper extends rflect.cal.ui.AdaptiveSizeHelper {
  /**
   * @param {rflect.cal.ViewManager} aViewManager
   */
  constructor(aViewManager) {

    super();

    /**
     * @type {rflect.cal.ViewManager}
     * @private
     */
    this.viewManager_ = aViewManager;

  };


  /**
   * @return {goog.math.Size}
   */
  getStaticSizeForView() {
    return this.getStaticSize(this.viewManager_.currentView);
  };


  /**
   * @param {goog.math.Size} aSize
   */
  setStaticSizeForView(aSize) {
    this.setStaticSize(this.viewManager_.currentView, aSize);
  };


  /**
   * @return {boolean}
   */
  getSizeWasAdaptedForView() {
    return this.getSizeWasAdapted(this.viewManager_.currentView);
  };


  /**
   * @param {boolean} aWasAdapted
   */
  setSizeWasAdaptedForView(aWasAdapted) {
    this.setSizeWasAdapted(this.viewManager_.currentView, aWasAdapted);
  };
}


/**
 * @typedef {VMAdaptiveSizeHelper}
 */
rflect.cal.ui.VMAdaptiveSizeHelper = VMAdaptiveSizeHelper;