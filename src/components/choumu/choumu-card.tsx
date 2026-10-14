"use client";

import { ChoumuPersona } from "@/types/chat";
import { ChoumuAvatar } from "./choumu-avatar";
import { BrainCircuit, Coffee, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface ChoumuCardProps {
  persona: ChoumuPersona;
  onSelect: (id: string) => void;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
};

const accentClasses: Record<string, { border: string; bg: string; text: string; glow: string; btn: string; tag: string }> = {
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-400/40",
    bg: "bg-cyan-500/5",
    text: "text-cyan-400",
    glow: "hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.3)]",
    btn: "bg-cyan-500 hover:bg-cyan-400 text-black",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  rose: {
    border: "border-rose-500/20 hover:border-rose-400/40",
    bg: "bg-rose-500/5",
    text: "text-rose-400",
    glow: "hover:shadow-[0_0_60px_-15px_rgba(244,63,94,0.3)]",
    btn: "bg-rose-500 hover:bg-rose-400 text-white",
    tag: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },
  purple: {
    border: "border-purple-500/20 hover:border-purple-400/40",
    bg: "bg-purple-500/5",
    text: "text-purple-400",
    glow: "hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.3)]",
    btn: "bg-purple-500 hover:bg-purple-400 text-white",
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
};

export function ChoumuCard({ persona, onSelect, index }: ChoumuCardProps) {
  const colors = accentClasses[persona.accent] ?? accentClasses.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div
        className={`relative rounded-2xl border ${colors.border} ${colors.bg} ${colors.glow} backdrop-blur-sm p-6 transition-all duration-300 cursor-pointer flex flex-col h-full`}
        onClick={() => onSelect(persona.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(persona.id);
          }
        }}
        aria-label={`Chat with ${persona.name}`}
      >
        {/* Avatar & Icon */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChoumuAvatar
              src={persona.avatar}
              alt={persona.name}
              size="lg"
              accent={persona.accent}
              focalPoint={persona.avatarPosition}
            />
          </motion.div>
          <span className={`${colors.text} opacity-60`}>
            {iconMap[persona.icon]}
          </span>
        </div>

        {/* Name & Subtitle */}
        <h3 className="text-lg font-semibold text-white mb-1">
          {persona.name}
        </h3>
        <p className={`text-sm ${colors.text} mb-1`}>{persona.subtitle}</p>
        {persona.disclaimer && (
          <p className="text-xs text-zinc-500 mb-3 italic">
            {persona.disclaimer}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {persona.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-2.5 py-1 rounded-full border ${colors.tag}`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
          {persona.description}
        </p>

        {/* CTA */}
        <button
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${colors.btn} hover:shadow-lg`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(persona.id);
          }}
        >
          Chat with {persona.name.split(" ")[0] === "Dr." ? persona.name.split(" ").slice(0, 2).join(" ") : persona.name.split(" ")[0]}
        </button>
      </div>
    </motion.div>
  );
}
