function find_book(name, author) {
    let book;
    books.forEach(function(element) {
        if(element.name == name && element.author == author) {
            book = element;
        }
    });
    return book;
}

function all_books() {
    let all_books= [];
    books.forEach(function(element) {
        all_books.push(add_book(element.name, element.author, element.img_url, element.rating));
    });
    return all_books;
}

function all_favourite_books() {
    let all_books= [];
    books.forEach(function(element) {
        if(element.rating === 5) {
            all_books.push(add_book(element.name, element.author, element.img_url, element.rating));
        }
    });
    return all_books;
}

function searcher(val) {
    let all_books= [];
    books.forEach(function(element) {
        if(element.name.indexOf(val) !== -1) {
            all_books.push(add_book(element.name, element.author, element.img_url, element.rating));
        }
    });
    return all_books;
}