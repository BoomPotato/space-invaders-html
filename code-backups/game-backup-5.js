var rowSize = 13;
var columnSize = 31; //Must be odd number. Change grid-template-columns in the "style.css" file too!

var invaderColumnSize = 11;

//Invader row sizes must add up to >= 5
var squidRowSize = 1;
var crabRowSize = 2;
var octoRowSize = 2

function startGame() {
  //Hide welcome buttons
  document.getElementById("welcomeBtns").style.display = "none";

  loadSprites();
}

/**
 * Sprite id format: spriteType-row-column"
 */
function loadSprites() {
  let grid = document.createElement("div");
  grid.setAttribute("class", "grid-container");
  grid.setAttribute("id", "grid");

  //Grid dimensions: 21 across, 13 down (5 invaders, 6 gaps, 1 bunker, 1 tank)
  for (let row = 1; row <= rowSize; row++) {
    //If row is the second last row (bunker row)
    if (row == rowSize - 1) {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        let gridLabel = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(gridLabel);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
    //If row is the last row (tank row)
    else if (row == rowSize) {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        let gridLabel = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(gridLabel);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
    else {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        let gridLabel = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(gridLabel);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
  }

  let invaderRowSize = squidRowSize + crabRowSize + octoRowSize
  let middleColumn = Math.ceil(columnSize / 2);

  //Invaders
  //If invader column size is odd
  if (invaderColumnSize % 2 != 0) {
    let invadersOnEachSide = (invaderColumnSize - 1) / 2;
    for (let invaderRow = 1; invaderRow <= invaderRowSize; invaderRow++) {
      //Squid rows
      if (invaderRow <= squidRowSize) {
        //Divider column (middle column)
        let squidImg = document.createElement("img");
        squidImg.setAttribute("src", "./assets/squid-1.png");
        squidImg.setAttribute("height", "25");
        squidImg.setAttribute("width", "25");

        squidImg.setAttribute("id", `squid-${invaderRow}-${middleColumn}`);

        document.getElementById(`grid-${invaderRow}-${middleColumn}`).appendChild(squidImg);

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let squidImg = document.createElement("img");
          squidImg.setAttribute("src", "./assets/squid-1.png");
          squidImg.setAttribute("height", "25");
          squidImg.setAttribute("width", "25");

          let invaderColumn = middleColumn - (2 * i);
          squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(squidImg);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let squidImg = document.createElement("img");
          squidImg.setAttribute("src", "./assets/squid-1.png");
          squidImg.setAttribute("height", "25");
          squidImg.setAttribute("width", "25");

          let invaderColumn = middleColumn + (2 * i);
          squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(squidImg);
        }
      }
      //Crab rows
      else if (invaderRow <= squidRowSize + crabRowSize) {
        //Divider column (middle column)
        let crabImg = document.createElement("img");
        crabImg.setAttribute("src", "./assets/crab-1.png");
        crabImg.setAttribute("height", "25");
        crabImg.setAttribute("width", "30");

        crabImg.setAttribute("id", `crab-${invaderRow}-${middleColumn}`);

        document.getElementById(`grid-${invaderRow}-${middleColumn}`).appendChild(crabImg);

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let crabImg = document.createElement("img");
          crabImg.setAttribute("src", "./assets/crab-1.png");
          crabImg.setAttribute("height", "25");
          crabImg.setAttribute("width", "30");

          let invaderColumn = middleColumn - (2 * i);
          crabImg.setAttribute("id", `crab-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(crabImg);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let crabImg = document.createElement("img");
          crabImg.setAttribute("src", "./assets/crab-1.png");
          crabImg.setAttribute("height", "25");
          crabImg.setAttribute("width", "30");

          let invaderColumn = middleColumn + (2 * i);
          crabImg.setAttribute("id", `crab-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(crabImg);
        }
      }
      //Octo rows
      else {
        //Divider column (middle column)
        let octoImg = document.createElement("img");
        octoImg.setAttribute("src", "./assets/octo-1.png");
        octoImg.setAttribute("height", "25");
        octoImg.setAttribute("width", "30");

        octoImg.setAttribute("id", `octo-${invaderRow}-${middleColumn}`);

        document.getElementById(`grid-${invaderRow}-${middleColumn}`).appendChild(octoImg);

        //Columns to the left of the divider (decreasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let octoImg = document.createElement("img");
          octoImg.setAttribute("src", "./assets/octo-1.png");
          octoImg.setAttribute("height", "25");
          octoImg.setAttribute("width", "30");

          let invaderColumn = middleColumn - (2 * i);
          octoImg.setAttribute("id", `octo-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(octoImg);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 1; i <= invadersOnEachSide; i++) {
          let octoImg = document.createElement("img");
          octoImg.setAttribute("src", "./assets/octo-1.png");
          octoImg.setAttribute("height", "25");
          octoImg.setAttribute("width", "30");

          let invaderColumn = middleColumn + (2 * i);
          octoImg.setAttribute("id", `octo-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(octoImg);
        }
      }
    }
    //If invader column size is even
  } else {
    let invadersOnEachSide = invaderColumnSize / 2;
    for (let invaderRow = 1; invaderRow <= invaderRowSize; invaderRow++) {
      //Squid rows
      if (invaderRow <= squidRowSize) {
        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let squidImg = document.createElement("img");
          squidImg.setAttribute("src", "./assets/squid-1.png");
          squidImg.setAttribute("height", "25");
          squidImg.setAttribute("width", "25");

          let invaderColumn = middleColumn - 1 - (2 * i);
          squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(squidImg);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let squidImg = document.createElement("img");
          squidImg.setAttribute("src", "./assets/squid-1.png");
          squidImg.setAttribute("height", "25");
          squidImg.setAttribute("width", "25");

          let invaderColumn = middleColumn + 1 + (2 * i);
          squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(squidImg);
        }
      }
      //Crab rows
      else if (invaderRow <= squidRowSize + crabRowSize) {
        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let crabImg = document.createElement("img");
          crabImg.setAttribute("src", "./assets/crab-1.png");
          crabImg.setAttribute("height", "25");
          crabImg.setAttribute("width", "30");

          let invaderColumn = middleColumn - 1 - (2 * i);
          crabImg.setAttribute("id", `crab-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(crabImg);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let crabImg = document.createElement("img");
          crabImg.setAttribute("src", "./assets/crab-1.png");
          crabImg.setAttribute("height", "25");
          crabImg.setAttribute("width", "30");

          let invaderColumn = middleColumn + 1 + (2 * i);
          crabImg.setAttribute("id", `crab-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(crabImg);
        }
      }
      //Octo rows
      else {
        //Columns to the left of the divider (decreasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let octoImg = document.createElement("img");
          octoImg.setAttribute("src", "./assets/octo-1.png");
          octoImg.setAttribute("height", "25");
          octoImg.setAttribute("width", "30");

          let invaderColumn = middleColumn - 1 - (2 * i);
          octoImg.setAttribute("id", `octo-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(octoImg);
        }
        //Columns to the right of the divider (increasing index)
        for (let i = 0; i < invadersOnEachSide; i++) {
          let octoImg = document.createElement("img");
          octoImg.setAttribute("src", "./assets/octo-1.png");
          octoImg.setAttribute("height", "25");
          octoImg.setAttribute("width", "30");

          let invaderColumn = middleColumn + 1 + (2 * i);
          octoImg.setAttribute("id", `octo-${invaderRow}-${invaderColumn}`);

          document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(octoImg);
        }
      }
    }
  }
}
