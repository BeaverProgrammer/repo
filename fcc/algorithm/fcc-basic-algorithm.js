// FCC BASIC ALGORITHM, 只满足题意要求，不是API
// 详细笔记在fcc-basic-algorithm-note.md里

// 1. Reverse a String
function reverseString(str) {
    return str.split("").reverse().join("");
}

// 2. Factorialize a Number
function factorialize(num) {
    return (num === 0) ? 1 : num * factorialize(num - 1);
}

// 3. Check for Palindromes
function palindrome(str) {
    str = str.replace(/[\W_]/g, "").toLowerCase();  // beautify str
    return str === str.split("").reverse().join("");
}

// 4. Find the Longest Word in a String
function findLongestWord(str) {
    return str.split(/\W+/).reduce(function(item1, item2) {
        return item1.length < item2.length ? item2 : item1;
    }, "").length;
}

// 5. Title Case a Sentence
function titleCase(str) {
    return str.split(/\s+/).map(function(word) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }).join(" ");
}

// 6. Return Largest Numbers in Arrays
function largestOfFour(arr) {
    return arr.map(function(item) {
        return item.reduce(function(num1, num2) {
            return num1 < num2 ? num2 : num1;
        }, -Infinity);
    });
}

// 7. Confirm the Ending
function confirmEnding(str, target) {
    return new RegExp(target + "$").test(str);
}

// 8. Repeat a string repeat a string
function repeatStringNumTimes(str, num) {
    var i,
        newStr = str;
    if (num <= 0) {
        return "";
    }
    for (i = 0; i < num - 1; i += 1) {
        newStr += str;
    }
    return newStr;
}

// 9. Truncate a string
function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    } else if (num <= 3) {
        return str.slice(0, num) + "...";
    } else {
        return str.slice(0, num - 3) + "...";
    }
}

// 10. Chuncky Monkey
function chunkArrayInGroups(arr, size) {
    var i,
        newArr = [];
    var groupsCount = Math.ceil(arr.length / size);
    for (i = 0; i < groupsCount; i += 1) {
        newArr.push(arr.slice(i * size, (i + 1) * size));
    }
    return newArr;
}

// 11. Slasher Flick
function slasher(arr, howMany) {
    return arr.slice(howMany);
}

// 12. Mutations
function mutation(arr) {
    return arr[1].toLowerCase().split("").every(function(chr) {
        return arr[0].toLowerCase().indexOf(chr) !== -1;
    });
}

// 13. Falsy Bouncer
function bouncer(arr) {
    return arr.filter(function(item) {
        return Boolean(item) === true;
    });
}

// 14. Seek and Destroy
function destroyer(arr) {
    var compareArgs = Array.prototype.slice.call(arguments, 1);
    return arr.filter(function(item) {
        return compareArgs.indexOf(item) === -1;
    });
}

// 15. Where do I belong
function getIndexToIns(arr, num) {
    arr.push(num);
    return arr.sort(function(item1, item2) {
        return item1 - item2;
    }).indexOf(num);
}

// 16. Caesars Ciper
function rot13(str) {
    return str.split("").map(function(chr) {
        if (/[A-Z]/.test(chr)) {
            if (String.fromCharCode(chr.charCodeAt(0) + 13).match(/[A-Z]/)) {
                return String.fromCharCode(chr.charCodeAt(0) + 13);
            } else {
                return String.fromCharCode(chr.charCodeAt(0) - 13);
            }
        }
        return chr;
    }).join("");
}
