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
    aEventManager, aBlockPoolWeek, aBlockPoolAllday, aBlockPoolMonth,
    aContainerSizeMonitor, aNavigator, aTimeMarker) {
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
 * String parts for builder, for weekmode.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_ = [
  // Main pane.
  '<div id="main-pane" class="' + goog.getCssName('main-pane') + '">',
  // Header of main pane.
  '<div id="main-pane-header">',
  // Daynames zippy.
  '<div id="daynames-prefix-wk">',
  '<div id="daynames-zippy" class="zippy wk-ad-zippy octicon ',
  /* Zippy state is here
  (goog-zippy-collapsed, goog-zippy-expanded).*/
  '"></div>',
  '</div>',
  // Header container.
  '<div id="main-pane-header-container" class="' + goog.getCssName('main-pane-header-container-wk') + '">',
  // Daynames container.
  '<div id="main-pane-header-wk-daynames">',
  '<div id="weekmode-daynames-table" style="width:',
  /* Width of daynames table in percents (100). */
  '%">',
  // Individual dayname.
  '<div id="dayname',
  /*Dayname id is here (dayname0).*/
  '" class="' + goog.getCssName('dayname-wk') + '" style="margin-left:',
  /*Dayname left margin in percents (0).*/
  '%;margin-right:',
  /*Dayname right margin in percents (85.7143).*/
  '%;top:',
  /*Dayname top position in percents (0).*/
  '%"><span class="',
  /*Dayname label class (dayname-wk-inner).*/
  '">',
  /*Dayname is here (Monday).*/
  '</span>',
  '<div id="wk-zippy-col',/*Id of zippy (wk-zippy-col2).*/
    '" class="zippy wk-col-zippy octicon ',/*State of zippy
    (goog-zippy-expanded, goog-zippy-collapsed).*/
    '"></div>',
  '</div>',
  '</div>',
  '</div>',
  // Scrollable in header.
  '<div id="main-pane-header-scrollable" class="',
  /*Scrollable states (mphs-scroll-vert-off, mphs-scroll-horz-off,
   mphs-scroll-vert-on, mphs-scroll-horz-on).*/
  '" style="height:',
  /*Height of scrollable in pixels (100).*/
  'px;margin-right:',
  /*Margin that replaces scroll bar(16).*/
  'px">',
  // Allday events grid wrapper.
  '<div id="alldayevents-grid-wrapper">',
  // Allday events grid.
  '<div id="alldayevents-grid" style="height:',
  /*Allday grid height
  in pixels (200).*/
  'px;width:',
  /*Allday grid width in percents (120).*/
  '%">',
  // Masks.
  '<div id="wk-ad-mask-cnt"></div>',
  // Individual weekgrid col.
  '<div id="weekgrid-ad-col',
  /*Weekgrid ad col id is here (weekgrid-ad-col0).*/
  '" class="' + goog.getCssName('weekgrid-col') + '',
  /*Weekgrid col class (weekgrid-col).*/
  ' wk-ad-layers-cont-outer" style="margin-left:',
  /*Weekgrid ad col left margin in percents (0).*/
  '%;margin-right:',
  /*Weekgrid ad col right margin in percents (85.7143).*/
  '%;top:',
  /*Weekgrid ad col top position in percents (0).*/
  '%">',
  '<div class="' + goog.getCssName('wk-ad-layers-cont') + '">',
  // Individual decoration layer.
  '<div id="wk-ad-dec-layer-col',
  /*Decoration layer id (wk-ad-dec-layer-col0).*/
  '" class="' + goog.getCssName('wk-ad-decoration-layer') + '">',
  // Expand sign
  '<div class="' + goog.getCssName('expand-sign-wk-ad-cont') + '">',
  '<div class="' + goog.getCssName('expand-sign-wk-ad') + ' ' + goog.getCssName('icon') + ' ',
  /*Expand sign state is here
  (expand-sign-wk-ad-collapsed, expand-sign-wk-ad-expanded).*/
  '"></div></div>',
  // End of individual decoration layer.
  '</div>',

  // Individual event layer.
  '<div id="wk-ad-events-layer-col',/*Individual ad event layer id (wk-ad-events-layer-col0).*/
  '" class="' + goog.getCssName('wk-ad-events-layer') + '">',/*Events are here.*/
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
  '<div class="' + goog.getCssName('wk-col-zippy-cont') + '" style="margin-left:',/*Individual zippy left
  margin in percent (14.2857).*/
  '%;margin-right:',/*Individual zippy right margin in percent (71.4286).*/
  '%;top:',/*Individual zippy top in percent (0).*/
  '%">',
  '<div id="wk-zippy-col',/*Id of zippy (wk-zippy-col2).*/
  '" class="' + goog.getCssName('zippy') + ' ' + goog.getCssName('wk-col-zippy') + ' ' + goog.getCssName('icon-triangle') + ' ',/*State of zippy
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
  '"><div id="grid-table-cont">',
  // Hours container.
  '<div id="hours-container">',
  /*Time marker head
  (<div style="top: 200px;" class="time-marker-head"></div>).*/
  // Individual hour.
  '<div class="',/*Grid table row state (grid-table-row grid-table-row-odd,
  grid-table-row grid-table-row-even).*/
  '"><div class="' + goog.getCssName('hour-label') + ' ',/*Hour state (hl-odd, hl-even).*/
  '">',/*Hour here (00:00).*/
  '</div></div>',
  // End of hours container.
  '</div>',
  // Grid table wrapper.
  '<div id="grid-table-wrapper-wk">',
  // Grid rows container.
  '<div id="grid-rows-container" class="' + goog.getCssName('wk-grid-rows-cont') + '" style="width:',
  /* Width of grid rows in percents (100%). */
  '%">',
  // Individual row.
  '<div class="',/*Grid row state (grid-table-row-odd,
  grid-table-row-even).*/
  '"></div>',
  // End of grid rows container.
  '</div>',
  // Grid table.
  '<div class="' + goog.getCssName('grid-table-wk-outer') + '" style="width:',
  /* Width of grid table in percents (100%). */
  '%"><div id="grid-table-wk" class="' + goog.getCssName('grid-table-wk') + '">',
  // Masks.
  '<div id="wk-mask-cnt"></div>',
  // Individual weekgrid col.
  '<div id="weekgrid-col',
  /*Id of weekgrid col (0).*/
  '" class="' + goog.getCssName('weekgrid-col') + '',
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
  '" class="' + goog.getCssName('wk-decoration-layer') + '">',
  // Expand sign.
  '<div class="' + goog.getCssName('expand-sign-wk-cont') + '"><div class="' + goog.getCssName('expand-sign-wk') + ' ' + goog.getCssName('icon') + ' ',
  /* Expand sign state (expand-sign-wk-collapsed, expand-sign-wk-expanded).*/
  '"></div></div>',
  // Today mask.
  '<div class="' + goog.getCssName('today-mask-wk') + '"></div>',
  // End of decoration layer.
  '</div>',
  // Individual events layer.
  '<div id="wk-events-layer-col',/*Id of individual events layer (wk-events-layer-col0).*/
  '" class="' + goog.getCssName('wk-events-layer') + '">',
  /*Events are here.*/
  // Individual event chip
  '<div class="' + goog.getCssName('event-rect-wk') + '" style="top:',
  /*Chip top in pixels (30)*/
  'px; margin-left:',
  /*Chip margin-left in percents (33.3)*/
  '%; margin-right:',
  /*Chip margin-right in percents (33.3)*/
  '%; height:',
  /*Chip height in pixels (30)*/
  'px; margin-bottom:',
  /*Chip margin-bottom in pixels (-30)*/
  'px;z-index:',
  /*Chip z-index (1)*/
  '"><div class="' + goog.getCssName('event-rect-wk-inner') + ' ',
  /*Chip inner class (event-rect-focused)*/
  '"><span class="' + goog.getCssName('event-wk-timelabel') + '">',
  /*Chip start time (14:00)*/
  ' - ',
  /*Chip end time (00:00)*/
  '</span>&nbsp;',
  /*Chip description (Conference)*/
  '</div></div>',
  // End of individual event chip.
  // End of individual events layer.
  '</div>',
  // End of individual weekgrid col.
  '</div>',
  // End of grid table.
  '</div>',
  // End of grid table cont.
  '</div>',
  // End of grid table wrapper.
  '</div>',
  // End of main pane scrollable body.
  '</div></div>',

  // End of main pane.
  '</div>'
];


/**
 * String parts for builder, for monthmode.
 * @type {Array.<string>}
 * @private
 * @const
 */
rflect.cal.ui.MainPaneBuilder.HTML_PARTS_MONTH_ = [
  // Main pane.
  '<div id="main-pane" class="' + goog.getCssName('main-pane') + '">',
  // Header of main pane.
  '<div id="main-pane-header">',
  '<div id="daynames-prefix-mn">',
  '</div>',
  '<div id="main-pane-header-container" class="' + goog.getCssName('main-pane-header-container-mn') + '">',
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
  '<div class="' + goog.getCssName('mn-row-zippy-cont') + '">',
  '<div id="mn-zippy-row',
  /*Id of individual zippy (0)*/
  '" class="zippy mn-row-zippy octicon ',
  /*State of individual zippy (mn-row-zippy-collapsed).*/
  '"></div>',
  '</div>',
  // End of individual month zippy.
  '</td></tr>',
  '</tbody></table>',
  '</div>',
  // Main pane scrollable.
  '<div id="main-pane-body-scrollable-mn" class="main-pane-body-scrollable-mn ',
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
  '" class="' + goog.getCssName('weeknum-label') + '" style="height:',
  /* Height of individual weeknum in pixels (70).*/
  'px;"><span class="' + goog.getCssName('weeknum-label-inner') + '">',
  /* Name of individual weeknum (10).*/
  // End of individual weeknum.
  '</span></td></tr>',
  '</table>',
  '</div>',
  // Grid table wrapper.
  '<div id="grid-table-wrapper-mn">' +
      // Masks.
      '<div id="mn-mask-cnt"></div>',
  '<div id="grid-cols-container" class="' + goog.getCssName('mn-grid-cols-cont') + '">' +
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
      goog.getCssName('grid-table-mn') + '">',
  '<tbody>',
  // Individual monthgrid row.
  '<tr><td id="monthgrid-row',
  /*Individual monthgrid row id (0).*/
  '" class="' + goog.getCssName('monthgrid-row') + ' ',
  /*Class of monthgrid row (monthgrid-row-last).*/
  '" style="height:',
  /*Individual monthgrid row height in pixels (69).*/
  'px;">',
  '<div class="' + goog.getCssName('mn-layers-cont') + '">',
  // Individual decoration layer.
  '<div id="mn-dec-layer-row',
  /*Individual decoration layer id (0)*/
  '" class="' + goog.getCssName('mn-decoration-layer') + '">',
  '<table cellspacing="0" cellpadding="0" class="' + goog.getCssName('mn-row-zippy') + '"><tbody><tr>',
  // Individual daycell.
  '<td class="' + goog.getCssName('daycell') + '"><div class="' + goog.getCssName('daycell-decoration-cont') + '">',
  '<div class="' + goog.getCssName('today-mask-mn') + '"></div>',
  /*Decoration container content (<div class="today-mask-mn"></div>).*/
  '</div><div class="' + goog.getCssName('daycell-daynum-outer-cont') + '"><div class="' + goog.getCssName('expand-sign-mn-cont') + '"><div class="' + goog.getCssName('expand-sign-mn') + ' ' + goog.getCssName('icon') + ' ',
  /*Individual expand sign state
  (expand-sign-mn-collapsed, expand-sign-mn-expanded).*/
  '"></div>',
  '</div>',
  '<div class="' + goog.getCssName('daynum-cont') + '"><div id="daynum-',
  /*Id of daynum row (0).*/
  /*Id of daynum col (0).*/
  '" class="' + goog.getCssName('daynum-label') + ' ',
  /*Daynum state (dl-other-month).*/
  '">',
  /*Daynum name (26).*/
  '</div>',
  '</div></div>',
  // End of individual daycell.
  '</td>',
  '</tr></tbody></table>',
  // End of individual decoration layer.
  '</div>',
  // Individual events layer.
  '<div id="mn-events-layer-row',
  /*Individual events layer id (0).*/
  '" class="' + goog.getCssName('mn-events-layer') + '">',
  /*Events are placed here.*/
  // Individual event chip.
  '<div style="margin-left:',
  /*margin-left in percent(0)*/
  '%; margin-right:',
  /*margin-right in percent(0)*/
  '%;top:',
  /*top (17px)*/
  'px" class="' + goog.getCssName('event-rect-mn-outer') + '"><div class="' + goog.getCssName('event-rect-mn') + ' ',
  /*additional classes (event-rect-mn-collapse-left)*/
  '"><div class="' + goog.getCssName('event-rect-mn-inner') + ' ',
  /*additional classes (event-rect-mn-inner-blue)*/
  '">',
  /*event description (week of javascript)*/
  '</div></div></div>',
  // End of individual event chip.
  // End of individual events layer.
  '</div>',
  '</div>',
  // End of individual monthgrid row.
  '</td></tr>',
  '</tbody>',
  // End of grid table.
  '</table>',
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
 * @param {boolean} aFirstBuild Whether we build for the fist time.
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildBodyInternalWeek = function(aSb,
    aFirstBuild) {
  // Form html. From index 1 (see offset increment before append), because 0
  // is the html of outer container, which we don't create in that method but
  // just decorate.
  var offset = 0;
  var length = rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_.length;
  var isSmallScreen = this.navigator_.isSmallScreen();

  while (++offset < length - 1) {
    // We move through parts array and increment offset. Each cycle, we append
    // some part and increment offset by 1. Sometimes we find special case when
    // we need to build some subpart and give control of building it to some
    // method. Because this method could shift offset down as it 'eats' some
    // array items, we reflect it here by incrementing offset by more than 1,
    // or not incrementing at all, according to the number of 'eaten' parts.
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[offset]);

    switch (offset) {
      case 1: if (isSmallScreen) {
        //Skipping main pane header.
        offset += 65;
      };break;
      case 2: if (!rflect.VERTICAL_EXPAND_ENABLED) {
        //Skipping all day zippy.
        offset += 2;
      };break;
      case 3: {
        this.buildDayNamesZippy_(aSb, offset);
      };break;
      case 8: {
        this.buildDayNamesWeek_(aSb, offset);
        offset += 12;
      };break;
      case 23: {
        this.buildScrollableAllday_(aSb, offset);
          offset += 3;
      };break;
      case 26: {
        if (aFirstBuild)
          offset += 26;
      };break;
      case 28: {
        this.buildAllDayGrid_(aSb, offset);
        offset += 2;
      };break;
      case 32: {
        this.buildWeekGridAdCols_(aSb, offset);
        offset += 17;
      };break;
      case 52: {
        //Skipping week col zippies.
        offset += 13;
      };break;
      case 68: {
        this.buildScrollableWeek_(aSb, offset);
        offset++;
      };break;
      case 70: {
        if (aFirstBuild)
          offset += 45;
      };break;
      case 71: {
        this.timeMarker_.buildHead(aSb);
      };break;
      case 72: {
        this.buildHoursAndGridRows_(aSb, offset);
        offset += 9;
      };break;
      case 83: {
        this.buildGridTableWeek_(aSb, offset);
        offset++;
      };break;
      case 86: {
        this.buildWeekGridCols_(aSb, offset);
        offset += 26;
      };break;
      default: break;
    }

  }

  var gridWidth = this.blockPoolWeek_.gridSize.width;

  return rflect.cal.ui.soy.mainpane.mainPaneWeek({
    isSmallScreen: this.navigator_.isSmallScreen(),
    includeOuterHTML: false,
    allDayExpanded: this.blockPoolAllDay_.expanded,
    weekPoolExpanded: this.blockPoolWeek_.expanded,
    allDayGridContainerHeight: this.blockPoolAllDay_.gridContainerSize.height,
    allDayGridWidth: rflect.math.pixelToPercent(gridWidth,
        this.blockPoolAllDay_.gridContainerSize.width).toFixed(4),
    allDayGridHeight: this.blockPoolAllDay_.gridSize.height,
    gridWidth: rflect.math.pixelToPercent(this.blockPoolWeek_.gridSize.width,
        this.blockPoolWeek_.gridContainerSize.width),
    navigatorScrollBarWidth: this.navigator_.getScrollbarWidth(),
    verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
    horizontalExpandEnabled: rflect.HORIZONTAL_EXPAND_ENABLED,
    dayNamesHTML: this.buildDayNamesWeek_(),
    weekGridAdColsHTML: this.buildWeekGridAdCols_(),
    timeMarkerHeadHTML: this.timeMarker_.buildHead(),
    hourRowsHTML: this.buildHourRows_(),
    gridRowsHTML: this.buildGridRows_(),
    weekGridColsHTML: this.buildWeekGridCols_()
  });
};


/**
 * Builds internals of week grid.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekGrid = function(aSb) {
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[85]);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[86]);
  this.buildWeekGridCols_(aSb, 86);
}


/**
 * Builds internals of all day grid.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildAllDayGrid = function(aSb) {
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[31]);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[32]);
  this.buildWeekGridAdCols_(aSb, 32);
}


/**
 * Builds internals of all day grid.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMonthGrid = function(aSb) {
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_MONTH_[48]);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_MONTH_[49]);
  this.buildMonthGridRows_(aSb, 49);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_MONTH_[80]);
}


/**
 * Builds body of component in month mode.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @param {boolean} aFirstBuild Whether we build for the fist time.
 * @see rflect.cal.ui.MainPaneBuilder#buildBodyInternalWeek
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildBodyInternalMonth = function(aSb,
    aFirstBuild) {
  var offset = 0;
  var length = rflect.cal.ui.MainPaneBuilder.HTML_PARTS_MONTH_.length;
  var isSmallScreen = this.navigator_.isSmallScreen();

  while (++offset < length - 1) {
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_MONTH_[offset]);
    if (isSmallScreen) {
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
        case 16: {
          offset += 13;
        };break;
        case 30: {
          this.buildScrollableMonth_(aSb, offset);
        };break;
        case 31: {
          if (aFirstBuild)
            offset += 54;
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
        case 49: {
          this.buildMonthGridRows_(aSb, offset);
          offset += 32;
        };break;
        default: break;
      }
    } else {
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
        case 16: {
          if (!rflect.VERTICAL_EXPAND_ENABLED) {
            offset += 13;
          }
        };break;
        case 19: {
          this.buildMnRowZippies_(aSb, offset);
          offset += 7;
        };break;
        case 30: {
          this.buildScrollableMonth_(aSb, offset);
        };break;
        case 31: {
          if (aFirstBuild)
            offset += 55;
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
        case 49: {
          this.buildMonthGridRows_(aSb, offset);
          offset += 32;
        };break;
        default: break;
      }
    }

  }

  var gridWidth = this.blockPoolWeek_.gridSize.width;

  return rflect.cal.ui.soy.mainpane.mainPaneMonth({
    isSmallScreen: this.navigator_.isSmallScreen(),
    includeOuterHTML: false,
    monthPoolExpanded: this.blockPoolWeek_.expanded,
    gridWidth: rflect.math.pixelToPercent(this.blockPoolWeek_.gridSize.width,
        this.blockPoolWeek_.gridContainerSize.width),
    gridContainerHeight: this.blockPoolMonth_.gridContainerSize.height,
    gridHeight: this.blockPoolMonth_.gridSize.height,
    navigatorScrollBarWidth: this.navigator_.getScrollbarWidth(),
    verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
    horizontalExpandEnabled: rflect.HORIZONTAL_EXPAND_ENABLED,
    dayNamesHTML: this.buildDayNamesMonth_(),
    weekNumsHTML: this.buildWeekNumbers_(),
    monthGridColsHTML: this.buildMonthGridCols_(),
    monthGridRowsHTML: this.buildMonthGridRows_()
  });
};


/**
 *
 * <pre>
 * '<div id="daynames-zippy" class="zippy ',Zippy state is here
 *(goog-zippy-collapsed, goog-zippy-expanded).
 * '"></div>',
 * </pre>
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildDayNamesZippy_ =
    function(aSb, aOffset) {
  aSb.append(this.blockPoolAllDay_.expanded ?
      'wk-ad-zippy-expanded octicon-triangle-down' :
      'wk-ad-zippy-collapsed octicon-triangle-right');
};


/**
 * Individual dayname.
 * '<div id="dayname',Dayname id is here (dayname0).
 * '" class="dayname-wk" style="margin-left:',Dayname position left edge
 * margin in percents (0).
 *'%;margin-right:',/*Dayname right margin in percents
 * (85.7143).
 * '%;top:',
 * Dayname top position in percents (0).
 * '%"><span class="',
 * Dayname label class (dayname-wk-inner).
 * '">',
 * Dayname is here (Monday).,
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildDayNamesWeek_ =
    function(aSb, aOffset) {
  var daySeries = this.timeManager_.daySeries;
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  var str = '';
  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {

    var data = {
      colNumber: colCounter,
      marginLeft: rflect.math.pixelToPercent(prevColsCumulativeSize,
          gridWidth).toFixed(4);
      top: -100 * colCounter,
      howManyBlocks: blocksNumber,
      horizontalExpandEnabled: rflect.HORIZONTAL_EXPAND_ENABLED,
      dayZippyExpanded: this.blockPoolWeek_.blocks[colCounter].expanded
    };

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    data.marginRight = (100 - rflect.math.pixelToPercent(prevColsCumulativeSize,
        gridWidth)).toFixed(4);

    str += rflect.cal.ui.soy.mainpane.dayNameEntry(data);
  }
  return str;
};


/**
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Current offset.
 * @param {number} aColCounter Column number.
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekColZippy_ = function(aSb,
    aOffset, aColCounter) {
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  aSb.append(aColCounter);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
  aSb.append(this.blockPoolWeek_.blocks[aColCounter].expanded ?
      'wk-col-zippy-expanded octicon-triangle-right' :
      'wk-col-zippy-collapsed octicon-triangle-down');
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
}

 /**
 *'<div id="main-pane-header-wk-daynames" style="margin-right:>',
 *  Main pane header container margin left (19).
 * 'px"><table id="weekmode-daynames-table" cellspacing="0" cellpadding="0">',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMainPaneHeaderMonth_ = function(aSb) {
  if (this.blockPoolMonth_.expanded)
    aSb.append(this.navigator_.getScrollbarWidth() +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2);
  else
    aSb.append(rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2);
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

    rflect.cal.ui.soy.mainpane.dayNameEntryMonth({
      colNumber: counter,
      label: this.navigator_.isSmallScreen() ?
          goog.i18n.DateTimeSymbols.SHORTWEEKDAYS[dayNameNumber] :
          goog.i18n.DateTimeSymbols.WEEKDAYS[dayNameNumber]
    });

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
rflect.cal.ui.MainPaneBuilder.prototype.buildScrollableAllday_ =
    function(aSb, aOffset) {
  if (this.blockPoolAllDay_.expanded)
    aSb.append(goog.getCssName('mphs-scroll-vert-on') + ' ');
  else
    aSb.append(goog.getCssName('mphs-scroll-vert-off') + ' ');
  if (this.blockPoolWeek_.expanded)
    aSb.append(goog.getCssName('mphs-scroll-horz-on'));
  else
    aSb.append(goog.getCssName('mphs-scroll-horz-off'));
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  // Size of allday scrollable.
  aSb.append(this.blockPoolAllDay_.gridContainerSize.height);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
  // Margin that replaces scrollbar.
  if (this.blockPoolAllDay_.expanded)
    aSb.append(0);
  else
    aSb.append(this.navigator_.getScrollbarWidth() - 1);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
};


/**
 * Main pane scrolalble wrapper.
 * '<div id="main-pane-body-scrollable-wrapper" style="height:',
 * Height of scrollable wrapper in pixels (420).
 * 'px;">',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildScrollableWrapperMn_ =
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
rflect.cal.ui.MainPaneBuilder.prototype.buildAllDayGrid_ = function(aSb, aOffset) {
  // Height of allday grid.
  aSb.append(this.blockPoolAllDay_.gridSize.height);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  // Width of allday grid.
  aSb.append(rflect.math.pixelToPercent(
      this.blockPoolWeek_.gridSize.width,
      this.blockPoolAllDay_.gridContainerSize.width)
      .toFixed(4));
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
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
      blocksNumber: blocksNumber,
      marginLeft: rflect.math.pixelToPercent(prevColsCumulativeSize,
        gridWidth).toFixed(4),
      top: -100 * colCounter,
      adChipsHTML: rflect.cal.ui.MainPaneBuilder.buildAdBlockChips_(
          sparseArrays[colCounter], this.eventManager_);
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
 */
rflect.cal.ui.MainPaneBuilder.buildAdBlockChips_ =
    function(aChips, aEventManager) {
  var chip;
  var str = '';
  for (var chipCounter = 0, length = aChips.length; chipCounter < length;
      chipCounter++) {
    if (chip = aChips[chipCounter]) {
      // Zero parameters because they are currently irrelevant for month chip.
      str += rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip_(
          aEventManager, chip, 0, chipCounter, 0, true);
    }
  }
  return str;
}


/**
 * // Expand sign
 * '<div class="expand-sign-wk-ad-cont">',
 * '<div class="expand-sign-wk-ad ',Expand sign state is here
 * (expand-sign-wk-ad-collapsed, expand-sign-wk-ad-expanded).
 * '"></div></div>',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWkAdExpandSign_ =
    function(aSb, aOffset) {
  var block = this.blockPoolAllDay_.blocks[0];

  // Expand signs build.
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  aSb.append(!block.expanded && block.couldBeExpanded ?
      goog.getCssName('expand-sign-wk-ad-collapsed') :
      (block.expanded && block.couldBeCollapsed ?
      goog.getCssName('expand-sign-wk-ad-expanded') : ''));
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
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
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekColZippies_ =
    function(aSb, aOffset) {
  var prevColsCumulativeSize = 0;
  var gridWidth = this.blockPoolWeek_.gridSize.width;

  // Zippies table width.
  aSb.append(rflect.math.pixelToPercent(gridWidth,
      this.blockPoolWeek_.gridContainerSize.width).toFixed(4));
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);

  for (var colCounter = 0, blocksNumber = this.blockPoolWeek_.getBlocksNumber();
      colCounter < blocksNumber;
      colCounter++) {
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);

    // Margin left (for rtl).
    aSb.append(rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth).toFixed(4));

    prevColsCumulativeSize += this.blockPoolWeek_.blocks[colCounter].size;

    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
    // Margin right (for rtl).
    aSb.append((100 - rflect.math.pixelToPercent(
        prevColsCumulativeSize, gridWidth)).toFixed(4));

    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
    aSb.append(-100 * colCounter);
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);
    aSb.append(colCounter);
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);
    aSb.append(this.blockPoolWeek_.blocks[colCounter].expanded ?
        'wk-col-zippy-expanded octicon-triangle-right' :
        'wk-col-zippy-collapsed octicon-triangle-down');
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 8]);
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 9]);
  }
};


/**
 * Individual month mode zippy.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMnRowZippies_ =
    function(aSb, aOffset) {
  var str = '';
  for (var rowCounter = 0, blocksNumber =
      this.blockPoolMonth_.getBlocksNumber(); rowCounter < blocksNumber;
      rowCounter++) {
    let block = this.blockPoolMonth_.blocks[rowCounter].size
    str += rflect.cal.ui.soy.mainpane.monthZippy({
      index: rowCounter,
      block: block
    })
  }
  return str;
};


/**
 * Main pane scrollable.
 * '<div id="main-pane-body-scrollable-mn" class="'
 * Main pane scrollable state
 * (mpbs-mn-scroll-vert-off, mpbs-mn-scroll-vert-on).
 * '">',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildScrollableMonth_ =
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
rflect.cal.ui.MainPaneBuilder.prototype.buildScrollableWeek_ =
    function(aSb, aOffset) {
  // Height of scrollable.
  aSb.append(this.blockPoolWeek_.gridContainerSize.height);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
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
rflect.cal.ui.MainPaneBuilder.prototype.buildGridTableWrapperOuter_ =
    function(aSb, aOffset) {
  // Height of grid table wrapper outer.
  aSb.append(this.blockPoolMonth_.gridSize.height);
};


/**
 * Individual weeknum.
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekNumbers_ =
    function(aSb, aOffset) {
  var str = '';

  for (var rowCounter = 0, blocksNumber =
      this.blockPoolMonth_.getBlocksNumber();
      rowCounter < blocksNumber;
      rowCounter++) {

    str += rflect.cal.ui.soy.mainpane.weekNum({
      rowNumber: rowCounter,
      height: this.blockPoolMonth_.blocks[rowCounter].size,
      label: this.timeManager_.daySeries[rowCounter * 7]
    });

  }

  return str;
};


/**
 * Builds hours.
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
 * Individual row.
 * '<div class=",Grid row state (grid-table-row grid-table-row-odd,
 * grid-table-row grid-table-row-even).
 * '"></div>',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildGridRows_ =
    function(aSb, aOffset) {
  for (var counter = 0; counter < rflect.cal.predefined.HOUR_ROWS_NUMBER;
      counter++) {
    if (counter > 0)
      aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
    if (counter != 47)
      aSb.append(goog.getCssName('grid-table-row') + ' ');
    if (counter % 2 == 0) {
      aSb.append(goog.getCssName('grid-table-row-even'));
    } else {
      aSb.append(goog.getCssName('grid-table-row-odd'));
    }
    aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
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
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekExpandSigns_ =
    function(aSb, aOffset, aColCounter) {
  var block = this.blockPoolWeek_.blocks[aColCounter];
  var str = '';

  // Expand signs build.
  for (var counter = 0; counter <
      rflect.cal.predefined.WEEK_EXPAND_SIGNS_NUMBER;
      counter++) {
    str += rflect.cal.ui.soy.mainpane.weekExpandSign({
      block: block
    });
};


/**
 * Builds html for grid table in week mode.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @private
 *
 * Grid table.
 * '<div class="grid-table-wk-outer" style="width:',
 * Width of grid table in percents (100%). 
 * '%"><div id="grid-table-wk" class="' + goog.getCssName('grid-table-wk') + '">',
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildGridTableWeek_ =
    function(aSb, aOffset) {
  aSb.append(rflect.math.pixelToPercent(
      this.blockPoolWeek_.gridSize.width,
      this.blockPoolWeek_.gridContainerSize.width));
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
};


/**
 * Builds html for individual grid table col for week mode.
 * @private
 * @return {string}
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildWeekGridCols_ =
    function(aSb, aOffset) {
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
         rflect.cal.ui.soy.mainpane.weekExpandSign(block) : '',
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
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {number} aOffset Passed offset.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.events.Chip} aChip Chip to build.
 * @param {number} aTotalCols How many cols are in this chip's blob.
 * @param {number} aStartCol In which col chip starts.
 * @param {number} aColSpan How many cols chip spans.
 * @private
 *
 * Individual event chip
 * '<div class="event-rect-wk" style="top:',
 * Chip top in pixels (30)
 * 'px; margin-left:',
 * Chip margin-left in percents (33.3)
 * '%; margin-right:',
 * Chip margin-right in percents (33.3)
 * '%; height:',
 * Chip height in pixels (30)
 * 'px; margin-bottom:',
 * Chip margin-bottom in pixels (-30)
 * 'px;z-index:',
 * Chip z-index (1)
 * '"><div class="event-rect-wk-inner ',
 * Chip inner class (event-rect-focused)
 * '"><div class="event-wk-timelabel">',
 * Chip start time (14:00)
 * ' - ',
 * Chip end time (00:00)
 * '</div>',
 * Chip description (Conference)
 * '</div></div>',
 * // End of individual event chip.
 */
rflect.cal.ui.MainPaneBuilder.buildWeekBlockChip_ =
    function(aEventManager, aChip, aTotalCols, aStartCol,
    aColSpan) {
  var pixelStart = aChip.start * rflect.cal.predefined.HOUR_ROW_HEIGHT / 30;
  var pixelHeight = (aChip.end - aChip.start) *
      rflect.cal.predefined.HOUR_ROW_HEIGHT / 30;
  var widthQuant = 100 / aTotalCols;
  var event = aEventManager.getEventById(aChip.eventId);
  var coversLastCol = aStartCol + aColSpan == aTotalCols;

  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset]);
  aSb.append(pixelStart);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 1]);
  // margin-left.
  var shift = widthQuant * aStartCol ;
  aSb.append(/*lastCol ? shift * 2  : */shift);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 2]);
  // margin-right.
  var width = shift + widthQuant * ( aColSpan +
      rflect.cal.predefined.chips.OVERLAPPING_DEGREE);
  if (coversLastCol)
    width -= widthQuant * rflect.cal.predefined.chips.OVERLAPPING_DEGREE;
  aSb.append(100 - width);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 3]);
  // Height.
  aSb.append(pixelHeight -
      (aChip.startIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) -
      (aChip.endIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) -
      rflect.cal.predefined.chips.PADDING_TOP);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 4]);
  // margin-bottom.
  aSb.append(-pixelHeight +
      (aChip.startIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) +
      (aChip.endIsCut ? 0 : rflect.cal.predefined.DEFAULT_BORDER_WIDTH) +
      rflect.cal.predefined.chips.PADDING_TOP);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 5]);
  // z-index.
  aSb.append(aStartCol);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 6]);
  // Class that identify event.
  aSb.append(rflect.cal.predefined.chips.CHIP_EVENT_CLASS);
  aSb.append(aChip.eventId);
  // Additional classes.
  if (aChip.startIsCut)
    aSb.append(' ' + goog.getCssName('event-rect-wk-collapse-top'));
  if (aChip.endIsCut)
    aSb.append(' ' + goog.getCssName('event-rect-wk-collapse-bottom'));
  // Color class
  aSb.append(' ' + aChip.colorClass);
  if (aEventManager.eventIsInProgress(aChip.eventId))
    aSb.append(' ' + goog.getCssName('event-in-progress'));
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 7]);
  // Start time.
  rflect.cal.ui.MainPaneBuilder.buildWeekChipsTimeLabel_(aSb, aChip, true);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 8]);
  // End time.
  rflect.cal.ui.MainPaneBuilder.buildWeekChipsTimeLabel_(aSb, aChip, false);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 9]);
  // Description.
  aSb.append(event.summary || rflect.cal.i18n.Symbols.NO_NAME_EVENT);
  aSb.append(rflect.cal.ui.MainPaneBuilder.HTML_PARTS_WEEK_[aOffset + 10]);
}


