goog.provide("rflect.debug.drag.Drag");

goog.require("goog.events");
goog.require("rflect.debug.events.EventSource");
goog.require("rflect.debug.events.Event");
goog.require("rflect.debug.util.Unit");

rflect.debug.drag.Drag = rflect.Root.__create(function Drag_Constructor(aElement, aHandle) {
  this.init(aHandle, aElement);
}).__fuse({
  scrollPos: null,
  obj: null,
  mouseMoveListener: null,
  mouseUpListener: null,
  init: function(a, aRoot, ee) {
    if (ee == null) {
      rflect.debug.events.Event.bindArgs(a, "mousedown", this.start, this, false, a);
      //a.onmousedown = this.start;
    }
    a.root = aRoot;
    if (isNaN(parseInt(a.root.style.left)))
      a.root.style.left = "0px";
    if (isNaN(parseInt(a.root.style.top)))
      a.root.style.top = "0px";
    a.root.onDragStart = new Function();
    a.root.onDragEnd = new Function();
    a.root.onDrag = new Function();
    if (ee != null) {
      var b = this.obj = a;
      ee = this.fixE(ee);
      var c = parseInt(b.root.style.top);
      var d = parseInt(b.root.style.left);
      b.root.onDragStart(d, c, ee.clientX, ee.clientY);
      this.trigger("dragStart", d, c, ee.clientX, ee.clientY);
      b.lastMouseX = ee.clientX;
      b.lastMouseY = ee.clientY;
      this.mouseMoveListener = goog.events.listen(document, "mousemove", this.drag, false, this);
//      document.onmousemove = this.drag;
      this.mouseUpListener = goog.events.listen(document, "mouseup", this.end, false, this);
//      document.onmouseup = this.end;
    }
  },
  start: function(e, b) {
    this.obj = b;
    e = this.fixE(e);
    var c = parseInt(b.root.style.top);
    var d = parseInt(b.root.style.left);
    b.root.onDragStart(d, c, e.clientX, e.clientY);
    this.trigger("dragStart", e.clientX, e.clientY);
    b.lastMouseX = e.clientX;
    b.lastMouseY = e.clientY;
    this.mouseMoveListener = goog.events.listen(document, "mousemove", this.drag, false, this);
    //document.onmousemove = this.drag;
    this.mouseUpListener = goog.events.listen(document, "mouseup", this.end, false, this);
    //document.onmouseup = this.end;


    this.scrollPos = rflect.debug.util.Unit.scrollPos();
    // Preventing default action
    e.preventDefault();

  },
  drag: function(e) {
    e = this.fixE(e);
    var b = this.obj;
    var c = e.clientY;
    var d = e.clientX;
    var top = parseInt(b.root.style.top);
    var left = parseInt(b.root.style.left);
    var h,g;
    h = left + d - b.lastMouseX;
    g = top + c - b.lastMouseY;
    var p = rflect.debug.util.Unit.scrollPos();
    g -= this.scrollPos - p;
    this.scrollPos = p;
    b.root.style.left = h + "px";
    b.root.style.top = g + "px";
    b.lastMouseX = d;
    b.lastMouseY = c;
    b.root.onDrag(h, g, e.clientX, e.clientY);
    this.trigger("drag", h, g, e.clientX, e.clientY);
    // Preventing default action
    e.preventDefault();
  },
  end: function(e) {
    var left = parseInt(this.obj.root.style.left);
    var top = parseInt(this.obj.root.style.top);
//    document.onmousemove = null;
    goog.events.unlistenByKey(this.mouseMoveListener);
    goog.events.unlistenByKey(this.mouseUpListener);
//    Event.unbind(this.mouseMoveListener);
    //    Event.unbind(this.mouseUpListener);
    //    document.onmouseup = null;
    this.obj.root.onDragEnd(left, top);
    this.trigger("dragEnd", left, top);
    this.obj = null;
    // Preventing default action
    e.preventDefault();
  },
  fixE: function(e) {
    if (typeof e == "undefined")e = window.event;
    if (typeof e.layerX == "undefined")e.layerX = e.offsetX;
    if (typeof e.layerY == "undefined")e.layerY = e.offsetY;
    return e;
  }}).__fuse(rflect.debug.events.EventSource.__create({}).__assoc({
  eventTypes: {
    "drag" : true,
    "dragStart": true,
    "dragEnd": true
  }
}));