angular.module("webChat").controller("chatCtrl", chatController);

chatController.$inject = ["$scope", "api", "socket"];

function chatController($scope, api, socket) {
  $scope.messages = [];

  active();
  function active() {
    api.getSession().then((res) => {
      socket.emit("userJoinChat", res.data);
    });

    api.getRooms().then((res) => {
      $scope.rooms = res.data;
    });
  }

  $scope.onSendMessage = (msg) => {
    if ($scope.messageInput) socket.emit("getMessage", msg);
    delete $scope.messageInput;
  };

  function renderMessages(msgData) {
    $scope.messages.push(msgData);
    $scope.$apply();
  }

  socket.on("sendedMessage", (msgData) => {
    renderMessages(msgData);
    console.log($scope.rooms);
  });

  socket.on("userLoggedin", (userData) => {
    $scope.$apply(function () {
      $scope.rooms.map((room) => {
        const userIndex = room.users.findIndex(
          (user) => user.id === userData.id
        );

        if (room.roomId === userData.roomId && userIndex < 0) {
          room.users.push(userData);
        }
      });
    });
  });

  socket.on("userLogoutID", (userLogout) => {
    api.deleteUser(userLogout.id);
    
    $scope.$apply(function () {
      $scope.rooms.map((room) => {
        const userIndex = room.users.findIndex(
          (user) => user.id === userLogout.id
        );

        room.users.splice(userIndex, 1);
      });
    });
  });

  $scope.userLogout = () => {
    socket.emit("logout");
  };
}
