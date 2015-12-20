/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Touch hold event creator.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.TouchHoldEventCreator');

goog.require('goog.date.Interval');
goog.require('goog.dom.classes');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Coordinate');
goog.require('rflect.cal.events.Chip');
goog.require('rflect.cal.ui.MainPaneBuilder');
goog.require('rflect.cal.ui.MainPaneSelectionMask');



/**
 * Touch hold event creator main class.
 * @unrestricted
 */
class TouchHoldEventCreator extends goog.events.EventHandler {
  /**
   * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
   * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
   * @param {rflect.cal.ui.MainPane} aMainPane Link to main pane.
   * @param {rflect.cal.events.EventManager} aEventManager Link to event
   * manager.
   * @param {rflect.cal.blocks.BlockPool} aBlockPoolWeek Link to week block
   * pool.
   * @param {rflect.cal.blocks.BlockPool} aBlockPoolAllday Link to allday block
   * pool.
   * @param {rflect.cal.blocks.BlockPool} aBlockPoolMonth Link to month block
   * pool.
   * @param {rflect.ui.MomentumScroller=} aMomentumScroller Link to momentum
   * scroller.
   */
  constructor(aViewManager, aTimeManager, aMainPane, aEventManager,
      aBlockPoolWeek, aBlockPoolAllday, aBlockPoolMonth, aMomentumScroller) {
    super(this);

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
     * Link to main pane.
     * @type {rflect.cal.ui.MainPane}
     * @private
     */
    this.mainPane_ = aMainPane;

    /**
     * Link to event manager.
     * @type {rflect.cal.events.EventManager}
     * @private
     */
    this.eventManager_ = aEventManager;

    /**
     * Link to week block pool.
     * @type {rflect.cal.blocks.BlockPool}
     * @private
     */
    this.blockPoolWeek_ = aBlockPoolWeek;

    /**
     * Link to allday block pool.
     * @type {rflect.cal.blocks.BlockPool}
     * @private
     */
    this.blockPoolAllDay_ = aBlockPoolAllday;

    /**
     * Link to month block manager.
     * @type {rflect.cal.blocks.BlockPool}
     * @private
     */
    this.blockPoolMonth_ = aBlockPoolMonth;

    /**
     * Link to momentum scroller.
     * @type {rflect.ui.MomentumScroller|undefined}
     * @private
     */
    this.momentumScroller_ = aMomentumScroller;
  };


