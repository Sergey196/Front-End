function rating_book(rating) {

    let stars = $('<div>', {
        class: 'stars'
    });

    for (let i = 0; i < 5; i++) {
        if(rating == null || rating === 0) {
            stars.prepend($('<span>',{ "class": "star"}).append('&#9734;'));

        } else if(rating !== 0) {
            rating--;
            stars.prepend($('<span>',{ "class": "star"}).append('&#9733;'));
        }
    }
    return stars;
}

function add_rating_book(rating) {

    let stars = $('<div>', {
        class: 'book_info_att book_rating_stars'
    });

    for (let i = 0; i < 5; i++) {
        if(rating == null || rating === 0) {
            stars.prepend($('<span>',{ "class": "book_rating_star book_rating_star_inactive"}).append('&#9733;'));
        } else if(rating !== 0) {
            rating--;
            stars.prepend($('<span>',{ "class": "book_rating_star book_rating_star_active"}).append('&#9733;'));
        }
    }
    return stars;
}