const path = require('path');
const express = require("express");
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Start server
const server = app.listen(app.get("port"), () => {
    console.log("Sever on por", app.get("port"))
});

//Web Socket
const SocketiIO = require("socket.io");
const io = SocketiIO(server);
let countpeer = 0;
io.on('connection', (socket) => {
    socket.on('newpeer', () => {
        if (countpeer < 2) {
            countpeer ++;
            if (countpeer === 2) {
                io.emit('createpeer');
            }
        }
    })

    socket.on('P1sendToBack', function (data) {
        socket.broadcast.emit('P1SendToFront', data);
    })

    socket.on('P2sendToBack', function (data) {
        socket.broadcast.emit('P2SendToFront', data);
    })

    socket.on('disconnect', function Disconnect() {
        if (countpeer > 0) {
            countpeer--;
        }
    })
})
