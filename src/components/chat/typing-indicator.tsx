"use client";

import { motion } from "framer-motion";

export function TypingIndicator({ accent }: { accent: string }) {
  const dotColor =
    accent === "cyan"
      ? "bg-cyan-400"
      : accent === "rose"
        ? "bg-rose-400"
        : "bg-purple-400";

  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${dotColor}`}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
