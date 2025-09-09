export type AvatarId =
  | "night-sky"
  | "neon-pulse"
  | "ember-glow"
  | "deep-ocean"
  | "slate"
  | "rose"
  | "indigo"
  | "teal";

export interface AvatarConfig {
  id: AvatarId;
  label: string;
  bgClass: string;
}

export const AVATARS: AvatarConfig[] = [
  { id: "night-sky", label: "Night Sky", bgClass: "bg-slate-700" },
  { id: "neon-pulse", label: "Neon Pulse", bgClass: "bg-purple-700" },
  { id: "ember-glow", label: "Ember Glow", bgClass: "bg-amber-700" },
  { id: "deep-ocean", label: "Deep Ocean", bgClass: "bg-emerald-700" },
  { id: "slate", label: "Slate", bgClass: "bg-slate-600" },
  { id: "rose", label: "Rose", bgClass: "bg-rose-700" },
  { id: "indigo", label: "Indigo", bgClass: "bg-indigo-700" },
  { id: "teal", label: "Teal", bgClass: "bg-teal-700" },
];

export const getAvatarById = (id: string | null | undefined): AvatarConfig | undefined => {
  if (!id) return undefined;
  return AVATARS.find((avatar) => avatar.id === id);
};

const USER_PROFILE_KEY = "chat-ws:user-profile";

export interface UserProfile {
  name: string;
  avatarId: AvatarId;
}

export const loadUserProfile = (): UserProfile | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(USER_PROFILE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as Partial<UserProfile>;
    if (!parsed.name || !parsed.avatarId) return null;

    const avatarExists = AVATARS.some((avatar) => avatar.id === parsed.avatarId);
    if (!avatarExists) return null;

    return {
      name: parsed.name,
      avatarId: parsed.avatarId,
    };
  } catch {
    return null;
  }
};

export const saveUserProfile = (profile: UserProfile): void => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};

