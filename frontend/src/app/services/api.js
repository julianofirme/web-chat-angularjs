angular.module("webChat").factory("api", factory);

factory.$inject = ["$http"];

function factory($http) {
  let service = {
    getUsers,
    deleteUser,
    postUser,
    getMessages,
    getSession
  };

  return service;

  function getSession() {
    return $http.get("/chat/api/get_session");
  }

  function getUsers() {
    return $http.get("/chat/api/get_users");
  }
  
  function postUser(data) {
    return $http.post("/chat/api/post_user", data);
  }
  
  function deleteUser(id) {
    return $http.delete(`/chat/api/delete_user/${id}`);
  }
  
  function getMessages() {
    return $http.get("/chat/api/get_messages");
  }
}
