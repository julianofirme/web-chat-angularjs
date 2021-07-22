const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const session = require("express-session");

const router = require("./routes");
const formatMessage = require("./utils/formatMessage");

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

app.use(
  session({
    name: "chat",
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(router);

const messages = [];

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

server.listen(PORT, () => console.log(`server running on port ${PORT}!`));
