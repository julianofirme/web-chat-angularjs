angular.module("webChat").factory("socket", factory);

factory.$inject = [];

function factory() {
  let socket = io.connect("http://127.0.0.1:3000", {
    withCredentials: true,
  });

  function emit(event, data) {
    return socket.emit(event, data);
  }

  function on(listenner, callback) {
    return socket.on(listenner, callback);
  }

  var service = {
    emit,
    on,
  };

  return service;
}
