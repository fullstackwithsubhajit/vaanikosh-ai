"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function AssistantBubble({ data = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-4"
    >
      {/* AI Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/15 border border-sky-500/20">
        <Bot size={20} className="text-sky-400" />
      </div>

      {/* Message */}
      <div className="max-w-[80%] rounded-3xl rounded-tl-lg border border-white/10 bg-[#1B2233] px-5 py-4 shadow-lg">
        <p className="text-[15px] leading-relaxed text-white">
          {data.text}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          {data.time || "Now"}
        </p>
      </div>
    </motion.div>
  );
}