var peg = require("pegjs");

console.log(peg.generate("start = [ab]").parse("a"))
console.log(peg.generate("start = [ab]").parse("b"))


console.log(peg.generate("start = [abc]").parse("a"))
console.log(peg.generate("start = [abc]").parse("b"))


console.log(peg.generate("start = [a-c]").parse("b"))

console.log(peg.generate("start = [a-c]*").parse("bb"))
console.log(peg.generate("start = [a-c]*").parse("bc"))

// console.log(peg.generate("start = [a-c]*").parse("b c"))  这个不合法, 因为表达式中没有声明空格, 但是parse不会根据空格切割字符串吗? 没有进行词法分析分词吗? 没有像javacc中的skip吗?