/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Set of predefined locale dependent constants for component.
 * Corresponds to file.
 * @see {../../../css/rflectcalendar.css}.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {const}
 */

goog.provide('rflect.cal.i18n.predefined');
goog.provide('rflect.cal.i18n.predefined_by');
goog.provide('rflect.cal.i18n.predefined_en');
goog.provide('rflect.cal.i18n.predefined_ru');


/**
 * Selected constants by locale.
 */
if (goog.LOCALE == 'en') {

  /**
   * Width of hours container, in pixels.
   * @type {number}
   * @const
   */
  rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH = 60;

  /**
   * String representing week grid table wrapper margin.
   * @type {string}
   * @const
   */
  rflect.cal.i18n.predefined.GRID_TABLE_WRAPPER_WK_MARGIN = 'margin-left:' +
      rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH + 'px';

  /**
   * Daynames week prefix width.
   * @type {number}
   * @const
   */
  rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH = 61;

  /**
   * String representing main pane header container margin.
   * @type {string}
   * @const
   */
  rflect.cal.i18n.predefined.MAIN_PANE_HEADER_CONTAINER_WK_MARGIN =
      'margin-left:' + rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH +
      'px';

} else if (goog.LOCALE == 'ru') {

  rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH = 40;

  rflect.cal.i18n.predefined.GRID_TABLE_WRAPPER_WK_MARGIN = 'margin-left:' +
      rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH + 'px';

  rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH = 41;

  rflect.cal.i18n.predefined.MAIN_PANE_HEADER_CONTAINER_WK_MARGIN =
      'margin-left:' + rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH +
      'px';

} else if (goog.LOCALE == 'by') {

  rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH = 40;

  rflect.cal.i18n.predefined.GRID_TABLE_WRAPPER_WK_MARGIN = 'margin-left:' +
      rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH + 'px';

  rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH = 41;

  rflect.cal.i18n.predefined.MAIN_PANE_HEADER_CONTAINER_WK_MARGIN =
      'margin-left:' + rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH +
      'px';

} else {

  rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH = 60;

  rflect.cal.i18n.predefined.GRID_TABLE_WRAPPER_WK_MARGIN = 'margin-left:' +
      rflect.cal.i18n.predefined.HOURS_CONTAINER_WIDTH + 'px';

  rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH = 61;

  rflect.cal.i18n.predefined.MAIN_PANE_HEADER_CONTAINER_WK_MARGIN =
      'margin-left:' + rflect.cal.i18n.predefined.DAYNAMES_PREFIX_WEEK_WIDTH +
      'px';

}

