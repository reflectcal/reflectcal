/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Individual block, could manage its state, capacity and event
 * chip map.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.blocks');
goog.provide('rflect.cal.blocks.Block');

goog.require('rflect.cal.predefined');



/**
 * Block class. Block is individual unit which manages its
 * capacity, size and state.
 * @param {number=} opt_size Size of new block.
 * @param {number=} opt_capacity Capacity of new block.
 * @param {boolean=} opt_expanded Whether block should be expanded.
 * @constructor
 */
rflect.cal.blocks.Block = function(opt_size, opt_capacity, opt_expanded) {

  this.size = opt_size || 0;
  this.capacity = opt_capacity || 0;
  this.expanded = opt_expanded || false;

};


/**
 * @param {rflect.cal.events.Chip} a First chip to compare.
 * @param {rflect.cal.events.Chip} b Second chip to compare.
 * @return {number} 1 if first arg is greater, 0 if equals, -1
 * otherwise.
 */
rflect.cal.blocks.Block.sort = function(a, b) {
  // If you pass in tasks without both entry and due dates, I will
  // kill you
  //var aStart = a.event.startDate || a.event.entryDate;
  //var bStart = b.event.startDate || b.event.entryDate;
  var aStart = a.start;
  var bStart = b.start;
  var diff = 0;

  //var startComparison = aStart.compare(bStart);
  var startComparison = (diff = (aStart - bStart )) > 0
    ? 1 : (diff < 0 ? -1 : 0);

  if (startComparison != 0) {
    return startComparison;
  } else {
    //var aEnd = a.event.endDate || a.event.dueDate;
    //var bEnd = b.event.endDate || b.event.dueDate;
    var aEnd = a.end;
    var bEnd = b.end;

    // If the items start at the same time, return the longer one
    // first
    return (diff = (bEnd - aEnd )) > 0 ? 1 : (diff < 0 ? -1 : 0);
  }
}


/**
 * Whether block is expanded.
 * @type {boolean}
 */
rflect.cal.blocks.Block.prototype.expanded = false;


/**
 * Whether block could be expanded. This is used instead of precise number of
 * potential capacity the block could reach, so we may not know this number but
 * are able to skip event chips which are out of bounds.
 * Makes sense only for blocks in collapsed mode.
 * @type {boolean}
 */
rflect.cal.blocks.Block.prototype.couldBeExpanded = false;


/**
 * Whether block could be collapsed.
 * Makes sense only for blocks in expanded mode.
 * @type {boolean}
 */
rflect.cal.blocks.Block.prototype.couldBeCollapsed = false;


/**
 * Actual capacity of block - how many rows/cols are in it.
 * @type {number}
 */
rflect.cal.blocks.Block.prototype.capacity = 0;


/**
 * One dimension of block which makes sense - width for week mode, height for
 * month, in pixels.
 * @type {number}
 */
rflect.cal.blocks.Block.prototype.size = 0;


/**
 * One position of block which makes sense - left for week mode, top for
 * month, in pixels.
 * @type {number}
 */
rflect.cal.blocks.Block.prototype.position = 0;


/**
 * @typedef {{chip: rflect.cal.events.Chip, startCol: number, colSpan: number}}
 */
rflect.cal.blocks.BlobEntry;


/**
 * @typedef {{blob: Array.<rflect.cal.blocks.BlobEntry>, totalCols: number}}
 */
rflect.cal.blocks.BlobsArrayEntry;


/**
 * List of chips that share common space.
 * @type {!Array.<rflect.cal.blocks.BlobsArrayEntry>}
 */
rflect.cal.blocks.Block.prototype.blobs;


/**
 * Sparse arrays of chips that is used in all-day block.
 * @type {Array.<!Array.<rflect.cal.events.Chip|undefined>>}
 */
rflect.cal.blocks.Block.prototype.sparseArrays;


/**
 * @return {rflect.cal.blocks.Block} Block that equals this one.
 */
rflect.cal.blocks.Block.prototype.clone = function() {
  return new rflect.cal.blocks.Block(this.size, this.capacity, this.expanded);
};


/**
 * @param {!Array.<rflect.cal.events.Chip>} aChips Collection of chips for this
 * block.
 */
