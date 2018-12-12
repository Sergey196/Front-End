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

    this.model.onAddRaiting.subscribe(function (newCounterValue) {
        that.add_rating(newCounterValue);
    });

    $('.books_view').on('click','.book_img', function(){
        that.ctrl.book_info($(this).parent().children('.book_name').text(), $(this).parent().children('.book_author').text());
    });

    $(".add_book_button").click(function() {
        $('.b-popup').show();
    });

    $("#add").click(function() {
        that.ctrl.add_book($('#name').val(), $('#author').val(), $('#cover'));
    });

    $("#close").click(function() {
        $('.b-popup').hide();
    });

    $('.books_view').on('click','.book_rating_star', function() {
        let count = $(this).nextAll().length + 1;
        that.ctrl.add_rating(count);
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

    $(".search_searcher").on('input', function() {
        that.ctrl.search($(".search_searcher").val());
    });
};

View.prototype.addBook = function (data) {
    $('.b-popup').hide();
    remove_children();
    $('.books_view').append(data);
};

View.prototype.addEvent = function (data) {
    $('.actions_warnings').empty();
    $('.actions_warnings').append(data);
};

View.prototype.allHistory = function (data) {
    remove_children();
    $('.books_view').append(data);
};

View.prototype.bookInfo = function (data) {
    remove_children();

    $('#book_info').show();
    $('#tags').text('');
    $('#book_info_name').text(data.name);
    $('#book_info_author').text(data.author);
    data.tags.forEach(function(element) {
        $('#tags').append(element + ' ');
    });
};

View.prototype.add_rating = function(stars) {
    $('.book_rating_stars').remove();
    $('.book_info').append(stars);
};

function remove_children() {
    $('.books_view').children('.book').remove();
    $('.books_view').children('.event').remove();
    $('.books_view').children('#book_info').hide();
};