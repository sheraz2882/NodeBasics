//file system module
const fs = require('fs');

//sync call
const files = fs.readdirSync("./");
console.log(files);

//async call
fs.readdir('./', function(err, files){

    if(err) console.log("Error", err);
    else console.log("Result", files);

});


//os module
const os = require('os');

console.log("Total Memory", os.totalmem());
console.log("Free Memory", os.freemem());

//path module
const path = require('path');

console.log("FileName", path.parse(__filename));


//event module
const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a Event Listener
emitter.addListener('messageLogged', function(args){

    console.log("Listener Called", args);
});

//Raise a Event
emitter.emit('messageLogged', {id: 1, url : "https://"});
