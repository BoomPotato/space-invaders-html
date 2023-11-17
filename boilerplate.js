"use strict";

function displayImg(img, spriteType, row, column) {
  img.setAttribute("id", `${spriteType}-${row}-${column}`);
  document.getElementById(`grid-${row}-${column}`).appendChild(img);
}

function removeImg(row, column) {
  let gridCell = document.getElementById(`grid-${row}-${column}`);
  gridCell.removeChild(gridCell.firstChild);
}

function removeImgById(spriteType, row, column) {
  let img = document.getElementById(`${spriteType}-${row}-${column}`);

  //TEST
  console.log(img);

  let gridCell = document.getElementById(`grid-${row}-${column}`);
  gridCell.removeChild(img);
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

function deductBunkerHealthPoint(index) {
  bunkerSegments[index].healthpoints--;
  let bunker = document.getElementById(`grid-${bunkerSegments[index].row}-${bunkerSegments[index].column}`);

  //If healthpoints reaches zero
  if (bunkerSegments[index].healthpoints <= 0) {
    //Convert bunker to normal grid-item
    bunkerSegments.splice(index, 1);
    bunker.innerText = "";
    bunker.classList.remove("bunker");
  }
  //If healthpoints is greater than 0
  else {
    //Display updated healthpoints
    bunker.innerText = bunkerSegments[index].healthpoints;
  }
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
