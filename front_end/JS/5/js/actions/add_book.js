function add_book(name, author, cover_url, rating) {

    let book = $('<div>', {
        class: 'book'
    });

    let book_img = $('<div>', {
        class: 'book_img'
    });

    let book_img_view = $('<img>', {
        class: 'book_img_view',
        src: cover_url
    });

    let book_name = $('<div>', {
        class: 'book_name',
        text: name
    });

    let book_author = $('<div>', {
        class: 'book_author',
        text: author
    });

    let book_rating = $('<div>', {
        class: 'book_rating'
    });

    let stars = $('<div>', {
        class: 'stars'
    });


    book_img.append(book_img_view);
    book.append(book_img);
    book.append(book_name);
    book.append(book_author);

    stars.append([
        $('<span>',{ "class": "star",}).append('&#9734;'),
        $('<span>',{ "class": "star" }).append('&#9734;'),
        $('<span>',{ "class": "star" }).append('&#9734;'),
        $('<span>',{ "class": "star" }).append('&#9734;'),
        $('<span>',{ "class": "star" }).append('&#9734;')
    ]);


    book_rating.append(stars);
    book.append(book_rating);
    return book;
}

function add_rating(rating) {
    let book_rating = [];
    if(rating = null || 0) {

    }
}