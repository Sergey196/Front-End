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
        that.getBookInfo(newCounterValue);
    });

    this.model.onAddRaiting.subscribe(function (newCounterValue) {
        that.addRating(newCounterValue);
    });

    this.model.onAddTag.subscribe(function (newCounterValue) {
        that.addTag(newCounterValue);
    });

    $('.all-books').on('click','.book__img-panel', function(){
        that.ctrl.getBookInfo($(this).parent().children('.book__name').text(), $(this).parent().children('.book-author').text());
    });

    $(".action__add-book__button").click(function() {
        $(".add_book-menu__incorrect-name").removeClass("visible").addClass('hidden');
        $(".add_book-menu__incorrect-author").removeClass("visible").addClass('hidden');
        $(".add_book-menu__incorrect-cover").removeClass("visible").addClass('hidden');
        $('.add_book-menu__banner').show();
    });

    $(".add__book-menu__add-book").click(function() {
        if($('.add_book-menu__new-book-name').val().length === 0) {
            $(".add_book-menu__incorrect-name").removeClass("hidden").addClass('visible');
        } else if($(".add_book-menu__new-book-author").val().length === 0) {
            $(".add_book-menu__incorrect-author").removeClass("hidden").addClass('visible');
        } else if($(".add_book-menu__new-book-cover").val().length === 0) {
            $(".add_book-menu__incorrect-cover").removeClass("hidden").addClass('visible');
        } else {
            that.ctrl.addBook($('.add_book-menu__new-book-name').val(), $('.add_book-menu__new-book-author').val(), $('.add_book-menu__new-book-cover'));
        }
    });

    $("#close").click(function() {
        $('.add_book-menu__banner').hide();
    });

    $('.book-editor').on('click','.book-editor__rating-star', function() {
        let count = $(this).nextAll().length + 1;
        that.ctrl.addRating(count);
    });


    $(".book-editor__add-tag").click(function() {
        if($('.tag').val().length != 0) {
            that.ctrl.addTag($('.tag').val());
            $(".tag").val('');
        }
    });

    $(".history-events").click(function() {
        that.ctrl.getHistoryEvents();
    });

    $(".actions__now-reading").click(function() {
        that.ctrl.getAllBooks();
    });

    $(".actions__favourite-books").click(function() {
        that.ctrl.getFavouriteBooks();
    });

    $(".books__search-books__search-Input").on('input', function() {
        that.ctrl.search($(".books__search-books__search-Input").val());
    });

    $(".book-editor-close").click(function() {
        that.ctrl.getAllBooks();
    });


    $(".must-read-titles").click(function() {
        that.ctrl.filterByTags('Must read titles');
    });

    $(".best-list").click(function() {
        that.ctrl.filterByTags('Best of list');
    });

    $(".classic-novels").click(function() {
        that.ctrl.filterByTags('Classic Novels');
    });

    $(".non-flction").click(function() {
        that.ctrl.filterByTags('Non Flction');
    });

    this.resetPage = function() {
        $('.all-books').addClass('books-view');
        $('.all-books').children('.book').remove();
        $('.all-books').children('.event').remove();
        $('.add_book-menu__banner').hide();
        $('.book-editor__banner').hide();
    };
};

View.prototype.addBook = function (data) {

    if(data != undefined) {
        this.resetPage();

        let creatingViewBookRating = function(rating) {

            let stars = $('<div>', {
                class: 'stars'
            });

            for (let i = 0; i < 5; i++) {
                if(rating == null || rating === 0) {
                    stars.append($('<span>',{ "class": "star"}).append('&#9734;'));

                } else if(rating !== 0) {
                    rating--;
                    stars.append($('<span>',{ "class": "star"}).append('&#9733;'));
                }
            }
            return stars;
        };

        data.forEach(function(element) {
            let book = $('body').children('.book-template').clone();
            book.removeClass('book-template');
            book.removeClass('none');
            book.addClass('book');
            book.find('.book__img-view').attr("src", element.img_url);
            book.find('.book__name').append(element.name);
            book.find('.book-author').append(element.author);
            book.find('.book-rating').append(creatingViewBookRating(element.rating));
            $('.all-books').append(book);
        });
    } else {
        $(".add_book-menu__incorrect-name").removeClass("hidden").addClass('visible');
    }
};

