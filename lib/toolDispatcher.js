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
    
    case "SELECT_RECIPIENT":
        return await recipientTool({
            userId,
            action: "SELECT_RECIPIENT",
            ...payload,
        });
    case "PREVIEW_PAYMENT":
      return await paymentTool({
        userId,
        action: "PREVIEW_PAYMENT",
        ...payload,
    });

    case "CONFIRM_PAYMENT":
      return await paymentTool({
        userId,
        action: "CONFIRM_PAYMENT",
        ...payload,
    });

    case "AUTHENTICATE":
      return await paymentTool({
        userId,
        action: "AUTHENTICATE",
        ...payload,
    });

    case "ASK_RECIPIENT":
        return {
        success: true,
        action: "ASK_RECIPIENT",
        data: {}
    };

    case "ASK_AMOUNT":
        return {
        success: true,
        action: "ASK_AMOUNT",
        data: payload
    };

    case "ASK_CONFIRMATION":
        return {
        success: true,
        action: "SHOW_TRANSACTION_SUMMARY",
        data: {
            summary: {
                recipient: payload.recipient,
                amount: payload.amount,
                note: payload.purpose || ""
            },
            risk: {
                score: 8,
                level: "LOW",
                checks: [
                    "Trusted recipient",
                    "Amount looks normal"
                ]
            },
            authentication: {
                method: "UPI PIN",
                amount: payload.amount
            }
        }
    };

    default:
      return {
        success: false,
        action: "UNKNOWN_ACTION",
        message: "Unsupported action.",
      };
  }
}