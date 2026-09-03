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
  let colors = getThemeColors();

  // draw background
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw circle
  drawCircle(seconds, colors);

  // draw numbers
  drawNumbers(hours, minutes, milliseconds, colors);
}

function drawCircle(seconds, colors) {
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
  ctx.fillStyle = colors.seconds;

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

function drawNumbers(hours, minutes, milliseconds, colors) {
  // calculate hours
  let [hours_10, hours_1] = splitTensOnes(hours);

  // calculate minutes
  let [minutes_10, minutes_1] = splitTensOnes(minutes);

  // define dimensions
  let side = Math.round(0.04 * canvas.width);
  let gap = 0;

  // move to starting point
  let x0 = Math.round((canvas.width - (17 * side + 16 * gap)) / 2);
  let y0 = Math.round((canvas.height - (5 * side + 4 * gap)) / 2);
  ctx.translate(x0, y0);

  // choose color
  ctx.fillStyle = colors.digit;

  // draw hours tens
  drawDigit(ctx, hours_10, side, gap);
  ctx.translate(4 * (side + gap), 0);

  // draw hours ones
  drawDigit(ctx, hours_1, side, gap);
  ctx.translate(4 * (side + gap), 0);

  // draw dots
  if (milliseconds <= 500) {
    for (let i = 1; i <= 3; i += 2) {
      ctx.fillRect(0, i * (side + gap), side, side);
    }
  }
  ctx.translate(2 * (side + gap), 0);

  // draw minutes tens
  drawDigit(ctx, minutes_10, side, gap);
  ctx.translate(4 * (side + gap), 0);

  // draw minutes ones
  drawDigit(ctx, minutes_1, side, gap);

  // return to starting point
  ctx.translate(-14 * (side + gap), 0);

  // return to (0, 0)
  ctx.translate(-x0, -y0);
}

window.addEventListener("resize", calculateCanvas);
