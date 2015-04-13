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
      ['mega-octicon', 'octicon-chevron-left']), rflect.cal.i18n.Symbols.TO_CALENDAR);

  aButton.setContent(content);
};


/**
 * @param {goog.ui.Button} aButton Whether button is aligned to right.
 */
rflect.cal.ui.common.setDeleteButtonContent = function(aButton) {
  var content = rflect.cal.i18n.Symbols.DELETE;

  aButton.setContent(content);
};



/**
 * Marks input as invalid or removes that mark.
 * @param {boolean} aValid Whether input is valid.
 * @param {Element} aInputEl Input element.
 */
rflect.cal.ui.common.markInput = function(aValid, aInputEl) {
  if (!aValid)
    goog.dom.classes.add(aInputEl, goog.getCssName('input-invalid'));
  else
    goog.dom.classes.remove(aInputEl, goog.getCssName('input-invalid'));
}