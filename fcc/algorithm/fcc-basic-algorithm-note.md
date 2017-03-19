FCC basic algorithm解题过程中参考、学习和总结笔记

这里按fcc algorithm题目解题所用到知识点顺序，作笔记. 主要参考MDN和犀牛书以及eloquentjavascript.net; 解题的全部代码在fcc-basic-algorithm.js里面.

## 1. Reverse a string
关键点
```js
str.split("").reverse().join("");
```
这是比较简洁和语义的方法。下面是相关方法的知识点。更后面有一些自己的想法。

### String.prototype.split()

在现有字符串方法不能完成操作且数组方法不能间接调用时，我们可以使用.split()方法将字符串切开成数组。

syntax
```js
str.split([separator[,limit]])
separator为String或RegExp起匹配作用, limit 为非负整数。
```
1. .split()方法返回一个数组。
2. 任意字符串，.split()没有实参或者separator匹配不到时，返回包含原字符串的单一元素数组：
```js
"abc".split()   // ["abc"]
"".split()      // [""]
```
3. 任意字符串，str.split("")返回由原字符串切分成单字符后组成的数组。特别的，str为空字符串时，由于没有字符可分成单字符，因此返回空数组。
```js
"abc".split("") // ["a", "b", "c"]
"a".split("")   // ["a"]
"".split("")    // []
```
4. 如果separator匹配在字符串首部或尾部，返回数组中首部或尾部元素为空字符串：
```js
"abc".split("a")    // ["", "bc"]
"abc".split(/c/)    // ["ab", ""]
```
5. separator为正则表达式且含有capturing groups时, capturing groups所匹配的子项会依次填入数组, 对于其它情况，separator不出现在返回数组中
```js
"xxabcdxx".split("abcd")        // ["xx", "xx"], 非正则
"xxabcdxx".split(/a(b)c(d)/)    // ["xx", "b", "d", "xx"], 正则且capturing
"xxabcdxx".split(/a(?:b)c(d)/)  // ["xx", "d", "xx"], 正则，non-capturing项不返回
"Hello\nWorld".split(/(\n)/)    // ['Hello', '\n', 'World'], nodejs
```
6. limit参数决定返回数组.length长度, arr.length = limit, 也可看作切分数量
```js
"banana".split("a")     // ["b", "n", "n", ""]
"banana".split("a", 3)     // ["b", "n", "n"]
"banana".split("a", 2)     // ["b", "n"]
"banana".split("b", 1)     // [""]
"banana".split("b", 0)     // []
```

### Array.prototype.reverse()
syntax
```js
arr.reverse()
```
1. 就是reverse的意思:
```js
[1,2,3].reverse()   // [3,2,1]
```
2. 无需任何参数，输入任何合法js值都是可以的，虽然没什么作用。输入非法值报错。
```js
[1,2,3].reverse(1,"dkfj",function(){},true,[{}]);   // [3,2,1]
[1,2,3].reverse(notDefinedVariable);    // ReferenceError: notDefinedVariable is not defined
```
3. 这个方法直接改变原数组:
```js
var a = [1,2,3];
a.reverse();
console.log(a);     // [3,2,1]
```

### Array.prototype.sort(), 一部分
由于Array.prototype.reverse()实际是数组排序（直接逆序），其功能可以被Array.prototype.sort()所涵盖。虽然逆序时.reverse()比.sort()来的简单，anyway，作为总结记录：
```js
[1,2,3].sort(function() {
    return 1;   // 正数就行
});     // [3,2,1]
```

### Array.prototype.join()
syntax
```js
arr.join([separator])
```
1. 跟String.prototype.split()作用相反，Array.prototype.join()总是将数组拼接成字符串。
```js
[1,2,3].join("-");  // "1-2-3"
```
2. 拼接数量跟数组实际索引属性无关，跟数组长度(.length)相关, 数量为len - 1, 例外：空数组返回空字符串，单一元素返回元素转换成字符串的形式。
```js
new Array(5).join("-")     // "----"
// 也就是说，即使作为稀疏数组的伪属性（not in), 在拼接时也能够以空字符串的形式作为节点。
[].join("kdjfk")    // ""
[100].join("very good")     // "100"
```
3. 无实参时以comma(,)连接, 这也是数组coersion到字符串的方式。实参可以是任何合法js值，其会被coersion到字符串。
```js
[1,2,3].join();  // "1,2,3"
[1,2,3].join(function(){});     // "1function (){}2function (){}3"
```

