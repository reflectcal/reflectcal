goog.provide("rflect.cal.Block");
goog.provide("rflect.cal.BlockHorizontal");
goog.provide("rflect.cal.BlockVertical");

goog.require("rflect.Root");
goog.require("goog.object");
goog.require("goog.dom");
goog.require("goog.Throttle");
goog.require("goog.string.StringBuffer");
goog.require("goog.events.EventTarget");
goog.require("rflect.cal.CalendarEvent");

rflect.cal.Block =
rflect.Root.__create(function Block_Constructor(aBlockOptions) {

  var blockOptions = {
    timegrid: null,
    throttleInterval: 50,
    boundElement: null,
    capacity: 0,
    minimalCapacity: 0,
    index: -1
  };

  goog.object.extend(blockOptions, aBlockOptions);

  this._throttleIntvl = blockOptions.throttleInterval;
  this._timegrid = blockOptions.timegrid;

  this.boundElement = goog.dom.$(blockOptions.boundElement);
  this.capacity = blockOptions.capacity;
  this.minimalCapacity = blockOptions.minimalCapacity;
  this.index = blockOptions.index;

  // Relayout throttle
  this._relayoutThrottle = new goog.Throttle(this.relayout,
          this._throttleIntvl, this);
  /*this._relayoutThrottle = new goog.Throttle(function() {
    if (this.index == 0) {
      perf("relayout", 1);
      this.relayout();
      perf("relayout", 1);
    }
  }, this._throttleIntvl, this);*/

  this._items = [];
  this._blobs = [];

}).__fuse({

  // Indicates if block is in expanded mode
  expanded: false,
  capacity: 0,
  minimalCapacity: 0,
  boundElement: null,

  _potentialCapacity: 0,

  index: -1,

  _items: null,
  _itemsLength: 0,

  _blobs: null,
  _relayoutThrottle: null,
  _throttleIntvl: 0,
  _timegrid: null,
  _blobsType: 0,

  _startMin: 0 * 60,
  _endMin: 24 * 60,

  _relayoutMode: 0,

  _ghostEnabled: false,

  _ghostAttached: false,
  _ghostVisible: false,

  _ghost: null,

  addItem: function Block_addItem(aItem) {

    //this._items.push(aItem);
    this._items[this._itemsLength++] = aItem;

    this._relayoutThrottle.fire();

  },

  attachGhost: function Block_attachGhost(aAttach) {
    if (this._ghost != null && this._ghostAttached != aAttach) {
      if (this._ghostAttached = aAttach)
        this.boundElement.appendChild(this._ghost);
      else
        this.boundElement.removeChild(this._ghost);
    }
  },

  reset: function Block_reset() {

    //this._relayoutThrottle.dispose();
    this._relayoutThrottle.cancel();

    this._items.length = this._itemsLength = 0;
    this._blobs.length = 0;

    this.boundElement.innerHTML = "";

    this._ghostAttached = false;

    this._potentialCapacity = this.minimalCapacity;

  },

  computeEventMap: function Block_computeEventMap() {

    /* We're going to create a series of 'blobs'.  A blob is a series of
    * events that create a continuous block of busy time.  In other
    * words, a blob ends when there is some time such that no events
    * occupy that time.
    *
    * Each blob will be an array of objects with the following properties:
    *    item:     the event/task
    *    startCol: the starting column to display the event in (0-indexed)
    *    colSpan:  the number of columns the item spans
    *
    * An item with no conflicts will have startCol: 0 and colSpan: 1.
    */

    var i = 0;
    var length = 0;
    var blobs = [];
    var currentBlob = [];
    var sort = null;

    var startCol = 0;
    var maxCol = 0;

    sort = this._sort;

    //dump("\n this._items before sort: " + objectToString(this._items, 2));

    //this._items.sort(sortByStart);
    this._items.sort(sort);

    //dump("\n this._items after sort: " + objectToString(this._items, 2));

    // The end time of the last ending event in the entire blob
    var latestItemEnd;

    // This array keeps track of the last (latest ending) item in each of
    // the columns of the current blob. We could reconstruct this data at
    // any time by looking at the items in the blob, but that would hurt
    // perf.
    var colEndArray = new Array();

    /* Go through a 3 step process to try and place each item.
    * Step 1: Look for an existing column with room for the item.
    * Step 2: Look for a previously placed item that can be shrunk in
    *         width to make room for the item.
    * Step 3: Give up and create a new column for the item.
    *
    * (The steps are explained in more detail as we come to them)
    */

    for (i = 0,length = this._items.length; i < length; ++i) {
      //var item = this._items[i].event;
      //var itemStart = item.startDate || item.entryDate;
      //var itemEnd = item.endDate || item.dueDate;

      var item = this._items[i];
      var itemStart = item["startTimeInBlock"];
      var itemEnd = item["endTimeInBlock"];

      if (!latestItemEnd) {
        latestItemEnd = itemEnd;
      }
      if (currentBlob.length && latestItemEnd &&
        //itemStart.compare(latestItemEnd) != -1) {
          (itemStart >= latestItemEnd)) {
        // We're done with this current blob because item starts
        // after the last event in the current blob ended.
        blobs.push({blob: currentBlob, totalCols: colEndArray.length});

        // Reset our variables
        currentBlob = new Array();
        colEndArray = new Array();
      }

      // Place the item in its correct place in the blob
      var placedItem = false;

      // Step 1
      // Look for a possible column in the blob that has been left open. This
      // would happen if we already have multiple columns but some of
      // the cols have events before latestItemEnd.  For instance
      //       |      |      |
      //       |______|      |
      //       |ev1   |______|
      //       |      |ev2   |
      //       |______|      |
      //       |      |      |
      //       |OPEN! |      |<--Our item's start time might be here
      //       |      |______|
      //       |      |      |
      //
      // Remember that any time we're starting a new blob, colEndArray
      // will be empty, but that's ok.
      for (var ii = 0; ii < colEndArray.length; ++ii) {

        // var colEnd = colEndArray[ii].endDate || colEndArray[ii].dueDate;
        var colEnd = colEndArray[ii]["endTimeInBlock"];

        if (colEnd <= itemStart) {
          // Yay, we can jump into this column
          colEndArray[ii] = item;

                        // Check and see if there are any adjacent columns we can
          // jump into as well.
          var lastCol = Number(ii) + 1;
          while (lastCol < colEndArray.length) {
            //var nextColEnd = colEndArray[lastCol].endDate ||
            //                 colEndArray[lastCol].dueDate;
            var nextColEnd = colEndArray[lastCol]["endTimeInBlock"];

            // If the next column's item ends after we start, we
            // can't expand any further
            //if (nextColEnd.compare(itemStart) == 1) {

            if (nextColEnd > itemStart) {

              break;
            }
            colEndArray[lastCol] = item;
            lastCol++;
          }

            // Now construct the info we need to push into the blob
          currentBlob.push({item: item,
            startCol: ii,
            colSpan: lastCol - ii});

          if (ii > maxCol)
            maxCol = ii;

            // Update latestItemEnd
          //if (latestItemEnd &&
          //    itemEnd.compare(latestItemEnd) == 1) {
          if (latestItemEnd &&
              (itemEnd > latestItemEnd)) {


            latestItemEnd = itemEnd;
          }
          placedItem = true;
          break; // Stop iterating through colEndArray
        }
      }

      if (placedItem) {
        // Go get the next item
        continue;
      }

      // Step 2
      // OK, all columns (if there are any) overlap us.  Look if the
      // last item in any of the last items in those columns is taking
      // up 2 or more cols. If so, shrink it and stick the item in the
      // created space. For instance
      //       |______|______|______|
      //       |ev1   |ev3   |ev4   |
      //       |      |      |      |
      //       |      |______|      |
      //       |      |      |______|
      //       |      |_____________|
      //       |      |ev2          |
      //       |______|             |<--If our item's start time is
      //       |      |_____________|   here, we can shrink ev2 and jump
      //       |      |      |      |   in column #3
      //
      for (var jj = 1; jj < colEndArray.length; ++jj) {
        //      if (colEndArray[jj].hashId == colEndArray[jj - 1].hashId) {
        if (colEndArray[jj]["hashID"] == colEndArray[jj - 1]["hashID"]) {
          // Good we found a item that spanned multiple columns.
          // Find it in the blob so we can modify its properties
          for (var kk in currentBlob) {
            //          if (currentBlob[kk].item.hashId == colEndArray[jj].hashId) {
            if (currentBlob[kk].item["hashID"] == colEndArray[jj]["hashID"]) {
              // Take all but the first spot that the item spanned
              var spanOfShrunkItem = currentBlob[kk].colSpan;
              currentBlob.push({item: item,
                startCol: startCol = Number(currentBlob[kk].startCol) + 1,
                colSpan: spanOfShrunkItem - 1});

              if (startCol > maxCol)
                maxCol = startCol;

                // Update colEndArray
              for (var ll = jj; ll < jj + spanOfShrunkItem - 1; ll++) {
                colEndArray[ll] = item;
              }

                // Modify the data on the old item
              currentBlob[kk] = {item: currentBlob[kk].item,
                startCol: startCol = currentBlob[kk].startCol,
                colSpan: 1};

              if (startCol > maxCol)
                maxCol = startCol;

                // Update latestItemEnd
              //if (latestItemEnd &&
              //    itemEnd.compare(latestItemEnd) == 1) {
              if (latestItemEnd &&
                  (itemEnd > latestItemEnd)) {
                latestItemEnd = itemEnd;
              }
              break; // Stop iterating through currentBlob
            }
          }
          placedItem = true;
          break; // Stop iterating through colEndArray
        }
      }

      if (placedItem) {
        // Go get the next item
        continue;
      }

      // Step 3
      // Guess what? We still haven't placed the item.  We need to
      // create a new column for it.

      // All the items in the last column, except for the one* that
      // conflicts with the item we're trying to place, need to have
      // their span extended by 1, since we're adding the new column
      //
      // * Note that there can only be one, because we sorted our
      //   events by start time, so this event must start later than
      //   the start of any possible conflicts.
      var lastColNum = colEndArray.length;
      for (var mm in currentBlob) {
        //var mmEnd = currentBlob[mm].item.endDate || currentBlob[mm].item.dueDate
        var mmEnd = currentBlob[mm].item["endTimeInBlock"];
        //if (currentBlob[mm].startCol + currentBlob[mm].colSpan == lastColNum &&
        //    mmEnd.compare(itemStart) != 1) {
        if (currentBlob[mm].startCol + currentBlob[mm].colSpan == lastColNum
                && (mmEnd <= itemStart)) {
          currentBlob[mm] = {item: currentBlob[mm].item,
            startCol: startCol = currentBlob[mm].startCol,
            colSpan: currentBlob[mm].colSpan + 1};

          if (startCol > maxCol)
            maxCol = startCol;
        }
      }
      currentBlob.push({item: item,
        startCol: startCol = colEndArray.length,
        colSpan: 1});

      if (startCol > maxCol)
        maxCol = startCol;

      colEndArray.push(item);

      // Update latestItemEnd
      //if (latestItemEnd && itemEnd.compare(latestItemEnd) == 1) {
      if (latestItemEnd && (itemEnd > latestItemEnd)) {
        latestItemEnd = itemEnd;
      }
                // Go get the next item
    }
            // Add the last blob
    blobs.push({blob: currentBlob,
      totalCols: colEndArray.length});

    //dump("blobs: " + objectToString(blobs, 5));

    this._potentialCapacity = maxCol + 1;

    return blobs;
  },

  deleteItem: function Block_deleteItem(aEventHashID) {
    if (this._internalDeleteItem(aEventHashID)) {

      this._relayoutThrottle.fire();

    }
  },

  dispose: function Block_dispose() {

    if (!this.getDisposed()) {
      goog.events.EventTarget.prototype.dispose.call(this);
      this._throttleIntvl.dispose();
      this.boundElement = null;
    }

  },

  getCapacity: function Block_getCapacity() {
    return this.capacity;
  },

  getPotentialCapacity: function Block_getPotentialCapacity() {
    return this._potentialCapacity;
  },

  setCapacity: function Block_setCapacity(aCapacity) {
    if (this.capacity != aCapacity)
      this.capacity = aCapacity;
  },

  showGhost: function Block_showGhost(aShow, aSet) {
    var set = aSet == undefined ? true : aSet;
    if (this._ghost != null && this._ghostVisible != aShow) {
      if (set)
        goog.style.showElement(this._ghost, aShow);
      this._ghostVisible = aShow;
    }
  },

  relayout: function Block__relayout() {

    this._blobs = this.computeEventMap();

    this.updateCapacity();

    this._relayout();

  },

  updateCapacity: function Block_updateCapacity() {

    var oldCapacity = 0;
    var newCapacity = 0;

    if (this.expanded) {

      oldCapacity = this.capacity;

      if (this._potentialCapacity <= this.minimalCapacity) {
        newCapacity = this.minimalCapacity;
        this.expanded = false;
      } else {
        newCapacity = this._potentialCapacity;
      }

      if (!(oldCapacity == newCapacity)) {

        this.capacity = newCapacity;

        this.dispatchEvent({

          type: "capacityChange",
          index: this.index,
          oldCapacity: oldCapacity,
          newCapacity: newCapacity

        });

      }

    }

  },

  updateGhost: goog.abstractMethod,

  _createGhost: function Block__createGhost() {

    var styleObject = {};

    this._ghost = goog.dom.$dom("div"/*, {id: "backuplasso"}*/);

    styleObject["position"] = "absolute";
    styleObject["zIndex"] = "10";
    styleObject["backgroundColor"] = "rgb(100, 250, 204)";

    goog.style.setStyle(this._ghost, styleObject);
    goog.style.setOpacity(this._ghost, 0.7);

  },

  _internalDeleteItem: function Block__internalDeleteItem(aEventHashID) {

    var itemIndex = -1;
    var counter = 0;
    var length = 0;
    var occ = "";

    for (counter = 0,length = this._items.length;
         counter < length; ++counter) {
      occ = this._items[counter]["eventHashID"];
      if (occ == aEventHashID) {
        itemIndex = counter;
        break;
      }
    }

    if (itemIndex != -1) {
      this._items.splice(itemIndex, 1);
      this._itemsLength--;
      return true;
    } else {
      return false;
    }

  },

  _sort: goog.abstractMethod,

  _relayout: goog.abstractMethod


}).__assoc({
  DISPLAY_TYPE_DAY: 1,
  DISPLAY_TYPE_MONTH: 2,

  ELEMENT_EVENT_ID_PART_1: "elemEvent",
  ELEMENT_EVENT_ID_PART_2: "Item",

  EVENT_RECTANGLE_EXPAND_NONE : 0,
  EVENT_RECTANGLE_EXPAND_LEFT : 1,
  EVENT_RECTANGLE_EXPAND_RIGHT : 2,
  EVENT_RECTANGLE_EXPAND_BOTH : 3
}).__fuse(new goog.events.EventTarget());

