import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatRoom } from "../components/ChatRoom";
import { useApp } from "../context/app-context";

const VALID_ROOM_IDS = ["rooftop", "cafe", "underground", "plaza"];

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    username,
    avatarId,
    joinRoom,
    leaveRoom,
    sendMessage,
    getRoomInfo,
    isSocketReady,
  } = useApp();

  const roomInfo = roomId ? getRoomInfo(roomId) : undefined;

  useEffect(() => {
    if (!roomId || !VALID_ROOM_IDS.includes(roomId)) {
      navigate("/", { replace: true });
      return;
    }

    if (!username.trim() || !avatarId) {
      navigate(`/?room=${roomId}`, { replace: true });
      return;
    }

    joinRoom(roomId);
  }, [roomId, username, avatarId, navigate, joinRoom, isSocketReady]);

  if (!roomId || !roomInfo) return null;

  return (
    <ChatRoom
      messages={messages}
      currentMessage={currentMessage}
      roomInfo={roomInfo}
      onMessageChange={setCurrentMessage}
      onSendMessage={sendMessage}
      onLeaveRoom={leaveRoom}
    />
  );
}
