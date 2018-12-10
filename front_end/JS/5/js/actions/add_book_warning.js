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