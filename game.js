"use strict";

//Recommended grid dimensions: 31 columns, 13 rows (5 invaders, 6 gaps, 1 bunker, 1 tank)
var rowSize = 13;
var columnSize = 31; //May need to be odd number? I didn't code with the intention of handling even numbers, but my code seems to be able to handle it, probably cuz middleColumn is calculated with Math.ceil()
var middleColumn = Math.ceil(columnSize / 2);

//Must be < columnSize (code can handle even and odd number of invader columns)
var invaderColumnSize = 11;
var invaderColumnGaps = false; //Include an empty column between each column of invaders. Haven't handled scenario where bullet travels through empty column and an invader overlaps it in the next interval

//Invader row sizes must add up to >= 5
var squidRowSize = 1;
var crabRowSize = 2;
var octoRowSize = 2;
var invaders = [];

//Invader details
var squidPoints = 40;
var crabPoints = 20;
var octoPoints = 10;

//Each bunker takes up 3 columns
//Recommended size: 4 or 5 (code can handle even and odd number of bunkers)
//Range: 0 to 5
var bunkerColumnSize = 5;
var bunkerSegments = [];
var bunkerHealthPoints = 10;

//Seconds to countdown before the game starts
var countdownDuration = 5;

//Move invaders
var initialInvaderInterval = 1100;
var invaderIntervalDecrementMultiplier = 100;
var rowDescentCounter = 0;
var moveToRight = true;

//Tank details
var tankCoordinates = {};
var multipleBullets = false;
var bulletCoordinates = {};
var tankBulletInterval = 100;
var spacebarIsHeldDown = false;
var tankBulletBunkerDamageInterval = 150;

//Collision checker details
var collisionCheckerInterval = 50;
var gameOver = false;

//Player details
var score = 0;
var initialLives = 3;
var livesLeft = 3;


function initialiseGame() {
  //Hide game title and welcome buttons, and display score and lives
  document.getElementById("gameTitle").style.display = "none";
  document.getElementById("welcomeBtns").style.display = "none";
  document.getElementById("scoreAndLives").style.display = "block";

  loadGrid();
  loadInvaders();
  loadBunkers();
  loadTank();
  loadScoreAndLives();

  // countdown();
  startGame();
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
      gridItem.classList.add("grid-item");
      gridItem.setAttribute("id", `grid-${row}-${column}`);

      //Label the grid cell
      // let label = document.createTextNode(`${row}-${column}`);
      // gridItem.appendChild(label);

      grid.appendChild(gridItem);
    }
  }
}


function loadScoreAndLives() {
  for (let i = 0; i < initialLives; i++) {
    let img = getTankImg();
    img.classList.add("lifeImg");
    document.getElementById("lives").appendChild(img);
  }
}


function countdown() {
  //Unhide overlay
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  let countdownElement = document.getElementById("countdown");
  countdownElement.innerText = "COUNTDOWN";
  let counter = countdownDuration;
  let timer = setInterval(() => {
    countdownElement.innerText = counter;
    if (counter == 0) {
      countdownElement.innerText = "START";
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

  //TEST
  // activateCollisionChecker();
}


/**
 * Not complete!!!
 */
function loadGameOver() {
  //Deactivate tank controls
  document.body.removeEventListener("keydown", keyHandler);

  // TO DO: show score & return to welcome page
  alert("Game Over");
}

