rflect.cal.Main.__fuse({

  _createCalendarEvent: function Calendar__createCalendarEvent(
          aCalendarEventOptions) {

    var calendarEventOptions = {
      startDateTime: null,
      endDateTime: null,
      name: "",
      type: 0,
      byControl: false
    };

    var calEvent = null;
    var visible = false;

    var counter = 0;
    var length = 0;
    var index = 0;

    var calendarEventsCollection = this._calendarEventsCollection;

    var itemID = "";
    var item = null;
    var itemIndex = "";

    var elemID = "";
    var elem = null;

    var calendarEventsItems = this._calendarEventsItems;
    //var newCalendarEventsCollection = {};

    var data = null;

    goog.object.extend(calendarEventOptions, aCalendarEventOptions);

    // Creating new calendar event
    calEvent = new rflect.cal.CalendarEvent(calendarEventOptions);

    // Cache event properties
    calEvent.cacheProperties(0x23F, 0x8, 0x237);
    calEvent.cachedMode = true;

    //newCalendarEventInterval = newCalendarEvent.getInterval();

    // Add calendar event into local event collection
    this._calendarEventsCollection.push(calEvent);

    // Put eventID to pendingEventsCollection.forAdd to show that it has not
    // been approved to server yet
    this._pendingCalendarEventsCollection.forAdd[calEvent.hashID] = calEvent;

    // Add calendar event to server
    data = {
      action: rflect.cal.Main.Actions.ACTION_ADD_EVENT,
      userID: "alex komov",
      sessionID: "129348104",
      event: calEvent.toJSONString(),
      creationMethod: rflect.cal.Main.Events.POINT
    };

    // Check whether event crosses visible interval
    visible = calendarEventOptions.byControl
            ? true
            : calEvent.overlaps(this._intervals.visible);

    if (visible) {

      echo("added : " + calEvent.hashID);
      this._addCalendarEventToBlocks(calEvent, true);
      this._checkPendingJobs();

    }

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

      inspect("_response", response);

      status = response[0]["status"];
      reason = response[0]["reason"];

      if (status == "success") {

        // Set database id
        calEvent.setID(response[0]["responseEventID"]);

        // On successful response, delete hashID from pending collection
        delete this._pendingCalendarEventsCollection.forAdd[calEvent.hashID];

        // If element is transparent, make it opaque
        // NOTE: we use non-immediate opacity set, too,
        //  because theoretically resonse may come
        //  before relayout
        this._setCalendarEventItemsOpacity(calEvent, 1, 0x4);

      } else {

        onFailure();

      }

    }

    function onFailure() {

      var hashID = calEvent.hashID;

      // Handle situation when event wasn't saved
      //echo("failure");
      // TODO: Show some message box
      // TODO: Do something with drawn item
      // Delete calendar event from local event collection
      for (counter = 0,length = calendarEventsCollection.length;
           counter < length; ++counter) {
        if (calendarEventsCollection[counter].hashID == hashID) {
          index = counter;
          break;
        }
      }
      ;

      this._calendarEventsCollection.splice(index, 1);

      // Delete eventID from pendingEventsCollection.forAdd
      delete this._pendingCalendarEventsCollection.forAdd[calEvent.hashID];

    }

    rflect.XMLHTTP.request({

      onCompletion: onCompletionAsync,
      onFailure: onFailure,
      url: rflect.cal.Main.APP_PATH_EVENTS,
      contentType: rflect.mime.URLENCODED,
      data: data,
      boundObject: this

    });

    inspect("_calendarEventsCollection", this._calendarEventsCollection);
    inspect("_pendingCalendarEventsCollection", this._pendingCalendarEventsCollection);

    return calEvent;

  },

  _createCalendarEventByControl: function Calendar__createCalendarEventByControl(
          aEvent) {

    //echo("submit dispatched");
    var newCalendarEventName = "";
    var calendarEventStartDateTime = null;
    var calendarEventEndDateTime = null;

    calendarEventStartDateTime = this._selectionStartDateTime;
    calendarEventEndDateTime = this._selectionEndDateTime;
    newCalendarEventName = aEvent.target.getInputName();

    // Hide selection rectangle
    this._hideSelectionRectangles();
    // Hide popup
    aEvent.target.show(false);

   //echo("calendarEventStartDateTime: " + calendarEventStartDateTime, 3);
    //echo("calendarEventEndDateTime: " + calendarEventEndDateTime, 3);

    this._createCalendarEvent({
      startDateTime: calendarEventStartDateTime,
      endDateTime: calendarEventEndDateTime,
      name: newCalendarEventName,
      byControl: true
    });

  },

  _createCalendarEventCreationBox: function Calendar__createCalendarEventCreationBox(
          aEvent) {

    this._changeSelectionRectanglesState();

    if (this._calendarEventCreationBox == null) {

      this._calendarEventCreationBox = new rflect.cal.InfoTipCreating({
        panel: this._mainBody
      });

      this.listen(this._calendarEventCreationBox, "submit", this._createCalendarEventByControl);
      this.listen(this._calendarEventCreationBox, "mousedown", function() {
        this._mousedownOnCreationBox = true;
      });
      this.listen(this._calendarEventCreationBox, "commandChangeCapacity", function(aEvent) {

        switch (aEvent.linkType) {

          case rflect.cal.InfoTipCreating.LINK_EXPAND: {
            if (aEvent.command) {
              this._expandBlock.apply(this, this._blockListExpand);
            } else {
              this._collapseBlock.apply(this, this._blockListExpand)
            }
          };break;
          case rflect.cal.InfoTipCreating.LINK_COLLAPSE: {
            if (aEvent.command) {
              this._collapseBlock.apply(this, this._blockListCollapse);
            } else {
              this._expandBlock.apply(this, this._blockListCollapse)
            }
          };break;
          default: break;

        }

      });

    }

    this._calendarEventCreationBox.setDateTime(
            this._selectionStartDateTime,
            this._selectionEndDateTime
            );
    this._calendarEventCreationBox.pointTo(aEvent);

    inspect("_calendarEventCreationBox", this._calendarEventCreationBox);

  },

  _createCalendarEventChangeBox: function Calendar__createCalendarEventChangeBox(
          aCalEvent, aEvent) {

    if (this._calendarEventChangeBox == null) {

      this._calendarEventChangeBox = new rflect.cal.InfoTipChanging({
        panel: this._mainBody
      });

      this.listen(this._calendarEventChangeBox, "submit",
              this._changeCalendarEventByControl);
      this.listen(this._calendarEventChangeBox, "clickDeleteLink",
              this._deleteCalendarEventByControl);
      this.listen(this._calendarEventChangeBox, "mousedown", function() {
        this._mousedownOnChangeBox = true;
      });

    }

    this._calendarEventChangeBox.setCalendarEvent(aCalEvent);
    this._calendarEventChangeBox.pointTo(aEvent);

  },

  _deleteCalendarEventByControl: function Calendar__removeCalendarEvent(
          aEvent) {

    var L = rflect.loc.cal.Main;

    var calEvent = this._drag.calEvent;

    if (confirm(L("Are you surely want to delete event \"%s\"?",
            calEvent.name || rflect.cal.CalendarEvent.DEFAULT_NONAME_STRING)))
      this._deleteCalendarEvent(calEvent.hashID, true);

    aEvent.target.show(false);

  },

  _deleteCalendarEventFromBlocks: function Calendar__addCalendarEvent(
          aCalendarEvent) {

    var items = null;

    items = this._calendarEventsItems[aCalendarEvent.hashID];

    for (var itemIndex in items) {

      this._blocks[itemIndex].deleteItem(aCalendarEvent.hashID);

    }

    delete this._calendarEventsItems[aCalendarEvent.hashID];

  },

  _deleteCalendarEvent: function Calendar__removeCalendarevent(aCalEventIDs, aOptByControl) {

    var counter = 0;

    var byControl = aOptByControl == undefined ? false : aOptByControl;

    var intervalVisible = this._intervals.visible;

    var visible = false;
    var atLeastOneVisible = false;
    var nonEmptyRemoveCollection = false;
    var eventHashID = "";

    var removeCollection = [];

    var counter = 0;
    var length = 0;
    var index = 0;

    var calEvent = null;
    var eventIDs = {};
    var eventIDsNumber = 0;

    var calendarEventsCollection = this._calendarEventsCollection;

    // Forming hashIDs
    if (goog.typeOf(aCalEventIDs) == "array") {

      for (counter = 0,eventIDsNumber = aCalEventIDs.length;
           counter < eventIDsNumber;
           counter++)
        eventIDs[aCalEventIDs[counter].hashID] = true;

    } else {

      eventIDsNumber = 1;
      eventIDs[aCalEventIDs] = true;

    }

    // Deletion sequence
    for (counter = calendarEventsCollection.length - 1;
         counter >= 0; --counter) {
      if ((eventHashID = calendarEventsCollection[counter].hashID) in eventIDs) {

        // Delete calEvent from local collection, while putting them
        //  in pending collection
        this._pendingCalendarEventsCollection.forDelete[eventHashID] =
        (calEvent = calendarEventsCollection.splice(counter, 1)[0]);

        removeCollection.push(calEvent.getID());

        visible = byControl
                ? true
                : calEvent.overlaps(intervalVisible);

        if (visible) {
          if (!atLeastOneVisible) atLeastOneVisible = true;
          this._deleteCalendarEventFromBlocks(calEvent);
        }

        if (!nonEmptyRemoveCollection) nonEmptyRemoveCollection = true;

        // Decrease counter to signalize that we have processed this calEvent...
        eventIDsNumber--;
        // ... and if it is 0, quit.
        if (eventIDsNumber == 0)
          break;

      }
    }
    ;

    // Delete calendar calEvent from server
    var data = {
      action: rflect.cal.Main.Actions.ACTION_REMOVE_EVENT,
      userID: "alex komov",
      sessionID: "129348104",
      events: goog.json.serialize(removeCollection)
    }

    if (atLeastOneVisible) {

      this._checkPendingJobs();
      atLeastOneVisible = false;

    }

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

      inspect("_response", response);

      status = response[0]["status"];
      reason = response[0]["reason"];

      if (status == "success") {


        for (eventHashID in eventIDs) {

          // Delete calEvent from pending collection
          delete this._pendingCalendarEventsCollection.forDelete[eventHashID];

        }


      } else {

        onFailure();

      }

    }

    function onFailure() {

      for (eventHashID in eventIDs) {

        calendarEventsCollection.push(
                calEvent = this._pendingCalendarEventsCollection.forDelete[eventHashID]
                );

        delete this._pendingCalendarEventsCollection.forDelete[eventHashID];

        visible = calEvent.overlaps(intervalVisible);

        if (visible) {
          if (!atLeastOneVisible) atLeastOneVisible = true;
          this._addCalendarEventToBlocks(calEvent);
        }

      }

      if (atLeastOneVisible) {

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

    this._calendarEventsCollection = calendarEventsCollection;

    inspect("_visibleRemoveCollection", removeCollection);

    return nonEmptyRemoveCollection;

  },

  _dispose: function Main__dispose() {

    var counter = 0;

    var disposablesList = [this._vsm,  this._hist];
    var disposablesWithEventsList = [this._calendarEventCreationBox,
      this._calendarEventChangeBox];

    function tryToDisposeAndNullify(aDisposable, aRemoveEvents) {
      var removeEvents = aRemoveEvents == undefined ? false : aRemoveEvents;
      if (goog.typeOf(aDisposable) == "object") {
        goog.dispose(aDisposable);
        if (removeEvents) {
          goog.events.removeAll(aDisposable);
        }
        aDisposable = null;
      }
      ;
    }
    ;

    if (!this.getDisposed()) {

      // Event handler part
      goog.events.EventHandler.prototype.dispose.call(this);

      // Special listeners
      // Mousemove listener
      goog.events.unlistenByKey(this._listeners["mousemove"]);

      // Autoscroll listener
      goog.events.unlistenByKey(this._listeners["autoscrollX"]);
      goog.events.unlistenByKey(this._listeners["autoscrollY"]);

      // Column headers listener
      goog.events.unlistenByKey(this._listeners["colHeaders"]);

      this._listeners = null;

      // Try to dispose modules
      for (counter = 0; counter < disposablesList.length; counter++) {
        tryToDisposeAndNullify(disposablesList[counter]);
      }

      // Dispose blocks
      this._disposeBlocks();

      // Dispose grid control
      this._disposeGridControl();

      this._calendarEventsCollection = null;
      this._calendarEventsItems = null;

      // Try to dispose modules with events
      for (counter = 0; counter < disposablesWithEventsList.length; counter++) {
        tryToDisposeAndNullify(disposablesWithEventsList[counter], true);
      }

    }
  },

  /*
  * Disposes relayoutEnd event from blocks between shifts and switches.
  * Should be called before new block formation.
  * */
  _disposeBlocksRelayoutEnd: function Main__disposeBlocksRelayoutEnd() {
    var counter = 0;
    for (counter = 0; counter < this._blocks.length; counter++) {
      goog.removeAll(this._blocks, "relayoutEnd");
    }
    ;
  },

  _disposeBlocks: function Main__disposeBlocks() {

    var counter = 0;

    for (counter = 0; counter < this._blocksVertical.length; counter++) {
      this._blocksVertical[counter].dispose();
    }
    ;
    for (counter = 0; counter < this._blocksHorizontal.length; counter++) {
      this._blocksHorizontal[counter].dispose();
    }
    ;

    this._blocksVertical = [];
    this._blocksHorizontal = [];

  },

  _disposeGridControl: function Main__disposeGridControl() {

    var gc = this._gridControl;

    if (gc == null) return;

    gc.dispose();

    this._gridControl = null;

  }
});
