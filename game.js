"use strict";

//Recommended grid dimensions: 31 columns, 13 rows (5 invaders, 6 gaps, 1 bunker, 1 tank)
var rowSize = 13;
var columnSize = 31; //May need to be odd number? I didn't code with the intention of handling even numbers, but my code seems to be able to handle it, probably cuz middleColumn is calculated with Math.ceil()
var middleColumn = Math.ceil(columnSize / 2);

//Must be < columnSize (code can handle even and odd number of invader columns)
var invaderColumnSize = 11;
var invaderColumnGaps = false;

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
var bunkerHealthPoints = 10;

//Seconds to countdown before the game starts
var countdownDuration = 5;

//Move invaders
var initialInterval = 1000;
var intervalDecrementMultiplier = 100;
var rowDescentCounter = 0;
var moveToRight = true;

//Tank controls 1
var tankCoordinates = {};
var multipleBullets = false;
var bulletCoordinates = {};
var tankBulletInterval = 250;

/**
 * Modified from StackOverFlow:
 * https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
 */
//Tank controls 2
var action = {
  moveLeft() {
    //If tank is not at the left boundary
    if (tankCoordinates.column != 1) {
      removeImg(rowSize, tankCoordinates.column);
      tankCoordinates.column--;
      let tankImg = getTankImg();
      displayImg(tankImg, "tank", rowSize, tankCoordinates.column);
    }
  },
  moveRight() {
    //If tank is not at the right boundary
    if (tankCoordinates.column != columnSize) {
      removeImg(rowSize, tankCoordinates.column);
      tankCoordinates.column++;
      let tankImg = getTankImg();
      displayImg(tankImg, "tank", rowSize, tankCoordinates.column);
    }
  },
  /**
   * TO DO: fire()
   * Fire when spacebar is pressed and held down. Might need to use interval 
   * to prevent bullets from firing too quickly, but I tried using interval for 
   * keypress events before, and it was very buggy.
   * 
   * Try without interval first, like how you handled moveLeft() and moveRight()
   */
  fire() {
    //If not allowing more than one bullet to be displayed at a time (follow original game)
    if (!multipleBullets) {
      if (Object.keys(bulletCoordinates).length == 0) {
        bulletCoordinates = {
          "row": rowSize - 1,
          "column": tankCoordinates.column
        };
        
        //Check if bullet will hit a bunker
        let indexOfDamagedBunker = null;
        for (let index = 0; index < bunkerSegments.length; index++) {
          if (bulletCoordinates.column == bunkerSegments[index].column) {
            indexOfDamagedBunker = index;
            break;
          }
        }

        //If bullet will hit a bunker
        if (indexOfDamagedBunker != null) {
          deductBunkerHealthPoint(indexOfDamagedBunker);
          indexOfDamagedBunker = null;
          bulletCoordinates = {};
          return;
        }
        //If bullet will not hit a bunker
        else {
          let bulletStraightImg = getBulletStraightImg();
          displayImg(bulletStraightImg, "bulletstraight", bulletCoordinates.row, bulletCoordinates.column);

          let timer = setInterval(() => {
            //If bullet is at top boundary
            if (bulletCoordinates.row == 1) {
              removeImgById("bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
              bulletCoordinates = {};
              clearInterval(timer);
              return;
            }
            removeImgById("bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
            bulletCoordinates.row--;
            let bulletStraightImg = getBulletStraightImg();
            displayImg(bulletStraightImg, "bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
          }, tankBulletInterval);
        }
      }
    }
    //If allowing more than one bullet to be displayed at a time
    else {
      /**
       * This else statement is not complete!!! I'm focusing on the If statement first!!!
       */
      let bulletCoordinates2 = {
        "row": rowSize - 1,
        "column": tankCoordinates.column
      };
      let bulletStraightImg = getBulletStraightImg();
      displayImg(bulletStraightImg, "bulletstraight", bulletCoordinates2.row, bulletCoordinates2.column);

      let timer = setInterval(() => {
        if (bulletCoordinates2.row == 1) {
          removeImgById("bulletstraight", bulletCoordinates2.row, bulletCoordinates2.column);
          clearInterval(timer);
          return;
        }
        removeImgById("bulletstraight", bulletCoordinates2.row, bulletCoordinates2.column);
        bulletCoordinates2.row--;
        let bulletStraightImg = getBulletStraightImg();
        displayImg(bulletStraightImg, "bulletstraight", bulletCoordinates2.row, bulletCoordinates2.column);
      }, tankBulletInterval);
    }

  }
};
var keyAction = {
  'a':          { keydown: action.moveLeft },
  'ArrowLeft':  { keydown: action.moveLeft },
  'd':          { keydown: action.moveRight },
  'ArrowRight': { keydown: action.moveRight },
  ' ':          { keydown: action.fire }
};
var keyHandler = (event) => {
  if (!(event.key in keyAction) || !(event.type in keyAction[event.key])) return; //No such Action
  keyAction[event.key][event.type]();  //Trigger an Action
};

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
 */
function loadGrid() {
  let grid = document.getElementById("grid");
  grid.style.setProperty("grid-template-columns", `repeat(${columnSize}, 3vw)`);
  grid.style.setProperty("grid-template-rows", `repeat(${rowSize}, 5.5vh)`);

  //Grid dimensions sample: 31 across, 13 down (5 invaders, 6 gaps, 1 bunker, 1 tank)
  for (let row = 1; row <= rowSize; row++) {
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
          let column;
          //If including gap between each invader column
          if (invaderColumnGaps) {
            column = middleColumn - (2 * i);
          }
          //If not including gap between each invader column
          else {
            column = middleColumn - i;
          }
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
          let column;
          //If including gap between each invader column
          if (invaderColumnGaps) {
            column = middleColumn + (2 * i);
          }
          //If not including gap between each invader column
          else {
            column = middleColumn + i;
          }
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
          let column;
          //If including gap between each invader column
          if (invaderColumnGaps) {
            column = middleColumn - (2 * i);
          }
          //If not including gap between each invader column
          else {
            column = middleColumn - i;
          }
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
          let column;
          //If including gap between each invader column
          if (invaderColumnGaps) {
            column = middleColumn + (2 * i);
          }
          //If not including gap between each invader column
          else {
            column = middleColumn + i;
          }
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
          let column;
          //If including gap between each invader column
          if (invaderColumnGaps) {
            column = middleColumn - (2 * i);
          }
          //If not including gap between each invader column
          else {
            column = middleColumn - i;
          }
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
          let column;
          //If including gap between each invader column
          if (invaderColumnGaps) {
            column = middleColumn + (2 * i);
          }
          //If not including gap between each invader column
          else {
            column = middleColumn + i;
          }
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

        //If not including gap between each invader column
        if (!invaderColumnGaps) {
          //Divider column (middle column)
          let squidImg = getSquidImg1();
          displayImg(squidImg, spriteType, row, middleColumn);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': middleColumn
          });
          //Columns to the left of the divider (decreasing index)
          for (let i = 1; i <= invadersOnEachSide - 1; i++) {
            let squidImg = getSquidImg1();
            let column = middleColumn - i;
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
            let column = middleColumn + i;
            displayImg(squidImg, spriteType, row, column);
            invaderRow.push({
              'invader': spriteType,
              'row': row,
              'column': column
            });
          }
        }
        else {
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
        }
        invaders.push(invaderRow);
      }
      //Crab rows
      else if (row <= squidRowSize + crabRowSize) {
        let invaderRow = [];
        let spriteType = "crab1";

        //If not including gap between each invader column
        if (!invaderColumnGaps) {
          //Divider column (middle column)
          let crabImg = getCrabImg1();
          displayImg(crabImg, spriteType, row, middleColumn);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': middleColumn
          });
          //Columns to the left of the divider (decreasing index)
          for (let i = 1; i <= invadersOnEachSide - 1; i++) {
            let crabImg = getCrabImg1();
            let column = middleColumn - i;
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
            let column = middleColumn + i;
            displayImg(crabImg, spriteType, row, column);
            invaderRow.push({
              'invader': spriteType,
              'row': row,
              'column': column
            });
          }
        }
        else {
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
        }
        invaders.push(invaderRow);
      }
      //Octo rows
      else {
        let invaderRow = [];
        let spriteType = "octo1";

        //If not including gap between each invader column
        if (!invaderColumnGaps) {
          //Divider column (middle column)
          let octoImg = getOctoImg1();
          displayImg(octoImg, spriteType, row, middleColumn);
          invaderRow.push({
            'invader': spriteType,
            'row': row,
            'column': middleColumn
          });
          //Columns to the left of the divider (decreasing index)
          for (let i = 1; i <= invadersOnEachSide - 1; i++) {
            let octoImg = getOctoImg1();
            let column = middleColumn - i;
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
            let column = middleColumn + i;
            displayImg(octoImg, spriteType, row, column);
            invaderRow.push({
              'invader': spriteType,
              'row': row,
              'column': column
            });
          }
        }
        else {
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
        }
        invaders.push(invaderRow);
      }
    }
  }
  //Log invaders
  console.log("invaders", invaders);
}

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

/**
 * Tank id format: tank-{row}-{column}
 */
function loadTank() {
  tankCoordinates = {
    "row": rowSize,
    "column": middleColumn
  };
  let tankImg = getTankImg();
  displayImg(tankImg, "tank", rowSize, middleColumn);
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
  moveInvadersInOneDirection();
  activateTankControls();
}

/**
 * Uses intervals and recursion; will keep calling itself until the game ends
 */
function moveInvadersInOneDirection() {
  let interval = initialInterval - (rowDescentCounter * intervalDecrementMultiplier);
  const leftBoundary = 1;
  const rightBoundary = columnSize;

  //Log movement interval
  console.log("invaders interval", interval);

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
                gameOver();
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
                gameOver();
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

/**
 * Modified from StackOverFlow:
 * https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
 */
function activateTankControls() {
  document.body.addEventListener("keydown", keyHandler);
}

function gameOver() {
  document.body.removeEventListener("keydown", keyHandler);
  // TO DO: show score & return to welcome page
  alert("Game Over");
}
