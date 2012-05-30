goog.provide("rflect.widg.InfoTip");

goog.require("rflect.Root");
goog.require("goog.dom");
goog.require("goog.math.Size");
goog.require("goog.math.Rect");
goog.require("goog.math.Coordinate");
goog.require("goog.object");
goog.require("goog.userAgent");
goog.require("goog.Disposable");

rflect.widg.InfoTip =
rflect.Root.__create(function InfoTip_Constructor(aInfoTipOptions) {

  //echo("InfoTip constructor called");

  var infoTipOptions = {
    panel: null,
    size: null,
    content: null
  };

  goog.object.extend(infoTipOptions, aInfoTipOptions);

  this._size = {
    box: null,
    boxWithSign: null
  };

  this.build();

  this.setPanel(infoTipOptions["panel"]);

  this.setSize(infoTipOptions["size"]);

  this._point = {};

  //echo("this._container" + this._container);

  //this.setContent(infoTipOptions["content"]);

}).__assoc({

  CORNER_RADIUS: 25,
  CONTENT_OFFSET: 15,
  MIN_LOWER_RIGHT_BORDER_WIDTH: 25,

  SIGN_SIZE: new goog.math.Size(98, 96),
  IMAGE_PATH: INFOTIP_IMAGE_PATH,
  BLANK_IMAGE_PATH: BLANK_IMAGE_PATH,

  CONFIGURATION_BELOW_POINT: 1,
  CONFIGURATION_ABOVE_POINT: 2

}).__fuse({

  _configuration: 0,

  /**
   * Whether infotip is pointing to coordinate. Resets when tip becomes hidden.
   * @type {boolean}
   * */
  _pointMode: false,

  /**
   * Coordinate to which infotip is currently pointing.
   * @type {goog.math.Coordinate|Event|goog.events.BrowserEvent}
   * */
  _point: null,

  _panel: null,
  _box: null,

  _size: null,

  _signEnabled: true,

  _upperBorder: null,
  _upperBorderInner: null,
  _upperRightCorner: null,
  _leftBorder: null,
  _placeHolder: null,
  _placeHolderInner: null,
  _rightBorder: null,
  _lowerLeftCorner: null,
  _lowerLeftBorder: null,
  _lowerLeftBorderInner: null,
  _sign: null,
  _lowerRightBorder: null,
  _lowerRightBorderInner: null,
  _lowerRightCorner: null,
  _container: null,

  _leftBorderHeight: 0,
  _upperBorderWidth: 0,

  _defaultSignX: 0,

  _visible: false,

  build: function InfoTip_build() {

    var imgSRC = "";
    var upperLeftCornerIMG = null;
    var upperRightCornerIMG = null;
    var lowerLeftCornerIMG = null;
    var lowerRightCornerIMG = null;
    var iconCloseIMG = null;
    var signIMG = null;

    var lowerBorderPos = "";
    var rightBorderPos = "";

    var upperLeftCornerIMGProps1 = null;
    var upperRightCornerIMGProps1 = null;
    var lowerLeftCornerIMGProps1 = null;
    var lowerRightCornerIMGProps1 = null;
    var signIMGProps1 = null;

    var upperLeftCornerIMGProps2 = null;
    var upperRightCornerIMGProps2 = null;
    var lowerLeftCornerIMGProps2 = null;
    var lowerRightCornerIMGProps2 = null;
    var signIMGProps2 = null;

    this._upperBorder = null;
    this._upperBorderInner = null;
    this._upperRightCorner = null;
    this._leftBorder = null;
    this._placeHolder = null;
    this._placeHolderInner = null;
    this._rightBorder = null;
    this._lowerLeftCorner = null;
    this._lowerLeftBorder = null;
    this._lowerLeftBorderInner = null;
    this._sign = null;
    this._lowerRightBorder = null;
    this._lowerRightBorderInner = null;
    this._lowerRightCorner = null;
    this._container = null;

    this._box = null;

    if (goog.userAgent.IE) {

      lowerBorderPos = "bottom: -1px;";
      rightBorderPos = "right: -1px;"

    } else {

      lowerBorderPos = "bottom: 0pt;";
      rightBorderPos = "right: 0pt;"

    }

    if (goog.userAgent.IE
            && (goog.userAgent.VERSION == "6.0")) {

      imgSRC = rflect.widg.InfoTip.BLANK_IMAGE_PATH;


      upperLeftCornerIMGProps1 = {
        style: "position: absolute; left: 0px; top: 0px;",
        src: imgSRC
      };
      upperRightCornerIMGProps1 = {
        style: "position: absolute; left: -25px; top: 0px;",
        src: imgSRC
      };
      lowerLeftCornerIMGProps1 = {
        style: "position: absolute; left: 0px; top: -25px;",
        src: imgSRC
      };

      lowerRightCornerIMGProps1 = {
        style: "position: absolute; left: -25px; top: -25px;",
        src: imgSRC
      };
      signIMGProps1 = {
        style: "position: absolute; left: -50px; top: 0px;",
        src: imgSRC
      };

      upperLeftCornerIMGProps2 = {
        width: "148",
        height: "96"
      };
      upperRightCornerIMGProps2 = {
        width: "148",
        height: "96"
      };
      lowerLeftCornerIMGProps2 = {
        width: "148",
        height: "96"
      };
      lowerRightCornerIMGProps2 = {
        width: "148",
        height: "96"
      };
      signIMGProps2 = {
        width: "148",
        height: "96"
      };

    } else {

      imgSRC = rflect.widg.InfoTip.IMAGE_PATH;

      upperLeftCornerIMGProps1 = {
        width: "148",
        height: "96",
        style: "position: absolute; left: 0px; top: 0px;",
        src: imgSRC
      };
      upperRightCornerIMGProps1 = {
        width: "148",
        height: "96",
        style: "position: absolute; left: -25px; top: 0px;",
        src: imgSRC
      };
      lowerLeftCornerIMGProps1 = {
        width: "148",
        height: "96",
        style: "position: absolute; left: 0px; top: -25px;",
        src: imgSRC
      };
      lowerRightCornerIMGProps1 = {
        width: "148",
        height: "96",
        style: "position: absolute; left: -25px; top: -25px;",
        src: imgSRC
      };
      signIMGProps1 = {
        width: "148",
        height: "96",
        style: "position: absolute; left: -50px; top: 0px;",
        src: imgSRC
      };

    }

    this._box = goog.dom.$dom("div", {
      style: "position: absolute; z-index: 180; top: 140px; left: 512px;",
      id: "infowindow"
    },
            goog.dom.$dom("div", {
              style: "position: absolute; left: 0pt; top: 0pt; z-index: 181;"
            },
                    goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; left: 0pt; width: 25px; height: 25px;"
                    },
                            upperLeftCornerIMG = goog.dom.$dom("img",
                                    upperLeftCornerIMGProps1)),
                    this._upperBorder = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; width: 323px; height: 25px; left: 25px; top: 0px;"
                    },
                            this._upperBorderInner = goog.dom.$dom("div", {
                              style: "background-color: rgb(255, 255, 255); width: 323px; height: 25px; position: absolute; left: 0pt; top: 0pt;"
                            },
                                    goog.dom.$dom("div", {style: "border-top: 1px solid rgb(171, 171, 171); width: 100%; position: absolute; top: 0pt;"}))),
                    this._upperRightCorner = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; left: 348px; width: 25px; height: 25px;"
                    },
                            upperRightCornerIMG = goog.dom.$dom("img",
                                    upperRightCornerIMGProps1)),
                    this._leftBorder = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; width: 25px; height: 127px; left: 0px; top: 25px;"
                    },
                            goog.dom.$dom("div", {
                              style: "background-color: rgb(255, 255, 255); width: 25px; height: 100%; position: absolute; left: 0px; top: 0px;"
                            },
                                    goog.dom.$dom("div", {
                                      style: "border-left: 1px solid rgb(171, 171, 171); height: 100%; position: absolute; left: 0px;"
                                    }))),
                    this._placeHolder = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; width: 323px; height: 127px; left: 25px; top: 25px;"
                    },
                            this._placeHolderInner = goog.dom.$dom("div", {
                              style: "background-color: rgb(255, 255, 255); width: 323px; height: 127px; position: absolute; left: 0pt; top: 0pt;"
                            })),
                    this._rightBorder = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; width: 25px; height: 127px; left: 348px; top: 25px;"
                    },
                            goog.dom.$dom("div", {
                              style: "background-color: rgb(255, 255, 255); width: 25px; height: 100%; position: absolute; left: 0pt; top: 0pt;"
                            },
                                    goog.dom.$dom("div", {
                                      style: "border-right: 1px solid rgb(171, 171, 171); height: 100%; position: absolute;" + rightBorderPos
                                    }))),
                    this._lowerLeftCorner = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; left: 0pt; width: 25px; height: 25px; top: 152px;"
                    },
                            lowerLeftCornerIMG = goog.dom.$dom("img",
                                    lowerLeftCornerIMGProps1)),
                    this._lowerLeftBorder = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; width: 80px; height: 25px; left: 25px; top: 152px;"
                    },
                            this._lowerLeftBorderInner = goog.dom.$dom("div", {
                              style: "background-color: rgb(255, 255, 255); width: 80px; height: 25px; position: absolute; left: 0pt; top: 0pt;"
                            },
                                    goog.dom.$dom("div", {
                                      style: "border-bottom: 1px solid rgb(171, 171, 171); width: 100%; position: absolute;" + lowerBorderPos
                                    }))),
                    this._sign = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; left: 105px; width: 98px; height: 96px; top: 152px;"
                    },
                            signIMG = goog.dom.$dom("img",
                                    signIMGProps1)),
                    this._lowerRightBorder = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; width: 145px; height: 25px; left: 203px; top: 152px;"
                    },
                            this._lowerRightBorderInner = goog.dom.$dom("div", {
                              style: "background-color: rgb(255, 255, 255); width: 145px; height: 25px; position: absolute; left: 0pt; top: 0pt;"
                            },
                                    goog.dom.$dom("div", {
                                      style: "border-bottom: 1px solid rgb(171, 171, 171); width: 100%; position: absolute;" + lowerBorderPos
                                    }))),
                    this._lowerRightCorner = goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; left: 348px; width: 25px; height: 25px; top: 152px;"
                    },
                            lowerRightCornerIMG = goog.dom.$dom("img",
                                    lowerRightCornerIMGProps1)),
                    this._container = goog.dom.$dom("div", {
                      style: "overflow: hidden; width: 343px; position: absolute; left: 15px; top: 15px; height: 147px; z-index: 183; cursor: default;"
                    },
                            goog.dom.$dom("div", null)
                            ),
                    goog.dom.$dom("div", {
                      style: "overflow: hidden; position: absolute; left: 348px; width: 14px; height: 13px; z-index: 184; cursor: pointer; top: 10px;"

                    }/*,
                            iconCloseIMG = goog.dom.$dom("img", {
                              width: "148",
                              height: "96",
                              style: "position: absolute; left: 0px; top: -50px; z-index: 184;",
                              src: rflect.widg.InfoTip.IMAGE_PATH
                            })*/))
            )

    if (goog.userAgent.IE
            && (goog.userAgent.VERSION == "6.0")) {
      goog.style.setTransparentBackgroundImage(upperLeftCornerIMG, rflect.widg.InfoTip.IMAGE_PATH);
      goog.style.setTransparentBackgroundImage(upperRightCornerIMG, rflect.widg.InfoTip.IMAGE_PATH);
      goog.style.setTransparentBackgroundImage(lowerLeftCornerIMG, rflect.widg.InfoTip.IMAGE_PATH);
      goog.style.setTransparentBackgroundImage(lowerRightCornerIMG, rflect.widg.InfoTip.IMAGE_PATH);
      goog.style.setTransparentBackgroundImage(signIMG, rflect.widg.InfoTip.IMAGE_PATH);

      goog.dom.setProperties(upperLeftCornerIMG, upperLeftCornerIMGProps2);
      goog.dom.setProperties(upperRightCornerIMG, upperRightCornerIMGProps2);
      goog.dom.setProperties(lowerLeftCornerIMG, lowerLeftCornerIMGProps2);
      goog.dom.setProperties(lowerRightCornerIMG, lowerRightCornerIMGProps2);
      goog.dom.setProperties(signIMG, signIMGProps2);
    }

    goog.style.showElement(this._box, false);

  },

  dispose: function InfoTip_dispose() {
    if (!this.getDisposed()) {
      goog.dom.removeNode(this._box);
      this._box = null;
    }
  },

  enableSign: function InfoTip_switchSign(aSignEnabled) {

    var lowerLeftBorderWidth = 0;
    var lowerRightBorderWidth = 0;
    var signPos = null;

    if (!(this._signEnabled == aSignEnabled)) {
      if (this._signEnabled = aSignEnabled) {

        this._sign.style["display"] = "block";
        lowerLeftBorderWidth = this._upperBorderWidth
                - rflect.widg.InfoTip.SIGN_SIZE.width;
        lowerRightBorderWidth = 0;
        signPos = new goog.math.Coordinate(rflect.widg.InfoTip.CORNER_RADIUS
                + lowerLeftBorderWidth,
                rflect.widg.InfoTip.CORNER_RADIUS + this._leftBorderHeight);

        this._sign.style["left"] = signPos.x + "px";
        this._sign.style["top"] = signPos.y + "px";

        this._lowerLeftBorder.style["width"]
                = this._lowerLeftBorderInner.style["width"]
                = lowerLeftBorderWidth + "px";
        this._lowerRightBorder.style["width"]
                = this._lowerRightBorderInner.style["width"]
                = lowerRightBorderWidth + "px";

      } else {

        this._sign.style["display"] = "none";
        lowerLeftBorderWidth = this._upperBorderWidth;
        lowerRightBorderWidth = 0;

        this._lowerLeftBorder.style["width"]
                = this._lowerLeftBorderInner.style["width"]
                = lowerLeftBorderWidth + "px";
        this._lowerRightBorder.style["width"]
                = this._lowerRightBorderInner.style["width"]
                = lowerRightBorderWidth + "px";

      }
      ;

    }
    ;

  },

  getElement: function InfoTip_getElement() {
    return this._box;
  },

  isVisible: function isVisible() {
    return this._visible;
  },

  moveSign: function InfoTip_moveSign(aX) {

    // Relative to box!

    var x = 0;
    var minPos = 0;
    var maxPos = 0;

    var lowerLeftBorderWidth = 0;
    var lowerRightBorderLeft = 0;
    var lowerRightBorderWidth = 0;

    minPos = rflect.widg.InfoTip.CORNER_RADIUS;
    maxPos = this._size.box.width
            - rflect.widg.InfoTip.CORNER_RADIUS
            - rflect.widg.InfoTip.SIGN_SIZE.width;

   //echo("aX: " + aX);
    //echo("maxPos: " + maxPos);
    //echo("minPos: " + minPos);

    if (aX > maxPos)
      x = maxPos;
    else if (aX < minPos)
      x = minPos;
    else
      x = aX;
   //echo("x: " + x);

    lowerLeftBorderWidth = x - minPos;
    lowerRightBorderLeft = x + rflect.widg.InfoTip.SIGN_SIZE.width;
    lowerRightBorderWidth =
    this._upperBorderWidth + rflect.widg.InfoTip.CORNER_RADIUS
            - (x + rflect.widg.InfoTip.SIGN_SIZE.width);


    this._sign.style["left"] = x + "px";

    this._lowerLeftBorder.style["width"]
            = this._lowerLeftBorderInner.style["width"]
            = lowerLeftBorderWidth + "px";

    this._lowerRightBorder.style["left"]
            = lowerRightBorderLeft + "px";
    this._lowerRightBorder.style["width"]
            = this._lowerRightBorderInner.style["width"]
            = lowerRightBorderWidth + "px";

  },

  pointTo: function InfoTip_pointTo(aEvent) {

    echo("pointTo called");

    var relCoordToPanel = null;
    var relCoordToBox = null;
    var x = 0;
    var y = 0;
    var signX = 0;
    var freespace = 0;
    var freespaceHalf = 0;

    var xMin = 0;
    var xMax = 0;

    var signPositionIsDefault = true;

    // Call to show is placed here in case subclass of InfoTip overrides show method 
    // to get content size, so below this method call _size.box will be correct.
    this.show(true);

    // TODO: Add paddings
    xMin = 0;
    xMax = this._panel["offsetWidth"] - this._size.box.width;

    relCoordToPanel = goog.style.getRelativePosition(aEvent, this._panel);

    if (relCoordToPanel.y > this._size.boxWithSign.height) {

      // Place tip in upper configuration
      this._configuration = rflect.widg.InfoTip.CONFIGURATION_ABOVE_POINT;
      this.enableSign(true);

      y = relCoordToPanel.y - this._size.boxWithSign.height;

      freespace = this._size.box.width
              - rflect.widg.InfoTip.CORNER_RADIUS * 2
              - rflect.widg.InfoTip.SIGN_SIZE.width;

      freespaceHalf = Math.floor(freespace / 2);

      if (freespaceHalf
              >= rflect.widg.InfoTip.MIN_LOWER_RIGHT_BORDER_WIDTH) {

        x = aEvent.clientX - freespaceHalf - rflect.widg.InfoTip.CORNER_RADIUS;
        signX = rflect.widg.InfoTip.CORNER_RADIUS + freespaceHalf;

      } else if (freespace >= rflect.widg.InfoTip.MIN_LOWER_RIGHT_BORDER_WIDTH) {

        x = aEvent.clientX - freespace - rflect.widg.InfoTip.MIN_LOWER_RIGHT_BORDER_WIDTH;
        signX = rflect.widg.InfoTip.CORNER_RADIUS + freespaceHalf;

      } else {

        x = aEvent.clientX - rflect.widg.InfoTip.CORNER_RADIUS;
        signX = rflect.widg.InfoTip.CORNER_RADIUS;

      }

      if (x < xMin) {
        x = xMin;
        signPositionIsDefault = false;
      } else if (x > xMax) {
        x = xMax;
        signPositionIsDefault = false;
      }

    } else {

      // Place tooltip in lower configuration
      this._configuration = rflect.widg.InfoTip.CONFIGURATION_BELOW_POINT;
      this.enableSign(false);

      y = relCoordToPanel.y;

      x = aEvent.clientX - Math.floor(this._size.box.width / 2);

      if (x < xMin)
        x = xMin;
      else if (x > xMax)
        x = xMax;

    }

    this.setPosition(x, y);

    if (this._signEnabled) {
      if (!signPositionIsDefault && freespace > 0) {
        relCoordToBox = goog.style.getRelativePosition(aEvent, this._box);
        this.moveSign(relCoordToBox.x);
      } else {
        this.moveSign(signX);
      }
    }

    if (!this._pointMode)
      // set pointed mode
      this._pointMode = true;

    // Cache point coordinate,
    // clone it because IE shares event object
    // between listeners.
    this._point.clientX = aEvent.clientX;
    this._point.clientY = aEvent.clientY;

  },

  /**
   * Sets content of infotip.
   * @param {Element|string} aContent single content element or string representing
   * single content element.
   */
  setContent: function(aContent) {

    //echo("InfoTip setContent");
    //echo("this._container: " + this._container);

    if (goog.dom.isNodeLike(aContent)) {

      goog.dom.removeChildren(this._container);
      this._container.appendChild(aContent);

    } else if (typeof aContent == "string") {

      this._container.innerHTML = aContent;

    }

  },

  setOpacity: function InfoTip_setOpacity(aOpacity) {
    goog.style.setOpacity(this._box, aOpacity);
  },

  setPanel: function InfoTip_setPanel(aPanel) {
    this._panel = aPanel;
    this._panel.appendChild(this._box);
  },

  setPosition: function InfoTip_setPosition(arg1, opt_arg2) {
    if (arg1 instanceof goog.math.Coordinate) {
      goog.style.setPosition(this._box, arg1);
    } else {
      goog.style.setPosition(this._box, new goog.math.Coordinate(arg1, opt_arg2));
    }
  },

  setSize: function InfoTip_size(aSize) {

    var upperBorderWidth = 0;
    var upperRightCornerLeft = 0;
    var leftBorderHeight = 0;
    var diffUpperWidthToContainer = 0;

    var placeHolderRect = null;
    var containerRect = null;
    var placeHolderInnerSize = null;
    var rightBorderHeight = 0;
    var rightBorderLeft = 0;

    var lowerLeftBorderTop = 0;
    var lowerLeftBorderWidth = 0;

    var lowerRightBorderTop = 0;
    var lowerRightBorderWidth = 0;

    var lowerLeftCornerTop = 0;

    var lowerRightCornerLeft = 0;
    var lowerRightCornerTop = 0;

    var signPos = null;

    this._upperBorderWidth
            = upperBorderWidth
            = aSize.width - rflect.widg.InfoTip.CORNER_RADIUS * 2;

    upperRightCornerLeft =
    rflect.widg.InfoTip.CORNER_RADIUS + upperBorderWidth;

    this._leftBorderHeight =
    leftBorderHeight = aSize.height - rflect.widg.InfoTip.CORNER_RADIUS * 2;

    placeHolderRect = new goog.math.Rect(rflect.widg.InfoTip.CORNER_RADIUS,
            rflect.widg.InfoTip.CORNER_RADIUS,
            upperBorderWidth,
            leftBorderHeight);

    diffUpperWidthToContainer =
    (rflect.widg.InfoTip.CORNER_RADIUS - rflect.widg.InfoTip.CONTENT_OFFSET) * 2;

    containerRect =
    new goog.math.Rect(rflect.widg.InfoTip.CONTENT_OFFSET,
            rflect.widg.InfoTip.CONTENT_OFFSET,
            upperBorderWidth + diffUpperWidthToContainer,
            leftBorderHeight + diffUpperWidthToContainer);

    placeHolderInnerSize =
    new goog.math.Size(upperBorderWidth, leftBorderHeight);

    rightBorderHeight = leftBorderHeight;
    rightBorderLeft = upperRightCornerLeft;

    lowerLeftBorderTop =
    rflect.widg.InfoTip.CORNER_RADIUS
            + leftBorderHeight;

    lowerLeftBorderWidth = upperBorderWidth - (this._signEnabled
            ? rflect.widg.InfoTip.SIGN_SIZE.width
            : 0);

    lowerRightBorderTop = lowerLeftBorderTop;
    lowerRightBorderWidth = 0;

    lowerLeftCornerTop =
    rflect.widg.InfoTip.CORNER_RADIUS + leftBorderHeight;

    lowerRightCornerLeft = upperRightCornerLeft;
    lowerRightCornerTop = lowerLeftCornerTop;

    if (this._signEnabled) {
      signPos = new goog.math.Coordinate(rflect.widg.InfoTip.CORNER_RADIUS
              + lowerLeftBorderWidth,
              rflect.widg.InfoTip.CORNER_RADIUS
                      + leftBorderHeight);
      this._sign.style["left"] = signPos.x + "px";
      this._sign.style["top"] = signPos.y + "px";
    }

    this._upperBorder.style["width"]
            = this._upperBorderInner.style["width"]
            = upperBorderWidth + "px";
    this._upperRightCorner.style["left"] = upperRightCornerLeft + "px";
    this._leftBorder.style["height"] = leftBorderHeight + "px";

    this._placeHolder.style["left"] = placeHolderRect.left + "px";
    this._placeHolder.style["top"] = placeHolderRect.top + "px";
    this._placeHolder.style["width"] = placeHolderRect.width + "px";
    this._placeHolder.style["height"] = placeHolderRect.height + "px";

    this._container.style["left"] = containerRect.left + "px";
    this._container.style["top"] = containerRect.top + "px";
    this._container.style["width"] = containerRect.width + "px";
    this._container.style["height"] = containerRect.height + "px";

    this._placeHolderInner.style["width"] = placeHolderInnerSize.width + "px";
    this._placeHolderInner.style["height"] = placeHolderInnerSize.height + "px";
    this._rightBorder.style["left"] = rightBorderLeft + "px";
    this._rightBorder.style["height"] = rightBorderHeight + "px";
    this._lowerLeftBorder.style["top"] = lowerLeftBorderTop + "px";
    this._lowerLeftBorder.style["width"]
            = this._lowerLeftBorderInner.style["width"]
            = lowerLeftBorderWidth + "px";
    this._lowerRightBorder.style["top"] = lowerRightBorderTop + "px";
    this._lowerRightBorder.style["width"]
            = this._lowerRightBorderInner.style["width"]
            = lowerRightBorderWidth + "px";
    this._lowerLeftCorner.style["top"] = lowerLeftCornerTop + "px";
    this._lowerRightCorner.style["left"] = lowerRightCornerLeft + "px";
    this._lowerRightCorner.style["top"] = lowerLeftCornerTop + "px";

    this._size.box = aSize.clone();
    this._size.boxWithSign = this._size.box.clone();
    this._size.boxWithSign.height += (rflect.widg.InfoTip.SIGN_SIZE.height -
                                      rflect.widg.InfoTip.CORNER_RADIUS);

    if (this._pointMode)
      this.pointTo(this._point);

  },

  /**
   * Sets size of infotip to fit particular content size. If no size specified,
   *  it will be taken from content. This last case is only appropriate when infotip
   *  is visible.
   * @param {goog.math.Size} aOptContentSize content size.
   * single content element.
   * @return {goog.math.Size} content size.
   */
  setSizeByContent: function InfoTip_setSizeByContentSize(aOptContentSize) {

    var size = null;

    if (aOptContentSize == undefined) {
      if (this._visible) {
        if (goog.dom.hasNodes(this._container)) {
          size = goog.style.getBorderBoxSize(this._container.firstChild);
        } else {
          return;
        }
      } else {
        return;
      }

    } else {
      size = aOptContentSize.clone();
    }
    ;

    size.width += rflect.widg.InfoTip.CONTENT_OFFSET * 2;
    size.height += rflect.widg.InfoTip.CONTENT_OFFSET * 2;

    echo("size: " + size);

    this.setSize(size);
    return size;
  },

  show: function InfoTip_show(aShow) {

    if (this._visible != aShow) {
      goog.style.showElement(this._box, aShow);
      this._visible = aShow;
      if (!aShow)
        this._pointMode = false;
    }

  }

}).__fuse(new goog.Disposable());



