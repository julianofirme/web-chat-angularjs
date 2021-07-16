angular.module("webChat").controller("chatCtrl", chatController);

chatController.$inject = ["$scope", "api", "socket"];

function chatController($scope, api, socket) {
  $scope.usersOnline = [];
  $scope.messages = [];

  active();
  function active() {
    api.getUsers().then((res) => {
      $scope.usersOnline = res.data;
    });
  }

  socket.on("userLoggedin", (userData) => {
    $scope.$apply(function () {
      const userIndex = $scope.usersOnline.findIndex(
        (user) => user.id === userData.id
      );
		
			if(userIndex < 0) {
				$scope.usersOnline.push(userData);
			}	
    });

    console.log($scope.usersOnline);
  });

  $scope.userLogout = () => {
    socket.on("userLogoutID", (userLogoutID) => {
      api.deleteUser(userLogoutID);
    });

    socket.emit("logout");
  };

  $scope.onSendMessage = (msg) => {
    socket.emit("getMessage", msg);
    delete $scope.messageInput;
    console.log(socket);
  };

  socket.on("sendedMessage", (msgData) => {
    renderMessages(msgData);
  });

  function renderMessages(msgData) {
    $scope.messages.push(msgData);
    $scope.$apply();
  }
}
