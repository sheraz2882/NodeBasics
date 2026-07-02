//file system module
const fs = require("fs");

//sync call
const files = fs.readdirSync("./");
console.log(files);

//async call
fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});

//os module
const os = require("os");

console.log("Total Memory", os.totalmem());
console.log("Free Memory", os.freemem());

//path module
const path = require("path");

console.log("FileName", path.parse(__filename));

//event module
const EventEmitter = require("events");
const emitter = new EventEmitter();

//Register a Event Listener
emitter.addListener("messageLogged", function (args) {
  console.log("Listener Called", args);
});

//Raise a Event
emitter.emit("messageLogged", { id: 1, url: "https://" });

//Listening to the Event Raised in Other Class
const Logger = require("./logger");
const { createServer } = require("http");
const logger = new Logger();

//Register event listener
logger.addListener("loggerMessage", (args) => {
  console.log("Listener called", args);
});

logger.log("logger log method");

//http module

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000");
