// tools/balanceTool.js

import * as balanceService from "../services/balanceService";
import {
  balance,
  failure,
} from "../lib/responseFormatter";

/**
 * Get user's wallet balance
 */
export async function getBalance(userId) {
  try {
    if (!userId) {
      return failure(
        "BALANCE",
        "User ID is required."
      );
    }

    const wallet =
      await balanceService.getBalance(userId);

    return balance(wallet);
  } catch (error) {
    console.error("Balance Tool Error:", error);

    return failure(
        "BALANCE",
        error.message || "Unable to fetch balance."
    );
  }
}