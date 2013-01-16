/*
 * Copyright (c) 2013. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('rflect.cal.EventManager');





function testChips() {
  var dates = [
    new goog.date.Date(2012, 11, 29),
    new goog.date.Date(2012, 11, 30),
    new goog.date.Date(2012, 11, 31),
    new goog.date.Date(2013, 0, 4),
    new goog.date.Date(2013, 0, 5),
    new goog.date.Date(2013, 1, 2),
    new goog.date.Date(2014, 11, 28),
    new goog.date.Date(2012, 11, 23)
  ];

  goog.array.forEach(dates, function(date) {
    var rDate = new rflect.date.DateShim(date);
    rDate.setDayOfYear(date.getDayOfYear());
    rDate.setWeekNumber(date.getWeekNumber());

    var rTomorrow = rDate.getTomorrow();
    date.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));

    if (goog.DEBUG) {
      _log('rTomorrow.getWeekNumber()', rTomorrow.getWeekNumber());
      _log('date.getWeekNumber()', date.getWeekNumber());
    }
    assertTrue('tommorow rflect week of year equals goog',
        rTomorrow.getWeekNumber() == date.getWeekNumber()
    );
  });

}



