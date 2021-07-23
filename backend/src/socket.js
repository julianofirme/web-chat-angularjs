const formatMessage = require("./utils/formatMessage");
const messages = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("userJoinChat", (user) => {
      io.emit("userLoggedin", user);
      socket.join(user.roomId);

      socket.on("getMessage", (msg) => {
        const messageData = formatMessage(user.username, user.roomId, msg);
        messages.push(messageData);
        io.to(user.roomId).emit("sendedMessage", messageData);
      });

      socket.on("logout", () => {
        io.emit("userLogoutID", user);
      });
    });
  });
};
