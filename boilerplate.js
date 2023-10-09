"use strict";

function setSquidId(img, row, column) {
  img.setAttribute("id", `squid-${row}-${column}`);
  document.getElementById(`grid-${row}-${column}`).appendChild(img);
}

function setCrabId(img, row, column) {
  img.setAttribute("id", `crab-${row}-${column}`);
  document.getElementById(`grid-${row}-${column}`).appendChild(img);
}

function setOctoId(img, row, column) {
  img.setAttribute("id", `octo-${row}-${column}`);
  document.getElementById(`grid-${row}-${column}`).appendChild(img);
}