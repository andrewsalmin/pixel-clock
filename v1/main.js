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
  let colors = PixelClock.getThemeColors();

  // draw background
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw numbers
  drawNumbers(hours, minutes, seconds, milliseconds, colors);
}

function drawNumbers(hours, minutes, seconds, milliseconds, colors) {
  // calculate hours
  let [hours_10, hours_1] = PixelClock.splitTensOnes(hours);

  // calculate minutes
  let [minutes_10, minutes_1] = PixelClock.splitTensOnes(minutes);

  // calculate seconds
  let [seconds_10, seconds_1] = PixelClock.splitTensOnes(seconds);

  // choose color
  ctx.fillStyle = colors.digit;

  // draw hours tens
  PixelClock.drawDigit(ctx, hours_10, sideLarge, gap);
  ctx.translate(4 * (sideLarge + gap), 0);

  // draw hours ones
  PixelClock.drawDigit(ctx, hours_1, sideLarge, gap);
  ctx.translate(4 * (sideLarge + gap), 0);

  // draw dots
  if (milliseconds <= 500) {
    for (let i = 1; i <= 3; i += 2) {
      ctx.fillRect(0, i * (sideLarge + gap), sideLarge, sideLarge);
    }
  }
  ctx.translate(2 * (sideLarge + gap), 0);

  // draw minutes tens
  PixelClock.drawDigit(ctx, minutes_10, sideLarge, gap);
  ctx.translate(4 * (sideLarge + gap), 0);

  // draw minutes ones
  PixelClock.drawDigit(ctx, minutes_1, sideLarge, gap);
  ctx.translate(5 * (sideLarge + gap), 5 * (sideLarge - sideSmall));

  // draw seconds tens
  ctx.fillStyle = colors.seconds;
  PixelClock.drawDigit(ctx, seconds_10, sideSmall, gap);
  ctx.translate(4 * (sideSmall + gap), 0);

  // draw seconds ones
  PixelClock.drawDigit(ctx, seconds_1, sideSmall, gap);

  // return to starting point
  ctx.translate(
    -19 * sideLarge - 4 * sideSmall - 23 * gap,
    -5 * (sideLarge - sideSmall),
  );
}

window.addEventListener("resize", calculateCanvas);
