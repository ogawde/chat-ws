import type { IncomingMessage } from "./types";
import type { RawData } from "ws";

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export function parseIncoming(raw: RawData): IncomingMessage | null {
  try {
    const parsed = JSON.parse(raw.toString());
    if (!parsed || typeof parsed !== "object") return null;

    const { type, payload } = parsed as { type?: unknown; payload?: any };

    if (type === "join") {
      if (!payload || typeof payload !== "object") return null;

      const { roomId, userId, username, avatarId } = payload as Record<string, unknown>;

      if (
        !isNonEmptyString(roomId, 64) ||
        !isNonEmptyString(userId, 64) ||
        !isNonEmptyString(username, 64)
      ) {
        return null;
      }

      if (avatarId != null && typeof avatarId !== "string") {
        return null;
      }

      return {
        type: "join",
        payload: {
          roomId,
          userId,
          username,
          avatarId: avatarId ?? undefined,
        },
      };
    }

    if (type === "chat") {
      if (!payload || typeof payload !== "object") return null;

      const { message, userId, username, avatarId } = payload as Record<string, unknown>;

      if (!isNonEmptyString(message, 10_000)) return null;
      if (!isNonEmptyString(userId, 64) || !isNonEmptyString(username, 64)) return null;
      if (avatarId != null && typeof avatarId !== "string") return null;

      return {
        type: "chat",
        payload: {
          message,
          userId,
          username,
          avatarId: avatarId ?? undefined,
        },
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function isOriginAllowed(originHeader: string | undefined): boolean {
  const allowed = process.env.ALLOWED_ORIGINS;

  if (!allowed || !allowed.trim()) {
    return true;
  }

  const origins = allowed
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  if (!originHeader) return false;

  return origins.includes(originHeader);
}

