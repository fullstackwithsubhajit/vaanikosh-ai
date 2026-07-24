"use client";

import { useState } from "react";

export default function useConversation() {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user's message immediately
    const userMessage = {
      id: crypto.randomUUID(),
      type: "user",
      data: {
        text: message,
      },
    };

    setConversation((prev) => [...prev, userMessage]);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          language: "en",
        }),
      });

      const result = await res.json();

      console.log("AI Response:", result);

      // Temporary until backend is finished
      const assistantMessage = {
        id: crypto.randomUUID(),
        type: "assistant",
        data: {
          text: result?.ai?.reply || "No response received.",
        },
      };

      setConversation((prev) => [
        ...prev,
        assistantMessage,
      ]);

    } catch (err) {
      console.error(err);

      setError("Something went wrong.");

      setConversation((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "assistant",
          data: {
            text: "Sorry, I couldn't process your request.",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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