/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Implementation of UI component, that can be built with string
 * builder.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.ui.BuildableComponent');

goog.require('goog.array');
goog.require('goog.string.StringBuffer');
goog.require('goog.ui.Component');



/**
 * UI component class. Main difference with parent class is that it may use
 * string buffer to build html body.
  * @unrestricted
 */
class BuildableComponent extends goog.ui.Component {

  /**
   * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
   */
  constructor() {
    super(this, opt_domHelper);
  };

  /**
   * @return {string} Unique id.
   * @override
   */
  getId() {
    return 'ui-component' + super.getId.call(this);
  }

  /**
   * Creates component on an empty <temp> element.
   * @override
   */
  createDom() {
    var tempElement = this.getDomHelper().createElement('temp');

    tempElement.innerHTML = this.buildHTML(true);

    this.setElementInternal(this.getDomHelper().
        getFirstElementChild(tempElement));
  };


  /**
   * Decorates an existing html element as a component.
   * @param {Element} aElement The div element to decorate.
   * @protected
   * @override
   */
  decorateInternal(aElement) {
    // Set this.element_.
    super.decorateInternal.call(this, aElement);
    // Build body.
    this.getElement().innerHTML = this.buildHTML(false);
  };


  /**
   * Sets element searching by its id in DOM.
   * @param {string} aId The div element to decorate.
   */
  setElementById(aId) {
    // Set this.element_.
    super.decorateInternal.call(this,
        this.getDomHelper().getElement(aId));
  };


  /**
   * Builds body of component.
   * @param {boolean=} opt_outerHTML Whether to build outer html.
   * @return {string} HTML of component.
   */
  buildHTML(opt_outerHTML) {
    var str = '';
    if (opt_outerHTML) {
      str += '<div>';
    }
    this.forEachChild(aChild => {
      if (aChild.buildHTML) {
        str += aChild.buildHTML(true);
      }
    });
    if (opt_outerHTML) {
      str += '</div>';
    }
    return str;
  };


  /**
   * Enables touch interface.
   * @param {boolean} aEnable Whether to enable it.
   * @param {boolean=} opt_deep Whether to enable it in children.
   */
  enableTouchInterface(aEnable, opt_deep) {
    this.forEachChild(function(aChild) {
      if (aChild.setHandleTouchEvents) {
        aChild.setHandleTouchEvents(aEnable);
      }
      if (opt_deep && aChild.enableTouchInterface) {
        aChild.enableTouchInterface(aEnable, opt_deep);
      }
    });
  };


  /**
   * Enables mouse interface.
   * @param {boolean} aEnable Whether to enable it.
   * @param {boolean=} opt_deep Whether to enable it in children.
   */
  enableMouseInterface(aEnable, opt_deep) {
    this.forEachChild(function(aChild) {
      if (aChild.setHandleMouseEvents) {
        aChild.setHandleMouseEvents(aEnable);
      }
      if (opt_deep && aChild.enableMouseInterface) {
        aChild.enableMouseInterface(aEnable, opt_deep);
      }
    });
  };


  /**
   * @override
   */
  disposeInternal() {
    super.disposeInternal.call(this);
  }
}


/**
 * @typedef {BuildableComponent}
 */
rflect.ui.BuildableComponent = BuildableComponent;
