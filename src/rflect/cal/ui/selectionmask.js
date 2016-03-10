/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.SelectionMask');

goog.require('goog.Disposable');
goog.require('goog.functions');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('rflect.cal.predefined');



/**
 * Selection mask base class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.ui.UpdatableComponent} aComponent Link to component
 * that owns selection mask.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 * @extends {goog.Disposable}
 */
rflect.cal.ui.SelectionMask = function(aViewManager, aComponent, aTimeManager) {
  goog.Disposable.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @protected
   */
  this.viewManager = aViewManager;

  /**
   * Link to component that owns selection mask.
   * @type {rflect.ui.UpdatableComponent}
   * @protected
   */
  this.component = aComponent;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @protected
   */
  this.timeManager = aTimeManager;

  /**
   * Mask rectangles.
   * @type {Array.<goog.math.Rect>}
   * @protected
   */
  this.rects = [];
};
goog.inherits(rflect.cal.ui.SelectionMask, goog.Disposable);


/**
 * Mask configuration.
 * @type {number}
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.configuration = 0;


/**
 * Mask container.
 * @type {Element}
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.maskEl;


/**
 * Coordinate where mask was started.
 * @type {goog.math.Coordinate}
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.startCoordinate;


/**
 * Coordinate where mask is now.
 * @type {goog.math.Coordinate}
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.currentCoordinate;


/**
 * Start date selected by mask.
 * @type {goog.date.DateTime}
 */
rflect.cal.ui.SelectionMask.prototype.startDate = null;


/**
 * End date selected by mask.
 * @type {goog.date.DateTime}
 */
rflect.cal.ui.SelectionMask.prototype.endDate = null;


/**
 * Whether mask was initialized.
 * @type {boolean}
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.initialized = false;


/**
 * Additional class names to append to mask unit.
 * @type {string}
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.additionalClassNames;


/**
 * @return {boolean} Whether mask was initialized.
 */
rflect.cal.ui.SelectionMask.prototype.isInitialized = function() {
  return this.initialized;
}


/**
 * @return {boolean} Whether mask is horizontal, like in week mode.
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.isHorizontal = goog.functions.FALSE;


/**
 * Updates mask and redraws it, if necessary.
 */
rflect.cal.ui.SelectionMask.prototype.update = goog.abstractMethod;


/**
 * Sets up mask.
 * @param {number} aConfiguration Configuration of mask.
 */
rflect.cal.ui.SelectionMask.prototype.init = function(aConfiguration) {
  this.configuration = aConfiguration;
};


/**
 * @return {goog.math.Rect} Rectangle.
 * @param {number} aX Left.
 * @param {number} aY Top.
 * @param {number} aDx Width.
 * @param {number} aDy Height.
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.getRect =
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
rflect.cal.ui.SelectionMask.prototype.compareCells_ = function(aCellA, aCellB){
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
 */
rflect.cal.ui.SelectionMask.prototype.getMaxCoordinate = function(aCellA, aCellB){
  return this.compareCells_(aCellA, aCellB) == 1 ? aCellA : aCellB;
}


/**
 * @param {goog.math.Coordinate} aCellA First cell to compare.
 * @param {goog.math.Coordinate} aCellB Second cell to compare.
 * @return {goog.math.Coordinate} Minimal of given cells.
 */
rflect.cal.ui.SelectionMask.prototype.getMinCoordinate = function(aCellA, aCellB){
  return this.compareCells_(aCellA, aCellB) == -1 ? aCellA : aCellB;
}


/**
 * Calculates dates from cell selection.
 * @param {goog.math.Coordinate|number} aMinCell Lesser of cells or indexes.
 * @param {goog.math.Coordinate|number=} opt_maxCell Greater of cells or
 * indexes.
 * @param {boolean=} opt_hours Whether to treat cells as hours.
 */
rflect.cal.ui.SelectionMask.prototype.calculateDates = function(aMinCell,
    opt_maxCell, opt_hours) {
  var startDate = null;
  var endDate = null;
  var minutes = 0;
  var tempDate = null;

  if (opt_hours) {
    tempDate = this.timeManager.daySeries[aMinCell.x];
    minutes = 30 * aMinCell.y;
    startDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
        tempDate.getDate(), minutes / 60, minutes % 60);

    if (opt_maxCell) {
      // Special case when we're on last line.
      if (opt_maxCell.y == rflect.cal.predefined.HOUR_ROWS_NUMBER - 1){
        tempDate = rflect.date.getTomorrow(this.timeManager.daySeries[
            opt_maxCell.x]);
        endDate = new goog.date.DateTime(tempDate.getYear(),
            tempDate.getMonth(), tempDate.getDate());
      }
      else {
        tempDate = this.timeManager.daySeries[opt_maxCell.x];
        minutes = 30 * (opt_maxCell.y + 1);
        endDate = new goog.date.DateTime(tempDate.getYear(),
            tempDate.getMonth(), tempDate.getDate(), minutes / 60,
            minutes % 60);
      }
    }

  } else {
    var minIndex = goog.isNumber(aMinCell.x) ? aMinCell.x + aMinCell.y * 7 :
        aMinCell;
    tempDate = this.timeManager.daySeries[minIndex];
    startDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
        tempDate.getDate());

    if (opt_maxCell) {
      var maxIndex = goog.isNumber(opt_maxCell.x) ? opt_maxCell.x +
          opt_maxCell.y * 7 : opt_maxCell;
      tempDate = rflect.date.getTomorrow(this.timeManager.daySeries[maxIndex]);
      endDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
          tempDate.getDate());
    }
  }

  this.startDate = startDate;
  this.endDate = endDate;

}


/**
 * Builds mask.
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.updateInternal = goog.abstractMethod;


/**
 * Builds mask.
 * @param {goog.string.StringBuffer=} aSb String buffer to append mask to.
 * @return {string|undefined} HTML of mask.
 * @protected
 */
rflect.cal.ui.SelectionMask.prototype.build = function(aSb) {
  var sb = aSb || new goog.string.StringBuffer();
  for (var counter = 0, length = this.rects.length; counter < length;
      counter++)
    this.buildUnit_(sb, this.rects[counter]);
  return aSb ? undefined : sb.toString();
};


/**
 * Builds mask unit (one of the rectangles).
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {goog.math.Rect} aRect Rectangle to draw.
 * @private
 */
rflect.cal.ui.SelectionMask.prototype.buildUnit_ = function(aSb, aRect) {

  aSb.append('<div class="' + goog.getCssName('mask'));
  if (this.additionalClassNames){
    aSb.append(' ');
    aSb.append(this.additionalClassNames);
  }
  aSb.append('" style="left:');
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
rflect.cal.ui.SelectionMask.prototype.close = goog.abstractMethod;