/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Set of predefined constants for component. Corresponds to file.
 * TODO(alexk): get rid of most of these constants, as there's no hardcode
 * anymore.
 * @see {../../../css/rflectcalendar.css}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.require('goog.math.Size');

goog.provide('rflect.cal.predefined');
goog.provide('rflect.cal.predefined.chips');
goog.provide('rflect.cal.predefined.MainPane.ELEMENT_ID');
goog.provide('rflect.cal.predefined.CalendarEditPane');
goog.provide('rflect.cal.predefined.ScreenManager');


//TODO(alexk): much of this file will go to cfg
/**
 * @define {string} UI type constant. Defined on compile time.
 */
rflect.UI_TYPE = '';


/**
 * Whether ui type is mobile.
 * @type {boolean}
 * @const
 */
rflect.MOBILE = rflect.UI_TYPE == 'MOBILE';


/**
 * Feature flag - whether horizontal expand is possible through UI.
 * @define {boolean}
 */
rflect.HORIZONTAL_EXPAND_ENABLED = false;


/**
 * Feature flag - whether vertical expand is possible through UI.
 * @define {boolean}
 */
rflect.VERTICAL_EXPAND_ENABLED = false;


/**
 * Feature flag - whether side pane can be hidden for big screen.
 * @type {boolean}
 */
rflect.SIDE_PANE_MOVABLE = !rflect.HORIZONTAL_EXPAND_ENABLED && true;


/**
 * Feature flag - whether larger targets enabled, for touch.
 * @type {boolean}
 */
rflect.TOUCH_INTERFACE_ENABLED = rflect.MOBILE;


/**
 * Feature flag - whether non-native scroller enabled.
 * @type {boolean}
 */
rflect.ARTIFICIAL_SCROLLER_ENABLED = goog.userAgent.IPHONE ||
    goog.userAgent.IPAD;


/**
 * Whether wireless communication is used.
 * @type {boolean}
 */
rflect.WIRELESS_COMMUNICATION_IS_USED = rflect.MOBILE;


/**
 * Whether horizontal blocks are expanded by default.
 * @type {boolean}
 * @const
 */
rflect.HORIZONTAL_EXPAND_DEFAULT_STATE = false;


/**
 * Whether vertical blocks are expanded by default. If zippy UI for vertical
 * expand is disabled, make expand enabled.
 * @type {boolean}
 * @const
 */
rflect.VERTICAL_EXPAND_DEFAULT_STATE = !rflect.VERTICAL_EXPAND_ENABLED;


/**
 * Body margin top in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.BODY_MARGIN_TOP = 8;


/**
 * Body margin top in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.BODY_MARGIN_BOTTOM = 0;


/**
 * Body margin left in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.BODY_MARGIN_LEFT = 8;


/**
 * Body margin right in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.BODY_MARGIN_RIGHT = 8;


/**
 * Top pane height in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.TOP_PANE_HEIGHT = 48;


/**
 * Width of side pane, in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.SIDE_PANE_WIDTH = 150;


/**
 * Main pane header (a place where weekday names are placed) height in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MAIN_PANE_HEADER_HEIGHT = 20;


/**
 * Main pane header weekmode zippies table height in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MAIN_PANE_HEADER_ZIPPIES_WEEK_HEIGHT = 11;


/**
 * Default border width.
 * @type {number}
 * @const
 */
rflect.cal.predefined.DEFAULT_BORDER_WIDTH = 1;


