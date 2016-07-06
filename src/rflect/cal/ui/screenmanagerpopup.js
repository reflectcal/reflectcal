/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Modal that hosts screen manager instance.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.ScreenManagerPopup');

goog.require('goog.positioning.ClientPosition');
goog.require('goog.positioning.Corner');
goog.require('goog.positioning.AnchoredViewportPosition');
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

    /**
     * @type {Element}
     * @private
     */
    this.lastUsedAnchorElement_;

    /**
     * Margin for the popup used in positioning algorithms.
     *
     * @type {goog.math.Box|undefined}
     * @private
     */
    this.margin_;

    /**
     * @type {rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION}
     * @private
     */
    this.lastUsedArrowPositionConfiguration_ =
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.TOP;
  };

  /**@return {Element}*/
  getArrow() {
    return this.arrow_ ? this.arrow_ : (this.arrow_ =
        goog.dom.createDom('div', 'arrow-cont',
            goog.dom.createDom('div', 'arrow-outer'),
            goog.dom.createDom('div', 'arrow-inner')));
  }

  /**@return {Element}*/
  getBody() {
    return this.body_ ? this.body_ : (this.body_ =
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
   * @override
   */
  setVisible(aShow) {
    if (!this.isInDocument()) {
      this.render(this.getDomHelper().getDocument().body);
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
    /*if (aShow) {
      goog.dom.classes.add(this.getElement(), 'dialog-appearance');
    } else {
      goog.dom.classes.remove(this.getElement(), 'dialog-appearance');
    }*/
  }

  enterDocument() {
    ScreenManagerPopup.superClass_.enterDocument.call(this);

    this.getHandler().listen(this.bgEl_, goog.events.EventType.CLICK,
      this.setVisible.bind(this, false));
  }

  /**
   * @param {rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION} aConfig
   * @param {Element} aAnchorElement
   */
  positionArrow(aConfig,
                aAnchorElement) {

    this.removeArrowClasses(aConfig);

    const {
      top: topOfAnchor,
      right: rightOfAnchor,
      bottom: bottomOfAnchor,
      left: leftOfAnchor
    } = aAnchorElement.getBoundingClientRect();
    const heightOfAnchor = bottomOfAnchor - topOfAnchor;
    const widthOfAnchor = rightOfAnchor - leftOfAnchor;

    const {
      top: topOfPopup,
      right: rightOfPopup,
      bottom: bottomOfPopup,
      left: leftOfPopup
    } = this.getElement().getBoundingClientRect();
    const heightOfPopup = bottomOfPopup - topOfPopup;
    const widthOfPopup = rightOfPopup - leftOfPopup;

    this.positionArrowByConfig(aConfig, topOfAnchor, topOfPopup, leftOfAnchor,
        widthOfAnchor, leftOfPopup, heightOfPopup, heightOfAnchor,
        widthOfPopup);
  }

  positionArrowByConfig(aConfig, topOfAnchor, topOfPopup, leftOfAnchor,
                        widthOfAnchor, leftOfPopup, heightOfPopup,
                        heightOfAnchor, widthOfPopup) {
    switch (aConfig) {
      case rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.TOP: {
        if (topOfAnchor <= topOfPopup) {
          this.positionArrowTop(leftOfAnchor, leftOfPopup, widthOfPopup);
        } else {
          this.positionArrowBottom(leftOfAnchor, leftOfPopup, widthOfPopup, heightOfPopup);
        }
      };break;
      case rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.BOTTOM: {
        if (topOfAnchor > topOfPopup) {
          this.positionArrowBottom(leftOfAnchor, leftOfPopup, widthOfPopup, heightOfPopup);
        } else {
          this.positionArrowTop(leftOfAnchor, leftOfPopup, widthOfPopup);
        }
      };break;
      case rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.LEFT: {
        if (leftOfAnchor <= leftOfPopup) {
          this.positionArrowLeft(topOfAnchor, topOfPopup, heightOfPopup);
        } else {
          this.positionArrowRight(topOfAnchor, topOfPopup, widthOfPopup, heightOfPopup);
        }
      };break;
      case rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.RIGHT: {
        if (leftOfAnchor > leftOfPopup) {
          this.positionArrowRight(topOfAnchor, topOfPopup, widthOfPopup, heightOfPopup);
        } else {
          this.positionArrowLeft(topOfAnchor, topOfPopup, heightOfPopup);
        }
      };break;
      default:break;
    }
  }


  /**
   * @param {number} aPosition
   * @param {number} aDimension
   * @return {number}
   */
  static getArrowPositionInBounds(aPosition, aDimension) {
    const minPosition = 20 +
        rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE / 2;
    const maxPosition = aDimension - minPosition;

    if (aPosition > maxPosition) {
      return maxPosition;

    }
    if (aPosition < minPosition) {
      return minPosition;
    }
    return aPosition;
  }

  positionArrowBottom(leftOfAnchor, leftOfPopup, widthOfPopup, heightOfPopup) {
    const leftOfArrow = ScreenManagerPopup.getArrowPositionInBounds(
        Math.abs(leftOfAnchor - leftOfPopup) -
        rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE / 2, widthOfPopup);
    const topOfArrow = Math.abs(heightOfPopup - 1);

    this.addArrowClass(rflect.cal.ui.ScreenManagerPopup.
        ARROW_CONFIGURATION.BOTTOM);
    goog.style.setPosition(this.getArrow(), leftOfArrow, topOfArrow);
  }

  positionArrowTop(leftOfAnchor, leftOfPopup, widthOfPopup) {
    const leftOfArrow = ScreenManagerPopup.getArrowPositionInBounds(
        Math.abs(leftOfAnchor - leftOfPopup) -
        rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE / 2, widthOfPopup);

    this.addArrowClass(rflect.cal.ui.ScreenManagerPopup.
        ARROW_CONFIGURATION.TOP);
    goog.style.setPosition(this.getArrow(), leftOfArrow,
        -rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE + 1);
  }

  positionArrowRight(topOfAnchor, topOfPopup, widthOfPopup, heightOfPopup) {
    const leftOfArrow = Math.abs(widthOfPopup - 1);
    const topOfArrow = ScreenManagerPopup.getArrowPositionInBounds(Math.abs(topOfAnchor -
        topOfPopup) - rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE / 2,
        heightOfPopup);

    this.addArrowClass(rflect.cal.ui.ScreenManagerPopup.
        ARROW_CONFIGURATION.RIGHT);
    goog.style.setPosition(this.getArrow(), leftOfArrow, topOfArrow);
  }

  positionArrowLeft(topOfAnchor, topOfPopup, heightOfPopup) {
    const topOfArrow = ScreenManagerPopup.getArrowPositionInBounds(Math.abs(topOfAnchor -
        topOfPopup) - rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE / 2,
        heightOfPopup);

    this.addArrowClass(rflect.cal.ui.ScreenManagerPopup.
        ARROW_CONFIGURATION.LEFT);
    goog.style.setPosition(this.getArrow(),
        -rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE + 1, topOfArrow);
  }

  /**
   * @param {rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION} aConfig
   */
  removeArrowClasses(aConfig){
    goog.dom.classes.remove(this.getArrow(),
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.TOP.toString(),
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.BOTTOM.toString(),
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.LEFT.toString(),
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.RIGHT.toString());
  }

  /**
   * @param {rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION} aConfig
   */
  addArrowClass(aConfig){
    goog.dom.classes.add(this.getArrow(), aConfig.toString());
  }

  /**
   * @override
   */
  disposeInternal() {
    ScreenManagerPopup.superClass_.disposeInternal.call(this);

    this.arrow_ = null;
    this.body_ = null;
    this.lastUsedAnchorElement_ = null;
  }

  /**
   * Returns the corner of the popup to used in the positioning algorithm.
   *
   * @return {goog.positioning.Corner} The popup corner used for positioning.
   */
  getPinnedCorner() {
    return this.popupCorner_;
  };


  /**
   * Sets the corner of the popup to used in the positioning algorithm.
   *
   * @param {goog.positioning.Corner} corner The popup corner used for
   *     positioning.
   */
  setPinnedCorner(corner) {
    this.popupCorner_ = corner;
    if (this.isVisible()) {
      this.reposition();
    }
  };


  /**
   * @return {goog.positioning.AbstractPosition} The position helper object
   *     associated with the popup.
   */
  getPosition() {
    return this.position_ || null;
  };


  /**
   * Sets the position helper object associated with the popup.
   *
   * @param {goog.positioning.AbstractPosition} position A position helper object.
   */
  setPosition(position) {
    this.position_ = position || undefined;
    if (this.isVisible()) {
      this.reposition();
    }
  };


  /**
   * Returns the margin to place around the popup.
   *
   * @return {goog.math.Box?} The margin.
   */
  getMargin() {
    return this.margin_ || null;
  };


  /**
   * Sets the margin to place around the popup.
   *
   * @param {goog.math.Box|number|null} arg1 Top value or Box.
   * @param {number=} opt_arg2 Right value.
   * @param {number=} opt_arg3 Bottom value.
   * @param {number=} opt_arg4 Left value.
   */
  setMargin(
      arg1, opt_arg2, opt_arg3, opt_arg4) {
    if (arg1 == null || arg1 instanceof goog.math.Box) {
      this.margin_ = arg1;
    } else {
      this.margin_ = new goog.math.Box(
          arg1,
          /** @type {number} */ (opt_arg2),
          /** @type {number} */ (opt_arg3),
          /** @type {number} */ (opt_arg4));
    }
    if (this.isVisible()) {
      this.reposition();
    }
  };


  /**
   * Repositions the popup according to the current state.
   * @override
   */
  reposition() {
    if (!this.position_) {
      return;
    }

    var hideForPositioning = !this.isVisible();
    var el = this.getElement();
    if (hideForPositioning) {
      //el.style.visibility = 'hidden';
      goog.style.showElement(el, true);
    }

    this.position_.reposition(el, this.popupCorner_, this.margin_);

    if (hideForPositioning) {
      // NOTE(eae): The visibility property is reset to 'visible' by the show_
      // method in PopupBase. Resetting it here causes flickering in some
      // situations, even if set to visible after the display property has been
      // set to none by the call below.
      goog.style.showElement(el, false);
    }
  };
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


/**
 * Width and height of arrow.
 * @const
 * @type {number}
 */
rflect.cal.ui.ScreenManagerPopup.ARROW_SIZE = 22;
