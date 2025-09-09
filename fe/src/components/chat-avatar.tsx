import { getAvatarById } from "../lib/avatars";

interface ChatAvatarProps {
  avatarId?: string;
  align: "left" | "right";
}

export const ChatAvatar = ({ avatarId, align }: ChatAvatarProps) => {
  const avatarConfig = getAvatarById(avatarId);
  const bgClass = avatarConfig?.bgClass ?? "bg-gray-700";

  return (
    <div
      className={`h-8 w-8 shrink-0 rounded-full ${bgClass} ${
        align === "right" ? "ml-2" : "mr-2"
      }`}
    />
  );
};

