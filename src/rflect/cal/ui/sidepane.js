/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Side pane, place for generic menu.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.SidePane');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimePatterns');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Component.State');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('goog.ui.ToggleButton');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.EventType');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.predefined');



/**
 * Side pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.SidePane = function(aViewManager, aTimeManager) {
  rflect.ui.Component.call(this);

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

  this.addChild(this.buttonCalendar_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.calSelector_ = new rflect.cal.ui.CalSelector(
      this.viewManager_, this.containerSizeMonitor_, this.eventManager_));

};
goog.inherits(rflect.cal.ui.SidePane, rflect.ui.Component);


/**
 * Decorates an existing html div element as a Top Pane.
 * @override
 */
rflect.cal.ui.SidePane.prototype.decorateInternal = function(aElement,
                                                         opt_doNotBuildBody) {
  // Set this.element_.
  rflect.cal.ui.SidePane.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @protected
 */
rflect.cal.ui.SidePane.prototype.buildInternal = function(aSb) {

  var parts = [
    '<nav id="side-pane" class="side-pane">',
    '<div class="control-pane">',
    '<div class="pane-left">',
    '<div class="cal-menu-button goog-flat-button goog-inline-block"' +
        'id="' + rflect.cal.predefined.BUTTON_TO_CALENDAR_ID + '">',
    rflect.cal.i18n.Symbols.TO_CALENDAR,
    '</div>',
    '</div>',
    '</div>',
    '<ul class="pane-menu">',
    '</ul>',
    '<div id="calendars-selector" class="list-selector">',
    '</div>',
    '</nav>'
  ];

  // Form html. From index 1, because 0 is the html of outer container, which
  // we don't create in that method but just decorate.
  for (var counter = 1, length = parts.length - 1;
       counter < length; counter++) {
    aSb.append(parts[counter]);
    switch (counter) {
      // Include top pane in common buffer.
      case 9: {
        this.buildMenu_(aSb);
      };break;
      case 11: {
        this.calSelector_.build(aSb);
      };break;
      default: break;
    }
  }
}


/**
 * Decorates buttons, attaches event handlers for them.
 */
rflect.cal.ui.SidePane.prototype.enterDocument = function() {

  rflect.cal.ui.SidePane.superClass_.enterDocument.call(this);

  // Attaching event handlers.
  this.getHandler().listen(this.buttonCalendar_,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this);
};


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.SettingsPane.prototype.onCancel_ = function() {
  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SettingsPane.EventTypes.CANCEL)))
    this.setVisible(false);

}


/**
 * Sets the visibility of the event pane and moves focus to the
 * event name input. Lazily renders the component if needed.
 * @param {boolean} visible Whether the pane should be visible.
 */
rflect.cal.ui.SettingsPane.prototype.setVisible = function(visible) {
  if (visible == this.visible_) {
    return;
  }

  this.showElement_(visible);

  this.visible_ = visible;
};


/**
 * Shows or hides the pane element.
 * @param {boolean} visible Shows the element if true, hides if false.
 * @private
 */
rflect.cal.ui.SettingsPane.prototype.showElement_ = function(visible) {
  if (visible)
    goog.dom.classes.remove(this.getElement(), 'slide-pane-shown');
  else
    goog.dom.classes.add(this.getElement(), 'slide-pane-shown');
};


/**
 * No-op is used in order not to allow updateBeforeRedraw to be called on
 * buttons which don't have it.
 */
rflect.cal.ui.SidePane.prototype.updateBeforeRedraw = goog.nullFunction;


/**
 * Disposes of the component.  Calls {@code exitDocument}, which is expected to
 * remove event handlers and clean up the component.  Propagates the call to
 * the component's children, if any. Removes the component's DOM from the
 * document unless it was decorated.
 * @override
 * @protected
 */
rflect.cal.ui.SidePane.prototype.disposeInternal = function() {
  rflect.cal.ui.SidePane.superClass_.disposeInternal.call(this);

  this.buttonCalendar_ = null;
};
