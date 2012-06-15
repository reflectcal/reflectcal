/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview HTML builder for main pane.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.MainPaneBuilder');

goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.string.StringBuffer');
goog.require('rflect.cal.i18n.predefined');



/**
 * Main pane builder main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.MainPane} aMainPane Link to main pane.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.BlockPool} aBlockPoolWeek Link to week block pool.
 * @param {rflect.cal.BlockPool} aBlockPoolAllday Link to allday block pool.
 * @param {rflect.cal.BlockPool} aBlockPoolMonth Link to month block pool.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @constructor
 */
rflect.cal.MainPaneBuilder = function(aViewManager, aMainPane, aTimeManager,
    aBlockPoolWeek, aBlockPoolAllday, aBlockPoolMonth, aContainerSizeMonitor) {
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

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

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
rflect.cal.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER = 1;


/**
 * Key for hours container.
 * @type {number}
 * @const
 */
rflect.cal.MainPaneBuilder.CACHE_KEY_GRID_ROWS = 2;


/**
 * String parts for builder, for weekmode.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_ = [
  // Main pane.
  '<div id="main-pane" class="' + goog.getCssName('main-pane') + '">',
  // Header of main pane.
  '<div id="main-pane-header">',
  // Daynames zippy.
  '<div id="daynames-prefix-wk" style="width:' +
      /*Daynames prefix width in pixels (40).*/
      rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH,
  'px"><div id="daynames-zippy" class="zippy ',
  /* Zippy state is here
  (goog-zippy-collapsed, goog-zippy-expanded).*/
  '"></div>',
  '</div>',
  // Header container.
  '<div id="main-pane-header-container" class="main-pane-header-container-wk" style="' +
      /*Main pane header container margin (left or right) in pixels (40px).*/
      rflect.cal.i18n.predefined.MAIN_PANE_HEADER_CONTAINER_WK_MARGIN,
  // Daynames container.
  '"><div id="main-pane-header-wk-daynames">',
  '<div id="weekmode-daynames-table" style="width:',
  /* Width of daynames table in percents (100). */
  '%">',
  // Individual dayname.
  '<div id="dayname',
  /*Dayname id is here (dayname0).*/
  '" class="dayname-wk" style="margin-left:',
  /*Dayname left margin in percents (0).*/
  '%;margin-right:',
  /*Dayname right margin in percents (85.7143).*/
  '%;top:',
  /*Dayname top position in percents (0).*/
  '%">',
  /*Dayname is here (Monday).*/
  '</div>',
  '</div>',
  '</div>',
  // Scrollable in header.
  '<div id="main-pane-header-scrollable" class="',
  /*Scrollable states (mphs-scroll-vert-off, mphs-scroll-horz-off,
   mphs-scroll-vert-on, mphs-scroll-horz-on).*/
  '" style="height:',
  /*Height of scrollable in pixels (100).*/
  'px">',
  // Allday events grid wrapper.
  '<div id="alldayevents-grid-wrapper">',
  // Allday events grid.
  '<div id="alldayevents-grid" style="height:',
  /*Allday grid height
  in pixels (200).*/
  'px;width:',
  /*Allday grid width in percents (120).*/
  '%">' +
      // Masks.
      '<div id="wk-ad-mask-cnt"></div>',
  // Individual weekgrid col.
  '<div id="weekgrid-ad-col',
  /*Weekgrid ad col id is here (weekgrid-ad-col0).*/
  '" class="weekgrid-col',
  /*Weekgrid col class (weekgrid-col).*/
  ' wk-ad-layers-cont-outer" style="margin-left:',
  /*Weekgrid ad col left margin in percents (0).*/
  '%;margin-right:',
  /*Weekgrid ad col right margin in percents (85.7143).*/
  '%;top:',
  /*Weekgrid ad col top position in percents (0).*/
  '%">',
  '<div class="wk-ad-layers-cont">',
  // Individual decoration layer.
  '<div id="wk-ad-dec-layer-col',
  /*Decoration layer id (wk-ad-dec-layer-col0).*/
  '" class="wk-ad-decoration-layer">',
  // Expand sign
  '<div class="expand-sign-wk-ad-cont">',
  '<div class="expand-sign-wk-ad ',
  /*Expand sign state is here
  (expand-sign-wk-ad-collapsed, expand-sign-wk-ad-expanded).*/
  '"></div></div>',
  // End of individual decoration layer.
  '</div>',

  // Individual event layer.
  '<div id="wk-ad-events-layer-col',/*Individual ad event layer id (wk-ad-events-layer-col0).*/
  '" class="wk-ad-events-layer">',/*Events are here.*/
  // End of individual events layer.
  '</div>',
  '</div>',
  // End of individual weekgrid col.
  '</div>',
  // End of allday events grid.
  '</div>',
  // End of allday events grid wrapper.
  '</div>',

  // End of scrollable in header.
  '</div>',
  // Day zippies.
  '<div id="main-pane-header-wk-zippies">',
  '<div id="weekmode-zippies-table" style="width:',
  /* Width of zippies table in percent (100). */
  '%">',
  // Individual zippy.
  '<div class="wk-col-zippy-cont" style="margin-left:',/*Individual zippy left
  margin in percent (14.2857).*/
  '%;margin-right:',/*Individual zippy right margin in percent (71.4286).*/
  '%;top:',/*Individual zippy top in percent (0).*/
  '%">',
  '<div id="wk-zippy-col',/*Id of zippy (wk-zippy-col2).*/
  '" class="zippy wk-col-zippy ',/*State of zippy
  (goog-zippy-expanded, goog-zippy-collapsed).*/
  '"></div>',
  '</div>',
  '</div>',
  '</div>',
  // End of header container.
  '</div>',
  // End of header of main pane.
  '</div>',
  // Main pane scrollable body.
  '<div id="main-pane-body-scrollable-wk" style="height:',
  /*Scrollable height in pixels (400).*/
  'px" class="',/*Scrollable state is here
  (mpbs-wk-scroll-horz-on, mpbs-wk-scroll-horz-of).*/
  '">',
  // Hours container.
  '<div id="hours-container" style="width:' +
      /*Hours container width in pixels (40).*/
      rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH,
  // Time marker head.
  'px"><div id="time-marker-head" style="top:',/*Position of marker head in
  pixels (200).*/
  'px;"></div>',
  // Individual hour.
  '<div class="',/*Grid table row state (grid-table-row grid-table-row-odd,
  grid-table-row grid-table-row-even).*/
  '"><div class="hour-label ',/*Hour state (hl-odd, hl-even).*/
  '">',/*Hour here (00:00).*/
  '</div></div>',
  // End of hours container.
  '</div>',
  // Grid table wrapper.
  '<div id="grid-table-wrapper-wk" style="' +
      /* Margin of grid table wrapper (left or right) in pixels (40px).*/
      rflect.cal.i18n.predefined.GRID_TABLE_WRAPPER_WK_MARGIN + '">',
  // Grid rows container.
  '<div id="grid-rows-container" class="wk-grid-rows-cont" style="width:',
  /* Width of grid rows in percents (100%). */
  '%">',
  // Individual row.
  '<div class="',/*Grid row state (grid-table-row-odd,
  grid-table-row-even).*/
  '"></div>',
  // End of grid rows container.
  '</div>',
  // Grid table.
  '<div id="grid-table-wk" class="' + goog.getCssName('grid-table-wk') +
      '" style="width:',
  /* Width of grid table in percents (100%). */
  '%">' + // Masks.
      '<div id="wk-mask-cnt"></div>',
  // Individual weekgrid col.
  '<div id="weekgrid-col',
  /*Id of weekgrid col (0).*/
  '" class="weekgrid-col',
  /*Class of weekgrid col (weekgrid-col).*/
  '" style="margin-left:',
  /*Weekgrid col left margin
  in percents (0).*/
  '%;margin-right:',
  /*Weekgrid col right margin
  in percents (85.7143).*/
  '%;top:',
  /*Weekgrid col top position in percents (0).*/
  '%">',
  // Individual decoration layer.
  '<div id="wk-dec-layer-in-col',/*Id of individual decoration layer (wk-dec-layer-in-col0).*/
  '" class="wk-decoration-layer">',
  // Expand sign.
  '<div class="expand-sign-wk-cont"><div class="expand-sign-wk ',
  /* Expand sign state (expand-sign-wk-collapsed, expand-sign-wk-expanded).*/
  '"></div></div>',
  // End of decoration layer.
  '</div>',
  // Individual events layer.
  '<div id="wk-events-layer-col',/*Id of individual events layer (wk-events-layer-col0).*/
  '" class="wk-events-layer">',
  /*Events are here.*/
  // End of individual events layer.
  '</div>',
  // End of individual weekgrid col.
  '</div>',
  // End of grid table.
  '</div>',
  // End of grid table wrapper.
  '</div>',
  // End of main pane scrollable body.
  '</div>',

  // End of main pane.
  '</div>'
];


