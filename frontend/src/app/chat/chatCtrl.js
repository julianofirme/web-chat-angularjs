angular
  .module('webChat')
  .controller('chatCtrl', chatController);

chatController.$inject = ['$scope', 'api', 'socket'];

function chatController($scope, api, socket) {
  $scope.usersOnline = [];
  $scope.messages = [];

  active();
  function active() {
    api.getUsers().then((res) => {
      $scope.usersOnline = res.data;
    });

    api.getSession().then((res) => {
      socket.emit('userLogin', res.data);
      $scope.roomName = res.data.roomName;
    });
  }

  socket.on('userLoggedin', (userData) => {
    $scope.$apply(function () {
      const userIndex = $scope.usersOnline.findIndex(
        (user) => user.id === userData.id
      );

      if (userIndex < 0) {
        $scope.usersOnline.push(userData);
      }
    });
  });

  $scope.userLogout = () => {
    socket.emit('logout');
  };

  socket.on('userLogoutID', (userLogout) => {
    api.deleteUser(userLogout.id);

    $scope.$apply(function () {
      const userLeftIndex = $scope.usersOnline.findIndex(
        (user) => user.id === userLogout.id
      );
      $scope.usersOnline.splice(userLeftIndex, 1);
    });
  })

  $scope.onSendMessage = (msg) => {
    if ($scope.messageInput) socket.emit('getMessage', msg);
    delete $scope.messageInput;
  };

  socket.on('sendedMessage', (msgData) => {
    renderMessages(msgData);
    console.log($scope.usersOnline);
  });

  function renderMessages(msgData) {
    $scope.messages.push(msgData);
    $scope.$apply();
  }
}
