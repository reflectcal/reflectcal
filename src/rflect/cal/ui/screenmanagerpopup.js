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
goog.require('rflect.cal.ui.ScreenManager');


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
    super(opt_useIframeMask, opt_domHelper);

    /**
     * View manager instance.
     * @type {rflect.cal.ui.ScreenManager}
     */
    this.screenManager = new rflect.cal.ui.ScreenManager(opt_domHelper);
    this.screenManager.setSlidingIsEnabled(rflect.TOUCH_INTERFACE_ENABLED);

    this.addChild(this.screenManager);

    /**
     * @type {Element}
     * @private
     */
    this.arrow_;

    /**
     * @type {Element}
     * @private
     */
    this.body_;
  };

  /**@return {Element}*/
  getArrow() {
    return this.arrow_ ? this.arrow_ : (this.arrow_ =
        goog.dom.createDom('div', ['arrow-cont', 'right'],
            goog.dom.createDom('div', 'arrow-outer'),
            goog.dom.createDom('div', 'arrow-inner')));
  }

  /**@return {Element}*/
  getBody() {
    return this.arrow_ ? this.body_ : (this.body_ =
        this.getDomHelper().createDom('div', this.getCssClass() + '-body'));
  }


  /**@override*/
  createDom() {
    ScreenManagerPopup.superClass_.createDom.call(this);

    this.createElements_(this.getElement());
  }

  /** @override */
  decorateInternal(element) {
    ScreenManagerPopup.superClass_.decorateInternal.call(this, element);

    this.getDomHelper().removeChildren(element);
    this.createElements_(element);
  };

  createElements_(aElement) {
    aElement.appendChild(this.getBody());
    aElement.appendChild(this.getArrow());
  }

  /**
   * @param {boolean} aShow
   * @param {Element=} opt_anchorElement
   * @param {goog.math.Coordinate=} opt_anchorCoordinate
   * @override
   */
  setVisible(aShow, opt_anchorElement, opt_anchorCoordinate) {
    if (!this.isInDocument()) {
      this.render();
      this.screenManager.render(this.getBody());
    }

    ScreenManagerPopup.superClass_.setVisible.call(this, aShow);

    if (this.hasChildren() && aShow) {
      this.screenManager.showScreen(this.screenManager.getChildAt(0), true);
    }

    if (this.bgEl_) {
      if (aShow) {
        goog.dom.classes.add(this.bgEl_, 'visible');
      } else {
        goog.dom.classes.remove(this.bgEl_, 'visible');
      }
    }
    if (aShow) {
      goog.dom.classes.add(this.getElement(), 'dialog-appearance');
    } else {
      goog.dom.classes.remove(this.getElement(), 'dialog-appearance');
    }
  }



  /**
   * @override
   */
  disposeInternal() {
    ScreenManagerPopup.superClass_.disposeInternal.call(this);

    this.arrow_ = null;
    this.body_ = null;
  }
}


/**
 * @typedef {ScreenManagerPopup}
 */
rflect.cal.ui.ScreenManagerPopup = ScreenManagerPopup;


/**
 * @enum {string}
 */
rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
}