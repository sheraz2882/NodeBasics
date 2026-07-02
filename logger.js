const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log("logger log function", message);

    //Raise a Event
    this.emit("loggerMessage", { id: 1, message: "Extending EventEmitter" });
  }
}

module.exports = Logger;