好了，使用原生方法(函数)解决了字符串逆序的问题，我们同样可以回归原始状态来解。
```js
var i,
    str = "hello",
    newStr = "";
for (i = str.length -1; i >= 0; i -= 1) {
    newStr += str[i];
}
console.log(newStr);    // "olleh"
```
我们可以模拟Array.prototype.reverse(), 不考虑命名污染
```js
Array.prototype.fakeReverse = function() {
    var i, 
        arr = [];
    for (i = this.length -1; i >= 0; i -= 1) {
        arr.push(this[i]);
    }
    for (i = 0; i < this.length; i += 1) {
        this[i] = arr[i];
    }
    return this;
}
var a = [1,2,3];
var b = a.fakeReverse();
console.log("a ", a, " b ", b);   // a [3,2,1] b [3,2,1]
// 后面会总结一些数组方法的fake
```
这是我的fake(我并不知道浏览器的源码)，可以看到this[i]是被改变了的。这也就是为什么Array.prototype.reverse()以及.sort()/.push()/.splice()等等改变原数组的方法不能用于字符串这样的原始值,原始值是不能被改变的(immutable)。
```js
Array.prototype.reverse.call("hello world");    
// firefox: TypeError: 0 is read-only
// chrome: Uncaught TypeError: Cannot assign to read only property '0' of object '[object String]'
// nodejs: TypeError: Cannot assign to read only property '0' of object '[object String]'
```
大体上，除了增删和排序类方法，其它数组方法默认都不会改变原数组. 也就是说大部分数组方法可用于其它类数组值。
```js
Array.prototype.join.call("hello", "-");    // "h-e-l-l-o"
// or
"hello".split("").join("-");    // "h-e-l-l-o"
```
基本上来看，如需使用数组方法进行字符串操作，使用.split()方法将字符串切片转换成数组是个很好的选择。


## 2. Factorialize a Number
1. 另一种方式是迭代, 显然递归 + ternary代码更简洁
```js
function factorialize(num) {
    var i,
        product = 1;
    for (i = 0; i <= num; i += 1) {
        product *= num;
    }
    return product;
}
```
2. javascript函数是可以递归调用的
3. ternary操作符(?:)在一个层级的分支以及单行80字范围内比if...else语句更适合

## 3. Check for Palindromes
1. 做FCC算法题的一个收获就是它激励了我比较全面的学习了RegExp
2. non-alphanumeric，不建议直接匹配，因为太多了; 更好的方式是间接匹配：
```js
var pattern1 = /[\W_]/;     // 或者 /[\W]|_/
var pattern2 = /[^0-9a-zA-Z]/   // 或者 /[^0-9a-z]/i
var pattern3 = /[^\w]|_/
// 等等，正则表达式很强大，匹配的方式也多种多样，我这里选择的是最简单的
```
3. 使用.replace()时，如果要全局替换，不要忘记flag "g"
4. str处理过之后，可以将其逆序后与原字符串比较。
5. 可以使用递归,同样的,比较后，发现使用原生方法更简单
```js
function palindrome(str) {
    var len;
    str = str.replace(/[\W_]/g, "").toLowerCase();     // beautify str
    len = str.length;
    if (len === 0) {
        return true;
    }
    if (str[0] === str[len - 1]) {
        return palindrome(str.slice(1, -1));
    }
    return false;
}
```
扩展题  
projecteuler.net有个题，大概：两个两位数乘积最大的palindrome是9009，求三位数。
```js
// 这里求n位数, 虽然 n > 6 时这个算法很慢, 对于3位数这样的 n < 6 时几秒内得解
function largestPalindromeProduct(n) {
    var i,
        j,
        product,    // product by i and j
        lpp = 0,    // current largest palindrome product
        lowerLimit = Math.pow(10, n - 1),
        higherLimit = Math.pow(10, n) - 1;

    function isPalindrome(num) {
        var str = String(num);
        return str === str.split("").reverse().join("");
    }

    for (i = higherLimit; i >= lowerLimit; i -= 1) {
        if (i * higherLimit <= lpp) {
            break;
        }
        for (j = higherLimit; j >= lowerLimit; j -= 1) {
            product = i * j;
            if (product <= lpp) {
                break;
            }
            if (isPalindrome(product)) {
                lpp = product;
            }
        }
    }

    return lpp;
}
largestPalindromeProduct(3);    // 906609
```

## 4. Find the longest word in a string
1. 以非word字符串切开，得到word数组。
2. 由于要根据数组元素之间比较得出一个值，使用.reduce()方法是最合适的。

### Array.prototype.reduce(),Array.prototype.reduceRight()
这两个方法类似，只不过.reduceRight()从数组右边开始遍历

