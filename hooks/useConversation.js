"use client";

import { useState } from "react";
import { useCallback } from "react";

export default function useConversation() {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message)  => {
    if (!message.trim()) return;

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
      // ---------- TEMPORARY MOCK ----------
      // Replace this whole block with fetch("/api/ai")
      // when your friend's backend is ready.

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockResponse = [
        {
          id: crypto.randomUUID(),
          type: "assistant",
          data: {
            text: `I understood that you want to ${message}.`,
          },
        },
        {
          id: crypto.randomUUID(),
          type: "summary",
          data: {
            recipient: "Rahul Sharma",
            amount: 500,
            bank: "HDFC Bank",
            note: "Demo Payment",
          },
        },
        {
          id: crypto.randomUUID(),
          type: "risk",
          data: {
            score: 12,
            checks: [
              "Known recipient",
              "Trusted device",
              "Location verified",
            ],
          },
        },
        {
          id: crypto.randomUUID(),
          type: "authentication",
          data: {
            amount: 500,
            method: "UPI PIN",
          },
        },
      ];

      setConversation((prev) => [...prev, ...mockResponse]);

      // ---------- END MOCK ----------
    } catch (err) {
      console.error(err);

      setError("Something went wrong.");

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
    } finally {
      setLoading(false);
    }
  },[]);

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