function add_book_rating(name, count) {
    //alert(star.nextAll().length);
    //alert(star.parent().parent().parent().find($('.book_name')).text());
    //alert(star.closest('.book_name').text());
    let warning = $('<div>', {
        class: 'warning'
    });

    let icon_time = $('<i>', {
        class: 'fas fa-history icon_warning'
    });

    let warning_text = $('<div>', {
        class: 'warning_text',
    });

    //let numbersOfStars = star.nextAll().length + 1;

    warning_text.append('Added ' + count + ' stars by <a href="#">' + name + '</a>');

    warning.append(icon_time);
    warning.append(warning_text);
    return warning;
}