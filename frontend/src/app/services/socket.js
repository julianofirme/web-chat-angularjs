angular.module("webChat").factory("socket", factory);

factory.$inject = [];

function factory() {
  const socket = io.connect("http://127.0.0.1:3000", {
    withCredentials: true,
  });

  return {
    emit(event, data) {
      return socket.emit(event, data);
    },
  
    on(listenner, callback) {
      return socket.on(listenner, callback);
    }
  }
}
