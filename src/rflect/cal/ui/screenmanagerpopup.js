/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Modal that hosts screen manager instance.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.ScreenManagerPopup');

goog.require('goog.ui.ModalPopup');


/**
 * Touch hold helper main class.
 * @unrestricted
 */
class ScreenManagerPopup extends goog.ui.ModalPopup {

  /**
   * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
   *     issue by using an iframe instead of a div for bg element.
   * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
   *     goog.ui.Component} for semantics.
   */
  constructor(opt_useIframeMask, opt_domHelper) {
    super(this, opt_useIframeMask, opt_domHelper);

    /**
     * View manager instance.
     * @type {rflect.cal.ViewManager}
     */
    this.screenManager = new rflect.cal.ScreenManager(this, opt_domHelper);
    this.addChild(this.screenManager);
  };


  /**
   * @param {boolean} aShow
   * @override
   */
  setVisible(aShow) {
    if (this.inInDocument()) {
      this.render();
      this.screenManager.render(this.getElement());
    }
    super.setVisible(aShow);

    if (this.hasChildren() && aShow) {
      this.screenManager.showScreen(this.screenManager.getChildAt(0), true);
    }
  }


  /**
   * @override
   */
  createDom() {
    super.createDom();
  };

  /**
   * @override
   */
  disposeInternal() {
    ScreenManagerPopup.superClass_.disposeInternal.call(this);
  }
}


/**
 * @typedef {ScreenManagerPopup}
 */
rflect.cal.ui.ScreenManagerPopup = ScreenManagerPopup;