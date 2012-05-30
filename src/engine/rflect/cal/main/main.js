goog.provide("rflect.cal.Main");

goog.require("goog.dom");
goog.require("goog.dom.classes");
goog.require("goog.events");
goog.require("goog.style");
goog.require("goog.object");
goog.require("goog.array");
goog.require("goog.json");
goog.require("goog.dom.ViewportSizeMonitor");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.KeyCodes");
goog.require("goog.events.EventHandler");

goog.require("rflect.Root");
goog.require("rflect.datetime.Datetime");
goog.require("rflect.XMLHTTP");
goog.require("rflect.debug.structs.HashMap");
goog.require("rflect.math");
goog.require("rflect.mime");

goog.require("rflect.cal.CalendarEvent");
goog.require("rflect.cal.InfoTipCreating");
goog.require("rflect.cal.InfoTipChanging");
goog.require("rflect.cal.TimeGrid");
goog.require("rflect.cal.GridControl");
goog.require("rflect.cal.BlockHorizontal");
goog.require("rflect.cal.BlockVertical");
goog.require("rflect.datetime.Interval");
goog.require("rflect.dom.AutoScroll");
goog.require("rflect.cal.History");

goog.require("rflect.loc.cal.Main");

rflect.cal.Main =
rflect.Root.__create(function Calendar_Constructor() {

  var L = rflect.loc.cal.Main;

  function _debug() {

    rflect.Debug.activate();

    var COL_HEADERS = 0x1;
    var ALL_DAY_GRID = 0x2;
    var GRID_CONTAINER = 0x4;
    var ROW_HEADERS = 0x8;
    var GRID = 0x10;
    var DECOWNER = 0x20;
    var EVENTOWNER = 0x40;
    var GRID_ROWS = 0x80;
    var GRID_COLUMNS = 0x100;
    var GRID_ROWS_POSITIONS_RECALCULATE = 0x200;
    var GRID_COLUMNS_POSITIONS_RECALCULATE = 0x400;

    var buttonDay = goog.dom.$dom("button", {
      innerHTML: "relayoutDay"
    });
    var buttonMonth = goog.dom.$dom("button", {
      innerHTML: "relayoutMonth"
    });

    this.listen(buttonDay, "click", function() {
      this._relayout(COL_HEADERS | ALL_DAY_GRID | GRID_CONTAINER
              | ROW_HEADERS | GRID | DECOWNER
              | EVENTOWNER | GRID_ROWS
              | GRID_COLUMNS | GRID_ROWS_POSITIONS_RECALCULATE
              | GRID_COLUMNS_POSITIONS_RECALCULATE);
    });
    this.listen(buttonMonth, "click", function() {
      this._relayout(COL_HEADERS | GRID_CONTAINER
              | GRID | DECOWNER
              | EVENTOWNER | GRID_ROWS
              | GRID_COLUMNS | GRID_ROWS_POSITIONS_RECALCULATE
              | GRID_COLUMNS_POSITIONS_RECALCULATE);
    });

    var debugAlpha = new rflect.Debug({
      id: "1",
      controller: buttonDay,
      width: "400px"
    });
    debugAlpha.add(buttonMonth);

    echo("goog.userAgent.GECKO: " + goog.userAgent.GECKO, 1);
    echo("goog.userAgent.IE: " + goog.userAgent.IE, 1)
    echo("goog.userAgent.WEBKIT: " + goog.userAgent.WEBKIT, 1);
    echo("goog.userAgent.SAFARI: " + goog.userAgent.SAFARI, 1);
    echo("goog.userAgent.OPERA: " + goog.userAgent.OPERA, 1);
    echo("goog.userAgent.VERSION: " + goog.userAgent.VERSION, 1);
    echo("goog.userAgent.PLATFORM: " + goog.userAgent.PLATFORM, 1);
    echo("goog.userAgent.MOBILE: " + goog.userAgent.MOBILE, 1);

    // ***** debug part ended *****
  }

  goog.bind(_debug, this)();

  this._size.viewport = null;

  // Viewport size monitor
  this._vsm = null;
  // Array containing pixel positions of rows. Since we
  // really need rows for events to be shifted up one position,
  // while there's no row in month mode,
  // we create this auxiliary array
  this._gridRowsPixelPositionsShifted = [];
  this._gridRowsPercentPositionsShifted = [];
  // Height of daylabel zone on day cell which appears in month mode mode
  this._gridFreespaceMonthmodeHeightInPixels =
  rflect.cal.Main.GRID_FREESPACE_MONTHMODE_HEIGHT_IN_PIXELS;
  // Height of month mode cell actual space
  this._monthmodeCellActualSpaceHeight = 0;
  // Minimal height of event rectangle
  this._minimalCalendarEventHeightInPixel = 21;
  // Some free space for expand/collapse sign
  //  in month mode placed at bottom
  //  of event block container
  this._bottomFreeSpace = 10;
    // Width of daymode cell actual space
  this._daymodeCellActualSpaceWidth = 0;
    // Array containing pixel positions of actual space within
  // day cell appearing in month mode which can be used
  // to place events
  this._gridActualSpaceRowsPositions = [];
    // Array containing pixel positions of actual space within
  // day cell appearing in day mode which can be used
  // to place events
  this._gridActualSpaceColumnsPositions = [];
    // Array containing percent positions of rows (actually in ex)
  this._gridRowsPercentPositions = [];

    // Array containing pixel positions of columns
  this._gridColumnsPixelPositions = [];

    // Grid control columns or rows in hover mode
  this._gridControlsPointsHover = {};

    // Grid control columns or rows in click mode
  this._gridControlsPointsClick = {};

    // Grid control columns or rows that are hovered
  this._hoveredGridControls = {};

    // Array containing percent positions of rows
  this._gridColumnsPercentPositions = [];
    // Grid width increment
  this._gridWidthIncrementInPixels = 0;
  this._gridWidthIncrementInPercents = 0;
    // Grid height increment
  this._gridHeightIncrementInPixels = 0;
  this._gridHeightIncrementInPercents = 0;
  //Dragging state
  this._draggingSelection = false;
  //Selection properties TODO: consider to store them in different Selection object
  this._selectionTop = 0;
  // Index showing position of coordinate corresponding to selectionTop in
  // this._gridRowsPixelPositionsShifted, this._gridRowsPercentPositions arrays
  this._selectionStartTopIndex = 0;
  this._selectionLeft = 0;
  // Index showing position of coordinate corresponging to selectionLeft in
  // this._gridColumnsPixelPositions, this._gridColumnsPercentPositions arrays
  this._selectionStartLeftIndex = 0;
  this._selectionWidth = 0;
  this._selectionHeight = 0;
  this._selectionTopInPixels = 0;
  this._selectionLeftInPixels = 0;
  this._selectionWidthInPixels = 0;
  this._selectionHeightInPixels = 0;
  this._selectionWidthOld = 0;
  this._selectionHeightOld = 0;
  this._selectionDifferenceOld = true;

  this._rectangleLeftIndex = 0;
  this._rectangleTopIndex = 0;
  this._rectangleLeftIndexOld = 0;
  this._rectangleTopIndexOld = 0;

  // Mousemove options
  this._mouseMoveOptions = {};
  this._mouseMoveOptions.verticalDistanceOld = 0;
  this._mouseMoveOptions.horizontalDistanceOld = 0;

  // Listeners
  this._listeners = {};
  this._listeners.relayoutEnd = [];

  // Elements
  this._mainBody = document.getElementById("mainbody");
  this._chromeMain = goog.dom.$("chrome_main2");

  // Tabs
  this._tabAlpha = document.getElementById("mode_link1");
  this._tabBeta = document.getElementById("mode_link2");
  this._tabGamma = document.getElementById("mode_link3");
  // Labels
  this._labelTabAlpha = goog.dom.$("mode-day");
  this._labelTabBeta = goog.dom.$("mode-week");
  this._labelTabGamma = goog.dom.$("mode-month");

  this._changeableTarget = document.getElementById("chead0");
    // Auxiliary element used to store previously selected tab
  this._previouslySelectedTab = null;
    // Event owner for whole day field
  this._wholeDayEventOwner = document.createElement("div");
  this._wholeDayEventOwner["id"] = "alldayeventowner";
  // Event owner for grid
  this._eventOwner = document.getElementById("eventowner");
  // Header group - showing weekdays
  this._colHeadersContainer = document.getElementById("colheaders");
  this.headerElementLinks = [];
  // Header group - showing hours in
  this._rowHeadCell = document.getElementById("rowheadcell");
  this._rowHeaders = document.getElementById("rowheaders");
  // Whole day field
  this._allDayGrid = document.getElementById("allDayGrid");
  if (goog.userAgent.SAFARI)
    this._allDayGrid.style["marginRight"] = "14px";
  //Grid related
  this._calOwner = document.getElementById("calowner");
  this._gridWithHeaders = document.getElementById("gridAndHeaders");
  this._grid = document.getElementById("grid");
  this._gridContainer = document.getElementById("gridcontainer");
  this._gridContainerCell = document.getElementById("gridcontainercell");
  this.cellDayNumbers = [];

  // Vertical column grid
  this._containerGridCols = document.getElementById("gridColumns");
  // Horizontal grid
  this._containerGridRows = document.getElementById("gridRows");
  // Box that highlights current day positions
  this._decOwner = document.getElementById("decowner");
  // Lasso
  this._selectionRectangle = null;
  this._selectionRectangleLower = null;
  this._selectionRectangleUpper = null;
  // Buttons
  this._buttonDaysPrevious = document.getElementById("buttonDaysPrevious");
  this._buttonDaysNext = document.getElementById("buttonDaysNext");
  this._buttonsDayToday = document.getElementById("todayButton");
  this._buttonRecalculateEvents =
  document.getElementById("recalculateEventsButton");

  // Localization
  goog.dom.setTextContent(this._labelTabAlpha, L("Day"));
  goog.dom.setTextContent(this._labelTabBeta, L("Week"));
  goog.dom.setTextContent(this._labelTabGamma, L("Month"));
  goog.dom.setTextContent(this._buttonsDayToday, L("Today"));

  // Set up autoscroll
  this._formAutoScrolls();
  
  // Events binding
  this.listen(this._tabAlpha, "mousedown",
          this._onClickTab);
  this.listen(this._tabBeta, "mousedown",
          this._onClickTab);
  this.listen(this._tabGamma, "mousedown",
          this._onClickTab);

  this.listen(this._grid, "mousedown",
          this._onMouseDownGrid);

  this.listen(document, "mouseup",
          this._onMouseUpDefault);

  this.listen(document, "mouseout",
          this._onMouseOutDefault, true);

  this.listen(this._buttonDaysPrevious,
          "mousedown", this._onClickButton);
  this.listen(this._buttonDaysNext,
          "mousedown", this._onClickButton);
  this.listen(this._buttonsDayToday,
          "mousedown", this._onClickButton);

  this.listen(document,
          "mousedown", this._onMouseDownDefault);

  this.listen(document,
          "keyup", this._onKeyUpDefault);

  // Listen to resizes
  this._vsm = new goog.dom.ViewportSizeMonitor();
  this.listen(this._vsm, "resize",
          this._onResizeViewport);

  // Set up history support
  this._hist = new rflect.cal.History({
    cal: this
  });

  // Set baseDateTime to today
  this.viewOptions.baseDateTime = new rflect.datetime.DateTime();

  /*if (this._switchTab(this._tabGamma)) {

    this._switchView({
      type: rflect.cal.Main.Modes.MONTH,
      byTab: true
    });
  }
  ;*/

  if (this._switchTab(this._tabBeta)) {
    this._switchView({
      type: rflect.cal.Main.Modes.WEEK,
      byTab: true
    });
  }

  // For IE, use smaller fonts
  if (goog.userAgent.IE) {
    goog.dom.classes.add(this._mainBody, "ieFont");
  }

});

