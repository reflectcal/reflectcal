goog.provide("rflect.cal.InfoTip");

goog.require("rflect.widg.InfoTip");
goog.require("goog.events.EventTarget");
goog.require("goog.events.EventHandler");

rflect.cal.InfoTip =
rflect.widg.InfoTip.__fuse({
  dispose: function InfoTip_dispose() {

    if (!this.getDisposed()) {
      goog.events.EventTarget.prototype.dispose.call(this);
      goog.events.EventHandler.prototype.dispose.call(this);
      this.__creator.prototype.dispose.call(this);
    }
    ;

  }
}).__fuse(new goog.events.EventTarget()).__fuse(new goog.events.EventHandler());
