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
    this.onAddRaiting = new EventEmitter();
}

Model.prototype.add_book = function(name, author, cover) {
    let book = find_book(name, author);
    if (book == undefined) {
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

            books.push(book);
            onAddBook.notify(all_books());

            let event = {
                type: 'add_book',
                data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                name: book.name,
                author: book.author
            };
            history.push(event);

            onAddEvent.notify(last_warnings());
        };
        reader.readAsDataURL(cover[0].files[0]);
    } else {
        alert('This book already exists');
    }
};

Model.prototype.add_rating = function(count) {
    this.book.rating = count;
    let event = {
        type: 'add_rating',
        data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        name: this.book.name,
        count: count
    };
    history.push(event);
    this.onAddEvent.notify(last_warnings());
    this.onAddRaiting.notify(add_rating_book(count));
};

Model.prototype.all_reading = function() {
    this.onAllBooks.notify(all_books());
};

Model.prototype.history = function() {
    this.onHistory.notify(all_warnings());
};

Model.prototype.book_info = function(name, author) {
    this.book = find_book(name, author);
    this.onBook.notify(this.book);
    this.onAddRaiting.notify(add_rating_book(0));
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



