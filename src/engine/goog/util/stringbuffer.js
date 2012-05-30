// Copyright 2006 Google Inc.
// All Rights Reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 
//  * Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in
//    the documentation and/or other materials provided with the
//    distribution.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE. 

/**
 * @fileoverview Utility for fast string concatenation.
 */

goog.provide('goog.string.StringBuffer');

goog.require('goog.userAgent.jscript');

/**
 * Utility class to facilitate much faster string concatenation in IE,
 * using Array.join() rather than the '+' operator.  For other browsers
 * we simply use the '+' operator.
 *
 * @param {Object} var_args Initial items to append.
 *     e.g., new goog.string.StringBuffer('foo', 'bar').
 * @constructor
 */
goog.string.StringBuffer = function(var_args) {
  /**
   * Internal buffer for the string to be concatenated.
   * @type {string|Array}
   * @private
   */
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : '';

  this.append.apply(this, arguments);
};

/**
 * Upper limit of elements which are suspected to be concatenated
 * in one {@link goog.string.StringBuffer.prototype.append} operation.
 * This is set before compile time. If set to 0, no Duff device will be used.
 * @type {number}
 * @private
 */
goog.string.StringBuffer.ONE_TIME_CONCATENATION_ELEMENTS_LIMIT = 33;

/**
 * Sets the contents of the string buffer object, replacing what's currently 
 * there.
 *
 * @param {string} s String to set.
 */
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s);
};


if (goog.userAgent.jscript.HAS_JSCRIPT) {
  /**
   * Length of internal buffer (faster than calling buffer_.length).
   * Only used if buffer_ is an array.
   * @type {number}
   * @private
   */
  goog.string.StringBuffer.prototype.bufferLength_ = 0;

  /**
   * Appends one or more items to the buffer.
   *
   * @param {Object} var_args Items to append. e.g., sb.append('foo', 'bar').
   * @return {goog.string.StringBuffer} This same StringBuffer object.
   */
  goog.string.StringBuffer.prototype.append = function(var_args) {
    // IE version.
    if (arguments.length == 1) {
      // Array assignment is 2x faster than Array push.
      this.buffer_[this.bufferLength_++] = arguments[0];
    } else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length;
    }
    return this;
  };
} else {
  /**
   * Appends one or more items to the buffer.
   *
   * Method constructed in compile time with {@code eval}.
   * Its body, when constructed, look like:
   *   goog.string.StringBuffer.prototype.append = function(var_args) {
   *   // W3 version.
   *   var buffer = "";
   *   var length = arguments.length;
   *   if (length < goog.string.StringBuffer.ONE_TIME_CONCATENATION_ELEMENTS_LIMIT) {
   *     switch (length) {
   *       case M: buffer = arguments[M - 1] + buffer;
   *       ...
   *       case 1: buffer = arguments[0] + buffer;
   *       case 0: ;break;
   *       default: break;
   *     }
   *     ;
   *   } else {
   *     for (var i = 0; i < arguments.length; i++) {
   *       buffer += arguments[i];
   *     }
   *   }
   *   ;
   *
   *
   *   this.buffer_ += buffer;
   *   return this;
   * };
   *
   * where M - arguments length.
   *
   *
   * @param {Object} var_args Items to append. e.g., sb.append('foo', 'bar').
   * @return {goog.string.StringBuffer} This same StringBuffer object.
   * @eval
   */
  (function() {
    var counter = 0;
    var length = 0;
    var program = "";
    var t1 = "function(var_args) {\/\/ W3 version. \n" +
             "var buffer = \"\"; \n" +
             "var length = arguments.length; \n";
    var t2 = "if (length <= goog.string.StringBuffer.ONE_TIME_CONCATENATION_ELEMENTS_LIMIT) {\n" +
      //"echo(\"We are under limit!\");" +
             "switch (length) {";
    var t3 = "case ";
    var t4 = ": buffer = arguments["
    var t5 = "] + buffer;\n";
    //var t4 = ": buffer += arguments["
    //var t5 = "];\n";
    var t6 = "case 0: ;break;\ndefault: break;\n}\n;\n} else {" /*+
             "echo(\"We are above limit! Length: \" + length);"*/;
    var t7 = "for (var i = 0; i < length; i++) {\n" +
             "  buffer += arguments[i];\n" +
      //"  buffer = buffer + arguments[i];\n" +
             "  }";
    var t8 = "};"/* +
             "echo(\"buffer: \" + buffer);"*/;
    var t9 = "this.buffer_ += buffer;\n" +
             "    return this; \n" +
             "  };";
    program += t1;
    if ((length = goog.string.StringBuffer.ONE_TIME_CONCATENATION_ELEMENTS_LIMIT) > 0) {
      program += t2;
      for (counter = length; counter > 0; --counter) {
        program += t3 + counter + t4 + (counter - 1) + t5;
      }
      ;
      program += t6;
    }
    program += t7;
    if (length > 0) {
      program += t8;
    }
    program += t9;
    alert(program);

    goog.string.StringBuffer.prototype.append = eval(program);

  })();
  /*goog.string.StringBuffer.prototype.append = function(var_args) {
    // W3 version.
    var buffer = "";
    var length = arguments.length;
    if (length < goog.string.StringBuffer.ONE_TIME_CONCATENATION_ELEMENTS_LIMIT) {
      switch (length) {
        case 30: buffer = arguments[29] + buffer;
        ...
        case 1: buffer = arguments[0] + buffer;
        case 0: ;break;
        default: break;
      }
      ;
    } else {
      for (var i = 0; i < length; i++) {
        buffer += arguments[i];
      }
    }
    ;


    this.buffer_ += buffer;
    return this;
  };*/
}


/**
 * Clears the internal buffer.
 */
goog.string.StringBuffer.prototype.clear = function() {
  if (goog.userAgent.jscript.HAS_JSCRIPT) {
    this.buffer_.length = 0;  // Reuse the array to avoid creating new object.
    this.bufferLength_ = 0;
  } else {
    this.buffer_ = '';
  }
};


/**
 * Returns the concatenated string.
 *
 * @return {string} The concatenated string.
 */
goog.string.StringBuffer.prototype.toString = function() {
  if (goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join('');
    // Given a string with the entire contents, simplify the StringBuffer by
    // setting its contents to only be this string, rather than many fragments.
    this.clear();
    if (str) {
      this.append(str);
    }
    return str;
  } else {
    return this.buffer_;
  }
};
