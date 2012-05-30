goog.provide("rflect.datetime.Interval");

goog.require("rflect.Root");
goog.require("goog.json");
goog.require("rflect.datetime.DateTime");

rflect.datetime.Interval =
rflect.Root.__create(function Interval(var_arg, aEnd) {
  if (arguments.length == 1) {
    if (typeof var_arg == "string" && var_arg.length == 35) {
      this.fromJSONString(var_arg);
    }
  }
  else {
    this.setStart(var_arg);
    this.setEnd(aEnd);
  }
  //echo("this._start: " + this._start);
  //echo("this._end: " + this._end);
}).__fuse({

  /**
   *  Whether this instance is in cache mode, in which some methods behave differently.
   *  @type {boolean}
   * */
  cachedMode: false,

  startMillis: 0,
  endMillis: 0,
  exclusiveEndMillis: 0,
  inclusiveEndMillis: 0,

  _startDateTime: 0,
  _exclusiveEndDateTime: 0,
  _inclusiveEndDateTime: 0,

  /**
   * Caches inner datetime properties of rflect.datetime.Interval instance, so that after we have
   *  this method called, properties could be accesed directly, avoiding method calls.
   *  To enable this feature instance should have cacheMode set to true.
   *  This could improve performance when trying to access
   *  properties of large number of objects.
   * @param {number} aPropertiesBitmask Bitmask defining what properties should be cached.
   * @public
   */
  cacheProperties: function Interval_cacheProperties() {

    this._startDateTime.cacheProperties(rflect.datetime.DateTime.TIME);
    this._exclusiveEndDateTime.cacheProperties(rflect.datetime.DateTime.TIME);

  },

  clone: function Interval_clone() {
    return new rflect.datetime.Interval(this._startDateTime, this._exclusiveEndDateTime);
  },

  contains: function Interval_contains(aTimeValue) {
    var thisStart = this.getStartMillis();
    var thisEnd = this.getEndMillis();
    var millisInstant = 0;
    var contains = false;
    if (typeof aTimeValue == "number") {
      millisInstant = aTimeValue;
      contains = ((millisInstant >= thisStart) && (millisInstant < thisEnd));
    } else if (typeof aTimeValue == "object") {
      /*if (aTimeValue instanceof rflect.datetime.Instant) {
        millisInstant = aTimeValue.getMillis();
        contains = ((millisInstant >= thisStart) && (millisInstant < thisEnd));
      } else */
      if (aTimeValue instanceof rflect.datetime.Interval) {
        var otherStart = aTimeValue.getStartMillis();
        var otherEnd = aTimeValue.getEndMillis();
        contains = (thisStart <= otherStart && otherStart < thisEnd && otherEnd <= thisEnd);
      }
    }
    return contains;
  },

  fromJSONString: function Interval_fromJSONString(aJSONString) {
    this._startDateTime = new rflect.datetime.DateTime(aJSONString.slice(0, 17));
    this._exclusiveEndDateTime = new rflect.datetime.DateTime(aJSONString.slice(18, 35));
    this._inclusiveEndDateTime = this._exclusiveEndDateTime.clone().addMilliseconds(-1);
  },

  getEnd: function Interval_getEnd() {
    return this._exclusiveEndDateTime;
  },

  getEndMillis: function Interval_getEndMillis() {
    return this.cachedMode
            ? this._exclusiveEndDateTime.time
            : this._exclusiveEndDateTime.getTime();
  },
  getExclusiveEnd: function Interval_getExclusiveEnd() {
    return this._exclusiveEndDateTime;
  },
  getExclusiveEndMillis: function Interval_getExclusiveEndMillis() {
    return this.cachedMode
            ? this._exclusiveEndDateTime.time
            : this._exclusiveEndDateTime.getTime();
  },
  getInclusiveEnd: function Interval_getInclusiveEnd() {
    return this._inclusiveEndDateTime;
  },
  getInclusiveEndMillis: function Interval_getInclusiveEndMillis() {
    return this.cachedMode
            ? this._inclusiveEndDateTime.time
            : this._inclusiveEndDateTime.getTime();
  },
  getLength: function Interval_getLength() {
    return (this.getEndMillis() - this.getStartMillis());
  },
  getOverlap: function Interval_getOverlap(aInterval) {
    var start = 0;
    var end = 0;
    if (!this.overlaps(aInterval)) {
      return null;
    }
    start = Math.max(this.getStartMillis(), aInterval.getStartMillis());
    //echo("this._start: " + this._start);
    //echo("aInterval.getStartMillis(): " + aInterval.getStartMillis());
    end = Math.min(this.getEndMillis(), aInterval.getEndMillis());
    //echo("this._end: " + this._end);
    //echo("aInterval.getStartMillis(): " + aInterval.getEndMillis());
    return new rflect.datetime.Interval(start, end);
  },
  getStart: function Interval_getStart() {
    return this._startDateTime;
  },
  getStartMillis: function Interval_getStartMillis() {
    return this.cachedMode
            ? this._startDateTime.time
            : this._startDateTime.getTime();
  },
  equals: function Interval_equals(aInterval) {
    return this._startDateTime.equals(aInterval.getStart())
            && this._exclusiveEndDateTime.equals(aInterval.getEnd())
            ;
  },
  overlaps: function Interval_overlaps(aInterval) {

    var thisStart = this.getStartMillis();
    var thisEnd = this.getEndMillis();

    if (aInterval == null) {
      var now = (new rflect.datetime.DateTime()).getTime();
      return (thisStart < now && now < thisEnd);
    } else {
      var otherStart = aInterval.getStartMillis();
      var otherEnd = aInterval.getEndMillis();
      return (thisStart < otherEnd && otherStart < thisEnd);
    }

  },
  setEnd: function Interval_setEnd(aEnd) {
    if (typeof aEnd == "object") {
      /*if (aEnd instanceof rflect.datetime.Instant) {
      this._end = aEnd.getMillis();
    } else */
      if (aEnd instanceof rflect.datetime.DateTime) {
        this._exclusiveEndDateTime = aEnd;
        this._inclusiveEndDateTime = aEnd.clone().addMilliseconds(-1);
      //echo("this._end: " + this._end);
      }
    } else if (typeof aEnd == "number") {
      this._exclusiveEndDateTime = new rflect.datetime.DateTime(aEnd);
      this._inclusiveEndDateTime = (new rflect.datetime.DateTime(aEnd))
              .addMilliseconds(-1);
    }
  },
  setStart: function Interval_setStart(aStart) {
    if (typeof aStart == "object") {
      /*if (aStart instanceof rflect.datetime.Instant) {
      this._start = aStart.getMillis();
    } else */
      if (aStart instanceof rflect.datetime.DateTime) {
        this._startDateTime = aStart;
      //echo("this._start: " + this._start);
      }
    } else if (typeof aStart == "number") {
      this._startDateTime = new rflect.datetime.DateTime(aStart);
    }
  },
  toJSONString: function Interval_toJSONString() {
    return this._startDateTime.toJSONString().slice(0, -1)
            + "/" + this._exclusiveEndDateTime.toJSONString().slice(1);
  },
  // Why it isn't overrided
  toString: function Interval_toString() {
    return this._startDateTime.getISO8601()
            + "/" + this._exclusiveEndDateTime.getISO8601();
  }
}).__assoc({
  START_MILLIS: 0x1,
  END_MILLIS: 0x2,
  EXCLUSIVE_END_MILLIS: 0x2,
  INCLUSIVE_END_MILLIS: 0x4
});

rflect.datetime.Interval.prototype.toString = function Interval_toString() {
  return this._startDateTime.getISO8601()
          + "/" + this._exclusiveEndDateTime.getISO8601();
}