"use strict";

//Recommended grid dimensions: 31 columns, 13 rows (5 invaders, 6 gaps, 1 bunker, 1 tank)
var rowSize = 13; //Change grid-template-rows in the "style.css" file too!
var columnSize = 31; //Must be odd number. Change grid-template-columns in the "style.css" file too!
var middleColumn = Math.ceil(columnSize / 2);

//Invader column size must be < columnSize
var invaderColumnSize = 11;

//Invader row sizes must add up to >= 5
var squidRowSize = 1;
var crabRowSize = 2;
var octoRowSize = 2;
var invaders = [];

//Each bunker takes up 3 columns
//Recommended size: 4 or 5 (code can handle even and odd number of bunkers)
//Range: 0 to 5
var bunkerColumnSize = 5;
var bunkerSegments = [];

//Seconds to countdown before the game starts
var countdownDuration = 5;

//Move invaders
var intervalDecrementMultiplier = 100;
var rowDescentCounter = 0;
var interval = 0;
var moveToRight = true;

function initialiseGame() {
  //Hide welcome buttons
  document.getElementById("welcomeBtns").style.display = "none";

  loadGrid();
  loadInvaders();
  loadBunkers();
  loadTank();

  countdown();
}

/**
 * Grid id format: grid-{row}-{column}
 * Bunker grid id format: gridbunker-{firstColumn}-{thirdColumn}
 */
