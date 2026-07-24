"use client";

import { useRef } from "react";

export default function useSpeechSynthesis() {
  const synthRef =
    useRef(typeof window !== "undefined" ? window.speechSynthesis : null);

  const speak = (text) => {
    if (!synthRef.current || !text) return;

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    synthRef.current.speak(utterance);
  };

  const stop = () => {
    synthRef.current?.cancel();
  };

  return {
    speak,
    stop,
  };
}