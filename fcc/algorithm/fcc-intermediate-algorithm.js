// FCC INTERMEDIATE ALGORITHM, 笔记在fcc-intermediate-algorithm-note.md里

// 1. Sum All Numbers in a Range
function sumAll(arr) {
    var i,
        sum = 0;
    var min = Math.min.apply(this, arr);
    var max = Math.max.apply(this, arr);
    for (i = min; i <= max; i += 1) {
        sum += i;
    }
    return sum;
}

// 2. Diff Two Arrays
function diffArray(arr1, arr2) {
    return arr1.filter(function(item) {     // arr1 去重
        return arr2.indexOf(item) === -1;
    }).concat(arr2.filter(function(item) {  // arr2 去重，拼接
        return arr1.indexOf(item) === -1;
    }));
}

// 3. Roman Numeral Converter
function convertToRoman(num) {
    // 更大的数得使用特殊罗马字符了，原题也是这么大的范围
    // 如果范围更大，romans会复杂，可以使用函数映射数位和罗马字符集
    // step 1
    var romans = [["I", "V", "X"], ["X", "L", "C"], ["C", "D", "M"], ["M"]];
    
    // step 2, 不知道多少位，干脆将num逆序过来,再convert到romans
    return String(num).split("").reverse().map(function(item, i) {
        
        // step 3, 罗马字符的组合方式：
        var low = romans[i][0];
        var middle = romans[i][1];
        var high = romans[i][2];
        if (item < 4) {
            return low.repeat(item);   // 这里偷点懒，直接用.repeat()了
        } else if (item < 6) {
            return low.repeat(5 - item) + middle;
        } else if (item < 9) {
            return middle + low.repeat(item - 5);
        } else {
            return low + high;
        }
    }).reverse().join("");  // step 4, 再逆序回去，拼接
}

// 4. Wherfore art thou
function whatIsInAName(collection, source) {
    return collection.filter(function(obj) {
        for (var prop in source) {
            if (!(prop in obj && obj[prop] === source[prop])) {
                return false;
            }
        }
        return true;
    });
}

// 5. Search and Replace
function myReplace(str, before, after) {
    return str.replace(before, function() {
        if (/^[a-z]/.test(before)) {
            return after[0].toLowerCase() + after.slice(1);
        } else {
            return after[0].toUpperCase() + after.slice(1);
        }
    });
}

// 6. Pig Latin
function translatePigLatin(str) {
    var index = str.search(/[aeiou]/);
    return index === 0 ? str + "way" : str.slice(index) + 
        str.slice(0, index) + "ay";
}

// 7. DNA Pairing
function pairElement(str) {
    return str.split("").map(function(chr) {
        switch (chr) {
            case "A":
                return ["A", "T"];
            case "T":
                return ["T", "A"];
            case "C":
                return ["C", "G"];
            case "G":
                return ["G", "C"];
        }
    });
}

// 8. Missing letters
function fearNotLetters(str) {
    var i,
        len = str.length,
        newStr = "";
    var strCode = str.split("").map(function(chr) {
        return chr.charCodeAt(0);
    }).sort(function(item1, item2) {
        return item1 - item2;
    });
    for (i = strCode[0]; i <= strCode[len - 1]; i += 1) {
        if (strCode.indexOf(i) === -1) {
            newStr += String.fromCharCode(i);
        }
    }
    return newStr ? newStr : undefined;
}

// 9. Boo who
function booWho(bool) {
    return typeof bool === "boolean";
}

// 10. Sorted Union
function uniteUnique() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(arr1, arr2) {
        return arr1.concat(arr2.filter(function(item) {
            return arr1.indexOf(item) === -1;
        }));
    }, []);
}

// 11. Convert HTML Entities
function convertHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "'":
                return "&apos;";
            case '"':
                return "&quot;";
        }
    });
}

// 12. Spinal Tap Case
function spinalCase(str) {
    return str.replace(/[A-Z]/g, function(match) {
        return "-" + match.toLowerCase();
    }).replace(/[\W_]+/g, function(match, index) {
        return index === 0 ? "" : "-";
    });
}

// 13. Sum All Odd Fibonacci Numbers
function sumFibs(num) {
    function fibs(num) {
        var arr = [1, 1];
        var len = arr.length;
        while (arr[len - 2] + arr[len - 1] <= num) {
            arr[len] = arr[len - 1] + arr[len - 2];
            len = arr.length;
        }
        return arr;
    }
    return fibs(num).reduce(function(item1, item2) {
        return item2 % 2 === 1 ? item1 + item2 : item1;
    }, 0);
}

// 14. Sum All Primes
function sumPrimes(num) {
    var i,
        sum = 0;
    function isPrime(num) {
        var i;
        if (num < 4) {
            return true;
        }
        for (i = 2; i <= Math.ceil(Math.sqrt(num)); i += 1) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }
    for (i = 2; i <= num; i += 1) {
        if (isPrime(i)) {
            sum += i;
        }
    }
    return sum;
}

// 15. Smallest Common Multiple
function smallestCommons(arr) {
    var i,
        range = [],
        min = Math.min.apply(this, arr);
        max = Math.max.apply(this, arr);
    function commonOfTwo(a, b) {
        var i;
        for (i = Math.min(a, b); i <= a * b; i += 1) {
            if (i % a === 0 && i % b === 0) {
                return i;
            }
        }
    }
    for (i = min; i <= max; i += 1) {
        range.push(i);
    }
    return range.reduce(function(item1, item2) {
        return commonOfTwo(item1, item2);
    }, 1);
}

// 16. Finders Keepers
function findElement(arr, func) {
    return arr.filter(func)[0];
}

// 17. Drop it
function dropElements(arr, func) {
    var index = arr.map(func).indexOf(true);
    return index !== -1 ? arr.slice(index) : [];
}

// 18. Steamroller
function steamrollArray(arr) {
    return arr.reduce(function(item1, item2) {
        return Array.isArray(item2) ? item1.concat(steamrollArray(item2)) : 
                item1.concat(item2);
    }, []);
}

// 19. Binary Agents
function binaryAgent(str) {
    return str.split(" ").map(function(item) {
        return String.fromCharCode(parseInt(item, 2));
    }).join("");
}

// 20. Everything Be True
function truthCheck(collection, pre) {
    return collection.every(function(obj) {
        return Boolean(obj[pre]);
    });
}

// 21. Arguments Optional
function addTogether() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;
    function isValid(args) {
        return args.every(function(item) {
            return typeof item === "number";
        });
    }
    if (!isValid(args)) {
        return undefined;
    }
    if (len === 2) {
        return args[0] + args[1];
    } else {
        return function() {
            return addTogether(args[0], arguments[0]);
        };
    }
}
