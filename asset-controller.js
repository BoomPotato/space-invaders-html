"use strict";

function getSquidImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/squid-1.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "25");
  return img;
}

function getCrabImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/crab-1.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "30");
  return img;
}

function getOctoImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/octo-1.png");
  img.setAttribute("height", "25");
  img.setAttribute("width", "30");
  return img;
}

function getBunkerImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/bunker.png");
  img.setAttribute("height", "30");
  img.setAttribute("width", "120");
  return img;
}

function getTankImg() {
  let img = document.createElement("img");
  img.setAttribute("src", "./assets/tank.png");
  img.setAttribute("height", "20");
  img.setAttribute("width", "40");
  return img;
}