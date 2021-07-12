angular
    .module('webChat')
    .config(config); 

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/frontend/src/app/login/login.html"
        })
        .when("/chat", {
            templateUrl: "/frontend/src/app/chat/chat.html"
        });
};



