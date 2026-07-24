// lib/gemini.js

import { GoogleGenAI } from "@google/genai";
import {
  getSystemPrompt,
  buildIntentPrompt,
  buildReplyPrompt,
} from "./promptManager";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in .env.local");
}

const ai = new GoogleGenAI({
  apiKey,
});

const MODEL = "gemini-2.5-flash";

/**
 * Low-level Gemini request.
 */
export async function askGemini(prompt, options = {}) {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        temperature: options.temperature ?? 0.4,
        responseMimeType: options.responseMimeType,
        systemInstruction: options.systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);

    throw new Error("Gemini request failed.");
  }
}

/**
 * Extract user intent and entities.
 */
export async function extractIntent(userMessage, language = "English") {
  const prompt = buildIntentPrompt(userMessage, language);

  const result = await askGemini(prompt, {
    temperature: 0,
    responseMimeType: "application/json",
    systemInstruction: getSystemPrompt(),
  });

  try {
    return JSON.parse(result);
  } catch (err) {
    console.error("Intent Parsing Error:", err);

    return {
      intent: "unknown",
      recipient: "",
      amount: 0,
      purpose: "",
      language,
      confirmation: false,
      missingFields: [],
    };
  }
}

/**
 * Generate a natural conversational reply.
 */
export async function generateReply({
  userMessage,
  toolResult,
  conversation,
  language = "English",
}) {
  const prompt = buildReplyPrompt({
    userMessage,
    toolResult,
    conversation,
    language,
  });

  return await askGemini(prompt, {
    temperature: 0.6,
    systemInstruction: getSystemPrompt(),
  });
}

export default ai;