goog.provide("rflect.debug.util.Unit");

goog.require("rflect.Root");
goog.require("rflect.debug.browser.BrowserDetector");

rflect.debug.util.Unit = rflect.Root.__create({}).
        __assoc({
  // Netvibes App.scrollPos *****
  scrollPos: function Unit_scrollPos() {
    var browser = this.browser;
    if (browser.isInternetExplorer() || browser.isOpera()) {
      if (document.body.scrollTop) {
        return document.body.scrollTop;
      } else {
        return document.documentElement.scrollTop;
      }
    } else if (browser.isFirefox()) {
      return window.pageYOffset;
    }
    return 0;
  }
}).__assoc(rflect.debug.browser.BrowserDetector)