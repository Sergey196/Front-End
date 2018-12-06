let books = [];

$('.books_view').on('click','.book', function(){
    alert('jkkhkhj');
});

$('.books_view').on('click','.star', function(){
    $(this).html('&#9733;');
    $(this).addClass("stars_test");
    $(this).nextAll().html('&#9733;');
    $(this).nextAll().addClass("stars_test");
});

$("#add").click(function() {
    if (!$('#name').val() || !$('#author').val() || !$('#cover').val()) {
        alert('Enter the correct data');
    } else {
        let reader  = new FileReader();
        let cover_url;

        reader.onloadend = function () {
            cover_url = reader.result;
            $('.books_view').append(add_book($("#name").val(), $("#author").val(), cover_url));
        }

        reader.readAsDataURL($('#cover')[0].files[0]);
        $(this).attr('rel', 'modal:close');
    }
});

function add_book(name, author, cover_url) {

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

//if ($('#name,#author,#cover').val() == '') {
