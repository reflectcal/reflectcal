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

function testClone() {
  var date = new rflect.date.DateShim(2000, 1, 1, 1, 1, 1);
  date.setFirstDayOfWeek(1);
  date.setFirstWeekCutOffDay(3);
  date.setDayOfYear(1);
  date.setWeekNumber(1);

  var clone = date.clone();

  assertEquals('year', date.getYear(), clone.getYear());
  assertEquals('month', date.getMonth(), clone.getMonth());
  assertEquals('date', date.getDate(), clone.getDate());
  assertEquals('day', date.getDay(), clone.getDay());
  assertEquals('hours', date.getHours(), clone.getHours());
  assertEquals('minutes', date.getMinutes(), clone.getMinutes());
  assertEquals('seconds', date.getSeconds(), clone.getSeconds());
  assertEquals('millis', date.getMilliseconds(), clone.getMilliseconds());

  assertEquals('first day of week', date.getFirstDayOfWeek(),
      clone.getFirstDayOfWeek());
  assertEquals('first week cutoff day', date.getFirstWeekCutOffDay(),
      clone.getFirstWeekCutOffDay());
  assertEquals('day of year', date.getDayOfYear(), clone.getDayOfYear());
  assertEquals('week number', date.getWeekNumber(), clone.getWeekNumber());

}

function testConstructor() {
  var referenceDate1 = new goog.date.DateTime(2000, 1, 1, 1, 1, 1);
  var referenceDate2 = new goog.date.DateTime();

  var date1 = new rflect.date.DateShim(2000, 1, 1, 1, 1, 1);
  var date2 = new rflect.date.DateShim(new Date());
  var date3 = new rflect.date.DateShim(new goog.date.DateTime());
  var date4 = new rflect.date.DateShim(date3);
  var date5 = new rflect.date.DateShim();

  assertTrue('date1', date1.equals(referenceDate1));
  assertTrue('date2', date2.equals(referenceDate2));
  assertTrue('date3', date3.equals(referenceDate2));
  assertTrue('date4', date4.equals(referenceDate2));
  assertTrue('date5', date5.equals(referenceDate2));
}

function testParse() {
  var referenceDate = new goog.date.DateTime(2000, 1, 1, 1, 1, 1);

  var parsedShim = rflect.date.parse('20000101010101');
  var fullyParsedShim = rflect.date.parse('20000101010101');

  assertTrue('parsed shim', parsedShim.equals(referenceDate));
  assertTrue('fully parsed shim', fullyParsedShim.equals(referenceDate));
  assertTrue('date3', date3.equals(referenceDate2));
  assertTrue('date4', date4.equals(referenceDate2));
  assertTrue('date5', date5.equals(referenceDate2));
}





