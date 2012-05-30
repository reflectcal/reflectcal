goog.provide("rflect.Debug");

goog.require("rflect.Root");
goog.require("rflect.debug.drag.Drag");
goog.require("goog.events");
goog.require("goog.dom.classes");
goog.require("goog.style");
goog.require("goog.object");
goog.require("goog.dom");

rflect.Debug = rflect.Root.__create(function Debug_Constructor(aDebugOptions) {

  var headerInnerHTML = "";
  var titleID = "";
  var clearAllLinkID = "";
  var clearLastLinkID = "";
  var putTimestampLinkID = "";
  var closeLinkID = "";
  var IDIsPassed = false;


  this._id = Math.random();
  if (typeof aDebugOptions == "object") {
    if ("id" in aDebugOptions) {
      IDIsPassed = true;
      this._id = aDebugOptions["id"];
    }
  }

  titleID = "Debug" + this._id + "_header";
  clearAllLinkID = "Debug" + this._id + "_clearLink";
  clearLastLinkID = "Debug" + this._id + "_clearlastLink";
  putTimestampLinkID = "Debug" + this._id + "_putTimestampLink";
  closeLinkID = "Debug" + this._id + "_closeLink";

  this._header = document.createElement("div");
  this._title = null;
  this._loggerPart = document.createElement("div");
  this._container = goog.dom.$dom("div", {"id": "Debug" + this._id},
          this._header, this._loggerPart);

  goog.dom.classes.add(this._container, "debugContainerStyle");
  goog.style.setOpacity(this._container, 0.75);

  goog.dom.classes.add(this._header, "debugHeaderContainer", "draggableCursor");
  goog.dom.classes.add(this._loggerPart, "debugLogPart");
  goog.style.setOpacity(this._loggerPart, 0.75);
  goog.style.setStyle(this._loggerPart, "height", "200px");

  goog.object.extend(this._container, this._DebugImpl);

  headerInnerHTML = "<div><table width=\"100%\">";
  headerInnerHTML += "<tbody>";
  headerInnerHTML += "<tr>";
  headerInnerHTML += "<td id=\"" + titleID + "\">Header</td>";
  headerInnerHTML += "</tr><tr>";
  headerInnerHTML += "<td></td>";
  headerInnerHTML += "<td>";
  headerInnerHTML += "<table cellspacing=\"2\">";
  headerInnerHTML += "<tbody>";
  headerInnerHTML += "<tr>";
  headerInnerHTML += "<td><a id=\"" + clearAllLinkID + "\">clear all</a></td>";
  headerInnerHTML += "<td><a id=\"" + clearLastLinkID + "\">clear last</a></td>";
  headerInnerHTML += "<td><a id=\"" + putTimestampLinkID + "\">put timestamp</a></td>";
  headerInnerHTML += "<td><a id=\"" + closeLinkID + "\">close</a></td>";
  headerInnerHTML += "</tr>";
  headerInnerHTML += "</tbody>";
  headerInnerHTML += "</table>";
  headerInnerHTML += "</td>";
  headerInnerHTML += "</tr>";
  headerInnerHTML += "</tbody>";
  headerInnerHTML += "</table></div>";

  this._header.innerHTML = headerInnerHTML;

  document.body.appendChild(this._container);

  this._title = document.getElementById(titleID);

  this._clearAllLink = document.getElementById(clearAllLinkID);
  goog.events.listen(this._clearAllLink, "click", this._onClickClearAllLink, false, this);

  this._clearLastLink = document.getElementById(clearLastLinkID);
  goog.events.listen(this._clearLastLink, "click", this._onClickClearLastLink, false, this);

  this._putTimestampLink = document.getElementById(putTimestampLinkID);
  goog.events.listen(this._putTimestampLink, "click", this._onClickPutTimestampLink, false, this);

  this._closeLink = document.getElementById(closeLinkID);
  goog.events.listen(this._closeLink, "click", this._onClickCloseLink, false, this);


  if (typeof aDebugOptions == "object") {
    if ("width" in aDebugOptions)
      this._container.style["width"] = aDebugOptions["width"];
    if ("height" in aDebugOptions)
      this._container.style["height"] = aDebugOptions["height"];
    if ("title" in aDebugOptions)
      this._title.innerHTML = aDebugOptions["title"];
    else
      this._title.innerHTML = (IDIsPassed) ? this._id : "";
            //TODO: Multiple controllers
    if ("controller" in aDebugOptions) {
      this._controllerPart = document.createElement("div");
      this._container.appendChild(this._controllerPart);
      goog.dom.classes.add(this._controllerPart, "debugLogPart");
      goog.style.setOpacity(this._controllerPart, 0.75);

      this._controllerPart.style["height"] = "40%";
      this._loggerPart.style["height"] = "40%";

      if (!(aDebugOptions["controller"] == null)) {

        this._container.add(aDebugOptions["controller"]);

      }

    }
  }

  var draggable = new rflect.debug.drag.Drag(this._container, this._header);
  draggable.bindListener("dragStart", this._onDragStart, this);
  draggable.bindListener("dragEnd", this._onDragStop, this);

  rflect.Debug._debuggersCollection[this._id] = this._container;
  this._container._id = this._id;

  return this._container;
}).__fuse({
  _clearAllLink: null,
  _clearLastLink: null,
  _putTimestampLink: null,

  _onClickClearAllLink: function Debug__onClickClearAllLink(aEvent) {

    this._container._messageCounter = 0;
    this._loggerPart.innerHTML = "";

    aEvent.preventDefault();
  },
  // TODO: clear first and limit messages
  _onClickClearFirstLink: function Debug__onClickClearFirstLink(aEvent) {
    var lastChild = this._loggerPart.lastChild;
    try {
      this._container._messageCounter--;
      this._loggerPart.removeChild(lastChild);
    } catch(ex) {
      this._container._messageCounter++;
    }

    aEvent.preventDefault();
  },
  _onClickClearLastLink: function Debug__onClickClearLastLink(aEvent) {
    var firstChild = this._loggerPart.firstChild;
    try {
      this._container._messageCounter--;
      this._loggerPart.removeChild(firstChild);
    } catch(ex) {
      this._container._messageCounter++;
    }

    aEvent.preventDefault();
  },
  _onClickCloseLink: function Debug__onClickCloseLink(aEvent) {

    this._container.parentNode.removeChild(this._container);
    delete rflect.Debug._debuggersCollection[this._id];

    aEvent.preventDefault();
  },
  _onClickPutTimestampLink: function Debug__onClickPutTimestampLink(aEvent) {

    this._container.echo((new Date()).getTime());

    aEvent.preventDefault();
  },

  _onDragStart: function debugOnDragStart() {
    //TODO: Safari changes dragging cursor to text
    goog.dom.classes.remove(this._header, "draggableCursor");
    goog.dom.classes.add(this._header, "draggingCursor");
  },
  _onDragStop: function debugOnDragStop() {
    goog.dom.classes.remove(this._header, "draggingCursor");
    goog.dom.classes.add(this._header, "draggableCursor");
  },
  _DebugImpl: {
    _messageCounter: 0,
    _id: "",
    add: function debugAddElement(aElement) {
      goog.dom.getChildNodes(this)[2].appendChild(aElement);
    },
    echo: function debugEcho(aMessage, aMessageType) {
      var newMessage = document.createElement("div");
      var messageNumber = document.createElement("span");
      var messageBody = document.createElement("span");
      var messageType = (aMessageType == undefined) ? rflect.Debug.MESSAGE_INFO
              : aMessageType;
      if (!rflect.Debug._off) {
        switch (messageType) {
          case rflect.Debug.MESSAGE_ERROR: goog.dom.classes.add(newMessage, "debugLogStyleRed");break;
          case rflect.Debug.MESSAGE_INFO: goog.dom.classes.add(newMessage, "debugLogStyleBlue");break;
          case rflect.Debug.MESSAGE_WARNING: goog.dom.classes.add(newMessage, "debugLogStyleYellow");break;
          default: break;
        }
        if (this._messageCounter++ % 2) {
          goog.dom.classes.add(newMessage, "debugMessageEven");
        } else {
          goog.dom.classes.add(newMessage, "debugMessageOdd");
        }
        goog.dom.getChildNodes(this)[1].insertBefore(newMessage, goog.dom.getChildNodes(this)[1].firstChild);
        newMessage.appendChild(messageNumber);
        newMessage.appendChild(messageBody);
        messageBody.appendChild(document.createTextNode(aMessage));
        messageNumber.appendChild(document.createTextNode(this._messageCounter
                + ":"));
        goog.dom.classes.add(messageBody, "debugMessageBody");
        goog.dom.classes.add(messageNumber, "debugMessageNumber");
      }
    },
    remove: function debugRemoveElement(aElement) {
      goog.dom.getChildNodes(this)[2].removeChild(aElement);
    },
    setTitle: function debugSetTitle(aTitle) {
      goog.dom.getChildNodes(this)[0].innerHTML = aTitle;
    }
  }
}).__assoc({
  MESSAGE_INFO: 10,
  MESSAGE_WARNING: 11,
  MESSAGE_ERROR: 12,

  _off: true,
  _messageCounter: 0,
  _debuggersCollection: {},
  _perfIDs: {},

  activate: function() {
    this._off = false;
  },
  deactivate: function() {
    this._off = true;
  },
  echo: function(aMsg, debugName) {
    var debugTime = new Date();
    var debugMilliseconds = debugTime.getMilliseconds();
    var debugHeader = debugName ? ("debug message #" + rflect.Debug._messageCounter++
            + ": " + debugName) :
                      ("debug message #" + rflect.Debug._messageCounter++);
    var addition = "";
    if (!rflect.Debug._off) {
      for (var counter = 0;
           counter < (4 - debugTime.getMilliseconds().toString().length);
           counter++)
        debugMilliseconds = "0" + debugMilliseconds;
      msg = debugTime.getHours() + ":" + debugTime.getMinutes() + ":" +
            debugTime.getSeconds() + "." + debugMilliseconds + " " +
            debugHeader + "\n" + aMsg;
      if (typeof debugName == "undefined") {
        if ("console" in window && "log"
                in window["console"]) { // FireBug installed
          window["console"].log(msg);
        }
        else {
          /*if (!Debug.silent) {
            alert(msg);
          }*/
        }
      } else {
        if (!(debugName in rflect.Debug._debuggersCollection)) {
          (new rflect.Debug({
            id: debugName,
            width: "400px"
          })).echo(aMsg);
        } else {
          rflect.Debug._debuggersCollection[debugName].echo(aMsg);
        }
      }

      /*Debug.echo = f;
      f(msg);*/
    }
  },
  inspect: function Debug_inspect(aInspectName, aObject) {
    window["Debug_inspect_" + aInspectName] = aObject;
  },
  objectToString: function(aObject) {
    this._depthLevel = 0;
    return this._objectToString(aObject, "");
  },

  elementToString: function(aElement) {

    var tempContr = document.createElement("div");
    var elStr = "";
    var parNode = null;

    if ((aElement.parentNode == null) && !(aElement == document)) {
      // if this element is not attached to DOM and is not a document
      tempContr.appendChild(aElement);
      elStr = tempContr.innerHTML;
      tempContr.removeChild(aElement);
    } else {
      // if this element is attached to DOM
      parNode = aElement.parentNode;
      tempContr.appendChild(aElement);
      elStr = tempContr.innerHTML;
      parNode.appendChild(aElement);

    }

    return elStr;

  },

  _objectToString: function(o, indent) {
    var indent2 = indent + " ";
    if (typeof o == "object") {
      var s = "{";
      for (var n in o) {
        s += indent2 + n + ": " + this._objectToString(o[n], indent2) + "\n";
      }
      s += indent + "}";
      return s;
    }
    else
      if (typeof o == "array") {
        var s = "[";
        for (var n = 0; n < o.length; n++) {
          s += this._objectToString(o[n], indent2) + "\n";
        }
        s += indent + "]";
        return s;
      }
      else {
        return o;
      }
  }
});

// Debug can use global namespace

var echo = rflect.Debug.echo;
var inspect = rflect.Debug.inspect;

var perf = function Debug_Performance(perfID, debugName) {
  if (perfID in rflect.Debug._perfIDs) {
    echo(perfID + ": " + (goog.now() - rflect.Debug._perfIDs[perfID]) + "ms", debugName);
    delete rflect.Debug._perfIDs[perfID];
  } else {
    rflect.Debug._perfIDs[perfID] = goog.now();
  }
}