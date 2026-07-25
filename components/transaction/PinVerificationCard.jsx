"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PinVerificationCard({
  amount,
  onVerify,
}) {
  const [pin, setPin] = useState("");

  function handleChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(value);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-3xl border border-sky-500/20 bg-[#1B2233] p-6"
    >
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-sky-400" />
        <div>
          <h2 className="text-white font-semibold">
            Verify UPI PIN
          </h2>

          <p className="text-sm text-gray-400">
            Enter your 6-digit UPI PIN to pay ₹{amount}
          </p>
        </div>
      </div>

      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        value={pin}
        onChange={handleChange}
        placeholder="••••••"
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-4 text-center text-3xl tracking-[1rem] text-white outline-none"
      />

      <button
        disabled={pin.length !== 6}
        onClick={() => onVerify(pin)}
        className="mt-6 w-full rounded-xl bg-sky-500 py-3 font-semibold text-black disabled:opacity-40"
      >
        Verify & Pay
      </button>
    </motion.div>
  );
}