/**
 * Main pane scrollable border width in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MAIN_PANE_BODY_SCROLLABLE_BORDER_WIDTH = 1;


/**
 * Month grid row border width which should be subtracted from height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MONTHGRID_ROW_BORDER_WIDTH = 1;


/**
 * Difference between outer container and main scrollable heights in month mode,
 * in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_HEIGHT_DIFFERENCE_MONTH =
    rflect.cal.predefined.BODY_MARGIN_TOP +
    rflect.cal.predefined.BODY_MARGIN_BOTTOM +
    rflect.cal.predefined.TOP_PANE_HEIGHT +
    rflect.cal.predefined.MAIN_PANE_HEADER_HEIGHT +
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2;


/**
 * Width of month weeknumbers container.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_NUMBERS_CONTAINER_WIDTH = 15;


/**
 * Width of month zippies.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MONTH_ZIPPIES_WIDTH = 12;


/**
 * Difference between outer container and main scrollable widths in month mode,
 * in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_WIDTH_DIFFERENCE_MONTH =
    rflect.cal.predefined.BODY_MARGIN_LEFT +
    rflect.cal.predefined.BODY_MARGIN_RIGHT +
    rflect.cal.predefined.SIDE_PANE_WIDTH +
    rflect.cal.predefined.WEEK_NUMBERS_CONTAINER_WIDTH +
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH +
    rflect.cal.predefined.MONTH_ZIPPIES_WIDTH +
    // Scrollbar width for expanded mode should be taken into account, too.
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2;


/**
 * Height of month event.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MN_EVENT_HEIGHT = rflect.TOUCH_INTERFACE_ENABLED ?
    27 : 17;


/**
 * Minimal width of week event, lower boundary.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WK_EVENT_MINIMAL_WIDTH_LOWER_BOUND = 11;


/**
 * Minimal width of week event, upper boundary.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WK_EVENT_MINIMAL_WIDTH_UPPER_BOUND = 22;


/**
 * Optimal width of week event, lower boundary.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WK_EVENT_OPTIMAL_WIDTH_LOWER_BOUND = 90;


/**
 * Optimal width of week event, upper boundary.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WK_EVENT_OPTIMAL_WIDTH_UPPER_BOUND = 180;


/**
 * Optimal width of week event. Used when block is expanded.
 * TODO(alexk): should this depend on screen size?
 * @type {number}
 * @const
 */
rflect.cal.predefined.WK_EVENT_OPTIMAL_WIDTH = 25;


/**
 * Event layer top margin in month mode.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MN_EVENT_LAYER_MARGIN_TOP = 14;


/**
 * Event layer right margin in week mode.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WK_EVENT_LAYER_MARGIN = 12;


/**
 * Horizontal expand sign height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.HORIZONTAL_EXPAND_SIGN_HEIGHT = 12;


/**
 * Horizontal expand sign width.
 * @type {number}
 * @const
 */
rflect.cal.predefined.HORIZONTAL_EXPAND_SIGN_WIDTH = 13;


/**
 * Vertical expand sign height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.VERTICAL_EXPAND_SIGN_HEIGHT =
    rflect.cal.predefined.HORIZONTAL_EXPAND_SIGN_WIDTH;


/**
 * Vertical expand sign width.
 * @type {number}
 * @const
 */
rflect.cal.predefined.VERTICAL_EXPAND_SIGN_WIDTH =
    rflect.cal.predefined.HORIZONTAL_EXPAND_SIGN_HEIGHT;


/**
 * Height of margin below allday scrollable scrollbar.
 * @type {number}
 * @const
 */
rflect.cal.predefined.ALLDAY_SCROLLABLE_MARGIN_BOTTOM_HEIGHT = 22;


/**
 * Default minimal height of allday scrollable.
 * @type {number}
 * @const
 */
rflect.cal.predefined.ALLDAY_SCROLLABLE_MINIMAL_HEIGHT =
    rflect.cal.predefined.MN_EVENT_HEIGHT * 2 +
    rflect.cal.predefined.VERTICAL_EXPAND_SIGN_HEIGHT;


