import { GoogleGenAI } from "@google/genai";

import { getSystemPrompt } from "./promptManager";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env.local");
}

const ai = new GoogleGenAI({ apiKey });

const MODEL = "gemini-2.5-flash";

/**
 * Generates a natural conversational response.
 */
export async function generateResponse(messages) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: messages,
    config: {
      systemInstruction: getSystemPrompt(),
      temperature: 0.4,
    },
  });

  return response.text;
}

/**
 * Uses Gemini to extract intent and entities in JSON format.
 */
export async function analyzeMessage(messages) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: messages,
    config: {
      systemInstruction: `
You are an intent extraction engine.

Return ONLY valid JSON.

Example:
{
  "intent": "PAYMENT",
  "entities": {
    "recipient": "Rahul",
    "amount": 500
  },
  "confirmation": false
}
`,
      responseMimeType: "application/json",
      temperature: 0,
    },
  });

  return JSON.parse(response.text);
}

export default ai;