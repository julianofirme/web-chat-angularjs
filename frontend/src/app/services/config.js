angular
    .module('webChat')
    .config(config); 

config.$inject = ['$routeProvider', '$httpProvider'];

function config($routeProvider, $httpProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/frontend/src/app/login/login.html"
        })
        .when("/chat", {
            templateUrl: "/frontend/src/app/chat/chat.html"
        });

    $httpProvider.defaults.withCredentials = true;
};



