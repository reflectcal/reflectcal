/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.SelectionMask');

goog.require('goog.array');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('rflect.cal.predefined');



/**
 * Selection mask main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.MainPane} aMainPane Link to main pane.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.BlockPool} aBlockPoolWeek Link to week block pool.
 * @param {rflect.cal.BlockPool} aBlockPoolAllday Link to allday block pool.
 * @param {rflect.cal.BlockPool} aBlockPoolMonth Link to month block pool.
 * @constructor
 */
rflect.cal.SelectionMask = function(aViewManager, aMainPane, aTimeManager,
    aBlockPoolWeek, aBlockPoolAllday, aBlockPoolMonth) {
  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to main pane.
   * @type {rflect.cal.MainPane}
   * @private
   */
  this.mainPane_ = aMainPane;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Link to week block pool.
   * @type {rflect.cal.BlockPool}
   * @private
   */
  this.blockPoolWeek_ = aBlockPoolWeek;

  /**
   * Link to allday block pool.
   * @type {rflect.cal.BlockPool}
   * @private
   */
  this.blockPoolAllday_ = aBlockPoolAllday;

  /**
   * Link to month block manager.
   * @type {rflect.cal.BlockPool}
   * @private
   */
  this.blockPoolMonth_ = aBlockPoolMonth;

};


/**
 * Configurations of selection mask.
 * @enum {number}
 */
rflect.cal.SelectionMask.Configuration = {
  NONE: 0,
  ALLDAY: 1,
  WEEK: 2,
  MONTH: 3,
  MINI_MONTH: 4
};


/**
 * Mask configuration.
 * @type {rflect.cal.SelectionMask.Configuration}
 * @private
 */
rflect.cal.SelectionMask.prototype.configuration_ =
    rflect.cal.SelectionMask.Configuration.NONE;


/**
 * Reference to a document object to use for the events.
 * @type {Document}
 * @private
 */
rflect.cal.SelectionMask.prototype.document_;


/**
 * Scrollable element offset.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.SelectionMask.prototype.scrollableOffset_;


/**
 * Scrollable element.
 * @type {Element}
 * @private
 */
rflect.cal.SelectionMask.prototype.scrollableEl_;


/**
 * Grid element.
 * @type {Element}
 * @private
 */
rflect.cal.SelectionMask.prototype.gridEl_;


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
 * Whether mask is visible.
 * @type {boolean}
 */
rflect.cal.SelectionMask.prototype.visible = false;


/**
 * @return {boolean} Whether mask is allday.
 * @private
 */
rflect.cal.SelectionMask.prototype.isAllday_ = function() {
  return this.configuration_ == rflect.cal.SelectionMask.Configuration.ALLDAY;
};


/**
 * @return {boolean} Whether mask is week.
 * @private
 */
rflect.cal.SelectionMask.prototype.isWeek_ = function() {
  return this.configuration_ == rflect.cal.SelectionMask.Configuration.WEEK;
};


/**
 * @return {boolean} Whether mask is allday or week.
 * @private
 */
rflect.cal.SelectionMask.prototype.isWeekOrAllday_ = function() {
  return this.isWeek_() || this.isAllday_();
};


/**
 * @return {boolean} Whether mask is month.
 * @private
 */
rflect.cal.SelectionMask.prototype.isMonth_ = function() {
  return this.configuration_ == rflect.cal.SelectionMask.Configuration.MONTH;
};


/**
 * @return {boolean} Whether mask is mini-month.
 * @private
 */
rflect.cal.SelectionMask.prototype.isMiniMonth_ = function() {
  return this.configuration_ == rflect.cal.SelectionMask.Configuration.
      MINI_MONTH;
};


/**
 * Clears mask state.
 */
rflect.cal.SelectionMask.prototype.clear = function() {
  goog.style.showElement(this.maskEl_, false);
  this.visible = false;
};


