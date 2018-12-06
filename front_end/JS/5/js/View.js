function View(model, controller) {
    this.model = model;
    this.ctrl = controller;

    this.counterElement = document.getElementById('counter');
    this.incrementElement = document.getElementById('increment');
    this.decrementElement = document.getElementById('decrement');
}

View.prototype.init = function () {
    var that = this;

    this.model.onAddBook.subscribe(function (newCounterValue) {
        that.changeElement(newCounterValue);
    });

    $('.books_view').on('click','.book', function(){

    });

    $("#add").click(function() {
        that.ctrl.add_book();
    });

    $('.books_view').on('click','.star', function(){

    });

}

View.prototype.changeElement = function (newValue) {
    //alert('vgfg ' + newValue);
    //this.counterElement.innerHTML = newValue;
    $('.books_view').append(newValue);
}