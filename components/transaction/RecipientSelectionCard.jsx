"use client";

import { User, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecipientSelectionCard({
  data,
  onSelect,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#111827] p-5"
    >
      <h3 className="text-lg font-semibold text-white">
        Multiple recipients found
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Choose the recipient you want to continue with.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {data.options.map((recipient) => (
          <button
            key={recipient.id}
            onClick={() => onSelect?.(recipient)}
            className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 p-4 transition hover:border-sky-500 hover:bg-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-sky-500/20 p-3">
                <User className="text-sky-400" size={22} />
              </div>

              <div className="text-left">
                <h4 className="font-medium text-white">
                  {recipient.name}
                </h4>

                <p className="text-sm text-slate-400">
                  {recipient.bank}
                </p>

                <p className="text-xs text-slate-500">
                  {recipient.previousTransactions} previous transactions
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-slate-400"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}