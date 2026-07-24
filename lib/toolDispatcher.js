// lib/toolDispatcher.js

import { paymentTool } from "@/tools/paymentTool";
import { recipientTool } from "@/tools/recipientTool";
import { balanceTool } from "@/tools/balanceTool";
import { historyTool } from "@/tools/historyTool";
import { riskTool } from "@/tools/riskTool";

/**
 * Dispatch AI actions to backend tools.
 */
export async function dispatchAction(action, payload, userId) {
  switch (action) {
    case "PAYMENT":
      return await paymentTool({
        userId,
        ...payload,
      });

    case "SEARCH_RECIPIENT":
      return await recipientTool({
        userId,
        ...payload,
      });

    case "BALANCE":
      return await balanceTool({
        userId,
      });

    case "HISTORY":
      return await historyTool({
        userId,
        ...payload,
      });

    case "EVALUATE_RISK":
      return await riskTool({
        userId,
        ...payload,
      });

    default:
      return {
        success: false,
        action: "UNKNOWN_ACTION",
        message: "Unsupported action.",
      };
  }
}