rflect.cal.blocks.Block.prototype.computeEventMap = function(aChips) {
  /* We're going to create a series of 'blobs'.  A blob is a series of
  * events that create a continuous block of busy time.  In other
  * words, a blob ends when there is some time such that no events
  * occupy that time.
  *
  * Each blob will be an array of objects with the following properties:
  *    chip:     the event/task
  *    startCol: the starting column to display the event in (0-indexed)
  *    colSpan:  the number of columns the chip spans
  *
  * An chip with no conflicts will have startCol: 0 and colSpan: 1.
  */

  var i = 0;
  var length = 0;
  var blobs = [];
  var currentBlob = [];
  var sort = rflect.cal.blocks.Block.sort;

  var startCol = 0;
  var maxCol = 0;

  //dump("\n aChips before sort: " + objectToString(aChips, 2));

  //aChips.sort(sortByStart);
  aChips.sort(sort);

  //dump("\n aChips after sort: " + objectToString(aChips, 2));

  // The end time of the last ending event in the entire blob
  var latestItemEnd;

  // This array keeps track of the last (latest ending) chip in each of
  // the columns of the current blob. We could reconstruct this data at
  // any time by looking at the items in the blob, but that would hurt
  // perf.
  var colEndArray = [];

  /* Go through a 3 step process to try and place each chip.
  * Step 1: Look for an existing column with room for the chip.
  * Step 2: Look for a previously placed chip that can be shrunk in
  *         width to make room for the chip.
  * Step 3: Give up and create a new column for the chip.
  *
  * (The steps are explained in more detail as we come to them)
  */

  for (i = 0,length = aChips.length; i < length; ++i) {
    //var chip = aChips[i].event;
    //var itemStart = chip.startDate || chip.entryDate;
    //var itemEnd = chip.endDate || chip.dueDate;

    var chip = aChips[i];
    var itemStart = chip.start;
    var itemEnd = chip.end;

    if (!latestItemEnd) {
      latestItemEnd = itemEnd;
    }
    if (currentBlob.length && latestItemEnd &&
      //itemStart.compare(latestItemEnd) != -1) {
        (itemStart >= latestItemEnd)) {
      // We're done with this current blob because chip starts
      // after the last event in the current blob ended.
      blobs.push({blob: currentBlob, totalCols: colEndArray.length});

      // Reset our variables
      currentBlob = [];
      colEndArray = [];
    }

    // Place the chip in its correct place in the blob
    var placedItem = false;

    // Step 1
    // Look for a possible column in the blob that has been left open. This
    // would happen if we already have multiple columns but some of
    // the cols have events before latestItemEnd.  For instance
    //       |      |      |
    //       |______|      |
    //       |ev1   |______|
    //       |      |ev2   |
    //       |______|      |
    //       |      |      |
    //       |OPEN! |      |<--Our chip's start time might be here
    //       |      |______|
    //       |      |      |
    //
    // Remember that any time we're starting a new blob, colEndArray
    // will be empty, but that's ok.
    for (var ii = 0, colEndArrayLength = colEndArray.length; 
        ii < colEndArrayLength; ++ii) {

      // var colEnd = colEndArray[ii].endDate || colEndArray[ii].dueDate;
      var colEnd = colEndArray[ii].end;

      if (colEnd <= itemStart) {
        // Yay, we can jump into this column
        colEndArray[ii] = chip;

                      // Check and see if there are any adjacent columns we can
        // jump into as well.
        var lastCol = Number(ii) + 1;
        while (lastCol < colEndArray.length) {
          //var nextColEnd = colEndArray[lastCol].endDate ||
          //                 colEndArray[lastCol].dueDate;
          var nextColEnd = colEndArray[lastCol].end;

          // If the next column's chip ends after we start, we
          // can't expand any further
          //if (nextColEnd.compare(itemStart) == 1) {

          if (nextColEnd > itemStart) {

            break;
          }
          colEndArray[lastCol] = chip;
          lastCol++;
        }

        // Now construct the info we need to push into the blob
        currentBlob.push({chip: chip,
          startCol: ii,
          colSpan: lastCol - ii});

        if (ii > maxCol)
          maxCol = ii;

          // Update latestItemEnd
        //if (latestItemEnd &&
        //    itemEnd.compare(latestItemEnd) == 1) {
        if (latestItemEnd &&
            (itemEnd > latestItemEnd)) {


          latestItemEnd = itemEnd;
        }
        placedItem = true;
        break; // Stop iterating through colEndArray
      }
    }

    if (placedItem) {
      // Go get the next chip
      continue;
    }

    // Step 2
    // OK, all columns (if there are any) overlap us.  Look if the
    // last chip in any of the last items in those columns is taking
    // up 2 or more cols. If so, shrink it and stick the chip in the
    // created space. For instance
    //       |______|______|______|
    //       |ev1   |ev3   |ev4   |
    //       |      |      |      |
    //       |      |______|      |
    //       |      |      |______|
    //       |      |_____________|
    //       |      |ev2          |
    //       |______|             |<--If our chip's start time is
    //       |      |_____________|   here, we can shrink ev2 and jump
    //       |      |      |      |   in column #3
    //
    for (var jj = 1, colEndArrayLength = colEndArray.length; 
        jj < colEndArrayLength; ++jj) {
      //      if (colEndArray[jj].hashId == colEndArray[jj - 1].hashId) {
      if (goog.getUid(colEndArray[jj]) == goog.getUid(colEndArray[jj - 1])) {
        // Good we found a chip that spanned multiple columns.
        // Find it in the blob so we can modify its properties
        for (var kk = 1, currentBlobLength = currentBlob.length; 
            kk < currentBlobLength; ++kk) {
          //          if (currentBlob[kk].chip.hashId == colEndArray[jj].hashId) {
          if (goog.getUid(currentBlob[kk].chip) == 
              goog.getUid(colEndArray[jj])) {
            // Take all but the first spot that the chip spanned
            var spanOfShrunkItem = currentBlob[kk].colSpan;
            currentBlob.push({chip: chip,
              startCol: startCol = Number(currentBlob[kk].startCol) + 1,
              colSpan: spanOfShrunkItem - 1});

            if (startCol > maxCol)
              maxCol = startCol;

              // Update colEndArray
            for (var ll = jj; ll < jj + spanOfShrunkItem - 1; ll++) {
              colEndArray[ll] = chip;
            }

              // Modify the data on the old chip
            currentBlob[kk] = {chip: currentBlob[kk].chip,
              startCol: startCol = currentBlob[kk].startCol,
              colSpan: 1};

            if (startCol > maxCol)
              maxCol = startCol;

              // Update latestItemEnd
            //if (latestItemEnd &&
            //    itemEnd.compare(latestItemEnd) == 1) {
            if (latestItemEnd &&
                (itemEnd > latestItemEnd)) {
              latestItemEnd = itemEnd;
            }
            break; // Stop iterating through currentBlob
          }
        }
        placedItem = true;
        break; // Stop iterating through colEndArray
      }
    }

    if (placedItem) {
      // Go get the next chip
      continue;
    }

    // Step 3
    // Guess what? We still haven't placed the chip.  We need to
    // create a new column for it.

    // All the items in the last column, except for the one* that
    // conflicts with the chip we're trying to place, need to have
    // their span extended by 1, since we're adding the new column
    //
    // * Note that there can only be one, because we sorted our
    //   events by start time, so this event must start later than
    //   the start of any possible conflicts.
    var lastColNum = colEndArray.length;
    for (var mm = 1, currentBlobLength = currentBlob.length; 
                mm < currentBlobLength; ++mm) {
      //var mmEnd = currentBlob[mm].chip.endDate || currentBlob[mm].chip.dueDate
      var mmEnd = currentBlob[mm].chip.end;
      //if (currentBlob[mm].startCol + currentBlob[mm].colSpan == lastColNum &&
      //    mmEnd.compare(itemStart) != 1) {
      if (currentBlob[mm].startCol + currentBlob[mm].colSpan == lastColNum
              && (mmEnd <= itemStart)) {
        currentBlob[mm] = {chip: currentBlob[mm].chip,
          startCol: startCol = currentBlob[mm].startCol,
          colSpan: currentBlob[mm].colSpan + 1};

        if (startCol > maxCol)
          maxCol = startCol;
      }
    }
    currentBlob.push({chip: chip,
      startCol: startCol = colEndArray.length,
      colSpan: 1});

    if (startCol > maxCol)
      maxCol = startCol;

    colEndArray.push(chip);
    // Update latestItemEnd
    //if (latestItemEnd && itemEnd.compare(latestItemEnd) == 1) {
    if (latestItemEnd && (itemEnd > latestItemEnd)) {
      latestItemEnd = itemEnd;
    }
              // Go get the next chip
  }
          // Add the last blob
  blobs.push({blob: currentBlob,
    totalCols: colEndArray.length});

  //dump("blobs: " + objectToString(blobs, 5));

  //TODO(alexk): look into this, how to update capacity from this info.
  //this._potentialCapacity = maxCol + 1;

  this.blobs = blobs;
}