View.prototype.addEvent = function (data) {
    $('.actions__warnings').empty();
    //$('.actions_warnings').append(data);
    data.forEach(function(element) {
        if(element.type === 'add_book') {
            let event = $('body').children('.warning-add-book-template').clone();
            event.removeClass('warning-add-book-template');
            event.removeClass('none');
            event.addClass('actions__warnings__warning');
            event.find('.warning__text a').first().append(element.name);
            event.find('.warning__text a').last().append(element.author);
            $('.actions__warnings').append(event);
        } else if(element.type === 'add_rating') {
            let event = $('body').children('.warning-add-stars-template').clone();
            event.removeClass('warning-add-stars-template');
            event.removeClass('none');
            event.addClass('actions__warnings__warning');
            event.find('span').append(element.count);
            event.find('a').append(element.name);
            $('.actions__warnings').append(event);
        } else if(element.type === 'tags_found') {
            let event = $('body').children('.warning-actions-template').clone();
            event.removeClass('warning-actions-template');
            event.removeClass('none');
            event.addClass('actions__warnings__warning');
            event.find('.warning__text').append(element.text);
            $('.actions__warnings').append(event);
        } else if(element.type === 'search') {
            let event = $('body').children('.warning-actions-template').clone();
            event.removeClass('warning-actions-template');
            event.removeClass('none');
            event.addClass('actions__warnings__warning');
            event.find('.warning__text').append(element.text);
            $('.actions__warnings').append(event);
        }
    });
};

View.prototype.allHistory = function (data) {
    this.resetPage();
    $('.all-books').removeClass('books-view')

    data.forEach((val, key, arr) => {
        if(val.type === 'add_book') {
            let history = $('body').children('.event-template').clone();
            history.removeClass('event-template');
            history.removeClass('none');
            history.addClass('event');
            history.append('Add book: ');
            history.append(val.name);
            history.append(' author: ');
            history.append(val.author);
            history.append('  ');
            history.append(val.data);
            $('.all-books').append(history);
        } else if(val.type === 'add_rating') {
            let history = $('body').children('.event-template').clone();
            history.removeClass('event-template');
            history.removeClass('none');
            history.addClass('event');
            history.append('Add rating by: ');
            history.append(val.name);
            history.append(' rating: ');
            history.append(val.count);
            history.append('  ');
            history.append(val.data);
            $('.all-books').append(history);
        } else if(val.type === 'tags_found') {
            let history = $('body').children('.event-template').clone();
            history.removeClass('event-template');
            history.removeClass('none');
            history.addClass('event');
            history.append(val.text);
            history.append('  ');
            history.append(val.data);
            $('.all-books').append(history);
        } else if(val.type === 'search') {
            let history = $('body').children('.event-template').clone();
            history.removeClass('event-template');
            history.removeClass('none');
            history.addClass('event');
            history.append(val.text);
            history.append('  ');
            history.append(val.data);
            $('.all-books').append(history);
        }
    });
};

View.prototype.getBookInfo = function (data) {
    $(".book-editor__banner").show();
    $(".tag").val('');
    $(".book-editor__tags").empty();
    $('.book-editor__name').text(data.name);
    $('.book-editor__author').text(data.author);
    data.tags.forEach(function(element) {
        $('.book-editor__tags').append(element + ' ');
    });
};

View.prototype.addTag = function(tag) {
    $('.book-editor__tags').append(tag + ' ');
};

View.prototype.addRating = function(stars) {
    $('.book-editor__rating-stars').remove();

    let creatingViewRatingBookEditor = function(rating) {

        let stars = $('<div>', {
            class: 'book-editor__element book-editor__rating-stars'
        });

        for (let i = 0; i < 5; i++) {
            if(rating == null || rating === 0) {
                stars.prepend($('<span>',{ "class": "book-editor__rating-star book-editor__rating-star-inactive"}).append('&#9733;'));
            } else if(rating !== 0) {
                rating--;
                stars.prepend($('<span>',{ "class": "book-editor__rating-star book-editor__rating-star-active"}).append('&#9733;'));
            }
        }
        return stars;
    }

    $(creatingViewRatingBookEditor(stars)).insertBefore('.book-editor-close');
};


