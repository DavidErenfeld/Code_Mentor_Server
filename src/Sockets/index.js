const codeBlocksStatus = {
  1: { mentorId: null, users: [] },
  2: { mentorId: null, users: [] },
  3: { mentorId: null, users: [] },
  4: { mentorId: null, users: [] },
};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("join code block", (blockId) => {
      try {
        const block = codeBlocksStatus[blockId];
        if (!block) throw new Error("Block does not exist");

        socket.blockId = blockId;

        if (block.users.includes(socket.id)) return;
        if (!block.mentorId) {
          block.mentorId = socket.id;
          block.users.unshift(socket.id); // Add mentor at the start
          socket.emit("set role", "mentor", socket.id);
        } else {
          block.users.push(socket.id); // Add student at the end
          socket.emit("set role", "student", socket.id);
        }
        socket.join(blockId);
      } catch (error) {
        console.error("Error in join code block:", error);
        socket.emit("error", "Failed to join block: " + error.message);
      }
    });

    socket.on("disconnect", () => {
      try {
        const blockId = socket.blockId;
        if (!blockId && !codeBlocksStatus[blockId]) return;
        const room = codeBlocksStatus[blockId];
        const index = room.users.indexOf(socket.id);
        if (index === -1) return;
        room.users.splice(index, 1);
        if (socket.id !== room.mentorId) return;
        if (room.users.length > 0) {
          room.mentorId = room.users[0];
          io.to(room.mentorId).emit("set role", "mentor", room.mentorId);
        } else {
          room.mentorId = null;
          io.to(blockId).emit("set role", "readonly");
        }
      } catch (error) {
        console.error("Error in disconnect:", error);
      }
    });

    socket.on("code change", (blockId, updatedCode) => {
      try {
        if (socket.id !== codeBlocksStatus[blockId].mentorId) {
          socket.to(blockId).emit("code update", updatedCode);
        }
      } catch (error) {
        console.error("Error in code change:", error);
      }
    });
  });
};

export default socketHandler;
