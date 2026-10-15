"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChoumuPersona, ChatMessage } from "@/types/chat";
import { sendMessage } from "@/lib/ai";
import { ChatHeader } from "./chat-header";
import { ChatSidebar } from "./chat-sidebar";
import { ChatComposer } from "./chat-composer";
import { MessageList } from "./message-list";
import { EmptyChat } from "./empty-chat";
import { Menu } from "lucide-react";

interface ChatLayoutProps {
  persona: ChoumuPersona;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const STORAGE_KEY_PREFIX = "choumugpt-chat-";

function readStoredMessages(personaId: string): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + personaId);
    return stored
      ? JSON.parse(stored).map((message: ChatMessage) => ({
          ...message,
          createdAt: new Date(message.createdAt),
        }))
      : [];
  } catch {
    return [];
  }
}

export function ChatLayout({ persona }: ChatLayoutProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const loadMessages = window.setTimeout(() => {
      setMessages(readStoredMessages(persona.id));
    }, 0);

    return () => window.clearTimeout(loadMessages);
  }, [persona.id]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        STORAGE_KEY_PREFIX + persona.id,
        JSON.stringify(messages)
      );
    }
  }, [messages, persona.id]);

  const handleSend = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content,
        createdAt: new Date(),
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);

      try {
        const reply = await sendMessage({
          personaId: persona.id,
          messages: newMessages,
          systemPrompt: persona.systemPrompt,
        });

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: reply,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: "Even the Choumu got confused. Try again?",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, persona]
  );

  const handleRegenerate = useCallback(
    async (messageIndex: number) => {
      // Keep the user prompt that produced the answer. Previously this removed
      // it, so regeneration could answer an older, unrelated question.
      const messagesUpToRegenerate = messages.slice(0, messageIndex + 1);
      setMessages(messagesUpToRegenerate);
      setIsLoading(true);

      try {
        const reply = await sendMessage({
          personaId: persona.id,
          messages: messagesUpToRegenerate,
          systemPrompt: persona.systemPrompt,
        });

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: reply,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: "Even the Choumu got confused. Try again?",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, persona]
  );

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY_PREFIX + persona.id);
  };

  const handleNewChat = () => {
    handleReset();
  };

  const handleSwitchChoumu = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-[#0c0414] text-white overflow-hidden">
      <ChatSidebar
        currentPersonaId={persona.id}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile menu button */}
        <div className="lg:hidden absolute top-3 left-3 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <ChatHeader
          persona={persona}
          onReset={handleReset}
          onSwitchChoumu={handleSwitchChoumu}
        />

        {messages.length === 0 && !isLoading ? (
          <EmptyChat persona={persona} onPromptClick={handleSend} />
        ) : (
          <MessageList
            messages={messages}
            persona={persona}
            isLoading={isLoading}
            onRegenerate={handleRegenerate}
          />
        )}

        <ChatComposer
          placeholder={persona.placeholder}
          onSend={handleSend}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
