import { PersonaId, ChatMessage } from "@/types/chat";

export interface SendMessageOptions {
  personaId: PersonaId;
  messages: ChatMessage[];
  systemPrompt: string;
}

/**
 * Send a message through the server boundary. The shipped route uses the
 * free, local mock provider, so this remains fully usable without an API key.
 * A hosted provider can later replace the route implementation without
 * changing any UI code or exposing credentials to the browser.
 */
export async function sendMessage(
  options: SendMessageOptions
): Promise<string> {
  const { personaId, messages } = options;
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personaId,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to get response from AI");
  }

  const data = await res.json();
  if (typeof data.content !== "string") {
    throw new Error("Invalid response from AI provider");
  }

  return data.content;
}
