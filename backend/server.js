const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const cors = require("cors");

const formatMessage = require("./utils/message");

const usersOnline = [];
const messages = [];

app.use(cors());
app.use(express.json());

app.get("/chat/api/get_users", (req, res) => {
  res.json(usersOnline);
});

app.post("/chat/api/post_user", (req, res) => {
  const { username, room } = req.body;
  const newUser = { id: uuid(), username, room };

  usersOnline.push(newUser);
});

app.delete("/chat/api/delete_user/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = usersOnline.findIndex((user) => {
    user.id === id;
  });
  usersOnline.splice(userIndex, 1);
});

app.get("/chat/api/get_messages", (req, res) => {
  res.json(messages);
});

io.on("connection", (socket) => {
  const userData = usersOnline[usersOnline.length - 1];
  console.log(userData);

	socket.join(userData.room);

  io.to(userData.room).emit("userLoggedin", userData);

  socket.on("getMessage", (msg) => {
    const messageData = formatMessage(userData.username, msg);
    messages.push(messageData);
    io.to(userData.room).emit("sendedMessage", messageData);
  });

  socket.on("logout", () => {
    socket.emit("userLogoutID", socket.id);
    socket.disconnect();
    console.log("disconnect");
  });
});

server.listen(3000, () => console.log("server on"));