/**
 * String parts for builder, for monthmode.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_ = [
  // Main pane.
  '<div id="main-pane" class="' + goog.getCssName('main-pane') + '">',
  // Header of main pane.
  '<div id="main-pane-header">',
  '<div id="daynames-prefix-mn">',
  '</div>',
  '<div id="main-pane-header-container" class="main-pane-header-container-mn">',
  '<div id="main-pane-header-wk-daynames" style="margin-right:',
  /* Main pane header container margin left (19).*/
  'px"><table id="weekmode-daynames-table" cellspacing="0" cellpadding="0">',
  '<tbody><tr>',
  // Individual dayname.
  '<td id="dayname',
  /*Id of dayname (0).*/
  '">',
  /*Name of dayname (Monday).*/
  // End of individual dayname.
  '</td>',
  '</tr></tbody></table>',
  '</div>',
  '</div>',
  // End of header of main pane.
  '</div>',
  // Main pane scrolalble wrapper.
  '<div id="main-pane-body-scrollable-wrapper" style="height:',
  /*Height of scrollable wrapper in pixels (420).*/
  'px;">',
  '<div id="main-pane-header-mn-zippies">',
  '<table id="monthmode-zippies-table" cellspacing="0" cellpadding="0"><tbody>',
  // Individual month mode zippy.
  '<tr><td id="mn-zippy-cont-row',
  /*Id of individual month zippy container(0).*/
  '" style="height:',
  /*Height of individual month zippy container in pixels (70).*/
  'px;">',
  '<div class="mn-row-zippy-cont">',
  '<div id="mn-zippy-row',
  /*Id of individual zippy (0)*/
  '" class="zippy mn-row-zippy ',
  /*State of individual zippy (mn-row-zippy-collapsed).*/
  '"></div>',
  '</div>',
  // End of individual month zippy.
  '</td></tr>',
  '</tbody></table>',
  '</div>',
  // Main pane scrollable.
  '<div id="main-pane-body-scrollable-mn" class="',
  /*Main pane scrollable state
  (mpbs-mn-scroll-vert-off, mpbs-mn-scroll-vert-on).*/
  '">',
  // Grid table wrapper outer.
  '<div id="grid-table-wrapper-outer" style="height:',
  /*Height of grid table outer in pixels (420).*/
  'px;">',
  '<div id="weeknum-cont">' +
      '<table id="weeknums" cellspacing="0" cellpadding="0">',
  // Individual weeknum.
  '<tr><td id="weeknum',
  /* Id of individual weeknum (0).*/
  '" class="weeknum-label" style="height:',
  /* Height of individual weeknum in pixels (70).*/
  'px;"><span class="weeknum-label-inner">',
  /* Name of individual weeknum (10).*/
  // End of individual weeknum.
  '</span></td></tr>',
  '</table>',
  '</div>',
  // Grid table wrapper.
  '<div id="grid-table-wrapper-mn">' +
      // Masks.
      '<div id="mn-mask-cnt"></div>',
  '<div id="grid-cols-container" class="mn-grid-cols-cont">' +
      '<table id="grid-cols-cont-inner" cellspacing="0" cellpadding="0">' +
      '<tbody><tr>',
  // Individual monthgrid col.
  '<td class="' + goog.getCssName('weekgrid-col'),
  // Individual monthgrid col class.
  '">&nbsp;</td>',
  '</tr></tbody></table>',
  '</div>',
  // Grid table.
  '<table id="grid-table-mn" cellspacing="0" cellpadding="0" class="' +
      goog.getCssName('grid-table-mn') + '"><tbody>',
  // Individual monthgrid row.
  '<tr><td id="monthgrid-row',
  /*Individual monthgrid row id (0).*/
  '" class="monthgrid-row ',
  /*Class of monthgrid row (monthgrid-row-last).*/
  '" style="height:',
  /*Individual monthgrid row height in pixels (69).*/
  'px;">',
  '<div class="mn-layers-cont">',
  // Individual decoration layer.
  '<div id="mn-dec-layer-row',
  /*Individual decoration layer id (0)*/
  '" class="mn-decoration-layer">',
  '<table cellspacing="0" cellpadding="0" class="daynums"><tbody><tr>',
  // Individual daycell.
  '<td class="daycell"><div class="expand-sign-mn-cont">',
  '<div class="expand-sign-mn ',
  /*Individual expand sign state
  (expand-sign-mn-collapsed, expand-sign-mn-expanded).*/
  '"></div>',
  '</div>',
  '<div class="daynum-cont"><div id="daynum-',
  /*Id of daynum row (0).*/
  /*Id of daynum col (0).*/
  '" class="daynum-label ',
  /*Daynum state (dl-other-month).*/
  '">',
  /*Daynum name (26).*/
  '</div>',
  '</div>',
  // End of individual daycell.
  '</td>',
  '</tr></tbody></table>',
  // End of individual decoration layer.
  '</div>',
  // Individual events layer.
  '<div id="mn-events-layer-row',
  /*Individual events layer id (0).*/
  '" class="mn-events-layer">',
  /*Events are placed here.*/
  // End of individual events layer.
  '</div>',
  '</div>',
  // End of individual monthgrid row.
  '</td></tr>',
  // End of grid table.
  '</tbody></table>',
  // End of grid table wrapper.
  '</div>',
  // End of grid table wrapper outer.
  '</div>',
  // End of main pane scrollable.
  '</div>',
  // End of main pane scrollable wrapper.
  '</div>',
  // End of main pane.
  '</div>'
];


