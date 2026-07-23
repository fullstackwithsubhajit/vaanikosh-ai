"use client";

import { motion } from "framer-motion";

export default function VoiceWave({
  status = "ready",
}) {
  const active =
    status === "listening" ||
    status === "thinking" ||
    status === "analyzing" ||
    status === "speaking";

  return (
    <div className="flex items-end justify-center gap-2 h-16 mt-8">
      {[18, 32, 48, 32, 18].map((height, index) => (
        <motion.div
          key={index}
          className={`w-2 rounded-full ${
            active ? "bg-sky-400" : "bg-slate-700"
          }`}
          animate={
            active
              ? {
                  height: [
                    height,
                    height + 18,
                    height - 8,
                    height + 12,
                    height,
                  ],
                }
              : {
                  height: 10,
                }
          }
          transition={{
            duration: 0.9,
            repeat: active ? Infinity : 0,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}