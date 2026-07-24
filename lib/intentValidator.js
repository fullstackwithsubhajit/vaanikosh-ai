// lib/intentValidator.js

const VALID_INTENTS = [
  "payment",
  "balance",
  "history",
  "financial_coach",
  "help",
  "greeting",
  "unknown",
];

export function validateIntent(aiResponse = {}) {
  const errors = [];

  let {
    intent = "unknown",
    recipient = "",
    amount = 0,
    purpose = "",
    confirmation = false,
    language = "English",
    missingFields = [],
  } = aiResponse;

  if (!VALID_INTENTS.includes(intent)) {
    errors.push("Invalid intent");
    intent = "unknown";
  }

  amount = Number(amount);

  if (Number.isNaN(amount) || amount < 0) {
    errors.push("Invalid amount");
    amount = 0;
  }

  if (!Array.isArray(missingFields)) {
    missingFields = [];
  }

  return {
    valid: errors.length === 0,

    errors,

    data: {
      intent,
      recipient: recipient.trim(),
      amount,
      purpose: purpose.trim(),
      confirmation: Boolean(confirmation),
      language,
      missingFields,
    },
  };
}