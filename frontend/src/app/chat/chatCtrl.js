angular
    .module('webChat')
    .controller('chatCtrl', chatController);
    
chatController.$inject = ['$scope', 'api', 'socket', '$timeout'];

function chatController($scope, api, socket, $timeout) {
    $scope.usersOnline = [];
    $scope.messages = [];
    
    
    (function renderUsers() {
        api.getUsers().then((res) => {
            $scope.usersOnline = res.data;
        });
        
        $timeout(renderUsers, 1000);
    })();
    
    
    
    $scope.userLogout = () => {
        const userLogout = $scope.usersOnline.map(user => user.id).join('');
        api.deleteUser(userLogout);
    }
    
    $scope.onSendMessage = (msg) => {
        socket.io.emit('getMessage', msg);
        delete $scope.messageInput;
    };
    
    socket.io.on("sendedMessage", msgData => {
        renderMessages(msgData);
    });
    
    function renderMessages(msgData) {
        $scope.messages.push(msgData);
        $scope.$apply();
    };
};
