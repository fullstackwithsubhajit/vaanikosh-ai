"use client";

import { motion } from "framer-motion";

export default function UserBubble({ data = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] rounded-3xl rounded-br-lg bg-gradient-to-br from-sky-500 to-blue-600 px-5 py-4 shadow-lg">
        <p className="text-white text-[15px] leading-relaxed">
          {data.text}
        </p>

        <p className="mt-2 text-right text-[11px] text-sky-100/70">
          {data.time || "Now"}
        </p>
      </div>
    </motion.div>
  );
}