/**
 * Builds body of component in week mode.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @protected
 */
rflect.cal.MainPaneBuilder.prototype.buildBodyInternalWeek_ = function(aSb) {
  // Form html. From index 1 (see offset increment before append), because 0
  // is the html of outer container, which we don't create in that method but
  // just decorate.
  var offset = 0;
  var length = rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_.length;
  while (++offset < length - 1) {
    // We move through parts array and increment offset. Each cycle, we append
    // some part and increment offset by 1. Sometimes we find special case when
    // we need to build some subpart and give control of building it to some
    // method. Because this method could shift offset down as it 'eats' some
    // array items, we reflect it here by incrementing offset by more than 1,
    // or not incrementing at all, according to the number of 'eaten' parts.
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[offset]);
    switch (offset) {
      case 3: {
        this.buildDayNamesZippy_(aSb, offset);
      };break;
      case 8: {
        this.buildDayNamesWeek_(aSb, offset);
        offset += 7;
      };break;
      case 18: {
        this.buildScrollableAllday_(aSb, offset);
        offset += 2;
      };break;
      case 22: {
        this.buildAllDayGrid_(aSb, offset);
        offset += 2;
      };break;
      case 25: {
        this.buildWeekGridAdCols_(aSb, offset);
        offset += 17;
      };break;
      case 47: {
        this.buildWeekColZippies_(aSb, offset);
        offset += 9;
      };break;
      case 61: {
        this.buildScrollableWeek_(aSb, offset);
        offset++;
      };break;
      case 65: {
        this.buildTimeMarkerHeadPosition_(aSb, offset);
      };break;
      case 67: {
        this.buildHoursAndGridRows_(aSb, offset);
        offset += 9;
      };break;
      case 78: {
        this.buildGridTableWeek_(aSb, offset);
        offset++;
      };break;
      case 80: {
        this.buildWeekGridCols_(aSb, offset);
        offset += 14;
      };break;
      default: break;
    }
  }
};


