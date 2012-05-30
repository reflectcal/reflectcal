goog.provide("rflect.debug.events.Event");

goog.require("rflect.debug.structs.HashMap");
goog.require("rflect.Root");
goog.require("goog.object");

rflect.debug.events.Event = rflect.Root.__create({})
        .__assoc({
  MOUSE_BUTTON_LEFT: 1,
  MOUSE_BUTTON_MIDDLE: 2,
  MOUSE_BUTTON_RIGHT: 3,
  NAME_CONTAINS_TYPE: 1,
  NAME_CONTAINS_CLASS: 2,
  NAME_CONTAINS_ID: 4,
  _listenersCollection: new rflect.debug.structs.HashMap(),
  bind: function Event_bind(aElement, aEventType, aMethod, aObject, aUseCapture) {
    var eventListener = {};
    var eventHandler = function eventHandler(aEvent) {
      //return Base.callback(aMethod, aObject,)
      // TODO: add here single fix control
      return aMethod.call(aObject,
              rflect.debug.events.Event.fix(aEvent));
    }
    var eventNameParts = this._parseEventParts(aEventType);
    // Standart DOM
    if ("addEventListener" in window) {
      aElement.addEventListener(eventNameParts["type"], eventHandler, aUseCapture);
    } // Internet Explorer DOM
    else if ("attachEvent" in window) {
      aElement.attachEvent("on" + eventNameParts["type"], eventHandler);
    }
    eventListener["element"] = aElement;
    eventListener["type"] = eventNameParts["type"];
    eventListener["id"] = eventNameParts["id"];
    eventListener["class"] = eventNameParts["class"];
    eventListener["handler"] = eventHandler;
    eventListener["useCapture"] = aUseCapture;
    // TODO: Check if id exists and if it does - throw error or remove previous
    this._listenersCollection.put(eventNameParts["id"], eventListener);
    return eventListener;
  },
  bindArgs: function Event_bind(aElement, aEventType, aMethod, aObject, aUseCapture, aArgs) {

    var eventListener = {};
    var eventHandler = function eventHandler(aEvent) {
      //return Base.callback(aMethod, aObject,)
      // TODO: add here single fix control
      return aMethod.apply(aObject,
              [rflect.debug.events.Event.fix(aEvent)].concat(aArgs));
    }
    var eventNameParts = this._parseEventParts(aEventType);
    // Standart DOM
    if ("addEventListener" in window) {
      aElement.addEventListener(eventNameParts["type"], eventHandler, aUseCapture);
    } // Internet Explorer DOM
    else if ("attachEvent" in window) {
      aElement.attachEvent("on" + eventNameParts["type"], eventHandler);
    }
    eventListener["element"] = aElement;
    eventListener["type"] = eventNameParts["type"];
    eventListener["id"] = eventNameParts["id"];
    eventListener["class"] = eventNameParts["class"];
    eventListener["handler"] = eventHandler;
    eventListener["useCapture"] = aUseCapture;
    // TODO: Check if id exists and if it does - throw error or remove previous
    this._listenersCollection.put(eventNameParts["id"], eventListener);
    return eventListener;
  },
  /*_registerEvent: function Event__registerEvent(eventID, eventListener) {
    this._listenersCollection.put(eventNameParts["id"], eventListener);
  },
  _deregisterEvent: function Event__deregisterEvent() {

  },*/
  /*
  * Event fix based on jquery
  * */
  fix: function Event_fix(event) {
    // store a copy of the original event object
    // and clone to set read-only properties
    var originalEvent = event;
    event = goog.object.clone(originalEvent);

      // add preventDefault and stopPropagation since
    // they will not work on the clone
    event.preventDefault = function Event_preventDefault() {
      // TODO: preventDefault doesn't work
      // Run static preventDefault method
      rflect.debug.events.Event.preventDefault(originalEvent);
    };
    event.stopPropagation = function Event_stopPropagation() {
      // Run static stopPropagation method
      rflect.debug.events.Event.stopPropagation(originalEvent);
    };
    // Fix target property, if necessary
    if (!("target" in event))
      event.target = ("srcElement" in event) ? event["srcElement"] : document; // Fixes #1925 where srcElement might not be defined either
    // check if target is a textnode (safari)
    if (event.target.nodeType == 3)
      event.target = originalEvent.target.parentNode;

      // Add relatedTarget, if necessary
    if (!("relatedTarget" in event) && ("fromElement" in event))
      event.relatedTarget = event.fromElement == ("target" in event) ? event.toElement : event.fromElement;

      // Calculate pageX/Y if missing and clientX/Y available
    if (!("pageX" in event) && ("clientX" in event)) {
      event.pageX = rflect.debug.events.Event.getPageX(event);
      event.pageY = rflect.debug.events.Event.getPageY(event);
    }

    // Calculate clientX/Y if missing and pageX/Y available
    if (!("clientX" in event) && (("pageX" in event))) {
      event.clientX = rflect.debug.events.Event.getClientX(event);
      event.clientY = rflect.debug.events.Event.getClientY(event);
    }

    // Button for key events
    // TODO: look more carefully what difference is between keyCode and charCode
    if (!("keyCode" in event) && ("charCode" in event)) {
      event.keyCode = event["charCode"];
    }

    // Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
    if (!("metaKey" in event) && ("ctrlKey" in event))
      event.metaKey = event.ctrlKey;

      // Button for click: 1 == left; 2 == middle; 3 == right
    // Note: button is not normalized, so don't use it

    if ("button" in event)
      event.button = rflect.debug.events.Event.getButton(event);

    if (!("which" in event) && ("button" in event))
      event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

    return event;

  },
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
  addListener: function Event_addListener(aElement, aEventType,
                                          aEventHandler,
                                          aUseCapture) {
    var eventListener = {};
    var eventHandler = function eventHandler(aEvent) {
      // TODO: add here single fix control
      return aEventHandler.call(this,
              rflect.debug.events.Event.fix(aEvent));
    }
    var eventNameParts = this._parseEventParts(aEventType);
    // Standart DOM
    if ("addEventListener" in window) {
      aElement.addEventListener(eventNameParts["type"], eventHandler, aUseCapture);
    } // Internet Explorer DOM
    else if ("attachEvent" in window) {
      aElement.attachEvent("on" + eventNameParts["type"], eventHandler);
    }
    eventListener["element"] = aElement;
    eventListener["type"] = eventNameParts["type"];
    eventListener["id"] = eventNameParts["id"];
    eventListener["class"] = eventNameParts["class"];
    eventListener["handler"] = eventHandler;
    eventListener["useCapture"] = aUseCapture;
    //this._registerEvent(eventListener);
    this._listenersCollection.put(eventNameParts["id"], eventListener);
    return eventListener;
  },
  removeListener: function Event_removeEventListener() {
    var element = null;
    var eventType = "";
    var eventID = "";
    var eventClass = "";
    var eventHandler = null;
    var useCapture = undefined;
    var eventListener = null;
    // Overload function to allow it to take
    // event listener arguments
    if (!(arguments.length == 1)) {
      element = arguments[0];
      eventType = arguments[1];
      eventHandler = arguments[2];
      useCapture = arguments[3];
    } else {
      // or single handler
      eventListener = arguments[0];
      element = eventListener["element"];
      eventType = eventListener["type"];
      eventID = eventListener["id"];
      eventClass = eventListener["class"];
      eventHandler = eventListener["handler"];
      useCapture = eventListener["useCapture"];
    }
    if ("removeEventListener" in window) {
      element.removeEventListener(eventType, eventHandler, useCapture)
    } else if ("detachEvent" in window) {
      element.detachEvent("on" + eventType, eventHandler);
    }
    this._listenersCollection.remove(eventID);
  },
  unbind: function Event_unbind() {
    return this.removeListener.apply(rflect.debug.events.Event, arguments);
  },
  unloadEvents: function Event_unloadEvents() {
    for (var counter = 0, listenersLength = this._listenersCollection.length;
         counter < listenersLength; ++counter) {
      rflect.debug.events.Event.removeEventListener(this._listenersCollection[counter]);
    }
  },
  getBodyClientLeft: function getBodyClientLeft() {
    // Standard mode uses document.documentElement.clientLeft
    // Quirks mode uses document.body.clientLeft
    return document.documentElement.clientLeft || document.body.clientLeft;
  },
  getBodyClientTop: function getBodyClientTop() {
    // Standards mode uses $doc.documentElement.clientTop
    // Quirks mode uses $doc.body.clientTop
    return document.documentElement.clientTop || document.body.clientTop;
  },
  getButton: function getButton(aEventObject) {
    // Translating buttons.
    // Left button == 0 || 1
    // Middle button == 2
    // Right button == 3
    var button = aEventObject.button;
    var buttonModified = (button & 1 ? 1 :
                          ( button & 2 ? 3 :
                            ( button & 4 ? 2 : 0 )
                                  )
            );
    if ((buttonModified == 0) || (buttonModified == 1)) {
      return this.MOUSE_BUTTON_LEFT;
    }
    if (buttonModified == 2) {
      return this.MOUSE_BUTTON_MIDDLE;
    }
    if (buttonModified == 3) {
      return this.MOUSE_BUTTON_RIGHT;
    }
  },
  getClientX: function Event_getClientX(aEventObject) {
    var x = 0;
    if ("clientX" in aEventObject) {
      // In case of IE
      x = aEventObject.clientX/* - Event.getBodyClientLeft()*/;
    } else if ("pageX" in aEventObject) {
      x = aEventObject.pageX - window.pageXOffset;
    }
    return x;
  },
  getClientY: function Event_getClientY(aEventObject) {
    var y = 0;
    if ("clientY" in aEventObject) {
      y = aEventObject.clientY /*- Event.getBodyClientTop()*/;
    } else if ("pageX" in aEventObject) {
      y = aEventObject.pageX - window.pageXOffset;
    }
    return y;
  },
  getKeyCode: function Event_getKeyCode(aEventObject) {
    return ("charCode" in aEventObject) ? event["charCode"]
            : (("keyCode" in aEventObject) ? event["keyCode"] : null);
  },
  getPageX: function Event_getPageX(aEventObject) {
    var x = 0;
    if ("pageX" in aEventObject) {
      x = aEventObject.pageX;
    } else if ("clientX" in aEventObject) {
      x = aEventObject.clientX + ((!(document.documentElement.scrollLeft == 0))
              ? document.documentElement.scrollLeft : document.body.scrollLeft)
              - 2;
    }
    return x;
  },
  getPageY: function Event_getPageY(aEventObject) {
    var y = 0;
    if ("pageY" in aEventObject) {
      y = aEventObject.pageY;
    } else if ("clientY" || aEventObject) {
      y = aEventObject.clientY + ((!(document.documentElement.scrollTop == 0))
              ? document.documentElement.scrollTop : document.body.scrollTop)
              - 2;
    }
    return y;
  },
  preventDefault: function Event_preventDefault(aEventObject) {
    // if preventDefault exists run it on the original event
    if ("preventDefault" in aEventObject) {
      aEventObject.preventDefault();
    } else if ("returnValue" in aEventObject) {
      // otherwise set the returnValue property of the original event to false (IE)
      aEventObject.returnValue = false;
    }
  },
  stopPropagation: function Event_stopPropagation(aEventObject) {
    // if stopPropagation exists run it on the original event
    if ("stopPropagation" in aEventObject) {
      aEventObject.stopPropagation();
    } else if ("cancelBubble" in aEventObject) {
      // otherwise set the cancelBubble property of the original event to true (IE)
      aEventObject.cancelBubble = true;
    }
  }
});