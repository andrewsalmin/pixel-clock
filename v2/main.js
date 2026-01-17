"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

calculateCanvas();

setInterval(drawClock, 100);

function calculateCanvas() {
  // canvas width and canvas height are equal
  if (window.innerWidth < window.innerHeight) {
    canvas.width = Math.round(0.9 * window.innerWidth);
  } else {
    canvas.width = Math.round(0.9 * window.innerHeight);
  }
  canvas.height = canvas.width;
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

  // draw circle
  drawCircle(seconds);

  // draw numbers
  drawNumbers(hours, minutes, milliseconds);
}

function drawCircle(seconds) {
  // move to starting point
  let x0 = canvas.width / 2;
  let y0 = canvas.height / 2;
  ctx.translate(x0, y0);

  // define angles
  let angStart = (90 * Math.PI) / 180; // 90 degrees
  let angPeriod = (6 * Math.PI) / 180; // 6 degrees
  let angDuration = (5 * Math.PI) / 180; // 5 degrees

  // rotate to starting angle
  ctx.rotate(-angStart); // angStart degrees anticlockwise
  ctx.rotate(-angDuration / 2); // (angDuration/2) degrees anticlockwise

  // choose color
  ctx.fillStyle = "#FFFF00";

  // draw seconds
  for (let i = 0; i <= seconds; i++) {
    ctx.beginPath();
    if (i % 5 == 0) {
      ctx.arc(0, 0, 0.43 * canvas.width, 0, angDuration);
    } else {
      ctx.arc(0, 0, 0.45 * canvas.width, 0, angDuration);
    }
    ctx.arc(0, 0, 0.5 * canvas.width, angDuration, 0, true);
    ctx.fill();
    ctx.rotate(angPeriod);
  }

  // return to starting angle
  ctx.rotate(-(seconds + 1) * angPeriod);

  // return to 0 degrees
  ctx.rotate(angDuration / 2); // (angDuration/2) degrees clockwise
  ctx.rotate(angStart); // angStart degrees clockwise

  // return to (0, 0)
  ctx.translate(-x0, -y0);
}

function drawNumbers(hours, minutes, milliseconds) {
  // calculate hours
  let hours_10 = parseInt(hours / 10);
  let hours_1 = hours % 10;

  // calculate minutes
  let minutes_10 = parseInt(minutes / 10);
  let minutes_1 = minutes % 10;

  // define dimensions
  let side = Math.round(0.04 * canvas.width);
  let gap = 0;

  // move to starting point
  let x0 = Math.round((canvas.width - (17 * side + 16 * gap)) / 2);
  let y0 = Math.round((canvas.height - (5 * side + 4 * gap)) / 2);
  ctx.translate(x0, y0);

  // choose color
  ctx.fillStyle = "#00FF00";

  // draw hours tens
  drawNumber(hours_10, side, gap);
  ctx.translate(4 * (side + gap), 0);

  // draw hours ones
  drawNumber(hours_1, side, gap);
  ctx.translate(4 * (side + gap), 0);

  // draw dots
  if (milliseconds <= 500) {
    for (let i = 1; i <= 3; i += 2) {
      ctx.fillRect(0, i * (side + gap), side, side);
    }
  }
  ctx.translate(2 * (side + gap), 0);

  // draw minutes tens
  drawNumber(minutes_10, side, gap);
  ctx.translate(4 * (side + gap), 0);

  // draw minutes ones
  drawNumber(minutes_1, side, gap);

  // return to starting point
  ctx.translate(-14 * (side + gap), 0);

  // return to (0, 0)
  ctx.translate(-x0, -y0);
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
