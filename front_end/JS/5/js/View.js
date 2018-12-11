function View(model, controller) {
    this.model = model;
    this.ctrl = controller;
}

View.prototype.init = function () {
    let that = this;

    this.model.onAllBooks.subscribe(function (newCounterValue) {
        that.addBook(newCounterValue);
    });

    this.model.onAddEvent.subscribe(function (newCounterValue) {
        that.addEvent(newCounterValue);
    });

    this.model.onHistory.subscribe(function (newCounterValue) {
        that.allHistory(newCounterValue);
    });

    this.model.onBook.subscribe(function (newCounterValue) {
        that.bookInfo(newCounterValue);
    });

    $('.books_view').on('click','.book_img', function(){
        that.ctrl.book_info($(this).parent().children('.book_name').text(), $(this).parent().children('.book_author').text());
    });

    $("#add").click(function() {
        that.ctrl.add_book($('#name').val(), $('#author').val(), $('#cover'), $('#add'));
    });

    $('.books_view').on('click','.star', function() {
        add_rating($(this));
        let count = $(this).nextAll().length + 1;
        that.ctrl.add_rating($(this).closest('.book').children('.book_name').text(), $(this).closest('.book').children('.book_author').text(), count);
    });

    $('.books_view').on('click','#add_tag', function() {
        that.ctrl.add_tag($('#tag').val());
    });

    $("#history").click(function() {
        that.ctrl.history();
    });

    $("#now_reading").click(function() {
        that.ctrl.all_reading();
    });

    $("#favourite_books").click(function() {
        that.ctrl.favourite_books();
    });

    $(".search_searcher").keypress(function() {
        that.ctrl.search($(".search_searcher").val());
    });
};

View.prototype.addBook = function (data) {
    remove_children();
    $('.books_view').append(data);
    $("#add").removeAttr('rel');
    remove_last_event();
};

View.prototype.addEvent = function (data) {
    $('.actions_warnings').append(data);
    remove_last_event();
};

View.prototype.allHistory = function (data) {
    remove_children();
    $('.books_view').append(data);
};

View.prototype.bookInfo = function (data) {
    remove_children();

    $('#book_info').show($('#tag').text());
    $('#book_info_name').text(data.name);
    $('#book_info_author').text(data.author);
    $('#tags').text('');
    data.tags.forEach(function(element) {
        $('#tags').append(element + ' ');
    });
};

function remove_last_event() {
    if($('.actions_warnings').children().length > 3) {
        $('.warning:first-child').last().remove();
    }
};

function remove_children() {
    $('.books_view').children('.book').remove();
    $('.books_view').children('.event').remove();
    $('.books_view').children('#book_info').hide();
};

function add_rating(star) {
    /*star.html('&#9734;');
    star.addClass(".star");
    star.nextAll().html('&#9734;');
    star.nextAll().addClass(".star");
    star.prevAll().html('&#9734;');
    star.prevAll().addClass(".star");

    star.html('&#9733;');
    star.addClass("star_active");
    star.nextAll().html('&#9733;');
    star.nextAll().addClass("star_active");*/

    star.html('&#9734;');
    star.addClass(".star");
    star.nextAll().html('&#9734;');
    star.nextAll().addClass(".star");
    star.prevAll().html('&#9734;');
    star.prevAll().addClass(".star");

    star.html('&#9733;');
    star.nextAll().html('&#9733;');
}