import { WebSocketServer, WebSocket } from "ws";

const PORT: number = parseInt(process.env.PORT || "8080", 10);
const wss = new WebSocketServer({ port: PORT });

interface User {
  socket: WebSocket;
  room: string;
  userId: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      allSockets = allSockets.filter(user => user.socket !== socket);
      
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
        userId: parsedMessage.payload.userId
      });
      
      console.log(`User ${parsedMessage.payload.userId} joined room: ${parsedMessage.payload.roomId}`);
    }

    if (parsedMessage.type === "chat") {
      const user = allSockets.find((x) => x.socket === socket);
      if (!user) return;

      const currentUserRoom = user.room;
      const messageData = {
        message: parsedMessage.payload.message,
        userId: parsedMessage.payload.userId
      };

      allSockets.forEach((x) => {
        if (x.room === currentUserRoom) {
          x.socket.send(JSON.stringify(messageData));
        }
      });

      console.log(`Message sent in room ${currentUserRoom}: ${parsedMessage.payload.message}`);
    }
  });

  socket.on("close", () => {
    allSockets = allSockets.filter(user => user.socket !== socket);
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
