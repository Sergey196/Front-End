function find_book(name, author) {
    let book;
    books.forEach(function(element) {
        if(element.name == name && element.author == author) {
            book = element;
        }
    });
    return book;
}