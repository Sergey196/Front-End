function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.add_book = function (name, author, cover, add_button) {
    this.model.add_book(name, author, cover, add_button);
};

Controller.prototype.add_rating = function (star) {
    this.model.add_rating(star);
};

Controller.prototype.history = function () {
    this.model.history();
};

Controller.prototype.book_info = function (name, author) {
    this.model.book_info(name, author);
};

Controller.prototype.all_reading = function (panel) {
    this.model.all_reading(panel);
};

Controller.prototype.add_tag = function (tag) {
    this.model.add_tag(tag);
};

Controller.prototype.start = function () {
    this.view.init();
};