angular.module("webChat").controller("loginCtrl", loginController);

loginController.$inject = ["$scope", "api"];

function loginController($scope, api) {
  $scope.rooms = [
    { roomName: "Geral" },
    { roomName: "Movies" },
    { roomName: "Games" },
  ];

  $scope.userLogin = (username, room) => {
    const userData = {
      username: $scope.user.username,
      room: $scope.user.room.roomName,
    };

    api.postUser(userData);

    console.log(`user: ${username}\nroom: ${room.roomName}`);
  };
}
