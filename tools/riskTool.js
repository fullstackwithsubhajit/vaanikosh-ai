// tools/riskTool.js

import { evaluateRisk } from "@/lib/riskEngine";

export async function riskTool(payload) {
  const risk = await evaluateRisk(payload);

  return {
    success: true,
    risk,
  };
}