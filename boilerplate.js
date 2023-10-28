"use strict";

function displayImg(img, spriteType, row, column) {
  img.setAttribute("id", `${spriteType}-${row}-${column}`);
  document.getElementById(`grid-${row}-${column}`).appendChild(img);
}

function removeImg(row, column) {
  let gridCell = document.getElementById(`grid-${row}-${column}`);
  gridCell.removeChild(gridCell.firstChild);
}


//WIP
function destroyInvader(explosionImg, imgCountdownDuration, row, column) {
  explosionImg.setAttribute("id", `explosion-${row}-${column}`);
  let gridCell = document.getElementById(`grid-${row}-${column}`);
  gridCell.appendChild(explosionImg);

  setTimeout(() => {
    gridCell.removeChild(gridCell.firstChild);
  }, imgCountdownDuration);
}
