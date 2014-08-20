var fs = require('fs')

module.exports = function(buf) {
  for (i = 400; i < buf.length - 1; i++) {
    if (i % 3 === 2 && buf[i] > 1) {
      buf[i] = rng(1,255)
    }
  }
  return buf
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
