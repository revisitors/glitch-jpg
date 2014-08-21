module.exports = function(buf) {
  var i
  for (i = 0; i < buf.length - 1; i++) {
    if (String.fromCharCode(buf[i]) ===  'x') {
      // over 254 and things do not work.
      buf[i] = rng(1,254)
    }
  }
  return buf
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
