import { NextRequest, NextResponse } from "next/server";
import { getMockReply } from "@/lib/mock-ai";
import { PERSONAS } from "@/lib/choumus";
import { PersonaId } from "@/types/chat";

const personaIds = new Set<PersonaId>(["parizaad", "laeeq", "niazi"]);

const explicitRequestPattern =
  /\b(sex|sexy|nudes?|naked|porn|xxx|onlyfans|blowjob|dick|pussy|boobs?|breasts?|horny|hookup|chudai|nangi)\b/i;

type ProviderMessage = {
  role: "user" | "assistant";
  content: string;
};

type OpenRouterContent = string | Array<{ type?: string; text?: string }>;

function removeBoldMarkers(content: string): string {
  return content.replaceAll("**", "").replaceAll("__", "");
}

function getResponseText(content: OpenRouterContent | undefined): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => part.text)
      .join("")
      .trim();
  }

  return "";
}

function getSafeRedirect(personaId: PersonaId): string {
  switch (personaId) {
    case "parizaad":
      return "Is direction mein main help nahi kar sakta. AI, paper implementation, ya search algorithms pooch lein; state, action, aur goal wali class abhi open hai.";
    case "laeeq":
      return "Fun mode on, but main conversation ko clean aur general-audience rakhta hoon ji. Chai, biscuits, Alexa, ya ek cheesy but harmless line try karein?";
    case "niazi":
      return "Main discussion ko respectful aur general-audience rakhta hoon. Research topic, assignment outline, ya citations le aayein; chai joke complimentary hai.";
  }
}

async function getOpenRouterReply(
  systemPrompt: string,
  messages: ProviderMessage[]
): Promise<string> {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "ChoumuGPT",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 450,
        temperature: 0.8,
      }),
      signal: AbortSignal.timeout(20_000),
    }
  );

  if (!response.ok) {
    throw new Error(`OpenRouter request failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: OpenRouterContent } }>;
  };
  const content = getResponseText(data.choices?.[0]?.message?.content);

  if (!content) {
    throw new Error("OpenRouter returned an empty response");
  }

  return removeBoldMarkers(content);
}

/**
 * POST /api/chat
 *
 * Expected body: { personaId: string, messages: { role: string, content: string }[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      personaId?: string;
      messages?: Array<{ role?: string; content?: string }>;
    };
    const { personaId, messages } = body;

    if (
      !personaId ||
      !personaIds.has(personaId as PersonaId) ||
      !Array.isArray(messages)
    ) {
      return NextResponse.json(
        { error: "A valid persona and messages array are required." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "user" && typeof message.content === "string"
      );

    if (!lastUserMessage?.content?.trim()) {
      return NextResponse.json(
        { error: "A user message is required." },
        { status: 400 }
      );
    }

    const selectedPersona = PERSONAS[personaId as PersonaId];

    if (explicitRequestPattern.test(lastUserMessage.content)) {
      return NextResponse.json({
        content: getSafeRedirect(personaId as PersonaId),
        provider: "safety-filter",
      });
    }

    const conversation = messages
      .filter(
        (message): message is ProviderMessage =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0
      )
      .map((message) => ({
        role: message.role,
        content: message.content.trim(),
      }));

    if (process.env.OPENROUTER_API_KEY) {
      try {
        return NextResponse.json({
          content: await getOpenRouterReply(
            selectedPersona.systemPrompt,
            conversation
          ),
          provider: "openrouter",
        });
      } catch (error) {
        console.error(
          "OpenRouter request failed; using local mock provider.",
          error instanceof Error ? error.message : error
        );
      }
    }

    // The app remains usable without an API key or a working network.
    await new Promise((resolve) => setTimeout(resolve, 700));

    return NextResponse.json({
      content: removeBoldMarkers(
        getMockReply(personaId as PersonaId, lastUserMessage.content)
      ),
      provider: "local-mock",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
