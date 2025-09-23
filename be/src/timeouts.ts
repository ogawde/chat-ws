import { getIdleRooms, getUsersInRoom } from "./rooms";
import type { User } from "./types";

export function startRoomTimeoutWatcher(options: {
  onRoomTimeout: (roomId: string, users: User[]) => void;
  idleMs?: number;
  intervalMs?: number;
}) {
  const idleMs = options.idleMs ?? 30 * 60 * 1000;
  const intervalMs = options.intervalMs ?? 60 * 1000;

  setInterval(() => {
    const now = Date.now();
    const cutoff = now - idleMs;
    const idleRooms = getIdleRooms(cutoff);

    idleRooms.forEach((roomId) => {
      const users = getUsersInRoom(roomId);
      if (users.length === 0) return;
      options.onRoomTimeout(roomId, users);
    });
  }, intervalMs);
}

