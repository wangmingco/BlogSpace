---
title: PEG.js Documentation
date: 2018-11-15 21:21:00
---
PEG.js is a simple parser generator for JavaScript that produces fast parsers with excellent error reporting. You can use it to process complex data or computer languages and build transformers, interpreters, compilers and other tools easily.

PEG.js是JavaScript里一个简单的parser生成器, 它能够非常快的生成parser, 而且如果在生成过程中遇到了问题, 也会给出非常明确的错误报告. 你可以很轻松地用它处理复杂的数据结构或者计算机语言, 也可以构建出transformers, interpreters, compilers 等其他工具.

## Features
PEG.js具有如下特性
* Simple and expressive grammar syntax. 简单而富有表现力的语法
* Integrates both lexical and syntactical analysis. 集成了词法和语法分析.
* Parsers have excellent error reporting out of the box . 生成的解析器具有出色的错误报告功能
* Based on parsing expression grammar formalism — more powerful than traditional LL(k) and LR(k) parsers. 基于parsing expression grammar, 比传统的 LL(k) 和 LR(k) parser更加强大.
* Usable from your browser, from the command line, or via JavaScript API. 适用于浏览器, 命令行或者JavaScript API 等多种环境.

## Installation

## Node.js
要使用`pegjs`命令的话, 需要使用全局模式安装`PEG.js`:
```
$ npm install -g pegjs
```
要使用`JavaScript API`, 需要使用`locally`模式安装 `PEG.js` :
```
$ npm install pegjs
```
如果既要使用`pegjs`命令又要使用JavaScript API, 那么你需要将上面俩种方式都安装一遍.

<!--more-->

### Browser
通过`Bower`安装 `PEG.js`:
```
$ bower install pegjs
```

## Generating a Parser
PEG.js generates parser from a grammar that describes expected input and can specify what the parser returns (using semantic actions on matched parts of the input). Generated parser itself is a JavaScript object with a simple API.

`PEG.js`根据一个grammar生成parser, 我们可以描述这个grammar希望获得怎么样的输入以及指定parser返回的内容(using semantic actions on matched parts of the input). 通过一个简单api就可以可以生成一个parser JS对象.

### Command Line
To generate a parser from your grammar, use the pegjs command:
想要将你的grammar生成parser, 直接像下面这样使用`pegjs`命令就好:
```
$ pegjs arithmetics.pegjs
```
This writes parser source code into a file with the same name as the grammar file but with “.js” extension. You can also specify the output file explicitly:
上面的命令会将生成的parser的源码输出到与grammar文件同名的js结尾的文件中. 我们也可以像下面这样输出到指定文件中:
```
$ pegjs -o arithmetics-parser.js arithmetics.pegjs
```
If you omit both input and output file, standard input and output are used.
但是如果你将输入输出文件都忽略了, 那么系统将会采用标准输入输出.

By default, the generated parser is in the Node.js module format. You can override this using the * --format option.
在默认设置下, 生成的parser代码是以Node.js module format 进行格式化的, 你可以通过指定`--format`选项来改变它.

You can tweak the generated parser with several options:
你可以通过如下几个命令来修改生成的parser的默认行为.

* `--allowed-start-rules`: Comma-separated list of rules the parser will be allowed to start parsing from (default: the first rule in the grammar).

