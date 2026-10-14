import { notFound } from "next/navigation";
import { PERSONAS } from "@/lib/choumus";
import { PersonaId } from "@/types/chat";
import { ChatLayout } from "@/components/chat/chat-layout";
import type { Metadata } from "next";

const validIds = new Set<string>(["parizaad", "laeeq", "niazi"]);

type Props = {
  params: Promise<{ choumuId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { choumuId } = await params;
  if (!validIds.has(choumuId)) {
    return { title: "Not Found — ChoumuGPT" };
  }
  const persona = PERSONAS[choumuId as PersonaId];
  return {
    title: `Chat with ${persona.name} — ChoumuGPT`,
    description: persona.description,
  };
}

export function generateStaticParams() {
  return [
    { choumuId: "parizaad" },
    { choumuId: "laeeq" },
    { choumuId: "niazi" },
  ];
}

export default async function ChatPage({ params }: Props) {
  const { choumuId } = await params;

  if (!validIds.has(choumuId)) {
    notFound();
  }

  const persona = PERSONAS[choumuId as PersonaId];

  return <ChatLayout key={persona.id} persona={persona} />;
}
