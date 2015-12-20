/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Rflect math utilities.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.math');


/**
 * Complete number to be nearest one divisible by 7. This could be
 * used when we need to include days of month in table of format
 * (week rows x weekday cols), so we need total number of cells to be divisible
 * by 7.
 * @param {number} aNumber Number to be completed.
 * @return {number} this.
 */
rflect.math.completeToDivisibleBy7 =
    function math_completeToDivisibleBy7(aNumber) {
  if (aNumber % 7 == 0)
    return aNumber;
  return aNumber - aNumber % 7 + 7;
};


/**
 * @param {number} aPixel Pixels to convert to percents.
 * @param {number} aContainerDimension From which height/width percents should
 * be adjusted.
 * @return {number} Percents converted from pixels.
 */
rflect.math.pixelToPercent =
    function math_pixelToPercent(aPixel, aContainerDimension) {
  return aPixel / aContainerDimension * 100;
};


/**
 * @param {number} aPercent Percents to convert to pixels.
 * @param {number} aContainerDimension From which height/width percents should
 * be adjusted.
 * @return {number} Pixels converted from percents.
 */
rflect.math.percentToPixel =
    function math_percentToPixel(aPercent, aContainerDimension) {
  return aPercent / 100 * aContainerDimension;
};


/**
 * Calculates value between lower and upper boundaries.
 * For example, scale 1 corresponds to 10, scale 10 corresponds to 100. If we
 * need unknown value for scale 2, it will be 20.
 *
 * @return {number} Value, scaled between lower and upper boundaries.
 */
rflect.math.getScaledValue = function(aScale, aScale1, aScale2, aBoundary1,
    aBoundary2) {
  var increment = (aBoundary2 - aBoundary1) / (aScale2 - aScale1);
  return (aScale - aScale1) * increment + aBoundary1;
};


/**
 * Returns the sign of a number as per the "sign" or "signum" function.
 * @param {number} x The number to take the sign of.
 * @return {number} -1 when negative, 1 when positive, 0 when 0.
 */
rflect.math.sign = Math.sign ? Math.sign : x => x == 0 ? 0 : (x < 0 ? -1 : 1);