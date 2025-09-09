'use client';

import { useState, useEffect } from "react";
import { AVATARS, type AvatarId, type UserProfile } from "../lib/avatars";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AvatarProfileModalProps {
  isOpen: boolean;
  initialProfile: UserProfile | null;
  fallbackName: string;
  onSave: (profile: UserProfile) => void;
}

export const AvatarProfileModal = ({
  isOpen,
  initialProfile,
  fallbackName,
  onSave,
}: AvatarProfileModalProps) => {
  const [name, setName] = useState(fallbackName);
  const [selectedAvatarId, setSelectedAvatarId] = useState<AvatarId | null>(null);

  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name);
      setSelectedAvatarId(initialProfile.avatarId);
    } else {
      setName(fallbackName);
      setSelectedAvatarId(null);
    }
  }, [initialProfile, fallbackName]);

  if (!isOpen) return null;

  const canSave = Boolean(name.trim() && selectedAvatarId);

  const handleSave = () => {
    if (!canSave || !selectedAvatarId) return;

    onSave({
      name: name.trim(),
      avatarId: selectedAvatarId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-gray-800 bg-gray-950 p-6 shadow-xl">
        <h2 className="mb-2 text-2xl font-semibold text-white text-center">Set up your vibe</h2>
        <p className="mb-6 text-sm text-gray-400 text-center">
          Choose an avatar and name. Others will see this next to your messages.
        </p>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Display name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your chat name"
            className="bg-black border-gray-700 text-white placeholder:text-gray-600"
          />
          <p className="mt-1 text-xs text-gray-500">
            You can use any nickname. This is what everyone will see.
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium text-gray-300">
            Choose an avatar
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AVATARS.map((avatar) => {
              const isSelected = selectedAvatarId === avatar.id;

              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatarId(avatar.id)}
                  className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-3 transition
                    ${isSelected ? "border-blue-500 bg-blue-500/10" : "border-gray-800 bg-black/40 hover:border-gray-700"}
                  `}
                >
                  <div
                    className={`h-10 w-10 rounded-full ${avatar.bgClass}`}
                  />
                  <span className="text-xs text-gray-300">{avatar.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="bg-blue-600 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save &amp; Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

