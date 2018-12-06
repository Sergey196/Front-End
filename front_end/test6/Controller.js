function Controller() {
    console.log('Controller init');
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.increase = function () {
    console.log('Controller.increase');
    this.model.increment();
};

Controller.prototype.decrease = function () {
    console.log('Controller.decrease');
    this.model.decrement();
};

Controller.prototype.start = function () {
    console.log('Controller.start');
    this.view.init();
    this.model.setInitialValue(0);
};