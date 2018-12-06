function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.add_book = function () {
    this.model.add_book();
};

Controller.prototype.start = function () {
    this.view.init();
};