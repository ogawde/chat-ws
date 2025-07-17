import type { Message, Room } from "../types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface ChatRoomProps {
  messages: Message[];
  currentMessage: string;
  roomInfo: Room | undefined;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onLeaveRoom: () => void;
}

export const ChatRoom = ({ 
  messages, 
  currentMessage, 
  roomInfo, 
  onMessageChange, 
  onSendMessage, 
  onLeaveRoom 
}: ChatRoomProps) => {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ChatHeader roomInfo={roomInfo} onLeaveRoom={onLeaveRoom} />
      <ChatMessages messages={messages} roomInfo={roomInfo} />
      <ChatInput 
        currentMessage={currentMessage}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};
