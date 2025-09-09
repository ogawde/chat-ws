import { useState, useCallback, useEffect } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import { RoomSelection } from "./components/RoomSelection";
import { ChatRoom } from "./components/ChatRoom";
import type { Message, Room } from "./types";
import { generateUsername } from "./utils/usernameGenerator";
import { AvatarProfileModal } from "./components/avatar-profile-modal";
import { loadUserProfile, saveUserProfile, type UserProfile } from "./lib/avatars";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [username, setUsername] = useState(() => generateUsername());
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [initialProfile, setInitialProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = loadUserProfile();

    if (storedProfile) {
      setInitialProfile(storedProfile);
      setUsername(storedProfile.name);
      setAvatarId(storedProfile.avatarId);
      setIsProfileModalOpen(false);
    } else {
      setIsProfileModalOpen(true);
    }
  }, []);

  const rooms: Room[] = [
    { 
      id: "rooftop", 
      name: "The Rooftop", 
      symbol: "🏢", 
      color: "bg-slate-600" 
    },
    { 
      id: "cafe", 
      name: "The Corner Café", 
      symbol: "☕", 
      color: "bg-amber-600" 
    },
    { 
      id: "underground", 
      name: "The Underground", 
      symbol: "🚇", 
      color: "bg-purple-600" 
    },
    { 
      id: "plaza", 
      name: "The Plaza", 
      symbol: "⛲", 
      color: "bg-emerald-600" 
    }
  ];

  const handleIncomingMessage = useCallback((data: { message: string; userId: string; username: string; avatarId?: string }) => {
    setMessages((prevMessages) => [...prevMessages, {
      text: data.message,
      isOwn: data.userId === userId,
      username: data.username,
      avatarId: data.avatarId,
    }]);
  }, [userId]);

  const wsRef = useWebSocket({ userId, onMessage: handleIncomingMessage });

  const handleProfileSave = (profile: UserProfile) => {
    setUsername(profile.name);
    setAvatarId(profile.avatarId);
    saveUserProfile(profile);
    setInitialProfile(profile);
    setIsProfileModalOpen(false);
  };

  const joinRoom = (roomId: string) => {
    if (!wsRef.current || !avatarId || !username.trim()) {
      setIsProfileModalOpen(true);
      return;
    }

    const joinMessage = {
      type: "join",
      payload: {
        roomId,
        userId,
        username,
        avatarId,
      }
    };

    wsRef.current.send(JSON.stringify(joinMessage));
    setCurrentRoom(roomId);
    setIsJoined(true);
    setMessages([]);
  };

  const leaveRoom = () => {
    setIsJoined(false);
    setCurrentRoom("");
    setMessages([]);
  };

  const sendMessage = () => { 
    if (!currentMessage.trim() || !wsRef.current || !isJoined) return;

    const chatMessage = {
      type: "chat",
      payload: {
        message: currentMessage.trim(),
        userId,
        username,
        avatarId,
      }
    };

    wsRef.current.send(JSON.stringify(chatMessage));
    setCurrentMessage("");
  };

  const getCurrentRoomInfo = () => {
    return rooms.find(room => room.id === currentRoom);
  };

  return (
    <>
      <AvatarProfileModal
        isOpen={isProfileModalOpen}
        initialProfile={initialProfile}
        fallbackName={username}
        onSave={handleProfileSave}
      />
      {!isJoined ? (
        <RoomSelection rooms={rooms} onJoinRoom={joinRoom} />
      ) : (
        <ChatRoom
          messages={messages}
          currentMessage={currentMessage}
          roomInfo={getCurrentRoomInfo()}
          onMessageChange={setCurrentMessage}
          onSendMessage={sendMessage}
          onLeaveRoom={leaveRoom}
        />
      )}
    </>
  );
}

export default App;
