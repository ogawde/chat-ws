import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopographyBackground } from "./ui/topography";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Switch } from "./ui/switch";
import { useApp } from "../context/app-context";
import TextAnimate from "./ui/text-animate";
import AnimatedTypingMotion from "./shadcn-space/animated-text/animated-text-03";
import { AVATARS } from "../lib/avatars";
import { UsernamePrompt } from "./UsernamePrompt";

const ROOM_STYLES: Record<
  string,
  {
    overlay: string;
    button: string;
    cardBgDark: string;
    cardBgLight: string;
    border: string;
    shadow: string;
    hoverShadow: string;
    ring: string;
  }
> = {
  rooftop: {
    overlay: "from-cyan-400/60 via-cyan-400/10",
    button: "bg-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.85)]",
    cardBgDark: "bg-gradient-to-br from-cyan-400/15 via-slate-950/80 to-cyan-300/10",
    cardBgLight: "bg-gradient-to-br from-cyan-400/10 via-white/80 to-cyan-300/5",
    border: "border-cyan-300/40",
    shadow: "shadow-[0_0_35px_rgba(34,211,238,0.5)]",
    hoverShadow: "0 0 55px rgba(34,211,238,0.85)",
    ring: "focus-visible:ring-cyan-300",
  },
  cafe: {
    overlay: "from-amber-400/60 via-amber-400/10",
    button: "bg-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.85)]",
    cardBgDark: "bg-gradient-to-br from-amber-400/15 via-slate-950/80 to-amber-300/10",
    cardBgLight: "bg-gradient-to-br from-amber-400/10 via-white/80 to-amber-300/5",
    border: "border-amber-300/40",
    shadow: "shadow-[0_0_35px_rgba(251,191,36,0.5)]",
    hoverShadow: "0 0 55px rgba(251,191,36,0.85)",
    ring: "focus-visible:ring-amber-300",
  },
  underground: {
    overlay: "from-fuchsia-400/60 via-fuchsia-400/10",
    button: "bg-fuchsia-400 shadow-[0_0_28px_rgba(232,121,249,0.85)]",
    cardBgDark: "bg-gradient-to-br from-fuchsia-400/15 via-slate-950/80 to-fuchsia-300/10",
    cardBgLight: "bg-gradient-to-br from-fuchsia-400/10 via-white/80 to-fuchsia-300/5",
    border: "border-fuchsia-300/40",
    shadow: "shadow-[0_0_35px_rgba(232,121,249,0.5)]",
    hoverShadow: "0 0 55px rgba(232,121,249,0.85)",
    ring: "focus-visible:ring-fuchsia-300",
  },
  plaza: {
    overlay: "from-emerald-400/60 via-emerald-400/10",
    button: "bg-emerald-400 shadow-[0_0_28px_rgba(16,185,129,0.85)]",
    cardBgDark: "bg-gradient-to-br from-emerald-400/15 via-slate-950/80 to-emerald-300/10",
    cardBgLight: "bg-gradient-to-br from-emerald-400/10 via-white/80 to-emerald-300/5",
    border: "border-emerald-300/40",
    shadow: "shadow-[0_0_35px_rgba(16,185,129,0.5)]",
    hoverShadow: "0 0 55px rgba(16,185,129,0.85)",
    ring: "focus-visible:ring-emerald-300",
  },
};

interface RoomSelectionProps {}

