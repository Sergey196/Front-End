var array1 = ["Vijendra", "Singh"];
var array2 = ["Singh", "Shakya"];
var array3 = [];

var arr = array1.concat(array2), len = arr.length;

while (len--) {
    var itm = arr[len];
    if (array3.indexOf(itm) === -1) {
        array3.unshift(itm);
    }
}

console.log(array3)