/**
 * Builds body of component in month mode.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.cal.MainPaneBuilder#buildBodyInternalWeek_
 * @protected
 */
rflect.cal.MainPaneBuilder.prototype.buildBodyInternalMonth_ = function(aSb) {
  var offset = 0;
  var length = rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_.length;
  while (++offset < length - 1) {
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[offset]);
    switch (offset) {
      case 5: {
        this.buildMainPaneHeaderMonth_(aSb);
      };break;
      case 8: {
        this.buildDayNamesMonth_(aSb, offset);
        offset += 2;
      };break;
      case 15: {
        this.buildScrollableWrapperMn_(aSb, offset);
      };break;
      case 19: {
        this.buildMnRowZippies_(aSb, offset);
        offset += 7;
      };break;
      case 30: {
        this.buildScrollableMonth_(aSb, offset);
      };break;
      case 32: {
        this.buildGridTableWrapperOuter_(aSb, offset);
      };break;
      case 35: {
        this.buildWeekNumbers_(aSb, offset);
        offset += 3;
      };break;
      case 43: {
        this.buildMonthGridCols_(aSb, offset);
        offset++;
      };break;
      case 48: {
        this.buildMonthGridRows_(aSb, offset);
        offset += 24;
      };break;
      default: break;
    }
  }
};


/**
 *
 * <pre>
 * '<div id="daynames-zippy" class="zippy ',Zippy state is here
 *(goog-zippy-collapsed, goog-zippy-expanded).
 * '"></div>',
 * </pre>
 */
rflect.cal.MainPaneBuilder.prototype.buildDayNamesZippy_ =
    function(aSb, aOffset) {
  aSb.append(this.blockPoolAllday_.expanded ? 'goog-zippy-expanded' :
      'goog-zippy-collapsed');
};


/**
 * Individual dayname.
 * '<div id="dayname',Dayname id is here (dayname0).
 * '" class="dayname-wk" style="margin-left:',Dayname position left edge
 * margin in percents (0).
 *'%;margin-right:',/*Dayname right margin in percents
 * (85.7143).
 * '%;top:',Dayname top position in percents (0).
 * '%">',Dayname is here (Monday).
 * '</div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildDayNamesWeek_ =
    function(aSb, aOffset) {
  var daySeries = this.timeManager_.daySeries;
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  // Daynames table width.
  aSb.append(rflect.math.pixelToPercent(gridWidth,
      this.blockPoolAllday_.gridContainerSize.width).toFixed(4));
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);

    // Margin left (for rtl).
    aSb.append(rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth).toFixed(4));

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
    // Margin right (for rtl).
    aSb.append((100 - rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth)).toFixed(4));

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
    aSb.append(-100 * colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);
    // Day name formatted.
    aSb.append(this.weekDayNameFormatWeek_.format(daySeries[colCounter]));
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);
  }
};


/**
 *'<div id="main-pane-header-wk-daynames" style="margin-right:>',
 *  Main pane header container margin left (19).
 * 'px"><table id="weekmode-daynames-table" cellspacing="0" cellpadding="0">',
 */
rflect.cal.MainPaneBuilder.prototype.buildMainPaneHeaderMonth_ = function(aSb) {
  if (this.blockPoolMonth_.expanded)
    aSb.append(this.containerSizeMonitor_.scrollbarWidth +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2);
  else
    aSb.append(rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2);
};


/**
 * Individual dayname.
 * '<td id="dayname'
 * Id of dayname (0).
 * '">',
 * /*Name of dayname (Monday).
 * // End of individual dayname.
 * '</td>',
 */
rflect.cal.MainPaneBuilder.prototype.buildDayNamesMonth_ = function(aSb, aOffset) {
  var dayNamesFirstNumber = goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK;
  var dayNameNumber = 0;

  for (var counter = 0; counter < 7; counter++) {
    if (counter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset]);
    aSb.append(counter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 1]);

    // We need to shift position by 1 because array of weekdays starts from
    // sunday and WEEKDAY gives weekday number starting from monday.
    dayNameNumber = (dayNamesFirstNumber + counter + 1) % 7;
    aSb.append(goog.i18n.DateTimeSymbols.WEEKDAYS[dayNameNumber]);

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 2]);
  }
};


/**
 * Scrollable in header.
 * '<div id="main-pane-header-scrollable" class="',Scrollable states
 * (mphs-scroll-vert-off, mphs-scroll-horz-off,
 *  mphs-scroll-vert-on, mphs-scroll-horz-on).
 * '" style="height:',Height of scrollable in pixels (100).
 * 'px">',
 */
rflect.cal.MainPaneBuilder.prototype.buildScrollableAllday_ =
    function(aSb, aOffset) {
  if (this.blockPoolAllday_.expanded)
    aSb.append(goog.getCssName('mphs-scroll-vert-on') + ' ');
  else
    aSb.append(goog.getCssName('mphs-scroll-vert-off') + ' ');
  if (this.blockPoolWeek_.expanded)
    aSb.append(goog.getCssName('mphs-scroll-horz-on'));
  else
    aSb.append(goog.getCssName('mphs-scroll-horz-off'));
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  // Size off allday scrollable.
  aSb.append(this.blockPoolAllday_.gridContainerSize.height);
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
};


/**
 * Main pane scrolalble wrapper.
 * '<div id="main-pane-body-scrollable-wrapper" style="height:',
 * Height of scrollable wrapper in pixels (420).
 * 'px;">',
 */
