"use client";

import { motion } from "framer-motion";
import { Wallet, IndianRupee } from "lucide-react";

export default function BalanceCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl rounded-3xl border border-slate-800 bg-[#111827] p-6"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-sky-500/20 p-3">
          <Wallet
            size={30}
            className="text-sky-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Available Balance
          </h2>

          <p className="text-sm text-slate-400">
            Current account balance
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        <IndianRupee
          size={32}
          className="text-emerald-400"
        />

        <h1 className="text-5xl font-bold text-white">
          {data.balance}
        </h1>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-900 p-5">
        <div className="flex justify-between">
          <span className="text-slate-400">
            Account
          </span>

          <span className="text-white">
            {data.account}
          </span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-slate-400">
            Bank
          </span>

          <span className="text-white">
            {data.bank}
          </span>
        </div>
      </div>
    </motion.div>
  );
}