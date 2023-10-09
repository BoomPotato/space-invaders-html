var rowSize = 13
var columnSize = 31 //Must be odd number. Change grid-template-columns in the "style.css" file too!

var invaderRowSize = 5 //Must be >= 5
var squidRowSize = 1
var crabRowSize = 2

function startGame() {
  //Hide welcome buttons
  document.getElementById("welcomeBtns").style.display = "none";

  loadSprites();
}

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

        let temp = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(temp);

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

        let temp = document.createTextNode(`${row}-${column}`);
        gridItem.appendChild(temp);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
  }

  let columnsOnEachSideOfDivider = (columnSize - 1) / 2;
  let invadersOnEachSide = Math.floor(columnsOnEachSideOfDivider / 2);


  //Invaders
  for (let invaderRow = 1; invaderRow <= invaderRowSize; invaderRow++) {
    //Squid rows
    if (invaderRow <= squidRowSize) {
      //Columns to the left of the divider (decreasing index)
      for (let i = 0; i < invadersOnEachSide; i++) {
        let squidImg = document.createElement("img");
        squidImg.setAttribute("src", "./assets/squid-1.png");
        squidImg.setAttribute("height", "35");
        squidImg.setAttribute("width", "35");

        let invaderColumn = columnsOnEachSideOfDivider - (2 * i);
        squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

        document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(squidImg);
      }
      //Columns to the right of the divider (increasing index)
      for (let i = 0; i < invadersOnEachSide; i++) {
        let squidImg = document.createElement("img");
        squidImg.setAttribute("src", "./assets/squid-1.png");
        squidImg.setAttribute("height", "35");
        squidImg.setAttribute("width", "35");

        let invaderColumn = columnsOnEachSideOfDivider + 2 + (2 * i);
        squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

        document.getElementById(`grid-${invaderRow}-${invaderColumn}`).appendChild(squidImg);
      }



      // for (let invaderColumn = columnsOnEachSideOfDivider; invaderColumn > 0; invaderColumn - 2) {
      //   let squidImg = document.createElement("img");
      //   squidImg.setAttribute("src", "./assets/squid-1.png");
      //   squidImg.setAttribute("height", "40");
      //   squidImg.setAttribute("width", "40");
      //   squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

      //   invaderGroup.appendChild(squid);
      // }
      // for (let invaderColumn = columnsOnEachSideOfDivider + 2; invaderColumn <= invadersOnEachSide * 2; invaderColumn + 2) {
      //   let squidImg = document.createElement("img");
      //   squidImg.setAttribute("src", "./assets/squid-1.png");
      //   squidImg.setAttribute("height", "40");
      //   squidImg.setAttribute("width", "40");
      //   squidImg.setAttribute("id", `squid-${invaderRow}-${invaderColumn}`);

      //   invaderGroup.appendChild(squid);
      // }

    }
    //Crab rows
    // else if (invaderRow <= crabRowSize) {
    //   for (let invaderColumn = 1; invaderColumn <= invaderColumnSize; invaderColumn++) {
    //     let crab = document.createElement("span");
    //     crab.setAttribute("id", `crab-${invaderRow}-${invaderColumn}`);

    //     let crabImg = document.createElement("img");
    //     crabImg.setAttribute("src", "./assets/crab-1.png");
    //     crabImg.setAttribute("height", "40");
    //     crabImg.setAttribute("width", "45");
    //     crab.appendChild(crabImg);

    //     invaderGroup.appendChild(crab);
    //   }
    // }
    // //Octo rows
    // else {
    //   for (let invaderColumn = 1; invaderColumn <= invaderColumnSize; invaderColumn++) {
    //     let octo = document.createElement("span");
    //     octo.setAttribute("id", `octo-${invaderRow}-${invaderColumn}`);

    //     let octoImg = document.createElement("img");
    //     octoImg.setAttribute("src", "./assets/octo-1.png");
    //     octoImg.setAttribute("height", "40");
    //     octoImg.setAttribute("width", "45");
    //     octo.appendChild(octoImg);

    //     invaderGroup.appendChild(octo);
    //   }
    // }
  }

  // document.body.appendChild(invaderGroup);
  // console.log(invaderGroup);

}

function loadSprites2() {
  let invaderGroup = document.createElement("div");
  invaderGroup.setAttribute("id", "invaderGroup");

  //sprite id format: "spriteType-row-column"

  //Tank


  //Bunker
  /*
  for (let i = 0; i < 4; i++) {

  }
  */

  //Invaders: 11 across, 5 down (squid, crab, crab, octo, octo)
  for (let i = 1; i <= 5; i++) {

    for (let j = 1; j <= 11; j++) {
      //squid: one row
      if (i == 1) {
        let squid = document.createElement("span");
        squid.setAttribute("id", `squid-${i}-${j}`);

        let squidImg = document.createElement("img");
        squidImg.setAttribute("src", "./assets/squid-1.png");
        squidImg.setAttribute("height", "40");
        squidImg.setAttribute("width", "40");
        squid.appendChild(squidImg);

        invaderGroup.appendChild(squid);
      }
      //crab: two rows
      else if (i == 2 || i == 3) {
        let crab = document.createElement("span");
        crab.setAttribute("id", `crab-${i}-${j}`);

        let crabImg = document.createElement("img");
        crabImg.setAttribute("src", "./assets/crab-1.png");
        crabImg.setAttribute("height", "40");
        crabImg.setAttribute("width", "45");
        crab.appendChild(crabImg);

        invaderGroup.appendChild(crab);
      }
      //octo: two rows
      else if (i == 4 || i == 5) {
        let octo = document.createElement("span");
        octo.setAttribute("id", `octo-${i}-${j}`);

        let octoImg = document.createElement("img");
        octoImg.setAttribute("src", "./assets/octo-1.png");
        octoImg.setAttribute("height", "40");
        octoImg.setAttribute("width", "45");
        octo.appendChild(octoImg);

        invaderGroup.appendChild(octo);
      }
      let spaceBtwnInvaders = document.createElement("span");
      let space = document.createTextNode("  ")
      spaceBtwnInvaders.appendChild(space);
      invaderGroup.appendChild(spaceBtwnInvaders);
    }
    invaderGroup.appendChild(document.createElement("br"));
  }

  document.body.appendChild(invaderGroup);
  console.log(invaderGroup);
}
