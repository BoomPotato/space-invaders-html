"use strict";

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


function fireSingleBullets() {
  //If there is no bullet being displayed
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

      /**
       * BUG: Double-tap bug
       * There's a bug in this recursion block that causes bunker hp to be deducted super quickly, about twice as quickly 
       * when spacebar is pressed once or twice and immediately held compared to when spacebar is just held. 
       * My guess is that there are 2 fireSingleBullets() functions running at the same time when the player double-tap holds,
       * and the functions take turns to deduct the bunker's hp in rapid succession. 
       * 
       * Eg: tankBulletBunkerDamageInterval is set to 250ms. Function A deducts bunker hp. 125ms later, function B deducts bunker hp. 
       * 125ms later, function A deducts bunker hp again (having waited 250ms since it first ran). 125ms later, function B deducts 
       * bunker hp again (having waited 250ms since it first ran). To the player, it appears as if the recursion cycle has sped up, 
       * when that's not the case, and it's actually caused by 2 functions taking turns to execute.
       * 
       * I'm not going to fix this bug cuz I don't know how to. And I think it's pretty neat :)
       * Players can use it to quickly clear bunkers that are in the way.
       * 
       * EDIT (5 Dec 2023):
       * MAJOR PROBLEM!!! This bug is also present when firing at invaders. This lets players destroy a lot of invaders in a super 
       * short amount of time. Not good for implementing a leaderboard system if some players exploit this cheat and others don't; 
       * it wouldn't be fair! This bug NEEDS to be fixed!
       */
      setTimeout(() => {
        if (spacebarIsHeldDown) {
          fireSingleBullets();
        }
      }, tankBulletBunkerDamageInterval);
      return;
    }
    //If bullet will not hit a bunker
    else {
      let bulletStraightImg = getBulletStraightImg();
      displayImg(bulletStraightImg, "bulletstraight", bulletCoordinates.row, bulletCoordinates.column);

      //TEST
      checkIfBulletHitsInvader();

      let timer = setInterval(() => {
        //If bullet is at top boundary
        if (bulletCoordinates.row == 1) {
          removeImgById("bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
          bulletCoordinates = {};
          clearInterval(timer);

          if (spacebarIsHeldDown) {
            fireSingleBullets();
          }
          return;
        }

        //TEST
        //If bullet had hit an invader in the previous interval
        if (Object.keys(bulletCoordinates).length == 0) {
          clearInterval(timer);

          if (spacebarIsHeldDown) {
            fireSingleBullets();
          }
          return;
        }

        removeImgById("bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
        bulletCoordinates.row--;
        let bulletStraightImg = getBulletStraightImg();
        displayImg(bulletStraightImg, "bulletstraight", bulletCoordinates.row, bulletCoordinates.column);

        //If bullet is not at the top row (row 1)
        if (bulletCoordinates.row > 1) {

          //TEST
          checkIfBulletHitsInvader();
        }

      }, tankBulletInterval);
    }
  }
}


/**
 * EXTREMELY BUGGY!!! Currently working on this
 * 
 * Does not check for tankbullet-bunker collisions; that is done in fireSingleBullets()
 * 
 * Method for checking for collisions (only for tankbullet hitting invader):
 * Run this checker every time the tankbullet moves. But this is risky (and buggy, apparently) cuz the tankbullet interval is 
 * only 100ms, but the invader interval can go lower than that, so this checker may not be able to keep up with invader movements
 * 
 * Might replace this with activateCollisionChecker() if I can't get this to work
 * 
 * EDIT 1 (5 Dec 2023):
 * Fixed bug that causes invaders to halt movement when all invaders in the last row are destroyed (caused by for-loop trying to 
 * read properties of empty row array). Fixed by checking if each row is empty before pushing invader coordinates to 
 * nearestInvadersToLeft and nearestInvadersToRight. If row is empty (all invaders in it have been destroyed), remove the empty 
 * row array from the invaders array with the splice() method.
 * 
 * EDIT 2 (5 Dec 2023):
 * Discovered new bug:
 * Sometimes, bullets fired from the tank will enter a squid's grid cell (bullet is displayed next to the squid in the same cell) 
 * instead of destroying the squid. This MOSTLY happens (this can still happen in very long intervals; like when the invader 
 * interval has only been decreased once) when the invader movement interval is very short (invader movement is very fast). My guess 
 * is that later into the game when the invader interval speeds up, it becomes too quick for the code to destroy the invader. An 
 * important thing to note is that the bullet continues its trajectory (all the way to the top of the grid; row 1) after being 
 * displayed next to the squid, and the invaders continue their movement too. But maybe the interval being too fast isn't the 
 * problem, since the bug can also occur during long intervals. I really don't know what's causing the problem :(
 */
