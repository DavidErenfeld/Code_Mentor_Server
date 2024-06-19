import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import socketHandler from "./Sockets/index.js";
import initializeDatabase from "./Data/InitializationControllers.js";

dotenv.config();

const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const initDb = () => {
  const uri = process.env.DB_URI;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
      initializeDatabase();
    })
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};

socketHandler(io);

server.on("clientError", (err, socket) => {
  console.error("ClientError:", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

const PORT = process.env.PORT || 3000;
initDb();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
