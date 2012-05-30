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
