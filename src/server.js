import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./Routes/index.js";
import codeBlocks from "./Data/codeBlocks.js";
import socketHandler from "./Sockets/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import initializeDatabase from "./Data/codeBlocks.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const uri = process.env.DB_URI;
// connect to the database
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
initializeDatabase();

app.use(cors());

app.use("/", router);

socketHandler(io, codeBlocks);

server.on("clientError", (err, socket) => {
  console.error("ClientError:", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  socket.destroy();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
