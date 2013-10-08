/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Selection mask for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MainPaneSelectionMask');

goog.require('goog.date.DateTime');
goog.require('goog.dom');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.ui.SelectionMask');



/**
 * Selection mask main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.ui.Component} aMainPane Link to main pane.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.blocks.BlockPool=} opt_blockPoolWeek Link to week block pool.
 * @param {rflect.cal.blocks.BlockPool=} opt_blockPoolAllday Link to allday block pool.
 * @param {rflect.cal.blocks.BlockPool=} opt_blockPoolMonth Link to month block pool.
 * @extends {rflect.cal.ui.SelectionMask}
 * @constructor
 */
rflect.cal.ui.MainPaneSelectionMask = function(aViewManager, aMainPane, aTimeManager,
    opt_blockPoolWeek, opt_blockPoolAllday, opt_blockPoolMonth) {

  rflect.cal.ui.SelectionMask.call(this, aViewManager, aMainPane, aTimeManager);

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
goog.inherits(rflect.cal.ui.MainPaneSelectionMask, rflect.cal.ui.SelectionMask);


/**
 * Configurations of selection mask.
 * @enum {number}
 */
rflect.cal.ui.MainPaneSelectionMask.Configuration = {
  ALLDAY: 1,
  WEEK: 2,
  MONTH: 3
};


/**
 * Reference to a document object to use for the events.
 * @type {Document}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.document_;


/**
 * Mask owner element offset.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.elementOffset_;


/**
 * Scrollable element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.scrollableEl_;


/**
 * Grid element.
 * @type {Element}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.gridEl_;


/**
 * Timestamp difference between event start and current point.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.timeDiffWithEventStart_;


/**
 * Timestamp difference between current point and event end.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.timeDiffWithEventEnd_;


/**
 * Difference between event start and current point in pixels.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.pixelDiffWithEventStart_;


/**
 * Difference between current point and event end in pixels.
 * @type {number}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.pixelDiffWithEventEnd_;


/**
 * Event we're dragging.
 * @type {rflect.cal.events.Event}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.calendarEvent_;


/**
 * Whether we're resizing by start grip.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.resizingByStart_;


/**
 * Whether we're resizing by end grip.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.resizingByEnd_;


/**
 * Whether we shifted mouse first time for minor amount (10px).
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.initialMove_;


/**
 * Where pointer is relative to grid.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.currentCoordinate;


/**
 * Cell where pointer is.
 * @type {goog.math.Coordinate}
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.currentCellCoordinate_;


/**
 * @return {boolean} Whether mask is allday.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.isAllDay = function() {
  return this.configuration ==
      rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY;
};


/**
 * @return {boolean} Whether mask is week.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.isWeek = function() {
  return this.configuration ==
      rflect.cal.ui.MainPaneSelectionMask.Configuration.WEEK;
};


/**
 * @return {boolean} Whether mask is allday or week.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.isWeekOrAllday_ = function() {
  return this.isWeek() || this.isAllDay();
};


/**
 * @override
 * @protected
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.isHorizontal =
    rflect.cal.ui.MainPaneSelectionMask.prototype.isWeekOrAllday_


/**
 * @return {boolean} Whether mask is month.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.isMonth = function() {
  return this.configuration ==
      rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH;
};


/**
 * @return {boolean} Whether mask was dragged.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.wasDragged = function() {
  return /**@type {boolean}*/(this.initialized && this.calendarEvent_&&
      !this.initialMove_);
};


