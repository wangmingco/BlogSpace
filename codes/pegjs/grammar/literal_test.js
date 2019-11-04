var peg = require("pegjs");

var parser = peg.generate("start = 'ab'");

console.log(parser.parse("ab"))

try {
    console.log(parser.parse("AB"))
}
catch(err) {
}

var parser2 = peg.generate("start = 'cd'i");
try {
    console.log(parser2.parse("CD"))
}
catch(err) {
    console.error(err)
}