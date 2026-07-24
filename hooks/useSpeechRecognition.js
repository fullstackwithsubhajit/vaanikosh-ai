"use client";

import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(language = "en-IN") {
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  const [status, setStatus] = useState("ready");
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onstart = () => {
      isListeningRef.current = true;
      setStatus("listening");
    };

    recognition.onresult = (event) => {
      const text =
        event.results[event.resultIndex][0].transcript;

      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);

      isListeningRef.current = false;
      setStatus("error");
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setStatus("ready");
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      isListeningRef.current = false;
    };
  }, [language]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    if (isListeningRef.current) return;

    setTranscript("");

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.warn("Speech recognition already running.", err);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  return {
    supported,
    transcript,
    status,
    startListening,
    stopListening,
    resetTranscript,
  };
}