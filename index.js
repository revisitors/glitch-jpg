module.exports = function(buf, intensity) {
  if (typeof intensity !== 'number') {
    intensity = 0.1
  }
  var header_length = 0
  var sos_chars_seen = 0
  var last_byte = null
  var i
  var end = buf.length - 1

  for (var i = 0; i < end; i++) {

    /**
       First, we're looking for the Start Of Scan bytes which are
       0xFFDA. The two bytes after this say how long the header stream
       is. We'll skip forward that many bytes before we mess with
       things so we don't make the jpeg invalid.
     */
    if (sos_chars_seen === 0 && buf[i] === 0xFF) {
      sos_chars_seen = 1
    } else if (sos_chars_seen === 1 && buf[i] === 0xDA) {
      sos_chars_seen = 2
      header_length = buf[i+1] + buf[i+2]
    } else if (header_length-- > 0) {
      // skip forward until after we're past header.
      continue
    }


    if (buf[i] === 0xFF || last_byte === 0xFF) {
      // Just skip over things with FF as that's bit of a touchy thing
      // when it comes to huffman encoding that I'd prefer to ignore
      // for the moment.
      continue
    }
    last_byte = buf[i]
    
    // skip some bytes
    if (Math.random() >= intensity) {
      continue
    }
    
    // only replace 120s
    if (buf[i] !== 120) {
      continue
    }
    
    // over 254 and things do not work.
    buf[i] = rng(1,254)
    
  }
  return buf
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
