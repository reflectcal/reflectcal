goog.provide("rflect.debug.browser.BrowserDetector");

goog.require("rflect.Root");
goog.require("rflect.debug.browser.Browser");

rflect.debug.browser.BrowserDetector = rflect.Root.__create({})
        .__assoc({
  browser: rflect.debug.browser.Browser.get()
});