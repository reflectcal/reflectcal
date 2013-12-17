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
goog.require('rflect.cal.ui.PaneShowBehavior');



/**
 * Side pane main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.SidePane = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor) {
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

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Pane show behavior.
   * @type {rflect.cal.ui.PaneShowBehavior}
   */
  this.showBehavior = new rflect.cal.ui.PaneShowBehavior(this, 
      this.getDomHelper().getElement('main-container'));

  this.addChild(this.buttonCalendar_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.calSelector_ = new rflect.cal.ui.CalSelector(
      this.viewManager_, this.containerSizeMonitor_, this.eventManager_));

};
goog.inherits(rflect.cal.ui.SidePane, rflect.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.SidePane.EventTypes = {
  CANCEL: 'settingsCancel'
};


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
 * Builds menu of side pane.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @private
 */
rflect.cal.ui.SidePane.prototype.buildMenu_ = function(aSb) {
}


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to.
 * @see rflect.ui.Component#build
 * @protected
 */
rflect.cal.ui.SidePane.prototype.buildInternal = function(aSb) {

  var parts = [
    '<nav id="side-pane" class="side-pane" style="display:none">',
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
rflect.cal.ui.SidePane.prototype.onCancel_ = function() {
  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.SidePane.EventTypes.CANCEL)))
    this.showBehavior.setVisible(false);

}


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
