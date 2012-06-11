/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MainPaneSelectionMask');

goog.require('goog.dom');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.SelectionMask');



/**
 * Selection mask main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.Component} aMainPane Link to main pane.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.BlockPool=} opt_blockPoolWeek Link to week block pool.
 * @param {rflect.cal.BlockPool=} opt_blockPoolAllday Link to allday block pool.
 * @param {rflect.cal.BlockPool=} opt_blockPoolMonth Link to month block pool.
 * @extends {rflect.cal.SelectionMask}
 * @constructor
 */
rflect.cal.MainPaneSelectionMask = function(aViewManager, aMainPane, aTimeManager,
    opt_blockPoolWeek, opt_blockPoolAllday, opt_blockPoolMonth) {
    
  rflect.cal.SelectionMask.call(this, aViewManager, aMainPane, aTimeManager);  

  /**
   * Link to week block pool.
   * @type {rflect.cal.BlockPool|undefined}
   * @private
   */
  this.blockPoolWeek_ = opt_blockPoolWeek;

  /**
   * Link to allday block pool.
   * @type {rflect.cal.BlockPool|undefined}
   * @private
   */
  this.blockPoolAllday_ = opt_blockPoolAllday;

  /**
   * Link to month block manager.
   * @type {rflect.cal.BlockPool|undefined}
   * @private
   */
  this.blockPoolMonth_ = opt_blockPoolMonth;

};
goog.inherits(rflect.cal.MainPaneSelectionMask, rflect.cal.SelectionMask);


/**
 * Configurations of selection mask.
 * @enum {number}
 */
rflect.cal.MainPaneSelectionMask.Configuration = {
  ALLDAY: 1,
  WEEK: 2,
  MONTH: 3
};


/**
 * Reference to a document object to use for the events.
 * @type {Document}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.document_;


/**
 * Mask owner element offset.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.elementOffset_;


/**
 * Scrollable element.
 * @type {Element}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.scrollableEl_;


/**
 * Grid element.
 * @type {Element}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.gridEl_;


/**
 * @return {boolean} Whether mask is allday.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isAllday_ = function() {
  return this.configuration_ ==
      rflect.cal.MainPaneSelectionMask.Configuration.ALLDAY;
};


/**
 * @return {boolean} Whether mask is week.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isWeek_ = function() {
  return this.configuration_ ==
      rflect.cal.MainPaneSelectionMask.Configuration.WEEK;
};


/**
 * @return {boolean} Whether mask is allday or week.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isWeekOrAllday_ = function() {
  return this.isWeek_() || this.isAllday_();
};


/**
 * @override
 * @protected
 */
rflect.cal.MainPaneSelectionMask.prototype.isHorizontal =
    rflect.cal.MainPaneSelectionMask.prototype.isWeekOrAllday_


/**
 * @return {boolean} Whether mask is month.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isMonth_ = function() {
  return this.configuration_ ==
      rflect.cal.MainPaneSelectionMask.Configuration.MONTH;
};


/**
 * Clears mask state.
 */
rflect.cal.MainPaneSelectionMask.prototype.clear = function() {
  goog.style.showElement(this.maskEl_, false);
};


/**
 * Updates mask and redraws it, if necessary.
 * @param {goog.events.Event} aEvent Event object or cell index.
 */
rflect.cal.MainPaneSelectionMask.prototype.update = function(aEvent) {

  var pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();

  var scrollLeft = 0;
  var scrollTop = 0;
  if (this.scrollableEl_) {
    scrollLeft = this.scrollableEl_.scrollLeft;
    scrollTop = this.scrollableEl_.scrollTop;
  }

  var currentCell = this.getCellByCoordinate_(aEvent.clientX +
      pageScroll.x -
      this.elementOffset_.x + scrollLeft, aEvent.clientY +
      pageScroll.y - this.elementOffset_.y + scrollTop);

};


