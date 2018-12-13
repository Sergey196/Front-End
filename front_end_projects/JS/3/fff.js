function getInitialState(callback) {
    setTimeout(function () {
        callback();
    },500);
}

Calculator.getInitialState(function()
    {
        Console.log(Calculator.getResult())
    })


this.add_test = function(data) {
    result = data;
    let f;
    setTimeout(function () {
        function func(b) {
            result += b;
            f = func;
        }
    },500);
    return f;
}