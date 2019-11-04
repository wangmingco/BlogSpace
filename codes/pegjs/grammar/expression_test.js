var peg = require("pegjs");

// test (subexpression)
console.log("" + peg.generate("start = ('subexpression')").parse("subexpression"))


// test expression *
console.log("expression * : " + peg.generate("start = 'ab'*").parse(""))
console.log("expression * : " + peg.generate("start = 'ab'*").parse("ab"))
console.log("expression * : " + peg.generate("start = 'ab'*").parse("abab"))
// console.log(expression * : " + peg.generate("start = 'ab'*").parse("aba")) 这种会报错


// test expression +
// console.log(peg.generate("start = 'ab'+").parse("")) 这种会报错, 因为至少要有一个
console.log("expression + : " + peg.generate("start = 'ab'+").parse("ab"))
console.log("expression + : " + peg.generate("start = 'ab'+").parse("abab"))
// console.log(peg.generate("start = 'ab'*").parse("aba")) 这种会报错


// test expression ?
console.log("expression ? : " + peg.generate("start = 'ab'?").parse("")) // 只匹配ab, 要不然匹配空
console.log("expression ? : " + peg.generate("start = 'ab'?").parse("ab"))
// console.log("expression ? : " + peg.generate("start = 'ab'?").parse("abab"))    // 只匹配ab, 要不然匹配空, 匹配其他都不可以
// console.log(peg.generate("start = 'ab'*").parse("aba")) // 只匹配ab, 要不然匹配空, 匹配其他都不可以


// test & expression TODO
console.log("& expression : " + peg.generate("start = &'ab'").parse("a")) // 
// console.log("& expression : " + peg.generate("start = &'ab'").parse("ab"))
// console.log("& expression : " + peg.generate("start = &'ab'").parse("abab"))


// test ! expression TODO
console.log("! expression : " + peg.generate("start = !'ab'").parse("")) 
// console.log("! expression : " + peg.generate("start = !'ab'").parse("a"))
// console.log("! expression : " + peg.generate("start = !'ab'").parse("ab"))
// console.log("! expression : " + peg.generate("start = !'ab'").parse("abab"))    // 只匹配ab, 要不然匹配空, 匹配其他都不可以


// test $ expression 
// console.log("$ expression : " + peg.generate("start = $'ab'").parse("")) 
// console.log("$ expression : " + peg.generate("start = $'ab'").parse("a"))
console.log("$ expression : " + peg.generate("start = $'ab'").parse("ab"))
// console.log("! expression : " + peg.generate("start = !'ab'").parse("abab"))    // 只匹配ab, 要不然匹配空, 匹配其他都不可以


// test expression1 expression2 ... expressionn
console.log("expression1 expression2 ... : " + peg.generate("start = 'ab' 'cd' 'e'").parse("abcde"))
// console.log("expression1 expression2 ... : " + peg.generate("start = 'ab' 'cd' 'e'").parse("ab"))


// test expression1 / expression2 / ... / expressionn
console.log("expression1/expression2 ... : " + peg.generate("start = 'ab'/'cd'/'e'").parse("ab"))
console.log("expression1/expression2 ... : " + peg.generate("start = 'ab'/'cd'/'e'").parse("cd"))
console.log("expression1/expression2 ... : " + peg.generate("start = 'ab'/'cd'/'e'").parse("e"))
