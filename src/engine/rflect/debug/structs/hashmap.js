goog.provide("rflect.debug.structs.HashMap");

goog.require("rflect.Root");

rflect.debug.structs.HashMap = rflect.Root.__create(function HashMap_Constructor(source) {
  this._hashObject = {};
  if (source)
    this.put(source);
}).__fuse({
  _hashObject: {},
  _hashSize: 0,

  clear: function hashClear() {
    this._hashObject = {};
    this._hashSize = 0;
  },
  getKeys: function hashGetKeys() {
    var output = [];
    var counter = 0;
    for (var objectProperty in this._hashObject) {
      output[counter] = objectProperty;
      counter++;
    }
    return output;
  },
  getValue: function hashGetValue(aKey) {
    if (aKey in this._hashObject)
      return this._hashObject[aKey]
  },
  hasKey: function hashHasKey(aKey) {
    return aKey in this._hashObject;
  },
  each: function HashMap_each(aThisArg, aFunction) {
    for (var key in this._hashObject) {
      var value = this._hashObject[key];
      if (aFunction.call(aThisArg, key, value) == rflect.debug.structs.HashMap.ITERATOR_BREAK)
        break;
    }
    // TODO:
    delete aFunction;
  },
  isEmpty: function hashIsEmpty() {
    // TODO: Need equals method
    return (this._hashSize == 0);
  },
  put: function hashPutValues(aKey, aValue) {
    if (arguments.length == 2) {
      if (!(arguments[0] in this._hashObject)) this._hashSize++;
      this._hashObject[arguments[0]] = arguments[1];
    }
    else if (arguments.length == 1)
      for (var objectProperty in arguments[0]) {
        if (!(objectProperty in this._hashObject)) this._hashSize++;
        this._hashObject[objectProperty] = arguments[0][objectProperty];
      }
  },
  remove: function hashRemoveKeys() {
    var keys = arguments;
    for (var counter = 0; counter < keys.length; counter++)
      if (keys[counter] in this._hashObject) {
        delete this._hashObject[keys[counter]];
        this._hashSize--;
      }
  },
  size: function hashGetSize() {
    return this._hashSize;
  },
  toString: function hashToString() {
    var stringRepresentation = "{\n";
    for (var objectProperty in this._hashObject) {
      stringRepresentation +=
      "  " + objectProperty + ":" + this._hashObject[objectProperty] + ",\n";
    }
    if (!this.isEmpty()) stringRepresentation =
                         stringRepresentation.slice(0, -2);
    return stringRepresentation + "\n}";
  }
}).__assoc({
  ITERATOR_BREAK: 5
});