/**
 * Default minimal height of week scrollable.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_SCROLLABLE_MINIMAL_HEIGHT = 200;


/**
 * Default minimal width of week scrollable, not including hours container.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_SCROLLABLE_WITHOUT_HOURS_CONTAINER_MINIMAL_WIDTH =
    420;


/**
 * How many weeks could possibly eb in month.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MAXIMAL_NUMBER_OF_WEEKS_IN_MONTH = 6;


/**
 * Minimal height of month scrollable.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_HEIGHT = (
    rflect.cal.predefined.MN_EVENT_LAYER_MARGIN_TOP +
    rflect.cal.predefined.MN_EVENT_HEIGHT +
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH) *
    rflect.cal.predefined.MAXIMAL_NUMBER_OF_WEEKS_IN_MONTH;


/**
 * Minimal width of month scrollable.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_WIDTH = 460;


/**
 * Minimal height of week and allday scrollables combined.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_SCROLLABLES_COMBINED_MINIMAL_HEIGHT =
    rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_HEIGHT -
    (rflect.cal.predefined.ALLDAY_SCROLLABLE_MARGIN_BOTTOM_HEIGHT +
    rflect.cal.predefined.MAIN_PANE_HEADER_ZIPPIES_WEEK_HEIGHT +
    2 * rflect.cal.predefined.DEFAULT_BORDER_WIDTH);


/**
 * Difference between outer container and main scrollable heights in week
 * mode, in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_HEIGHT_DIFFERENCE_WEEK =
    rflect.cal.predefined.BODY_MARGIN_TOP +
    rflect.cal.predefined.BODY_MARGIN_BOTTOM +
    rflect.cal.predefined.TOP_PANE_HEIGHT +
    // Height of scrollbar of allday scrollable should be taken into account
    // here, too.
    rflect.cal.predefined.ALLDAY_SCROLLABLE_MARGIN_BOTTOM_HEIGHT +
    rflect.cal.predefined.MAIN_PANE_HEADER_HEIGHT +
    rflect.cal.predefined.MAIN_PANE_HEADER_ZIPPIES_WEEK_HEIGHT +
    // Because of 4 borders
    rflect.cal.predefined.MAIN_PANE_BODY_SCROLLABLE_BORDER_WIDTH * 4;


/**
 * Width of hours container, in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.HOURS_CONTAINER_WIDTH = 60;


/**
 * Daynames week prefix width.
 * @type {number}
 * @const
 */
rflect.cal.predefined.DAYNAMES_PREFIX_WEEK_WIDTH = 61;


/**
 * Difference between outer container and main scrollable widths in week mode,
 * in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.CONTAINER_AND_SCROLLABLE_WIDTH_DIFFERENCE_WEEK =
    rflect.cal.predefined.BODY_MARGIN_LEFT +
    rflect.cal.predefined.BODY_MARGIN_RIGHT +
    rflect.cal.predefined.SIDE_PANE_WIDTH +
    // Locale dependent width of hours block.
    rflect.cal.predefined.HOURS_CONTAINER_WIDTH +
    // No need to take into account width of scrollbar of main scrollable
    // because layout does it already. Grid width set to 100% will result in
    // grid container width - scrollbar width.
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 3;


/**
 * Difference between scrollable and grid widths in week mode,
 * in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_WEEK =
    // Locale dependent width of hours block.
    rflect.cal.predefined.HOURS_CONTAINER_WIDTH +
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2;


/**
 * Difference between scrollable and grid widths in month mode,
 * in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.SCROLLABLE_AND_GRID_WIDTH_DIFFERENCE_MONTH =
    rflect.cal.predefined.WEEK_NUMBERS_CONTAINER_WIDTH +
    rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2;


/**
 * Default hour row height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.HOUR_ROW_HEIGHT = 36;


/**
 * Number of hour rows.
 * @type {number}
 * @const
 */
rflect.cal.predefined.HOUR_ROWS_NUMBER = 48;


