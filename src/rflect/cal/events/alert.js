/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Alert class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */
goog.provide('rflect.cal.events.Alert');
goog.provide('rflect.cal.events.Alert.AlertType');



/**
 * Class that stores info about alert.
 */
class Alert {
  /**
   * @param {rflect.cal.events.Alert.AlertType} aType Type of alert.
   * @param {number} aInterval How much time before to execute alert, in ms.
   */
  constructor(aType, aInterval) {
    this.type = aType;
    this.interval = aInterval;
  };

  /**
   * @return String representation.
   */
  toString() {
    return 'type: ' +
        this.type +
        ', interval: ' +
        this.interval;
  };

  /**
   * @return {rflect.cal.events.Alert} Clone of this alert.
   */
  clone() {
    var clone = new rflect.cal.events.Alert(this.type, this.interval);

    return clone;
  };
}


/**
 * @typedef {Alert}
 */
rflect.cal.events.Alert = Alert;


/**
 * Index of type in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Alert.FIELD_TYPE = 0;


/**
 * Index of interval in JSON array.
 * @type {number}
 * @const
 */
rflect.cal.events.Alert.FIELD_INTERVAL = 1;


/**
 * @return {Array} JSON representation of alert.
 */
rflect.cal.events.Alert.prototype['toJSON'] = function() {
  var alert = [];

  alert[rflect.cal.events.Alert.FIELD_TYPE] = this.type;
  alert[rflect.cal.events.Alert.FIELD_INTERVAL] = this.interval;

  return alert;
};


/**
 * Factory method that creates alert from JSON array.
 * @param {Array} aArray Array representation.
 * @return {rflect.cal.events.Alert} Alert representation.
 */
rflect.cal.events.Alert.fromJSON = function(aArray) {
  var type = aArray[rflect.cal.events.Alert.FIELD_TYPE];
  var interval = aArray[rflect.cal.events.Alert.FIELD_INTERVAL];

  return new rflect.cal.events.Alert(type, interval);
}


/**
 * Types of alert.
 * @enum {number}
 * @const
 */
rflect.cal.events.Alert.AlertType = {
  POPUP: 1,
  SOUND: 2,
  E_MAIL: 3
};