export const RoomSelection = (_props: RoomSelectionProps) => {
  const navigate = useNavigate();
  const { rooms, username, avatarId, saveProfile } = useApp();
  const [isDark, setIsDark] = useState(true);
  const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);
  const [isUsernamePromptOpen, setIsUsernamePromptOpen] = useState(false);

  const openUsernamePrompt = (roomId: string) => {
    setPendingRoomId(roomId);
    setIsUsernamePromptOpen(true);
  };

  const closeUsernamePrompt = () => {
    setIsUsernamePromptOpen(false);
    setPendingRoomId(null);
  };

  const handleJoinRoom = (roomId: string) => {
    if (!username.trim() || !avatarId) {
      openUsernamePrompt(roomId);
      return;
    }

    navigate(`/room/${roomId}`);
  };

  const handleUsernameConfirm = (name: string) => {
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    saveProfile({ name, avatarId: randomAvatar.id });

    const targetRoomId = pendingRoomId;
    closeUsernamePrompt();

    if (!targetRoomId) return;

    navigate(`/room/${targetRoomId}`);
  };

  const backgroundColor = isDark ? "#020617" : "#f9fafb";
  const lineColor = isDark ? "rgba(148, 163, 184, 0.35)" : "rgba(15, 23, 42, 0.25)";

  return (
    <TopographyBackground
      backgroundColor={backgroundColor}
      lineColor={lineColor}
      strokeWidth={1.2}
      lineCount={22}
    >
      <div
        className={cn(
          "min-h-screen flex items-center justify-center px-4 py-12",
          isDark ? "text-white" : "text-slate-900",
        )}
      >
        <UsernamePrompt
          isOpen={isUsernamePromptOpen}
          initialName={username}
          onConfirm={handleUsernameConfirm}
        />

        <div className="w-full max-w-5xl mx-auto">
          <div className="fixed right-6 top-6 z-20 flex items-center gap-2 text-xs md:text-sm">
            <span
              className={cn(
                "uppercase tracking-[0.18em]",
                isDark ? "text-slate-300" : "text-slate-600",
              )}
            >
              {isDark ? "Dark" : "Light"}
            </span>
            <Switch
              size="default"
              checked={!isDark}
              onCheckedChange={(checked) => setIsDark(!checked ? true : false)}
            />
          </div>

          <div className="mb-12 w-full text-center">
            <div className="flex flex-col items-center w-full">
              <TextAnimate
                text="YAPP!"
                type="whipInUp"
                as="h1"
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight md:tracking-[-0.06em]"
              />
            </div>
            <div
              className={cn(
                "mt-4 w-full flex justify-center min-h-[5.5rem] md:min-h-[6rem]",
                isDark ? "text-slate-300" : "text-slate-600",
              )}
            >
              <AnimatedTypingMotion
                words={[
                  "Every great night starts with one question — where do you actually want to be? Pick your vibe, find your people, and let the city do the rest.",
                ]}
                typeOnce
                className={cn(
                  "font-normal text-sm leading-relaxed md:text-base lg:text-lg",
                  isDark ? "text-slate-300" : "text-slate-600",
                )}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-stretch gap-6 md:mt-6 md:flex-row md:items-stretch md:justify-center">
            {rooms.map((room) => {
              const styles = ROOM_STYLES[room.id] ?? ROOM_STYLES.plaza;
              const cardBg = isDark ? styles.cardBgDark : styles.cardBgLight;

              return (
                <motion.button
                  key={room.id}
                  onClick={() => handleJoinRoom(room.id)}
                  className={cn(
                    "group relative flex w-full max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border px-6 py-7 text-left backdrop-blur-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:max-w-xs lg:max-w-sm md:px-7 md:py-8 min-h-[19rem]",
                    cardBg,
                    styles.border,
                    styles.shadow,
                    styles.ring,
                  )}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    boxShadow: styles.hoverShadow,
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.8 }}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 -z-10 scale-75 rounded-2xl bg-gradient-to-br to-transparent opacity-0 blur-2xl transition-all duration-300 group-hover:scale-105 group-hover:opacity-80",
                      styles.overlay,
                    )}
                  />

                  <div className="space-y-2 flex-1 flex flex-col min-h-0">
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl shrink-0">
                      {room.name}
                    </h3>
                    <p
                      className={cn(
                        "text-xs md:text-sm lg:text-base flex-1 min-h-0",
                        isDark ? "text-slate-300/90" : "text-slate-600",
                      )}
                    >
                      {room.description ?? "A different corner of the city to match your current mood."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <motion.div
                      className={cn(
                        "inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold tracking-wide text-slate-950 md:text-sm",
                        styles.button,
                      )}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      YAP!
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </TopographyBackground>
  );
};
