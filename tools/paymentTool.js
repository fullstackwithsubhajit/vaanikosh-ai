// tools/paymentTool.js

import { processPayment } from "@/services/transactionService";

/**
 * Payment Tool
 * Called by Tool Dispatcher.
 * No business logic here.
 */
export async function paymentTool({
  userId,
  recipient,
  amount,
  purpose = "",
  transcript = "",
}) {
  return await processPayment({
    userId,
    recipient,
    amount,
    purpose,
    transcript,
  });
}