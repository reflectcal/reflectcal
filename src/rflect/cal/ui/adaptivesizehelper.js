/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Size methods helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.AdaptiveSizeHelper');

goog.require('rflect.cal.ViewType');



/**
 * Size adapter main class.
 * @unrestricted
 */
class AdaptiveSizeHelper {
  constructor() {
    /**
     * Map of (view configuration -> size).
     * @type {Object.<*, goog.math.Size>}
     */
    this.staticSizes_ = {};

    /**
     * Map of (view configuration -> whether size was adapted).
     * @type {Object.<*, boolean>}
     */
    this.sizeWasAdapted_ = {};
  };


  /**
   * @param {*} aKey
   * @return {goog.math.Size}
   */
  getStaticSize(aKey) {
    return this.staticSizes_[aKey];
  };


  /**
   * @param {*} aKey
   * @param {goog.math.Size} aSize
   */
  setStaticSize(aKey, aSize) {
    this.staticSizes_[aKey] = aSize;
  };


  /**
   * @param {*} aKey
   * @return {boolean}
   */
  getSizeWasAdapted(aKey) {
    return this.sizeWasAdapted_[aKey];
  };


  /**
   * @param {*} aKey
   * @param {boolean} aWasAdapted
   */
  setSizeWasAdapted(aKey, aWasAdapted) {
    this.sizeWasAdapted_[aKey] = aWasAdapted;
  };
}


/**
 * @typedef {AdaptiveSizeHelper}
 */
rflect.cal.ui.AdaptiveSizeHelper = AdaptiveSizeHelper;