// tools/recipientTool.js

import * as recipientService from "../services/recipientService";
import {
  recipient,
  failure,
} from "../lib/responseFormatter";

/**
 * Search recipient
 */
export async function findRecipient(userId, recipientName) {
  try {
    if (!recipientName) {
      return failure(
        "RECIPIENT",
        "Recipient name is required."
      );
    }

    const result =
      await recipientService.findRecipient(
        userId,
        recipientName
      );

    if (!result) {
      return failure(
        "RECIPIENT",
        "Recipient not found."
      );
    }

    return recipient(result);
  } catch (error) {
    console.error("Recipient Tool Error:", error);

    return failure(
      "RECIPIENT",
      error.message || "Unable to search recipient."
    );
  }
}

/**
 * Create recipient
 */
export async function createRecipient(userId, data) {
  try {
    const result =
      await recipientService.createRecipient(
        userId,
        data
      );

    return recipient(result);
  } catch (error) {
    return failure(
      "RECIPIENT",
      error.message
    );
  }
}

/**
 * Get all saved recipients
 */
export async function getRecipients(userId) {
  try {
    const result =
      await recipientService.getRecipients(userId);

    return {
      success: true,
      action: "RECIPIENT_LIST",
      data: result,
    };
  } catch (error) {
    return failure(
      "RECIPIENT",
      error.message
    );
  }
}