/**
 * Default weekgrid height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_GRID_HEIGHT =
    rflect.cal.predefined.HOUR_ROWS_NUMBER *
    rflect.cal.predefined.HOUR_ROW_HEIGHT;


/**
 * Week expand sign height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_EXPAND_SIGN_HEIGHT = 192;


/**
 * Expand signs number in week mode.
 * @type {number}
 * @const
 */
rflect.cal.predefined.WEEK_EXPAND_SIGNS_NUMBER =
    rflect.cal.predefined.WEEK_GRID_HEIGHT /
    rflect.cal.predefined.WEEK_EXPAND_SIGN_HEIGHT;


/**
 * 'Now' button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_NOW_ID = 'nb1';


/**
 * Previous button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_PREV_ID = 'nb2';


/**
 * Next button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_NEXT_ID = 'nb3';


/**
 * New event button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_NEW_EVENT_ID = 'nb7';


/**
 * Day button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_DAY_ID = 'nb4';


/**
 * Week button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_WEEK_ID = 'nb5';


/**
 * Month button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_MONTH_ID = 'nb6';


/**
 * Options button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_SETTINGS_ID = 'nb8';


/**
 * Menu button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_MENU_ID = 'nb9';


/**
 * 'To calendar' button id.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_TO_CALENDAR_ID = 'nb10';


/**
 * Day button id for side pane.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_SIDE_PANE_DAY_ID = 'nb11';


/**
 * Week button id for side pane.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_SIDE_PANE_WEEK_ID = 'nb12';


/**
 * Month button id for side pane.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_SIDE_PANE_MONTH_ID = 'nb13';


/**
 * Options button id for side pane.
 * @type {string}
 * @const
 */
rflect.cal.predefined.BUTTON_SIDE_PANE_SETTINGS_ID = 'nb14';


/**
 * Minical mask area width.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MINICAL_MASK_WIDTH = 134;


/**
 * Minical mask area height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MINICAL_MASK_HEIGHT = 110;


/**
 * Default height of minical.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MINICAL_HEIGHT = 172;


/**
 * Default height of cal/task selector label.
 * @type {number}
 * @const
 */
rflect.cal.predefined.LIST_SELECTOR_AND_SCROLLABLE_HEIGHT_DIFEERENCE = 39;


/**
 * Difference between outer container and main scrollable heights in week
 * mode, in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.CONTAINER_AND_LIST_SELECTORS_HEIGHT_DIFFERENCE =
    rflect.cal.predefined.BODY_MARGIN_TOP +
    rflect.cal.predefined.BODY_MARGIN_BOTTOM +
    rflect.cal.predefined.TOP_PANE_HEIGHT +
    rflect.cal.predefined.MINICAL_HEIGHT;


/**
 * Minimal height of cal/task selector's body, 2*17px, to allow scrollbar
 * buttons to appear.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MINIMAL_LIST_SELECTOR_BODY_HEIGHT = 34;


/**
 * App minimal height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.APP_MINIMAL_HEIGHT =
    (rflect.cal.predefined.MINIMAL_LIST_SELECTOR_BODY_HEIGHT +
    rflect.cal.predefined.LIST_SELECTOR_AND_SCROLLABLE_HEIGHT_DIFEERENCE) * 2 +
    rflect.cal.predefined.CONTAINER_AND_LIST_SELECTORS_HEIGHT_DIFFERENCE;


/**
 * App minimal width.
 * @type {number}
 * @const
 */
rflect.cal.predefined.APP_MINIMAL_WIDTH = 516;


/**
 * Time marker head height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.TIME_MARKER_HEAD_HEIGHT = 5;


/**
 * Time marker line height.
 * @type {number}
 * @const
 */
rflect.cal.predefined.TIME_MARKER_LINE_HEIGHT = 1;


/**
 * Coefficient that defines how much chip overlaps its neighbor.
 * For consistent results on ui, should be in [0;1) interval;
 * If it's 1, chip goes as much as the middle of neighbor.
 * If it's 0, chips do not overlap.
 * @type {number}
 * @const
 */
