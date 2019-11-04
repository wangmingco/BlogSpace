var peg = require("pegjs");

console.log("& expression : " + peg.generate("start = &'ab'").parse("")) // 
// console.log("& expression : " + peg.generate("start = &'ab'").parse("ab"))
// console.log("& expression : " + peg.generate("start = &'ab'").parse("abab"))