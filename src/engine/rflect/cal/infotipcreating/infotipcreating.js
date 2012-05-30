goog.provide("rflect.cal.InfoTipCreating");

goog.require("rflect.cal.InfoTip");
goog.require("goog.dom");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.events.KeyCodes");
goog.require("goog.userAgent");

goog.require("rflect.loc.cal.InfoTipCreating");

rflect.cal.InfoTipCreating =
rflect.cal.InfoTip.__create(function(aInfoTipCreatingOptions) {

  var infoTipCreatingOptions = {
    dateTime: "",
    size: goog.userAgent.IE
            ? new goog.math.Size(420, 200)
            : new goog.math.Size(400, 180),
    panel: null
  };

  goog.object.extend(infoTipCreatingOptions, aInfoTipCreatingOptions);

  this.__creator.call(this, infoTipCreatingOptions);

  this._size.full = null;
  this._size.wOutBlocksPart = null;

  //this.__creator.prototype.setSize.call(this, new goog.math.Size(400, 180));
  this.setContent();
  this._listenersLinks = {};


}).__assoc({
  LINK_EXPAND: 1,
  LINK_COLLAPSE: 2
}).__fuse({

  _blocksContainer: null,
  _labelBlocks: null,
  _blocksLinks: null,
  _separator: null,
  _labelDatetime: null,
  _labelEvent: null,
  _inputSubject: null,
  _buttonCreate: null,

  _afterSeparator: null,

  _listenersLinks: null,

  _blocksPartVisible: true,

  clearInputValue: function InfoTip_clearInputValue() {
    this.setInputValue("");
  },

  getInputName: function CalendarEventPopUpBox_getInputName() {
    return this._inputSubject["value"];
  },

  setBlockOptions: function InfoTipCreating_setBlockOptions(aOptions) {

    var L = rflect.loc.cal.InfoTipCreating;

    var LINK_EXPAND = rflect.cal.InfoTipCreating.LINK_EXPAND;
    var LINK_COLLAPSE = rflect.cal.InfoTipCreating.LINK_COLLAPSE;

    var options = {
      expand: [],
      collapse: []
    };

    var expandPresent = false;
    var collapsePresent = false;

    var counter = 0;
    var str = "";

    var t1 = L("expand");
    var t2 = L("collapse");
    var t3 = " (";
    var t4 = ", ";
    var t5 = ") ";
    var t6 = " / ";

    var listenerKey = "";

    var container = null;

    // This states signalizes
    //  whether listener is in "true" mode,
    //  i.e., doing what his name suggests
    var linkExpState = true;
    var linkCollState = true;

    function sort(a, b) {
      return a > b ? 1 : (a < b ? -1 : 0);
    }

    function makeLink(aType) {

      var indexes = null;
      var id = "";
      var label = "";
      var link = null;
      var command = "";

      var labelStraight = "";
      var labelInverse = "";
      var commandStraight = "";
      var commandInverse = "";
      var state = false;

      var key = "";

      switch (aType) {

        case LINK_EXPAND: {
          indexes = options.expand;
          id = "link_expand";
          labelStraight = t1;
          labelInverse = t2;
          commandStraight = "commandExpand";
          commandInverse = "commandCollapse";
          state = linkExpState;
        };break;
        case LINK_COLLAPSE: {
          indexes = options.collapse;
          id = "link_collapse";
          labelStraight = t2;
          labelInverse = t1;
          commandStraight = "commandCollapse";
          commandInverse = "commandExpand";
          state = linkCollState;
        };break;
        default: break;

      }

      //indexes.sort(sort);

      str = t3;
      for (counter = 0; counter < indexes.length; counter++) {
        // We need to display index started from 1
        str += (indexes[counter] + 1) + t4;
      }
      str = str.slice(0, -t4.length);
      str += t5;

      link = goog.dom.$dom("a", {
        id: id,
        href: "javascript:undefined"
      },
              labelStraight,
              str);

      key = goog.events.listen(link, "click", function(aEvent) {

        //echo("aType: " + aType);
        //echo("state: " + state);

        if (this.dispatchEvent({
          type: "commandChangeCapacity",
          linkType: aType,
          command: state
        })) {
          state = !state;
          aEvent.currentTarget.firstChild.nodeValue
                  = state ? labelStraight : labelInverse
        }
        ;

      }, false, this);

      this._listenersLinks[key] = true;

      container.appendChild(link);

    }
    
    goog.object.extend(options, aOptions);

    expandPresent = options.expand.length > 0;
    collapsePresent = options.collapse.length > 0;

    if (expandPresent || collapsePresent) {

      this.enableBlocksPart(true);

      // Erase previous link listeners
      for (listenerKey in this._listenersLinks) {

        goog.events.unlistenByKey(listenerKey);

      }
      ;

      container = this._blocksLinks.firstChild;

      goog.dom.removeChildren(container);

      if (expandPresent) {

        goog.bind(makeLink, this, LINK_EXPAND)();

      }
      ;

      if (expandPresent && collapsePresent) {
        container.appendChild(goog.dom.createTextNode(t6));
      }
      ;

      if (collapsePresent) {

        goog.bind(makeLink, this, LINK_COLLAPSE)();

      }
      ;

    } else {

      this.enableBlocksPart(false);

    }
    ;

  },

  setContent: function InfoTip_setContent() {

    var L = rflect.loc.cal.InfoTipCreating;

    var classIEFont = " ieFont";

    var content = null;

    content = "<table cellspacing=\"4\"><tbody><tr id=\"blocks_container\"><td id=\"blocks_label\">Блоки:</td><td id=\"blocks_links\"><b><a id=\"link_expand\" href=\"javascript:undefined\">Раздвинуть(1,2,4)</a> / <a id=\"link_collapse\" href=\"javascript:undefined\">Сдвинуть(5,6)</a></b></td></tr><tr id=\"separator_from_blocks\"><td colspan=\"2\"><div class=\"bubbleSeparator\" style=\"border-top: 1px solid #112ABB; margin-top: 5px; height: 3px; width: 100%;\"/></td></tr><tr><td colspan=\"2\"><font size=\"-1\" id=\"datetime_label\">2008-07-10E00:00:00-2008-07-19G00:00:00</font><p></td></tr><tr><td id=\"event_label\">Мероприятие:</td><td id=\"tip_input\"><div style=\"overflow: auto;\"><div style=\"overflow: hidden;\"><input class=\"\" id=\"cal_event_name_input\" size=\"35\" name=\"cal_event_subject\"></div></div></td></tr><tr><td colspan=\"2\"><input type=\"button\" value=\"Создать событие\" id=\"cal_event_create_btn\"></td></tr></tbody></table>";
    this.__creator.prototype.setContent.call(this, content);

    this._blocksContainer = goog.dom.$("blocks_container");
    this._labelBlocks = goog.dom.$("blocks_label");
    this._blocksLinks = goog.dom.$("blocks_links");
    this._separator = goog.dom.$("separator_from_blocks");
    this._labelDatetime = goog.dom.$("datetime_label");
    this._labelEvent = goog.dom.$("event_label");
    this._inputSubject = goog.dom.$("cal_event_name_input");
    this._buttonCreate = goog.dom.$("cal_event_create_btn");

    goog.dom.setTextContent(this._labelBlocks, L("Blocks:"));
    goog.dom.setTextContent(this._labelEvent, L("Event:"));
    this._buttonCreate["value"] = L("Create event");

    this._afterSeparator = goog.dom.getNextElementSibling(this._separator);

    if (goog.userAgent.IE){

      this._blocksContainer["className"] += classIEFont;
      this._labelEvent["className"] += classIEFont;
      this._inputSubject["className"] += classIEFont;
      this._buttonCreate["className"] += classIEFont;

    }

    this.enableBlocksPart(false);

    //echo("InfoTipCreating setContent");
    //echo("this._container.childNodes[0]:" + this._container.childNodes[0]);

    this.listen(this._buttonCreate, "click", function CalendarEventPopUpBox_onLinkToEditorClick(aEvent) {
      //echo("clicked button");
      this.dispatchEvent({type: "submit"});
    });
    this.listen(this._box, "mousedown", function InfoTipCreating__onMouseDownBox(aEvent) {
      this.dispatchEvent({type: "mousedown"});
    });
  },

  setInputValue: function InfoTip_setInputValue(aText) {
    this._inputSubject["value"] = aText;
  },

  setDateTime: function InfoTip_setCaption(aStartDateTime, aEndDateTime) {

    this._labelDatetime.innerHTML =
    aStartDateTime.toFormattedString("ddd, d MMM yyyy HH:mm") + " - " +
    aEndDateTime.toFormattedString("ddd, d MMM yyyy HH:mm");

  },

  show: function InfoTipCreating_show(aShow) {

    if (this._visible != aShow) {
      this.__creator.prototype.show.call(this, aShow);
      if (aShow) {
        this.updateSize();
      }

    }

  },

  enableBlocksPart: function InfoTipCreating_showBlocksPart(aEnable) {

    //echo("showBlocksPart called: " + aEnable);

    if (!(this._blocksPartVisible == aEnable)) {

      if (this._blocksPartVisible = aEnable) {
        goog.dom.insertSiblingBefore(this._separator, this._afterSeparator);
        goog.dom.insertSiblingBefore(this._blocksContainer, this._separator);

      } else {
        //echo("hide");
        goog.dom.removeNode(this._blocksContainer);
        goog.dom.removeNode(this._separator);

      }

      this.updateSize();

    }

  },

  updateSize: function InfoTipCreating_updateSize() {

    if (this._visible) {

      if (this._blocksPartVisible) {

        if (this._size.full == null)
          this._size.full = goog.style.getBorderBoxSize(this._container.firstChild);

        this.setSizeByContent(this._size.full);

      } else {

        if (this._size.wOutBlocksPart == null)
          this._size.wOutBlocksPart = goog.style.getBorderBoxSize(this._container.firstChild);

        this.setSizeByContent(this._size.wOutBlocksPart);

      }

    }

  }
});
