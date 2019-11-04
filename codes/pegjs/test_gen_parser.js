var peg =  require("./allowed_start_rules/arithmetics_allowed_start_rules.js")
var result = peg.parse("10 * 20")
console.log(result)