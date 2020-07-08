const express = require("express");
const { Socket } = require("dgram");
const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(require('./routes/littlezoom.routes'))

app.use(express.static(__dirname + "/public"));

io.on('connection', (socket) => {
    socket.on('stream', (imege) => {
        socket.broadcast.emit('stream',imege);
    })
});

module.exports = http;