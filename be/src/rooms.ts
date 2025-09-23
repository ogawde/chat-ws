import type { WebSocket } from "ws";
import type { User } from "./types";

let users: User[] = [];
const roomLastActivity = new Map<string, number>();

export function addOrUpdateUser({
  socket,
  roomId,
  userId,
  username,
  avatarId,
}: {
  socket: WebSocket;
  roomId: string;
  userId: string;
  username: string;
  avatarId?: string;
}) {
  users = users.filter((u) => u.socket !== socket);
  users.push({
    socket,
    room: roomId,
    userId,
    username,
    avatarId,
  });
  recordActivity(roomId);
}

export function removeUserBySocket(socket: WebSocket) {
  const existing = users.find((u) => u.socket === socket);
  if (!existing) return;

  users = users.filter((u) => u.socket !== socket);

  const stillHasUsers = users.some((u) => u.room === existing.room);
  if (!stillHasUsers) {
    roomLastActivity.delete(existing.room);
  }
}

export function getUserBySocket(socket: WebSocket): User | undefined {
  return users.find((u) => u.socket === socket);
}

export function getUsersInRoom(roomId: string): User[] {
  return users.filter((u) => u.room === roomId);
}

export function broadcastToRoom(roomId: string, payload: unknown) {
  const json = JSON.stringify(payload);
  users.forEach((u) => {
    if (u.room === roomId) {
      u.socket.send(json);
    }
  });
}

export function recordActivity(roomId: string) {
  roomLastActivity.set(roomId, Date.now());
}

export function getIdleRooms(idleSinceTimestamp: number): string[] {
  const idleRooms: string[] = [];
  for (const [roomId, lastActivity] of roomLastActivity.entries()) {
    if (lastActivity <= idleSinceTimestamp) {
      idleRooms.push(roomId);
    }
  }
  return idleRooms;
}

