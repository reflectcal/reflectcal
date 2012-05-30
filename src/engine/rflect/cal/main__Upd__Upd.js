rflect.cal.Main.__fuse({

  _updateBlocksExpandedState: function Calendar__updateBlockExpandState() {

    var counter = 0;
    var length = 0;

    for (counter = 0,length = this._blocks.length; counter < length; ++counter) {
      //echo("this._blocks[" + counter + "].expanded: " + this._blocks[counter].expanded);
      if (this._blocks[counter].expanded) {
        this._blocksExpandedState = true;
        echo("this._blocksExpandedState: " + this._blocksExpandedState);
        return;
      }
    }
    this._blocksExpandedState = false;
    echo("this._blocksExpandedState: " + this._blocksExpandedState);

  },

  _updateScroll: function Calendar__updateScroll(aUpdate, aPageX, aPageY) {

    var START_X = 0x1;
    var START_Y = 0x2;
    var UPDATE_X = 0x4;
    var UPDATE_Y = 0x8;
    var STOP_X = 0x10;
    var STOP_Y = 0x20;

    // Whether we are above upperLimit
    var above = false;
    // Whether we are below lowerLimit
    var below = false;

    var scrollOps = this._scrollOptions;

    if ((aUpdate & UPDATE_X) != 0) {

      above = (aPageX > scrollOps.box.right);
      below = (aPageX < scrollOps.box.left);

      /*echo("this._autoscrX.isOnLimit(): " + this._autoscrX.isOnLimit());
      echo("this._autoscrX.isOnUpperLimit(): " + this._autoscrX.isOnUpperLimit());
      echo("this._autoscrX.isOnLowerLimit(): " + this._autoscrX.isOnLowerLimit());
      */

      if (!above && !below) {
        if (scrollOps.xInProgress) {
          this._autoscrX.stop();
        }
      } else if (above) {
        if (!this._autoscrX.isOnUpperLimit()) {
          this._autoscrX.start(1, scrollOps.offset.x, scrollOps.offset.y);
        }
        ;
      } else if (below) {
        if (!this._autoscrX.isOnLowerLimit()) {
          this._autoscrX.start(-1, scrollOps.offset.x, scrollOps.offset.y);
        }

      }

    }

    if ((aUpdate & UPDATE_Y) != 0) {

      above = (aPageY > scrollOps.box.bottom);
      below = (aPageY < scrollOps.box.top);

      /*echo("this._autoscrY.isOnLimit(): " + this._autoscrY.isOnLimit());
      echo("this._autoscrY.isOnUpperLimit(): " + this._autoscrY.isOnUpperLimit());
      echo("this._autoscrY.isOnLowerLimit(): " + this._autoscrY.isOnLowerLimit());
      */

      if (!above && !below) {
        if (scrollOps.yInProgress) {
          this._autoscrY.stop();
        }
      } else if (above) {
        if (!this._autoscrY.isOnUpperLimit()) {
          this._autoscrY.start(1, scrollOps.offset.x, scrollOps.offset.y);
        }
        ;
      } else if (below) {
        if (!this._autoscrY.isOnLowerLimit()) {
          this._autoscrY.start(-1, scrollOps.offset.x, scrollOps.offset.y);
        }
        ;
      }


    }
    ;

    if ((aUpdate & STOP_X) != 0) {
      if (scrollOps.xInProgress) {
        this._autoscrX.stop();
      }
    }
    ;

    if ((aUpdate & STOP_Y) != 0) {
      if (scrollOps.yInProgress) {
        this._autoscrY.stop();
      }
    }
    ;

    this._scrollOptions = scrollOps;

  },

  _updateScrollState: function Calendar__updateScrollState() {

    var viewOptions = this.viewOptions;

    var scrollOptions = this._scrollOptions;

    this._updateBlocksExpandedState();

    switch (viewOptions.displayType) {
      case rflect.cal.Main.Modes.DISPLAY_TYPE_DAY: {
        scrollOptions.xEnabled = this._blocksExpandedState;
      };break;
      case rflect.cal.Main.Modes.DISPLAY_TYPE_MONTH: {
        scrollOptions.yEnabled = this._blocksExpandedState;
      };break;
      default: break;
    }


    this._scrollOptions = scrollOptions;

  },

  _updateCalendarEventsCollection: function Calendar__updateCalendarEventCollection() {

    // Intervals
    var intervalUpdate = this._intervals.update;
    var gaps = this._intervals.gaps;
    var intervalVisible = this._intervals.visible;
    var calendarEventsCollection = this._calendarEventsCollection;

    var event = null;
    var hashID = "";

    var counter = 0;
    var length = 0;

    var type = "";
    var updateOfType = null;

    var data = null;

    var updateIsNeeded = false;

    var atLeastOneBlockExpanded = this._blocksExpandedState;
    var affectedBlocksIndexes = null;

    this._resetBlocks();
    affectedBlocksIndexes = this._affectedBlocksIndexes = {};

    inspect("_affectedBlocksIndexes", affectedBlocksIndexes);

    for (counter = 0,length = calendarEventsCollection.length; counter < length; ++counter) {
      if ((event =
           calendarEventsCollection[counter]).overlaps(intervalVisible)) {
        this._addCalendarEventToBlocks(event, atLeastOneBlockExpanded);
      }
    }
    if (atLeastOneBlockExpanded) {
      for (counter = 0; counter < this._blocks.length; ++counter) {
        if (!(counter in affectedBlocksIndexes)) {
          this._blocks[counter].updateCapacity();
        }
      }
    }

    function onCompletionAsync(request) {

      var response = null;
      var status = "";
      var reason = "";

      var intervalVisible = null;
      var events = null;

      try {
        response = goog.json.parse(request.responseText);
      } catch(ex) {
        onFailure();
        return;
      }

      inspect("_response", response);

      status = response[0]["status"];
      reason = response[0]["reason"];

      if (status == "success") {

        events = response[0].events;

        intervalVisible = this._intervals.visible;

        for (counter = 0,length = events.length; counter < length; ++counter) {

          event = new rflect.cal.CalendarEvent(events[counter]);
          calendarEventsCollection.push(event);

          if (this._eventIDs == undefined) {
            this._eventIDs = {};
          }

          if (event.getID() in this._eventIDs) {
            echo("duplicated event: " + event.getID(), 1);
          } else {
            this._eventIDs[event.getID()] = true;
          }

          // Cache event properties
          event.cacheProperties(0x23F, 0x8, 0x237);
          event.cachedMode = true;

          //echo("intervalVisible: " + intervalVisible);
          //echo("event.overlaps(intervalVisible): " + event.overlaps(intervalVisible));

          if (event.overlaps(intervalVisible)) {
            this._addCalendarEventToBlocks(event);
          }

        }

      } else {
        /*onFailure();
        switch (responseReason) {
          case rflect.cal.Main.Actions.RESPONSE_EVENT_ALREADY_EXISTS: {

            // TODO: There must be message event already exists
          }
        }*/
      }

    }

    function onFailure() {

      echo("update failure");

      if (gaps == null) {
        gaps = [];
      }

      // There wasn't update in this intervals,
      //  so turn them into gaps
      for (type in intervalUpdate) {
        updateOfType = intervalUpdate[type]
        for (counter = 0,length = updateOfType.length;
             counter < length; ++counter) {
          gaps.push({
            type: type,
            interval: updateOfType[counter]
          });

          inspect("_gaps", gaps);

          this._intervals.gaps = gaps;

        }
      }
    }

    updateIsNeeded = (intervalUpdate.biArc.length > 0)
            || (intervalUpdate.leftArc.length > 0)
            || (intervalUpdate.rightArc.length > 0);

    if (updateIsNeeded) {

      data = {
        userID: "alex komov",
        sessionID: "129348104",
        action: rflect.cal.Main.Actions.ACTION_GET_EVENT_COLLECTION,
        intervals: goog.json.serialize(intervalUpdate)
      };

      rflect.XMLHTTP.request({

        onCompletion: onCompletionAsync,
        onFailure: onFailure,
        url: rflect.cal.Main.APP_PATH_EVENTS,
        contentType: rflect.mime.URLENCODED,
        data: data,
        boundObject: this

      });
    }

    this._checkPendingJobs();

    inspect("_calendarEventsCollection", this._calendarEventsCollection);

  },

  _updateGhost: function Calendar__createCalendarEventGhost(
          aDiffHor, aDiffVert) {

    var ghostStartDateTime = this._drag.startDateTime;
    var ghostEndDateTime = this._drag.endDateTime;
    var dragType = this._drag.type;
    var items = null;
    // var sign = aDifference > 0 ? 1 : -1;
    var calendarEventGhost = null;
    var horIncrement = this._horizontalTimeIncrement;
    var vertIncrement = this._verticalTimeIncrement;

    var counter = 0;
    var length = 0;

   //echo("aStartDateTime: " + aStartDateTime.toString());
    //echo("aEndDatetime: " + aEndDateTime.toString());
    //echo("aIncrement.type: " + aIncrement.type);
    //echo("aIncrement.number: " + aIncrement.number);

    if (this._drag.ghost == null) {

      calendarEventGhost = this._drag.ghost
              = this._calendarEventsCollection
              [this._drag.index].clone();

      inspect("_calendarEventGhost", calendarEventGhost);

      /*this._showCalendarEventItems(this._calendarEventsCollection
              [this._draggedID], false, true);
      */
      // Collapse all here

    } else {
      calendarEventGhost = this._drag.ghost;
    }

    // Horizontal increment is always days
    if (dragType == rflect.cal.Main.DRAG_WHOLE) {
      ghostStartDateTime.addDays(
              horIncrement.number * aDiffHor);
      // Vertical increment is either days or minutes
      switch (vertIncrement.type) {
        case rflect.cal.Main.Durations.DAYS:{
          ghostStartDateTime.addDays(
                  vertIncrement.number * aDiffVert);
        };break;
        case rflect.cal.Main.Durations.MINUTES:{
          ghostStartDateTime.addMinutes(
                  vertIncrement.number * aDiffVert);
        };break;
        default:break;
      }
      ;

      calendarEventGhost.setStart(ghostStartDateTime);

    }

    ghostEndDateTime.addDays(
            horIncrement.number * aDiffHor);

    // Vertical increment is either days or minutes
    switch (vertIncrement.type) {
      case rflect.cal.Main.Durations.DAYS:{
        ghostEndDateTime.addDays(
                vertIncrement.number * aDiffVert);

      };break;
      case rflect.cal.Main.Durations.MINUTES:{
        ghostEndDateTime.addMinutes(
                vertIncrement.number * aDiffVert);

      };break;
      default:break;
    }


    if ((dragType == rflect.cal.Main.DRAG_WHOLE)
            ? true
            : (ghostStartDateTime.compare(ghostEndDateTime) == -1)) {

      // Cloning is needed because ghostEndDateTime may become lesser
      //  than ghostStartDateTime after it was set as event end
      calendarEventGhost.setEnd(ghostEndDateTime.clone());

      // Cache ghost properties
      calendarEventGhost.cacheProperties(0x23F, 0x8, 0x237);
      calendarEventGhost.cachedMode = true;

      items = this._tgrid.getItemsForCalendarEvent(calendarEventGhost);

      for (counter = 0,length = this._blocks.length;
           counter < length; ++counter) {
        if (counter in items) {

          this._blocks[counter].updateGhost(items[counter]);

        } else {

          this._blocks[counter].updateGhost(null);

        }
      }

      this._drag.startDateTime = ghostStartDateTime;
      this._drag.endDateTime = ghostEndDateTime;

    }

    inspect("_ghostStartDateTime", ghostStartDateTime);
    inspect("_ghostEndDateTime", ghostEndDateTime);

  }

});