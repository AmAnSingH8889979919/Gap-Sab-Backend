 const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
// CORS stands for Cross-Origin Resource Sharing. it is use to share  resource in cross origine.
const cors = require('cors');   



const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server( server,{
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
 
app.get("/", (req, res) => {
  res.send("Backend of Gap-Sap-App by Aman Singh"); res.end()
})

io.on("connection", (socket) => {
    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    // for room connection
    socket.on("roomConnection", room => socket.join(room))

    //  for msg connection
    socket.on("newMsg",({newMsg, room})=>{
         console.log(room, newMsg)
         io.in(room).emit("getRecentMsg",newMsg )
    })
  });
 

 
const port = process.env.PORT || 4500

server.listen(port, console.log(`App started at port ${port}`))
