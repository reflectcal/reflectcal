/**
 * @fileoverview Localization
 */

goog.require("rflect.loc");

goog.provide("rflect.loc.Dict");

/*
* Methods for general localization support should be placed here.
* */

rflect.loc.Dict.prototype.dictKey = function(aKey, aDict) {

  return aDict[aKey];

}