rflect.cal.MainPaneBuilder.prototype.buildScrollableWrapperMn_ =
    function(aSb, aOffset) {
  // Height of main pane scrollable wrapper.
  aSb.append(this.blockPoolMonth_.gridContainerSize.height);
};


/**
 * Allday events grid.
 * '<div id="alldayevents-grid" style="height:',Allday grid height
 * in pixels (200).
 * 'px;width:',Allday grid width in percents (120).
 * '%">',
 */
rflect.cal.MainPaneBuilder.prototype.buildAllDayGrid_ = function(aSb, aOffset) {
  // Height of allday grid.
  aSb.append(this.blockPoolAllday_.gridSize.height);
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  // Width of allday grid.
  aSb.append(rflect.math.pixelToPercent(
      this.blockPoolWeek_.gridSize.width,
      this.blockPoolAllday_.gridContainerSize.width)
      .toFixed(4));
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
};


/**
 * Individual weekgrid col.
 * '<div id="weekgrid-ad-col',
 * Weekgrid ad col id is here (weekgrid-ad-col0).
 * '" class="weekgrid-col',
 * Weekgrid col class (weekgrid-col).
 * ' wk-ad-layers-cont-outer" style="margin-left:',
 * Weekgrid ad col left margin in percents (0).
 * '%;margin-right:',
 * Weekgrid ad col right margin in percents (85.7143).
 * '%;top:',
 * Weekgrid ad col top position in percents (0).
 * '%">',
 * '<div class="wk-ad-layers-cont">',
 * // Individual decoration layer.
 * '<div id="wk-ad-dec-layer-col',
 * Decoration layer id (wk-ad-dec-layer-col0).
 * '" class="wk-ad-decoration-layer">',
 * // Expand sign
 * '<div class="expand-sign-wk-ad-cont">',
 * '<div class="expand-sign-wk-ad ',
 * Expand sign state is here
 * (expand-sign-wk-ad-collapsed, expand-sign-wk-ad-expanded).
 * '"></div></div>',
 * // End of individual decoration layer.
 * '</div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildWeekGridAdCols_ =
    function(aSb, aOffset) {
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {
    if (colCounter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
    if (colCounter == blocksNumber - 1)
      aSb.append(' ' + goog.getCssName('weekgrid-col-last'));
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);

    // Margin left (for rtl).
    aSb.append(rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth).toFixed(4));

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
    // Margin right (for rtl).
    aSb.append((100 - rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth)).toFixed(4));

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
    aSb.append(-100 * colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 8]);
    // Expand signs build.
    this.buildWkAdExpandSign_(aSb, aOffset + 9);

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 12]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 13]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 14]);
    // Allday events are placed here.
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 15]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 16]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 17]);
  }
};


/**
 * // Expand sign
 * '<div class="expand-sign-wk-ad-cont">',
 * '<div class="expand-sign-wk-ad ',Expand sign state is here
 * (expand-sign-wk-ad-collapsed, expand-sign-wk-ad-expanded).
 * '"></div></div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildWkAdExpandSign_ =
    function(aSb, aOffset) {
  var block = this.blockPoolAllday_.blocks[0];

  // Expand signs build.
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  aSb.append(!block.expanded && block.couldBeExpanded ?
      goog.getCssName('expand-sign-wk-ad-collapsed') :
      (block.expanded && block.couldBeCollapsed ?
      goog.getCssName('expand-sign-wk-ad-expanded') : ''));
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
};


/**
 * Builds zippies table and individual zippies.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @private
 *
 * '<div id="weekmode-zippies-table" style="width:',
 *  Width of zippies table in percent (100).
 * '%">',
 * Individual zippy.
 * '<div class="wk-col-zippy-cont" style="margin-left:',Individual zippy left
 * margin in percent (14.2857).
 * '%;margin-right:',Individual zippy right margin in percent (71.4286).
 * '%;top:',Individual zippy top in percent (0).
 * '%">',
 * '<div id="',Id of zippy (wk-zippy-col2).
 * '" class="zippy wk-col-zippy ',State of zippy
 * (goog-zippy-expanded, goog-zippy-collapsed).
 * '"></div>',
 * '</div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildWeekColZippies_ =
    function(aSb, aOffset) {
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  // Zippies table width.
  aSb.append(rflect.math.pixelToPercent(gridWidth,
      this.blockPoolWeek_.gridContainerSize.width).toFixed(4));
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);

    // Margin left (for rtl).
    aSb.append(rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth).toFixed(4));

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
    // Margin right (for rtl).
    aSb.append((100 - rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth)).toFixed(4));

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
    aSb.append(-100 * colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);
    aSb.append(this.blockPoolWeek_.blocks[colCounter].expanded ?
        'wk-col-zippy-expanded' : 'wk-col-zippy-collapsed');
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 8]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 9]);
  }
};


/**
 *Individual month mode zippy.
 * '<tr><td id="mn-zippy-cont-row',
 * Id of individual month zippy container(0).
 * '" style="height:',
 * Height of individual month zippy container in pixels (70).
 * 'px;">',
 * '<div class="mn-row-zippy-cont">',
 * '<div id="mn-zippy-row',
 * Id of individual zippy (0)
 * '" class="zippy mn-row-zippy ',
 * State of individual zippy (mn-row-zippy-collapsed).
 * '"></div>',
 * '</div>',
 * // End of individual month zippy.
 * '</td></tr>',
 */
