import type { Message, Room } from "../types";
import { cn } from "../lib/utils";
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

const ROOM_THEMES: Record<
  string,
  {
    background: string;
    accent: string;
  }
> = {
  rooftop: {
    background: "bg-slate-950",
    accent: "text-cyan-400",
  },
  cafe: {
    background: "bg-slate-950",
    accent: "text-amber-400",
  },
  underground: {
    background: "bg-slate-950",
    accent: "text-fuchsia-400",
  },
  plaza: {
    background: "bg-slate-950",
    accent: "text-emerald-400",
  },
};

export const ChatRoom = ({ 
  messages, 
  currentMessage, 
  roomInfo, 
  onMessageChange, 
  onSendMessage, 
  onLeaveRoom 
}: ChatRoomProps) => {
  const theme = roomInfo ? ROOM_THEMES[roomInfo.id] ?? ROOM_THEMES.plaza : ROOM_THEMES.plaza;

  return (
    <div
      className={cn(
        "flex h-screen flex-col text-slate-50",
        theme.background,
      )}
    >
      <ChatHeader roomInfo={roomInfo} onLeaveRoom={onLeaveRoom} accentClass={theme.accent} />
      <ChatMessages messages={messages} roomInfo={roomInfo} accentClass={theme.accent} />
      <ChatInput 
        currentMessage={currentMessage}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        accentClass={theme.accent}
      />
    </div>
  );
};
