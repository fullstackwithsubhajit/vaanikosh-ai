"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  TriangleAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { useEffect } from "react";
import { useState } from "react";

export default function ScamWarningCard({

    data,

    onContinue,

    onCancel,

}) {
  const risk = data?.risk || {};

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {

    if (loading) return;

    setLoading(true);

    await onContinue();

};

const handleCancel = async () => {

    if (loading) return;

    setLoading(true);

    await onCancel();

};

  useEffect(() => {

    const text = data.canContinue

        ? "Warning. This payment appears suspicious. Please verify carefully before continuing."

        : "Warning. This transaction has been blocked because it matches known scam patterns.";

    speechSynthesis.cancel();

    speechSynthesis.speak(

        new SpeechSynthesisUtterance(text)

    );

}, []);

//   const isBlock = risk.level === "BLOCK";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-3xl border border-red-500/30 bg-[#1B2233] p-6 shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-red-500/10 p-3">
          <ShieldAlert className="h-7 w-7 text-red-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Potential Scam Detected
          </h2>

          <p className="text-sm text-gray-400">
            Our AI found suspicious patterns in this transaction.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
        <div className="flex justify-between">
          <span className="text-gray-300">Risk Level</span>

          <span className="font-bold text-red-400">
            {risk.level}
          </span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-gray-300">Risk Score</span>

          <span className="font-bold text-white">
            {risk.score}/100
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-white">
          <TriangleAlert size={18} />
          Reasons
        </h3>

        <div className="space-y-2">
          {risk.reasons?.map((reason, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#20283B] p-3 text-sm text-gray-300"
            >
              • {reason}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4">
        <p className="text-yellow-300 font-medium">
          Recommendation
        </p>

        <p className="mt-2 text-sm text-gray-300">
         {data.canContinue
    ? "Our AI detected suspicious behaviour. Please verify the recipient before continuing."
    : "This payment has been blocked because it strongly matches known scam patterns."
}
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={handleCancel}
        disabled={loading} className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <XCircle className="mr-2 inline" size={18} />
          Cancel Payment
        </button>

        {data.canContinue && (
          <button onClick={handleContinue}
            disabled={loading} className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-black hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
            <ShieldCheck className="mr-2 inline" size={18} />
            Continue Anyway
          </button>
        )}
      </div>
    </motion.div>
  );
}