function Calculator() {
    let array = [];
    let result = 0;

    this.add = function(data) {
        result = data;
        function func(b) {
            result += b;
            return func;
        }
        return func;
    }

    this.subtract = function(data) {
        result = data;
        function func(b) {
            result -= b;
            return func;
        }
        return func;
    }

    this.divide = function(data) {
        result = data;
        function func(b) {
            result /= b;
            return func;
        }
        return func;
    }

    this.multiply = function(data) {
        result = data;
        function func(b) {
            result *= b;
            return func;
        }
        return func;
    }

    this.getResult = function() {
        array.push(result);
        return result;
    }

    this.reset = function() {
        result = 0;
    }
}

let calculator = new Calculator();
calculator.add(4)(5);
console.log(calculator.getResult());