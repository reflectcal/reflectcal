goog.provide("rflect.cal.InfoTipChanging");

goog.require("goog.dom");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.events.KeyCodes");
goog.require("rflect.datetime.DateTime");
goog.require("goog.userAgent");

goog.require("rflect.cal.InfoTip");
goog.require("rflect.cal.CalendarEvent");

goog.require("rflect.loc.cal.InfoTipChanging");

rflect.cal.InfoTipChanging =
rflect.cal.InfoTip.__create(function(aInfoTipChangingOptions) {

  var infoTipChangingOptions = {
    panel: null,

    size: goog.userAgent.IE
            ? new goog.math.Size(400, 280)
            : new goog.math.Size(400, 280)
  };

  goog.object.extend(infoTipChangingOptions, aInfoTipChangingOptions);

  this.__creator.call(this, infoTipChangingOptions);

  this._size.exp = null;
  this._size.coll = null;

  this.setContent();

}).__fuse({

  _labelSubject: null,
  _labelDateTime: null,
  _tableEditorColl: null,
  _linkChange: null,
  _linkDelete: null,
  _tableEditorExp: null,
  _labelName: null,
  _inputName: null,
  _labelStart: null,
  _inputStartDate: null,
  _inputStartHours: null,
  _inputStartMins: null,
  _labelEnd: null,
  _inputEndDate: null,
  _inputEndHours: null,
  _inputEndMins: null,
  _buttonApply: null,
  _buttonCancel: null,

  _editModeEnabled: true,

  _initialCalEvent: null,

  /*pointTo: function InfoTipChanging_pointTo(){

  },*/

  setCalendarEvent: function(aCalendarEvent) {

    var tmp = 0;

    var startDateTime = aCalendarEvent.getStart();
    var endDateTime = aCalendarEvent.getEnd();

    this._initialCalEvent = aCalendarEvent;

    this._labelSubject.innerHTML = aCalendarEvent.name == ""
            ? rflect.cal.CalendarEvent.DEFAULT_NONAME_STRING
            : aCalendarEvent.name;

    this._labelDateTime.innerHTML =
    startDateTime.toFormattedString("ddd, d MMM yyyy HH:mm") + " - " +
    endDateTime.toFormattedString("ddd, d MMM yyyy HH:mm");

    this._inputName["value"] = aCalendarEvent.name;
    this._inputStartDate["value"] = startDateTime.toFormattedString("yyyy-MM-dd");
    this._inputStartHours["value"] = (tmp = startDateTime.getHours()) < 10 ? "0" + tmp : tmp;
    this._inputStartMins["value"] = (tmp = startDateTime.getMinutes()) < 10 ? "0" + tmp : tmp;
    this._inputEndDate["value"] = endDateTime.toFormattedString("yyyy-MM-dd");
    this._inputEndHours["value"] = (tmp = endDateTime.getHours()) < 10 ? "0" + tmp : tmp;
    this._inputEndMins["value"] = (tmp = endDateTime.getMinutes()) < 10 ? "0" + tmp : tmp;

  },

  show: function InfoTipChanging_show(aShow) {

    if (this._visible != aShow) {
      this.__creator.prototype.show.call(this, aShow);
      if (aShow) {
        this.enableEditMode(false);
      }

    }

  },

  getCalendarEvent: function() {

    var calEvent = this._initialCalEvent.clone();

    var name = null;
    var startDateTime = null;
    var endDateTime = null;

    var dateParseRE = /^\D*(\d+)\D+(\d+)\D+(\d+)\D?$/;

    var year = 0;
    var month = 0;
    var day = 0;

    function parseDateTime(aInitialDateTime, aDate, aHours, aMinutes) {

      var parsedDate = dateParseRE.exec(aDate);
      var hours = goog.parseInt(aHours);
      var minutes = goog.parseInt(aMinutes);

      var dateTime = aInitialDateTime.clone();

      if (parsedDate.length == 4) {

        if (rflect.datetime.DateTime.validateYear(year = +parsedDate[1])) {
          if (rflect.datetime.DateTime.validateMonth(month = +parsedDate[2] - 1)) {
            if (rflect.datetime.DateTime.validateDay(day = +parsedDate[3],
                    year, month))
              dateTime.setFullYear(year, month, day);
            dateTime.setMonth(month);
            dateTime.setDate(day);
          }
        }

      }

      if (!isNaN(hours) && (hours >= 0) && (hours <= 24))
        dateTime.setHours(hours);
      if (!isNaN(minutes) && (minutes >= 0) && (minutes <= 59))
        dateTime.setMinutes(minutes);

      return dateTime;

    }

    name = this._inputName["value"];
    startDateTime = parseDateTime(
            this._initialCalEvent.getStart(),
            this._inputStartDate["value"],
            this._inputStartHours["value"],
            this._inputStartMins["value"]);
    endDateTime = parseDateTime(
            this._initialCalEvent.getEnd(),
            this._inputEndDate["value"],
            this._inputEndHours["value"],
            this._inputEndMins["value"]);

    calEvent.name = name;
    if (startDateTime.compare(endDateTime) <= 0) {
      calEvent.setStart(startDateTime);
      calEvent.setEnd(endDateTime);
    }

    return !calEvent.equals(this._initialCalEvent) ? calEvent : null;

  },

  enableEditMode: function(aEditModeEnabled) {

    if (!(this._editModeEnabled == aEditModeEnabled)) {
      if (this._editModeEnabled = aEditModeEnabled) {

        goog.style.showElement(this._tableEditorColl, false);
        goog.style.showElement(this._tableEditorExp, true);

      } else {

        goog.style.showElement(this._tableEditorColl, true);
        goog.style.showElement(this._tableEditorExp, false);

      }

      this.updateSize();

    }
  },

  setContent: function InfoTip_setContent() {

    var L = rflect.loc.cal.InfoTipChanging;

    var classIEFont = " ieFont";

    var content = "<div><table cellspacing=\"4\"><tr><td colspan=\"2\"><div style=\"overlow-x: hidden; white-space: nowrap;\"><font size=\"+1\" id=\"label_subject\"></font></div><p id=\"sp_line1\"></td></tr><tr><td colspan=\"2\"><font size=\"-1\" id=\"label_datetime\"></font><p id=\"sp_line2\"></td></tr><table id=\"table_editor_coll\"><tr><td><div>[<a href=\"javascript:void(0)\" id=\"link_event_change\"></a>]</div></td></tr><tr><td><div>[<a href=\"javascript:void(0)\" id=\"link_event_del\"></a>]</div></td></tr></table><table id=\"table_editor_exp\"><tr><td id=\"label_name\"></td><td colspan=\"2\"><input id=\"input_name\" size=\"35\"/></td></tr><tr><td id=\"label_start\"></td><td><input id=\"input_start_date\" size=\"20\"/><span>&nbsp;</span><input id=\"input_start_hours\" size=\"4\"/><span>:</span><input id=\"input_start_mins\" size=\"4\"/></td></tr><tr><td id=\"label_end\"></td><td><input id=\"input_end_date\" size=\"20\"/><span>&nbsp;</span><input id=\"input_end_hours\" size=\"4\"/><span>:</span><input id=\"input_end_mins\" size=\"4\"/></td></tr><tr><td><input type=\"button\" id=\"cal_event_changes_apply\"/></td><td><input type=\"button\" id=\"cal_event_changes_cancel\"/></td></tr></table></table></div>";

    this.__creator.prototype.setContent.call(this, content);

    this._labelSubject = goog.dom.$("label_subject");
    this._labelDateTime = goog.dom.$("label_datetime");

    this._tableEditorColl = goog.dom.$("table_editor_coll");
    this._linkChange = goog.dom.$("link_event_change");
    this._linkDelete = goog.dom.$("link_event_del");

    this._tableEditorExp = goog.dom.$("table_editor_exp");
    this._labelName = goog.dom.$("label_name");
    this._inputName = goog.dom.$("input_name");
    this._labelStart = goog.dom.$("label_start");
    this._inputStartDate = goog.dom.$("input_start_date");
    this._inputStartHours = goog.dom.$("input_start_hours");
    this._inputStartMins = goog.dom.$("input_start_mins");
    this._labelEnd = goog.dom.$("label_end");
    this._inputEndDate = goog.dom.$("input_end_date");
    this._inputEndHours = goog.dom.$("input_end_hours");
    this._inputEndMins = goog.dom.$("input_end_mins");

    this._buttonApply = goog.dom.$("cal_event_changes_apply");
    this._buttonCancel = goog.dom.$("cal_event_changes_cancel");

    goog.dom.setTextContent(this._linkChange, L("Change event"));
    goog.dom.setTextContent(this._linkDelete, L("Delete event"));
    goog.dom.setTextContent(this._labelName, L("Subject:"));
    goog.dom.setTextContent(this._labelStart, L("Begins:"));
    goog.dom.setTextContent(this._labelEnd, L("Ends:"));
    this._buttonApply["value"] = L("OK");
    this._buttonCancel["value"] = L("Cancel");

    if (goog.userAgent.IE){
      this._linkChange["className"] += classIEFont;
      this._linkDelete["className"] += classIEFont;
      goog.dom.$("sp_line1")["className"] += classIEFont;
      goog.dom.$("sp_line2")["className"] += classIEFont;
      this._buttonApply["className"] += classIEFont;
      this._buttonCancel["className"] += classIEFont;
      this._labelName["className"] += classIEFont;
          this._inputName["className"] += classIEFont;
          this._labelStart["className"] += classIEFont;
          this._inputStartDate["className"] += classIEFont;
          this._inputStartHours["className"] += classIEFont;
          this._inputStartMins["className"] += classIEFont;
          this._labelEnd["className"] += classIEFont;
          this._inputEndDate["className"] += classIEFont;
          this._inputEndHours["className"] += classIEFont;
          this._inputEndMins["className"] += classIEFont;

    }

    goog.style.showElement(this._tableEditorExp, false);

    this.listen(this._box, "mousedown", function(aEvent) {
      echo("mousedown: ", 1);
      this.dispatchEvent({type: "mousedown"});
      //aEvent.preventDefault();
    });
    this.listen(this._linkDelete, "click", function(aEvent) {
      this.dispatchEvent({type: "clickDeleteLink"});
      aEvent.preventDefault();
    });
    this.listen(this._linkChange, "click", function(aEvent) {
      this.enableEditMode(true);
      aEvent.preventDefault();
    });
    this.listen(this._buttonApply, "click", function(aEvent) {

      var changeOptions = this.getCalendarEvent();

      this.dispatchEvent({
        type: "submit",
        changeOptions: changeOptions
      });
      aEvent.preventDefault();
    });
    this.listen(this._buttonCancel, "click", function() {
      this.enableEditMode(false);
    });
    //goog.events.listen(document, "keyup", this._onKeyUpDocument, false, this);
  },

  updateSize: function InfoTipChanging_updateSize() {

    if (this._visible) {

      if (this._editModeEnabled) {

        if (this._size.exp == null)
          this._size.exp = goog.style.getBorderBoxSize(this._container.firstChild);

        this.setSizeByContent(this._size.exp);

      } else {

        if (this._size.coll == null)
          this._size.coll = goog.style.getBorderBoxSize(this._container.firstChild);

        this.setSizeByContent(this._size.coll);

      }

    }

  }

});
