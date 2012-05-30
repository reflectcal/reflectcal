goog.provide("rflect.cal.GridControl");

goog.require("rflect.Root");
goog.require("goog.events.EventTarget");
goog.require("goog.array");
goog.require("goog.events");
goog.require("goog.dom");
goog.require("goog.object");

rflect.cal.GridControl = rflect.Root.__create(function GridControl_Constructor(aGridControlOptions) {

  var gridControlOptions = {
    containerDimension: null,
    delimiterPositions: null
  };

  goog.object.extend(gridControlOptions, aGridControlOptions);

  this._percentPositions = [];
  this._pixelPositions = [];

  this.containerDimension = gridControlOptions.containerDimension;
  this.setDelimiterPositions.apply(this, gridControlOptions.delimiterPositions);

}).__fuse({

  containerDimension: 0,

  _percentPositions: null,
  _pixelPositions: null,

  setDelimiterPositions: function GridControl_setDelimiterPositions(varArgsPositions) {
    this._percentPositions = [];
    this._percentPositions.push.apply(this._percentPositions, arguments);
  },

  _convertDelimiterPositions: function GridControl__convertDelimiterPositions(aDirection) {

    var PERCENT_TO_PIXEL = 1;
    var PIXEL_TO_PERCENT = 2;

    var counter = 0;

    switch (aDirection) {

      case PERCENT_TO_PIXEL:{
        this._pixelPositions = [];
        for (counter = 0; counter < this._percentPositions.length; counter++) {
          this._pixelPositions.push(
                  rflect.math.percentToPixel(this._percentPositions[counter],
                          this.containerDimension)
                  );
        }
      };break;

      case PIXEL_TO_PERCENT:{
        this._percentPositions = [];
        for (counter = 0; counter < this._pixelPositions.length; counter++) {
          this._percentPositions.push(
                  rflect.math.pixelToPercent(this._pixelPositions[counter],
                          this.containerDimension)
                  );
        }
      };break;

    }


  },

  changeSpaceValue: function GridControl_changeSpaceValue(aSpacesValues/*aSpaceIndex, aValueToModifyWith*/) {

    var delimiterIndex = 0;
    var spaceIndex = 0;
    var cumulativeShift = 0;

    var lastSpaceIndex = this._percentPositions.length - 1;

    this._convertDelimiterPositions(1);

    // Calculating new pixel positions.
    for (delimiterIndex = 0; delimiterIndex < this._pixelPositions.length; delimiterIndex++) {

      // We're looking for delimiter which is situated to the right (or bottom)
      //  side of corresponding space
      spaceIndex = delimiterIndex - 1;
      if (spaceIndex in aSpacesValues) {
        cumulativeShift += aSpacesValues[spaceIndex];
      }
      this._pixelPositions[delimiterIndex] += cumulativeShift;

    }

    // Calculating new dimension value
    if (lastSpaceIndex in aSpacesValues) {
      cumulativeShift += aSpacesValues[lastSpaceIndex];
    }


    this.containerDimension += cumulativeShift;

    this._convertDelimiterPositions(2);

    this.dispatchEvent({
      type: "changeSpaceValue",
      delimiterPercentPositions: this._percentPositions,
      delimiterPixelPositions: this._pixelPositions,
      containerDimension: this.containerDimension
    });

  },

  collapseBy: function GridControl_collapseBy(aSpaceIndex, aValueToCollapseWith) {

    this.changeSpaceValue(aSpaceIndex, -aValueToCollapseWith);

  },

  dispose: function GridControl_dispose() {

    if (!this.getDisposed()) {
      goog.events.EventTarget.prototype.dispose.call(this);
    }

  },


  expandBy: function GridControl_expandBy(aSpaceIndex, aValueToExpandWith) {

    this.changeSpaceValue(aSpaceIndex, aValueToExpandWith);

  },

  reset: function GridControl_reset() {

    this._percentPositions = [];
    this._pixelPositions = [];
    this.containerDimension = 0;

  }

}).__fuse(new goog.events.EventTarget());