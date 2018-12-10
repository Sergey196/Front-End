let books;
let history;

function Model() {
    books = [];
    history = [];
    this.onAllBooks = new EventEmitter();
    this.onAddEvent = new EventEmitter();
    this.onHistory = new EventEmitter();
    this.onBook = new EventEmitter();
}

Model.prototype.add_book = function(name, author, cover, add_button) {
    //panel.children().remove();
    //panel.append(all_books());
    if (name || author || cover) {
        add_button.attr('rel', 'modal:close');
        let reader = new FileReader();
        let onAddBook= this.onAllBooks;
        let onAddEvent = this.onAddEvent;


        reader.onloadend = function () {
            let book = {
                name: name,
                author: author,
                img_url: reader.result,
                tags: [],
                rating: null
            };

            //onAddBook.notify(add_book(book.name, book.author, book.img_url));
            books.push(book);
            onAddBook.notify(all_books());

            let event = {
                data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                text: add_book_warning(book.name, book.author)
            };
            history.push(event);
            onAddEvent.notify(event.text.append(event.data));
        };
        reader.readAsDataURL(cover[0].files[0]);
    } else {
        alert('Enter the correct data');
    }
};

Model.prototype.add_rating = function(star) {
    star.html('&#9734;');
    star.addClass(".star");
    star.nextAll().html('&#9734;');
    star.nextAll().addClass(".star");
    star.prevAll().html('&#9734;');
    star.prevAll().addClass(".star");

    star.html('&#9733;');
    star.addClass(".star_active");
    star.nextAll().html('&#9733;');
    star.nextAll().addClass(".star_active");

    let event = {
        data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        text: add_book_rating(star)
    };
    history.push(event);
    this.onAddEvent.notify(event.text.append(event.data));
};

Model.prototype.all_reading = function(panel) {
    this.onAllBooks.notify(all_books());
};

function all_books() {
    let all_books= [];
    books.forEach(function(element) {
        all_books.push(add_book(element.name, element.author, element.img_url));
    });
    return all_books;
}

Model.prototype.history = function() {
    let all_history = [];
    history.forEach(function(element) {
        let warning = $('<div>', {
            class: 'event',
            text: element.text.text() + '  ' + element.data
        });
        all_history.push(warning);
    });
    this.onHistory.notify(all_history);
};

Model.prototype.book_info = function(name, author) {
    this.onBook.notify(find_book(name, author));
};

Model.prototype.add_tag = function(tag) {
    alert(tag)
};



