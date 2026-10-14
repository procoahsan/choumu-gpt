"use client";

import { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType, ChoumuPersona } from "@/types/chat";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";
import { ChoumuAvatar } from "@/components/choumu/choumu-avatar";

interface MessageListProps {
  messages: ChatMessageType[];
  persona: ChoumuPersona;
  isLoading: boolean;
  onRegenerate: (messageIndex: number) => void;
}

export function MessageList({
  messages,
  persona,
  isLoading,
  onRegenerate,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            persona={persona}
            onRegenerate={
              msg.role === "assistant" && i === messages.length - 1
                ? () => onRegenerate(i)
                : undefined
            }
          />
        ))}

        {isLoading && (
          <div className="flex gap-3 mb-4">
            <ChoumuAvatar
              src={persona.avatar}
              alt={persona.name}
              size="sm"
              accent={persona.accent}
              focalPoint={persona.avatarPosition}
              className="mt-1"
            />
            <div>
              <p className="text-xs text-zinc-500 mb-1.5 font-medium">
                {persona.name}
              </p>
              <div className="bg-zinc-800/40 border border-zinc-700/40 rounded-2xl rounded-tl-md px-4 py-3 backdrop-blur-sm">
                <TypingIndicator accent={persona.accent} />
                <p className="text-xs text-zinc-600 mt-1">
                  {persona.loadingMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
