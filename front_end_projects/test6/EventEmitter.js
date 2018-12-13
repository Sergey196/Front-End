function EventEmitter() {
    console.log('EventEmitter init');
    this.listeners = [];
}

EventEmitter.prototype.subscribe = function (handler) {
    console.log('EventEmitter.subscribe ');
    this.listeners.push(handler);
};

EventEmitter.prototype.notify = function (data) {
    console.log('EventEmitter.notify ');
    for (let i = 0; i < this.listeners.length; i++) {
        this.listeners[i](data);
    }
};