var peg = require("pegjs");

var parser = peg.generate("start = ('a' / 'b')+");

var result = parser.parse("abba")

console.log(result)