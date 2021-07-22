angular.module("webChat").controller("loginCtrl", loginController);

loginController.$inject = ["$scope", "api"];

function loginController($scope, api) {
  const rooms = [
    { roomName: "Geral", roomId: '1' },
    { roomName: "Movies", roomId: '2'},
    { roomName: "Games", roomId: '3'}
  ];
  
  $scope.rooms = rooms;

  $scope.userLogin = (username, room) => {
    const userData = {
      username: username,
      roomName: room.roomName,
      roomId: room.roomId
    };

    api.postUser(userData);
  };
}