/**
 * @return {boolean} Whether mask is of dragging type.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.isDragType = function() {
  return this.calendarEvent_ != null;
};


/**
 * Clears mask state.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.close = function() {
  goog.style.showElement(this.maskEl, false);
  this.initialized = false;
  this.calendarEvent_ = null;
  this.initialMove_ = false;
  this.resizingByStart_ = false;
  this.resizingByEnd_ = false;
};


/**
 * @return {rflect.cal.events.Event} Calendar event, if present.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getCalendarEvent = function() {
  return this.calendarEvent_;
}


/**
 * Sets up mask.
 * @param {number} aConfiguration Configuration
 * of mask.
 * @param {goog.events.Event=} opt_event Event object.
 * @param {rflect.cal.events.Event=} opt_calendarEvent
 * @param {boolean=} opt_resizingByStart Whether we're resizing event by start
 * grip.
 * @param {boolean=} opt_resizingByEnd Whether we're resizing event by end grip.
 * Calendar event which we're dragging.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.init = function(aConfiguration,
                                                           opt_event,
                                                           opt_calendarEvent,
                                                           opt_resizingByStart,
                                                           opt_resizingByEnd) {
  rflect.cal.ui.SelectionMask.prototype.init.call(this, aConfiguration);

  var eventCoordinate = this.getEventCoordinate_(opt_event);
  if (!eventCoordinate)
    return;

  if (opt_calendarEvent) {

    this.initDrag_(eventCoordinate, opt_calendarEvent, opt_resizingByStart,
        opt_resizingByEnd);

  } else {

    this.initSelection_(eventCoordinate);
  }

};


/**
 * @param {goog.math.Coordinate} aEventCoordinate Event coordinate.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.initSelection_ = function(
    aEventCoordinate) {
  this.startCoordinate = this.getCellCoordinate_(aEventCoordinate, true,
      false);
  this.currentCoordinate = this.startCoordinate.clone();

  goog.style.showElement(this.maskEl, true);

  this.initialized = true;

  this.updateInternal(this.startCoordinate, this.currentCoordinate);
}


/**
 * @param {goog.math.Coordinate} aEventCoordinate Event coordinate.
 * @param {rflect.cal.events.Event} aCalendarEvent.
 * @param {boolean=} opt_resizingByStart Whether we're resizing event by start
 * grip.
 * @param {boolean=} opt_resizingByEnd Whether we're resizing event by end grip.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.initDrag_ = function(
    aEventCoordinate, aCalendarEvent, opt_resizingByStart, opt_resizingByEnd) {
  this.currentCoordinate = new goog.math.Coordinate(aEventCoordinate.x,
      aEventCoordinate.y);
  this.currentCellCoordinate_ = this.getCellCoordinate_(
      aEventCoordinate, true, true);

  this.calendarEvent_ = aCalendarEvent;

  this.initialMove_ = true;

  var startTs = this.timeManager.interval.start;

  var pixelToTimeK = this.getPixelToTimeK_();
  var timeToPixelK = 1 / pixelToTimeK;

  var pointRelativeTs = this.coordinateToRelativeTs_(this.currentCoordinate);
  this.timeDiffWithEventStart_ = pointRelativeTs -
      (this.calendarEvent_.startDate.getTime() - startTs);
  this.timeDiffWithEventEnd_ = (this.calendarEvent_.endDate.getTime() -
      startTs) - pointRelativeTs;

  this.pixelDiffWithEventStart_ = this.timeDiffWithEventStart_ * timeToPixelK;
  this.pixelDiffWithEventEnd_ = this.timeDiffWithEventEnd_ * timeToPixelK;

  this.resizingByStart_ = /**@type {boolean}*/ (opt_resizingByStart);
  this.resizingByEnd_ = /**@type {boolean}*/ (opt_resizingByEnd);
  this.initialized = true;

}


