goog.require("rflect");

goog.provide("rflect.Root");

rflect.Root = {

  __creator: Object,
  __type: rflect._class.CLASS_ABSTRACT,

  /**
   * Adds static properties to the class.
   * Method name is mangled with double
   * underscore in order not
   * to interfere with any public property:
   * Class.property or private property:
   * Class._property
   * @param {Object} aStatic The object with properties
   * which need to be set as static in class.
   * @param {boolean} aFinal Indicator which makes
   * properties final
   * @return {Object} Class with static properties set.
   * @static
   */
  __assoc: function Root___assoc(aStatic, aFinal) {

    var staticProperty = "";

    if (aFinal) {
      if (!("__finalProperties" in this))
        this.__finalProperties = {};
      for (staticProperty in aStatic) {
        this[staticProperty] = aStatic[staticProperty];
        this.__finalProperties[staticProperty] = null;
      }
    } else {
      for (staticProperty in aStatic) {
        // Copy all except create properties
        if (!(staticProperty in rflect._class.createProperties))
          this[staticProperty] = aStatic[staticProperty];
      }
    }


    return this;
  },

  /**
   * Adds instance properties to the class.
   * Method name is mangled with double
   * underscore in order not
   * to interfere with any public property:
   * Class.property or private property:
   * Class._property
   * @param {Object} aInstance The object with properties
   * which need to be set as instance in class.
   * @param {boolean} aFinal Indicator which makes
   * properties final
   * @return {Object} Class with instance properties set.
   * @static
   */
  __fuse: function Root___fuse(aInstance, aFinal) {

    var prototypeProperty = "";

    // If class is abstract,
    //  add prototype to it
    // TODO: Check this
    if (!("prototype" in this))
      this.prototype = {};

    if (aFinal) {
      if (!("__finalProperties" in this.prototype))
        this.prototype.__finalProperties = {};
      for (prototypeProperty in aInstance) {
        this.prototype[prototypeProperty] = aInstance[prototypeProperty];
        this.prototype.__finalProperties[prototypeProperty] = null;
      }
    } else {
      for (prototypeProperty in aInstance) {
        // Copy all except create properties
        if (!(prototypeProperty in rflect._class.createProperties))
          this.prototype[prototypeProperty] = aInstance[prototypeProperty];
      }
    }

    return this;

  },
  /**
   * Creates spawn class which extends parent.
   * Method name is mangled with double
   * underscore in order not
   * to interfere with any public property:
   * Class.property or private property:
   * Class._property
   * @param {Object | Function} aBasis Basis on
   * which to create new class.
   * @param {number} aType Explicit type of new class
   * @return {Object} New class.
   * @static
   */
  __create: function Root_create(aBasis, aType) {

    var constructor = aBasis || (function() {
    });
    var spawn = null;
    var inheritedProperty = "";

    var basisType = typeof aBasis;
    var explicitType = (aType == undefined)
            ? ((basisType == "function")
            ? rflect._class.CLASS_PROTOTYPIC
            : ((basisType == "object")
            ? rflect._class.CLASS_ABSTRACT
            : null) )
            : aType

    // We want to create abstract class from our abstract class
    if ((explicitType == rflect._class.CLASS_ABSTRACT) && (this.__type == rflect._class.CLASS_ABSTRACT)) {
      spawn = {};
      // Copy static methods
      for (inheritedProperty in this)
        spawn[inheritedProperty] = this[inheritedProperty];
      // Then copy properties from basis
      for (inheritedProperty in aBasis) {
        spawn[inheritedProperty] = aBasis[inheritedProperty];
      }
    }
    // We want to create prototypic class...
    if (explicitType == rflect._class.CLASS_PROTOTYPIC) {

      spawn = constructor;
      // Copy static methods, except creator
      for (inheritedProperty in this) {
        spawn[inheritedProperty] = this[inheritedProperty];
      }
      //... from our prototypic class
      if (this.__type == rflect._class.CLASS_PROTOTYPIC) {

        // Copy methods
        function tempCtor() {
        }
        ;
        tempCtor.prototype = this.prototype;
        spawn.prototype = new tempCtor();
        // spawn.prototype = this.prototype;
        spawn.prototype.constructor = constructor;

      }
        //... from our abstract class
      else {
        spawn.prototype.constructor = constructor;
      }
      // Add parent to the spawn
      spawn.prototype.__creator = this;

    }

    spawn.__creator = this;
    spawn.__type = explicitType;

    return spawn;

  }

}