/**
 * Sets up mask.
 * @param {rflect.cal.MainPaneSelectionMask.Configuration} aConfiguration Configuration
 * of mask.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.MainPaneSelectionMask.prototype.init = function(aConfiguration,
    aEvent) {
  rflect.cal.SelectionMask.prototype.init.call(this, aConfiguration);

    //TODO(alexk): when in multiple scrollables goog.style.getOffsetPosition.
    var doc = this.document_ || (this.document_ =
        goog.dom.getOwnerDocument(this.component_.getElement()));
    var pageScroll = goog.dom.getDomHelper(doc).getDocumentScroll();
    var coordXWithoutScroll = 0;
    var coordYWithoutScroll = 0;
    var coordX = 0;
    var coordY = 0;

    this.elementOffset_ = new goog.math.Coordinate(0, 0);

    if (this.isWeekOrAllday_()) {

      if (this.isAllday_()) {

        //TODO(alexk): shorten this method, enclose repeating parts in function.
        this.scrollableEl_ = goog.dom.getElement('main-pane-header-scrollable');
        this.maskEl_ = goog.dom.getElement('wk-ad-mask-cnt');
        this.elementOffset_ = goog.style.getRelativePosition(
            this.scrollableEl_, document.documentElement);
        this.elementOffset_.x += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;

      } else {

        this.scrollableEl_ =
            goog.dom.getElement('main-pane-body-scrollable-wk');
        this.maskEl_ = goog.dom.getElement('wk-mask-cnt');
        this.elementOffset_ = goog.style.getRelativePosition(
            this.scrollableEl_, document.documentElement);
        this.elementOffset_.x +=
            rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_WEEK;
      }
        this.elementOffset_.y += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;

    } else if (this.isMonth_()) {

      this.scrollableEl_ = goog.dom.getElement('main-pane-body-scrollable-mn');
      this.maskEl_ = goog.dom.getElement('mn-mask-cnt');
      this.elementOffset_ = goog.style.getRelativePosition(
          this.scrollableEl_, document.documentElement);
      this.elementOffset_.x +=
          rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_MONTH;
      this.elementOffset_.y += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;

    }

    coordXWithoutScroll = aEvent.clientX + pageScroll.x -
        this.elementOffset_.x;
    coordYWithoutScroll = aEvent.clientY + pageScroll.y -
        this.elementOffset_.y;

    coordX = coordXWithoutScroll + this.scrollableEl_.scrollLeft;
    coordY = coordYWithoutScroll + this.scrollableEl_.scrollTop;
    // Safe check for IE7.
    if (coordYWithoutScroll >= this.scrollableEl_.offsetHeight ||
        coordYWithoutScroll < 0)
      return;

    this.startCell_ = this.getCellByCoordinate_(coordX, coordY);
    this.currentCell_ = this.startCell_.clone();

    if (goog.DEBUG){
      _log('coord: ', new goog.math.Coordinate(coordX, coordY));
      _log('this.startCell_', this.startCell_);
      _log('this.currentCell_', this.currentCell_);
    }

    goog.style.showElement(this.maskEl_, true);

  this.initialized_ = true;
  this.update_();

};


/**
 * @param {number} aX X pixel position.
 * @param {number} aY Y pixel position.
 * @return {goog.math.Coordinate} Cell position.
 */
