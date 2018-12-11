let books;
let history;

let book;

function Model() {
    books = [];
    history = [];
    this.onAllBooks = new EventEmitter();
    this.onAddEvent = new EventEmitter();
    this.onHistory = new EventEmitter();
    this.onBook = new EventEmitter();
}

Model.prototype.add_book = function(name, author, cover, add_button) {
    if (name.length !==0 && author.length !==0 && cover.val().length !==0) {
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

Model.prototype.add_rating = function(name, author, count) {
    this.book = find_book(name, author);
    this.book.rating = count;

    let event = {
        data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        text: add_book_rating(name, count)
    };
    history.push(event);
    this.onAddEvent.notify(event.text.append(event.data));
};

Model.prototype.all_reading = function() {
    this.onAllBooks.notify(all_books());
};

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
    this.book = find_book(name, author);
    this.onBook.notify(this.book);
};

Model.prototype.add_tag = function(tag) {
    this.book.tags.push(tag);
    this.onBook.notify(this.book);
};

Model.prototype.favourite_books = function(tag) {
    this.onAllBooks.notify(all_favourite_books());
};

Model.prototype.search = function(val) {
    if(val.length !== 0) {
        this.onAllBooks.notify(searcher(val));
    }
};



