goog.provide("rflect.debug.browser.Browser");

goog.require("rflect.Root");
goog.require("rflect.debug.structs.HashMap");

rflect.debug.browser.Browser = rflect.Root.__create(function Browser_Constructor() {
  this.detect();
  this.detectByUserAgent();
  this.detectOS();
}).__fuse({
  _browsersCollection: new rflect.debug.structs.HashMap({
    "Firefox 3.0" : false,
    "Firefox 2.0" : false,
    "Firefox 1.5" : false,
    "Firefox 1.0" : false,
    "Firefox" : false,
    "Internet Explorer 7" : false,
    "Internet Explorer 6" : false,
    // Not IE7 or IE6 but previous version
    "Internet Explorer" : false,
    "Safari 2" : false,
    "Safari 3" : false,
    "Safari" : false,
    "Opera" : false
  }),
  /**
   *   This collection doesn't hold predefined values
   *  as they may differ due to versions
   *
   */
  _browsersCollectionByUserAgent: new rflect.debug.structs.HashMap(),
  _featuresCollection: new rflect.debug.structs.HashMap({
    "XPath" : false,
    // Webkit based
    "Webkit-based" : false,
    // Gecko based
    "Gecko-based" : false
  }),
  _OSCollection: new rflect.debug.structs.HashMap({
    "Windows XP" : false,
    "Windows Vista" : false,
    "Windows 2000" : false,
    "Windows NT 4.0" : false,
    "Windows 98" : false,
    "Windows 95" : false,
    "Windows" : false,
    "Mac OS X" : false,
    "iPhone" : false,
    "Mac" : false,
    "Linux Ubuntu" : false,
    "Linux SUSE" : false,
    "Linux Fedora" : false,
    "Linux Debian" : false,
    "Linux" : false,
    "Unix" : false
  }),
  /**
   *
   *  Call this method when DOM is loaded
   *
   */
  detect: function Browser_detect() {
    this._featuresCollection.put("XPath", ("evaluate" in document));
    if ("ActiveXObject" in window) {
      this._browsersCollection.put("Internet Explorer", true);
      if ("XMLHttpRequest" in window)
        this._browsersCollection.put("Internet Explorer 7", true);
      else
        this._browsersCollection.put("Internet Explorer 6", true);
    } else if (("childNodes" in document) && ("all" in document)
            && !("taintEnabled"
            in navigator)/*("childNodes" in document) && (!("all" in document)) && (!("taintEnabled" in navigator))*/) {
      this._featuresCollection.put("Webkit-based", true);
      this._browsersCollection.put("Safari", true);
      if (this._featuresCollection.getValue("XPath"))
        this._browsersCollection.put("Safari 3", true);
      else
        this._browsersCollection.put("Safari 2", true);
    } else if ("getBoxObjectFor" in document) {
      this._featuresCollection.put("Gecko-based", true);
      this._browsersCollection.put("Firefox", true);
      if ("getBoundingClientRect" in document)
        this._browsersCollection.put("Firefox 3.0", true);
      else if ("globalStorage" in window)
        this._browsersCollection.put("Firefox 2.0", true);
        //TODO: Consider to find better way to detect Firefox 1.5
      else if ("forEach" in Array)
        this._browsersCollection.put("Firefox 1.5", true);
      else
        this._browsersCollection.put("Firefox 1.0", true);
    } else if ("opera" in window)
      this._browsersCollection.put("Opera", true);
  },
  detectByUserAgent: function Browser_detectByUserAgent() {
    var userAgent = navigator.userAgent.toLowerCase();
    var name = "Undetected";
    var version = 0;
    var webkitName = "Undetected";
    var webkitVersion = 0;
    var khtmlName = "Undetected";
    var khtmlVersion = 0;
    if ((userAgent.indexOf("firefox") != -1) || (userAgent.indexOf("iceweasel")
            != -1)) {
      name = "Firefox";
      version =
      parseFloat(userAgent.substr(userAgent.indexOf("firefox") + 8, 3));

    } else if (userAgent.indexOf("safari") != -1) {
      name = "Safari";
      webkitName = "applewebkit/";
      webkitVersion = userAgent.substring(userAgent.indexOf(webkitName)
              + webkitName.length, userAgent.length);
      webkitVersion =
      parseInt(webkitVersion.substring(0, webkitVersion.indexOf(" ")));
      version =
      webkitVersion >= 500 ? 3.0 : webkitVersion >= 400 ? 2.0 : webkitVersion
              >= 300 ? 1.3 : webkitVersion > 100 ? 1.2 : 1.0;
    } else if ("opera" in window) {
      name = "Opera";
      if ("version" in window["opera"]) {
        version = parseInt(parseFloat(window["opera"].version()) * 10) / 10;
      } else {
        version = 7.5;
      }
    } else if (userAgent.indexOf("konqueror") != -1) {
      name = "Konqueror";
      khtmlName = "konqueror/";
      khtmlVersion = userAgent.substring(userAgent.indexOf(khtmlName)
              + khtmlName.length, userAgent.length);
      version =
      parseFloat(khtmlVersion.substring(0, khtmlVersion.indexOf(";")));
    } else if ("ActiveXObject" in window) {
      name = "Internet Explorer";
      if ((new RegExp("msie ([0-9]{1,}[\.0-9]{0,})")).exec(userAgent) != null) {
        version = parseInt(RegExp.$1, 10);
      } else {
        version = 3;
      }
    }
    this._browsersCollectionByUserAgent.put(name + " " + version, true);
  },
  detectOS : function Browser_detectOS() {
    var userAgent = navigator.userAgent.toLowerCase();
    var platform = navigator.platform.toLowerCase();
    if ((new RegExp("win")).test(platform)) {
      this._OSCollection.put("Windows", true);
      if ((new RegExp("windows nt 5.1")).test(userAgent)) {
        this._OSCollection.put("Windows XP", true);
      } else if ((new RegExp("windows nt 5.0")).test(userAgent)) {
        this._OSCollection.put("Windows 2000", true);
      } else if ((new RegExp("windows nt 6.0")).test(userAgent)) {
        this._OSCollection.put("Windows Vista", true);
      } else if ((new RegExp("windows nt 4.0")).test(userAgent)) {
        this._OSCollection.put("Windows NT 4.0", true);
      } else if ((new RegExp("windows 98")).test(userAgent)) {
        this._OSCollection.put("Windows 98", true);
      } else if ((new RegExp("windows 95")).test(userAgent)) {
        this._OSCollection.put("Windows 95", true);
      }
    }
    if ((new RegExp("mac")).test(platform)) {
      this._OSCollection.put("Mac", true);
      if ((new RegExp("mac os x")).test(userAgent)) {
        this._OSCollection.put("Mac OS X", true);
      } else if ((new RegExp("iphone")).test(userAgent)) {
        this._OSCollection.put("iPhone", true);
      }
    }
    if ((new RegExp("linux")).test(platform)) {
      this._OSCollection.put("Linux", true);
      if ((new RegExp("ubuntu")).test(userAgent)) {
        this._OSCollection.put("Linux Ubuntu", true);
      } else if ((new RegExp("suse")).test(userAgent)) {
        this._OSCollection.put("Linux SUSE", true);
      } else if ((new RegExp("fedora")).test(userAgent)) {
        this._OSCollection.put("Linux Fedora", true);
      } else if ((new RegExp("debian")).test(userAgent)) {
        this._OSCollection.put("Linux Debian", true);
      }
    }
    if ((new RegExp("nix")).test(platform)) {
      this._OSCollection.put("Unix", true);
    }
  },
  getDocumentWidth: function Browser_getDocumentWidth() {
    return (document.documentElement && document.documentElement.scrollWidth)
            || document.body.scrollWidth;
  },
  getDocumentHeight: function Browser_getDocumentHeight() {
    return(document.documentElement && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
  },
  getClientWidth: function Browser_getClientWidth() {
    return(window.innerWidth || (document.documentElement
            && document.documentElement.clientWidth) || (document.body
            && document.body.clientWidth) || 0);
  },
  getClientHeight: function Browser_getClientHeight() {
    return(window.innerHeight || (document.documentElement
            && document.documentElement.clientHeight) || (document.body
            && document.body.clientHeight) || 0);
  },
  getScrollTop: function Browser_getScrollTop() {
    return(document.documentElement && document.documentElement.scrollTop)
            || (document.body && document.body.scrollTop) || 0;
  },
  getScrollLeft: function Browser_getScrollLeft() {
    return(document.documentElement && document.documentElement.scrollLeft)
            || (document.body && document.body.scrollLeft) || 0;
  },
  getFeatures: function Browser_getFeatures() {

  },
  getOSType: function Browser_getOSType() {
    for (var OSType in this._OSCollection._hashObject) {
      if (this._OSCollection._hashObject[OSType])
        return OSType;
    }
    return "Undetected";
  }
  ,
  /**
   *   Should be used after r.Browser.detect()
   *
   */
  getType: function Browser_getType() {
    //TODO: Need iterator for hash
    for (var browserType in this._browsersCollection._hashObject) {
      if (this._browsersCollection._hashObject[browserType])
        return browserType;
    }
    return "Undetected";
  },
  getTypeByUserAgent: function Browser_getTypeByUserAgent() {
    for (var browserType in this._browsersCollectionByUserAgent._hashObject) {
      if (this._browsersCollectionByUserAgent._hashObject[browserType])
        return browserType;
    }
  },
  isFirefox: function Browser_isFirefox() {
    return this._browsersCollection.getValue("Firefox");
  },
  isFirefox1_0: function Browser_isFirefox1_0() {
    return this._browsersCollection.getValue("Firefox 1.0");
  },
  isFirefox1_5: function Browser_isFirefox1_5() {
    return this._browsersCollection.getValue("Firefox 1.5");
  },
  isFirefox2_0: function Browser_isFirefox2_0() {
    return this._browsersCollection.getValue("Firefox 2.0");
  },
  isFirefox3_0: function Browser_isFirefox3_0() {
    return this._browsersCollection.getValue("Firefox 3.0");
  },
  isInternetExplorer7: function Browser_isInternetExplorer7() {
    return this._browsersCollection.getValue("Internet Explorer 7");
  },
  isInternetExplorer6: function Browser_isInternetExplorer6() {
    return this._browsersCollection.getValue("Internet Explorer 6");
  },
  isInternetExplorer: function Browser_isInternetExplorer() {
    return this._browsersCollection.getValue("Internet Explorer");
  },
  isSafari3: function Browser_isSafari3() {
    return this._browsersCollection.getValue("Safari 3");
  },
  isSafari2: function Browser_isSafari2() {
    return this._browsersCollection.getValue("Safari 2");
  },
  isSafari: function Browser_isSafari() {
    return this._browsersCollection.getValue("Safari");
  },
  isOpera: function Browser_isOpera() {
    return this._browsersCollection.getValue("Opera");
  }
}).__assoc({
  _instance: null,
  get: function Browser_get() {
    return (this._instance == null ? this._instance = new this() : this._instance)
  }
})