//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      console.log('user disconnected');
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');
      //console.log("socket on message");

      if (!text)
        return;
        
      // running asynchronous get operations in parallel
      // binding to hash and broadcasting with callback
      async.parallel({
        name: socket.get.bind(this, 'name'),
        time: socket.get.bind(this, 'time')
      },
        function(err, result) {
          var data = {
            name: result.name,
            text: text,
            time: result.time
          };
          console.log("time in async is" + data.time);
          
          broadcast('message', data);
          messages.push(data);
        }
      );

      // socket.get('name', function (err, name) {
      //   var data = {
      //     name: name,
      //     text: text
      //   };

      //   broadcast('message', data);
      //   messages.push(data);
      // });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
    
    socket.on('time', function(time) {
      socket.set('time', Number(time), function(err) {
        console.log("time now in ms: " + Number(time));
        if (err)
          console.error(err);
      });
      //console.log("time is logged");
    });
    
    socket.on('remove', function(index) {
      //console.log("messages before remove: " + messages);
      messages.splice(index, 1);
      broadcast('removed', messages);
      //messages = data;
      //console.log("in remove: index is at " + index);
      //console.log("messages after remove: " + messages);
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
  console.log("address for c9 at: https://nodeexample-nmckoy.c9.io/");
});
