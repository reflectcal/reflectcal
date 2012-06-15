/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.SelectionMask');

goog.require('goog.functions');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('rflect.cal.predefined');



/**
 * Selection mask base class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.Component} aComponent Link to component
 * that owns selection mask.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.SelectionMask = function(aViewManager, aComponent, aTimeManager) {
  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to component that owns selection mask.
   * @type {rflect.cal.Component}
   * @private
   */
  this.component_ = aComponent;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Mask rectangles.
   * @type {Array.<goog.math.Rect>}
   * @private
   */
  this.rects_ = [];
};


/**
 * Mask configuration.
 * @type {number}
 * @private
 */
rflect.cal.SelectionMask.prototype.configuration_ = 0;


/**
 * Mask container.
 * @type {Element}
 * @private
 */
rflect.cal.SelectionMask.prototype.maskEl_;


/**
 * Cell where mask was started.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.SelectionMask.prototype.startCell_;


/**
 * Cell where mask is now.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.SelectionMask.prototype.currentCell_;


/**
 * Start date selected by mask.
 * @type {goog.date.DateTime}
 */
rflect.cal.SelectionMask.prototype.startDate = null;


/**
 * End date selected by mask.
 * @type {goog.date.DateTime}
 */
rflect.cal.SelectionMask.prototype.endDate = null;


/**
 * Whether mask was initialized.
 * @type {boolean}
 * @private
 */
rflect.cal.SelectionMask.prototype.initialized_ = false;


/**
 * @return {boolean} Whether mask was initialized.
 */
rflect.cal.SelectionMask.prototype.isInitialized = function() {
  return this.initialized_;
}


/**
 * @return {boolean} Whether mask is horizontal, like in week mode.
 * @protected
 */
rflect.cal.SelectionMask.prototype.isHorizontal = goog.functions.FALSE;


/**
 * Updates mask and redraws it, if necessary.
 */
rflect.cal.SelectionMask.prototype.update = goog.abstractMethod;


/**
 * Sets up mask.
 * @param {number} aConfiguration Configuration of mask.
 */
rflect.cal.SelectionMask.prototype.init = function(aConfiguration) {
  this.configuration_ = aConfiguration;
};


/**
 * @return {goog.math.Rect} Rectangle.
 * @param {number} aX Left.
 * @param {number} aY Top.
 * @param {number} aDx Width.
 * @param {number} aDy Height.
 * @private
 */
rflect.cal.SelectionMask.prototype.getRect_ =
    function(aX, aY, aDx, aDy) {
  return new goog.math.Rect(aX, aY, aDx, aDy);
};


/**
 * @param {goog.math.Coordinate} aCellA First cell to compare.
 * @param {goog.math.Coordinate} aCellB Second cell to compare.
 * @return {number|undefined} 1 if first arg is greater, 0 if equals, -1
 * otherwise.
 * @private
 */
rflect.cal.SelectionMask.prototype.compareCells_ = function(aCellA, aCellB){
  if (this.isHorizontal())
    return goog.math.Coordinate.equals(aCellA, aCellB) ? 0 : (aCellA.x >
        aCellB.x || (aCellA.x == aCellB.x && aCellA.y > aCellB.y) ? 1 : -1);
  else
    return goog.math.Coordinate.equals(aCellA, aCellB) ? 0 : (aCellA.y >
        aCellB.y || (aCellA.y == aCellB.y && aCellA.x > aCellB.x) ? 1 : -1);
}


/**
 * @param {goog.math.Coordinate} aCellA First cell to compare.
 * @param {goog.math.Coordinate} aCellB Second cell to compare.
 * @return {goog.math.Coordinate} Maximal of given cells.
 * @private
 */
rflect.cal.SelectionMask.prototype.getMaxCell_ = function(aCellA, aCellB){
  return this.compareCells_(aCellA, aCellB) == 1 ? aCellA : aCellB;
}


/**
 * @param {goog.math.Coordinate} aCellA First cell to compare.
 * @param {goog.math.Coordinate} aCellB Second cell to compare.
 * @return {goog.math.Coordinate} Minimal of given cells.
 * @private
 */
rflect.cal.SelectionMask.prototype.getMinCell_ = function(aCellA, aCellB){
  return this.compareCells_(aCellA, aCellB) == -1 ? aCellA : aCellB;
}


/**
 * Builds mask.
 * @private
 */
rflect.cal.SelectionMask.prototype.update_ = goog.abstractMethod;


/**
 * Builds mask.
 * @param {goog.string.StringBuffer=} aSb String buffer to append mask to.
 * @return {string|undefined} HTML of mask.
 * @private
 */
rflect.cal.SelectionMask.prototype.build_ = function(aSb) {
  var sb = aSb || new goog.string.StringBuffer();
  for (var counter = 0, length = this.rects_.length; counter < length;
      counter++)
    this.buildUnit_(sb, this.rects_[counter]);
  return aSb ? undefined : sb.toString();
};


/**
 * Builds mask unit (one of the rectangles).
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {goog.math.Rect} aRect Rectangle to draw.
 * @private
 */
rflect.cal.SelectionMask.prototype.buildUnit_ = function(aSb, aRect) {

  aSb.append('<div class="' + goog.getCssName('mask') + '" style="left:');
  aSb.append(Math.floor(aRect.left));
  aSb.append('px;top:');
  aSb.append(Math.floor(aRect.top));
  aSb.append('px;width:');
  aSb.append(Math.ceil(aRect.width));
  aSb.append('px;height:');
  aSb.append(Math.ceil(aRect.height));
  aSb.append('px">');
  aSb.append('</div>');

};


/**
 * Closes mask life cycle.
 */
rflect.cal.SelectionMask.prototype.close = goog.abstractMethod;