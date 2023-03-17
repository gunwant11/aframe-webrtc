const express = require('express');
const app = express();
const http = require('http').Server(app);


const port = process.env.PORT || 8000;
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });
const webServer = http.createServer(app);
io = require('socket.io')(http);

const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected',socket.id); 

    let currentRoom = null;

    socket.on('joinRoom', (data) => {
        const {room} = data;
        if (!rooms[room]) {
            rooms[room] = {
                name: room,
                users: {},
            };
        }

        const joinedTime = new Date().now()
        rooms[room].users[socket.id] = joinedTime;
        currentRoom = room;
        console.log(`User ${socket.id} joined room ${room}`);
        socket.join(room);

        socket.emit("connected", {joinedTime});
        const occupants = Object.keys(rooms[room].users);
        io.in(currentRoom).emit("occupantsChanged", {occupants});

    });

    // socket.on("send", (data) => {
    //     )

});

webServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
