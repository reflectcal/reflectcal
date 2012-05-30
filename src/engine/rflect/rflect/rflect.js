goog.provide("rflect");

var rflect = {};

rflect._class = {

  // Constants
  CLASS_ABSTRACT: 1,
  CLASS_PROTOTYPIC: 2,
  CLASS_CRYPTIC: 3,
  CLASS_SINGLETON: 4,
  CLASS_MULTITON: 5,

  ERROR_CLASS_TYPE_IS_NOT_SPECIFIED: "Class type is not specified",

  createProperties:{"__type": true,
    "__creator": true}


}
