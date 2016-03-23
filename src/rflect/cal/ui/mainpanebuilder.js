/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview HTML builder for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MainPaneBuilder');

goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.string.StringBuffer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');
goog.require('rflect.date');
goog.require('rflect.date.util');
goog.require('rflect.cal.ui.soy.mainpane');



/**
 * Main pane builder main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.ui.MainPane} aMainPane Link to main pane.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @param {rflect.cal.blocks.BlockPool} aBlockPoolWeek Link to week block pool.
 * @param {rflect.cal.blocks.BlockPool} aBlockPoolAllday Link to allday block pool.
 * @param {rflect.cal.blocks.BlockPool} aBlockPoolMonth Link to month block pool.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @param {rflect.cal.ui.TimeMarker} aTimeMarker Link to time marker.
 * @constructor
 */
rflect.cal.ui.MainPaneBuilder = function(aViewManager, aMainPane, aTimeManager,
    aEventManager, aBlockManager, aBlockPoolWeek, aBlockPoolAllday,
    aBlockPoolMonth, aContainerSizeMonitor, aNavigator, aTimeMarker) {
  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to main pane.
   * @type {rflect.cal.ui.MainPane}
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
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Link to week block manager.
   * @type {rflect.cal.blocks.BlockManager}
   * @private
   */
  this.blockManager_ = aBlockManager;

  /**
   * Link to week block pool.
   * @type {rflect.cal.blocks.BlockPool}
   * @private
   */
  this.blockPoolWeek_ = aBlockPoolWeek;

  /**
   * Link to allday block pool.
   * @type {rflect.cal.blocks.BlockPool}
   * @private
   */
  this.blockPoolAllDay_ = aBlockPoolAllday;

  /**
   * Link to month block manager.
   * @type {rflect.cal.blocks.BlockPool}
   * @private
   */
  this.blockPoolMonth_ = aBlockPoolMonth;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  /**
   * Link to time marker.
   * @type {rflect.cal.ui.TimeMarker}
   * @private
   */
  this.timeMarker_ = aTimeMarker;

  /**
   * Reusable format for weekday names in week mode.
   */
  this.weekDayNameFormatWeek_ = new goog.i18n.DateTimeFormat('EEE, d MMM');

  /**
   * Cache for already built strings.
   * @type {Object.<number, string>}
   * @private
   */
  this.cache_ = {};
};


/**
 * Key for hours container.
 * @type {number}
 * @const
 */
rflect.cal.ui.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER = 1;


/**
 * Key for hours container.
 * @type {number}
 * @const
 */
rflect.cal.ui.MainPaneBuilder.CACHE_KEY_GRID_ROWS = 2;