* `--cache`: 开启parser的缓存功能. 在这种情况下, parser会将parse出来的结果缓存起来, 避免极端情况下解析时间成指数级增加, 但是坏处是parser可能会变慢.
Makes the parser cache results, avoiding exponential parsing time in pathological cases but making the parser slower.
* `--dependency`: 让parser依赖一个指定的依赖.(该参数可以多次使用)
Makes the parser require a specified dependency (can be specified multiple times).
* `--export-var`: 
Name of a global variable into which the parser object is assigned to when no module loader is detected.
* `--extra-options`: 传递给`peg.generate`的额外参数(JSON 形式).
Additional options (in JSON format) to pass to peg.generate.
* `--extra-options-file`: 传递给`peg.generate`的额外参数文件(JSON 形式).
File with additional options (in JSON format) to pass to peg.generate.
* `--format`: 生成的parser格式, 可选值有`amd`, `commonjs`, `globals`, `umd`(默认是`commonjs`)
Format of the generated parser: amd, commonjs, globals, umd (default: commonjs).
* `--optimize`: 为生成的parser在parsing时的优化方式, 可以选择解析速度(`speed`)或者parse结果代码大小(`size`). (默认是`speed`)
Selects between optimizing the generated parser for parsing speed (speed) or code size (size) (default: speed)
* `--plugin`: 为PEG.js配置插件(可以配置多个, 即多次配置)
Makes PEG.js use a specified plugin (can be specified multiple times).
* `--trace`: 开启parser的trace功能.
Makes the parser trace its progress.

### JavaScript API
In Node.js, require the PEG.js parser generator module:
在node.js中, 你只需要直接`require("pegjs")` peg.js模块就可以了.
```javascript
var peg = require("pegjs");
```
In browser, include the PEG.js library in your web page or application using the `<script>` tag. If PEG.js detects an AMD loader, it will define itself as a module, otherwise the API will be available in the peg global object.

如果你的web页面或应用运行在浏览器中, 你需要通过`<script>`标签引入`PEG.js`仓库. If PEG.js detects an AMD loader, it will define itself as a module, otherwise the API will be available in the peg global object.

To generate a parser, call the peg.generate method and pass your grammar as a parameter:
生成一个parser也非常简单, 只需要调用`peg.generate`方法, 如果把你的解析器文法参数传递进去就可以了
```javascript
var parser = peg.generate("start = ('a' / 'b')+");
```
The method will return generated parser object or its source code as a string (depending on the value of the output option — see below). It will throw an exception if the grammar is invalid. The exception will contain message property with more details about the error.

这个方法会返回一个新生成的parser对象或者是一个parser源码的字符串(这个取决于输出选项, 参考下面). 如果文法参数不合法的话, 会抛出一个异常(异常中会包含这个错误的详细信息). 

You can tweak the generated parser by passing a second parameter with an options object to peg.generate. The following options are supported:
我们还可以向`peg.generate` 方法传递第二个参数(该参数是一个对象), 这个参数会改变新生成的parser的行为. 支持的参数如下:
* allowedStartRules: Rules the parser will be allowed to start parsing from (default: the first rule in the grammar).
* allowedStartRules: 指定parser开始的rule. (默认是文法中第一个rule.)
* cache: If true, makes the parser cache results, avoiding exponential parsing time in pathological cases but making the parser slower (default: false).
* cache: 如果设置为`true`, parser会将parse的结果缓存起来, 可以避免在极端情况下过长的解析时间, 但同时它带来的副作用是会使得parser变慢(默认false).
* dependencies
Parser dependencies, the value is an object which maps variables used to access the dependencies in the parser to module IDs used to load them; valid only when format is set to "amd", "commonjs", or "umd" (default: {}).
* dependencies: 
* exportVar
Name of a global variable into which the parser object is assigned to when no module loader is detected; valid only when format is set to "globals" or "umd" (default: null).
* exportVar: 
* format: 对生成的parser进行格式化, 可选值为(`"amd"`, `"bare"`, `"commonjs"`, `"globals"`, or `"umd"`). 只有`output`设置为`source`, 该参数才生效
format of the generated parser ("amd", "bare", "commonjs", "globals", or "umd"); valid only when output is set to "source" (default: "bare").
* optimize: 为生成的parser选择一个优化方案, 可选值为`"speed"`或者`"size"`. (默认`"speed"`)
Selects between optimizing the generated parser for parsing speed ("speed") or code size ("size") (default: "speed").
* output: 设置`generate()`方法返回格式. 如果值为`"parser"`, 则返回生成的parser对象. 如果设置为`"source"`, 则返回parser source字符串
If set to "parser", the method will return generated parser object; if set to "source", it will return parser source code as a string (default: "parser").
* plugins: 要使用的插件
Plugins to use.
* trace: 追踪parser的执行过程(默认是false).
Makes the parser trace its progress (default: false).

