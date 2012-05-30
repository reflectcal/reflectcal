/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
goog.require("rflect.loc");

goog.provide("rflect.loc.cal.InfoTipChanging");

rflect.loc.cal.InfoTipChanging = function(aKey) {

  return rflect.loc.cal.InfoTipChanging.dict[aKey];

}

rflect.loc.cal.InfoTipChanging.dict = {

  "Change event":"変更イベント",
  "Delete event":"イベントを削除",
  "Subject:":"主題:",
  "Begins:":"初め:",
  "Ends:":"終了:",
  "OK":"OK",
  "Cancel":"キャンセル"

}


