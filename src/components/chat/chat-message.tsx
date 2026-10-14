"use client";

import { ChatMessage as ChatMessageType, ChoumuPersona } from "@/types/chat";
import { ChoumuAvatar } from "@/components/choumu/choumu-avatar";
import { Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
  persona: ChoumuPersona;
  onRegenerate?: () => void;
}

const borderAccent: Record<string, string> = {
  cyan: "border-l-cyan-500/30",
  rose: "border-l-rose-500/30",
  purple: "border-l-purple-500/30",
};

export function ChatMessage({
  message,
  persona,
  onRegenerate,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-4"
      >
        <div className="max-w-[75%] bg-purple-600/20 border border-purple-500/20 rounded-2xl rounded-br-md px-4 py-3">
          <p className="text-sm text-zinc-100 whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 mb-4"
    >
      <ChoumuAvatar
        src={persona.avatar}
        alt={persona.name}
        size="sm"
        accent={persona.accent}
        focalPoint={persona.avatarPosition}
        className="mt-1 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-500 mb-1.5 font-medium">
          {persona.name}
        </p>
        <div
          className={`bg-zinc-800/40 border border-zinc-700/40 border-l-2 ${borderAccent[persona.accent] ?? borderAccent.purple} rounded-2xl rounded-tl-md px-4 py-3 backdrop-blur-sm`}
        >
          <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 mt-1.5 ml-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
            aria-label="Copy message"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copied && (
            <span className="text-xs text-zinc-500">Copied!</span>
          )}
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
              aria-label="Regenerate response"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
            aria-label="Like response"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
            aria-label="Dislike response"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