## Using the Parser
Using the generated parser is simple — just call its parse method and pass an input string as a parameter. The method will return a parse result (the exact value depends on the grammar used to generate the parser) or throw an exception if the input is invalid. The exception will contain location, expected, found and message properties with more details about the error.

使用生成的parser也非常简单, 只需要调用parser对象的`parse`方法, 然后将一个字符串参数传递进该方法就可以了. 然后该方法会返回一个parse结果(已经在定义parser的文法中描述了返回何种类型的值), 或者如果字符串不合法的话抛出一个异常. 异常会输出详细的错误信息.
```javascript
parser.parse("abba"); // returns ["a", "b", "b", "a"]

parser.parse("abcd"); // throws an exception 
```
You can tweak parser behavior by passing a second parameter with an options object to the parse method. The following options are supported:
同样的, 你也可以在该方法中传递一个parse选项参数, 以改变`parse()`方法的默认行为. 支持的参数如下:
* startRule: Name of the rule to start parsing from. 开始从哪个rule执行.
* tracer: Tracer to use. 开启tracer.

Parsers can also support their own custom options.
Parsers 也可以自定义参数, 以支持定制化的需求.

## Grammar Syntax and Semantics
The grammar syntax is similar to JavaScript in that it is not line-oriented and ignores whitespace between tokens. You can also use JavaScript-style comments (// ... and /* ... */).
Let's look at example grammar that recognizes simple arithmetic expressions like 2*(3+4). A parser generated from this grammar computes their values.

peg.js的语法和JavaScript非常像, 但是有俩点不同, pegjs不是line-oriented, 而且peg.js会忽略tokens之间的空白符. 统同样地你可以在peg.js文法文件中使用`//...`和`/* ... */`注释

下面是个peg.js文法示例, 该示例生成的parser会识别出算数表达式 `2*(3+4)`, 然后将该值计算出来.

```javascript
start
  = additive

additive
  = left:multiplicative "+" right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
```

On the top level, the grammar consists of rules (in our example, there are five of them). Each rule has a name (e.g. integer) that identifies the rule, and a parsing expression (e.g. digits:[0-9]+ { return parseInt(digits.join(""), 10); }) that defines a pattern to match against the input text and possibly contains some JavaScript code that determines what happens when the pattern matches successfully. A rule can also contain human-readable name that is used in error messages (in our example, only the integer rule has a human-readable name). The parsing starts at the first rule, which is also called the start rule.

从总体上来说, 文法是由rule组成的.每个rule都有一个名字(例如上例中的:`integer`) 和 一个解析表达式(例如上例中的:`digits:[0-9]+ { return parseInt(digits.join(""), 10); }`), 该表达式主要由俩部分组成, 匹配输入字符串的表达式规则和 匹配成功之后要执行的JavaScript代码. rule也可以设置一个对人类比较可读的名称, 例如上例中的integer就有一个别名, 该别名主要用于发生解析异常时, 输出日志便于解决问题. 解析动作从第一个rule开始, 我们通常以`start`命名这个rule.

A rule name must be a JavaScript identifier. It is followed by an equality sign (“=”) and a parsing expression. If the rule has a human-readable name, it is written as a JavaScript string between the name and separating equality sign. Rules need to be separated only by whitespace (their beginning is easily recognizable), but a semicolon (“;”) after the parsing expression is allowed. 

rule名称必须符合JavaScript的标识符规则. rule名称后跟一个`=`符号, 该符号后跟一个解析表达式. 如果rule名称要跟一个别名的话, 该别名必须在rule名称与`=`之间. rule之间需要由空白符进行分割, rule后也可以跟一个分号`;`

The first rule can be preceded by an initializer — a piece of JavaScript code in curly braces (“{” and “}”). This code is executed before the generated parser starts parsing. All variables and functions defined in the initializer are accessible in rule actions and semantic predicates. The code inside the initializer can access options passed to the parser using the options variable. Curly braces in the initializer code must be balanced. Let's look at the example grammar from above using a simple initializer.

在第一个规则之前可以包含一段初始化JavaScript代码, 这段JavaScript代码必须被包含在花括号("{"和"}")里. 这段初始化代码会在parser开始解析之前被执行. 初始化代码块里面的变量和方法可以被后续的rule访问到. 初始化代码可以通过访问`options`参数访问到传递给parser的参数. Curly braces in the initializer code must be balanced. 下面我们看一个简单的使用了初始化代码的示例:

```javascript
{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = additive

additive
  = left:multiplicative "+" right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }
```

The parsing expressions of the rules are used to match the input text to the grammar. There are various types of expressions — matching characters or character classes, indicating optional parts and repetition, etc. Expressions can also contain references to other rules. See detailed description below.



If an expression successfully matches a part of the text when running the generated parser, it produces a match result, which is a JavaScript value. For example:

* An expression matching a literal string produces a JavaScript string containing matched text.
* An expression matching repeated occurrence of some subexpression produces a JavaScript array with all the matches.

The match results propagate through the rules when the rule names are used in expressions, up to the start rule. The generated parser returns start rule's match result when parsing is successful.

One special case of parser expression is a parser action — a piece of JavaScript code inside curly braces (“{” and “}”) that takes match results of some of the the preceding expressions and returns a JavaScript value. This value is considered match result of the preceding expression (in other words, the parser action is a match result transformer).

In our arithmetics example, there are many parser actions. Consider the action in expression digits:[0-9]+ { return parseInt(digits.join(""), 10); }. It takes the match result of the expression [0-9]+, which is an array of strings containing digits, as its parameter. It joins the digits together to form a number and converts it to a JavaScript number object.

### Parsing Expression Types
There are several types of parsing expressions, some of them containing subexpressions and thus forming a recursive structure:

解析表达式可以分为很多种类, 而且有一些还包含子表达式, 包含子表达式的就形成了一种递归结构.

##### `"literal"`
##### `'literal'`
Match exact literal string and return it. The string syntax is the same as in JavaScript. Appending i right after the literal makes the match case-insensitive.

严格匹配字面量字符串, 然后直接返回该字符串字面量. 在pegjs里字符串语法和JavaScript里相同. 在常量最后加一个`i`表示不区分大小写.

##### `.`
Match exactly one character and return it as a string.

严格匹配一个字符, 然后将它作为一个字符串返回.

##### `[characters]`
Match one character from a set and return it as a string. The characters in the list can be escaped in exactly the same way as in JavaScript string. The list of characters can also contain ranges (e.g. [a-z] means “all lowercase letters”). Preceding the characters with ^ inverts the matched set (e.g. [^a-z] means “all character but lowercase letters”). Appending i right after the literal makes the match case-insensitive.



##### `rule`
Match a parsing expression of a rule recursively and return its match result.

##### `( expression )`
Match a subexpression and return its match result.

##### `expression *`
Match zero or more repetitions of the expression and return their match results in an array. The matching is greedy, i.e. the parser tries to match the expression as many times as possible. Unlike in regular expressions, there is no backtracking.

##### `expression +`
Match one or more repetitions of the expression and return their match results in an array. The matching is greedy, i.e. the parser tries to match the expression as many times as possible. Unlike in regular expressions, there is no backtracking.

##### `expression ?`
Try to match the expression. If the match succeeds, return its match result, otherwise return null. Unlike in regular expressions, there is no backtracking.

##### `& expression`
Try to match the expression. If the match succeeds, just return undefined and do not consume any input, otherwise consider the match failed.

##### `! expression`
Try to match the expression. If the match does not succeed, just return undefined and do not consume any input, otherwise consider the match failed.

##### `& { predicate }`
The predicate is a piece of JavaScript code that is executed as if it was inside a function. It gets the match results of labeled expressions in preceding expression as its arguments. It should return some JavaScript value using the return statement. If the returned value evaluates to true in boolean context, just return undefined and do not consume any input; otherwise consider the match failed.

The code inside the predicate can access all variables and functions defined in the initializer at the beginning of the grammar.

The code inside the predicate can also access location information using the location function. It returns an object like this:
```javascript
{
  start: { offset: 23, line: 5, column: 6 },
  end:   { offset: 23, line: 5, column: 6 }
}
```
The start and end properties both refer to the current parse position. The offset property contains an offset as a zero-based index and line and column properties contain a line and a column as one-based indices.

The code inside the predicate can also access options passed to the parser using the options variable.

Note that curly braces in the predicate code must be balanced.

##### `! { predicate }`
The predicate is a piece of JavaScript code that is executed as if it was inside a function. It gets the match results of labeled expressions in preceding expression as its arguments. It should return some JavaScript value using the return statement. If the returned value evaluates to false in boolean context, just return undefined and do not consume any input; otherwise consider the match failed.

The code inside the predicate can access all variables and functions defined in the initializer at the beginning of the grammar.

The code inside the predicate can also access location information using the location function. It returns an object like this:

```javascript
{
  start: { offset: 23, line: 5, column: 6 },
  end:   { offset: 23, line: 5, column: 6 }
}
```

The start and end properties both refer to the current parse position. The offset property contains an offset as a zero-based index and line and column properties contain a line and a column as one-based indices.

The code inside the predicate can also access options passed to the parser using the options variable.

Note that curly braces in the predicate code must be balanced.

##### `$ expression`
Try to match the expression. If the match succeeds, return the matched text instead of the match result.

##### `label : expression`
Match the expression and remember its match result under given label. The label must be a JavaScript identifier.

Labeled expressions are useful together with actions, where saved match results can be accessed by action's JavaScript code.

##### `expression1 expression2 ... expressionn`
Match a sequence of expressions and return their match results in an array.

##### `expression { action }`
Match the expression. If the match is successful, run the action, otherwise consider the match failed.

The action is a piece of JavaScript code that is executed as if it was inside a function. It gets the match results of labeled expressions in preceding expression as its arguments. The action should return some JavaScript value using the return statement. This value is considered match result of the preceding expression.

To indicate an error, the code inside the action can invoke the expected function, which makes the parser throw an exception. The function takes two parameters — a description of what was expected at the current position and optional location information (the default is what location would return — see below). The description will be used as part of a message of the thrown exception.

The code inside an action can also invoke the error function, which also makes the parser throw an exception. The function takes two parameters — an error message and optional location information (the default is what location would return — see below). The message will be used by the thrown exception.

The code inside the action can access all variables and functions defined in the initializer at the beginning of the grammar. Curly braces in the action code must be balanced.

The code inside the action can also access the text matched by the expression using the text function.

The code inside the action can also access location information using the location function. It returns an object like this:

```javascript
{
  start: { offset: 23, line: 5, column: 6 },
  end:   { offset: 25, line: 5, column: 8 }
}
```
The start property refers to the position at the beginning of the expression, the end property refers to position after the end of the expression. The offset property contains an offset as a zero-based index and line and column properties contain a line and a column as one-based indices.

The code inside the action can also access options passed to the parser using the options variable.

Note that curly braces in the action code must be balanced.

##### `expression1 / expression2 / ... / expressionn`
Try to match the first expression, if it does not succeed, try the second one, etc. Return the match result of the first successfully matched expression. If no expression matches, consider the match failed.

## Compatibility
Both the parser generator and generated parsers should run well in the following environments:

* Node.js 0.10.0+
* Internet Explorer 8+
* Edge
* Firefox
* Chrome
* Safari
* Opera