/**
 * Updates mask and redraws it, if necessary.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.SelectionMask.prototype.update = function(aEvent) {
  var pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
  var currentCell = this.getCellByCoordinate_(aEvent.clientX + pageScroll.x -
      this.scrollableOffset_.x + this.scrollableEl_.scrollLeft, aEvent.clientY +
      pageScroll.y - this.scrollableOffset_.y + this.scrollableEl_.scrollTop);

  if (!goog.math.Coordinate.equals(this.currentCell_, currentCell)) {
    this.currentCell_ = currentCell;
    this.update_();
  }
};


/**
 * Sets up mask.
 * @param {rflect.cal.SelectionMask.Configuration} aConfiguration Configuration
 * of mask.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.SelectionMask.prototype.init = function(aConfiguration, aEvent) {
  //TODO(alexk): when in multiple scrollables goog.style.getOffsetPosition.
  var doc = this.document_ || (this.document_ =
      goog.dom.getOwnerDocument(this.mainPane_.getElement()));

  var pageScroll = goog.dom.getDomHelper(doc).getDocumentScroll();
  var coordXWithoutScroll = 0;
  var coordYWithoutScroll = 0;
  var coordX = 0;
  var coordY = 0;

  this.configuration_ = aConfiguration;

  this.scrollableOffset_ = new goog.math.Coordinate(0, 0);

  if (this.isWeekOrAllday_()) {

    if (this.isAllday_()) {
      this.scrollableEl_ = goog.dom.getElement('main-pane-header-scrollable');
      this.maskEl_ = goog.dom.getElement('wk-ad-mask-cnt');
      this.scrollableOffset_ = goog.style.getRelativePosition(
          this.scrollableEl_, document.documentElement);
      this.scrollableOffset_.x += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;
    } else {
      this.scrollableEl_ = goog.dom.getElement('main-pane-body-scrollable-wk');
      this.maskEl_ = goog.dom.getElement('wk-mask-cnt');
      this.scrollableOffset_ = goog.style.getRelativePosition(
          this.scrollableEl_, document.documentElement);
      this.scrollableOffset_.x +=
          rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_WEEK;
    }
    this.scrollableOffset_.y += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;
  } else if (this.isMonth_()) {
    this.scrollableEl_ = goog.dom.getElement('main-pane-body-scrollable-mn');
    this.maskEl_ = goog.dom.getElement('mn-mask-cnt');
    this.scrollableOffset_ = goog.style.getRelativePosition(
        this.scrollableEl_, document.documentElement);
    this.scrollableOffset_.x +=
        rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_MONTH;
    this.scrollableOffset_.y += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;
  }

  coordXWithoutScroll = aEvent.clientX + pageScroll.x -
      this.scrollableOffset_.x;
  coordYWithoutScroll = aEvent.clientY + pageScroll.y -
      this.scrollableOffset_.y;

  coordX = coordXWithoutScroll + this.scrollableEl_.scrollLeft;
  coordY = coordYWithoutScroll + this.scrollableEl_.scrollTop;

  // Safe check for IE7.
  if (coordYWithoutScroll >= this.scrollableEl_.offsetHeight ||
      coordYWithoutScroll < 0)
    return;

  this.startCell_ = this.getCellByCoordinate_(coordX, coordY);
  this.currentCell_ = this.startCell_.clone();

  if (goog.DEBUG) {
    _log('coordinate', new goog.math.Coordinate(coordX, coordY));
    _log('this.point_', this.startCell_);
  }

  this.visible = true;

  this.update_();
  goog.style.showElement(this.maskEl_, true);
};


/**
 * @param {number} aX X pixel position.
 * @param {number} aY Y pixel position.
 * @return {goog.math.Coordinate} Cell position.
 */
