const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"],
        credentials: true
      }
});

const formatMessage = require('./utils/message'); 
const formatUser = require('./utils/users'); 

app.use(cors());
app.use(express.json());

const usersOnline = [];
const messages = [];


app.get("/chat/api/get_users", (req, res) => {
    res.json(usersOnline);
});

app.get("/chat/api/get_messages", (req, res) => {
    res.json(messages);
});

app.delete("/chat/api/detele_user/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = usersOnline.findIndex(user => {
        user.id === id
    });
    usersOnline.splice(userIndex, 1)
})

io.on('connection', (socket) => {

    socket.on("userLogged", username => {
        const userData  = formatUser(socket.id, username);
        const userIndex = usersOnline.findIndex(user => {
            user.id === socket.id
        });

        if(userIndex < 0) {
            usersOnline.push(userData);
            io.emit('usersOnline', usersOnline);
        }

        socket.on('getMessage', msg => {
            const messageData = formatMessage(username, msg);
            messages.push(messageData);
            io.emit('sendedMessage', messageData);
        });
    });

    socket.on('disconnect', () => {
        const getUserLeftIndex = usersOnline.findIndex(user => {
            user.id === socket.id;
        });
        usersOnline.splice(getUserLeftIndex, 1);
    });
});

server.listen(3000, () => console.log("server on"));