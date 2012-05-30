goog.provide("rflect.datetime.Timeprocessor");

goog.require("rflect.datetime.DateTime");

rflect.datetime.Timeprocessor =
rflect.Root.__create(function Timeprocessor_Constructor() {

}).__assoc({
  DIRECTION_PAST: 1,
  DIRECTION_FUTURE: 2,
  instance: null,
  get: function() {
    return (this.instance == null) ? this.instance = new rflect.datetime.Timeprocessor() : this.instance;
  }
}).__fuse({
  getAbsoluteFromGregorian: function Timeprocessor_getAbsoluteFromGregorian(aYear, aMonth, aDay) {
    var absoluteDayNumber = 0, sumres = 0;
    for (var m = 1; m < aMonth; m++) {
      sumres = sumres + this.getLastDayOfGregorianMonth(m, aYear);
    }
    with (this) {
      absoluteDayNumber = aDay
              + sumres
              + (365 * (aYear - 1))
              + iQuotient(aYear - 1, 4)
              - iQuotient(aYear - 1, 100)
              + iQuotient(aYear - 1, 400);
    }
    return absoluteDayNumber;
  },
  getDayOfWeekFromAbsolute: function Timeprocessor_getDayOfWeekFromAbsolute(aAbsoluteDate) {
    return (aAbsoluteDate % 7 == 0) ? 7 : (aAbsoluteDate % 7);
  },
  getDayOfWeekFromGregorian: function Timeprocessor_getDayOfWeekFromGregorian(aYear, aMonth, aDay) {
    var givenYear = 0;
    var givenMonth = 0;
    var givenDay = 0;
    if (arguments.length == 1) {
      givenYear = arguments[0]["year"];
      givenMonth = arguments[0]["month"];
      givenDay = arguments[0]["day"];
    } else {
      givenYear = aYear;
      givenMonth = aMonth;
      givenDay = aDay;
    }
    return this.getDayOfWeekFromAbsolute(this.getAbsoluteFromGregorian(givenYear, givenMonth, givenDay));
  },
  getDistantDay: function Timeprocessor_getDistantDay(aGivenDay, aDistance) {
    var givenYear = 0;
    var givenMonth = 0;
    var givenDay = 0;
    var absoluteDate = 0;
    var gregorianDate = null;
    var returnType = 0;

    if (aGivenDay instanceof rflect.datetime.DateTime) {

      //echo("aGivenDay: " + aGivenDay.toString());
      //echo("aDistance: " + aDistance);

      var distantDateTime = aGivenDay.clone();
      // TODO: Understand why date values are strings, convert them to numbers
      givenYear = parseInt(distantDateTime.getYear(), 10);
      givenMonth = parseInt(distantDateTime.getMonthOfYear(), 10);
      givenDay = parseInt(distantDateTime.getDayOfMonth(), 10);

      returnType = 1;

    } else {

      givenYear = aGivenDay["year"];
      givenMonth = aGivenDay["month"];
      givenDay = aGivenDay["day"];
      returnType = 2;

    }

    if (aDistance == undefined) {
      aDistance = 0;
    }
    if (givenMonth >= 1 && givenMonth <= 12) {

      if (givenDay <= this.getLastDayOfGregorianMonth(givenMonth, givenYear)) {
        absoluteDate = this.getAbsoluteFromGregorian(givenYear, givenMonth, givenDay);
      } else {
        throw new Error("Day number is out of bounds: " + givenDay);
      }
    } else {
      throw new Error("Month number is out of bounds: " + givenMonth);
    }

    if (returnType == 1) {

      gregorianDate = this.getGregorianFromAbsolute(absoluteDate = absoluteDate + aDistance);
      distantDateTime.setYear(gregorianDate.year);
      distantDateTime.setMonthOfYear(gregorianDate.month);
      distantDateTime.setDayOfMonth(gregorianDate.day);
      return distantDateTime;

    }
    if (returnType == 2) {

      return this.getGregorianFromAbsolute(absoluteDate = absoluteDate + aDistance);

    }

  },
  getGregorianFromAbsolute: function Timeprocessor_getGregorianFromAbsolute(aAbsoluteDate) {
    // output int *rmonth, int *rday, int *ryear
    var approx = 0;
    var month = 0;
    var day = 0;
    var year = 0;
    var sumres1 = 0;
    var sumres2 = 0;
    approx = this.iQuotient(aAbsoluteDate, 366);
    for (var y = approx; (aAbsoluteDate >= this.getAbsoluteFromGregorian(1 + y, 1, 1)); y++) {
      sumres1 = sumres1 + 1
    }
    year = approx + sumres1;
    for (var m = 1;
         (aAbsoluteDate > this.getAbsoluteFromGregorian(year, m, this.getLastDayOfGregorianMonth(m, year)));
         m++) {
      sumres2 = sumres2 + 1;
    }
    month = 1 + sumres2;
    day = aAbsoluteDate - (this.getAbsoluteFromGregorian(year, month, 1) - 1);

    return {year: year,
      month: month,
      day: day
    };
  },
  getGregorianLeapYear: function gregorianLeapYear(aYear) {
    var leapYear = undefined;
    with (this) {
      leapYear = (iMod(aYear, 4) == 0)
              && !(iMod(aYear, 400) == 100
              || iMod(aYear, 400) == 200
              || iMod(aYear, 400) == 300)
    }
    return leapYear;
  },
  getLastDayOfGregorianMonth: function Timeprocessor_getLastDayOfGregorianMonth(aMonth, aYear) {
    if ((aMonth == 1) && (this.getGregorianLeapYear(aYear)))
      return 29;
    switch (aMonth) {
      case  0: return 31;
      case  1: return 28;
      case  2: return 31;
      case  3: return 30;
      case  4: return 31;
      case  5: return 30;
      case  6: return 31;
      case  7: return 31;
      case  8: return 30;
      case  9: return 31;
      case 10: return 30;
      case 11: return 31;
      default: return 0;
    }
  },
  getNearestMonday: function Timeprocessor_getNearestMonday(aGivenDay, aDirection) {
    var dayOfWeek = this.getDayOfWeekFromGregorian(aGivenDay);
    return this.getDistantDay(aGivenDay,
            (aDirection == rflect.datetime.Timeprocessor.DIRECTION_PAST)
                    ? -(dayOfWeek - 1)
                    : ((aDirection == rflect.datetime.Timeprocessor.DIRECTION_FUTURE)
                    ? (8 - dayOfWeek) : 0));
  },
  getPreviousMonthFirstDay: function Timeprocessor_getPreviousMonthFirstDay(aGivenDay) {
    var givenYear = aGivenDay["year"];
    var givenMonth = aGivenDay["month"];
    var givenDay = aGivenDay["day"];
    var prevYear = givenYear;
    var prevMonth = givenMonth;
    var prevDay = givenDay;
    if (givenMonth >= 1 && givenMonth <= 12) {
      if (givenDay <= this.getLastDayOfGregorianMonth(givenMonth, givenYear) && givenDay >= 1) {
        if (givenMonth == 1) {
          prevYear--;
          prevMonth = 12;
          prevDay = 1;
        } else {
          prevMonth--;
          prevDay = 1;
        }
      } else {
        throw new Error("Day number is out of bounds.")
      }
    } else {
      throw new Error("Month number is out of bounds.")
    }
    return {year: prevYear,
      month: prevMonth,
      day: prevDay
    }
  },
  getNextMonthFirstDay: function Timeprocessor_getNextMonthFirstDay(aGivenDay) {
    var givenYear = aGivenDay["year"];
    var givenMonth = aGivenDay["month"];
    var givenDay = aGivenDay["day"];
    var nextYear = givenYear;
    var nextMonth = givenMonth;
    var nextDay = givenDay;
    if (givenMonth >= 1 && givenMonth <= 12) {
      if (givenDay <= this.getLastDayOfGregorianMonth(givenMonth, givenYear) && givenDay >= 1) {
        if (givenMonth == 12) {
          nextYear++;
          nextMonth = 1;
          nextDay = 1;
        } else {
          nextMonth++;
          nextDay = 1;
        }
      } else {
        throw new Error("Day number is out of bounds.")
      }
    } else {
      throw new Error("Month number is out of bounds.")
    }
    return {year: nextYear,
      month: nextMonth,
      day: nextDay
    }
  },

  getNumberOfDaysFromGiven: function getNumberOfDaysFromGiven(aGivenDay, aNumberOfDays) {
    var givenYear = aGivenDay["year"];
    var givenMonth = aGivenDay["month"];
    var givenDay = aGivenDay["day"];
    var days = [aGivenDay];
    for (var counter = 1; counter < aNumberOfDays; counter++) {
      days.push(this.getTomorrow(days[counter - 1]));
    }
    return days;
  },

  // TODO: Redesign this method to allow only DateTime instances to be passed as arguments
  getTomorrow: function Timeprocessor_getTomorrow(aGivenDay) {
    var givenYear = 0;
    var givenMonth = 0;
    var givenDay = 0;
    var tomorrowYear = 0;
    var tomorrowMonth = 0;
    var tomorrowDay = 0;
    var returnType = 0;
    if (typeof aGivenDay == "object") {
      if (aGivenDay instanceof rflect.datetime.DateTime) {
        givenYear = aGivenDay.getYear();
        givenMonth = aGivenDay.getMonthOfYear();
        givenDay = aGivenDay.getDayOfMonth();
        returnType = 1;
      } else {
        givenYear = aGivenDay["year"];
        givenMonth = aGivenDay["month"];
        givenDay = aGivenDay["day"];
        returnType = 2;
      }
    }
    tomorrowYear = givenYear;
    tomorrowMonth = givenMonth;
    tomorrowDay = givenDay;
    if (givenMonth >= 0 && givenMonth <= 11) {
      if (givenDay <= this.getLastDayOfGregorianMonth(givenMonth, givenYear)) {
        if (this.getLastDayOfGregorianMonth(givenMonth, givenYear) == givenDay
                && givenDay >= 1) {
          //echo("last day of month");
          if (givenMonth == 11) {
            tomorrowYear++;
            tomorrowMonth = 0;
            tomorrowDay = 1;
          } else {
            tomorrowMonth++;
            tomorrowDay = 1;
          }
        } else {
          tomorrowDay++;
        }
      } else {
        throw new Error("Day number is out of bounds.")
      }
    } else {
      throw new Error("Month number is out of bounds.")
    }
    return (returnType == 1) ? new rflect.datetime.DateTime({year: tomorrowYear,
      monthOfYear: tomorrowMonth,
      dayOfMonth: tomorrowDay
    }) : ((returnType == 2) ? {year: tomorrowYear,
      month: tomorrowMonth,
      day: tomorrowDay
    } : null)
  },

  getYesterday: function Timeprocessor_getYesterday(aGivenDay) {
    var givenYear = aGivenDay["year"];
    var givenMonth = aGivenDay["month"];
    var givenDay = aGivenDay["day"];
    var yesterdayYear = givenYear;
    var yesterdayMonth = givenMonth;
    var yesterdayDay = givenDay;
    if (givenMonth >= 1 && givenMonth <= 12) {
      if (givenDay <= this.getLastDayOfGregorianMonth(givenMonth, givenYear)
              && givenDay >= 1) {
        if (givenDay == 1) {
          if (givenMonth == 1) {
            yesterdayYear--;
            yesterdayMonth = 12;
            yesterdayDay = 31;
          } else {
            yesterdayMonth--;
            yesterdayDay = this.getLastDayOfGregorianMonth(yesterdayMonth, yesterdayYear);
          }
        } else {
          yesterdayDay--;
        }
      } else {
        throw new Error("Day number is out of bounds.")
      }
    } else {
      throw new Error("Month number is out of bounds.")
    }
    return {year: yesterdayYear,
      month: yesterdayMonth,
      day: yesterdayDay
    }
  },
  iQuotient: function Timeprocessor_iQuotient(m, n) {
    return Math.floor(m / n);
  },
  iMod: function iMod(m, n) {
    var q = 0, r = 0;

    q = this.iQuotient(m, n);
    r = m - q * n;
    return r;
  }

});