/**
 * Builds body of component in week mode.
 * @param {boolean} aFirstBuild Whether we build for the fist time.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildBodyWeek = function(aFirstBuild,
    opt_outerHTML) {
  var gridWidth = this.blockPoolWeek_.gridSize.width;
  var isSmallScreen = this.containerSizeMonitor_.isSmallScreen();
  var hideAllDayWhenEmpty = this.containerSizeMonitor_.isSizeCategoryOrLower(
      rflect.cal.Navigator.SIZE_CATEGORY.IPAD_LANDSCAPE);
  var isSparseArraysEmpty = this.blockManager_.isSparseArraysEmpty();
  if (goog.DEBUG)
        console.log('isSmallScreen: ', isSmallScreen);
  if (goog.DEBUG)
    console.log('isSparseArraysEmpty: ', isSparseArraysEmpty);

  return rflect.cal.ui.soy.mainpane.mainPaneWeek({
    id: this.mainPane_.getId(),
    firstBuild: aFirstBuild,
    includeOuterHTML: opt_outerHTML,
    noAllDayEvents: isSparseArraysEmpty,
    expanded: this.mainPane_.getParent().isExpanded(),
    isInDayMode: this.viewManager_.isInSingleDayMode(),
    isScrollEnabled: this.mainPane_.isScrollEnabled(),
    isSmallScreen: this.containerSizeMonitor_.isSmallScreen(),
    hideAllDayWhenEmpty: hideAllDayWhenEmpty,
    allDayExpanded: this.blockPoolAllDay_.expanded,
    weekPoolExpanded: this.blockPoolWeek_.expanded,
    allDayGridContainerHeight: this.blockPoolAllDay_.gridContainerSize.height,
    allDayGridWidth: rflect.math.pixelToPercent(gridWidth,
        this.blockPoolAllDay_.gridContainerSize.width).toFixed(4),
    allDayGridHeight: this.blockPoolAllDay_.gridSize.height,
    gridContainerHeight: this.blockPoolWeek_.gridContainerSize.height,
    gridWidth: rflect.math.pixelToPercent(this.blockPoolWeek_.gridSize.width,
        this.blockPoolWeek_.gridContainerSize.width),
    navigatorScrollBarWidth: this.navigator_.getScrollbarWidth(),
    verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
    horizontalExpandEnabled: rflect.HORIZONTAL_EXPAND_ENABLED,
    dayNamesHTML: isSmallScreen ? '' : this.buildDayNamesWeek_(),
    weekGridAdColsHTML: hideAllDayWhenEmpty && isSparseArraysEmpty ? '' :
        this.buildWeekGridAdCols_(),
    timeMarkerHeadHTML: this.timeMarker_.buildHead(),
    hourRowsHTML: this.buildHourRows_(),
    weekGridRowsHTML: this.buildGridRows_(),
    weekGridColsHTML: this.buildWeekGridCols_()
  });
};


/**
 * Builds internals of week grid.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekGrid = function() {
  return rflect.cal.ui.soy.mainpane.weekGrid({
    weekGridColsHTML: this.buildWeekGridCols_()
  })
}


/**
 * Builds internals of all day grid.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildAllDayGrid = function() {
  return rflect.cal.ui.soy.mainpane.allDayGrid({
    weekGridAdColsHTML: this.buildWeekGridAdCols_()
  })
}


/**
 * Builds internals of all day grid.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMonthGrid = function() {
  return rflect.cal.ui.soy.mainpane.monthGrid({
    monthGridRowsHTML: this.buildMonthGridRows_()
  })
}


/**
 * Builds body of component in month mode.
 * @param {boolean} aFirstBuild Whether we build for the fist time.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string}
 * @see rflect.cal.ui.MainPaneBuilder#buildBodyWeek
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildBodyMonth = function(aFirstBuild,
    opt_outerHTML) {
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  return rflect.cal.ui.soy.mainpane.mainPaneMonth({
    id: this.mainPane_.getId(),
    includeOuterHTML: opt_outerHTML,
    expanded: this.mainPane_.getParent().isExpanded(),
    firstBuild: aFirstBuild,
    isScrollEnabled: this.mainPane_.isScrollEnabled(),
    monthPoolExpanded: this.blockPoolMonth_.expanded,
    gridWidth: rflect.math.pixelToPercent(this.blockPoolMonth_.gridSize.width,
        this.blockPoolMonth_.gridContainerSize.width),
    gridContainerHeight: this.blockPoolMonth_.gridContainerSize.height,
    gridHeight: this.blockPoolMonth_.gridSize.height,
    navigatorScrollBarWidth: this.navigator_.getScrollbarWidth(),
    verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
    dayNamesHTML: this.buildDayNamesMonth_(),
    weekNumsHTML: this.buildWeekNumbers_(),
    monthGridColsHTML: this.buildMonthGridCols_(),
    monthGridRowsHTML: this.buildMonthGridRows_(),
    monthZippiesHTML: rflect.VERTICAL_EXPAND_ENABLED ?
        this.buildMnRowZippies_() : ''
  });
};


/**
 * Individual dayname.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildDayNamesWeek_ =
    function() {
  var daySeries = this.timeManager_.daySeries;
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  var str = '';
  for (let colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {

    let data = {
      colNumber: colCounter,
      marginLeft: rflect.math.pixelToPercent(prevColsCumulativeSize,
          gridWidth).toFixed(4),
      top: -100 * colCounter,
      howManyBlocks: blocksNumber,
      horizontalExpandEnabled: rflect.HORIZONTAL_EXPAND_ENABLED,
      dayZippyExpanded: this.blockPoolWeek_.blocks[colCounter].expanded,
      dayNameFormatted: this.weekDayNameFormatWeek_.format(
          daySeries[colCounter]),
    };

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    data.marginRight = (100 - rflect.math.pixelToPercent(prevColsCumulativeSize,
        gridWidth)).toFixed(4);

    str += rflect.cal.ui.soy.mainpane.dayNameEntry(data);
  }
  return str;
};


/**
 * Individual dayname.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildDayNamesMonth_ = function() {
  var dayNamesFirstNumber = goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK;
  var dayNameNumber = 0;
  var str = '';

  for (var counter = 0; counter < 7; counter++) {
    // We need to shift position by 1 because array of weekdays starts from
    // sunday and WEEKDAY gives weekday number starting from monday.
    dayNameNumber = (dayNamesFirstNumber + counter + 1) % 7;

    str += rflect.cal.ui.soy.mainpane.dayNameEntryMonth({
      colNumber: counter,
      dayName: this.containerSizeMonitor_.isSmallScreen() ?
          goog.i18n.DateTimeSymbols.SHORTWEEKDAYS[dayNameNumber] :
          goog.i18n.DateTimeSymbols.WEEKDAYS[dayNameNumber]
    });

  }

  return str;
};


/**
 * Individual weekgrid col.
 * @return {string} Cols HTML.
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekGridAdCols_ =
    function() {
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;
  var sparseArrays = this.blockPoolAllDay_.blocks[0].sparseArrays;
  var str = '';

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {

    var data = {
      colNumber: colCounter,
      howManyBlocks: blocksNumber,
      marginLeft: rflect.math.pixelToPercent(prevColsCumulativeSize,
        gridWidth).toFixed(4),
      top: -100 * colCounter,
      adChipsHTML: rflect.cal.ui.MainPaneBuilder.buildAdBlockChips_(
          sparseArrays[colCounter], this.eventManager_)
    };

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    data.marginRight = (100 - rflect.math.pixelToPercent(prevColsCumulativeSize,
        gridWidth)).toFixed(4);

    str += rflect.cal.ui.soy.mainpane.weekGridAdCol(data);
  }

  return str;
};


/**
 * Builds html for chips for particular block.
 * @param {!Array.<rflect.cal.events.Chip|undefined>} aChips Chips for column in
 * sparse array.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @private
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.buildAdBlockChips_ =
    function(aChips, aEventManager) {
  var chip;
  var str = '';

  for (var chipCounter = 0, length = aChips.length; chipCounter < length;
      chipCounter++) {
    if (chip = aChips[chipCounter]) {
      // Zero parameters because they are currently irrelevant for month chip.
      str += rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip(
          aEventManager, chip, 0, chipCounter, 0, true);
    }
  }

  return str;
}


/**
 * Individual month mode zippy.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMnRowZippies_ =
    function() {
  var str = '';

  for (let rowCounter = 0, blocksNumber =
      this.blockPoolMonth_.getBlocksNumber(); rowCounter < blocksNumber;
      rowCounter++) {
    let block = this.blockPoolMonth_.blocks[rowCounter]
    str += rflect.cal.ui.soy.mainpane.monthZippy({
      index: rowCounter,
      block: block
    })
  }

  return str;
};


/**
 * Individual weeknum.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekNumbers_ =
    function() {
  var str = '';

  for (var rowCounter = 0, blocksNumber =
      this.blockPoolMonth_.getBlocksNumber();
      rowCounter < blocksNumber;
      rowCounter++) {

    str += rflect.cal.ui.soy.mainpane.weekNum({
      rowNumber: rowCounter,
      height: this.blockPoolMonth_.blocks[rowCounter].size,
      label: this.timeManager_.daySeries[rowCounter * 7].getWeekNumber()
    });

  }

  return str;
};


/**
 * Builds hours.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildHourRows_ = function() {

  if (!(rflect.cal.ui.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER in
      this.cache_)) {
    // First run, without cache.
    var sb = '';
    var timeLabels = rflect.date.util.getTimeLabels();

    for (var counter = 0; counter < timeLabels.length; counter++) {
      sb += rflect.cal.ui.soy.mainpane.hourRow({
        even: counter % 2 == 0,
        label: timeLabels[counter]
      });
    }

    this.cache_[rflect.cal.ui.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER] = sb;
  }
  return this.cache_[rflect.cal.ui.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER];
}


/**
 * Builds grid rows.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildGridRows_ = function() {
  if (!(rflect.cal.ui.MainPaneBuilder.CACHE_KEY_GRID_ROWS in
      this.cache_)) {
    var sb = '';

    for (var counter = 0; counter < rflect.cal.predefined.HOUR_ROWS_NUMBER;
          counter++) {
      sb += rflect.cal.ui.soy.mainpane.gridRow({
        even: counter % 2 == 0
      });
    }

    this.cache_[rflect.cal.ui.MainPaneBuilder.CACHE_KEY_GRID_ROWS] = sb;

  }
  return this.cache_[rflect.cal.ui.MainPaneBuilder.CACHE_KEY_GRID_ROWS];
}


/**
 * Builds week expand signs.
 * @param {number} aColCounter Number of column.
 * @private
 *
 * Expand sign.
 * '<div class="expand-sign-wk-cont"><div class="expand-sign-wk ',
 *  Expand sign state (expand-sign-wk-collapsed, expand-sign-wk-expanded).
 * '"></div></div>',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekExpandSigns_ =
    function(aSb, aOffset, aColCounter) {
  var block = this.blockPoolWeek_.blocks[aColCounter];
  var str = '';

  // Expand signs build.
  for (var counter = 0; counter <
      rflect.cal.predefined.WEEK_EXPAND_SIGNS_NUMBER; counter++) {
    str += rflect.cal.ui.soy.mainpane.weekExpandSign({
      block: block
    });
  }
};


/**
 * Builds html for individual grid table col for week mode.
 * @private
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekGridCols_ = function() {
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;
  var todayDate;
  var str = '';

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber; colCounter++) {
    var block = this.blockPoolWeek_.blocks[colCounter];

    var data = {
      colNumber: colCounter,
      howManyBlocks: blocksNumber,
      marginLeft: rflect.math.pixelToPercent(prevColsCumulativeSize, gridWidth).
         toFixed(4),
      top: -100 * colCounter,
      horizontalExpandEnabled: rflect.HORIZONTAL_EXPAND_ENABLED,
      weekExpandSignsHTML: rflect.HORIZONTAL_EXPAND_ENABLED ?
         rflect.cal.ui.soy.mainpane.weekExpandSign({block: block}) : '',
      timeMarkerLineHTML:
          this.timeManager_.isCurrentDay(
              this.timeManager_.daySeries[colCounter]) ?
          this.timeMarker_.buildLine() : '',
      weekChipsHTML: this.buildWeekBlockChips_(block)
    };

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    data.marginRight = (100 - rflect.math.pixelToPercent(prevColsCumulativeSize,
        gridWidth)).toFixed(4);

    str += rflect.cal.ui.soy.mainpane.weekGridCol(data);
  }

  return str;
};


/**
 * Builds html for individual week chip.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.events.Chip} aChip Chip to build.
 * @param {number} aTotalCols How many cols are in this chip's blob.
 * @param {number} aStartCol In which col chip starts.
 * @param {number} aColSpan How many cols chip spans.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.buildWeekBlockChip =
    function(aEventManager, aChip, aTotalCols, aStartCol,
    aColSpan) {
  var pixelStart = aChip.start * rflect.cal.predefined.HOUR_ROW_HEIGHT / 30;
  var pixelHeight = (aChip.end - aChip.start) *
      rflect.cal.predefined.HOUR_ROW_HEIGHT / 30;
  var widthQuant = 100 / aTotalCols;
  var event = aEventManager.getEventById(aChip.eventId);
  var coversLastCol = aStartCol + aColSpan == aTotalCols;
  var str = '';

  // margin-left.
  var shift = widthQuant * aStartCol;
  // margin-right.
  var width = shift + widthQuant * ( aColSpan +
      rflect.cal.predefined.chips.OVERLAPPING_DEGREE);
  if (coversLastCol) {
    width -= widthQuant * rflect.cal.predefined.chips.OVERLAPPING_DEGREE;
  }

  str += rflect.cal.ui.soy.mainpane.weekChip({
    chip: aChip,
    event: event,
    eventIsInProgress: aEventManager.eventIsInProgress(aChip.eventId),
    marginLeft: shift,
    marginRight: 100 - width,
    marginBottom: -pixelHeight +
        (aChip.startIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) +
        (aChip.endIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) +
        rflect.cal.predefined.chips.PADDING_TOP,
    zIndex: aStartCol,
    timeLabel:
        // Start time.
        rflect.cal.ui.MainPaneBuilder.buildWeekChipsTimeLabel_(aChip, true) +
        ' - ' +
        // End time.
        rflect.cal.ui.MainPaneBuilder.buildWeekChipsTimeLabel_(aChip, false),
    top: pixelStart,
    height: pixelHeight -
        (aChip.startIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) -
        (aChip.endIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) -
        rflect.cal.predefined.chips.PADDING_TOP
  });

  return str;
}


/**
 * Builds html for individual month chip.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.events.Chip} aChip Chip to build.
 * @param {number} aTotalCols How many cols are in this chip's blob.
 * @param {number} aStartCol In which col chip starts.
 * @param {number} aColSpan How many cols chip spans.
 * @param {boolean=} opt_allDay Whether this is all-day chip.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip =
    function(aEventManager, aChip, aTotalCols, aStartCol,
    aColSpan, opt_allDay) {
  return rflect.cal.ui.soy.mainpane.monthChip({
    chip: aChip,
    event: aEventManager.getEventById(aChip.eventId),
    eventIsInProgress: aEventManager.eventIsInProgress(aChip.eventId),
    startCol: aStartCol,
    opt_allDay: opt_allDay
  });
}


/**
 * Builds time label for chip.
 * @param {rflect.cal.events.Chip} aChip Chip.
 * @param {boolean} aStart Whether label is for start.
 * @private
 */
