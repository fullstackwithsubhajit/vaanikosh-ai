// tools/paymentTool.js

import {
  previewPayment,
  processPayment,
} from "@/services/transactionService";

export async function paymentTool({
  action = "PREVIEW_PAYMENT",

  userId,
  recipient,
  amount,
  purpose = "",
  transcript = "",
}) {

  switch (action) {

    case "PREVIEW_PAYMENT":
      return await previewPayment({
        userId,
        recipient,
        amount,
        purpose,
        transcript,
      });

    case "CONFIRM_PAYMENT":
      return await processPayment({
        userId,
        recipient,
        amount,
        purpose,
        transcript,
      });

    default:
      return {
        success: false,
        message: "Unknown payment action.",
      };
  }
}