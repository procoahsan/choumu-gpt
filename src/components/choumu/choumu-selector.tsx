"use client";

import { useRouter } from "next/navigation";
import { PERSONA_LIST } from "@/lib/choumus";
import { ChoumuCard } from "./choumu-card";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export function ChoumuSelector() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("choumugpt-persona", id);
    }
    router.push(`/chat/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0c0414] text-white flex flex-col relative overflow-x-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40rem] -right-[30rem] rotate-[-20deg] skew-x-[-40deg] opacity-30 blur-[6rem] flex gap-40">
          <div className="w-40 h-80 bg-gradient-to-b from-white/80 to-cyan-300" />
          <div className="w-40 h-80 bg-gradient-to-b from-white/80 to-purple-400" />
          <div className="w-40 h-80 bg-gradient-to-b from-white/80 to-rose-300" />
        </div>
        <div className="absolute -bottom-[30rem] -left-[20rem] rotate-[15deg] skew-x-[20deg] opacity-20 blur-[6rem] flex gap-32">
          <div className="w-40 h-80 bg-gradient-to-t from-purple-600 to-transparent" />
          <div className="w-40 h-80 bg-gradient-to-t from-cyan-600 to-transparent" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-bold text-lg">ChoumuGPT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-700/50">
            Powered by questionable intelligence
          </span>
        </div>
      </header>

      {/* Hero content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <span className="text-sm text-zinc-400 bg-zinc-800/60 px-4 py-2 rounded-full border border-zinc-700/50 backdrop-blur-sm">
            🧠 Three personalities. Zero guarantees.
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight"
        >
          Choose your{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Choumu.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-zinc-400 text-center mb-2 max-w-lg"
        >
          Three personalities. One questionable AI experience.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-zinc-500 text-center mb-12 max-w-md"
        >
          Pick your AI personality and experience a completely different
          conversation every time.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {PERSONA_LIST.map((persona, i) => (
            <ChoumuCard
              key={persona.id}
              persona={persona}
              onSelect={handleSelect}
              index={i}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-zinc-600 text-center mt-12"
        >
          Parody AI characters. Responses are fictional and generated for
          entertainment.
        </motion.p>
      </main>
    </div>
  );
}
