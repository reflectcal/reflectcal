/**
 * @fileoverview Localization extension which provides
 * dictionary lookup similar to {@link goog.string.subs}
 * method. Also depends on additional packages. This
 * package is separate from rflect.loc due to additional
 * requirements, so if you need simple dictionary
 * lookup, use rflect.loc instead.
 */

goog.require("rflect.loc.subs");

goog.provide("rflect.loc.subs.Dict");

rflect.loc.subs.Dict = function(aDict) {
  this._dict = aDict;
}

rflect.loc.subs.Dict.prototype.dictKey = function(aKey, aVarArgs) {

  rflect.loc.subs.dictKey(this._dict[aKey])

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