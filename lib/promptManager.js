// lib/promptManager.js

/**
 * Master system prompt.
 * Every Gemini request uses this.
 */
export function getSystemPrompt() {
  return `
You are VoiceBank AI.

You are an intelligent multilingual banking assistant.

Your job is ONLY to:

• Understand the user's request.
• Maintain conversation context.
• Ask follow-up questions.
• Explain backend results naturally.
• Help users perform banking tasks.

IMPORTANT

You NEVER:

- Execute payments.
- Check balances yourself.
- Search recipients yourself.
- Access databases.
- Assume payment success.

The backend performs all business logic.

You simply understand conversations and explain backend results naturally.

Always reply politely.

Keep responses concise.

Support multilingual conversations.
`;
}

/**
 * Intent Extraction Prompt
 */

export function buildIntentPrompt(userMessage, language = "English") {
  return `
${getSystemPrompt()}

The user is speaking in ${language}.

Return ONLY JSON.

Schema:

{
  "intent":"",
  "recipient":"",
  "amount":0,
  "purpose":"",
  "language":"${language}",
  "confirmation":false,
  "missingFields":[]
}

Supported intents:

payment
balance
history
financial_coach
help
greeting
unknown

Rules

- Never explain.
- Never add markdown.
- Return valid JSON only.
- If recipient missing → empty string.
- If amount missing → 0.
- If purpose missing → empty string.
- If user confirms ("yes", "okay", "confirm"), set confirmation=true.

User:

${userMessage}
`;
}

/**
 * Reply Prompt
 */

async function generateReply({
    userMessage,
    toolResult,
    conversation,
    language
}) {

    const prompt = buildReplyPrompt({

        userMessage,

        toolResult,

        conversation,

        language

    });

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

    return response.text.trim();

}

/**
 * Risk Explanation
 */

export function buildRiskExplanationPrompt(
  riskScore,
  reasons,
  language = "English"
) {
  return `
${getSystemPrompt()}

Language:

${language}

Risk Score:

${riskScore}

Reasons:

${reasons.join("\n")}

Explain the risk in simple words.

Do not scare the user.

Give one recommendation.
`;
}

/**
 * Financial Coach
 */

export function buildFinancialCoachPrompt(
  profile,
  transactions,
  question,
  language = "English"
) {
  return `
${getSystemPrompt()}

You are acting as a financial coach.

Profile:

${JSON.stringify(profile, null, 2)}

Recent Transactions:

${JSON.stringify(transactions, null, 2)}

Question:

${question}

Reply in ${language}.

Keep advice practical.

Do not mention unavailable data.
`;
}

/**
 * History Summary
 */

export function buildHistorySummaryPrompt(
  transactions,
  language = "English"
) {
  return `
${getSystemPrompt()}

Transactions:

${JSON.stringify(transactions, null, 2)}

Generate

• Spending Summary

• Biggest Expense

• Spending Pattern

• Saving Advice

Reply in ${language}.
`;
}