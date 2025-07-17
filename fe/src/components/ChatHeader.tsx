import { Button } from "./ui/button";
import type { Room } from "../types";

interface ChatHeaderProps {
  roomInfo: Room | undefined;
  onLeaveRoom: () => void;
}

export const ChatHeader = ({ roomInfo, onLeaveRoom }: ChatHeaderProps) => {
  return (
    <div className="bg-gray-950 border-b border-gray-800 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className={`${roomInfo?.color} w-8 h-8 rounded-full flex items-center justify-center`}>
            <span className="text-white text-lg font-bold">{roomInfo?.symbol}</span>
          </div>
          <h1 className="text-xl font-semibold">{roomInfo?.name} Room</h1>
        </div>
        <Button
          onClick={onLeaveRoom}
          className="bg-red-600 hover:bg-red-500 text-white border-0"
        >
          Leave Room
        </Button>
      </div>
    </div>
  );
};
