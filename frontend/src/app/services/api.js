angular
    .module('webChat')
    .factory('api', factory);

factory.$inject = ['$http'];

function factory($http) {
    let service = {
        getUsers,
        deleteUser
    };

    return service;

    function getUsers() {
        return $http.get("http://localhost:3000/chat/api/get_users");
    };

    function deleteUser(id) {
        return $http.delete("http://localhost:3000/chat/api/detele_user/"+id);
    };

};
