var arr = [0, 1, 2, 3, 'ate', '', false, NaN, undefined, false, null, 0, '""'];

function func(arr) {
    return arr.filter(Boolean);
}

console.log(func(arr));

//NaN, null, 0, false
