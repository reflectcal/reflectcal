/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar ui common utils.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.common');

goog.require('goog.ui.Button');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');


/**
 * @param {goog.ui.Button} aButton Button.
 * @param {boolean=} opt_right Whether button is aligned to right.
 */
rflect.cal.ui.common.setBackButtonContent = function(aButton, opt_right) {
  var content = goog.dom.createDom('span', null, goog.dom.createDom('i',
      ['icon', 'icon-chevron-left']), rflect.cal.i18n.Symbols.TO_CALENDAR);

  aButton.setContent(content);
};


/**
 * @param {goog.ui.Button} aButton Whether button is aligned to right.
 */
rflect.cal.ui.common.setDeleteButtonContent = function(aButton) {
  if (rflect.MOBILE) {
    var content = goog.dom.createDom('i',
        ['icon', 'icon-trash-o']);
  } else {
    var content = rflect.cal.i18n.Symbols.DELETE;
  }

  goog.dom.classes.add(aButton.getElement(), 'button-icon');
  aButton.setContent(content);
};