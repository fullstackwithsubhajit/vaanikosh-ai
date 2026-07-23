// lib/promptManager.js

/**
 * Prompt for extracting the user's intent.
 * Gemini MUST return JSON only.
 */

export function buildIntentPrompt(userMessage, language = "English") {
  return `
You are VoiceBank AI, an intelligent banking assistant.

The user is speaking in ${language}.

Your task is to understand what the user wants.

Supported intents:

- payment
- balance
- history
- financial_coach
- help
- greeting
- unknown

Extract the following:

{
  "intent":"",
  "receiver":"",
  "amount":0,
  "purpose":"",
  "language":"${language}",
  "missingFields":[]
}

Rules:

1. Return ONLY JSON.
2. Never explain.
3. If amount is missing, keep amount as 0.
4. If receiver is missing, keep receiver empty.
5. If purpose isn't given, keep purpose empty.
6. Add any missing information inside missingFields.

User:

"${userMessage}"
`;
}

/**
 * Prompt for explaining a calculated risk score.
 */

export function buildRiskExplanationPrompt(
  riskScore,
  reasons,
  language = "English"
) {
  return `
You are VoiceBank AI.

Explain the following banking risk in simple ${language}.

Risk Score:

${riskScore}

Reasons:

${reasons.join("\n")}

Do not scare the user.

Explain politely.

Give one recommendation.
`;
}

/**
 * Prompt for the Financial Coach feature.
 */

export function buildFinancialCoachPrompt(
  profile,
  transactions,
  question,
  language = "English"
) {
  return `
You are an AI Financial Coach.

User Profile

Name:
${profile.name}

Monthly Income:
${profile.income}

Current Balance:
${profile.balance}

Recent Transactions:

${JSON.stringify(transactions, null, 2)}

User Question:

${question}

Reply in ${language}.

Keep the advice practical.
`;
}

/**
 * Prompt for transaction history summary.
 */

export function buildHistorySummaryPrompt(
  transactions,
  language = "English"
) {
  return `
You are VoiceBank AI.

Analyze these banking transactions.

${JSON.stringify(transactions, null, 2)}

Summarize:

- Total Spending
- Biggest Expense
- Most Frequent Category
- Saving Advice

Reply in ${language}.
`;
}