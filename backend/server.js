const express = require('express');
const session = require('express-session');
const { v4: uuid } = require('uuid');
const app = express();


const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const cors = require('cors');

const formatMessage = require('./utils/message');

const usersOnline = [];
const messages = [];

app.use(cors());
app.use(express.json());

app.use(session({
  name: "chat",
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true 
}));

app.get('/get_users', (req, res) => {
  res.json(usersOnline);
});

app.get('/get_messages', (req, res) => {
  res.json(messages);
});

app.post('/post_user', (req, res) => {
  const { username, roomName, roomId } = req.body;
  const newUser = { id: uuid(), username, roomName, roomId };
  usersOnline.push(newUser);
  
  req.session.user = newUser;
  res.sendStatus(200);
});

app.get('/get_session', (req, res) => {
  res.json(req.session.user);
});

app.delete('/delete_user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = usersOnline.findIndex((user) => {
    user.id === id;
  });
  usersOnline.splice(userIndex, 1);
  res.json({ sucess: "user has been deleted" })
});

io.on('connection', (socket) => {

  socket.on('userLogin', user => {
    io.emit('userLoggedin', user);
    socket.join(user.roomId);

    socket.on('getMessage', (msg) => {
      const messageData = formatMessage(user.username, user.roomId, msg);
      messages.push(messageData);
      io.to(user.roomId).emit('sendedMessage', messageData);
    });
  
    socket.on('logout', () => {
      io.emit('userLogoutID', user);
      socket.disconnect();
    });
  });
});

server.listen(3000, () => console.log('server on'));
