/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Component representing list of items, such as list
 * of calendars or tasks.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.ListSelector');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('rflect.ui.Component');
goog.require('rflect.ui.MouseOverRegistry');
goog.require('rflect.cal.predefined');
goog.require('rflect.string');



/**
 * List selector general class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.ListSelector = function(aViewManager, aContainerSizeMonitor) {
  rflect.ui.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  // Sizes.
  /**
   * Size of list selector scrollable, the only part that could vary in size.
   * @type {goog.math.Size}
   */
  this.scrollableSize_ = null;

  /**
   * Mouse over registry for whole component.
   * @type {rflect.ui.MouseOverRegistry}
   * @private
   */
   this.moRegistryForWhole_ = new rflect.ui.MouseOverRegistry();

   /**
   * Mouse over registry for parts of component.
   * @type {rflect.ui.MouseOverRegistry}
   * @private
   */
   this.moRegistryForParts_ = new rflect.ui.MouseOverRegistry();

};
goog.inherits(rflect.cal.ui.ListSelector, rflect.ui.Component);


/**
 * String parts for builder.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ui.ListSelector.HTML_PARTS_ = [
  '<div id="calendars-selector" class="' + goog.getCssName('list-selector') + '">',
  '<div id="calendars-label-cont" class="' + goog.getCssName('list-label-cont') + '">' +
      '<div id="calendars-label" class="' + goog.getCssName('list-label') + '">',
  /* List selector label (calendars). */
  '</div>',
  /* List selector menu signs (<div class="listitem-opt"></div>)*/
  '</div>',
  '<div id="calendars-body" class="list-body ',
  /* Class indicating whether list body is overflown (list-body-overflown). */
  '" style="height:',
  /* Height of list selector's body in pixels (150). */
  'px">',
  /* Content. */
  '</div>',
  '</div>'
];


/**
 * Header element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.ListSelector.prototype.header_;


/**
 * Label shown in header.
 * @type {string}
 * @private
 */
rflect.cal.ui.ListSelector.prototype.label_;


/**
 * Scrollable element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.ListSelector.prototype.scrollableEl_;


/**
 * Regexp for detection of item.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.ListSelector.prototype.itemRe_;


/**
 * Regexp for detection of header.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.ListSelector.prototype.headerRe_;


/**
 * Regexp for detection of options button.
 * @type {RegExp}
 * @private
 */