/**
 * Builds html for individual month chip.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.events.Chip} aChip Chip to build.
 * @param {number} aTotalCols How many cols are in this chip's blob.
 * @param {number} aStartCol In which col chip starts.
 * @param {number} aColSpan How many cols chip spans.
 * @param {boolean=} opt_allDay Whether this is all-day chip.
 * @private
 */
rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip_ =
    function(aEventManager, aChip, aTotalCols, aStartCol,
    aColSpan, opt_allDay) {
  return rflect.cal.ui.soy.mainpane.monthChip({
    chip: aChip,
    event: aEventManager.getEventById(aChip.eventId),
    eventIsInProgress: aEventManager.eventIsInProgress(aChip.eventId),
    startCol: startCol,
    opt_allDay: opt_allDay
  });
}


/**
 * Builds time label for chip.
 * @param {goog.string.StringBuffer} aSb Passed string buffer.
 * @param {rflect.cal.events.Chip} aChip Chip.
 * @param {boolean} aStart Whether label is for start.
 * @private
 */
rflect.cal.ui.MainPaneBuilder.buildWeekChipsTimeLabel_ =
    function(aSb, aChip, aStart) {
  var edgeIsCut = aStart && aChip.startIsCut || !aStart && aChip.endIsCut;
  var totalMins = aStart ? aChip.start : aChip.end;
  if (edgeIsCut || totalMins >= 1440)
    aSb.append('00:00');
  else {
    var mins = totalMins % 60;
    var hours = (totalMins - mins) / 60;
    if (hours < 10) aSb.append('0');
    aSb.append(hours);
    aSb.append(':');
    if (mins < 10) aSb.append('0');
    aSb.append(mins);
  }
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
      rflect.cal.ui.MainPaneBuilder.buildWeekBlockChip_);
}


