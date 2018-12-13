function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.add_book = function (name, author, cover) {
    this.model.add_book(name, author, cover);
};

Controller.prototype.add_rating = function (count) {
    this.model.add_rating(count);
};

Controller.prototype.history = function () {
    this.model.history();
};

Controller.prototype.book_info = function (name, author) {
    this.model.book_info(name, author);
};

Controller.prototype.all_reading = function () {
    this.model.all_reading();
};

Controller.prototype.add_tag = function (tag) {
    this.model.add_tag(tag);
};

Controller.prototype.favourite_books = function () {
    this.model.favourite_books();
};

Controller.prototype.search = function (val) {
    this.model.search(val);
};

Controller.prototype.start = function () {
    this.view.init();
};