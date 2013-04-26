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
 * @param {rflect.ui.Component} aMainPane Link to main pane.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.blocks.BlockPool=} opt_blockPoolWeek Link to week block pool.
 * @param {rflect.cal.blocks.BlockPool=} opt_blockPoolAllday Link to allday block pool.
 * @param {rflect.cal.blocks.BlockPool=} opt_blockPoolMonth Link to month block pool.
 * @extends {rflect.cal.SelectionMask}
 * @constructor
 */
rflect.cal.MainPaneSelectionMask = function(aViewManager, aMainPane, aTimeManager,
    opt_blockPoolWeek, opt_blockPoolAllday, opt_blockPoolMonth) {

  rflect.cal.SelectionMask.call(this, aViewManager, aMainPane, aTimeManager);

  /**
   * Link to week block pool.
   * @type {rflect.cal.blocks.BlockPool|undefined}
   * @private
   */
  this.blockPoolWeek_ = opt_blockPoolWeek;

  /**
   * Link to allday block pool.
   * @type {rflect.cal.blocks.BlockPool|undefined}
   * @private
   */
  this.blockPoolAllDay_ = opt_blockPoolAllday;

  /**
   * Link to month block manager.
   * @type {rflect.cal.blocks.BlockPool|undefined}
   * @private
   */
  this.blockPoolMonth_ = opt_blockPoolMonth;

  this.additionalClassNames = goog.getCssName('mainpane-mask');

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
 * Coordinate where mask ends.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.SelectionMask.prototype.endCoordinate_;


/**
 * Relative timestamp where we started drag.
 * @type {number}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.startTimestamp_;


/**
 * Relative timestamp where we're currently dragging.
 * @type {number}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.currentTimestamp_;


/**
 * Whether we're dragging chip.
 * @type {boolean}
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isDraggingChip_;


/**
 * @return {boolean} Whether mask is allday.
 */
rflect.cal.MainPaneSelectionMask.prototype.isAllDay = function() {
  return this.configuration_ ==
      rflect.cal.MainPaneSelectionMask.Configuration.ALLDAY;
};


/**
 * @return {boolean} Whether mask is week.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isWeek = function() {
  return this.configuration_ ==
      rflect.cal.MainPaneSelectionMask.Configuration.WEEK;
};


/**
 * @return {boolean} Whether mask is allday or week.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isWeekOrAllday_ = function() {
  return this.isWeek() || this.isAllDay();
};


/**
 * @override
 * @protected
 */
rflect.cal.MainPaneSelectionMask.prototype.isHorizontal =
    rflect.cal.MainPaneSelectionMask.prototype.isWeek


/**
 * @return {boolean} Whether mask is month.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.isMonth = function() {
  return this.configuration_ ==
      rflect.cal.MainPaneSelectionMask.Configuration.MONTH;
};


/**
 * Clears mask state.
 */
rflect.cal.MainPaneSelectionMask.prototype.close = function() {
  goog.style.showElement(this.maskEl_, false);
  this.initialized_ = false;
};


/**
 * Updates mask and redraws it, if necessary.
 * @param {goog.events.Event} aEvent Event object or coord index.
 */
rflect.cal.MainPaneSelectionMask.prototype.update = function(aEvent) {

  var pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
  var currentCoord = this.getCellCoordinate_(aEvent.clientX + pageScroll.x -
      this.elementOffset_.x + this.scrollableEl_.scrollLeft, aEvent.clientY +
      pageScroll.y - this.elementOffset_.y + this.scrollableEl_.scrollTop);

  var snappedCoord1 = this.snapCoordinate_(this.currentCoordinate_, true);
  var snappedCoord2 = this.snapCoordinate_(currentCoord, true);


  if (!goog.math.Coordinate.equals(
      this.snapCoordinate_(this.currentCoordinate_, true),
      this.snapCoordinate_(currentCoord, true))) {

      if (goog.DEBUG)
          _log('snappedCoord1', snappedCoord1);
        if (goog.DEBUG)
          _log('snappedCoord2', snappedCoord2);

          if (goog.DEBUG)
            _log('currentCoord', currentCoord);
    this.currentCoordinate_ = currentCoord;
    this.update_();
  }

};


/**
 * Sets up mask.
 * @param {number} aConfiguration Configuration
 * of mask.
 * @param {goog.events.Event=} opt_event Event object.
 * @param {boolean=} opt_draggingChip Whether we're dragging chip.
 */
rflect.cal.MainPaneSelectionMask.prototype.init = function(aConfiguration,
    opt_event, opt_draggingChip) {
  rflect.cal.SelectionMask.prototype.init.call(this, aConfiguration);

    //TODO(alexk): when in multiple scrollables goog.style.getOffsetPosition.
    // But may we be under multiple scrollables?
    var doc = this.document_ || (this.document_ =
        goog.dom.getOwnerDocument(this.component_.getElement()));
    var pageScroll = goog.dom.getDomHelper(doc).getDocumentScroll();
    var coordXWithoutScroll = 0;
    var coordYWithoutScroll = 0;
    var coordX = 0;
    var coordY = 0;

    this.elementOffset_ = new goog.math.Coordinate(0, 0);

    this.isDraggingChip_ = opt_draggingChip || false;

    if (this.isWeekOrAllday_()) {

      if (this.isAllDay()) {

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

    } else if (this.isMonth()) {

      this.scrollableEl_ = goog.dom.getElement('main-pane-body-scrollable-mn');
      this.maskEl_ = goog.dom.getElement('mn-mask-cnt');
      this.elementOffset_ = goog.style.getRelativePosition(
          this.scrollableEl_, document.documentElement);
      this.elementOffset_.x +=
          rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_MONTH;
      this.elementOffset_.y += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;

    }

    coordXWithoutScroll = opt_event.clientX + pageScroll.x -
        this.elementOffset_.x;
    coordYWithoutScroll = opt_event.clientY + pageScroll.y -
        this.elementOffset_.y;

    coordX = coordXWithoutScroll + this.scrollableEl_.scrollLeft;
    coordY = coordYWithoutScroll + this.scrollableEl_.scrollTop;
    // Safe check for IE7.
    if (coordYWithoutScroll >= this.scrollableEl_.offsetHeight ||
        coordYWithoutScroll < 0)
      return;

    if (opt_draggingChip) {

      this.calculatePointAndTimestamp(coordX, coordY);

    } else {

      this.startCoordinate_ = this.getCellCoordinate_(coordX, coordY);
      this.currentCoordinate_ = this.startCoordinate_.clone();

      if (goog.DEBUG)
        _log('this.startCoordinate_', this.startCoordinate_);
      if (goog.DEBUG)
        _log('this.currentCoordinate_', this.currentCoordinate_);

      goog.style.showElement(this.maskEl_, true);
      this.visible_ = true;

      this.initialized_ = true;
      this.update_();
    }


};


/**
 * @param {number} aX X pixel position.
 * @param {number} aY Y pixel position.
 */
rflect.cal.MainPaneSelectionMask.prototype.calculatePointAndTimestamp =
    function(aX, aY) {
  var coord = new goog.math.Coordinate(0, 0);
  var maxX = 0;
  var maxY = 0;

  if (this.isWeekOrAllday_()) {
    maxX = this.blockPoolWeek_.getBlocksNumber() - 1;
    // TODO(alexk): simplify this in case of chip drag
    coord.x = this.getBlockIndexByCoordinate_(aX, this.blockPoolWeek_);

    // Allday mask always have zero y index.
    if (this.isAllDay()) {
      maxY = 0;
      coord.y = 0;
    }
    else {
      maxY = rflect.cal.predefined.WEEK_GRID_HEIGHT;
      coord.y = Math.floor(aY / rflect.cal.predefined.HOUR_ROW_HEIGHT);
    }

  } else {
    maxX = 6;
    maxY = this.blockPoolMonth_.getBlocksNumber() - 1;
    coord.y = this.getBlockIndexByCoordinate_(aY, this.blockPoolMonth_);
    coord.x = Math.floor(aX / (this.blockPoolMonth_.gridSize.width / 7));
  }

  // Safe checks.
  if (coord.x < 0) coord.x = 0;
  if (coord.x > maxX) coord.x = maxX;
  if (coord.y < 0) coord.y = 0;
  if (coord.y > maxY) coord.y = maxY;

  return coord;
};


/**
 * Returns cell coordinate, i.e. coordinate object that has block-dependent
 * coordinate changed to block index and unchanged change block-independent one.
 * Week: x axis is block dependent. y is not.
 * Month and all day: y axis is block dependent, x is not.
 * @param {number} aX X pixel position.
 * @param {number} aY Y pixel position.
 * @return {goog.math.Coordinate} Cell position.
 */
rflect.cal.MainPaneSelectionMask.prototype.getCellCoordinate_ =
    function(aX, aY) {
  var coord = new goog.math.Coordinate(aX, aY);
  var maxX = 0;
  var maxY = 0;

  if (this.isMonth()) {

    maxX = this.blockPoolMonth_.gridSize.width - 1;
    maxY = this.blockPoolMonth_.getBlocksNumber() - 1;
    coord.y = this.getBlockIndexByCoordinate_(aY, this.blockPoolMonth_);

  } else if (this.isAllDay()) {

    // Allday mask always have zero y index.
    maxX = this.blockPoolAllDay_.gridSize.width - 1;
    maxY = 0;
    coord.y = 0;

  } else if (this.isWeek()) {

    maxY = rflect.cal.predefined.HOUR_ROWS_NUMBER *
        rflect.cal.predefined.HOUR_ROW_HEIGHT - 1;
    maxX = this.blockPoolWeek_.getBlocksNumber() - 1;
    coord.x = this.getBlockIndexByCoordinate_(aX, this.blockPoolWeek_);

  }

  // Safe checks.
  if (coord.x < 0) coord.x = 0;
  if (coord.x > maxX) coord.x = maxX;
  if (coord.y < 0) coord.y = 0;
  if (coord.y > maxY) coord.y = maxY;

  return coord;
};


/**
 * Snaps coordinate, i.e. if it's greater than cell upper bound, change it to
 * upper bound. Or if it's lesser than cell lower bound, change it to lower
 * bound.
 *
 * @param {goog.math.Coordinate} aCoord Coordinate object.
 * @param {boolean} aUp Whether to snap up, down otherwise.
 * @return {goog.math.Coordinate} Cell position.
 */
rflect.cal.MainPaneSelectionMask.prototype.snapCoordinate_ =
    function(aCoord, aUp) {

  var coord = aCoord.clone();

  if (this.isWeek()) {
    coord.y = this.floorOrCeil_(aCoord.y,
        rflect.cal.predefined.HOUR_ROW_HEIGHT, aUp);
  } else if (this.isMonth()) {
    coord.x = this.floorOrCeil_(aCoord.x,
        this.blockPoolMonth_.gridSize.width / 7, aUp);
  } else if (this.isAllDay()) {
    coord.x = this.floorOrCeil_(aCoord.x, this.blockPoolAllDay_.gridSize.width /
        this.blockPoolAllDay_.getBlocksNumber(), aUp);
  }

  return coord;
};


/**
 * @param {number} aComponent Coordinate component to floor or ceil.
 * @param {number} aSnapValue How much to snap.
 * @param {boolean} aFloor Whether to floor or ceil coordinate.
 * @return {number} Snapped value.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.floorOrCeil_ =
    function(aComponent, aSnapValue, aFloor) {

  if (aFloor)
    return Math.floor(aComponent / aSnapValue) * aSnapValue;

  return Math.ceil(aComponent / aSnapValue) * aSnapValue +
      (aComponent % aSnapValue == 0 ? aSnapValue : 0);

}


/**
 * @param {number} aCoord Pixel position.
 * @param {rflect.cal.blocks.BlockPool} aBlockPool Block pool.
 * @return {number} Block index.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getBlockIndexByCoordinate_ =
    function(aCoord, aBlockPool) {
  var blocksNumber = aBlockPool.getBlocksNumber();
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
 * @return {number} Block-dependent coordinate for start coord.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getStartCellPrimaryCoord_ =
    function() {
  return this.getComponent_(this.startCoordinate_, true);
};


/**
 * @return {number} Block-independent coordinate for start coord.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getStartCellSecondaryCoord_ =
    function() {
  return this.getComponent_(this.startCoordinate_, false);
};


/**
 * @return {number} Block-dependent coordinate for current coord.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getCurrentCellPrimaryCoord_ =
    function() {
  return this.getComponent_(this.currentCoordinate_, true);
};


/**
 * @return {number} Block-independent coordinate for current coord.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getCurrentCellSecondaryCoord_ =
    function() {
  return this.getComponent_(this.currentCoordinate_, false);
};


/**
 * @param {goog.math.Coordinate} aCellOrIndex Cell to get coordinate for.
 * @param {boolean} aBlockDependent Whether to get block dependent or
 * block-independent coordinate.
 * @return {number} Appropriate coord coordinate.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getComponent_ = function(
    aCellOrIndex, aBlockDependent) {
  var coord = 0;
  if (this.isWeek())
    coord = aBlockDependent ? aCellOrIndex.x : aCellOrIndex.y;
  else
    coord = aBlockDependent ? aCellOrIndex.y : aCellOrIndex.x;
  return coord;
};


/**
 * Gets position or size for block defined by coord.
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
      (this.isWeek() ? aCellOrIndex.x : aCellOrIndex.y);
  var block = blockPool.blocks[index];
  return aPosition ? block.position : block.size;
};


/**
 * Gets position or size for block defined by start coord.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getBlockPositionOrSizeForStartCell_ =
    function(aPosition) {
  return this.getBlockPositionOrSize_(this.startCoordinate_, aPosition);
};


/**
 * Gets position or size for block defined by current coord.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.
    getBlockPositionOrSizeForCurrentCell_ = function(aPosition) {
  return this.getBlockPositionOrSize_(this.currentCoordinate_, aPosition);
};


/**
 * @return {number} Default step in block-independent axis.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.getDefaultStep_ = function() {
  var step = 0;
  if (this.isAllDay())
    step = this.blockPoolAllDay_.gridSize.height;
  else if (this.isWeek())
    step = 24;
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
  if (this.isAllDay())
    size = this.blockPoolAllDay_.gridSize.height;
  else if (this.isWeek())
    size = 1440;
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
  if (this.isAllDay())
    rect = new goog.math.Rect(aX, aY, aDx, aDy);
  else if (this.isMonth())
    rect = new goog.math.Rect(aY, aX, aDy, aDx);
  else
    rect = new goog.math.Rect(aX, aY, aDx, aDy);
  return rect;
};



/**
 * @param {goog.math.Coordinate} aCoordA First coordinate to compare.
 * @param {goog.math.Coordinate} aCoordB Second coordinate to compare.
 * @return {goog.math.Coordinate} Minimal of given coordinates, snapped up.
 * @private
 */
rflect.cal.SelectionMask.prototype.getMinCoordSnapped_ = function(aCoordA,
    aCoordB){
  return this.snapCoordinate_(this.getMinCell_(aCoordA, aCoordB), true);
}


/**
 * @param {goog.math.Coordinate} aCoordA First coordinate to compare.
 * @param {goog.math.Coordinate} aCoordB Second coordinate to compare.
 * @return {goog.math.Coordinate} Maximal of given coordinates, snapped down.
 * @private
 */
rflect.cal.SelectionMask.prototype.getMaxCoordSnapped_ = function(aCoordA,
    aCoordB){
  return this.snapCoordinate_(this.getMaxCell_(aCoordA, aCoordB), false);
}


/**
 * Builds mask.
 * @private
 */
rflect.cal.MainPaneSelectionMask.prototype.update_ = function() {

  if (goog.DEBUG)
    _log('update_');

  var startCoord;
  var endCoord;

  // Rectangles to pass to builder.
  this.rects_.length = 0;

  if (!this.initialized_)
    return;

    startCoord = this.getMinCoordSnapped_(this.startCoordinate_);
    endCoord = this.getMaxCoordSnapped_(this.currentCoordinate_);

    if (goog.DEBUG)
      _log('minCoord', minCoord);
    if (goog.DEBUG)
      _log('maxCoord', maxCoord);

    var minComponent = 0;
    var maxComponent = 0;

    var startCellPrimaryComponent = this.getComponent_(startCoord, true);
    var startCellSecondaryComponent = this.getComponent_(startCoord, false);
    var currentCellPrimaryComponent = this.getComponent_(endCoord, true);
    var currentCellSecondaryComponent = this.getComponent_(endCoord, false);

    var blockPositionForStartCell = this.
        getBlockPositionOrSizeForStartCell_(true);
    var blockPositionForCurrentCell = this.
        getBlockPositionOrSizeForCurrentCell_(true);
    var blockSizeForStartCell = this.getBlockPositionOrSizeForStartCell_(false);
    var blockSizeForCurrentCell = this.
        getBlockPositionOrSizeForCurrentCell_(false);

    var defaultStep = this.getDefaultStep_();
    var maxSize = this.getMaxSize_();

    if (startCellPrimaryComponent == currentCellPrimaryComponent) {
      minComponent = Math.min(startCellSecondaryComponent,
          currentCellSecondaryComponent);
      maxComponent = Math.max(startCellSecondaryComponent,
          currentCellSecondaryComponent);
      // Single rect.
      this.rects_.push(this.getRect_(
          blockPositionForStartCell,
          minComponent,
          blockSizeForStartCell,
          maxComponent - minComponent
          ));

    } else {

      // Start coord rect.
      this.rects_.push(this.getRect_(
          blockPositionForStartCell,
          currentCellPrimaryComponent > startCellPrimaryComponent ?
          startCellSecondaryComponent: 0,
          blockSizeForStartCell,
          currentCellPrimaryComponent > startCellPrimaryComponent ?
          maxSize - startCellSecondaryComponent :
          startCellSecondaryComponent);
      // Current coord rect.
      this.rects_.push(this.getRect_(
          blockPositionForCurrentCell,
          currentCellPrimaryComponent > startCellPrimaryComponent ?
          0 : currentCellSecondaryComponent * defaultStep,
          blockSizeForCurrentCell,
          currentCellPrimaryComponent > startCellPrimaryComponent ?
          (currentCellSecondaryComponent + 1) * defaultStep :
          maxSize - currentCellSecondaryComponent * defaultStep
          ));

      if (Math.abs(currentCellPrimaryComponent - startCellPrimaryComponent) > 1) {
        minCoord = Math.min(startCellPrimaryComponent, currentCellPrimaryComponent);
        maxCoord = Math.max(startCellPrimaryComponent, currentCellPrimaryComponent);
        // Middle rect.
        this.rects_.push(this.getRect_(
            this.getBlockPositionOrSize_(minCoord + 1, true),
            0,
            this.getBlockPositionOrSize_(maxCoord, true) -
            this.getBlockPositionOrSize_(minCoord + 1, true),
            maxSize
            ));
      }
    }


  this.calculateDates_(minCoord, maxCoord);
  this.maskEl_.innerHTML = this.build_();

};

