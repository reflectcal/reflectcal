/*
 * Copyright (c) 2012. Rflect, Alex K.
 */
goog.require('goog.testing.jsunit');
goog.require('rflect.Debug');
goog.require('goog.array');
goog.require('rflect.date');



function testGetTomorrowDate() {
  var date = new goog.date.Date(2013, 0, 10);

  var rDate = new rflect.date.DateShim(date);
  var tomorrow = rDate.getTomorrow();

  if (goog.DEBUG)
    _log('tomorrow', tomorrow);
  assertEquals('tommorow date', tomorrow.getDate(), 11);
}

function testGoogTomorrowEqualsRflectTomorrow() {
  var date = new goog.date.Date(2013, 0, 10);

  var rDate = new rflect.date.DateShim(date);
  var rTomorrow = rDate.getTomorrow();
  date.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));

  if (goog.DEBUG) {
    _log('rTomorrow', rTomorrow);
    _log('gTomorrow', date);
  }
  assertTrue('tommorow rflect date equals goog', rTomorrow.equals(date,
      rflect.date.fields.YEAR | rflect.date.fields.MONTH |
      rflect.date.fields.DATE));
}

function testGoogDayOfYearEqualsRflect() {
  var date = new goog.date.Date(2013, 0, 10);

  var rDate = new rflect.date.DateShim(date);
  rDate.setDayOfYear(date.getDayOfYear());
  rDate.setWeekNumber(date.getWeekNumber());

  var rTomorrow = rDate.getTomorrow();
  date.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));

  if (goog.DEBUG) {
    _log('rTomorrow.getDayOfYear()', rTomorrow.getDayOfYear());
    _log('date.getDayOfYear()', date.getDayOfYear());
  }
  assertTrue('tommorow rflect day of year equals goog',
      rTomorrow.getDayOfYear() == date.getDayOfYear()
      );
}


function testGoogDayOfYearEqualsRflect2() {
  var date = new goog.date.Date(2012, 11, 31);

  var rDate = new rflect.date.DateShim(date);
  rDate.setDayOfYear(date.getDayOfYear());
  rDate.setWeekNumber(date.getWeekNumber());

  var rTomorrow = rDate.getTomorrow();
  date.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));

  if (goog.DEBUG) {
    _log('rTomorrow.getDayOfYear()', rTomorrow.getDayOfYear());
    _log('date.getDayOfYear()', date.getDayOfYear());
  }
  assertTrue('tommorow rflect day of year equals goog',
      rTomorrow.getDayOfYear() == date.getDayOfYear()
      );
}


function testGoogWeekOfYearEqualsRflect() {
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



