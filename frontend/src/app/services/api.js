angular.module("webChat").factory("api", factory);

factory.$inject = ["$http"];

function factory($http) {
  let service = {
    getUsers,
    deleteUser,
    postUser,
  };

  return service;

  function getUsers() {
    return $http.get("http://localhost:3000/chat/api/get_users");
  }

  function postUser(data) {
    return $http.post("http://localhost:3000/chat/api/post_user", data);
  }

  function deleteUser(id) {
    return $http.delete(`http://localhost:3000/chat/api/delete_user/${id}`);
  }
}
