"use client";

import { ChoumuPersona, PersonaId } from "@/types/chat";
import { ChoumuAvatar } from "@/components/choumu/choumu-avatar";
import { RotateCcw, ArrowLeftRight, MoreHorizontal } from "lucide-react";

interface ChatHeaderProps {
  persona: ChoumuPersona;
  onReset: () => void;
  onSwitchChoumu: () => void;
}

const subtitleLabel: Record<PersonaId, string> = {
  parizaad: "Explaining AI since LEFT RIGHT SUCK",
  laeeq: "Chai, Alexa, aur unexpected questions",
  niazi: "PhD, assignments, aur chai networking",
};

export function ChatHeader({
  persona,
  onReset,
  onSwitchChoumu,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#0c0414]/80 backdrop-blur-md border-b border-zinc-800/50 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <ChoumuAvatar
          src={persona.avatar}
          alt={persona.name}
          size="md"
          accent={persona.accent}
          showStatus
          focalPoint={persona.avatarPosition}
        />
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white truncate">
            {persona.name}
          </h2>
          <p className="text-xs text-zinc-500 truncate">
            {subtitleLabel[persona.id]}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onReset}
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
          aria-label="Reset chat"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onSwitchChoumu}
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
          aria-label="Switch Choumu"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
