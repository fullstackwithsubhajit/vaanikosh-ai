"use client";

import { useEffect } from "react";

import MicButton from "../voice/MicButton";
import VoiceWave from "../voice/VoiceWave";
import VoiceStatus from "../voice/VoiceStatus";

export default function Hero({ speech, sendMessage, speak }) {
  const {
    status,
    transcript,
    startListening,
    resetTranscript,
  } = speech;

  useEffect(() => {
    if (!transcript) return;

    const sendTranscript = async () => {
      const response = await sendMessage(transcript);

    // Temporary Demo

      speak("Processing your request.");

//       if(response?.ai?.reply){

//     speak(response.ai.reply);

// }
      console.log("Transcript fired:", transcript);
      resetTranscript();
    };

    sendTranscript();
  }, [transcript, sendMessage, resetTranscript]);

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16">
      <h2 className="text-center text-4xl font-semibold text-white">
        How can I help you today?
      </h2>

      <MicButton
        status={status}
        onClick={startListening}
      />

      <VoiceWave status={status} />

      <VoiceStatus status={status} />
    </section>
  );
}