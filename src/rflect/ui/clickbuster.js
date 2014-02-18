/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Functions for preventing ghost click problem.
 * {@see} https://developers.google.com/mobile/articles/fast_buttons#ghost
 */

goog.provide('rflect.ui.clickBuster');


goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.Disposable');


rflect.ui.clickBuster.preventGhostClick = function(x, y) {
  rflect.ui.clickBuster.coordinates.push(x, y);
  window.setTimeout(rflect.ui.clickBuster.pop, 2500);
};

rflect.ui.clickBuster.pop = function() {
  rflect.ui.clickBuster.coordinates.splice(0, 2);
}

rflect.ui.clickBuster.onClick = function(event) {
  for (var i = 0; i < rflect.ui.clickBuster.coordinates.length; i += 2) {
    var x = rflect.ui.clickBuster.coordinates[i];
    var y = rflect.ui.clickBuster.coordinates[i + 1];
    if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
};

document.addEventListener('click', rflect.ui.clickBuster.onClick, true);
rflect.ui.clickBuster.coordinates = [];
