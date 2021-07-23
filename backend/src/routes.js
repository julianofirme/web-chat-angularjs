const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const usersOnline = [];

const roomsMock = [
  {
    roomName: "Geral",
    users: [],
    roomId: "1",
  },
  {
    roomName: "Movies",
    users: [],
    roomId: "2",
  },
  {
    roomName: "Games",
    users: [],
    roomId: "3",
  },
];

router.post("/user", (req, res) => {
  const { username, roomName, roomId } = req.body;
  const newUser = { id: uuid(), username, roomName, roomId };
  usersOnline.push(newUser);

  req.session.user = newUser;

  roomsMock.map((room) => {
    const userIndex = room.users.findIndex((user) => user.id === newUser.id);
    if (room.roomId === newUser.roomId && userIndex < 0) {
      room.users.push(newUser);
      res.status(200).send({ msg: "user has been logged" });
    }

    if (room.roomId !== newUser.roomId) {
      res.status(404);
    }
  });
});

router.get("/users", (req, res) => {
  res.status(200).json(usersOnline);
});

router.get("/session", (req, res) => {
  res.status(200).json(req.session.user);
});

router.get("/rooms", (req, res) => {
  res.status(200).json(roomsMock);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  roomsMock.map((room) => {
    room.users.map((user) => {
      if (user.id === id) {
        const userIndex = room.users.indexOf(user);
        room.users.splice(userIndex, 1);
        usersOnline.splice(userIndex, 1);
      }
    });
  });

  res.status(200).send({ msg: "user has been deleted" })
});

module.exports = router;
