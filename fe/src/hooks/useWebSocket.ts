import { useEffect, useRef } from "react";

interface ChatMessagePayload {
  message: string;
  userId: string;
  username: string;
  avatarId?: string;
}

type ServerMessage =
  | { type: "chat"; payload: ChatMessagePayload }
  | { type: "room-timeout"; payload: { roomId: string } };

interface UseWebSocketProps {
  userId: string;
  onMessage: (data: ChatMessagePayload) => void;
  onRoomTimeout: (roomId: string) => void;
}

export const useWebSocket = ({ userId, onMessage, onRoomTimeout }: UseWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080");

    ws.onmessage = (e) => {
      const parsed = JSON.parse(e.data) as ServerMessage | ChatMessagePayload;

      if ("type" in parsed) {
        if (parsed.type === "chat") {
          onMessage(parsed.payload);
        } else if (parsed.type === "room-timeout") {
          onRoomTimeout(parsed.payload.roomId);
        }
      } else {
        onMessage(parsed as ChatMessagePayload);
      }
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [userId, onMessage, onRoomTimeout]);

  return wsRef;
};
