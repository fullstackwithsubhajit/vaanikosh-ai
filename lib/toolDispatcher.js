// lib/toolDispatcher.js

import { executePayment } from "../tools/paymentTool";
import { findRecipient } from "../tools/recipientTool";
import { getBalance } from "../tools/balanceTool";
import { getHistory } from "../tools/historyTool";
import { evaluateRisk } from "../tools/riskTool";

/**
 * Routes orchestrator actions to backend tools.
 */

export async function dispatchAction(action, payload, userId) {
  switch (action) {
    case "EXECUTE_PAYMENT":
      return await executePayment(userId, payload);

    case "GET_BALANCE":
      return await getBalance(userId);

    case "GET_HISTORY":
      return await getHistory(userId);

    case "SEARCH_RECIPIENT":
      return await findRecipient(userId, payload.recipient);

    case "EVALUATE_RISK":
      return await evaluateRisk(userId, payload);

    // These are conversation actions handled by Gemini,
    // so no backend work is needed.
    case "ASK_RECIPIENT":
    case "ASK_AMOUNT":
    case "ASK_CONFIRMATION":
    case "GREETING":
    case "SHOW_HELP":
    case "UNKNOWN":
      return {
        success: true,
        requiresReply: true,
        action,
        payload,
      };

    default:
      return {
        success: false,
        error: "Unsupported action",
      };
  }
}