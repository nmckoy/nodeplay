var app = angular.module("node", []);

app.factory('socket', function(){
  var socket = io.connect();
  return socket;
});

app.controller("ChatController", function ($scope, $log, socket) {
  $scope.messages = [];
  $scope.roster = [];
  $scope.name = '';
  $scope.text = '';
  
  $log.info("messages " + $scope.messages);

  socket.on('connect', function () {
    $scope.setName();
  });

  socket.on('message', function (msg) {
    $scope.messages.push(msg);
    $scope.$apply();
  });

  socket.on('roster', function (names) {
    $scope.roster = names;
    $scope.$apply();
  });
  
  socket.on('removed', function(data) {
    $scope.messages = data;
    $scope.$apply();
  });

  $scope.send = function send() {
    $log.info('Sending message:', $scope.text);
    $log.info("messages" + $scope.messages);
    socket.emit('time', Date.now());
    socket.emit('message', $scope.text);
    //$scope.setTime(Date());
    $scope.text = '';
  };

  $scope.setName = function setName() {
    socket.emit('identify', $scope.name);
  };
  
  $scope.remove = function remove(index) {
    //$log.info("removing message with index " + index);
    //$scope.messages.splice(index, 1);
    socket.emit('remove', index);
  };
});