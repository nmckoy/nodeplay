var http = require('http');
var express = require('express');
var path = require('path');
var bodyParse = require('body-parser');

var app = express();
var server = http.createServer(app);

// configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware

//You have to explicitly set extended for bodyParser.urlencoded() since 
//the default value is going to change in the next major version of body-parser
app.use(bodyParse.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'bower_components')));

//define routes

// api is a mount point. will be included in front of all
// route paaths
//app.use('/api/, require('todos'));

app.use(require('./todos'));

//da servah

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type' : 'text/plain'});
//     res.end('Hello World');
// }).listen(8080, '0.0.0.0', function(){
//     //var address = http.address();
//     //console.log('server running at ' + address.address + ':' + address.port);
// });