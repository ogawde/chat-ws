import { useEffect, useRef } from "react";
import type { Message, Room } from "../types";
import { cn } from "../lib/utils";

interface ChatMessagesProps {
  messages: Message[];
  roomInfo: Room | undefined;
  accentClass: string;
}

export const ChatMessages = ({ messages, roomInfo, accentClass }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const roomLabel = roomInfo?.name ?? "room";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950/80 px-4 py-4 font-mono text-sm">
      <div className="mx-auto flex h-full max-w-5xl flex-col justify-start space-y-1">
        {messages.length === 0 ? (
          <div className="mt-8 text-center text-xs text-slate-500 md:text-sm">
            <span className={cn("mr-1", accentClass)}>[{roomLabel}]</span>
            waiting for the first message...
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.isOwn;
            const colorClass = isOwn ? accentClass : "text-slate-300";

            return (
              <div
                key={`${message.username}-${index}-${message.text.slice(0, 10)}`}
                className={cn("flex", isOwn ? "justify-end" : "justify-start")}
              >
                <div className={cn("max-w-2xl break-words", colorClass)}>
                  {!isOwn && (
                    <span className="opacity-70">[{message.username}]</span>
                  )}
                  <span className={cn(!isOwn ? "ml-2" : "")}>{message.text}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