/**
 * Builds html for chips for particular block.
 * @param {rflect.cal.blocks.Block} aBlock Block.
 * @private
 */
rflect.cal.ui.MainPaneBuilder.prototype.buildMonthBlockChips_ =
    function(aBlock) {
  rflect.cal.ui.MainPaneBuilder.buildChips_(this.eventManager_, aBlock,
      rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip_);
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
rflect.cal.ui.MainPaneBuilder.buildChips_ =
    function(aEventManager, aBlock, aChipBuilder) {
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
  var str = '',
  for (var rowCounter = 0, rowsNumber = this.blockPoolMonth_.getBlocksNumber();
      rowCounter < rowsNumber;
      rowCounter++) {
    rflect.cal.ui.soy.mainpane.monthGridRow({
      rowNumber: rowCounter,
      howManyBlocks: rowsNumber,
      height: this.blockPoolMonth_.blocks[rowCounter].size -
          // Actual block height doesn't include border width.
          rflect.cal.predefined.MONTHGRID_ROW_BORDER_WIDTH,
      dayCellsHTML: this.buildDayCells_(rowCounter),
      monthChipsHTML: this.buildMonthBlockChips_(rowCounter),
      verticalExpandEnabled: rflect.VERTICAL_EXPAND_ENABLED,
    });
  }
  return str;
};


/**
 * Individual day cell.
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
    str += rflect.cal.ui.soy.mainpane.weekGridCol({
      last: counter == 6
    });
  }
  return str;
};
