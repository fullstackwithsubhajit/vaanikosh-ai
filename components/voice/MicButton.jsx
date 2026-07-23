"use client";

import { Mic } from "lucide-react";
import { motion } from "framer-motion";

const statusStyles = {
  ready: {
    bg: "bg-sky-500",
    glow: "shadow-[0_0_0_8px_rgba(56,189,248,0.08),0_0_50px_rgba(56,189,248,0.18)]",
  },

  listening: {
    bg: "bg-red-500",
    glow: "shadow-[0_0_0_12px_rgba(239,68,68,0.15),0_0_70px_rgba(239,68,68,0.30)]",
  },

  thinking: {
    bg: "bg-violet-500",
    glow: "shadow-[0_0_0_10px_rgba(139,92,246,0.15),0_0_60px_rgba(139,92,246,0.25)]",
  },

  analyzing: {
    bg: "bg-amber-500",
    glow: "shadow-[0_0_0_10px_rgba(245,158,11,0.15),0_0_60px_rgba(245,158,11,0.25)]",
  },

  speaking: {
    bg: "bg-emerald-500",
    glow: "shadow-[0_0_0_10px_rgba(16,185,129,0.15),0_0_60px_rgba(16,185,129,0.25)]",
  },

  error: {
    bg: "bg-red-700",
    glow: "shadow-[0_0_0_10px_rgba(185,28,28,0.15),0_0_60px_rgba(185,28,28,0.25)]",
  },
};

export default function MicButton({
  status = "ready",
  onClick,
}) {
  const current = statusStyles[status] || statusStyles.ready;

  const animate =
    status === "listening"
      ? {
          scale: [1, 1.08, 1],
        }
      : status === "speaking"
      ? {
          scale: [1, 1.05, 1],
        }
      : {
          scale: 1,
        };

  return (
    <div className="flex justify-center items-center py-12">
      <motion.button
        type="button"
        aria-label="Voice Microphone"
        onClick={onClick}
        disabled={status === "thinking" || status === "analyzing"}
        animate={animate}
        transition={{
          duration: 1.5,
          repeat:
            status === "listening" || status === "speaking"
              ? Infinity
              : 0,
        }}
        whileHover={{
          scale: status === "ready" ? 1.05 : 1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className={`
          relative
          flex
          h-44
          w-44
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${current.bg}
          ${current.glow}
          disabled:cursor-not-allowed
          disabled:opacity-80
        `}
      >
        {/* Outer Ring */}
        <span className="absolute inset-0 rounded-full border-4 border-white/10" />

        {/* Mic Icon */}
        <Mic
          size={60}
          strokeWidth={2.5}
          className="text-slate-900"
        />
      </motion.button>
    </div>
  );
}