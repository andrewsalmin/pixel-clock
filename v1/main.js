"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let sideLarge;
let sideSmall;
let gap;

calculateCanvas();

setInterval(drawClock, 100);

function calculateCanvas() {
  sideLarge = Math.round(0.03 * window.innerWidth);
  sideSmall = Math.round(sideLarge / 2);
  gap = 0;

  canvas.width = 19 * sideLarge + 7 * sideSmall + 25 * gap;
  canvas.height = 5 * sideLarge + 4 * gap;
}

function drawClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let milliseconds = now.getMilliseconds();

  // draw background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw numbers
  drawNumbers(hours, minutes, seconds, milliseconds);
}

function drawNumbers(hours, minutes, seconds, milliseconds) {
  // calculate hours
  let hours_10 = parseInt(hours / 10);
  let hours_1 = hours % 10;

  // calculate minutes
  let minutes_10 = parseInt(minutes / 10);
  let minutes_1 = minutes % 10;

  // calculate seconds
  let seconds_10 = parseInt(seconds / 10);
  let seconds_1 = seconds % 10;

  // choose color
  ctx.fillStyle = "#00FF00";

  // draw hours tens
  drawNumber(hours_10, sideLarge, gap);
  ctx.translate(4 * (sideLarge + gap), 0);

  // draw hours ones
  drawNumber(hours_1, sideLarge, gap);
  ctx.translate(4 * (sideLarge + gap), 0);

  // draw dots
  if (milliseconds <= 500) {
    for (let i = 1; i <= 3; i += 2) {
      ctx.fillRect(0, i * (sideLarge + gap), sideLarge, sideLarge);
    }
  }
  ctx.translate(2 * (sideLarge + gap), 0);

  // draw minutes tens
  drawNumber(minutes_10, sideLarge, gap);
  ctx.translate(4 * (sideLarge + gap), 0);

  // draw minutes ones
  drawNumber(minutes_1, sideLarge, gap);
  ctx.translate(5 * (sideLarge + gap), 5 * (sideLarge - sideSmall));

  // draw seconds tens
  ctx.fillStyle = "#FFFF00";
  drawNumber(seconds_10, sideSmall, gap);
  ctx.translate(4 * (sideSmall + gap), 0);

  // draw seconds ones
  drawNumber(seconds_1, sideSmall, gap);

  // return to starting point
  ctx.translate(
    -19 * sideLarge - 4 * sideSmall - 23 * gap,
    -5 * (sideLarge - sideSmall),
  );
}

function drawNumber(number, side, gap) {
  // 0
  if (number == 0) {
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      if (i == 2) {
        continue;
      }
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 1
  if (number == 1) {
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 2
  if (number == 2) {
    for (let i = 0; i <= 4; i++) {
      if (i == 1) {
        continue;
      }
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      if (i == 3) {
        continue;
      }
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 3
  if (number == 3) {
    for (let i = 0; i <= 4; i++) {
      if (i == 1 || i == 3) {
        continue;
      }
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 4
  if (number == 4) {
    for (let i = 0; i <= 4; i++) {
      if (i == 3 || i == 4) {
        continue;
      }
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    ctx.fillRect(side + gap, 2 * (side + gap), side, side);
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 5
  if (number == 5) {
    for (let i = 0; i <= 4; i++) {
      if (i == 3) {
        continue;
      }
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      if (i == 1) {
        continue;
      }
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 6
  if (number == 6) {
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      if (i == 1) {
        continue;
      }
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 7
  if (number == 7) {
    ctx.fillRect(0, 0, side, side);
    ctx.fillRect(side + gap, 0, side, side);
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 8
  if (number == 8) {
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }

  // 9
  if (number == 9) {
    for (let i = 0; i <= 4; i++) {
      if (i == 3) {
        continue;
      }
      ctx.fillRect(0, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i += 2) {
      ctx.fillRect(side + gap, i * (side + gap), side, side);
    }
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(2 * (side + gap), i * (side + gap), side, side);
    }
  }
}

window.onresize = function () {
  calculateCanvas();
};