/**
 * Updates mask and redraws it, if necessary.
 * @param {goog.events.Event} aEvent Event object or coord index.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.update = function (aEvent) {

  var pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
  var eventCoordinate = new goog.math.Coordinate(aEvent.clientX + pageScroll.x -
      this.elementOffset_.x + this.scrollableEl_.scrollLeft, aEvent.clientY +
      pageScroll.y - this.elementOffset_.y + this.scrollableEl_.scrollTop);

  if (this.calendarEvent_) {
    
    this.updateDrag_(eventCoordinate);

  } else {

    this.updateSelection_(eventCoordinate);
  }
}


/**
 * @param {goog.math.Coordinate} aEventCoordinate Current event coordinate.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.updateSelection_ = function (
    aEventCoordinate) {
  var currentCellCoord = this.getCellCoordinate_(aEventCoordinate, true, false);

  if (!goog.math.Coordinate.equals(
      this.snapCoordinate_(this.currentCoordinate, true),
      this.snapCoordinate_(currentCellCoord, true))) {

    this.currentCoordinate = currentCellCoord;
    this.updateInternal(this.startCoordinate, currentCellCoord);

  }
}


/**
 * @param {goog.math.Coordinate} aEventCoordinate Current event coordinate.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.updateDrag_ = function (
    aEventCoordinate) {
  var currentCellCoord = this.getCellCoordinate_(aEventCoordinate, true,
      true);
  var distance = goog.math.Coordinate.distance(
      /**@type {!goog.math.Coordinate}*/(aEventCoordinate),
      /**@type {!goog.math.Coordinate}*/(this.currentCoordinate));
  var initialMove = this.initialMove_ && (distance >
      rflect.cal.predefined.chips.DISTANCE_TO_START_DRAG);

  if (initialMove || !goog.math.Coordinate.equals(currentCellCoord,
      this.currentCellCoordinate_)) {
    this.initialMove_ = false;

    this.currentCellCoordinate_ = currentCellCoord;
    this.currentCoordinate = aEventCoordinate;

    // Resizing part.
    if (this.resizingByStart_ || this.resizingByEnd_) {
      var startTs = this.timeManager.interval.start;
      var pixelToTimeK = this.getPixelToTimeK_();
      var timeToPixelK = 1 / pixelToTimeK;

      var pointRelativeTs = this.coordinateToRelativeTs_(
          this.currentCoordinate);

      if (!this.resizingByStart_)
        this.timeDiffWithEventStart_ = pointRelativeTs -
            (this.calendarEvent_.startDate.getTime() - startTs);
      if (!this.resizingByEnd_)
        this.timeDiffWithEventEnd_ = (this.calendarEvent_.endDate.getTime() -
            startTs) - pointRelativeTs;

      this.pixelDiffWithEventStart_ = this.timeDiffWithEventStart_ *
          timeToPixelK;
      this.pixelDiffWithEventEnd_ = this.timeDiffWithEventEnd_ * timeToPixelK;
    }

    var currentPixelPosition = this.coordinateToPixelPosition_(
        aEventCoordinate);

    var startPixelPosition = currentPixelPosition -
        this.pixelDiffWithEventStart_;
    var endPixelPosition = currentPixelPosition +
        this.pixelDiffWithEventEnd_;
    if (startPixelPosition >= endPixelPosition)
      return;

    var startCoordinate = this.pixelPositionToCoordinate_(
        startPixelPosition);
    var endCoordinate = this.pixelPositionToCoordinate_(
        endPixelPosition);
    // To prevent cases when non all-day events are displayed with their genuine
    // start and end positions, and fit them to cells instead.
    if (this.isAllDay() || this.isMonth()) {
      var startDate = this.calendarEvent_.startDate;
      var endDate = this.calendarEvent_.endDate;
      if (startDate.getHours() != 0 || startDate.getMinutes() != 0)
        startCoordinate = this.snapCoordinate_(startCoordinate, true);
      if (endDate.getHours() != 0 || endDate.getMinutes() != 0)
        endCoordinate = this.snapCoordinate_(endCoordinate, false);
    }

    goog.style.showElement(this.maskEl, true);
    this.updateInternal(startCoordinate, endCoordinate);
  }  
}