rflect.cal.SelectionMask.prototype.getCellByCoordinate_ = function(aX, aY) {
  var cell = new goog.math.Coordinate(0, 0);
  var maxX = 0;
  var maxY = 0;

  if (this.isWeekOrAllday_()) {
    maxX = this.blockPoolWeek_.getBlocksNumber() - 1;
    cell.x = this.getBlockIndexByCoordinate_(aX, this.blockPoolWeek_);

    // Allday mask always have zero y index.
    if (this.isAllday_()) {
      maxY = 0;
      cell.y = 0;
    }
    else {
      maxY = rflect.cal.predefined.HOUR_ROWS_NUMBER - 1;
      cell.y = Math.floor(aY / rflect.cal.predefined.HOUR_ROW_HEIGHT);
    }

  } else if (this.isMonth_()) {
    maxX = 6;
    maxY = this.blockPoolMonth_.getBlocksNumber() - 1;
    cell.y = this.getBlockIndexByCoordinate_(aY, this.blockPoolMonth_);
    cell.x = Math.floor(aX / (this.blockPoolMonth_.gridSize.width / 7));
  }

  // Safe checks.
  if (cell.x < 0) cell.x = 0;
  if (cell.x > maxX) cell.x = maxX;
  if (cell.y < 0) cell.y = 0;
  if (cell.y > maxY) cell.y = maxY;

  return cell;
};


/**
 * @param {number} aCoord Pixel position.
 * @param {rflect.cal.BlockPool} aBlockPool Block pool.
 * @return {number} Block index.
 * @private
 */
rflect.cal.SelectionMask.prototype.getBlockIndexByCoordinate_ =
    function(aCoord, aBlockPool) {
  var blocksNumber = aBlockPool.getBlocksNumber();
  var gridWidth = aBlockPool.gridSize.width;
  var counter = 0;
  var index = 0;
  var scrollbarWidth = this.mainPane_.getScrollbarWidthNextToMain();
  // Compare percent position for week mode, otherwise compare pixels.
  var coord = aCoord;

  while (counter < blocksNumber && coord >
      aBlockPool.blocks[counter].position) {
    index = counter++;
  }

  return index;
};


/**
 * @return {number} Block-dependent coordinate for start cell.
 * @private
 */
rflect.cal.SelectionMask.prototype.getStartCellPrimaryCoord_ = function() {
  return this.getCellCoord_(this.startCell_, true);
};


/**
 * @return {number} Block-independent coordinate for start cell.
 * @private
 */
rflect.cal.SelectionMask.prototype.getStartCellSecondaryCoord_ = function() {
  return this.getCellCoord_(this.startCell_, false);
};


/**
 * @return {number} Block-dependent coordinate for current cell.
 * @private
 */
rflect.cal.SelectionMask.prototype.getCurrentCellPrimaryCoord_ = function() {
  return this.getCellCoord_(this.currentCell_, true);
};


/**
 * @return {number} Block-independent coordinate for current cell.
 * @private
 */
rflect.cal.SelectionMask.prototype.getCurrentCellSecondaryCoord_ = function() {
  return this.getCellCoord_(this.currentCell_, false);
};


/**
 * @param {goog.math.Coordinate} aCellOrIndex Cell to get coordinate for.
 * @param {boolean} aBlockDependent Whether to get block dependent coordinate or
 * block-independent.
 * @return {number} Appropriate cell coordinate.
 * @private
 */
rflect.cal.SelectionMask.prototype.getCellCoord_ = function(aCellOrIndex,
    aBlockDependent) {
  var coord = 0;
  if (this.isWeekOrAllday_())
    coord = aBlockDependent ? aCellOrIndex.x : aCellOrIndex.y;
  else if (this.isMonth_())
    coord = aBlockDependent ? aCellOrIndex.y : aCellOrIndex.x;
  return coord;
};


/**
 * Gets position or size for block defined by cell.
 * @param {goog.math.Coordinate|number} aCellOrIndex Cell to get index from or
 * direct index.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.SelectionMask.prototype.getBlockPositionOrSize_ = function(
    aCellOrIndex, aPosition) {
  var blockPool = this.isWeekOrAllday_() ? this.blockPoolWeek_ :
      this.blockPoolMonth_;
  var index = typeof aCellOrIndex == 'number' ? aCellOrIndex :
      (this.isWeekOrAllday_() ? aCellOrIndex.x : aCellOrIndex.y);
  var block = blockPool.blocks[index];
  return aPosition ? block.position : block.size;
};


/**
 * Gets position or size for block defined by start cell.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.SelectionMask.prototype.getBlockPositionOrSizeForStartCell_ =
    function(aPosition) {
  return this.getBlockPositionOrSize_(this.startCell_, aPosition);
};


/**
 * Gets position or size for block defined by current cell.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.SelectionMask.prototype.getBlockPositionOrSizeForCurrentCell_ =
    function(aPosition) {
  return this.getBlockPositionOrSize_(this.currentCell_, aPosition);
};


/**
 * @return {number} Default step in block-independent axis.
 * @private
 */
