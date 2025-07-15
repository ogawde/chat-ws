import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      const user = allSockets.find((x) => x.socket === socket);
      if (!user) return;

      const currentUserRoom = user.room;

      allSockets.forEach((x) => {
        if (x.room === currentUserRoom) {
          x.socket.send(parsedMessage.payload.message);
        }
      });
    }
  });
});
