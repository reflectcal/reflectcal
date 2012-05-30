rflect.cal.Main.__fuse({

  _onMouseOutDefault: function Calendar__onMouseOutDefault(aEvent) {

    // We are moving out of document
    // This is the same as mouseup on document
    if (aEvent.relatedTarget == undefined) {
      this._onMouseUpDefault(aEvent);
    }

  },

  _onMouseUpDefault: function Calendar__onMouseUpDefault(aEvent) {

    var viewOptions = this.viewOptions;

    var scrollOps = this._scrollOptions;

    var tmp = 0;
    var rightOrder = false;

    var x1 = this._selectionStartLeftIndex;
    var x2 = this._selectionEndLeftIndex;
    var y1 = this._selectionStartTopIndex;
    var y2 = this._selectionEndTopIndex;

    /*echo("mouseup on grid", 2);
    //echo("aEvent.relatedTarget: " + aEvent.relatedTarget, 2);*/

    // Stop autoscrolls
    if (this._draggingSelection || (this._eventDivIsClicked && this._eventDivIsMoved)) {
      if (scrollOps.xEnabled) {
        this._updateScroll(0x10);
      }
      ;
      if (scrollOps.yEnabled) {
        this._updateScroll(0x20);
      }
      ;
    }


    if (this._draggingSelection) {

      // Getting selection start and end datetime
      // First, we are checking if selection start indicates
      //  smaller datetime than selection end, or not

      // Note that cell-based grid we use in month mode
      //  has inverted coordinate loookup - we index (row, col),
      //  instead of (col, row), as we do in day mode
      switch (viewOptions.displayType) {
        case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
          // If selection start points to bigger datetime
          //  than selection end, swap selection start
          //  and selection end
          //  through temp variable
          rightOrder = (x1 < x2)
                  ? true
                  : ((x1 > x2)
                  ? false
                  : ((y1 <= y2)));
        }
          ;break;
        case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
          // If selection start points to bigger datetime
          //  than selection end, swap selection start
          //  and selection end
          //  through temp variable
          rightOrder = (y1 < y2)
                  ? true
                  : ((y1 > y2)
                  ? false
                  : ((x1 <= x2)));
        };break;
        default:break;
      }
      ;

      if (!rightOrder) {

        tmp = x1;
        x1 = x2;
        x2 = tmp;

        tmp = y1;
        y1 = y2;
        y2 = tmp;

      }
      // Now we can get start and end datetime
      this._selectionStartDateTime
              = this._tgrid.getTimeByIndexes(x1,
              y1,
              true);
      this._selectionEndDateTime
              = this._tgrid.getTimeByIndexes(x2,
              y2,
              false);


     //echo("this._selectionStartDateTime: " + this._selectionStartDateTime);
      //echo("this._selectionEndDateTime: " + this._selectionEndDateTime);

      this._createCalendarEventCreationBox(aEvent);

      this._prepareBlockGroups(x1, y1, x2, y2);

      // Change state to initial
      this._draggingSelection = false;

    }

    // Simple click on rectangle
    if (this._eventDivIsClicked && !this._eventDivIsMoved) {

      //echo("calendarEventID: " + this._draggedID);

      this._createCalendarEventChangeBox(this._drag.calEvent, aEvent);
      // Change state to initial
      this._eventDivIsClicked = false;

    }

    // Drag of the rectangle
    if (this._eventDivIsClicked && this._eventDivIsMoved) {


      if (this._minimalPositionsSet) {
        this._minimalPositionsSet = false;
        this._rollbackFromMinimalCapacities();
      }

      if (!this._changeCalendarEvent(
              this._drag.calEvent,
              this._drag.ghost,
              this._drag.index,
              true)) {

        this._hideGhost();

      }
      ;

      // Delete ghost
      this._drag.ghost = null;
      // Reset event time parameters
      this._drag.startDateTime = null;
      this._drag.endDateTime = null;

      this._eventDivIsClicked = false;
      this._eventDivIsMoved = false;

    }

  },

  _onResizeViewport: function Calendar__onResizeViewport(e) {

    var viewOptions = this.viewOptions;

    var viewportSize = null;
    var gridContainerHeight = 0;
    var staticHeight = 0;
    var modeDisplayType = 0;
    var rebuildType = 0;

    var dayMode = (viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_DAY);
    var monthMode = (viewOptions.displayType == rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH);

    rebuildType = dayMode ? 0x1 : (monthMode ? 0x1 : 0);

    // Change gridcontainer vertical size
    viewportSize = this._vsm.getSize();
    this._size.viewport = viewportSize;

    echo("viewport size changed, new size: " + viewportSize);
    //echo("rflect.cal.Main.MINIMAL_GRIDCONTAINER_HEIGHT: "
    //+ rflect.cal.Main.MINIMAL_GRIDCONTAINER_HEIGHT);

    // Collapsing blocks in day mode
    if (dayMode) {

      this._grid.style["width"] = 100 + "%";

    }

    this._formSizes(viewportSize, true);

    // Recalculate event greed
    //this._calculateEventGrid(false);
    this._calculateEventGrid(rebuildType);

    // Form cell block elements only if we need resize
    //this._formCellBlockElements();

    // Recalculate event blocks in daymode
    this._formBlocks(0x8);
    this._formGridControl(true);

    if (dayMode) {
      this._rollbackFromMinimalCapacities();
    }

  },

  _prepareBlockGroups: function Calendar__prepareBlockGroups(aX1, aY1, aX2, aY2) {

    var viewOptions = this.viewOptions;

    var index = 0;
    var first = 0;
    var last = 0;
    var block = null;

    var capacity = 0;
    var potentialCapacity = 0;
    var minimalCapacity = 0;

    var blockListExpand = [];
    var blockListCollapse = [];

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY:{
        first = aX1;
        last = aX2;
        minimalCapacity = rflect.cal.Main.MINIMAL_CAPACITY_DAY_MODE;
      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH:{
        first = aY1;
        last = aY2;
        minimalCapacity = this._minimalCapacity;
      };break;
      default:break;
    }
    ;

    echo("first: " + first);
    echo("last: " + last);

    for (index = first; index <= last; index++) {

      block = this._blocks[index];
      capacity = block.getCapacity();
      potentialCapacity = this._blocks[index].getPotentialCapacity();

      if (!block.expanded
              && (capacity < potentialCapacity)
              && (potentialCapacity > minimalCapacity)) {
        blockListExpand.push(index);
      }

      if (block.expanded) {
        blockListCollapse.push(index);
      }

    }

    this._blockListExpand = blockListExpand;
    this._blockListCollapse = blockListCollapse;

    this._calendarEventCreationBox.setBlockOptions({
      expand: blockListExpand,
      collapse: blockListCollapse
    });

    inspect("_blockListExpand", blockListExpand);
    inspect("_blockListCollapse", blockListCollapse);
    inspect("_blockListExpand", blockListExpand);
    inspect("_blockListCollapse", blockListCollapse);

  }

});