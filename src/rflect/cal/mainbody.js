/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar main body, root of all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MainBody');

goog.require('rflect.cal.Component');
goog.require('rflect.cal.MainPane');
goog.require('rflect.cal.MiniCal');
goog.require('rflect.cal.TopPane');



/**
 * Main body main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.BlockManager} aBlockManager Link to block manager.
 * @constructor
 * @extends {rflect.cal.Component}
 */
rflect.cal.MainBody = function(aViewManager, aTimeManager,
    aContainerSizeMonitor, aBlockManager) {
  rflect.cal.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Link to container size monitor.
   * @type {goog.dom.ViewportSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Link to block manager.
   * @type {rflect.cal.BlockManager}
   * @private
   */
  this.blockManager_ = aBlockManager;

  // Add child components in order for them to be included in propagation of
  // string building and updating.
  this.addChild(this.topPane_ = new rflect.cal.TopPane(this.viewManager_,
      this.timeManager_));
  this.addChild(this.miniCal = new rflect.cal.MiniCal(this.viewManager_,
      this.timeManager_));
  this.addChild(this.mainPane_ = new rflect.cal.MainPane(this.viewManager_,
      this.timeManager_, this.containerSizeMonitor_, this.blockManager_));
  if (goog.DEBUG) {
    _inspect('topPane_', this.topPane_);
    _inspect('miniCal', this.miniCal);
    _inspect('mainPane_', this.mainPane_);
  }
};
goog.inherits(rflect.cal.MainBody, rflect.cal.Component);


/**
 * Main body html parts, used by renderer.
 * @type {Array.<string>}
 * @const
 * @private
 */
rflect.cal.MainBody.HTML_PARTS_ = [
  '<div id="main-container">',

  '<div class="cal-container">',
  '<div id="top-pane">',
  '</div>',
  '<div id="main-body">',
  '<div id="left-pane">',
  '<div id="left-main-pane">',
  '<div id="month-selector">',
  '</div>',
  '<div id="calendars-selector" class="list-selector">',
  '</div>',
  '<div id="tasks-selector" class="list-selector">',
  '</div>',
  '</div>',
  '<div id="left-aux-pane">',
  '</div>',
  '</div>',
  '<div id="main-pane" class="' + goog.getCssName('main-pane') + '">',
  '</div>',
  '</div>',
  '</div>',

  '</div>'
];


/**
 * Creates main body on an empty div element.
 */
rflect.cal.MainBody.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing html div element as a Main Body.
 * @override
 */
rflect.cal.MainBody.prototype.decorateInternal = function(aElement,
                                                          opt_doNotBuildBody) {
  // Set this.element_ and build component.
  rflect.cal.MainBody.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);

  if (!opt_doNotBuildBody) {
    this.getElement().id = 'main-container';
    this.getElement().className = 'main-container';
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.cal.Component#buildBody
 * @protected
 */
rflect.cal.MainBody.prototype.buildBodyInternal = function(aSb) {
  var parts = rflect.cal.MainBody.HTML_PARTS_;
  // Form html. From index 1, because 0 is the html of outer container, which
  // we don't create in that method but just decorate.
  for (var counter = 1, length = parts.length - 1;
       counter < length; counter++) {
    aSb.append(parts[counter]);
    switch (counter) {
      // Include top pane in common buffer.
      case 2: {
        this.topPane_.buildBody(aSb);
      };break;
      case 7: {
        this.miniCal.buildBody(aSb);
      };break;
      // Include main pane in common buffer.
      case 17: {
        this.mainPane_.buildBody(aSb);
      };break;
      default: break;
    }
  }
};


/**
 * Places dummy element in container, then gets container size as if app was
 * present in it. This helps in situations when initially container had
 * different size than after app is rendered, for example, because scrollbars
 * appeared.
 * @param {Element} aContainer Container where component is to be placed.
 */
rflect.cal.MainBody.prototype.preRender = function(aContainer) {
  var container = aContainer || this.dom_.getDocument().body;
  container.innerHTML = rflect.cal.MainBody.HTML_PARTS_[0] +
      rflect.cal.MainBody.HTML_PARTS_[1] +
      rflect.cal.MainBody.HTML_PARTS_[20] +
      rflect.cal.MainBody.HTML_PARTS_[21];
  this.containerSizeMonitor_.checkForViewportSizeChange();
  container.innerHTML = '';
};


/**
 * Decorates child components.
 */
rflect.cal.MainBody.prototype.enterDocument = function() {
  // We could decorate children right after superclass decorateInternal call,
  // but to preserve pattern (that if we want reliable presence of component in
  // DOM, we should address it in enterDocument), we do it here.
  this.topPane_.decorateInternal(this.dom_.getElement('top-pane'), true);
  this.miniCal.decorateInternal(this.dom_.getElement('month-selector'), true);
  this.mainPane_.decorateInternal(this.dom_.getElement('main-pane'), true);
  // Propagate call to children.
  rflect.cal.MainBody.superClass_.enterDocument.call(this);

};


/**
 * Disposes of the Main Body.
 * @override
 * @protected
 */
rflect.cal.MainBody.prototype.disposeInternal = function() {
  rflect.cal.MainBody.superClass_.disposeInternal.call(this);

  this.topPane_ = null;
  this.miniCal = null;
  this.mainPane_ = null;
  this.viewManager_ = null;
  this.timeManager_ = null;
  this.blockManager_ = null;
};
