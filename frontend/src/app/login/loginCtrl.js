angular
    .module('webChat')
    .controller('loginCtrl', loginController);

loginController.$inject = ['$scope', 'socket'];

function loginController($scope, socket) {

    $scope.userLogin = (username) => {
        socket.io.emit("userLogged", username);
    };
};

