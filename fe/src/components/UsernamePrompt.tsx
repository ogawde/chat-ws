'use client';

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { generateUsername } from "../utils/usernameGenerator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface UsernamePromptProps {
  isOpen: boolean;
  initialName: string;
  onConfirm: (name: string) => void;
}

export const UsernamePrompt = ({
  isOpen,
  initialName,
  onConfirm,
}: UsernamePromptProps) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (isOpen) {
      setName(initialName || generateUsername());
    }
  }, [initialName, isOpen]);

  const handleRandom = () => {
    setName(generateUsername());
  };

  const handleOk = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-sm border-slate-700 bg-slate-950/95 text-white"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg">Pick a username</DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            This is what others will see next to your messages.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type a name or generate one"
            className="bg-black/60 border-slate-700 text-white placeholder:text-slate-600"
          />

          <div className="flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleRandom}
              className="flex-1 border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
            >
              Random
            </Button>
            <Button
              type="button"
              onClick={handleOk}
              disabled={!name.trim()}
              className="flex-1 bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              OK
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

