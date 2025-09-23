import type { WebSocket } from "ws";

interface RateInfo {
  windowStart: number;
  count: number;
}

const DEFAULT_MESSAGES_PER_SECOND = 5;
const WINDOW_MS = 1000;

const socketRates = new WeakMap<WebSocket, RateInfo>();

export function allowMessage(socket: WebSocket): boolean {
  const limit =
    typeof process.env.WS_MESSAGES_PER_SECOND === "string"
      ? Number(process.env.WS_MESSAGES_PER_SECOND) || DEFAULT_MESSAGES_PER_SECOND
      : DEFAULT_MESSAGES_PER_SECOND;

  const now = Date.now();
  const current = socketRates.get(socket);

  if (!current || now - current.windowStart > WINDOW_MS) {
    socketRates.set(socket, { windowStart: now, count: 1 });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}

