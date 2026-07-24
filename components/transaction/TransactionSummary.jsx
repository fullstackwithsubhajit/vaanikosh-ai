"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function TransactionSummary({ data = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3 rounded-3xl border border-white/10 bg-[#1B2233] p-6 shadow-xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-sky-500/15 p-2">
          <ArrowUpRight className="h-5 w-5 text-sky-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Transaction Summary
          </h3>

          <p className="text-sm text-gray-400">
            Please review before continuing.
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">

        <Row
          label="Recipient"
          value={data.recipient}
        />

        <Row
          label="Amount"
          value={`₹${data.amount}`}
        />

        <Row
          label="Bank"
          value={data.bank}
        />

        <Row
          label="Purpose"
          value={data.note}
        />

      </div>
    </motion.div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="font-medium text-white">
        {value || "-"}
      </span>
    </div>
  );
}