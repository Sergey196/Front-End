
function last_warnings() {
    let warnings = [];

    history.forEach((val, key, arr) => {
        if (arr.length - 1 === key || arr.length - 2 === key || arr.length - 3 === key) {
            warnings.push(val);
        }
    });
    return warnings;
}

function all_warnings() {
    let warnings = [];

    history.forEach((val, key, arr) => {
        warnings.push(val)
    });
    return warnings;
}

