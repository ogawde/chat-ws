import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import { loadUserProfile, saveUserProfile, type UserProfile } from "../lib/avatars";
import type { Message, Room } from "../types";
import { generateUsername } from "../utils/usernameGenerator";

const ROOMS: Room[] = [
  {
    id: "rooftop",
    name: "The Rooftop",
    symbol: "🏢",
    color: "bg-slate-600",
    description:
      "Sky-high conversations, open air, and that golden-hour energy. For the ones who think better when they can see the whole city laid out below them.",
  },
  {
    id: "cafe",
    name: "The Corner Café",
    symbol: "☕",
    color: "bg-amber-600",
    description:
      "Warm lighting, the smell of coffee, and enough background noise to feel alive. The perfect spot for slow mornings, big ideas, and people-watching.",
  },
  {
    id: "underground",
    name: "The Underground",
    symbol: "🚇",
    color: "bg-purple-600",
    description:
      "Deep cuts, low ceilings, and conversations that actually go somewhere. Where the real ones hang after midnight when the rest of the city's gone quiet.",
  },
  {
    id: "plaza",
    name: "The Plaza",
    symbol: "⛲",
    color: "bg-emerald-600",
    description:
      "Out in the open, buzzing with movement, always something happening. For the social butterflies who want to be seen, heard, and right in the middle of it all.",
  },
];

interface AppContextValue {
  rooms: Room[];
  messages: Message[];
  currentMessage: string;
  setCurrentMessage: (value: string) => void;
  userId: string;
  username: string;
  avatarId: string | null;
  saveProfile: (profile: UserProfile) => void;
  joinRoom: (roomId: string) => boolean;
  leaveRoom: () => void;
  sendMessage: () => void;
  getRoomInfo: (roomId: string) => Room | undefined;
  wsRef: React.MutableRefObject<WebSocket | null>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [username, setUsername] = useState(() => generateUsername());
  const [avatarId, setAvatarId] = useState<string | null>(null);

  const handleIncomingMessage = useCallback(
    (data: { message: string; userId: string; username: string; avatarId?: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          isOwn: data.userId === userId,
          username: data.username,
          avatarId: data.avatarId,
        },
      ]);
    },
    [userId]
  );

  const wsRef = useWebSocket({ userId, onMessage: handleIncomingMessage });

  useEffect(() => {
    const stored = loadUserProfile();
    if (stored) {
      setUsername(stored.name);
      setAvatarId(stored.avatarId);
    }
  }, []);

  const saveProfile = useCallback((profile: UserProfile) => {
    setUsername(profile.name);
    setAvatarId(profile.avatarId);
    saveUserProfile(profile);
  }, []);

  const joinRoom = useCallback(
    (roomId: string) => {
      if (!wsRef.current || !avatarId || !username.trim()) return false;
      const joinMessage = {
        type: "join",
        payload: { roomId, userId, username, avatarId },
      };
      wsRef.current.send(JSON.stringify(joinMessage));
      setMessages([]);
      return true;
    },
    [wsRef, avatarId, username, userId]
  );

  const leaveRoom = useCallback(() => {
    setMessages([]);
    navigate("/");
  }, [navigate]);

  const sendMessage = useCallback(() => {
    if (!currentMessage.trim() || !wsRef.current) return;
    const chatMessage = {
      type: "chat",
      payload: {
        message: currentMessage.trim(),
        userId,
        username,
        avatarId,
      },
    };
    wsRef.current.send(JSON.stringify(chatMessage));
    setCurrentMessage("");
  }, [currentMessage, wsRef, userId, username, avatarId]);

  const getRoomInfo = useCallback(
    (roomId: string) => ROOMS.find((r) => r.id === roomId),
    []
  );

  const value: AppContextValue = {
    rooms: ROOMS,
    messages,
    currentMessage,
    setCurrentMessage,
    userId,
    username,
    avatarId,
    saveProfile,
    joinRoom,
    leaveRoom,
    sendMessage,
    getRoomInfo,
    wsRef,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