rflect.cal.BlockVertical =
rflect.cal.Block.__create(function TimeGrid_Constructor(aBlockOptions) {

  var blockOptions = {
    blockHeight: 0
  };

  goog.object.extend(blockOptions, aBlockOptions);

  this._pixelPerMin = blockOptions.blockHeight / this._endMin;

  this.__creator.call(this, aBlockOptions);

}).__fuse({

  _pixelPerMin: 0,

  updateGhost: function BlockHorizontal_updateGhost(aItem) {

    var pixelPerMin = this._pixelPerMin;

    var styleObject = {};

    if (aItem == null) {

      this.showGhost(false);

    } else {

      if (this._ghost == null)
        this._createGhost();
      this.attachGhost(true);
      this.showGhost(true, false);

      styleObject["display"] = "";
      styleObject["left"] = 0 + "%";
      styleObject["width"] = 100 + "%";

      styleObject["top"]
              = aItem["startTimeInBlock"] * pixelPerMin
              + "px";
      styleObject["height"]
              = (aItem["endTimeInBlock"] - aItem["startTimeInBlock"])
              * pixelPerMin
              + "px";


      goog.style.setStyle(this._ghost, styleObject);

    }

  },

  _sort: function Block_sortByStart(a, b) {

    // If you pass in tasks without both entry and due dates, I will
    // kill you
    //var aStart = a.event.startDate || a.event.entryDate;
    //var bStart = b.event.startDate || b.event.entryDate;
    var aStart = a["startTimeInBlock"];
    var bStart = b["startTimeInBlock"];
    var diff = 0;

    //var startComparison = aStart.compare(bStart);
    var startComparison = (diff = (aStart - bStart )) > 0
            ? 1
            : (diff < 0 ? -1 : 0) ;

    if (startComparison != 0) {
      return startComparison;
    } else {
      //var aEnd = a.event.endDate || a.event.dueDate;
      //var bEnd = b.event.endDate || b.event.dueDate;
      var aEnd = a["endTimeInBlock"];
      var bEnd = b["endTimeInBlock"];

      // If the items start at the same time, return the longer one
      // first
      return (diff = (bEnd - aEnd )) > 0
              ? 1
              : (diff < 0 ? -1 : 0);
    }
  },

  _relayout: function Block_relayout() {

    //echo("relayout");

    var ghost = false;

    var elemID = "";
    var left = 0;
    var width = 0;
    var top = 0;
    var height = 0;

    var calendarEventHours = 0;
    var calendarEventMinutes = 0;
    var timeLabelClasses = "";
    var visibilityStyleString = "";
    var zIndex = 0;
    var calendarEventID = 0;
    var name = 0;

      //var capacity = 0;

    var sb = null;
    var blobs = null;

    var counterBlobs = 0;
    var lengthBlobs = 0;
    var counterItems = 0;
    var lengthItems = 0;

    var currentBlob = null;
    var currentItem = null;
    var startCol = 0;
    var colSpan = 0;

    var minWidth = 0;
    var minHeight = 21;

    var pixelPerMin = this._pixelPerMin;

    var orientClass1 = "";
    var orientClass2 = "";

    //Templates

    // Base
    var t1 = "<div id=\"";
    var t2 = "\" style=\"";
    var t3 = "left: ";
    var t4 = "; width: ";
    var t5 = "; top: ";
    var t6 = "; height: ";
    var t7 = "; z-index: ";

    // Daymode event rectangle template
    var dt1 = "cursor: pointer; position: absolute; left: ";
    var dt2 = ";\" class=\"chip eventRectangle\">";
    var dt3 = "<div class=\"t1\" style=\"background-color: rgb(27, 136, 122);\">&nbsp;</div><div class=\"t2\" style=\"background-color: rgb(27, 136, 122);\">&nbsp;</div><div style=\"background-color: rgb(89, 191, 179);\" class=\"chipbody edit\"><dl style=\"border-left-color: rgb(27, 136, 122); border-bottom-color: rgb(27, 136, 122); border-top-color: rgb(27, 136, 122); border-right-color: rgb(27, 136, 122); height: ";
    var dt4 = ";\"><dt style=\"background-color: rgb(27, 136, 122);\"><span class=\"timelabel ";
    var dt5 = "\">";
    var dt6 = "</span></dt><dd><div><span style=\"display: ";
    var dt7 = ";\">";
    var dt8 = "</span></div><dd class=\"resize\"></dd></dl></div><div style=\"border-left-color: rgb(27, 136, 122); border-bottom-color: rgb(27, 136, 122); border-top-color: rgb(27, 136, 122); background-color: rgb(27, 136, 122); border-right-color: rgb(27, 136, 122)\" class=\"b2\">&nbsp;</div><div style=\"background-color: rgb(27, 136, 122);\" class=\"b1\">&nbsp;</div></div>";

      // Monthmode event rectangle template 1
    var m1t1 = "; cursor: pointer; color: rgb(163, 41, 41);\" class=\"month_event eventRectangle\">";
    var m1t2 = "<em class=\"time\">";
    var m1t3 = "</em><span class=\"event_title\"><span style=\"cursor: pointer; text-decoration: none;\">";
    var m1t4 = "</span></span></div>";

    // Monthmode event rectangle template 2
    var m2t1 = "\" class=\"adc eventRectangle\">";
    var m2t2 = "<div style=\"background-color: rgb(217, 102, 102);\" class=\"t3\">&nbsp;</div><div style=\"background-color: rgb(217, 102, 102);\" class=\"";
    var m2t3 = "\"><div style=\"padding-bottom: 1px;\" class=\"";
    var m2t4 = "\"><nobr style=\"cursor: pointer; text-decoration: none;\">";
    var m2t5 = "</nobr></div></div><div style=\"background-color: rgb(217, 102, 102);\" class=\"t3\">&nbsp;</div></div>";

      // Inner form remplate
    var f1 = "<form action=\"\" style=\"display: none\"><input name=\"id\" type=\"hidden\" value=\"";
    var f2 = "\"/></form>";

    var defaultName = rflect.cal.CalendarEvent.DEFAULT_NONAME_STRING;

    // TODO: Use alternate technique if Firefox which combines innerHTML and DOM methods
    zIndex = ghost
            ? 2
            : 0;

      // Initializing string buffer
    sb = new goog.string.StringBuffer();

    blobs = this._blobs;

    for (counterBlobs = 0,lengthBlobs = blobs.length;
         counterBlobs < lengthBlobs; ++counterBlobs) {

      currentBlob = blobs[counterBlobs].blob;

      minWidth = 100 / blobs[counterBlobs].totalCols;

      for (counterItems = 0,lengthItems = currentBlob.length;
           counterItems < lengthItems; ++counterItems) {

        currentItem = currentBlob[counterItems].item;
        startCol = currentBlob[counterItems].startCol;
        colSpan = currentBlob[counterItems].colSpan;

        name = currentItem.name || defaultName;
        calendarEventID = currentItem.eventHashID;

        elemID = rflect.cal.Block.ELEMENT_EVENT_ID_PART_1
                + calendarEventID
                + rflect.cal.Block.ELEMENT_EVENT_ID_PART_2
                + currentItem.hashID;

        left = startCol * minWidth;
        width = colSpan * minWidth;

        top = currentItem["startTimeInBlock"] * pixelPerMin;
        height =
        (currentItem["endTimeInBlock"] - currentItem["startTimeInBlock"])
                * pixelPerMin;

        calendarEventHours = currentItem.startHour;
        calendarEventMinutes = currentItem.startMinute;

        if (calendarEventHours < 10)
          calendarEventHours = "0" + calendarEventHours;
        if (calendarEventMinutes < 10)
          calendarEventMinutes = "0" + calendarEventMinutes;

            //echo("eventRectangleMode: " + rectangleMode);
        timeLabelClasses = "";

        /*if (!((currentItem.expandMode & rflect.cal.Block.EVENT_RECTANGLE_EXPAND_LEFT) == 0)) {
          timeLabelClasses += "moreleft";
          orientClass1 = "moreleft";
        } else {
          orientClass1 = "noleft";
        }
        ;

        if (!((currentItem.expandMode & rflect.cal.Block.EVENT_RECTANGLE_EXPAND_RIGHT) == 0)) {
          timeLabelClasses += "moreright";
          orientClass2 = "moreright";
        } else {
          orientClass2 = "";
        }
        ;*/

        sb.append(
                t1,
                elemID,
                t2,
                visibilityStyleString,
                dt1,
                left,
                "%",
                t4,
                width,
                "%",
                t5,
                top,
                "px",
                t7,
                zIndex,
                dt2,
                f1,
                calendarEventID,
                f2,
                dt3,
                height,
                "px",
                dt4,
                timeLabelClasses,
                dt5,
                calendarEventHours,
                ":",
                calendarEventMinutes,
                dt6,
                (height >= minHeight)
                        ? "block"
                        : "none",
                dt7,
                name,
                dt8
                );

      }

    }

    this.boundElement.innerHTML = sb.toString();
    this._ghostAttached = false;

    this.dispatchEvent({type: "relayoutEnd"});

  }


}).
        __assoc({
  DISPLAY_TYPE_DAY: 1,
  DISPLAY_TYPE_MONTH: 2
});

