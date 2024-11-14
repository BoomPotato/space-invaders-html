"use strict";

//Tank controls
/**
 * Modified from StackOverFlow:
 * https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
 */
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
  fire() {
    spacebarIsHeldDown = true;

    //If not allowing more than one bullet to be displayed at a time (follow original game)
    if (!multipleBullets) {
      fireSingleBullets();
    }
    //If allowing more than one bullet to be displayed at a time
    else {
      fireMultipleBullets();
    }
  },
  stopFiring() {
    spacebarIsHeldDown = false;
  }
};
var keyAction = {
  'a': { keydown: action.moveLeft },
  'ArrowLeft': { keydown: action.moveLeft },
  'd': { keydown: action.moveRight },
  'ArrowRight': { keydown: action.moveRight },
  ' ': { keydown: action.fire, keyup: action.stopFiring }
};
var keyHandler = (event) => {
  if (!(event.key in keyAction) || !(event.type in keyAction[event.key])) return; //No such Action
  if (event.repeat && event.key == " ") {
    return; // Key-held, prevent repeated Actions (Does not work in IE11-)
  }
  keyAction[event.key][event.type]();  //Trigger an Action
};


/**
 * Modified from StackOverFlow:
 * https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
 */
function activateTankControls() {
  ['keydown', 'keyup'].forEach((evType) => {
    document.body.addEventListener(evType, keyHandler);
  });
}

