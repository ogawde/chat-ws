import { WebSocketServer, WebSocket } from "ws";
import { addOrUpdateUser, broadcastToRoom, getUserBySocket, removeUserBySocket } from "./rooms";
import { parseIncoming, isOriginAllowed } from "./security";
import { allowMessage } from "./rate-limit";
import { startRoomTimeoutWatcher } from "./timeouts";
import type { BroadcastChatMessage } from "./types";

const PORT: number = parseInt(process.env.PORT || "8080", 10);
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket, request) => {
  const origin = request?.headers.origin;

  if (!isOriginAllowed(origin)) {
    socket.close(1008, "Origin not allowed");
    return;
  }

  socket.on("message", (raw) => {
    if (!allowMessage(socket)) {
      return;
    }

    const parsed = parseIncoming(raw);
    if (!parsed) {
      return;
    }

    if (parsed.type === "join") {
      addOrUpdateUser({
        socket,
        roomId: parsed.payload.roomId,
        userId: parsed.payload.userId,
        username: parsed.payload.username,
        avatarId: parsed.payload.avatarId,
      });
      return;
    }

    if (parsed.type === "chat") {
      const user = getUserBySocket(socket);
      if (!user) {
        return;
      }

      const messageData: BroadcastChatMessage = {
        message: parsed.payload.message,
        userId: user.userId,
        username: user.username,
        avatarId: user.avatarId,
      };

      broadcastToRoom(user.room, messageData);
    }
  });

  socket.on("close", () => {
    removeUserBySocket(socket);
  });

  socket.on("error", (error) => {
    return;
  });
});

startRoomTimeoutWatcher({
  onRoomTimeout: (roomId, users) => {
    const payload = {
      type: "room-timeout",
      payload: { roomId },
    };
    const json = JSON.stringify(payload);

    users.forEach((user) => {
      try {
        user.socket.send(json);
      } catch (error) {
        return;
      }
    });
  },
});

