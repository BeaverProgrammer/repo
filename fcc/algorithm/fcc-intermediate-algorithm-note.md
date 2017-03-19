解题代码在fcc-intermediate-algorithm.js里

## 1. Sum all numbers in a range
1. 关于函数的间接调用，Function.prototype.call()/apply()类似，.call()的实参是散列的，.apply()的实参是（类）数组, 这里针对函数调用。第一个参数作为函数的this值，如果函数本身是作为函数调用的，第一个参数可以输入任意值，如果函数本身是作为方法调用的，第一个参数输入（类）数组。
2. 这里没必要用数组方法了，直接迭代

## 2. Diff Two Arrays
数学：两个数组的并集 - 它们的交集  
编程：分别去重后拼接

用到了Array.prototype.concat()方法。它很方便的拼接了数组，后面有个深层次扁平化多维数组的题，会用到它.

## 3. Roman Numeral Converter
没有想到更好的办法，只能按平常思维一步一步取实现。注释直接写在了解题函数里。

## 4. Wherefore art thou
可以多种方式解, 比如
```js
function whatIsInAName(collection, source) {
    return collection.filter(function(obj) {
        return Object.keys(source).every(function(key) {
            return obj.hasOwnProperty(key) && obj[key] === source[key];
        });
    });
}
```

## 5. Search and Replace
论熟悉原生方法和正则的重要性

## 6. Pig Latin
以元音位置区分

## 7. DNA Pairing
好像无法拒绝使用 switch

## 8. Missing letters
跟前面某些题类似，更综合性。

## 9. Boo who
当然，Object.prototype.toString.call(bool)是更一般化的方法,但只是判断是否为boolean，为啥不用更简单的 typeof

## 10. Sorted Union
论熟悉原生方法的重要性

## 11. Convert HTML Entities
论熟悉原生方法的重要性，无法拒绝使用switch，熟悉基本的 HTML entities

## 12. Spinal Tap Case
论原生方法和正则的重要性

## 13. Sum All Odd Fibonacci Numbers
开始进入projecteuler.net的节奏了？

## 14. Sum All Primes
同样是数学题

## 15. Smallest Common Multiple(in a range)
计算

## 16. Finders Keepers
.filter() 方法的本质

## 17. Drop it
主要是找出符合条件的index

## 18. Steamroller
.concat()不可以递归的扁平化数组，但可以扁平化一次。

扁平化多维数组, 可以用递归，也可以不用递归，但是都用到了.concat()方法。
```js
// 这里补充不用递归的方式：
function steamrollArray(arr) {
    function isFlat(arr) {
        return arr.every(function(item) {
            return Object.prototype.toString(item) !== "[object Array]";
        });
    }
    while (!isFlat(arr)) {
        arr = arr.reduce(function(item1, item2) {
            return item1.concat(item2);
        }, []);
    }
    return arr;
}
```
.concat()方法，新旧数组元素是对象的话指向同一个对象，有改变会互相影响。

## 19. Binary Agents
.toString(2) 可以转换数字到二进制字符串，parseInt(num, 2) 可以将二进制字符串转换成十进制数字。这里的 2 可以改成 16 或其它进制。

## 20. Everything be true
判断对象里相应属性值是否为falsy

## 21. Arguments Optional
单参数的返回用了递归只是不想再一次写 isValid 判断

