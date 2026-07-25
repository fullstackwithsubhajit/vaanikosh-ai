// lib/riskEngine.js

import scamKeywords from "./scamKeywords";


export async function evaluateRisk({
  conversation = "",
  amount = 0,
  isNewRecipient = false,
  transactionTime = new Date(),
}) {

  console.log("Conversation:", conversation);
  console.log("Amount:", amount);

  let score = 0;

  const reasons = [];

  const text = conversation.toLowerCase();

  // ------------------------------------
  // Keyword Detection
  // ------------------------------------

  for (const category in scamKeywords) {

    const { score: keywordScore, keywords } = scamKeywords[category];

    const matched = keywords.find(keyword =>
      text.includes(keyword.toLowerCase())
    );

    if (matched) {

      score += keywordScore;

      reasons.push(
        `${category.toUpperCase()} keyword detected: "${matched}"`
      );

    }

  }

  // ------------------------------------
  // High Amount
  // ------------------------------------

  if (amount >= 30000) {

    score += 20;

    reasons.push("High transaction amount");

  }

  // ------------------------------------
  // New Recipient
  // ------------------------------------

  if (isNewRecipient) {

    score += 15;

    reasons.push("Payment to a new Recipient");

  }

  // ------------------------------------
  // Night Transactions
  // ------------------------------------

  const hour = transactionTime.getHours();

  if (hour >= 23 || hour <= 5) {

    score += 10;

    reasons.push("Late night transaction");

  }

  // ------------------------------------
  // Decide Level
  // ------------------------------------

  let level = "LOW";

  if (score >= 80) {
    level = "BLOCK";
  }
  else if (score >= 50) {
    level = "HIGH";
  }
  else if (score >= 25) {
    level = "MEDIUM";
  }
  return {

    score,

    level,

    reasons

    // shouldBlock: level === "BLOCK",
    
  };

}