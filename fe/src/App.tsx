import { useState, useCallback } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import { RoomSelection } from "./components/RoomSelection";
import { ChatRoom } from "./components/ChatRoom";
import type { Message, Room } from "./types";
import { generateUsername } from "./utils/usernameGenerator";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);  
  const [currentMessage, setCurrentMessage] = useState(""); 
  const [currentRoom, setCurrentRoom] = useState(""); 
  const [isJoined, setIsJoined] = useState(false); 
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [username] = useState(() => generateUsername()); 

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

  const handleIncomingMessage = useCallback((data: { message: string; userId: string; username: string }) => {
    setMessages((prevMessages) => [...prevMessages, {
      text: data.message,
      isOwn: data.userId === userId,
      username: data.username
    }]);
  }, [userId]);

  const wsRef = useWebSocket({ userId, onMessage: handleIncomingMessage });

  const joinRoom = (roomId: string) => {
    if (!wsRef.current) return;

    const joinMessage = {
      type: "join",
      payload: {
        roomId: roomId,
        userId: userId,
        username: username
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
        userId: userId,
        username: username
      }
    };

    wsRef.current.send(JSON.stringify(chatMessage));
    setCurrentMessage("");
  };

  const getCurrentRoomInfo = () => {
    return rooms.find(room => room.id === currentRoom);
  };

  if (!isJoined) {
    return <RoomSelection rooms={rooms} onJoinRoom={joinRoom} />;
  }

  return (
    <ChatRoom
      messages={messages}
      currentMessage={currentMessage}
      roomInfo={getCurrentRoomInfo()}
      onMessageChange={setCurrentMessage}
      onSendMessage={sendMessage}
      onLeaveRoom={leaveRoom}
    />
  );
}

export default App;
