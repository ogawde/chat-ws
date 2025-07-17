import { useEffect, useRef } from "react";

interface UseWebSocketProps {
  userId: string;
  onMessage: (data: { message: string; userId: string; username: string }) => void;
}

export const useWebSocket = ({ userId, onMessage }: UseWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080");
    
    ws.onmessage = (e) => {     
      const data = JSON.parse(e.data);
      onMessage(data);
    };

    ws.onopen = () => {
    };

    ws.onclose = () => {
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [userId, onMessage]);

  return wsRef;
};
