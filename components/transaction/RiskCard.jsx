"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CheckCircle2,
} from "lucide-react";

export default function RiskCard({ data = {} }) {
  const score = data.score ?? 0;

  let level = "LOW";
  let color = "text-green-400";
  let bg = "bg-green-500/10";
  let border = "border-green-500/20";
  let Icon = ShieldCheck;

  if (score >= 30 && score < 70) {
    level = "MEDIUM";
    color = "text-yellow-400";
    bg = "bg-yellow-500/10";
    border = "border-yellow-500/20";
    Icon = ShieldAlert;
  }

  if (score >= 70) {
    level = "HIGH";
    color = "text-red-400";
    bg = "bg-red-500/10";
    border = "border-red-500/20";
    Icon = ShieldX;
  }

  const checks = data.checks || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mt-4 rounded-3xl border ${border} bg-[#1B2233] p-6 shadow-xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`rounded-xl p-3 ${bg}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Transaction Intelligence
          </h2>

          <p className="text-sm text-gray-400">
            Transaction analyzed before approval.
          </p>
        </div>
      </div>

      <div className="space-y-3">

        {checks.map((check, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <CheckCircle2
              className={`h-5 w-5 ${color}`}
            />

            <p className="text-sm text-gray-200">
              {check}
            </p>
          </div>
        ))}

      </div>

      <div
        className={`mt-6 rounded-2xl ${bg} border ${border} p-4 flex justify-between items-center`}
      >
        <span className="text-sm text-gray-300">
          Overall Risk
        </span>

        <span className={`font-bold tracking-wider ${color}`}>
          {level}
        </span>
      </div>
    </motion.div>
  );
}