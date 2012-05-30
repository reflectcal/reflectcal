/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
goog.require("rflect.loc.subs");
goog.require("rflect.loc.datetime.DateTime");

goog.provide("rflect.loc.cal.Main");

rflect.loc.cal.Main = function() {

  return rflect.loc.cal.Main.dict.dictKey.apply(rflect.loc.cal.Main.dict,
          arguments);

}

rflect.loc.cal.Main.dict = new rflect.loc.subs.Dict({

  "Today":"Сегодня",
  "Day":"День",
  "Week":"Неделя",
  "Month":"Месяц",
  "Are you surely want to delete event \"%s\"?"
          :"Вы действительно хотите удалить событие \"%s\"?"

});


