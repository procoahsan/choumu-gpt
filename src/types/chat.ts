export type PersonaId = "parizaad" | "laeeq" | "niazi";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface ChoumuPersona {
  id: PersonaId;
  name: string;
  subtitle: string;
  disclaimer?: string;
  description: string;
  avatar: string;
  avatarPosition?: string;
  tags: string[];
  greeting: string;
  placeholder: string;
  suggestedPrompts: string[];
  systemPrompt: string;
  accent: string;
  accentGlow: string;
  loadingMessage: string;
  icon: string;
}

export interface ChatSession {
  id: string;
  personaId: PersonaId;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
