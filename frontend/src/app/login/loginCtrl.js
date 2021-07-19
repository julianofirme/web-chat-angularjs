angular.module("webChat").controller("loginCtrl", loginController);

loginController.$inject = ["$scope", "api"];

function loginController($scope, api) {
  $scope.rooms = [
    { roomName: "Geral", roomId: '1' },
    { roomName: "Movies", roomId: '2'},
    { roomName: "Games", roomId: '3'}
  ];

  $scope.userLogin = (username, room) => {
    const userData = {
      username: username,
      roomName: room.roomName,
      roomId: room.roomId
    };

    api.postUser(userData);
  };
}