function loadGrid() {
  let grid = document.getElementById("grid");

  //Grid dimensions: 31 across, 13 down (5 invaders, 6 gaps, 1 bunker, 1 tank)
  for (let row = 1; row <= rowSize; row++) {

    //Bunkers
    //If row is the second last row (bunker row)
    if (row == rowSize - 1) {

      //Middle segment
      let middleBunkerFirstColumn = middleColumn - 1;
      let middleBunkerThirdColumn = middleColumn + 1;
      let middleBunkerGridColumnStart = middleBunkerFirstColumn;
      let middleBunkerGridColumnEnd = middleBunkerThirdColumn + 1;

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
        bunkerSegments.push({
          "id": `gridbunker-${middleBunkerFirstColumn}-${middleBunkerThirdColumn}`,
          "gridColumnStartEnd": [middleBunkerGridColumnStart, middleBunkerGridColumnEnd],
        });
      }

      //Columns to the left of the middle segment
      let bunkerCounter = 0;
      let leftDone = false;
      let previousFirstColumn = middleBunkerFirstColumn;
      while ((bunkerCounter < bunkersOnEachSide) && !leftDone) {
        let thirdColumn = previousFirstColumn - 1;
        let firstColumn = thirdColumn - 2;

        let gridColumnStart = firstColumn;
        let gridColumnEnd = thirdColumn + 1;

        //If previous segment has a bunker
        if (bunkerToggle) {
          bunkerToggle = false;
        }
        //If previous segment doesn't have a bunker
        else {
          bunkerCounter++;
          bunkerToggle = true;
          bunkerSegments.unshift({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd]
          });
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
      let previousThirdColumn = middleBunkerThirdColumn;
      while ((bunkerCounter < bunkersOnEachSide) && !rightDone) {
        let firstColumn = previousThirdColumn + 1;
        let thirdColumn = firstColumn + 2;

        let gridColumnStart = firstColumn;
        let gridColumnEnd = thirdColumn + 1;

        //If previous segment has a bunker
        if (bunkerToggle) {
          bunkerToggle = false;
        }
        //If previous segment doesn't have a bunker
        else {
          bunkerCounter++;
          bunkerToggle = true;
          bunkerSegments.push({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd]
          });
        }

        if (bunkerCounter >= bunkersOnEachSide) {
          rightDone = true;
        }
        previousThirdColumn = thirdColumn;
      }
      //Log bunker segments
      console.log("bunkerSegments", bunkerSegments);

      //Create grid cells  
      const firstColumnOfAllSegments = [];
      for (let i = 0; i < bunkerSegments.length; i++) {
        let idSplit = bunkerSegments[i].id.split("-");
        firstColumnOfAllSegments.push(parseInt(idSplit[1]));
      }
      const firstColumnOfFirstSegment = firstColumnOfAllSegments[0];
      const lastSegmentIdSplit = bunkerSegments[bunkerSegments.length - 1].id.split("-");
      const thirdColumnOfLastSegment = parseInt(lastSegmentIdSplit[2]);

      //Create bunker segments
      for (let column = 1; column <= columnSize; column++) {
        if (column >= firstColumnOfFirstSegment && column <= thirdColumnOfLastSegment) {
          if (firstColumnOfAllSegments.includes(column)) {
            //Create bunker segment
            const segmentIndex = firstColumnOfAllSegments.indexOf(column);
            let gridItem = document.createElement("div");
            gridItem.setAttribute("class", "grid-item");
            gridItem.setAttribute("id", bunkerSegments[segmentIndex].id);
            gridItem.style["grid-column-start"] = bunkerSegments[segmentIndex].gridColumnStartEnd[0];
            gridItem.style["grid-column-end"] = bunkerSegments[segmentIndex].gridColumnStartEnd[1];

            //Label the grid cell
            // let label = document.createTextNode(bunkerSegments[segmentIndex].id);
            // gridItem.appendChild(label);

            grid.appendChild(gridItem);

            //Create intermediate columns
            if (segmentIndex != firstColumnOfAllSegments.length - 1) {
              for (let i = 1; i <= 3; i++) {
                const idOfSegmentSplit = bunkerSegments[segmentIndex].id.split("-");
                const columnOfSegment = parseInt(idOfSegmentSplit[2]);

                let gridItem = document.createElement("div");
                gridItem.setAttribute("class", "grid-item");
                gridItem.setAttribute("id", `grid-${row}-${columnOfSegment + i}`);

                //Label the grid cell
                // let label = document.createTextNode(`${row}-${columnOfSegment + i}`);
                // gridItem.appendChild(label);

                grid.appendChild(gridItem);
              }
            }
          }
        }
        else {
          let gridItem = document.createElement("div");
          gridItem.setAttribute("class", "grid-item");
          gridItem.setAttribute("id", `grid-${row}-${column}`);

          //Label the grid cell
          // let label = document.createTextNode(`${row}-${column}`);
          // gridItem.appendChild(label);

          grid.appendChild(gridItem);
        }
      }
    }
    //If row is the last row (tank row)
    else if (row == rowSize) {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        //Label the grid cell
        // let label = document.createTextNode(`${row}-${column}`);
        // gridItem.appendChild(label);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
    else {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        //Label the grid cell
        // let label = document.createTextNode(`${row}-${column}`);
        // gridItem.appendChild(label);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
  }
}

/**
 * Invader id format: {invaderType}-{row}-{column}
 */
function loadInvaders() {
  let invaderRowSize = squidRowSize + crabRowSize + octoRowSize
  //If invader column size is odd
  if (invaderColumnSize % 2 != 0) {
    let invadersOnEachSide = (invaderColumnSize - 1) / 2;
    for (let row = 1; row <= invaderRowSize; row++) {
      //Squid rows
      if (row <= squidRowSize) {
        let invaderRow = [];
        let spriteType = "squid1";

        //Divider column (middle column)
        let squidImg = getSquidImg1();
        displayImg(squidImg, spriteType, row, middleColumn);
        invaderRow.push({
          'invader': spriteType,
          'row': row,
          'column': middleColumn
        });

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let squidImg = getSquidImg1();
          let column = middleColumn - (2 * i);
          displayImg(squidImg, spriteType, row, column);
          invaderRow.unshift({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let squidImg = getSquidImg1();
          let column = middleColumn + (2 * i);
          displayImg(squidImg, spriteType, row, column);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        invaders.push(invaderRow);
      }
      //Crab rows
      else if (row <= squidRowSize + crabRowSize) {
        let invaderRow = [];
        let spriteType = "crab1";

        //Divider column (middle column)
        let crabImg = getCrabImg1();
        displayImg(crabImg, spriteType, row, middleColumn);
        invaderRow.push({
          'invader': spriteType,
          'row': row,
          'column': middleColumn
        });

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let crabImg = getCrabImg1();
          let column = middleColumn - (2 * i);
          displayImg(crabImg, spriteType, row, column);
          invaderRow.unshift({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let crabImg = getCrabImg1();
          let column = middleColumn + (2 * i);
          displayImg(crabImg, spriteType, row, column);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        invaders.push(invaderRow);
      }
      //Octo rows
      else {
        let invaderRow = [];
        let spriteType = "octo1";

        //Divider column (middle column)
        let octoImg = getOctoImg1();
        displayImg(octoImg, spriteType, row, middleColumn);
        invaderRow.push({
          'invader': spriteType,
          'row': row,
          'column': middleColumn
        });

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let octoImg = getOctoImg1();
          let column = middleColumn - (2 * i);
          displayImg(octoImg, spriteType, row, column);
          invaderRow.unshift({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let octoImg = getOctoImg1();
          let column = middleColumn + (2 * i);
          displayImg(octoImg, spriteType, row, column);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        invaders.push(invaderRow);
      }
    }
  }
  //If invader column size is even
  else {
    let invadersOnEachSide = invaderColumnSize / 2;
    for (let row = 1; row <= invaderRowSize; row++) {
      //Squid rows
      if (row <= squidRowSize) {
        let invaderRow = [];
        let spriteType = "squid1";

        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let squidImg = getSquidImg1();
          let column = middleColumn - 1 - (2 * i);
          displayImg(squidImg, spriteType, row, column);
          invaderRow.unshift({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let squidImg = getSquidImg1();
          let column = middleColumn + 1 + (2 * i);
          displayImg(squidImg, spriteType, row, column);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        invaders.push(invaderRow);
      }
      //Crab rows
      else if (row <= squidRowSize + crabRowSize) {
        let invaderRow = [];
        let spriteType = "crab1";

        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let crabImg = getCrabImg1();
          let column = middleColumn - 1 - (2 * i);
          displayImg(crabImg, spriteType, row, column);
          invaderRow.unshift({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let crabImg = getCrabImg1();
          let column = middleColumn + 1 + (2 * i);
          displayImg(crabImg, spriteType, row, column);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        invaders.push(invaderRow);
      }
      //Octo rows
      else {
        let invaderRow = [];
        let spriteType = "octo1";

        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let octoImg = getOctoImg1();
          let column = middleColumn - 1 - (2 * i);
          displayImg(octoImg, spriteType, row, column);
          invaderRow.unshift({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let octoImg = getOctoImg1();
          let column = middleColumn + 1 + (2 * i);
          displayImg(octoImg, spriteType, row, column);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': column
          });
        }
        invaders.push(invaderRow);
      }
    }
  }
  //Log invaders
  console.log("invaders", invaders);
}

/**
 * Bunker id format: bunker-{firstColumn}-{thirdColumn}
 */
function loadBunkers() {
  for (let i = 0; i < bunkerSegments.length; i++) {
    let bunkerImg = getBunkerImg();
    document.getElementById(bunkerSegments[i].id).appendChild(bunkerImg);
  }
}

/**
 * Tank id format: tank-{row}-{column}
 */
function loadTank() {
  let tankImg = getTankImg();
  document.getElementById(`grid-${rowSize}-${middleColumn}`).appendChild(tankImg);
}

function countdown() {
  //Unhide overlay
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  let countdownElement = document.getElementById("countdown");
  countdownElement.textContent = "COUNTDOWN";
  let counter = countdownDuration;
  let timer = setInterval(() => {
    countdownElement.textContent = counter;
    if (counter == 0) {
      countdownElement.textContent = "START";
    }
    if (counter <= -1) {
      clearInterval(timer);
      overlay.style.display = "none";
      startGame();
    }
    counter--;
  }, 1000);
}

function startGame() {
  //Move invaders
  moveInvadersInOneDirection();
}

function moveInvadersInOneDirection() {
  interval = 1000 - (rowDescentCounter * intervalDecrementMultiplier);
  const leftBoundary = 1;
  const rightBoundary = columnSize;

  //Log movement interval
  console.log("interval", interval);

  let timer = setInterval(() => {
    let nearestInvadersToLeft = [];
    let nearestInvadersToRight = [];
    for (let rowIndex = 0; rowIndex < invaders.length; rowIndex++) {
      nearestInvadersToLeft.push(invaders[rowIndex][0]);
      nearestInvadersToRight.push(invaders[rowIndex][invaders[rowIndex].length - 1]);
    }

    let nearestInvaderToLeft = nearestInvadersToLeft[0];
    for (let i = 1; i < nearestInvadersToLeft.length; i++) {
      if (nearestInvadersToLeft[i].column <= nearestInvaderToLeft.column) {
        nearestInvaderToLeft = nearestInvadersToLeft[i];
      }
    }

    let nearestInvaderToRight = nearestInvadersToRight[0];
    let nearestInvaderToRightRowIndex = 0;
    for (let i = 1; i < nearestInvadersToRight.length; i++) {
      if (nearestInvadersToRight[i].column >= nearestInvaderToRight.column) {
        nearestInvaderToRight = nearestInvadersToRight[i];
        nearestInvaderToRightRowIndex = i;
      }
    }

    displayInvaderLoop:
    for (let rowIndex = invaders.length - 1; rowIndex >= 0; rowIndex--) {
      for (let columnIndex = 0; columnIndex < invaders[rowIndex].length; columnIndex++) {
        let invaderType = invaders[rowIndex][columnIndex].invader;
        let row = invaders[rowIndex][columnIndex].row;
        let column = invaders[rowIndex][columnIndex].column;

        //If invaders will move to the right
        if (moveToRight) {
          //Check if row contains the nearest invader to the right boundary
          if (row == nearestInvaderToRight.row) {
            let nextColumnOfNearestInvaderToRight = invaders[nearestInvaderToRightRowIndex][invaders[nearestInvaderToRightRowIndex].length - 1].column;
            //Move all invaders down by 1 row if the nearest invader to the right is at the right boundary
            if (nextColumnOfNearestInvaderToRight == rightBoundary) {

              //If next row of last invader row will be bunker row (second last row), end game
              if (invaders[invaders.length - 1][0].row + 1 == rowSize - 1) {
                alert('Game Over'); //TO DO: replace with sth else, show score & return to welcome page
                clearInterval(timer);
                return;
              }

              rowDescentCounter++;
              for (let rowIndex2 = invaders.length - 1; rowIndex2 >= 0; rowIndex2--) {
                for (let columnIndex2 = 0; columnIndex2 < invaders[rowIndex2].length; columnIndex2++) {
                  let invaderType2 = invaders[rowIndex2][columnIndex2].invader;
                  let row2 = invaders[rowIndex2][columnIndex2].row;
                  let column2 = invaders[rowIndex2][columnIndex2].column;

                  let invaderImg2;
                  invaderType2, invaderImg2 = toggleInvaderImg(rowIndex2, columnIndex2, invaderType2);

                  let newRow = row2 + 1;
                  invaders[rowIndex2][columnIndex2].row = newRow;
                  removeImg(row2, column2);
                  displayImg(invaderImg2, invaderType2, newRow, column2);
                }
              }
              moveToRight = false;
              //Stop current timer from executing again
              clearInterval(timer);
              //Recursion (function calls itself), create new timer with updated interval
              moveInvadersInOneDirection();
              break displayInvaderLoop;
            }
          }

          let invaderImg;
          invaderType, invaderImg = toggleInvaderImg(rowIndex, columnIndex, invaderType);

          //Move all invaders to the right by 1 column
          let newColumn = column + 1;
          invaders[rowIndex][columnIndex].column = newColumn;
          removeImg(row, column);
          displayImg(invaderImg, invaderType, row, newColumn);
        }
        //If invaders will move to the left
        else {
          //Check if row contains the nearest invader to the left boundary
          if (row == nearestInvaderToLeft.row) {
            //Move all invaders down by 1 row if the first invader in the row (a.k.a. nearest invader to the left) is at the left boundary
            if (column == leftBoundary) {

              //If next row of last invader row will be bunker row (second last row), end game
              if (invaders[invaders.length - 1][0].row + 1 == rowSize - 1) {
                alert('Game Over'); //TO DO: replace with sth else, show score & return to welcome page
                clearInterval(timer);
                return;
              }

              rowDescentCounter++;
              for (let rowIndex2 = invaders.length - 1; rowIndex2 >= 0; rowIndex2--) {
                for (let columnIndex2 = 0; columnIndex2 < invaders[rowIndex2].length; columnIndex2++) {
                  let invaderType2 = invaders[rowIndex2][columnIndex2].invader;
                  let row2 = invaders[rowIndex2][columnIndex2].row;
                  let column2 = invaders[rowIndex2][columnIndex2].column;

                  let invaderImg2;
                  invaderType2, invaderImg2 = toggleInvaderImg(rowIndex2, columnIndex2, invaderType2);

                  let newRow = row2 + 1;
                  invaders[rowIndex2][columnIndex2].row = newRow;
                  removeImg(row2, column2);
                  displayImg(invaderImg2, invaderType2, newRow, column2);
                }
              }
              moveToRight = true;
              //Stop current timer from executing again
              clearInterval(timer);
              //Recursion (function calls itself), create new timer with updated interval
              moveInvadersInOneDirection();
              break displayInvaderLoop;
            }
          }

          let invaderImg;
          invaderType, invaderImg = toggleInvaderImg(rowIndex, columnIndex, invaderType);

          //Move all invaders to the left by 1 column
          let newColumn = column - 1;
          invaders[rowIndex][columnIndex].column = newColumn;
          removeImg(row, column);
          displayImg(invaderImg, invaderType, row, newColumn);
        }
      }
    }
  }, interval);
}