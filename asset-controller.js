"use strict";

function getSquidImg() {
  let squidImg = document.createElement("img");
  squidImg.setAttribute("src", "./assets/squid-1.png");
  squidImg.setAttribute("height", "25");
  squidImg.setAttribute("width", "25");
  return squidImg;
}

function getCrabImg() {
  let crabImg = document.createElement("img");
  crabImg.setAttribute("src", "./assets/crab-1.png");
  crabImg.setAttribute("height", "25");
  crabImg.setAttribute("width", "30");
  return crabImg;
}

function getOctoImg() {
  let octoImg = document.createElement("img");
  octoImg.setAttribute("src", "./assets/octo-1.png");
  octoImg.setAttribute("height", "25");
  octoImg.setAttribute("width", "30");
  return octoImg;
}