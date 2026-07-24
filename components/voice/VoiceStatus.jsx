"use client";

import { motion, AnimatePresence } from "framer-motion";

const STATUS = {
  ready: {
    text: "Tap the microphone to start",
    color: "text-slate-400",
  },
  listening: {
    text: "Listening...",
    color: "text-sky-400",
  },
  thinking: {
    text: "Thinking...",
    color: "text-yellow-400",
  },
  analyzing: {
    text: "Analyzing transaction...",
    color: "text-violet-400",
  },
  speaking: {
    text: "Speaking...",
    color: "text-emerald-400",
  },
  error: {
    text: "Something went wrong",
    color: "text-red-400",
  },
};

export default function VoiceStatus({ status = "ready" }) {
  const current = STATUS[status] || STATUS.ready;

  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`text-sm font-medium tracking-wide ${current.color}`}
        >
          {current.text}
        </motion.p>
      </AnimatePresence>

      {(status === "listening" ||
        status === "thinking" ||
        status === "analyzing" ||
        status === "speaking") && (
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-sky-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}