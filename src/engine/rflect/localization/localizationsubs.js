/**
 * @fileoverview Localization extension which provides
 * dictionary lookup similar to {@link goog.string.subs}
 * method. Also depends on additional packages. This
 * package is separate from rflect.loc due to additional
 * requirements, so if you need simple dictionary
 * lookup, use rflect.loc instead.
 */

goog.require("rflect.loc");
goog.require("goog.string");
goog.require("goog.array");

goog.provide("rflect.loc.subs");

rflect.loc.subs.defaultKey = function(aKey, aVarArgs) {

  var length = arguments.length;
  var args = null;

  if (length == 1)
    return rflect.loc.defaultKey(aKey);
  if (length > 1) {
    args = goog.array.clone(arguments);
    args.shift();

    return goog.string.subs.apply(null, [aKey].concat(args));
  }
}

rflect.loc.subs.Dict = function(aDict) {
  this._dict = aDict;
}

rflect.loc.subs.Dict.prototype.dictKey = function(aKey, aVarArgs) {

  var length = arguments.length;
  var args = null;

  if (length == 1)
    return this._dict[aKey];
  if (length > 1) {

    args = goog.array.clone(arguments);
    args.shift();

    return goog.string.subs.apply(null, [this._dict[aKey]].concat(args));
  }

}