import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import codeBlocks from "./codeBlocks.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Code Sharing App");
});

app.get("/codeBlocks", (req, res) => {
  console.log("codeBlocks");
  res.send(codeBlocks);
});

io.on("connection", (socket) => {
  console.log("User connected with id:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("code change", (updatedCodeBlock) => {
    console.log("Received code change:", updatedCodeBlock);
    const index = codeBlocks.findIndex(
      (block) => block.id === updatedCodeBlock.id
    );
    if (index !== -1) {
      codeBlocks[index] = updatedCodeBlock;
    }
    io.emit("code update", updatedCodeBlock);
    console.log("Broadcasted code update:", updatedCodeBlock);
  });
});

server.on("clientError", (err, socket) => {
  console.error("ClientError:", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  socket.destroy();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
