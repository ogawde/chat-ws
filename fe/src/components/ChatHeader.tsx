import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import type { Room } from "../types";

interface ChatHeaderProps {
  roomInfo: Room | undefined;
  onLeaveRoom: () => void;
  accentClass: string;
}

export const ChatHeader = ({ roomInfo, onLeaveRoom, accentClass }: ChatHeaderProps) => {
  const label = roomInfo?.name ?? "Room";

  return (
    <header className="px-4 pt-4">
      <div className="mx-auto flex max-w-5xl items-center justify-end">
        <Button
          onClick={onLeaveRoom}
          variant="outline"
          aria-label={`Exit ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border-slate-700 bg-slate-950/80 p-0 text-slate-100 hover:border-slate-400 hover:bg-slate-900 md:h-9 md:w-9"
        >
          <img
            src="/exit-svgrepo-com.svg"
            alt=""
            className={cn("h-4 w-4 md:h-5 md:w-5 invert", accentClass)}
          />
        </Button>
      </div>
    </header>
  );
};
