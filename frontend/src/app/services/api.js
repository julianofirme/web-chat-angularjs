angular.module("webChat").factory("api", factory);

factory.$inject = ["$http"];

function factory($http) {
  return  {
    getSession() {
      return $http.get("/chat/api/session");
    },
  
    getUsers() {
      return $http.get("/chat/api/users");
    },
    
    postUser(data) {
      return $http.post("/chat/api/user", data);
    },
    
    deleteUser(id) {
      return $http.delete(`/chat/api/${id}`);
    },
    
    getMessages() {
      return $http.get("/chat/api/messages");
    },
    
    getRooms() {
      return $http.get("/chat/api/rooms");
    },
  }  
}
