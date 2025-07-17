import { useEffect, useRef } from "react";
import type { Message, Room } from "../types";

interface ChatMessagesProps {
  messages: Message[];
  roomInfo: Room | undefined;
}

export const ChatMessages = ({ messages, roomInfo }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-950">
      {messages.length === 0 ? (
        <div className="text-gray-500 text-center mt-8 text-lg">
          Welcome to the {roomInfo?.name} room! Start chatting...
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col">
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words ${
                message.isOwn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                {message.text}
              </div>
              <span className={`text-xs text-gray-500 mt-1 px-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                {message.username}
              </span>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
