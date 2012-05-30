goog.provide("rflect.dom.AutoScroll");

goog.require("rflect.Root");
goog.require("goog.object");
goog.require("goog.Timer");
goog.require("goog.events.EventTarget");
goog.require("goog.events.EventHandler");

rflect.dom.AutoScroll =
rflect.Root.__create(function AutoScroll_Constructor(aAutoScrollOpt) {

  var autoScrollOpt = {
    delta: 20,
    boundElement: null,
    configuration: 0,
    interval: 20
  };

  goog.object.extend(autoScrollOpt, aAutoScrollOpt);

  this._timer = new goog.Timer(autoScrollOpt.interval);
  this.boundElement = autoScrollOpt.boundElement;
  this._configuration = autoScrollOpt.configuration;
  this._delta = autoScrollOpt.delta;
  this._offset = {
    x: 0,
    y: 0
  };

  this.listen(this._timer, goog.Timer.TICK, this._onTick);

}).__fuse({

  _position: 0,
  _offset: null,
  _delta: 20,
  boundElement: null,
  _configuration: 0,
  _direction: 0,

  _lowerLimit: 0,
  _upperLimit: 0,

  dispose: function AutoScroll_dispose() {

    if (!this.getDisposed()) {
      goog.events.EventTarget.prototype.dispose.call(this);
      goog.events.EventHandler.prototype.dispose.call(this);
      this._timer.dispose();
      this.boundElement = null;
    }

  },

  getPosition: function AutoScroll_getPosition() {
    var position = 0;
    switch (this._configuration) {
      case rflect.dom.AutoScroll.CONFIGURATION_HORIZONTAL: {
        position = this.boundElement["scrollLeft"];
      };break;
      case rflect.dom.AutoScroll.CONFIGURATION_VERTICAL: {
        position = this.boundElement["scrollTop"];
      };break;
      default:break;
    }
    ;
    return position;
  },

  isOnLimit: function AutoScroll_isOnLimit() {
    var position = this.getPosition();
    return (position == this._upperLimit) || (position == this._lowerLimit);

  },
  isOnLowerLimit: function AutoScroll_isOnLowerLimit() {

    return (this.getPosition() == this._lowerLimit);

  },
  isOnUpperLimit: function AutoScroll_isOnUpperLimit() {

    return (this.getPosition() == this._upperLimit);

  },

  start: function AutoScroll_start(aDirection, aOffsetX, aOffsetY) {

    this._direction = aDirection;
    this._offset.x = goog.isDef(aOffsetX) ? aOffsetX : 0;
    this._offset.y = goog.isDef(aOffsetY) ? aOffsetY : 0;

    switch (this._configuration) {
      case rflect.dom.AutoScroll.CONFIGURATION_HORIZONTAL: {
        this._position = this.boundElement["scrollLeft"];
      };break;
      case rflect.dom.AutoScroll.CONFIGURATION_VERTICAL: {
        this._position = this.boundElement["scrollTop"];
      };break;
      default:break;
    }
    ;

    this._timer.start();
    this.dispatchEvent({
      type: "scrollStart"
    });

  },

  setLimits: function AutoScroll_setLimits(aLowerLimit, aUpperLimit) {
    if (aLowerLimit != undefined) {
      this._lowerLimit = aLowerLimit;
    } else {
      this._lowerLimit = 0;
    }
    ;
    if (aUpperLimit != undefined) {
      this._upperLimit = aUpperLimit;
    } else {
      switch (this._configuration) {
        case rflect.dom.AutoScroll.CONFIGURATION_HORIZONTAL: {
          this._upperLimit = this.boundElement["scrollWidth"]
                  - this.boundElement["clientWidth"];
        };break;
        case rflect.dom.AutoScroll.CONFIGURATION_VERTICAL: {
          this._upperLimit = this.boundElement["scrollHeight"]
                  - this.boundElement["clientHeight"];
        };break;
        default:break;
      }
      ;

    }
    ;

  },

  stop: function AutoScroll_stop() {
    this._timer.stop();
    this.dispatchEvent({
      type: "scrollStop"
    });
  },

  _onTick: function AutoScroll_onTick() {
    var position = 0;
    var stop = false;
    var delta = this._delta;

    position = this._position;

    switch (this._direction) {
      case 1: {
        if ((position + delta) > this._upperLimit) {
          stop = true;
          delta = position - this._upperLimit;
          position = this._upperLimit;
        } else {
          position += delta;
        }
        ;
      };break;
      case -1: {
        delta = -delta;
        if ((position + delta) < this._lowerLimit) {
          stop = true;
          delta = this._lowerLimit - position;
          position = this._lowerLimit;
        } else {
          position += delta;
        }
        ;
      };break;
    }
    ;

    this._position = position;

    switch (this._configuration) {
      case rflect.dom.AutoScroll.CONFIGURATION_HORIZONTAL: {

        this.boundElement["scrollLeft"] = position;
        this._offset.x += delta;

        //echo("position: " + position);

      };break;
      case rflect.dom.AutoScroll.CONFIGURATION_VERTICAL: {

        this.boundElement["scrollTop"] = position;
        this._offset.y += delta;

        //echo("position: " + position);

      };break;
      default:break;
    }
    ;

    //echo("this._offset.x: " + this._offset.x);
    //echo("this._offset.y: " + this._offset.y);

    this.dispatchEvent({

      type: "scroll",
      offsetX: this._offset.x,
      offsetY: this._offset.y

    });


    if (stop) {
      this.stop();
    }
    ;

  },

  unload: function AutoScroll_unload() {
    goog.events.unlistenByKey(this._listener);
    this._timer.dispose();
  }

}).__assoc({

  CONFIGURATION_VERTICAL: 1,
  CONFIGURATION_HORIZONTAL: 2

}).__fuse(new goog.events.EventTarget()).__fuse(new goog.events.EventHandler());