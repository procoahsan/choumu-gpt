"use client";

import { ChoumuPersona } from "@/types/chat";
import { ChoumuAvatar } from "@/components/choumu/choumu-avatar";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface EmptyChatProps {
  persona: ChoumuPersona;
  onPromptClick: (prompt: string) => void;
}

const accentText: Record<string, string> = {
  cyan: "text-cyan-400",
  rose: "text-rose-400",
  purple: "text-purple-400",
};

const promptHover: Record<string, string> = {
  cyan: "hover:border-cyan-500/40 hover:bg-cyan-500/5",
  rose: "hover:border-rose-500/40 hover:bg-rose-500/5",
  purple: "hover:border-purple-500/40 hover:bg-purple-500/5",
};

export function EmptyChat({ persona, onPromptClick }: EmptyChatProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center max-w-lg"
      >
        <ChoumuAvatar
          src={persona.avatar}
          alt={persona.name}
          size="xl"
          accent={persona.accent}
          focalPoint={persona.avatarPosition}
          className="mb-5"
        />

        <h2 className="text-xl font-semibold text-white mb-2">
          {persona.name}
        </h2>

        <p
          className={`text-sm ${accentText[persona.accent] ?? "text-purple-400"} mb-6 max-w-sm`}
        >
          &quot;{persona.greeting}&quot;
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
          {persona.suggestedPrompts.map((prompt, i) => (
            <motion.button
              key={prompt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => onPromptClick(prompt)}
              className={`text-left text-sm text-zinc-300 px-4 py-3 rounded-xl border border-zinc-700/50 bg-zinc-800/30 backdrop-blur-sm transition-all duration-200 ${promptHover[persona.accent] ?? promptHover.purple}`}
            >
              <Sparkles className="w-3.5 h-3.5 inline-block mr-2 opacity-50" />
              {prompt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
