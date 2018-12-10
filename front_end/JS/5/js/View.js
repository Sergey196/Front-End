function View(model, controller) {
    this.model = model;
    this.ctrl = controller;
}

View.prototype.init = function () {
    var that = this;

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

    $('.books_view').on('click','.book', function(){
        that.ctrl.book_info($(this).children('.book_name').text(), $(this).children('.book_author').text());
    });

    $("#add").click(function() {
        that.ctrl.add_book($('#name').val(), $('#author').val(), $('#cover'), $('#add'));
    });

    $('.books_view').on('click','.star', function() {
        that.ctrl.add_rating($(this));
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
    //let book_info = $('.books_view').children('#book_info');
    //book_info.removeClass();
    //book_info.addClass('.book_info_hidden')
};

View.prototype.addBook = function (data) {
    remove_children();
    $('.books_view').append(data);
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
    $('#book_info').show();
    $('#book_info_name').append(data.name);
    data.tags.forEach(function(element) {
        $('#tags').append(data + ' ');
    });
};