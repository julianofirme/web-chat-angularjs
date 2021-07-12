angular
    .module("webChat")
    .value("socket", {
    io: io.connect('http://127.0.0.1:3000', {
        withCredentials: true
    })
});

