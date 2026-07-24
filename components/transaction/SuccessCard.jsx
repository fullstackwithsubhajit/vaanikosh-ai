"use client";

import { motion } from "framer-motion";
import { CircleCheckBig, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

export default function SuccessCard({ data }) {


 useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(
      `Payment of ₹${data.amount} to ${data.recipient} completed successfully.`
    );

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.cancel(); // Stop any previous speech
    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel();
    };
  }, [data.amount, data.recipient]);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl rounded-3xl border border-emerald-500/20 bg-[#111827] p-6"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-emerald-500/20 p-3">
          <CircleCheckBig
            size={32}
            className="text-emerald-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Payment Successful
          </h2>

          <p className="text-sm text-slate-400">
            Your transaction has been completed successfully.
          </p>
        </div>
      </div>

      <hr className="my-5 border-emerald-500/20" />

      <div className="mt-6 space-y-3 rounded-2xl bg-slate-900 p-5">
        <div className="flex justify-between">
          <span className="text-slate-400">Recipient</span>
          <span className="text-white font-medium">
            {data.recipient}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Amount</span>
          <span className="text-white font-medium">
            ₹{data.amount}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Reference</span>
          <span className="text-white font-medium">
            {data.reference}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Time</span>
          <span className="text-white font-medium">
            {data.time}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-emerald-400">
        <ArrowUpRight size={18} />
        <p className="text-sm">
          Transaction recorded successfully.
        </p>
      </div>

      <div className="flex justify-between border-t border-slate-800 pt-3">
    <span className="text-slate-400">
       Remaining Balance
    </span>

    <span className="font-semibold text-emerald-400">
      ₹{data.balance}
    </span>
      </div>

      <button
  onClick={onDone}
  className="mt-6 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:bg-emerald-400"
>
  Done
</button>
    </motion.div>
  );
}