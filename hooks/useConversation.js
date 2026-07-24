"use client";

import { useState } from "react";
import { useCallback } from "react";

export default function useConversation() {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
  if (!message.trim()) return;

  const userMessage = {
    id: crypto.randomUUID(),
    type: "user",
    data: {
      text: message,
    },
  };

  // Show user's message immediately
  setConversation((prev) => [...prev, userMessage]);

  setLoading(true);
  setError(null);

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   userId: "demo-user", // replace later with Supabase user id
      //   message,
      //   language: "English",
      // }),
      body: JSON.stringify({
      userId: "6a63ed00966ce66830d52cac",
      message,
      language: "English",
    }),
    });
    const result = await res.json();
    
    // if (!res.ok) {
    // throw new Error("Failed to contact AI.");
    // }
      if (!res.ok) {
        console.error("Backend Error:", result);
        throw new Error(result.message || "Failed to contact AI.");
      }

    console.log("AI Response:", result);

    // Backend now returns typed conversation items
    setConversation((prev) => [
      ...prev,
      ...(result.conversation || []),
    ]);

    // IMPORTANT:
    // Hero will use this later for speech synthesis.
    return result;

  } catch (err) {
    console.error(err);

    setError(err.message);

    setConversation((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "assistant",
        data: {
          text: "Sorry, something went wrong.",
        },
      },
    ]);

    return null;
  } finally {
    setLoading(false);
  }
}, []);

  const clearConversation = () => {
    setConversation([]);
  };

  return {
    conversation,
    sendMessage,
    clearConversation,
    loading,
    error,
  };
}