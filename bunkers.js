"use strict";

/**
 * Bunker id format: bunker-{firstColumn}-{lastColumn}
 */
function loadBunkers() {
  //Middle segment
  let middleBunkerFirstColumn = middleColumn - 1;
  let middleBunkerLastColumn = middleColumn + 1;

  let bunkersOnEachSide = 0;
  let bunkerToggle = false;

  //If bunker column size is even
  if (bunkerColumnSize % 2 == 0) {
    bunkersOnEachSide = bunkerColumnSize / 2;
    //Middle segment doesn't have a bunker
    bunkerToggle = false;
  }
  //If bunker column size is odd
  else {
    bunkersOnEachSide = (bunkerColumnSize - 1) / 2;
    //Middle segment has a bunker
    bunkerToggle = true;
    for (let i = middleBunkerFirstColumn; i <= middleBunkerLastColumn; i++) {
      bunkerSegments.push({
        "row": rowSize - 1,
        "column": i,
        "healthpoints": bunkerHealthPoints
      });
    }
  }

  //Columns to the left of the middle segment
  let bunkerCounter = 0;
  let leftDone = false;
  let previousFirstColumn = middleBunkerFirstColumn;
  while ((bunkerCounter < bunkersOnEachSide) && !leftDone) {
    let lastColumn = previousFirstColumn - 1;
    let firstColumn = lastColumn - 2;

    //If previous segment has a bunker
    if (bunkerToggle) {
      bunkerToggle = false;
    }
    //If previous segment doesn't have a bunker
    else {
      bunkerCounter++;
      bunkerToggle = true;
      for (let i = lastColumn; i >= firstColumn; i--) {
        bunkerSegments.unshift({
          "row": rowSize - 1,
          "column": i,
          "healthpoints": bunkerHealthPoints
        });
      }
    }

    if (bunkerCounter >= bunkersOnEachSide) {
      leftDone = true;
    }
    previousFirstColumn = firstColumn;
  }

  //Restart counting from the middle segment
  bunkerCounter = 0;
  if (bunkerColumnSize % 2 == 0) {
    bunkerToggle = false;
  }
  else {
    bunkerToggle = true;
  }

  //Columns to the right of the middle segment
  let rightDone = false;
  let previousLastColumn = middleBunkerLastColumn;
  while ((bunkerCounter < bunkersOnEachSide) && !rightDone) {
    let firstColumn = previousLastColumn + 1;
    let lastColumn = firstColumn + 2;

    //If previous segment has a bunker
    if (bunkerToggle) {
      bunkerToggle = false;
    }
    //If previous segment doesn't have a bunker
    else {
      bunkerCounter++;
      bunkerToggle = true;
      for (let i = firstColumn; i <= lastColumn; i++) {
        bunkerSegments.push({
          "row": rowSize - 1,
          "column": i,
          "healthpoints": bunkerHealthPoints
        });
      }
    }

    if (bunkerCounter >= bunkersOnEachSide) {
      rightDone = true;
    }
    previousLastColumn = lastColumn;
  }
  //Log bunker segments
  console.log("bunkerSegments", bunkerSegments);

  for (let i = 0; i < bunkerSegments.length; i++) {
    let gridItem = document.getElementById(`grid-${bunkerSegments[i].row}-${bunkerSegments[i].column}`);
    gridItem.classList.add("bunker");

    //Label the grid cell
    let label = document.createTextNode(bunkerSegments[i].healthpoints);
    gridItem.appendChild(label);
  }
}


function deductBunkerHealthPoint(index) {
  bunkerSegments[index].healthpoints--;
  let bunker = document.getElementById(`grid-${bunkerSegments[index].row}-${bunkerSegments[index].column}`);

  //If healthpoints reaches zero
  if (bunkerSegments[index].healthpoints <= 0) {
    //Convert bunker to normal grid-item
    bunkerSegments.splice(index, 1);
    bunker.innerText = "";
    bunker.classList.remove("bunker");
  }
  //If healthpoints is greater than 0
  else {
    //Display updated healthpoints
    bunker.innerText = bunkerSegments[index].healthpoints;
  }
}