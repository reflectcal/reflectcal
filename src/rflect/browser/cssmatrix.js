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



(function(){
  /**
   * @constructor
   * @param {string=} opt_matrix
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#the-cssmatrix-interface
   */
  function CSSMatrix(opt_matrix) {
    m = this;
    m.setIdentity();
    if (opt_matrix) {
      m.setMatrixValue(opt_matrix);
    }
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
   * @param {string} string
   * @return {void}
   */
  CSSMatrix.prototype.setMatrixValue = function(string) {
    string = String(string).trim();
    var m = this;
    m.setIdentity();
    if (string == 'none') return m;
    var type = string.slice(0, string.indexOf('(')), parts, i;
    if (type == 'matrix3d'){
      parts = string.slice(9, -1).split(',');
      for (i = parts.length; i--;) parts[i] = parseFloat(parts[i]);
      m.m11 = m.a = parts[0]; m.m12 = m.b = parts[1]; m.m13 = parts[2];  m.m14 = parts[3];
      m.m21 = m.c = parts[4]; m.m22 = m.d = parts[5]; m.m23 = parts[6];  m.m24 = parts[7];
      m.m31 = parts[8]; m.m32 = parts[9]; m.m33 = parts[10]; m.m34 = parts[11];
      m.m41 = m.e = parts[12]; m.m42 = m.f = parts[13]; m.m43 = parts[14]; m.m44 = parts[15];
    } else if (type == 'matrix'){
      m.affine = true;
      parts = string.slice(7, -1).split(',');
      for (i = parts.length; i--;) parts[i] = parseFloat(parts[i]);
      m.m11 = m.a = parts[0]; m.m12 = m.b = parts[2]; m.m41 = m.e = parts[4];
      m.m21 = m.c = parts[1]; m.m22 = m.d = parts[3]; m.m42 = m.f = parts[5];
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

    return new CSSMatrix(
      m11, m12, m13, m14,
      m21, m22, m23, m24,
      m31, m32, m33, m34,
      m41, m42, m43, m44
    );
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

    return this.multiply(this, m);
  };

  /**
   * @param {number=} opt_scaleX Defaults to 1.
   * @param {number=} opt_scaleY Defaults to scaleX.
   * @param {number=} opt_scaleZ Defaults to 1.
   * @return {!CSSMatrix}
   * @see https://dvcs.w3.org/hg/FXTF/raw-file/tip/matrix/index.html#widl-CSSMatrix-scale-CSSMatrix-unrestricted-double-scale-unrestricted-double-originX-unrestricted-double-originY
   */
  CSSMatrix.prototype.scale = function(opt_scaleX, opt_scaleY, opt_scaleZ) {
    var x, y, z;
    if (opt_scaleX == null) x = 1 else x = opt_scaleX;
    if (opt_scaleY == null) y = x else y = opt_scaleY;
    if (opt_scaleZ == null) z = 1 else z = opt_scaleZ;

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
    var rx, ry, rz;
    if (opt_rotX == null) rx = 0 else x = opt_rotX;
    if (opt_rotY == null) ry = 0 else y = opt_rotY;
    if (opt_scaleZ == null) {
      rz = 1
    } else {
      z = opt_scaleZ;
    }

    if (ry == null) ry = rx;
    if (rz == null) rz = rx;



    return this.multiply(this, CSSMatrix.Rotate(rx, ry, rz));
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
      function(opt_x, opt_y, opt_z, opt_angle) {};


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

  //Exporting.
  if (!('CSSMatrix' in goog.global)) {
    goog.exportSymbol('', CSSMatrix);
  }
})();