rflect.cal.ui.MainPaneBuilder.buildWeekChipsTimeLabel_ = function(aChip,
    aStart) {
  var edgeIsCut = aStart && aChip.startIsCut || !aStart && aChip.endIsCut;
  var totalMins = aStart ? aChip.start : aChip.end;
  var  str = '';

  if (edgeIsCut || totalMins >= 1440)
    str += '00:00';
  else {
    var mins = totalMins % 60;
    var hours = (totalMins - mins) / 60;
    if (hours < 10) str += '0';
    str += hours;
    str += ':';
    if (mins < 10) str += '0';
    str += mins;
  }

  return str;
}


/**
 * Builds html for chips for particular block.
 * @param {rflect.cal.blocks.Block} aBlock Block.
 * @private
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekBlockChips_ =
    function(aBlock) {
  return rflect.cal.ui.MainPaneBuilder.buildChips_(this.eventManager_, aBlock,
      rflect.cal.ui.MainPaneBuilder.buildWeekBlockChip);
}


/**
 * Builds html for chips for particular block.
 * @param {rflect.cal.blocks.Block} aBlock Block.
 * @private
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMonthBlockChips_ =
    function(aBlock) {
  return rflect.cal.ui.MainPaneBuilder.buildChips_(this.eventManager_, aBlock,
      rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip);
}


/**
 * Iterates over each chip and calls callback on one.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.blocks.Block} aBlock Block.
 * @param {function(rflect.cal.events.EventManager, rflect.cal.events.Chip, number, number, number):string} aChipBuilder
 * Callback to call on each
 * iteration.
 * @return {string} Built chips.
 * @private
 */