rflect.cal.MainPaneBuilder.prototype.buildMnRowZippies_ =
    function(aSb, aOffset) {
  for (var rowCounter = 0, blocksNumber =
      this.blockPoolMonth_.getBlocksNumber(); rowCounter < blocksNumber;
      rowCounter++) {
    if (rowCounter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset]);
    aSb.append(rowCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 1]);
    // Height of zippy container
    aSb.append(this.blockPoolMonth_.blocks[rowCounter].size);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 2]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 3]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 4]);
    aSb.append(rowCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 5]);
    aSb.append(this.blockPoolMonth_.blocks[rowCounter].expanded ?
        'mn-row-zippy-expanded' : 'mn-row-zippy-collapsed');
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 6]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 7]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 8]);
  }
};


/**
 * Main pane scrollable.
 * '<div id="main-pane-body-scrollable-mn" class="'
 * Main pane scrollable state
 * (mpbs-mn-scroll-vert-off, mpbs-mn-scroll-vert-on).
 * '">',
 */
rflect.cal.MainPaneBuilder.prototype.buildScrollableMonth_ =
    function(aSb, aOffset) {
  if (this.blockPoolMonth_.expanded)
    aSb.append(goog.getCssName('mpbs-mn-scroll-vert-on'));
  else
    aSb.append(goog.getCssName('mpbs-mn-scroll-vert-off'));
};


/**
 * Main pane scrollable body.
 * '<div id="main-pane-body-scrollable-wk" style="height:',
 * Scrollable height in pixels (400).
 * 'px" class="', Scrollable state is here
 * (mpbs-wk-scroll-horz-on, mpbs-wk-scroll-horz-of).
 * '">',
 */
rflect.cal.MainPaneBuilder.prototype.buildScrollableWeek_ =
    function(aSb, aOffset) {
  // Height of scrollable.
  aSb.append(this.blockPoolWeek_.gridContainerSize.height);
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  if (this.blockPoolWeek_.expanded)
    aSb.append(goog.getCssName('mpbs-wk-scroll-horz-on'));
  else
    aSb.append(goog.getCssName('mpbs-wk-scroll-horz-off'));
};


/**
 * Grid table wrapper outer.
 * '<div id="grid-table-wrapper-outer" style="height:',
 * Height of grid table outer in pixels (420).
 * 'px;">',
 */
rflect.cal.MainPaneBuilder.prototype.buildGridTableWrapperOuter_ =
    function(aSb, aOffset) {
  // Height of grid table wrapper outer.
  aSb.append(this.blockPoolMonth_.gridSize.height);
};


/**
 * Individual weeknum.
 * '<tr><td id="weeknum',
 *  Id of individual weeknum (0).
 * '" class="weeknum-label" style="height:',
 *  Height of individual weeknum in pixels (70).
 * 'px;"><span class="weeknum-label-inner">',
 *  Name of individual weeknum (10).
 * // End of individual weeknum.
 * '</span></td></tr>',
 */
rflect.cal.MainPaneBuilder.prototype.buildWeekNumbers_ =
    function(aSb, aOffset) {
  var dateInFirstCol = null;

  for (var rowCounter = 0, blocksNumber =
      this.blockPoolMonth_.getBlocksNumber();
      rowCounter < blocksNumber;
      rowCounter++) {

    if (rowCounter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset]);
    aSb.append(rowCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 1]);
    // Height of week number.
    aSb.append(this.blockPoolMonth_.blocks[rowCounter].size);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 2]);

    dateInFirstCol = this.timeManager_.daySeries[rowCounter * 7];
    aSb.append(dateInFirstCol.getWeekNumber());

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 3]);
  }
};


/**
 * Time marker head.
 *'<div id="time-marker-head" style="top:',Position of marker head in
 * pixels (200).
 */
rflect.cal.MainPaneBuilder.prototype.buildTimeMarkerHeadPosition_ =
    function(aSb, aOffset) {
  aSb.append(200);
};


