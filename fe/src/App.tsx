import { useEffect, useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

function App() {
  const [messages, setMessages] = useState<{text: string, isOwn: boolean}[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9)); 
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const rooms = [
    { id: "circle", name: "Circle", symbol: "○", color: "bg-pink-600" },
    { id: "triangle", name: "Triangle", symbol: "△", color: "bg-blue-600" },
    { id: "square", name: "Square", symbol: "□", color: "bg-green-600" },
    { id: "star", name: "Star", symbol: "★", color: "bg-yellow-600" }
  ];

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8080");
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, {
        text: data.message,
        isOwn: data.userId === userId
      }]);
    };

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinRoom = (roomId: string) => {
    if (!wsRef.current) return;

    const joinMessage = {
      type: "join",
      payload: {
        roomId: roomId,
        userId: userId
      }
    };

    wsRef.current.send(JSON.stringify(joinMessage));
    setCurrentRoom(roomId);
    setIsJoined(true);
    setMessages([]); 
  };

  const sendMessage = () => {
    if (!currentMessage.trim() || !wsRef.current || !isJoined) return;

    const chatMessage = {
      type: "chat",
      payload: {
        message: currentMessage.trim(),
        userId: userId
      }
    };

    wsRef.current.send(JSON.stringify(chatMessage));
    setCurrentMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCurrentRoomInfo = () => {
    return rooms.find(room => room.id === currentRoom);
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-gray-800 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center mb-2">Squid Game Chat</h1>
            <p className="text-gray-400 text-center text-lg">Choose a game room to join</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => joinRoom(room.id)}
                className="group cursor-pointer bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className={`${room.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-white text-3xl font-bold">{room.symbol}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-400 mb-4">Join the {room.name.toLowerCase()} room</p>
                  <div className="bg-gray-800 rounded-md px-4 py-2 text-sm text-gray-300">
                    Click to join
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const roomInfo = getCurrentRoomInfo();

  return (
    <div className="h-screen bg-black text-white flex flex-col">
=      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`${roomInfo?.color} w-8 h-8 rounded-full flex items-center justify-center`}>
              <span className="text-white text-lg font-bold">{roomInfo?.symbol}</span>
            </div>
            <h1 className="text-xl font-semibold">{roomInfo?.name} Room</h1>
          </div>
          <Button
            onClick={() => {
              setIsJoined(false);
              setCurrentRoom("");
              setMessages([]);
            }}
            className="bg-red-600 hover:bg-red-500 text-white border-0"
          >
            Leave Room
          </Button>
        </div>
      </div>

=      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-950">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-8 text-lg">
            Welcome to the {roomInfo?.name} room! Start chatting...
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words ${
                message.isOwn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                {message.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex space-x-3">
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 min-h-10 max-h-20 resize-none bg-gray-800 text-white border-gray-700 placeholder-gray-400 focus:border-gray-600 focus:ring-gray-600"
          />
          <Button
            onClick={sendMessage}
            disabled={!currentMessage.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 border-0 disabled:bg-gray-700 disabled:text-gray-400"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;