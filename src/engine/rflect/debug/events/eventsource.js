goog.provide("rflect.debug.events.EventSource");

goog.require("rflect.Root");
goog.require("rflect.debug.structs.HashMap");
goog.require("rflect.math");
goog.require("goog.array");

rflect.debug.events.EventSource = rflect.Root.__create({})
        .__assoc({
  ERROR_EVENT_SOURCE_INCOMPATIBLE_EVENT_TYPE: "This event source doesn't support this event type",
  eventTypes: {},
  _listenersCollection: null,
  _parseEventParts: function Event__parseEventParts(aEventTypeString) {
    var parts = {
      "type" : "",
      "id" : "",
      "class" : ""
    }
    var partsPresent = 0;
    var classIsPresent = (/\./).test(aEventTypeString);
    var idIsPresent = (/\#/).test(aEventTypeString);
    var matches = aEventTypeString.match(/\w+(?=.*)/);
    // Type is always present
    parts["type"] = matches[0];
    if (classIsPresent && idIsPresent) {
      parts["id"] = matches[1];
      parts["class"] = matches[2];
    } else if (idIsPresent) {
      parts["id"] = matches[1]
    } else if (classIsPresent) {
      parts["class"] = matches[1]
    }
    return parts;
  },
  _generateEventID: function EventSource_generateEventID() {
    var id = ""
    var tries = 0;
    var IDisAlreadyPresent = true;
    while (IDisAlreadyPresent) {
      id = rflect.math.generateRandom();
      this._listenersCollection.each(this, function iterator(aEventType, aEventsOfThisType) {
        if (aEventsOfThisType.hasKey(id)) {
          IDisAlreadyPresent = true;
          return rflect.debug.structs.HashMap.ITERATOR_BREAK;
        }
        IDisAlreadyPresent = false;
      });
      tries++;
    }
    return id;
  },
  //_parseEventType
  addListener: function EventSource_addListener(aEventType, aEventHandler) {
    var parts = this._parseEventParts(aEventType);
    var eventID = (parts["id"] == "") ? rflect.math.generateRandom() : parts["id"];
    var eventType = parts["type"];
    var eventClass = parts["class"];
    this._checkEventCompatibility(aEventType);
    this._addEventToCollection(aEventType, eventID, aEventHandler, this, []);
    return {eventID: eventID, eventType: eventType, eventClass: eventClass};
  },
  _checkEventCompatibility: function Event__checkEventCompatibility(aEventType) {
    if (!(aEventType in this.eventTypes)) {
      throw new Error(this.ERROR_EVENT_SOURCE_INCOMPATIBLE_EVENT_TYPE);
    }
  },
  _addEventToCollection: function _addEventToCollection(aEventType, aEventID, aEventHandler, aObject, aAdditionalArgs) {
    if (this._listenersCollection == null) {
      this._listenersCollection = new rflect.debug.structs.HashMap();
    }
    if (!this._listenersCollection.hasKey(aEventType)) {
      this._listenersCollection.put(aEventType, new rflect.debug.structs.HashMap());
    }
    this._listenersCollection.getValue(aEventType).put(aEventID, {
      eventHandler: aEventHandler,
      eventObject: aObject,
      eventAdditionalArgs: aAdditionalArgs
    });

  },
  _removeEventFromCollection: function _removeEventFromCollection(eventType, eventID) {
    var removed = false;
    var eventsOfThisType = null;
    if (this._listenersCollection.hasKey(eventType)) {
      removed = (eventsOfThisType = this._listenersCollection.getValue(eventType)).remove(eventID);
      if (eventsOfThisType.isEmpty()) {
        this._listenersCollection.remove(eventType);
      }
      if (this._listenersCollection.isEmpty())
        this._listenersCollection = null;
      return removed;
    }
    return removed;
  },
  bindListener: function Event_bind(aEventType, aMethod, aObject) {
    var parts = this._parseEventParts(aEventType);
    var eventID = (parts["id"] == "") ? rflect.math.generateRandom() : parts["id"];
    var eventType = parts["type"];
    var eventClass = parts["class"];
    this._checkEventCompatibility(aEventType);
    this._addEventToCollection(aEventType, eventID, aMethod, aObject, []);
    return {eventID: eventID, eventType: eventType, eventClass: eventClass};
  },
  bindListenerArgs: function Event_bind(aEventType, aMethod, aObject, aArgs) {
    var args = goog.array.clone(arguments);
    var eventString = args.shift();
    var method = args.shift();
    var object = args.shift();
    var parts = this._parseEventParts(eventString);
    var eventID = (parts["id"] == "") ? rflect.math.generateRandom() : parts["id"];
    var eventType = parts["type"];
    var eventClass = parts["class"];
    //var eventHandler = Method.callbackArgs(method, object, args);
    this._checkEventCompatibility(aEventType);
    this._addEventToCollection(aEventType, eventID, aMethod, aObject, args);
    return {eventID: eventID, eventType: eventType, eventClass: eventClass};
  },
  removeListener: function EventSource_removeListener(aEventListener) {
    var eventID = aEventListener["eventID"];
    var eventType = aEventListener["eventType"];
    return this._removeEventFromCollection(eventType, eventID);
  },
  trigger: function EventSource_trigger(aEventType, aPassedArguments) {
    var args = goog.array.clone(arguments);
    var eventType = args.shift();
    var eventsOfThisType = null;
    var eventHandler = null;
    var eventObject = null;
    var eventAdditionalArgs = null;
    if (!(this._listenersCollection == null)) {
      if (this._listenersCollection.hasKey(eventType)) {
        eventsOfThisType = this._listenersCollection.getValue(eventType);
        eventsOfThisType.each(this, function iterator(aEventID, aEventListener) {
          eventHandler = aEventListener["eventHandler"];
          eventObject = aEventListener["eventObject"];
          eventAdditionalArgs = aEventListener["eventAdditionalArgs"];
        // TODO: use return value of eventHandlers
          eventHandler.apply(eventObject, args.concat(eventAdditionalArgs));
        })
      }
    }
  },
  unbind: function EventSource_unbind(aEventListener) {
    return this.removeListener.apply(this, arguments);
  }
})