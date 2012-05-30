goog.provide("rflect.cal.TimeGrid");

goog.require("rflect.Root");
goog.require("goog.object");
goog.require("rflect.datetime.Timeprocessor");

rflect.cal.TimeGrid =
rflect.Root.__create(function TimeGrid_Constructor(aTimeGridOptions) {

  this._timeprocessor = rflect.datetime.Timeprocessor.get();

  if (arguments.length > 0) {
    this.recalculate(aTimeGridOptions);
  }


}).__assoc({

  // These modes describe how
  //  to get value from TimeGrid

  /**
   * This mode shows that lookup
   *  should be made in both hourGrid
   *  and dayGrid
   * @type {number}
   */

  DISPLAY_TYPE_DAY: 20,

  /**
   * This mode shows that lookup
   *  should be made in dayGrid only
   * @type {number}
   */

  DISPLAY_TYPE_MONTH : 21,

  Units: {
    PERCENTS: 2,
    PIXELS: 3,
    EX: 4
  },
  DAY_END_TIME_IN_MINUTES: 1440,
  WEEK_END_TIME_IN_MINUTES: 10080,

  HOUR_GRID: 0x1,
  DAY_GRID: 0x2,
  CELL_GRID: 0x4,

  _hashIDCounter: 0,

  resetHashIDCounter: function() {
    rflect.cal.TimeGrid._hashIDCounter = 0;
  }

}).__fuse({

  _timeprocessor: null,

  _viewDisplayType: 0,

  _gridType: 0,

  // Intersection-based grid
  _xGrid: null,
  _xGridInverse: null,
  _yGrid: null,
  _yGridInverse: null,

  // Cell-based grid
  _grid: null,
  _gridInverse: null,

  _inverseTimeGrid: {},

  getCellGrid: function() {
    return this._grid;
  },

  _getEndDateTime: function TimeGrid_getEndDateTime() {

    var end = null;

    switch (this._viewDisplayType) {
      case rflect.cal.TimeGrid.DISPLAY_TYPE_DAY:{
        // We need substract 2 from this._hourGrid length,
        //  because we have fictive 24 hour at last position,
        //  and if this.getTimeByIndexes gets endDateTime
        //  from hourGrid, it automatically add 1 to index
        end = this.getTimeByIndexes(this._dayGrid[0].length - 1,
                this._hourGrid.length - 2,
                false);
      };break;
      case rflect.cal.TimeGrid.DISPLAY_TYPE_MONTH:{
        end = this.getTimeByIndexes(this._dayGrid[0].length - 1,
                this._dayGrid.length - 1, false);
      };break;
      default:break;
    }

    return end;
  },

  getEndDateTime: function TimeGrid_getEndDateTime() {

    return this._getEndDateTime();

  },

  getExclusiveEndDateTime: function TimeGrid_getEndDateTime() {

    return this._getEndDateTime();

  },

  getInclusiveEndDateTime: function TimeGrid_getEndDateTime() {
    return this._getEndDateTime().addMilliseconds(-1);
  },

  getInverseCellGrid: function() {
    return this._gridInverse;
  },

  getItemsForCalendarEvent: function(aCalendarEvent, aGhost) {

    // Event start
    var start = null;
    // Event end
    var end = null;
    // Event real inclusive end
    var inclusiveEnd = null;

    var timeKeyFormat = "yyyy-M-d";
    var timeKey = "";

    var items = {};

    // Time of event start relative
    // to block start, in minutes
    var startTimeInBlock = 0;
    // Time of event start relative
    // to event start day, in minutes
    var startTimeInDay = 0;
    // Event start hour
    var startHour = 0;
    // Event start minute
    var startMinute = 0;
    // Offset which should be
    //  added to startTimeInDay
    //  to get startTimeInBlock
    //  It is zero when block has
    //  size of day
    //  and n*1440 when block has size
    //  of week, where n is week day
    //  number in current locale
    var startBlockOffset = 0;

    // Time of event end relative
    // to block start, in minutes
    var endTimeInBlock = 0;
    // Time of event start relative
    // to event end day, in minutes
    var endTimeInDay = 0;
    // Event end hour
    var endHour = 0;
    // Event end minute
    var endMinute = 0;
    // Offset which should be
    //  added to endTimeInDay
    //  to get endTimeInBlock
    //  It is zero when block has
    //  size of day
    //  and n*1440 when block has size
    //  of week, where n is week day
    //  number in current locale
    var endBlockOffset = 0;

    var startIndex = 0;
    var endIndex = 0;
    // Flag shows whether item startIndex
    //  is a result of event had been cropped at start
    //  to fit current timegrid.
    var startCropped = false;
    // Flag shows whether item endIndex
    //  is a result of event had been cropped at start
    //  to fit current timegrid.
    var endCropped = false;

    var counter = 0;

    var dayEndTime = 0;
    var blockEndTime = 0;

    var gridDepth = 0;
    var gridInverse = this._dayGridInverse;

    var cellBasedGrid = this._viewDisplayType
            == rflect.cal.TimeGrid.DISPLAY_TYPE_MONTH;

    var ghost = aGhost == undefined ? false : aGhost;

    start = aCalendarEvent.getStart();
    end = aCalendarEvent.getEnd();
    inclusiveEnd = aCalendarEvent.getInclusiveEnd();
    dayEndTime = 24 * 60;

    if (cellBasedGrid) {

      startBlockOffset = start.localeDay * 1440;

      blockEndTime = rflect.cal.TimeGrid.WEEK_END_TIME_IN_MINUTES;
      endBlockOffset = inclusiveEnd.localeDay * 1440;
      gridDepth = this._dayGrid.length;

    } else {

      blockEndTime = rflect.cal.TimeGrid.DAY_END_TIME_IN_MINUTES;
      gridDepth = this._dayGrid[0].length;

    }

    // Preparing start item
    //timeKey = start.toFormattedString(timeKeyFormat);
    timeKey = start.year
            + "-" + start.month
            + "-" + start.date;
    //echo("start timeKey: " + timeKey);

    if (timeKey in gridInverse) {

      startIndex = cellBasedGrid
              ? gridInverse[timeKey][0]
              : gridInverse[timeKey][1];
      startHour = start.hours;
      startMinute = start.minutes;
      startTimeInDay = startHour * 60 + startMinute;
      startTimeInBlock = startBlockOffset + startTimeInDay;

    } else {

      startIndex = 0;
      startHour = 0;
      startMinute = 0;
      startTimeInDay = 0;
      startCropped = true;
      startTimeInBlock = 0;

    }
    ;

    /*echo("startHour: " + startHour );
    echo("startMinute: " + startMinute);
    echo("startTimeInDay: " + startTimeInDay);
    echo("startCropped: " + startCropped);

    echo("startIndex: " + startIndex);
    echo("startTimeInBlock: " + startTimeInBlock);
    */

    items[startIndex] = {
      startHour: startHour,
      startMinute: startMinute,
      startTimeInDay: startTimeInDay,
      startTimeInBlock: startTimeInBlock
    };

    // Preparing end item
    //timeKey = inclusiveEnd.toFormattedString(timeKeyFormat);
    timeKey = inclusiveEnd.year
            + "-" + inclusiveEnd.month
            + "-" + inclusiveEnd.date;
    //echo("end timeKey: " + timeKey);

    if (timeKey in gridInverse) {

      endIndex = cellBasedGrid
              ? gridInverse[timeKey][0]
              : gridInverse[timeKey][1];
      endHour = inclusiveEnd.hours;
      endMinute = inclusiveEnd.minutes;
      endTimeInDay = endHour * 60 + endMinute;
      endTimeInBlock = endBlockOffset + endTimeInDay;

    } else {

      endIndex = gridDepth - 1;
      endHour = 24;
      endMinute = 0;
      endTimeInDay = endHour * 60 + endMinute;
      endCropped = true;
      endTimeInBlock = blockEndTime;

    }


    /*echo("endHour: " + endHour );
    echo("endMinute: " + endMinute);
    echo("endTimeInDay: " + endTimeInDay);
    echo("endCropped: " + endCropped);

    echo("endIndex: " + endIndex);
    echo("endTimeInBlock: " + endTimeInBlock);
    */

    if (!(endIndex in items)) {
      items[endIndex] = {};
    }

    items[endIndex]["endHour"] = endHour;
    items[endIndex]["endMinute"] = endMinute;
    items[endIndex]["endTimeInDay"] = endTimeInDay;
    items[endIndex]["endTimeInBlock"] = endTimeInBlock;

    // If item is only one
    if (startIndex == endIndex) {

      // Other item fields
      if (!ghost) {

        items[startIndex]["hashID"] = ++rflect.cal.TimeGrid._hashIDCounter;
        items[startIndex]["eventHashID"] = aCalendarEvent.hashID;
        items[startIndex]["name"] = aCalendarEvent.name;

      }
      // Item type is only inportant for cell-based
      //  grid which appears in month mode
      //  By default it is set to OVERLAPING_CELL type
      items[startIndex]["nestType"] = 1;

      // Override nestType if needed
      if (cellBasedGrid) {
        if (!startCropped && !endCropped) {
          //if ((startTimeInDay > 0) || (endTimeInDay < dayEndTime)) {
          if (start.day == end.day) {

            // This is the case of IN_CELL item type
            //echo("start.getLocaleDay(): " + start.getLocaleDay());
            //echo("startBlockOffset: " + startBlockOffset);
            //echo("startBlockOffset" +
            //" + dayEndTime: " + (startBlockOffset
            //   + dayEndTime));


            items[startIndex]["startTimeInBlock"] = startBlockOffset;
            // A -1 hack is needed because IN_CELL event is longer in time
            //  than all-day event, but for sorting we need opposite.
            items[startIndex]["endTimeInBlock"] = startBlockOffset
                    + dayEndTime - 1;
            items[startIndex]["nestType"] = 2;

          }
        }
      }


    } else {
      // If there are several items,
      // preparing items between start item and end item
      for (counter = endIndex; counter >= startIndex; counter--) {

        // Brand new item is created
        if (!(counter in items)) {
          items[counter] = {

            startHour: 0,
            startMinute: 0,
            startTimeInDay: 0,
            startTimeInBlock: 0,

            endHour: 24,
            endMinute: 0,
            endTimeInDay: dayEndTime,
            endTimeInBlock: blockEndTime

          };
        } else {

          // Item is present though without startTimeInBlock
          if (!("startTimeInBlock" in items[counter])) {

            items[counter]["startHour"] = 0;
            items[counter]["startMinute"] = 0;
            items[counter]["startTimeInDay"] = 0;
            items[counter]["startTimeInBlock"] = 0;

          }
          ;

        // Item is present thoogh without endTimeInBlock
          if (!("endTimeInBlock" in items[counter])) {

            items[counter]["endHour"] = 24;
            items[counter]["endMinute"] = 0;
            items[counter]["endTimeInDay"] = dayEndTime;
            items[counter]["endTimeInBlock"] = blockEndTime;

          }
          ;
        }

        if (!ghost) {

          // Other item fields
          items[counter]["hashID"] = ++rflect.cal.TimeGrid._hashIDCounter;
          items[counter]["eventHashID"] = aCalendarEvent.hashID;
          items[counter]["name"] = aCalendarEvent.name;

        }
        // Item type is only inportant for cell-based
        //  grid which apperas in month mode
        //  By default it is set to OVERLAPING_CELL type
        items[counter]["nestType"] = 1;


      }
      ;

    }

    return items;

  },

  getStartDateTime: function TimeGrid_getStartDateTime() {

    return this.getTimeByIndexes(0, 0, true);

  },

  getTimeByIndexes: function(aX, aY, aStart) {

    var dateTime = null;
    var hour = 0;
    var minute = 0;
    var timeVector = "";
    var y = 0;
    var start = (aStart == undefined) ? true : aStart;
    var dateTimeConf = {};

   //echo("start: " + start);

    dateTime = (new rflect.datetime.DateTime()).clearTime();

    switch (this._viewDisplayType) {
      case rflect.cal.TimeGrid.DISPLAY_TYPE_DAY:{

        y = (start) ? aY : aY + 1;

        goog.object.extend(dateTimeConf, this._hourGrid[y], this._dayGrid[0][aX]);

        if (dateTimeConf.hour == 24) {

          dateTime.set({
            year: dateTimeConf.year,
            month: dateTimeConf.month,
            day: dateTimeConf.day
          }).addDays(1);

        } else {
          dateTime.set(dateTimeConf);
        }

       //echo("dateTime: " + dateTime);

      };break;
      case rflect.cal.TimeGrid.DISPLAY_TYPE_MONTH:{

        dateTime.set(this._dayGrid[aY][aX]);

        if (!start) {
          dateTime.addDays(1);
        }

      };break;
      default:break;
    }

    return dateTime;
  },

  getHourGrid: function() {
    return this._hourGrid;
  },

  getHourGridInverse: function() {
    return this._hourGridInverse;
  },

  getDayGrid: function() {
    return this._dayGrid;
  },

  getDayGridInverse: function() {
    return this._dayGridInverse;
  },

  recalculate: function(aTimeGridOptions) {

    var timeGridOptions = {
      columnsQuantity: 0,
      rowsQuantity: 0,
      startDateTime: null,
      timeKeyFormat: "yyyy:M:d",
      recalculate: 0,
      viewDisplayType: 0
    };

    var startDateTime = null;

    var daysNumber = 0;

    goog.object.extend(timeGridOptions, aTimeGridOptions);

    // Set view display type
    this._viewDisplayType = timeGridOptions.viewDisplayType;

    if (!(timeGridOptions.startDateTime == null)) {
      startDateTime = timeGridOptions.startDateTime.clearTime();
     //echo("startDateTime1: " + startDateTime);
    }

    this._gridType = 0;

    // Composing x-grid  and inverse x-grid
    if (!((timeGridOptions.recalculate & 0x1 ) == 0)) {

      this._gridType = this._gridType | 0x1;
      this._calculateHourGrid(timeGridOptions.rowsQuantity);

    }
    ;

    // Composing y-grid and inverse y-grid
    if (!((timeGridOptions.recalculate & 0x2 ) == 0)) {

      daysNumber = timeGridOptions.columnsQuantity *
                   ((timeGridOptions.viewDisplayType
                           == rflect.cal.TimeGrid.DISPLAY_TYPE_MONTH)
                           ? timeGridOptions.rowsQuantity
                           : 1);

      this._gridType = this._gridType | 0x2;
      this._calculateDayGrid({
        year: timeGridOptions.startDateTime.getFullYear(),
        month: timeGridOptions.startDateTime.getMonth(),
        day: timeGridOptions.startDateTime.getDate()
      }, daysNumber);

    }
    ;

  },

  _calculateHourGrid: function Calendar__calculateHourGrid(
          aVerticalElementsNumber) {

    this._hourGrid = [];
    this._hourGridInverse = [];
    for (var counter = 0, counterHours = 0, counterMinutes = 0;
         counter < aVerticalElementsNumber;
         counter++,
                 counterHours =
                 ((counter) % 2 == 0) ? counterHours + 1 : counterHours,
                 counterMinutes = ((counter) % 2 == 0) ? 0 : 30) {
      this._hourGrid.push({
        hour: counterHours,
        minute: counterMinutes});
      this._hourGridInverse[counterHours.toString() + ":"
              + counterMinutes.toString()]
              = counter;
    }

      // Fictive 24 hour
    this._hourGrid.push({
      hour: 24,
      minute: 0});

    this._startHour = this._hourGrid[0];
    this._endHour = this._hourGrid[this._hourGrid.length - 1];
    inspect("_hourGrid", this._hourGrid);
    inspect("_hourGridInverse", this._hourGridInverse);

  },

  _calculateDayGrid: function Calendar__calculateDayGrid(aStartDay,
                                                         aDaysNumber) {

    //echo("aDaysNumber: " + aDaysNumber);

    var endDay = null;
    this._dayGrid = [];
    this._dayGridInverse = {};
    var dayOfWeek = 0;
    var days = this._timeprocessor.getNumberOfDaysFromGiven(aStartDay, aDaysNumber);
    for (var counter = 0, counterWeeks = 0;
         counter < aDaysNumber; counter++,
            counterWeeks =
            ((counter) % 7 == 0) ? counterWeeks + 1 : counterWeeks) {
      if (this._dayGrid[counterWeeks] == undefined) {
        this._dayGrid.push([]);
        dayOfWeek = 0;
      }
      this._dayGrid[counterWeeks].push(endDay = days[counter]);
      this._dayGridInverse[
              days[counter].year
                      + "-" + days[counter].month
                      + "-" + days[counter].day] = [counterWeeks, dayOfWeek];
      dayOfWeek++;
    }
    this._endDay = endDay;
    inspect("_dayGrid", this._dayGrid);
    inspect("_dayGridInverse", this._dayGridInverse);
  }


});