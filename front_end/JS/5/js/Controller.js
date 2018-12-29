function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.addBook = function (name, author, cover) {
    this.model.addBook(name, author, cover);
};

Controller.prototype.addRating = function (count) {
    this.model.addRating(count);
};

Controller.prototype.getHistoryEvents = function () {
    this.model.getHistoryEvents();
};

Controller.prototype.getBookInfo = function (name, author) {
    this.model.getBookInfo(name, author);
};

Controller.prototype.getAllBooks = function () {
    this.model.getAllBooks();
};

Controller.prototype.addTag = function (tag) {
    this.model.addTag(tag);
};

Controller.prototype.getFavouriteBooks = function () {
    this.model.getFavouriteBooks();
};

Controller.prototype.search = function (val) {
    this.model.search(val);
};

Controller.prototype.filterByTags = function (tag) {
    this.model.filterByTags(tag);
};

Controller.prototype.start = function () {
    this.view.init();
};