rflect.cal.MainPaneSelectionMask.prototype.getCellByCoordinate_ =
    function(aX, aY) {
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

  } else {
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
rflect.cal.MainPaneSelectionMask.prototype.getBlockIndexByCoordinate_ =
    function(aCoord, aBlockPool) {
  var blocksNumber = aBlockPool.getBlocksNumber();
  var gridWidth = aBlockPool.gridSize.width;
  var counter = 0;
  var index = 0;
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
rflect.cal.MainPaneSelectionMask.prototype.getStartCellPrimaryCoord_ =
    function() {
  return this.getCellCoord_(this.startCell_, true);
};


/**
 * @return {number} Block-independent coordinate for start cell.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getStartCellSecondaryCoord_ =
    function() {
  return this.getCellCoord_(this.startCell_, false);
};


/**
 * @return {number} Block-dependent coordinate for current cell.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getCurrentCellPrimaryCoord_ =
    function() {
  return this.getCellCoord_(this.currentCell_, true);
};


/**
 * @return {number} Block-independent coordinate for current cell.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getCurrentCellSecondaryCoord_ =
    function() {
  return this.getCellCoord_(this.currentCell_, false);
};


/**
 * @param {goog.math.Coordinate} aCellOrIndex Cell to get coordinate for.
 * @param {boolean} aBlockDependent Whether to get block dependent or
 * block-independent coordinate.
 * @return {number} Appropriate cell coordinate.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getCellCoord_ = function(aCellOrIndex,
    aBlockDependent) {
  var coord = 0;
  if (this.isWeekOrAllday_())
    coord = aBlockDependent ? aCellOrIndex.x : aCellOrIndex.y;
  else
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
rflect.cal.MainPaneSelectionMask.prototype.getBlockPositionOrSize_ = function(
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
rflect.cal.MainPaneSelectionMask.prototype.getBlockPositionOrSizeForStartCell_ =
    function(aPosition) {
  return this.getBlockPositionOrSize_(this.startCell_, aPosition);
};


/**
 * Gets position or size for block defined by current cell.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.
    getBlockPositionOrSizeForCurrentCell_ = function(aPosition) {
  return this.getBlockPositionOrSize_(this.currentCell_, aPosition);
};


/**
 * @return {number} Default step in block-independent axis.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getDefaultStep_ = function() {
  var step = 0;
  if (this.isWeekOrAllday_())
    step = rflect.cal.predefined.HOUR_ROW_HEIGHT;
  else
    step = this.blockPoolMonth_.gridSize.width / 7;
  return step;
};


/**
 * @return {number} Maximal mask size in block-independent axis.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getMaxSize_ = function() {
  var size = 0;
  if (this.isWeekOrAllday_())
    size = rflect.cal.predefined.WEEK_GRID_HEIGHT;
  else
    size = this.blockPoolMonth_.gridSize.width;
  return size;
};


/**
 * @return {goog.math.Rect} Rectangle, flipped if needed.
 * @param {number} aX Left.
 * @param {number} aY Top.
 * @param {number} aDx Width.
 * @param {number} aDy Height.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getRect_ =
    function(aX, aY, aDx, aDy) {
  var rect;
  if (this.isAllday_())
    rect = new goog.math.Rect(aX, 0, aDx, 0);
  else if (this.isMonth_())
    rect = new goog.math.Rect(aY, aX, aDy, aDx);
  else
    rect = new goog.math.Rect(aX, aY, aDx, aDy);
  return rect;
};



/**
 * Builds mask.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.update_ = function() {
  var maxCell;
  var minCell;
  
  // Rectangles to pass to builder.
  this.rects_.length = 0;

  if (!this.initialized_)
    return;


    minCell = this.getMinCell_(this.startCell_, this.currentCell_);
    maxCell = this.getMaxCell_(this.startCell_, this.currentCell_);

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
      this.rects_.push(this.getRect_(
          blockPositionForStartCell,
          minIndex * defaultStep,
          blockSizeForStartCell,
          // As indexes are zero-based, add 1.
          (maxIndex - minIndex + 1) * defaultStep
          ));

    } else {

      // Start cell rect.
      this.rects_.push(this.getRect_(
          blockPositionForStartCell,
          currentCellPrimaryCoord > startCellPrimaryCoord ?
          startCellSecondaryCoord * defaultStep : 0,
          blockSizeForStartCell,
          currentCellPrimaryCoord > startCellPrimaryCoord ?
          maxSize - startCellSecondaryCoord * defaultStep :
          (startCellSecondaryCoord + 1) * defaultStep
          ));
      // Current cell rect.
      this.rects_.push(this.getRect_(
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
        this.rects_.push(this.getRect_(
            this.getBlockPositionOrSize_(minIndex + 1, true),
            0,
            this.getBlockPositionOrSize_(maxIndex, true) -
            this.getBlockPositionOrSize_(minIndex + 1, true),
            maxSize
            ));
      }
    }


  this.calculateDates_(minCell, maxCell);
  this.maskEl_.innerHTML = this.build_();

};

