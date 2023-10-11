"use strict";

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
//Recommended size: 4 or 5 (code can handle even and odd number of bunkers)
//Range: 0 to 5
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
    
    //Bunkers
    //If row is the second last row (bunker row)
    if (row == rowSize - 1) {
      let bunkerRow = [];

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
        bunkerRow.push({
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
          bunkerRow.unshift({
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
      let previousLastColumn = middleBunkerThirdColumn;
      while ((bunkerCounter < bunkersOnEachSide) && !rightDone) {
        let firstColumn = previousLastColumn + 1;
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
          bunkerRow.push({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd]
          });
        }

        if (bunkerCounter >= bunkersOnEachSide) {
          rightDone = true;
        }
        previousLastColumn = thirdColumn;
      }
      //Log bunker segments
      console.log("bunkerRow", bunkerRow);

      //Create grid cells  
      const firstColumnOfAllSegments = [];
      for (let i = 0; i < bunkerRow.length; i++) {
        let idSplit = bunkerRow[i].id.split("-");
        firstColumnOfAllSegments.push(parseInt(idSplit[1]));
      }
      const firstColumnOfFirstSegment = firstColumnOfAllSegments[0];
      const lastSegmentIdSplit = bunkerRow[bunkerRow.length - 1].id.split("-");
      const lastColumnOfLastSegment = parseInt(lastSegmentIdSplit[2]);

      // console.log("firstColumnOfFirstSegment", firstColumnOfFirstSegment)
      // console.log("lastColumnOfLastSegment", lastColumnOfLastSegment)

      for (let column = 1; column <= columnSize; column++) {
        if (column >= firstColumnOfFirstSegment && column <= lastColumnOfLastSegment) {
          if (firstColumnOfAllSegments.includes(column)) {
            let segmentIndex = firstColumnOfAllSegments.indexOf(column);
            let gridItem = document.createElement("div");
            gridItem.setAttribute("class", "grid-item");
            gridItem.setAttribute("id", bunkerRow[segmentIndex].id);
            gridItem.style["grid-column-start"] = bunkerRow[segmentIndex].gridColumnStartEnd[0];
            gridItem.style["grid-column-end"] = bunkerRow[segmentIndex].gridColumnStartEnd[1];

            //Label the grid cell
            let label = document.createTextNode(bunkerRow[segmentIndex].id);
            gridItem.appendChild(label);
            
            grid.appendChild(gridItem);
          }
        }
        else {
          let gridItem = document.createElement("div");
          gridItem.setAttribute("class", "grid-item");
          gridItem.setAttribute("id", `grid-${row}-${column}`);

          //Label the grid cell
          let label = document.createTextNode(`${row}-${column}`);
          gridItem.appendChild(label);
          
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
        let label = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(label);

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
        let label = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(label);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
  }

  //Invaders
  let invaderRowSize = squidRowSize + crabRowSize + octoRowSize
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
