let mentorId = null;

const socketHandler = (io, codeBlocks) => {
  io.on("connection", (socket) => {
    console.log("User connected with id:", socket.id);

    // Assign roles
    if (!mentorId) {
      mentorId = socket.id;
      socket.emit("set role", "mentor");
      console.log("Assigned mentor role to user with id:", socket.id);
    } else {
      socket.emit("set role", "student");
      console.log("Assigned student role to user with id:", socket.id);
    }

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      if (socket.id === mentorId) {
        mentorId = null;
        console.log(
          `Mentor (${socket.id}) disconnected, setting all users to read-only.`
        );
        io.emit("set role", "readonly");
      }
    });

    // Handle code change
    socket.on("code change", (updatedCodeBlock) => {
      if (socket.id !== mentorId) {
        console.log("Received code change:", updatedCodeBlock);
        const index = codeBlocks.findIndex(
          (block) => block.id === updatedCodeBlock.id
        );
        if (index !== -1) {
          codeBlocks[index] = updatedCodeBlock;
        }
        io.emit("code update", updatedCodeBlock);
        console.log("Broadcasted code update:", updatedCodeBlock);
      }
    });
  });
};

export default socketHandler;
