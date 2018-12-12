function add_book_rating(name, count) {
    let warning = $('<div>', {
        class: 'warning'
    });

    let icon_time = $('<i>', {
        class: 'fas fa-history icon_warning'
    });

    let warning_text = $('<div>', {
        class: 'warning_text',
    });

    warning_text.append('Added ' + count + ' stars by <a href="#">' + name + '</a>');

    warning.append(icon_time);
    warning.append(warning_text);
    return warning;
}

function add_book_warning(name, author) {
    let warning = $('<div>', {
        class: 'warning'
    });

    let icon_time = $('<i>', {
        class: 'fas fa-history icon_warning'
    });

    let warning_text = $('<div>', {
        class: 'warning_text',
    });

    warning_text.append('You added <a href="#">' + name + '</a> by <a href="#">' + author + '</a> to your must reload titles');

    warning.append(icon_time);
    warning.append(warning_text);
    return warning;
}

function last_warnings() {
    let warnings = [];

    history.forEach((val, key, arr) => {
        if (arr.length - 1 === key || arr.length - 2 === key || arr.length - 3 === key) {
            if(val.type === 'add_book') {
                warnings.push(add_book_warning(val.name, val.author));
            } else {
                warnings.push(add_book_rating(val.name, val.count));
            }
        }
    });
    return warnings;
}

function all_warnings() {
    let warnings = [];

    history.forEach((val, key, arr) => {
        if(val.type === 'add_book') {
            let warning = $('<div>', {
                class: 'event',
                text: 'Add book: ' + val.name + ' author: ' + val.author + '  ' + val.data
            });
            warnings.push(warning)
        } else {
            let warning = $('<div>', {
                class: 'event',
                text: 'Add rating by: ' + val.name + ' rating: ' + val.count + '  ' + val.data
            });
            warnings.push(warning)
        }
    });
    return warnings;
}

