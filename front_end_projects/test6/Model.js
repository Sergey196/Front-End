function Model() {
    console.log('Model init');
    this.currentValue = null;
    this.onIncrement = new EventEmitter();
    this.onDecrement = new EventEmitter();
}

Model.prototype.increment = function () {
    console.log('Model.increment');
    this.currentValue++;
    this.onIncrement.notify(this.currentValue);
};

Model.prototype.decrement = function () {
    console.log('Model.decrement');
    this.currentValue--;
    this.onDecrement.notify(this.currentValue);
};

Model.prototype.setInitialValue = function (initialValue) {
    console.log('Model.setInitialValue');
    this.currentValue = initialValue;
    this.onIncrement.notify(this.currentValue);
};