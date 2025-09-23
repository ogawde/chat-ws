import type { WebSocket } from "ws";

export interface User {
  socket: WebSocket;
  room: string;
  userId: string;
  username: string;
  avatarId?: string;
}

export interface JoinPayload {
  roomId: string;
  userId: string;
  username: string;
  avatarId?: string;
}

export interface ChatPayload {
  message: string;
  userId: string;
  username: string;
  avatarId?: string;
}

export type IncomingMessage =
  | { type: "join"; payload: JoinPayload }
  | { type: "chat"; payload: ChatPayload };

export interface BroadcastChatMessage {
  message: string;
  userId: string;
  username: string;
  avatarId?: string;
}

