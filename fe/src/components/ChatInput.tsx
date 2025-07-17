import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ChatInputProps {
  currentMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export const ChatInput = ({ currentMessage, onMessageChange, onSendMessage }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex space-x-3">
        <Textarea
          value={currentMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Start chattin..."
          className="flex-1 min-h-10 max-h-20 resize-none bg-gray-800 text-white border-gray-700 placeholder-gray-400 focus:border-gray-600 focus:ring-gray-600"
        />
        <Button
          onClick={onSendMessage}
          disabled={!currentMessage.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 border-0 disabled:bg-gray-700 disabled:text-gray-400"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