rflect.cal.SelectionMask.prototype.getDefaultStep_ = function() {
  var step = 0;
  if (this.isWeekOrAllday_())
    step = rflect.cal.predefined.HOUR_ROW_HEIGHT;
  else if (this.isMonth_())
    step = this.blockPoolMonth_.gridSize.width / 7;
  return step;
};


/**
 * @return {number} Maximal mask size in block-independent axis.
 * @private
 */
rflect.cal.SelectionMask.prototype.getMaxSize_ = function() {
  var size = 0;
  if (this.isWeekOrAllday_())
    size = rflect.cal.predefined.WEEK_GRID_HEIGHT;
  else if (this.isMonth_())
    size = this.blockPoolMonth_.gridSize.width;
  return size;
};


/**
 * @return {goog.math.Rect|undefined} Rectangle, flipped if needed.
 * @param {number} aX Left.
 * @param {number} aY Top.
 * @param {number} aDx Width.
 * @param {number} aDy Height.
 * @private
 */
rflect.cal.SelectionMask.prototype.getRect_ =
    function(aX, aY, aDx, aDy) {
  var rect;
  if (this.isWeek_())
    rect = new goog.math.Rect(aX, aY, aDx, aDy);
  else if (this.isAllday_())
    rect = new goog.math.Rect(aX, 0, aDx, 0);
  else if (this.isMonth_())
    rect = new goog.math.Rect(aY, aX, aDy, aDx);
  return rect;
};


/**
 * @param {goog.math.Coordinate} aCellA First cell to compare.
 * @param {goog.math.Coordinate} aCellB Second cell to compare.
 * @return {number|undefined} 1 if first arg is greater, 0 if equals, -1
 * otherwise.
 * @private
 */
rflect.cal.SelectionMask.prototype.compareCells_ = function(aCellA, aCellB){
  if (this.isWeek_())
    return goog.math.Coordinate.equals(aCellA, aCellB) ? 0 : (aCellA.x >
        aCellB.x || (aCellA.x == aCellB.x && aCellA.y > aCellB.y) ? 1 : -1);
  else if (this.isMonth_() || this.isAllday_())
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
 * Calculates dates from cell selection.
 * @private
 */
rflect.cal.SelectionMask.prototype.calculateDates_ = function() {
  var minCell = this.getMinCell_(this.startCell_, this.currentCell_);
  var maxCell = this.getMaxCell_(this.startCell_, this.currentCell_);
  var startDate = null;
  var endDate = null;
  var minutes = 0;
  var tempDate = null;
  
  if (this.isWeek_()) {
    tempDate = this.timeManager_.daySeries[minCell.x];
    minutes = 30 * minCell.y;
    startDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
        tempDate.getDate(), minutes / 60, minutes % 60);
    // Special case when we're on last line.
    if (maxCell.y == rflect.cal.predefined.HOUR_ROWS_NUMBER - 1){
      tempDate = rflect.date.getTomorrow(this.timeManager_.daySeries[
          maxCell.x]);
      endDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
          tempDate.getDate());
    }
    else {
      tempDate = this.timeManager_.daySeries[maxCell.x];
      minutes = 30 * (maxCell.y + 1);
      endDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
          tempDate.getDate(), minutes / 60, minutes % 60);
    }

  } else if (this.isMonth_() || this.isAllday_()) {
    tempDate = this.timeManager_.daySeries[minCell.x + minCell.y * 7];
    startDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
        tempDate.getDate());
    tempDate = rflect.date.getTomorrow(this.timeManager_.daySeries[maxCell.x +
        maxCell.y * 7]);
    endDate = new goog.date.DateTime(tempDate.getYear(), tempDate.getMonth(),
      tempDate.getDate());
  }

  this.startDate = startDate;
  this.endDate = endDate;
}


/**
 * Builds mask.
 * @private
 */
