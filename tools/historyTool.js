// tools/historyTool.js

import {
  getTransactionHistory,
} from "@/services/historyService";

export async function historyTool({
  userId,
  filters = {},
}) {
  return await getTransactionHistory(
    userId,
    filters
  );
}