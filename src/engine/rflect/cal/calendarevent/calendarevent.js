goog.provide("rflect.cal.CalendarEvent");

goog.require("rflect.Root");
goog.require("goog.object");
goog.require("goog.json");
goog.require("rflect.datetime.DateTime");
goog.require("rflect.datetime.Interval");

goog.require("rflect.loc.cal.CalendarEvent");

rflect.cal.CalendarEvent =
rflect.datetime.Interval.__create(function CalendarEvent_Constructor(var_arg) {

  var calEventOptions = {
    startDateTime: null,
    endDateTime: null,
    _id: "",
    _descriptionID: "",
    type: 0,
    name: "",
    hashID: 0
  };

  switch (goog.typeOf(var_arg)) {
    case "string": {
      this.fromJSONString(var_arg);
    };break;
    case "array": {
      this.fromVector(var_arg);
    };break;
    case "object": {
      goog.object.extend(calEventOptions, var_arg);

      this.__creator.call(this,
              calEventOptions.startDateTime,
              calEventOptions.endDateTime
              );

      this.name = calEventOptions.name;
      this.type = calEventOptions.type;

      this._id = (!(calEventOptions._id == ""))
              ? calEventOptions._id
              : "";

      this._descriptionID = (!(calEventOptions._descriptionID == ""))
              ? calEventOptions._descriptionID
              : "";

      // This is a situation when we clone event,
      //  so we must copy hashID
      if (calEventOptions.hashID > 0) {
        this.hashID = calEventOptions.hashID;
      } else {
        this.hashID
                = ++rflect.cal.CalendarEvent._hashIDCounter;
      }
    };break;
  }

}).__fuse({

  /**
   *  Whether this instance is in cache mode, in which some methods behave differently.
   *  @type {boolean}
   * */
  cachedMode: false,

  // Database id
  _id: "",
  // Database description id
  _descriptionID: "",
  // Type
  type: 0,
  // Subject
  name: "",
  // Local hash id
  hashID: 0,

  /**
   * Caches inner datetime properties of rflect.datetime.Interval instance, so that after we have
   *  this method called, properties could be accesed directly, avoiding method calls.
   *  To enable this feature, instance should have cacheMode set to true.
   *  This could improve performance when trying to access
   *  properties of large number of objects.
   * @param {number} aPropertiesBitmask Bitmask defining what properties should be cached.
   * @public
   */
  cacheProperties: function CalendarEvent_cacheProperties(aPropsBitmaskStart,
                                                          aPropsBitmaskExclEnd,
                                                          aPropsBitmaskInclEnd) {

    this.__creator.prototype.cacheProperties.call(this);

    this._startDateTime.cacheProperties(aPropsBitmaskStart);
    this._exclusiveEndDateTime.cacheProperties(aPropsBitmaskExclEnd);
    this._inclusiveEndDateTime.cacheProperties(aPropsBitmaskInclEnd);

  },

  clone: function CalendarEvent_clone() {

    return new rflect.cal.CalendarEvent({
      startDateTime: this._startDateTime.clone(),
      endDateTime: this._exclusiveEndDateTime.clone(),
      _id: this._id,
      _descriptionID: this._descriptionID,
      type: this.type,
      name: this.name,
      hashID: this.hashID
    });

  },

  equals: function CalendarEvent_equals(aCalendarEvent) {

    if (!this.__creator.prototype.equals.call(this, aCalendarEvent))
      return false;
    if (this._id != aCalendarEvent.getID())
      return false;
    if (this._descriptionID
            != aCalendarEvent.getDescriptionID())
      return false;
    if (this.type
            != aCalendarEvent.type)
      return false;
    if (this.name
            != aCalendarEvent.name)
      return false;

    return this.hashID == aCalendarEvent.hashID;

  },

  fromJSONString: function CalendarEvent_fromJSONString(aJSONString) {

    var calEventVector = goog.json.parse(aJSONString);
   //echo("aJSONString: " + aJSONString);

    inspect("_calEventVector", calEventVector);

    this.fromVector(calEventVector);

  },

  fromVector: function CalendarEvent_fromJSONString(aVector) {


    inspect("_calEventVector", aVector);
    switch (aVector.length) {
      // There can be other cases,
      //  for example when startDateTime
      //  and endDateTime added separately.
      case 5:{
        this.__creator.prototype.fromJSONString.call(this, aVector[0]);
        this._id = aVector[1];
        this._descriptionID = aVector[2];
        // Type is number
        this.type = +aVector[3];
        this.name = aVector[4];

      };break;
    }

    this.hashID
            = ++rflect.cal.CalendarEvent._hashIDCounter;

  },

  getDescriptionID: function CalendarEvent_getDescriptionID() {
    return this._descriptionID;
  },

  getID: function CalendarEvent_getID() {
    return this._id;
  },

  setDescriptionID: function CalendarEvent_setDescriptionID(aDescriptionID) {
    this._descriptionID = aDescriptionID;
  },

  setID: function CalendarEvent_setID(aID) {
    this._id = aID;
  },

  toJSONString: function CalendarEvent_toJSONString() {

    var jsonRepr = [
      this._startDateTime.toJSONString().slice(1, -1)
              + "/" + this._exclusiveEndDateTime.toJSONString().slice(1, -1),
      this._id,
      this._descriptionID,
      this.type,
      this.name
    ];

    return goog.json.serialize(jsonRepr);

  },

  toString: function CalendarEvent_toString() {

    var str = "";

    str += this.__creator.prototype.toString.call(this);
    str += ", " + this._id;
    str += ", " + this._descriptionID;
    str += ", " + this.type;
    str += ", " + this.name;

    return str;

  }



}).__assoc({

  DEFAULT_NONAME_STRING: rflect.loc.cal.CalendarEvent("(No subject)"),

  _hashIDCounter: 0,

  resetHashIDCounter: function() {
    rflect.cal.CalendarEvent._hashIDCounter = 0;
  }

});