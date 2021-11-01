const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: true });


io.on("connection", (socket) => {
  socket.join('some room')
  socket.on('disconnect', () => {
    console.log('用户' + socket.id + '断开连接')
  })

  console.log('用户' + socket.id + '连接')

  socket.on('msg', data => {
    console.log('msg', data)
    socket.to("some room").emit('msg', data)
  })
});

httpServer.listen(3456);
