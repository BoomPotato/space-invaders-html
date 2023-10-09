function startGame() {
  //hide welcome buttons
  document.getElementById("welcomeBtns").style.display = "none";

  loadSprites();
}

function loadSprites() {
  let grid = document.createElement("div");
  grid.setAttribute("class", "grid-container");
  grid.setAttribute("id", "grid");

  //Grid dimensions: 21 across, 13 down (5 invaders, 6 gaps, 1 bunker, 1 tank)
  for (let rowCounter = 1; rowCounter <= 13; rowCounter++) {
    if (rowCounter == 12) {
      for (let columnCounter = 1; columnCounter <= 21; columnCounter++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${rowCounter}-${columnCounter}`);

        // let temp = document.createTextNode(`${rowCounter}-${columnCounter}`);
        // gridItem.appendChild(temp);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
      return;
    }
    if (rowCounter == 13) {
      for (let columnCounter = 1; columnCounter <= 21; columnCounter++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${rowCounter}-${columnCounter}`);

        // let temp = document.createTextNode(`${rowCounter}-${columnCounter}`);
        // gridItem.appendChild(temp);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
      return;
    }
    for (let columnCounter = 1; columnCounter <= 21; columnCounter++) {
      let gridItem = document.createElement("div");
      gridItem.setAttribute("class", "grid-item");
      gridItem.setAttribute("id", `grid-${rowCounter}-${columnCounter}`);

      // let temp = document.createTextNode(`${rowCounter}-${columnCounter}`);
      // gridItem.appendChild(temp);

      grid.appendChild(gridItem);
      document.body.appendChild(grid);
    }
  }
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
