import { useEffect, useRef, useState, type MutableRefObject } from "react";

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
  onSocketOpen?: (socket: WebSocket) => void;
}

export function useWebSocket({
  userId,
  onMessage,
  onRoomTimeout,
  onSocketOpen,
}: UseWebSocketProps): {
  wsRef: MutableRefObject<WebSocket | null>;
  isSocketReady: boolean;
} {
  const wsRef = useRef<WebSocket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState(false);

  const onMessageRef = useRef(onMessage);
  const onRoomTimeoutRef = useRef(onRoomTimeout);
  const onSocketOpenRef = useRef(onSocketOpen);

  onMessageRef.current = onMessage;
  onRoomTimeoutRef.current = onRoomTimeout;
  onSocketOpenRef.current = onSocketOpen;

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080");

    const handleOpen = () => {
      setIsSocketReady(true);
      onSocketOpenRef.current?.(ws);
    };

    const handleClose = () => {
      setIsSocketReady(false);
    };

    ws.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data) as ServerMessage | ChatMessagePayload;

        if ("type" in parsed) {
          if (parsed.type === "chat") {
            onMessageRef.current(parsed.payload);
          } else if (parsed.type === "room-timeout") {
            onRoomTimeoutRef.current(parsed.payload.roomId);
          }
        } else {
          onMessageRef.current(parsed as ChatMessagePayload);
        }
      } catch {
        return;
      }
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("close", handleClose);

    wsRef.current = ws;

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("close", handleClose);
      setIsSocketReady(false);
      ws.close();
    };
  }, [userId]);

  return { wsRef, isSocketReady };
}
