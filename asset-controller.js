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

//=======================================

function getSquidImg1() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/squid-1.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "25");
  return img;
}

function getSquidImg2() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/squid-2.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "25");
  return img;
}

function getCrabImg1() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/crab-1.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "30");
  return img;
}

function getCrabImg2() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/crab-2.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "30");
  return img;
}

function getOctoImg1() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/octo-1.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "30");
  return img;
}

function getOctoImg2() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/octo-2.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "30");
  return img;
}

function getTankImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/tank.png");
  img.setAttribute("height", "20");
  img.setAttribute("width", "40");
  return img;
}

function getBulletStraightImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/bullet-straight.png");
  img.setAttribute("height", "15");
  img.setAttribute("width", "10");
  return img;
}