/**
 * Converts series of blobs to series of sparse arrays for all day view.
 * @param {number} aDaysNumber How many cells to create.
 */
rflect.cal.blocks.Block.prototype.createSparseArraysFromBlobs = function(
    aDaysNumber) {
  var blobs = this.blobs;
  var sparseArrays = [];

  for (var counter = 0; counter < aDaysNumber; counter++)
    sparseArrays[counter] = [];

  for (var blobCounter = 0, blobLength = blobs.length; blobCounter <
      blobLength; blobCounter++) {
    var blob = blobs[blobCounter].blob;
    var totalCols = blobs[blobCounter].totalCols;

    for (var blobEntryCounter = 0, blobEntriesLength = blob.length;
        blobEntryCounter < blobEntriesLength; blobEntryCounter++) {
      var blobEntry = blob[blobEntryCounter];
      var chip = blobEntry.chip;
      var startCol = blobEntry.startCol;
      var colSpan = blobEntry.colSpan;
      for (var start = chip.start, chipCounter = chip.start, end = chip.end;
          chipCounter < end; chipCounter++) {
        var chipClone = chip.clone();
        chipClone.startIsCut = chipClone.endIsCut = chipCounter > start &&
            chipCounter < end - 1;
        if (chipCounter == start && end - start > 1)
          chipClone.startIsCut = true;
        if (chipCounter == end - 1 && end - start > 1)
          chipClone.endIsCut = true;
        sparseArrays[chipCounter][startCol] = chipClone;
      }
    }
  }
  this.sparseArrays = sparseArrays;
};