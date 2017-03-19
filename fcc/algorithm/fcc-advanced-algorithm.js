/********** FCC Advanced Algorithm **********/

// 综合应用 basic/intermeidate algorithm 相关的练习

// 1. Validate US Telephone Numbers
// 主要是用正则表达式匹配多种书写方式
function telephoneCheck(str) {
    var pattern = /^1?\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
    return pattern.test(str);
}

// 2. Record Collection
// 下面的是原题内容
var collection = {
    "2548": {
        "album": "Slipperty When Wet",
        "artsit": "Bon Jovi",
        "tracks": [
            "Let It Rock",
            "You Give Love a Bad Name"
        ]
    },
    "2468": {
        "album": "1999",
        "artist": "Prince",
        "tracks": [
            "1999",
            "Little Red Corvette"
        ]
    },
    "1245": {
        "artist": "Robert Palmer",
        "track": []
    },
    "5439": {
        "album": "ABBA Gold"
    }
};
var collectionCopy = JSON.parse(JSON.stringify(collection));

// 解题函数：
function updateRecords(id, prop, value) {
    if (value === "") {
        delete collectionCopy[id][prop];
    } else {
        if (prop === "tracks") {
            if (collectionCopy[id].tracks === undefined) {
                collectionCopy[id].tracks = [];
            }
            collectionCopy[id].tracks.push(value);
        } else {
            collectionCopy[id][prop] = value;
        }
    }
    return collectionCopy;
}

// 3. Symmetric Diffefrence
function sym(/*参数是2个或多个数组*/) {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(arr1, arr2) {
        return arr1.filter(function(item) {
            return arr2.indexOf(item) === -1;
        }).concat(arr2.filter(function(item) {
            return arr1.indexOf(item) === -1;
        }));
    }).reduce(function(item1, item2) {
        if (item1.indexOf(item2) === -1) {
            return item1.concat(item2);
        }
        return item1;
    }, []);
}

// 4. Exact Change
// 这道题同 intermediate 的 romans 类似
function checkCashRegister(price, cash, cid) {
    var diff,
        change,
        total;
    diff = cash - price;
    total = cid.reduce(function(item1, item2) {
        return item1 + item2[1];
    }, 0);

    // 钱柜钱总数等于应找余额，返回"Closed"
    if (Math.abs(diff - total) < Number.EPSILON) {
        return "Closed";
    }
    cid.reverse();  // 按从大到小的顺序找零
    change = cid.map(function(item) {
        var note,
            realCount,
            requireCount;

        // switch语句找出当前项的面值
        switch (item[0]) {
            case "ONE HUNDRED":
                note = 100;
                break;
            case "TWENTY":
                note = 20;
                break;
            case "TEN":
                note = 10;
                break;
            case "FIVE":
                note = 5;
                break;
            case "ONE":
                note = 1;
                break;
            case "QUARTER":
                note = 0.25;
                break;
            case "DIME":
                note = 0.1;
                break;
            case "NICKEL":
                note = 0.05;
                break;
            case "PENNY":
                note = 0.01;
                break;
        }

        // realCount表示实际张数，requireCount表示预期张数
        realCount = item[1] / note;
        requireCount = Math.floor((diff + 0.001) / note); // 防止小数误差
        if (realCount <= requireCount) {
            item[1] = realCount * note;
        } else {
            item[1] = requireCount * note;
        }
        diff -= item[1]; // 应找余额减去已找金额,进入 map 下一循环
        return item;
    }).filter(function(item) {
        return item[1] !== 0;   // 去除数额为零的项目
    });

    if (diff > 0) {
        return "Insufficient Funds";    // 从面值大到小找零后仍有余额的话
    }
    return change;
}

// 5. Inventory Update 
// 如果第二个数组有update或者new，将第一个数组元素更新（update)或者添加新元素（new),其它情况的话第一个数组元素保持不变
function updateInventory(arr1, arr2) {
    var arr1Items;
    arr1Items = arr1.map(function(item) {
        return item[1];
    });

    // 将arr2的子数组元素更新到arr1
    arr2.forEach(function(arr2Item) {
        var index = arr1Items.indexOf(arr2Item[1]);
        if (index === -1) {
            arr1.push(arr2Item);
        } else {
            arr1[index][0] += arr2Item[0];
        }
    });

    // 新数组按子数组第二个元素的字符串顺序排序
    return arr1.sort(function(item1, item2) {
        if (item1[1] < item2[1]) {
            return -1;
        } else {
            return 1;
        }
    });
}

// 6. No repeats please
// 提供一个字符串，打散排列，这些排列里如果没有连续的字符计数+1，求总数
// 未解完，
function permAlone(str) {

    // 得到以单字符为属性、数量为属性值的对象
    var charCountPair = str.split("").reduce(function(obj, chr) {
        if (obj.hasOwnProperty(chr)) {
            obj[chr] += 1;
        } else {
            obj[chr] = 1;
        }
        return obj;
    }, {});

    // 用数学知识算的方式还没想好，关键是去重; 可能有编程方法而非数学方法解？
}

// 7.  Make a Person
var Person = function(firstAndLast) {
    var that = this;
    this.getFirstName = function() {
        var spaceIndex = firstAndLast.indexOf(" ");
        return firstAndLast.slice(0, spaceIndex);
    };
    this.getLastName = function() {
        var spaceIndex = firstAndLast.indexOf(" ");
        return firstAndLast.slice(spaceIndex + 1);
    };
    this.getFullName = function() {
        return firstAndLast;
    };

    // 用 that 代替 closure 里的 this ，
    // 这在 setFirstName() 函数被其它变量引用时更安全
    this.setFirstName = function(first) {
        firstAndLast =  first + " " + that.getLastName(); // 这里使用 that
    };
    this.setLastName = function(last) { // 这个函数同上
        firstAndLast = that.getFirstName() + " " + last;  // 这里使用 that
    };
    this.setFullName = function(fullName) {
        firstAndLast =  fullName;
    };
}

// 8. Map the Debris
// 高中物理知识,记不住了网上查
function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    var radius;
    return arr.map(function(item) {
        radius = earthRadius + item.avgAlt;
        item.orbitalPeriod = Math.round(2 * Math.PI *
                Math.pow(Math.pow(radius, 3) / GM, 0.5));
        delete item.avgAlt;
        return item;
    });
}

// 9. Pairwise
// 找出和为指定值的两个元素，它们的索引值求和，这个过程持续整个数组遍历完成.
// 已求和的元素不能再应用，如果元素相等，取索引值之和最小的一对。
function pairwise(arr, arg) {
    var sum = 0;
    var cachedIndex = [];
    var len = arr.length;
    var index,
        item,
        pair,
        pairIndex;
    for (index = 0; index < len; index += 1) {
        item = arr[index];
        pair = arg - item;
        pairIndex = arr.indexOf(pair);
        if (cachedIndex.indexOf(index) !== -1) {
            continue;
        }
        while (cachedIndex.indexOf(pairIndex) !== -1 ||
                pairIndex === index) {
            pairIndex = arr.indexOf(pair, pairIndex + 1);
        }
        if (pairIndex !== -1) {
            cachedIndex.push(index, pairIndex);
            sum += index + pairIndex;
        }
    }
    return sum;
}
