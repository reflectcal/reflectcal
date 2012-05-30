goog.provide("rflect.cal.History");

goog.require("goog.Disposable");
goog.require("goog.History");
goog.require("goog.events.EventHandler");

rflect.cal.History = rflect.Root.__create(function History_Constructor(aHistoryOpts) {

  var historyOpts = {
    cal: null
  };

  goog.object.extend(historyOpts, aHistoryOpts);

  this._cal = historyOpts.cal;
  this._actions = [];

  this._hist = new goog.History(true, rflect.cal.History.FRAME_SRC);
  //this._hist = new goog.History();

  this.listen(this._hist, goog.History.EventType.NAVIGATE, this._onHistoryNavigate);

  this._hist.setEnabled(true);

}).__fuse({

  // Set to true to disable first run.
  _negateCallback: true,
  // Whether first callback delayed from setEnabled fired in IE.
  _ieFirstCallbackFired: false,

  _actions: null,

  _onHistoryNavigate: function History__onHistoryNavigate(aEvent) {

    //echo("_onHistoryNavigate called", 1);
    //echo("this._negateCallback: " + this._negateCallback, 1);
    //echo("this._ieFirstCallbackFired: " + this._ieFirstCallbackFired, 1);
    //echo("callback token: " + aEvent.token);

    var action = 0;
    var token = 0;
    var actionParams = 0;

    if (this._negateCallback) {
      this._negateCallback = false;

    // IE fires historyNavigate twice, once from setToken and
      //  once from setEnabled. So on first two calls we should negate both callbacks.
    } else if (goog.userAgent.IE && !this._ieFirstCallbackFired) {
      this._ieFirstCallbackFired = true;
      //echo("this._ieFirstCallbackFired: " + this._ieFirstCallbackFired, 1);
    } else {
      token = +aEvent.token;
      //echo("callback token: " + token);
      if (token in this._actions) {

        //echo("callback token: " + token + "is in stored data");

        action = this._actions[token].action;
        actionParams = this._actions[token].actionParams;

        switch (action) {
          case rflect.cal.History.ACTION_SHIFT_VIEW:{
            actionParams.methodEntry["byHistory"] = true;
            actionParams.methodEntry["shiftDateTime"] =
            actionParams.baseDateTime;
            this._cal._shiftView(actionParams.methodEntry);
          };break;
          case rflect.cal.History.ACTION_SWITCH_VIEW:{
            this._cal.viewOptions.baseDateTime = actionParams.baseDateTime;
            actionParams.methodEntry["byHistory"] = true;
            actionParams.methodEntry["byTab"] = false;
            echo("_switchView from history", 1);
            this._cal._switchView(actionParams.methodEntry);
          };break;
        }


      } else {

        //echo("callback token: " + token + "is not in stored data");

      }

    }

  },

  dispose: function History_dispose() {
    if (!this.getDisposed()) {

      this._hist.dispose();
      goog.events.EventHandler.prototype.dispose.call(this);

    }
  },

  update: function History_update(aAction, aActionParams) {

    //echo("History_update called", 1);
    //echo("this._hist.enabled_: " + this._hist.enabled_);

    var token = 0;
    var length = this._actions.length;

    // Set this variable to true,
    //  to prevent immediate callback after
    //  setting of history token
    this._negateCallback = true;

    token = length.toString();
    //echo("token: " + token);
    this._hist.setToken(token);

    this._actions.push({
      action: aAction,
      actionParams: aActionParams
    });
  }
}).__assoc({
  ACTION_SHIFT_VIEW: 1,
  ACTION_SWITCH_VIEW: 2,
  FRAME_SRC: HISTORY_FRAME_SRC
}).__fuse(new goog.Disposable()).__fuse(new goog.events.EventHandler());