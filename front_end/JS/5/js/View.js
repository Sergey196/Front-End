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

    this.model.onAddTag.subscribe(function (newCounterValue) {
        that.addTag(newCounterValue);
    });

    $('.books_view').on('click','.book_img', function(){
        that.ctrl.book_info($(this).parent().children('.book_name').text(), $(this).parent().children('.book_author').text());
    });

    $(".add_book_button").click(function() {
        $('.bannerAddBookMenu').show();
    });

    $("#add").click(function() {
        $(".name").removeClass("visible").addClass('hidden');
        $(".author").removeClass("visible").addClass('hidden');
        $(".cover").removeClass("visible").addClass('hidden');
        if($('#name').val().length == 0) {
            $(".name").removeClass("hidden").addClass('visible');
        } else if($('#author').val().length == 0) {
            $(".author").removeClass("hidden").addClass('visible');
        } else if($('#cover').val().length == 0) {
            $(".cover").removeClass("hidden").addClass('visible');
        } else {
            that.ctrl.add_book($('#name').val(), $('#author').val(), $('#cover'));
        }
    });

    $("#close").click(function() {
        $('.bannerAddBookMenu').hide();
    });

    $('.bookEditor').on('click','.book_rating_star', function() {
        let count = $(this).nextAll().length + 1;
        that.ctrl.add_rating(count);
    });


    $(".add_tag").click(function() {
        that.ctrl.add_tag($('.tag').val());
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

    $(".closeBookEditor").click(function() {
        that.ctrl.all_reading();
    });
};

View.prototype.addBook = function (data) {
    $('.bannerAddBookMenu').hide();
    remove_children();

    data.forEach(function(element) {
        let book = $('body').children('.book').clone();
        book.removeAttr('style');
        book.find('.book_img_view').attr("src", element.img_url);
        book.find('.book_name').append(element.name);
        book.find('.book_author').append(element.author);
        book.find('.book_rating').append(rating_book(element.rating));
        $('.books_view').append(book);
    });
};

View.prototype.addEvent = function (data) {
    $('.actions_warnings').empty();
    //$('.actions_warnings').append(data);
    data.forEach(function(element) {
        if(element.type === 'add_book') {
            let event = $('body').children('.addBookWarning').clone();
            event.removeAttr('style');
            event.find('.warning_text a').first().append(element.name);
            event.find('.warning_text a').last().append(element.author);
            $('.actions_warnings').append(event);
        } else {
            let event = $('body').children('.addStarsWarning').clone();
            event.removeAttr('style');
            event.find('span').append(element.count);
            event.find('a').append(element.name);
            $('.actions_warnings').append(event);
        }
    });
};

View.prototype.allHistory = function (data) {
    remove_children();

    data.forEach((val, key, arr) => {
        if(val.type === 'add_book') {
            let history = $('body').children('.event').clone();
            history.removeAttr('style');
            history.append('Add book: ');
            history.append(val.name);
            history.append(' author: ');
            history.append(val.author);
            history.append('  ');
            history.append(val.data);
            $('.books_view').append(history);
        } else {
            let history = $('body').children('.event').clone();
            history.removeAttr('style');
            history.append('Add rating by: ');
            history.append(val.name);
            history.append(' rating: ');
            history.append(val.count);
            history.append('  ');
            history.append(val.data);
            $('.books_view').append(history);
        }
    });
};

View.prototype.bookInfo = function (data) {
    //remove_children();

    $(".bannerBookEditor").show();
    $('.book_info_name').text(data.name);
    $('.book_info_author').text(data.author);
    data.tags.forEach(function(element) {
        $('.tags').append(element + ' ');
    });
};

View.prototype.addTag = function(tag) {
    $('.tags').append(tag + ' ');
};

View.prototype.add_rating = function(stars) {
    $('.book_rating_stars').remove();
    $(stars).insertBefore('.closeBookEditor');
};

function remove_children() {
    $('.books_view').children('.book').remove();
    $('.books_view').children('.event').remove();
    $('.bannerBookEditor').hide();
};