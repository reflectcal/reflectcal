// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Matcher that just returns all rows not filtered.
 *
 */


goog.provide('rflect.cal.ui.ac.NoFilterMatcher');

goog.require('goog.array');
goog.require('goog.ui.ac.ArrayMatcher');



/**
 * Matcher that just returns all rows not filtered.
 * @constructor
 * @param {Array} rows Dictionary of items to match.  Can be objects if they
 *     have a toString method that returns the value to match against.
 * @param {boolean=} opt_noSimilar if true, do not do similarity matches for the
 *     input token against the dictionary.
 * @extends {goog.ui.ac.ArrayMatcher}
 */
rflect.cal.ui.ac.NoFilterMatcher = function(rows, opt_noSimilar) {
  goog.ui.ac.ArrayMatcher.call(this, rows, opt_noSimilar);
};
goog.inherits(rflect.cal.ui.ac.NoFilterMatcher, goog.ui.ac.ArrayMatcher);


/**
 * Index of first matched row.
 * @type {number}
 */
rflect.cal.ui.ac.NoFilterMatcher.prototype.firstMatchedIndex = -1;


/**
 * Returns just rows unfiltered.
 * Matches the token against the start of words in the row.
 * @param {string} token Token to match.
 * @param {number} maxMatches Max number of matches to return.
 * @return {Array} Rows that match.
 */
rflect.cal.ui.ac.NoFilterMatcher.prototype.getPrefixMatches =
    function(token, maxMatches) {
  var matches = [];

  this.firstMatchedIndex = -1;

  if (token != '') {
    var escapedToken = goog.string.regExpEscape(token);
    var matcher = new RegExp('(^|\\W+)' + escapedToken, 'i');

    for (var index = 0, length = this.rows_.length; index < length; index++) {
      var row = this.rows_[index];
      if (String(row).match(matcher)) {
        this.firstMatchedIndex = index;
        break;
      }
    };
  }

  return this.rows_.slice();
};




