rflect.cal.Main.__fuse({

  // TODO: For now considering only horizontal movement, monthmode compatibility required

  _onKeyUpDefault: function Calendar__onKeyUpDefault(aEvent) {

    var box = null;

    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      // Hide box
      if (!( (box = this._calendarEventCreationBox) == null)) {
        if (box.isVisible()) {
          box.show(false);
          if (!this._draggingSelection)
            this._hideSelectionRectangles();
        }
      }

       // Hide box
      if (!( (box = this._calendarEventChangeBox) == null)) {
        if (box.isVisible()) {
          box.show(false);
        }
      }
    }

  },

  _onMouseDownDefault: function Calendar__onMouseDownDefault(aEvent) {

    var box = null;

    if (!this._mousedownOnCreationBox) {
      // Hide box
      if (!( (box = this._calendarEventCreationBox) == null)) {
        //echo("box.isVisible(): " + box.isVisible());
        if (box.isVisible()) {
          box.show(false);
          if (!this._draggingSelection)
            this._hideSelectionRectangles();
        }
      }
    }

    if (!this._mousedownOnChangeBox) {
      // Hide box
      if (!( (box = this._calendarEventChangeBox) == null)) {
        if (box.isVisible()) {
          box.show(false);
        }
      }
    }

    this._mousedownOnCreationBox = false;
    this._mousedownOnChangeBox = false;

  },

  _onMouseDownGrid: function Calendar_onMouseDownEventOwner(aEvent) {

    //echo("grid clicked", 1);

    var viewOptions = this.viewOptions;
    var displayType = viewOptions.displayType;

    var scrollOps = this._scrollOptions;
    var gcPos = null;
    var gcSize = this._size.gridContainer;

    var pageX = 0;
    var pageY = 0;
    var offset = null;

    var shift = 0;
    var maxRowPosition = 0;
    var gridPositionCounter = 0;

    var initialTarget = 0;
    var target = null;
    var targetID = "";
    var form = null;
    var input = null;

    var classes = null;

    var searchResult = null;
    var calEventHashID = "";
    var classFound = false;

    var dayGrid = null;

    var splitted = null;
    var row = "";
    var col = "";
    var cell = null;

    // Only allow left button mousedown
    if (aEvent.isButton(goog.events.BrowserEvent.MouseButton.LEFT)) {

      dayGrid = this._tgrid.getDayGrid();

      this._mousedownX = pageX = aEvent.pageX;
      this._mousedownY = pageY = aEvent.pageY;

      // Determine mouse event offset relative to eventOwner
      offset = goog.style.getRelativePosition(aEvent, this._eventOwner);

      // TODO: Cache scroll in scroll listener
      this._eventOwnerPos = new goog.math.Coordinate(
              pageX - (offset.x - this._gridContainer["scrollLeft"]),
              pageY - (offset.y - this._gridContainer["scrollTop"])
              );

      this._gridContainerPos = goog.style.getPageOffset(this._gridContainer);

      echo("e.target: " + aEvent.target["id"]);
      //echo("eventOwnerTop: " + this._eventOwnerTop, 1);
      //echo("this._gridContainer[\"scrollTop\"]: " + this._gridContainer["scrollTop"], 1);

      //var offsetX = e.offsetX;
      //var offsetY = e.offsetY;

      //echo("relX: " + offsetX);
      //echo("relY: " + offsetY);

      switch (displayType) {
        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
          shift = -3;
          maxRowPosition = 144;
        };break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
          shift = -this._gridHeightIncrementInPercents;
          maxRowPosition = 100;
        };break;

      }

      gridPositionCounter = -1;

      // Get target.
      target = aEvent.target;
      targetID = target["id"];

      // Get target classes.
      classes = goog.dom.classes.get(target);

      this._hideSelectionRectangles();

			// Click on grid could lead to three possible situations:
      //  1. We are clicking on empty space and initializing
      //    selection drag.
      //  2. We are clicking on day number.
      //  3. We are clicking on calendar event box.

      // When we click on empty space, as it seems so user,
      //  actually we may click on:
      //  1. Event owner.
      //  2. Event block (column or row which contains events).
      //  3. Horizontal or vertical rule -
      //   this situation was encountered in IE 6
      if (goog.array.contains(classes, "eventBlockContainer") ||
          goog.array.contains(classes, "hrule") ||
          goog.array.contains(classes, "vrule") ||
          (targetID == "eventowner")) {

        // Start event creation when eventOwner is clicked
        // or when eventBlock is clicked

        this._selectionLeft = 0;
        this._selectionTop = 0;
        this._selectionWidth = 0;
        this._selectionHeight = 0;
        this._selectionTopInPixels = 0;
        this._selectionLeftInPixels = 0;
        this._selectionWidthInPixels = 0;
        this._selectionHeightInPixels = 0;
        this._counterHorizontalOld = -1;
        this._counterVerticalOld = -1;
        /*this._startLeft = aEventObject.pageX - eventOwnerLeft;
        this._startTop = aEventObject.pageY - eventOwnerTop;*/

        //Search for closest column to left

        do{
          gridPositionCounter++;
        }
          // TODO: Store absoluteLeft of eventOwner. Recalculate only on resize or moving etc
        while ((!(this._gridColumnsPixelPositions[gridPositionCounter + 1]
                == null)) &&
               (offset.x > this._gridColumnsPixelPositions[gridPositionCounter
                       + 1]));

        //TODO: Store readied for use coordinates of grid
        this._selectionLeft =
        this._gridColumnsPercentPositions[gridPositionCounter];
        this._selectionStartLeftIndex
                = this._selectionEndLeftIndex
                = gridPositionCounter;

        this._selectionLeftInPixels =
        this._gridColumnsPixelPositions[gridPositionCounter];
        // TODO: Problem with spaces between selections could be solved by adding small number in percents to width of each selection rectangle. Find out the lowest number to work with Safari.
        this._selectionWidth =
        ((!(this._gridColumnsPercentPositions[gridPositionCounter + 1]
                == undefined))
                ? this._gridColumnsPercentPositions[gridPositionCounter + 1]
                : 100)
                - this._gridColumnsPercentPositions[gridPositionCounter] + 0.2;

        this._selectionWidthOld = -1;
        //Search for closest row to top. Note: we imagine that first row on zero position,
        // while actually it is on 3ex position
        gridPositionCounter = -1;
        do{
          gridPositionCounter++;
        }
        while ((!(this._gridRowsPixelPositionsShifted[gridPositionCounter + 1]
                == null)) &&
               (offset.y
                       > this._gridRowsPixelPositionsShifted[gridPositionCounter
                       + 1]));

        //echo("Clicked on " + gridPositionCounter + "row", 1);

        this._selectionTop =
        this._gridRowsPercentPositionsShifted[gridPositionCounter];
        this._selectionStartTopIndex
                = this._selectionEndTopIndex
                = gridPositionCounter;
        this._selectionTopInPixels =
        this._gridRowsPixelPositionsShifted[gridPositionCounter];
        this._selectionHeight =
        ((!(this._gridRowsPercentPositionsShifted[gridPositionCounter + 1]
                == undefined))
                ? this._gridRowsPercentPositionsShifted[gridPositionCounter + 1]
                : maxRowPosition)
                - this._gridRowsPercentPositionsShifted[gridPositionCounter]
                + 0.2;

       //echo("this._selectionHeight: " + this._selectionHeight);

        //this._selectionHeight = (this._gridHeightIncrementInPercents + 0.2) + verticalUnits;
        this._selectionHeightOld = -1;


       //echo("Selection rectangle: " + "(" + this._selectionLeft + "," + this._selectionTop + ", "
        //+ this._selectionWidth + ", " + this._selectionHeight + ")");

        this._drawSelectionRectangle(this._selectionLeft,
                this._selectionTop,
                this._selectionWidth,
                this._selectionHeight);
        this._modes.selectionRectangleStructure =
        rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE;

        // Set dragging flag when selection
        //  rectangle was actually drawn
        this._draggingSelection = true;
      } else if (goog.array.contains(classes, "dayNumber")) {

        // We've pushed daynumber,
        //  determine what coordinate is clicked
        //  by parsing id string

        splitted = targetID.split(",");
        row = splitted[0];
        col = splitted[1];

        cell = dayGrid[row][col];

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

      } else {

        // We've probably clicked on event rectangle
        // Try to find eventID by
        // searching eventContainerDiv

        initialTarget = target;

        try {
          while (!(classFound =
                   goog.dom.classes.has(target, "eventRectangle"))) {
            target = target.parentNode;
          }
        } catch (ex) {
          // Class wasn't found
        }

       //echo("classFound: " + classFound, 1);

        //We can either stop when we've found element with
        // such class or when we reached top of tree
        // and havent't found it
        // in that case target == null

        // If such an element was found
        if (classFound) {

          // rflect.cal.Main event rectangle is clicked
          this._eventDivIsClicked = true;

          // Retreive eventID from element
          form = goog.dom.getChildNodes(target)[0];
          input = goog.dom.getChildNodes(form)[0];

          calEventHashID = input["value"];

          searchResult = this._getCalendarEventByID(calEventHashID);
          this._drag.calEvent = searchResult[0];
          this._drag.index = searchResult[1];

          inspect("_drag", this._drag);

          if (goog.dom.classes.has(initialTarget, "resize")) {

            this._drag.type = rflect.cal.Main.DRAG_LENGTH;

          } else {

            this._drag.type = rflect.cal.Main.DRAG_WHOLE;

          }

          // Get event time parameters
          this._drag.startDateTime
                  = this._drag.calEvent
                  .getStart().clone();
          this._drag.endDateTime
                  = this._drag.calEvent
                  .getEnd().clone();

          // Remember position where it was clicked in order
          // to prepare for possible drag'n'drop
          do{
            gridPositionCounter++;
          }
          while ((!(this._gridColumnsPixelPositions[gridPositionCounter]
                  == null)) &&
                 (offset.x
                         > this._gridColumnsPixelPositions[gridPositionCounter]));
                    //TODO: Store readied for use coordinates of grid
          this._rectangleLeftIndexOld = gridPositionCounter - 1;

          gridPositionCounter = 0;
          do{
            gridPositionCounter++;
          }
          while ((!(this._gridRowsPixelPositionsShifted[gridPositionCounter]
                  == null)) &&
                 (offset.y
                         > this._gridRowsPixelPositionsShifted[gridPositionCounter]));
          this._rectangleTopIndexOld = gridPositionCounter - 1;

         //echo("this._rectangleTopIndexOld: " + this._rectangleTopIndexOld);
          //echo("this._rectangleLeftIndexOld: " + this._rectangleLeftIndexOld);

        }

      }
      ;

      if (scrollOps.xEnabled || scrollOps.yEnabled) {

        gcPos = this._gridContainerPos =
                goog.style.getPageOffset(this._gridContainer);
        scrollOps.box.left = gcPos.x + scrollOps.padding.left;
        scrollOps.box.right = gcPos.x + gcSize.width - scrollOps.padding.right;
        scrollOps.box.top = gcPos.y + scrollOps.padding.top;
        scrollOps.box.bottom = gcPos.y + gcSize.height - scrollOps.padding.bottom;
        scrollOps.offset.x = offset.x;
        scrollOps.offset.y = offset.y;

        if (scrollOps.xEnabled) {
          this._autoscrX.setLimits();
        }
        ;
        if (scrollOps.yEnabled) {
          this._autoscrY.setLimits();
        }
        ;

      }
      ;
      inspect("_scrollOptions", scrollOps);
      this._scrollOptions = scrollOps;

      aEvent.preventDefault();

    }

  },

  _onMouseMoveDayMode: function Calendar_onMouseMoveDayMode(aEvent) {

    var viewOptions = this.viewOptions;
    var displayType = viewOptions.displayType;

    var selection = this._selection;

    var scrollOps = this._scrollOptions;

    var offsetX = 0;
    var offsetY = 0;

    var modeSelectionRectangle = this._modes.selectionRectangleStructure;
    var shift = (displayType
            == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY)
            ? -3 : -this._gridHeightIncrementInPercents;
    var counterHorizontal = -1;
    var counterVertical = -1;
    var counterHorizontalIsChanged = false;
    var counterVerticalIsChanged = false;

    switch (aEvent.type) {
      case "mousemove": {
        if (this._draggingSelection || this._eventDivIsClicked) {

          scrollOps.offset.x = offsetX = aEvent.pageX - (this._eventOwnerPos.x
                  - this._gridContainer["scrollLeft"]);
          scrollOps.offset.y = offsetY = aEvent.pageY - (this._eventOwnerPos.y
                  - this._gridContainer["scrollTop"]);

          /*echo("mousemove offsetX: " + offsetX);
          echo("mousemove offsetY: " + offsetY);
          */

          // In month mode, horizontal and vertical scrolls are enabled
          if (scrollOps.xEnabled) {
            this._updateScroll(0x4, aEvent.pageX, aEvent.pageY);
          }
          ;
          if (scrollOps.yEnabled) {
            this._updateScroll(0x8, aEvent.pageX, aEvent.pageY);
          }
          ;
          this._scrollOptions = scrollOps;

        }
        ;
      };break;
      case "scroll": {
        scrollOps.offset.x = offsetX = aEvent.offsetX;
        scrollOps.offset.y = offsetY = aEvent.offsetY;
        /*echo("scroll offsetX: " + offsetX);
        echo("scroll offsetY: " + offsetY);
        */

        this._scrollOptions = scrollOps;
      };break;
      default:break;
    }
    ;

      // Selection dragging in day mode
    if (this._draggingSelection) {

      var lowerSelectionLeft = 0;
      var lowerSelectionTop = 0;
      var lowerSelectionWidth = 0;
      var lowerSelectionHeight = 0;

      var upperSelectionLeft = 0;
      var upperSelectionTop = 0;
      var upperSelectionWidth = 0;
      var upperSelectionHeight = 0;

      do {
        counterHorizontal++;
      }
      while ((!(this._gridColumnsPixelPositions[counterHorizontal + 1]
              == null)) &&
             (offsetX
                     > this._gridColumnsPixelPositions[counterHorizontal
                     + 1]));

      //echo("counterHorizontal: " + counterHorizontal);
      //echo("counterHorizontalOld: " + this._counterHorizontalOld);

      // Do not redraw rectangle if it width in increments hasn't changed
      if (!(this._counterHorizontalOld == counterHorizontal)) {

        counterHorizontalIsChanged = true;

        this._selectionEndLeftIndex = counterHorizontal;

         //echo("Selection width changed!");

        // If we returned into single mode
        if (counterHorizontal == this._selectionStartLeftIndex) {
          //echo("sigle mode reckognized");
          this._modes.selectionRectangleStructure
                  = modeSelectionRectangle
                  = rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE;
          this._selectionLeft =
          this._gridColumnsPercentPositions[counterHorizontal];
          this._selectionWidth =
          ((!(this._gridColumnsPercentPositions[counterHorizontal + 1]
                  == undefined))
                  ? this._gridColumnsPercentPositions[counterHorizontal + 1]
                  : 100)
                  - this._gridColumnsPercentPositions[counterHorizontal ]
                  + 0.2;
                  ////echo("We've returned into single mode");
        }

        if (counterHorizontal > this._selectionStartLeftIndex) {
          //echo("We're in right configuration");
          this._modes.selectionRectangleStructure
                  = modeSelectionRectangle
                  = rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_RIGHT;
            //this._selectionWidthOld = counterHorizontal;
          // Width of selection rectangle has changed
          // counterHorizontal--;
          //this._selectionWidth = this._gridWidthIncrementInPixels * counterHorizontal;
          this._selectionWidth =
          ((!(this._gridColumnsPercentPositions[counterHorizontal + 1]
                  == undefined))
                  ? this._gridColumnsPercentPositions[counterHorizontal + 1]
                  : 100)
                  - this._gridColumnsPercentPositions[this._selectionStartLeftIndex]
                  + 0.2;

                // Calculate parameters of upper and lower selectionRectangle
          lowerSelectionLeft =
          this._gridColumnsPercentPositions[this._selectionStartLeftIndex];
          lowerSelectionTop =
          this._gridRowsPercentPositions[this._selectionStartTopIndex]
                  + shift;
          //lowerSelectionWidth = this._selectionWidth - this._gridWidthIncrementInPixels;
          lowerSelectionWidth =
          ((!(this._gridColumnsPercentPositions[counterHorizontal]
                  == undefined))
                  ? this._gridColumnsPercentPositions[counterHorizontal]
                  : 100)
                  - this._gridColumnsPercentPositions[this._selectionStartLeftIndex];
           //echo("lowerSelectionWidth: " + lowerSelectionWidth);
          lowerSelectionWidth =
          lowerSelectionWidth + ((!(lowerSelectionWidth == 0)) ? 0.2 : 0 );

          lowerSelectionHeight = this._gridRowsPercentPositions[this._gridRowsPercentPositions.length
                  - 1]
                  - this._gridRowsPercentPositions[this._selectionStartTopIndex]
                  + this._gridHeightIncrementInPercents;

                ////echo("lowerSelectionHeight: " + lowerSelectionHeight);
          upperSelectionLeft =
          this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  + 1];
          upperSelectionTop = (this._gridRowsPercentPositions[0])
                  + shift;
          //upperSelectionWidth = lowerSelectionWidth - this._gridWidthIncrementInPixels;
          upperSelectionWidth =
          ((!(this._gridColumnsPercentPositions[counterHorizontal]
                  == undefined))
                  ? this._gridColumnsPercentPositions[counterHorizontal]
                  : 100)
                  - this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  + 1];
          upperSelectionWidth =
          upperSelectionWidth + ((upperSelectionWidth != 0) ? 0.2 : 0);

          upperSelectionHeight =
          this._gridRowsPercentPositions[this._selectionStartTopIndex]
                  - this._gridRowsPercentPositions[0];
          selection.left = this._gridColumnsPercentPositions[counterHorizontal];
            //selection.top = this._gridRowsPercentPositions[0] + shift + verticalUnits;
          selection.width =
          ((!(this._gridColumnsPercentPositions[counterHorizontal + 1]
                  == undefined))
                  ? this._gridColumnsPercentPositions[counterHorizontal + 1]
                  : 100)
                  - this._gridColumnsPercentPositions[counterHorizontal] + 0.2;

        }

        if (counterHorizontal < this._selectionStartLeftIndex) {
          //echo("We're in left configuration");
          this._modes.selectionRectangleStructure
                  = modeSelectionRectangle
                  = rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_LEFT;
                  // TODO: vertical distance could actually stay the same
          // We need to modify selection.top
          //TODO: Substract grid increment in percents here
          this._selectionLeft =
          this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  - counterHorizontal];
            // Here we flip lower and upper lasso in order to minimize interference to algorithm
          lowerSelectionLeft =
          this._gridColumnsPercentPositions[counterHorizontal + 1];
          lowerSelectionTop = this._gridRowsPercentPositions[0]
                  + shift;
            //lowerSelectionWidth = this._selectionWidth - this._gridWidthIncrementInPixels;
          lowerSelectionWidth =
          ((!(this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  + 1] == undefined))
                  ? this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  + 1] : 100)
                  - this._gridColumnsPercentPositions[counterHorizontal + 1];
          lowerSelectionWidth =
          lowerSelectionWidth + ((!(lowerSelectionWidth == 0)) ? 0.2 : 0 );

          lowerSelectionHeight =
          this._gridRowsPercentPositions[this._selectionStartTopIndex]
                  - this._gridRowsPercentPositions[0]
                  - shift;

          upperSelectionLeft = lowerSelectionLeft;
          upperSelectionWidth =
          ((!(this._gridColumnsPercentPositions[this._selectionStartLeftIndex]
                  == undefined))
                  ? this._gridColumnsPercentPositions[this._selectionStartLeftIndex]
                  : 100)
                  - this._gridColumnsPercentPositions[counterHorizontal + 1];
          upperSelectionWidth =
          upperSelectionWidth + ((upperSelectionWidth != 0) ? 0.2 : 0 );

          upperSelectionTop =
          this._gridRowsPercentPositions[this._selectionStartTopIndex + 1]
                  + shift;
          upperSelectionTop = isNaN(upperSelectionTop)
                  ? 0 : upperSelectionTop;

          //upperSelectionWidth =
          upperSelectionHeight =
          this._gridRowsPercentPositions[this._gridRowsPercentPositions.length
                  - 1]
                  - this._gridRowsPercentPositions[this._selectionStartTopIndex];

          upperSelectionHeight = isNaN(upperSelectionHeight)
                  ? 0 : upperSelectionHeight;
                  //TODO: They should modify selections from vertical moving
          selection.left = this._gridColumnsPercentPositions[counterHorizontal];
            //selection.top = this._gridRowsPercentPositions[this._selectionTopIndex + counterVertical - 1]
          //        + shift + verticalUnits;
          //selection.width = this._gridWidthIncrementInPercents + "%";
          selection.width =
          ((!(this._gridColumnsPercentPositions[counterHorizontal + 1]
                  == undefined))
                  ? this._gridColumnsPercentPositions[counterHorizontal + 1]
                  : 100)
                  - this._gridColumnsPercentPositions[counterHorizontal] + 0.2;

        }

        // Lower selection rectangle
        this._drawSelectionRectangle(lowerSelectionLeft,
                lowerSelectionTop,
                lowerSelectionWidth,
                lowerSelectionHeight,
                rflect.cal.Main.SELECTION_RECTANGLE_LOWER);
          // Upper selection rectangle
        this._drawSelectionRectangle(upperSelectionLeft,
                upperSelectionTop,
                upperSelectionWidth,
                upperSelectionHeight,
                rflect.cal.Main.SELECTION_RECTANGLE_UPPER);
      }

      // How many grid vertical increments distance holds
      do {
        counterVertical++;
      }
      while ((!(this._gridRowsPixelPositionsShifted[counterVertical + 1]
              == null)) &&
             (offsetY
                     > this._gridRowsPixelPositionsShifted[counterVertical
                     + 1]));

      counterVerticalIsChanged =
      !(this._selectionHeightOld == counterVertical);

      if (counterVerticalIsChanged) {
        this._selectionEndTopIndex = counterVertical;
      }

      if (counterVerticalIsChanged || counterHorizontalIsChanged) {
        // Three possible variants
        switch (modeSelectionRectangle) {
          case rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE:{

            //echo("We're in single mode");

            if (counterVertical < this._selectionStartTopIndex) {
              this._selectionTop =
              this._gridRowsPercentPositionsShifted[counterVertical];
              this._selectionHeight =
              ((!(this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex
                      + 1] == undefined))
                      ? this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex
                      + 1] : 144)
                      - this._gridRowsPercentPositionsShifted[counterVertical];

            } else {
              this._selectionTop =
              this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex];
              this._selectionHeight =
              ((!(this._gridRowsPercentPositionsShifted[counterVertical + 1]
                      == undefined))
                      ? this._gridRowsPercentPositionsShifted[counterVertical
                      + 1] : 144)
                      - this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex];
            }

            this._selectionHeightOld = counterVertical;

             //echo("Selection width in single mode: " + this._selectionWidth);
            //echo("this._selectionTop: " + this._selectionTop);
            //echo("this._selectionHeight: " + this._selectionHeight);
            //echo("this._selectionTopIndex: " + this._selectionStartTopIndex);

            this._drawSelectionRectangle(this._selectionLeft,
                    this._selectionTop,
                    this._selectionWidth,
                    this._selectionHeight);
              // }
          };break;
          case rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_RIGHT:{
            //echo("We're in right mode");
            // Do not redraw rectangle if it height in increments hasn't changed

            selection.top =
            this._gridRowsPercentPositionsShifted[0];
            selection.height =
            ((!(this._gridRowsPercentPositionsShifted[counterVertical + 1]
                    == undefined))
                    ? this._gridRowsPercentPositionsShifted[counterVertical
                    + 1] : 144)
                    - this._gridRowsPercentPositionsShifted[0];
             //echo("selection.height : " + selection.height);
            /*selection.height = (this._gridRowsPercentPositionsS[this._selectionTopIndex + counterVertical - 1]
         - this._gridRowsPercentPositions[0]
         - shift) + verticalUnits;*/

            this._selectionHeightOld = counterVertical;

            //echo("selection.left in right mode: " + selection.left);
            //echo("selection.width in right mode: " + selection.width);
            this._drawSelectionRectangle(selection.left, selection.top,
                    selection.width, selection.height);

          };break;
          case rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_LEFT:{
            //echo("We're in left mode");

            selection.top =
            this._gridRowsPercentPositionsShifted[counterVertical];
            selection.height = 144
                    - this._gridRowsPercentPositionsShifted[counterVertical];

            this._selectionHeightOld = counterVertical;

            this._drawSelectionRectangle(selection.left, selection.top,
                    selection.width, selection.height);

          };break;
        }
      }
        //}

      // Remember this state
      this._counterHorizontalOld = counterHorizontal;
      counterHorizontalIsChanged = false;

      this._selection = selection;

    }




      // rflect.cal.Main event rectangle dragging in day mode

    if (this._eventDivIsClicked) {

      // Calculate position where it was clicked in order
      // to determine offset
      do{
        counterHorizontal++;
      }
      while ((!(this._gridColumnsPixelPositions[counterHorizontal] == null))
              &&
             (offsetX
                     > this._gridColumnsPixelPositions[counterHorizontal]));
            //TODO: Store readied for use coordinates of grid
      if (counterHorizontal > 0) counterHorizontal--;

      do{
        counterVertical++;
      }
      while ((!(this._gridRowsPixelPositionsShifted[counterVertical] == null))
              &&
             (offsetY
                     > this._gridRowsPixelPositionsShifted[counterVertical]));
      if (counterVertical > 0) counterVertical--;

      // If either rectangleTop changed or rectangleLeft changed
      // we should redraw rectangle
      if ((this._rectangleLeftIndexOld != counterHorizontal
              || this._rectangleTopIndexOld != counterVertical)) {

        if (!this._minimalPositionsSet) {
          this._setToMinimalCapacities();
          this._minimalPositionsSet = true;
        }

        this._updateGhost(
                counterHorizontal - this._rectangleLeftIndexOld,
                counterVertical - this._rectangleTopIndexOld);

          // Signalize that we move rectangle
        this._eventDivIsMoved = true;

          // Save new values
        this._rectangleLeftIndexOld = counterHorizontal;
        this._rectangleTopIndexOld = counterVertical;

         //echo("counterHorizontal: " + counterHorizontal);
        //echo("counterVertical: " + counterVertical);

      }
    }

    aEvent.preventDefault();

  },

  _onMouseMoveMonthMode: function onMouseMoveMonthModeInner(aEvent) {

    var viewOptions = this.viewOptions;
    var displayType = viewOptions.displayType;

    var selection = this._selection;

    var scrollOps = this._scrollOptions;

    var offsetX = 0;
    var offsetY = 0;

    var modeSelectionRectangle = this._modes.selectionRectangleStructure;
    var shift = (displayType
            == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY)
            ? -3 : -this._gridHeightIncrementInPercents;
    var counterHorizontal = -1;
    var counterVertical = -1;

    var counterVerticalIsChanged = false;
    var counterHorizontalIsChanged = false;

    switch (aEvent.type) {
      case "mousemove": {
        if (this._draggingSelection || this._eventDivIsClicked) {

          scrollOps.offset.x = offsetX = aEvent.pageX - (this._eventOwnerPos.x
                  - this._gridContainer["scrollLeft"]);
          scrollOps.offset.y = offsetY = aEvent.pageY - (this._eventOwnerPos.y
                  - this._gridContainer["scrollTop"]);

            // In month mode, only vertical scroll is enabled
          if (scrollOps.yEnabled) {
            this._updateScroll(0x8, aEvent.pageX, aEvent.pageY);
          }
          ;

          this._scrollOptions = scrollOps;
        }
        ;

      };break;
      case "scroll": {
        scrollOps.offset.x = offsetX = aEvent.offsetX;
        scrollOps.offset.y = offsetY = aEvent.offsetY;
        this._scrollOptions = scrollOps;
      };break;
      default:break;
    }
    ;

      // Selection dragging in month mode
    if (this._draggingSelection) {
      // TODO: Try to find less expensive way to drag selection. Maybe we should predict movement - by checking if mouse cursor have crossed virtual event grid.
      //TODO: Check bounds of event owner area
      //calculate how far we are from mousedown point
      //width
      //var horizontalDistanceFromMousedownPoint = this._selectionLeft -
      //height
      var rightSelectionLeft = 0;
      var rightSelectionTop = 0;
      var rightSelectionWidth = 0;
      var rightSelectionHeight = 0;

      var leftSelectionLeft = 0;
      var leftSelectionTop = 0;
      var leftSelectionWidth = 0;
      var leftSelectionHeight = 0;

        // How many grid vertical increments are within distance

      do{
        counterVertical++;
      }
      while ((!(this._gridRowsPixelPositionsShifted[counterVertical + 1]
              == null)) &&
             (offsetY
                     > this._gridRowsPixelPositionsShifted[counterVertical
                     + 1]));

      /*echo("counterVertical: " + counterVertical);
   //echo("counterVerticalOld: " + this._counterVerticalOld);
   //echo("this._selectionTopIndex: " + this._selectionStartTopIndex);*/

      // Do not redraw rectangle if it height in increments hasn't changed

      if (!(this._counterVerticalOld == counterVertical)) {
        //if (!(this._selectionHeightOld == counterVertical)) {

        counterVerticalIsChanged = true;

        this._selectionEndTopIndex = counterVertical;

         //echo("counterVertical is changed !");

        if (counterVertical == this._selectionStartTopIndex) {

          //echo("sigle mode reckognized");

          this._selectionTop =
          this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex];
          this._selectionHeight =
          ((!(this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[counterVertical]
                  + 0.2;
          this._modes.selectionRectangleStructure
                  = modeSelectionRectangle
                  = rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE;
                  //echo("We've returned into single mode");
        }

        if (counterVertical > this._selectionStartTopIndex) {
          //echo("We're in lower configuration");

          this._modes.selectionRectangleStructure
                  = modeSelectionRectangle
                  = rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_LOWER;
                //this._modes.selectionRectangleStructure = rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE;

          this._selectionHeightOld = counterVertical;
                // Width of selection rectangle has changed
          // counterHorizontal--;
          //this._selectionHeight = this._gridHeightIncrementInPixels * counterVertical;

          this._selectionHeight =
          ((!(this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex]
                  + 0.2;

            // Calculate parameters of left and right selectionRectangle
          rightSelectionTop =
          this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex];
          rightSelectionLeft =
          this._gridColumnsPercentPositions[this._selectionStartLeftIndex];
          rightSelectionHeight =
          ((!(this._gridRowsPercentPositionsShifted[counterVertical]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[counterVertical]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex];
          rightSelectionHeight =
          rightSelectionHeight + ((rightSelectionHeight != 0) ? 0.2 : 0 );
          rightSelectionWidth =
          this._gridColumnsPercentPositions[this._gridColumnsPercentPositions.length
                  - 1]
                  - this._gridColumnsPercentPositions[this._selectionStartLeftIndex]
                  + this._gridWidthIncrementInPercents;

            ////echo("lowerSelectionHeight: " + lowerSelectionHeight);
          leftSelectionTop =
          this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex
                  + 1];
          leftSelectionLeft = this._gridColumnsPercentPositions[0];
          leftSelectionHeight =
          ((!(this._gridRowsPercentPositionsShifted[counterVertical]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[counterVertical]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex
                  + 1];
          leftSelectionHeight =
          leftSelectionHeight + ((leftSelectionHeight != 0) ? 0.2 : 0 );
          leftSelectionWidth =
          this._gridColumnsPercentPositions[this._selectionStartLeftIndex]
                  - this._gridColumnsPercentPositions[0];

          selection.top =
          this._gridRowsPercentPositionsShifted[counterVertical];
          selection.height =
          ((!(this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[counterVertical]
                  + 0.2;
        }

        if (counterVertical < this._selectionStartTopIndex) {

          //echo("We're in upper configuration");

          this._modes.selectionRectangleStructure
                  = modeSelectionRectangle
                  = rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_UPPER;
                  //this._modes.selectionRectangleStructure = rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE;
          // TODO: vertical distance could actually stay the same
          // We need to modify selection.top
          //TODO: Substract grid increment in percents here
          this._selectionTop =
          (this._gridRowsPercentPositions[this._selectionStartTopIndex
                  - counterVertical + 1])
                  + shift;

            // Here we flip right and left lasso in order to minimize interference to algorithm
          rightSelectionTop =
          this._gridRowsPercentPositionsShifted[counterVertical + 1];
          rightSelectionLeft = this._gridColumnsPercentPositions[0];
          rightSelectionHeight =
          ((!(this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex
                  + 1] == undefined))
                  ? this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex
                  + 1] : 100)
                  - this._gridRowsPercentPositionsShifted[counterVertical
                  + 1];
          rightSelectionHeight =
          rightSelectionHeight + ((rightSelectionHeight != 0) ? 0.2 : 0);
          rightSelectionWidth =
          this._gridColumnsPercentPositions[this._selectionStartLeftIndex]
                  - this._gridColumnsPercentPositions[0]
                  + 14.2857;
          //echo("rightSelectionWidth: " + rightSelectionWidth);
          //echo("this._gridRowsPercentPositions[this._selectionTopIndex + 1]: " + this._gridRowsPercentPositions[this._selectionTopIndex + 1]);

          leftSelectionTop = rightSelectionTop;
          leftSelectionLeft =
          (!(this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  + 1] == undefined))
                  ? this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                  + 1] : 100;
          //upperSelectionWidth =
          leftSelectionHeight =
          ((!(this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[this._selectionStartTopIndex]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[counterVertical
                  + 1];
          leftSelectionHeight =
          leftSelectionHeight + ((leftSelectionHeight != 0) ? 0.2 : 0);
          leftSelectionWidth =
          this._gridColumnsPercentPositions[this._gridColumnsPercentPositions.length
                  - 1]
                  - this._gridColumnsPercentPositions[this._selectionStartLeftIndex];

          selection.top =
          this._gridRowsPercentPositionsShifted[counterVertical];

          selection.height =
          ((!(this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  == undefined))
                  ? this._gridRowsPercentPositionsShifted[counterVertical + 1]
                  : 100)
                  - this._gridRowsPercentPositionsShifted[counterVertical]
                  + 0.2;

        }

        // Lower selection rectangle
        this._drawSelectionRectangle(rightSelectionLeft,
                rightSelectionTop,
                rightSelectionWidth,
                rightSelectionHeight,
                rflect.cal.Main.SELECTION_RECTANGLE_LOWER);
                // Upper selection rectangle
        this._drawSelectionRectangle(leftSelectionLeft,
                leftSelectionTop,
                leftSelectionWidth,
                leftSelectionHeight,
                rflect.cal.Main.SELECTION_RECTANGLE_UPPER);
      }

      // How many grid horizontal increments distance holds
      do {
        counterHorizontal++;
      }
      while ((!(this._gridColumnsPixelPositions[counterHorizontal + 1]
              == null)) &&
             (offsetX
                     > this._gridColumnsPixelPositions[counterHorizontal
                     + 1]));

      counterHorizontalIsChanged =
      !(this._selectionWidthOld == counterHorizontal);

      if (counterHorizontalIsChanged) {
        this._selectionEndLeftIndex = counterHorizontal;
      }

      if (counterHorizontalIsChanged || counterVerticalIsChanged) {
        // Three possible variants
        switch (modeSelectionRectangle) {
          case rflect.cal.Main.Modes.SELECTION_RECTANGLE_SINGLE:{

            //echo("We're in single mode");

            if (counterHorizontal < this._selectionStartLeftIndex) {

              this._selectionLeft =
              this._gridColumnsPercentPositions[counterHorizontal];
              this._selectionWidth =
              ((!(this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                      + 1] == undefined))
                      ? this._gridColumnsPercentPositions[this._selectionStartLeftIndex
                      + 1] : 100)
                      - this._gridColumnsPercentPositions[counterHorizontal];

            } else {

              this._selectionLeft =
              this._gridColumnsPercentPositions[this._selectionStartLeftIndex];
              this._selectionWidth =
              ((!(this._gridColumnsPercentPositions[counterHorizontal + 1]
                      == undefined))
                      ? this._gridColumnsPercentPositions[counterHorizontal
                      + 1] : 100)
                      - this._gridColumnsPercentPositions[this._selectionStartLeftIndex];
            }

            this._selectionWidthOld = counterHorizontal;

            //echo("this._selectionWidth + \"%\" :" + this._selectionWidth + "%");
            this._drawSelectionRectangle(this._selectionLeft,
                    this._selectionTop,
                    this._selectionWidth,
                    this._selectionHeight);

          };break;
          case rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_LOWER:{

            //echo("We're in right mode");
            // Do not redraw rectangle if it height in increments hasn't changed

            selection.left = this._gridColumnsPercentPositions[0];
            selection.width =
            ((!(this._gridColumnsPercentPositions[counterHorizontal + 1]
                    == undefined))
                    ? this._gridColumnsPercentPositions[counterHorizontal + 1]
                    : 100)
                    - this._gridColumnsPercentPositions[0];

            this._selectionWidthOld = counterHorizontal;

            this._drawSelectionRectangle(selection.left, selection.top,
                    selection.width, selection.height);

          };break;
          case rflect.cal.Main.Modes.SELECTION_RECTANGLES_MULTIPLE_UPPER:{

            selection.left =
            this._gridColumnsPercentPositions[counterHorizontal];
            selection.width = 100
                    - this._gridColumnsPercentPositions[counterHorizontal];

            this._selectionWidthOld = counterHorizontal;

            this._drawSelectionRectangle(selection.left, selection.top,
                    selection.width, selection.height);

          };break;
        }
      }

        //}
      // Remember this state
      this._counterVerticalOld = counterVertical;
      counterVerticalIsChanged = false;

      this._selection = selection;

    }

    if (this._eventDivIsClicked) {

      // Calculate position where it was clicked in order
      // to determine offset
      do{
        counterHorizontal++;
      }
      while ((!(this._gridColumnsPixelPositions[counterHorizontal] == null))
              &&
             (offsetX
                     > this._gridColumnsPixelPositions[counterHorizontal]));
            //TODO: Store readied for use coordinates of grid
      if (counterHorizontal > 0) counterHorizontal--;

      do{
        counterVertical++;
      }
      while ((!(this._gridRowsPixelPositionsShifted[counterVertical] == null))
              &&
             (offsetY
                     > this._gridRowsPixelPositionsShifted[counterVertical]));
      if (counterVertical > 0) counterVertical--;

      // If either rectangleTop changed or rectangleLeft changed
      // we should redraw rectangle
      if ((this._rectangleLeftIndexOld != counterHorizontal
              || this._rectangleTopIndexOld != counterVertical)) {

        if (!this._minimalPositionsSet) {
          this._setToMinimalCapacities();
          this._minimalPositionsSet = true;
        }

        this._updateGhost(
                counterHorizontal - this._rectangleLeftIndexOld,
                counterVertical - this._rectangleTopIndexOld);

        // Signalize that we move rectangle
        this._eventDivIsMoved = true;

        // Save new values
        this._rectangleLeftIndexOld = counterHorizontal;
        this._rectangleTopIndexOld = counterVertical;

        /*echo("counterHorizontal: " + counterHorizontal);
     //echo("counterVertical: " + counterVertical);*/

      }
    }

    aEvent.preventDefault();

  }



});