rflect.cal.ui.MainPaneBuilder.buildChips_ = function(aEventManager, aBlock,
    aChipBuilder) {
  var blobs = aBlock.blobs;
  var str = '';

  for (var blobCounter = 0, blobLength = blobs.length; blobCounter < blobLength;
      blobCounter++) {
    var blob = blobs[blobCounter].blob;
    var totalCols = blobs[blobCounter].totalCols;

    for (var blobEntryCounter = 0, blobEntriesLength = blob.length;
        blobEntryCounter < blobEntriesLength; blobEntryCounter++) {
      var blobEntry = blob[blobEntryCounter];
      var chip = blobEntry.chip;
      var startCol = blobEntry.startCol;
      var colSpan = blobEntry.colSpan;
      str += aChipBuilder(aEventManager, chip, totalCols, startCol, colSpan);
    }
  }

  return str;
}


/**
 * Individual monthgrid row.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMonthGridRows_ = function() {
  var str = '';

  for (let rowCounter = 0, rowsNumber = this.blockPoolMonth_.getBlocksNumber();
      rowCounter < rowsNumber;
      rowCounter++) {
    let block = this.blockPoolMonth_.blocks[rowCounter];
    str += rflect.cal.ui.soy.mainpane.monthGridRow({
      rowNumber: rowCounter,
      howManyBlocks: rowsNumber,
      height: block.size -
          // Actual block height doesn't include border width.
          rflect.cal.predefined.MONTHGRID_ROW_BORDER_WIDTH,
      dayCellsHTML: this.buildDayCells_(rowCounter),
      monthChipsHTML: this.buildMonthBlockChips_(block),
      verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
    });
  }

  return str;
};


/**
 * Individual day cell.
 * @param {number} aRowCounter
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildDayCells_ = function(aRowCounter) {
  var daySeries = this.timeManager_.daySeries;
  var day;
  var currentMonth = this.timeManager_.basis.getMonth();
  var isInMonthView = this.viewManager_.currentView ==
      rflect.cal.ViewType.MONTH;
  var str = '';

  for (let colCounter = 0; colCounter < 7; colCounter++) {
    let block = this.blockPoolMonth_.blocks[aRowCounter];
    let index = aRowCounter * 7 + colCounter;

    str += rflect.cal.ui.soy.mainpane.dayCell({
      isCurrentDay: this.timeManager_.isCurrentDay(this.timeManager_.daySeries[
          index]),
      index: index,
      block: block,
      verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
      decorateOtherMonth: isInMonthView && currentMonth != (day =
          daySeries[index]).getMonth(),
      label: daySeries[index].getDate()
    });
  }

  return str;
};


/**
 * Individual monthgrid col.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMonthGridCols_ = function() {
  var str = '';
  for (var counter = 0; counter < 7; counter++) {
    str += rflect.cal.ui.soy.mainpane.monthGridCol({
      last: counter == 6
    });
  }
  return str;
};
