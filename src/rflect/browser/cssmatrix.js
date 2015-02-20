/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview Abstraction of CSSMatrix.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.browser.cssmatrix');


/**
 * @param {string} aComputedStyle Computed style of transform -
 * element.style.transform.
 * @return {Object} CSSMatrix instance for this style.
 */
rflect.browser.cssmatrix.getInstance = function(aComputedStyle){
  if (window.WebKitCSSMatrix)
    return new WebKitCSSMatrix(aComputedStyle);
  if (window.MSCSSMatrix)
    return new MSCSSMatrix(aComputedStyle);
  if (window.CSSMatrix)
    return new CSSMatrix(aComputedStyle);
  return null;
};



!('CSSMatrix' in goog.global) && (function() {
  'use strict';

  /**
   * @constructor
   * @param {string=} opt_matrix
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#the-cssmatrix-interface
   * @see http://www.w3.org/TR/2009/WD-css3-3d-transforms-20090320/#cssmatrix-interface
   */
  function CSSMatrix(opt_matrix) {
    if (opt_matrix) {
      this.setMatrixValue(opt_matrix);
    } else {
      this.setIdentity();
    }

    return this;
  }

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m11;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m12;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m13;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m14;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m21;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m22;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m23;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m24;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m31;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m32;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m33;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m34;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m41;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m42;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m43;

  /**
   * @type {number}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#three-dimensional-attributes
   */
  CSSMatrix.prototype.m44;

  /**
   * @type {number}
   */
  CSSMatrix.prototype.a;

  /**
   * @type {number}
   */
  CSSMatrix.prototype.b;

  /**
   * @type {number}
   */
  CSSMatrix.prototype.c;

  /**
   * @type {number}
   */
  CSSMatrix.prototype.d;

  /**
   * @type {number}
   */
  CSSMatrix.prototype.e;

  /**
   * @type {number}
   */
  CSSMatrix.prototype.f;

  /**
   * @type {boolean}
   */
  CSSMatrix.prototype.affine;

  /**
   * @param {string} string
   * @return {void}
   */
  CSSMatrix.prototype.setMatrixValue = function(string) {
    string = String(string).trim();
    this.setIdentity();
    if (string == 'none')
      return;

    var type = string.slice(0, string.indexOf('(')), parts, i;
    if (type == 'matrix3d') {
      parts = string.slice(9, -1).split(',').map(part => parseFloat(part));
      this.m11 = this.a = parts[0]; this.m12 = this.b = parts[1]; this.m13 =
          parts[2]; this.m14 = parts[3];
      this.m21 = this.c = parts[4]; this.m22 = this.d = parts[5]; this.m23 =
          parts[6]; this.m24 = parts[7];
      this.m31 = parts[8]; this.m32 = parts[9]; this.m33 = parts[10]; this.m34 =
          parts[11];
      this.m41 = this.e = parts[12]; this.m42 = this.f = parts[13]; this.m43 =
          parts[14]; this.m44 = parts[15];
    } else if (type == 'matrix') {
      this.affine = true;
      parts = string.slice(7, -1).split(',').map(part => parseFloat(part));
      this.m11 = this.a = parts[0]; this.m12 = this.b = parts[2]; this.m41 =
          this.e = parts[4];
      this.m21 = this.c = parts[1]; this.m22 = this.d = parts[3]; this.m42 =
          this.f = parts[5];
    } else {
      throw new TypeError('Invalid Matrix Value');
    }
  };

  /**
   * @param {!CSSMatrix} secondMatrix
   * @return {!CSSMatrix}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-multiply-CSSMatrix-CSSMatrix-other
   */
  CSSMatrix.prototype.multiply = function(secondMatrix) {
    var m11 = secondMatrix.m11 * this.m11 + secondMatrix.m12 * this.m21 +
        secondMatrix.m13 * this.m31 + secondMatrix.m14 * this.m41,
        m12 = secondMatrix.m11 * this.m12 + secondMatrix.m12 * this.m22 +
        secondMatrix.m13 * this.m32 + secondMatrix.m14 * this.m42,
        m13 = secondMatrix.m11 * this.m13 + secondMatrix.m12 * this.m23 +
        secondMatrix.m13 * this.m33 + secondMatrix.m14 * this.m43,
        m14 = secondMatrix.m11 * this.m14 + secondMatrix.m12 * this.m24 +
        secondMatrix.m13 * this.m34 + secondMatrix.m14 * this.m44,

        m21 = secondMatrix.m21 * this.m11 + secondMatrix.m22 * this.m21 +
        secondMatrix.m23 * this.m31 + secondMatrix.m24 * this.m41,
        m22 = secondMatrix.m21 * this.m12 + secondMatrix.m22 * this.m22 +
        secondMatrix.m23 * this.m32 + secondMatrix.m24 * this.m42,
        m23 = secondMatrix.m21 * this.m13 + secondMatrix.m22 * this.m23 +
        secondMatrix.m23 * this.m33 + secondMatrix.m24 * this.m43,
        m24 = secondMatrix.m21 * this.m14 + secondMatrix.m22 * this.m24 +
        secondMatrix.m23 * this.m34 + secondMatrix.m24 * this.m44,

        m31 = secondMatrix.m31 * this.m11 + secondMatrix.m32 * this.m21 +
        secondMatrix.m33 * this.m31 + secondMatrix.m34 * this.m41,
        m32 = secondMatrix.m31 * this.m12 + secondMatrix.m32 * this.m22 +
        secondMatrix.m33 * this.m32 + secondMatrix.m34 * this.m42,
        m33 = secondMatrix.m31 * this.m13 + secondMatrix.m32 * this.m23 +
        secondMatrix.m33 * this.m33 + secondMatrix.m34 * this.m43,
        m34 = secondMatrix.m31 * this.m14 + secondMatrix.m32 * this.m24 +
        secondMatrix.m33 * this.m34 + secondMatrix.m34 * this.m44,

        m41 = secondMatrix.m41 * this.m11 + secondMatrix.m42 * this.m21 +
        secondMatrix.m43 * this.m31 + secondMatrix.m44 * this.m41,
        m42 = secondMatrix.m41 * this.m12 + secondMatrix.m42 * this.m22 +
        secondMatrix.m43 * this.m32 + secondMatrix.m44 * this.m42,
        m43 = secondMatrix.m41 * this.m13 + secondMatrix.m42 * this.m23 +
        secondMatrix.m43 * this.m33 + secondMatrix.m44 * this.m43,
        m44 = secondMatrix.m41 * this.m14 + secondMatrix.m42 * this.m24 +
        secondMatrix.m43 * this.m34 + secondMatrix.m44 * this.m44;

    var m = new CSSMatrix();

    m.m11 = m11; m.m12 = m12; m.m13 = m13; m.m14 = m14;
    m.m21 = m21; m.m22 = m22; m.m23 = m23; m.m24 = m24;
    m.m31 = m31; m.m32 = m32; m.m33 = m33; m.m34 = m34;
    m.m41 = m41; m.m42 = m42; m.m43 = m43; m.m44 = m44;

    return m;
  };

  /**
   * @return {CSSMatrix} Returns void if the matrix is non-invertable.
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-inverse-CSSMatrix
   */
  CSSMatrix.prototype.inverse = function() {
    throw new Error('the inverse() method is not implemented (yet).');
  };

  /**
   * @param {number=} opt_x Defaults to 0.
   * @param {number=} opt_y Defaults to 0.
   * @param {number=} opt_z Defaults to 0.
   * @return {!CSSMatrix}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-translate-CSSMatrix-unrestricted-double-tx-unrestricted-double-ty-unrestricted-double-tz
   */
  CSSMatrix.prototype.translate = function(opt_x, opt_y, opt_z) {
    var x = opt_x || 0;
    var y = opt_y || 0;
    var z = opt_z || 0;

    var m = new CSSMatrix();
    m.m41 = m.e = x;
    m.m42 = m.f = y;
    m.m43 = z;

    return this.multiply(m);
  };

  /**
   * @param {number=} opt_scaleX Defaults to 1.
   * @param {number=} opt_scaleY Defaults to scaleX.
   * @param {number=} opt_scaleZ Defaults to 1.
   * @return {!CSSMatrix}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-scale-CSSMatrix-unrestricted-double-scale-unrestricted-double-originX-unrestricted-double-originY
   */
  CSSMatrix.prototype.scale = function(opt_scaleX, opt_scaleY, opt_scaleZ) {
    var x = opt_scaleX;
    var y = opt_scaleY;
    var z = opt_scaleY;

    if (x == null) {
      x = 1;
    }
    if (y == null) {
      y = x;
    }
    if (z == null) {
      z = 1;
    }

    var m = new CSSMatrix();
    m.m11 = m.a = x;
    m.m22 = m.d = y;
    m.m33 = z;

    return this.multiply(m);
  };

  /**
   * @param {number=} opt_rotX Defaults to 0.
   * @param {number=} opt_rotY Defaults to 0.
   * @param {number=} opt_rotZ Defaults to rotX if rotY is not defined, else 0.
   * @return {!CSSMatrix}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-rotate-CSSMatrix-unrestricted-double-angle-unrestricted-double-originX-unrestricted-double-originY
   */
  CSSMatrix.prototype.rotate = function(opt_rotX, opt_rotY, opt_rotZ) {
    var rx = opt_rotX || 0;
    var ry = opt_rotY || 0;
    var rz = opt_rotZ;

    if (rz == null) {
      if (opt_rotY == null) {
        rz = rx;
      } else {
        rz = 0;
      }
    }

    rx *= Math.PI / 180;
    ry *= Math.PI / 180;
    rz *= Math.PI / 180;
    // minus sin() because of right-handed system
    var cosx = Math.cos(rx), sinx = -Math.sin(rx);
    var cosy = Math.cos(ry), siny = -Math.sin(ry);
    var cosz = Math.cos(rz), sinz = -Math.sin(rz);

    var m = new CSSMatrix();

    m.m11 = m.a = cosy * cosz;
    m.m12 = m.b = - cosy * sinz;
    m.m13 = siny;

    m.m21 = m.c = sinx * siny * cosz + cosx * sinz;
    m.m22 = m.d = cosx * cosz - sinx * siny * sinz;
    m.m23 = - sinx * cosy;

    m.m31 = sinx * sinz - cosx * siny * cosz;
    m.m32 = sinx * cosz + cosx * siny * sinz;
    m.m33 = cosx * cosy;

    return this.multiply(m);
  };

  /**
   * @param {number=} opt_x Defaults to 0.
   * @param {number=} opt_y Defaults to 0.
   * @param {number=} opt_z Defaults to 0.
   * @param {number=} opt_angle Defaults to 0.
   * @return {!CSSMatrix}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-rotateAxisAngle-CSSMatrix-unrestricted-double-x-unrestricted-double-y-unrestricted-double-z-unrestricted-double-angle
   */
  CSSMatrix.prototype.rotateAxisAngle =
      function(opt_x, opt_y, opt_z, opt_angle) {
    var x = opt_x || 0;
    var y = opt_y || 0;
    var z = opt_z || 0;
    var angle = opt_angle || 0;

    angle *= Math.PI / 360;

    var sinA = Math.sin(angle), cosA = Math.cos(angle), sinA2 = sinA * sinA;
    var length = Math.sqrt(x * x + y * y + z * z);

    if (length === 0) {
      // bad vector length, use something reasonable
      x = 0;
      y = 0;
      z = 1;
    } else {
      x /= length;
      y /= length;
      z /= length;
    }

    var x2 = x * x, y2 = y * y, z2 = z * z;

    var m = new CSSMatrix();
    m.m11 = m.a = 1 - 2 * (y2 + z2) * sinA2;
    m.m12 = m.b = 2 * (x * y * sinA2 + z * sinA * cosA);
    m.m13 = 2 * (x * z * sinA2 - y * sinA * cosA);
    m.m21 = m.c = 2 * (y * x * sinA2 - z * sinA * cosA);
    m.m22 = m.d = 1 - 2 * (z2 + x2) * sinA2;
    m.m23 = 2 * (y * z * sinA2 + x * sinA * cosA);
    m.m31 = 2 * (z * x * sinA2 + y * sinA * cosA);
    m.m32 = 2 * (z * y * sinA2 - x * sinA * cosA);
    m.m33 = 1 - 2 * (x2 + y2) * sinA2;
    m.m14 = m.m24 = m.m34 = 0;
    m.m41 = m.e = m.m42 = m.f = m.m43 = 0;
    m.m44 = 1;

    return this.multiply(m);
  };


  /**
   * Set the current matrix to the identity form
   *
   * @return {CSSMatrix} this matrix
   */
  CSSMatrix.prototype.setIdentity = function(){
    var m = this;
    m.m11 = m.a = 1; m.m12 = m.b = 0; m.m13 = 0; m.m14 = 0;
    m.m21 = m.c = 0; m.m22 = m.d = 1; m.m23 = 0; m.m24 = 0;
    m.m31 = 0; m.m32 = 0; m.m33 = 1; m.m34 = 0;
    m.m41 = m.e = 0; m.m42 = m.f = 0; m.m43 = 0; m.m44 = 1;
    return this;
  };

  /**
   * Returns a string representation of the matrix.
   * @return {string}
   */
  CSSMatrix.prototype.toString = function(){
    var m = this;

    if (this.affine){
      return  'matrix(' + [
        m.a, m.b,
        m.c, m.d,
        m.e, m.f
      ].join(', ') + ')';
    }
    // note: the elements here are transposed
    return  'matrix3d(' + [
      m.m11, m.m12, m.m13, m.m14,
      m.m21, m.m22, m.m23, m.m24,
      m.m31, m.m32, m.m33, m.m34,
      m.m41, m.m42, m.m43, m.m44
    ].join(', ') + ')';
  };

  //Exporting.
  goog.exportSymbol('', CSSMatrix);

})();
