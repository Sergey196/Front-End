function Model() {
    this.books = [];
    this.onAddBook = new EventEmitter();
}

Model.prototype.add_book = function () {
    if ($('#name').val() || $('#author').val() || $('#cover').val()) {
        $('#add').attr('rel', 'modal:close');
        let reader = new FileReader();
        let books = this.books;
        let eventEmitter = this.onAddBook;


        reader.onloadend = function () {
            let book = {
                name: $("#name").val(),
                author: $("#author").val(),
                img_url: reader.result,
                rating: null
            };

            eventEmitter.notify(add_book(book.name, book.author, book.img_url, null));
            books.push(book);
        };

        reader.readAsDataURL($('#cover')[0].files[0]);
    } else {
        alert('Enter the correct data');
    }
};


