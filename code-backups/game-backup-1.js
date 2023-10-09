function startGame() {
  //hide welcome buttons
  document.getElementById("welcomeButtons").style.display = "none";

  loadSprites();
}

function loadSprites() {
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
        // let spriteId = document.createTextNode(`squid-${i}-${j}`);
        // squid.appendChild(spriteId);

        let squidImg = document.createElement("img");
        squidImg.setAttribute("src", "./assets/squid-1.png");
        squidImg.setAttribute("height", "50");
        squidImg.setAttribute("width", "50");
        squid.appendChild(squidImg);

        invaderGroup.appendChild(squid);
      }
      //crab: two rows
      else if (i == 2 || i == 3) {
        let crab = document.createElement("span");
        crab.setAttribute("id", `crab-${i}-${j}`);
        // let spriteId = document.createTextNode(`crab-${i}-${j}`);
        // crab.appendChild(spriteId);

        let crabImg = document.createElement("img");
        crabImg.setAttribute("src", "./assets/crab-1.png");
        crabImg.setAttribute("height", "50");
        crabImg.setAttribute("width", "50");
        crab.appendChild(crabImg);

        invaderGroup.appendChild(crab);
      }
      //octo: two rows
      else if (i == 4 || i == 5) {
        let octo = document.createElement("span");
        octo.setAttribute("id", `octo-${i}-${j}`);
        // let spriteId = document.createTextNode(`octo-${i}-${j}`);
        // octo.appendChild(spriteId);

        let octoImg = document.createElement("img");
        octoImg.setAttribute("src", "./assets/octopus-1.png");
        octoImg.setAttribute("height", "50");
        octoImg.setAttribute("width", "50");
        octo.appendChild(octoImg);

        invaderGroup.appendChild(octo);
      }
    }
  }

  document.body.appendChild(invaderGroup);
  console.log(invaderGroup);
}
