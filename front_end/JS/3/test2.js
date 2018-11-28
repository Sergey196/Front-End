function Calculator() {
    this.func1 = function() {
        return this;
    }
    this.func2 = function() {
        return this;
    }
    this.func3 = function() {
        return this;
    }
}

let calculator = new Calculator();
calculator.func1().func3().func2();