/**
 * @return {number} Pixel to timestamp coefficient.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getPixelToTimeK_ = function() {
  if (this.isWeek())
    return rflect.cal.predefined.MINS_IN_DAY /
        rflect.cal.predefined.WEEK_GRID_HEIGHT *
        rflect.cal.predefined.MILLIS_IN_MINUTE;
  if (this.isAllDay())
    return rflect.cal.predefined.MINS_IN_DAY /
        this.blockPoolAllDay_.gridSize.height *
        rflect.cal.predefined.MILLIS_IN_MINUTE;
  return (7 * rflect.cal.predefined.MINS_IN_DAY) /
      this.blockPoolMonth_.gridSize.width *
      rflect.cal.predefined.MILLIS_IN_MINUTE;
}


/**
 * @param {goog.math.Coordinate} aCoordinate Coordinate.
 * @return {number} Relative timestamp of coordinate.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.coordinateToRelativeTs_ =
    function(aCoordinate) {
  var pixelToTimeK = this.getPixelToTimeK_();
  var coord;

  if (this.isHorizontal()) {
    coord = this.snapCoordinate_(this.getCellCoordinate_(aCoordinate, true,
        false), true);
    // This is minutes.
    return coord.x * rflect.cal.predefined.MINS_IN_DAY *
        rflect.cal.predefined.MILLIS_IN_MINUTE +
        // But this is pixels!
        coord.y * pixelToTimeK;
  }

  coord = this.getCellCoordinate_(aCoordinate, true, true);
  return coord.x * rflect.cal.predefined.MINS_IN_DAY *
      rflect.cal.predefined.MILLIS_IN_MINUTE + coord.y * 7 *
      rflect.cal.predefined.MINS_IN_DAY *
      rflect.cal.predefined.MILLIS_IN_MINUTE;
}


/**
 * @param {goog.math.Coordinate} aCoordinate Coordinate to transform to pixel
 * position.
 * @return {number} Pixel position.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.coordinateToPixelPosition_ =
    function(aCoordinate) {
  var size = this.getMaxSize_();
  var step = this.getDefaultStep_();
  var coord;

  if (this.isHorizontal()) {
    coord = this.snapCoordinate_(this.getCellCoordinate_(aCoordinate, true,
        false), true);
    return coord.x * size + coord.y;
  }

  coord = this.getCellCoordinate_(aCoordinate, true, true);
  return coord.y * size + coord.x * step;
}


/**
 * @param {number} aPixelPosition Pixel position to transform to coordinate.
 * @return {goog.math.Coordinate} Coordinate.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.pixelPositionToCoordinate_ =
    function(aPixelPosition) {

  var size = this.getMaxSize_();

  var primaryComponent = Math.floor(aPixelPosition / size);
  var secondaryComponent = aPixelPosition % size;
  var coordinate = this.isHorizontal() ? new goog.math.Coordinate(
      primaryComponent, secondaryComponent) :
      new goog.math.Coordinate(secondaryComponent, primaryComponent);
  return this.getCellCoordinate_(coordinate, false, false);
}


/**
 * @param {goog.events.Event=} opt_event Event object.
 * @return {goog.math.Coordinate} Coordinate of event.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getEventCoordinate_ =
    function(opt_event) {

  if (!opt_event)
    return null;

  //TODO(alexk): when in multiple scrollables goog.style.getOffsetPosition.
  // But may we be under multiple scrollables?
  var doc = this.document_ || (this.document_ =
      goog.dom.getOwnerDocument(this.component.getElement()));
  var pageScroll = goog.dom.getDomHelper(doc).getDocumentScroll();
  var coordXWithoutScroll = 0;
  var coordYWithoutScroll = 0;
  var coordX = 0;
  var coordY = 0;

  this.elementOffset_ = new goog.math.Coordinate(0, 0);

  if (this.isWeekOrAllday_()) {

    if (this.isAllDay()) {

      //TODO(alexk): shorten this method, enclose repeating parts in function.
      this.scrollableEl_ = goog.dom.getElement('main-pane-header-scrollable');
      this.maskEl = goog.dom.getElement('wk-ad-mask-cnt');
      this.elementOffset_ = goog.style.getRelativePosition(
          this.scrollableEl_, document.documentElement);
      this.elementOffset_.x += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;

    } else {

      this.scrollableEl_ =
          goog.dom.getElement('main-pane-body-scrollable-wk');
      this.maskEl = goog.dom.getElement('wk-mask-cnt');
      this.elementOffset_ = goog.style.getRelativePosition(
          this.scrollableEl_, document.documentElement);
      this.elementOffset_.x +=
          rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_WEEK;
    }
      this.elementOffset_.y += rflect.cal.predefined.DEFAULT_BORDER_WIDTH;

  } else if (this.isMonth()) {

    this.scrollableEl_ = goog.dom.getElement('main-pane-body-scrollable-mn');
    this.maskEl = goog.dom.getElement('mn-mask-cnt');
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
    return null;

  return new goog.math.Coordinate(coordX, coordY);
}


/**
 * Returns cell coordinate, i.e. cell to which coordinate fits.
 * 
 * Note:
 * Week: x axis is block dependent. y is not.
 * Month and all day: y axis is block dependent, x is not.
 *
 * @param {goog.math.Coordinate} aCoordinate Coordinate.
 * @param {boolean} aChangePrimaryComponent Whether to change block-dependent
 * component of coordinate to block index.
 * @param {boolean=} aChangeSecondaryComponent Whether to change 
 * block-independent component of coordinate.
 * @return {goog.math.Coordinate} Cell position.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getCellCoordinate_ =
    function(aCoordinate, aChangePrimaryComponent, aChangeSecondaryComponent) {

  var coord = aCoordinate.clone();
  var gridSize = this.getMaxSize_();

  var maxX = 0;
  var maxY = 0;

  if (this.isMonth()) {

    maxX = gridSize - 1;
    maxY = this.blockPoolMonth_.getBlocksNumber() - 1;

    if (aChangePrimaryComponent)
      coord.y = this.getBlockIndexByCoordinate_(coord.y, this.blockPoolMonth_);
    if (aChangeSecondaryComponent)
      coord.x = Math.floor(coord.x / (gridSize / 7));

  } else if (this.isAllDay()) {

    maxX = this.blockPoolWeek_.getBlocksNumber() - 1;
    // Allday mask always have zero y index.
    maxY = this.blockPoolAllDay_.gridSize.height;

    if (aChangePrimaryComponent)
      coord.x = this.getBlockIndexByCoordinate_(coord.x, this.blockPoolWeek_);
    if (aChangeSecondaryComponent)
      coord.y = 0;

  } else if (this.isWeek()) {

    maxY = gridSize - 1;
    maxX = this.blockPoolWeek_.getBlocksNumber() - 1;

    if (aChangePrimaryComponent)
      coord.x = this.getBlockIndexByCoordinate_(coord.x, this.blockPoolWeek_);
    if (aChangeSecondaryComponent)
      coord.y = Math.floor(coord.y / rflect.cal.predefined.HOUR_ROW_HEIGHT);

  }

  this.normalizeCoordinate_(coord, maxX, maxY);

  return coord;
};


/**
 * Normalizes coordinate *in-place*.
 *
 * @param {goog.math.Coordinate} aCoordinate Coordinate to normalize.
 * @param {number} aMaxX Maximal x value.
 * @param {number} aMaxY Maximal y value.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.normalizeCoordinate_ =
    function(aCoordinate, aMaxX, aMaxY) {

  // Safety checks.
  if (this.isHorizontal()) {
    if (aCoordinate.x < 0) { aCoordinate.x = 0; aCoordinate.y = 0; }
    if (aCoordinate.x > aMaxX) { aCoordinate.x = aMaxX; aCoordinate.y = aMaxY; }
    if (aCoordinate.y < 0) aCoordinate.y = 0;
    if (aCoordinate.y > aMaxY) aCoordinate.y = aMaxY;
  } else {
    if (aCoordinate.x < 0) aCoordinate.x = 0;
    if (aCoordinate.x > aMaxX) aCoordinate.x = aMaxX;
    if (aCoordinate.y < 0) { aCoordinate.y = 0; aCoordinate.x = 0; }
    if (aCoordinate.y > aMaxY) { aCoordinate.y = aMaxY; aCoordinate.x = aMaxX; }
  }
}


/**
 * Snaps coordinate, i.e. if it's greater than corresponding cell upper bound,
 * change it to
 * upper bound. Or if it's lesser than cell lower bound, change it to lower
 * bound.
 *
 * @see {rflect.cal.ui.MainPaneSelectionMask.prototype.getCellCoordinate_}
 * @param {goog.math.Coordinate} aCoord Coordinate object.
 * @param {boolean} aUp Whether to snap up, down otherwise.
 * @return {goog.math.Coordinate} Cell position.
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.snapCoordinate_ =
    function(aCoord, aUp) {

  var coord = aCoord.clone();
  var step = this.getDefaultStep_();

  if (this.isWeek()) {
    coord.y = this.floorOrCeil_(aCoord.y, step, aUp);
  } else if (this.isMonth()) {
    coord.x = this.floorOrCeil_(aCoord.x, step, aUp);
  } else if (this.isAllDay()) {
    coord.y = this.floorOrCeil_(aCoord.y, step, aUp);
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
rflect.cal.ui.MainPaneSelectionMask.prototype.floorOrCeil_ =
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
rflect.cal.ui.MainPaneSelectionMask.prototype.getBlockIndexByCoordinate_ =
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
rflect.cal.ui.MainPaneSelectionMask.prototype.getStartCellPrimaryCoord_ =
    function() {
  return this.getComponent_(this.startCoordinate, true);
};


/**
 * @return {number} Block-independent coordinate for start coord.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getStartCellSecondaryCoord_ =
    function() {
  return this.getComponent_(this.startCoordinate, false);
};


/**
 * @return {number} Block-dependent coordinate for current coord.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getCurrentCellPrimaryCoord_ =
    function() {
  return this.getComponent_(this.currentCoordinate, true);
};


/**
 * @return {number} Block-independent coordinate for current coord.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getCurrentCellSecondaryCoord_ =
    function() {
  return this.getComponent_(this.currentCoordinate, false);
};


/**
 * @param {goog.math.Coordinate} aCellOrIndex Cell to get coordinate for.
 * @param {boolean} aBlockDependent Whether to get block dependent or
 * block-independent coordinate.
 * @return {number} Appropriate coord coordinate.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getComponent_ = function(
    aCellOrIndex, aBlockDependent) {
  var coord = 0;
  if (this.isWeekOrAllday_())
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
rflect.cal.ui.MainPaneSelectionMask.prototype.getBlockPositionOrSize_ = function(
    aCellOrIndex, aPosition) {
  var blockPool = this.isWeekOrAllday_() ? this.blockPoolWeek_ :
      this.blockPoolMonth_;
  var index = typeof aCellOrIndex == 'number' ? aCellOrIndex :
      (this.isWeekOrAllday_() ? aCellOrIndex.x : aCellOrIndex.y);
  var block = blockPool.blocks[index];
  return aPosition ? block.position : block.size;
};


/**
 * Gets position or size for block defined by start coord.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getBlockPositionOrSizeForStartCell_ =
    function(aPosition) {
  return this.getBlockPositionOrSize_(this.startCoordinate, aPosition);
};


/**
 * Gets position or size for block defined by current coord.
 * @param {boolean} aPosition Whether to get position (true) or size (false).
 * @return {number} Position or size for block.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.
    getBlockPositionOrSizeForCurrentCell_ = function(aPosition) {
  return this.getBlockPositionOrSize_(this.currentCoordinate, aPosition);
};


/**
 * @return {number} Default step in block-independent axis.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getDefaultStep_ = function() {
  var step = 0;
  if (this.isAllDay())
    step = this.blockPoolAllDay_.gridSize.height;
  else if (this.isWeek())
    step = rflect.cal.predefined.HOUR_ROW_HEIGHT;
  else
    step = this.blockPoolMonth_.gridSize.width / 7;
  return step;
};


/**
 * @return {number} Maximal mask size in block-independent axis.
 * @private
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getMaxSize_ = function() {
  var size = 0;
  if (this.isAllDay())
    size = this.blockPoolAllDay_.gridSize.height;
  else if (this.isWeek())
    size = rflect.cal.predefined.HOUR_ROW_HEIGHT *
        rflect.cal.predefined.HOUR_ROWS_NUMBER;
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
 * @protected
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.getRect =
    function(aX, aY, aDx, aDy) {
  var rect;
  if (this.isMonth())
    rect = new goog.math.Rect(aY, aX, aDy, aDx);
  else {
    var dy = this.isWeek() && aDy < rflect.cal.predefined.MINIMAL_MASK_HEIGHT ?
        rflect.cal.predefined.MINIMAL_MASK_HEIGHT : aDy;

    rect = new goog.math.Rect(aX, aY, aDx, dy);
  }
  return rect;
};



/**
 * @param {goog.math.Coordinate} aCoordA First coordinate to compare.
 * @param {goog.math.Coordinate} aCoordB Second coordinate to compare.
 * @return {goog.math.Coordinate} Minimal of given coordinates, snapped up.
 * @private
 */
