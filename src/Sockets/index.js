const codeBlocksStatus = {
  1: { mentorId: null, users: [] },
  2: { mentorId: null, users: [] },
  3: { mentorId: null, users: [] },
  4: { mentorId: null, users: [] },
};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("join code block", (blockId) => {
      const block = codeBlocksStatus[blockId];
      socket.blockId = blockId;

      if (!block.users.includes(socket.id)) {
        if (!block.mentorId) {
          block.mentorId = socket.id;
          block.users.unshift(socket.id);
          socket.emit("set role", "mentor", socket.id);
        } else {
          block.users.push(socket.id);
          socket.emit("set role", "student", socket.id);
        }
        socket.join(blockId);
      }
      console.log("After joining:", JSON.stringify(codeBlocksStatus, null, 2));
    });

    socket.on("disconnect", () => {
      const blockId = socket.blockId;
      if (blockId) {
        const room = codeBlocksStatus[blockId];
        if (room) {
          const index = room.users.indexOf(socket.id);
          if (index !== -1) {
            room.users.splice(index, 1);
            if (socket.id === room.mentorId) {
              if (room.users.length > 0) {
                room.mentorId = room.users[0];
                io.to(room.mentorId).emit("set role", "mentor", room.mentorId);
              } else {
                room.mentorId = null;
              }
            }
          }
        }
      }
      console.log(
        "After disconnecting:",
        JSON.stringify(codeBlocksStatus, null, 2)
      );
    });

    socket.on("code change", (blockId, updatedCode) => {
      if (socket.id !== codeBlocksStatus[blockId].mentorId) {
        io.to(blockId).emit("code update", updatedCode);
      }
    });
  });
};

export default socketHandler;
