/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Class for updating view buttons according to radio button
 * logic, so that only one view can be selected at a time.
 */

goog.provide('rflect.cal.ui.ViewButtonUpdater');


goog.require('goog.ui.Component.State');
goog.require('rflect.cal.ViewType');



/**
 * Updater main class.
 * @param {goog.ui.Component} aComponent Component to decorate. Must expose
 * getButtonDay, getButtonWeek, getButtonMonth, getButtonNow methods.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 */
rflect.cal.ui.ViewButtonUpdater = function(aComponent, aViewManager,
    aTimeManager) {

  /**
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;
}


/**
 * Updates buttons according to current view.
 */
rflect.cal.ui.ViewButtonUpdater.prototype.updateButtons = function() {
  var viewsToButtons = {};
  viewsToButtons[rflect.cal.ViewType.DAY] = this.component.getButtonDay();
  viewsToButtons[rflect.cal.ViewType.WEEK] = this.component.getButtonWeek();
  viewsToButtons[rflect.cal.ViewType.MONTH] = this.component.getButtonMonth();

  for (var view in viewsToButtons) {
    var button = viewsToButtons[view];
    // Not all view buttons are present in some configurations.
    if (!button)
      continue;
    if (this.viewManager_.currentView == view) {
      button.setChecked(true);
      button.setFocused(false);
      button.setAutoStates(goog.ui.Component.State.CHECKED, false);
    } else {
      button.setChecked(false);
      button.setAutoStates(goog.ui.Component.State.CHECKED, true);
    }
  }

  if (this.component.getButtonNow()){
    if (this.timeManager_.isInNowPoint) {
      this.component.getButtonNow().setChecked(true);
      this.component.getButtonNow().setFocused(false);
      this.component.getButtonNow().setAutoStates(
          goog.ui.Component.State.CHECKED, false);
    } else {
      this.component.getButtonNow().setChecked(false);
      this.component.getButtonNow().setAutoStates(
          goog.ui.Component.State.CHECKED, true);
    }
  }
}
