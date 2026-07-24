// tools/balanceTool.js

import { getBalance } from "@/services/balanceService";

export async function balanceTool({ userId }) {
  const balance = await getBalance(userId);

  return {
    success: true,
    balance,
  };
}