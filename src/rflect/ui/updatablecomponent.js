/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Implementation of UI component, that can be built with string
 * builder.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.ui.UpdatableComponent');

goog.require('goog.array');
goog.require('goog.string.StringBuffer');
goog.require('rflect.object');
goog.require('rflect.ui.BuildableComponent');



/**
 * UI component class. Main difference with parent class is that it may update
 * itself by invoking <code>update</code> method.
 * @unrestricted
 */
class UpdatableComponent extends rflect.ui.BuildableComponent {
  /**
   * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
   */
  constructor(opt_domHelper) {
    super(opt_domHelper);
  };


  /**
   * Creates component on an empty <temp> element.
   * @override
   */
  createDom() {
    var tempElement = this.getDomHelper().createElement('temp');

    tempElement.innerHTML = this.buildHTML(true);

    this.setElementInternal(this.getDomHelper().
        getFirstElementChild(tempElement));
    this.updateBeforeRedraw();
  };


  /**
   * Decorates an existing html element as a component.
   * @param {Element} aElement The div element to decorate.
   * @protected
   * @override
   */
  decorateInternal(aElement) {
    // Set this.element_.
    goog.ui.Component.prototype.decorateInternal.call(this, aElement);
    this.updateBeforeRedraw();
    // Build body.
    this.getElement().innerHTML = this.buildHTML(false);
  };


  /**
   * Decorates buttons, attaches event handlers for them.
   */
  enterDocument() {
    this.decorateChildren();
    UpdatableComponent.superClass_.enterDocument.call(this);
    this.updateAfterRedraw();
  }
  
  
  /**
   * Initializes child components by invoking goog.ui.Component#decorate.
   */
  decorateChildren() {
    this.forEachChild(aChild => {
      var element = this.getDomHelper().getElement(aChild.getId());
      if (element) {
        aChild.decorate(element);
      }
    });
  }
  
  
  /**
   * Updates component in whole update sequence.
   * As argument is optional, calling <code>component.update()</code>, without
   * any args, on component should result in full redraw of its contents.
   *
   * If you're calling this method in subclass, and want to delegate call to
   * superclass version, be sure to pass <code>opt_options</code> to superclass
   * version.
   *
   * @param {Object.<string, *>=} opt_options Options for update.
   * @see {rflect.cal.ui.MainBody#updateBeforeRedraw}.
   * @see {rflect.cal.ui.MainBody#updateAfterRedraw}.
   */
  update(opt_options) {
    var immutableOptions = opt_options ?
        rflect.object.createImmutableViewDeep(opt_options) : opt_options;

    this.forEachChild(aChild => {
      aChild.exitDocument();
    });
    this.updateBeforeRedraw(immutableOptions);
  
    this.getElement().innerHTML = this.buildHTML(false);
  
    this.decorateChildren();
    this.updateAfterRedraw(immutableOptions);
  };
  
  
  /**
   * Updates component before redraw, i.e. before any component changes will be
   * reflected in DOM. This is used when some part of component's update logic
   * need to be separated from redraw. For custom behavior, should be overridden
   * by subclasses.
   * @param {Object.<string, *>=} opt_options Options for update.
   * @protected
   */
  updateBeforeRedraw(opt_options) {};
  
  
  /**
   * Updates component after redraw. This is a second and final part of
   * component update sequence.
   * @param {Object.<string, *>=} opt_options Options for update.
   * @protected
   */
  updateAfterRedraw(opt_options) {};


  /**
   * @override
   */
  disposeInternal() {
    UpdatableComponent.superClass_.disposeInternal.call(this);
  }
}


/**
 * @typedef {UpdatableComponent}
 */
rflect.ui.UpdatableComponent = UpdatableComponent;