rflect.cal.BlockHorizontal =
rflect.cal.Block.__create(function TimeGrid_Constructor(aBlockOptions) {

  this.__creator.call(this, aBlockOptions);

  // Relayout throttle
  this._relayoutThrottleAux = new goog.Throttle(this._relayout,
          this._throttleIntvl, this);

}).__fuse({

  _relayoutThrottleAux: null,

  dispose: function BlockHorizontal_changeCapacity() {

    if (!this.getDisposed()) {
      this.__creator.prototype.dispose.call(this);
      this._relayoutThrottleAux.dispose();
    }

  },

  setCapacity: function BlockHorizontal_changeCapacity(aCapacity) {

    if (this.capacity != aCapacity) {

      this.__creator.prototype.setCapacity.call(this, aCapacity);

      // Drawing
      this._relayoutThrottleAux.fire();

    }

  },

  updateGhost: function BlockHorizontal_updateGhost(aItem) {

    var elemID = "";

    var calendarEventID = 0;
    var currentItem = null;

    var percentPerMin = 100 / 10080;

    var styleObject = {};

    if (aItem == null) {

      this.showGhost(false);

    } else {

      if (this._ghost == null)
        this._createGhost();
      this.attachGhost(true);
      this.showGhost(true, false);

      styleObject["display"] = "";
      styleObject["top"] = 0 + "%";
      styleObject["height"] = 100 + "%";

      styleObject["left"] = aItem["startTimeInBlock"] * percentPerMin
              + "%";
      styleObject["width"] = (aItem["endTimeInBlock"]
              - aItem["startTimeInBlock"])
              * percentPerMin
              + "%";

      goog.style.setStyle(this._ghost, styleObject);
    }

  },

  _sort: function Block_sortByStartAndType(a, b) {

    // If you pass in tasks without both entry and due dates, I will
    // kill you
    //var aStart = a.event.startDate || a.event.entryDate;
    //var bStart = b.event.startDate || b.event.entryDate;
    var aStart = a["startTimeInBlock"];
    var bStart = b["startTimeInBlock"];
    var aType = 0;
    var bType = 0;
    var diff = 0;

    //var startComparison = aStart.compare(bStart);
    var startComparison = (diff = (aStart - bStart )) > 0
            ? 1
            : (diff < 0 ? -1 : 0) ;
    var lengthComparison = 0;
    var typeComparison = 0;

    if (startComparison != 0) {
      return startComparison;
    } else {

      //var aEnd = a.event.endDate || a.event.dueDate;
      //var bEnd = b.event.endDate || b.event.dueDate;
      var aEnd = a["endTimeInBlock"];
      var bEnd = b["endTimeInBlock"];

      // If the items start at the same time, return the longer one
      // first
      lengthComparison = (diff = (bEnd - aEnd )) > 0
              ? 1
              : (diff < 0 ? -1 : 0);

      if (lengthComparison != 0) {
        return lengthComparison;
      } else {
        aType = a["nestType"];
        bType = b["nestType"];
        typeComparison = (diff = (aType - bType )) > 0
                ? 1
                : (diff < 0 ? -1 : 0);

        if (typeComparison != 0) {
          return typeComparison;
        } else {

          if (aType == 2) {

            aStart = a["startTimeInDay"];
            bStart = b["startTimeInDay"];
            return (diff = (aStart - bStart )) > 0
                    ? 1
                    : (diff < 0 ? -1 : 0);

          } else {
            return 0;
          }

        }

      }

    }
  },

  _relayout: function Block_relayout() {

    var ghost = false;

    var elemID = "";
    var left = 0;
    var width = 0;
    var top = 0;
    var height = 0;

    var calendarEventHours = 0;
    var calendarEventMinutes = 0;
    var timeLabelClasses = "";
    var visibilityStyleString = "";
    var zIndex = 0;
    var calendarEventID = 0;
    var name = 0;

    var capacity = 0;

    var sb = null;
    var blobs = null;

    var counterBlobs = 0;
    var lengthBlobs = 0;
    var counterItems = 0;
    var lengthItems = 0;

    var currentBlob = null;
    var currentItem = null;
    var startCol = 0;

    var minHeight = 0;

    var percentPerMin = 100 / 10080;

    var orientClass1 = "";
    var orientClass2 = "";

      //Templates

    // Base
    var t1 = "<div id=\"";
    var t2 = "\" style=\"";
    var t3 = "left: ";
    var t4 = "; width: ";
    var t5 = "; top: ";
    var t6 = "; height: ";
    var t7 = "; z-index: ";

      // Monthmode event rectangle template 1
    /*var m1t1 = "; cursor: pointer; color: rgb(163, 41, 41);\" class=\"month_event eventRectangle\">";
    var m1t2 = "<em class=\"time\">";
    var m1t3 = "</em><span class=\"event_title\"><span style=\"cursor: pointer; text-decoration: none;\">";
    var m1t4 = "</span></span></div>";
    */

    var m1t1 = "; cursor: pointer; color: rgb(163, 41, 41);\" class=\"month_event eventRectangle\">";
    var m1t2 = "<span class=\"event_title\"><span style=\"cursor: pointer; text-decoration: none;\">";
    var m1t3 = "</span></span></div>";

      // Monthmode event rectangle template 2
    var m2t1 = "\" class=\"adc eventRectangle\">";
    var m2t2 = "<div style=\"background-color: rgb(217, 102, 102);\" class=\"t3\">&nbsp;</div><div style=\"background-color: rgb(217, 102, 102);\" class=\"";
    var m2t3 = "\"><div style=\"padding-bottom: 1px;\" class=\"";
    var m2t4 = "\"><nobr style=\"cursor: pointer; text-decoration: none;\">";
    var m2t5 = "</nobr></div></div><div style=\"background-color: rgb(217, 102, 102);\" class=\"t3\">&nbsp;</div></div>";

      // Inner form remplate
    var f1 = "<form action=\"\" style=\"display: none\"><input name=\"id\" type=\"hidden\" value=\"";
    var f2 = "\"/></form>";

    var defaultName = rflect.cal.CalendarEvent.DEFAULT_NONAME_STRING;

      // TODO: Use alternate technique if Firefox which combines innerHTML and DOM methods

    zIndex = ghost
            ? 2
            : 0;

    capacity = this.capacity;
    blobs = this._blobs;

      // Initializing string buffer
    sb = new goog.string.StringBuffer();

    for (counterBlobs = 0,lengthBlobs = blobs.length;
         counterBlobs < lengthBlobs; ++counterBlobs) {

      currentBlob = blobs[counterBlobs].blob;
      inspect("_currentBlob", currentBlob);

      minHeight =
      rflect.cal.Main.MINIMAL_CALENDAR_EVENT_HEIGHT_IN_PIXEL;

      for (counterItems = 0,lengthItems = currentBlob.length;
           counterItems < lengthItems; ++counterItems) {

        startCol = currentBlob[counterItems].startCol;

        if (startCol >= capacity) {
          // If item position exceeds
          //  capacity, skip current item
          continue;
        }

        currentItem = currentBlob[counterItems].item;

        inspect("_currentItem", currentItem);

        name = currentItem.name || defaultName;
        calendarEventID = currentItem.eventHashID;

        elemID = rflect.cal.Block.ELEMENT_EVENT_ID_PART_1
                + calendarEventID
                + rflect.cal.Block.ELEMENT_EVENT_ID_PART_2
                + currentItem.hashID;

        top = startCol * minHeight;
        height = minHeight;

        left = currentItem["startTimeInBlock"] * percentPerMin;
        width =
        (currentItem["endTimeInBlock"] - currentItem["startTimeInBlock"])
                * percentPerMin;

        calendarEventHours = currentItem.startHour;
        calendarEventMinutes = currentItem.startMinute;

        if (calendarEventHours < 10)
          calendarEventHours = "0" + calendarEventHours;
        if (calendarEventMinutes < 10)
          calendarEventMinutes = "0" + calendarEventMinutes;

            //echo("eventRectangleMode: " + rectangleMode);
        timeLabelClasses = "";

        /*if (!((currentItem.expandMode & rflect.cal.Block.EVENT_RECTANGLE_EXPAND_LEFT) == 0)) {
          timeLabelClasses += "moreleft";
          orientClass1 = "moreleft";
        } else {
          orientClass1 = "noleft";
        }
        ;

        if (!((currentItem.expandMode & rflect.cal.Block.EVENT_RECTANGLE_EXPAND_RIGHT) == 0)) {
          timeLabelClasses += "moreright";
          orientClass2 = "moreright";
        } else {
          orientClass2 = "";
        }
        ;*/

        if (currentItem["nestType"] == 2) {

          // Special case when calendar event has duration less than
          // one day and do not cross limits of the day
          sb.append(
                  t1,
                  elemID,
                  t2,
                  visibilityStyleString,
                  t3,
                  left,
                  "%",
                  t4,
                  width,
                  "%",
                  t5,
                  top,
                  "px",
                  t6,
                  height,
                  "px",
                  m1t1,

                  f1,
                  calendarEventID,
                  f2,

                  m1t2,
                  calendarEventHours,
                  ":",
                  calendarEventMinutes,
                  " ",
                  name,
                  m1t3
                  );

        } else if (currentItem["nestType"] == 1) {

          sb.append(
                  t1,
                  elemID,
                  t2,
                  visibilityStyleString,
                  t3,
                  left,
                  "%",
                  t4,
                  width,
                  "%",
                  t5,
                  top,
                  "px",
                  t7,
                  zIndex,
                  m2t1,

                  f1,
                  calendarEventID,
                  f2,

                  m2t2,
                  orientClass1,
                  m2t3,
                  orientClass2,
                  m2t4,
                  calendarEventHours,
                  ":",
                  calendarEventMinutes,
                  " ",
                  name,
                  m2t5
                  );


        }

      }

    }

     //echo("sb.toString(): " + sb.toString());
    this.boundElement.innerHTML = sb.toString();
    this._ghostAttached = false;

    this.dispatchEvent({type: "relayoutEnd"});
  }


  /* _sort: function sortByStartAndType(a, b) {

    // If you pass in tasks without both entry and due dates, I will
    // kill you
    //var aStart = a.event.startDate || a.event.entryDate;
    //var bStart = b.event.startDate || b.event.entryDate;
    var aStart = 0;
    var bStart = 0;
    var aType = 0;
    var bType = 0;
    var startComparison = 0;
    var typeComparison = 0;
    var aEnd = 0;
    var bEnd = 0;
    var diff = 0;

    //var startComparison = aStart.compare(bStart);

    aType = a["nestType"];
    bType = b["nestType"];
    typeComparison = (diff = (aType - bType )) > 0
            ? 1
            : (diff < 0 ? -1 : 0);

    if (!(typeComparison == 0)) {

      return typeComparison;

    } else {

      if (aType == 1) {
        // OVERLAPING_CELL items are sorted by start and length

        aStart = a["startTimeInBlock"];
        bStart = b["startTimeInBlock"];
        startComparison = (diff = (aStart - bStart )) > 0
                ? 1
                : (diff < 0 ? -1 : 0);

        if (!(startComparison == 0)) {

          return startComparison;

        } else {
          //var aEnd = a.event.endDate || a.event.dueDate;
          //var bEnd = b.event.endDate || b.event.dueDate;
          aEnd = a["endTimeInBlock"];
          bEnd = b["endTimeInBlock"];

            // If the items start at the same time, return the longer one
          // first
          return (diff = (bEnd - aEnd)) > 0
                  ? 1
                  : (diff < 0 ? -1 : 0);
        }
      } else if (aType == 2) {
        // IN_CELL type items are sorted by start and length

        aStart = a["startTimeInDay"];
        bStart = b["startTimeInDay"];
        startComparison = (diff = (aStart - bStart )) > 0
                ? 1
                : (diff < 0 ? -1 : 0);

        if (!(startComparison == 0)) {

          return startComparison;

        } else {
          //var aEnd = a.event.endDate || a.event.dueDate;
          //var bEnd = b.event.endDate || b.event.dueDate;
          aEnd = a["endTimeInDay"];
          bEnd = b["endTimeInDay"];

          // If the items start at the same time, return the longer one
          // first
          return (diff = (bEnd - aEnd)) > 0
                  ? 1
                  : (diff < 0 ? -1 : 0);
        }

      }

    }
  }*/

}).__assoc({
  DISPLAY_TYPE_DAY: 1,
  DISPLAY_TYPE_MONTH: 2
});