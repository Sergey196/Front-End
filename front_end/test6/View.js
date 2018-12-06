function View(model, controller) {
    console.log('View init');
    this.model = model;
    this.ctrl = controller;

    this.counterElement = document.getElementById('counter');
    this.incrementElement = document.getElementById('increment');
    this.decrementElement = document.getElementById('decrement');
}

View.prototype.init = function () {
    console.log('View init init');
    let that = this;

    this.model.onIncrement.subscribe(function (newCounterValue) {
        console.log('View.onIncrement.subscribe ' + newCounterValue);
        that.changeElement(newCounterValue);
        alert('subscribe')
    });

    this.model.onDecrement.subscribe(function (newCounterValue) {
        console.log('View.onDecrement.subscribe ' + newCounterValue);
        that.changeElement(newCounterValue);
    });

    this.incrementElement.addEventListener('click', function () {
        console.log('View.incrementElement.addEventListener click');
        that.ctrl.increase();
    });

    this.decrementElement.addEventListener('click', function () {
        console.log('View.decrementElement.addEventListener click');
        that.ctrl.decrease();
    });
};

View.prototype.changeElement = function (newValue) {
    console.log('changeElement');
    this.counterElement.innerHTML = newValue;
};