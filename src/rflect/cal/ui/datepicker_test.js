/*
 * Copyright (c) 2012. Rflect, Alex K.
 */
//goog.require('goog.testing.jsunit');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('rflect.cal.ui.DatePicker');
goog.require('rflect.Debug');


function makeDatePicker() {
  var datePicker = new rflect.cal.ui.DatePicker();

  datePicker.render(goog.dom.getElement('dp-cont'));

  goog.events.listen(datePicker, rflect.cal.ui.DatePicker.EVENT_DATE_CHANGE,
      function(e) {
        _log('e.date', e.date)
      }, false);
}


function init() {
  makeDatePicker();
};

