"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  ShieldCheck,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function AuthenticationCard({ data = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-4 rounded-3xl border border-sky-500/20 bg-[#1B2233] p-6 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-sky-500/10 p-3">
          <Fingerprint className="h-6 w-6 text-sky-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Authentication Required
          </h2>

          <p className="text-sm text-gray-400">
            One final verification before the payment is processed.
          </p>
        </div>
      </div>

      {/* Security */}
      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-green-400" />

          <span className="text-sm text-gray-200">
            AI security analysis completed
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-green-400" />

          <span className="text-sm text-gray-200">
            Your banking credentials remain secure
          </span>
        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-white/10" />

      {/* Payment */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-400">
            Ready to transfer
          </p>

          <h2 className="mt-1 text-3xl font-bold text-white">
            ₹{data.amount}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400">
            Method
          </p>

          <p className="font-medium text-white">
            {data.method || "UPI PIN"}
          </p>
        </div>

      </div>

      {/* Button */}

      <button
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-sky-500
          px-6
          py-4
          font-semibold
          text-slate-950
          transition-all
          duration-300
          hover:bg-sky-400
          active:scale-[0.98]
        "
      >
        Authenticate & Pay

        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}