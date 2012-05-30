rflect.cal.Main.__fuse({

  _gridContainer: null,
  _gridContainerHeight: 310,
  _gridContainerHeightOld: 310,

  _gridContainerSize: null,
  _gridSize: null,
  _eventOwnerSize: null,
  _eventOwnerSizeOld: null,

  _gridRowsElements: null,

  _minimalCapacity: rflect.cal.Main.MINIMAL_CAPACITY_DAY_MODE,

  expanded: false,
  calendar: this,
  //rflect.cal.Main.prototype = {
  modulesCollection: [],
  _maxCalendarEventRectangleShift: 0,
  _intersectionsMap: {},
  _sortedIntersectionsMap: [],
  _inverseSortedIntersectionsMap: {},
  _indirectIntersectionsMap: {},
  _shiftsMap: {},
  // Limit which determines whether certain event will be displayed or not
  _shiftLimit: 3,
  _spacesMap: {},
  _previousMaxWidthMap: {},
  _calendarEventsWidthMap: {},

  _counterHorizontalOld: -1,
  _counterVerticalOld: -1,

  _eventOwnerWidth: 0,
  _eventOwnerHeight: 0,
  _eventOwnerLeft: 0,
  _eventOwnerTop: 0,

  // x elements of event grid
  _eventGridXElementsNumber: 0,
  // y elements of event grid
  _eventGridYElementsNumber: 0,

  // Height of freespace on top of cell in monthmode
  _gridFreespaceMonthmodeHeightInPixels: rflect.cal.Main.GRID_FREESPACE_MONTHMODE_HEIGHT_IN_PIXELS,
  // Width of freespace to the left of the block in daymode
  _gridFreespaceDaymodeWidthInPixels: rflect.cal.Main.GRID_FREESPACE_DAYMODE_WIDTH_IN_PIXELS_GRADATION_1,
  // Width of freespace to the left of cell in daymode
  _gridFreespaceDaymodeWidthInPercents: 20,

  // Local collection containing events
  // that intersect interval around today and
  // current displayable interval
  _calendarEventCollection: {},

  // Collection that stores
  // events for fallback support
  _fallbackCollection: {},

  _blockElementsCapacitiesToSet: [],

  _expandedBlocksIndexes: {},
  _affectedBlocksIndexes: {},

  _autoResizingDrawMode: false,
  _blocksIndexesDeferredDrawer: {},

  _visibleCalendarEventsCollection: {},
  _rectanglesCollection: {},
  _rectanglesIndexes: {},
  _calendarEventsRectanglesIDs: {},
  _ghostRectanglesIDs: {},
  _calendarEventRectangleCache: {},
  _calendarEventCreationBox: null,
  _calendarEventChangeBox: null,

  // Dragging state
  _draggingSelection: false,
  // Event div mousedown state
  _eventDivIsClicked: false,
  // Event div moved state
  _eventDivIsMoved: false,

  // Hover over grid control state
  _hoveredOverGridControl: false,

  // dragged parameters
  _draggedID: "",
  _draggedName: "",
  _draggedStartDateTime: null,
  _draggedEndDateTime: null,
  _calendarEventGhost: null,

  // Has target
  _calendarEventHasTarget: false,

  // TODO: Use events ids
  _calendarEventChangeBoxListenerClickEditorLink: null,
  _calendarEventChangeBoxListenerClickDeleteLink: null,

  _calendarEventRectanglePrototype: null,
  _calendarEventRectanglePrototypeDL: null,
  _calendarEventRectanglePrototypeTimelabel: null,
  _calendarEventRectanglePrototypeEventNameLabel: null,

  _mousedownX: 0,
  _mousedownY: 0,

  _modes: {
    selectionRectangleStructure: rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE,
    currentFunctionality: rflect.cal.Main.Modes.WEEK,
    calendarEventCreation: rflect.cal.Main.Modes.EVENT_CREATION_IS_NOT_IN_PROGRESS
  },

  /*_modes: {
    displayType: 20,
    selectionRectangleStructure: 40,
    currentFunctionality: 46
  },
  */

  _wholeDisplayableInterval: null,
  _sub_IntervalsCollection: [],
  _lastCheckedAxisInstant: 0,
  _actualityCheckIntervalCollection: {},
  _hourGrid: [],
  _hourGridInverse: {},
  _dayGrid: [],
  _dayGridInverse: [],

  _gridControl: null,
  _gridControlsPointsHover: null,
  _gridControlsPointsClick: null,

  _hoveredGridControls: null,

  _gridWidthIncrementInPercents: 0,
  _gridHeightIncrementInPercents: 0,

  _gridWidthIncrementInPixels: 0,
  _gridHeightIncrementInPixels: 0,

  _gridRowsPercentPositions: null,
  _gridRowsPercentPositionsShifted: null,
  _gridRowsPixelPositionsShifted: null,

  _gridColumnsPercentPositions: null,
  _gridColumnsPixelPositions: null,
  _gridColumnsPercentPositionsDefault: null,

  _horizontalTimeIncrement: null,
  _verticalTimeIncrement: null,

  // Timegrid
  _tgrid: null,

  // Base datetime for view switching
  _baseDateTime: null,

  /**
   * View options
   * @type {Object}
   */
  viewOptions: {
    displayType: 0,
    type: 0,
    columnsQuantity: 0,
    rowsQuantity: 0,
    hourGridCalculated: false,
    baseDateTime: null,
    monthCellsSetBuilt: false,
    gridYExpanded: false
  },

  /**
   * Calendar events collection
   * @type {Array}
   */
  _calendarEventsCollection: [],

  /**
   * Collection which contains events which were not saved to server yet
   * @type {Object}
   */
  _pendingCalendarEventsCollection: {
    forAdd: {},
    forModify: {},
    forDelete: {}
  },

  /**
   * Map linking event hashID to item hashID
   * @type {Object}
   */
  _calendarEventsItems: {

  },

  /**
   * Intervals
   * @type {Object}
   */
  _intervals: {
    visible: null,
    covered: null,
    full: null,
    update: null,
    updateRightArc: null,
    updateLeftArc: null,
    // Gaps could arise
    //  when XMLHTTP request fails.
    //  We should remember them,
    //  and when we scroll into some interval
    //  that crosses one of the gaps,
    //  we should add it to update request,
    //  if that request were succesful,
    //  we could delete gap.
    gaps: null
  },

  // Blocks which draw events.
  _blocks: [],
  // Cached vertical blocks.
  _blocksVertical: [],
  // Cached horizontal blocks.
  _blocksHorizontal: [],
  // Blocks expanded state - true if at leat one block is expanded
  _blocksExpandedState: false,

  // Elements bound to blocks
  _eventBlockElements: [],
  // Cells in month mode
  _cellBlockElements: [],

  /**
   * Indicator which shows whether autoresize is enabled
   * @type {boolean}
   */
  _autoresizeEnabled: true,

  /**
   * Indicator which shows whether minimal positions is set
   * @type {boolean}
   */
  _minimalPositionsSet: false,

  /*
  * Cached elements
  * */
  _cache: {
    colHeadersMonthMode: null,
    rowHeadersDayMode: null,
    rowsDayMode: null,
    colsMonthMode: null
  },
  /**
   * Cached rows which are constant in day mode
   * @type {Object}
   */
  _cachedRowsDayMode: null,
  /**
   * Cached cols which are constant in month mode
   * @type {Object}
   */
  _cachedColsMonthMode: null,
  /**
   * Cached colheaders which are constant in month mode
   * @type {Object}
   */
  _cachedColHeadersMonthMode: null,
  /**
   * Cached rowheaders which are constant in day mode
   * @type {Object}
   */
  _cachedRowHeadersDayMode: null,


  /**
   * Viewport size monitor
   * @type {Object}
   */
  _vsm: null,

  /**
   * Viewport size object
   * @type {goog.math.Size}
   */
  _viewportSize: null,

  /**
   * History object
   * @type {Object}
   */
  _hist: null,

  /**
   * Scroll options
   * @type {Object}
   */
  _scrollOptions: {

    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },

    xEnabled: false,
    yEnabled: false,
    xInProgress: false,
    yInProgress: false,

    box: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    offset: {
      x: 0,
      y: 0
    }
  },
  /**
   * Listeners collection
   * @type {Object}
   */
  _listeners: {
    mouseDownGrid: -1,
    mouseMoveDocument: -1,
    scrollAutoScrollX: -1,
    scrollAutoScrollY: -1,
    mouseDownColHeadersContainer: -1
  },

  /**
   * Selection options
   * @type {Object}
   */
  _selection: {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  },

  /**
   * Object for drag.
   * @type {Object}
   */
  _drag: {
    calEvent: null,
    type: 0,
    startDateTime: null,
    endDateTime: null,
    ghost: null
  },

  /**
   * Common object for sizes
   * @type {Object}
   */
  _size: {
    chromeWithoutGridContainer: null,
    gridContainer: null,
    /**
     * Viewport size object
     * @type {goog.math.Size}
     */
    viewport: null,
    chrome: null,
    grid: null,
    eventOwner: null,
    chromeStatic: null,
    allDayGrid: null,
    gridMonthModeCached: null,
    gridDayModeCached: null,
    gctrDayModeCached: null,
    gctrMonthModeCached: null,
    gctrToGridDayModeDelta: null,
    gctrToGridMonthModeDelta: null

  },

  _selectionStartLeftIndex: -1,
  _selectionStartTopIndex: -1,

  _selectionEndLeftIndex: -1,
  _selectionEndTopIndex: -1,
  _selectionStartDateTime: null,
  _selectionEndDateTime: null,

  _blockElementsCapacities: [],
  _possibleBlockElementsCapacities: {},

  _startDay: null,
  _endDay: null,
  _endHour: null,
  _currentMonth: 0,
  _prevMonthFirstDay: null,
  _nextMonthFirstDay: null,
  _displayedWeeksNumber: 0,
  _displayedDaysNumber: 0,
  // _timeprocessor: rflect.datetime.Timeprocessor.get(),
  _eventOwnerListenerMouseMove: null,


  _addCalendarEventToBlocks: function Calendar__addCalendarEvent(
          aCalendarEvent, aModifyAffectedBlocksIndexes) {

    var items = null;
    var modifyAffectedBlocksIndexes = aModifyAffectedBlocksIndexes == undefined ? false : aModifyAffectedBlocksIndexes;
    var affectedBlocksIndexes = this._affectedBlocksIndexes;
    items = this._tgrid.getItemsForCalendarEvent(aCalendarEvent);
    //items = this._tgrid.getItemsForCalendarEvent(aCalendarEvent);

    inspect("_items", items);

    this._calendarEventsItems[aCalendarEvent.hashID] = {};

    for (var itemIndex in items) {
      if (modifyAffectedBlocksIndexes) {
        if (!(itemIndex in affectedBlocksIndexes))
          affectedBlocksIndexes[itemIndex] = true;
      }
      this._blocks[itemIndex].addItem(items[itemIndex]);
      this._calendarEventsItems
              [aCalendarEvent.hashID][itemIndex] = items[itemIndex].hashID;
    }

    inspect("_calendarEventsItems", this._calendarEventsItems);

  },

  _calculateIEBlockWidthCorrection: function() {
    var pixelLengthInPercents = rflect.math.pixelToPercent(1, this._size.grid.width);
    return goog.userAgent.IE ? 4 * pixelLengthInPercents : 0;
  },

  _calculateEventGrid: function Calendar__calculateEventGrid(aRecalculate) {

    var viewOptions = this.viewOptions;
    var rowsQuantity = viewOptions.rowsQuantity;
    var columnsQuantity = viewOptions.columnsQuantity;

    var RECALC_X = 0x1;
    var RECALC_Y = 0x2;
    var counter = 0;

    var pixelPosition = 0;

    if (!((aRecalculate & RECALC_X) == 0)) {

      //echo("recalcX");

      this._gridWidthIncrementInPixels = this._size.eventOwner.width / columnsQuantity;
      this._gridColumnsPixelPositions = [];

      for (counter = 0; counter < columnsQuantity; counter++) {

        pixelPosition = this._gridWidthIncrementInPixels * counter;

        this._gridColumnsPixelPositions.push(pixelPosition);
      //echo("pixel position #" + counter + " = " + this._gridWidthIncrementInPixels * counter, 1);

      }

    }

    if (!((aRecalculate & RECALC_Y) == 0)) {

      //echo("recalcY");

      this._gridHeightIncrementInPixels = this._size.eventOwner.height / rowsQuantity;
      this._gridRowsPixelPositionsShifted = [];

      for (counter = 0; counter < rowsQuantity; counter++) {

        pixelPosition = this._gridHeightIncrementInPixels * counter;

        this._gridRowsPixelPositionsShifted.push(pixelPosition);

      }

    }

    inspect("_gridColumnsPixelPositions", this._gridColumnsPixelPositions);
    inspect("_gridRowsPixelPositionsShifted", this._gridRowsPixelPositionsShifted);
  },

  _calculateIntervals: function Calendar__calculateIntervals() {

    var viewOptions = this.viewOptions;

    var timeGridStart = this._tgrid.getStartDateTime();
    var timeGridEnd = this._tgrid.getEndDateTime();
    var coveredStart = null;
    var coveredEnd = null;

    // Intervals
    var intervalVisible = null;
    var intervalFull = this._intervals.full;
    var intervalCovered = null;
    var intervalUpdate = {biArc: [], rightArc: [], leftArc:[]};
    var gaps = this._intervals.gaps;
    var intervalGap = null;

    var counter = 0;

    intervalVisible = new rflect.datetime.Interval(
            timeGridStart,
            timeGridEnd);

    // Cache visible interval
    intervalVisible.cacheProperties();
    intervalVisible.cachedMode = true;

    // Setting startDateTime for timegrid
    switch (viewOptions.type) {
      case rflect.cal.Main.Modes.MULTIDAY:{
        coveredStart = timeGridStart.clone()
                .addDays(-viewOptions.columnsQuantity);
        coveredEnd = timeGridEnd.clone()
                .addDays(viewOptions.columnsQuantity);
      };break;
      case rflect.cal.Main.Modes.MULTIWEEK: {
        coveredStart = timeGridStart.clone()
                .addWeeks(-viewOptions.rowsQuantity);
        coveredEnd = timeGridEnd.clone()
                .addWeeks(viewOptions.rowsQuantity);
      };break;
      case rflect.cal.Main.Modes.WEEK: {
        coveredStart = timeGridStart.clone()
                .addWeeks(-1);
        coveredEnd = timeGridEnd.clone()
                .addWeeks(1);
      };break;
      case rflect.cal.Main.Modes.MONTH: {
        coveredStart = timeGridStart.clone()
                .addWeeks(-5);
        coveredEnd = timeGridEnd.clone()
                .addWeeks(5);
      };break;
      default:break;
    }
    ;

    intervalCovered = new rflect.datetime.Interval(
            coveredStart,
            coveredEnd);

    // If covered interval intersects some gaps,
    //  than put gap according to its type in update
    //  collection, and remove it from gap collection.
    //  From this moment on and further, gap is treated
    //  as standart update interval.
    if (!(gaps == null)) {
      for (counter = gaps.length - 1; counter >= 0; counter--) {
        if (intervalCovered.overlaps(intervalGap = gaps[counter].interval)) {
          intervalUpdate[gaps[counter].type].push(intervalGap);
          gaps.splice(counter, 1);
        }
      }
    }

    if (intervalFull == null) {
      // This is done only at startup
      intervalFull = intervalCovered.clone();
      intervalUpdate.biArc.push(intervalCovered.clone());
    } else {
      if (intervalCovered.overlaps(intervalFull)) {
        if (intervalCovered.contains(intervalFull)
                && !intervalCovered.equals(intervalFull)) {
          // This is situation when covered interval
          //  is wider than full:
          //      -----FULL------
          //  --------COVERED--------
          intervalUpdate.leftArc.push(new rflect.datetime.Interval(intervalCovered.getStart(),
                  intervalFull.getStart()));
          intervalUpdate.rightArc.push(new rflect.datetime.Interval(intervalFull.getEnd(),
                  intervalCovered.getEnd()));
          intervalFull =
          new rflect.datetime.Interval(intervalCovered.getStart(), intervalCovered.getEnd());

        } else if (coveredStart.compare(intervalFull.getStart()) == -1) {
          // This is situation when covered interval
          //  is shifted to the left from full:
          //      ---------FULL----------
          //  --------COVERED--------
          intervalUpdate.leftArc.push(new rflect.datetime.Interval(intervalCovered.getStart(),
                  intervalFull.getStart()));
          intervalFull.setStart(intervalCovered.getStart());

        } else if (coveredEnd.compare(intervalFull.getEnd()) == 1) {
          // This is situation when covered interval
          //  is shifted to the left from full:
          //  ---------FULL----------
          //      --------COVERED--------
          intervalUpdate.rightArc.push(new rflect.datetime.Interval(intervalFull.getEnd(),
                  intervalCovered.getEnd()));
          intervalFull.setEnd(intervalCovered.getEnd());
        }
        // In this situation, we do nothing, because
        // covered interval lies entirely within full interval
        // so we don't need update:
        // ---------FULL----------
        //    -----COVERED-----

      } else {
        if (coveredEnd.compare(intervalFull.getStart()) == -1) {
          // This is situation when covered interval
          //  lies before full:
          //                                ---------FULL----------
          //  --------COVERED--------
          intervalUpdate.leftArc.push(new rflect.datetime.Interval(intervalCovered.getStart(),
                  intervalFull.getStart()));
          intervalFull.setStart(intervalCovered.getStart());

        } else if (coveredStart.compare(intervalFull.getEnd()) == 1) {
          // This is situation when covered interval
          //  lies after full:
          //  ---------FULL----------
          //                               --------COVERED--------
          intervalUpdate.rightArc.push(new rflect.datetime.Interval(intervalFull.getEnd(),
                  intervalCovered.getEnd()));
          intervalFull.setEnd(intervalCovered.getEnd());

        }
      }
    }

    this._intervals.covered = intervalCovered;
    this._intervals.visible = intervalVisible;
    this._intervals.full = intervalFull;
    this._intervals.update = intervalUpdate;

    /*echo("intervalCovered: " + intervalCovered);
    echo("intervalVisible: " + intervalVisible);
    echo("intervalFull: " + intervalFull);
    echo("intervalUpdate: " + intervalUpdate);
    */

    inspect("_intervalsCovered", intervalCovered);
    inspect("_intervalsVisible", intervalVisible);
    inspect("_intervalsFull", intervalFull);
    inspect("_intervalsUpdate", intervalUpdate);
    inspect("_gaps", this._intervals.gaps);

  },

  _changeBlockCapacity: function Calendar__changeBlockCapacity(
          aSpaceCapacities/*aSpaceIndex, aCapacity*/) {

    var viewOptions = this.viewOptions;

    var minimalCalendarEventHeightInPixels = this._minimalCalendarEventHeightInPixel;
    var gridFreespaceDaymodeWidthInPixels = this._gridFreespaceDaymodeWidthInPixels;
    var gridFreespaceMonthmodeHeightInPixels = this._gridFreespaceMonthmodeHeightInPixels;

    var spaceIndex = "";

    var oldCapacity = 0;
    var newCapacity = 0;

    var spacePercentWidth = 0;
    var rectanglePixelWidth = 0;


    var deltas = {};

    var capacityChanged = false;
    var capacitiesChanged = {};

    //echo("_changeBlockCapacity called");

    for (spaceIndex in aSpaceCapacities) {

      spaceIndex = +spaceIndex;

      //echo("oldCapacity: " + this._blocks[spaceIndex].getCapacity());
      //echo("newCapacity: " + aSpaceCapacities[spaceIndex]);

      // Only do something if capacity really changed
      if ((oldCapacity = this._blocks[spaceIndex].getCapacity())
              != (newCapacity = aSpaceCapacities[spaceIndex])) {

        //(!((recalculate & RECALC_X) == 0))
        if (!capacityChanged)
          capacityChanged = true;

        capacitiesChanged[spaceIndex] = true;

        this._blocks[spaceIndex].setCapacity(newCapacity);

        deltas[spaceIndex]
                = this._getDelta(spaceIndex, newCapacity, oldCapacity);

      }

    }

    inspect("_deltas", deltas);

    // Then we need to expand or collapse
    //  space according to new capacity
    if (capacityChanged) {

      // Form cell block elements only if we need resize
      //this._formCellBlockElements();

      this._gridControl.changeSpaceValue(deltas);
    }

    inspect("_gridControl: ", this._gridControl);

    return capacitiesChanged;
  },


  _changeCalendarEvent: function Calendar_changeCalendarEvent(aOldCalEvent,
                                                              aNewCalEvent,
                                                              aOptOldCalEventIndex,
                                                              aOptByControl) {

    var changeOptions = {

      startDateTime: null,
      endDateTime: null,
      id: null,
      descriptionID: null,
      type: null,
      name: null
    };

    var index = aOptOldCalEventIndex == undefined ? -1 : aOptOldCalEventIndex;
    var byControl = aOptByControl == undefined ? false : aOptByControl;

    var searchResult = null;
    var oldEvent = null;
    var oldEventHashID = "";
    var newEvent = null;

    var counter = 0;
    var length = 0;

    var calendarEventsCollection = this._calendarEventsCollection;

    var changeResult = false;

    var intervalVisible = this._intervals.visible;
    var visibleOld = false;
    var visibleNew = false;

    switch (typeof aOldCalEvent) {
      case "string": {
        // Old event is given by id
        oldEventHashID = aOldCalEvent;
      };break;
      case "object": {
        // Old event given directly
        oldEventHashID = aOldCalEvent.hashID;
      };break;
    }

    if (index < 0) {
      searchResult = this._getCalendarEventByID(oldEventHashID);
      oldEvent = searchResult[0];
      index = searchResult[1];
    } else {
      oldEvent = aOldCalEvent;
    }

    echo("index: " + index);

    if (aNewCalEvent instanceof rflect.cal.CalendarEvent) {

      // New event given directly
      newEvent = aNewCalEvent;

    } else {

      // New event given by options
      newEvent = oldEvent.clone();

      goog.object.extend(changeOptions, aNewCalEvent);

      if (!(changeOptions.startDateTime == null)) {
        newEvent.setStart(changeOptions.startDateTime);
      }
      if (!(changeOptions.endDateTime == null)) {
        newEvent.setEnd(changeOptions.endDateTime);
      }
      if (!(changeOptions.id == null)) {
        newEvent.setID(changeOptions.id);
      }
      if (!(changeOptions.descriptionID == null)) {
        newEvent.setDescriptionID(changeOptions.id);
      }
      if (!(changeOptions.type == null)) {
        newEvent.type = changeOptions.type;
      }
      if (!(changeOptions.name == null)) {
        newEvent.name = changeOptions.name;
      }

    }
    ;

    inspect("_oldEvent", oldEvent);
    inspect("_newEvent", newEvent);

    if (!(oldEvent == null)
            && !newEvent.equals(oldEvent)) {

      // Cache new event properties
      newEvent.cacheProperties(0x23F, 0x8, 0x237);
      newEvent.cachedMode = true;

      // Put eventID to pendingEventsCollection.forModify to show that it has not
      // been approved to server yet
      this._pendingCalendarEventsCollection
              .forModify[oldEvent.hashID]
              = oldEvent;

      // Removing old event and adding new event
      calendarEventsCollection.splice(index, 1, newEvent);

      visibleOld = byControl
              ? true
              : oldEvent.overlaps(intervalVisible);

      if (visibleOld) {

        this._deleteCalendarEventFromBlocks(oldEvent);
        this._checkPendingJobs();

      }

      visibleNew = byControl
              ? true
              : newEvent.overlaps(intervalVisible);

      if (visibleNew) {

        this._addCalendarEventToBlocks(newEvent);
        this._checkPendingJobs();

      }

      // Add calendar event to server
      var data = {
        action: rflect.cal.Main.Actions.ACTION_CHANGE_EVENT,
        userID: "alex komov",
        sessionID: "129348104",
        event: newEvent.toJSONString(),
        changeMethod: rflect.cal.Main.Events.DRAG
      };

      function onCompletionAsync(request) {

        //echo("success");

        var response = null;
        var status = "";
        var reason = "";

        try {
          response = goog.json.parse(request.responseText);
        } catch(ex) {
          onFailure();
          return;
        }

        status = response[0]["status"];
        reason = response[0]["reason"];

        if (status == "success") {

          // On successful response, delete hashID from pending collection
          delete this._pendingCalendarEventsCollection.forModify[oldEvent.hashID];

        } else {

          onFailure();

        }

      }

      function onFailure() {

        // We perform search once again because
        //  collection may may have changed.
        searchResult = this._getCalendarEventByID(oldEvent.hashID);
        index = searchResult[1];
        
        // Delete old event from pending collection
        delete this._pendingCalendarEventsCollection
                .forModify[oldEvent.hashID];

        // Remove new event and restore old event  
        calendarEventsCollection.splice(index, 1, oldEvent);

        visibleNew = newEvent.overlaps(intervalVisible);

        if (visibleNew) {

          this._deleteCalendarEventFromBlocks(newEvent);
          this._checkPendingJobs();

        }

        visibleOld = oldEvent.overlaps(intervalVisible);

        if (visibleOld) {

          this._addCalendarEventToBlocks(oldEvent);
          this._checkPendingJobs();

        }

      }

      rflect.XMLHTTP.request({

        onCompletion: onCompletionAsync,
        onFailure: onFailure,
        url: rflect.cal.Main.APP_PATH_EVENTS,
        contentType: rflect.mime.URLENCODED,
        data:data,
        boundObject: this

      });

      changeResult = true;

      this._calendarEventsCollection = calendarEventsCollection;

    }
    ;

    return changeResult;

  },

  _changeCalendarEventByControl: function Calendar__changeCalendarEventByControl(
          aEvent) {

    var changedEvent = null;

    // Hide popup
    aEvent.target.show(false);

    if ((changedEvent = aEvent.target.getCalendarEvent()) != null)
      this._changeCalendarEvent(this._drag.calEvent,
              changedEvent,
              this._drag.index,
              true);
  },

  _changeSelectionRectanglesState: function Calendar_removeSelectionRectangle() {

    this._selectionRectangle.style["backgroundColor"] = "rgb(60, 180, 254)";
    this._selectionRectangleLower.style["backgroundColor"] =
    "rgb(60, 180, 254)";
    this._selectionRectangleUpper.style["backgroundColor"] =
    "rgb(60, 180, 254)";

  },

  _checkPendingJobs: function Calendar__checkPendingJobs() {

    var eventHashID = "";
    var calEvent = null;
    var intervalVisible = this._intervals.visible;
    var pendingCalendarEventsCollection = this._pendingCalendarEventsCollection;

    // Only forAdd jobs needed to be checked
    for (eventHashID in pendingCalendarEventsCollection["forAdd"]) {
      if ((calEvent =
           pendingCalendarEventsCollection["forAdd"][eventHashID]).overlaps(intervalVisible)) {
        this._setCalendarEventItemsOpacity(calEvent, rflect.cal.Main.OPACITY_NEW_EVENT, 0x2);
      }
    }

  },

  _resetBlocks: function Calendar__resetBlocks() {

    var blocks = this._blocks;
    var counter = 0;
    var length = 0;

    for (counter = 0,length = blocks.length; counter < length; ++counter) {
      blocks[counter].reset();
    }

  },

  _collapseBlock: function Calendar__collapseBlock(aIndex, var_args) {

    //echo("_collapseBlock called");

    var indexes = arguments;
    var index = 0;

    var counter = 0;

    var newCapacities = {};
    var changedCapacities = {};
    var changedCapacityIndex = 0;

    //echo("collapse block called");

    for (counter = 0; counter < indexes.length; counter++) {

      index = indexes[counter];

      // Check if block is in expanded mode
      if (this._blocks[index].expanded) {
        newCapacities[index] = this._blocks[index].minimalCapacity;
      }

    }

    inspect("_newCapacities", newCapacities);

    changedCapacities = this._changeBlockCapacity(newCapacities);

    for (changedCapacityIndex in changedCapacities) {
      this._blocks[changedCapacityIndex].expanded = false;
    }

    this._updateScrollState();

  }});