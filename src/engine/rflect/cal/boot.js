goog.provide("rflect.cal.boot");

goog.require("goog.events");
goog.require("rflect.cal._Calendar__Upd__Upd");
goog.require("rflect.Debug");

(function() {

  goog.events.listenOnce(window, "load", function(e) {
    rflect.Debug.activate();
  }, false);


  var cal = new rflect.cal.Main();

  inspect("_Calendar", cal);

})()