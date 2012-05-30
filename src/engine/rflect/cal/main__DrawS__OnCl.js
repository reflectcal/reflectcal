rflect.cal.Main.__fuse({

  _drawSelectionRectangle: function Calendar_drawSelectionRectangle(aLeft, aTop,
                                                                    aWidth,
                                                                    aHeight,
                                                                    aMode) {

    var viewOptions = this.viewOptions;

    var selectionRectangle = null;

    var styleObject = {};

    var vUnits = "";
    var hUnits = "";

    switch (aMode) {
      case rflect.cal.Main.SELECTION_RECTANGLE_CENTRAL:{
        selectionRectangle = this._selectionRectangle;
      };break;
      case rflect.cal.Main.SELECTION_RECTANGLE_UPPER:{
        selectionRectangle = this._selectionRectangleUpper;
      };break;
      case rflect.cal.Main.SELECTION_RECTANGLE_LOWER:{
        selectionRectangle = this._selectionRectangleLower;
      };break;
      default: selectionRectangle = this._selectionRectangle; break;

    }

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        vUnits = "ex";
        hUnits = "%";
      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        vUnits = "%";
        hUnits = "%";
      };break;
    }

    // IE shows selection rectangle event with 0% height,
    //  so we ensure that in that case
    //  rectangle is not displayed
    styleObject["display"] = (aWidth * aHeight != 0)
            ? "block"
            : "none";
    styleObject["backgroundColor"] = "rgb(100, 250, 204)";
    styleObject["left"] = aLeft + hUnits;
    styleObject["top"] = aTop + vUnits;
    styleObject["width"] = aWidth + hUnits;
    styleObject["height"] = aHeight + vUnits;

    goog.style.setStyle(selectionRectangle, styleObject);

  },

  /*
  * expands block to maximum possible capacity
  * */

  _expandBlock: function Calendar__expandBlock(aIndex, var_args) {

    //echo("_expandBlock called");

    var indexes = arguments;
    var index = 0;

    var potentialCapacity = 0;

    var counter = 0;

    var newCapacities = {};
    var changedCapacities = {};
    var changedCapacityIndex = 0;

    for (counter = 0; counter < indexes.length; counter++) {

      index = indexes[counter];

      // Check if block wasn't already expanded
      if (!this._blocks[index].expanded) {

        potentialCapacity = this._blocks[index].getPotentialCapacity();

        newCapacities[index]
                = (potentialCapacity > this._minimalCapacity)
                ? potentialCapacity
                : this._minimalCapacity;

      }

    }

    inspect("_newCapacities", newCapacities);

    changedCapacities = this._changeBlockCapacity(newCapacities);

    for (changedCapacityIndex in changedCapacities) {
      this._blocks[changedCapacityIndex].expanded = true;
    }

    this._updateScrollState();

    inspect("_expandedBlocksIndexes ", this._expandedBlocksIndexes);

  },

  _formAutoScrolls: function Calendar__formAutoScrollers() {
    this._autoscrX = new rflect.dom.AutoScroll({
      boundElement: this._gridContainer,
      configuration: rflect.dom.AutoScroll.CONFIGURATION_HORIZONTAL,
      delta: 20
    });
    this._autoscrY = new rflect.dom.AutoScroll({
      boundElement: this._gridContainer,
      configuration: rflect.dom.AutoScroll.CONFIGURATION_VERTICAL,
      delta: 20
    });
    goog.events.listen(this._autoscrX, "scrollStart", function() {
      this._scrollOptions.xInProgress = true;
    }, false, this);
    goog.events.listen(this._autoscrX, "scrollStop", function() {
      this._scrollOptions.xInProgress = false;
      this._scrollOptions.xLimitChecked = false;
    }, false, this);
    goog.events.listen(this._autoscrY, "scrollStart", function() {
      this._scrollOptions.yInProgress = true;
    }, false, this);
    goog.events.listen(this._autoscrY, "scrollStop", function() {
      this._scrollOptions.yInProgress = false;
      this._scrollOptions.yLimitChecked = false;
    }, false, this);

  },

  _formBlocks: function Calendar__formBlocks(
          aBlocksOptions) {

    var viewOptions = this.viewOptions;

    var blocksQuantity = 0;

    var RESET_BLOCKS = 0x1;
    var BUILD_BLOCKS_ELEMENTS = 0x2;
    var UPDATE_BLOCKS_ON_SWITCH_VIEW = 0x4;
    var UPDATE_BLOCKS_ON_RESIZE = 0x8;

    var counter = 0;
    var length = 0;
    var capacityDelta = 0;
    var newMinimalCapacity = 0;
    var spacePixelTop = 0;
    var spacePixelHeight = 0;
    var cumulativeHeight = 0;

    var shift = -this._gridHeightIncrementInPercents;

    // Daymode freespace width is float
    var gridFreespaceDaymodeWidthInPixels = rflect.cal.Main.GRID_FREESPACE_DAYMODE_WIDTH_IN_PIXELS_GRADATION_1;
    // Monthmode freespace height is fixed
    var gridFreespaceMonthmodeHeightInPixels = rflect.cal.Main.GRID_FREESPACE_MONTHMODE_HEIGHT_IN_PIXELS;

    var gridFreespaceDaymodeWidthInPercents = 0;
    var gridFreespaceMonthmodeHeightInPercents = 0;

    var oldCapacities = null;
    var newCapacities = null;
    var oldCapacity = 0;
    var newCapacity = 0;

    var gridWidthIncrementInPercents = this._gridWidthIncrementInPercents;
    var gridHeightIncrementInPercents = this._gridHeightIncrementInPercents;

    var sb = null;

    var t1 = "<div id=\"";
    var t2 = "\" class=\"";

    var th1 = "\" style=\"top: ";
    var th2 = "; height: ";

    var tv1 = "\" style=\"left: ";
    var tv2 = "; width: ";

    var t3 = ";\">";
    var t4 = "</div>";

    var blockHeightDelta = 0;
    var eventBlockElementTop = 0;
    var eventBlockElementHeight = 0;
    var cellBlockElementTop = 0;
    var cellBlockElementHeight = 0;

    var eventBlockElement = null;

    var block = null;

    var gridColumnElement = null;
    var gridRowElement = null;

    var eventBlockElements = [];
    var gridColumnsElements = this._gridColumnsElements;
    var gridRowsElements = this._gridRowsElements;

    var ieBlockWidthCorrection = 0;

    this._gridFreespaceDaymodeWidthInPixels = gridFreespaceDaymodeWidthInPixels;

    ieBlockWidthCorrection = this._calculateIEBlockWidthCorrection();

    //echo("displayTypeModeChanged: " + displayTypeModeChanged, 1);
    //echo("modeDisplayType: " + modeDisplayType, 1);

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        blocksQuantity = viewOptions.columnsQuantity;
      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        blocksQuantity = viewOptions.rowsQuantity;
      };break;
      default:break;
    }

    if ((aBlocksOptions & RESET_BLOCKS) != 0)
      this._blocks.length = 0;

    if ((aBlocksOptions & BUILD_BLOCKS_ELEMENTS) != 0) {

      sb = new goog.string.StringBuffer();

      switch (viewOptions.displayType) {
        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

          gridFreespaceDaymodeWidthInPercents =
          gridFreespaceDaymodeWidthInPixels / this._size.eventOwner.width
                  * 100;

          for (counter = 0; counter < blocksQuantity; ++counter) {

            // Adding container element
            sb.append(
                    t1,
                    "eventBlockContainer",
                    counter,
                    t2,
                    "vEventBlockContainer ",
                    "eventBlockContainer",
                    tv1,
                    (this._gridWidthIncrementInPercents * counter
                            + gridFreespaceDaymodeWidthInPercents),
                    "%",
                    tv2,
                    (this._gridWidthIncrementInPercents
                            - gridFreespaceDaymodeWidthInPercents
                            - ieBlockWidthCorrection),
                    "%",
                    t3,
                    t4
                    );
          }

          this._eventOwner.innerHTML = sb.toString();

        };break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

          gridFreespaceMonthmodeHeightInPercents =
          gridFreespaceMonthmodeHeightInPixels / this._size.eventOwner.height
                  * 100;

          blockHeight = this._size.eventOwner.height / blocksQuantity
                  - gridFreespaceMonthmodeHeightInPixels;
          this._minimalCapacity
                  = newMinimalCapacity
                  = Math.floor(blockHeight / rflect.cal.Main.MINIMAL_CALENDAR_EVENT_HEIGHT_IN_PIXEL);

          for (counter = 0; counter < blocksQuantity; ++counter) {

            // Adding container element
            sb.append(
                    t1,
                    "eventBlockContainer",
                    counter,
                    t2,
                    "hEventBlockContainer ",
                    "eventBlockContainer",
                    th1,
                    (this._gridRowsPercentPositions[counter]
                            + gridFreespaceMonthmodeHeightInPercents
                            + shift),
                    "%",
                    th2,
                    (gridHeightIncrementInPercents
                            - gridFreespaceMonthmodeHeightInPercents),
                    "%",
                    t3,
                    t4
                    );
          }


          this._eventOwner.innerHTML = sb.toString();

        };break;
      }

    }

    if ((aBlocksOptions & UPDATE_BLOCKS_ON_SWITCH_VIEW) != 0) {

      switch (viewOptions.displayType) {
        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

          for (counter = 0; counter < blocksQuantity; ++counter) {
            eventBlockElement =
            eventBlockElements[counter] =
            goog.dom.$("eventBlockContainer"
                    + counter);

            if (this._blocksVertical[counter] == undefined) {

              block = this._blocks[counter] =
                      this._blocksVertical[counter] =
                      new rflect.cal.BlockVertical({
                        blockHeight: this._size.eventOwner.height,
                        timegrid: this._tgrid,
                        boundElement: eventBlockElement,
                        capacity: rflect.cal.Main.MINIMAL_CAPACITY_DAY_MODE,
                        minimalCapacity: rflect.cal.Main.MINIMAL_CAPACITY_DAY_MODE,
                        index: counter
                      });

              this.listen(block, "capacityChange", this._onBlockCapacityChange);

            } else {

              block = this._blocks[counter] = this._blocksVertical[counter];
              block.boundElement = eventBlockElement;
              block.capacity = this._minimalCapacity;

            }

          }

        };break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

          for (counter = 0; counter < blocksQuantity; ++counter) {

            eventBlockElement =
            eventBlockElements[counter] = goog.dom.$("eventBlockContainer"
                    + counter);

            if (this._blocksHorizontal[counter] == undefined) {

              block = this._blocks[counter] =
                      this._blocksHorizontal[counter] =
                      new rflect.cal.BlockHorizontal({
                        timegrid: this._tgrid,
                        boundElement: eventBlockElement,
                        capacity: this._minimalCapacity,
                        minimalCapacity: this._minimalCapacity,
                        index: counter
                      });

              this.listen(block, "capacityChange", this._onBlockCapacityChange);

            } else {

              block = this._blocks[counter] = this._blocksHorizontal[counter];
              block.boundElement = eventBlockElement;
              block.capacity = this._minimalCapacity;
              block.minimalCapacity = this._minimalCapacity;

            }

          }

        };break;
      }

    }

    if ((aBlocksOptions & UPDATE_BLOCKS_ON_RESIZE) != 0) {

      eventBlockElements = this._eventBlockElements;

      switch (viewOptions.displayType) {

        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

          // Only do block reforming if none of them is expanded
          if (!this._blocksExpandedState) {

            this._gridColumnsPercentPositions = [];

            gridFreespaceDaymodeWidthInPixels =
            this._gridFreespaceDaymodeWidthInPixels;
            gridFreespaceDaymodeWidthInPercents =
            gridFreespaceDaymodeWidthInPixels / this._size.eventOwner.width * 100;

            for (counter = 0,length = eventBlockElements.length;
                 counter < length; ++counter) {

              eventBlockElement
                      = eventBlockElements[counter];

                  // Reset positions of columns
              this._gridColumnsPercentPositions.push(gridWidthIncrementInPercents
                      * counter);
              if (counter != 0) {
                (gridColumnElement
                        = gridColumnsElements[counter - 1])
                        .style["left"]
                        = gridWidthIncrementInPercents * counter + "%";

              }

              // Changing container element
              eventBlockElement.style["left"]
                      = this._gridColumnsPercentPositions[counter]
                      + gridFreespaceDaymodeWidthInPercents
                      + "%";
              eventBlockElement.style["width"]
                      = gridWidthIncrementInPercents
                      - gridFreespaceDaymodeWidthInPercents
                      - ieBlockWidthCorrection
                      + "%";

            }

          }

        };break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

          gridFreespaceMonthmodeHeightInPercents
                  = gridFreespaceMonthmodeHeightInPixels / this._size.eventOwner.height
                  * 100;

          for (counter = 0,length = eventBlockElements.length;
               counter < length; ++counter) {

            eventBlockElement
                    = eventBlockElements[counter];
                  // Changing container element

            inspect("_gridRowsPixelPositionsShifted", this._gridRowsPixelPositionsShifted);

            blockHeightDelta
                    = (this._size.gridContainer.height
                    - this._size.gridContainerBeforeResize.height) / eventBlockElements.length;
                 //echo("blockHeightDelta: " + blockHeightDelta, 3);
            //echo("this._size.eventOwner.height: " + this._size.eventOwner.height, 3);

            spacePixelTop = cumulativeHeight;
            spacePixelHeight
                    = ((this._gridRowsPixelPositionsShifted[counter + 1] != undefined)
                    ? this._gridRowsPixelPositionsShifted[counter + 1]
                    : this._size.eventOwnerBeforeResize.height)
                    - this._gridRowsPixelPositionsShifted[counter]
                    + blockHeightDelta;
            cumulativeHeight += spacePixelHeight

            this._gridRowsPixelPositionsShifted[counter]
                    = spacePixelTop;

            //echo("spacePixelTop[" + counter + "]: " + spacePixelTop, 3);
            //echo("spacePixelHeight[" + counter + "]: " + spacePixelHeight, 3);

            eventBlockElementTop = (spacePixelTop
                    + gridFreespaceMonthmodeHeightInPixels) / this._size.eventOwner.height
                    * 100;
            eventBlockElementHeight = (spacePixelHeight
                    - gridFreespaceMonthmodeHeightInPixels) / this._size.eventOwner.height
                    * 100;
            this._gridRowsPercentPositionsShifted[counter]
                    = cellBlockElementTop =
                      spacePixelTop / this._size.eventOwner.height * 100;
            cellBlockElementHeight
                    = spacePixelHeight / this._size.eventOwner.height * 100;

            eventBlockElement.style["top"] = eventBlockElementTop + "%";
            eventBlockElement.style["height"] = eventBlockElementHeight + "%";

            gridRowElement
                    = gridRowsElements[counter];

            if (counter != (length - 1)) {
              gridRowElement.style["top"]
                      = cellBlockElementTop + cellBlockElementHeight + "%";
            }

            this._cellBlockElements[counter].style["top"]
                    = cellBlockElementTop + "%";
            this._cellBlockElements[counter].style["height"]
                    = cellBlockElementHeight + "%";

          }

          inspect("_gridRowsElements", this._gridRowsElements);
          // Change capacity and redraw events according
          // to new capacities
          blockHeight
                  = this._size.gridContainer.height / eventBlockElements.length
                  - gridFreespaceMonthmodeHeightInPixels;
          newMinimalCapacity = Math.floor(blockHeight / rflect.cal.Main.MINIMAL_CALENDAR_EVENT_HEIGHT_IN_PIXEL);

          //echo("blockHeight: "
          // + blockHeight, 3);
          //echo("this._minimalCapacity: " + this._minimalCapacity, 3);
          //echo("newMinimalCapacity: " + newMinimalCapacity, 3);

          if (newMinimalCapacity != this._minimalCapacity) {

            capacityDelta = newMinimalCapacity - this._minimalCapacity;
                 //echo("capacityDelta: " + capacityDelta, 3);
            this._minimalCapacity = newMinimalCapacity;

            oldCapacities = {};
            newCapacities = {};

            for (counter = 0,length = this._blocks.length;
                 counter < length; ++counter) {

              // Set block minimalCapacity
              this._blocks[counter].minimalCapacity
                      = newMinimalCapacity;

                    // Save old capacities
              oldCapacity = this._blocks[counter].getCapacity();
                    // Set new capacities
              newCapacity
                      = ((oldCapacity + capacityDelta)
                      < rflect.cal.Main.MINIMAL_CAPACITY_MONTH_MODE)
                      ? rflect.cal.Main.MINIMAL_CAPACITY_MONTH_MODE
                      : (oldCapacity + capacityDelta);

              this._blocks[counter].setCapacity(newCapacity);

            }

          }

        };break;
      }


    }

    this._eventBlockElements = eventBlockElements;

    inspect("_blocks", this._blocks);
    inspect("_blocksVertical", this._blocksVertical);
    inspect("_blocksHorizontal", this._blocksHorizontal);

    inspect("_eventBlockElements ", this._eventBlockElements);
    inspect("_blockElementsCapacities ", this._blockElementsCapacities);
    inspect("_gridControl", this._gridControl);
  },

  _formHeaders: function Calendar__formHeaders() {

    var viewOptions = this.viewOptions;
    var columnsQuantity = viewOptions.columnsQuantity;
    var rowsQuantity = viewOptions.rowsQuantity;

    var rowsQuantityHalf = 0;
    var dateFormat = "ddd, d MMM";

    var headerElementWidth = 100 / columnsQuantity;
    var dayGrid = this._tgrid.getDayGrid();
    var year = 0;
    var month = 0;
    var day = 0;

    var prettyPrintDateTime = null;

    var t1 = "<div class=\"";
    var t2 = "\" style=\"left: ";
    var t3 = "; width: ";
    var t4 = ";\">";
    var t5 = "<span id=\"";
    var t6 = "\"><a class=\"";
    var t7 = "\">";
    var t8 = "\" id=\"";
    var t9 = "</a></span><img id=\"";
    var t10 = "</span><img id=\"";
    var t11 = "\" class=\"more-no\" src=\"images/blank.gif\"/></div>";

    var t12 = "<div style=\"height: 6ex; top: ";
    var t13 = ";\" id=\"";
    var t14 = "\" class=\"";
    var t15 = "\"><div class=\"";
    var t16 = "\">";
    var t17 = "</div></div>";

    var counter = 0;
    var counterTop = 0;
    var dayCounter = 0;

    var sb = null;


    var moreThanOneCol = false;

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

        sb = new goog.string.StringBuffer();

        moreThanOneCol = (viewOptions.columnsQuantity > 1);

        for (counter = 0; counter < columnsQuantity; counter++) {

          year = dayGrid[0][counter]["year"];
          month = dayGrid[0][counter]["month"];
          day = dayGrid[0][counter]["day"];

          prettyPrintDateTime = new rflect.datetime.DateTime(year, month, day);

          dayCounter = prettyPrintDateTime.getLocaleDay();

          sb.append(
                  t1,
                  "chead ",
            //TODO: Check if day is today
                  "cheadNotToday",
                  t2,
                  headerElementWidth * counter,
                  "%",
                  t3,
                  headerElementWidth,
                  "%",
                  t4,
                  t5,
                  "chead" + counter
                  );

          if (moreThanOneCol) {
            sb.append(
                    t6,
                    "headerLink",
                    t8,
                    "chead_link" + counter,
                    t7
                    );
          } else {
            sb.append(t7);
          }
          ;

          sb.append(
                  rflect.loc.datetime.DateTime
                          .abbreviatedDayNames
                          [rflect.datetime.DateTime.getLocaleDayIndex(dayCounter++)],
                  ", ",
                  day,
                  " ",
                  rflect.loc.datetime.DateTime
                          .abbreviatedMonthNames[month]
                  );

          if (moreThanOneCol) {
            sb.append(t9);
          } else {
            sb.append(t10);
          }
          ;

          sb.append(
                  "morearr" + counter,
                  t11
                  );

        }
        ;

        this._colHeadersContainer.innerHTML = sb.toString();

        if (this._cachedRowHeadersDayMode == null) {

          sb.clear();

          this._cachedRowHeadersDayMode = {};

          for (counter = 0,counterTop = 0,rowsQuantityHalf = rowsQuantity / 2;
               counter < rowsQuantityHalf; counter++,counterTop += 6) {

            sb.append(
                    t12,
                    counterTop,
                    "ex",
                    t13,
                    "rhead" + counter,
                    t14,
                    "rhead",
                    t15,
                    "rheadtext",
                    t16,
                    counter < 10 ? "0" + counter : counter,
                    ":00",
                    t17
                    );

          }

          this._cachedRowHeadersDayMode.html
                  = this._rowHeaders.innerHTML = sb.toString();

        } else {

          this._rowHeaders.innerHTML
                  = this._cachedRowHeadersDayMode.html;

        }

        goog.events.unlistenByKey(this._listeners["colHeaders"]);
        if ((viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY)
                && moreThanOneCol) {

          this._listeners["colHeaders"] =
          goog.events.listen(this._colHeadersContainer, "mousedown", function(aEvent) {
            var target = aEvent.target;
            var targetID = target["id"];

            var col = 0;
            var cell = null;

            if (goog.dom.classes.has(target, "headerLink")) {

              col = targetID.match(/\d+/)[0];
              cell = dayGrid[0][col];

              // Day mode
              if (this._switchTab(this._tabAlpha)) {
                this._switchView({
                  startDateTime: new rflect.datetime.DateTime(cell["year"], cell["month"], cell["day"]),
                  type: rflect.cal.Main.Modes.MULTIDAY,
                  columnsQuantity: 1,
                  byTab: true
                });
              }
              ;
            }
            ;

          }, false, this);

        }

      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

        if (this._cachedColHeadersMonthMode == null) {

          sb = new goog.string.StringBuffer();

          this._cachedColHeadersMonthMode = {};

          for (counter = 0; counter < columnsQuantity; counter++) {

            sb.append(
                    t1,
                    "chead ",
              //TODO: Check if day is today
                    "cheadNotToday",
                    t2,
                    headerElementWidth * counter,
                    "%",
                    t3,
                    headerElementWidth,
                    "%",
                    t4,
                    t5,
                    "chead" + counter,
                    t7,
                    rflect.loc.datetime.DateTime.abbreviatedDayNames
                            [rflect.datetime.DateTime.getLocaleDayIndex(counter)],
                    t10,
                    "morearr" + counter,
                    t11
                    );

          }
          ;

          this._cachedColHeadersMonthMode.html
                  = this._colHeadersContainer.innerHTML = sb.toString();

        } else {

          this._colHeadersContainer.innerHTML
                  = this._cachedColHeadersMonthMode.html;

        }

        goog.events.unlistenByKey(this._listeners["colHeaders"]);

        inspect("_cachedColHeadersMonthMode", this._cachedColHeadersMonthMode);

      };break;
      default:break;
    }

  },

  _formGridControl: function Main__formGridControl(aResize) {

    var viewOptions = this.viewOptions;

    var resize = aResize == undefined ? false : aResize

    var gc = null;
    var containerDimension = 0;
    var delimiterPositions = null;
    var dayMode = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY;
    var monthMode = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH;

    if (dayMode) {
      containerDimension = this._size.grid.width;
      if (resize) {
        delimiterPositions = this._gridColumnsPercentPositionsDefault
      } else {
        delimiterPositions = this._gridColumnsPercentPositions;
      }
    } else if (monthMode) {
      containerDimension = this._size.grid.height;
      delimiterPositions = this._gridRowsPercentPositionsShifted;
    }

    if (this._gridControl == null) {

      gc = this._gridControl = new rflect.cal.GridControl({
        containerDimension: containerDimension,
        delimiterPositions: delimiterPositions
      });

      this.listen(gc, "changeSpaceValue", this._onChangeSpaceValue);

    } else {

      gc = this._gridControl;

      gc.containerDimension = containerDimension;
      if (!resize || dayMode) {
        gc.setDelimiterPositions.apply(gc, delimiterPositions);
      }

    }

  },

  _formHorizontalGrid: function Calendar_formHorizontalGrid(aRebuild) {

    var rebuild = aRebuild == undefined ? true : aRebuild;

    var viewOptions = this.viewOptions;
    var rowsQuantity = viewOptions.rowsQuantity;

    var gridRowElement = null;
    var gridRowsElements = null;

    var currentRowPercentPosition = 0;
    var currentRowPercentPositionShifted = 0;

    var counter = 0;

    var t1 = "<div id=\"";
    var t2 = "\" class=\"";
    var t3 = "\" style=\"top: ";
    var t4 = "; height: ";
    var t5 = "; z-index: ";
    var t6 = ";\"></div>";

    var sb = null;

    var gridHeightIncrementInPercents = 0;

    if (rebuild) {
      this._gridRowsPercentPositions = [];
      this._gridRowsPercentPositionsShifted = [];
    }

    //TODO: Make more sophisticated way to reform rows
    //TODO: Check if there's need to recalculate, though this function should only be used when row mode has changed

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY: {
        if (this._cachedRowsDayMode == null) {

          sb = new goog.string.StringBuffer();

          this._cachedRowsDayMode = {};

          gridHeightIncrementInPercents
                  = this._gridHeightIncrementInPercents
                  = rflect.cal.Main.GRID_HEIGHT_DAYMODE_PERCENTS / rowsQuantity;
          for (counter = 0; counter < rowsQuantity; counter++) {
            currentRowPercentPosition
                    = gridHeightIncrementInPercents * (counter + 1);
            currentRowPercentPositionShifted
                    = gridHeightIncrementInPercents * counter;
            /*<div style="top: 3ex; z-index: 1;" id="r1" class="hrule hruleodd"></div>
            <div style="top: 6ex; z-index: 1;" id="r2" class="hrule hruleeven"></div>*/
            this._gridRowsPercentPositions[counter]
                    = currentRowPercentPosition;
            this._gridRowsPercentPositionsShifted[counter]
                    = currentRowPercentPositionShifted;

            if (!(counter == (rowsQuantity - 1)) || !goog.userAgent.IE) {

              sb.append(
                      t1,
                      "r",
                      (counter + 1).toString(),
                      t2,
                      "hrule ",
                      (((counter + 1) % 2) == 0)
                        // Even position
                              ? "hruleeven"
                        // Odd position
                              : "hruleodd",
                      t3,
                      currentRowPercentPosition,
                      "ex",
                      t5,
                      1,
                      t6
                      );

            }

          }

          this._cachedRowsDayMode.html
                  = this._containerGridRows.innerHTML
                  = sb.toString();
          this._cachedRowsDayMode.incr
                  = gridHeightIncrementInPercents;
          this._cachedRowsDayMode.pos
                  = this._gridRowsPercentPositions;
          this._cachedRowsDayMode.posShifted
                  = this._gridRowsPercentPositionsShifted;

        } else {

          this._containerGridRows.innerHTML
                  = this._cachedRowsDayMode.html;
          this._gridHeightIncrementInPercents
                  = this._cachedRowsDayMode.incr;
          this._gridRowsPercentPositions
                  = this._cachedRowsDayMode.pos;
          this._gridRowsPercentPositionsShifted
                  = this._cachedRowsDayMode.posShifted;


        }

      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH: {

        sb = new goog.string.StringBuffer();

        if (rebuild) {
          gridHeightIncrementInPercents
                  = this._gridHeightIncrementInPercents
                  = 100 / rowsQuantity;
        }

        for (counter = 0; counter < rowsQuantity; counter++) {

          if (rebuild) {
            // Keep positions of rows
            this._gridRowsPercentPositions[counter]
                    = gridHeightIncrementInPercents * (counter + 1);
            this._gridRowsPercentPositionsShifted[counter]
                    = gridHeightIncrementInPercents * counter;
          }

          if (!(counter == (rowsQuantity - 1)) || !goog.userAgent.IE) {

            sb.append(
                    t1,
                    "r",
                    (counter + 1).toString(),
                    t2,
                    "hrule ",
                    "hruleMonth",
                    t3,
                    this._gridRowsPercentPositions[counter],
                    "%",
                    t5,
                    1,
                    t6
                    );

          }
          ;
        }

        this._containerGridRows.innerHTML
                = sb.toString();

        gridRowsElements = [];

        for (counter = 1; counter < rowsQuantity; counter++) {

          gridRowsElements.push(goog.dom.$("r" + counter));

        }

        this._gridRowsElements = gridRowsElements;

      };break;
      default: break;
    }
    ;

    inspect("_gridRowsElements", this._gridRowsElements);
    inspect("_gridRowsPercentPositions", this._gridRowsPercentPositions);
    inspect("_gridRowsPercentPositionShifted", this._gridRowsPercentPositionsShifted);

  },

  _formMonthCellsSet: function Calendar_formMonthCellsSet(aRebuild) {

    var viewOptions = this.viewOptions;
    var rowsQuantity = viewOptions.rowsQuantity;
    var columnsQuantity = viewOptions.columnsQuantity;

    /*<div style="position: absolute; left: 57.1429%; top: 33.3333%; width: 14.3387%; height: 42px; z-index: 0;">
      <div class="currentDayDec"/>
    </div>*/
    /*<div style="position: absolute; left: 0%; top: 0%; width: 14.3387%; height: 42px; z-index: 1;">
      <div onmouseover="this.firstChild.style.textDecoration='underline'" onmouseout="this.firstChild.style.textDecoration='none'" onclick="_ChangeToDayMode(0)" id="rg_rowy_h0" class="dayOfMonth dayNotInMonth">
        <span id="dh0">26</span>
      </div>
    </div>*/
    var dayGrid = this._tgrid.getDayGrid();
    var thisMonth = viewOptions.baseDateTime.getMonth();

    var shift = -this._gridHeightIncrementInPercents;

    var counterColumns = 0;
    var counterRows = 0;

    var t1 = "<div id=\"";
    var t2 = "\" class=\"";
    var t3 = "\" style=\"position: absolute; top: ";
    var t4 = "; height: ";
    var t5 = ";\">";
    var t6 = "</div>";

    var t7 = "<div style=\"position: absolute; left: ";
    var t8 = "; width: ";
    var t9 = "; z-index: ";
    var t10 = ";\"><div id=\"";
    var t11 = "\" class=\"";
    var t12 = "\"><span style=\"z-index: 3; position: relative;\" id=\"";
    var t13 = "\"><a class=\"";
    var t14 = "\" id=\"";
    var t15 = "\">"
    var t16 = "</a></span></div></div>";

    var sb = null;

    var gridWidthIncrementInPercents = this._gridWidthIncrementInPercents;
    var gridHeightIncrementInPercents = this._gridHeightIncrementInPercents;

    var number = 0;

    var cellBlockContainer = 0;
    var cellBlocksElements = aRebuild ? [] : this._cellBlockElements;

    sb = new goog.string.StringBuffer();

    if (aRebuild) {

      this._decOwner.innerHTML = "";
      viewOptions.monthCellsSetBuilt = true;

    }

    for (counterRows = 0;
         counterRows < rowsQuantity; counterRows++) {

      if (aRebuild) {
        cellBlockContainer
                = goog.dom.$dom("div", {
          id: "cellBlockContainer" + counterRows,
          "class": "cellBlockContainer",
          style: "position: absolute; top: "
                  + (this._gridRowsPercentPositions[counterRows]
                  + shift) + "%" + "; height: "
                  + gridHeightIncrementInPercents + "%"
        });

        cellBlocksElements.push(this._decOwner.appendChild(cellBlockContainer));

      } else {
        cellBlockContainer = cellBlocksElements[counterRows];
      }

      /*sb.append(
              t1,
              "cellBlockContainer" + counterRows,
              t2,
              "hEventBlockContainer",
              t3,
              (this._gridRowsPercentPositions[counterRows]
                  + shift),
              "%",
              t4,
              gridHeightIncrementInPercents,
              "%",
              t5
              );*/

      for (counterCols = 0; counterCols < columnsQuantity;
           counterCols++) {

        sb.append(
                t7,
                this._gridColumnsPercentPositions[counterCols],
                "%",
                t8,
                gridWidthIncrementInPercents,
                "%",
          //t9,
          //1,
                t10,
                "cell_head",
                number,
                t11,
                "dayOfMonth ",
                !(dayGrid[counterRows][counterCols]["month"]
                        == thisMonth)
                        ? "dayNotInMonth"
                        : "dayInMonth",
                t12,
                "dn",
                number,
                t13,
                "dayNumber",
                t14,
                counterRows,
                ",",
                counterCols,
                t15,
                dayGrid[counterRows][counterCols]["day"],
                t16
                );

        number++;

      }

      cellBlockContainer.innerHTML
              = sb.toString();
      sb.clear();
      //sb.append(t6);

    }

    /*this._decOwner.innerHTML
            = sb.toString();
    sb.clear();*/

    this._cellBlockElements = cellBlocksElements;

    this.viewOptions = viewOptions;

    inspect("_cellBlockElements", this._cellBlockElements);

  },

  _formSizes: function Calendar__formSizes(aSize,
                                           aResize) {
    //echo("this._gridContainer size: " + goog.style.getBorderBoxSize(this._gridContainer), 1);
    //echo("this._grid size: " + goog.style.getBorderBoxSize(this._grid), 1);

    var viewOptions = this.viewOptions;

    var wholeDayGridHeight = 0;
    var gridHeight = 0;
    var gridContainerHeight = 0;
    var mainBodyHeight = 0;

    var deltaWidth = 0;
    var deltaHeight = 0;

    var dayMode = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY;
    var monthMode = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH;

    // Note: Below, 0 in one or both size dimensions means that this dimension
    //  is not taken into account.

    // Calculate default whole day grid size
    if (this._size.allDayGrid == null && dayMode) {

      this._size.allDayGrid = new goog.math.Size(0,
              this._allDayGrid["offsetHeight"]);

    }

    wholeDayGridHeight = this._allDayGrid == null ? 0 : (dayMode ? this._size.allDayGrid.height : (monthMode ? 0 : 0));

    // Calculate chrome static size
    if (this._size.chromeStatic == null) {

      mainBodyHeight = this._mainBody["offsetHeight"];
      gridContainerHeight = this._gridContainer["offsetHeight"];

      this._size.chromeStatic = new goog.math.Size(0,
              mainBodyHeight -
              gridContainerHeight -
              wholeDayGridHeight);
    }

    //echo("this._size.chromeStatic: " + this._size.chromeStatic);

    // Saving old gridcontainer size in case of resize mode
    if (aResize) {
      this._size.gridContainerBeforeResize = this._size.gridContainer.clone();
      this._size.gridBeforeResize = this._size.grid.clone();
      this._size.eventOwnerBeforeResize = this._size.gridBeforeResize.clone();
      deltaWidth = this._size.gridBeforeResize.width - this._size.gridContainerBeforeResize.width;
      deltaHeight = this._size.gridBeforeResize.height - this._size.gridContainerBeforeResize.height;

      //echo("delta between grid height and gridContainer height: " + deltaHeight);
      //echo("delta between grid width and gridContainer width: " + deltaWidth);
    } else {
      this._size.gridContainerBeforeResize = null;
    }

      // Calculating new grid container size
    gridContainerHeight = aSize.height -
                          this._size.chromeStatic.height - wholeDayGridHeight;

    if (gridContainerHeight < rflect.cal.Main.MINIMAL_GRIDCONTAINER_HEIGHT) {
      gridContainerHeight = rflect.cal.Main.MINIMAL_GRIDCONTAINER_HEIGHT;
    }

    // Set new grid container size
    this._gridContainer.style["height"] = gridContainerHeight + "px";

    // Set new grid size, if needed
    if (aResize) {

      this._size.gridContainer = new goog.math.Size(this._gridContainer["offsetWidth"],
              gridContainerHeight);

      if (monthMode) {

        // We know that offsetHeight of grid container differs from style height
        //  by default delta (2px)
        this._size.gridContainer.height += this._size.gctrToGridMonthModeDelta.height;

        if (deltaHeight > 0) {
          // We are resizing vertically expanded grid

          //this._size.grid.width = this._grid["offsetWidth"];

          // We get grid width from grid container width using delta that we calculated in
          //  non-expanded mode
          this._size.grid.width = this._size.gridContainer.width - this._size.gctrToGridMonthModeDelta.width;
          this._size.grid.height = this._size.gridContainer.height + deltaHeight;

          this._grid.style["height"] = this._size.grid.height + "px";

          // Set new cached grid size for month mode...
          this._size.gridMonthModeCached = this._size.grid.clone();
          // ...taking into account that we need original height instead of
          //  expanded
          this._size.gridMonthModeCached.height = this._size.gridContainer.height -
                                                  this._size.gctrToGridMonthModeDelta.height;

        } else {
          // We are resizing unexpanded grid

          this._size.grid.width = this._size.gridContainer.width - this._size.gctrToGridMonthModeDelta.width;
          this._size.grid.height = this._size.gridContainer.height - this._size.gctrToGridMonthModeDelta.height;

          //this._size.grid = goog.style.getBorderBoxSize(this._grid);

          // Set new cached grid size for month mode
          this._size.gridMonthModeCached = this._size.grid.clone();

        }

        //echo("this._size.grid: " + this._size.grid);

        // Clear cached grid size for day mode
        this._size.gridDayModeCached = null;

        // Set new cached grid container size for month mode
        this._size.gctrMonthModeCached = this._size.gridContainer.clone();
        // Clear cached grid container size for day mode
        this._size.gctrDayModeCached = null;

        // Update grid control container dimension,
        this._formGridControl();

      } else if (dayMode) {

        // Height doesn't change in day mode resize

        /*if (deltaWidth > 0) {
          // We are resizing horizontally expanded grid

          //this._size.grid.width = this._grid["offsetWidth"];
          this._size.grid.width =
          this._size.gridContainer.width + deltaWidth;

          // Set new cached grid size for day mode
          this._size.gridDayModeCached = this._size.grid.clone();
          // ...taking into account that we need original width instead of
          //  expanded
          this._size.gridDayModeCached.width = this._size.gridContainer.width - this._size.gctrToGridDayModeDelta.width;

        } else {*/

        // We are resizing unexpanded grid

        this._size.grid.width = this._size.gridContainer.width - this._size.gctrToGridDayModeDelta.width;

          // Set new cached grid size for day mode
        this._size.gridDayModeCached = this._size.grid.clone();

        //}

        // Clear cached grid size for month mode
        this._size.gridMonthModeCached = null;

        // Set new cached grid container size for day mode
        this._size.gctrDayModeCached = this._size.gridContainer.clone();
        // Clear cached grid container size for month mode
        this._size.gctrMonthModeCached = null;

      }

    } else {

      if (dayMode) {

        if (this._size.gridDayModeCached == null) {
          this._size.gridDayModeCached = goog.style.getBorderBoxSize(this._grid);
        }
        if (this._size.gctrDayModeCached == null) {
          this._size.gctrDayModeCached = goog.style.getBorderBoxSize(this._gridContainer);
        }

        this._size.grid = this._size.gridDayModeCached.clone();
        this._size.gridContainer = this._size.gctrDayModeCached.clone();

        // Remember default delta between grid container and grid
        if (this._size.gctrToGridDayModeDelta == null) {
          this._size.gctrToGridDayModeDelta = {
            width: this._size.gridContainer.width - this._size.grid.width,
            height: this._size.gridContainer.height - this._size.grid.height
          };
        }

      } else if (monthMode) {

        if (this._size.gridMonthModeCached == null) {
          this._size.gridMonthModeCached = goog.style.getBorderBoxSize(this._grid);
        }
        if (this._size.gctrMonthModeCached == null) {
          this._size.gctrMonthModeCached = goog.style.getBorderBoxSize(this._gridContainer);
        }

        this._size.grid = this._size.gridMonthModeCached.clone();
        this._size.gridContainer = this._size.gctrMonthModeCached.clone();

        // Remember default delta between grid container and grid
        if (this._size.gctrToGridMonthModeDelta == null) {
          this._size.gctrToGridMonthModeDelta = new goog.math.Size(
                  this._size.gridContainer.width - this._size.grid.width,
                  this._size.gridContainer.height - this._size.grid.height
                  );
        }

      }

    }

    this._size.eventOwner = this._size.grid.clone();

    //echo("this._size.gridContainerBeforeResize: " + this._size.gridContainerBeforeResize);
    //echo("this._size.gridBeforeResize: " + this._size.gridBeforeResize);
    //echo("this._size.grid: " + this._size.grid);
    //echo("this._size.gridContainer: " + this._size.gridContainer);
    //echo("this._size.eventOwner: " + this._size.eventOwner);
    //echo("this._size.eventOwnerBeforeResize: " + this._size.eventOwnerBeforeResize);

    inspect("_size: ", this._size);

  },

  _formTimeIncrements: function Calendar__formTimeIncrements() {

    var viewOptions = this.viewOptions;

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        this._horizontalTimeIncrement
                = {type: rflect.cal.Main.Durations.DAYS, number: 1};
        this._verticalTimeIncrement
                =
        {type: rflect.cal.Main.Durations.MINUTES, number: 30};

      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        this._horizontalTimeIncrement
                = {type: rflect.cal.Main.Durations.DAYS, number: 1};
        this._verticalTimeIncrement
                = {type: rflect.cal.Main.Durations.DAYS, number: 7};
      };break;
      default:break;
    }


  },

  _formVerticalGrid: function Calendar_formVerticalGrid(aRebuild) {

    var rebuild = aRebuild == undefined ? true : aRebuild;

    var viewOptions = this.viewOptions;
    var columnsQuantity = viewOptions.columnsQuantity;

    var counter = 0;
    var gridColumnElement = null;
    var gridColumnsElements = null;

    var height = 0;

    var t1 = "<div id=\"";
    var t2 = "\" class=\"";
    var t3 = "\" style=\"left: ";
    var t4 = "; width: ";
    var t5 = "; height: ";
    var t6 = "; z-index: ";
    var t7 = ";\"></div>";

    var sb = null;

    var gridWidthIncrementInPercents = 0;


    if (rebuild) {

      gridWidthIncrementInPercents
              = this._gridWidthIncrementInPercents = 100 / columnsQuantity;
      this._gridColumnsPercentPositions = [];
      this._gridColumnsPercentPositionsDefault = [];

    }

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

        sb = new goog.string.StringBuffer();

        height = rflect.cal.Main.GRID_HEIGHT_DAYMODE_PERCENTS;

        for (counter = 0; counter < columnsQuantity; counter++) {

          // Keep positions of columns
          if (rebuild) {
            this._gridColumnsPercentPositionsDefault[counter] =
            this._gridColumnsPercentPositions[counter] =
            gridWidthIncrementInPercents
                    * counter;
          }

          sb.append(
                  t1,
                  "c" + counter,
                  t2,
                  "vrule ",
                  "gutter ",
                  "gridControl",
                  t3,
                  this._gridColumnsPercentPositions[counter],
                  "%",
                  t4,
                  1,
                  "px",
                  t5,
                  height,
                  "ex",
                  t6,
                  1,
                  t7
                  );

        }

        this._containerGridCols.innerHTML = sb.toString();

        gridColumnsElements = [];

        for (counter = 1; counter < columnsQuantity; counter++) {

          gridColumnsElements.push(goog.dom.$("c" + counter));

        }

        this._gridColumnsElements = gridColumnsElements;

      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

        if (this._cachedColsMonthMode == null) {

          sb = new goog.string.StringBuffer();

          this._cachedColsMonthMode = {};

          for (counter = 0; counter < columnsQuantity; counter++) {

            // Keep positions of columns
            this._gridColumnsPercentPositions[counter]
                    = gridWidthIncrementInPercents
                    * counter;

            sb.append(
                    t1,
                    "c" + counter,
                    t2,
                    "vrule ",
                    "nogutter ",
                    t3,
                    this._gridColumnsPercentPositions[counter],
                    "%",
                    t4,
                    1,
                    "px",
                    t5,
                    100,
                    "%",
                    t6,
                    1,
                    t7
                    );

          }

          this._cachedColsMonthMode.html
                  = this._containerGridCols.innerHTML
                  = sb.toString();
          this._cachedColsMonthMode.incr
                  = gridWidthIncrementInPercents;
          this._cachedColsMonthMode.pos
                  = this._gridColumnsPercentPositions;

        } else {

          this._containerGridCols.innerHTML
                  = this._cachedColsMonthMode.html;
          this._gridWidthIncrementInPercents
                  = this._cachedColsMonthMode.incr;
          this._gridColumnsPercentPositions
                  = this._cachedColsMonthMode.pos;

        }

      };break;
      default: break;
    }
    inspect("_gridColumnsElements", this._gridColumnsElements);
    inspect("_gridColumnsPercentPositions", this._gridColumnsPercentPositions);
  },

  _formWholeDayGrid: function Calendar_formWholeDayGrid() {
    //TODO: Understand why shift accumulates and find out more precise values for left position

    var viewOptions = this.viewOptions;
    var columnsQuantity = viewOptions.columnsQuantity;

    // Delete previous nodes
    this._allDayGrid.innerHTML = "";
    var gridColumnElementLeftIncrement = 100 / columnsQuantity;
    for (var counter = 0; counter < columnsQuantity; counter++) {
      /*<div class="allDayCell" id="allDay0" style="left: 0px; height: 17px;"></div>*/
      var gridColumnElement = document.createElement("div");
      goog.dom.classes.add(gridColumnElement, "allDayCell");
      gridColumnElement["id"] = "allDay" + counter;
      gridColumnElement.style["left"] =
      gridColumnElementLeftIncrement * counter + "%";
      gridColumnElement.style["height"] = "17px";
      this._allDayGrid.appendChild(gridColumnElement);
    }
    this._allDayGrid.appendChild(this._wholeDayEventOwner);

  },

  _getCalendarEventByID: function Main__getCalendarEventByID(aEventHashID) {

    var calendarEventsCollection = this._calendarEventsCollection;

    for (var counter = 0, length = calendarEventsCollection.length;
         counter < length; ++counter) {
      if (calendarEventsCollection[counter].hashID == aEventHashID)
        return [calendarEventsCollection[counter], counter];
    }

    return null;

  },

  _getDelta: function Calendar__getDelta(aSpaceIndex, aNewCapacity,
                                         aOldCapacity) {

    var viewOptions = this.viewOptions;

    var minimalCalendarEventHeightInPixels = this._minimalCalendarEventHeightInPixel;
    var gridFreespaceDaymodeWidthInPixels = this._gridFreespaceDaymodeWidthInPixels;
    var eventOwnerWidth = this._size.eventOwner.width;

    var spacePercentWidth = 0;
    var rectanglePixelWidth = 0;

    var delta = 0;

    var sign = 0;

    switch (viewOptions.displayType) {

      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

        echo("aOldCapacity: " + aOldCapacity);
        echo("aNewCapacity: " + aNewCapacity);
        echo("aSpaceIndex" + aSpaceIndex);

        delta =
        Math.floor(
                (((this._gridColumnsPixelPositions[aSpaceIndex + 1] != undefined)
                        ? this._gridColumnsPixelPositions[aSpaceIndex + 1]
                        : eventOwnerWidth)
                        - this._gridColumnsPixelPositions[aSpaceIndex]
                        - gridFreespaceDaymodeWidthInPixels) / aOldCapacity
                ) * (aNewCapacity - aOldCapacity);


      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

        // Calculate delta
        delta =
        Math.floor(
                minimalCalendarEventHeightInPixels
                )
                * (aNewCapacity - aOldCapacity);


      };break;

    }

    echo("delta: " + delta);
    return delta;

  },

  _hideGhost: function Calendar__hideGhost() {

    var counter = 0;
    var length = 0;

    for (counter = 0,length = this._blocks.length;
         counter < length; ++counter) {

      this._blocks[counter].updateGhost(null);

    }

  },

  _hideSelectionRectangles: function Calendar_hideSelectionRectangle() {

    //echo("_hideSelectionRectangle called", 2);
    goog.style.setStyle(this._selectionRectangle, "display", "none");
    goog.style.setStyle(this._selectionRectangleUpper, "display", "none");
    goog.style.setStyle(this._selectionRectangleLower, "display", "none");

  },

  _onBlockCapacityChange: function Calendar__onBlockCapacityChange(aEvent) {

    var deltas = {};

    echo("_onBlockCapacityChange called");
    echo("aEvent.index: " + aEvent.index);
    echo("aEvent.newCapacity: " + aEvent.newCapacity);
    echo("aEvent.oldCapacity: " + aEvent.oldCapacity);

    if (this._autoresizeEnabled) {

      deltas[aEvent.index] = this._getDelta(aEvent.index, aEvent.newCapacity,
              aEvent.oldCapacity);
      this._gridControl.changeSpaceValue(deltas);

      this._updateScrollState();

    }

  },

  _onChangeSpaceValue: function Calendar__onChangeSpaceValue(aEvent) {

    var viewOptions = this.viewOptions;

    var percentPosition = 0;
    var counter = 0;
    var length = 0;

    var gridFreespaceDaymodeWidthInPercents = this._gridFreespaceDaymodeWidthInPixels;
    var gridFreespaceMonthmodeHeightInPercents = this._gridFreespaceMonthmodeHeightInPixels;

    var eventBlockElements = this._eventBlockElements;
    var eventBlockElement = null;
    var cellBlockElements = this._cellBlockElements;
    var cellBlockElement = null;

    var eventBlockElementLeft = 0;
    var eventBlockElementWidth = 0;
    var eventBlockElementTop = 0;
    var eventBlockElementHeight = 0;
    var cellBlockElementTop = 0;
    var cellBlockElementHeight = 0;

    inspect("aEvent_onChangeSpaceValue", aEvent);

    switch (viewOptions.displayType) {

      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

        // Modify grid and event owner width
        this._size.grid.width =
        this._size.eventOwner.width = aEvent.containerDimension;

        // Modify positions of columns
        for (counter = 0; counter < aEvent.delimiterPercentPositions.length; counter++) {

          percentPosition = this._gridColumnsPercentPositions[counter] =
                            aEvent.delimiterPercentPositions[counter];
          this._gridColumnsPixelPositions[counter] =
          aEvent.delimiterPixelPositions[counter];

        }

        this._formVerticalGrid(false);

        // Modify positions of event blocks
        gridFreespaceDaymodeWidthInPercents =
        rflect.math.pixelToPercent(this._gridFreespaceDaymodeWidthInPixels, this._size.grid.width);

        for (counter = 0,length = eventBlockElements.length;
             counter < length; ++counter) {

          eventBlockElement
                  = eventBlockElements[counter];

          eventBlockElementLeft = this._gridColumnsPercentPositions[counter] +
                                  gridFreespaceDaymodeWidthInPercents;
          eventBlockElementWidth =
          ((this._gridColumnsPercentPositions[counter + 1] != undefined)
                  ? this._gridColumnsPercentPositions[counter + 1]
                  : 100)
                  - this._gridColumnsPercentPositions[counter]
                  - gridFreespaceDaymodeWidthInPercents;

          eventBlockElement.style["left"] = eventBlockElementLeft + "%";
          eventBlockElement.style["width"] = eventBlockElementWidth + "%";

        }

          // Recalculate container width to percents
        this._grid.style["width"]
                = rflect.math.pixelToPercent(this._size.grid.width,
                this._size.gridContainer.width -
                this._size.gctrToGridDayModeDelta.width) + "%";

      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

        // Modify grid and event owner heights
        this._size.grid.height =
        this._size.eventOwner.width = aEvent.containerDimension;

        // Modify positions of rows
        for (counter = 0; counter < aEvent.delimiterPercentPositions.length; counter++) {

          percentPosition = this._gridRowsPercentPositionsShifted[counter] =
                            aEvent.delimiterPercentPositions[counter];
          this._gridRowsPixelPositionsShifted[counter] =
          aEvent.delimiterPixelPositions[counter];

          if (counter > 0) {
            this._gridRowsPercentPositions[counter - 1] =
            this._gridRowsPercentPositionsShifted[counter];
          }

        }

        this._formHorizontalGrid(false);

          // Modify positions of event blocks and cell blocks containers
        gridFreespaceMonthmodeHeightInPercents =
        rflect.math.pixelToPercent(this._gridFreespaceMonthmodeHeightInPixels, this._size.grid.height);

        for (counter = 0,length = eventBlockElements.length;
             counter < length; ++counter) {

          eventBlockElement = eventBlockElements[counter];
          cellBlockElement = cellBlockElements[counter];

          cellBlockElementTop = this._gridRowsPercentPositionsShifted[counter];
          cellBlockElementHeight = ((this._gridRowsPercentPositionsShifted[counter + 1] != undefined)
                  ? this._gridRowsPercentPositionsShifted[counter + 1]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[counter];

          eventBlockElementTop = cellBlockElementTop +
                                 gridFreespaceMonthmodeHeightInPercents;
          eventBlockElementHeight = cellBlockElementHeight -
                                    gridFreespaceMonthmodeHeightInPercents;


          cellBlockElement.style["top"] = cellBlockElementTop + "%";
          cellBlockElement.style["height"] = cellBlockElementHeight + "%";
          eventBlockElement.style["top"] = eventBlockElementTop + "%";
          eventBlockElement.style["height"] = eventBlockElementHeight + "%";

        }

        // Recalculate container height to percents
        this._grid.style["height"]
                = this._size.grid.equals(this._size.gridMonthModeCached)
                ? "100%"
                : this._size.grid.height + "px";

      };break;
    }

    inspect("_gridSize", this._gridSize);
    inspect("_eventOwnerSize", this._size.eventOwner);
    inspect("_eventOwnerSizeOld", this._size.eventOwnerBeforeResize);

    inspect("_gridColumnsPercentPositions", this._gridColumnsPercentPositions);
    inspect("_gridRowsPercentPositionsShifted", this._gridRowsPercentPositionsShifted);
    inspect("_gridRowsPercentPositions", this._gridRowsPercentPositions);
    inspect("_aDelimiterPixelPositions", aEvent._pixelPositions);
    inspect("_aDelimiterPercentPositions", aEvent._percentPositions);
    inspect("_gridRowsPixelPositionsShifted_afterResize", this._gridRowsPixelPositionsShifted);

  },

  _onClickButton: function Calendar_onButtonClick(aEvent) {
    switch (aEvent.target) {
      case this._buttonDaysPrevious: {
        // console.time("switch to previous interval");
        this._shiftView({
          shiftValue: -1
        });
        // console.timeEnd("switch to previous interval");
      };break;
      case this._buttonDaysNext: {
        // console.time("switch to next interval");
        this._shiftView({
          shiftValue: 1
        });
        // console.timeEnd("switch to next interval");
      };break;
      case this._buttonsDayToday: {
        this._shiftView({
          shiftDateTime: new rflect.datetime.DateTime()
        });
      };break;
      default: break;
    }
  },

  _onClickColHeadersContainer: function(aEvent) {
    var target = aEvent.target;
    var targetID = target["id"];
    var dayGrid = this._tgrid.getDayGrid();
    var col = 0;
    var cell = null;

    if (goog.dom.classes.has(target, "headerLink")) {

      col = targetID.match(/\d+/)[0];
      cell = dayGrid[0][col];

      // Day mode
      if (this._switchTab(this._tabAlpha)) {
        this._switchView({
          startDateTime: new rflect.datetime.DateTime(cell["year"], cell["month"], cell["day"]),
          type: rflect.cal.Main.Modes.MULTIDAY,
          columnsQuantity: 1,
          byTab: true
        });
      }

    }

  },

  _onClickTab: function Calendar__onTabClick(aEvent) {

    var currentTarget = aEvent.currentTarget;

    switch (currentTarget) {
      case this._tabAlpha:{
        // Day tab
        if (this._switchTab(currentTarget)) {
          this._switchView({
            type: rflect.cal.Main.Modes.MULTIDAY,
            columnsQuantity: 1,
            byTab: true
          });
        }
      };break;
      case this._tabBeta:{
        // week tab
        if (this._switchTab(currentTarget)) {
          this._switchView({
            type: rflect.cal.Main.Modes.WEEK,
            byTab: true
          });
        }
      };break;
      case this._tabGamma:{
        // Month tab
        if (this._switchTab(currentTarget)) {
          this._switchView({
            type: rflect.cal.Main.Modes.MONTH,
            byTab: true
          });
        }
      };break;
    }
  }

});