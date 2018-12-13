var arr = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];


function removeDuplicates(arr) {
    var unique_array = [];
    for(var i = 0;i < arr.length; i++) {
        if(unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

console.log(removeDuplicates(arr));