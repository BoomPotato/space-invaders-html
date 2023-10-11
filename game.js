"use strict";
//Commented out cuz it doesn't work. import can only be used in modules (must use Node.js or alternative)
// import { getSquidImg } from "./asset-controller.js";

//Recommended grid dimensions: 31 columns, 13 rows (5 invaders, 6 gaps, 1 bunker, 1 tank)
var rowSize = 13;
var columnSize = 31; //Must be odd number. Change grid-template-columns in the "style.css" file too!
var middleColumn = Math.ceil(columnSize / 2);

var invaderColumnSize = 11;

//Invader row sizes must add up to >= 5
var squidRowSize = 1;
var crabRowSize = 2;
var octoRowSize = 2

//Each bunker takes up 3 columns
var bunkerColumnSize = 5;

function startGame() {
  //Hide welcome buttons
  document.getElementById("welcomeBtns").style.display = "none";

  loadSprites();
}

/**
 * Sprite id format: {spriteType}-{row}-{column}
 * Grid id format: grid-{row}-{column}
 * Bunker grid id format: gridbunker-{firstColumn}-{thirdColumn}
 */
function loadSprites() {
  let grid = document.createElement("div");
  grid.setAttribute("class", "grid-container");
  grid.setAttribute("id", "grid");

  //Grid dimensions: 31 across, 13 down (5 invaders, 6 gaps, 1 bunker, 1 tank)
  for (let row = 1; row <= rowSize; row++) {
    //If row is the second last row (bunker row)
    if (row == rowSize - 1) {
      //Bunkers
      let bunkerRow = [];
      //If bunker column size is odd
      if (bunkerColumnSize % 2 != 0) {
        let bunkersOnEachSide = (bunkerColumnSize - 1) / 2;

        //Middle column
        let bunkerImgToggle = true;
        let middleBunkerFirstColumn = middleColumn - 1;
        let middleBunkerThirdColumn = middleColumn + 1;

        let middleBunkerGridColumnStart = middleBunkerFirstColumn - 1;
        let middleBunkerGridColumnEnd = middleBunkerThirdColumn;

        bunkerRow.push({
          "id": `gridbunker-${middleBunkerFirstColumn}-${middleBunkerThirdColumn}`,
          "gridColumnStartEnd": [middleBunkerGridColumnStart, middleBunkerGridColumnEnd],
          "bunkerImgToggle": bunkerImgToggle
        });

        //Columns to the left of the middle column
        let previousFirstColumn = middleBunkerFirstColumn;
        for (let i = 1; i <= bunkersOnEachSide; i++) {
          let thirdColumn = previousFirstColumn - 1;
          let firstColumn = thirdColumn - 2;

          let gridColumnStart = firstColumn - 1;
          let gridColumnEnd = thirdColumn;

          if (bunkerImgToggle) {
            bunkerImgToggle = false;
          } 
          else {
            bunkerImgToggle = true;
          }

          bunkerRow.unshift({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd],
            "bunkerImgToggle": bunkerImgToggle
          });

          previousFirstColumn = firstColumn;
        }

        //Restart counting from the middle bunker
        bunkerImgToggle = true;

        //Columns to the right of the middle column
        let previousLastColumn = middleBunkerThirdColumn;
        for (let i = 1; i <= bunkersOnEachSide; i++) {
          let firstColumn = previousLastColumn + 1;
          let thirdColumn = previousFirstColumn + 2;

          let gridColumnStart = firstColumn - 1;
          let gridColumnEnd = thirdColumn;

          if (bunkerImgToggle) {
            bunkerImgToggle = false;
          } 
          else {
            bunkerImgToggle = true;
          }

          bunkerRow.push({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd],
            "bunkerImgToggle": bunkerImgToggle
          });

          previousLastColumn = thirdColumn;
        }
        //Delete later?
        console.log("test", bunkerRow);

      }
      //If bunker column size is even
      else {

      }


    }
    //If row is the last row (tank row)
    else if (row == rowSize) {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        //Delete later?
        let temp = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(temp);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
    else {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        //Delete later?
        let temp = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(temp);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
  }

  let invaderRowSize = squidRowSize + crabRowSize + octoRowSize

  //Invaders
  //If invader column size is odd
  if (invaderColumnSize % 2 != 0) {
    let invadersOnEachSide = (invaderColumnSize - 1) / 2;
    for (let invaderRow = 1; invaderRow <= invaderRowSize; invaderRow++) {
      //Squid rows
      if (invaderRow <= squidRowSize) {
        //Divider column (middle column)
        let squidImg = getSquidImg();
        setSquidId(squidImg, invaderRow, middleColumn);

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let squidImg = getSquidImg();
          let invaderColumn = middleColumn - (2 * i);
          setSquidId(squidImg, invaderRow, invaderColumn);
        }

        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let squidImg = getSquidImg();
          let invaderColumn = middleColumn + (2 * i);
          setSquidId(squidImg, invaderRow, invaderColumn);
        }
      }
      //Crab rows
      else if (invaderRow <= squidRowSize + crabRowSize) {
        //Divider column (middle column)
        let crabImg = getCrabImg();
        setCrabId(crabImg, invaderRow, middleColumn);

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let crabImg = getCrabImg();
          let invaderColumn = middleColumn - (2 * i);
          setCrabId(crabImg, invaderRow, invaderColumn);
        }

        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let crabImg = getCrabImg();
          let invaderColumn = middleColumn + (2 * i);
          setCrabId(crabImg, invaderRow, invaderColumn);
        }
      }
      //Octo rows
      else {
        //Divider column (middle column)
        let octoImg = getOctoImg();
        setOctoId(octoImg, invaderRow, middleColumn);

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let octoImg = getOctoImg();
          let invaderColumn = middleColumn - (2 * i);
          setOctoId(octoImg, invaderRow, invaderColumn);
        }

        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let octoImg = getOctoImg();
          let invaderColumn = middleColumn + (2 * i);
          setOctoId(octoImg, invaderRow, invaderColumn);
        }
      }
    }
  }
  //If invader column size is even
  else {
    let invadersOnEachSide = invaderColumnSize / 2;
    for (let invaderRow = 1; invaderRow <= invaderRowSize; invaderRow++) {
      //Squid rows
      if (invaderRow <= squidRowSize) {
        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let squidImg = getSquidImg();
          let invaderColumn = middleColumn - 1 - (2 * i);
          setSquidId(squidImg, invaderRow, invaderColumn);
        }

        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let squidImg = getSquidImg();
          let invaderColumn = middleColumn + 1 + (2 * i);
          setSquidId(squidImg, invaderRow, invaderColumn);
        }
      }
      //Crab rows
      else if (invaderRow <= squidRowSize + crabRowSize) {
        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let crabImg = getCrabImg();
          let invaderColumn = middleColumn - 1 - (2 * i);
          setCrabId(crabImg, invaderRow, invaderColumn);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let crabImg = getCrabImg();
          let invaderColumn = middleColumn + 1 + (2 * i);
          setCrabId(crabImg, invaderRow, invaderColumn);
        }
      }
      //Octo rows
      else {
        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let octoImg = getOctoImg();
          let invaderColumn = middleColumn - 1 - (2 * i);
          setOctoId(octoImg, invaderRow, invaderColumn);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let octoImg = getOctoImg();
          let invaderColumn = middleColumn + 1 + (2 * i);
          setOctoId(octoImg, invaderRow, invaderColumn);
        }
      }
    }
  }

}
