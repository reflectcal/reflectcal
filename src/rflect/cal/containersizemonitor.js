/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Utility class that monitors container size changes.
 *
 * @see ../demos/viewportsizemonitor.html
 */

goog.provide('rflect.cal.ContainerSizeMonitor');

goog.require('goog.dom');
goog.require('rflect.dom.ViewportSizeMonitor');
goog.require('rflect.cal.predefined');



/**
 * This class can be used to monitor changes of outer container where component
 * is placed, window or arbitrary element.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {Element|string} aContainer Container which size is to monitor or its
 * id.
 * @param {Window=} opt_window The window to monitor; defaults to the window in
 *    which this code is executing.
 * @constructor
 * @extends {rflect.dom.ViewportSizeMonitor}
 * @see {rflect.dom.ViewportSizeMonitor}
 */
rflect.cal.ContainerSizeMonitor = function(aViewManager, aContainer,
    opt_window) {
  rflect.dom.ViewportSizeMonitor.call(this, opt_window);

  /**
   * Container element.
   * @type {Element}
   * @private
   */
  this.container_ = goog.dom.getElement(aContainer);

  if (goog.isString(this.container_))
    this.containerId_ = /**@type {string}*/ (aContainer);

  /**
   * Size of container.
   * @type {goog.math.Size}
   * @private
   */
  this.containerSize_ = this.getContainerSize_();
};
goog.inherits(rflect.cal.ContainerSizeMonitor, rflect.dom.ViewportSizeMonitor);


/**
 * Container id, used when container element is not yet ready to be passed in
 * constructor and will be retrieved later by this id.
 * @type {string}
 */
rflect.cal.ContainerSizeMonitor.prototype.containerId_;


/**
 * Timeout for delayed check of window size.
 * @type {number}
 * @private
 */
rflect.cal.ContainerSizeMonitor.prototype.windowSizePollTimeout_ = 0;


/**
 * @return {Element} Container element.
 */
rflect.cal.ContainerSizeMonitor.prototype.getContainer = function() {
  return this.container_ || goog.dom.getElement(this.containerId_);
}

/**
 * Returns the most recently recorded size of the container, in pixels. May
 * return null if no window resize event has been handled yet.
 * @return {goog.math.Size} The container dimensions, in pixels.
 */
rflect.cal.ContainerSizeMonitor.prototype.getSize = function() {
  return this.containerSize_ ? this.containerSize_.clone() : null;
};


/**
 * @return {goog.math.Size} Container size.
 * @private
 */
rflect.cal.ContainerSizeMonitor.prototype.getContainerSize_ = function() {
  return new goog.math.Size(this.getContainer().clientWidth,
      this.getContainer().clientHeight);
};


/**
 * Measures the dimensions of the container and dispatches a
 * {@link goog.events.EventType.RESIZE} event if the current dimensions are
 * different from the previous ones.
 * @param {boolean=} aNotActualResize Whether this method was called not from
 * actual resize, true in case of manual call or by timer.
 * @protected
 */
rflect.cal.ContainerSizeMonitor.prototype.checkForSizeChange = function(
    aNotActualResize) {
  var viewportSize = goog.dom.getViewportSize(this.window);
  if (!goog.math.Size.equals(viewportSize, this.size)) {
    this.size = viewportSize;
    this.checkForContainerSizeChange_();
    // When we change window size vertically from down to top, scroll briefly
    // appears. Then we adapt app for this size and scroll disappears, leave us
    // with incorrect size. So we need delayed check for actual size.
    if (this.windowSizePollInterval == null && !aNotActualResize) {
      clearTimeout(this.windowSizePollTimeout_);
      this.windowSizePollTimeout_ = setTimeout(
          goog.bind(this.checkForSizeChange, this, true),
          rflect.dom.ViewportSizeMonitor.WINDOW_SIZE_POLL_RATE);
    }
  }
};


/**
 * Checks size of container.
 * @see {rflect.cal.ContainerSizeMonitor#checkForSizeChange}
 * @private
 */
rflect.cal.ContainerSizeMonitor.prototype.checkForContainerSizeChange_ =
    function() {
  var containerSize = this.getContainerSize_();
  if (!goog.math.Size.equals(containerSize, this.containerSize_)) {
    this.containerSize_ = containerSize;
    this.dispatchEvent(goog.events.EventType.RESIZE);
  }
};


/**
 * Forces size check of container. This could be useful when container size may
 * be changed not only by window resize. In that case this method should be
 * called for size update.
 */
rflect.cal.ContainerSizeMonitor.prototype.checkForContainerSizeChange =
    function() {
  this.checkForContainerSizeChange_();
};


/**
 * Forces size check of viewport. This includes container size check.
 */
rflect.cal.ContainerSizeMonitor.prototype.checkForViewportSizeChange =
    function() {
  this.checkForSizeChange(true);
};


/**
 * Disposes of container size monitor.
 */
rflect.cal.ContainerSizeMonitor.prototype.disposeInternal = function() {
  rflect.cal.ContainerSizeMonitor.superClass_.disposeInternal.call(this);

  clearTimeout(this.windowSizePollTimeout_);
  this.container_ = null;
  this.containerSize_ = null;
};