rflect.cal.ui.ListSelector.prototype.buttonRe_;


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @protected
 * @see {rflect.cal.ui.MainPaneBuilder#buildBodyInternalWeek_}
 */
rflect.cal.ui.ListSelector.prototype.buildInternal = function(aSb) {
  var offset = 0;
  var length = rflect.cal.ui.ListSelector.HTML_PARTS_.length;
  while (++offset < length - 1) {
    aSb.append(rflect.cal.ui.ListSelector.HTML_PARTS_[offset]);
    switch (offset) {
      case 1: {
        this.buildLabel_(aSb);
      };break;
      case 2: {
        this.buildOptions(aSb);
      };break;
      /*case 4: {
        this.buildListBodyClass_(aSb);
      };break;*/
      case 5: {
        this.buildScrollableHeight_(aSb);
      };break;
      case 6: {
        this.buildContent(aSb, offset);
      };break;
      default: break;
    }
  }
};


/**
 * Builds list selector's label.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'<div id="calendars-selector" class="' + goog.getCssName('list-selector') + '">',
 * '<div id="calendars-label-cont" class="' + goog.getCssName('list-label-cont') + '">' +
 *     '<div id="calendars-label" class="' + goog.getCssName('list-label') + '">',
 *  List selector label (calendars). 
 *
 */
rflect.cal.ui.ListSelector.prototype.buildLabel_ = function(aSb) {
  aSb.append(this.label_);
};


/**
 * @return {Element} List selector's header element.
 */
rflect.cal.ui.ListSelector.prototype.getHeader = function() {
  return this.header_ ||
      (this.header_ = this.dom_.getFirstElementChild(this.getElement()));
};


/**
 * Builds list selector's options controls. Should be overridden.
 * @protected
 *
 * '</div>',
 *  List selector menu signs (<div class="listitem-opt"></div>)
 *
 */
rflect.cal.ui.ListSelector.prototype.buildOptions = goog.abstractMethod;


/**
 * Builds list body class indicating whether scrollbars should appear.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 * '<div id="calendars-body" class="list-body ',
 *  Class indicating whether list body is overflown (list-body-overflown). 
 *
 */
rflect.cal.ui.ListSelector.prototype.buildListBodyClass_ = function(aSb) {
  aSb.append(goog.getCssName('list-body-overflown'));
}


/**
 * Builds list selector scrollable's height.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @private
 *
 *'" style="height:',
 *  Height of list selector's body in pixels (150). 
 *
 */
rflect.cal.ui.ListSelector.prototype.buildScrollableHeight_ = function(aSb) {
  aSb.append(this.scrollableSize_.height);
}


/**
 * Builds list selector content. Should be overridden.
 * @protected
 *
 * 'px">',
 *  Content. 
 *
 */
rflect.cal.ui.ListSelector.prototype.buildContent = goog.abstractMethod;


/**
 * Updates list selector with new data before redraw. Includes size adjustment.
 * @param {Array.<number>=} opt_exclusions Exclusion indexes.
 * @param {boolean=} opt_firstTime Whether it's a first time update.
 */
rflect.cal.ui.ListSelector.prototype.updateBeforeRedraw = function(opt_exclusions,
    opt_firstTime) {
  // Take current viewport size.
  this.scrollableSize_ = this.containerSizeMonitor_.getSize();

  if (opt_firstTime)
    this.scrollableSize_.height = 0;
  else {
    var staticSizes = this.getParent().staticSizesLeftPane;
    this.scrollableSize_.height -= staticSizes.height;
  }

  // Default behaviour is to have two selectors in a column, so divide height
  // by 2.
  if (!opt_firstTime)
    this.scrollableSize_.height /= 2;
};


/**
 * Redraws list selector. This default version changes scrollable size.
 * TODO(alexk): add/remove item case.
 */
rflect.cal.ui.ListSelector.prototype.updateByRedraw = function() {
  this.scrollableEl_.style.height = this.scrollableSize_.height + 'px';
};


/**
 * Decorates an existing html div element as a list selector.
 * @override
 */
rflect.cal.ui.ListSelector.prototype.decorateInternal = function(aElement,
    opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.ui.ListSelector.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * @inheritDoc
 */
rflect.cal.ui.ListSelector.prototype.enterDocument = function() {
  rflect.cal.ui.ListSelector.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.getElement(), goog.events.EventType.MOUSEOVER,
      this.onMouseOver_, false, this)
      .listen(this.getElement(), goog.events.EventType.MOUSEOUT,
      this.onMouseOut_, false, this);

  // Save reference to scrollable element.
  this.scrollableEl_ = goog.dom.getChildren(this.getElement())[1];
};


/**
 * List selector mouseout handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.ListSelector.prototype.onMouseOut_ = function(aEvent) {
  var target = aEvent.target;
  var id = target.id;
  var className = target.className;
  if (!aEvent.relatedTarget ||
      !this.dom_.contains(this.getElement(), aEvent.relatedTarget))
    this.showOptions(false);
  if (!this.isItem(className) || !this.isHeader(className) ||
      !this.isButton(className))
    this.moRegistryForParts_.deregisterTarget();
}


/**
 * List selector mouseover handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.ListSelector.prototype.onMouseOver_ = function(aEvent) {
  var target = /**@type {Element}*/ (aEvent.target);
  var id = target.id;
  var className = target.className;

  // Highlight of whole element.
  this.showOptions(true);
  // Highlight of element's parts.
  if (this.isHeader(className))
    this.moRegistryForParts_.registerTarget(this.getHeader(),
      goog.getCssName('list-label-cont-highlighted'));
  else if (this.isButton(className))
    this.moRegistryForParts_.registerTarget(target,
        goog.getCssName('list-selector-options-button-highlighted'));
  else if (this.isItem(className))
    this.moRegistryForParts_.registerTarget(
        rflect.cal.ui.ListSelector.getItem(target),
        goog.getCssName('list-selector-item-highlighted'));
}


/**
 * Searches for closest target ancestor that is item.
 * @param {Element} aTarget Target to start search for item.
 * @return {Element} Item element or null.
 * @protected
 */
rflect.cal.ui.ListSelector.getItem = function(aTarget) {
  return /**@type {Element}*/ (goog.dom.getAncestor(aTarget, function(aNode) {
    return aNode.className == goog.getCssName('listitem-cont-outer');
  }, true, 2));
}


/**
 * Highlights list selector header, where label is situated, shows additional
 * option elements. Should be overridden.
 * @param {boolean} aShow Whether options are shown.
 * @protected
 */
rflect.cal.ui.ListSelector.prototype.showOptions = function(aShow) {
};


/**
 * Tests whether class name indicates of list item. Should be overridden.
 * @protected
 */
rflect.cal.ui.ListSelector.prototype.isItem = goog.abstractMethod;


/**
 * Tests whether class name indicates of header. Should be overridden.
 * @protected
 */
rflect.cal.ui.ListSelector.prototype.isHeader = goog.abstractMethod;


/**
 * Tests whether class name indicates of options button. Should be overridden.
 * @protected
 */
rflect.cal.ui.ListSelector.prototype.isButton = goog.abstractMethod;


/**
 * Disposes of the list selector.
 * @override
 * @protected
 */
rflect.cal.ui.ListSelector.prototype.disposeInternal = function() {
  rflect.cal.ui.ListSelector.superClass_.disposeInternal.call(this);

  this.viewManager_ = null;
  this.containerSizeMonitor_ = null;
};
