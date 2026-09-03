"use strict";

(function (global) {
  // Each digit is a 5x3 pixel grid. A row is a 3-bit mask (bit 2 = left column).
  const DIGIT_PATTERNS = [
    [0b111, 0b101, 0b101, 0b101, 0b111], // 0
    [0b001, 0b001, 0b001, 0b001, 0b001], // 1
    [0b111, 0b001, 0b111, 0b100, 0b111], // 2
    [0b111, 0b001, 0b111, 0b001, 0b111], // 3
    [0b101, 0b101, 0b111, 0b001, 0b001], // 4
    [0b111, 0b100, 0b111, 0b001, 0b111], // 5
    [0b111, 0b100, 0b111, 0b101, 0b111], // 6
    [0b111, 0b001, 0b001, 0b001, 0b001], // 7
    [0b111, 0b101, 0b111, 0b101, 0b111], // 8
    [0b111, 0b101, 0b111, 0b001, 0b111], // 9
  ];

  function drawDigit(ctx, digit, side, gap) {
    const rows = DIGIT_PATTERNS[digit];
    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < 3; col++) {
        if (rows[row] & (1 << (2 - col))) {
          ctx.fillRect(col * (side + gap), row * (side + gap), side, side);
        }
      }
    }
  }

  function splitTensOnes(value) {
    return [Math.floor(value / 10), value % 10];
  }

  global.PixelClock = Object.assign(global.PixelClock || {}, {
    drawDigit,
    splitTensOnes,
  });
})(window);
