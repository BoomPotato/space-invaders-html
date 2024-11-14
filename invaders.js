"use strict";

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
 * Uses intervals and recursion; will keep calling itself until the game ends
 */
function moveInvadersInOneDirection() {
  let interval = initialInvaderInterval - (rowDescentCounter * invaderIntervalDecrementMultiplier);
  const leftBoundary = 1;
  const rightBoundary = columnSize;

  //Log movement interval
  console.log("invaders interval", interval);

  let timer = setInterval(() => {
    let nearestInvadersToLeft = [];
    let nearestInvadersToRight = [];
    for (let rowIndex = 0; rowIndex < invaders.length; rowIndex++) {
      //If row is not empty (there are invaders in the row)
      if (invaders[rowIndex].length != 0) {
        nearestInvadersToLeft.push(invaders[rowIndex][0]);
        nearestInvadersToRight.push(invaders[rowIndex][invaders[rowIndex].length - 1]);
      }
      //If row is empty (there are no invaders in the row, all invaders in the row have been destroyed)
      else {
        //Remove empty row array from invaders array
        invaders.splice(rowIndex, 1);
      }
    }

    //TEST
    console.log("nearestInvadersToLeft", nearestInvadersToLeft);
    console.log("nearestInvadersToRight", nearestInvadersToRight);

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
            let columnOfNearestInvaderToRight = invaders[nearestInvaderToRightRowIndex][invaders[nearestInvaderToRightRowIndex].length - 1].column;
            //Move all invaders down by 1 row if the nearest invader to the right is at the right boundary
            if (columnOfNearestInvaderToRight == rightBoundary) {

              //If next row of last invader row will be bunker row (second last row), end game
              if (invaders[invaders.length - 1][0].row + 1 == rowSize - 1) {
                loadGameOver();
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
                loadGameOver();
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


function toggleInvaderImg(rowIndex, columnIndex, invaderType) {
  let invaderImg;
  if (invaderType == "squid1") {
    invaders[rowIndex][columnIndex].invader = "squid2";
    invaderType = "squid2";
    invaderImg = getSquidImg2();
  }
  else if (invaderType == "squid2") {
    invaders[rowIndex][columnIndex].invader = "squid1";
    invaderType = "squid1";
    invaderImg = getSquidImg1();
  }
  else if (invaderType == "crab1") {
    invaders[rowIndex][columnIndex].invader = "crab2";
    invaderType = "crab2";
    invaderImg = getCrabImg2();
  }
  else if (invaderType == "crab2") {
    invaders[rowIndex][columnIndex].invader = "crab1";
    invaderType = "crab1";
    invaderImg = getCrabImg1();
  }
  else if (invaderType == "octo1") {
    invaders[rowIndex][columnIndex].invader = "octo2";
    invaderType = "octo2";
    invaderImg = getOctoImg2();
  }
  else if (invaderType == "octo2") {
    invaders[rowIndex][columnIndex].invader = "octo1";
    invaderType = "octo1";
    invaderImg = getOctoImg1();
  }
  return invaderType, invaderImg;
}


/**
 * Not complete!!! Not implemented yet!!!
 */
function destroyInvader(explosionImg, imgCountdownDuration, row, column) {
  explosionImg.setAttribute("id", `explosion-${row}-${column}`);
  let gridCell = document.getElementById(`grid-${row}-${column}`);
  gridCell.appendChild(explosionImg);

  setTimeout(() => {
    gridCell.removeChild(gridCell.firstChild);
  }, imgCountdownDuration);
}