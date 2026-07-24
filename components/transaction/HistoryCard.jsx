"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function HistoryCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#111827] p-6"
    >
      <h2 className="text-xl font-semibold text-white">
        Recent Transactions
      </h2>

      <div className="mt-5 flex flex-col gap-3">
        {data.transactions.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between rounded-2xl bg-slate-900 p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`rounded-full p-3 ${
                  txn.type === "credit"
                    ? "bg-emerald-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {txn.type === "credit" ? (
                  <ArrowDownLeft
                    size={20}
                    className="text-emerald-400"
                  />
                ) : (
                  <ArrowUpRight
                    size={20}
                    className="text-red-400"
                  />
                )}
              </div>

              <div>
                <h3 className="font-medium text-white">
                  {txn.name}
                </h3>

                <p className="text-sm text-slate-400">
                  {txn.date}
                </p>
              </div>
            </div>

            <div className="text-right">
              <h3
                className={`font-semibold ${
                  txn.type === "credit"
                    ? "text-emerald-400"
                    : "text-white"
                }`}
              >
                {txn.type === "credit" ? "+" : "-"}₹
                {txn.amount}
              </h3>

              <p className="text-xs text-slate-500">
                {txn.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}