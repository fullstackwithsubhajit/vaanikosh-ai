// tools/historyTool.js

import * as historyService from "../services/historyService";
import {
  history,
  failure,
} from "../lib/responseFormatter";

/**
 * Fetch transaction history.
 * No business logic here.
 */
export async function getHistory(userId, filters = {}) {
  try {
    if (!userId) {
      return failure(
        "HISTORY",
        "User ID is required."
      );
    }

    const transactions =
      await historyService.getHistory(
        userId,
        filters
      );

    return history(transactions);
  } catch (error) {
    console.error("History Tool Error:", error);

    return failure(
      "HISTORY",
      error.message || "Unable to fetch history."
    );
  }
}