rflect.cal.Main.__assoc({

  APP_PATH: APP_PATH,
  APP_PATH_EVENTS: APP_PATH_EVENTS,

  //Constants
  TAB_ALPHA: 10,
  TAB_BETA: 11,
  TAB_GAMMA: 12,
  TAB_DELTA: 13,
  TAB_EPSILON: 14,
  EVENT_OWNER: 15,

  SELECTION_RECTANGLE_CENTRAL: 1,
  SELECTION_RECTANGLE_UPPER: 2,
  SELECTION_RECTANGLE_LOWER: 3,

  /**
   * Grid height in day mode, in percents.
   * @type {number}
   */
  GRID_HEIGHT_DAYMODE_PERCENTS: 144,

  PADDING_LEFT: 0,
  PADDING_RIGHT: 0,
  PADDING_TOP: 0,
  PADDING_BOTTOM: 0,

  CHROME_TOP_MENU: 25,
  CHROME_SPACE_MENU_COLHEADERS: 2,
  CHROME_COLHEADERS: 18,
  CHROME_BOTTOM: 8,

  CHROME_MINIMAL_WHOLE_DAY_GRID_HEIGHT: 22,
  CHROME_MINIMAL_GRIDCONTAINER_HEIGHT: 310,

  CHROME_MAIN1_HEIGHT: 25,
  SPACE_HEIGHT: 2,
  CHROME_MAIN2_WITHOUT_GRIDCONTAINER_HEIGHT_DAY: 42,
  CHROME_MAIN2_WITHOUT_GRIDCONTAINER_HEIGHT_MONTH: 20,
  CHROME_MAIN3_HEIGHT: 6,
  MINIMAL_GRIDCONTAINER_HEIGHT: 310,

  ELEMENT_EVENT_ID_PART_1: "elemEvent",
  ELEMENT_EVENT_ID_PART_2: "Item",

  OPACITY_NEW_EVENT: 0.75,
  OPACITY_GHOST: 0.75,

  Relayout: {

    COL_HEADERS_CONTAINER: 0x1,
    COL_HEADERS: 0x2,
    ALL_DAY_GRID: 0x4,
    GRID_CONTAINER: 0x8,
    ROW_HEADERS: 0x10,
    GRID: 0x20,
    DECOWNER: 0x40,
    MONTH_CELL_SET: 0x80,
    EVENTOWNER: 0x100,

    GRID_ROWS: 0x200,
    GRID_COLS: 0x400,
    GRID_ROWS_POSITIONS_RECALCULATE: 0x800,
    GRID_COLS_POSITIONS_RECALCULATE: 0x1000,

    LISTENER_CHANGE: 0x2000,

    WRITE_TO_CHROME: 0x4000,
    WRITE_TO_COL_HEADERS_CONTAINER: 0x8000,
    WRITE_TO_GRID_ROWS_CONTAINER: 0x10000,
    WRITE_TO_GRID_COLS_CONTAINER: 0x20000,
    WRITE_TO_DECOWNER: 0x40000

  },

  Modes: {

    /**
     * General mode of all day views.
     * @type {number}
     */

    DISPLAY_TYPE_DAY: 20,

    /**
     * General mode of all month views.
     * @type {number}
     */

    DISPLAY_TYPE_MONTH : 21,

    /**
     * Multiday view.
     * @type {number}
     */

    MULTIDAY : 45,

    /**
     * Week view.
     * @type {number}
     */

    WEEK : 46,

    /**
     * Multiweek view.
     * @type {number}
     */

    MULTIWEEK : 47,

    /**
     * Month view.
     * @type {number}
     */

    MONTH : 48,

    EVENT_RECTANGLE_EXPAND_NONE : 0,
    SELECTION_RECTANGLE_SINGLE : 40,
    SELECTION_RECTANGLES_MULTIPLE_LEFT : 41,
    SELECTION_RECTANGLES_MULTIPLE_RIGHT : 42,
    SELECTION_RECTANGLES_MULTIPLE_UPPER : 43,
    SELECTION_RECTANGLES_MULTIPLE_LOWER : 44,
    EVENT_RECTANGLE_EXPAND_LEFT : 1,
    EVENT_RECTANGLE_EXPAND_RIGHT : 2,
    EVENT_RECTANGLE_EXPAND_BOTH : 3,
    EVENT_RECTANGLE_TRANSPARENT : 6,
    EVENT_RECTANGLE_OPAQUE : 7,
    EVENT_CREATION_IS_IN_PROGRESS : 10,
    EVENT_CREATION_IS_NOT_IN_PROGRESS : 11,
    EVENT_CHANGE_IS_IN_PROGRESS: 12,
    EVENT_CHANGE_IS_NOT_IN_PROGRESS: 13,

    DRAWING_MODE_DEFAULT: 10,
    DRAWING_MODE_CAPACITIES: 11,
    DRAWING_MODE_IMMEDIATE: 12,
    DRAWING_MODE_DEFERRED: 13
  },

  Actions: {
    ACTION_ADD_EVENT: 0x1,
    ACTION_REMOVE_EVENT: 0x2,
    ACTION_CHANGE_EVENT: 0x4,
    ACTION_GET_EVENT_COLLECTION: 0x8,
    ACTION_PING: 0x10,
    GET_CACHE: 0x10,
    ADD_CACHE: 0x20,

    RESPONSE_EVENT_ALREADY_EXISTS: 100,
    RESPONSE_NO_SUCH_EVENTS: 101
  },

  // TODO: Implement durations similar to Joda time
  Durations: {
    DAYS: 1,
    MINUTES: 2
  },

  // Range which defines width of calendar event collection in time
  // width is AXIS_RANGE*2 for today day and AXIS_RANGE*2 for axis day.
  AXIS_RANGE: 15721200000,

  // Amount of shift in percents, which, if exceeded, signalizes that calendar event
  // collection should be updated.
  UPDATE_EDGE_PERCENTS: 30,

  // Events
  Events: {
    POINT: 2,
    DRAG: 3,
    REMOVE: 4
  },

  // Units
  Units: {
    PERCENTS: 2,
    PIXELS: 3,
    EX: 4
  },

  /**
   * Left padding of scroll area in day mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_LEFT: 20,
  /**
   * Right padding of scroll area in day mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_RIGHT: 20,
  /**
   * Top padding of scroll area in day mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_TOP: 20,
  /**
   * Botoom padding of scroll area in day mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_BOTTOM: 20,


  /**
   * Left padding of scroll area in month mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_LEFT: 20,
  /**
   * Right padding of scroll area in month mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_RIGHT: 20,
  /**
   * Top padding of scroll area in month mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_TOP: 20,
  /**
   * Bottom padding of scroll area in month mode.
   * @type {number}
   */
  GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_BOTTOM: 20,


  GRID_FREESPACE_MONTHMODE_HEIGHT_IN_PIXELS: 18,
  GRID_FREESPACE_DAYMODE_WIDTH_IN_PIXELS_GRADATION_1: 30,
  GRID_FREESPACE_DAYMODE_WIDTH_IN_PIXELS_GRADATION_2: 20,
  GRID_FREESPACE_DAYMODE_WIDTH_IN_PIXELS_GRADATION_3: 15,

  DRAG_WHOLE: 1,
  DRAG_LENGTH: 2,

  COLUMN_INACTIVE_WIDTH: 4,
  COLUMN_ACTIVE_WIDTH: 6,
  ROW_INACTIVE_WIDTH: 4,
  ROW_ACTIVE_WIDTH: 6,

  MINIMAL_CALENDAR_EVENT_HEIGHT_IN_PIXEL: 20,
  MINIMAL_CAPACITY_DAY_MODE: 4,
  MINIMAL_CAPACITY_MONTH_MODE: 2

})
        .__fuse(new goog.events.EventHandler())
        .__fuse({

  // Public methods

  /**
   * Adds new calendar event both in local collection and to server.
   * If calendar event overlaps currently diplayed interval, it will be
   * also drawn.
   * * If datetime is passed as object, method expects following key sheme:
   *     1. year - year.
   *     2. monthOfYear - month.
   *     3. dayOfMonth - day.
   *     4. hourOfDay - hour.
   *     5. minuteOfHour - minute.
   *     6. secondOfMinute - second.
   *     7. millisOfSecond - millisecond.
   *
   * Example usage:
   * <pre>
   * var start = new Date(2008, 01, 01, 15);
   * var end = new Date(2008, 01, 01, 16);
   *
   * addCalendarEvent(start, end, "hour");
   *
   * addCalendarEvent({
   *   year: 2008,
   *   monthOfYear: 01,
   *   dayOfMonth: 01,
   *   hourOfDay: 16
   * }, {
   *   year: 2008,
   *   monthOfYear: 01,
   *   dayOfMonth: 01,
   *   hourOfDay: 17
   * }, "another_hour");
   *
   * </pre>
   *
   * @param {Object|Date} aStartDateTime Date and time where events starts.*
   * @param {Object|Date} aEndDateTime Date and time where events ends.*
   * @param {string} aName Name of event.
   * @return {string} The id of newly created event for later use.
   * @public
   */

  addCalendarEvent: function Calendar_addCalendarEvent(aStartDateTime,
                                                       aEndDateTime, aName) {

    var startDateTime = null;
    var endDateTime = null;
    var name = (aName == undefined) ? "" : aName;

    startDateTime = new rflect.datetime.DateTime(aStartDateTime);
    endDateTime = new rflect.datetime.DateTime(aEndDateTime);

    return this._createCalendarEvent({
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      name: name
    });

  },

  /**
   * Gets information about whether event is visible in currently
   * displayed interval. Event is considered visible in iterval
   * if it overlaps interval.
   *
   * Example usage:
   * <pre>
   *
   * calendarEventIsInViewableInterval(eventID);
   *
   * outputs:
   * true
   *
   * </pre>
   *
   * @param {string} aCalendarEventID Calendar event id.
   * @return {boolean} Whether this event is in currently
   * displayable interval.
   * @public
   */

  calendarEventIsInViewableInterval: function Calendar_calendarEventIsInViewableInterval(
          aCalendarEventID) {
    var IDIsInDisplInterval = false;

    IDIsInDisplInterval = (aCalendarEventID in this._calendarEventsCollection)
            ? (aCalendarEventID in this._visibleCalendarEventsCollection)
            : false

    return IDIsInDisplInterval;
  },

  /**
   * Changes calendar event properties. Method do not create new
   * calendar event. It operates in-place.
   * * Object of changeable properties expects following key sheme:
   *     1. name - name.
   *     2. startDateTime - Date and time where events starts.
   *     3. endDateTime - Date and time where events ends.
   * 
   * Example usage:
   * <pre>
   *
   * var start = {
   *   year: 2008,
   *   monthOfYear: 01,
   *   dayOfMonth: 01,
   *   hourOfDay: 16
   * };
   * var end = {
   *   year: 2008,
   *   monthOfYear: 01,
   *   dayOfMonth: 01,
   *   hourOfDay: 17
   * };
   * var name = "now I'm Gamma";
   *
   * changeCalendarEvent(eventIDAlpha, {
   *   startDateTime: start,
   *   endDateTime: end
   * });
   * changeCalendarEvent(eventIDBeta, {
   *   name: name
   * });
   *
   * outputs:
   * true
   * true
   *
   * </pre>
   *
   * @param {string} aCalendarEventID Calendar event id.
   * @return {object} aChangeCalendarEventOptions Object containing properties which are
   * subject to change in original event.*
   * @public
   * @see addCalendarEvent for DateTime key shemes
   */
  changeCalendarEvent: function Calendar_changeCalendarEvent(aCalendarEventID,
                                                             aChangeCalendarEventOptions) {

    var startDateTime = (typeof aChangeCalendarEventOptions == "object")
            ? (("startDateTime" in aChangeCalendarEventOptions)
            ? aChangeCalendarEventOptions["startDateTime"] : null) : null;

    var endDateTime = (typeof aChangeCalendarEventOptions == "object")
            ? (("endDateTime" in aChangeCalendarEventOptions)
            ? aChangeCalendarEventOptions["endDateTime"] : null) : null;

    var name = (typeof aChangeCalendarEventOptions == "object") ? (("name"
            in aChangeCalendarEventOptions)
            ? aChangeCalendarEventOptions["name"] : null) : null;

    var calEvent = null;
    var changedCalendarEventCollection = {};

    calEvent = (aCalendarEventID in this._calendarEventsCollection)
            ? this._calendarEventsCollection[aCalendarEventID]
            : null;

    if (!(calEvent == null)) {

      calEvent = calEvent.clone();

      if (!(startDateTime == null) && !(endDateTime == null)) {

        if (!(startDateTime == null)) {
          startDateTime = new rflect.datetime.DateTime(startDateTime);
          calEvent.setStartDateTime(startDateTime);
        }
        if (!(endDateTime == null)) {
          endDateTime = new rflect.datetime.DateTime(endDateTime);
          calEvent.setEndDateTime(endDateTime);
        }

        //Recalculate interval
        calEvent.setCalendarEventInterval();

        // Autodetect type
        calEvent.setType(null);

      }

      if (!(name == null))
        calEvent.setName(name);

      changedCalendarEventCollection[aCalendarEventID]
              = calEvent;

      inspect("_changedCalendarEventCollection", changedCalendarEventCollection);

      return this._replaceCalendarEvent({
        byControl: false,
        changedCalendarEventCollection: changedCalendarEventCollection
      });

    }
    ;

    return false;

  },
  /**
   * Disposes calendar instance.
   */
  dispose: function Main_dispose() {
    this._dispose();
  },

  /**
   * Gets calendar event object or null if object
   * wasn't present in local collection.
   *
   * Example usage:
   * <pre>
   *
   * getCalendarEventByID(eventIDAlpha);
   * getCalendarEventByID(eventIDBeta);
   *
   * outputs:
   * [object Object]
   * null
   *
   * </pre>
   *
   * @param {string} aCalendarEventID Calendar event id.
   * @return {rflect.cal.CalendarEvent|null} Calendar event object.
   * @public
   */

  getCalendarEventByID: function Calendar_getCalendarEventByID(
          aCalendarEventID) {

    var calEvent = null;

    calEvent = (aCalendarEventID in this._calendarEventsCollection)
            ? this._calendarEventsCollection[aCalendarEventID]
            : null

    return calEvent;
  },

  /**
   * Removes new calendar event both from local collection and from server.
   * If calendar event overlaps currently diplayed interval, it will be
   * also cleared.
   *
   * Example usage:
   * <pre>
   *
   * removeCalendarEvent(eventIDAlpha);
   * removeCalendarEvent(eventIDAlpha, eventIDBeta);
   *
   * outputs:
   * false
   * true
   *
   * </pre>
   *
   * @param {string} var_args Identifiers of events to remove.
   * @param {string} aName Name of event.
   * @return {boolean} True if at least one event was removed.
   * @public
   */

  removeCalendarEvent: function Calendar_removeCalendarEvent(var_args) {

    var IDsToRemove = arguments;
    var removedCalendarEventCollection = {};
    var counter = 0;

    for (counter = 0; counter < IDsToRemove.length; counter++) {
      removedCalendarEventCollection[IDsToRemove[counter]] = true;
    }

    return this._deleteCalendarEvent({
      removedCalendarEventCollection: removedCalendarEventCollection
    });

  },

  shiftToDate: function Calendar_shiftToDate() {

  },

  /**
   * Switches to calendar view. Switch is performed only if
   * current view is different from new one.
   *
   * Example usage:
   * <pre>
   *
   * switchView(rflect.cal.Main.Modes.ONE_DAY);
   * switchView(rflect.cal.Main.Modes.ONE_DAY);
   * switchView(rflect.cal.Main.Modes.WEEK);
   * switchView(rflect.cal.Main.Modes.MONTH);
   *
   * outputs:
   * true
   * false
   * true
   * true
   *
   * </pre>
   *
   * @param {number} aView View to switch to.
   * @return {boolean} True if switch was performed.
   * @public
   */

  switchView: function Calendar_switchView(aView) {

    var modeDisplayType = 0;

    if (!(this._modes.currentFunctionality == aView)) {

      switch (aView) {
        case rflect.cal.Main.Modes.ONE_DAY:;
        case rflect.cal.Main.Modes.WEEK:;
        case rflect.cal.Main.Modes.FOUR_DAYS:;
        case rflect.cal.Main.Modes.DAY_EVENTS:
          modeDisplayType =
          rflect.cal.Main.Modes.DISPLAY_TYPE_DAY;break;
        case rflect.cal.Main.Modes.MONTH:
          modeDisplayType =
          rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH;;break;
        default: break;
      }

      this._switchView({
        displayType: modeDisplayType,
        currentFunctionality: aView,
        byTab: false
      });
      return true;
    }

    return false;

  }

});