syntax
```js
arr.reduce(callback[,initialValue])

// callback的参数跟其它es5数组方法类似:
function callback(item1, item2, indexOfItem2, array) {
    // len = array.length
    // 如果有initialValue, 初始item1 = initialValue, item2 = array[0],
    // else, item1 = array[0], item2 = array[1]
    // 有initialValue时，执行len次，else，执行len - 1次
    // 下一次执行时，上一次执行返回值作为item1，array[indexOfItem2+1]作为item2,
}
```
1. callback在遍历到元素后调用，调用 initialValue ? len - 1 : len次
2. 设置初始值是更好和更安全的选择：
```js
[1,2,3].reduce((a,b) => a + b, 0);  // 6 
```
3. .reduce()方法很强大，可以实现很多其它数组方法的功能甚至更多
```js
// 类似map(funcGenerate)
arr.reduce(func(item1, item2) {
    // 这里funcGenerate是map的具体操作
    return item1.concat(funcGenerate(item2));
}, [])
```
4. 也就是说，当其它数组方法不太适合时，可以考虑.reduce()


## 5/6 应用map/reduce和字符串方法,跟前面类似，这里fake一个map方法
1. 注意一点，看MDN上面的 .map()方法时，注意到callback执行时，原数组的变化是不影响的，callback函数照原数组执行。
2. fake 一个 map：
```js
Array.prototype.fakeMap = function(func, that) {
    var i,
        arr = [];
    for (i = 0; i < this.length; i += 1) {
        arr.push(func.call(that, this[i]));
    }
    return arr;
}
var a = [1,2,3];
a.fakeMap(function(item) {
    return 2 * item;
});     // [2, 4, 6]
```

## 7. Confirm the Ending
1. 用RegExp很简单
2. 可以用.endswith()方法(ie不支持)，如果环境支持的话
3. 可以使用其它原生方法:
```js
function confirmEnding(str, target) {
    var index = str.lastIndexOf(target);
    return (index === -1) ? false : (str.slice(index) === target);
}
```
4. 对于是否开头，可以用.startsWith()方法(ie不支持)，以及对应的/^/正则，以及类似的原生方法

## 8. repeat a string
js的\*没有倍乘字符串的功能，新方法.repeat()可以实现它(ie不支持)。

## 9. Truncate a string
基本上理解题意，然后分支语句，应用.slice(),当然.substring()/.substr()等都可以

## 10. Chunky Monkey
.slice()的范围可以超出数组范围

## 11. Slasher Flick
.slice()不改变原数组，嗯，str.splice(0, howMany)要复杂些些还会改变原数组

## 12. Mutations
1. Array.prototype.some(), Array.prototype.every(), 返回true或false,都是语义化的方法。
2. String.prototype.indexOf(str[, startPoint]), 从指定位置（默认0）查找str, 找到返回index,否则返回 -1; String.prototype.lastIndexOf()从反方向找，类似于.reduceRight()

## 13. Falsy Bouncer
去除falsy值，返回新数组。用Boolean()直接判断最快，筛选用.filter()方法。

## 14. Seek and Destroy
跟13题类似，用到了函数的arguments对象，它是类数组，因此可以间接用数组方法。

## 15. Where do I belong
用到了Array.prototype.sort()方法，前面提到，.sort()方法可以逆序字符串。它还有很多其它功能，得益于函数式编程。

1. 默认是alphanumeric式的unicode顺序排。
```js
["b", "c", "a", 3, 1, 2].sort();    // [1, 2, 3, "a", "b", "c"]

// 非字符串的转换成字符串。
[function(){}, "firefox"].sort();    // [ "firefox", function ()  ]
```
2. 升降序,原理是在排序前item1的索引值小于item2，如果函数返回负，顺序不变, 如果函数返回正，交换顺序。
```js
var arr = [1,5,3];
arr.sort(function(item1, item2) {
    return item1 - item2;   // 这是升序，降序为return item2 - item1
});     // [1,3,5]
```
3. 逆序，由升降序而来：
```js
var arr = [1,2,3];
arr.sort(function() {
    return 1;   // 任何正数都可以，表示任意元素，旧索引值大的新索引值小
});
```
4. 前面看到，元素不作处理会转换成字符串，我们可以将比较的方式升级, 比较对象:
```js
function sortBy(prop) {
    return function (obj1, obj2) {
        return obj1[prop] - obj2[prop];   // 这里可以做任何处理后再比较
        // 比如
        // {execute code}
        // return 1 or -1 or ...
    }
}
var person = [{name: "lee", age: 16}, {name: "zhang", age: 12}];
person.sort(sortBy("age"));     
// [{name: "zhang", age: 12}, {name: "lee", age: 16}];
```

## 16. Caesars Cipher
1. 就是将字符串中大写字母以alphabetic范围中轴转换。自然用到.map()方法，不符合条件的直接返回，符合添加的走分支看是前半部分还是后半部分。
2. 用的简单正则/[A-Z]/

## 这里记录的一些知识点、解题方法和理解，有的详细有的简略，总体来说是有收获的。
