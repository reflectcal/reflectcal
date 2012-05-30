rflect.cal.Main.__fuse({

  _relayout: function Main_relayout(aRelayoutBitmask) {

    echo("aRelayoutBitmask: " + aRelayoutBitmask);

    var COL_HEADERS_CONTAINER = 0x1;
    var COL_HEADERS = 0x2;
    var ALL_DAY_GRID = 0x4;
    var GRID_CONTAINER = 0x8;
    var ROW_HEADERS = 0x10;
    var GRID = 0x20;
    var DECOWNER = 0x40;
    var MONTH_CELL_SET = 0x80;
    var EVENTOWNER = 0x100;

    var GRID_ROWS = 0x200;
    var GRID_COLS = 0x400;
    var GRID_ROWS_POSITIONS_RECALCULATE = 0x800;
    var GRID_COLS_POSITIONS_RECALCULATE = 0x1000;

    var LISTENER_CHANGE = 0x2000;

    var WRITE_TO_CHROME = 0x4000;
    var WRITE_TO_COL_HEADERS_CONTAINER = 0x8000;
    var WRITE_TO_GRID_ROWS_CONTAINER = 0x10000;
    var WRITE_TO_GRID_COLS_CONTAINER = 0x20000;
    var WRITE_TO_DECOWNER = 0x40000;

    var viewOptions = this.viewOptions;
    var colsQuantity = viewOptions.columnsQuantity;
    var rowsQuantity = viewOptions.rowsQuantity;
    var rowsQuantityHalf = rowsQuantity / 2;
    var blocksQuantity = 0;

    var dayMode = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY;
    var monthMode = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH;

    var thisMonth = 0;

    var dayGrid = this._tgrid.getDayGrid();
    var year = 0;
    var month = 0;
    var day = 0;
    var headerElementWidth = 100 / colsQuantity;
    var prettyPrintDateTime = null;
    // Daymode freespace width is float
    var gridFreespaceDaymodeWidthInPixels = rflect.cal.Main.GRID_FREESPACE_DAYMODE_WIDTH_IN_PIXELS_GRADATION_1;
    // Monthmode freespace height is fixed
    var gridFreespaceMonthmodeHeightInPixels = rflect.cal.Main.GRID_FREESPACE_MONTHMODE_HEIGHT_IN_PIXELS;

    var gridFreespaceDaymodeWidthInPercents = 0;
    var gridFreespaceMonthmodeHeightInPercents = 0;

    var ieBlockWidthCorrection = 0;

    var newMinimalCapacity = 0;
    var blockHeight = 0;
    var height = 0;

    var block = null;
    var blockElement = null;

    var counter = 0;
    var counterRows = 0;
    var counterCols = 0;
    var counterTop = 0;
    var dayCounter = 0;

    var rebuild = false;

    var sb = new goog.string.StringBuffer();
    var sbAux = null;

    // Templates
    var divt1 = "<div id=\"";
    var divt2 = "\">";
    var divt3 = " </div>";
    var divt4 = ";\">";
    var divt5 = "\"></div>";

    var divt1 = "<div id=\"";
    var cheadt13 = "\" class=\"";
    var divt2 = "\">";
    var divt3 = "</div>";

    var cheadt1 = "<div class=\"";
    var cheadt2 = "\" style=\"left: ";
    var cheadt3 = "; width: ";
    var divt4 = ";\">";
    var cheadt5 = "<span id=\"";
    var cheadt6 = "\"><a class=\"";
    var divt2 = "\">";
    var cheadt8 = "\" id=\"";
    var cheadt9 = "</a></span><img id=\"";
    var cheadt10 = "</span><img id=\"";
    var cheadt11 = "\" class=\"more-no\" src=\"images/blank.gif\"/></div>";

    var ALL_DAY_GRID_INITIAL_HEIGHT = 17;

    var alldayt1 = "<div style=\"height: ";
    var alldayt2 = "; margin-bottom: 5px;\" class=\"";
    var alldayt3 = "\" id=\"";
    var divt2 = "\">";

    var alldayt5 = "<div class=\"";
    var alldayt6 = "\" id=\"";
    var alldayt7 = "\" style=\"left: ";
    var alldayt8 = "; height: ";
    var alldayt9 = ";\"></div>";

    var divt1 = "<div id=\"";
    var alldayt11 = "\"></div></div>";

    var GRID_CONTAINER_INITIAL_HEIGHT = 310;

    var divt1 = "<div id=\"";
    var gctrt2 = "\" style=\"height: ";

    var gctrdt1 = "; overflow-x: scroll; overflow-y: auto;\"><div id=\"calowner\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"table-layout: fixed; width: 100%;\" id=\"gridAndHeaders\"><tbody><tr>";
    var gctrdt2 = "</tr></tbody></table></div></div>";

    var gctrmt1 = "; overflow: auto;\"><div id=\"calowner\">";
    var gctrmt2 = "</div></div>";

    var rheadt1 = "<td id=\"rowheadcell\" style=\"width: 40px;\"><div id=\"rowheaders\" style=\"height: 144ex; top: 0px; left: 0px;\">";
    var rheadt2 = "</div></td>";

    var rheadt3 = "<div style=\"height: 6ex; top: ";
    var rehadt4 = ";\" id=\"";
    var rheadt5 = "\" class=\"";
    var rheadt6 = "\"><div class=\"";
    var divt2 = "\">";
    var rheadt8 = "</div></div>";

    var griddt1 = "<td id=\"gridcontainercell\" style=\"width: auto;\"><div id=\"" +
                  "grid" +
                  "\" class=\"grid\" style=\"height: 144ex; width: 100%;\">";
    var griddt2 = "</div></td>";

    var gridmt1 = "<div id=\"" +
                  "grid" +
                  "\" class=\"grid\" style=\"height: 100%; width: 100%;\">";
    var divt3 = "</div>";

    var divt1 = "<div id=\"";
    var divt2 = "\">";
    var divt3 = " </div>";

    var divt1 = "<div id=\"";
    var dect5 = "\" class=\"";
    var dect6 = "\" style=\"position: absolute; top: ";
    var dect7 = "; height: ";
    var divt4 = ";\">";
    var divt3 = "</div>";

    var dect10 = "<div style=\"position: absolute; left: ";
    var dect11 = "; width: ";
    var dect12 = "; z-index: ";
    var dect13 = ";\"><div id=\"";
    var dect14 = "\" class=\"";
    var dect15 = "\"><span style=\"z-index: 3; position: relative;\" id=\"";
    var dect16 = "\"><a class=\"";
    var dect17 = "\" id=\"";
    var divt2 = "\">"
    var dect19 = "</a></span></div></div>";

    var divt1 = "<div id=\"";
    var evtt2 = "\" style=\"z-index: 2;\"></div>";
    var divt3 = " </div>";

    var divt1 = "<div id=\"";
    var evtt5 = "\" class=\"";

    var evtth1 = "\" style=\"top: ";
    var evtth2 = "; height: ";

    var evttv1 = "\" style=\"left: ";
    var evttv2 = "; width: ";

    var divt4 = ";\">";
    var divt3 = "</div>";

    var rowt1 = "<div id=\"gridRows\">";
    var colt1 = "<div id=\"gridColumns\">";

    var divt1 = "<div id=\"";
    var rowt2 = "\" class=\"";
    var rowt3 = "\" style=\"top: ";
    var rowt4 = "; height: ";
    var rowt5 = "; z-index: ";
    var rowt6 = ";\"></div>";

    var divt1 = "<div id=\"";
    var colt2 = "\" class=\"";
    var colt3 = "\" style=\"left: ";
    var colt4 = "; width: ";
    var colt5 = "; height: ";
    var colt6 = "; z-index: ";
    var colt7 = ";\"></div>";

    var lassot1 = "<div id=\"backuplasso\"";
    var lassot2 = "<div id=\"backuplassoLower\"";
    var lassot3 = "<div id=\"backuplassoUpper\"";

    var lassot4 = " style=\"position: absolute; display: none; z-index: 10; background-color: rgb(60, 180, 254);";

    var gridWidthIncrementInPercents = this._gridWidthIncrementInPercents;
    var gridHeightIncrementInPercents = this._gridHeightIncrementInPercents;
    var currentRowPercentPosition = 0;
    var currentRowPercentPositionShifted = 0;
    var shift = -this._gridHeightIncrementInPercents;

    var tmps = "";

    var number = 0;

    /*
    * Relayout consists of three phases:
    *   1. Prepare single string to be inserted as innerHTML.
    *   2. Insert string in specific element. As in different relayouts
    *     we need to modify content of different elements,
    *     writing phase needs to be instructed to which elements
    *     it should write.
    *   3. Take renewed elements by their ids.
    */

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.COL_HEADERS_CONTAINER) != 0) {

      // Remove colheaders container listener
      goog.events.unlistenByKey(this._listeners.mouseDownColHeadersContainer);

      sb.append(
              divt1,
              "colheaders",
              cheadt13
              );

      if (dayMode)
        sb.append(
                "colheadersmiddle",
                divt2
                );

      else if (monthMode)
        sb.append(
                divt2
                );

    }
    // Col headers container scope opens -->

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.COL_HEADERS) != 0) {

      if (dayMode) {

        headerElementWidth = 100 / colsQuantity;

        for (counter = 0; counter < colsQuantity; counter++) {

          year = dayGrid[0][counter]["year"];
          month = dayGrid[0][counter]["month"];
          day = dayGrid[0][counter]["day"];

          // TODO: Performance impact
          prettyPrintDateTime = new rflect.datetime.DateTime(year, month, day);

          dayCounter = prettyPrintDateTime.getLocaleDay();

          sb.append(
                  cheadt1,
                  "chead ",
            //TODO: Check if day is today
                  "cheadNotToday",
                  cheadt2,
                  headerElementWidth * counter,
                  "%",
                  cheadt3,
                  headerElementWidth,
                  "%",
                  divt4,
                  cheadt5,
                  "chead" + counter
                  );

          if (colsQuantity > 1) {
            sb.append(
                    cheadt6,
                    "headerLink",
                    cheadt8,
                    "chead_link" + counter,
                    divt2
                    );
          } else {
            sb.append(divt2);
          }

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

          if (colsQuantity > 1) {
            sb.append(cheadt9);
          } else {
            sb.append(cheadt10);
          }

          sb.append(
                  "morearr" + counter,
                  cheadt11
                  );

        }

      } else if (monthMode) {

        if (this._cache.colHeadersMonthMode == null) {

          sbAux = new goog.string.StringBuffer();

          this._cache.colHeadersMonthMode = {};

          for (counter = 0; counter < colsQuantity; counter++) {

            sbAux.append(
                    cheadt1,
                    "chead ",
              //TODO: Check if day is today
                    "cheadNotToday",
                    cheadt2,
                    headerElementWidth * counter,
                    "%",
                    cheadt3,
                    headerElementWidth,
                    "%",
                    divt4,
                    cheadt5,
                    "chead" + counter,
                    divt2,
                    rflect.loc.datetime.DateTime.abbreviatedDayNames
                            [rflect.datetime.DateTime.getLocaleDayIndex(counter)],
                    cheadt10,
                    "morearr" + counter,
                    cheadt11
                    );

          }

          this._cache.colHeadersMonthMode.html
                  = sbAux.toString();

          sbAux.clear();

        }

        sb.append(this._cache.colHeadersMonthMode.html);

      }

    }

    // Col headers container scope closes <--
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.COL_HEADERS_CONTAINER) != 0)
      sb.append(divt3);

    // Whether we need recalculate positions of cols.
    //  We do it here because all day grid depends on columns positions.
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_COLS_POSITIONS_RECALCULATE) != 0) {

      gridWidthIncrementInPercents
              = this._gridWidthIncrementInPercents = 100 / colsQuantity;
      this._gridColumnsPercentPositions = [];
      this._gridColumnsPercentPositionsDefault = [];

      for (counter = 0; counter < colsQuantity; counter++) {

        this._gridColumnsPercentPositionsDefault[counter] =
        this._gridColumnsPercentPositions[counter] =
        gridWidthIncrementInPercents
                * counter;

      }

    }

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.ALL_DAY_GRID) != 0) {

      sb.append(
              alldayt1,
              ALL_DAY_GRID_INITIAL_HEIGHT,
              "px",
              alldayt2,
              "inset grid",
              alldayt3,
              "allDayGrid",
              divt2
              );

      for (counter = 0; counter < colsQuantity; counter++) {

        sb.append(
                alldayt5,
                "allDayCell",
                alldayt6,
                "allDay",
                counter,
                alldayt7,
                this._gridColumnsPercentPositions[counter],
                "%",
                alldayt8,
                ALL_DAY_GRID_INITIAL_HEIGHT,
                "px",
                alldayt9
                );

      }

      sb.append(
              divt1,
              "alldayeventowner",
              alldayt11
              );

    }

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_CONTAINER) != 0) {

      sb.append(
              divt1,
              "gridcontainer",
              gctrt2,
              GRID_CONTAINER_INITIAL_HEIGHT,
              "px"
              );

      if (dayMode)
        sb.append(gctrdt1);
      else if (monthMode)
        sb.append(gctrmt1);

    }

    // Grid container scope opens -->
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.ROW_HEADERS) != 0) {

      if (this._cache.rowHeadersDayMode == null) {

        sbAux = sbAux != null ? sbAux : new goog.string.StringBuffer();

        this._cache.rowHeadersDayMode = {};

        sbAux.append(rheadt1);

        for (counter = 0,counterTop = 0,rowsQuantityHalf;
             counter < rowsQuantityHalf; counter++,counterTop += 6) {

          sbAux.append(
                  rheadt3,
                  counterTop,
                  "ex",
                  rehadt4,
                  "rhead" + counter,
                  rheadt5,
                  "rhead",
                  rheadt6,
                  "rheadtext",
                  divt2,
                  counter < 10 ? "0" + counter : counter,
                  ":00",
                  rheadt8
                  );

        }

        sbAux.append(rheadt2);

        this._cache.rowHeadersDayMode.html = sbAux.toString();

        sbAux.clear();

      }

      sb.append(this._cache.rowHeadersDayMode.html);

    }

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID) != 0) {

      // Remove colheaders container listener
      goog.events.unlistenByKey(this._listeners.mouseDownGrid);

      if (dayMode)
        sb.append(griddt1);
      else if (monthMode)
        sb.append(gridmt1);

      if (this._cache.lasso == null) {

        sbAux = sbAux != null ? sbAux : new goog.string.StringBuffer();

        sbAux.append(
                lassot1,
                lassot4,
                tmps = goog.style.getOpacityString(0.7),
                divt5,
                lassot2,
                lassot4,
                tmps,
                divt5,
                lassot3,
                lassot4,
                tmps,
                divt5
                );

        this._cache.lasso = sbAux.toString();

        sbAux.clear();

      }

      sb.append(this._cache.lasso);

    }
    // Grid scope opens -->

    // Whether we need recalculate positions of rows
    if (rebuild = (aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_ROWS_POSITIONS_RECALCULATE) != 0) {

      this._gridRowsPercentPositions = [];
      this._gridRowsPercentPositionsShifted = [];

      sb.append(rowt1);

    }

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_ROWS) != 0) {

      if (dayMode) {

        if (this._cache.rowsDayMode == null) {

          sbAux = sbAux != null ? sbAux : new goog.string.StringBuffer();

          this._cache.rowsDayMode = {};

          gridHeightIncrementInPercents
                  = this._gridHeightIncrementInPercents
                  = rflect.cal.Main.GRID_HEIGHT_DAYMODE_PERCENTS / rowsQuantity;

          for (counter = 0; counter < rowsQuantity; counter++) {
            currentRowPercentPosition
                    = gridHeightIncrementInPercents * (counter + 1);
            currentRowPercentPositionShifted
                    = gridHeightIncrementInPercents * counter;
            this._gridRowsPercentPositions[counter]
                    = currentRowPercentPosition;
            this._gridRowsPercentPositionsShifted[counter]
                    = currentRowPercentPositionShifted;

            if (!(counter == (rowsQuantity - 1)) || !goog.userAgent.IE) {

              sbAux.append(
                      divt1,
                      "r",
                      (counter + 1).toString(),
                      rowt2,
                      "hrule ",
                      (((counter + 1) % 2) == 0)
                        // Even position
                              ? "hruleeven"
                        // Odd position
                              : "hruleodd",
                      rowt3,
                      currentRowPercentPosition,
                      "ex",
                      rowt5,
                      1,
                      rowt6
                      );

            }

          }

          this._cache.rowsDayMode.html
                  = sbAux.toString();
          this._cache.rowsDayMode.incr
                  = gridHeightIncrementInPercents;
          this._cache.rowsDayMode.pos
                  = this._gridRowsPercentPositions;
          this._cache.rowsDayMode.posShifted
                  = this._gridRowsPercentPositionsShifted;

          sbAux.clear();

        }

        sb.append(this._cache.rowsDayMode.html);
        this._gridHeightIncrementInPercents
                = this._cache.rowsDayMode.incr;
        this._gridRowsPercentPositions
                = this._cache.rowsDayMode.pos;
        this._gridRowsPercentPositionsShifted
                = this._cache.rowsDayMode.posShifted;


      } else if (monthMode) {

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
                    divt1,
                    "r",
                    (counter + 1).toString(),
                    rowt2,
                    "hrule ",
                    "hruleMonth",
                    rowt3,
                    this._gridRowsPercentPositions[counter],
                    "%",
                    rowt5,
                    1,
                    rowt6
                    );

          }

        }

      }

    }

    if (rebuild)
      sb.append(divt3);

    // Whether we need recalculate positions of cols.
    //  We've done it earlier, but it also signalizes that
    //  grid cols container should be opened.
    if (rebuild = (aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_COLS_POSITIONS_RECALCULATE) != 0)
      sb.append(colt1);

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_COLS) != 0) {

      if (dayMode) {

        height = rflect.cal.Main.GRID_HEIGHT_DAYMODE_PERCENTS;

        for (counter = 0; counter < colsQuantity; counter++) {

          // We don't need to calculate cols positions,
          //  because it's done

          sb.append(
                  divt1,
                  "c" + counter,
                  colt2,
                  "vrule ",
                  "gutter ",
                  "gridControl",
                  colt3,
                  this._gridColumnsPercentPositions[counter],
                  "%",
                  colt4,
                  1,
                  "px",
                  colt5,
                  height,
                  "ex",
                  colt6,
                  1,
                  colt7
                  );

        }

      } else if (monthMode) {

        if (this._cache.colsMonthMode == null) {

          sbAux = sbAux != null ? sbAux : new goog.string.StringBuffer();

          this._cache.colsMonthMode = {};

          for (counter = 0; counter < colsQuantity; counter++) {

            // We don't need to calculate cols positions,
            //  because it's done

            sbAux.append(
                    divt1,
                    "c" + counter,
                    colt2,
                    "vrule ",
                    "nogutter ",
                    colt3,
                    this._gridColumnsPercentPositions[counter],
                    "%",
                    colt4,
                    1,
                    "px",
                    colt5,
                    100,
                    "%",
                    colt6,
                    1,
                    colt7
                    );

          }

          this._cache.colsMonthMode.html
                  = sbAux.toString();
          this._cache.colsMonthMode.incr
                  = gridWidthIncrementInPercents;
          this._cache.colsMonthMode.pos
                  = this._gridColumnsPercentPositions;

        }

        sb.append(this._cache.colsMonthMode.html);
        this._gridWidthIncrementInPercents
                = this._cache.colsMonthMode.incr;
        this._gridColumnsPercentPositions
                = this._cache.colsMonthMode.pos;

      }

    }

    if (rebuild)
      sb.append(divt3);

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.DECOWNER) != 0)
      sb.append(
              divt1,
              "decowner",
              divt2
              );

    // Decowner scope opens -->
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.MONTH_CELL_SET) != 0) {

      thisMonth = viewOptions.baseDateTime.getMonth();

      for (counterRows = 0;
           counterRows < rowsQuantity; counterRows++) {

        sb.append(
                divt1,
                "cellBlockContainer",
                counterRows,
                dect5,
                "cellBlockContainer",
                dect6,
                this._gridRowsPercentPositionsShifted[counterRows],
                "%",
                dect7,
                gridHeightIncrementInPercents,
                "%",
                divt4
                );

        for (counterCols = 0; counterCols < colsQuantity;
             counterCols++) {

          sb.append(
                  dect10,
                  this._gridColumnsPercentPositions[counterCols],
                  "%",
                  dect11,
                  gridWidthIncrementInPercents,
                  "%",
            //t9,
            //1,
                  dect13,
                  "cell_head",
                  number,
                  dect14,
                  "dayOfMonth ",
                  dayGrid[counterRows][counterCols]["month"]
                          == thisMonth
                          ? "dayInMonth"
                          : "dayNotInMonth",
                  dect15,
                  "dn",
                  number,
                  dect16,
                  "dayNumber",
                  dect17,
                  counterRows,
                  ",",
                  counterCols,
                  divt2,
                  dayGrid[counterRows][counterCols]["day"],
                  dect19
                  );

          number++;

        }

        sb.append(divt3);

      }

    }

    // Decowner scope closes <--
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.DECOWNER) != 0)
      sb.append(divt3);

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.EVENTOWNER) != 0) {

      sb.append(
              divt1,
              "eventowner",
              evtt2
              );

    }

    // Grid scope closes <--
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID) != 0) {
      if (dayMode)
        sb.append(griddt2);
      else if (monthMode)
        sb.append(divt3);
    }

    // Grid container scope closes <--
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_CONTAINER) != 0) {

      if (dayMode)
        sb.append(gctrdt2);
      else if (monthMode)
        sb.append(gctrmt2);

    }

    // Writing phase
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.WRITE_TO_CHROME) != 0)
      this._chromeMain.innerHTML = sb.toString();
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.WRITE_TO_COL_HEADERS_CONTAINER) != 0)
      this._colHeadersContainer.innerHTML = sb.toString();
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.WRITE_TO_GRID_ROWS_CONTAINER) != 0)
      this._containerGridRows.innerHTML = sb.toString();
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.WRITE_TO_GRID_COLS_CONTAINER) != 0)
      this._containerGridCols.innerHTML = sb.toString();
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.WRITE_TO_DECOWNER) != 0)
      this._decOwner.innerHTML = sb.toString();

    // Renew phase - here we should update elements
    //  after relayout.

    // Get col headers container and attach new listener to it.
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.COL_HEADERS_CONTAINER) != 0) {

      this._colHeadersContainer = goog.dom.$("colheaders");

      if (colsQuantity > 1)
        this._listeners.mouseDownColHeadersContainer =
        goog.events.listen(this._colHeadersContainer, "mousedown",
                this._onClickColHeadersContainer, false, this);

    }

    // Get all day grid
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.ALL_DAY_GRID) != 0)
      this._allDayGrid = goog.dom.$("allDayGrid");

    // Get grid container.
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_CONTAINER) != 0)
      this._gridContainer = goog.dom.$("gridcontainer");

    // Get grid and attach new listener to it.
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID) != 0) {

      this._listeners.mouseDownGrid =
      goog.events.listen(this._grid = goog.dom.$("grid"), "mousedown",
              this._onMouseDownGrid, false, this);

      this._selectionRectangle = goog.dom.$("backuplasso");
      this._selectionRectangleLower = goog.dom.$("backuplassoLower");
      this._selectionRectangleUpper = goog.dom.$("backuplassoUpper");

      // TODO:
      // Set grid to 100% height when blocks
      //  are expanded in month mode. This is needed
      //  for month cell set relayout.

    }

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_ROWS_POSITIONS_RECALCULATE) != 0)
      this._containerGridRows = goog.dom.$("gridRows");

    // Get grid rows in month mode - as they are control elements in this mode.
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_ROWS) != 0 && monthMode) {

      // TODO: Make this objects reusable
      this._gridRowsElements = [];

      for (counter = 1; counter < rowsQuantity; counter++) {

        this._gridRowsElements[counter - 1] = goog.dom.$("r" + counter);

      }

      inspect("_gridRowsElements", this._gridRowsElements);

    }

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_COLS_POSITIONS_RECALCULATE) != 0)
      this._containerGridCols = goog.dom.$("gridColumns");

    // Get grid cols elements in day mode - as they are control elements in this mode
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.GRID_COLS) != 0 && dayMode) {

      this._gridColumnsElements = [];

      for (counter = 1; counter < colsQuantity; counter++) {

        this._gridColumnsElements[counter - 1] = goog.dom.$("c" + counter);

      }

      inspect("_gridColumnsElements", this._gridColumnsElements);

    }

    // Get decowner
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.DECOWNER) != 0)
      this._decOwner = goog.dom.$("decowner");

    // Get cell block elements in month mode - they are controlled by
    //  GridControl
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.MONTH_CELL_SET) != 0) {

      this._cellBlockElements = [];

      for (counterRows = 0;
           counterRows < rowsQuantity; counterRows++) {

        this._cellBlockElements[counterRows] = goog.dom.$("cellBlockContainer"
                + counterRows);

        inspect("_cellBlockElements", this._cellBlockElements);

      }

    }

    // Get eventowner and event block elements
    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.EVENTOWNER) != 0)
      this._eventOwner = goog.dom.$("eventowner");

    if ((aRelayoutBitmask & rflect.cal.Main.Relayout.LISTENER_CHANGE) != 0) {

      if (dayMode) {

        // Mousemove listener
        goog.events.unlistenByKey(this._listeners.mouseMoveDocument);
        this._listeners.mouseMoveDocument =
        goog.events.listen(document, "mousemove",
                this._onMouseMoveDayMode,
                false, this);

        // Autoscroll listeners
        // We need x-axis autoscroll listener in day mode
        //  because we may have expanded blocks
        this._listeners.scrollAutoscrollX =
        goog.events.listen(this._autoscrX, "scroll", this._onMouseMoveDayMode, false, this);

        // We always need y-axis autoscroll listener in day mode
        goog.events.unlistenByKey(this._listeners.scrollAutoscrollY);
        this._listeners.scrollAutoscrollY =
        goog.events.listen(this._autoscrY, "scroll", this._onMouseMoveDayMode, false, this);

      } else if (monthMode) {

        // Mousemove listener
        goog.events.unlistenByKey(this._listeners.mouseMoveDocument);
        this._listeners.mouseMoveDocument =
        goog.events.listen(document, "mousemove",
                this._onMouseMoveMonthMode, false, this);

        // Autoscroll listener
        // We don't need x-axis autoscroll listener in month mode
        goog.events.unlistenByKey(this._listeners.scrollAutoscrollX);

        // We need y-axis autoscroll listener in month mode
        //  because we may have expanded blocks
        goog.events.unlistenByKey(this._listeners.scrollAutoscrollY);
        this._listeners.scrollAutoscrollY =
        goog.events.listen(this._autoscrY, "scroll", this._onMouseMoveMonthMode, false, this);

      }

    }

  },

  _rollbackFromMinimalCapacities: function Calendar__rollbackFromMinimalCapacities() {

    var viewOptions = this.viewOptions;

    var spaceIndex = "";
    var counter = 0;
    var length = 0;

    var deltas = {};
    var capacityChanged = false;

    var minimalCapacity
            = viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY
            ? rflect.cal.Main.MINIMAL_CAPACITY_DAY_MODE
            : (viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH
            ? this._minimalCapacity
            : 0);

    this._autoresizeEnabled = true;

    for (counter = 0,length = this._blocks.length;
         counter < length; ++counter) {
      if (this._blocks[counter].expanded) {

        if (!capacityChanged)
          capacityChanged = true;

        deltas[counter] = this._getDelta(
                counter,
                this._blocks[counter].getCapacity(),
                minimalCapacity
                );
      }
    }

    // Then we need to expand or collapse
    //  space according to new capacity
    if (capacityChanged) {
      this._gridControl.changeSpaceValue(deltas);
    }

  },

  _setCalendarEventItemsOpacity: function Calendar_setCalendarEventItemsOpacity(
          aCalEvent, aOpacity, aConfiguration) {
    var elemID = "";
    var elem = null;
    var itemIndex = "";

    var IMMEDIATELY = 0x1;
    var DELAYED = 0x2;
    var COMBINED = 0x4;

    function createLstr(aElemID) {

      echo("created listener for: " + aElemID);
      return function elemSetOpac() {

        echo("aOpacity: " + aOpacity);
        echo("aImmediately: " + aConfiguration);

        echo("elemID: " + aElemID);

        elem = document.getElementById(aElemID);

        echo("elem: " + elem);

        if (!(elem == null)) {
          goog.style.setOpacity(elem, aOpacity);
        }

      }

    }

    // Set item to transparent
    for (itemIndex in this._calendarEventsItems[aCalEvent.hashID]) {

      elemID = rflect.cal.Block.ELEMENT_EVENT_ID_PART_1
              + aCalEvent.hashID
              + rflect.cal.Block.ELEMENT_EVENT_ID_PART_2
              + this._calendarEventsItems[aCalEvent.hashID][itemIndex];


      if (!((aConfiguration & IMMEDIATELY) == 0)) {

        elem = document.getElementById(elemID);

        if (!(elem == null)) {
          goog.style.setOpacity(elem, aOpacity);
        }

      }

      if (!((aConfiguration & DELAYED) == 0)) {

        goog.events.listenOnce(this._blocks[itemIndex], "relayoutEnd",
                createLstr(elemID), false);

      }

      if (!((aConfiguration & COMBINED) == 0)) {

        elem = document.getElementById(elemID);

        if (!(elem == null)) {
          goog.style.setOpacity(elem, aOpacity);
        } else {
          goog.events.listenOnce(this._blocks[itemIndex], "relayoutEnd",
                  createLstr(elemID), false);
        }

      }

    }
  },

  _setToMinimalCapacities: function Calendar__setMinimalCapacities() {

    var viewOptions = this.viewOptions;

    var eventBlockElement = null;
    var gridColumnElement = null;
    var eventBlockElements = [];
    var spacePercentWidth = 0;
    var spacePercentHeight = 0;
    var counter = 0;
    var length = 0;

    var gridFreespaceDaymodeWidthInPercents = 0;
    var gridFreespaceMonthmodeHeightInPercents = 0;

    var gridFreespaceDaymodeWidthInPixels = 0;
    var gridFreespaceMonthmodeHeightInPixels = 0;

    var currentRowPercentPosition = 0;
    var currentRowPercentPositionShifted = 0;

    var atLeastOneBlockExpanded = false;

    var ieBlockWidthCorrection = 0;

    eventBlockElements = this._eventBlockElements;

    this._autoresizeEnabled = false;

    this._updateBlocksExpandedState();

    if (this._blocksExpandedState) {

      switch (viewOptions.displayType) {

        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{

          this._grid.style["width"] = 100 + "%";

          this._size.grid.width =
          this._size.eventOwner.width =
          this._eventOwner["offsetWidth"];

          ieBlockWidthCorrection = this._calculateIEBlockWidthCorrection();

          this._calculateEventGrid(0x1);

          this._gridColumnsPercentPositions = [];

          spacePercentWidth = this._gridWidthIncrementInPercents;

          gridFreespaceDaymodeWidthInPixels = this._gridFreespaceDaymodeWidthInPixels
          gridFreespaceDaymodeWidthInPercents
                  = gridFreespaceDaymodeWidthInPixels / this._size.eventOwner.width * 100;


          for (counter = 0,length = eventBlockElements.length;
               counter < length; ++counter) {

            eventBlockElement
                    = eventBlockElements[counter];

          // Reset positions of columns
            this._gridColumnsPercentPositions.push(spacePercentWidth
                    * counter);
            echo("counter: " + counter);
            if (!(counter == 0)) {
              this._gridColumnsElements[counter - 1]
                      .style["left"]
                      = spacePercentWidth * counter + "%";

            }

          // Changing container element
            /*  = ((!(this._gridColumnsPercentPositions[counter + 1] == undefined))
           ? this._gridColumnsPercentPositions[counter + 1] : 100)
           - this._gridColumnsPercentPositions[counter];*/
            eventBlockElement.style["left"]
                    = this._gridColumnsPercentPositions[counter]
                    + gridFreespaceDaymodeWidthInPercents
                    + "%";
            eventBlockElement.style["width"]
                    = spacePercentWidth
                    - gridFreespaceDaymodeWidthInPercents
                    - ieBlockWidthCorrection
                    + "%";

          }

        };break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{

          this._grid.style["height"] = 100 + "%";

          this._size.grid.height =
          this._size.eventOwner.height =
          this._eventOwner["offsetHeight"];

          this._calculateEventGrid(0x2);

          this._gridRowsPercentPositions = [];
          this._gridRowsPercentPositionsShifted = [];

          spacePercentHeight = this._gridHeightIncrementInPercents;

          gridFreespaceMonthmodeHeightInPixels = this._gridFreespaceMonthmodeHeightInPixels;
          gridFreespaceMonthmodeHeightInPercents
                  = gridFreespaceMonthmodeHeightInPixels / this._size.eventOwner.height * 100;

          for (counter = 0,length = eventBlockElements.length;
               counter < length; ++counter) {

            currentRowPercentPosition
                    = spacePercentHeight * (counter + 1);
            currentRowPercentPositionShifted
                    = spacePercentHeight * counter;
          // Keep positions of rows
            this._gridRowsPercentPositions.push(currentRowPercentPosition);
            this._gridRowsPercentPositionsShifted.push(currentRowPercentPositionShifted);


          // Adding container element
            eventBlockElement
                    = eventBlockElements[counter]

            // Reset positions of columns
            echo("counter: " + counter);
            if (!(counter == length - 1)) {
              this._gridRowsElements[counter]
                      .style["top"] = currentRowPercentPosition + "%";
            }

            eventBlockElement.style["top"]
                    = currentRowPercentPositionShifted
                    + gridFreespaceMonthmodeHeightInPercents
                    + "%";
            eventBlockElement.style["height"]
                    = spacePercentHeight
                    - gridFreespaceMonthmodeHeightInPercents
                    + "%";
            this._cellBlockElements[counter].style["top"]
                    = currentRowPercentPositionShifted
                    + "%";
            this._cellBlockElements[counter].style["height"]
                    = spacePercentHeight + "%";

          }

        };break;

      }

      this._formGridControl();

    }


  },

  _shiftView: function(aShiftOptions) {

    var viewOptions = this.viewOptions;

    var shiftOptions = {
      shiftDateTime: null,
      shiftValue: 0,
      byHistory: false
    };

    var timeGridOptions = {
      columnsQuantity: 0,
      rowsQuantity: 0,
      startDateTime: null,
      recalculate: 0
    };

    var prevBaseDateTime = null;

    var relayoutBitmask = 0;

    goog.object.extend(shiftOptions, aShiftOptions);

    // We need previous baseDateTime only for history support when we jump to dates
    if (!shiftOptions.byHistory) {

      if (shiftOptions.shiftDateTime != null) {
        // Set history token
        //  only in case of shiftDateTime used,
        //  i.e. "jump" to dateTime, for example,
        //  jump to today. History support enables
        //  handy way to return to previous state.

        // This token will return you to place
        //  where you shifted from
        prevBaseDateTime = viewOptions.baseDateTime.clone();
        this._hist.update(rflect.cal.History.ACTION_SHIFT_VIEW, {
          methodEntry: aShiftOptions,
          baseDateTime: prevBaseDateTime
        });
      }

    }

    // Setting startDateTime for timegrid
    switch (viewOptions.type) {
      case rflect.cal.Main.Modes.MULTIDAY:{

        if (!(shiftOptions.shiftDateTime == null)) {
          timeGridOptions.startDateTime = shiftOptions.shiftDateTime.clone();
          viewOptions.baseDateTime = shiftOptions.shiftDateTime.clone();
        } else if (!(shiftOptions.shiftValue == 0)) {
          timeGridOptions.startDateTime
                  = viewOptions.baseDateTime
                  .addDays(viewOptions.columnsQuantity
                  * shiftOptions.shiftValue)
                  .clone();
        }

      };break;
      case rflect.cal.Main.Modes.MULTIWEEK: {

        if (!(shiftOptions.shiftDateTime == null)) {
          firstDayOfWeek = shiftOptions.shiftDateTime.moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
          timeGridOptions.startDateTime = firstDayOfWeek.clone();
          viewOptions.baseDateTime = firstDayOfWeek.clone();
        } else if (!(shiftOptions.shiftValue == 0)) {
          timeGridOptions.startDateTime = viewOptions.baseDateTime
                  .addWeeks(viewOptions.rowsQuantity
                  * shiftOptions.shiftValue)
                  .clone().moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
        }

      };break;
      case rflect.cal.Main.Modes.WEEK: {

        if (!(shiftOptions.shiftDateTime == null)) {
          timeGridOptions.startDateTime =
          shiftOptions.shiftDateTime.clone().moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
          viewOptions.baseDateTime = shiftOptions.shiftDateTime.clone();
        } else if (!(shiftOptions.shiftValue == 0)) {
          timeGridOptions.startDateTime = viewOptions.baseDateTime
                  .addWeeks(shiftOptions.shiftValue)
                  .clone().moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
        }

      };break;
      case rflect.cal.Main.Modes.MONTH: {

        if (!(shiftOptions.shiftDateTime == null)) {
          firstDayOfMonth =
          shiftOptions.shiftDateTime.clone().moveToFirstDayOfMonth();
          timeGridOptions.startDateTime =
          firstDayOfMonth.moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
          viewOptions.baseDateTime = shiftOptions.shiftDateTime.clone();
        } else if (!(shiftOptions.shiftValue == 0)) {
          viewOptions.baseDateTime
                  .addMonths(shiftOptions.shiftValue);
          firstDayOfMonth =
          viewOptions.baseDateTime.clone().moveToFirstDayOfMonth();
          timeGridOptions.startDateTime =
          firstDayOfMonth.moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
        }

      };break;
      default:break;
    }

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        timeGridOptions.viewDisplayType
                = rflect.cal.TimeGrid.DISPLAY_TYPE_DAY;
      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        timeGridOptions.viewDisplayType
                = rflect.cal.TimeGrid.DISPLAY_TYPE_MONTH;
      };break;
      default:break;
    }

    // Setting rows and cols quantity for timegrid
    timeGridOptions.rowsQuantity = viewOptions.rowsQuantity;
    timeGridOptions.columnsQuantity = viewOptions.columnsQuantity;

    // Setting recalculate to calculate day grid
    timeGridOptions.recalculate
            = timeGridOptions.recalculate | rflect.cal.TimeGrid.DAY_GRID;

    // Calculate timegrid
    this._tgrid.recalculate(timeGridOptions);

    inspect("_tgrid_after_shift", this._tgrid);

    // Show date label
    this._showDate();
    // Do things specific for display type
    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        // TODO: Think about this in switchView
        // Form column headers
        relayoutBitmask |= rflect.cal.Main.Relayout.COL_HEADERS |
                           rflect.cal.Main.Relayout.WRITE_TO_COL_HEADERS_CONTAINER;
      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        // Form month cell set
        relayoutBitmask |= rflect.cal.Main.Relayout.MONTH_CELL_SET |
                           rflect.cal.Main.Relayout.WRITE_TO_DECOWNER;
      };break;
      default:break;
    }

    this._relayout(relayoutBitmask);

    this._calculateIntervals();
    // Update calendar events collection
    this._updateCalendarEventsCollection();
    //this._updateCalendarEventsInInterval();

    // Dispose relayoutEnd listeners which haven't fired
    //this._disposeBlocks("relayoutEnd");

    if (!shiftOptions.byHistory) {

      if (shiftOptions.shiftDateTime != null) {
        // This token will return you to place
        //  where you shifted to
        prevBaseDateTime = viewOptions.baseDateTime.clone();
       
        // For some reason we need delay between
        //  history updates in Firefox 2.0, because
        //  tokens are not stacked if placed too fast,
        //  but erase previous ones instead.
        window.setTimeout(goog.bind(function() {
          this._hist.update(rflect.cal.History.ACTION_SHIFT_VIEW, {
            methodEntry: aShiftOptions,
            baseDateTime: viewOptions.baseDateTime.clone()
          });
        }, this), 1);
      }
      ;

    }
    ;

  },

  _showDate: function Calendar__showDate(aDateStart, aDateEnd) {

    var viewOptions = this.viewOptions;
    var dateSignatureElement = document.getElementById("dateunderlay");
    var dateString = "";
    var dateFormat = "d MMM yyyy";
    var start = null;
    var end = null;

    start = this._tgrid.getStartDateTime();
    end = this._tgrid.getInclusiveEndDateTime();

   //echo("start: " + start);
    //echo("end: " + end);

    // Monthmode is a special case
    if (viewOptions.type == rflect.cal.Main.Modes.MONTH) {
      dateString = viewOptions.baseDateTime
              .toFormattedString("MMMM yyyy");
    } else {
      if (!(start.getFullYear() == end.getFullYear())) {
        dateString = start.toFormattedString(dateFormat)
                + " - "
                + end.toFormattedString(dateFormat);
      } else  if (!(start.getMonth() == end.getMonth())) {
        dateString = start.toFormattedString("d MMM")
                + " - "
                + end.toFormattedString(dateFormat);
      } else {
        if (!(start.getDate() == end.getDate())) {
          dateString = start.toFormattedString("d")
                  + " - "
                  + end.toFormattedString(dateFormat);
        } else {
          dateString = start.toFormattedString(dateFormat);
        }
      }
    }

    dateSignatureElement.innerHTML = dateString;
  },

  _switchTab: function Calendar__switchTab(aTab) {

    goog.dom.classes.remove(goog.dom.getChildNodes(aTab)[2], "modelinkOff");
          //Second, add on modeDisplayType className
    goog.dom.classes.add(goog.dom.getChildNodes(aTab)[2], "modelinkOn");
          //Do opposite thing on previous tab, if there's any
    if (!(this._previouslySelectedTab == null || this._previouslySelectedTab
            == aTab)) {
      //First, remove on modeDisplayType className
      goog.dom.classes.remove(goog.dom.getChildNodes(this._previouslySelectedTab)[2], "modelinkOn");
            //Second, add off modeDisplayType className
      goog.dom.classes.add(goog.dom.getChildNodes(this._previouslySelectedTab)[2], "modelinkOff");
    }
    if (!(this._previouslySelectedTab == aTab)) {
      this._previouslySelectedTab = aTab;
      return true;
    }
    return false;

  },

  _switchView: function Calendar__switchMode(aViewOptions) {

    var viewOptions = null;
    var previousViewOptions = null;

    var displayTypeChanged = false;
    var blocksQuantityIsChanged = false;

    var timeGridOptions = {
      columnsQuantity: 0,
      rowsQuantity: 0,
      startDateTime: null,
      recalculate: 0,
      viewDisplayType: 0
    };

    var firstDayOfWeek = null;
    var firstDayOfMonth = null;

    var rebuild = false;

    var byTab = "byTab" in aViewOptions
            ? aViewOptions["byTab"] : false;

    var byHistory = "byHistory" in aViewOptions
            ? aViewOptions["byHistory"] : false;

    var relayoutBitmask = 0;

    previousViewOptions = goog.object.clone(this.viewOptions);
    viewOptions = this.viewOptions;
    //goog.object.extend(viewOptions, aViewOptions);

    // First, setting type
    viewOptions.type = aViewOptions.type;

        // Setting startDateTime for timegrid
    switch (viewOptions.type) {
      case rflect.cal.Main.Modes.MULTIDAY:{
        // Multiday expects
        //  startDateTime being set,
        //  otherwise uses baseDateTime
        if ("startDateTime" in aViewOptions) {
          timeGridOptions.startDateTime = aViewOptions.startDateTime.clone();
          viewOptions.baseDateTime = aViewOptions.startDateTime.clone();
        } else {
          timeGridOptions.startDateTime = viewOptions.baseDateTime.clone();
                //echo("timeGridOptions.startDateTime: " + timeGridOptions.startDateTime);
        }
        if (!byTab) {
          switch (aViewOptions.columnsQuantity) {
            case 1: {
              this._switchTab(this._tabAlpha);
            };break;
          }
        }
      };break;
      case rflect.cal.Main.Modes.MULTIWEEK:{
        // Multiweek expects
        //  startDateTime being set,
        //  otherwise uses baseDateTime
        if ("startDateTime" in aViewOptions) {
          firstDayOfWeek = aViewOptions.startDateTime.moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
          timeGridOptions.startDateTime = firstDayOfWeek.clone();
          viewOptions.baseDateTime = firstDayOfWeek.clone();
        } else {
          firstDayOfWeek = viewOptions.baseDateTime.moveToDayOfWeekIfNeeded(
                  rflect.loc.datetime.DateTime.firstDayOfWeek,
                  -1);
          timeGridOptions.startDateTime = firstDayOfWeek.clone();
        }
      };break;
      case rflect.cal.Main.Modes.WEEK: {
        // Week doesn't expect startDateTime being set,
        //  but uses baseDateTime to get first day of week
        timeGridOptions.startDateTime =
        viewOptions.baseDateTime.clone().moveToDayOfWeekIfNeeded(
                rflect.loc.datetime.DateTime.firstDayOfWeek,
                -1);
        if (!byTab) {
          this._switchTab(this._tabBeta);
        }

      };break;
      case rflect.cal.Main.Modes.MONTH: {
        // Month doesn't expect startDateTime being set,
        //  but uses baseDateTime to get first day of month, and then,
        // first day of week containing first day of month.
        firstDayOfMonth =
        viewOptions.baseDateTime.clone().moveToFirstDayOfMonth();
        timeGridOptions.startDateTime = firstDayOfMonth.moveToDayOfWeekIfNeeded(
                rflect.loc.datetime.DateTime.firstDayOfWeek,
                -1);
        if (!byTab) {
          this._switchTab(this._tabGamma);
        }

      };break;
      default:break;
    }

    // Setting displayType from type
    viewOptions.displayType
            = (viewOptions.type == rflect.cal.Main.Modes.MULTIDAY
            || viewOptions.type == rflect.cal.Main.Modes.WEEK)
            ? rflect.cal.Main.Modes.DISPLAY_TYPE_DAY
            : ((viewOptions.type == rflect.cal.Main.Modes.MULTIWEEK
            || viewOptions.type == rflect.cal.Main.Modes.MONTH)
            ? rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH
            : 0);

    // Setting default rows and cols quantities
    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        viewOptions.columnsQuantity = ("columnsQuantity" in aViewOptions)
                ? aViewOptions["columnsQuantity"]
                : 7;
        viewOptions.rowsQuantity = ("rowsQuantity" in aViewOptions)
                ? aViewOptions["rowsQuantity"]
                : 48;
        timeGridOptions.viewDisplayType =
        rflect.cal.TimeGrid.DISPLAY_TYPE_DAY;

        // Scroll options
        this._scrollOptions.xEnabled = false;
        this._scrollOptions.yEnabled = true;

        this._scrollOptions.padding = {
          left: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_LEFT,
          right: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_RIGHT,
          top: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_TOP,
          bottom: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_DAYMODE_PADDING_BOTTOM
        };

      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        viewOptions.columnsQuantity = ("columnsQuantity" in aViewOptions)
                ? aViewOptions["columnsQuantity"]
                : 7;
        viewOptions.rowsQuantity = ("rowsQuantity" in aViewOptions)
                ? aViewOptions["rowsQuantity"]
                : 5;
        timeGridOptions.viewDisplayType =
        rflect.cal.TimeGrid.DISPLAY_TYPE_MONTH;

        // Scroll options
        this._scrollOptions.xEnabled = false;
        this._scrollOptions.yEnabled = false;

        this._scrollOptions.padding = {
          left: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_LEFT,
          right: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_RIGHT,
          top: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_TOP,
          bottom: rflect.cal.Main.GRID_CONTAINER_SCROLL_AREA_MONTHMODE_PADDING_BOTTOM
        };

      };break;
      default:break;
    }

    displayTypeChanged = viewOptions.displayType != previousViewOptions.displayType;

    blocksQuantityIsChanged = (previousViewOptions.columnsQuantity
            != viewOptions.columnsQuantity )
            || (previousViewOptions.rowsQuantity
            != viewOptions.rowsQuantity);

    // Calculate rebuld condition
    rebuild = displayTypeChanged
            || blocksQuantityIsChanged;

    // Setting recalculate to calculate 48-hour grid only once
    if (viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY)
      if (!viewOptions.hourGridCalculated) {
        timeGridOptions.recalculate
                = timeGridOptions.recalculate | rflect.cal.TimeGrid.HOUR_GRID;
        viewOptions.hourGridCalculated = true;
      }

    // Setting recalculate to calculate day grid
    timeGridOptions.recalculate
            = timeGridOptions.recalculate | rflect.cal.TimeGrid.DAY_GRID;

    // Setting rows and cols quantity for timegrid
    timeGridOptions.rowsQuantity = viewOptions.rowsQuantity;
    timeGridOptions.columnsQuantity = viewOptions.columnsQuantity;

    // If timegrid hasn't been initialized, do it
    if (this._tgrid == null)
      this._tgrid = new rflect.cal.TimeGrid();

    inspect("_timeGridOptions", timeGridOptions);
    //echo("timeGridOptions.startDateTime: " + timeGridOptions.startDateTime);

    // Calculate timegrid
    this._tgrid.recalculate(timeGridOptions);

    relayoutBitmask |= rflect.cal.Main.Relayout.COL_HEADERS_CONTAINER |
                       rflect.cal.Main.Relayout.COL_HEADERS |
                       rflect.cal.Main.Relayout.GRID_CONTAINER |
                       rflect.cal.Main.Relayout.GRID |
                       rflect.cal.Main.Relayout.DECOWNER |
                       (viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH
                               ? rflect.cal.Main.Relayout.MONTH_CELL_SET
                               : rflect.cal.Main.Relayout.ALL_DAY_GRID |
                                 rflect.cal.Main.Relayout.ROW_HEADERS) |
                       rflect.cal.Main.Relayout.EVENTOWNER |
                       rflect.cal.Main.Relayout.GRID_ROWS |
                       rflect.cal.Main.Relayout.GRID_COLS |
                       rflect.cal.Main.Relayout.GRID_ROWS_POSITIONS_RECALCULATE |
                       rflect.cal.Main.Relayout.GRID_COLS_POSITIONS_RECALCULATE |
                       (displayTypeChanged
                               ? rflect.cal.Main.Relayout.LISTENER_CHANGE
                               : 0) |
                       rflect.cal.Main.Relayout.WRITE_TO_CHROME;

    this._relayout(relayoutBitmask);

    if (displayTypeChanged) {

      // Adapt to screen size
      if (this._size.viewport == null)
        this._size.viewport = goog.dom.getViewportSize();

      this._formSizes(this._size.viewport, false);

    } else if (this._blocksExpandedState) {

      // This is the case when we stay in the same displayType
      //  but we want grid size to be reset,
      //  if any of the blocks was expanded.
      switch (viewOptions.displayType) {
        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
          this._size.grid = this._size.gridDayModeCached.clone();
        };break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
          this._size.grid = this._size.gridMonthModeCached.clone();
        };break;
      }
      this._size.eventOwner = this._size.grid.clone();

    }

    // Show date label
    this._showDate();

    if (rebuild) {
      this._formGridControl();
    }
                                             
    // Calculate event grid
    this._calculateEventGrid(0x1 | 0x2);
    
    // Form calendar event blocks
    this._formBlocks(rebuild ? 0x7 : 0);

    this._formTimeIncrements();
    this._calculateIntervals();
    // Update calendar events collection
    this._updateCalendarEventsCollection();

    // Set history token
    if (!byHistory) {
      this._hist.update(rflect.cal.History.ACTION_SWITCH_VIEW, {
        methodEntry: aViewOptions,
        baseDateTime: previousViewOptions.baseDateTime.clone()
      });
    }

    inspect("_viewOptions", viewOptions);
    inspect("_tgrid", this._tgrid);

  }


});