/**
 * Individual hour.
 * '<div class="',Grid table row state (grid-table-row grid-table-row-odd,
 *  grid-table-row grid-table-row-even).
 * '"><div class="hour-label ',Hour state (hl-odd, hl-even).
 * '">',Hour here (00:00).
 * '</div></div>',
 * // End of hours container.
 * '</div>',
 * // Grid table wrapper.
 * '<div id="grid-table-wrapper-wk" style="' +
 *      Margin of grid table wrapper (left or right) in pixels (40px).
 *     rflect.cal.i18n.predefined.GRID_TABLE_WRAPPER_WK_MARGIN,
 * // Grid rows container.
 * '"><div id="grid-rows-container" class="wk-grid-rows-cont" style="width:',
 *  Width of grid rows in percents (100%).
 * '%">',
 * // Individual row.
 * '<div class="',Grid row state (grid-table-row-odd,
 * grid-table-row-even).
 * '"></div>',
 * // End of grid rows container.
 * '</div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildHoursAndGridRows_ =
    function(aSb, aOffset) {

  var gridRowsWidth = rflect.math.pixelToPercent(
      this.blockPoolWeek_.gridSize.width,
      this.blockPoolWeek_.gridContainerSize.width);

  // Use cache, if available.
  if (rflect.cal.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER in this.cache_ &&
      rflect.cal.MainPaneBuilder.CACHE_KEY_GRID_ROWS in this.cache_) {
    aSb.append(this.cache_[
        rflect.cal.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER]);
    // Width of grid rows container.
    aSb.append(gridRowsWidth);
    aSb.append(this.cache_[
        rflect.cal.MainPaneBuilder.CACHE_KEY_GRID_ROWS]);
    return;
  }

  // First run, without cache.
  var sb = new goog.string.StringBuffer();
  var timeFormat = new goog.i18n.DateTimeFormat(
      goog.i18n.DateTimeSymbols.TIMEFORMATS[3]);
  var timeCounter = new goog.date.DateTime();
  var timeIncrement = new goog.date.Interval(0, 0, 0, 0, 30);
  timeCounter.setHours(0);
  timeCounter.setMinutes(0);
  timeCounter.setSeconds(0);

  for (var counter = 0; counter < 48; counter++,
      timeCounter.add(timeIncrement)) {
    if (counter > 0)
      sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
    //if (counter != 47)
    sb.append('grid-table-row ');
    if (counter % 2 == 0) {
      if (counter != 47)
        sb.append('grid-table-row-even');
      sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
      sb.append('hl-even');
    } else {
      if (counter != 47)
        sb.append('grid-table-row-odd');
      sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
      sb.append('hl-odd');
    }
    sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
    // Formatted time string.
    sb.append(timeFormat.format(timeCounter));
    sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
  }

  sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
  sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
  sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);

  // Save to cache.
  aSb.append(this.cache_[
      rflect.cal.MainPaneBuilder.CACHE_KEY_HOURS_CONTAINER] = sb.toString());
  sb.clear();

  // Width of grid rows container.
  aSb.append(gridRowsWidth);

  sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);

  for (var counter = 0; counter < 48; counter++) {
    sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 8]);
    sb.append('grid-table-row ');
    if (counter % 2 == 0) {
      if (counter != 47)
        sb.append('grid-table-row-even');
    } else {
      if (counter != 47)
        sb.append('grid-table-row-odd');
    }
    sb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 9]);
  }
  // Save to cache.
  aSb.append(this.cache_[
      rflect.cal.MainPaneBuilder.CACHE_KEY_GRID_ROWS] = sb.toString());
};


/**
 * Individual row.
 * '<div class=",Grid row state (grid-table-row grid-table-row-odd,
 * grid-table-row grid-table-row-even).
 * '"></div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildGridRows_ =
    function(aSb, aOffset) {
  for (var counter = 0; counter < 48; counter++) {
    if (counter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
    if (counter != 47)
      aSb.append('grid-table-row ');
    if (counter % 2 == 0) {
      aSb.append('grid-table-row-even');
    } else {
      aSb.append('grid-table-row-odd');
    }
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  }
};


/**
 * Builds week expand signs.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @param {number} aColCounter Number of column.
 * @private
 *
 * Expand sign.
 * '<div class="expand-sign-wk-cont"><div class="expand-sign-wk ',
 *  Expand sign state (expand-sign-wk-collapsed, expand-sign-wk-expanded).
 * '"></div></div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildWeekExpandSigns_ =
    function(aSb, aOffset, aColCounter) {
  var block = this.blockPoolWeek_.blocks[aColCounter];

  // Expand signs build.
  for (var counter = 0; counter <
      rflect.cal.predefined.WEEK_EXPAND_SIGNS_NUMBER;
      counter++) {
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
    aSb.append(!block.expanded && block.couldBeExpanded ?
        goog.getCssName('expand-sign-wk-collapsed') :
        (block.expanded && block.couldBeCollapsed ?
        goog.getCssName('expand-sign-wk-expanded') : ''));
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  }
};


/**
 * Builds html for grid table in week mode.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @private
 *
 * Grid table.
 * '<div class="' + goog.getCssName('grid-table-wk') + '" style="width:',
 *  Width of grid table in percents (100%).
 * '%">',
 */
rflect.cal.MainPaneBuilder.prototype.buildGridTableWeek_ =
    function(aSb, aOffset) {
  aSb.append(rflect.math.pixelToPercent(
      this.blockPoolWeek_.gridSize.width,
      this.blockPoolWeek_.gridContainerSize.width));
  aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
};


/**
 * Builds html for individual grid table col for week mode.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @private
 *
 * Individual weekgrid col.
 * '<div id="weekgrid-col',
 *Id of weekgrid col (0).
 * '" class="weekgrid-col',
 * Class of weekgrid col (weekgrid-col).
 * '" style="margin-left:',
 * Weekgrid col left margin
 * in percents (0).
 * '%;margin-right:',
 * Weekgrid col right margin
 * in percents (85.7143).
 * '%;top:',
 * Weekgrid col top position in percents (0).
 * '%">',
 * // Individual decoration layer.
 * '<div id="wk-dec-layer-in-col',Id of individual decoration layer
 * (wk-dec-layer-in-col0).
 * '" class="wk-decoration-layer">',
 * // Expand sign.
 * '<div class="expand-sign-wk-cont"><div class="expand-sign-wk ',
 *  Expand sign state (expand-sign-wk-collapsed, expand-sign-wk-expanded).
 * '"></div></div>',
 * // End of decoration layer.
 * '</div>',
 * // Individual events layer.
 * '<div id="wk-events-layer-col',Id of individual events layer (wk-events-layer-col0).
 * '" class="wk-events-layer">',
 * Events are here.
 * // End of individual events layer.
 * '</div>',
 * // End of individual weekgrid col.
 * '</div>',
 */
rflect.cal.MainPaneBuilder.prototype.buildWeekGridCols_ =
    function(aSb, aOffset) {

  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {
    if (colCounter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
    if (colCounter == blocksNumber - 1)
      aSb.append(' ' + goog.getCssName('weekgrid-col-last'));
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);

    // Margin left (for rtl).
    aSb.append(rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth).toFixed(4));

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
    // Margin right (for rtl).
    aSb.append((100 - rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth)).toFixed(4));

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
    aSb.append(-100 * colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);
    // Expand signs build.
    this.buildWeekExpandSigns_(aSb, aOffset + 8, colCounter);

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 10]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 11]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 12]);
    // Events are placed here.
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 13]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 14]);
  }
};


