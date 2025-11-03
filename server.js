import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files (so both HTML files are accessible)
app.use(express.static(__dirname));

let storeColor = "#000000";

io.on('connection', (socket) => {
  console.log(`User connected:${socket.id} stored color:${storeColor}`);

  io.emit("showColor", storeColor);

  socket.on("colorSelected", (color) => {
    console.log("Color selected:", color);
    storeColor = color;
    // Broadcast color to all connected clients (including dashboard)
    socket.broadcast.emit("showColor", color);
  });

  socket.on('message', (msg) => {
    console.log('Message:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});