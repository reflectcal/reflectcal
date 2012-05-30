goog.provide("rflect.math");

rflect.math.generateRandom = function () {
  return ~~(Math.floor(Math.random() * 4294967296) - 2147483648);
};
rflect.math.roundTo = function Math_roundTo(aFloatNumber, decimalNumber) {
  var decimalMultiplier = Math.pow(10, decimalNumber);
  return Math.round(aFloatNumber * decimalMultiplier) / decimalMultiplier;
};
rflect.math.pixelToPercent = function Math_pixelToPercent(aPixel, aContainerDimension) {
  return aPixel / aContainerDimension * 100;
};
rflect.math.percentToPixel = function Math_percentToPixel(aPercent, aContainerDimension) {
  return aPercent / 100 * aContainerDimension;
};