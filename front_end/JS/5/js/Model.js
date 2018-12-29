function Model() {
    this.books = [];
    this.history = [];
    this.book = {};
    this.onAllBooks = new EventEmitter();
    this.onAddEvent = new EventEmitter();
    this.onHistory = new EventEmitter();
    this.onBook = new EventEmitter();
    this.onAddRaiting = new EventEmitter();
    this.onAddTag = new EventEmitter();
}

Model.prototype.addBook = function(name, author, cover) {
    let book = this.books.find(item => (item.name == name && item.author == author));
    if (book === undefined) {
        let reader = new FileReader();
        let onAddBook= this.onAllBooks;
        let onAddEvent = this.onAddEvent;
        let books = this.books;
        let history = this.history;


        reader.onloadend = function () {
            let book = {
                name: name,
                author: author,
                img_url: reader.result,
                tags: [],
                rating: null
            };

            books.push(book);
            onAddBook.notify(books);

            let event = {
                type: 'add_book',
                data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                name: book.name,
                author: book.author
            };
            history.push(event);
            onAddEvent.notify(history.slice(-5));
        };
        reader.readAsDataURL(cover[0].files[0]);
    } else {
        this.onAllBooks.notify(undefined);
    }
};

Model.prototype.addRating = function(count) {
    this.book.rating = count;
    let event = {
        type: 'add_rating',
        data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        name: this.book.name,
        count: count
    };
    this.history.push(event);
    this.onAddEvent.notify(this.history.slice(-5));
    this.onAddRaiting.notify(count);
};

Model.prototype.getAllBooks = function() {
    this.onAllBooks.notify(this.books);
};

Model.prototype.getHistoryEvents = function() {
    this.onHistory.notify(this.history);
};

Model.prototype.getBookInfo = function(name, author) {
    this.book = this.books.find(item => (item.name == name && item.author == author));
    this.onBook.notify(this.book);
    this.onAddRaiting.notify(0);
};

Model.prototype.addTag = function(tag) {
    this.book.tags.push(tag);
    this.onAddTag.notify(tag);
};

Model.prototype.getFavouriteBooks = function(tag) {
    let books = [];
    this.books.forEach(function(element) {
        if(element.rating === 5) {
            books.push(element);
        }
    });
    this.onAllBooks.notify(books);
};

Model.prototype.search = function(val) {

    let searchBooksByValue = function(val, books) {
        let all_books= [];
        books.forEach(function(element) {
            if(val.length === 0) {
                all_books.push(element);
            } else if(element.name.indexOf(val) !== -1) {
                all_books.push(element);
            }
        });
        return all_books;
    };

    if(val.length !== 0) {
        let books = searchBooksByValue(val, this.books);
        let event = {
            type: 'search',
            data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
            text: 'found books by search: ' + books.length,
        };
        this.history.push(event);
        this.onAddEvent.notify(this.history.slice(-5));
        this.onAllBooks.notify(books);
    }
};

Model.prototype.filterByTags = function(tag) {
    let books = [];
    this.books.forEach(function(element) {
        element.tags.forEach(function(tagItem) {
            if(tagItem == tag) {
                books.push(element);
            }
        });
    });
    let event = {
        type: 'tags_found',
        data: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        text: 'found books by tag : ' + books.length,
    };
    this.history.push(event);
    this.onAddEvent.notify(this.history.slice(-5));
    this.onAllBooks.notify(books);
};