/**
 * Individual monthgrid row.
 * '<tr><td id="monthgrid-row',
 * Individual monthgrid row id (0).
 * '" class="monthgrid-row ',
 * Class of monthgrid row (monthgrid-row-last).
 * '" style="height:',
 * Individual monthgrid row height in pixels (69).
 * 'px;">',
 * '<div class="mn-layers-cont">',
 * // Individual decoration layer.
 * '<div id="mn-dec-layer-row',
 * Individual decoration layer id (0)
 * '" class="mn-decoration-layer">',
 * '<table cellspacing="0" cellpadding="0" class="daynums"><tbody><tr>',
 * // Individual daycell.
 * '<td class="daycell"><div class="expand-sign-mn-cont">',
 * '<div class="expand-sign-mn ',
 * Individual expand sign state
 * (expand-sign-mn-collapsed, expand-sign-mn-expanded).
 * '"></div>'
 * '</div>',
 * '<div class="daynum-cont"><div id="daynum-',
 * Id of daynum row (0).
 * Id of daynum col (0).
 * '" class="daynum-label '
 * Daynum state (dl-other-month).
 * '">'
 * Daynum name (26).
 * '</div>',
 * '</div>',
 * // End of individual daycell.
 * '</td>',
 * '</tr></tbody></table>',
 * // End of individual decoration layer.
 * '</div>',
 * // Individual events layer.
 * '<div id="mn-events-layer-row'
 * Individual events layer id (0).
 * '" class="mn-events-layer">',
 * Events are placed here.
 * // End of individual events layer.
 * '</div>',
 * '</div>',
 * // End of individual monthgrid row.
 * '</td></tr>',
 */
rflect.cal.MainPaneBuilder.prototype.buildMonthGridRows_ = function(aSb, aOffset) {

  for (var rowCounter = 0, rowsNumber = this.blockPoolMonth_.getBlocksNumber();
      rowCounter < rowsNumber;
      rowCounter++) {
    if (rowCounter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset]);
    aSb.append(rowCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 1]);
    if (rowCounter == rowsNumber - 1)
      aSb.append('monthgrid-row-last');
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 2]);
    // Height of month grid row.
    aSb.append(this.blockPoolMonth_.blocks[rowCounter].size -
        // Actual block height doesn't include border width.
        rflect.cal.predefined.MONTHGRID_ROW_BORDER_WIDTH);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 3]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 4]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 5]);
    aSb.append(rowCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 6]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 7]);

    // Build day cells containing expand signs and day numbers.
    this.buildDayCells_(aSb, aOffset + 8, rowCounter);

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 18]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 19]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 20]);
    aSb.append(rowCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 21]);
    // Events are placed here.
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 22]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 23]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 24]);
  }
};


/**
 * Individual daycell.
 * '<td class="daycell"><div class="expand-sign-mn-cont">',
 * '<div class="expand-sign-mn ',
 * Individual expand sign state
 * (expand-sign-mn-collapsed, expand-sign-mn-expanded).
 * '"></div>'
 * '</div>',
 * '<div class="daynum-cont"><div id="daynum-',
 * Id of daynum cell (0).
 * '" class="daynum-label '
 * Daynum state (dl-other-month).
 * '">'
 * Daynum name (26).
 * '</div>',
 * '</div>',
 * // End of individual daycell.
 * '</td>',
 */
rflect.cal.MainPaneBuilder.prototype.buildDayCells_ = function(aSb, aOffset,
    aRowCounter) {
  var daySeries = this.timeManager_.daySeries;
  var day;
  var block;
  var currentMonth = this.timeManager_.basis.getMonth();
  var isInMonthView = this.viewManager_.currentView ==
      rflect.cal.ViewType.MONTH;

  for (var colCounter = 0; colCounter < 7; colCounter++) {
    block = this.blockPoolMonth_.blocks[aRowCounter];

    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 1]);
    aSb.append(!block.expanded && block.couldBeExpanded ?
        goog.getCssName('expand-sign-mn-collapsed') :
        (block.expanded && block.couldBeCollapsed ?
        goog.getCssName('expand-sign-mn-expanded') : ''));
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 2]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 3]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 4]);
    aSb.append(aRowCounter * 7 + colCounter);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 5]);
    // Show days from another month differently.
    if (isInMonthView && currentMonth !=
        (day = daySeries[aRowCounter * 7 + colCounter]).getMonth())
      aSb.append(goog.getCssName('dl-other-month'));
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 6]);
    // Build daycell day number.
    aSb.append(daySeries[aRowCounter * 7 + colCounter].getDate());
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 7]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 8]);
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 9]);

  }
};


/**
 * Individual monthgrid col.
 * '<td class="weekgrid-col',
 * // Individual monthgrid col class.
 * '">&nbsp;</td>',
 */
rflect.cal.MainPaneBuilder.prototype.buildMonthGridCols_ = function(aSb, aOffset) {
  for (var counter = 0; counter < 7; counter++) {
    if (counter > 0)
      aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset]);
    if (counter == 6)
      aSb.append(' weekgrid-col-last');
    aSb.append(rflect.cal.MainPaneBuilder.HTML_PARTS_MONTH_[aOffset + 1]);
  }
};
