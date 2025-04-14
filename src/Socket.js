module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected: ", socket.id);

    socket.on("sendMessage", (msg) => {
      console.log("📩 Message received:", msg);
      io.emit("receiveMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Client disconnected:", socket.id);
    });
  });
};
