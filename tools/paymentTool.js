// tools/paymentTool.js

import * as transactionService from "../services/transactionService";
import {
  paymentSuccess,
  failure,
} from "../lib/responseFormatter";

/**
 * Execute a payment.
 * This file contains NO business logic.
 * It simply validates input and delegates to transactionService.
 */
export async function executePayment(userId, payload = {}) {
  try {
    const {
      recipient,
      amount,
      purpose = "",
    } = payload;

    if (!recipient) {
      return failure(
        "PAYMENT",
        "Recipient is required."
      );
    }

    if (!amount || amount <= 0) {
      return failure(
        "PAYMENT",
        "Amount must be greater than zero."
      );
    }

    const transaction =
      await transactionService.processPayment({
        userId,
        recipient,
        amount,
        purpose,
      });

    return paymentSuccess(transaction);
  } catch (error) {
    console.error("Payment Tool Error:", error);

    return failure(
      "PAYMENT",
      error.message || "Payment failed."
    );
  }
}