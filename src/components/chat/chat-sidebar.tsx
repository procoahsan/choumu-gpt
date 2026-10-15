"use client";

import { PersonaId, ChoumuPersona } from "@/types/chat";
import { PERSONA_LIST } from "@/lib/choumus";
import { ChoumuAvatar } from "@/components/choumu/choumu-avatar";
import {
  BrainCircuit,
  BookOpenText,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ChatSidebarProps {
  currentPersonaId: PersonaId;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const choumuStories: Record<PersonaId, string> = {
  parizaad:
    "Once an Advanced AI lecturer, now on a lifelong mission to explain every modern idea through one heroic vacuum cleaner. His route to Khanna Pull is still under review.",
  laeeq:
    "Laeeq found a voice assistant, a cup of chai, and a microphone. Since then, every practical question has somehow become a dramatic conversation with an optional biscuit.",
  niazi:
    "Niazi has survived countless literature reviews and keeps a mysterious folder of old templates. He believes every research gap can be discussed over tea - citations first.",
};

export function ChatSidebar({
  currentPersonaId,
  onNewChat,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative z-50 lg:z-0 top-0 left-0 h-full w-[280px] bg-[#0c0414] border-r border-zinc-800/50 flex flex-col transition-transform duration-300 lg:translate-x-0 shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <span className="font-bold text-sm text-white">ChoumuGPT</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New chat button */}
        <div className="px-3 pt-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-700/50 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Choumu Chat
          </button>
        </div>

        {/* Persona selection */}
        <div className="px-3 pt-5">
          <h3 className="text-xs font-medium text-zinc-600 uppercase tracking-wider px-2 mb-2">
            Your Choumus
          </h3>
          <nav className="space-y-1">
            {PERSONA_LIST.map((p: ChoumuPersona) => (
              <Link
                key={p.id}
                href={`/chat/${p.id}`}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-colors",
                  currentPersonaId === p.id
                    ? "bg-zinc-800/60 text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"
                )}
              >
                <ChoumuAvatar
                  src={p.avatar}
                  alt={p.name}
                  size="sm"
                  accent={p.accent}
                  focalPoint={p.avatarPosition}
                />
                <span className="truncate">
                  {p.name.replace("Dr. ", "").replace(" Choumu", "")}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Persona stories */}
        <div className="px-3 pt-5 flex-1 min-h-0 overflow-y-auto">
          <h3 className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 uppercase tracking-wider px-2 mb-2">
            <BookOpenText className="w-3.5 h-3.5" />
            Choumu Stories
          </h3>
          <div className="space-y-2">
            {PERSONA_LIST.map((persona) => (
              <article
                key={persona.id}
                className={cn(
                  "rounded-xl border p-3 transition-colors",
                  currentPersonaId === persona.id
                    ? "border-zinc-700/70 bg-zinc-800/40"
                    : "border-zinc-800/60 bg-zinc-900/20"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <ChoumuAvatar
                    src={persona.avatar}
                    alt={persona.name}
                    size="sm"
                    accent={persona.accent}
                    focalPoint={persona.avatarPosition}
                  />
                  <p className="text-xs font-medium text-zinc-300">
                    {persona.name.replace("Dr. ", "").replace(" Choumu", "")}
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-zinc-500">
                  {choumuStories[persona.id]}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-zinc-800/50 space-y-3">
          <p className="text-[10px] text-zinc-600 leading-relaxed">
            AI parody characters.
            <br />
            Responses are fictional.
          </p>
          <button
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </button>
        </div>
      </aside>
    </>
  );
}
