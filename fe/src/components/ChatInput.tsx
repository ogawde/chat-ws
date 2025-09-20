import { cn } from "../lib/utils";

interface ChatInputProps {
  currentMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  accentClass: string;
}

export const ChatInput = ({
  currentMessage,
  onMessageChange,
  onSendMessage,
  accentClass,
}: ChatInputProps) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentMessage.trim()) return;
    onSendMessage();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-800 bg-slate-950/80 px-4 py-3"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-2 font-mono text-sm text-slate-100">
        <span className={cn("select-none", accentClass)}>$</span>
        <input
          type="text"
          value={currentMessage}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder="type your message..."
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none"
          autoFocus
        />
      </div>
    </form>
  );
};