function checkIfBulletHitsInvader() {
  //Check if the grid cell above the bullet is empty
  //https://stackoverflow.com/questions/47447796/javascript-how-to-know-if-an-element-is-empty
  let gridItemAboveBullet = document.getElementById(`grid-${bulletCoordinates.row - 1}-${bulletCoordinates.column}`);
  let childrenOfGridItem = gridItemAboveBullet.childNodes;

  if (childrenOfGridItem.length != 0) {
    let invaderIdParts = childrenOfGridItem[0].id.split('-');
    let invaderType = invaderIdParts[0];
    let row = invaderIdParts[1];
    let column = invaderIdParts[2];

    //Remove bullet
    removeImgById("bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
    bulletCoordinates = {};

    //Remove invader
    removeImgById(invaderType, row, column);
    for (let rowIndex = invaders.length - 1; rowIndex >= 0; rowIndex--) {

      //TEST
      console.log("invaders[rowIndex]", invaders[rowIndex]);
      console.log("invaders[rowIndex].length", invaders[rowIndex].length);
      console.log("invaders[rowIndex][0]", invaders[rowIndex][0]);

      //If row is not empty (there are invaders in the row)
      if (invaders[rowIndex].length != 0) {
        if (invaders[rowIndex][0].row == row) {
          for (let columnIndex = 0; columnIndex < invaders[rowIndex].length; columnIndex++) {
            if (invaders[rowIndex][columnIndex].column == column) {
              invaders[rowIndex].splice(columnIndex, 1);
            }
          }
        }
      }
      //If row is empty (there are no invaders in the row, all invaders in the row have been destroyed)
      else {
        //Remove empty row array from invaders array
        invaders.splice(rowIndex, 1);
      }
    }

    //If invader is squid
    if (invaderType.indexOf("squid") != -1) {
      score += squidPoints;
      document.getElementById("score").innerText = score;
    }
    //If invader is crab
    else if (invaderType.indexOf("crab") != -1) {
      score += crabPoints;
      document.getElementById("score").innerText = score;
    }
    //If invader is octo
    else if (invaderType.indexOf("octo") != -1) {
      score += octoPoints;
      document.getElementById("score").innerText = score;
    }
  }

}


/**
 * Does not check for tankbullet-bunker collisions; that is done in fireSingleBullets()
 * 
 * Another method of checking for collisions (only for tankbullet hitting invader):
 * Run this checker every 50ms, which is faster than lowest possible invader interval and the tankbullet interval. But this 
 * may overwork the machine
 * 
 * Might replace checkIfBulletHitsInvader() with this if I can't get checkIfBulletHitsInvader() to work
 */
function activateCollisionChecker() {
  let timer = setInterval(() => {
    invaderLoop:
    for (let rowIndex = invaders.length - 1; rowIndex >= 0; rowIndex--) {
      for (let columnIndex = 0; columnIndex < invaders[rowIndex].length; columnIndex--) {
        console.log(invaders[rowIndex][columnIndex]);
        let invaderType = invaders[rowIndex][columnIndex].invader;
        let row = invaders[rowIndex][columnIndex].row;
        let column = invaders[rowIndex][columnIndex].column;

        if (bulletCoordinates.row + 1 == row && bulletCoordinates.column == column) {
          //If invader is squid
          if (invaderType.indexOf("squid") != -1) {
            score += squidPoints;
            document.getElementById("score").innerText = score;
          }
          //If invader is crab
          else if (invaderType.indexOf("crab") != -1) {
            score += crabPoints;
            document.getElementById("score").innerText = score;
          }
          //If invader is octo
          else if (invaderType.indexOf("octo") != -1) {
            score += octoPoints;
            document.getElementById("score").innerText = score;
          }

          //Remove invader
          removeImgById(invaderType, row, column);
          invaders[rowIndex].splice(columnIndex, 1);

          //Remove bullet
          removeImgById("bulletstraight", bulletCoordinates.row, bulletCoordinates.column);
          bulletCoordinates = {};

          break invaderLoop;
        }
      }
    }
    if (gameOver) {
      clearInterval(timer);
    }
  }, collisionCheckerInterval);
}


/**
 * Not complete!!! I'm focusing on fireSingleBullets() first!!!
 */
function fireMultipleBullets() {
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