rflect.cal.SelectionMask.prototype.update_ = function() {
  // Rectangles to pass to builder.
  var rects = [];

  if (!this.isMiniMonth_()) {

    var startCellPrimaryCoord = this.getStartCellPrimaryCoord_();
    var startCellSecondaryCoord = this.getStartCellSecondaryCoord_();
    var currentCellPrimaryCoord = this.getCurrentCellPrimaryCoord_();
    var currentCellSecondaryCoord = this.getCurrentCellSecondaryCoord_();

    var blockPositionForStartCell = this.
        getBlockPositionOrSizeForStartCell_(true);
    var blockPositionForCurrentCell = this.
        getBlockPositionOrSizeForCurrentCell_(true);
    var blockSizeForStartCell = this.getBlockPositionOrSizeForStartCell_(false);
    var blockSizeForCurrentCell = this.
        getBlockPositionOrSizeForCurrentCell_(false);

    var defaultStep = this.getDefaultStep_();
    var maxSize = this.getMaxSize_();

    var minIndex = 0;
    var maxIndex = 0;

    if (startCellPrimaryCoord == currentCellPrimaryCoord) {
      minIndex = Math.min(startCellSecondaryCoord,
          currentCellSecondaryCoord);
      maxIndex = Math.max(startCellSecondaryCoord,
          currentCellSecondaryCoord);
      // Single rect.
      rects.push(this.getRect_(
          blockPositionForStartCell,
          minIndex * defaultStep,
          blockSizeForStartCell,
          // As indexes are zero-based, add 1.
          (maxIndex - minIndex + 1) * defaultStep
          ));

    } else {
      // Start cell rect.
      rects.push(this.getRect_(
          blockPositionForStartCell,
          currentCellPrimaryCoord > startCellPrimaryCoord ?
          startCellSecondaryCoord * defaultStep : 0,
          blockSizeForStartCell,
          currentCellPrimaryCoord > startCellPrimaryCoord ?
          maxSize - startCellSecondaryCoord * defaultStep :
          (startCellSecondaryCoord + 1) * defaultStep
          ));
      // Current cell rect.
      rects.push(this.getRect_(
          blockPositionForCurrentCell,
          currentCellPrimaryCoord > startCellPrimaryCoord ?
          0 : currentCellSecondaryCoord * defaultStep,
          blockSizeForCurrentCell,
          currentCellPrimaryCoord > startCellPrimaryCoord ?
          (currentCellSecondaryCoord + 1) * defaultStep :
          maxSize - currentCellSecondaryCoord * defaultStep
          ));

      if (Math.abs(currentCellPrimaryCoord - startCellPrimaryCoord) > 1) {
        minIndex = Math.min(startCellPrimaryCoord, currentCellPrimaryCoord);
        maxIndex = Math.max(startCellPrimaryCoord, currentCellPrimaryCoord);
        // Middle rect.
        rects.push(this.getRect_(
            this.getBlockPositionOrSize_(minIndex + 1, true),
            0,
            this.getBlockPositionOrSize_(maxIndex, true) -
            this.getBlockPositionOrSize_(minIndex + 1, true),
            maxSize
            ));
      }
    }

  } else {

  }

  this.calculateDates_();

  if (goog.DEBUG) {
    var str = this.build_(rects);
    //_log('str', str);
    this.maskEl_.innerHTML = str;
    _log('this.startDate', this.startDate);
    _log('this.endDate', this.endDate);

  } else {
    this.maskEl_.innerHTML = this.build_(rects);
  }
};


/**
 * Builds mask.
 * @param {Array.<goog.math.Rect>} aRects Sequence of rectangles that represent
 * mask.
 * @return {string} HTML of mask.
 * @private
 */
rflect.cal.SelectionMask.prototype.build_ = function(aRects) {
  var sb = new goog.string.StringBuffer();
  for (var counter = 0; counter < aRects.length; counter++)
    this.buildUnit_(sb, aRects[counter]);
  return sb.toString();
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
  if (this.isAllday_())
    aSb.append('px;height:100%">');
  else {
    aSb.append('px;height:');
    aSb.append(Math.ceil(aRect.height));
    aSb.append('px">');
  }
  aSb.append('</div>');

};