rflect.cal.predefined.chips.OVERLAPPING_DEGREE = 0.75;


/**
 * Minimal time that week chips will occupy on UI.
 * @type {number}
 * @const
 */
rflect.cal.predefined.chips.MINIMAL_MINS = 30;


/**
 * Class name addition that together with event id forms event id for chip.
 * Example: 100ev
 * @type {string}
 * @const
 */
rflect.cal.predefined.chips.CHIP_EVENT_CLASS = 'ev';


/**
 * Minimal distance a pointer should move with chip to consider this move as a drag.
 * @type {number}
 * @const
 */
rflect.cal.predefined.chips.DISTANCE_TO_START_DRAG = 10;


/**
 * Minutes in day.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MINS_IN_DAY = 1440;


/**
 * Milliseconds in minute.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MILLIS_IN_MINUTE = 60 * 1000;


/**
 * Padding-top of chip inner box (px).
 * @type {number}
 * @const
 */
rflect.cal.predefined.chips.PADDING_TOP = 2;


/**
 * Week scrollable default size.
 * @type {goog.math.Size}
 * @const
 */
rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE =
    new goog.math.Size(rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_WIDTH,
    rflect.cal.predefined.WEEK_SCROLLABLE_MINIMAL_HEIGHT);


/**
 * All-day scrollable default size.
 * @type {goog.math.Size}
 * @const
 */
rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE =
    new goog.math.Size(rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_WIDTH,
    rflect.cal.predefined.ALLDAY_SCROLLABLE_MINIMAL_HEIGHT);


/**
 * Month scrollable default size.
 * @type {goog.math.Size}
 * @const
 */
rflect.cal.predefined.MONTH_SCROLLABLE_DEFAULT_SIZE =
    new goog.math.Size(rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_WIDTH,
    rflect.cal.predefined.MONTH_SCROLLABLE_MINIMAL_HEIGHT);


/**
 * Minimal mask height, in pixels.
 * @type {number}
 * @const
 */
rflect.cal.predefined.MINIMAL_MASK_HEIGHT = 15;


/**
 * Test height for cal selector measurement.
 * @type {number}
 * @const
 */
rflect.cal.predefined.CAL_SELECTOR_TEST_HEIGHT = 500;


/**
 * Id prefix of calendar color checkbox.
 * @type {string}
 * @const
 */
rflect.cal.predefined.CALENDAR_COLOR_CHECKBOX_PREFIX = 'calitem-color-item';


/**
 * Id prefix of calendar color checkbox.
 * @type {string}
 * @const
 */
rflect.cal.predefined.CALENDAR_SETTINGS_LIST_PREFIX = 'cal-list';


/**
 * @enum {string}
 */
rflect.cal.predefined.MainPane.ELEMENT_ID = {
  //Week grid.
  MAIN_PANE_BODY_SCROLLABLE_WK: 'main-pane-body-scrollable-wk',
  GRID_TABLE_CONT: 'grid-table-cont',
  TOUCH_HOLD_WRAPPER_WK: 'touch-hold-wrapper-wk',
  //Month grid.
  MAIN_PANE_BODY_SCROLLABLE_MN: 'main-pane-body-scrollable-mn',
  GRID_TABLE_WRAPPER_OUTER: 'grid-table-wrapper-outer',
  TOUCH_HOLD_WRAPPER_MN: 'touch-hold-wrapper-mn',
  //All-day grid.
  MAIN_PANE_HEADER_SCROLLABLE: 'main-pane-header-scrollable',
  ALL_DAY_EVENTS_GRID_WRAPPER: 'alldayevents-grid-wrapper',
  TOUCH_HOLD_WRAPPER_AD: 'touch-hold-wrapper-ad'
}


/**
 * @type {string}
 */
rflect.cal.predefined.CalendarEditPane.COLORS_RADIO_GROUP_NAME = 'colors';

