var fs = require('fs')

module.exports = function(buf) {
  for (i = 400; i < buf.length - 1; i++) {
    if (buf[i] > 1) {
      // over 254 and things do not work.
      buf[i] = rng(1,254)
    }
  }
  return buf
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