rflect.cal.ui.SelectionMask.prototype.getMinCoordSnapped_ = function(aCoordA,
    aCoordB){
  return this.snapCoordinate_(this.getMinCoordinate(aCoordA, aCoordB), true);
}


/**
 * @param {goog.math.Coordinate} aCoordA First coordinate to compare.
 * @param {goog.math.Coordinate} aCoordB Second coordinate to compare.
 * @return {goog.math.Coordinate} Maximal of given coordinates, snapped down.
 * @private
 */
rflect.cal.ui.SelectionMask.prototype.getMaxCoordSnapped_ = function(aCoordA,
    aCoordB){
  return this.snapCoordinate_(this.getMaxCoordinate(aCoordA, aCoordB), false);
}


/**
 * Builds mask.
 * @param {goog.math.Coordinate} aStartCoordinate Start coordinate of mask.
 * @param {goog.math.Coordinate} aEndCoordinate End coordinate of mask.
 * @protected
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.updateInternal = function(aStartCoordinate,
    aEndCoordinate) {

  var startCoordForDraw;
  var endCoordForDraw;
  var startCoordForDate;
  var endCoordForDate;

  // Rectangles to pass to builder.
  this.rects.length = 0;

  if (!this.initialized)
    return;

  if (this.calendarEvent_) {

    startCoordForDraw = startCoordForDate = aStartCoordinate;
    endCoordForDraw = endCoordForDate = aEndCoordinate;

  } else {

    startCoordForDraw = this.getMinCoordSnapped_(aStartCoordinate,
        aEndCoordinate);
    endCoordForDraw = this.getMaxCoordSnapped_(aStartCoordinate,
        aEndCoordinate);

    startCoordForDate = this.getMinCoordinate(aStartCoordinate,
        aEndCoordinate);
    endCoordForDate = this.getMaxCoordinate(aStartCoordinate,
        aEndCoordinate);
  }

  var minComponent = 0;
  var maxComponent = 0;

  var startCellPrimaryComponent = this.getComponent_(startCoordForDraw, true);
  var startCellSecondaryComponent = this.getComponent_(startCoordForDraw, false);
  var endCellPrimaryComponent = this.getComponent_(endCoordForDraw, true);
  var endCellSecondaryComponent = this.getComponent_(endCoordForDraw, false);

  var blockPositionForStartCell = this.getBlockPositionOrSize_(
      startCoordForDraw, true);
  var blockPositionForCurrentCell = this.getBlockPositionOrSize_(
      endCoordForDraw, true);
  var blockSizeForStartCell = this.getBlockPositionOrSize_(
      startCoordForDraw, false);
  var blockSizeForCurrentCell = this.getBlockPositionOrSize_(
      endCoordForDraw, false);

  var defaultStep = this.getDefaultStep_();
  var maxSize = this.getMaxSize_();

  if (startCellPrimaryComponent == endCellPrimaryComponent) {
    minComponent = Math.min(startCellSecondaryComponent,
        endCellSecondaryComponent);
    maxComponent = Math.max(startCellSecondaryComponent,
        endCellSecondaryComponent);
    // Single rect.
    this.rects.push(this.getRect(
        blockPositionForStartCell,
        minComponent,
        blockSizeForStartCell,
        maxComponent - minComponent
        ));

  } else {

    // Start coord rect.
    this.rects.push(this.getRect(
        blockPositionForStartCell,
        endCellPrimaryComponent > startCellPrimaryComponent ?
        startCellSecondaryComponent: 0,
        blockSizeForStartCell,
        endCellPrimaryComponent > startCellPrimaryComponent ?
        maxSize - startCellSecondaryComponent:
        startCellSecondaryComponent));
    // Current coord rect.
    this.rects.push(this.getRect(
        blockPositionForCurrentCell,
        endCellPrimaryComponent > startCellPrimaryComponent ?
        0 : endCellSecondaryComponent,
        blockSizeForCurrentCell,
        endCellPrimaryComponent > startCellPrimaryComponent ?
        endCellSecondaryComponent:
        maxSize - endCellSecondaryComponent
        ));

    if (Math.abs(endCellPrimaryComponent - startCellPrimaryComponent) > 1) {
      minComponent = Math.min(startCellPrimaryComponent, endCellPrimaryComponent);
      maxComponent = Math.max(startCellPrimaryComponent, endCellPrimaryComponent);
      // Middle rect.
      this.rects.push(this.getRect(
          this.getBlockPositionOrSize_(minComponent + 1, true),
          0,
          this.getBlockPositionOrSize_(maxComponent, true) -
          this.getBlockPositionOrSize_(minComponent + 1, true),
          maxSize
          ));
    }
  }

  this.maskEl.innerHTML = this.build();
  this.calculateDates(startCoordForDate, endCoordForDate);

};


/**
 * Calculates dates from cell selection.
 * @param {goog.math.Coordinate|number} aMinCell Lesser of cells.
 * @param {goog.math.Coordinate|number=} opt_maxCell Greater of cells.
 * @param {boolean=} opt_hours Whether to treat cells as hours.
 * @protected
 * @override
 */
rflect.cal.ui.MainPaneSelectionMask.prototype.calculateDates = function(aMinCell,
    opt_maxCell, opt_hours) {

  if (this.calendarEvent_) {

    var currentRelativeTs = this.coordinateToRelativeTs_(
      this.currentCoordinate);
    var startTs = this.timeManager.interval.start;
    var startEventTs = currentRelativeTs - this.timeDiffWithEventStart_ +
        startTs;
    var endEventTs = currentRelativeTs + this.timeDiffWithEventEnd_ +
        startTs;

    this.startDate = new goog.date.DateTime();
    this.startDate.setTime(startEventTs);
    this.endDate = new goog.date.DateTime(endEventTs)
    this.endDate.setTime(endEventTs);

  } else {
    var minCell = this.getCellCoordinate_(
        /**@type {goog.math.Coordinate}*/(aMinCell), false, true);
    var maxCell = this.getCellCoordinate_(
        /**@type {goog.math.Coordinate}*/(opt_maxCell), false, true);

    rflect.cal.ui.MainPaneSelectionMask.superClass_.calculateDates
        .call(this, minCell, maxCell, this.isWeek());
  }

}
