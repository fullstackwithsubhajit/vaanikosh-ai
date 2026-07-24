// tools/recipientTool.js

import {
  searchRecipient,
  createRecipient,
  getRecipients,
} from "@/services/recipientService";

export async function recipientTool({
  action = "SEARCH",
  userId,
  recipient,
  data,
}) {
  switch (action) {
    case "SEARCH":
      return await searchRecipient(userId, recipient);

    case "CREATE":
      return await createRecipient(userId, data);

    case "LIST":
      return await getRecipients(userId);

    default:
      return {
        success: false,
        message: "Unknown recipient action.",
      };
  }
}