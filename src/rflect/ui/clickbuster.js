/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Functions for preventing ghost click problem.
 * {@see} https://developers.google.com/mobile/articles/fast_buttons#ghost
 */

goog.provide('rflect.ui.clickBuster');


/**
 * Stores coordinates of would-be ghost click. Must be called on touch end.
 * @param {goog.events.Event} aEvent Touch end event object.
 */
rflect.ui.clickBuster.preventGhostClick = function(aEvent) {
  var x = aEvent.getBrowserEvent().changedTouches[0].clientX;
  var y = aEvent.getBrowserEvent().changedTouches[0].clientY;

  rflect.ui.clickBuster.coordinates.push(x, y);
  window.setTimeout(rflect.ui.clickBuster.pop, 2500);
};


/**
 * Removes two coordinates from list.
 */
rflect.ui.clickBuster.pop = function() {
  rflect.ui.clickBuster.coordinates.splice(0, 2);
}


/**
 * Capture phase click listener. Filters out ghost clicks.
 * @param {Event} aEvent Click event object.
 */
rflect.ui.clickBuster.onClick = function(aEvent) {
  if (goog.DEBUG)
    window.console.log('click time: ', goog.now());
  if (goog.DEBUG)
    window.console.log('aEvent.clientX: ', aEvent.clientX);
  if (goog.DEBUG)
    window.console.log('aEvent.clientY: ', aEvent.clientY);
  for (var i = 0; i < rflect.ui.clickBuster.coordinates.length; i += 2) {
    var x = rflect.ui.clickBuster.coordinates[i];
    var y = rflect.ui.clickBuster.coordinates[i + 1];
    if (aEvent.clientX == x && aEvent.clientY == y) {
      aEvent.stopPropagation();
      aEvent.preventDefault();
    }
  }
};


document.addEventListener('click', rflect.ui.clickBuster.onClick, true);


/**
 * Coordinate list.
 * @type {Array.<number>}
 */
rflect.ui.clickBuster.coordinates = [];
