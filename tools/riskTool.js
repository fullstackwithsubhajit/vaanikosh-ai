// tools/riskTool.js

import { calculateRisk } from "../lib/riskEngine";
import { risk, failure } from "../lib/responseFormatter";

/**
 * Evaluate transaction risk.
 * No business logic here.
 * Delegates to riskEngine.
 */
export async function evaluateRisk(userId, payload = {}) {
  try {
    const {
      amount,
      recipient,
      recipientTrusted = false,
      dailyTransactionCount = 0,
      recentFailures = 0,
    } = payload;

    if (!amount || amount <= 0) {
      return failure(
        "RISK",
        "Invalid transaction amount."
      );
    }

    const result = calculateRisk({
      amount,
      recipient,
      recipientTrusted,
      dailyTransactionCount,
      recentFailures,
    });

    return risk(result);
  } catch (error) {
    console.error("Risk Tool Error:", error);

    return failure(
      "RISK",
      error.message || "Unable to evaluate risk."
    );
  }
}