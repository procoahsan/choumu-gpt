"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, Sparkles, SendHorizonal } from "lucide-react";

interface ChatComposerProps {
  placeholder: string;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatComposer({
  placeholder,
  onSend,
  disabled = false,
}: ChatComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-[#0c0414] via-[#0c0414] to-transparent pt-6 pb-4 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-[#15101e] border border-zinc-700/50 rounded-2xl backdrop-blur-sm">
          <div className="flex items-end gap-2 px-4 py-3">
            <button
              className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
              aria-label="Attach file"
              type="button"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
              aria-label="AI suggestions"
              type="button"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 outline-none resize-none max-h-40 py-2"
            />

            <button
              onClick={handleSend}
              disabled={disabled || !value.trim()}
              className="p-2 rounded-xl bg-purple-500 text-white hover:bg-purple-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
              type="button"
            >
              <SendHorizonal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-2">
          ChoumuGPT can make things up. Especially these Choumus.
        </p>
      </div>
    </div>
  );
}