  /**
   * @param {string} aClassName
   * @return {rflect.cal.ui.MainPaneSelectionMask.Configuration}
   */
  classNameToConfiguration(aClassName) {
    if (this.mainPane_.isWeekGrid(aClassName)) {
      return rflect.cal.ui.MainPaneSelectionMask.Configuration.WEEK
    }
    if (this.mainPane_.isAlldayGrid(aClassName)) {
      return rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY
    }
    if (this.mainPane_.isMonthGrid(aClassName)) {
      return rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH
    }
    return rflect.cal.ui.MainPaneSelectionMask.Configuration.NONE;
  }
  
  
  /**
   * Main pane touch hold handler.
   * @param {goog.events.Event} aEvent Event object.
   */
  onTouchHoldDelegate(aEvent) {
    var className = aEvent.target.className;
    var temporarySelectionMask = new rflect.cal.ui.MainPaneSelectionMask(
        this.viewManager_, this.mainPane_, this.timeManager_,
        this.blockPoolWeek_, this.blockPoolAllDay_,
        this.blockPoolMonth_, this.momentumScroller_, true);
    var configuration = this.classNameToConfiguration(className);
    temporarySelectionMask.init(configuration, aEvent);
  
    var eventCoordinate = temporarySelectionMask.getEventCoordinate(aEvent);
    var startCoordinate = temporarySelectionMask.getCellCoordinate(
        eventCoordinate, true, false);
    var endCoordinate = startCoordinate.clone();
  
    var startCoordForDate = temporarySelectionMask.getMinCoordinate(
        startCoordinate, endCoordinate);
    var endCoordForDate = temporarySelectionMask.getMaxCoordinate(startCoordinate,
        endCoordinate);
  
    temporarySelectionMask.calculateDates(startCoordForDate, endCoordForDate);
    var start = temporarySelectionMask.startDate;
    var startDate = new goog.date.DateTime(start.getYear(), start.getMonth(),
        start.getDate(), start.getHours(), start.getMinutes());
    var endDate = rflect.cal.ui.TouchHoldEventCreator.getEndDate(startDate,
        configuration);
    var allDay = configuration ==
        rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH ||
        configuration ==
        rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY;
    this.eventManager_.eventHolder.openSession();
    this.eventManager_.eventHolder.setSummary('');
    this.eventManager_.eventHolder.setStartDate(startDate);
    this.eventManager_.eventHolder.setEndDate(endDate);
    this.eventManager_.eventHolder.setAllDay(allDay);
    this.eventManager_.eventHolder.setCalendarId(this.eventManager_.
        getLastUsedCalendarId());
    var addedEvent = this.eventManager_.eventHolder.endWithAdd();
  
    this.appendTemporaryChip(addedEvent, configuration,
        temporarySelectionMask.isWeekOrAllDay() ? startCoordinate.x :
        startCoordinate.y);
  
    this.eventManager_.eventHolder.openSession(addedEvent);
  
    temporarySelectionMask.dispose();
  }
  
  
  /**
   * @param {goog.date.DateTime} aStartDate Start date.
   * @param {rflect.cal.ui.MainPaneSelectionMask.Configuration} aConfiguration
   * Mask configuration.
   * @return {goog.date.DateTime} End date.
   */
  static getEndDate(aStartDate, aConfiguration) {
    let endDate = aStartDate.clone();
    if (aConfiguration ==
        rflect.cal.ui.MainPaneSelectionMask.Configuration.WEEK) {
      endDate.add(new goog.date.Interval(goog.date.Interval.MINUTES, 60));
      if (aStartDate.getDate() != endDate.getDate()) {
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
        endDate.setMilliseconds(0);
      }
    } else if (aConfiguration ==
        rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY ||
        aConfiguration ==
        rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH) {
      endDate.add(new goog.date.Interval(goog.date.Interval.DAYS, 1));
    }
    return endDate;
  }
  
  
  /**
   * @return {string} Last used calendar id.
   */
  getLastUsedCalendarId() {
    for (var calendarId in this.eventManager_.calendars) {
      return calendarId;
    }
    return '';
  }
  
  
  /**
   * @param {rflect.cal.events.Event} aCalendarEvent Calendar event.
   * @param {rflect.cal.ui.MainPaneSelectionMask.Configuration} aConfiguration
   * Mask configuration.
   * @param {number} aColOrRow For month mask - row, for all-day and week - col.
   */
  appendTemporaryChip(aCalendarEvent,
      aConfiguration, aColOrRow) {
    var startDate = aCalendarEvent.startDate;
    var endDate = aCalendarEvent.endDate;
    var eventStartMins;
    var eventEndMins;
    var tempChip;
    var elementOuterHTML;
    var allDay = rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY ==
        aConfiguration;
    var colorClass = this.eventManager_.calendars[
        this.eventManager_.getLastUsedCalendarId()].colorCode.eventClass;
  
    switch (aConfiguration) {
      case rflect.cal.ui.MainPaneSelectionMask.Configuration.WEEK: {
        eventStartMins = startDate.getHours() * 60 + startDate.getMinutes();
        eventEndMins = endDate.getHours() == 0 && endDate.getMinutes() == 0 ?
            24 * 60 :
            endDate.getHours() * 60 + endDate.getMinutes();
  
        tempChip = new rflect.cal.events.Chip(aCalendarEvent.id, eventStartMins,
            eventEndMins, false, false, colorClass);
        elementOuterHTML = rflect.cal.ui.MainPaneBuilder.buildWeekBlockChip(
            this.eventManager_, tempChip, 1, 0, 1);
    
        this.createTemporaryChipElement(this.mainPane_.getDomHelper().
            getElement('wk-events-layer-col' + aColOrRow), elementOuterHTML,
            true);
      };break;
      case rflect.cal.ui.MainPaneSelectionMask.Configuration.ALLDAY:
      case rflect.cal.ui.MainPaneSelectionMask.Configuration.MONTH: {
        eventStartMins = startDate.getWeekday();
        eventEndMins = endDate.getWeekday() != 0 ? endDate.getWeekday() :
            rflect.cal.events.Chip.MAX_DAYS_WEEK;
  
        tempChip = new rflect.cal.events.Chip(aCalendarEvent.id, eventStartMins,
            eventEndMins, false, false, colorClass);
        elementOuterHTML = rflect.cal.ui.MainPaneBuilder.buildMonthBlockChip(
            this.eventManager_, tempChip, 1, 0, 1, allDay);
  
        if (allDay) {
          this.createTemporaryChipElement(this.mainPane_.getDomHelper().
              getElement('wk-ad-events-layer-col' + aColOrRow),
              elementOuterHTML, false);
        } else {
          this.createTemporaryChipElement(this.mainPane_.getDomHelper().
              getElement('mn-events-layer-row' + aColOrRow), elementOuterHTML,
              false);
        }
      };break;
      default: break;
    }
  }
  
  
  /**
   * @param {Element} aParentElement Element where to create temporary chip.
   * @param {string} aOuterHTML Body of chip.
   * @param {boolean} aWeekChip Whether chip is week, month otherwise.
   */
  createTemporaryChipElement(aParentElement,
      aOuterHTML, aWeekChip) {
    var tempElement = this.mainPane_.getDomHelper().createElement('temp');
    tempElement.innerHTML = aOuterHTML;
    var chipElement = this.mainPane_.getDomHelper().getFirstElementChild(
        tempElement);
  
    aParentElement.appendChild(chipElement);

    this.listen(chipElement, 'animationend', this.onAnimationEnd_, false);
    setTimeout(() => {
      goog.dom.classes.add(chipElement, 'event-appearance-' + (aWeekChip ?
          'wk' : 'mn'));
    }, 0);
  }


  /**
   * @param {goog.events.Event} aEvent
   */
  onAnimationEnd_(aEvent) {

  }


  /**
   * @override
   */
  disposeInternal() {
    super.disposeInternal();
  }
}


/**
 * @typedef {TouchHoldEventCreator}
 */
rflect.cal.ui.TouchHoldEventCreator = TouchHoldEventCreator;


/**
 * Touch hold timeout.
 * @type {number}
 * @const
 */
rflect.cal.ui.TouchHoldEventCreator.TIMEOUT = 500;
